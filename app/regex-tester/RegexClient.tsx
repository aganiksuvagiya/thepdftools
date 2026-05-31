"use client";

import { useState, useMemo } from "react";

const EXAMPLES = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s]+", flags: "g" },
  { label: "Phone (US)", pattern: "\\(?\\d{3}\\)?[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{4}", flags: "g" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "Digits only", pattern: "\\d+", flags: "g" },
  { label: "HTML tag", pattern: "<[^>]+>", flags: "g" },
];

export default function RegexClient() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Hello world, test@email.com and 123-456-7890");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: testStr, count: 0 };
    setError("");
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches: { match: string; index: number; groups: string[] }[] = [];
      let m: RegExpExecArray | null;
      const tempRe = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = tempRe.exec(testStr)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
      }

      // Build highlighted HTML (escaped)
      let highlighted = "";
      let last = 0;
      const colors = ["bg-yellow-200", "bg-blue-200", "bg-green-200", "bg-pink-200", "bg-purple-200"];
      matches.forEach((match, i) => {
        highlighted += escapeHtml(testStr.slice(last, match.index));
        highlighted += `<mark class="rounded px-0.5 ${colors[i % colors.length]} text-slate-900 not-italic">${escapeHtml(match.match)}</mark>`;
        last = match.index + match.match.length;
      });
      highlighted += escapeHtml(testStr.slice(last));
      return { matches, highlighted, count: matches.length };
    } catch (e) {
      setError((e as Error).message);
      return { matches: [], highlighted: escapeHtml(testStr), count: 0 };
    }
  }, [pattern, flags, testStr]);

  function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const toggleFlag = (f: string) =>
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));

  return (
    <div className="space-y-5">
      {/* Examples */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Quick Examples</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => { setPattern(ex.pattern); setFlags(ex.flags); }}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:border-brand-300 hover:text-brand-700"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Input */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Regular Expression</label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100">
          <span className="text-slate-400 font-mono">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="flex-1 font-mono text-sm text-slate-900 outline-none"
          />
          <span className="text-slate-400 font-mono">/</span>
          <div className="flex gap-1 ml-1">
            {["g", "i", "m", "s"].map((f) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                className={`rounded px-2 py-0.5 text-xs font-bold transition-colors ${flags.includes(f) ? "bg-brand-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>

      {/* Test String */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Test String</label>
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-200 p-4 font-mono text-sm text-slate-900 outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 resize-y"
        />
      </div>

      {/* Match Highlight */}
      {pattern && !error && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Match Preview</label>
            <span className={`text-sm font-semibold ${result.count > 0 ? "text-emerald-600" : "text-slate-400"}`}>
              {result.count} match{result.count !== 1 ? "es" : ""}
            </span>
          </div>
          <div
            className="min-h-[80px] rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 break-all whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: result.highlighted }}
          />
        </div>
      )}

      {/* Match details */}
      {result.matches.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">Match Details</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-white border border-slate-100 px-3 py-2 text-sm">
                <span className="shrink-0 text-xs font-bold text-brand-600">#{i + 1}</span>
                <code className="flex-1 font-mono text-slate-800 break-all">{m.match}</code>
                <span className="shrink-0 text-xs text-slate-400">index {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
