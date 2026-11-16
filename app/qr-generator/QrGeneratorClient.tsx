"use client";

import { useState, useCallback, useEffect } from "react";
import QRCode from "qrcode";

type ECC = "L" | "M" | "Q" | "H";
type QRFormat = "png" | "svg";
type PresetType = "url" | "email" | "phone" | "wifi" | "sms" | "custom";

// Wi-Fi QR format reserves \ ; , : " so they must be backslash-escaped.
function escapeWifi(v: string) {
  return v.replace(/([\\;,:"])/g, "\\$1");
}

// Draw the QR into an exact size x size canvas. Module edges are rounded to whole
// pixels so neighbouring modules never leave gaps, whatever the chosen size is.
function renderQr(data: string, opts: { size: number; margin: number; ecc: ECC; fg: string; bg: string }) {
  const qr = QRCode.create(data, { errorCorrectionLevel: opts.ecc });
  const n = qr.modules.size;
  const total = n + opts.margin * 2;
  return { qr, n, total };
}

function qrToCanvas(data: string, opts: { size: number; margin: number; ecc: ECC; fg: string; bg: string }) {
  const { qr, n, total } = renderQr(data, opts);
  const canvas = document.createElement("canvas");
  canvas.width = opts.size;
  canvas.height = opts.size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  ctx.fillStyle = opts.bg;
  ctx.fillRect(0, 0, opts.size, opts.size);
  ctx.fillStyle = opts.fg;
  const cell = opts.size / total;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!qr.modules.get(r, c)) continue;
      const x0 = Math.round((c + opts.margin) * cell);
      const x1 = Math.round((c + opts.margin + 1) * cell);
      const y0 = Math.round((r + opts.margin) * cell);
      const y1 = Math.round((r + opts.margin + 1) * cell);
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return canvas;
}

function qrToSvg(data: string, opts: { size: number; margin: number; ecc: ECC; fg: string; bg: string }) {
  const { qr, n, total } = renderQr(data, opts);
  let path = "";
  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (!qr.modules.get(r, c)) { c++; continue; }
      let run = 1;
      while (c + run < n && qr.modules.get(r, c + run)) run++;
      path += `M${c + opts.margin} ${r + opts.margin}h${run}v1h-${run}z`;
      c += run;
    }
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges">` +
    `<rect width="${total}" height="${total}" fill="${opts.bg}"/><path d="${path}" fill="${opts.fg}"/></svg>`
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const PRESETS: { type: PresetType; label: string; placeholder: string; build: (v: string, extra: string) => string }[] = [
  { type: "url",    label: "URL",    placeholder: "https://example.com",    build: (v) => v },
  { type: "email",  label: "Email",  placeholder: "hello@example.com",      build: (v) => `mailto:${v}` },
  { type: "phone",  label: "Phone",  placeholder: "+1 234 567 8900",        build: (v) => `tel:${v.replace(/\s/g, "")}` },
  { type: "sms",    label: "SMS",    placeholder: "+1 234 567 8900",        build: (v) => `sms:${v.replace(/\s/g, "")}` },
  { type: "wifi",   label: "Wi-Fi",  placeholder: "NetworkName",            build: (v, p) => (p ? `WIFI:T:WPA;S:${escapeWifi(v)};P:${escapeWifi(p)};;` : `WIFI:T:nopass;S:${escapeWifi(v)};;`) },
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
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  // Everything is generated in the browser — the QR content never leaves the device.
  useEffect(() => {
    if (!qrData) {
      setPreviewUrl("");
      setError("");
      return;
    }
    try {
      const canvas = qrToCanvas(qrData, { size, margin, ecc, fg: fgColor, bg: bgColor });
      setPreviewUrl(canvas.toDataURL("image/png"));
      setError("");
    } catch {
      setPreviewUrl("");
      setError("This text is too long for a QR code at this error-correction level. Shorten it or choose a lower level (L or M).");
    }
  }, [qrData, size, margin, ecc, fgColor, bgColor]);

  const handleDownload = useCallback(() => {
    if (!qrData || !previewUrl) return;
    const name = `qrcode-${Date.now()}.${format}`;
    if (format === "svg") {
      const svg = qrToSvg(qrData, { size, margin, ecc, fg: fgColor, bg: bgColor });
      downloadBlob(new Blob([svg], { type: "image/svg+xml" }), name);
      return;
    }
    const canvas = qrToCanvas(qrData, { size, margin, ecc, fg: fgColor, bg: bgColor });
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, name);
    }, "image/png");
  }, [qrData, previewUrl, format, size, margin, ecc, fgColor, bgColor]);

  const handleCopy = useCallback(async () => {
    if (!qrData || !previewUrl) return;
    try {
      const canvas = qrToCanvas(qrData, { size, margin, ecc, fg: fgColor, bg: bgColor });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("no blob");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
    } catch {
      // Clipboard image access is not available in every browser; fall back to the raw text.
      try {
        await navigator.clipboard.writeText(qrData);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }
    setTimeout(() => setCopied(false), 2000);
  }, [qrData, previewUrl, size, margin, ecc, fgColor, bgColor]);

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
        {error ? (
          <p className="py-10 text-center text-sm font-medium text-red-600">{error}</p>
        ) : previewUrl ? (
          <>
            <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm" style={{ backgroundColor: bgColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="QR code" width={Math.min(size, 320)} height={Math.min(size, 320)} className="block" />
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
