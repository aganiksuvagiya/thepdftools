"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

type SplitMode = "all" | "custom";

interface SplitResult {
  label: string;
  blob: Blob;
  url: string;
}

function parseRanges(input: string, maxPage: number): number[][] {
  const groups: number[][] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end) || start < 1 || end > maxPage || start > end) {
        throw new Error(`Invalid range: ${part} (pages 1-${maxPage})`);
      }
      const pages: number[] = [];
      for (let i = start; i <= end; i++) pages.push(i);
      groups.push(pages);
    } else {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 1 || num > maxPage) {
        throw new Error(`Invalid page: ${part} (pages 1-${maxPage})`);
      }
      groups.push([num]);
    }
  }

  return groups;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<SplitMode>("all");
  const [rangeInput, setRangeInput] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState<SplitResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      setPageCount(doc.getPageCount());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSplit = useCallback(async () => {
    if (!file) return;

    setSplitting(true);
    setError(null);
    setResults([]);

    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const total = srcDoc.getPageCount();

      let groups: number[][];
      if (mode === "all") {
        groups = [];
        for (let i = 1; i <= total; i++) groups.push([i]);
      } else {
        if (!rangeInput.trim()) {
          throw new Error("Please enter page ranges (e.g. 1-3, 5, 7-10)");
        }
        groups = parseRanges(rangeInput, total);
      }

      const splitResults: SplitResult[] = [];

      for (let g = 0; g < groups.length; g++) {
        const pages = groups[g];
        setProgress(`Splitting part ${g + 1} of ${groups.length}...`);

        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(
          srcDoc,
          pages.map((p) => p - 1)
        );
        copiedPages.forEach((page) => newDoc.addPage(page));

        const pdfBytes = await newDoc.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

        const label =
          pages.length === 1
            ? `Page ${pages[0]}`
            : `Pages ${pages[0]}-${pages[pages.length - 1]}`;

        splitResults.push({
          label,
          blob,
          url: URL.createObjectURL(blob),
        });
      }

      setResults(splitResults);
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Split failed");
    } finally {
      setSplitting(false);
    }
  }, [file, mode, rangeInput]);

  const downloadResult = (result: SplitResult, index: number) => {
    const baseName = file?.name.replace(/\.pdf$/i, "") ?? "split";
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}_${result.label.replace(/\s+/g, "_").toLowerCase()}.pdf`;
    a.click();
  };

  const downloadAll = () => {
    results.forEach((r, i) => downloadResult(r, i));
  };

  const reset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setFile(null);
    setPageCount(0);
    setResults([]);
    setProgress("");
    setError(null);
    setRangeInput("");
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
              {loading ? (
                <p className="text-xs text-gray-400">Loading...</p>
              ) : (
                <p className="text-xs text-gray-500">
                  This PDF has {pageCount} page{pageCount !== 1 ? "s" : ""} &middot;{" "}
                  {formatBytes(file.size)}
                </p>
              )}
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {/* Options */}
          {pageCount > 0 && results.length === 0 && !splitting && (
            <div className="card p-4 space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="splitMode"
                    checked={mode === "all"}
                    onChange={() => setMode("all")}
                    className="accent-violet-600"
                  />
                  <span className="text-sm text-gray-700">
                    Split all pages{" "}
                    <span className="text-gray-400">
                      (each page becomes a separate PDF)
                    </span>
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="splitMode"
                    checked={mode === "custom"}
                    onChange={() => setMode("custom")}
                    className="accent-violet-600"
                  />
                  <span className="text-sm text-gray-700">Custom range</span>
                </label>
                {mode === "custom" && (
                  <div className="ml-6">
                    <input
                      type="text"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      placeholder="e.g. 1-3, 5, 7-10"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Separate ranges with commas. Each range creates a separate PDF.
                    </p>
                  </div>
                )}
              </div>
              <button onClick={handleSplit} className="btn-primary w-full">
                Split PDF
              </button>
            </div>
          )}

          {/* Progress */}
          {splitting && (
            <div className="card p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-violet-600" />
              <p className="mt-2 text-sm text-gray-500">{progress}</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  {results.length} PDF{results.length !== 1 ? "s" : ""} ready
                </p>
                {results.length > 1 && (
                  <button onClick={downloadAll} className="btn-primary text-sm">
                    Download All
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div
                    key={i}
                    className="card p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {r.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatBytes(r.blob.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadResult(r, i)}
                      className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={reset} className="btn-secondary w-full">
                Split Another PDF
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
