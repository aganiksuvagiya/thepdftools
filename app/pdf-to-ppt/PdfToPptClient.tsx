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

export default function PdfToPptClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
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

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress("Loading PDF…");

    try {
      const [{ getDocument, GlobalWorkerOptions }, pptxgen] = await Promise.all([
        import("pdfjs-dist"),
        import("pptxgenjs"),
      ]);

      GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const buf = await file.arrayBuffer();
      const pdf = await getDocument({ data: buf }).promise;
      const numPages = pdf.numPages;

      const PptxGenJS = (pptxgen as { default?: typeof pptxgen } & typeof pptxgen).default ?? pptxgen;
      const prs = new (PptxGenJS as new () => InstanceType<typeof PptxGenJS>)();

      (prs as { layout: string }).layout = "LAYOUT_WIDE";

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Converting page ${i} of ${numPages}…`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        await page.render({ canvasContext: ctx, viewport }).promise;
        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        const slide = prs.addSlide();
        slide.addImage({ data: imgData, x: 0, y: 0, w: "100%", h: "100%" });
      }

      setProgress("Generating PPTX file…");
      const blob = await (prs as { write: (opts: { outputType: string }) => Promise<Blob> }).write({ outputType: "blob" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setProcessing(false);
    }
  }, [file]);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setResultUrl(null);
    setError(null);
    setProgress("");
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

          {!resultUrl && !processing && (
            <div className="card p-5">
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700 mb-4">
                ℹ Each PDF page will become one PowerPoint slide. Large PDFs may take a moment to process.
              </div>
              <button onClick={handleConvert} className="btn-primary w-full">
                Convert to PowerPoint
              </button>
            </div>
          )}

          {processing && (
            <div className="card p-8 text-center space-y-3">
              <div className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-violet-600" />
              <p className="text-sm text-gray-500">{progress}</p>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ Conversion complete</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a
                href={resultUrl}
                download={file.name.replace(/\.pdf$/i, "") + ".pptx"}
                className="btn-primary inline-block"
              >
                Download PPTX
              </a>
              <div><button onClick={reset} className="btn-secondary text-sm">Convert Another PDF</button></div>
            </div>
          )}

          {error && <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}
        </>
      )}
    </div>
  );
}
