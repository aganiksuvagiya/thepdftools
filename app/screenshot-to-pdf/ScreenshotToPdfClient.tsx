"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

interface ImageEntry {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
}

type PageSize = "a4" | "letter" | "auto";
type Orientation = "portrait" | "landscape" | "auto";
type Margin = "none" | "small" | "medium";

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

const MARGINS: Record<Margin, number> = {
  none: 0,
  small: 24,
  medium: 48,
};

async function loadImageDimensions(file: File): Promise<{ width: number; height: number; url: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight, url });
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

async function convertWebPtoPNG(file: File): Promise<Uint8Array> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load WebP"));
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  URL.revokeObjectURL(url);
  if (!blob) throw new Error("Failed to convert WebP to PNG");
  return new Uint8Array(await blob.arrayBuffer());
}

export default function ScreenshotToPdfClient() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("auto");
  const [margin, setMargin] = useState<Margin>("small");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setPdfUrl(null);
    setError(null);
    const newEntries: ImageEntry[] = [];
    for (const file of files) {
      try {
        const { width, height, url } = await loadImageDimensions(file);
        newEntries.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          url,
          width,
          height,
          name: file.name,
        });
      } catch {
        // skip files that can't be loaded
      }
    }
    setImages((prev) => [...prev, ...newEntries]);
  }, []);

  const remove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
    setPdfUrl(null);
  };

  const moveDown = (index: number) => {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
    setPdfUrl(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();
      const marginPx = MARGINS[margin];

      for (let i = 0; i < images.length; i++) {
        const entry = images[i];
        setProgress(`Adding image ${i + 1} of ${images.length}...`);

        // Read file bytes and embed
        const fileBytes = new Uint8Array(await entry.file.arrayBuffer());
        const lowerName = entry.name.toLowerCase();

        let embeddedImage;
        if (lowerName.endsWith(".png")) {
          embeddedImage = await pdfDoc.embedPng(fileBytes);
        } else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
          embeddedImage = await pdfDoc.embedJpg(fileBytes);
        } else {
          // WebP or other: convert to PNG first
          const pngBytes = await convertWebPtoPNG(entry.file);
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        }

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pgWidth: number;
        let pgHeight: number;

        if (pageSize === "auto") {
          // Fit page to image + margins
          pgWidth = imgWidth + marginPx * 2;
          pgHeight = imgHeight + marginPx * 2;
        } else {
          const dims = PAGE_SIZES[pageSize];
          // Determine orientation
          let usePortrait: boolean;
          if (orientation === "portrait") {
            usePortrait = true;
          } else if (orientation === "landscape") {
            usePortrait = false;
          } else {
            // auto: match image aspect ratio
            usePortrait = imgHeight >= imgWidth;
          }

          if (usePortrait) {
            pgWidth = dims.width;
            pgHeight = dims.height;
          } else {
            pgWidth = dims.height;
            pgHeight = dims.width;
          }
        }

        const page = pdfDoc.addPage([pgWidth, pgHeight]);

        // Calculate draw area
        const drawWidth = pgWidth - marginPx * 2;
        const drawHeight = pgHeight - marginPx * 2;

        // Scale image to fit within draw area
        let scale = 1;
        if (pageSize !== "auto") {
          const scaleX = drawWidth / imgWidth;
          const scaleY = drawHeight / imgHeight;
          scale = Math.min(scaleX, scaleY, 1); // don't enlarge beyond original
        }

        const finalW = imgWidth * scale;
        const finalH = imgHeight * scale;

        // Center on page
        const x = marginPx + (drawWidth - finalW) / 2;
        const y = marginPx + (drawHeight - finalH) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: finalW,
          height: finalH,
        });
      }

      setProgress("Generating PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setProgress("");
    } catch {
      setError("Failed to create PDF. Please try again.");
      setProgress("");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "screenshots.pdf";
    a.click();
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        multiple
        label="Drop your screenshots here"
        sublabel="JPG, PNG, or WebP · Multiple files supported"
      />

      {images.length > 0 && (
        <>
          {/* Thumbnails list */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {images.length} image{images.length !== 1 ? "s" : ""} selected
            </p>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-12 w-12 rounded-lg object-cover bg-white border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {img.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {img.width} x {img.height}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move up"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === images.length - 1}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move down"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => remove(img.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Page size */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value as PageSize);
                  setPdfUrl(null);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="auto">Auto (fit to image)</option>
              </select>
            </div>

            {/* Orientation */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Orientation</label>
              <select
                value={orientation}
                onChange={(e) => {
                  setOrientation(e.target.value as Orientation);
                  setPdfUrl(null);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="auto">Auto</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            {/* Margin */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Margin</label>
              <select
                value={margin}
                onChange={(e) => {
                  setMargin(e.target.value as Margin);
                  setPdfUrl(null);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Converting...
              </>
            ) : (
              "Convert to PDF"
            )}
          </button>

          {progress && (
            <p className="text-center text-sm text-blue-600 font-medium">
              {progress}
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {pdfUrl && (
            <>
              <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-green-700">
                  PDF created with {images.length} page{images.length !== 1 ? "s" : ""}
                </span>
              </div>

              <button onClick={handleDownload} className="btn-secondary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
