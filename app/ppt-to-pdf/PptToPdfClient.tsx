"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import { loadDeck, disposeDeck, renderSlide, getNotes, Deck } from "./pptx/render";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

interface ConversionResult {
  url: string;
  pdfSize: number;
  name: string;
  pageCount: number;
  slideCount: number;
  skippedHidden: number;
  notes: string[];
  preview: string;
}

type Quality = "high" | "standard" | "small";

const QUALITY: Record<Quality, { label: string; scale: number; jpeg: number }> = {
  high: { label: "High (sharpest, larger file)", scale: 2, jpeg: 0.92 },
  standard: { label: "Standard (recommended)", scale: 1.5, jpeg: 0.85 },
  small: { label: "Small file", scale: 1, jpeg: 0.7 },
};

const MAX_SIDE = 4096;
const PT_PER_PX = 0.75; // 96 dpi px -> pt

/** "1-5, 8, 10" -> set of slide numbers (1-based). Returns null when empty, throws on bad input. */
function parseRange(input: string, total: number): Set<number> | null {
  const text = input.trim();
  if (!text) return null;
  const out = new Set<number>();
  text.split(",").forEach((part) => {
    const p = part.trim();
    if (!p) return;
    const m = /^(\d+)\s*-\s*(\d+)$/.exec(p);
    if (m) {
      const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) out.add(i);
    } else if (/^\d+$/.test(p)) out.add(parseInt(p, 10));
    else throw new Error(`Slide range "${p}" is not valid. Use something like 1-5, 8, 10.`);
  });
  const valid = new Set<number>();
  out.forEach((n) => {
    if (n >= 1 && n <= total) valid.add(n);
  });
  if (!valid.size) throw new Error(`No slides match that range. This presentation has ${total} slides.`);
  return valid;
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) return reject(new Error("Could not encode a slide image."));
        resolve(new Uint8Array(await blob.arrayBuffer()));
      },
      "image/jpeg",
      quality
    );
  });
}

function wrapLines(g: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const out: string[] = [];
  text.split("\n").forEach((para) => {
    if (!para.trim()) {
      out.push("");
      return;
    }
    let line = "";
    para.split(/(\s+)/).forEach((tok) => {
      const test = line + tok;
      if (line && g.measureText(test).width > maxW) {
        out.push(line.replace(/\s+$/, ""));
        line = tok.replace(/^\s+/, "");
      } else line = test;
    });
    if (line.trim()) out.push(line);
  });
  return out;
}

function notesCanvas(deck: Deck, slideNo: number, notes: string, scale: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.round(deck.width * scale);
  c.height = Math.round(deck.height * scale);
  const g = c.getContext("2d") as CanvasRenderingContext2D;
  g.scale(scale, scale);
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, deck.width, deck.height);
  const pad = Math.max(40, deck.width * 0.05);
  g.fillStyle = "#111827";
  g.textBaseline = "alphabetic";
  g.font = `bold ${Math.round(deck.height * 0.04)}px Arial, sans-serif`;
  g.fillText(`Slide ${slideNo} – speaker notes`, pad, pad + deck.height * 0.03);
  let size = Math.round(deck.height * 0.032);
  let lines: string[] = [];
  const top = pad + deck.height * 0.09;
  for (; size >= 10; size -= 2) {
    g.font = `${size}px Arial, sans-serif`;
    lines = wrapLines(g, notes, deck.width - pad * 2);
    if (lines.length * size * 1.35 <= deck.height - top - pad) break;
  }
  g.font = `${size}px Arial, sans-serif`;
  g.fillStyle = "#1f2937";
  lines.forEach((l, i) => g.fillText(l, pad, top + (i + 1) * size * 1.35));
  return c;
}

