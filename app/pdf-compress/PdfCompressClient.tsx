"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import {
  RASTER_LADDER,
  RASTER_LEVELS,
  smartCompress,
  rasterCompress,
  type CompressLevel,
} from "@/lib/pdf-compress-engine";

interface PdfInfo {
  bytes: Uint8Array;
  size: number;
  name: string;
  method?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function SizeBadge({
  label,
  size,
  highlight,
}: {
  label: string;
  size: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight
          ? "bg-brand-50 border border-brand-100"
          : "bg-gray-50"
      }`}
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-bold ${
          highlight ? "text-brand-700" : "text-gray-700"
        }`}
      >
        {formatBytes(size)}
      </p>
    </div>
  );
}

const LEVEL_CONFIG: Record<CompressLevel, { label: string; desc: string }> = {
  1: { label: "Light", desc: "Slight compression: embedded images are re-encoded at high quality. Text stays sharp." },
  2: { label: "Medium", desc: "Balanced compression: images are downscaled and re-encoded. Text stays selectable." },
  3: { label: "Maximum", desc: "Aggressive compression: smallest images, reduced picture quality. Text stays selectable." },
};

export default function PdfCompressClient({ targetKB }: { targetKB?: number } = {}) {
  const [original, setOriginal] = useState<PdfInfo | null>(null);
  const [compressed, setCompressed] = useState<PdfInfo | null>(null);
  const [level, setLevel] = useState<CompressLevel>(2);
  const [flatten, setFlatten] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [noGain, setNoGain] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetBytes = targetKB ? targetKB * 1024 : 0;

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setCompressed(null);
    setNoGain(false);
    setError(null);
    setProgress(0);
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
    setProgress(0);
    setCompressed(null);
    setNoGain(false);

    // Best candidate found so far (always smaller than the original, otherwise it is discarded).
    let best: { bytes: Uint8Array; method: string } | null = null;
    const consider = (bytes: Uint8Array, method: string) => {
      if (bytes.byteLength < original.size && (!best || bytes.byteLength < best.bytes.byteLength)) {
        best = { bytes, method };
      }
    };
    const reached = () => !!best && !!targetBytes && best.bytes.byteLength <= targetBytes;

    try {
      // 1) Smart pass: keeps text, links and forms, only shrinks embedded images.
      const smartLevels: CompressLevel[] = targetBytes
        ? ([1, 2, 3] as CompressLevel[]).filter((l) => l >= level)
        : [level];
      for (const lvl of smartLevels) {
        setStage(`Optimizing images (${LEVEL_CONFIG[lvl].label})...`);
        setProgress(0);
        const smart = await smartCompress(original.bytes, lvl, setProgress);
        consider(
          smart.bytes,
          smart.imagesTotal > 0
            ? `Re-encoded ${smart.imagesShrunk} of ${smart.imagesTotal} embedded images. Text is still selectable.`
            : "Rebuilt the PDF structure. Text is still selectable."
        );
        if (reached()) break;
      }

      // 2) Flatten pass: only when asked for, or when a size target was not reached.
      if ((flatten || targetBytes) && !reached()) {
        const steps = targetBytes ? [RASTER_LEVELS[level], ...RASTER_LADDER] : [RASTER_LEVELS[level]];
        for (let i = 0; i < steps.length; i++) {
          setStage(
            steps.length > 1 ? `Converting pages to images (attempt ${i + 1} of ${steps.length})...` : "Converting pages to images..."
          );
          setProgress(0);
          const flat = await rasterCompress(original.bytes, steps[i].scale, steps[i].quality, setProgress);
          consider(flat, "Pages were converted to images. Text is no longer selectable.");
          if (reached() || !targetBytes) break;
        }
      }

      if (best) {
        const found = best as { bytes: Uint8Array; method: string };
        setCompressed({
          bytes: found.bytes,
          size: found.bytes.byteLength,
          name: original.name.replace(/\.pdf$/i, "") + "-compressed.pdf",
          method: found.method,
        });
      } else {
        setNoGain(true);
      }
    } catch (err) {
      console.error("PDF compression error:", err);
      setError(`Compression failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
      setStage("");
    }
  };

  const handleDownload = () => {
    if (!compressed) return;
    const blob = new Blob([compressed.bytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressed.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const reduction =
    original && compressed
      ? Math.round((1 - compressed.size / original.size) * 100)
      : null;

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
                {LEVEL_CONFIG[level].label}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={level}
              onChange={(e) => {
                setLevel(parseInt(e.target.value) as CompressLevel);
                setCompressed(null);
                setNoGain(false);
              }}
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
            {LEVEL_CONFIG[level].desc}
          </div>

          {targetKB ? (
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
              Target: under <strong>{targetKB} KB</strong>. The tool starts by shrinking embedded images and keeps text
              selectable. If that is not enough, it converts pages to images step by step until the target is reached.
            </div>
          ) : (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={flatten}
                onChange={(e) => {
                  setFlatten(e.target.checked);
                  setCompressed(null);
                  setNoGain(false);
                }}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600"
              />
              <span>
                <span className="font-medium">Convert pages to images (scanned PDFs)</span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  Gives the smallest file for scans and photo-only PDFs. Text, links and forms are lost, so leave this off
                  for resumes, contracts and fillable forms.
                </span>
              </span>
            </label>
          )}

          <button
            onClick={handleCompress}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {stage || "Compressing..."} {progress}%
              </>
            ) : (
              "Compress PDF"
            )}
          </button>

          {/* Progress bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Size comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SizeBadge label="Original Size" size={original.size} />
            {compressed ? (
              <SizeBadge
                label="Compressed Size"
                size={compressed.size}
                highlight
              />
            ) : (
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Compressed Size
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {loading ? `Processing... ${progress}%` : "Result will appear here"}
                </p>
              </div>
            )}
          </div>

          {/* Result summary */}
          {noGain && (
            <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-sm font-medium text-yellow-800">
              No smaller version could be made. This PDF is already well optimized
              {flatten || targetKB ? "." : ", or it is mostly text. For a scanned PDF, tick “Convert pages to images” and try again."}
              {" "}Your original file is unchanged.
            </div>
          )}

          {reduction !== null && compressed && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-green-700">
                  {reduction}% smaller — saved {formatBytes(original.size - compressed.size)}
                </span>
              </div>
              {compressed.method && <p className="text-center text-xs text-gray-500">{compressed.method}</p>}
              {targetBytes > 0 && compressed.size > targetBytes && (
                <p className="rounded-lg bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
                  The smallest result is {formatBytes(compressed.size)}, which is still above {targetKB} KB. Try removing
                  pages with the PDF Split tool first.
                </p>
              )}
            </div>
          )}

          {compressed && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Compressed PDF
            </button>
          )}
        </>
      )}
    </div>
  );
}
