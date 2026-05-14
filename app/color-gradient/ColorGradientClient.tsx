"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GradientType = "linear" | "radial" | "conic";
type RadialShape = "circle" | "ellipse";
type RadialSize = "farthest-corner" | "farthest-side" | "closest-corner" | "closest-side";
type RadialPosition = "center" | "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
type PreviewMode = "rect" | "circle" | "text" | "button" | "card" | "hero";
type BgMode = "light" | "dark" | "checker";

interface ColorStop {
  id: number;
  color: string;
  position: number;
  opacity: number;
}

interface GradientState {
  type: GradientType;
  angle: number;
  repeat: boolean;
  radialShape: RadialShape;
  radialSize: RadialSize;
  radialPosition: RadialPosition;
  stops: ColorStop[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, opacity: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return opacity < 100 ? `rgba(${r},${g},${b},${(opacity / 100).toFixed(2)})` : hex;
}

function buildCss(s: GradientState): string {
  const sorted = [...s.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((stop) => `${hexToRgba(stop.color, stop.opacity)} ${stop.position}%`).join(", ");
  const prefix = s.repeat ? "repeating-" : "";
  if (s.type === "linear") return `${prefix}linear-gradient(${s.angle}deg, ${stopsStr})`;
  if (s.type === "radial") return `${prefix}radial-gradient(${s.radialShape} ${s.radialSize} at ${s.radialPosition}, ${stopsStr})`;
  return `${prefix}conic-gradient(from ${s.angle}deg at center, ${stopsStr})`;
}

function randomGradient(): GradientState {
  const count = Math.floor(Math.random() * 3) + 2;
  const stops: ColorStop[] = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    color: "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"),
    position: Math.round((i / (count - 1)) * 100),
    opacity: 100,
  }));
  return {
    type: "linear",
    angle: Math.round(Math.random() * 360),
    repeat: false,
    radialShape: "circle",
    radialSize: "farthest-corner",
    radialPosition: "center",
    stops,
  };
}

