"use client";

import { useState, useMemo } from "react";

type IndentType = "2" | "4" | "tab";

function getIndent(type: IndentType): string | number {
  return type === "tab" ? "\t" : Number(type);
}

function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) return obj.reduce((s: number, i) => s + countKeys(i), 0);
  let n = 0;
  for (const k of Object.keys(obj)) n += 1 + countKeys((obj as Record<string, unknown>)[k]);
  return n;
}

function getDepth(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) return obj.length === 0 ? 1 : 1 + Math.max(...obj.map(getDepth));
  const vals = Object.values(obj);
  return vals.length === 0 ? 1 : 1 + Math.max(...vals.map(getDepth));
}

function sortKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeysDeep);
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.keys(obj as object).sort().map((k) => [k, sortKeysDeep((obj as Record<string, unknown>)[k])])
    );
  }
  return obj;
}

function removeNulls(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.filter((v) => v !== null).map(removeNulls);
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => [k, removeNulls(v)])
    );
  }
  return obj;
}

function toTypeScriptInterface(obj: unknown, name = "Root"): string {
  if (obj === null || typeof obj !== "object") return `type ${name} = ${typeof obj};`;

  function inferType(val: unknown, depth = 0): string {
    if (val === null) return "null";
    if (Array.isArray(val)) {
      if (val.length === 0) return "unknown[]";
      return `${inferType(val[0], depth)}[]`;
    }
    if (typeof val === "object") {
      const fields = Object.entries(val as Record<string, unknown>)
        .map(([k, v]) => `${"  ".repeat(depth + 1)}${k}: ${inferType(v, depth + 1)};`)
        .join("\n");
      return `{\n${fields}\n${"  ".repeat(depth)}}`;
    }
    return typeof val;
  }

  const body = inferType(obj);
  return `interface ${name} ${body}`;
}

function jsonToCsv(obj: unknown): string | null {
  const arr = Array.isArray(obj) ? obj : [obj];
  if (!arr.length || typeof arr[0] !== "object" || arr[0] === null) return null;
  const keys = Object.keys(arr[0] as object);
  const rows = arr.map((row) =>
    keys.map((k) => {
      const v = (row as Record<string, unknown>)[k];
      const s = v === null || v === undefined ? "" : String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  );
  return [keys.join(","), ...rows].join("\n");
}

function extractErrorLine(err: unknown): string {
  return err instanceof SyntaxError ? err.message : String(err);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024, sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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
      return { keys: countKeys(parsed), depth: getDepth(parsed), bytes: new Blob([output]).size };
    } catch { return null; }
  }, [output]);

  function run(transform: (parsed: unknown) => unknown, label: string) {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const result = transform(parsed);
      if (result === null) {
        setStatus({ type: "error", message: `${label} failed — input must be an array of objects` });
        return;
      }
      const formatted = typeof result === "string" ? result : JSON.stringify(result, null, getIndent(indent));
      setOutput(formatted);
      setStatus({ type: "success", message: `${label} successful` });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", message: extractErrorLine(err) });
    }
  }

  const handleFormat   = () => run((p) => p, "Format");
  const handleMinify   = () => { try { const p = JSON.parse(input); setOutput(JSON.stringify(p)); setStatus({ type: "success", message: "Minified" }); } catch (e) { setStatus({ type: "error", message: extractErrorLine(e) }); } };
  const handleValidate = () => { try { JSON.parse(input); setStatus({ type: "success", message: "✓ Valid JSON" }); } catch (e) { setStatus({ type: "error", message: extractErrorLine(e) }); } };
  const handleSortKeys = () => run(sortKeysDeep, "Sort keys");
  const handleRemoveNulls = () => run(removeNulls, "Remove nulls");
  const handleToTS = () => run((p) => toTypeScriptInterface(p), "JSON → TypeScript");
  const handleToCsv = () => {
    try {
      const parsed = JSON.parse(input);
      const csv = jsonToCsv(parsed);
      if (!csv) { setStatus({ type: "error", message: "Input must be an array of objects to convert to CSV" }); return; }
      setOutput(csv);
      setStatus({ type: "success", message: "Converted to CSV" });
    } catch (e) { setStatus({ type: "error", message: extractErrorLine(e) }); }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => { setInput(""); setOutput(""); setStatus(null); };

  const actions = [
    { label: "Format",       fn: handleFormat,      primary: true },
    { label: "Minify",       fn: handleMinify,      primary: false },
    { label: "Validate",     fn: handleValidate,    primary: false },
    { label: "Sort Keys",    fn: handleSortKeys,    primary: false },
    { label: "Remove Nulls", fn: handleRemoveNulls, primary: false },
    { label: "→ TypeScript", fn: handleToTS,        primary: false },
    { label: "→ CSV",        fn: handleToCsv,       primary: false },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">JSON Input</label>
          <button onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Clear</button>
        </div>
        <textarea
          className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          placeholder='{"name": "John", "age": 30}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Indent:</span>
            {(["2", "4", "tab"] as IndentType[]).map((opt) => (
              <button key={opt} onClick={() => setIndent(opt)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border ${indent === opt ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                {opt === "tab" ? "Tab" : `${opt} spaces`}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 ml-auto">
            {actions.map((a) => (
              <button key={a.label} onClick={a.fn}
                className={a.primary ? "btn-primary" : "btn-secondary"}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {status.type === "success"
            ? <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            : <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          }
          {status.message}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Output</label>
            <button onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all">
              {copied ? "Copied!" : "Copy"}
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
          {[
            { label: "Keys", value: stats.keys },
            { label: "Depth", value: stats.depth },
            { label: "Size", value: formatBytes(stats.bytes) },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
              <p className="mt-1 text-lg font-bold text-gray-700">{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
