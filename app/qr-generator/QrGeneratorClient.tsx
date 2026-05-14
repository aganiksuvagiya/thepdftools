"use client";

import { useState, useCallback } from "react";

type ECC = "L" | "M" | "Q" | "H";
type QRFormat = "png" | "svg";
type PresetType = "url" | "email" | "phone" | "wifi" | "sms" | "custom";

const PRESETS: { type: PresetType; label: string; placeholder: string; build: (v: string, extra: string) => string }[] = [
  { type: "url",    label: "URL",    placeholder: "https://example.com",    build: (v) => v },
  { type: "email",  label: "Email",  placeholder: "hello@example.com",      build: (v) => `mailto:${v}` },
  { type: "phone",  label: "Phone",  placeholder: "+1 234 567 8900",        build: (v) => `tel:${v.replace(/\s/g, "")}` },
  { type: "sms",    label: "SMS",    placeholder: "+1 234 567 8900",        build: (v) => `sms:${v.replace(/\s/g, "")}` },
  { type: "wifi",   label: "Wi-Fi",  placeholder: "NetworkName",            build: (v, p) => `WIFI:T:WPA;S:${v};P:${p};;` },
  { type: "custom", label: "Custom", placeholder: "Any text or data…",      build: (v) => v },
];

export default function QrGeneratorClient() {
  const [preset, setPreset] = useState<PresetType>("url");
  const [value, setValue] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [size, setSize] = useState(400);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecc, setEcc] = useState<ECC>("M");
  const [margin, setMargin] = useState(1);
  const [format, setFormat] = useState<QRFormat>("png");
  const [copied, setCopied] = useState(false);

  const currentPreset = PRESETS.find((p) => p.type === preset)!;
  const qrData = value.trim() ? currentPreset.build(value.trim(), wifiPass.trim()) : "";
  const fg = fgColor.replace("#", "");
  const bg = bgColor.replace("#", "");

  const qrUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&color=${fg}&bgcolor=${bg}&ecc=${ecc}&margin=${margin}&format=${format}`
    : "";

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(qrUrl, "_blank");
    }
  }, [qrUrl, format]);

  const handleCopy = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    } catch {
      await navigator.clipboard.writeText(qrUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [qrUrl]);

  return (
    <div className="space-y-6">
      {/* Type presets */}
      <div className="card">
        <label className="block text-sm font-semibold text-gray-700 mb-3">QR Type</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((p) => (
            <button key={p.type} onClick={() => { setPreset(p.type); setValue(""); setWifiPass(""); }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all border ${preset === p.type ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`}>
              {p.label}
            </button>
          ))}
        </div>

        <input
          type={preset === "email" ? "email" : preset === "phone" || preset === "sms" ? "tel" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={currentPreset.placeholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />

        {preset === "wifi" && (
          <input
            type="text"
            value={wifiPass}
            onChange={(e) => setWifiPass(e.target.value)}
            placeholder="Wi-Fi password"
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        )}
      </div>

      {/* Options */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Size */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Size — {size}px</label>
            <input type="range" min={200} max={1000} step={50} value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-indigo-600" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>200</span><span>1000</span></div>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Margin — {margin} cells</label>
            <input type="range" min={0} max={10} step={1} value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-indigo-600" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>None</span><span>10</span></div>
          </div>

          {/* Error correction */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Error Correction</label>
            <div className="flex gap-1">
              {(["L", "M", "Q", "H"] as ECC[]).map((level) => (
                <button key={level} onClick={() => setEcc(level)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all border ${ecc === level ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                  {level}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-gray-400">L=7% · M=15% · Q=25% · H=30% recovery</p>
          </div>

          {/* Foreground */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Foreground</label>
            <div className="flex items-center gap-2">
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
              <span className="font-mono text-sm text-gray-600">{fgColor}</span>
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
              <span className="font-mono text-sm text-gray-600">{bgColor}</span>
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Export Format</label>
            <div className="flex gap-1">
              {(["png", "svg"] as QRFormat[]).map((f) => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-semibold uppercase transition-all border ${format === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 self-start">Preview</h3>
        {qrUrl ? (
          <>
            <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm" style={{ backgroundColor: bgColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR code" width={Math.min(size, 320)} height={Math.min(size, 320)} className="block" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleDownload} className="btn-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download {format.toUpperCase()}
              </button>
              {format === "png" && (
                <button onClick={handleCopy} className="btn-secondary">
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="h-16 w-16 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
            </svg>
            <p className="text-sm font-medium">Enter data above to generate a QR code</p>
          </div>
        )}
      </div>
    </div>
  );
}
