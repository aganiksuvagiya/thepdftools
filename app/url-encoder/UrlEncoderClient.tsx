"use client";

import { useState } from "react";

type Mode = "encode" | "decode";

export default function UrlEncoderClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError("Invalid input — could not decode. Check for malformed percent sequences.");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode((m) => (m === "encode" ? "decode" : "encode"));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(""); setOutput(""); setError(""); };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex rounded-xl border border-slate-200 p-1 bg-slate-50 w-fit gap-1">
        {(["encode", "decode"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(""); setError(""); }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors capitalize ${mode === m ? "bg-brand-700 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {mode === "encode" ? "Original Text / URL" : "Encoded URL"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder={mode === "encode" ? "https://example.com/search?q=hello world&lang=en" : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
            className="w-full rounded-xl border border-slate-200 p-4 font-mono text-sm text-slate-900 outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 resize-y"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {mode === "encode" ? "Encoded Output" : "Decoded Output"}
          </label>
          <textarea
            value={output}
            readOnly
            rows={8}
            placeholder="Output will appear here..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900 outline-none resize-y"
          />
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button onClick={convert} className="rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        <button onClick={copy} disabled={!output} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 disabled:opacity-40">
          {copied ? "Copied!" : "Copy Output"}
        </button>
        <button onClick={swap} disabled={!output} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 disabled:opacity-40">
          ⇄ Swap & Reverse
        </button>
        <button onClick={clear} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700">
          Clear
        </button>
      </div>

      {/* Character reference */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Common Encodings</p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-xs font-mono">
          {[["space", "%20"], ["/", "%2F"], ["?", "%3F"], ["=", "%3D"], ["&", "%26"], ["#", "%23"], ["+", "%2B"], ["@", "%40"], [":", "%3A"]].map(([c, e]) => (
            <span key={c}><span className="text-slate-500">{c}</span> → <span className="text-brand-700">{e}</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}
