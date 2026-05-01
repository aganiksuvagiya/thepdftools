"use client";

import { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import DropZone from "@/components/DropZone";

type RotationAngle = 90 | 180 | 270;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [mode, setMode] = useState<"all" | "custom">("all");
  const [pageInput, setPageInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setResultUrl(null);
    try {
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      setPageCount(doc.getPageCount());
    } catch {
      setError("Failed to load PDF. Make sure it is a valid PDF file.");
    }
  }, []);

  const handleRotate = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const total = doc.getPageCount();

      let pageIndices: number[] = [];
      if (mode === "all") {
        pageIndices = Array.from({ length: total }, (_, i) => i);
      } else {
        const parts = pageInput.split(",").map((s) => s.trim()).filter(Boolean);
        for (const part of parts) {
          if (part.includes("-")) {
            const [a, b] = part.split("-").map(Number);
            if (isNaN(a) || isNaN(b) || a < 1 || b > total || a > b) throw new Error(`Invalid range: ${part}`);
            for (let i = a; i <= b; i++) pageIndices.push(i - 1);
          } else {
            const n = Number(part);
            if (isNaN(n) || n < 1 || n > total) throw new Error(`Invalid page: ${part}`);
            pageIndices.push(n - 1);
          }
        }
        if (pageIndices.length === 0) throw new Error("Enter at least one page number.");
      }

      for (const idx of pageIndices) {
        const page = doc.getPage(idx);
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      }

      const pdfBytes = await doc.save();
      const pdfOutput = Uint8Array.from(pdfBytes);
      const blob = new Blob([pdfOutput], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Rotation failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, mode, angle, pageInput]);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPageCount(0);
    setResultUrl(null);
    setError(null);
    setPageInput("");
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
              <p className="text-xs text-gray-500">{pageCount} page{pageCount !== 1 ? "s" : ""} · {formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">Change file</button>
          </div>

          {!resultUrl && (
            <div className="card p-5 space-y-5">
              {/* Rotation angle */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Rotation angle</p>
                <div className="flex gap-3">
                  {([90, 180, 270] as RotationAngle[]).map((a) => (
                    <button
                      key={a}
                      onClick={() => setAngle(a)}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                        angle === a
                          ? "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-gray-200 text-gray-600 hover:border-violet-300"
                      }`}
                    >
                      {a}° {a === 90 ? "↻" : a === 180 ? "↕" : "↺"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pages */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Which pages?</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={mode === "all"} onChange={() => setMode("all")} className="accent-violet-600" />
                    <span className="text-sm text-gray-700">All pages</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={mode === "custom"} onChange={() => setMode("custom")} className="accent-violet-600" />
                    <span className="text-sm text-gray-700">Specific pages</span>
                  </label>
                  {mode === "custom" && (
                    <input
                      type="text"
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      placeholder="e.g. 1, 3, 5-8"
                      className="ml-6 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  )}
                </div>
              </div>

              <button onClick={handleRotate} disabled={processing} className="btn-primary w-full">
                {processing ? "Rotating…" : "Rotate PDF"}
              </button>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ PDF rotated successfully</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a
                href={resultUrl}
                download={file.name.replace(/\.pdf$/i, "") + "_rotated.pdf"}
                className="btn-primary inline-block"
              >
                Download Rotated PDF
              </a>
              <div>
                <button onClick={reset} className="btn-secondary text-sm">Rotate Another PDF</button>
              </div>
            </div>
          )}

          {error && (
            <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
          )}
        </>
      )}
    </div>
  );
}
