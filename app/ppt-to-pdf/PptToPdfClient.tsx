"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

interface SlideContent {
  slideNumber: number;
  texts: string[];
}

interface ConversionResult {
  url: string;
  pdfSize: number;
  name: string;
  slideCount: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PptToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slideCount, setSlideCount] = useState<number>(0);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setResult(null);
    setError(null);
    setProgress("");
    setSlideCount(0);
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setProgress("Reading file...");

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
      setProgress("Parsing PowerPoint file...");
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Find slide XML files
      const slideFiles = Object.keys(zip.files)
        .filter((f: string) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
        .sort((a: string, b: string) => {
          const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
          const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
          return numA - numB;
        });

      if (slideFiles.length === 0) {
        throw new Error(
          "No slides found in this file. Please ensure it is a valid .pptx file."
        );
      }

      setSlideCount(slideFiles.length);

      // Extract text from each slide
      const slides: SlideContent[] = [];
      for (let i = 0; i < slideFiles.length; i++) {
        setProgress(`Processing slide ${i + 1} of ${slideFiles.length}...`);
        const slideFile = slideFiles[i];
        const xml: string = await zip.file(slideFile).async("string");
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");

        // Extract text elements (a:t tags in the DrawingML namespace)
        const textElements = doc.getElementsByTagNameNS(
          "http://schemas.openxmlformats.org/drawingml/2006/main",
          "t"
        );
        const texts = Array.from(textElements)
          .map((el) => el.textContent?.trim())
          .filter((t): t is string => Boolean(t));

        slides.push({
          slideNumber: i + 1,
          texts,
        });
      }

      // Create PDF with pdf-lib
      setProgress("Generating PDF...");
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const PAGE_WIDTH = 612; // Letter size
      const PAGE_HEIGHT = 792;
      const MARGIN = 50;
      const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
      const TITLE_SIZE = 16;
      const BODY_SIZE = 11;
      const LINE_HEIGHT = BODY_SIZE * 1.6;

      for (const slide of slides) {
        const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

        // Draw slide header
        page.drawText(`Slide ${slide.slideNumber}`, {
          x: MARGIN,
          y: PAGE_HEIGHT - MARGIN,
          size: TITLE_SIZE,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        // Draw separator line
        page.drawLine({
          start: { x: MARGIN, y: PAGE_HEIGHT - MARGIN - 10 },
          end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - MARGIN - 10 },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8),
        });

        // Draw text content
        let yPosition = PAGE_HEIGHT - MARGIN - 35;

        if (slide.texts.length === 0) {
          page.drawText("(No text content on this slide)", {
            x: MARGIN,
            y: yPosition,
            size: BODY_SIZE,
            font: font,
            color: rgb(0.6, 0.6, 0.6),
          });
        } else {
          for (const text of slide.texts) {
            // Word wrap
            const words = text.split(/\s+/);
            let line = "";

            for (const word of words) {
              const testLine = line ? `${line} ${word}` : word;
              const testWidth = font.widthOfTextAtSize(testLine, BODY_SIZE);

              if (testWidth > CONTENT_WIDTH && line) {
                if (yPosition < MARGIN) {
                  // Overflow to new page continuation
                  break;
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

            // Draw remaining text in line
            if (line && yPosition >= MARGIN) {
              page.drawText(line, {
                x: MARGIN,
                y: yPosition,
                size: BODY_SIZE,
                font: font,
                color: rgb(0.15, 0.15, 0.15),
              });
              yPosition -= LINE_HEIGHT;
            }

            // Add spacing between text blocks
            yPosition -= LINE_HEIGHT * 0.3;
          }
        }

        // Draw slide number at bottom
        const slideNumText = `${slide.slideNumber} / ${slides.length}`;
        const slideNumWidth = font.widthOfTextAtSize(slideNumText, 9);
        page.drawText(slideNumText, {
          x: PAGE_WIDTH / 2 - slideNumWidth / 2,
          y: 30,
          size: 9,
          font: font,
          color: rgb(0.6, 0.6, 0.6),
        });
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      setResult({
        url,
        pdfSize: blob.size,
        name: `${baseName}.pdf`,
        slideCount: slides.length,
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
    setSlideCount(0);
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            [".pptx"],
          "application/vnd.ms-powerpoint": [".ppt"],
        }}
        label="Drop your PowerPoint file here"
        sublabel="PPTX or PPT · Click to browse"
      />

      {file && (
        <>
          {/* File Info */}
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <svg
                    className="h-5 w-5 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                    {slideCount > 0 && ` · ${slideCount} slides detected`}
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
            <div className="flex items-center gap-3 rounded-lg bg-orange-50 px-4 py-3">
              <svg
                className="h-4 w-4 animate-spin text-orange-600"
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
              <span className="text-sm font-medium text-orange-700">
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
                {result.slideCount} slides · {formatBytes(result.pdfSize)}
              </p>
            </div>
          )}

          {/* Note */}
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> This converter extracts text content from
              slides. For full formatting preservation including images, charts,
              and custom layouts, use Microsoft Office or Google Slides to export
              as PDF.
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
