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

type Row = string[];

export default function PdfToExcelClient() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [xlsxUrl, setXlsxUrl] = useState<string | null>(null);
  const [tableData, setTableData] = useState<Row[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [colCount, setColCount] = useState(0);

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setXlsxUrl(null);
      setTableData([]);
      setError(null);
      setPageCount(0);
      setRowCount(0);
      setColCount(0);
    }
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setXlsxUrl(null);
    setTableData([]);

    try {
      setProgress("Loading PDF library...");

      const cdnUrl =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
      const pdfjsLib = await (Function(
        `return import("${cdnUrl}")`
      )() as Promise<any>);
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";

      setProgress("Reading PDF file...");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      setPageCount(totalPages);

      const allRows: Row[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Extracting page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Group text items by Y coordinate to detect rows
        const lineMap = new Map<number, { x: number; str: string }[]>();

        for (const item of textContent.items) {
          if (!("str" in item) || !(item as any).str.trim()) continue;
          const textItem = item as {
            str: string;
            transform: number[];
            width: number;
          };
          const y = Math.round(textItem.transform[5] * 10) / 10; // round to 1 decimal
          const x = textItem.transform[4];

          if (!lineMap.has(y)) lineMap.set(y, []);
          lineMap.get(y)!.push({ x, str: textItem.str.trim() });
        }

        // Sort lines by Y descending (PDF coordinates: top = higher Y)
        const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);

        for (const y of sortedYs) {
          const items = lineMap.get(y)!;
          items.sort((a, b) => a.x - b.x);

          // Detect columns by looking for significant gaps between items
          const cells: string[] = [];
          let currentCell = items[0].str;

          for (let j = 1; j < items.length; j++) {
            const gap = items[j].x - (items[j - 1].x + items[j - 1].str.length * 4);
            if (gap > 15) {
              // significant gap = new column
              cells.push(currentCell.trim());
              currentCell = items[j].str;
            } else {
              currentCell += " " + items[j].str;
            }
          }
          cells.push(currentCell.trim());

          if (cells.some((c) => c.length > 0)) {
            allRows.push(cells);
          }
        }
      }

      if (allRows.length === 0) {
        setError(
          "No tabular data could be extracted from this PDF. It may be a scanned document (image-based) or contain no text."
        );
        setLoading(false);
        return;
      }

      // Normalize column count (pad shorter rows)
      const maxCols = Math.max(...allRows.map((r) => r.length));
      const normalizedRows = allRows.map((r) => {
        while (r.length < maxCols) r.push("");
        return r;
      });

      setRowCount(normalizedRows.length);
      setColCount(maxCols);
      setTableData(normalizedRows.slice(0, 100)); // preview first 100 rows

      setProgress("Generating Excel file...");

      const XLSX = await import("xlsx");
      const ws = XLSX.utils.aoa_to_sheet(normalizedRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const xlsxBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([xlsxBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      setXlsxUrl(url);

      setProgress("");
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes("password") || msg.includes("encrypted")) {
        setError(
          "This PDF is password-protected or encrypted. Please remove the protection and try again."
        );
      } else {
        setError(`Failed to convert PDF: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!xlsxUrl || !file) return;
    const a = document.createElement("a");
    a.href = xlsxUrl;
    a.download = file.name.replace(/\.pdf$/i, "") + ".xlsx";
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setXlsxUrl(null);
    setTableData([]);
    setError(null);
    setProgress("");
    setPageCount(0);
    setRowCount(0);
    setColCount(0);
    if (xlsxUrl) URL.revokeObjectURL(xlsxUrl);
  };

  return (
    <div className="card space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "application/pdf": [".pdf"] }}
          multiple={false}
          label="Drop your PDF file here"
          sublabel="PDF only · Click to browse"
        />
      ) : (
        <>
          {/* File info */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
              title="Remove"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          {loading && progress && (
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4">
              <svg className="h-5 w-5 animate-spin text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm font-medium text-blue-700">{progress}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Convert button */}
          {!xlsxUrl && (
            <button
              onClick={handleConvert}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </>
              ) : (
                "Convert to Excel"
              )}
            </button>
          )}

          {/* Success & stats */}
          {xlsxUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
                <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-700">Conversion complete!</p>
                  <p className="text-xs text-green-600">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} · {rowCount.toLocaleString()} rows · {colCount} column{colCount !== 1 ? "s" : ""} detected
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span><strong>{pageCount}</strong> page{pageCount !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span><strong>{rowCount.toLocaleString()}</strong> rows</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                  </svg>
                  <span><strong>{colCount}</strong> column{colCount !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Table Preview */}
              {tableData.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Data Preview{rowCount > 100 ? ` (first 100 of ${rowCount.toLocaleString()} rows)` : ""}
                  </p>
                  <div className="max-h-72 overflow-auto rounded-xl border border-gray-200 bg-gray-50">
                    <table className="w-full text-left text-sm">
                      <tbody>
                        {tableData.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="whitespace-nowrap border-b border-gray-100 px-3 py-2 text-gray-700"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Download */}
              <button onClick={handleDownload} className="btn-secondary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {file.name.replace(/\.pdf$/i, "")}.xlsx
              </button>

              {/* Convert another */}
              <button onClick={handleReset} className="btn-secondary w-full">
                Convert another PDF
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
