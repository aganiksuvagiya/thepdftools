"use client";

import { useState, useCallback } from "react";
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

export default function PdfOcrClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFile = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setResult(null);
  }, []);

  const handleOcr = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);
    setProgress("Loading libraries…");

    try {
      const [pdfjsLib, tesseract] = await Promise.all([
        loadPdfJs(),
        loadTesseract(),
      ]);

      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const numPages = pdf.numPages;

      setProgress("Initialising OCR engine…");
      const worker = await tesseract.createWorker("eng", 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgress(`Recognising text… ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      const allText: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Processing page ${i} of ${numPages}…`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const imageData = canvas.toDataURL("image/png");
        const { data } = await worker.recognize(imageData);
        if (data.text.trim()) {
          allText.push(`--- Page ${i} ---\n${data.text.trim()}`);
        }
      }

      await worker.terminate();
      setResult(allText.join("\n\n") || "No text could be extracted from this PDF.");
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "OCR failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [file]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "") + "_ocr.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setProgress("");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFile}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your scanned PDF here"
          sublabel="or click to browse"
        />
      ) : (
        <>
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">Change file</button>
          </div>

          {!result && !processing && (
            <div className="card p-5">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700 mb-4">
                ⚠ First run downloads the OCR language model (~10 MB). Subsequent runs are faster.
              </div>
              <button onClick={handleOcr} className="btn-primary w-full">
                Extract Text (OCR)
              </button>
            </div>
          )}

          {processing && (
            <div className="card p-8 text-center space-y-3">
              <div className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-violet-600" />
              <p className="text-sm text-gray-500">{progress}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Extracted text</p>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="btn-secondary text-sm">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={handleDownload} className="btn-primary text-sm">
                    Download .txt
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                value={result}
                rows={16}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 font-mono focus:outline-none resize-y"
              />
              <button onClick={reset} className="btn-secondary w-full">Extract from Another PDF</button>
            </div>
          )}

          {error && (
            <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
          )}
        </>
      )}
    </div>
  );
}
