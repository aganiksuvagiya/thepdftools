"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import DropZone from "@/components/DropZone";
import { needsUnicode } from "@/app/text-to-pdf/unicodePdf";
import { textToPng } from "@/lib/textImage";

type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfWatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [position, setPosition] = useState<Position>("center");
  const [fontSize, setFontSize] = useState(52);
  const [opacity, setOpacity] = useState(0.2);
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

  const handleWatermark = useCallback(async () => {
    if (!file || !text.trim()) { setError("Please upload a PDF and enter watermark text."); return; }
    setProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      // The built-in font cannot encode Gujarati, Hindi, "₹" etc., so such text is stamped as an image.
      const art = needsUnicode(text) ? textToPng(text, fontSize, "#808080", true) : null;
      const image = art ? await doc.embedPng(art.dataUrl) : null;
      const pages = doc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = art ? art.textWidth : font.widthOfTextAtSize(text, fontSize);

        let x = 0, y = 0, angle = 0;
        const pad = 20;

        switch (position) {
          case "center":
            // text rotates about its start point, so step back half its length along the diagonal
            angle = 45;
            x = width / 2 - (textWidth / 2) * Math.SQRT1_2 + fontSize * 0.35 * Math.SQRT1_2;
            y = height / 2 - (textWidth / 2) * Math.SQRT1_2 - fontSize * 0.35 * Math.SQRT1_2;
            break;
          case "top-left":
            x = pad;
            y = height - pad - fontSize;
            break;
          case "top-right":
            x = width - textWidth - pad;
            y = height - pad - fontSize;
            break;
          case "bottom-left":
            x = pad;
            y = pad;
            break;
          case "bottom-right":
            x = width - textWidth - pad;
            y = pad;
            break;
        }

        if (art && image) {
          // (x, y) is the text's baseline start; move to the image's bottom-left corner
          const rad = (angle * Math.PI) / 180;
          page.drawImage(image, {
            x: x - art.pad * Math.cos(rad) + art.descent * Math.sin(rad),
            y: y - art.pad * Math.sin(rad) - art.descent * Math.cos(rad),
            width: art.width,
            height: art.height,
            opacity,
            rotate: degrees(angle),
          });
        } else {
          page.drawText(text, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(0.5, 0.5, 0.5),
            opacity,
            rotate: degrees(angle),
          });
        }
      }

      const pdfBytes = await doc.save();
      const pdfOutput = Uint8Array.from(pdfBytes);
      const blob = new Blob([pdfOutput], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add watermark.");
    } finally {
      setProcessing(false);
    }
  }, [file, text, position, fontSize, opacity]);

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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Watermark text</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. CONFIDENTIAL"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {(["top-left", "top-right", "center", "bottom-left", "bottom-right"] as Position[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className={`rounded-lg border py-2 font-medium transition-colors ${
                        position === p ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-500 hover:border-violet-300"
                      } ${p === "center" ? "col-span-1" : ""}`}
                    >
                      {p === "center" ? "Center (diagonal)" : p.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Font size: {fontSize}pt</label>
                <input type="range" min={16} max={96} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-violet-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Opacity: {Math.round(opacity * 100)}%</label>
                <input type="range" min={5} max={60} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full accent-violet-600" />
              </div>

              <button onClick={handleWatermark} disabled={processing} className="btn-primary w-full">
                {processing ? "Adding watermark…" : "Add Watermark"}
              </button>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ Watermark added successfully</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a href={resultUrl} download={file.name.replace(/\.pdf$/i, "") + "_watermarked.pdf"} className="btn-primary inline-block">
                Download Watermarked PDF
              </a>
              <div><button onClick={reset} className="btn-secondary text-sm">Watermark Another PDF</button></div>
            </div>
          )}

          {error && <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}
        </>
      )}
    </div>
  );
}
