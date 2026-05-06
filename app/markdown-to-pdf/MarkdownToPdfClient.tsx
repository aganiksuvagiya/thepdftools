"use client";

import { useCallback, useMemo, useState } from "react";
import DropZone from "@/components/DropZone";
import { marked } from "marked";

type PageSize = "a4" | "letter";
type FontSize = "small" | "medium" | "large";

const FONT_SIZE_VALUES: Record<FontSize, number> = {
  small: 12,
  medium: 14,
  large: 16,
};

const EXPORT_MARGIN_MM = 15;

const DEFAULT_MARKDOWN = `# Welcome to Markdown to PDF

Start typing your **Markdown** content here or upload a \`.md\` file.

## Features

- Live preview as you type
- Supports headings, lists, links, code blocks
- Export to PDF instantly

> Everything runs in your browser. No data is uploaded.

\`\`\`js
console.log("Hello, PDF!");
\`\`\`
`;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc
    .querySelectorAll(
      "script, style, iframe, object, embed, form, input, button, textarea, select, meta, link"
    )
    .forEach((node) => node.remove());

  doc.querySelectorAll("*").forEach((element) => {
    for (const attr of Array.from(element.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      if (name.startsWith("on")) {
        element.removeAttribute(attr.name);
        continue;
      }

      if (
        (name === "href" || name === "src" || name === "xlink:href") &&
        (value.startsWith("javascript:") || value.startsWith("data:text/html"))
      ) {
        element.removeAttribute(attr.name);
      }
    }
  });

  return doc.body.innerHTML;
}

type PdfBlock =
  | { kind: "h1" | "h2" | "h3" | "body" | "quote" | "code" | "list"; text: string }
  | { kind: "rule" };

