"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import { loadDocx } from "./docx/parse";
import { headerFooterCmds, paginate } from "./docx/layout";
import { paintPage } from "./docx/paint";
import { addCanvasPage } from "@/lib/ooxml/pdfPage";
import { createTextLayer } from "@/lib/pdfTextLayer";

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
const PT_PER_PX = 0.75;

export default function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>("standard");

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
    setProgress("Reading Word document...");
    let pkgRef: { dispose: () => void } | null = null;

    try {
      if (/\.doc$/i.test(file.name)) {
        throw new Error("Old .doc files are not supported. Open the file in Word (or Google Docs) and save it as .docx, then try again.");
      }
      const { PDFDocument } = await import("pdf-lib");
      const { model, pkg } = await loadDocx(await file.arrayBuffer());
      pkgRef = pkg;

      setProgress("Loading pictures...");
      const images = new Map<string, CanvasImageSource | null>();
      const unique = model.imagePaths.filter((p, i) => model.imagePaths.indexOf(p) === i);
      for (const p of unique) images.set(p, await pkg.image(p));

      setProgress("Laying out pages...");
      await new Promise((r) => setTimeout(r, 0));
      const scratch = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
      const lc = { g: scratch, defaultTab: model.defaultTab };
      const pages = paginate(lc, model);
      const total = pages.length;

      const q = QUALITY[quality];
      const pdfDoc = await PDFDocument.create();
      const hidden = await createTextLayer(pdfDoc);
      let preview = "";

      for (let i = 0; i < total; i++) {
        setProgress(`Rendering page ${i + 1} of ${total}...`);
        await new Promise((r) => setTimeout(r, 0));
        const page = pages[i];
        const scale = Math.min(q.scale, MAX_SIDE / Math.max(page.sect.pageW, page.sect.pageH));
        const extra = headerFooterCmds(lc, model, page, i + 1, total);
        const { canvas, texts } = paintPage(page, extra, scale, images);

        if (!preview) {
          const small = document.createElement("canvas");
          small.width = 520;
          small.height = Math.max(1, Math.round((520 * canvas.height) / canvas.width));
          small.getContext("2d")?.drawImage(canvas, 0, 0, small.width, small.height);
          preview = small.toDataURL("image/jpeg", 0.8);
        }

        const pageW = page.sect.pageW * PT_PER_PX;
        const pageH = page.sect.pageH * PT_PER_PX;
        const pdfPage = await addCanvasPage(pdfDoc, canvas, pageW, pageH, q.jpeg);

        // invisible text layer so the PDF is searchable / copyable
        texts.forEach((t) =>
          hidden.add(pdfPage, {
            text: t.text,
            x: (t.x / scale) * PT_PER_PX,
            y: pageH - (t.y / scale) * PT_PER_PX,
            size: Math.max(1, (t.size / scale) * PT_PER_PX),
            width: (t.w / scale) * PT_PER_PX,
          })
        );
        canvas.width = 0;
        canvas.height = 0;
      }

      setProgress("Finalizing PDF...");
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      pdfDoc.setTitle(baseName);
      pdfDoc.setProducer("ThePDFTools");
      pdfDoc.setCreator("ThePDFTools Word to PDF");
      hidden.finish();
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const w = model.warnings;
      const notes: string[] = [];
      if (w.shape) notes.push("Text boxes, shapes and WordArt are not drawn yet.");
      if (w.chart) notes.push("Charts are not drawn yet.");
      if (w.smartart) notes.push("SmartArt graphics are not drawn yet.");
      if (w.object) notes.push("Embedded objects (such as OLE objects) were skipped.");
      if (w.footnote) notes.push("Footnote and endnote text is not drawn (only the reference numbers).");
      if (model.sections.some((s) => s.props.cols > 1)) notes.push("Multi-column layouts are shown as a single column.");
      if (pkg.unsupportedImages > 0) notes.push("Some pictures (for example EMF/WMF) are in a format the browser cannot draw and were skipped.");

      setResult({ url, pdfSize: blob.size, name: `${baseName}.pdf`, pageCount: total, notes, preview });
      setProgress("");
    } catch (err: any) {
      setError(err?.message || "Conversion failed. Please try again.");
    } finally {
      if (pkgRef) pkgRef.dispose();
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
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        }}
        label="Drop your Word file here"
        sublabel="DOCX (Word 2007+) · Click to browse"
      />

      {file && (
        <>
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Quality</span>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as Quality)}
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm sm:max-w-xs"
                >
                  {(Object.keys(QUALITY) as Quality[]).map((k) => (
                    <option key={k} value={k}>{QUALITY[k].label}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-blue-700">{progress}</span>
            </div>
          )}

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-3 text-center">
              {result.preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result.preview} alt="First page preview" className="mx-auto max-h-72 rounded-lg border border-green-100 bg-white shadow-sm" />
              )}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-green-800">Conversion Complete</p>
                <p className="text-xs text-green-700">
                  {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} · {formatBytes(result.pdfSize)}
                </p>
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
