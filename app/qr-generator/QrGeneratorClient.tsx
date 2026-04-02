"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function QrGeneratorClient() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(400);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Strip '#' for the API color params
  const fg = fgColor.replace("#", "");
  const bg = bgColor.replace("#", "");

  const qrUrl = text.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        text.trim()
      )}&color=${fg}&bgcolor=${bg}&format=png`
    : "";

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(qrUrl, "_blank");
    }
  }, [qrUrl]);

  const handleCopy = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: copy the URL itself
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [qrUrl]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text or URL
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a URL or any text..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Options */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Size */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Size: {size}px
            </label>
            <input
              type="range"
              min={200}
              max={1000}
              step={50}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>200</span>
              <span>1000</span>
            </div>
          </div>

          {/* Foreground color */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Foreground
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5"
              />
              <span className="text-sm font-mono text-gray-600">{fgColor}</span>
            </div>
          </div>

          {/* Background color */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5"
              />
              <span className="text-sm font-mono text-gray-600">{bgColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 self-start">
          Preview
        </h3>
        {qrUrl ? (
          <>
            <div
              className="rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              style={{ backgroundColor: bgColor }}
            >
              <img
                ref={imgRef}
                src={qrUrl}
                alt="Generated QR Code"
                width={Math.min(size, 400)}
                height={Math.min(size, 400)}
                className="block"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleDownload} className="btn-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download PNG
              </button>
              <button onClick={handleCopy} className="btn-secondary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="h-16 w-16 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
            </svg>
            <p className="text-sm font-medium">Enter text or a URL above to generate a QR code</p>
          </div>
        )}
      </div>
    </div>
  );
}