export default function PptToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>("standard");
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeHidden, setIncludeHidden] = useState(false);
  const [range, setRange] = useState("");

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setResult(null);
    setError(null);
    setProgress("");
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setProgress("Reading file...");
    let deck: Deck | null = null;

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      deck = await loadDeck(await file.arrayBuffer());
      const total = deck.slides.length;
      const wanted = parseRange(range, total);

      const q = QUALITY[quality];
      const scale = Math.min(q.scale, MAX_SIDE / Math.max(deck.width, deck.height));
      const pageW = deck.width * PT_PER_PX;
      const pageH = deck.height * PT_PER_PX;

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const charSet = new Set<number>(font.getCharacterSet());

      const warnings: Record<string, number> = {};
      const addWarn = (k: string, n: number) => {
        warnings[k] = (warnings[k] || 0) + n;
      };
      let skippedHidden = 0;
      let preview = "";
      let rendered = 0;

      const list = deck.slides.filter((s) => {
        if (wanted && !wanted.has(s.index + 1)) return false;
        if (s.hidden && !includeHidden) {
          skippedHidden++;
          return false;
        }
        return true;
      });
      if (!list.length) throw new Error("There are no slides to convert (all selected slides are hidden). Turn on \"Include hidden slides\".");

      for (let i = 0; i < list.length; i++) {
        const ref = list[i];
        setProgress(`Rendering slide ${i + 1} of ${list.length}...`);
        await new Promise((r) => setTimeout(r, 0));

        let canvas: HTMLCanvasElement;
        let texts: Array<{ text: string; x: number; y: number; w: number; size: number }> = [];
        try {
          const res = await renderSlide(deck, ref, ref.index + 1, scale);
          canvas = res.canvas;
          texts = res.texts;
          Object.keys(res.warnings).forEach((k) => addWarn(k, res.warnings[k]));
        } catch {
          addWarn("failed", 1);
          canvas = document.createElement("canvas");
          canvas.width = Math.round(deck.width * scale);
          canvas.height = Math.round(deck.height * scale);
          const g = canvas.getContext("2d") as CanvasRenderingContext2D;
          g.fillStyle = "#ffffff";
          g.fillRect(0, 0, canvas.width, canvas.height);
          g.fillStyle = "#6b7280";
          g.font = `${Math.round(24 * scale)}px Arial, sans-serif`;
          g.fillText(`Slide ${ref.index + 1} could not be rendered`, 40 * scale, 60 * scale);
        }

        if (!preview) {
          const small = document.createElement("canvas");
          small.width = 640;
          small.height = Math.max(1, Math.round((640 * canvas.height) / canvas.width));
          small.getContext("2d")?.drawImage(canvas, 0, 0, small.width, small.height);
          preview = small.toDataURL("image/jpeg", 0.8);
        }

        const page = pdfDoc.addPage([pageW, pageH]);
        const img = await pdfDoc.embedJpg(await canvasToJpeg(canvas, q.jpeg));
        page.drawImage(img, { x: 0, y: 0, width: pageW, height: pageH });

        // invisible text layer so the PDF is searchable / copyable (Latin text)
        texts.forEach((t) => {
          const clean = Array.from(t.text)
            .map((ch) => (charSet.has(ch.codePointAt(0) as number) ? ch : " "))
            .join("")
            .replace(/\s+/g, " ")
            .trim();
          if (!/[A-Za-z0-9]/.test(clean)) return;
          const size = Math.max(1, (t.size / scale) * PT_PER_PX);
          const target = (t.w / scale) * PT_PER_PX;
          const natural = font.widthOfTextAtSize(clean, size);
          const fitted = natural > 0 && target > 0 ? Math.min(size * 2, Math.max(size * 0.4, (size * target) / natural)) : size;
          try {
            page.drawText(clean, {
              x: (t.x / scale) * PT_PER_PX,
              y: pageH - (t.y / scale) * PT_PER_PX,
              size: fitted,
              font,
              color: rgb(0, 0, 0),
              opacity: 0,
            });
          } catch {
            /* skip text we cannot encode */
          }
        });
        canvas.width = 0;
        canvas.height = 0;
        rendered++;

        if (includeNotes) {
          const notes = await getNotes(deck, ref);
          if (notes) {
            const nc = notesCanvas(deck, ref.index + 1, notes, Math.min(scale, 1.5));
            const np = pdfDoc.addPage([pageW, pageH]);
            const nimg = await pdfDoc.embedJpg(await canvasToJpeg(nc, 0.88));
            np.drawImage(nimg, { x: 0, y: 0, width: pageW, height: pageH });
            nc.width = 0;
            nc.height = 0;
            addWarn("notesPages", 1);
          }
        }
      }

      setProgress("Finalizing PDF...");
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      pdfDoc.setTitle(baseName);
      pdfDoc.setProducer("ThePDFTools");
      pdfDoc.setCreator("ThePDFTools PPT to PDF");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const notesOut: string[] = [];
      if (warnings.chart) notesOut.push(`${warnings.chart} chart${warnings.chart > 1 ? "s" : ""} of an unsupported type (such as scatter or radar) ${warnings.chart > 1 ? "were" : "was"} shown as a grey box.`);
      if (warnings.smartart) notesOut.push(`${warnings.smartart} SmartArt graphic${warnings.smartart > 1 ? "s" : ""} could not be drawn.`);
      if (warnings.image) notesOut.push("Some pictures (for example EMF/WMF) are in a format the browser cannot draw and were skipped.");
      if (warnings.object) notesOut.push("Some embedded objects (video, audio, OLE) were skipped.");
      if (warnings.failed) notesOut.push(`${warnings.failed} slide${warnings.failed > 1 ? "s" : ""} could not be rendered.`);

      setResult({
        url,
        pdfSize: blob.size,
        name: `${baseName}.pdf`,
        pageCount: pdfDoc.getPageCount(),
        slideCount: rendered,
        skippedHidden,
        notes: notesOut,
        preview,
      });
      setProgress("");
    } catch (err: any) {
      setError(err?.message || "Conversion failed. Please try again.");
    } finally {
      if (deck) disposeDeck(deck);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  const handleReset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError(null);
    setProgress("");
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
        }}
        label="Drop your PowerPoint file here"
        sublabel="PPTX only · Click to browse"
      />

      {file && (
        <>
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Remove</button>
            </div>
          </div>

          {!result && (
            <div className="grid gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Quality</span>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as Quality)}
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  {(Object.keys(QUALITY) as Quality[]).map((k) => (
                    <option key={k} value={k}>{QUALITY[k].label}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Slides (optional)</span>
                <input
                  type="text"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  disabled={loading}
                  placeholder="All slides, or e.g. 1-5, 8, 10"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={includeNotes} onChange={(e) => setIncludeNotes(e.target.checked)} disabled={loading} />
                Add speaker notes pages
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={includeHidden} onChange={(e) => setIncludeHidden(e.target.checked)} disabled={loading} />
                Include hidden slides
              </label>
            </div>
          )}

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-orange-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-orange-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-orange-700">{progress}</span>
            </div>
          )}

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-3 text-center">
              {result.preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result.preview} alt="First slide preview" className="mx-auto max-h-56 rounded-lg border border-green-100 bg-white shadow-sm" />
              )}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-green-800">Conversion Complete</p>
                <p className="text-xs text-green-700">
                  {result.slideCount} slide{result.slideCount === 1 ? "" : "s"} · {result.pageCount} page{result.pageCount === 1 ? "" : "s"} · {formatBytes(result.pdfSize)}
                </p>
                {result.skippedHidden > 0 && (
                  <p className="text-xs text-green-700">{result.skippedHidden} hidden slide{result.skippedHidden === 1 ? "" : "s"} skipped.</p>
                )}
              </div>
              {result.notes.length > 0 && (
                <ul className="space-y-1 rounded-lg bg-amber-50 px-3 py-2 text-left text-xs text-amber-800">
                  {result.notes.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!result && (
            <button onClick={handleConvert} disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </>
              ) : "Convert to PDF"}
            </button>
          )}

          {result && (
            <div className="space-y-3">
              <button onClick={handleDownload} className="btn-primary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {result.name}
              </button>
              <button onClick={handleReset} className="btn-secondary w-full">Convert Another File</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
