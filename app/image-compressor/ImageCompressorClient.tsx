"use client";

import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import DropZone from "@/components/DropZone";

type OutputFormat = "original" | "jpeg" | "png" | "webp";
type Mode = "quality" | "target";

interface ImageInfo { file: File; url: string; size: number; }

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024, sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function SizeBadge({ label, size, highlight }: { label: string; size: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ${highlight ? "bg-brand-50 border border-brand-100" : "bg-gray-50"}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? "text-brand-700" : "text-gray-700"}`}>{formatBytes(size)}</p>
    </div>
  );
}

export default function ImageCompressorClient() {
  const [original, setOriginal] = useState<ImageInfo | null>(null);
  const [compressed, setCompressed] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [mode, setMode] = useState<Mode>("quality");
  const [targetKb, setTargetKb] = useState(100);
  const [maxWidth, setMaxWidth] = useState<number | "">(1920);
  const [maxHeight, setMaxHeight] = useState<number | "">(1080);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setOriginal({ file, url: URL.createObjectURL(file), size: file.size });
    setCompressed(null);
    setError(null);
  }, []);

  const handleCompress = async () => {
    if (!original) return;
    setLoading(true);
    setError(null);
    try {
      const mimeMap: Record<OutputFormat, string | undefined> = {
        original: undefined,
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
      };
      const fileType = mimeMap[outputFormat];

      const options: Parameters<typeof imageCompression>[1] = {
        useWebWorker: true,
        maxWidthOrHeight: Math.max(Number(maxWidth) || 9999, Number(maxHeight) || 9999),
        ...(maxWidth ? { maxWidth: Number(maxWidth) } : {}),
        ...(maxHeight ? { maxHeight: Number(maxHeight) } : {}),
        ...(fileType ? { fileType } : {}),
        ...(mode === "quality"
          ? { initialQuality: quality }
          : { maxSizeMB: targetKb / 1024, initialQuality: 0.9 }),
        onProgress: () => {},
      };

      const compressedFile = await imageCompression(original.file, options);
      setCompressed({ file: compressedFile, url: URL.createObjectURL(compressedFile), size: compressedFile.size });
    } catch {
      setError("Compression failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressed) return;
    const extMap: Record<OutputFormat, string> = { original: original?.file.name.split(".").pop() || "jpg", jpeg: "jpg", png: "png", webp: "webp" };
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed.${extMap[outputFormat]}`;
    a.click();
  };

  const reduction = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : null;

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop your image here"
        sublabel="JPG, PNG, or WebP · Click to browse"
      />

      {original && (
        <>
          {/* Mode toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Compression Mode</label>
            <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 w-fit">
              {(["quality", "target"] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-all ${mode === m ? "bg-white text-brand-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {m === "quality" ? "Quality" : "Target Size"}
                </button>
              ))}
            </div>
          </div>

          {mode === "quality" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Quality</label>
                <span className="text-sm font-semibold text-brand-600">{Math.round(quality * 100)}%</span>
              </div>
              <input type="range" min={0.1} max={1} step={0.05} value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600" />
              <div className="flex justify-between text-xs text-gray-400"><span>Smallest</span><span>Best quality</span></div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Target file size</label>
              <div className="flex items-center gap-3">
                <input type="range" min={10} max={2000} step={10} value={targetKb}
                  onChange={(e) => setTargetKb(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-brand-600" />
                <div className="flex items-center gap-1">
                  <input type="number" min={10} max={10000} value={targetKb}
                    onChange={(e) => setTargetKb(Math.max(10, Number(e.target.value)))}
                    className="w-20 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-center text-sm outline-none focus:border-brand-300" />
                  <span className="text-sm text-gray-500">KB</span>
                </div>
              </div>
            </div>
          )}

          {/* Resize + Format */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Max Dimensions</label>
              <div className="flex items-center gap-2">
                <input type="number" min={1} value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Width px"
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100" />
                <span className="text-gray-400 text-xs">×</span>
                <input type="number" min={1} value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Height px"
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100" />
              </div>
              <p className="text-xs text-gray-400">Leave blank to keep original size</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Output Format</label>
              <div className="flex flex-wrap gap-1">
                {(["original", "jpeg", "png", "webp"] as OutputFormat[]).map((f) => (
                  <button key={f} onClick={() => setOutputFormat(f)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase border transition-all ${outputFormat === f ? "bg-brand-600 text-white border-brand-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">WebP gives smallest file size</p>
            </div>
          </div>

          <button onClick={handleCompress} disabled={loading} className="btn-primary w-full">
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Compressing...
              </>
            ) : "Compress Image"}
          </button>

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {/* Preview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Original</p>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={original.url} alt="original" className="w-full object-contain max-h-48 bg-gray-50" />
              </div>
              <SizeBadge label="Size" size={original.size} />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Compressed</p>
              <div className="overflow-hidden rounded-xl border border-gray-100 min-h-[12rem] flex items-center justify-center bg-gray-50">
                {compressed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={compressed.url} alt="compressed" className="w-full object-contain max-h-48" />
                ) : (
                  <p className="text-sm text-gray-400">{loading ? "Processing..." : "Result will appear here"}</p>
                )}
              </div>
              {compressed && <SizeBadge label="Compressed" size={compressed.size} highlight />}
            </div>
          </div>

          {reduction !== null && (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-green-700">
                {reduction}% smaller — saved {formatBytes((original?.size ?? 0) - (compressed?.size ?? 0))}
              </span>
            </div>
          )}

          {compressed && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Compressed Image
            </button>
          )}
        </>
      )}
    </div>
  );
}
