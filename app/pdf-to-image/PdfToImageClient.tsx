"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

interface PageThumb {
  pageNum: number;
  dataUrl: string;
}

interface ConvertedPage {
  pageNum: number;
  blob: Blob;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfJs(): Promise<any> {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return pdfjsLib;
}

export default function PdfToImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [thumbnails, setThumbnails] = useState<PageThumb[]>([]);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [quality, setQuality] = useState(0.9);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState("");
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setConvertedPages([]);
    setThumbnails([]);
    setLoading(true);

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const count = pdf.numPages;
      setPageCount(count);

      const thumbs: PageThumb[] = [];
      for (let i = 1; i <= count; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        thumbs.push({ pageNum: i, dataUrl: canvas.toDataURL("image/png") });
      }
      setThumbnails(thumbs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleConvertAll = useCallback(async () => {
    if (!file) return;

    setConverting(true);
    setError(null);
    setConvertedPages([]);

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const results: ConvertedPage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Converting page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;

        const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))),
            mimeType,
            format === "jpg" ? quality : undefined
          );
        });

        results.push({
          pageNum: i,
          blob,
          url: URL.createObjectURL(blob),
        });
      }

      setConvertedPages(results);
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [file, format, quality]);

  const downloadPage = (page: ConvertedPage) => {
    const ext = format === "jpg" ? "jpg" : "png";
    const baseName = file?.name.replace(/\.pdf$/i, "") ?? "page";
    const a = document.createElement("a");
    a.href = page.url;
    a.download = `${baseName}_page${page.pageNum}.${ext}`;
    a.click();
  };

  const downloadAll = () => {
    convertedPages.forEach((page) => downloadPage(page));
  };

  const reset = () => {
    convertedPages.forEach((p) => URL.revokeObjectURL(p.url));
    setFile(null);
    setPageCount(0);
    setThumbnails([]);
    setConvertedPages([]);
    setProgress("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFile}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your PDF here"
          sublabel="or click to browse"
        />
      ) : (
        <>
          {/* File info */}
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">
                {pageCount} page{pageCount !== 1 ? "s" : ""}
              </p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {/* Loading thumbnails */}
          {loading && (
            <div className="card p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-rose-600" />
              <p className="mt-2 text-sm text-gray-500">Loading PDF pages...</p>
            </div>
          )}

          {/* Thumbnails */}
          {thumbnails.length > 0 && (
            <div className="card p-4">
              <p className="text-sm font-medium text-gray-600 mb-3">Page Preview</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {thumbnails.map((t) => (
                  <div
                    key={t.pageNum}
                    className="rounded-lg border border-gray-200 overflow-hidden bg-white"
                  >
                    <img
                      src={t.dataUrl}
                      alt={`Page ${t.pageNum}`}
                      className="w-full h-auto"
                    />
                    <p className="text-[10px] text-center text-gray-400 py-0.5">
                      {t.pageNum}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options */}
          {thumbnails.length > 0 && convertedPages.length === 0 && !converting && (
            <div className="card p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "jpg" | "png")}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                  </select>
                </div>
                {format === "jpg" && (
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Quality: {Math.round(quality * 100)}%
                    </label>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.05}
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                )}
              </div>
              <button onClick={handleConvertAll} className="btn-primary w-full">
                Convert All Pages
              </button>
            </div>
          )}

          {/* Progress */}
          {converting && (
            <div className="card p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-rose-600" />
              <p className="mt-2 text-sm text-gray-500">{progress}</p>
            </div>
          )}

          {/* Results */}
          {convertedPages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  {convertedPages.length} image{convertedPages.length !== 1 ? "s" : ""} ready
                </p>
                <button onClick={downloadAll} className="btn-primary text-sm">
                  Download All
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {convertedPages.map((p) => (
                  <div key={p.pageNum} className="card overflow-hidden">
                    <img
                      src={p.url}
                      alt={`Page ${p.pageNum}`}
                      className="w-full h-auto"
                    />
                    <div className="p-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Page {p.pageNum}
                      </span>
                      <button
                        onClick={() => downloadPage(p)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={reset} className="btn-secondary w-full">
                Convert Another PDF
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
