"use client";

import { useState, useMemo } from "react";

type GenerateType = "paragraphs" | "sentences" | "words";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "viverra", "maecenas",
  "accumsan", "lacus", "vel", "facilisis", "volutpat", "blandit", "cursus",
  "risus", "ultricies", "tristique", "leo", "integer", "malesuada", "fames",
  "turpis", "egestas", "pretium", "nibh", "pulvinar", "mattis", "nunc",
];

const CLASSIC_FIRST = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(wordCount?: number): string {
  const count = wordCount ?? randomInt(8, 15);
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(randomWord());
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = randomInt(4, 8);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

export default function LoremIpsumClient() {
  const [type, setType] = useState<GenerateType>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const outputStats = useMemo(() => {
    if (!output) return null;
    const words = output.split(/\s+/).filter(Boolean).length;
    const chars = output.length;
    return { words, chars };
  }, [output]);

  const handleGenerate = () => {
    let result = "";

    if (type === "words") {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(randomWord());
      }
      if (startWithLorem && count >= 2) {
        words[0] = "lorem";
        words[1] = "ipsum";
      } else if (startWithLorem && count === 1) {
        words[0] = "lorem";
      }
      result = words.join(" ");
    } else if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          sentences.push(CLASSIC_FIRST);
        } else {
          sentences.push(generateSentence());
        }
      }
      result = sentences.join(" ");
    } else {
      // paragraphs
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          const rest = generateParagraph();
          paragraphs.push(CLASSIC_FIRST + " " + rest);
        } else {
          paragraphs.push(generateParagraph());
        }
      }
      result = paragraphs.join("\n\n");
    }

    setOutput(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeOptions: { value: GenerateType; label: string }[] = [
    { value: "paragraphs", label: "Paragraphs" },
    { value: "sentences", label: "Sentences" },
    { value: "words", label: "Words" },
  ];

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Options</h2>

        {/* Type radio buttons */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
            Type
          </label>
          <div className="flex gap-2">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  type === opt.value
                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                    : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
            Count
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => {
              const val = Math.max(1, Math.min(100, Number(e.target.value) || 1));
              setCount(val);
            }}
            className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
        </div>

        {/* Start with Lorem checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
            />
            <span className="text-sm text-gray-600">Start with &quot;Lorem ipsum dolor sit amet...&quot;</span>
          </label>
        </div>

        {/* Generate button */}
        <button onClick={handleGenerate} className="btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Generate
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Generated Text</label>
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
          <textarea
            readOnly
            value={output}
            className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 resize-y focus:outline-none"
          />
        </div>
      )}

      {/* Stats */}
      {outputStats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Words</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{outputStats.words}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Characters</p>
            <p className="mt-1 text-lg font-bold text-gray-700">{outputStats.chars}</p>
          </div>
        </div>
      )}
    </div>
  );
}
