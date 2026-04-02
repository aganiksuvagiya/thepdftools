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

export default function PdfToWordClient() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDocUrl(null);
      setPreviewText(null);
      setError(null);
      setPageCount(0);
      setWordCount(0);
    }
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDocUrl(null);
    setPreviewText(null);

    try {
      setProgress("Loading PDF library...");

      const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
      const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";

      setProgress("Reading PDF file...");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      setPageCount(totalPages);

      const pages: string[] = [];
      let fullText = "";

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Extracting page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let lastY: number | null = null;
        let pageText = "";

        for (const item of textContent.items) {
          if (!("str" in item)) continue;
          const textItem = item as { str: string; transform: number[] };
          const y = textItem.transform[5];

          if (lastY !== null && Math.abs(y - lastY) > 2) {
            pageText += "<br/>";
          }
          if (textItem.str.trim() !== "") {
            pageText += textItem.str;
          } else if (textItem.str === " ") {
            pageText += " ";
          }
          lastY = y;
        }

        pages.push(pageText);
        fullText += pageText.replace(/<br\/>/g, "\n") + "\n\n";
      }

      const words = fullText.trim().split(/\s+/).filter((w) => w.length > 0).length;
      setWordCount(words);

      if (words === 0) {
        setError(
          "No text could be extracted from this PDF. It may be a scanned document (image-based) or empty."
        );
        setLoading(false);
        return;
      }

      setProgress("Generating Word document...");

      const htmlContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<style>
body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; color: #333; margin: 1in; }
p { margin: 0 0 6pt 0; }
.page { margin-bottom: 12pt; }
</style>
</head>
<body>
${pages
  .map(
    (p, idx) =>
      `<div class="page"${idx < pages.length - 1 ? ' style="page-break-after:always"' : ""}>${p
        .split("<br/>")
        .map((line) => `<p>${line || "&nbsp;"}</p>`)
        .join("\n")}</div>`
  )
  .join("\n")}
</body>
</html>`;

      const blob = new Blob(["\ufeff", htmlContent], {
        type: "application/msword",
      });
      const url = URL.createObjectURL(blob);
      setDocUrl(url);

      // Build a plain text preview (first ~2000 chars)
      const preview =
        fullText.length > 2000 ? fullText.slice(0, 2000) + "..." : fullText;
      setPreviewText(preview);

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
    if (!docUrl || !file) return;
    const a = document.createElement("a");
    a.href = docUrl;
    a.download = file.name.replace(/\.pdf$/i, "") + ".doc";
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setDocUrl(null);
    setPreviewText(null);
    setError(null);
    setProgress("");
    setPageCount(0);
    setWordCount(0);
    if (docUrl) URL.revokeObjectURL(docUrl);
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
          {!docUrl && (
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
                "Convert to Word"
              )}
            </button>
          )}

          {/* Success & stats */}
          {docUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4">
                <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-700">Conversion complete!</p>
                  <p className="text-xs text-green-600">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} · {wordCount.toLocaleString()} words extracted
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
                  <span><strong>{wordCount.toLocaleString()}</strong> words</span>
                </div>
              </div>

              {/* Preview */}
              {previewText && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Text Preview</p>
                  <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {previewText}
                  </div>
                </div>
              )}

              {/* Download */}
              <button onClick={handleDownload} className="btn-secondary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {file.name.replace(/\.pdf$/i, "")}.doc
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
