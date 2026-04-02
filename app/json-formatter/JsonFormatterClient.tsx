"use client";

import { useState, useMemo } from "react";

type IndentType = "2" | "4" | "tab";

function getIndent(type: IndentType): string | number {
  if (type === "tab") return "\t";
  return Number(type);
}

function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) {
    return obj.reduce((sum: number, item) => sum + countKeys(item), 0);
  }
  let count = 0;
  for (const key of Object.keys(obj)) {
    count += 1 + countKeys((obj as Record<string, unknown>)[key]);
  }
  return count;
}

function getDepth(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return 1;
    return 1 + Math.max(...obj.map(getDepth));
  }
  const vals = Object.values(obj);
  if (vals.length === 0) return 1;
  return 1 + Math.max(...vals.map(getDepth));
}

function extractErrorLine(err: unknown): string {
  if (!(err instanceof SyntaxError)) return String(err);
  const msg = err.message;
  const posMatch = msg.match(/position\s+(\d+)/i);
  if (!posMatch) return msg;
  return msg;
}

export default function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!output) return null;
    try {
      const parsed = JSON.parse(output);
      const keys = countKeys(parsed);
      const depth = getDepth(parsed);
      const bytes = new Blob([output]).size;
      return { keys, depth, bytes };
    } catch {
      return null;
    }
  }, [output]);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setOutput(formatted);
      setStatus({ type: "success", message: "JSON formatted successfully" });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", message: extractErrorLine(err) });
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setStatus({ type: "success", message: "JSON minified successfully" });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", message: extractErrorLine(err) });
    }
  };

  const handleValidate = () => {
    if (!input.trim()) return;
    try {
      JSON.parse(input);
      setStatus({ type: "success", message: "Valid JSON" });
    } catch (err) {
      setStatus({ type: "error", message: extractErrorLine(err) });
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus(null);
    setCopied(false);
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
      {/* Input */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">JSON Input</label>
          <button onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Clear
          </button>
        </div>
        <textarea
          className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          placeholder='Paste your JSON here, e.g. {"name": "John", "age": 30}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          {/* Indentation selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Indent:</span>
            {(["2", "4", "tab"] as IndentType[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setIndent(opt)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  indent === opt
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt === "tab" ? "Tab" : `${opt} spaces`}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={handleFormat} className="btn-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
              </svg>
              Format
            </button>
            <button onClick={handleMinify} className="btn-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Minify
            </button>
            <button onClick={handleValidate} className="btn-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Validate
            </button>
          </div>
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
      {output && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Output</label>
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
          </div>
          <pre className="w-full max-h-96 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
            {output}
          </pre>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Keys</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{stats.keys}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Depth</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{stats.depth}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Size</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{formatBytes(stats.bytes)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
