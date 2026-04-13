"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

interface SheetData {
  name: string;
  rows: string[][];
}

interface ConversionResult {
  url: string;
  pdfSize: number;
  name: string;
  pageCount: number;
}

function parseCSV(text: string): string[][] {
  const rows = text.split("\n").filter((r) => r.trim());
  return rows.map((row) => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === "," && !inQuotes) { cells.push(current.trim()); current = ""; }
      else { current += ch; }
    }
    cells.push(current.trim());
    return cells;
  });
}

function colLetterToIndex(col: string): number {
  let idx = 0;
  for (let i = 0; i < col.length; i++) idx = idx * 26 + (col.charCodeAt(i) - 64);
  return idx - 1;
}

// Try to detect if a value is numeric and format it nicely
function formatCellValue(raw: string, type: string, sharedStrings: string[]): string {
  if (type === "s") {
    const idx = parseInt(raw, 10);
    return isNaN(idx) ? raw : (sharedStrings[idx] ?? raw);
  }
  if (type === "b") return raw === "1" ? "TRUE" : "FALSE";
  if (type === "str" || type === "inlineStr") return raw;
  // Number - try to format nicely
  const num = parseFloat(raw);
  if (!isNaN(num)) {
    // If it looks like a date serial (between 1 and 60000), keep as-is
    if (Number.isInteger(num) && num > 0 && num < 60000 && raw === String(num)) return raw;
    // Format with up to 4 decimal places, trim trailing zeros
    return parseFloat(num.toPrecision(10)).toString();
  }
  return raw;
}

