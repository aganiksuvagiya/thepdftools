"use client";

import { useState, useMemo, useCallback } from "react";
import * as Papa from "papaparse";
import DropZone from "@/components/DropZone";

type Delimiter = "," | ";" | "\t" | "|";

const DELIMITER_OPTIONS: { label: string; value: Delimiter }[] = [
  { label: "Comma", value: "," },
  { label: "Semicolon", value: ";" },
  { label: "Tab", value: "\t" },
  { label: "Pipe", value: "|" },
];

export default function CsvToJsonClient() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [firstRowHeaders, setFirstRowHeaders] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");

  const stats = useMemo(() => {
    if (!jsonOutput) return null;
    try {
      const parsed = JSON.parse(jsonOutput);
      const rows = Array.isArray(parsed) ? parsed.length : 0;
      const cols = Array.isArray(parsed) && parsed.length > 0
        ? typeof parsed[0] === "object" && parsed[0] !== null
          ? Object.keys(parsed[0]).length
          : Array.isArray(parsed[0])
            ? parsed[0].length
            : 0
        : 0;
      const bytes = new Blob([jsonOutput]).size;
      return { rows, cols, bytes };
    } catch {
      return null;
    }
  }, [jsonOutput]);

  const handleConvert = useCallback(() => {
    if (!csvInput.trim()) return;
    try {
      const result = Papa.parse(csvInput.trim(), {
        delimiter: delimiter,
        header: firstRowHeaders,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      if (result.errors.length > 0) {
        const firstErr = result.errors[0];
        setStatus({ type: "error", message: `Row ${(firstErr.row ?? 0) + 1}: ${firstErr.message}` });
      } else {
        setStatus({ type: "success", message: `Converted ${result.data.length} rows successfully` });
      }

      const json = prettyPrint
        ? JSON.stringify(result.data, null, 2)
        : JSON.stringify(result.data);
      setJsonOutput(json);
    } catch (err) {
      setJsonOutput("");
      setStatus({ type: "error", message: String(err) });
    }
  }, [csvInput, delimiter, firstRowHeaders, prettyPrint]);

  const handleFileUpload = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvInput(text);
      setStatus(null);
      setJsonOutput("");
    };
    reader.readAsText(file);
  }, []);

  const handleCopy = async () => {
    if (!jsonOutput) return;
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = fileName ? fileName.replace(/\.[^.]+$/, "") : "converted";
    a.download = `${baseName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setCsvInput("");
    setJsonOutput("");
    setStatus(null);
    setCopied(false);
    setFileName("");
  };

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <DropZone
        onFilesAccepted={handleFileUpload}
        accept={{ "text/csv": [".csv"], "text/plain": [".txt", ".tsv"] }}
        label="Drop your CSV file here"
        sublabel="or click to browse (.csv, .tsv, .txt)"
      />

      {/* CSV Input */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            CSV Input {fileName && <span className="text-gray-400 font-normal">({fileName})</span>}
          </label>
          <button onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Clear
          </button>
        </div>
        <textarea
          className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          placeholder={'name,age,city\nAlice,30,New York\nBob,25,London'}
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          {/* Delimiter selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Delimiter:</span>
            {DELIMITER_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setDelimiter(opt.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  delimiter === opt.value
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={firstRowHeaders}
                onChange={(e) => setFirstRowHeaders(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              First row as headers
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={prettyPrint}
                onChange={(e) => setPrettyPrint(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              Pretty print
            </label>
          </div>

          <div className="flex-1" />

          {/* Action button */}
          <button onClick={handleConvert} className="btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Convert to JSON
          </button>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.type === "success" ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {status.message}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {status.message}
            </span>
          )}
        </div>
      )}

      {/* Output */}
      {jsonOutput && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">JSON Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 border border-brand-200 hover:bg-brand-100 transition-all"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .json
              </button>
            </div>
          </div>
          <pre className="w-full max-h-96 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
            {jsonOutput}
          </pre>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rows</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{stats.rows}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Columns</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{stats.cols}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">JSON Size</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{formatBytes(stats.bytes)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
