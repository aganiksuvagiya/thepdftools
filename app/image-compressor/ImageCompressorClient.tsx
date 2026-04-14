"use client";

import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import DropZone from "@/components/DropZone";

interface ImageInfo {
  file: File;
  url: string;
  size: number;
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

export default function ImageCompressorClient() {
  const [original, setOriginal] = useState<ImageInfo | null>(null);
  const [compressed, setCompressed] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(0.8);
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
      const options = {
        maxSizeMB: 10,
        useWebWorker: true,
        initialQuality: quality,
        onProgress: () => {},
      };
      const compressedFile = await imageCompression(original.file, options);
      const url = URL.createObjectURL(compressedFile);
      setCompressed({ file: compressedFile, url, size: compressedFile.size });
    } catch {
      setError("Compression failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressed) return;
    const ext = original?.file.name.split(".").pop() || "jpg";
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed.${ext}`;
    a.click();
  };

  const reduction =
    original && compressed
      ? Math.round((1 - compressed.size / original.size) * 100)
      : null;

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
          {/* Quality slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Quality
              </label>
              <span className="text-sm font-semibold text-brand-600">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Smallest file</span>
              <span>Best quality</span>
            </div>
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
              "Compress Image"
            )}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Preview + stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Original</p>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={original.url}
                  alt="original image before online compression"
                  className="w-full object-contain max-h-48 bg-gray-50"
                />
              </div>
              <SizeBadge label="Size" size={original.size} />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Compressed</p>
              <div className="overflow-hidden rounded-xl border border-gray-100 min-h-[12rem] flex items-center justify-center bg-gray-50">
                {compressed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={compressed.url}
                    alt="compressed image online free no upload"
                    className="w-full object-contain max-h-48"
                  />
                ) : (
                  <p className="text-sm text-gray-400">
                    {loading ? "Processing..." : "Result will appear here"}
                  </p>
                )}
              </div>
              {compressed && <SizeBadge label="Compressed" size={compressed.size} highlight />}
            </div>
          </div>

          {/* Reduction badge */}
          {reduction !== null && (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-green-700">
                {reduction}% smaller — saved{" "}
                {formatBytes((original?.size ?? 0) - (compressed?.size ?? 0))}
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
