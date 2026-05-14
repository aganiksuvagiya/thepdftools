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

function shiftHue(hex: string, degrees: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const shifted = (h + degrees + 360) % 360;
  const [nr, ng, nb] = hslToRgb(shifted, s, l);
  return rgbToHex(nr, ng, nb);
}

function adjustLightness(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const updated = Math.max(0, Math.min(100, l + amount));
  const [nr, ng, nb] = hslToRgb(h, s, updated);
  return rgbToHex(nr, ng, nb);
}

function paletteFromColor(hex: string): string[] {
  return [
    hex,
    shiftHue(hex, 180),
    adjustLightness(hex, 20),
    adjustLightness(hex, -20),
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

function relativeLuminance(r: number, g: number, b: number): number {
  const convert = (value: number) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b);
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = relativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = relativeLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return Number(((bright + 0.05) / (dark + 0.05)).toFixed(2));
}

function bestTextColor(r: number, g: number, b: number): "black" | "white" {
  const contrastBlack = contrastRatio([r, g, b], [0, 0, 0]);
  const contrastWhite = contrastRatio([r, g, b], [255, 255, 255]);
  return contrastBlack >= contrastWhite ? "black" : "white";
}

/* ─── Clipboard helper ─── */
function copyText(value: string, setCopiedKey: (k: string) => void, key: string) {
  navigator.clipboard.writeText(value).then(() => {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 1500);
  });
}

const curatedPalettes = [
  {
    name: "Sunset Drive",
    description: "Warm sunset tones for bold UI accents.",
    colors: ["#ff6b6b", "#ffb56b", "#ffe66d", "#6be7ff"],
  },
  {
    name: "Mint Breeze",
    description: "Cool green and teal shades for modern layouts.",
    colors: ["#0d9488", "#2dd4bf", "#a7f3d0", "#c7d2fe"],
  },
  {
    name: "Neon Night",
    description: "High-contrast neon colors inspired by dark mode design.",
    colors: ["#7c3aed", "#2dd4bf", "#facc15", "#ec4899"],
  },
  {
    name: "Soft Pastel",
    description: "Gentle pastel shades for calm product experiences.",
    colors: ["#f8b4d9", "#c4b5fd", "#a7f3d0", "#fde68a"],
  },
];

/* ─── Component ─── */

