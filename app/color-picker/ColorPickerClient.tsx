"use client";

import { useState, useCallback } from "react";

/* ─── Conversion helpers ─── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function rgbToCmyk(
  r: number,
  g: number,
  b: number
): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const c1 = 1 - r / 255;
  const m1 = 1 - g / 255;
  const y1 = 1 - b / 255;
  const k = Math.min(c1, m1, y1);
  return [
    Math.round(((c1 - k) / (1 - k)) * 100),
    Math.round(((m1 - k) / (1 - k)) * 100),
    Math.round(((y1 - k) / (1 - k)) * 100),
    Math.round(k * 100),
  ];
}

function cmykToRgb(
  c: number,
  m: number,
  y: number,
  k: number
): [number, number, number] {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;
  return [
    Math.round(255 * (1 - c) * (1 - k)),
    Math.round(255 * (1 - m) * (1 - k)),
    Math.round(255 * (1 - y) * (1 - k)),
  ];
}

function randomHex(): string {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

/* ─── Clipboard helper ─── */
function copyText(value: string, setCopiedKey: (k: string) => void, key: string) {
  navigator.clipboard.writeText(value).then(() => {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 1500);
  });
}

/* ─── Component ─── */

export default function ColorPickerClient() {
  const [hex, setHex] = useState("#6366f1");
  const [copiedKey, setCopiedKey] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  const pushHistory = useCallback(
    (newHex: string) => {
      setHistory((prev) => {
        const filtered = prev.filter((c) => c !== newHex);
        return [newHex, ...filtered].slice(0, 10);
      });
    },
    []
  );

  const updateFromHex = useCallback(
    (newHex: string) => {
      // Validate hex
      if (/^#[0-9a-fA-F]{6}$/.test(newHex)) {
        setHex(newHex.toLowerCase());
        pushHistory(newHex.toLowerCase());
      } else {
        setHex(newHex);
      }
    },
    [pushHistory]
  );

  const updateFromRgb = useCallback(
    (nr: number, ng: number, nb: number) => {
      const newHex = rgbToHex(nr, ng, nb);
      setHex(newHex);
      pushHistory(newHex);
    },
    [pushHistory]
  );

  const updateFromHsl = useCallback(
    (nh: number, ns: number, nl: number) => {
      const [nr, ng, nb] = hslToRgb(nh, ns, nl);
      const newHex = rgbToHex(nr, ng, nb);
      setHex(newHex);
      pushHistory(newHex);
    },
    [pushHistory]
  );

  const updateFromCmyk = useCallback(
    (nc: number, nm: number, ny: number, nk: number) => {
      const [nr, ng, nb] = cmykToRgb(nc, nm, ny, nk);
      const newHex = rgbToHex(nr, ng, nb);
      setHex(newHex);
      pushHistory(newHex);
    },
    [pushHistory]
  );

  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(hex);

  const CopyBtn = ({ value, id }: { value: string; id: string }) => (
    <button
      onClick={() => copyText(value, setCopiedKey, id)}
      className="shrink-0 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
      title="Copy"
    >
      {copiedKey === id ? "Copied!" : "Copy"}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Color picker + swatch */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          {/* Large swatch */}
          <div
            className="w-40 h-40 rounded-2xl border border-gray-200 shadow-inner shrink-0 transition-colors duration-200"
            style={{ backgroundColor: isValidHex ? hex : "#ffffff" }}
          />
          <div className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Pick a color
              </label>
              <input
                type="color"
                value={isValidHex ? hex : "#000000"}
                onChange={(e) => updateFromHex(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-200 p-1"
              />
            </div>
            <button
              onClick={() => updateFromHex(randomHex())}
              className="btn-secondary w-full sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              Random Color
            </button>
          </div>
        </div>
      </div>

      {/* Color values */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Color Values
        </h3>
        <div className="space-y-4">
          {/* HEX */}
          <div className="flex items-center gap-3">
            <label className="w-14 text-xs font-bold text-gray-400 uppercase shrink-0">
              HEX
            </label>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
            <CopyBtn value={hex} id="hex" />
          </div>

          {/* RGB */}
          <div className="flex items-center gap-3">
            <label className="w-14 text-xs font-bold text-gray-400 uppercase shrink-0">
              RGB
            </label>
            <div className="flex flex-1 gap-2">
              <input
                type="number"
                min={0}
                max={255}
                value={r}
                onChange={(e) => updateFromRgb(Number(e.target.value), g, b)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={255}
                value={g}
                onChange={(e) => updateFromRgb(r, Number(e.target.value), b)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={255}
                value={b}
                onChange={(e) => updateFromRgb(r, g, Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
            <CopyBtn value={`rgb(${r}, ${g}, ${b})`} id="rgb" />
          </div>

          {/* HSL */}
          <div className="flex items-center gap-3">
            <label className="w-14 text-xs font-bold text-gray-400 uppercase shrink-0">
              HSL
            </label>
            <div className="flex flex-1 gap-2">
              <input
                type="number"
                min={0}
                max={360}
                value={h}
                onChange={(e) => updateFromHsl(Number(e.target.value), s, l)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={s}
                onChange={(e) => updateFromHsl(h, Number(e.target.value), l)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={l}
                onChange={(e) => updateFromHsl(h, s, Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
            <CopyBtn value={`hsl(${h}, ${s}%, ${l}%)`} id="hsl" />
          </div>

          {/* CMYK */}
          <div className="flex items-center gap-3">
            <label className="w-14 text-xs font-bold text-gray-400 uppercase shrink-0">
              CMYK
            </label>
            <div className="flex flex-1 gap-2">
              <input
                type="number"
                min={0}
                max={100}
                value={c}
                onChange={(e) => updateFromCmyk(Number(e.target.value), m, y, k)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={m}
                onChange={(e) => updateFromCmyk(c, Number(e.target.value), y, k)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={y}
                onChange={(e) => updateFromCmyk(c, m, Number(e.target.value), k)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={k}
                onChange={(e) => updateFromCmyk(c, m, y, Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
            <CopyBtn value={`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`} id="cmyk" />
          </div>
        </div>
      </div>

      {/* Color history */}
      {history.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Recent Colors
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.map((color) => (
              <button
                key={color}
                onClick={() => setHex(color)}
                className="group relative h-10 w-10 rounded-xl border border-gray-200 shadow-sm transition hover:scale-110 hover:shadow-md"
                style={{ backgroundColor: color }}
                title={color}
              >
                {hex === color && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-3 w-3 rounded-full border-2 border-white shadow" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
