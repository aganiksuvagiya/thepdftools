"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

interface TextPdfResult {
  url: string;
  pdfSize: number;
  name: string;
  pageCount: number;
}

export default function HtmlToPdfClient() {
  const [htmlContent, setHtmlContent] = useState("");
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "laptop">("laptop");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [textResult, setTextResult] = useState<TextPdfResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFileSize(file.size);
      setTextResult(null);
      setError(null);
      file.text().then((text) => {
        setHtmlContent(text);
      });
    }
  }, []);

  const handleSaveAsPdf = () => {
    if (!htmlContent.trim()) {
      setError("Please enter or upload HTML content first.");
      return;
    }

    // Create a hidden iframe with the HTML content and trigger print dialog
    const printW = viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : 1280;
    const printFrame = document.createElement("iframe");
    printFrame.style.cssText =
      `position:fixed;left:-9999px;top:-9999px;width:${printW}px;height:900px;border:none;`;
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (!frameDoc) {
      setError("Could not create print frame. Please try again.");
      document.body.removeChild(printFrame);
      return;
    }

    const vpWidth = viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : 1280;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=${vpWidth}">
        <style>
          @page { size: ${viewport === "mobile" ? "4in 8in" : viewport === "tablet" ? "8in 11in" : "A4 portrait"}; margin: 0.5cm; }
          body { width: ${vpWidth}px; margin: 0 auto; transform-origin: top left; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>${htmlContent.replace(/<html[^>]*>|<\/html>|<head[^>]*>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/gi, (match) => {
        if (match.toLowerCase().startsWith('<body')) return '';
        if (match.toLowerCase() === '</body>') return '';
        if (match.toLowerCase().startsWith('<html')) return '';
        if (match.toLowerCase() === '</html>') return '';
        if (match.toLowerCase().startsWith('<head')) return '';
        return '';
      })}</body>
      </html>
    `);
    frameDoc.close();

    // Wait for content to load then trigger print
    setTimeout(() => {
      try {
        printFrame.contentWindow?.print();
      } catch {
        setError("Print dialog could not be opened. Please try again.");
      }
      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }, 500);
  };

  const handleExtractTextToPdf = async () => {
    if (!htmlContent.trim()) {
      setError("Please enter or upload HTML content first.");
      return;
    }

    setLoading(true);
    setError(null);
    setTextResult(null);
    setProgress("Extracting text from HTML...");

    try {
      // Parse HTML and extract text
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const rawText = doc.body?.textContent || doc.documentElement?.textContent || "";
      // Remove non-WinAnsi characters (keep basic ASCII + common Latin)
      const safeText = rawText.replace(/[^\x20-\x7E\xA0-\xFF\n\t]/g, "");
      const lines = safeText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l);

      if (lines.length === 0) {
        throw new Error("No text content found in the HTML.");
      }

      setProgress("Generating PDF...");
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const PAGE_WIDTH = 612;
      const PAGE_HEIGHT = 792;
      const MARGIN = 50;
      const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
      const BODY_SIZE = 11;
      const LINE_HEIGHT = BODY_SIZE * 1.6;

      let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      let yPosition = PAGE_HEIGHT - MARGIN;
      let pageCount = 1;

      // Draw title
      const title = fileName
        ? fileName.replace(/\.[^/.]+$/, "")
        : "HTML Document";
      page.drawText(title, {
        x: MARGIN,
        y: yPosition,
        size: 16,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 12;
      page.drawLine({
        start: { x: MARGIN, y: yPosition },
        end: { x: PAGE_WIDTH - MARGIN, y: yPosition },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
      yPosition -= 20;

      for (const line of lines) {
        const words = line.split(/\s+/);
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, BODY_SIZE);

          if (testWidth > CONTENT_WIDTH && currentLine) {
            if (yPosition < MARGIN + 20) {
              page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
              yPosition = PAGE_HEIGHT - MARGIN;
              pageCount++;
            }
            page.drawText(currentLine, {
              x: MARGIN,
              y: yPosition,
              size: BODY_SIZE,
              font: font,
              color: rgb(0.15, 0.15, 0.15),
            });
            yPosition -= LINE_HEIGHT;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          if (yPosition < MARGIN + 20) {
            page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
            yPosition = PAGE_HEIGHT - MARGIN;
            pageCount++;
          }
          page.drawText(currentLine, {
            x: MARGIN,
            y: yPosition,
            size: BODY_SIZE,
            font: font,
            color: rgb(0.15, 0.15, 0.15),
          });
          yPosition -= LINE_HEIGHT;
        }

        yPosition -= LINE_HEIGHT * 0.3;
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const baseName = fileName
        ? fileName.replace(/\.[^/.]+$/, "")
        : "html-document";

      setTextResult({
        url,
        pdfSize: blob.size,
        name: `${baseName}.pdf`,
        pageCount,
      });
      setProgress("");
    } catch (err: any) {
      setError(err.message || "Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!textResult) return;
    const a = document.createElement("a");
    a.href = textResult.url;
    a.download = textResult.name;
    a.click();
  };

  const handleReset = () => {
    if (textResult?.url) URL.revokeObjectURL(textResult.url);
    setHtmlContent("");
    setFileName(null);
    setFileSize(0);
    setTextResult(null);
    setError(null);
    setProgress("");
    setInputMode("paste");
  };

  return (
    <div className="card space-y-6">
      {/* Input Mode Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setInputMode("paste");
            setTextResult(null);
            setError(null);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            inputMode === "paste"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Paste HTML
        </button>
        <button
          onClick={() => {
            setInputMode("upload");
            setTextResult(null);
            setError(null);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            inputMode === "upload"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Upload File
        </button>
      </div>

      {/* Paste Mode */}
      {inputMode === "paste" && (
        <textarea
          value={htmlContent}
          onChange={(e) => {
            setHtmlContent(e.target.value);
            setTextResult(null);
            setError(null);
          }}
          placeholder="Paste your HTML code here..."
          className="w-full min-h-[200px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800 placeholder-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-y"
          spellCheck={false}
        />
      )}

      {/* Upload Mode */}
      {inputMode === "upload" && (
        <>
          <DropZone
            onFilesAccepted={handleFiles}
            accept={{
              "text/html": [".html", ".htm"],
            }}
            label="Drop your HTML file here"
            sublabel="HTML or HTM · Click to browse"
          />
          {fileName && (
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(fileSize)}
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
          )}
        </>
      )}


      {/* Viewport Selector */}
      {htmlContent.trim() && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Preview as:</span>
          {([
            { key: "mobile" as const, label: "Mobile", w: 375, icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" },
            { key: "tablet" as const, label: "Tablet", w: 768, icon: "M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" },
            { key: "laptop" as const, label: "Laptop", w: 1280, icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
          ]).map((v) => (
            <button
              key={v.key}
              onClick={() => setViewport(v.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                viewport === v.key
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
              </svg>
              {v.label}
              <span className={`text-[10px] ${viewport === v.key ? "text-white/60" : "text-slate-400"}`}>{v.w}px</span>
            </button>
          ))}
        </div>
      )}

      {/* Live Preview */}
      {htmlContent.trim() && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-600">
              Preview — {viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "1280px"}
            </p>
          </div>
          <div className="bg-slate-100 flex justify-center overflow-auto p-2" style={{ minHeight: 300 }}>
            <iframe
              ref={previewRef}
              srcDoc={htmlContent}
              sandbox="allow-same-origin allow-scripts"
              className="bg-white border border-slate-200 rounded-lg shadow-sm transition-all duration-300"
              style={{
                width: viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : "100%",
                height: viewport === "mobile" ? 667 : viewport === "tablet" ? 500 : 400,
                maxWidth: "100%",
              }}
              title="HTML Preview"
            />
          </div>
        </div>
      )}

      {/* Progress */}
      {loading && progress && (
        <div className="flex items-center gap-3 rounded-lg bg-purple-50 px-4 py-3">
          <svg
            className="h-4 w-4 animate-spin text-purple-600"
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
          <span className="text-sm font-medium text-purple-700">
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
      {textResult && (
        <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-1 text-center">
          <p className="text-sm font-semibold text-green-800">
            Text PDF Generated
          </p>
          <p className="text-xs text-green-600">
            {textResult.pageCount} page{textResult.pageCount !== 1 ? "s" : ""}{" "}
            · {formatBytes(textResult.pdfSize)}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {htmlContent.trim() && !textResult && (
        <div className="space-y-3">
          <button
            onClick={handleSaveAsPdf}
            disabled={loading}
            className="btn-primary w-full"
          >
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
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 7.131s0 0 0 0"
              />
            </svg>
            Save as PDF (Print Dialog)
          </button>
          <button
            onClick={handleExtractTextToPdf}
            disabled={loading}
            className="btn-secondary w-full"
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
                Extracting...
              </>
            ) : (
              "Extract Text to PDF"
            )}
          </button>
        </div>
      )}

      {/* Download Button */}
      {textResult && (
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
            Download {textResult.name}
          </button>
          <button onClick={handleSaveAsPdf} className="btn-secondary w-full">
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
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 7.131s0 0 0 0"
              />
            </svg>
            Save as PDF (Print Dialog)
          </button>
          <button onClick={handleReset} className="btn-secondary w-full">
            Convert Another File
          </button>
        </div>
      )}
    </div>
  );
}
