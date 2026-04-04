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

export default function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPdfUrl(null);
      setError(null);
      setPageCount(0);
    }
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      setProgress("Reading Word document...");
      const arrayBuffer = await file.arrayBuffer();

      setProgress("Converting to HTML...");
      const mammoth = await import("mammoth");
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;

      if (!html || html.trim().length === 0) {
        setError("No content could be extracted from this document. It may be empty or corrupted.");
        setLoading(false);
        return;
      }

      setProgress("Generating PDF...");

      // Use jsPDF + html rendering
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.default;

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      // Create a temporary container to render HTML
      const container = document.createElement("div");
      container.style.cssText =
        "position:absolute;left:-9999px;top:0;width:170mm;font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;color:#222;";
      container.innerHTML = `
        <style>
          p { margin: 0 0 8px 0; }
          h1 { font-size: 20pt; margin: 0 0 12px 0; font-weight: bold; }
          h2 { font-size: 16pt; margin: 0 0 10px 0; font-weight: bold; }
          h3 { font-size: 14pt; margin: 0 0 8px 0; font-weight: bold; }
          ul, ol { margin: 0 0 8px 20px; }
          li { margin: 0 0 4px 0; }
          table { border-collapse: collapse; width: 100%; margin: 0 0 8px 0; }
          td, th { border: 1px solid #ccc; padding: 4px 8px; }
          strong, b { font-weight: bold; }
          em, i { font-style: italic; }
        </style>
        ${html}
      `;
      document.body.appendChild(container);

      await doc.html(container, {
        callback: (d) => {
          document.body.removeChild(container);
          const pages = d.internal.pages.length - 1;
          setPageCount(pages);
          const blob = d.output("blob");
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        },
        x: 20,
        y: 20,
        width: 170,
        windowWidth: 640,
        autoPaging: "text",
        margin: [20, 20, 20, 20],
      });

      setProgress("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Failed to convert: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl || !file) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = file.name.replace(/\.(docx?|DOCX?)$/i, "") + ".pdf";
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setPdfUrl(null);
    setError(null);
    setProgress("");
    setPageCount(0);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
  };

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/msword": [".doc"],
          }}
          multiple={false}
          label="Drop your Word file here"
          sublabel="DOC or DOCX · Click to browse"
        />
      ) : (
        <>
          {/* File info */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-400">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
              title="Remove"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          {loading && progress && (
            <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <svg className="h-5 w-5 shrink-0 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm font-medium text-blue-700">{progress}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          {/* Convert button */}
          {!pdfUrl && (
            <button onClick={handleConvert} disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </button>
          )}

          {/* Success */}
          {pdfUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <svg className="h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-700">Conversion complete!</p>
                  <p className="text-xs text-green-600">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} generated
                  </p>
                </div>
              </div>

              <button onClick={handleDownload} className="btn-secondary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {file.name.replace(/\.(docx?|DOCX?)$/i, "")}.pdf
              </button>

              <button onClick={handleReset} className="btn-secondary w-full">
                Convert another document
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
