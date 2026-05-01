"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

type Tab = "draw" | "type";
type Placement = "last" | "all";
type Position = "bottom-right" | "bottom-center" | "bottom-left";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfSignClient() {
  const [file, setFile] = useState<File | null>(null);
  const [tab, setTab] = useState<Tab>("draw");
  const [typedName, setTypedName] = useState("");
  const [placement, setPlacement] = useState<Placement>("last");
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sigSize, setSigSize] = useState(120);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastPos.current) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
    setHasSignature(true);
  }, [isDrawing]);

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, [startDraw, draw, stopDraw]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const getSignaturePng = (): string | null => {
    if (tab === "draw") {
      const canvas = canvasRef.current;
      if (!canvas || !hasSignature) return null;
      return canvas.toDataURL("image/png");
    } else {
      if (!typedName.trim()) return null;
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 100;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "italic 52px Georgia, serif";
      ctx.fillStyle = "#1e293b";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName, 10, 52);
      return canvas.toDataURL("image/png");
    }
  };

  const handleSign = useCallback(async () => {
    if (!file) return;
    const pngDataUrl = getSignaturePng();
    if (!pngDataUrl) { setError("Please draw or type your signature first."); return; }

    setProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);

      const base64 = pngDataUrl.split(",")[1];
      const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const pngImage = await doc.embedPng(imgBytes);

      const pages = doc.getPages();
      const targetPages = placement === "last" ? [pages[pages.length - 1]] : pages;
      const imgAspect = pngImage.width / pngImage.height;
      const sigW = sigSize;
      const sigH = sigW / imgAspect;
      const pad = 20;

      for (const page of targetPages) {
        const { width, height } = page.getSize();
        let x = 0;
        switch (position) {
          case "bottom-right":  x = width - sigW - pad; break;
          case "bottom-center": x = (width - sigW) / 2; break;
          case "bottom-left":   x = pad; break;
        }
        page.drawImage(pngImage, { x, y: pad, width: sigW, height: sigH });
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign PDF.");
    } finally {
      setProcessing(false);
    }
  }, [file, tab, hasSignature, typedName, placement, position, sigSize]);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setResultUrl(null);
    setError(null);
    clearCanvas();
    setTypedName("");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFilesAccepted={(f) => { setFile(f[0]); setError(null); setResultUrl(null); }} accept={{ "application/pdf": [".pdf"] }} label="Drop your PDF here" sublabel="or click to browse" />
      ) : (
        <>
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">Change file</button>
          </div>

          {!resultUrl && (
            <div className="card p-5 space-y-5">
              {/* Tabs */}
              <div className="flex rounded-xl border border-gray-200 p-1 gap-1">
                {(["draw", "type"] as Tab[]).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === t ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                    {t === "draw" ? "✏ Draw" : "Aa Type"}
                  </button>
                ))}
              </div>

              {tab === "draw" ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Draw your signature</span>
                    <button onClick={clearCanvas} className="text-xs text-gray-400 hover:text-red-500">Clear</button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={150}
                    className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-white cursor-crosshair touch-none"
                    style={{ height: "120px" }}
                  />
                  <p className="mt-1 text-xs text-gray-400 text-center">Draw with mouse or finger</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type your name</label>
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  {typedName && (
                    <p className="mt-2 text-center" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "28px", color: "#1e293b" }}>
                      {typedName}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Place on</label>
                  <div className="flex gap-2">
                    {(["last", "all"] as Placement[]).map((p) => (
                      <button key={p} onClick={() => setPlacement(p)} className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${placement === p ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-600"}`}>
                        {p === "last" ? "Last page" : "All pages"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <div className="flex gap-2">
                    {([
                      { key: "bottom-left", label: "Left" },
                      { key: "bottom-center", label: "Center" },
                      { key: "bottom-right", label: "Right" },
                    ] as { key: Position; label: string }[]).map(({ key, label }) => (
                      <button key={key} onClick={() => setPosition(key)} className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${position === key ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-600"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Signature width: {sigSize}px</label>
                <input type="range" min={60} max={250} value={sigSize} onChange={(e) => setSigSize(Number(e.target.value))} className="w-full accent-violet-600" />
              </div>

              <button onClick={handleSign} disabled={processing} className="btn-primary w-full">
                {processing ? "Signing PDF…" : "Sign PDF"}
              </button>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ PDF signed successfully</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a href={resultUrl} download={file.name.replace(/\.pdf$/i, "") + "_signed.pdf"} className="btn-primary inline-block">Download Signed PDF</a>
              <div><button onClick={reset} className="btn-secondary text-sm">Sign Another PDF</button></div>
            </div>
          )}

          {error && <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}
        </>
      )}
    </div>
  );
}
