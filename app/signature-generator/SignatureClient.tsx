"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type Tool = "draw" | "type";
type FontStyle = "cursive" | "serif" | "script" | "elegant";

const FONTS: { key: FontStyle; label: string; family: string }[] = [
  { key: "cursive",  label: "Cursive",  family: "'Dancing Script', cursive" },
  { key: "script",   label: "Script",   family: "'Pacifico', cursive" },
  { key: "elegant",  label: "Elegant",  family: "'Great Vibes', cursive" },
  { key: "serif",    label: "Serif",    family: "'Playfair Display', serif" },
];

const COLORS = ["#000000", "#1e3a5f", "#7c2d12", "#064e3b", "#4c1d95", "#831843"];
const THICKNESS = [2, 3, 5, 8];

export default function SignatureClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("draw");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(3);
  const [typedText, setTypedText] = useState("");
  const [fontStyle, setFontStyle] = useState<FontStyle>("cursive");
  const [transparent, setTransparent] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const W = 600, H = 220;

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const clearCanvas = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    if (!transparent) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
    }
    setHasContent(false);
  }, [transparent]);

  useEffect(() => { clearCanvas(); }, [transparent, clearCanvas]);

  // render typed signature
  useEffect(() => {
    if (tool !== "type") return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    if (!transparent) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H); }
    if (!typedText.trim()) { setHasContent(false); return; }
    const font = FONTS.find((f) => f.key === fontStyle)!;
    ctx.font = `72px ${font.family}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedText, W / 2, H / 2);
    setHasContent(true);
  }, [typedText, fontStyle, color, transparent, tool]);

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (tool !== "draw") return;
    e.preventDefault();
    const ctx = getCtx(); if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    lastPos.current = p;
    setDrawing(true);
  };

  const doDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing || tool !== "draw") return;
    e.preventDefault();
    const ctx = getCtx(); if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = p;
    setHasContent(true);
  };

  const endDraw = () => setDrawing(false);

  const copySvg = async () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><image href="${dataUrl}" width="${W}" height="${H}"/></svg>`;
    await navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = (fmt: "png" | "svg") => {
    const canvas = canvasRef.current; if (!canvas) return;
    if (fmt === "png") {
      const a = document.createElement("a");
      a.download = "signature.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    } else {
      const dataUrl = canvas.toDataURL("image/png");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><image href="${dataUrl}" width="${W}" height="${H}"/></svg>`;
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.download = "signature.svg";
      a.href = URL.createObjectURL(blob);
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Pacifico&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />

      <div className="space-y-5">
        {/* Tool toggle */}
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit">
          {(["draw", "type"] as Tool[]).map((t) => (
            <button key={t} onClick={() => { setTool(t); clearCanvas(); setTypedText(""); }}
              className={`rounded-lg px-5 py-2 text-sm font-semibold capitalize transition-all ${tool === t ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              {t === "draw" ? "✍️ Draw" : "⌨️ Type"}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed ${drawing ? "border-brand-400" : "border-slate-200"} ${transparent ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTJlOGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')]" : "bg-white"}`}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full cursor-crosshair touch-none"
            style={{ cursor: tool === "draw" ? "crosshair" : "default" }}
            onMouseDown={startDraw}
            onMouseMove={doDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={doDraw}
            onTouchEnd={endDraw}
          />
          {!hasContent && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-slate-300">{tool === "draw" ? "Draw your signature here" : "Type and preview your signature"}</p>
            </div>
          )}
        </div>

        {/* Type input */}
        {tool === "type" && (
          <input
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Type your name…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
        )}

        {/* Options */}
        <div className="flex flex-wrap gap-5 items-end rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {/* Color */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Color</p>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-brand-500 scale-110" : "border-white shadow-sm"}`}
                  style={{ background: c }} />
              ))}
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="h-7 w-7 cursor-pointer rounded-full border-2 border-white shadow-sm p-0" />
            </div>
          </div>

          {/* Thickness — draw only */}
          {tool === "draw" && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Thickness</p>
              <div className="flex gap-2 items-center">
                {THICKNESS.map((t) => (
                  <button key={t} onClick={() => setThickness(t)}
                    className={`flex items-center justify-center h-8 w-8 rounded-lg border transition-all ${thickness === t ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white"}`}>
                    <div className="rounded-full bg-slate-700" style={{ width: t * 2.5, height: t * 2.5 }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Font — type only */}
          {tool === "type" && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Style</p>
              <div className="flex gap-2 flex-wrap">
                {FONTS.map((f) => (
                  <button key={f.key} onClick={() => setFontStyle(f.key)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${fontStyle === f.key ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                    style={{ fontFamily: f.family }}>
                    {typedText || "Sign"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Transparent bg */}
          <label className="ml-auto flex cursor-pointer select-none items-center gap-2">
            <div className={`relative h-5 w-9 rounded-full transition-colors ${transparent ? "bg-brand-600" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${transparent ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm font-medium text-slate-700">Transparent</span>
            <input type="checkbox" className="sr-only" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} />
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => download("png")} disabled={!hasContent}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>
            Download PNG
          </button>
          <button onClick={() => download("svg")} disabled={!hasContent}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>
            Download SVG
          </button>
          <button onClick={copySvg} disabled={!hasContent}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            {copied ? "Copied!" : "Copy SVG"}
          </button>
          <button onClick={clearCanvas}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-500 hover:border-red-200 hover:text-red-500 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
