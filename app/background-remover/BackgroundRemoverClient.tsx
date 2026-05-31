"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";

type Status = "idle" | "processing" | "done" | "error";
type BgType = "transparent" | "color" | "gradient" | "image";
type OutputFormat = "png" | "webp";
type GradientDir = "diagonal" | "to right" | "to bottom";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  resultUrl: string | null;
  status: Status;
  progressLabel: string;
  error: string;
}

interface CanvasOptions {
  bgType: BgType;
  bgColor: string;
  bgImageUrl: string | null;
  gradientColor1: string;
  gradientColor2: string;
  gradientDir: GradientDir;
  cropToSubject: boolean;
  smoothEdges: boolean;
  flipH: boolean;
  flipV: boolean;
  brightness: number;
  contrast: number;
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowOpacity: number;
  shadowColor: string;
  borderEnabled: boolean;
  borderWidth: number;
  borderColor: string;
  alphaThreshold: number;
}

const COLOR_PRESETS = [
  "#ffffff", "#f1f5f9", "#e2e8f0", "#94a3b8",
  "#1e293b", "#000000", "#ef4444", "#f97316",
  "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
];

function applyAlphaThreshold(img: HTMLImageElement, threshold: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  if (threshold <= 0) return c;
  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const { data } = imageData;
  const thresh = Math.round(threshold * 2.55);
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < thresh) data[i] = 0;
  }
  ctx.putImageData(imageData, 0, 0);
  return c;
}

function createTintedCanvas(img: HTMLImageElement | HTMLCanvasElement, color: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, c.width, c.height);
  return c;
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

async function cleanBlobAlpha(blob: Blob, threshold: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      if (threshold > 0) {
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const { data } = imageData;
        const thresh = Math.round(threshold * 2.55);
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < thresh) data[i] = 0;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      c.toBlob((b) => {
        if (!b) { reject(new Error("toBlob failed")); return; }
        resolve(URL.createObjectURL(b));
      }, "image/png");
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

async function buildFinalCanvas(resultUrl: string, opts: CanvasOptions): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Apply alpha threshold cleanup before any compositing
      const src = applyAlphaThreshold(img, opts.alphaThreshold);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;

      const drawBg = () => {
        if (opts.bgType === "color") {
          ctx.fillStyle = opts.bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (opts.bgType === "gradient") {
          const x2 = opts.gradientDir !== "to bottom" ? canvas.width : 0;
          const y2 = opts.gradientDir !== "to right" ? canvas.height : 0;
          const grad = ctx.createLinearGradient(0, 0, x2, y2);
          grad.addColorStop(0, opts.gradientColor1);
          grad.addColorStop(1, opts.gradientColor2);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      };

      const drawSubject = () => {
        // Offscreen composite: border + subject (with flip + filters)
        const comp = document.createElement("canvas");
        comp.width = canvas.width;
        comp.height = canvas.height;
        const cc = comp.getContext("2d")!;

        cc.save();
        if (opts.flipH || opts.flipV) {
          cc.translate(opts.flipH ? comp.width : 0, opts.flipV ? comp.height : 0);
          cc.scale(opts.flipH ? -1 : 1, opts.flipV ? -1 : 1);
        }

        // Border: draw tinted copies offset in a circle
        if (opts.borderEnabled && opts.borderWidth > 0) {
          const tinted = createTintedCanvas(src, opts.borderColor);
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            cc.drawImage(tinted, Math.cos(angle) * opts.borderWidth, Math.sin(angle) * opts.borderWidth);
          }
        }

        // Subject with filters
        const filters: string[] = [];
        if (opts.smoothEdges) filters.push("blur(0.6px)");
        if (opts.brightness !== 100) filters.push(`brightness(${opts.brightness}%)`);
        if (opts.contrast !== 100) filters.push(`contrast(${opts.contrast}%)`);
        if (filters.length) cc.filter = filters.join(" ");
        cc.drawImage(src, 0, 0);
        cc.restore();

        // Draw composite onto main canvas, with optional shadow
        if (opts.shadowEnabled) {
          const opHex = Math.round(opts.shadowOpacity * 2.55).toString(16).padStart(2, "0");
          ctx.shadowColor = `${opts.shadowColor}${opHex}`;
          ctx.shadowBlur = opts.shadowBlur;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = Math.round(opts.shadowBlur * 0.35);
        }
        ctx.drawImage(comp, 0, 0);
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      };

      const finish = () => resolve(opts.cropToSubject ? cropCanvas(canvas) : canvas);

      if (opts.bgType === "image" && opts.bgImageUrl) {
        const bgImg = new Image();
        bgImg.onload = () => { ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); drawSubject(); finish(); };
        bgImg.onerror = reject;
        bgImg.src = opts.bgImageUrl;
      } else {
        drawBg();
        drawSubject();
        finish();
      }
    };
    img.onerror = reject;
    img.src = resultUrl;
  });
}

