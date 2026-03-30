"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

interface ConvertedResult {
  url: string;
  originalSize: number;
  webpSize: number;
  name: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function ImageToWebpClient() {
  const [preview, setPreview] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConvertedResult | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setOriginalFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }, []);

  const handleConvert = () => {
    if (!originalFile || !preview) return;
    setLoading(true);
    setError(null);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas not supported in this browser.");
        setLoading(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Conversion failed. Please try again.");
            setLoading(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
          setResult({
            url,
            originalSize: originalFile.size,
            webpSize: blob.size,
            name: `${baseName}.webp`,
          });
          setLoading(false);
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => {
      setError("Failed to load image. Please try another file.");
      setLoading(false);
    };
    img.src = preview;
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  const reduction =
    result
      ? Math.round((1 - result.webpSize / result.originalSize) * 100)
      : null;

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp", ".bmp"] }}
        label="Drop your image here"
        sublabel="JPG, PNG, WebP, or BMP · Click to browse"
      />

      {preview && (
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Original</p>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Original image"
                  className="w-full object-contain max-h-48 bg-gray-50"
                />
              </div>
              {originalFile && (
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-xs text-gray-500">File size</p>
                  <p className="font-semibold text-gray-700">{formatBytes(originalFile.size)}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Converted (WebP)</p>
              <div className="min-h-[12rem] overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50">
                {result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.url}
                    alt="Converted WebP"
                    className="w-full object-contain max-h-48 animate-fade-in"
                  />
                ) : (
                  <p className="text-sm text-gray-400">
                    {loading ? "Converting..." : "WebP preview will appear here"}
                  </p>
                )}
              </div>
              {result && (
                <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-center">
                  <p className="text-xs text-brand-600">WebP size</p>
                  <p className="font-semibold text-brand-700">{formatBytes(result.webpSize)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Reduction badge */}
          {reduction !== null && (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-green-700">
                {reduction > 0
                  ? `${reduction}% smaller — saved ${formatBytes(result!.originalSize - result!.webpSize)}`
                  : `File is ${Math.abs(reduction)}% larger in WebP format`}
              </span>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

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
              "Convert to WebP"
            )}
          </button>

          {result && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download {result.name}
            </button>
          )}
        </>
      )}
    </div>
  );
}
