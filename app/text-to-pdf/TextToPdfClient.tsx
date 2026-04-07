"use client";

import { useState, useMemo } from "react";
import { jsPDF } from "jspdf";

type PageSize = "a4" | "letter";
type FontFamily = "helvetica" | "courier" | "times";
type MarginSize = "small" | "medium" | "large";

const FONT_SIZES = [10, 12, 14, 16, 18] as const;

const PAGE_DIMENSIONS: Record<PageSize, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

const MARGIN_VALUES: Record<MarginSize, number> = {
  small: 15,
  medium: 25,
  large: 40,
};

const LINE_HEIGHT_FACTOR = 1.35;

export default function TextToPdfClient() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState<number>(12);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [fontFamily, setFontFamily] = useState<FontFamily>("helvetica");
  const [margin, setMargin] = useState<MarginSize>("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charCount = text.length;

  const estimatedPages = useMemo(() => {
    if (!text.trim()) return 0;
    const m = MARGIN_VALUES[margin];
    const page = PAGE_DIMENSIONS[pageSize];
    const availW = page.w - m * 2;
    const availH = page.h - m * 2;
    const ptToMm = 25.4 / 72;
    const lineH = fontSize * ptToMm * LINE_HEIGHT_FACTOR;
    const linesPerPage = Math.floor(availH / lineH);

    // Rough estimate: avg char width ~0.5 * fontSize in pt -> mm
    const avgCharW = fontSize * ptToMm * 0.5;
    const charsPerLine = Math.floor(availW / avgCharW);
    const lines = text.split("\n").reduce((total, line) => {
      return total + Math.max(1, Math.ceil(line.length / charsPerLine));
    }, 0);

    return Math.max(1, Math.ceil(lines / linesPerPage));
  }, [text, fontSize, pageSize, margin]);

  const handleGenerate = () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const m = MARGIN_VALUES[margin];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: pageSize,
      });

      doc.setFont(fontFamily);
      doc.setFontSize(fontSize);

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const availW = pageW - m * 2;
      const availH = pageH - m * 2;

      const ptToMm = 25.4 / 72;
      const lineH = fontSize * ptToMm * LINE_HEIGHT_FACTOR;

      // Split text into wrapped lines
      const paragraphs = text.split("\n");
      const allLines: string[] = [];
      for (const para of paragraphs) {
        if (para === "") {
          allLines.push("");
        } else {
          const wrapped = doc.splitTextToSize(para, availW) as string[];
          allLines.push(...wrapped);
        }
      }

      const linesPerPage = Math.floor(availH / lineH);
      let lineIndex = 0;

      while (lineIndex < allLines.length) {
        if (lineIndex > 0) {
          doc.addPage();
        }

        const pageLines = allLines.slice(lineIndex, lineIndex + linesPerPage);
        let y = m + lineH;

        for (const line of pageLines) {
          doc.text(line, m, y);
          y += lineH;
        }

        lineIndex += linesPerPage;
      }

      doc.save("text-document.pdf");
    } catch {
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Textarea */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Your Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={12}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-y"
        />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{charCount.toLocaleString()} character{charCount !== 1 && "s"}</span>
          {text.trim() && (
            <span>~{estimatedPages} page{estimatedPages !== 1 && "s"}</span>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}pt
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Page Size</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Font</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value as FontFamily)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          >
            <option value="helvetica">Helvetica</option>
            <option value="courier">Courier</option>
            <option value="times">Times</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Margin</label>
          <select
            value={margin}
            onChange={(e) => setMargin(e.target.value as MarginSize)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="btn-primary flex-1"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            "Generate PDF"
          )}
        </button>
        {text.trim() && (
          <button
            onClick={() => setText("")}
            className="btn-secondary"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
