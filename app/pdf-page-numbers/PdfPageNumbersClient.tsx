"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import DropZone from "@/components/DropZone";

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center";
type Format = "plain" | "page-n" | "n-of-total" | "page-n-of-total";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function formatLabel(format: Format, n: number, total: number): string {
  switch (format) {
    case "plain": return `${n}`;
    case "page-n": return `Page ${n}`;
    case "n-of-total": return `${n} / ${total}`;
    case "page-n-of-total": return `Page ${n} of ${total}`;
  }
}

export default function PdfPageNumbersClient() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [format, setFormat] = useState<Format>("plain");
  const [startNum, setStartNum] = useState(1);
  const [fontSize, setFontSize] = useState(11);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setResultUrl(null);
  }, []);

  const handleAddNumbers = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;

      for (let i = 0; i < total; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const label = formatLabel(format, startNum + i, startNum + total - 1);
        const textWidth = font.widthOfTextAtSize(label, fontSize);
        const pad = 18;

        let x = 0, y = 0;
        switch (position) {
          case "bottom-center": x = (width - textWidth) / 2; y = pad; break;
          case "bottom-right":  x = width - textWidth - pad; y = pad; break;
          case "bottom-left":   x = pad; y = pad; break;
          case "top-center":    x = (width - textWidth) / 2; y = height - pad - fontSize; break;
        }

        page.drawText(label, { x, y, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) });
      }

      const pdfBytes = await doc.save();
      const pdfOutput = Uint8Array.from(pdfBytes);
      const blob = new Blob([pdfOutput], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add page numbers.");
    } finally {
      setProcessing(false);
    }
  }, [file, position, format, startNum, fontSize]);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFile}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your PDF here"
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

          {!resultUrl && (
            <div className="card p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: "bottom-center", label: "Bottom Center" },
                    { key: "bottom-right", label: "Bottom Right" },
                    { key: "bottom-left", label: "Bottom Left" },
                    { key: "top-center", label: "Top Center" },
                  ] as { key: Position; label: string }[]).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setPosition(key)}
                      className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                        position === key ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-600 hover:border-violet-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number format</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: "plain", label: "1  2  3" },
                    { key: "page-n", label: "Page 1" },
                    { key: "n-of-total", label: "1 / 10" },
                    { key: "page-n-of-total", label: "Page 1 of 10" },
                  ] as { key: Format; label: string }[]).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setFormat(key)}
                      className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                        format === key ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-600 hover:border-violet-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start from</label>
                  <input
                    type="number"
                    min={1}
                    value={startNum}
                    onChange={(e) => setStartNum(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Font size: {fontSize}pt</label>
                  <input type="range" min={8} max={18} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full mt-2 accent-violet-600" />
                </div>
              </div>

              <button onClick={handleAddNumbers} disabled={processing} className="btn-primary w-full">
                {processing ? "Adding page numbers…" : "Add Page Numbers"}
              </button>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ Page numbers added successfully</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a href={resultUrl} download={file.name.replace(/\.pdf$/i, "") + "_numbered.pdf"} className="btn-primary inline-block">
                Download Numbered PDF
              </a>
              <div><button onClick={reset} className="btn-secondary text-sm">Number Another PDF</button></div>
            </div>
          )}

          {error && <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}
        </>
      )}
    </div>
  );
}
