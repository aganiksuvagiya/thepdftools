"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

interface PageItem {
  pageNum: number;
  thumb: string;
  selected: boolean;
}

interface ConvertedPage {
  pageNum: number;
  url: string;
  filename: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfJs(): Promise<any> {
  const url = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  const lib = await (Function(`return import("${url}")`)() as Promise<any>);
  lib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return lib;
}

export default function PdfToJpgClient() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [converted, setConverted] = useState<ConvertedPage[]>([]);
  const [scale, setScale] = useState(2);
  const [quality, setQuality] = useState(0.92);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [filename, setFilename] = useState("document");

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0]; if (!f) return;
    setLoading(true); setError(null); setConverted([]); setPages([]);
    setFilename(f.name.replace(/\.pdf$/i, ""));
    try {
      const lib = await loadPdfJs();
      const buf = await f.arrayBuffer();
      const doc = await lib.getDocument({ data: buf }).promise;
      setPdfDoc(doc);
      const thumbs: PageItem[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale: 0.25 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
        thumbs.push({ pageNum: i, thumb: canvas.toDataURL("image/jpeg", 0.6), selected: true });
      }
      setPages(thumbs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePage = (n: number) =>
    setPages((prev) => prev.map((p) => (p.pageNum === n ? { ...p, selected: !p.selected } : p)));

  const selectAll = (v: boolean) => setPages((prev) => prev.map((p) => ({ ...p, selected: v })));

  const convert = useCallback(async () => {
    if (!pdfDoc) return;
    const selected = pages.filter((p) => p.selected);
    if (!selected.length) return;
    setConverting(true); setConverted([]); setError(null);
    try {
      const results: ConvertedPage[] = [];
      for (let i = 0; i < selected.length; i++) {
        const { pageNum } = selected[i];
        setProgress(`Converting page ${i + 1} of ${selected.length}…`);
        const page = await pdfDoc.getPage(pageNum);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const url = canvas.toDataURL("image/jpeg", quality);
        results.push({ pageNum, url, filename: `${filename}-page-${pageNum}.jpg` });
      }
      setConverted(results);
      setProgress("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [pdfDoc, pages, scale, quality, filename]);

  const downloadOne = (item: ConvertedPage) => {
    const a = document.createElement("a");
    a.href = item.url; a.download = item.filename; a.click();
  };

  const downloadAll = async () => {
    if (!converted.length) return;
    if (converted.length === 1) { downloadOne(converted[0]); return; }
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    converted.forEach(({ url, filename: fn }) => {
      zip.file(fn, url.split(",")[1], { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}-jpg.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const selectedCount = pages.filter((p) => p.selected).length;

  return (
    <div className="space-y-5">
      <DropZone
        onFilesAccepted={handleFile}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop your PDF here"
        sublabel="PDF · Click to browse"
      />

      {loading && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 py-10">
          <svg className="h-5 w-5 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          <span className="text-sm text-slate-500">Loading PDF…</span>
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">{error}</p>}

      {pages.length > 0 && (
        <>
          {/* Options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Resolution — {scale}x ({Math.round(scale * 72)} DPI)
              </label>
              <input type="range" min={1} max={4} step={0.5} value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-brand-600" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>72 DPI</span><span>288 DPI</span></div>
            </div>
            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                JPG Quality — {Math.round(quality * 100)}%
              </label>
              <input type="range" min={0.5} max={1} step={0.05} value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-brand-600" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>Smaller file</span><span>Best quality</span></div>
            </div>
          </div>

          {/* Page selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-700">
                Pages <span className="text-slate-400 font-normal">({selectedCount} of {pages.length} selected)</span>
              </p>
              <div className="flex gap-2">
                <button onClick={() => selectAll(true)} className="text-xs text-brand-600 hover:underline">Select all</button>
                <span className="text-slate-300">|</span>
                <button onClick={() => selectAll(false)} className="text-xs text-slate-400 hover:underline">None</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
              {pages.map((p) => (
                <button key={p.pageNum} onClick={() => togglePage(p.pageNum)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all ${p.selected ? "border-brand-500 shadow-md" : "border-slate-200 opacity-50"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt={`Page ${p.pageNum}`} className="w-full" />
                  <div className={`absolute inset-0 flex items-end justify-center pb-1 ${p.selected ? "bg-brand-600/10" : ""}`}>
                    <span className="rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white">{p.pageNum}</span>
                  </div>
                  {p.selected && (
                    <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-brand-600 flex items-center justify-center">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button onClick={convert} disabled={converting || selectedCount === 0}
            className="btn-primary w-full">
            {converting ? (
              <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>{progress}</>
            ) : `Convert ${selectedCount} page${selectedCount !== 1 ? "s" : ""} to JPG`}
          </button>
        </>
      )}

      {/* Results */}
      {converted.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {converted.map((item) => (
              <div key={item.pageNum} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={`Page ${item.pageNum}`} className="w-full border-b border-slate-100" />
                <div className="p-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Page {item.pageNum}</span>
                  <button onClick={() => downloadOne(item)}
                    className="text-xs font-semibold text-brand-600 hover:underline">Download</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={downloadAll}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>
            {converted.length === 1 ? "Download JPG" : `Download All as ZIP (${converted.length} files)`}
          </button>
        </div>
      )}
    </div>
  );
}
