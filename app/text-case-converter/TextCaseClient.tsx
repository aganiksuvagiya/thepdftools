"use client";

import { useState } from "react";

const cases = [
  {
    id: "upper",
    label: "UPPERCASE",
    example: "HELLO WORLD",
    fn: (s: string) => s.toUpperCase(),
  },
  {
    id: "lower",
    label: "lowercase",
    example: "hello world",
    fn: (s: string) => s.toLowerCase(),
  },
  {
    id: "title",
    label: "Title Case",
    example: "Hello World",
    fn: (s: string) =>
      s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    id: "sentence",
    label: "Sentence case",
    example: "Hello world, this is a sentence.",
    fn: (s: string) =>
      s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  },
  {
    id: "camel",
    label: "camelCase",
    example: "helloWorldExample",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    id: "pascal",
    label: "PascalCase",
    example: "HelloWorldExample",
    fn: (s: string) => {
      const camel = s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    },
  },
  {
    id: "snake",
    label: "snake_case",
    example: "hello_world_example",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "")
        .replace(/_+/g, "_"),
  },
  {
    id: "kebab",
    label: "kebab-case",
    example: "hello-world-example",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .replace(/-+/g, "-"),
  },
  {
    id: "constant",
    label: "CONSTANT_CASE",
    example: "HELLO_WORLD_EXAMPLE",
    fn: (s: string) =>
      s
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/[^A-Z0-9_]/g, "")
        .replace(/_+/g, "_"),
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg",
    example: "hElLo WoRlD",
    fn: (s: string) =>
      s.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join(""),
  },
];

export default function TextCaseClient() {
  const [input, setInput] = useState("Hello World Example Text");
  const [copied, setCopied] = useState("");

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-slate-700">Input Text</label>
          <span className="text-xs text-slate-400">{wordCount} words · {charCount} chars</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Type or paste your text here..."
          className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 resize-y"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {cases.map((c) => {
          const converted = input ? c.fn(input) : c.example;
          const isFromInput = !!input;
          return (
            <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{c.label}</span>
                <button
                  onClick={() => copy(converted, c.id)}
                  disabled={!isFromInput}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 disabled:text-slate-300"
                >
                  {copied === c.id ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <p className={`font-mono text-sm break-all ${isFromInput ? "text-slate-900" : "text-slate-300"}`}>
                {converted}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
