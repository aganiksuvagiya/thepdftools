"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

interface ImageData {
  file: File;
  url: string;
  width: number;
  height: number;
}

export default function ImageUpscalerClient() {
  const [original, setOriginal] = useState<ImageData | null>(null);
  const [upscaled, setUpscaled] = useState<{ url: string; width: number; height: number } | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setUpscaled(null);
    setError(null);

    const img = new Image();
    img.onload = () => {
      setOriginal({
        file,
        url: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      setError("Could not load the image. Please try another file.");
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleUpscale = async () => {
    if (!original) return;
    setLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = original.url;
      });

      const newWidth = original.width * scale;
      const newHeight = original.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0)
      );

      if (!blob) throw new Error("Failed to create image");

      const url = URL.createObjectURL(blob);
      setUpscaled({ url, width: newWidth, height: newHeight });
    } catch {
      setError("Upscaling failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!upscaled || !original) return;
    const baseName = original.file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = upscaled.url;
    a.download = `${baseName}-${scale}x-upscaled.png`;
    a.click();
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop your image here"
        sublabel="JPG, PNG, or WebP · Click to browse"
      />

      {original && (
        <>
          {/* Scale selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Scale Factor
            </label>
            <div className="flex gap-3">
              {[2, 3, 4].map((s) => (
                <label
                  key={s}
                  className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                    scale === s
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="scale"
                    value={s}
                    checked={scale === s}
                    onChange={() => {
                      setScale(s);
                      setUpscaled(null);
                    }}
                    className="sr-only"
                  />
                  <span className="text-lg font-bold">{s}x</span>
                  <span className="block text-xs mt-1">
                    {original.width * s} x {original.height * s}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpscale}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Upscaling...
              </>
            ) : (
              `Upscale ${scale}x`
            )}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Before / After comparison */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Original</p>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={original.url}
                  alt="Original"
                  className="w-full object-contain max-h-48 bg-gray-50"
                />
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dimensions</p>
                <p className="mt-1 text-sm font-bold text-gray-700">
                  {original.width} x {original.height}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Upscaled</p>
              <div className="overflow-hidden rounded-xl border border-gray-100 min-h-[12rem] flex items-center justify-center bg-gray-50">
                {upscaled ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={upscaled.url}
                    alt="Upscaled"
                    className="w-full object-contain max-h-48"
                  />
                ) : (
                  <p className="text-sm text-gray-400">
                    {loading ? "Processing..." : "Result will appear here"}
                  </p>
                )}
              </div>
              {upscaled && (
                <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 text-center">
                  <p className="text-xs font-medium text-violet-500 uppercase tracking-wide">Dimensions</p>
                  <p className="mt-1 text-sm font-bold text-violet-700">
                    {upscaled.width} x {upscaled.height}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dimension summary */}
          {upscaled && (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-green-700">
                Original: {original.width}x{original.height} → Upscaled: {upscaled.width}x{upscaled.height}
              </span>
            </div>
          )}

          {upscaled && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Upscaled Image
            </button>
          )}
        </>
      )}
    </div>
  );
}
