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

export default function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

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

    try {
      // Load JSZip from CDN
      setProgress("Loading dependencies...");
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

      // Read the file as ArrayBuffer
      setProgress("Parsing Word document...");
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Extract document.xml from word/ folder
      const docXml = zip.file("word/document.xml");
      if (!docXml) {
        throw new Error(
          "Could not find document.xml. Please ensure this is a valid DOCX file."
        );
      }

      setProgress("Extracting text content...");
      const xml: string = await docXml.async("string");
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");

      // Extract text from w:t elements
      const WP_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
      const textElements = doc.getElementsByTagNameNS(WP_NS, "t");
      const paragraphs: string[] = [];

      // Group text by paragraphs (w:p elements)
      const pElements = doc.getElementsByTagNameNS(WP_NS, "p");
      for (let i = 0; i < pElements.length; i++) {
        const pEl = pElements[i];
        const tElements = pEl.getElementsByTagNameNS(WP_NS, "t");
        let paragraphText = "";
        for (let j = 0; j < tElements.length; j++) {
          paragraphText += tElements[j].textContent || "";
        }
        if (paragraphText.trim()) {
          paragraphs.push(paragraphText.trim());
        }
      }

      if (paragraphs.length === 0 && textElements.length === 0) {
        throw new Error(
          "No text content found in this document. It may be empty, image-only, or in an unsupported format."
        );
      }

      // Fallback: if no paragraphs found, collect all text elements
      if (paragraphs.length === 0) {
        const allTexts: string[] = [];
        for (let i = 0; i < textElements.length; i++) {
          const t = textElements[i].textContent?.trim();
          if (t) allTexts.push(t);
        }
        paragraphs.push(...allTexts);
      }

      // Create PDF with pdf-lib
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
      const title = file.name.replace(/\.[^/.]+$/, "");
      page.drawText(title, {
        x: MARGIN,
        y: yPosition,
        size: 16,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 12;

      // Draw separator line
      page.drawLine({
        start: { x: MARGIN, y: yPosition },
        end: { x: PAGE_WIDTH - MARGIN, y: yPosition },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
      yPosition -= 20;

      for (const paragraph of paragraphs) {
        const words = paragraph.split(/\s+/);
        let line = "";

        for (const word of words) {
          const testLine = line ? `${line} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, BODY_SIZE);

          if (testWidth > CONTENT_WIDTH && line) {
            if (yPosition < MARGIN + 20) {
              // New page
              page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
              yPosition = PAGE_HEIGHT - MARGIN;
              pageCount++;
            }
            page.drawText(line, {
              x: MARGIN,
              y: yPosition,
              size: BODY_SIZE,
              font: font,
              color: rgb(0.15, 0.15, 0.15),
            });
            yPosition -= LINE_HEIGHT;
            line = word;
          } else {
            line = testLine;
          }
        }

        // Draw remaining text
        if (line) {
          if (yPosition < MARGIN + 20) {
            page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
            yPosition = PAGE_HEIGHT - MARGIN;
            pageCount++;
          }
          page.drawText(line, {
            x: MARGIN,
            y: yPosition,
            size: BODY_SIZE,
            font: font,
            color: rgb(0.15, 0.15, 0.15),
          });
          yPosition -= LINE_HEIGHT;
        }

        // Paragraph spacing
        yPosition -= LINE_HEIGHT * 0.5;
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
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [".docx"],
        }}
        label="Drop your Word file here"
        sublabel="DOC or DOCX · Click to browse"
      />

      {file && (
        <>
          {/* File Info */}
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
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

          {/* Progress */}
          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
              <svg
                className="h-4 w-4 animate-spin text-blue-600"
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
              <span className="text-sm font-medium text-blue-700">
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
              <strong>Note:</strong> This converter extracts text content. For
              full formatting preservation including images, tables, and complex
              layouts, use Microsoft Word or Google Docs.
            </p>
          </div>

          {/* Convert Button */}
          {!result && (
            <button
              onClick={handleConvert}
              disabled={loading}
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
