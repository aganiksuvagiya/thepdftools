"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";
import { addCanvasPage } from "@/lib/ooxml/pdfPage";
import { loadCsv, loadXlsx, XBook } from "./xlsx/parse";
import { layoutSheet, paintPage, Options, SheetLayout } from "./xlsx/render";

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

const PT_PER_PX = 0.75;
const MAX_SIDE = 4096;

export default function ExcelToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [sheetNames, setSheetNames] = useState<Array<{ name: string; hidden: boolean }>>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>("standard");
  const [orientation, setOrientation] = useState<Options["orientation"]>("auto");
  const [fitWidth, setFitWidth] = useState(true);
  const [gridLines, setGridLines] = useState(false);
  const bookRef = useRef<XBook | null>(null);

  const parseFile = async (f: File) => {
    try {
      const lower = f.name.toLowerCase();
      if (lower.endsWith(".xls")) {
        throw new Error("Old .xls files are not supported. Open the file in Excel (or Google Sheets) and save it as .xlsx, then try again.");
      }
      let book: XBook;
      if (lower.endsWith(".csv")) book = loadCsv(await f.text(), f.name.replace(/\.[^/.]+$/, "") || "Sheet1");
      else book = await loadXlsx(await f.arrayBuffer());
      if (bookRef.current && bookRef.current.pkg) bookRef.current.pkg.dispose();
      bookRef.current = book;
      setSheetNames(book.sheets.map((s) => ({ name: s.name, hidden: s.hidden })));
      setSelected(book.sheets.map((s) => !s.hidden));
    } catch (err: any) {
      bookRef.current = null;
      setSheetNames([]);
      setError(err?.message || "Failed to read this file.");
    }
  };

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setSheetNames([]);
    setSelected([]);
    setResult(null);
    setError(null);
    setProgress("");
    parseFile(files[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = async () => {
    const book = bookRef.current;
    if (!file || !book) return;
    setLoading(true);
    setError(null);
    setProgress("Laying out sheets...");

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const opts: Options = { orientation, fitWidth, gridLines };
      await new Promise((r) => setTimeout(r, 0));

      const layouts: SheetLayout[] = [];
      let emptySheets = 0;
      book.sheets.forEach((s, i) => {
        if (!selected[i]) return;
        const L = layoutSheet(book, s, opts);
        if (L) layouts.push(L);
        else emptySheets++;
      });
      if (!layouts.length) throw new Error("There is no data to print in the selected sheets.");

      setProgress("Loading pictures...");
      const images = new Map<string, CanvasImageSource | null>();
      for (const L of layouts) {
        for (const d of L.sheet.drawings) {
          if (d.kind === "pic" && d.path && !images.has(d.path) && book.pkg) images.set(d.path, await book.pkg.image(d.path));
        }
      }

      const total = layouts.reduce((n, L) => n + L.pages.length, 0);
      const q = QUALITY[quality];
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const charSet = new Set<number>(font.getCharacterSet());
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const warn: Record<string, number> = {};
      let done = 0;
      let preview = "";

      for (const L of layouts) {
        for (const pg of L.pages) {
          done++;
          setProgress(`Rendering page ${done} of ${total}...`);
          await new Promise((r) => setTimeout(r, 0));
          const dpi = Math.min(q.scale, MAX_SIDE / Math.max(L.paperW, L.paperH));
          const { canvas, texts } = paintPage(L, pg, dpi, images, file.name, warn);

          if (!preview) {
            const small = document.createElement("canvas");
            small.width = 520;
            small.height = Math.max(1, Math.round((520 * canvas.height) / canvas.width));
            small.getContext("2d")?.drawImage(canvas, 0, 0, small.width, small.height);
            preview = small.toDataURL("image/jpeg", 0.8);
          }

          const pageW = L.paperW * PT_PER_PX;
          const pageH = L.paperH * PT_PER_PX;
          const page = await addCanvasPage(pdfDoc, canvas, pageW, pageH, q.jpeg);

          texts.forEach((t) => {
            const clean = Array.from(t.text)
              .map((ch) => (charSet.has(ch.codePointAt(0) as number) ? ch : " "))
              .join("")
              .replace(/\s+/g, " ")
              .trim();
            if (!/[A-Za-z0-9]/.test(clean)) return;
            const size = Math.max(1, (t.size / dpi) * PT_PER_PX);
            const target = (t.w / dpi) * PT_PER_PX;
            const natural = font.widthOfTextAtSize(clean, size);
            const fitted = natural > 0 && target > 0 ? Math.min(size * 2, Math.max(size * 0.4, (size * target) / natural)) : size;
            try {
              page.drawText(clean, {
                x: (t.x / dpi) * PT_PER_PX,
                y: pageH - (t.y / dpi) * PT_PER_PX,
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
        }
      }

      setProgress("Finalizing PDF...");
      pdfDoc.setTitle(baseName);
      pdfDoc.setProducer("ThePDFTools");
      pdfDoc.setCreator("ThePDFTools Excel to PDF");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const notes: string[] = [];
      const bw = book.warnings;
      if (bw.condfmt) notes.push("Conditional formatting (colour scales, data bars, icon sets) is not applied.");
      if (bw.shape) notes.push("Shapes and text boxes are not drawn yet.");
      if (bw.object) notes.push("Some embedded objects were skipped.");
      if (warn.chart) notes.push(`${warn.chart} chart${warn.chart > 1 ? "s" : ""} of an unsupported type ${warn.chart > 1 ? "were" : "was"} shown as a grey box.`);
      if (warn.image) notes.push("Some pictures could not be drawn.");
      if (emptySheets) notes.push(`${emptySheets} selected sheet${emptySheets > 1 ? "s" : ""} had nothing to print and ${emptySheets > 1 ? "were" : "was"} skipped.`);

      setResult({ url, pdfSize: blob.size, name: `${baseName}.pdf`, pageCount: total, notes, preview });
      setProgress("");
    } catch (err: any) {
      setError(err?.message || "Conversion failed. Please try again.");
    } finally {
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
    if (bookRef.current && bookRef.current.pkg) bookRef.current.pkg.dispose();
    bookRef.current = null;
    setFile(null);
    setSheetNames([]);
    setSelected([]);
    setResult(null);
    setError(null);
    setProgress("");
  };

  const canConvert = !loading && sheetNames.length > 0 && selected.some(Boolean);

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          "text/csv": [".csv"],
        }}
        label="Drop your Excel file here"
        sublabel="XLSX or CSV · Click to browse"
      />

      {file && (
        <>
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <svg className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                    {sheetNames.length > 0 && ` · ${sheetNames.length} sheet${sheetNames.length > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Remove</button>
            </div>
          </div>

          {!result && sheetNames.length > 0 && (
            <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
              {sheetNames.length > 1 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">Sheets to convert</p>
                  <div className="flex flex-wrap gap-2">
                    {sheetNames.map((s, i) => (
                      <label key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={!!selected[i]}
                          disabled={loading}
                          onChange={(e) => setSelected(selected.map((v, k) => (k === i ? e.target.checked : v)))}
                        />
                        {s.name}
                        {s.hidden && <span className="text-xs text-gray-400">(hidden)</span>}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-gray-700">Quality</span>
                  <select value={quality} onChange={(e) => setQuality(e.target.value as Quality)} disabled={loading} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                    {(Object.keys(QUALITY) as Quality[]).map((k) => (
                      <option key={k} value={k}>{QUALITY[k].label}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-gray-700">Page orientation</span>
                  <select value={orientation} onChange={(e) => setOrientation(e.target.value as Options["orientation"])} disabled={loading} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                    <option value="auto">Automatic (recommended)</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={fitWidth} onChange={(e) => setFitWidth(e.target.checked)} disabled={loading} />
                  Fit all columns to the page width
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={gridLines} onChange={(e) => setGridLines(e.target.checked)} disabled={loading} />
                  Print gridlines
                </label>
              </div>
            </div>
          )}

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-green-700" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-green-800">{progress}</span>
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
            <button onClick={handleConvert} disabled={!canConvert} className="btn-primary w-full">
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