export default function ExcelToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parseFile = async (f: File) => {
    try {
      const name = f.name.toLowerCase();
      if (name.endsWith(".csv")) {
        const text = await f.text();
        setSheets([{ name: "Sheet1", rows: parseCSV(text) }]);
        return;
      }

      if (!(window as any).JSZip) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load JSZip"));
          document.head.appendChild(script);
        });
      }

      const JSZip = (window as any).JSZip;
      const arrayBuffer = await f.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Shared strings
      const sharedStrings: string[] = [];
      const ssFile = zip.file("xl/sharedStrings.xml");
      if (ssFile) {
        const ssXml: string = await ssFile.async("string");
        const ssDoc = new DOMParser().parseFromString(ssXml, "text/xml");
        const siEls = ssDoc.getElementsByTagName("si");
        for (let i = 0; i < siEls.length; i++) {
          const tEls = siEls[i].getElementsByTagName("t");
          let text = "";
          for (let j = 0; j < tEls.length; j++) text += tEls[j].textContent || "";
          sharedStrings.push(text);
        }
      }

      // Workbook - get sheet names and rIds
      const sheetMeta: { name: string; rId: string }[] = [];
      const wbFile = zip.file("xl/workbook.xml");
      if (wbFile) {
        const wbXml: string = await wbFile.async("string");
        const wbDoc = new DOMParser().parseFromString(wbXml, "text/xml");
        const sheetEls = wbDoc.getElementsByTagName("sheet");
        for (let i = 0; i < sheetEls.length; i++) {
          const sName = sheetEls[i].getAttribute("name") || `Sheet${i + 1}`;
          const rId = sheetEls[i].getAttribute("r:id") || sheetEls[i].getAttribute("id") || "";
          sheetMeta.push({ name: sName, rId });
        }
      }

      // Workbook rels - map rId to file path
      const sheetPaths: Record<string, string> = {};
      const relsFile = zip.file("xl/_rels/workbook.xml.rels");
      if (relsFile) {
        const relsXml: string = await relsFile.async("string");
        const relsDoc = new DOMParser().parseFromString(relsXml, "text/xml");
        const relEls = relsDoc.getElementsByTagName("Relationship");
        for (let i = 0; i < relEls.length; i++) {
          const id = relEls[i].getAttribute("Id") || "";
          const target = relEls[i].getAttribute("Target") || "";
          sheetPaths[id] = target.startsWith("/") ? target.slice(1) : `xl/${target}`;
        }
      }

      // Parse each sheet
      const parsedSheets: SheetData[] = [];
      const sheetsToLoad = sheetMeta.length > 0 ? sheetMeta : [{ name: "Sheet1", rId: "" }];

      for (const meta of sheetsToLoad) {
        let sheetPath = meta.rId ? sheetPaths[meta.rId] : null;
        if (!sheetPath) {
          // Fallback: try sheet1.xml
          sheetPath = "xl/worksheets/sheet1.xml";
        }

        const sheetFile = zip.file(sheetPath) || zip.file("xl/worksheets/sheet1.xml");
        if (!sheetFile) continue;

        const sheetXml: string = await sheetFile.async("string");
        const sheetDoc = new DOMParser().parseFromString(sheetXml, "text/xml");
        const rowEls = sheetDoc.getElementsByTagName("row");
        const data: string[][] = [];
        let maxCol = 0;

        for (let i = 0; i < rowEls.length; i++) {
          const cellEls = rowEls[i].getElementsByTagName("c");
          const rowData: { col: number; value: string }[] = [];

          for (let j = 0; j < cellEls.length; j++) {
            const cell = cellEls[j];
            const ref = cell.getAttribute("r") || "";
            const type = cell.getAttribute("t") || "";
            const vEl = cell.getElementsByTagName("v")[0];
            const tEl = cell.getElementsByTagName("t")[0]; // inline string
            const rawValue = tEl?.textContent || vEl?.textContent || "";

            const colMatch = ref.match(/^([A-Z]+)/);
            const colIndex = colMatch ? colLetterToIndex(colMatch[1]) : 0;
            const value = formatCellValue(rawValue, type, sharedStrings);

            rowData.push({ col: colIndex, value });
            if (colIndex + 1 > maxCol) maxCol = colIndex + 1;
          }

          const arr: string[] = new Array(maxCol).fill("");
          for (const rd of rowData) arr[rd.col] = rd.value;
          data.push(arr);
        }

        // Normalize
        for (const row of data) while (row.length < maxCol) row.push("");
        if (data.length > 0) parsedSheets.push({ name: meta.name, rows: data });
      }

      if (parsedSheets.length === 0) throw new Error("No data found in workbook.");
      setSheets(parsedSheets);
      setActiveSheet(0);
    } catch (err: any) {
      setError(err.message || "Failed to parse file.");
    }
  };

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setSheets([]);
    setResult(null);
    setError(null);
    setProgress("");
    setActiveSheet(0);
    parseFile(files[0]);
  }, []);

  const handleConvert = async () => {
    if (!file || sheets.length === 0) return;
    setLoading(true);
    setError(null);
    setProgress("Generating PDF...");

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const PAGE_W = 842; // A4 landscape
      const PAGE_H = 595;
      const MARGIN = 36;
      const CONTENT_W = PAGE_W - 2 * MARGIN;
      const CELL_PAD = 5;
      const FONT_SIZE = 8;
      const ROW_H = 20;
      const HEADER_H = 24;

      let totalPages = 0;

      for (let si = 0; si < sheets.length; si++) {
        const sheet = sheets[si];
        if (sheet.rows.length === 0) continue;

        setProgress(`Rendering sheet "${sheet.name}"...`);

        const numCols = sheet.rows[0].length || 1;

        // Calculate column widths from content
        const rawWidths: number[] = new Array(numCols).fill(0);
        for (let r = 0; r < Math.min(sheet.rows.length, 100); r++) {
          const f = r === 0 ? fontBold : fontReg;
          for (let c = 0; c < numCols; c++) {
            const text = sheet.rows[r]?.[c] || "";
            const w = f.widthOfTextAtSize(text.slice(0, 30), FONT_SIZE) + CELL_PAD * 2;
            if (w > rawWidths[c]) rawWidths[c] = w;
          }
        }

        // Clamp and normalize
        const clampedWidths = rawWidths.map((w) => Math.max(Math.min(w, 150), 40));
        const totalRaw = clampedWidths.reduce((a, b) => a + b, 0);
        const scale = totalRaw > CONTENT_W ? CONTENT_W / totalRaw : 1;
        const colWidths = clampedWidths.map((w) => w * scale);

        let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
        totalPages++;
        let y = PAGE_H - MARGIN;

        // Sheet title bar
        page.drawRectangle({ x: MARGIN, y: y - 22, width: CONTENT_W, height: 22, color: rgb(0.13, 0.27, 0.53) });
        const titleText = sheets.length > 1 ? `${file.name.replace(/\.[^/.]+$/, "")} — ${sheet.name}` : file.name.replace(/\.[^/.]+$/, "");
        page.drawText(titleText, { x: MARGIN + 8, y: y - 16, size: 10, font: fontBold, color: rgb(1, 1, 1) });
        y -= 28;

        for (let r = 0; r < sheet.rows.length; r++) {
          const isHeader = r === 0;
          const rowH = isHeader ? HEADER_H : ROW_H;

          if (y - rowH < MARGIN) {
            page = pdfDoc.addPage([PAGE_W, PAGE_H]);
            totalPages++;
            y = PAGE_H - MARGIN;
          }

          let x = MARGIN;
          for (let c = 0; c < numCols; c++) {
            const cw = colWidths[c];
            const cellText = (sheet.rows[r]?.[c] || "");

            // Cell background
            const bgColor = isHeader
              ? rgb(0.18, 0.38, 0.7)
              : r % 2 === 0
              ? rgb(0.97, 0.98, 1)
              : rgb(1, 1, 1);

            page.drawRectangle({
              x, y: y - rowH, width: cw, height: rowH,
              color: bgColor,
              borderColor: rgb(0.78, 0.82, 0.9),
              borderWidth: 0.4,
            });

            // Truncate text to fit
            const maxW = cw - CELL_PAD * 2;
            const f = isHeader ? fontBold : fontReg;
            let display = cellText;
            while (display.length > 0 && f.widthOfTextAtSize(display, FONT_SIZE) > maxW) {
              display = display.slice(0, -1);
            }
            if (display.length < cellText.length && display.length > 1) {
              display = display.slice(0, -1) + "…";
            }

            const textColor = isHeader ? rgb(1, 1, 1) : rgb(0.12, 0.12, 0.12);
            page.drawText(display, {
              x: x + CELL_PAD,
              y: y - rowH + (rowH - FONT_SIZE) / 2,
              size: FONT_SIZE,
              font: f,
              color: textColor,
            });

            x += cw;
          }
          y -= rowH;
        }

        // Footer with page info
        page.drawText(`${sheet.name} · ${sheet.rows.length} rows`, {
          x: MARGIN, y: MARGIN / 2,
          size: 7, font: fontReg, color: rgb(0.6, 0.6, 0.6),
        });
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      setResult({ url, pdfSize: blob.size, name: `${baseName}.pdf`, pageCount: totalPages });
      setProgress("");
    } catch (err: any) {
      setError(err.message || "Conversion failed. Please try again.");
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
    setFile(null);
    setSheets([]);
    setResult(null);
    setError(null);
    setProgress("");
    setActiveSheet(0);
  };

  const activeRows = sheets[activeSheet]?.rows || [];

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          "text/csv": [".csv"],
        }}
        label="Drop your Excel file here"
        sublabel="XLSX or CSV · Click to browse"
      />

      {file && (
        <>
          {/* File info */}
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                    {sheets.length > 0 && ` · ${sheets.length} sheet${sheets.length > 1 ? "s" : ""} · ${activeRows.length} rows`}
                  </p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Remove</button>
            </div>
          </div>

          {/* Sheet tabs */}
          {sheets.length > 1 && (
            <div className="flex gap-1 flex-wrap">
              {sheets.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSheet(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    activeSheet === i ? "bg-brand-600 text-white border-brand-600" : "bg-white text-gray-600 border-gray-200 hover:border-brand-400"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {/* Preview table */}
          {activeRows.length > 0 && (
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-600">
                  {sheets[activeSheet]?.name} — preview (first 10 rows)
                </p>
                <p className="text-xs text-slate-400">{activeRows[0]?.length} columns</p>
              </div>
              <div className="overflow-x-auto max-h-60">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-700">
                      {activeRows[0]?.map((cell, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-white border-b border-blue-600 whitespace-nowrap">
                          {cell || <span className="text-blue-300">—</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeRows.slice(1, 11).map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-1.5 text-slate-600 border-b border-slate-100 whitespace-nowrap">
                            {cell || <span className="text-slate-300">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {activeRows.length > 11 && (
                <div className="bg-slate-50 px-4 py-1.5 border-t border-slate-200">
                  <p className="text-xs text-slate-400">...and {activeRows.length - 11} more rows</p>
                </div>
              )}
            </div>
          )}

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-green-700">{progress}</span>
            </div>
          )}

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-1 text-center">
              <p className="text-sm font-semibold text-green-800">Conversion Complete</p>
              <p className="text-xs text-green-600">
                {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} · {formatBytes(result.pdfSize)}
              </p>
            </div>
          )}

          {!result && (
            <button onClick={handleConvert} disabled={loading || sheets.length === 0} className="btn-primary w-full">
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </>
              ) : `Convert ${sheets.length > 1 ? `${sheets.length} Sheets` : ""} to PDF`}
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
