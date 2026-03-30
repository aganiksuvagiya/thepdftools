"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";

type Status = "idle" | "processing" | "done" | "error";
type BgType = "transparent" | "color" | "image";
type OutputFormat = "png" | "webp";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  resultUrl: string | null;
  status: Status;
  progressLabel: string;
  error: string;
}

async function buildFinalCanvas(
  resultUrl: string,
  bgType: BgType,
  bgColor: string,
  bgImageUrl: string | null,
  cropToSubject: boolean,
  smoothEdges: boolean
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;

      const drawResult = () => {
        if (smoothEdges) ctx.filter = "blur(0.6px)";
        ctx.drawImage(img, 0, 0);
        ctx.filter = "none";
        resolve(cropToSubject ? cropCanvas(canvas) : canvas);
      };

      if (bgType === "color") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawResult();
      } else if (bgType === "image" && bgImageUrl) {
        const bgImg = new Image();
        bgImg.onload = () => { ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); drawResult(); };
        bgImg.onerror = reject;
        bgImg.src = bgImageUrl;
      } else {
        drawResult();
      }
    };
    img.onerror = reject;
    img.src = resultUrl;
  });
}

function cropCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext("2d")!;
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 10) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }
  if (minX >= maxX || minY >= maxY) return canvas;
  const pad = 8;
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(canvas.width, maxX + pad); maxY = Math.min(canvas.height, maxY + pad);
  const out = document.createElement("canvas");
  out.width = maxX - minX; out.height = maxY - minY;
  out.getContext("2d")!.drawImage(canvas, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

export default function BackgroundRemoverClient() {
  // No preload - model loads on first use

  const [items, setItems] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bgType, setBgType] = useState<BgType>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [cropToSubject, setCropToSubject] = useState(false);
  const [smoothEdges, setSmoothEdges] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [copyDone, setCopyDone] = useState(false);
  const bgImageInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const doneCount = items.filter((i) => i.status === "done").length;
  const idleCount = items.filter((i) => i.status === "idle").length;

  const handleFiles = useCallback((files: File[]) => {
    const newItems: ImageItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      resultUrl: null,
      status: "idle" as Status,
      progressLabel: "",
      error: "",
    }));
    setItems((prev) => [...prev, ...newItems]);
    setSelectedId((prev) => prev ?? newItems[0]?.id ?? null);
  }, []);

  const processItem = async (id: string, file: File) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "processing", progressLabel: "Starting...", error: "" } : i));
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        device: "cpu",
        output: { format: "image/png", quality: 1 },
        progress: (key: string, current: number, total: number) => {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          const label = key.includes("fetch") ? `Downloading model... ${pct}%` : "Removing background...";
          setItems((prev) => prev.map((i) => i.id === id ? { ...i, progressLabel: label } : i));
        },
      });
      const url = URL.createObjectURL(blob);
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "done", progressLabel: "", resultUrl: url } : i));
    } catch (err: unknown) {
      console.error("BG Removal Error:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "error", error: `Failed: ${msg.slice(0, 100)}` } : i));
    }
  };

  const processAll = () => {
    items.filter((i) => i.status === "idle").forEach((i) => processItem(i.id, i.file));
  };

  const getCanvas = (item: ImageItem) =>
    buildFinalCanvas(item.resultUrl!, bgType, bgColor, bgImageUrl, cropToSubject, smoothEdges);

  const handleDownload = async (item: ImageItem) => {
    const canvas = await getCanvas(item);
    const a = document.createElement("a");
    a.href = canvas.toDataURL(`image/${outputFormat}`);
    a.download = `${item.file.name.replace(/\.[^/.]+$/, "")}_no_bg.${outputFormat}`;
    a.click();
  };

  const handleDownloadAll = async () => {
    for (const item of items.filter((i) => i.status === "done")) {
      await handleDownload(item);
    }
  };

  const handleCopy = async (item: ImageItem) => {
    const canvas = await getCanvas(item);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    }, `image/${outputFormat}`);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      setSelectedId((sel) => (sel === id ? updated[0]?.id ?? null : sel));
      return updated;
    });
  };

  const comparisonBg =
    bgType === "color"
      ? { background: bgColor }
      : bgType === "image" && bgImageUrl
      ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { backgroundImage: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%)", backgroundSize: "20px 20px" };

  return (
    <div className="card space-y-6">
      {/* Settings */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Background</p>
        <div className="flex flex-wrap gap-2">
          {(["transparent", "color", "image"] as BgType[]).map((type) => (
            <button
              key={type}
              onClick={() => setBgType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                bgType === type ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          {bgType === "color" && (
            <div className="flex items-center gap-2 ml-1">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-14 cursor-pointer rounded border border-gray-200"
              />
              <span className="text-xs text-gray-400">{bgColor}</span>
            </div>
          )}
          {bgType === "image" && (
            <div className="flex items-center gap-2 ml-1">
              <button
                onClick={() => bgImageInputRef.current?.click()}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:border-brand-400 transition-colors"
              >
                {bgImageUrl ? "Change Image" : "Upload Image"}
              </button>
              {bgImageUrl && <img src={bgImageUrl} alt="bg" className="h-7 w-10 object-cover rounded" />}
              <input ref={bgImageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setBgImageUrl(URL.createObjectURL(f)); }} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Format:</span>
            {(["png", "webp"] as OutputFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setOutputFormat(fmt)}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  outputFormat === fmt ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"
                }`}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
          {[
            { label: "Crop to Subject", value: cropToSubject, set: setCropToSubject },
            { label: "Smooth Edges", value: smoothEdges, set: setSmoothEdges },
          ].map(({ label, value, set }) => (
            <button
              key={label}
              onClick={() => set(!value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                value ? "bg-brand-50 text-brand-700 border-brand-300" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`h-3 w-3 rounded-full border-2 transition-colors ${value ? "bg-brand-600 border-brand-600" : "border-gray-300"}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Drop zone */}
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        label="Drop images here"
        sublabel="JPG, PNG, WebP · Multiple files supported"
      />

      {/* Image queue */}
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {items.length} image{items.length !== 1 ? "s" : ""} · {doneCount} done
            </p>
            <div className="flex gap-2">
              {idleCount > 0 && (
                <button onClick={processAll} className="btn-primary text-xs px-4 py-1.5">
                  Process All ({idleCount})
                </button>
              )}
              {doneCount > 1 && (
                <button onClick={handleDownloadAll} className="btn-secondary text-xs px-3 py-1.5">
                  Download All
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all w-16 h-16 ${
                  selectedId === item.id ? "border-brand-500" : "border-transparent hover:border-gray-200"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.previewUrl} alt={item.file.name} className="w-full h-full object-cover bg-gray-50" />
                <div className="absolute top-0.5 right-0.5">
                  {item.status === "done" && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                  )}
                  {item.status === "processing" && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 shadow">
                      <div
                        className="h-2.5 w-2.5 rounded-full border-2 border-white border-t-transparent"
                        style={{ willChange: "transform", transform: "translateZ(0)", animation: "spin 0.85s linear infinite", animationPlayState: "running" }}
                      />
                    </span>
                  )}
                  {item.status === "error" && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 shadow text-white text-xs font-bold">!</span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="absolute top-0.5 left-0.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
                >
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected item actions */}
      {selectedItem && (
        <div className="space-y-4 border-t border-gray-100 pt-4">
          {selectedItem.status === "idle" && (
            <button onClick={() => processItem(selectedItem.id, selectedItem.file)} className="btn-primary w-full">
              Remove Background
            </button>
          )}

          {selectedItem.status === "processing" && (
            <div className="rounded-xl overflow-hidden">
              <style>{`
                @keyframes dot-bounce {
                  0%, 100% { transform: translateY(0);   opacity: 0.35; }
                  50%       { transform: translateY(-5px); opacity: 1; }
                }
              `}</style>
              <div className="flex items-center justify-center py-16 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
                  {[0, 0.15, 0.3].map((d) => (
                    <div key={d} className="h-2 w-2 rounded-full" style={{ backgroundColor: "#6366f1", animation: `dot-bounce 0.9s ease-in-out ${d}s infinite`, willChange: "transform, opacity" }} />
                  ))}
                  <span className="text-sm font-medium text-gray-500 ml-1">
                    {selectedItem.progressLabel || "Removing background..."}
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedItem.status === "error" && (
            <div className="rounded-xl bg-red-50 p-4 text-center space-y-2">
              <p className="text-sm text-red-600">{selectedItem.error}</p>
              <button onClick={() => processItem(selectedItem.id, selectedItem.file)} className="btn-primary text-sm">
                Retry
              </button>
            </div>
          )}

          {selectedItem.status === "done" && selectedItem.resultUrl && (
            <>
              {/* Before / After comparison slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Before / After</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))} className="h-6 w-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-gray-400 text-base leading-none">−</button>
                    <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))} className="h-6 w-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-gray-400 text-base leading-none">+</button>
                    <button onClick={() => setZoom(1)} className="h-6 px-2 flex items-center justify-center rounded border border-gray-200 text-xs text-gray-500 hover:border-gray-400">Reset</button>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-xl border border-gray-100 select-none bg-white"
                  style={{ height: "280px" }}
                >
                  {/* BEFORE: original image on white/neutral bg */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedItem.previewUrl}
                      alt="Original"
                      className="max-h-full max-w-full object-contain"
                      style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
                    />
                  </div>
                  {/* AFTER: clipped to left, with selected background */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)`, ...comparisonBg }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedItem.resultUrl}
                        alt="Result"
                        className="max-h-full max-w-full object-contain"
                        style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
                      />
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none z-10" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                      </svg>
                    </div>
                  </div>
                  {/* Labels */}
                  <span className="absolute bottom-2 left-2 z-10 text-xs font-semibold text-white bg-black bg-opacity-40 px-1.5 py-0.5 rounded pointer-events-none">Before</span>
                  <span className="absolute bottom-2 right-2 z-10 text-xs font-semibold text-white bg-black bg-opacity-40 px-1.5 py-0.5 rounded pointer-events-none">After</span>
                  {/* Invisible range input for drag */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              </div>

              {/* Download + Copy */}
              <div className="flex gap-3">
                <button onClick={() => handleDownload(selectedItem)} className="btn-secondary flex-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {outputFormat.toUpperCase()}
                </button>
                <button onClick={() => handleCopy(selectedItem)} className="btn-secondary flex-1">
                  {copyDone ? (
                    <>
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="9" y="2" width="13" height="13" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => { setItems((prev) => prev.map((i) => i.id === selectedItem.id ? { ...i, status: "idle", resultUrl: null } : i)); }}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Process another image
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
