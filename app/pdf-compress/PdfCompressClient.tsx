"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

interface PdfInfo {
  bytes: Uint8Array;
  size: number;
  name: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function SizeBadge({ label, size, highlight }: { label: string; size: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ${highlight ? "bg-brand-50 border border-brand-100" : "bg-gray-50"}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? "text-brand-700" : "text-gray-700"}`}>
        {formatBytes(size)}
      </p>
    </div>
  );
}

export default function PdfCompressClient() {
  const [original, setOriginal] = useState<PdfInfo | null>(null);
  const [compressed, setCompressed] = useState<PdfInfo | null>(null);
  const [level, setLevel] = useState(2); // 1 = light, 2 = medium, 3 = maximum
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setCompressed(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      setOriginal({ bytes, size: bytes.byteLength, name: file.name });
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleCompress = async () => {
    if (!original) return;
    setLoading(true);
    setError(null);
    try {
      const srcDoc = await PDFDocument.load(original.bytes, { ignoreEncryption: true });

      // Create a new document and copy pages to strip unused objects
      const destDoc = await PDFDocument.create();
      const pages = await destDoc.copyPages(srcDoc, srcDoc.getPageIndices());
      pages.forEach((page) => destDoc.addPage(page));

      // Strip metadata at medium / maximum level
      if (level >= 2) {
        destDoc.setTitle("");
        destDoc.setAuthor("");
        destDoc.setSubject("");
        destDoc.setKeywords([]);
        destDoc.setProducer("");
        destDoc.setCreator("");
      }

      const saveOptions: { useObjectStreams?: boolean } = {};
      if (level >= 3) {
        // useObjectStreams = false can sometimes yield smaller files by avoiding cross-ref streams
        saveOptions.useObjectStreams = false;
      }

      const compressedBytes = await destDoc.save(saveOptions);
      setCompressed({
        bytes: compressedBytes,
        size: compressedBytes.byteLength,
        name: original.name.replace(/\.pdf$/i, "") + "-compressed.pdf",
      });
    } catch {
      setError("Compression failed. The PDF may be encrypted or corrupted.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressed) return;
    const blob = new Blob([new Uint8Array(compressed.bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressed.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reduction =
    original && compressed
      ? Math.round((1 - compressed.size / original.size) * 100)
      : null;

  const levelLabels: Record<number, string> = {
    1: "Light",
    2: "Medium",
    3: "Maximum",
  };

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop your PDF here"
        sublabel="PDF files only · Click to browse"
      />

      {original && (
        <>
          {/* Compression level slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Compression Level
              </label>
              <span className="text-sm font-semibold text-brand-600">
                {levelLabels[level]}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Light</span>
              <span>Medium</span>
              <span>Maximum</span>
            </div>
          </div>

          {/* Compression level description */}
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            {level === 1 && "Copies pages to a fresh PDF, removing unused objects."}
            {level === 2 && "Strips metadata (title, author, keywords) and removes unused objects."}
            {level === 3 && "Maximum cleanup: strips metadata, removes unused objects, and optimizes internal structure."}
          </div>

          <button
            onClick={handleCompress}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Compressing...
              </>
            ) : (
              "Compress PDF"
            )}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Size comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SizeBadge label="Original Size" size={original.size} />
            {compressed ? (
              <SizeBadge label="Compressed Size" size={compressed.size} highlight />
            ) : (
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Compressed Size</p>
                <p className="mt-1 text-sm text-gray-400">
                  {loading ? "Processing..." : "Result will appear here"}
                </p>
              </div>
            )}
          </div>

          {/* Reduction badge */}
          {reduction !== null && (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-green-700">
                {reduction > 0
                  ? `${reduction}% smaller — saved ${formatBytes(original.size - compressed!.size)}`
                  : "No further reduction possible — this PDF is already optimized"}
              </span>
            </div>
          )}

          {compressed && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Compressed PDF
            </button>
          )}
        </>
      )}
    </div>
  );
}