export default function BackgroundRemoverClient() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Background
  const [bgType, setBgType] = useState<BgType>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [gradientColor1, setGradientColor1] = useState("#6366f1");
  const [gradientColor2, setGradientColor2] = useState("#06b6d4");
  const [gradientDir, setGradientDir] = useState<GradientDir>("diagonal");

  // Effects
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowOpacity, setShadowOpacity] = useState(50);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [borderEnabled, setBorderEnabled] = useState(false);
  const [borderWidth, setBorderWidth] = useState(6);
  const [borderColor, setBorderColor] = useState("#ffffff");

  // Adjustments
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [alphaThreshold, setAlphaThreshold] = useState(10);

  // Output
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [cropToSubject, setCropToSubject] = useState(false);
  const [smoothEdges, setSmoothEdges] = useState(false);

  // UI
  const [sliderPos, setSliderPos] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [copyDone, setCopyDone] = useState(false);
  const bgImageInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const doneCount = items.filter((i) => i.status === "done").length;
  const idleCount = items.filter((i) => i.status === "idle").length;
  const isProcessing = items.some((i) => i.status === "processing");

  const canvasOpts = (): CanvasOptions => ({
    bgType, bgColor, bgImageUrl,
    gradientColor1, gradientColor2, gradientDir,
    cropToSubject, smoothEdges,
    flipH, flipV, brightness, contrast,
    shadowEnabled, shadowBlur, shadowOpacity, shadowColor,
    borderEnabled, borderWidth, borderColor,
    alphaThreshold,
  });

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
        model: "medium",
        output: { format: "image/png", quality: 1 },
        progress: (key: string, current: number, total: number) => {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          const label = key.includes("fetch") ? `Downloading model... ${pct}%` : "Removing background...";
          setItems((prev) => prev.map((i) => i.id === id ? { ...i, progressLabel: label } : i));
        },
      });

      // Apply alpha cleanup to the raw result so preview is also clean
      const cleanedUrl = await cleanBlobAlpha(blob, alphaThreshold);
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "done", progressLabel: "", resultUrl: cleanedUrl } : i));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "error", error: `Failed: ${msg.slice(0, 100)}` } : i));
    }
  };

  const processAll = () => items.filter((i) => i.status === "idle").forEach((i) => processItem(i.id, i.file));

  const getCanvas = (item: ImageItem) => buildFinalCanvas(item.resultUrl!, canvasOpts());

  const handleDownload = async (item: ImageItem) => {
    const canvas = await getCanvas(item);
    const a = document.createElement("a");
    a.href = canvas.toDataURL(`image/${outputFormat}`);
    a.download = `${item.file.name.replace(/\.[^/.]+$/, "")}_no_bg.${outputFormat}`;
    a.click();
  };

  const handleDownloadAll = async () => {
    for (const item of items.filter((i) => i.status === "done")) await handleDownload(item);
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

  const gradientCss =
    gradientDir === "to right" ? `linear-gradient(90deg, ${gradientColor1}, ${gradientColor2})`
    : gradientDir === "to bottom" ? `linear-gradient(180deg, ${gradientColor1}, ${gradientColor2})`
    : `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`;

  const comparisonBg =
    bgType === "color" ? { background: bgColor }
    : bgType === "gradient" ? { background: gradientCss }
    : bgType === "image" && bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundImage: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%)", backgroundSize: "20px 20px" };

  const previewFilter = [
    `brightness(${brightness}%)`,
    `contrast(${contrast}%)`,
    shadowEnabled ? `drop-shadow(0 ${Math.round(shadowBlur * 0.35)}px ${shadowBlur}px ${shadowColor}${Math.round(shadowOpacity * 2.55).toString(16).padStart(2, "0")})` : "",
    borderEnabled ? `drop-shadow(0 0 ${borderWidth}px ${borderColor}) drop-shadow(0 0 ${borderWidth}px ${borderColor})` : "",
  ].filter(Boolean).join(" ");

  const ToggleBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
        active ? "bg-brand-50 text-brand-700 border-brand-300" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className={`h-3 w-3 rounded-full border-2 transition-colors ${active ? "bg-brand-600 border-brand-600" : "border-gray-300"}`} />
      {label}
    </button>
  );

  // Settings panel — shown after result
  const SettingsPanel = () => (
    <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">

      {/* Background */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Background</p>
        <div className="flex flex-wrap gap-2">
          {(["transparent", "color", "gradient", "image"] as BgType[]).map((type) => (
            <button key={type} onClick={() => setBgType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${bgType === type ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {bgType === "color" && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-7 w-12 cursor-pointer rounded border border-gray-200" />
              <span className="text-xs text-gray-400">{bgColor}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_PRESETS.map((c) => (
                <button key={c} onClick={() => setBgColor(c)} title={c}
                  className={`h-6 w-6 rounded border-2 transition-all ${bgColor === c ? "border-brand-500 scale-110" : "border-gray-200 hover:border-gray-400"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        )}
        {bgType === "gradient" && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <input type="color" value={gradientColor1} onChange={(e) => setGradientColor1(e.target.value)} className="h-7 w-10 cursor-pointer rounded border border-gray-200" />
              <span className="text-xs text-gray-400">→</span>
              <input type="color" value={gradientColor2} onChange={(e) => setGradientColor2(e.target.value)} className="h-7 w-10 cursor-pointer rounded border border-gray-200" />
              <div className="flex gap-1">
                {([["diagonal", "↘"], ["to right", "→"], ["to bottom", "↓"]] as [GradientDir, string][]).map(([dir, icon]) => (
                  <button key={dir} onClick={() => setGradientDir(dir)} title={dir}
                    className={`h-7 w-7 flex items-center justify-center rounded border text-sm transition-colors ${gradientDir === dir ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"}`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-5 w-full rounded border border-gray-100" style={{ background: gradientCss }} />
          </div>
        )}
        {bgType === "image" && (
          <div className="flex items-center gap-2">
            <button onClick={() => bgImageInputRef.current?.click()} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-brand-400 transition-colors">
              {bgImageUrl ? "Change Image" : "Upload Image"}
            </button>
            {bgImageUrl && <img src={bgImageUrl} alt="bg" className="h-7 w-10 object-cover rounded" />}
            <input ref={bgImageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setBgImageUrl(URL.createObjectURL(f)); }} />
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Effects */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Effects</p>
        <div className="flex flex-wrap gap-2">
          <ToggleBtn label="Drop Shadow" active={shadowEnabled} onClick={() => setShadowEnabled(!shadowEnabled)} />
          <ToggleBtn label="Border" active={borderEnabled} onClick={() => setBorderEnabled(!borderEnabled)} />
        </div>
        {shadowEnabled && (
          <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">Color</span>
              <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="h-6 w-10 cursor-pointer rounded border border-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">Blur</span>
              <input type="range" min="0" max="60" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
              <span className="text-xs text-gray-400 w-6 text-right">{shadowBlur}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">Opacity</span>
              <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => setShadowOpacity(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
              <span className="text-xs text-gray-400 w-6 text-right">{shadowOpacity}%</span>
            </div>
          </div>
        )}
        {borderEnabled && (
          <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">Color</span>
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="h-6 w-10 cursor-pointer rounded border border-gray-200" />
              <div className="flex gap-1 ml-1">
                {["#ffffff", "#000000", "#ef4444", "#3b82f6", "#22c55e", "#f97316"].map((c) => (
                  <button key={c} onClick={() => setBorderColor(c)} className={`h-5 w-5 rounded border-2 ${borderColor === c ? "border-brand-500" : "border-gray-200"}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">Width</span>
              <input type="range" min="1" max="30" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
              <span className="text-xs text-gray-400 w-8 text-right">{borderWidth}px</span>
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Adjustments */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Adjustments</p>
        <div className="flex flex-wrap gap-2">
          <ToggleBtn label="Flip H" active={flipH} onClick={() => setFlipH(!flipH)} />
          <ToggleBtn label="Flip V" active={flipV} onClick={() => setFlipV(!flipV)} />
          <ToggleBtn label="Crop to Subject" active={cropToSubject} onClick={() => setCropToSubject(!cropToSubject)} />
          <ToggleBtn label="Smooth Edges" active={smoothEdges} onClick={() => setSmoothEdges(!smoothEdges)} />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-20">Brightness</span>
            <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
            <span className="text-xs text-gray-400 w-8 text-right">{brightness}%</span>
            {brightness !== 100 && <button onClick={() => setBrightness(100)} className="text-xs text-gray-400 hover:text-gray-600">↺</button>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-20">Contrast</span>
            <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
            <span className="text-xs text-gray-400 w-8 text-right">{contrast}%</span>
            {contrast !== 100 && <button onClick={() => setContrast(100)} className="text-xs text-gray-400 hover:text-gray-600">↺</button>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-20">Edge Cleanup</span>
            <input type="range" min="0" max="50" value={alphaThreshold} onChange={(e) => setAlphaThreshold(Number(e.target.value))} className="flex-1 h-1.5 accent-brand-600" />
            <span className="text-xs text-gray-400 w-8 text-right">{alphaThreshold}</span>
            {alphaThreshold !== 10 && <button onClick={() => setAlphaThreshold(10)} className="text-xs text-gray-400 hover:text-gray-600">↺</button>}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Format */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Format:</span>
        {(["png", "webp"] as OutputFormat[]).map((fmt) => (
          <button key={fmt} onClick={() => setOutputFormat(fmt)}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${outputFormat === fmt ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"}`}>
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="card space-y-5">

      {/* ── DROP ZONE ── */}
      {!isProcessing && (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          label="Drop images here"
          sublabel="JPG, PNG, WebP · Multiple files supported"
        />
      )}

      {/* ── IMAGE QUEUE ── */}
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
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-white border-t-transparent" style={{ willChange: "transform", transform: "translateZ(0)", animation: "spin 0.85s linear infinite", animationPlayState: "running" }} />
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

      {/* ── SELECTED ITEM ACTIONS ── */}
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
                  0%, 100% { transform: translateY(0); opacity: 0.35; }
                  50% { transform: translateY(-5px); opacity: 1; }
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
              <button onClick={() => processItem(selectedItem.id, selectedItem.file)} className="btn-primary text-sm">Retry</button>
            </div>
          )}

          {selectedItem.status === "done" && selectedItem.resultUrl && (
            <>
              {/* ── SETTINGS (shown after result) ── */}
              <SettingsPanel />

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

                <div className="relative overflow-hidden rounded-xl border border-gray-100 select-none bg-white" style={{ height: "280px" }}>
                  {/* BEFORE */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedItem.previewUrl} alt="original" className="max-h-full max-w-full object-contain" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }} />
                  </div>
                  {/* AFTER */}
                  <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)`, ...comparisonBg }}>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedItem.resultUrl}
                        alt="result"
                        className="max-h-full max-w-full object-contain"
                        style={{
                          transform: `scale(${zoom}) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                          transformOrigin: "center",
                          filter: previewFilter || undefined,
                        }}
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
                  <span className="absolute bottom-2 left-2 z-10 text-xs font-semibold text-white bg-black bg-opacity-40 px-1.5 py-0.5 rounded pointer-events-none">Before</span>
                  <span className="absolute bottom-2 right-2 z-10 text-xs font-semibold text-white bg-black bg-opacity-40 px-1.5 py-0.5 rounded pointer-events-none">After</span>
                  <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
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
                onClick={() => setItems((prev) => prev.map((i) => i.id === selectedItem.id ? { ...i, status: "idle", resultUrl: null } : i))}
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