function toSvg(s: GradientState): string {
  const sorted = [...s.stops].sort((a, b) => a.position - b.position);
  const stops = sorted.map((stop) =>
    `    <stop offset="${stop.position}%" stop-color="${stop.color}"${stop.opacity < 100 ? ` stop-opacity="${(stop.opacity / 100).toFixed(2)}"` : ""}/>`
  ).join("\n");

  let gradDef: string;
  if (s.type === "radial") {
    gradDef = `  <radialGradient id="g" cx="50%" cy="50%" r="50%">\n${stops}\n  </radialGradient>`;
  } else if (s.type === "conic") {
    gradDef = `  <!-- conic-gradient not supported in SVG; using linear fallback -->\n  <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">\n${stops}\n  </linearGradient>`;
  } else {
    const rad = ((s.angle - 90) * Math.PI) / 180;
    const x1 = Math.round((0.5 - Math.cos(rad) * 0.5) * 100);
    const y1 = Math.round((0.5 - Math.sin(rad) * 0.5) * 100);
    const x2 = Math.round((0.5 + Math.cos(rad) * 0.5) * 100);
    const y2 = Math.round((0.5 + Math.sin(rad) * 0.5) * 100);
    gradDef = `  <linearGradient id="g" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">\n${stops}\n  </linearGradient>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">\n  <defs>\n${gradDef}\n  </defs>\n  <rect width="400" height="200" fill="url(#g)"/>\n</svg>`;
}

function toTailwind(s: GradientState): string {
  const sorted = [...s.stops].sort((a, b) => a.position - b.position);
  if (sorted.length < 2) return "";
  const from = `from-[${sorted[0].color}]`;
  const to = `to-[${sorted[sorted.length - 1].color}]`;
  const via = sorted.length > 2 ? ` via-[${sorted[Math.floor(sorted.length / 2)].color}]` : "";
  const a = ((s.angle % 360) + 360) % 360;
  let dir = "bg-gradient-to-r";
  if (a >= 337.5 || a < 22.5) dir = "bg-gradient-to-t";
  else if (a < 67.5) dir = "bg-gradient-to-tr";
  else if (a < 112.5) dir = "bg-gradient-to-r";
  else if (a < 157.5) dir = "bg-gradient-to-br";
  else if (a < 202.5) dir = "bg-gradient-to-b";
  else if (a < 247.5) dir = "bg-gradient-to-bl";
  else if (a < 292.5) dir = "bg-gradient-to-l";
  else dir = "bg-gradient-to-tl";
  return `${dir} ${from}${via} ${to}`;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "gradient-history-v1";
let _nextId = 3;

const INITIAL: GradientState = {
  type: "linear", angle: 135, repeat: false,
  radialShape: "circle", radialSize: "farthest-corner", radialPosition: "center",
  stops: [
    { id: 1, color: "#6366f1", position: 0, opacity: 100 },
    { id: 2, color: "#ec4899", position: 100, opacity: 100 },
  ],
};

const mk = (t: GradientType, a: number, stops: Omit<ColorStop, "opacity">[]): GradientState => ({
  type: t, angle: a, repeat: false,
  radialShape: "circle", radialSize: "farthest-corner", radialPosition: "center",
  stops: stops.map((s) => ({ ...s, opacity: 100 })),
});

const PRESETS = [
  { name: "Sunset",   state: mk("linear", 135, [{ id: 1, color: "#f97316", position: 0 }, { id: 2, color: "#ec4899", position: 50 }, { id: 3, color: "#8b5cf6", position: 100 }]) },
  { name: "Ocean",    state: mk("linear", 135, [{ id: 1, color: "#06b6d4", position: 0 }, { id: 2, color: "#3b82f6", position: 100 }]) },
  { name: "Forest",   state: mk("linear", 135, [{ id: 1, color: "#22c55e", position: 0 }, { id: 2, color: "#065f46", position: 100 }]) },
  { name: "Fire",     state: mk("linear",  90, [{ id: 1, color: "#fde047", position: 0 }, { id: 2, color: "#f97316", position: 50 }, { id: 3, color: "#dc2626", position: 100 }]) },
  { name: "Aurora",   state: mk("linear", 135, [{ id: 1, color: "#34d399", position: 0 }, { id: 2, color: "#818cf8", position: 50 }, { id: 3, color: "#f472b6", position: 100 }]) },
  { name: "Midnight", state: mk("radial",   0, [{ id: 1, color: "#1e1b4b", position: 0 }, { id: 2, color: "#312e81", position: 100 }]) },
  { name: "Candy",    state: mk("linear", 135, [{ id: 1, color: "#f9a8d4", position: 0 }, { id: 2, color: "#c084fc", position: 50 }, { id: 3, color: "#818cf8", position: 100 }]) },
  { name: "Gold",     state: mk("linear", 135, [{ id: 1, color: "#fbbf24", position: 0 }, { id: 2, color: "#d97706", position: 100 }]) },
];

// ─── Select helper ───────────────────────────────────────────────────────────

function Sel({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ColorGradientClient() {
  const [gs, setGs] = useState<GradientState>(INITIAL);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("rect");
  const [bgMode, setBgMode] = useState<BgMode>("checker");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState<(GradientState & { ts: number })[]>([]);

  const undoStack = useRef<GradientState[]>([]);
  const redoStack = useRef<GradientState[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const css = buildCss(gs);

  // ─── History helpers ─────────────────────────────────────────────────────

  const update = useCallback((next: GradientState) => {
    setGs((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      return next;
    });
  }, []);

  const updateSilent = useCallback((next: GradientState) => setGs(next), []);

  const commitDrag = useCallback(() => {
    setGs((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      return prev;
    });
  }, []);

  const undo = useCallback(() => {
    if (!undoStack.current.length) return;
    setGs((prev) => { redoStack.current.push(prev); return undoStack.current.pop()!; });
  }, []);

  const redo = useCallback(() => {
    if (!redoStack.current.length) return;
    setGs((prev) => { undoStack.current.push(prev); return redoStack.current.pop()!; });
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.key === "y" || (e.key === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [undo, redo]);

  // ─── Saved history (localStorage) ───────────────────────────────────────

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch {}
  }, []);

  const saveToHistory = useCallback(() => {
    const next = [{ ...gs, ts: Date.now() }, ...saved].slice(0, 12);
    setSaved(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, [gs, saved]);

  // ─── Load from URL ───────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const g = new URLSearchParams(window.location.search).get("g");
      if (g) {
        const decoded = JSON.parse(atob(g)) as GradientState;
        _nextId = Math.max(...decoded.stops.map((s) => s.id)) + 1;
        setGs(decoded);
      }
    } catch {}
  }, []);

  // ─── Gradient bar drag ───────────────────────────────────────────────────

  const barPos = (clientX: number) => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, Math.round(((clientX - rect.left) / rect.width) * 100)));
  };

  const handleBarClick = (e: React.MouseEvent) => {
    if (didDragRef.current) return;
    const pos = barPos(e.clientX);
    const newStop: ColorStop = { id: _nextId++, color: "#ffffff", position: pos, opacity: 100 };
    update({ ...gs, stops: [...gs.stops, newStop] });
    setActiveId(newStop.id);
  };

  // ─── Stop helpers ────────────────────────────────────────────────────────

  const addStop = () => {
    const newStop: ColorStop = { id: _nextId++, color: "#f59e0b", position: 50, opacity: 100 };
    update({ ...gs, stops: [...gs.stops, newStop] });
    setActiveId(newStop.id);
  };

  const removeStop = (id: number) => {
    if (gs.stops.length <= 2) return;
    update({ ...gs, stops: gs.stops.filter((s) => s.id !== id) });
    if (activeId === id) setActiveId(null);
  };

  const setStop = (id: number, field: keyof ColorStop, value: string | number) =>
    update({ ...gs, stops: gs.stops.map((s) => (s.id === id ? { ...s, [field]: value } : s)) });

  // ─── Actions ─────────────────────────────────────────────────────────────

  const applyPreset = (p: typeof PRESETS[0]) => {
    _nextId = p.state.stops.length + 1;
    update({ ...p.state, stops: p.state.stops.map((s, i) => ({ ...s, id: i + 1 })) });
  };

  const randomize = () => {
    const g = randomGradient();
    _nextId = g.stops.length + 1;
    update(g);
  };

  const copy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  const downloadPng = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200; canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sorted = [...gs.stops].sort((a, b) => a.position - b.position);
    let fill: CanvasGradient;
    if (gs.type === "radial") {
      fill = ctx.createRadialGradient(600, 300, 0, 600, 300, 400);
    } else {
      const rad = ((gs.angle - 90) * Math.PI) / 180;
      const cx = 600, cy = 300, len = 700;
      fill = ctx.createLinearGradient(
        cx - Math.cos(rad) * len, cy - Math.sin(rad) * len,
        cx + Math.cos(rad) * len, cy + Math.sin(rad) * len,
      );
    }
    sorted.forEach((s) => fill.addColorStop(s.position / 100, hexToRgba(s.color, s.opacity)));
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, 1200, 600);
    const a = document.createElement("a");
    a.download = "gradient.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const shareUrl = async () => {
    const encoded = btoa(JSON.stringify(gs));
    const url = `${window.location.origin}${window.location.pathname}?g=${encoded}`;
    await copy(url, "share");
  };

  const downloadSvg = () => {
    const svg = toSvg(gs);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gradient.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ─── Computed ────────────────────────────────────────────────────────────

  const activeStop = gs.stops.find((s) => s.id === activeId);
  const bgClass = bgMode === "light" ? "bg-white" : bgMode === "dark" ? "bg-slate-900" : "";
  const bgStyle = bgMode === "checker" ? { background: "repeating-conic-gradient(#e2e8f0 0% 25%, white 0% 50%) 0 0 / 20px 20px" } : {};

  const formats = [
    { key: "css",      label: "CSS",           value: `background: ${css};` },
    { key: "tailwind", label: "Tailwind",       value: toTailwind(gs) },
    { key: "var",      label: "CSS Variable",   value: `--gradient: ${css};` },
    { key: "scss",     label: "SCSS Variable",  value: `$gradient: ${css};` },
    { key: "react",    label: "React inline",   value: `style={{ background: "${css}" }}` },
    { key: "svg",      label: "SVG",            value: toSvg(gs) },
  ];

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* Preview */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(["rect", "circle", "text", "button", "card", "hero"] as PreviewMode[]).map((m) => (
              <button key={m} onClick={() => setPreviewMode(m)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all ${previewMode === m ? "bg-white text-brand-700 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                {m}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(["checker", "light", "dark"] as BgMode[]).map((b) => (
              <button key={b} onClick={() => setBgMode(b)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition-all ${bgMode === b ? "bg-white text-brand-700 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 ${bgClass}`} style={bgStyle}>
          {previewMode === "rect" && <div className="h-52 w-full" style={{ background: css }} />}

          {previewMode === "circle" && (
            <div className="flex h-52 items-center justify-center">
              <div className="h-40 w-40 rounded-full shadow-xl" style={{ background: css }} />
            </div>
          )}

          {previewMode === "text" && (
            <div className="flex h-52 items-center justify-center px-4">
              <span className="select-none text-5xl font-black tracking-tight sm:text-6xl"
                style={{ backgroundImage: css, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Aa Bb Cc
              </span>
            </div>
          )}

          {previewMode === "button" && (
            <div className="flex h-52 flex-wrap items-center justify-center gap-4 p-4">
              <button className="rounded-full px-8 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: css }}>Get Started</button>
              <button className="rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: css }}>Learn More</button>
              <button className="rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-lg border border-white/30" style={{ background: css }}>Sign Up Free</button>
            </div>
          )}

          {previewMode === "card" && (
            <div className="flex h-64 items-center justify-center p-4">
              <div className="w-64 overflow-hidden rounded-2xl shadow-xl">
                <div className="h-32" style={{ background: css }} />
                <div className={`p-4 ${bgMode === "dark" ? "bg-slate-800" : "bg-white"}`}>
                  <div className="mb-2 h-3 w-3/4 rounded bg-slate-200" />
                  <div className="mb-1.5 h-2 w-full rounded bg-slate-100" />
                  <div className="h-2 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          )}

          {previewMode === "hero" && (
            <div className="relative flex h-56 flex-col items-center justify-center overflow-hidden px-6 text-center" style={{ background: css }}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Welcome</p>
                <h2 className="text-2xl font-extrabold text-white drop-shadow-sm">Your Amazing Headline</h2>
                <p className="text-sm text-white/80">A short subheading that supports the headline.</p>
                <button className="mt-2 rounded-full border border-white/30 bg-white/20 px-6 py-2 text-sm font-semibold text-white backdrop-blur">Explore →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons — right below preview */}
      <div className="flex flex-wrap gap-3">
        <button onClick={downloadPng}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" />
          </svg>
          Download PNG
        </button>
        <button onClick={() => copy(toSvg(gs), "copySvg")}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied === "copySvg" ? "Copied!" : "Copy SVG"}
        </button>
        <button onClick={downloadSvg}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" />
          </svg>
          Download SVG
        </button>
        <button onClick={shareUrl}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {copied === "share" ? "Link Copied!" : "Share URL"}
        </button>
        <button onClick={saveToHistory}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v5h6" />
          </svg>
          Save to History
        </button>
      </div>

      {/* Visual gradient bar */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Gradient Bar{" "}
          <span className="normal-case font-normal text-slate-400">— click to add, drag to move</span>
        </p>
        <div
          ref={barRef}
          className="relative h-10 w-full cursor-crosshair select-none rounded-xl border border-slate-200 shadow-inner"
          style={{ background: css }}
          onClick={handleBarClick}
        >
          {gs.stops.map((stop) => (
            <div
              key={stop.id}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-4 cursor-grab rounded-md border-2 shadow-md active:cursor-grabbing transition-shadow ${activeId === stop.id ? "border-brand-500 ring-2 ring-brand-300 shadow-lg" : "border-white"}`}
              style={{ left: `${stop.position}%`, background: stop.color }}
              onClick={(e) => { e.stopPropagation(); setActiveId(stop.id); }}
              onPointerDown={(e) => {
                e.stopPropagation();
                draggingRef.current = stop.id;
                didDragRef.current = false;
                setActiveId(stop.id);
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (draggingRef.current !== stop.id) return;
                didDragRef.current = true;
                const pos = barPos(e.clientX);
                updateSilent({ ...gs, stops: gs.stops.map((s) => (s.id === stop.id ? { ...s, position: pos } : s)) });
              }}
              onPointerUp={() => {
                if (draggingRef.current === stop.id) {
                  draggingRef.current = null;
                  if (didDragRef.current) commitDrag();
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Active stop editor */}
      {activeStop && (
        <div className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Editing Stop</p>
            {gs.stops.length > 2 && (
              <button onClick={() => removeStop(activeStop.id)} className="text-xs font-medium text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex items-center gap-3">
              <input type="color" value={activeStop.color}
                onChange={(e) => setStop(activeStop.id, "color", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0 p-0 shrink-0" />
              <span className="font-mono text-sm text-slate-700">{activeStop.color.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-1 text-xs font-semibold text-slate-500">Position — {activeStop.position}%</label>
              <div className="flex items-center gap-2">
                <input type="range" min={0} max={100} value={activeStop.position}
                  onChange={(e) => setStop(activeStop.id, "position", Number(e.target.value))}
                  className="flex-1 accent-brand-600" />
                <input type="number" min={0} max={100} value={activeStop.position}
                  onChange={(e) => setStop(activeStop.id, "position", Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs outline-none focus:border-brand-300" />
              </div>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-1 text-xs font-semibold text-slate-500">Opacity — {activeStop.opacity}%</label>
              <input type="range" min={0} max={100} value={activeStop.opacity}
                onChange={(e) => setStop(activeStop.id, "opacity", Number(e.target.value))}
                className="w-full accent-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* Presets + actions */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Presets</p>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => applyPreset(p)}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: buildCss(p.state) }} />
              {p.name}
            </button>
          ))}
          <div className="flex gap-1.5 ml-auto">
            <button onClick={undo} title="Undo (Ctrl+Z)" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors">↩ Undo</button>
            <button onClick={redo} title="Redo (Ctrl+Y)" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors">↪ Redo</button>
            <button onClick={randomize} className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors">🎲 Random</button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Options</p>

        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
            <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
              {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
                <button key={t} onClick={() => update({ ...gs, type: t })}
                  className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-all ${gs.type === t ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer select-none items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2">
            <div className={`relative h-5 w-9 rounded-full transition-colors ${gs.repeat ? "bg-brand-600" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${gs.repeat ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm font-medium text-slate-700">Repeat</span>
            <input type="checkbox" className="sr-only" checked={gs.repeat}
              onChange={(e) => update({ ...gs, repeat: e.target.checked })} />
          </label>
        </div>

        {(gs.type === "linear" || gs.type === "conic") && (
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Angle — {gs.angle}°</label>
            <div className="flex items-center gap-3">
              <input type="range" min={0} max={360} value={gs.angle}
                onChange={(e) => update({ ...gs, angle: Number(e.target.value) })}
                className="flex-1 accent-brand-600" />
              <input type="number" min={0} max={360} value={gs.angle}
                onChange={(e) => update({ ...gs, angle: Math.min(360, Math.max(0, Number(e.target.value))) })}
                className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm outline-none focus:border-brand-300" />
            </div>
          </div>
        )}

        {gs.type === "radial" && (
          <div className="flex flex-wrap gap-4">
            <Sel label="Shape" value={gs.radialShape}
              onChange={(v) => update({ ...gs, radialShape: v as RadialShape })}
              options={[{ value: "circle", label: "Circle" }, { value: "ellipse", label: "Ellipse" }]} />
            <Sel label="Size" value={gs.radialSize}
              onChange={(v) => update({ ...gs, radialSize: v as RadialSize })}
              options={[
                { value: "farthest-corner", label: "Farthest Corner" },
                { value: "farthest-side",   label: "Farthest Side" },
                { value: "closest-corner",  label: "Closest Corner" },
                { value: "closest-side",    label: "Closest Side" },
              ]} />
            <Sel label="Position" value={gs.radialPosition}
              onChange={(v) => update({ ...gs, radialPosition: v as RadialPosition })}
              options={[
                { value: "center",       label: "Center" },
                { value: "top",          label: "Top" },
                { value: "bottom",       label: "Bottom" },
                { value: "left",         label: "Left" },
                { value: "right",        label: "Right" },
                { value: "top left",     label: "Top Left" },
                { value: "top right",    label: "Top Right" },
                { value: "bottom left",  label: "Bottom Left" },
                { value: "bottom right", label: "Bottom Right" },
              ]} />
          </div>
        )}
      </div>

      {/* All stops list */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">All Stops</p>
          <button onClick={addStop} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors">+ Add Stop</button>
        </div>
        <div className="space-y-2">
          {[...gs.stops].sort((a, b) => a.position - b.position).map((stop) => (
            <div key={stop.id} onClick={() => setActiveId(stop.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${activeId === stop.id ? "border-brand-300 bg-brand-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}>
              <input type="color" value={stop.color}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setStop(stop.id, "color", e.target.value)}
                className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border-0 p-0" />
              <span className="w-20 shrink-0 font-mono text-xs text-slate-700">{stop.color.toUpperCase()}</span>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input type="range" min={0} max={100} value={stop.position}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setStop(stop.id, "position", Number(e.target.value))}
                  className="flex-1 accent-brand-600" />
                <span className="w-9 shrink-0 text-right text-xs text-slate-500">{stop.position}%</span>
              </div>
              <span className="w-9 shrink-0 text-right text-xs text-slate-400">{stop.opacity}%</span>
              {gs.stops.length > 2 && (
                <button onClick={(e) => { e.stopPropagation(); removeStop(stop.id); }}
                  className="shrink-0 text-slate-300 hover:text-red-400 transition-colors">✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS output */}
      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">CSS Output</p>
          <button onClick={() => copy(`background: ${css};`, "css")}
            className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-brand-600 hover:text-white transition-colors">
            {copied === "css" ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <code className="block break-all text-sm text-emerald-400">background: {css};</code>
      </div>

      {/* All formats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {formats.map((f) => (
          <div key={f.key} className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{f.label}</span>
              <button onClick={() => copy(f.value, f.key)}
                className={`text-xs font-semibold transition-colors ${copied === f.key ? "text-emerald-600" : "text-brand-600 hover:underline"}`}>
                {copied === f.key ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="block break-all text-xs leading-relaxed text-slate-700">{f.value}</code>
          </div>
        ))}
      </div>

      {/* Saved history */}
      {saved.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Saved History</p>
          <div className="flex flex-wrap gap-2">
            {saved.map((h) => (
              <button key={h.ts}
                onClick={() => { _nextId = Math.max(...h.stops.map((s) => s.id)) + 1; update(h); }}
                title={new Date(h.ts).toLocaleString()}
                className="h-12 w-20 overflow-hidden rounded-xl border-2 border-slate-200 shadow-sm hover:border-brand-300 transition-colors">
                <div className="h-full w-full" style={{ background: buildCss(h) }} />
              </button>
            ))}
            <button onClick={() => { setSaved([]); try { localStorage.removeItem(STORAGE_KEY); } catch {} }}
              className="h-12 rounded-xl border-2 border-dashed border-slate-200 px-3 text-xs text-slate-400 hover:border-red-300 hover:text-red-400 transition-colors">
              Clear
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
