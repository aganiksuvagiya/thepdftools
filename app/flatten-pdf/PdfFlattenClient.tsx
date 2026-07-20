"use client";

import { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfFlattenClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setResult(null);
    setInfo(null);
    setProcessing(true);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);

      let fieldCount = 0;
      try {
        const form = doc.getForm();
        fieldCount = form.getFields().length;
        if (fieldCount > 0) {
          form.flatten();
        }
      } catch {
        // No form present on this PDF — nothing to flatten, still re-save below.
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setResult({ blob, url: URL.createObjectURL(blob) });
      setInfo(
        fieldCount > 0
          ? `Flattened ${fieldCount} form field${fieldCount !== 1 ? "s" : ""} into static page content.`
          : "No fillable form fields were found in this PDF — the file was still re-saved."
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to flatten PDF");
    } finally {
      setProcessing(false);
    }
  }, []);

  const download = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}_flattened.pdf`;
    a.click();
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError(null);
    setInfo(null);
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
              {processing && <p className="text-xs text-gray-400">Flattening...</p>}
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {result && (
            <div className="card p-4 space-y-3 text-center">
              {info && <p className="text-sm text-gray-600">{info}</p>}
              <p className="text-sm font-medium text-gray-700">
                {formatBytes(result.blob.size)} ready to download
              </p>
              <div className="flex gap-2">
                <button onClick={download} className="btn-primary flex-1">
                  Download
                </button>
                <button onClick={reset} className="btn-secondary flex-1">
                  Start Over
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
