"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import DropZone from "@/components/DropZone";

type PageSummary = {
  pageNumber: number;
  words: number;
  characters: number;
  preview: string;
};

type AnalysisResult = {
  fileName: string;
  fileSize: number;
  pageCount: number;
  words: number;
  characters: number;
  charactersNoSpaces: number;
  paragraphs: number;
  readingTime: string;
  pagesWithText: number;
  extractedText: string;
  pageSummaries: PageSummary[];
  extractionMode: "text" | "ocr";
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const power = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  return `${(bytes / 1024 ** power).toFixed(power === 0 ? 0 : 2)} ${units[power]}`;
}

function formatTime(minutes: number) {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = Math.ceil(minutes % 60);
  return remaining ? `${hours} hr ${remaining} min` : `${hours} hr`;
}

function normalizePageText(rawText: string) {
  return rawText
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function countWords(text: string) {
  const matches = text.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g);
  return matches ? matches.length : 0;
}

function countParagraphs(text: string) {
  const parts = text.split(/\n\s*\n/).filter((part) => part.trim().length > 0);
  return parts.length;
}

function topTerms(text: string, limit: number) {
  const stopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
    "has", "have", "he", "in", "is", "it", "its", "of", "on", "or", "that",
    "the", "their", "this", "to", "was", "were", "will", "with", "you", "your",
    "pdf", "page", "pages",
  ]);
  const frequencies: Record<string, number> = {};

  for (const token of text.toLowerCase().match(/[a-z0-9]+(?:['-][a-z0-9]+)*/g) || []) {
    if (token.length < 3 || stopWords.has(token)) continue;
    frequencies[token] = (frequencies[token] || 0) + 1;
  }

  return Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term, count]) => ({ term, count }));
}

async function loadPdfJs() {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return pdfjsLib;
}

async function loadTesseract() {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/tesseract.esm.min.js";
  const module = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  return module.default;
}

