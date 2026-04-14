"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import DropZone from "@/components/DropZone";

interface TransformState {
  rotation: number; // degrees, cumulative
  flipH: boolean;
  flipV: boolean;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function getTransformLabel(transform: TransformState): string {
  const parts: string[] = [];
  const angle = normalizeAngle(transform.rotation);
  if (angle !== 0) parts.push(`Rotated ${angle}°`);
  if (transform.flipH) parts.push("Flipped H");
  if (transform.flipV) parts.push("Flipped V");
  return parts.length > 0 ? parts.join(" \u00b7 ") : "Original";
}

function applyTransform(
  img: HTMLImageElement,
  transform: TransformState
): HTMLCanvasElement {
  const angle = normalizeAngle(transform.rotation);
  const radians = (angle * Math.PI) / 180;

  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  // For 90/270 rotations swap canvas dimensions
  const is90 = angle === 90 || angle === 270;
  let canvasW: number;
  let canvasH: number;

  if (is90) {
    canvasW = srcH;
    canvasH = srcW;
  } else if (angle === 0 || angle === 180) {
    canvasW = srcW;
    canvasH = srcH;
  } else {
    // Arbitrary angle — compute bounding box
    const cos = Math.abs(Math.cos(radians));
    const sin = Math.abs(Math.sin(radians));
    canvasW = Math.ceil(srcW * cos + srcH * sin);
    canvasH = Math.ceil(srcW * sin + srcH * cos);
  }

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d")!;

  // Move origin to center
  ctx.translate(canvasW / 2, canvasH / 2);

  // Apply rotation
  ctx.rotate(radians);

  // Apply flips
  const scaleX = transform.flipH ? -1 : 1;
  const scaleY = transform.flipV ? -1 : 1;
  ctx.scale(scaleX, scaleY);

  // Draw image centered
  ctx.drawImage(img, -srcW / 2, -srcH / 2);

  return canvas;
}

export default function ImageRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [transform, setTransform] = useState<TransformState>({
    rotation: 0,
    flipH: false,
    flipV: false,
  });
  const [customAngle, setCustomAngle] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setTransform({ rotation: 0, flipH: false, flipV: false });
    setCustomAngle(0);
    setResultUrl(null);
    setResultSize(0);
  }, []);

  // Load image element when file changes
  useEffect(() => {
    if (!previewUrl) {
      imgRef.current = null;
      return;
    }
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      // Trigger initial render
      renderTransform({ rotation: 0, flipH: false, flipV: false });
    };
    img.src = previewUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  const renderTransform = useCallback(
    (t: TransformState) => {
      const img = imgRef.current;
      if (!img) return;
      const canvas = applyTransform(img, t);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
        setResultSize(blob.size);
      }, "image/png");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateTransform = useCallback(
    (updater: (prev: TransformState) => TransformState) => {
      setTransform((prev) => {
        const next = updater(prev);
        renderTransform(next);
        return next;
      });
    },
    [renderTransform]
  );

  const rotateLeft = () =>
    updateTransform((t) => ({ ...t, rotation: t.rotation - 90 }));
  const rotateRight = () =>
    updateTransform((t) => ({ ...t, rotation: t.rotation + 90 }));
  const rotate180 = () =>
    updateTransform((t) => ({ ...t, rotation: t.rotation + 180 }));
  const flipH = () =>
    updateTransform((t) => ({ ...t, flipH: !t.flipH }));
  const flipV = () =>
    updateTransform((t) => ({ ...t, flipV: !t.flipV }));

  const applyCustomAngle = (angle: number) => {
    setCustomAngle(angle);
    updateTransform((t) => ({ ...t, rotation: angle }));
  };

  const reset = () => {
    const t: TransformState = { rotation: 0, flipH: false, flipV: false };
    setTransform(t);
    setCustomAngle(0);
    renderTransform(t);
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${file.name.replace(/\.[^/.]+$/, "")}_rotated.png`;
    a.click();
  };

  return (
    <div className="card space-y-6">
      {/* Drop zone */}
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop an image here"
        sublabel="JPG, PNG, WebP supported"
      />

      {file && (
        <>
          {/* Transform controls */}
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <button onClick={rotateLeft} className="btn-secondary text-xs px-3 py-2">
                <svg className="mr-1.5 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4V6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10A7.003 7.003 0 0119.95 12" />
                </svg>
                Rotate Left 90°
              </button>
              <button onClick={rotateRight} className="btn-secondary text-xs px-3 py-2">
                <svg className="mr-1.5 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-4V6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10A7.003 7.003 0 004.05 12" />
                </svg>
                Rotate Right 90°
              </button>
              <button onClick={rotate180} className="btn-secondary text-xs px-3 py-2">
                <svg className="mr-1.5 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Rotate 180°
              </button>
              <button onClick={flipH} className="btn-secondary text-xs px-3 py-2">
                <svg className="mr-1.5 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 12l4.5-9M16.5 21L21 12l-4.5-9M12 3v18" />
                </svg>
                Flip Horizontal
              </button>
              <button onClick={flipV} className="btn-secondary text-xs px-3 py-2">
                <svg className="mr-1.5 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7.5L12 3l9 4.5M3 16.5L12 21l9-4.5M3 12h18" />
                </svg>
                Flip Vertical
              </button>
            </div>

            {/* Custom angle */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Custom Angle</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={customAngle}
                    onChange={(e) => applyCustomAngle(Number(e.target.value))}
                    className="w-40 accent-pink-600"
                  />
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={customAngle}
                    onChange={(e) => {
                      const v = Math.max(0, Math.min(360, Number(e.target.value)));
                      applyCustomAngle(v);
                    }}
                    className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                  />
                  <span className="text-xs text-gray-500">degrees</span>
                </div>
              </div>
            </div>

            {/* Transform state label */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Current: <strong className="text-gray-700">{getTransformLabel(transform)}</strong>
              </span>
              <button onClick={reset} className="btn-secondary text-xs px-3 py-1.5">
                Reset
              </button>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                Original: <strong className="text-gray-700">{formatBytes(file.size)}</strong>
              </span>
              {resultSize > 0 && (
                <span>
                  Output: <strong className="text-pink-700">{formatBytes(resultSize)}</strong>
                </span>
              )}
            </div>

            <div className="relative w-full h-72 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
              {resultUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resultUrl}
                  alt="rotated image preview online free"
                  className="max-h-full max-w-full object-contain"
                />
              ) : previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="original image before rotate and flip"
                  className="max-h-full max-w-full object-contain"
                />
              ) : null}
            </div>

            {/* Download */}
            {resultUrl && (
              <button onClick={download} className="btn-primary w-full">
                <svg className="mr-2 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Rotated Image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
