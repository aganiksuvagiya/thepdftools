"use client";

import { useState, useMemo } from "react";

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

function formatTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.ceil(minutes % 60);
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

interface Stats {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
}

interface WordFreq {
  word: string;
  count: number;
}

function computeStats(text: string): Stats {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      charsWithSpaces: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: "0 min",
      speakingTime: "0 min",
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0);
  const readingTime = formatTime(words / 200);
  const speakingTime = formatTime(words / 130);

  return { words, charsWithSpaces, charsNoSpaces, sentences, paragraphs, readingTime, speakingTime };
}

function computeTopWords(text: string, count: number): WordFreq[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const freq: Record<string, number> = {};
  const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);

  for (const w of words) {
    const cleaned = w.replace(/[^a-zA-Z0-9'-]/g, "");
    if (cleaned.length < 2) continue;
    freq[cleaned] = (freq[cleaned] || 0) + 1;
  }

  return Object.entries(freq)
    .map(([word, cnt]) => ({ word, count: cnt }))
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
}

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => computeStats(text), [text]);
  const topWords = useMemo(() => computeTopWords(text, 5), [text]);

  const handleClear = () => {
    setText("");
  };

  const copyToClipboard = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const statItems = [
    { label: "Words", value: stats.words.toLocaleString(), color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { label: "Characters", value: stats.charsWithSpaces.toLocaleString(), color: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "No Spaces", value: stats.charsNoSpaces.toLocaleString(), color: "bg-purple-50 text-purple-700 border-purple-100" },
    { label: "Sentences", value: stats.sentences.toLocaleString(), color: "bg-amber-50 text-amber-700 border-amber-100" },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString(), color: "bg-rose-50 text-rose-700 border-rose-100" },
    { label: "Reading Time", value: stats.readingTime, color: "bg-teal-50 text-teal-700 border-teal-100" },
    { label: "Speaking Time", value: stats.speakingTime, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-3 text-center transition-all duration-200 ${item.color}`}
          >
            <p className="text-[22px] font-bold leading-tight">{item.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide opacity-70">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Your Text</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40"
              title="Copy text"
            >
              {copied ? <CheckIcon /> : <ClipboardIcon />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="btn-secondary text-xs px-4 py-2 disabled:opacity-40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-64 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 focus:outline-none resize-none transition-colors leading-relaxed"
        />
      </div>

      {/* Top words */}
      {topWords.length > 0 && (
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Top 5 Most Used Words</h2>
          <div className="flex flex-wrap gap-2">
            {topWords.map((item, i) => (
              <div
                key={item.word}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-sm"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                  {i + 1}
                </span>
                <span className="font-medium text-gray-800">{item.word}</span>
                <span className="text-xs text-gray-400">{item.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
