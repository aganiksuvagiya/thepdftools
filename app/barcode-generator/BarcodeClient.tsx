"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

type BarcodeFormat = "CODE128" | "EAN13" | "EAN8" | "UPCA" | "CODE39" | "ITF14" | "MSI";

const FORMATS: { value: BarcodeFormat; label: string; placeholder: string; maxLen?: number }[] = [
  { value: "CODE128", label: "Code 128",  placeholder: "Any text or number",        },
  { value: "EAN13",   label: "EAN-13",    placeholder: "12 digits (e.g. 590123412345)", maxLen: 12 },
  { value: "EAN8",    label: "EAN-8",     placeholder: "7 digits (e.g. 9638507)",    maxLen: 7  },
  { value: "UPCA",    label: "UPC-A",     placeholder: "11 digits (e.g. 03600029145)", maxLen: 11 },
  { value: "CODE39",  label: "Code 39",   placeholder: "A-Z, 0-9, - . $ / + %",     },
  { value: "ITF14",   label: "ITF-14",    placeholder: "13 digits",                  maxLen: 13 },
  { value: "MSI",     label: "MSI",       placeholder: "Digits only",                },
];

export default function BarcodeClient() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [value, setValue] = useState("");
  const [lineColor, setLineColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showText, setShowText] = useState(true);
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(80);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const currentFmt = FORMATS.find((f) => f.value === format)!;

  useEffect(() => {
    if (!svgRef.current || !value.trim()) return;
    setError(null);
    try {
      JsBarcode(svgRef.current, value.trim(), {
        format,
        lineColor,
        background: bgColor,
        width,
        height,
        displayValue: showText,
        margin: 12,
        fontSize: 14,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid value for this barcode format");
    }
  }, [value, format, lineColor, bgColor, showText, width, height]);

  const download = (fmt: "png" | "svg") => {
    const svg = svgRef.current;
    if (!svg || !value.trim()) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    if (fmt === "svg") {
      const blob = new Blob([serialized], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `barcode-${value}.svg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } else {
      const canvas = document.createElement("canvas");
      const img = new Image();
      const url = URL.createObjectURL(new Blob([serialized], { type: "image/svg+xml" }));
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `barcode-${value}.png`;
        a.click();
      };
      img.src = url;
    }
  };

  const copySvg = async () => {
    if (!svgRef.current || !value.trim()) return;
    const txt = new XMLSerializer().serializeToString(svgRef.current);
    await navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const hasValue = value.trim().length > 0 && !error;

  return (
    <div className="space-y-5">
      {/* Format selector */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Barcode Format</p>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button key={f.value} onClick={() => { setFormat(f.value); setValue(""); setError(null); }}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${format === f.value ? "bg-brand-600 text-white border-brand-600" : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-slate-700">Value</label>
        <input
          type="text"
          value={value}
          maxLength={currentFmt.maxLen}
          onChange={(e) => { setValue(e.target.value); setError(null); }}
          placeholder={currentFmt.placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
        />
        {currentFmt.maxLen && (
          <p className="mt-1 text-xs text-slate-400">{value.length} / {currentFmt.maxLen} digits</p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex gap-4">
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500">Bar Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded-lg border border-slate-200 p-0.5" />
              <span className="font-mono text-xs text-slate-600">{lineColor}</span>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500">Background</label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded-lg border border-slate-200 p-0.5" />
              <span className="font-mono text-xs text-slate-600">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500">Bar Width — {width}px</label>
            <input type="range" min={1} max={5} step={0.5} value={width}
              onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-brand-600" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500">Height — {height}px</label>
            <input type="range" min={40} max={200} step={10} value={height}
              onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-brand-600" />
          </div>
        </div>

        <label className="flex cursor-pointer select-none items-center gap-2 col-span-full">
          <div className={`relative h-5 w-9 rounded-full transition-colors ${showText ? "bg-brand-600" : "bg-slate-200"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${showText ? "translate-x-4" : "translate-x-0.5"}`} />
          </div>
          <span className="text-sm font-medium text-slate-700">Show text below barcode</span>
          <input type="checkbox" className="sr-only" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
        </label>
      </div>

      {/* Preview */}
      <div className="flex min-h-[140px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6">
        {value.trim() && !error ? (
          <svg ref={svgRef} />
        ) : (
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <svg ref={svgRef} className="hidden" />
            <svg className="mx-auto mb-2 h-12 w-12 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4H4v16h16V4h-8zM4 9h4M4 14h4M16 9h4M16 14h4" />
            </svg>
            <p className="text-sm text-slate-400">{error || "Enter a value to generate barcode"}</p>
          </div>
        )}
      </div>

      {/* Download */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => download("png")} disabled={!hasValue}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>
          Download PNG
        </button>
        <button onClick={() => download("svg")} disabled={!hasValue}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>
          Download SVG
        </button>
        <button onClick={copySvg} disabled={!hasValue}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          {copied ? "Copied!" : "Copy SVG"}
        </button>
      </div>
    </div>
  );
}
