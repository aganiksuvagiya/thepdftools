"use client";

import { useState, useCallback } from "react";
import heic2any from "heic2any";
import DropZone from "@/components/DropZone";

interface ConvertedFile {
  url: string;
  originalName: string;
  originalSize: number;
  jpgSize: number;
  jpgName: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function HeicToJpgClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.92);

  const handleFiles = useCallback((accepted: File[]) => {
    setFiles(accepted);
    setResults([]);
    setError(null);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);
    const converted: ConvertedFile[] = [];

    try {
      for (const file of files) {
        const blob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality,
        });

        const outputBlob = Array.isArray(blob) ? blob[0] : blob;
        const url = URL.createObjectURL(outputBlob);
        const baseName = file.name.replace(/\.[^/.]+$/, "");

        converted.push({
          url,
          originalName: file.name,
          originalSize: file.size,
          jpgSize: outputBlob.size,
          jpgName: `${baseName}.jpg`,
        });
      }
      setResults(converted);
    } catch {
      setError("Conversion failed. Please make sure the file is a valid HEIC/HEIF image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (result: ConvertedFile) => {
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.jpgName;
    a.click();
  };

  const handleDownloadAll = () => {
    results.forEach((result) => handleDownload(result));
  };

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "image/heic": [".heic", ".HEIC"], "image/heif": [".heif", ".HEIF"] }}
        label="Drop your HEIC files here"
        sublabel="HEIC / HEIF only · Click to browse"
        multiple
      />

      {files.length > 0 && (
        <>
          {/* Quality slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                JPG Quality
              </label>
              <span className="text-sm font-semibold text-brand-600">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Smaller file</span>
              <span>Best quality</span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Converting{files.length > 1 ? ` (${results.length}/${files.length})` : ""}...
              </>
            ) : (
              `Convert ${files.length > 1 ? `${files.length} Files` : ""} to JPG`
            )}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* File list */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </p>
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm">
                <span className="truncate text-gray-700">{file.name}</span>
                <span className="ml-2 shrink-0 text-gray-400">{formatBytes(file.size)}</span>
              </div>
            ))}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {results.map((result, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-gray-100 p-4">
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.url}
                        alt={result.jpgName}
                        className="w-full object-contain max-h-48 bg-gray-50"
                      />
                    </div>
                    <p className="truncate text-sm font-medium text-gray-700">{result.jpgName}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-xs text-gray-500">Original</p>
                        <p className="font-semibold text-gray-700">{formatBytes(result.originalSize)}</p>
                      </div>
                      <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-center">
                        <p className="text-xs text-brand-600">JPG</p>
                        <p className="font-semibold text-brand-700">{formatBytes(result.jpgSize)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(result)}
                      className="btn-secondary w-full"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download {result.jpgName}
                    </button>
                  </div>
                ))}
              </div>

              {results.length > 1 && (
                <button onClick={handleDownloadAll} className="btn-primary w-full">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download All ({results.length} files)
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
