"use client";

import { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

interface PageItem {
  originalIndex: number;
  id: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfOrganizeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      const count = doc.getPageCount();
      setPages(
        Array.from({ length: count }, (_, i) => ({
          originalIndex: i,
          id: `page-${i}`,
        }))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const moveUp = (index: number) => {
    if (index === 0) return;
    setPages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    setPages((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  };

  const deletePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExport = useCallback(async () => {
    if (!file || pages.length === 0) return;

    setProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(
        srcDoc,
        pages.map((p) => p.originalIndex)
      );
      copied.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setResult({ blob, url: URL.createObjectURL(blob) });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save PDF");
    } finally {
      setProcessing(false);
    }
  }, [file, pages]);

  const download = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}_organized.pdf`;
    a.click();
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setPages([]);
    setResult(null);
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
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              {loading ? (
                <p className="text-xs text-gray-400">Loading...</p>
              ) : (
                <p className="text-xs text-gray-500">
                  {pages.length} page{pages.length !== 1 ? "s" : ""} &middot;{" "}
                  {formatBytes(file.size)}
                </p>
              )}
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {!loading && !result && pages.length > 0 && (
            <div className="card p-4 space-y-3">
              <p className="text-xs text-gray-500">
                Use the arrows to reorder pages, or remove pages you don&apos;t
                need. Then export your organized PDF.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {pages.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3"
                  >
                    <span className="text-xs font-semibold text-gray-500">
                      Position {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Original page {p.originalIndex + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 disabled:opacity-30"
                        aria-label="Move page up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(i)}
                        disabled={i === pages.length - 1}
                        className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 disabled:opacity-30"
                        aria-label="Move page down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePage(i)}
                        className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                        aria-label="Remove page"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {pages.length === 0 && (
                <p className="text-sm text-red-600">
                  All pages removed — keep at least one page to export.
                </p>
              )}
              <button
                onClick={handleExport}
                disabled={pages.length === 0 || processing}
                className="btn-primary w-full disabled:opacity-50"
              >
                {processing ? "Saving..." : "Export PDF"}
              </button>
            </div>
          )}

          {result && (
            <div className="card p-4 space-y-3 text-center">
              <p className="text-sm font-medium text-gray-700">
                Your organized PDF is ready ({pages.length} page
                {pages.length !== 1 ? "s" : ""}, {formatBytes(result.blob.size)})
              </p>
              <div className="flex gap-2">
                <button onClick={download} className="btn-primary flex-1">
                  Download
                </button>
                <button onClick={reset} className="btn-secondary flex-1">
                  Start Over
                </button>
              </div>
            </div>
          )}

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
