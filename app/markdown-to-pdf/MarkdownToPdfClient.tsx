"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/DropZone";
import { marked } from "marked";

type PageSize = "a4" | "letter";
type FontSize = "small" | "medium" | "large";

const FONT_SIZE_VALUES: Record<FontSize, number> = {
  small: 12,
  medium: 14,
  large: 16,
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

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

export default function MarkdownToPdfClient() {
  const [markdown, setMarkdown] = useState("");
  const [inputMode, setInputMode] = useState<"type" | "upload">("type");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const renderedHtml = markdown.trim()
    ? (marked.parse(markdown) as string)
    : "";

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFileSize(file.size);
      setError(null);
      file.text().then((text) => {
        setMarkdown(text);
      });
    }
  }, []);

  const handleGenerate = async () => {
    if (!markdown.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const { jsPDF } = await import("jspdf");
      const fs = FONT_SIZE_VALUES[fontSize];
      const format = pageSize === "a4" ? "a4" : "letter";

      const container = document.createElement("div");
      container.style.cssText = `
        position: absolute; left: -9999px; top: -9999px;
        width: ${pageSize === "a4" ? "210mm" : "215.9mm"};
        padding: 20mm;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: ${fs}px;
        line-height: 1.6;
        color: #1a1a1a;
        background: #fff;
        box-sizing: border-box;
      `;
      container.innerHTML = `
        <style>
          h1 { font-size: 1.8em; font-weight: 700; margin: 0.6em 0 0.4em; color: #111; }
          h2 { font-size: 1.4em; font-weight: 600; margin: 0.6em 0 0.4em; color: #222; }
          h3 { font-size: 1.2em; font-weight: 600; margin: 0.5em 0 0.3em; color: #333; }
          p { margin: 0.5em 0; }
          ul, ol { margin: 0.5em 0; padding-left: 1.5em; }
          li { margin: 0.2em 0; }
          blockquote { margin: 0.8em 0; padding: 0.5em 1em; border-left: 4px solid #d1d5db; background: #f9fafb; color: #4b5563; }
          code { font-family: "SFMono-Regular", Menlo, monospace; font-size: 0.9em; background: #f3f4f6; padding: 0.15em 0.4em; border-radius: 4px; }
          pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 8px; overflow-x: auto; margin: 0.8em 0; }
          pre code { background: none; padding: 0; color: inherit; }
          a { color: #2563eb; text-decoration: underline; }
          table { border-collapse: collapse; width: 100%; margin: 0.8em 0; }
          th, td { border: 1px solid #d1d5db; padding: 0.5em 0.75em; text-align: left; }
          th { background: #f3f4f6; font-weight: 600; }
          hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5em 0; }
          img { max-width: 100%; height: auto; }
        </style>
        ${renderedHtml}
      `;
      document.body.appendChild(container);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format,
      });

      await doc.html(container, {
        callback: (d) => {
          d.save(
            fileName
              ? fileName.replace(/\.[^/.]+$/, "") + ".pdf"
              : "markdown-document.pdf"
          );
        },
        x: 0,
        y: 0,
        width: pageSize === "a4" ? 210 : 215.9,
        windowWidth: container.scrollWidth,
      });

      document.body.removeChild(container);
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
              ref={previewRef}
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
