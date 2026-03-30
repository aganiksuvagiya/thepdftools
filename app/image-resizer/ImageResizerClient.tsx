"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

type OutputFormat = "png" | "jpg" | "webp";
type Status = "idle" | "done" | "error";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  originalW: number;
  originalH: number;
  resultUrl: string | null;
  resultSize: number;
  status: Status;
}

function resizeOnCanvas(
  file: File,
  targetW: number,
  targetH: number,
  format: OutputFormat,
  quality: number
): Promise<{ url: string; size: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      const mime = format === "jpg" ? "image/jpeg" : `image/${format}`;
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Resize failed"));
          resolve({ url: URL.createObjectURL(blob), size: blob.size });
        },
        mime,
        quality
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function getImageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageResizerClient() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [width, setWidth] = useState<string>("1280");
  const [height, setHeight] = useState<string>("720");
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(0.92);

  const selectedItem = items.find((i) => i.id === selectedId) ?? null;

  const handleFiles = useCallback(async (files: File[]) => {
    const newItems: ImageItem[] = [];
    for (const file of files) {
      const { w, h } = await getImageDimensions(file);
      newItems.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        originalW: w,
        originalH: h,
        resultUrl: null,
        resultSize: 0,
        status: "idle",
      });
    }
    setItems((prev) => {
      const updated = [...prev, ...newItems];
      setSelectedId((sel) => sel ?? newItems[0]?.id ?? null);
      // Auto-fill dimensions from first image
      if (!prev.length && newItems[0]) {
        setWidth(String(newItems[0].originalW));
        setHeight(String(newItems[0].originalH));
      }
      return updated;
    });
  }, []);

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (lockAspect && selectedItem && Number(val) > 0) {
      const ratio = selectedItem.originalH / selectedItem.originalW;
      setHeight(String(Math.round(Number(val) * ratio)));
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    if (lockAspect && selectedItem && Number(val) > 0) {
      const ratio = selectedItem.originalW / selectedItem.originalH;
      setWidth(String(Math.round(Number(val) * ratio)));
    }
  };

  const resizeItem = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const w = Math.max(1, Number(width));
    const h = Math.max(1, Number(height));
    try {
      const { url, size } = await resizeOnCanvas(item.file, w, h, format, quality);
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "done", resultUrl: url, resultSize: size } : i));
    } catch {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "error" } : i));
    }
  };

  const resizeAll = () => {
    items.forEach((i) => resizeItem(i.id));
  };

  const download = (item: ImageItem) => {
    if (!item.resultUrl) return;
    const a = document.createElement("a");
    a.href = item.resultUrl;
    a.download = `${item.file.name.replace(/\.[^/.]+$/, "")}_resized.${format}`;
    a.click();
  };

  const downloadAll = () => {
    items.filter((i) => i.status === "done").forEach((i) => download(i));
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      setSelectedId((sel) => (sel === id ? updated[0]?.id ?? null : sel));
      return updated;
    });
  };

  const doneCount = items.filter((i) => i.status === "done").length;

  return (
    <div className="card space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        {/* Dimensions */}
        <div className="flex items-end gap-3 flex-wrap">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              min="1"
            />
          </div>

          {/* Lock aspect ratio */}
          <button
            onClick={() => setLockAspect(!lockAspect)}
            title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
            className={`mb-0.5 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              lockAspect ? "border-brand-300 bg-brand-50 text-brand-600" : "border-gray-200 bg-white text-gray-400"
            }`}
          >
            {lockAspect ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            )}
          </button>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              min="1"
            />
          </div>

          {/* Preset sizes */}
          <div className="flex flex-wrap gap-1.5 mb-0.5">
            {[
              { label: "HD", w: 1280, h: 720 },
              { label: "FHD", w: 1920, h: 1080 },
              { label: "Square", w: 1080, h: 1080 },
              { label: "4K", w: 3840, h: 2160 },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => { setWidth(String(p.w)); setHeight(String(p.h)); setLockAspect(false); }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Format + Quality */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Format:</span>
            {(["png", "jpg", "webp"] as OutputFormat[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  format === f ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          {format !== "png" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Quality:</span>
              <input
                type="range" min="0.1" max="1" step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-24 accent-brand-600"
              />
              <span className="text-xs text-gray-500 w-8">{Math.round(quality * 100)}%</span>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Dropzone */}
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop images here"
        sublabel="JPG, PNG, WebP · Multiple files supported"
      />

      {/* Image queue */}
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {items.length} image{items.length !== 1 ? "s" : ""} · {doneCount} resized
            </p>
            <div className="flex gap-2">
              <button onClick={resizeAll} className="btn-primary text-xs px-4 py-1.5">
                Resize All
              </button>
              {doneCount > 1 && (
                <button onClick={downloadAll} className="btn-secondary text-xs px-3 py-1.5">
                  Download All
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `perspective(180px) rotateY(${x * 28}deg) rotateX(${-y * 28}deg) scale(1.12)`;
                  e.currentTarget.style.boxShadow = `${-x * 12}px ${y * 12}px 24px rgba(0,0,0,0.25)`;
                  e.currentTarget.style.zIndex = "20";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.zIndex = "";
                }}
                className={`relative group cursor-pointer rounded-xl border-2 transition-[border-color] duration-200 w-16 h-16 ${
                  selectedId === item.id ? "border-brand-500 shadow-lg shadow-brand-200" : "border-transparent"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full overflow-hidden rounded-[10px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.resultUrl ?? item.previewUrl} alt={item.file.name} className="w-full h-full object-cover bg-gray-50" />
                </div>
                {item.status === "done" && (
                  <div className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="absolute top-0.5 left-0.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
                >
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected item detail */}
      {selectedItem && (
        <div className="space-y-4 border-t border-gray-100 pt-4">
          {/* Info row */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Original: <strong className="text-gray-700">{selectedItem.originalW} × {selectedItem.originalH}px</strong> · {formatBytes(selectedItem.file.size)}</span>
            {selectedItem.status === "done" && (
              <span>Resized: <strong className="text-brand-700">{width} × {height}px</strong> · {formatBytes(selectedItem.resultSize)}</span>
            )}
          </div>

          {/* Preview */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedItem.resultUrl ?? selectedItem.previewUrl}
              alt="preview"
              className="max-h-full max-w-full object-contain"
            />
            {selectedItem.status === "done" && (
              <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
                Resized
              </div>
            )}
          </div>

          {/* Actions */}
          <button onClick={() => resizeItem(selectedItem.id)} className="btn-primary w-full">
            {selectedItem.status === "done" ? "Resize Again" : "Resize Image"}
          </button>

          {selectedItem.status === "done" && (
            <button onClick={() => download(selectedItem)} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download {format.toUpperCase()}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
