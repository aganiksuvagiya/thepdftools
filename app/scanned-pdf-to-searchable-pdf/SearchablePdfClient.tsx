"use client";

import { useCallback, useState } from "react";
import DropZone from "@/components/DropZone";

async function loadPdfJs() {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return pdfjsLib;
}

async function loadTesseract() {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/tesseract.esm.min.js";
  const module = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  return module.default;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function wrapText(text: string, maxChars = 95) {
  const lines: string[] = [];

  for (const paragraph of text.split(/\n+/)) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      continue;
    }

    let current = words[0];

    for (let i = 1; i < words.length; i += 1) {
      const candidate = `${current} ${words[i]}`;
      if (candidate.length <= maxChars) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }

    lines.push(current);
  }

  return lines;
}

export default function SearchablePdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleFiles = useCallback((files: File[]) => {
    const nextFile = files[0];
    if (!nextFile) return;

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setFile(nextFile);
    setProcessing(false);
    setProgress("");
    setError(null);
    setDownloadUrl(null);
    setPreviewText(null);
    setPageCount(0);
    setWordCount(0);
  }, [downloadUrl]);

  const handleReset = useCallback(() => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setFile(null);
    setProcessing(false);
    setProgress("");
    setError(null);
    setDownloadUrl(null);
    setPreviewText(null);
    setPageCount(0);
    setWordCount(0);
  }, [downloadUrl]);

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);
    setDownloadUrl(null);
    setPreviewText(null);
    setProgress("Loading OCR and PDF libraries...");

    try {
      const [pdfjsLib, tesseract, pdfLib] = await Promise.all([
        loadPdfJs(),
        loadTesseract(),
        import("pdf-lib"),
      ]);

      const { PDFDocument, StandardFonts, rgb } = pdfLib;
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const totalPages = pdf.numPages;
      setPageCount(totalPages);

      setProgress("Starting OCR engine...");
      const worker = await tesseract.createWorker("eng", 1, {
        logger: (message: { status: string; progress: number }) => {
          if (message.status === "recognizing text") {
            setProgress(`Recognising text... ${Math.round(message.progress * 100)}%`);
          }
        },
      });

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const extractedPages: string[] = [];

      for (let i = 1; i <= totalPages; i += 1) {
        setProgress(`Processing page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas could not be created.");
        }

        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const imageData = canvas.toDataURL("image/png");
        const result = await worker.recognize(imageData);
        const ocrText = result?.data?.text?.trim() ?? "";
        extractedPages.push(`--- Page ${i} ---\n${ocrText || "[No text detected]"}`);

        const pngBytes = await fetch(imageData).then((response) => response.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(pngBytes);
        const pdfPage = pdfDoc.addPage([viewport.width, viewport.height]);

        pdfPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });

        // Add a near-invisible text layer so the rebuilt PDF becomes searchable.
        const lines = wrapText(ocrText || " ");
        const fontSize = 8;
        const lineHeight = 10;
        let y = viewport.height - 18;

        for (const line of lines) {
          if (y < 12) break;
          pdfPage.drawText(line || " ", {
            x: 12,
            y,
            size: fontSize,
            font,
            color: rgb(1, 1, 1),
            opacity: 0.01,
            lineHeight,
            maxWidth: viewport.width - 24,
          });
          y -= lineHeight;
        }
      }

      await worker.terminate();

      setProgress("Building searchable PDF...");
      const output = await pdfDoc.save();
      const blob = new Blob([output.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      const fullText = extractedPages.join("\n\n");
      setPreviewText(fullText);
      setWordCount(countWords(fullText));
      setProgress("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not create a searchable PDF. Please try again."
      );
      setProgress("");
    } finally {
      setProcessing(false);
    }
  }, [file]);

  const handleDownload = useCallback(() => {
    if (!downloadUrl || !file) return;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name.replace(/\.pdf$/i, "") + "_searchable.pdf";
    a.click();
  }, [downloadUrl, file]);

  return (
    <div className="card space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "application/pdf": [".pdf"] }}
          multiple={false}
          label="Drop your scanned PDF here"
          sublabel="Create a searchable PDF with OCR and download it instantly"
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
            </div>
            <button onClick={handleReset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {!downloadUrl && !processing && (
            <div className="space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-6 text-amber-800">
                First run downloads the OCR model in your browser. Large scanned PDFs can take a bit longer because each page is recognised locally.
              </p>
              <button onClick={handleConvert} className="btn-primary w-full">
                Make Searchable PDF
              </button>
            </div>
          )}

          {processing && (
            <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
              <p className="text-sm font-medium text-blue-700">{progress}</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {downloadUrl && previewText && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-700">Searchable PDF ready</p>
                  <p className="text-xs text-green-600">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} · {wordCount.toLocaleString()} words recognised
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Pages</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{pageCount}</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Words</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{wordCount.toLocaleString()}</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Output</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">Searchable PDF</div>
                </div>
              </div>

              <button onClick={handleDownload} className="btn-primary w-full">
                Download Searchable PDF
              </button>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">OCR text preview</p>
                <textarea
                  readOnly
                  value={previewText}
                  rows={16}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-700 outline-none"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