export default function ColorPickerClient() {
  const [hex, setHex] = useState("#6366f1");
  const [copiedKey, setCopiedKey] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [palette, setPalette] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<{
    id: string;
    name: string;
    colors: string[];
  }[]>([]);

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

  const applyPalette = useCallback(
    (color: string) => {
      updateFromHex(color);
    },
    [updateFromHex]
  );

  const saveCurrentPalette = useCallback(() => {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    setSavedPalettes((prev) => [
      {
        id: `saved-palette-${prev.length + 1}-${Date.now()}`,
        name: `Saved Palette ${prev.length + 1}`,
        colors: paletteFromColor(hex),
      },
      ...prev,
    ].slice(0, 6));
  }, [hex]);

  const removeSavedPalette = useCallback((id: string) => {
    setSavedPalettes((prev) => prev.filter((palette) => palette.id !== id));
  }, []);

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

  const addToPalette = useCallback(() => {
    setPalette((prev) => {
      const filtered = prev.filter((color) => color !== hex);
      return [hex, ...filtered].slice(0, 8);
    });
  }, [hex]);

  const clearPalette = useCallback(() => setPalette([]), []);

  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(hex);
  const textColor = bestTextColor(r, g, b);
  const contrastBlack = contrastRatio([r, g, b], [0, 0, 0]);
  const contrastWhite = contrastRatio([r, g, b], [255, 255, 255]);
  const cssSnippet = `:root {\n  --primary-color: ${hex};\n  --primary-text: ${textColor};\n}`;
  const tailwindSnippet = `bg-[${hex}] text-${textColor}`;
  const paletteExport = palette.length
    ? palette.map((value) => `"${value}"`).join("\n")
    : "";

  const generatedPalette = isValidHex ? paletteFromColor(hex) : [hex];
  const generatedPaletteCss = generatedPalette
    .map((color, index) => `--color-${index + 1}: ${color};`)
    .join("\n");
  const generatedPaletteJson = JSON.stringify({ colors: generatedPalette }, null, 2);
  const generatedPaletteTailwind = generatedPalette
    .map((color) => `bg-[${color}]`)
    .join(" ");

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

      <div className="card">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Palette inspiration</h3>
              <p className="text-sm text-gray-500">Browse ColorHunt-style palette cards and apply a color instantly.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ColorHunt style
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {curatedPalettes.map((palette) => (
              <div key={palette.name} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5">
                <div className="flex h-14">
                  {palette.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyPalette(color)}
                      className="flex-1 transition-transform duration-150 hover:scale-105"
                      style={{ backgroundColor: color }}
                      aria-label={`Apply ${color}`}
                    />
                  ))}
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-900">{palette.name}</h4>
                    <button
                      type="button"
                      onClick={() => applyPalette(palette.colors[0])}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Use first color
                    </button>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">{palette.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Generate palette from current color</h3>
              <p className="text-sm text-gray-500">Create matching colors, export CSS variables, Tailwind classes, or JSON for your design workflow.</p>
            </div>
            <button
              type="button"
              onClick={saveCurrentPalette}
              className="btn-secondary rounded-full px-4 py-2"
            >
              Save palette
            </button>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
            <div className="flex h-16">
              {generatedPalette.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => applyPalette(color)}
                  className="flex-1 transition-transform duration-150 hover:scale-105"
                  style={{ backgroundColor: color }}
                  aria-label={`Apply ${color}`}
                />
              ))}
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">CSS variables</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-slate-700">{generatedPaletteCss}</pre>
                <button
                  type="button"
                  onClick={() => copyText(generatedPaletteCss, setCopiedKey, "generated-css")}
                  className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  {copiedKey === "generated-css" ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tailwind classes</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-slate-700">{generatedPaletteTailwind}</pre>
                <button
                  type="button"
                  onClick={() => copyText(generatedPaletteTailwind, setCopiedKey, "generated-tailwind")}
                  className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  {copiedKey === "generated-tailwind" ? "Copied!" : "Copy Tailwind"}
                </button>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">JSON export</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-slate-700">{generatedPaletteJson}</pre>
                <button
                  type="button"
                  onClick={() => copyText(generatedPaletteJson, setCopiedKey, "generated-json")}
                  className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  {copiedKey === "generated-json" ? "Copied!" : "Copy JSON"}
                </button>
              </div>
            </div>
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

      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Accessibility & CSS
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-[0.18em]">
              Contrast with text
            </p>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3 border border-gray-200">
                <span>Black text</span>
                <span className="font-medium">{contrastBlack}:1</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3 border border-gray-200">
                <span>White text</span>
                <span className="font-medium">{contrastWhite}:1</span>
              </div>
              <div className="rounded-xl bg-white px-3 py-3 border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Recommended</p>
                <p className="text-xs text-gray-500">Use {textColor} for the best readability.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-[0.18em]">
              CSS snippet
            </p>
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4">
              <pre className="whitespace-pre-wrap break-words text-sm font-mono text-gray-700">
                {cssSnippet}
              </pre>
              <button
                onClick={() => copyText(cssSnippet, setCopiedKey, "css")}
                className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
              >
                {copiedKey === "css" ? "Copied!" : "Copy CSS"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Accessibility, Tailwind & Palette
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-[0.18em]">
              Contrast checks
            </p>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3 border border-gray-200">
                <span>Black text</span>
                <span className="font-medium">{contrastBlack}:1</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3 border border-gray-200">
                <span>White text</span>
                <span className="font-medium">{contrastWhite}:1</span>
              </div>
              <div className="rounded-xl bg-white px-3 py-3 border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Recommended</p>
                <p className="text-xs text-gray-500">Use {textColor} text for the best readability.</p>
              </div>
              <p className={`rounded-xl px-3 py-3 text-sm ${contrastBlack >= 4.5 || contrastWhite >= 4.5 ? "bg-white text-gray-700" : "bg-red-50 text-red-600"}`}>
                {contrastBlack >= 4.5 || contrastWhite >= 4.5
                  ? "Readable with WCAG AA for normal text."
                  : "Low contrast detected — choose a lighter or darker color."}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-[0.18em]">
              Tailwind & CSS
            </p>
            <div className="mt-3 space-y-3 text-sm text-gray-700">
              <div className="rounded-xl bg-white p-3 border border-gray-200">
                <p className="font-medium text-gray-900">Tailwind class</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-gray-700">{tailwindSnippet}</pre>
                <button
                  onClick={() => copyText(tailwindSnippet, setCopiedKey, "tailwind")}
                  className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  {copiedKey === "tailwind" ? "Copied!" : "Copy Tailwind"}
                </button>
              </div>
              <div className="rounded-xl bg-white p-3 border border-gray-200">
                <p className="font-medium text-gray-900">CSS snippet</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-gray-700">{cssSnippet}</pre>
                <button
                  onClick={() => copyText(cssSnippet, setCopiedKey, "css")}
                  className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  {copiedKey === "css" ? "Copied!" : "Copy CSS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Saved palette
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={addToPalette}
            className="btn-secondary rounded-full px-4 py-2"
          >
            Save current color
          </button>
          <button
            onClick={clearPalette}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Clear palette
          </button>
        </div>
        {palette.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {palette.map((color) => (
              <button
                key={color}
                onClick={() => setHex(color)}
                className="group relative h-14 rounded-2xl border border-gray-200 shadow-sm transition hover:scale-105"
                style={{ backgroundColor: color }}
                title={color}
              >
                <span className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                  {color}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Save colors to build a palette for your project.</p>
        )}
        {palette.length > 0 && (
          <>
            <div className="mt-4 rounded-2xl bg-white p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-900">Export palette</p>
              <pre className="mt-2 whitespace-pre-wrap break-words text-sm font-mono text-gray-700">{paletteExport}</pre>
              <button
                onClick={() => copyText(paletteExport, setCopiedKey, "palette")}
                className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
              >
                {copiedKey === "palette" ? "Copied!" : "Copy palette"}
              </button>
            </div>

            {savedPalettes.length > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Saved palettes</p>
                    <p className="text-sm text-slate-500">Saved palettes from your current color and generated matches.</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {savedPalettes.map((saved) => (
                    <div key={saved.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{saved.name}</p>
                          <p className="text-xs text-slate-500">{saved.colors.join(" • ")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => saved.colors.length && applyPalette(saved.colors[0])}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            Use first color
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSavedPalette(saved.id)}
                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2 overflow-hidden rounded-2xl border border-slate-200">
                        {saved.colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => applyPalette(color)}
                            className="flex-1 h-10 transition-transform duration-150 hover:scale-105"
                            style={{ backgroundColor: color }}
                            aria-label={`Apply ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview text</h3>
        <div
          className="rounded-3xl border border-gray-200 p-6 text-xl font-semibold"
          style={{ backgroundColor: isValidHex ? hex : "#ffffff", color: textColor }}
        >
          <p>This is how your color works on a background.</p>
          <p className="mt-3 text-sm font-normal text-gray-100/90">Use this preview to check readability and visual hierarchy.</p>
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
