"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/DropZone";

type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16";

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type DragMode = "move" | "nw" | "ne" | "sw" | "se" | null;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getAspectValue(ratio: AspectRatio): number | null {
  switch (ratio) {
    case "1:1": return 1;
    case "4:3": return 4 / 3;
    case "16:9": return 16 / 9;
    case "3:2": return 3 / 2;
    case "9:16": return 9 / 16;
    default: return null;
  }
}

export default function ImageCropperClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [naturalW, setNaturalW] = useState(0);
  const [naturalH, setNaturalH] = useState(0);
  const [displayW, setDisplayW] = useState(0);
  const [displayH, setDisplayH] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragMode = useRef<DragMode>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const cropStart = useRef<CropRect>({ x: 0, y: 0, w: 0, h: 0 });

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setResultSize(0);
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
  }, [resultUrl]);

  const handleImageLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    setNaturalW(nw);
    setNaturalH(nh);

    const dw = img.clientWidth;
    const dh = img.clientHeight;
    setDisplayW(dw);
    setDisplayH(dh);

    // Initialize crop to full image
    setCrop({ x: 0, y: 0, w: dw, h: dh });
    setAspectRatio("free");
  }, []);

  // Recalculate display dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      const img = imgRef.current;
      if (!img || !naturalW) return;
      const oldDw = displayW || 1;
      const newDw = img.clientWidth;
      const newDh = img.clientHeight;
      const scale = newDw / oldDw;
      setDisplayW(newDw);
      setDisplayH(newDh);
      setCrop((prev) => ({
        x: Math.min(prev.x * scale, newDw),
        y: Math.min(prev.y * scale, newDh),
        w: Math.min(prev.w * scale, newDw),
        h: Math.min(prev.h * scale, newDh),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [naturalW, displayW, displayH]);

  // Clamp crop rect within bounds
  const clamp = useCallback(
    (rect: CropRect): CropRect => {
      let { x, y, w, h } = rect;
      w = Math.max(20, Math.min(w, displayW));
      h = Math.max(20, Math.min(h, displayH));
      x = Math.max(0, Math.min(x, displayW - w));
      y = Math.max(0, Math.min(y, displayH - h));
      return { x, y, w, h };
    },
    [displayW, displayH]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, mode: DragMode) => {
      e.preventDefault();
      e.stopPropagation();
      dragMode.current = mode;
      dragStart.current = { x: e.clientX, y: e.clientY };
      cropStart.current = { ...crop };
    },
    [crop]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragMode.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const s = cropStart.current;
      const ar = getAspectValue(aspectRatio);

      let next: CropRect;

      if (dragMode.current === "move") {
        next = clamp({ x: s.x + dx, y: s.y + dy, w: s.w, h: s.h });
      } else {
        let nx = s.x, ny = s.y, nw = s.w, nh = s.h;

        if (dragMode.current === "se") {
          nw = Math.max(20, s.w + dx);
          nh = ar ? nw / ar : Math.max(20, s.h + dy);
        } else if (dragMode.current === "sw") {
          nw = Math.max(20, s.w - dx);
          nh = ar ? nw / ar : Math.max(20, s.h + dy);
          nx = s.x + s.w - nw;
        } else if (dragMode.current === "ne") {
          nw = Math.max(20, s.w + dx);
          nh = ar ? nw / ar : Math.max(20, s.h - dy);
          ny = s.y + s.h - nh;
        } else if (dragMode.current === "nw") {
          nw = Math.max(20, s.w - dx);
          nh = ar ? nw / ar : Math.max(20, s.h - dy);
          nx = s.x + s.w - nw;
          ny = s.y + s.h - nh;
        }

        next = clamp({ x: nx, y: ny, w: nw, h: nh });
      }

      setCrop(next);
    };

    const handleMouseUp = () => {
      dragMode.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [aspectRatio, clamp]);

  const applyAspectRatio = useCallback(
    (ratio: AspectRatio) => {
      setAspectRatio(ratio);
      const ar = getAspectValue(ratio);
      if (!ar || !displayW || !displayH) return;

      // Fit the largest crop rect with this ratio centered in the image
      let newW = displayW;
      let newH = newW / ar;
      if (newH > displayH) {
        newH = displayH;
        newW = newH * ar;
      }
      setCrop(
        clamp({
          x: (displayW - newW) / 2,
          y: (displayH - newH) / 2,
          w: newW,
          h: newH,
        })
      );
    },
    [displayW, displayH, clamp]
  );

  const doCrop = useCallback(() => {
    if (!file || !displayW || !naturalW) return;
    const scale = naturalW / displayW;
    const sx = crop.x * scale;
    const sy = crop.y * scale;
    const sw = crop.w * scale;
    const sh = crop.h * scale;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    const ctx = canvas.getContext("2d")!;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(blob));
        setResultSize(blob.size);
      }, file.type || "image/png");
    };
    img.src = URL.createObjectURL(file);
  }, [file, crop, displayW, naturalW, resultUrl]);

  const download = useCallback(() => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    const ext = file.name.split(".").pop() ?? "png";
    a.download = `${file.name.replace(/\.[^/.]+$/, "")}_cropped.${ext}`;
    a.click();
  }, [resultUrl, file]);

  const reset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setFile(null);
    setImageUrl(null);
    setResultUrl(null);
    setResultSize(0);
    setNaturalW(0);
    setNaturalH(0);
    setCrop({ x: 0, y: 0, w: 0, h: 0 });
  }, [resultUrl, imageUrl]);

  // Compute actual crop dimensions in original pixels
  const scale = naturalW && displayW ? naturalW / displayW : 1;
  const cropNatW = Math.round(crop.w * scale);
  const cropNatH = Math.round(crop.h * scale);

  const handleStyle = "absolute w-3 h-3 bg-white border-2 border-brand-500 rounded-sm z-10";

  return (
    <div className="card space-y-6">
      {!imageUrl && (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          label="Drop an image here"
          sublabel="JPG, PNG, WebP supported"
        />
      )}

      {imageUrl && !resultUrl && (
        <>
          {/* Aspect ratio presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Aspect Ratio:</span>
            {(["free", "1:1", "4:3", "16:9", "3:2", "9:16"] as AspectRatio[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  if (r === "free") setAspectRatio("free");
                  else applyAspectRatio(r);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  aspectRatio === r
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"
                }`}
              >
                {r === "free" ? "Free" : r}
              </button>
            ))}
          </div>

          {/* Crop dimensions */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Original: <strong className="text-gray-700">{naturalW} x {naturalH}px</strong> · {file ? formatBytes(file.size) : ""}
            </span>
            <span>
              Crop: <strong className="text-brand-700">{cropNatW} x {cropNatH}px</strong>
            </span>
          </div>

          {/* Image + crop overlay */}
          <div
            ref={containerRef}
            className="relative inline-block w-full select-none overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Source"
              onLoad={handleImageLoad}
              className="block w-full h-auto"
              draggable={false}
            />

            {displayW > 0 && (
              <>
                {/* Dimmed overlay — four rects around the crop */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                />

                {/* Clear crop window */}
                <div
                  className="absolute cursor-move"
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.w,
                    height: crop.h,
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
                    border: "2px solid white",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "move")}
                >
                  {/* Grid lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/40" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/40" />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/40" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/40" />
                  </div>

                  {/* Corner handles */}
                  <div
                    className={handleStyle}
                    style={{ top: -6, left: -6, cursor: "nw-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, "nw")}
                  />
                  <div
                    className={handleStyle}
                    style={{ top: -6, right: -6, cursor: "ne-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, "ne")}
                  />
                  <div
                    className={handleStyle}
                    style={{ bottom: -6, left: -6, cursor: "sw-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, "sw")}
                  />
                  <div
                    className={handleStyle}
                    style={{ bottom: -6, right: -6, cursor: "se-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, "se")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={doCrop} className="btn-primary flex-1">
              Crop Image
            </button>
            <button onClick={reset} className="btn-secondary px-4">
              Reset
            </button>
          </div>
        </>
      )}

      {/* Result */}
      {resultUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Cropped: <strong className="text-brand-700">{cropNatW} x {cropNatH}px</strong> · {formatBytes(resultSize)}
            </span>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center" style={{ minHeight: 200 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt="Cropped result"
              className="max-h-96 max-w-full object-contain"
            />
            <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
              Cropped
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={download} className="btn-primary flex-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Cropped Image
            </button>
            <button
              onClick={() => {
                if (resultUrl) URL.revokeObjectURL(resultUrl);
                setResultUrl(null);
                setResultSize(0);
              }}
              className="btn-secondary px-4"
            >
              Adjust
            </button>
            <button onClick={reset} className="btn-secondary px-4">
              New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
