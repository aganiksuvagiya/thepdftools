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

interface ConversionResult {
  url: string;
  pdfSize: number;
  name: string;
  pageCount: number;
}

export default function ExcelToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tableData, setTableData] = useState<string[][]>([]);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setResult(null);
    setError(null);
    setProgress("");
    setTableData([]);
    // Auto-parse on file drop
    parseFile(files[0]);
  }, []);

  const parseCSV = (text: string): string[][] => {
    const rows = text.split("\n").filter((r) => r.trim());
    return rows.map((row) => {
      const cells: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
          cells.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      cells.push(current.trim());
      return cells;
    });
  };

  const parseFile = async (f: File) => {
    try {
      const name = f.name.toLowerCase();

      if (name.endsWith(".csv")) {
        const text = await f.text();
        const data = parseCSV(text);
        setTableData(data);
        return;
      }

      // XLSX parsing
      if (!(window as any).JSZip) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load JSZip library"));
          document.head.appendChild(script);
        });
      }

      const JSZip = (window as any).JSZip;
      const arrayBuffer = await f.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Parse shared strings
      const sharedStrings: string[] = [];
      const ssFile = zip.file("xl/sharedStrings.xml");
      if (ssFile) {
        const ssXml: string = await ssFile.async("string");
        const parser = new DOMParser();
        const ssDoc = parser.parseFromString(ssXml, "text/xml");
        const siElements = ssDoc.getElementsByTagName("si");
        for (let i = 0; i < siElements.length; i++) {
          const tElements = siElements[i].getElementsByTagName("t");
          let text = "";
          for (let j = 0; j < tElements.length; j++) {
            text += tElements[j].textContent || "";
          }
          sharedStrings.push(text);
        }
      }

      // Parse sheet1
      const sheetFile =
        zip.file("xl/worksheets/sheet1.xml") ||
        zip.file("xl/worksheets/Sheet1.xml");
      if (!sheetFile) {
        throw new Error("Could not find sheet1.xml in the workbook.");
      }

      const sheetXml: string = await sheetFile.async("string");
      const parser = new DOMParser();
      const sheetDoc = parser.parseFromString(sheetXml, "text/xml");

      const rows = sheetDoc.getElementsByTagName("row");
      const data: string[][] = [];
      let maxCol = 0;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("c");
        const rowData: { col: number; value: string }[] = [];

        for (let j = 0; j < cells.length; j++) {
          const cell = cells[j];
          const ref = cell.getAttribute("r") || "";
          const type = cell.getAttribute("t") || "";
          const vEl = cell.getElementsByTagName("v")[0];
          const rawValue = vEl ? vEl.textContent || "" : "";

          // Parse column index from reference (e.g., "A1" -> 0, "B1" -> 1, "AA1" -> 26)
          const colMatch = ref.match(/^([A-Z]+)/);
          let colIndex = 0;
          if (colMatch) {
            const colStr = colMatch[1];
            for (let k = 0; k < colStr.length; k++) {
              colIndex =
                colIndex * 26 + (colStr.charCodeAt(k) - 64);
            }
            colIndex -= 1; // 0-indexed
          }

          let value = rawValue;
          if (type === "s" && sharedStrings.length > 0) {
            const idx = parseInt(rawValue, 10);
            value = sharedStrings[idx] || rawValue;
          }

          rowData.push({ col: colIndex, value });
          if (colIndex + 1 > maxCol) maxCol = colIndex + 1;
        }

        // Build row array
        const arr: string[] = new Array(maxCol).fill("");
        for (const rd of rowData) {
          arr[rd.col] = rd.value;
        }
        data.push(arr);
      }

      // Normalize all rows to maxCol length
      for (const row of data) {
        while (row.length < maxCol) row.push("");
      }

      setTableData(data);
    } catch (err: any) {
      setError(err.message || "Failed to parse file.");
    }
  };

  const handleConvert = async () => {
    if (!file || tableData.length === 0) return;
    setLoading(true);
    setError(null);
    setProgress("Generating PDF...");

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const PAGE_WIDTH = 792; // Landscape for tables
      const PAGE_HEIGHT = 612;
      const MARGIN = 40;
      const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
      const CELL_PADDING = 4;
      const FONT_SIZE = 8;
      const HEADER_FONT_SIZE = 8;
      const ROW_HEIGHT = 18;

      const numCols = tableData[0]?.length || 1;

      // Calculate column widths based on content
      const colMaxWidths: number[] = new Array(numCols).fill(0);
      for (let r = 0; r < tableData.length; r++) {
        const f = r === 0 ? boldFont : font;
        const s = r === 0 ? HEADER_FONT_SIZE : FONT_SIZE;
        for (let c = 0; c < numCols; c++) {
          const text = tableData[r]?.[c] || "";
          const w = f.widthOfTextAtSize(text.substring(0, 40), s);
          if (w > colMaxWidths[c]) colMaxWidths[c] = w;
        }
      }

      // Normalize column widths to fit page
      const totalRaw = colMaxWidths.reduce((a, b) => a + b, 0);
      const colWidths = colMaxWidths.map((w) => {
        const ratio = totalRaw > 0 ? w / totalRaw : 1 / numCols;
        return Math.max(ratio * CONTENT_WIDTH, 30);
      });
      // Re-normalize if total exceeds content width
      const totalWidths = colWidths.reduce((a, b) => a + b, 0);
      if (totalWidths > CONTENT_WIDTH) {
        const scale = CONTENT_WIDTH / totalWidths;
        for (let i = 0; i < colWidths.length; i++) {
          colWidths[i] *= scale;
        }
      }

      let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      let yPosition = PAGE_HEIGHT - MARGIN;
      let pageCount = 1;

      // Draw title
      const title = file.name.replace(/\.[^/.]+$/, "");
      page.drawText(title, {
        x: MARGIN,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 24;

      for (let r = 0; r < tableData.length; r++) {
        const isHeader = r === 0;
        const currentFont = isHeader ? boldFont : font;
        const fontSize = isHeader ? HEADER_FONT_SIZE : FONT_SIZE;

        // Check if we need a new page
        if (yPosition - ROW_HEIGHT < MARGIN) {
          page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          yPosition = PAGE_HEIGHT - MARGIN;
          pageCount++;
        }

        let xPosition = MARGIN;

        for (let c = 0; c < numCols; c++) {
          const cellWidth = colWidths[c];
          const text = (tableData[r]?.[c] || "").substring(0, 50);

          // Draw cell border
          page.drawRectangle({
            x: xPosition,
            y: yPosition - ROW_HEIGHT,
            width: cellWidth,
            height: ROW_HEIGHT,
            borderColor: rgb(0.75, 0.75, 0.75),
            borderWidth: 0.5,
            color: isHeader ? rgb(0.94, 0.94, 0.96) : rgb(1, 1, 1),
          });

          // Draw cell text
          const maxTextWidth = cellWidth - 2 * CELL_PADDING;
          let displayText = text;
          while (
            displayText.length > 0 &&
            currentFont.widthOfTextAtSize(displayText, fontSize) > maxTextWidth
          ) {
            displayText = displayText.slice(0, -1);
          }

          if (displayText.length < text.length && displayText.length > 2) {
            displayText = displayText.slice(0, -2) + "..";
          }

          page.drawText(displayText, {
            x: xPosition + CELL_PADDING,
            y: yPosition - ROW_HEIGHT + 5,
            size: fontSize,
            font: currentFont,
            color: rgb(0.15, 0.15, 0.15),
          });

          xPosition += cellWidth;
        }

        yPosition -= ROW_HEIGHT;
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      setResult({
        url,
        pdfSize: blob.size,
        name: `${baseName}.pdf`,
        pageCount,
      });
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
    setResult(null);
    setError(null);
    setProgress("");
    setTableData([]);
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
            ".xlsx",
          ],
          "application/vnd.ms-excel": [".xls"],
          "text/csv": [".csv"],
        }}
        label="Drop your Excel file here"
        sublabel="XLSX, XLS, or CSV · Click to browse"
      />

      {file && (
        <>
          {/* File Info */}
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                    {tableData.length > 0 &&
                      ` · ${tableData.length} rows · ${tableData[0]?.length || 0} columns`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Sheet Preview */}
          {tableData.length > 0 && (
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <p className="text-xs font-medium text-slate-600">
                  Data Preview (first 10 rows)
                </p>
              </div>
              <div className="overflow-x-auto max-h-60">
                <table className="w-full text-xs">
                  <thead>
                    {tableData[0] && (
                      <tr className="bg-slate-100">
                        {tableData[0].map((cell, i) => (
                          <th
                            key={i}
                            className="px-3 py-2 text-left font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap"
                          >
                            {cell || "-"}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {tableData.slice(1, 11).map((row, ri) => (
                      <tr
                        key={ri}
                        className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-1.5 text-slate-600 border-b border-slate-100 whitespace-nowrap"
                          >
                            {cell || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tableData.length > 11 && (
                <div className="bg-slate-50 px-4 py-1.5 border-t border-slate-200">
                  <p className="text-xs text-slate-400">
                    ...and {tableData.length - 11} more rows
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Progress */}
          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3">
              <svg
                className="h-4 w-4 animate-spin text-green-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm font-medium text-green-700">
                {progress}
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Result Info */}
          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-1 text-center">
              <p className="text-sm font-semibold text-green-800">
                Conversion Complete
              </p>
              <p className="text-xs text-green-600">
                {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} ·{" "}
                {formatBytes(result.pdfSize)}
              </p>
            </div>
          )}

          {/* Note */}
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> This converter extracts cell data and
              renders it as a table. Cell formatting, colors, merged cells,
              formulas, and charts are not preserved. For full formatting, export
              directly from Microsoft Excel.
            </p>
          </div>

          {/* Convert Button */}
          {!result && (
            <button
              onClick={handleConvert}
              disabled={loading || tableData.length === 0}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </button>
          )}

          {/* Download Button */}
          {result && (
            <div className="space-y-3">
              <button onClick={handleDownload} className="btn-primary w-full">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download {result.name}
              </button>
              <button onClick={handleReset} className="btn-secondary w-full">
                Convert Another File
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
