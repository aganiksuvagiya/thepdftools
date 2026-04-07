"use client";

import { useState, useCallback } from "react";
import { jsPDF } from "jspdf";
import DropZone from "@/components/DropZone";

interface ImageItem {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
}

type PageSize = "a4" | "letter" | "fit";
type Orientation = "portrait" | "landscape";
type Margin = "none" | "small" | "medium";

const MARGIN_VALUES: Record<Margin, number> = {
  none: 0,
  small: 10,
  medium: 25,
};

function loadImage(file: File): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ url, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

export default function ImageToPdfClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState<Margin>("small");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);
    const newItems: ImageItem[] = [];
    for (const file of files) {
      try {
        const { url, width, height } = await loadImage(file);
        newItems.push({ id: crypto.randomUUID(), file, url, width, height });
      } catch {
        setError("One or more images could not be loaded.");
      }
    }
    setImages((prev) => [...prev, ...newItems]);
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      let doc: jsPDF | null = null;

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const m = MARGIN_VALUES[margin];

        if (pageSize === "fit") {
          // Page sized to image (in mm, assuming 96 DPI)
          const pxToMm = 25.4 / 96;
          const pageW = img.width * pxToMm + m * 2;
          const pageH = img.height * pxToMm + m * 2;

          if (i === 0) {
            doc = new jsPDF({ unit: "mm", format: [pageW, pageH] });
          } else {
            doc!.addPage([pageW, pageH]);
          }
          doc!.addImage(img.url, "JPEG", m, m, pageW - m * 2, pageH - m * 2);
        } else {
          if (i === 0) {
            doc = new jsPDF({
              orientation,
              unit: "mm",
              format: pageSize === "a4" ? "a4" : "letter",
            });
          } else {
            doc!.addPage(pageSize === "a4" ? "a4" : "letter", orientation);
          }

          const pageW = doc!.internal.pageSize.getWidth();
          const pageH = doc!.internal.pageSize.getHeight();
          const availW = pageW - m * 2;
          const availH = pageH - m * 2;

          // Scale image to fit within available area
          const imgRatio = img.width / img.height;
          const areaRatio = availW / availH;

          let drawW: number;
          let drawH: number;
          if (imgRatio > areaRatio) {
            drawW = availW;
            drawH = availW / imgRatio;
          } else {
            drawH = availH;
            drawW = availH * imgRatio;
          }

          // Center image on page
          const x = m + (availW - drawW) / 2;
          const y = m + (availH - drawH) / 2;
          doc!.addImage(img.url, "JPEG", x, y, drawW, drawH);
        }
      }

      doc!.save("images.pdf");
    } catch {
      setError("Conversion failed. Please try again with different images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        multiple
        label="Drop your images here"
        sublabel="JPG, PNG, or WebP · Multiple files allowed"
      />

      {images.length > 0 && (
        <>
          {/* Image list */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              {images.length} image{images.length !== 1 && "s"} added
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={`Image ${idx + 1}`}
                    className="h-28 w-full object-contain p-1"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => moveImage(idx, -1)}
                      disabled={idx === 0}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-gray-700 shadow transition hover:bg-white disabled:opacity-30"
                      title="Move up"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveImage(idx, 1)}
                      disabled={idx === images.length - 1}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-gray-700 shadow transition hover:bg-white disabled:opacity-30"
                      title="Move down"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white shadow transition hover:bg-red-600"
                      title="Remove"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-2 py-1.5 text-center text-[11px] font-medium text-gray-500 truncate">
                    {idx + 1}. {img.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PageSize)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="fit">Fit to Image</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Orientation</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as Orientation)}
                disabled={pageSize === "fit"}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 disabled:opacity-50"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Margin</label>
              <select
                value={margin}
                onChange={(e) => setMargin(e.target.value as Margin)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>

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
              "Convert to PDF"
            )}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
