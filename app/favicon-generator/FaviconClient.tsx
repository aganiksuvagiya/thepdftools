"use client";

import { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const SIZES = [16, 32, 48, 64, 96, 128, 180, 512];
const PRESETS = [
  { label: "Web Standard", sizes: [16, 32, 48] },
  { label: "Apple Touch",  sizes: [180] },
  { label: "All Sizes",    sizes: SIZES },
];

function resizeCanvas(img: HTMLImageElement, size: number, radius: number, padding: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const p = Math.round(size * padding);
  const r = Math.round(size * radius);
  const s = size - p * 2;

  if (r > 0) {
    ctx.beginPath();
    ctx.moveTo(p + r, p);
    ctx.lineTo(p + s - r, p);
    ctx.arcTo(p + s, p, p + s, p + r, r);
    ctx.lineTo(p + s, p + s - r);
    ctx.arcTo(p + s, p + s, p + s - r, p + s, r);
    ctx.lineTo(p + r, p + s);
    ctx.arcTo(p, p + s, p, p + s - r, r);
    ctx.lineTo(p, p + r);
    ctx.arcTo(p, p, p + r, p, r);
    ctx.closePath();
    ctx.clip();
  }
  ctx.drawImage(img, p, p, s, s);
  return canvas;
}

export default function FaviconClient() {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 180]);
  const [radius, setRadius] = useState(0.2);
  const [padding, setPadding] = useState(0.05);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [generating, setGenerating] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    const img = new Image();
    img.onload = () => { setImgEl(img); setPreviews([]); };
    img.src = url;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"] },
    maxFiles: 1,
  });

  const toggleSize = (s: number) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s].sort((a, b) => a - b));

  const generate = () => {
    if (!imgEl) return;
    setGenerating(true);
    const result = selectedSizes.map((size) => ({
      size,
      url: resizeCanvas(imgEl, size, radius, padding).toDataURL("image/png"),
    }));
    setPreviews(result);
    setGenerating(false);
  };

  const downloadOne = (url: string, size: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  };

  const downloadAll = async () => {
    if (!previews.length) return;
    const { default: JSZip } = await import("jszip").catch(() => ({ default: null }));
    if (!JSZip) {
      previews.forEach(({ url, size }) => downloadOne(url, size));
      return;
    }
    const zip = new JSZip();
    previews.forEach(({ url, size }) => {
      const base64 = url.split(",")[1];
      zip.file(`favicon-${size}x${size}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "favicons.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-colors ${isDragActive ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-slate-50 hover:border-brand-300 hover:bg-white"}`}>
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="uploaded" className="h-20 w-20 rounded-xl object-contain border border-slate-200 shadow-sm" />
            <p className="text-xs text-slate-400">Click to change image</p>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto mb-3 h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-semibold text-slate-600">Drop your logo or image here</p>
            <p className="mt-1 text-xs text-slate-400">PNG, JPG, SVG, WebP</p>
          </div>
        )}
      </div>

      {imgEl && (
        <>
          {/* Size presets */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Quick Presets</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESETS.map((p) => (
                <button key={p.label} onClick={() => setSelectedSizes(p.sizes)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700 transition-colors">
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => toggleSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${selectedSizes.includes(s) ? "bg-brand-600 text-white border-brand-600" : "bg-white text-slate-500 border-slate-200 hover:border-brand-300"}`}>
                  {s}×{s}
                </button>
              ))}
            </div>
          </div>

          {/* Style options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Corner Radius — {Math.round(radius * 100)}%</label>
              <input type="range" min={0} max={0.5} step={0.05} value={radius}
                onChange={(e) => { setRadius(Number(e.target.value)); setPreviews([]); }}
                className="w-full accent-brand-600" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>Sharp</span><span>Circle</span></div>
            </div>
            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Padding — {Math.round(padding * 100)}%</label>
              <input type="range" min={0} max={0.2} step={0.01} value={padding}
                onChange={(e) => { setPadding(Number(e.target.value)); setPreviews([]); }}
                className="w-full accent-brand-600" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>None</span><span>20%</span></div>
            </div>
          </div>

          <button onClick={generate} disabled={!selectedSizes.length}
            className="btn-primary w-full">
            {generating ? "Generating…" : `Generate ${selectedSizes.length} favicon${selectedSizes.length !== 1 ? "s" : ""}`}
          </button>
        </>
      )}

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previews.map(({ size, url }) => (
              <div key={size} className="group relative flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-100 bg-slate-50"
                  style={{ backgroundImage: "repeating-conic-gradient(#e2e8f0 0% 25%, white 0% 50%) 0 0 / 12px 12px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`${size}px`} style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} className="rounded" />
                </div>
                <span className="text-xs font-semibold text-slate-500">{size}×{size}</span>
                <button onClick={() => downloadOne(url, size)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700 transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>

          <button onClick={downloadAll}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" />
            </svg>
            Download All as ZIP
          </button>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">HTML code for your website:</p>
            <code className="block font-mono text-slate-600 break-all">
              {`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`}<br/>
              {`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`}<br/>
              {selectedSizes.includes(180) && `<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">`}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
