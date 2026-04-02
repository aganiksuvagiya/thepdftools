"use client";

import { useState, useCallback, useEffect } from "react";

function ClipboardIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function Base64Client() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [autoMode, setAutoMode] = useState(true);
  const [error, setError] = useState("");
  const [copiedLeft, setCopiedLeft] = useState(false);
  const [copiedRight, setCopiedRight] = useState(false);

  const encode = useCallback((input: string) => {
    try {
      setError("");
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setBase64(encoded);
    } catch {
      setError("Failed to encode text.");
    }
  }, []);

  const decode = useCallback((input: string) => {
    try {
      setError("");
      const decoded = decodeURIComponent(escape(atob(input)));
      setText(decoded);
    } catch {
      setError("Invalid Base64 string. Please check your input.");
    }
  }, []);

  useEffect(() => {
    if (autoMode && text) {
      encode(text);
    }
  }, [text, autoMode, encode]);

  const handleTextChange = (value: string) => {
    setText(value);
    if (!autoMode) return;
  };

  const handleBase64Change = (value: string) => {
    setBase64(value);
  };

  const handleClear = () => {
    setText("");
    setBase64("");
    setError("");
  };

  const copyToClipboard = async (value: string, side: "left" | "right") => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    if (side === "left") {
      setCopiedLeft(true);
      setTimeout(() => setCopiedLeft(false), 1500);
    } else {
      setCopiedRight(true);
      setTimeout(() => setCopiedRight(false), 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls row */}
      <div className="card flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoMode}
            onChange={(e) => setAutoMode(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          Auto-encode as you type
        </label>
        <button onClick={handleClear} className="btn-secondary text-xs px-4 py-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Clear All
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Textareas side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Text */}
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Text</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{text.length} chars</span>
              <button
                onClick={() => copyToClipboard(text, "left")}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                title="Copy text"
              >
                {copiedLeft ? <CheckIcon /> : <ClipboardIcon />}
                {copiedLeft ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter text to encode..."
            className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 font-mono placeholder:text-gray-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 focus:outline-none resize-none transition-colors"
          />
        </div>

        {/* Right: Base64 */}
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Base64</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{base64.length} chars</span>
              <button
                onClick={() => copyToClipboard(base64, "right")}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                title="Copy Base64"
              >
                {copiedRight ? <CheckIcon /> : <ClipboardIcon />}
                {copiedRight ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            value={base64}
            onChange={(e) => handleBase64Change(e.target.value)}
            placeholder="Base64 output will appear here..."
            className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 font-mono placeholder:text-gray-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 focus:outline-none resize-none transition-colors"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => encode(text)}
          disabled={!text}
          className="btn-primary w-full sm:w-auto bg-teal-600 shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-600/30 focus:ring-teal-400"
        >
          Encode
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button
          onClick={() => decode(base64)}
          disabled={!base64}
          className="btn-secondary w-full sm:w-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Decode
        </button>
      </div>
    </div>
  );
}
