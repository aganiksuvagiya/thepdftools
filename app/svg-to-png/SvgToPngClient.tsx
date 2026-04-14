"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";

interface ConvertedResult {
  url: string;
  originalSize: number;
  pngSize: number;
  name: string;
  width: number;
  height: number;
}

type Scale = 1 | 2 | 3 | 4;
type Background = "transparent" | "white";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function SvgToPngClient() {
  const [svgPreview, setSvgPreview] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConvertedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<Scale>(2);
  const [background, setBackground] = useState<Background>("transparent");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setOriginalFile(file);
    setSvgPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }, []);

  const handleConvert = () => {
    if (!originalFile || !svgPreview) return;
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const svgText = reader.result as string;

      // Parse SVG to get intrinsic dimensions
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");
      const svgEl = doc.documentElement;

      let width = 300;
      let height = 150;

      const viewBox = svgEl.getAttribute("viewBox");
      const svgWidth = svgEl.getAttribute("width");
      const svgHeight = svgEl.getAttribute("height");

      if (svgWidth && svgHeight) {
        width = parseFloat(svgWidth) || width;
        height = parseFloat(svgHeight) || height;
      } else if (viewBox) {
        const parts = viewBox.split(/[\s,]+/);
        if (parts.length === 4) {
          width = parseFloat(parts[2]) || width;
          height = parseFloat(parts[3]) || height;
        }
      }

      const scaledWidth = Math.round(width * scale);
      const scaledHeight = Math.round(height * scale);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Canvas not supported in this browser.");
          setLoading(false);
          return;
        }

        if (background === "white") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, scaledWidth, scaledHeight);
        }

        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

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
              pngSize: blob.size,
              name: `${baseName}-${scale}x.png`,
              width: scaledWidth,
              height: scaledHeight,
            });
            setLoading(false);
          },
          "image/png"
        );
      };
      img.onerror = () => {
        setError("Failed to render SVG. Please check if the file is valid.");
        setLoading(false);
      };

      // Encode SVG as a data URL for rendering
      const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      img.src = URL.createObjectURL(blob);
    };
    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
      setLoading(false);
    };
    reader.readAsText(originalFile);
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/svg+xml": [".svg"] }}
        label="Drop your SVG file here"
        sublabel="SVG only · Click to browse"
      />

      {svgPreview && (
        <>
          {/* Options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Scale</label>
              <div className="flex gap-2">
                {([1, 2, 3, 4] as Scale[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                      scale === s
                        ? "border-brand-400 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Background</label>
              <div className="flex gap-2">
                {(["transparent", "white"] as Background[]).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBackground(bg)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition-all ${
                      background === bg
                        ? "border-brand-400 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Original (SVG)</p>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3C%2Fsvg%3E')]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svgPreview}
                  alt="original SVG before PNG conversion"
                  className="w-full object-contain max-h-48"
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
              <p className="text-sm font-medium text-gray-700">Converted (PNG)</p>
              <div className="min-h-[12rem] overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3C%2Fsvg%3E')]">
                {result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.url}
                    alt="converted PNG from SVG online free"
                    className="w-full object-contain max-h-48 animate-fade-in"
                  />
                ) : (
                  <p className="text-sm text-gray-400">
                    {loading ? "Converting..." : "PNG preview will appear here"}
                  </p>
                )}
              </div>
              {result && (
                <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-center">
                  <p className="text-xs text-brand-600">PNG size · {result.width} x {result.height}px</p>
                  <p className="font-semibold text-brand-700">{formatBytes(result.pngSize)}</p>
                </div>
              )}
            </div>
          </div>

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
              `Convert to PNG (${scale}x)`
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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