export default function WordCounterClient() {
  const [mode, setMode] = useState<"pdf" | "text">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [ocrAvailable, setOcrAvailable] = useState(false);
  const [text, setText] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [charLimit, setCharLimit] = useState<number | null>(null);
  const [charLimitInput, setCharLimitInput] = useState("");
  const [findWord, setFindWord] = useState("");

  const handleFilesAccepted = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0];
    if (!nextFile) return;
    setFile(nextFile);
    setResult(null);
    setError(null);
    setProgress("");
    setCopied(false);
    setOcrAvailable(false);
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setProgress("");
    setCopied(false);
    setOcrAvailable(false);
  }, []);

  const analyzePdf = useCallback(async (useOcr = false) => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgress(useOcr ? "Loading OCR tools..." : "Loading PDF reader...");
    setResult(null);

    try {
      const [pdfjsLib, tesseract] = await Promise.all([
        loadPdfJs(),
        useOcr ? loadTesseract() : Promise.resolve(null),
      ]);
      const arrayBuffer = await file.arrayBuffer();
      const ocrWorker =
        useOcr && tesseract ? await tesseract.createWorker("eng", 1) : null;

      setProgress("Opening PDF...");
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const pageSummaries: PageSummary[] = [];
      const extractedPages: string[] = [];
      let pagesWithText = 0;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        setProgress(
          useOcr
            ? `Running OCR on page ${pageNumber} of ${pdf.numPages}...`
            : `Reading page ${pageNumber} of ${pdf.numPages}...`
        );
        const page = await pdf.getPage(pageNumber);

        let normalized = "";

        if (useOcr && ocrWorker) {
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas could not be created for OCR.");
          }

          await page.render({ canvasContext: context, viewport, canvas }).promise;
          const { data } = await ocrWorker.recognize(canvas.toDataURL("image/png"));
          normalized = normalizePageText(data?.text || "");
        } else {
          const textContent = await page.getTextContent();

          let lastY: number | null = null;
          let pageText = "";

          for (const item of textContent.items) {
            if (!("str" in item)) continue;

            const textItem = item as { str: string; transform: number[] };
            const y = textItem.transform[5];

            if (lastY !== null && Math.abs(y - lastY) > 2.5) {
              pageText += "\n";
            } else if (
              pageText &&
              !pageText.endsWith("\n") &&
              textItem.str &&
              !textItem.str.startsWith(" ")
            ) {
              pageText += " ";
            }

            pageText += textItem.str;
            lastY = y;
          }

          normalized = normalizePageText(pageText);
        }

        const words = countWords(normalized);
        const characters = normalized.length;

        if (normalized) {
          extractedPages.push(normalized);
          pagesWithText += 1;
        }

        pageSummaries.push({
          pageNumber,
          words,
          characters,
          preview: normalized
            ? normalized.slice(0, 180) + (normalized.length > 180 ? "..." : "")
            : "No selectable text found on this page.",
        });
      }

      const extractedText = extractedPages.join("\n\n");
      const words = countWords(extractedText);

      if (ocrWorker) {
        await ocrWorker.terminate();
      }

      if (!extractedText || words === 0) {
        setOcrAvailable(true);
        setError(
          "No selectable text was found in this PDF. It looks like a scanned or image-only document."
        );
        setProgress("");
        return;
      }

      const characters = extractedText.length;
      const charactersNoSpaces = extractedText.replace(/\s/g, "").length;
      const paragraphs = countParagraphs(extractedText);

      setResult({
        fileName: file.name,
        fileSize: file.size,
        pageCount: pdf.numPages,
        words,
        characters,
        charactersNoSpaces,
        paragraphs,
        readingTime: formatTime(words / 225),
        pagesWithText,
        extractedText,
        pageSummaries,
        extractionMode: useOcr ? "ocr" : "text",
      });
      setOcrAvailable(false);
      setProgress("");
    } catch (err: any) {
      const message = err?.message || String(err);
      if (message.toLowerCase().includes("password")) {
        setError("This PDF is password protected. Unlock the file first, then try again.");
      } else {
        setError(`Could not analyze this PDF: ${message}`);
      }
      setProgress("");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleAnalyze = useCallback(() => {
    analyzePdf(false);
  }, [analyzePdf]);

  const handleOcrAnalyze = useCallback(() => {
    analyzePdf(true);
  }, [analyzePdf]);

  const topWords = useMemo(
    () => (result ? topTerms(result.extractedText, 8) : []),
    [result]
  );

  const textStats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: "0 min",
      };
    }

    const words = countWords(trimmed);
    return {
      words,
      charsWithSpaces: text.length,
      charsNoSpaces: text.replace(/\s/g, "").length,
      sentences: (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0),
      paragraphs: trimmed.split(/\n\s*\n/).filter((part) => part.trim().length > 0).length || 1,
      readingTime: formatTime(words / 225),
    };
  }, [text]);

  const textTopWords = useMemo(() => topTerms(text, 8), [text]);

  const findCount = useMemo(() => {
    if (!findWord.trim() || !text) return 0;
    return (
      text
        .toLowerCase()
        .match(
          new RegExp(
            findWord.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
          )
        ) || []
    ).length;
  }, [findWord, text]);

  const limitExceeded = charLimit !== null && text.length > charLimit;

  const copyExtractedText = useCallback(async () => {
    if (!result?.extractedText) return;
    await navigator.clipboard.writeText(result.extractedText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }, [result]);

  const copyTextModeText = useCallback(async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setTextCopied(true);
    window.setTimeout(() => setTextCopied(false), 1500);
  }, [text]);

  const statCards = result
    ? [
        { label: "PDF Pages", value: result.pageCount.toLocaleString(), tone: "bg-rose-50 text-rose-700 border-rose-100" },
        { label: "Word Count", value: result.words.toLocaleString(), tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
        { label: "Characters", value: result.characters.toLocaleString(), tone: "bg-blue-50 text-blue-700 border-blue-100" },
        { label: "No Spaces", value: result.charactersNoSpaces.toLocaleString(), tone: "bg-violet-50 text-violet-700 border-violet-100" },
        { label: "Paragraphs", value: result.paragraphs.toLocaleString(), tone: "bg-amber-50 text-amber-700 border-amber-100" },
        { label: "Reading Time", value: result.readingTime, tone: "bg-cyan-50 text-cyan-700 border-cyan-100" },
      ]
    : [];

  const textStatCards = [
    { label: "Words", value: textStats.words.toLocaleString(), tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { label: "Characters", value: textStats.charsWithSpaces.toLocaleString(), tone: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "No Spaces", value: textStats.charsNoSpaces.toLocaleString(), tone: "bg-violet-50 text-violet-700 border-violet-100" },
    { label: "Sentences", value: textStats.sentences.toLocaleString(), tone: "bg-amber-50 text-amber-700 border-amber-100" },
    { label: "Paragraphs", value: textStats.paragraphs.toLocaleString(), tone: "bg-rose-50 text-rose-700 border-rose-100" },
    { label: "Reading Time", value: textStats.readingTime, tone: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {[
          { id: "pdf", label: "Count PDF Words" },
          { id: "text", label: "Paste Text" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id as "pdf" | "text")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              mode === tab.id
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === "pdf" ? (
      !file ? (
        <div className="space-y-4">
          <DropZone
            onFilesAccepted={handleFilesAccepted}
            accept={{ "application/pdf": [".pdf"] }}
            multiple={false}
            label="Drop your PDF here"
            sublabel="PDF only • Works best with text-based PDFs"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Count words in reports, essays, contracts, and research PDFs.",
              "Get page count, total words, characters, and reading time in one scan.",
              "If the PDF is scanned, use OCR first for a reliable word count.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h6l4.5 4.5v12A1.5 1.5 0 0116.5 21h-9A1.5 1.5 0 016 19.5v-14A1.5 1.5 0 017.5 3.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3.75v4.5H18" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              Replace PDF
            </button>
          </div>

          {!result && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? "Analyzing PDF..." : "Count Words in PDF"}
            </button>
          )}

          {progress && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              {progress}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <p>{error}</p>
              {ocrAvailable && (
                  <div className="mt-3">
                    <button onClick={handleOcrAnalyze} disabled={loading} className="btn-primary">
                      {loading ? "Running OCR..." : "Run OCR Word Count"}
                    </button>
                  <p className="mt-2 text-xs text-amber-800">
                    First OCR run may download the language model in your browser, so scanned invoices can take a little longer.
                  </p>
                </div>
              )}
              <p className="mt-2">
                Try <Link href="/pdf-ocr" className="font-semibold underline underline-offset-2">PDF OCR</Link> or{" "}
                <Link href="/scanned-pdf-to-searchable-pdf" className="font-semibold underline underline-offset-2">
                  convert a scanned PDF into searchable text
                </Link>{" "}
                before counting words.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
                {statCards.map((card) => (
                  <div key={card.label} className={`rounded-2xl border p-4 text-center ${card.tone}`}>
                    <p className="text-2xl font-bold leading-tight">{card.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-75">
                      {card.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="card space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">Extracted Text Preview</h2>
                      <p className="text-sm text-slate-500">
                        {result.extractionMode === "ocr"
                          ? "This result was generated with OCR because the PDF did not contain selectable text."
                          : "Text-based PDFs return the most accurate word count."}
                      </p>
                    </div>
                    <button
                      onClick={copyExtractedText}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {copied ? "Copied" : "Copy Text"}
                    </button>
                  </div>
                  <div className="max-h-[420px] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {result.extractedText.slice(0, 5000)}
                    {result.extractedText.length > 5000 ? "\n\nPreview trimmed for readability." : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="card">
                    <h2 className="text-base font-semibold text-slate-900">What This Result Means</h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      <li>
                        {result.extractionMode === "ocr"
                          ? `${result.pagesWithText} of ${result.pageCount} pages produced OCR text.`
                          : `${result.pagesWithText} of ${result.pageCount} pages contained selectable text.`}
                      </li>
                      {result.extractionMode === "ocr" && (
                        <li>The count was generated from OCR text recognition on each page.</li>
                      )}
                      <li>Estimated reading time is based on roughly 225 words per minute.</li>
                      <li>Word totals can be lower on scanned PDFs until OCR is applied.</li>
                    </ul>
                  </div>

                  <div className="card">
                    <h2 className="text-base font-semibold text-slate-900">Top Terms in This PDF</h2>
                    {topWords.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {topWords.map((item) => (
                          <span
                            key={item.term}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                          >
                            {item.term} • {item.count}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">Not enough repeated words to build a term list.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-base font-semibold text-slate-900">Words by Page</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {result.pageSummaries.map((page) => (
                    <div key={page.pageNumber} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-slate-900">Page {page.pageNumber}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                          {page.words.toLocaleString()} words
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{page.characters.toLocaleString()} characters</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{page.preview}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
            {textStatCards.map((card) => (
              <div key={card.label} className={`rounded-2xl border p-4 text-center ${card.tone}`}>
                <p className="text-2xl font-bold leading-tight">{card.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-75">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Paste Text for Instant Count</h2>
                <p className="text-sm text-slate-500">Useful when you already copied text out of a PDF or doc.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyTextModeText}
                  disabled={!text}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:opacity-40"
                >
                  {textCopied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => setText("")}
                  disabled={!text}
                  className="btn-secondary px-4 py-2 text-xs disabled:opacity-40"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste your text here..."
              className={`h-72 w-full resize-none rounded-2xl border px-4 py-3 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                limitExceeded
                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 bg-slate-50 focus:border-brand-300 focus:ring-brand-100"
              }`}
            />

            {charLimit !== null && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={limitExceeded ? "font-semibold text-red-500" : "text-slate-500"}>
                    {text.length.toLocaleString()} / {charLimit.toLocaleString()} characters
                  </span>
                  {limitExceeded && (
                    <span className="font-semibold text-red-500">
                      {(text.length - charLimit).toLocaleString()} over limit
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all ${
                      limitExceeded ? "bg-red-400" : text.length / charLimit > 0.8 ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                    style={{ width: `${Math.min(100, (text.length / charLimit) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="card space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Find & Count</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={findWord}
                  onChange={(event) => setFindWord(event.target.value)}
                  placeholder="Type a word to count..."
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                />
                {findWord && (
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${findCount > 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                    {findCount}x
                  </span>
                )}
              </div>
            </div>

            <div className="card space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Character Limit</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={charLimitInput}
                  onChange={(event) => {
                    setCharLimitInput(event.target.value);
                    setCharLimit(event.target.value ? Number(event.target.value) : null);
                  }}
                  placeholder="e.g. 500 or 2000"
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                />
                {charLimit !== null && (
                  <button
                    onClick={() => {
                      setCharLimit(null);
                      setCharLimitInput("");
                    }}
                    className="text-xs text-slate-400 hover:text-red-400"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {textTopWords.length > 0 && (
            <div className="card">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Top Words in Your Text</h2>
              <div className="flex flex-wrap gap-2">
                {textTopWords.map((item) => (
                  <span
                    key={item.term}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {item.term} • {item.count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
