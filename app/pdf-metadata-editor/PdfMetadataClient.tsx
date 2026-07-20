"use client";

import { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

interface MetadataFields {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export default function PdfMetadataClient() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<MetadataFields>({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    setFile(f);
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      setFields({
        title: doc.getTitle() ?? "",
        author: doc.getAuthor() ?? "",
        subject: doc.getSubject() ?? "",
        keywords: (doc.getKeywords() ?? "") as string,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (!file) return;

    setSaving(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);

      doc.setTitle(fields.title);
      doc.setAuthor(fields.author);
      doc.setSubject(fields.subject);
      doc.setKeywords(
        fields.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      );

      const pdfBytes = await doc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setResult({ blob, url: URL.createObjectURL(blob) });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save PDF");
    } finally {
      setSaving(false);
    }
  }, [file, fields]);

  const download = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}_metadata.pdf`;
    a.click();
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setFields({ title: "", author: "", subject: "", keywords: "" });
    setResult(null);
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
              {loading && <p className="text-xs text-gray-400">Loading metadata...</p>}
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {!loading && !result && (
            <div className="card p-4 space-y-4">
              {(
                [
                  ["title", "Title"],
                  ["author", "Author"],
                  ["subject", "Subject"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-semibold text-gray-500">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={fields[key]}
                    onChange={(e) =>
                      setFields((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={fields.keywords}
                  onChange={(e) =>
                    setFields((prev) => ({ ...prev, keywords: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
              <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
                {saving ? "Saving..." : "Save Metadata"}
              </button>
            </div>
          )}

          {result && (
            <div className="card p-4 space-y-3 text-center">
              <p className="text-sm font-medium text-gray-700">
                Metadata updated — your PDF is ready to download.
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