function htmlToPlainText(html: string): string {
  if (typeof window === "undefined") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function inlineMarkdownToText(text: string): string {
  return htmlToPlainText(marked.parseInline(text) as string);
}

function markdownToPdfBlocks(markdownSource: string): PdfBlock[] {
  const tokens = marked.lexer(markdownSource) as any[];
  const blocks: PdfBlock[] = [];

  for (const token of tokens) {
    if (token.type === "space") continue;

    if (token.type === "heading") {
      const text = inlineMarkdownToText(token.text || "");
      if (!text) continue;
      if (token.depth === 1) blocks.push({ kind: "h1", text });
      else if (token.depth === 2) blocks.push({ kind: "h2", text });
      else blocks.push({ kind: "h3", text });
      continue;
    }

    if (token.type === "paragraph" || token.type === "text") {
      const text = inlineMarkdownToText(token.text || "");
      if (text) blocks.push({ kind: "body", text });
      continue;
    }

    if (token.type === "blockquote") {
      const text = inlineMarkdownToText(token.text || "");
      if (text) blocks.push({ kind: "quote", text });
      continue;
    }

    if (token.type === "code") {
      const text = (token.text || "").trim();
      if (text) blocks.push({ kind: "code", text });
      continue;
    }

    if (token.type === "list") {
      token.items.forEach((item: any, index: number) => {
        const marker = token.ordered ? `${index + 1}.` : "\u2022";
        const text = inlineMarkdownToText(item.text || "");
        if (text) blocks.push({ kind: "list", text: `${marker} ${text}` });
      });
      continue;
    }

    if (token.type === "hr") {
      blocks.push({ kind: "rule" });
      continue;
    }

    if (token.type === "table") {
      const header = (token.header || [])
        .map((cell: any) => inlineMarkdownToText(cell.text || ""))
        .join(" | ");
      if (header) blocks.push({ kind: "h3", text: header });

      (token.rows || []).forEach((row: any[]) => {
        const text = row
          .map((cell: any) => inlineMarkdownToText(cell.text || cell || ""))
          .join(" | ");
        if (text) blocks.push({ kind: "body", text });
      });
    }
  }

  return blocks;
}

export default function MarkdownToPdfClient() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [inputMode, setInputMode] = useState<"type" | "upload">("type");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderedHtml = useMemo(() => {
    if (!markdown.trim()) return "";
    return sanitizeHtml(marked.parse(markdown) as string);
  }, [markdown]);

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFileSize(file.size);
      setError(null);
      file
        .text()
        .then((text) => {
          setMarkdown(text);
        })
        .catch(() => {
          setError("Failed to read the Markdown file. Please try again.");
        });
    }
  }, []);

  const handleGenerate = async () => {
    if (!markdown.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const { jsPDF } = await import("jspdf");
      const blocks = markdownToPdfBlocks(markdown);

      if (blocks.length === 0) {
        throw new Error("No printable text found in the Markdown.");
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: pageSize,
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - EXPORT_MARGIN_MM * 2;
      const bottomLimit = pageHeight - EXPORT_MARGIN_MM;
      const baseFontSize = FONT_SIZE_VALUES[fontSize];
      let y = EXPORT_MARGIN_MM;

      const ensureSpace = (heightNeeded: number) => {
        if (y + heightNeeded > bottomLimit) {
          doc.addPage();
          y = EXPORT_MARGIN_MM;
        }
      };

      for (const block of blocks) {
        if (block.kind === "rule") {
          ensureSpace(8);
          doc.setDrawColor(203, 213, 225);
          doc.line(EXPORT_MARGIN_MM, y, pageWidth - EXPORT_MARGIN_MM, y);
          y += 8;
          continue;
        }

        const fontSizePt =
          block.kind === "h1"
            ? baseFontSize + 8
            : block.kind === "h2"
              ? baseFontSize + 4
              : block.kind === "h3"
                ? baseFontSize + 2
                : baseFontSize;
        const lineHeight = fontSizePt * 0.42 * (block.kind === "code" ? 1.45 : 1.55);
        const gapAfter =
          block.kind === "h1"
            ? lineHeight * 0.9
            : block.kind === "h2"
              ? lineHeight * 0.7
              : block.kind === "h3"
                ? lineHeight * 0.55
                : lineHeight * 0.45;
        const x =
          block.kind === "quote"
            ? EXPORT_MARGIN_MM + 4
            : block.kind === "list"
              ? EXPORT_MARGIN_MM + 2
              : EXPORT_MARGIN_MM;

        doc.setFont(block.kind === "code" ? "courier" : "helvetica", block.kind.startsWith("h") ? "bold" : "normal");
        doc.setFontSize(fontSizePt);
        if (block.kind === "quote") doc.setTextColor(71, 85, 105);
        else if (block.kind === "code") doc.setTextColor(30, 41, 59);
        else doc.setTextColor(15, 23, 42);

        if (block.kind === "quote") {
          ensureSpace(lineHeight);
          doc.setDrawColor(148, 163, 184);
          doc.line(EXPORT_MARGIN_MM, y - 1, EXPORT_MARGIN_MM, y + lineHeight * 2);
        }

        const lines = doc.splitTextToSize(block.text, contentWidth - (x - EXPORT_MARGIN_MM)) as string[];
        ensureSpace(lines.length * lineHeight + gapAfter);

        for (const line of lines) {
          ensureSpace(lineHeight);
          doc.text(line, x, y);
          y += lineHeight;
        }

        y += gapAfter;
      }

      doc.save(
        fileName
          ? fileName.replace(/\.[^/.]+$/, "") + ".pdf"
          : "markdown-document.pdf"
      );
    } catch (err: any) {
      setError(err.message || "Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMarkdown("");
    setFileName(null);
    setFileSize(0);
    setError(null);
    setInputMode("type");
  };

  return (
    <div className="card space-y-6">
      {/* Input Mode Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setInputMode("type");
            setError(null);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            inputMode === "type"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Type / Paste
        </button>
        <button
          onClick={() => {
            setInputMode("upload");
            setError(null);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            inputMode === "upload"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Upload .md File
        </button>
      </div>

      {/* Type / Paste Mode */}
      {inputMode === "type" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Markdown Editor
            </label>
            <textarea
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
                setError(null);
              }}
              placeholder="Type or paste your Markdown here..."
              className="w-full min-h-[360px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800 placeholder-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-y"
              spellCheck={false}
            />
            <div className="text-xs text-gray-500">
              {markdown.length.toLocaleString()} character
              {markdown.length !== 1 && "s"}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Live Preview
            </label>
            <div
              className="min-h-[360px] max-h-[500px] overflow-auto rounded-xl border border-slate-200 bg-white p-4 prose prose-sm prose-slate"
              dangerouslySetInnerHTML={{
                __html: renderedHtml || '<p class="text-slate-400 italic">Preview will appear here...</p>',
              }}
            />
          </div>
        </div>
      )}

      {/* Upload Mode */}
      {inputMode === "upload" && (
        <>
          <DropZone
            onFilesAccepted={handleFiles}
            accept={{
              "text/markdown": [".md", ".markdown"],
            }}
            label="Drop your Markdown file here"
            sublabel="MD or Markdown files"
          />
          {fileName && (
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                    <svg
                      className="h-5 w-5 text-brand-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(fileSize)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Show preview for uploaded file */}
          {markdown.trim() && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preview
              </label>
              <div
                className="max-h-[400px] overflow-auto rounded-xl border border-slate-200 bg-white p-4 prose prose-sm prose-slate"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          )}
        </>
      )}

      {/* Options */}
      {markdown.trim() && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Page Size
            </label>
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
            <label className="text-sm font-medium text-gray-700">
              Font Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as FontSize)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              <option value="small">Small (12px)</option>
              <option value="medium">Medium (14px)</option>
              <option value="large">Large (16px)</option>
            </select>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading || !markdown.trim()}
          className="btn-primary flex-1"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating PDF...
            </>
          ) : (
            "Generate PDF"
          )}
        </button>
        {markdown.trim() && (
          <button onClick={handleReset} className="btn-secondary">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
