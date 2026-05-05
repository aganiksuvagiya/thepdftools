"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

interface MergeFile {
  id: string;
  file: File;
  kind: "pdf" | "image";
  pageCount?: number;
  width?: number;
  height?: number;
}

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function getPdfPageCount(file: File): Promise<number> {
  try {
    const buffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(buffer);
    return doc.getPageCount();
  } catch {
    return 0;
  }
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function loadImageInfo(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

async function imageFileToPngBytes(file: File): Promise<Uint8Array> {
  const url = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas is not supported");
    }

    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/png");
    });

    if (!blob) {
      throw new Error("Failed to encode image");
    }

    return new Uint8Array(await blob.arrayBuffer());
  } finally {
    URL.revokeObjectURL(url);
  }
}

function fitIntoA4(width: number, height: number) {
  const margin = 24;
  const pageWidth = width >= height ? A4_HEIGHT : A4_WIDTH;
  const pageHeight = width >= height ? A4_WIDTH : A4_HEIGHT;
  const availWidth = pageWidth - margin * 2;
  const availHeight = pageHeight - margin * 2;
  const ratio = Math.min(availWidth / width, availHeight / height);
  const drawWidth = width * ratio;
  const drawHeight = height * ratio;

  return {
    pageWidth,
    pageHeight,
    x: (pageWidth - drawWidth) / 2,
    y: (pageHeight - drawHeight) / 2,
    drawWidth,
    drawHeight,
  };
}

export default function PdfMergeClient() {
  const [mergeFiles, setMergeFiles] = useState<MergeFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setMergedUrl(null);
    setError(null);
    const newEntries: MergeFile[] = [];

    for (const file of files) {
      if (isPdfFile(file)) {
        const pageCount = await getPdfPageCount(file);
        newEntries.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          kind: "pdf",
          pageCount,
        });
        continue;
      }

      if (isImageFile(file)) {
        try {
          const { width, height } = await loadImageInfo(file);
          newEntries.push({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            file,
            kind: "image",
            pageCount: 1,
            width,
            height,
          });
        } catch {
          setError("One or more images could not be loaded.");
        }
      }
    }

    setMergeFiles((prev) => [...prev, ...newEntries]);
  }, []);

  const remove = (id: string) => {
    setMergeFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setMergeFiles((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
    setMergedUrl(null);
  };

  const moveDown = (index: number) => {
    if (index === mergeFiles.length - 1) return;
    setMergeFiles((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
    setMergedUrl(null);
  };

  const handleMerge = async () => {
    if (mergeFiles.length < 2) {
      setError("Please add at least 2 files to merge.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const entry of mergeFiles) {
        if (entry.kind === "pdf") {
          const buffer = await entry.file.arrayBuffer();
          const doc = await PDFDocument.load(buffer);
          const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          pages.forEach((page) => mergedPdf.addPage(page));
          continue;
        }

        const imageBytes = await imageFileToPngBytes(entry.file);
        const embeddedImage = await mergedPdf.embedPng(imageBytes);
        const imageWidth = entry.width ?? embeddedImage.width;
        const imageHeight = entry.height ?? embeddedImage.height;
        const fitted = fitIntoA4(imageWidth, imageHeight);
        const page = mergedPdf.addPage([fitted.pageWidth, fitted.pageHeight]);

        page.drawImage(embeddedImage, {
          x: fitted.x,
          y: fitted.y,
          width: fitted.drawWidth,
          height: fitted.drawHeight,
        });
      }
      const bytes = await mergedPdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setMergedUrl(URL.createObjectURL(blob));
    } catch {
      setError("Failed to merge PDFs. Ensure all files are valid, unlocked PDFs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!mergedUrl) return;
    const a = document.createElement("a");
    a.href = mergedUrl;
    a.download = "merged.pdf";
    a.click();
  };

  const totalSize = mergeFiles.reduce((acc, f) => acc + f.file.size, 0);
  const totalPages = mergeFiles.reduce((acc, f) => acc + (f.pageCount || 0), 0);
  const pdfCount = mergeFiles.filter((entry) => entry.kind === "pdf").length;
  const imageCount = mergeFiles.filter((entry) => entry.kind === "image").length;

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/pdf": [".pdf"],
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/webp": [".webp"],
        }}
        multiple
        label="Drop your PDF or image files here"
        sublabel="PDF, JPG, PNG, or WebP · Multiple files allowed · Click to browse"
      />

      {mergeFiles.length > 0 && (
        <>
          {/* Summary */}
          <div className="flex flex-wrap gap-4 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span><strong>{mergeFiles.length}</strong> files</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span><strong>{totalPages}</strong> pages total</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span><strong>{formatBytes(totalSize)}</strong> total</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5.25A2.25 2.25 0 016.25 3h11.5A2.25 2.25 0 0120 5.25v13.5A2.25 2.25 0 0117.75 21H6.25A2.25 2.25 0 014 18.75V5.25zM8 8h8M8 12h8M8 16h5" />
              </svg>
              <span><strong>{pdfCount}</strong> PDF · <strong>{imageCount}</strong> image</span>
            </div>
          </div>

          {/* File list */}
          <ul className="space-y-2">
            {mergeFiles.map((entry, index) => (
              <li
                key={entry.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-xs font-bold text-rose-600">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {entry.file.name}
                    </p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${entry.kind === "pdf" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"}`}>
                      {entry.kind === "pdf" ? "PDF" : "IMAGE"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatBytes(entry.file.size)}
                    {entry.pageCount ? ` · ${entry.pageCount} page${entry.pageCount !== 1 ? "s" : ""}` : ""}
                    {entry.kind === "image" && entry.width && entry.height ? ` · ${entry.width}×${entry.height}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                    title="Move up"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === mergeFiles.length - 1}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                    title="Move down"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => remove(entry.id)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    title="Remove"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleMerge}
            disabled={loading || mergeFiles.length < 2}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Merging...
              </>
            ) : (
              `Merge ${mergeFiles.length} files`
            )}
          </button>

          {mergedUrl && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
                <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-700">Merge complete!</p>
                  <p className="text-xs text-green-600">
                    {mergeFiles.length} files · {totalPages} pages combined
                  </p>
                </div>
              </div>
              <button onClick={handleDownload} className="btn-secondary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download merged.pdf
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
