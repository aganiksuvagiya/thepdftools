"use client";

import { useCallback, useState } from "react";
import DropZone from "@/components/DropZone";

type ComparedPage = {
  pageNumber: number;
  changed: boolean;
  leftOnly: string[];
  rightOnly: string[];
  leftPreview: string;
  rightPreview: string;
};

type ExtractedPdf = {
  pages: string[];
  wordCount: number;
};

async function loadPdfJs() {
  const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return pdfjsLib;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function buildPageText(items: any[]) {
  let lastY: number | null = null;
  let pageText = "";

  for (const item of items) {
    if (!("str" in item)) continue;
    const textItem = item as { str: string; transform: number[] };
    const y = textItem.transform?.[5] ?? null;

    if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
      pageText += "\n";
    }

    if (textItem.str === " ") {
      pageText += " ";
    } else if (textItem.str.trim()) {
      const needsSpace =
        pageText &&
        !pageText.endsWith(" ") &&
        !pageText.endsWith("\n") &&
        !/^[,.;:!?)]/.test(textItem.str);

      pageText += `${needsSpace ? " " : ""}${textItem.str}`;
    }

    lastY = y;
  }

  return pageText.replace(/\n{3,}/g, "\n\n").trim();
}

function normalizeLine(line: string) {
  return line.replace(/\s+/g, " ").trim();
}

function splitComparableLines(pageText: string) {
  return pageText
    .split(/\n+/)
    .map(normalizeLine)
    .filter(Boolean);
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function previewText(text: string, limit = 240) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

async function extractPdf(file: File): Promise<ExtractedPdf> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    pages.push(buildPageText(textContent.items as any[]));
  }

  return {
    pages,
    wordCount: wordCount(pages.join("\n\n")),
  };
}

function comparePages(leftPages: string[], rightPages: string[]) {
  const totalPages = Math.max(leftPages.length, rightPages.length);
  const results: ComparedPage[] = [];

  for (let i = 0; i < totalPages; i += 1) {
    const left = leftPages[i] ?? "";
    const right = rightPages[i] ?? "";
    const leftLines = splitComparableLines(left);
    const rightLines = splitComparableLines(right);
    const leftSet = new Set(leftLines);
    const rightSet = new Set(rightLines);
    const leftOnly = leftLines.filter((line) => !rightSet.has(line));
    const rightOnly = rightLines.filter((line) => !leftSet.has(line));

    results.push({
      pageNumber: i + 1,
      changed: leftOnly.length > 0 || rightOnly.length > 0,
      leftOnly: leftOnly.slice(0, 12),
      rightOnly: rightOnly.slice(0, 12),
      leftPreview: previewText(left),
      rightPreview: previewText(right),
    });
  }

  return results;
}

export default function PdfCompareClient() {
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ComparedPage[]>([]);
  const [leftStats, setLeftStats] = useState<{ pages: number; words: number } | null>(null);
  const [rightStats, setRightStats] = useState<{ pages: number; words: number } | null>(null);
  const [showChangedOnly, setShowChangedOnly] = useState(true);

  const changedCount = results.filter((item) => item.changed).length;
  const visibleResults = showChangedOnly ? results.filter((item) => item.changed) : results;

  const handleCompare = useCallback(async () => {
    if (!leftFile || !rightFile) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setProgress("Reading first PDF...");

    try {
      const left = await extractPdf(leftFile);
      setLeftStats({ pages: left.pages.length, words: left.wordCount });

      setProgress("Reading second PDF...");
      const right = await extractPdf(rightFile);
      setRightStats({ pages: right.pages.length, words: right.wordCount });

      setProgress("Comparing pages...");
      const compared = comparePages(left.pages, right.pages);
      setResults(compared);
      setProgress("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not compare these PDFs. Try unlocked text-based files."
      );
      setProgress("");
    } finally {
      setLoading(false);
    }
  }, [leftFile, rightFile]);

  const reset = useCallback(() => {
    setLeftFile(null);
    setRightFile(null);
    setLoading(false);
    setProgress("");
    setError(null);
    setResults([]);
    setLeftStats(null);
    setRightStats(null);
    setShowChangedOnly(true);
  }, []);

  return (
    <div className="card space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Original PDF</p>
          {!leftFile ? (
            <DropZone
              onFilesAccepted={(files) => setLeftFile(files[0] ?? null)}
              accept={{ "application/pdf": [".pdf"] }}
              label="Drop first PDF here"
              sublabel="Original or older version"
            />
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="truncate text-sm font-medium text-gray-800">{leftFile.name}</p>
              <p className="mt-1 text-xs text-gray-400">{formatBytes(leftFile.size)}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Revised PDF</p>
          {!rightFile ? (
            <DropZone
              onFilesAccepted={(files) => setRightFile(files[0] ?? null)}
              accept={{ "application/pdf": [".pdf"] }}
              label="Drop second PDF here"
              sublabel="Newer or edited version"
            />
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="truncate text-sm font-medium text-gray-800">{rightFile.name}</p>
              <p className="mt-1 text-xs text-gray-400">{formatBytes(rightFile.size)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={handleCompare} disabled={!leftFile || !rightFile || loading} className="btn-primary">
          {loading ? "Comparing..." : "Compare PDFs"}
        </button>
        <button onClick={reset} className="btn-secondary">
          Reset
        </button>
      </div>

      {loading && progress && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          {progress}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {(leftStats || rightStats) && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Changed pages</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{changedCount}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Original</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">
              {leftStats?.pages ?? 0} pages · {leftStats?.words.toLocaleString() ?? 0} words
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Revised</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">
              {rightStats?.pages ?? 0} pages · {rightStats?.words.toLocaleString() ?? 0} words
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">Page Differences</h3>
            <button
              onClick={() => setShowChangedOnly((value) => !value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              {showChangedOnly ? "Show all pages" : "Show changed only"}
            </button>
          </div>

          {!visibleResults.length ? (
            <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
              No text differences were detected between these PDFs.
            </div>
          ) : null}

          <div className="space-y-4">
            {visibleResults.map((page) => (
              <div key={page.pageNumber} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Page {page.pageNumber}</h4>
                    <p className={`text-sm ${page.changed ? "text-amber-700" : "text-green-700"}`}>
                      {page.changed ? "Changes detected" : "No change detected"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-rose-50 px-3 py-1.5 font-semibold text-rose-700">
                      Removed: {page.leftOnly.length}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
                      Added: {page.rightOnly.length}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">Only in original</div>
                    {page.leftOnly.length ? (
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                        {page.leftOnly.map((line, index) => (
                          <li key={`${page.pageNumber}-left-${index}`}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">No unique lines on this side.</p>
                    )}
                    <p className="mt-4 text-xs text-slate-400">{page.leftPreview}</p>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Only in revised</div>
                    {page.rightOnly.length ? (
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                        {page.rightOnly.map((line, index) => (
                          <li key={`${page.pageNumber}-right-${index}`}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">No unique lines on this side.</p>
                    )}
                    <p className="mt-4 text-xs text-slate-400">{page.rightPreview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
