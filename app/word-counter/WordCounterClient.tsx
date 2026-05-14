"use client";

import { useState, useMemo } from "react";

function formatTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.ceil(minutes % 60);
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

function computeStats(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { words: 0, charsWithSpaces: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: "0 min", speakingTime: "0 min" };
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  return {
    words,
    charsWithSpaces: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    sentences: (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0),
    paragraphs: trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0),
    readingTime: formatTime(words / 200),
    speakingTime: formatTime(words / 130),
  };
}

function computeTopWords(text: string, n: number) {
  if (!text.trim()) return [];
  const freq: Record<string, number> = {};
  for (const w of text.trim().toLowerCase().split(/\s+/)) {
    const c = w.replace(/[^a-zA-Z0-9'-]/g, "");
    if (c.length >= 2) freq[c] = (freq[c] || 0) + 1;
  }
  return Object.entries(freq).map(([word, count]) => ({ word, count })).sort((a, b) => b.count - a.count).slice(0, n);
}

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [charLimit, setCharLimit] = useState<number | null>(null);
  const [charLimitInput, setCharLimitInput] = useState("");
  const [findWord, setFindWord] = useState("");

  const stats = useMemo(() => computeStats(text), [text]);
  const topWords = useMemo(() => computeTopWords(text, 5), [text]);

  const findCount = useMemo(() => {
    if (!findWord.trim() || !text) return 0;
    return (text.toLowerCase().match(new RegExp(findWord.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  }, [text, findWord]);

  const limitExceeded = charLimit !== null && text.length > charLimit;

  const copyToClipboard = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const caseConvert = (fn: (t: string) => string) => setText(fn(text));
  const toUpper     = () => caseConvert((t) => t.toUpperCase());
  const toLower     = () => caseConvert((t) => t.toLowerCase());
  const toTitle     = () => caseConvert((t) => t.replace(/\b\w/g, (c) => c.toUpperCase()));
  const toSentence  = () => caseConvert((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
  const removeWhitespace = () => setText(text.replace(/\s+/g, " ").trim());

  const statItems = [
    { label: "Words",         value: stats.words.toLocaleString(),            color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { label: "Characters",    value: stats.charsWithSpaces.toLocaleString(),  color: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "No Spaces",     value: stats.charsNoSpaces.toLocaleString(),    color: "bg-purple-50 text-purple-700 border-purple-100" },
    { label: "Sentences",     value: stats.sentences.toLocaleString(),        color: "bg-amber-50 text-amber-700 border-amber-100" },
    { label: "Paragraphs",    value: stats.paragraphs.toLocaleString(),       color: "bg-rose-50 text-rose-700 border-rose-100" },
    { label: "Reading Time",  value: stats.readingTime,                       color: "bg-teal-50 text-teal-700 border-teal-100" },
    { label: "Speaking Time", value: stats.speakingTime,                      color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className={`rounded-xl border p-3 text-center ${item.color}`}>
            <p className="text-[22px] font-bold leading-tight">{item.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide opacity-70">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Your Text</h2>
          <div className="flex items-center gap-2">
            <button onClick={copyToClipboard} disabled={!text}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition-colors">
              {copied ? "Copied ✓" : "Copy"}
            </button>
            <button onClick={() => setText("")} disabled={!text}
              className="btn-secondary text-xs px-4 py-2 disabled:opacity-40">Clear</button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className={`w-full h-64 rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:outline-none resize-none transition-colors leading-relaxed ${limitExceeded ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-300 focus:ring-emerald-100"}`}
        />
        {charLimit !== null && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className={limitExceeded ? "text-red-500 font-semibold" : "text-gray-500"}>
                {text.length.toLocaleString()} / {charLimit.toLocaleString()} characters
              </span>
              {limitExceeded && <span className="text-red-500 font-semibold">{(text.length - charLimit).toLocaleString()} over limit</span>}
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${limitExceeded ? "bg-red-400" : text.length / charLimit > 0.8 ? "bg-amber-400" : "bg-emerald-400"}`}
                style={{ width: `${Math.min(100, (text.length / charLimit) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tools row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Case converter */}
        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Case Converter</h3>
          <div className="flex flex-wrap gap-2">
            {[["UPPERCASE", toUpper], ["lowercase", toLower], ["Title Case", toTitle], ["Sentence case", toSentence]].map(([label, fn]) => (
              <button key={label as string} onClick={fn as () => void} disabled={!text}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
                {label as string}
              </button>
            ))}
            <button onClick={removeWhitespace} disabled={!text}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-brand-300 hover:text-brand-700 disabled:opacity-40 transition-colors">
              Remove Extra Spaces
            </button>
          </div>
        </div>

        {/* Find & count + Char limit */}
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Find & Count</h3>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={findWord}
              onChange={(e) => setFindWord(e.target.value)}
              placeholder="Type a word to count..."
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
            {findWord && (
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${findCount > 0 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                {findCount}x
              </span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Character Limit</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={charLimitInput}
                onChange={(e) => { setCharLimitInput(e.target.value); setCharLimit(e.target.value ? Number(e.target.value) : null); }}
                placeholder="e.g. 280 for Twitter…"
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              />
              {charLimit !== null && (
                <button onClick={() => { setCharLimit(null); setCharLimitInput(""); }}
                  className="text-xs text-gray-400 hover:text-red-400">Clear</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top words */}
      {topWords.length > 0 && (
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Top 5 Most Used Words</h2>
          <div className="flex flex-wrap gap-2">
            {topWords.map((item, i) => (
              <div key={item.word} className="inline-flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-sm">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">{i + 1}</span>
                <span className="font-medium text-gray-800">{item.word}</span>
                <span className="text-xs text-gray-400">{item.count}x</span>
                <span className="text-xs text-gray-300">{stats.words > 0 ? Math.round((item.count / stats.words) * 100) : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
