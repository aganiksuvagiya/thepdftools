"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfUnlockClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [unlocking, setUnlocking] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [isProtected, setIsProtected] = useState(false);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setResultUrl(null);
    setPageCount(0);
    setIsProtected(false);
    setStatus("Checking PDF...");

    try {
      const buffer = await f.arrayBuffer();

      // Try loading without ignoring encryption to detect if it's protected
      try {
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: false });
        setPageCount(doc.getPageCount());
        setIsProtected(false);
        setStatus(
          "This PDF does not appear to have restrictions. You can still re-save it as a clean copy."
        );
      } catch {
        // PDF has encryption — it can be handled with ignoreEncryption
        setIsProtected(true);
        setStatus(
          "PDF loaded — this file has restrictions. Click Unlock to remove them."
        );

        // Load with ignoreEncryption just to get page count
        try {
          const doc = await PDFDocument.load(buffer, {
            ignoreEncryption: true,
          });
          setPageCount(doc.getPageCount());
        } catch {
          // Can still proceed, page count just won't show
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
      setStatus("");
    }
  }, []);

  const handleUnlock = useCallback(async () => {
    if (!file) return;

    setUnlocking(true);
    setError(null);
    setResultUrl(null);
    setStatus("Removing restrictions...");

    try {
      const buffer = await file.arrayBuffer();

      const doc = await PDFDocument.load(buffer, {
        ignoreEncryption: true,
      });

      setPageCount(doc.getPageCount());
      setStatus("Saving unlocked PDF...");

      const pdfBytes = await doc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });

      setResultSize(blob.size);
      setResultUrl(URL.createObjectURL(blob));
      setStatus("PDF unlocked successfully!");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to unlock PDF. The file may use unsupported encryption."
      );
      setStatus("");
    } finally {
      setUnlocking(false);
    }
  }, [file]);

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}_unlocked.pdf`;
    a.click();
  };

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPageCount(0);
    setStatus("");
    setError(null);
    setResultUrl(null);
    setResultSize(0);
    setIsProtected(false);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFile}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your restricted PDF here"
          sublabel="or click to browse"
        />
      ) : (
        <>
          {/* File info */}
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">
                {formatBytes(file.size)}
                {pageCount > 0 && (
                  <>
                    {" "}
                    &middot; {pageCount} page{pageCount !== 1 ? "s" : ""}
                  </>
                )}
                {isProtected && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Restricted
                  </span>
                )}
              </p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {/* Unlock button */}
          {!resultUrl && !unlocking && (
            <div className="card p-4 space-y-4">
              <p className="text-sm text-gray-600">{status}</p>
              <p className="text-xs text-gray-400">
                Everything runs in your browser — your file is never uploaded to
                any server.
              </p>
              <button onClick={handleUnlock} className="btn-primary w-full">
                Unlock PDF
              </button>
            </div>
          )}

          {/* Progress */}
          {unlocking && (
            <div className="card p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-violet-600" />
              <p className="mt-2 text-sm text-gray-500">{status}</p>
            </div>
          )}

          {/* Result */}
          {resultUrl && (
            <div className="space-y-4">
              <div className="card border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">{status}</p>
                <p className="mt-1 text-xs text-green-600">
                  {pageCount} page{pageCount !== 1 ? "s" : ""} &middot;{" "}
                  {formatBytes(resultSize)}
                </p>
              </div>
              <button onClick={handleDownload} className="btn-primary w-full">
                Download Unlocked PDF
              </button>
              <button onClick={reset} className="btn-secondary w-full">
                Unlock Another PDF
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
