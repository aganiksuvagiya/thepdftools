"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/DropZone";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const POSITIONS: { key: Position; label: string }[] = [
  { key: "top-left", label: "TL" },
  { key: "top-center", label: "TC" },
  { key: "top-right", label: "TR" },
  { key: "center-left", label: "CL" },
  { key: "center", label: "C" },
  { key: "center-right", label: "CR" },
  { key: "bottom-left", label: "BL" },
  { key: "bottom-center", label: "BC" },
  { key: "bottom-right", label: "BR" },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getTextPosition(
  position: Position,
  canvasW: number,
  canvasH: number,
  fontSize: number
): { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline } {
  const pad = fontSize;
  let x = canvasW / 2;
  let y = canvasH / 2;
  let textAlign: CanvasTextAlign = "center";
  let textBaseline: CanvasTextBaseline = "middle";

  if (position.includes("left")) {
    x = pad;
    textAlign = "left";
  } else if (position.includes("right")) {
    x = canvasW - pad;
    textAlign = "right";
  }

  if (position.startsWith("top")) {
    y = pad;
    textBaseline = "top";
  } else if (position.startsWith("bottom")) {
    y = canvasH - pad;
    textBaseline = "bottom";
  }

  return { x, y, textAlign, textBaseline };
}

export default function ImageWatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("Watermark");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<Position>("center");
  const [tile, setTile] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setResultUrl(null);
    const url = URL.createObjectURL(f);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
    };
    img.src = url;
  }, []);

  // Draw preview whenever settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageUrl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    if (!watermarkText.trim()) return;

    // Set up watermark style
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px sans-serif`;

    if (tile) {
      // Tiling mode: rotate and draw text in a grid pattern
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((-30 * Math.PI) / 180);

      const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
      const spacingX = fontSize * 8;
      const spacingY = fontSize * 4;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = -diagonal; y < diagonal; y += spacingY) {
        for (let x = -diagonal; x < diagonal; x += spacingX) {
          ctx.fillText(watermarkText, x, y);
        }
      }

      ctx.restore();
    } else {
      // Single watermark at selected position
      const { x, y, textAlign, textBaseline } = getTextPosition(
        position,
        canvas.width,
        canvas.height,
        fontSize
      );
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.fillText(watermarkText, x, y);
    }

    ctx.globalAlpha = 1;
  }, [imageUrl, watermarkText, fontSize, opacity, color, position, tile]);

  const applyWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  const downloadResult = () => {
    const url = resultUrl;
    if (!url || !file) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^/.]+$/, "")}_watermarked.png`;
    a.click();
  };

  return (
    <div className="card space-y-6">
      {/* Drop zone */}
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop your image here"
        sublabel="JPG, PNG, WebP supported"
      />

      {file && (
        <>
          {/* File info */}
          <div className="text-xs text-gray-500">
            <span className="font-medium text-gray-700">{file.name}</span> &middot;{" "}
            {formatBytes(file.size)}
          </div>

          {/* Watermark text input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Watermark Text</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="Enter watermark text..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {/* Controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Font size */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            {/* Color */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5"
                />
                <span className="text-xs text-gray-500 font-mono">{color}</span>
              </div>
            </div>
          </div>

          {/* Position grid + Tile */}
          <div className="flex flex-wrap items-start gap-6">
            {/* Position selector */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Position</label>
              <div className="grid grid-cols-3 gap-1">
                {POSITIONS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPosition(p.key)}
                    disabled={tile}
                    className={`h-9 w-9 rounded-md text-xs font-medium transition-colors ${
                      tile
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : position === p.key
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-brand-100 hover:text-brand-700"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tile checkbox */}
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="tile-toggle"
                checked={tile}
                onChange={(e) => setTile(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="tile-toggle" className="text-sm text-gray-700 cursor-pointer">
                Tile watermark diagonally across entire image
              </label>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Canvas preview */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">Preview</label>
            <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center"
              style={{ minHeight: "14rem" }}
            >
              <canvas
                ref={canvasRef}
                className="max-h-96 max-w-full object-contain"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={applyWatermark} className="btn-primary flex-1">
              Apply Watermark
            </button>
            {resultUrl && (
              <button onClick={downloadResult} className="btn-secondary flex-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
