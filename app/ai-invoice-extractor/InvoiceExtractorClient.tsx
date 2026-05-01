"use client";

import { useCallback, useState } from "react";
import DropZone from "@/components/DropZone";

type ExtractedInvoice = {
  invoiceNumber: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  vendorName: string | null;
  customerName: string | null;
  subtotal: string | null;
  tax: string | null;
  total: string | null;
  currency: string | null;
  amountsFound: string[];
  datesFound: string[];
  rawText: string;
  pageCount: number;
  extractionMethod: string;
};

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

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
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

function extractFirstMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    const value = match?.[1]?.trim();
    if (value) return value;
  }
  return null;
}

function extractDates(text: string) {
  const patterns = [
    /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g,
    /\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b/g,
    /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/gi,
  ];

  const values = new Set<string>();
  for (const pattern of patterns) {
    for (const match of text.match(pattern) ?? []) {
      values.add(match.trim());
    }
  }
  return Array.from(values);
}

function extractAmounts(text: string) {
  const values = new Set<string>();
  for (const match of text.match(/(?:₹|\$|€|£)\s?\d[\d,]*(?:\.\d{2})?/g) ?? []) {
    values.add(match.trim());
  }
  for (const match of text.match(/\b\d[\d,]*\.\d{2}\b/g) ?? []) {
    values.add(match.trim());
  }
  return Array.from(values);
}

function detectCurrency(text: string) {
  if (text.includes("₹")) return "INR";
  if (text.includes("$")) return "USD";
  if (text.includes("€")) return "EUR";
  if (text.includes("£")) return "GBP";
  if (/\bINR\b/i.test(text)) return "INR";
  if (/\bUSD\b/i.test(text)) return "USD";
  if (/\bEUR\b/i.test(text)) return "EUR";
  if (/\bGBP\b/i.test(text)) return "GBP";
  return null;
}

function cleanEntityValue(value: string | null) {
  if (!value) return null;
  return value
    .replace(/\s{2,}/g, " ")
    .replace(/[|]+/g, " ")
    .trim();
}

function extractLikelyNameAfterLabel(text: string, labels: string[]) {
  const escaped = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(?:${escaped.join("|")})\\s*[:\\-]?\\s*([^\\n]{2,80})`, "i");
  return cleanEntityValue(text.match(pattern)?.[1] ?? null);
}

function extractVendorName(text: string) {
  const labeled = extractLikelyNameAfterLabel(text, ["from", "seller", "vendor", "company", "business"]);
  if (labeled) return labeled;

  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const top = lines.slice(0, 8);
  const strong = top.find((line) =>
    !/invoice|bill to|date|due|tax|total|phone|email|address/i.test(line) &&
    /^[A-Za-z0-9&.,'()\- ]{3,80}$/.test(line)
  );
  return strong ?? null;
}

function extractCustomerName(text: string) {
  return (
    extractLikelyNameAfterLabel(text, ["bill to", "billed to", "invoice to", "customer", "client", "to"]) ??
    null
  );
}

function chooseAmountByLabel(text: string, labels: string[]) {
  const escaped = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(
    `(?:${escaped.join("|")})\\s*[:\\-]?\\s*((?:₹|\\$|€|£)?\\s?\\d[\\d,]*(?:\\.\\d{2})?)`,
    "i"
  );
  return cleanEntityValue(text.match(pattern)?.[1] ?? null);
}

function parseInvoice(rawText: string, pageCount: number, extractionMethod: string): ExtractedInvoice {
  const invoiceNumber = extractFirstMatch(rawText, [
    /invoice(?:\s*(?:#|no\.?|number))?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i,
    /bill(?:\s*(?:#|no\.?|number))?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i,
  ]);

  const invoiceDate =
    extractFirstMatch(rawText, [
      /invoice date\s*[:\-]?\s*([^\n]+)/i,
      /issue date\s*[:\-]?\s*([^\n]+)/i,
      /date\s*[:\-]?\s*([^\n]+)/i,
    ]) ?? null;

  const dueDate =
    extractFirstMatch(rawText, [
      /due date\s*[:\-]?\s*([^\n]+)/i,
      /payment due\s*[:\-]?\s*([^\n]+)/i,
    ]) ?? null;

  const subtotal = chooseAmountByLabel(rawText, ["subtotal", "sub total", "amount before tax"]);
  const tax = chooseAmountByLabel(rawText, ["tax", "gst", "vat", "cgst", "sgst", "igst"]);
  const total =
    chooseAmountByLabel(rawText, ["grand total", "total due", "balance due", "amount due", "total"]) ??
    null;

  return {
    invoiceNumber,
    invoiceDate: cleanEntityValue(invoiceDate),
    dueDate: cleanEntityValue(dueDate),
    vendorName: extractVendorName(rawText),
    customerName: extractCustomerName(rawText),
    subtotal,
    tax,
    total,
    currency: detectCurrency(rawText),
    amountsFound: extractAmounts(rawText).slice(0, 20),
    datesFound: extractDates(rawText).slice(0, 20),
    rawText,
    pageCount,
    extractionMethod,
  };
}

export default function InvoiceExtractorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractedInvoice | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const nextFile = files[0];
    if (!nextFile) return;
    setFile(nextFile);
    setLoading(false);
    setProgress("");
    setError(null);
    setResult(null);
  }, []);

  const handleExtract = useCallback(async () => {
    if (!file) return;

    setLoading(true);
    setProgress("Loading invoice parser...");
    setError(null);
    setResult(null);

    try {
      const [pdfjsLib, tesseract] = await Promise.all([loadPdfJs(), loadTesseract()]);
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const totalPages = pdf.numPages;
      const allPages: string[] = [];
      let usedOcr = false;
      let ocrWorker: any = null;
      let ocrPages = 0;

      for (let i = 1; i <= totalPages; i += 1) {
        setProgress(`Reading invoice page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let pageText = buildPageText(textContent.items as any[]);

        if (countWords(pageText) < 18) {
          if (!ocrWorker) {
            setProgress("Starting OCR for scanned invoice...");
            ocrWorker = await tesseract.createWorker("eng", 1, {
              logger: (message: { status: string; progress: number }) => {
                if (message.status === "recognizing text") {
                  setProgress(`OCR in progress... ${Math.round(message.progress * 100)}%`);
                }
              },
            });
          }

          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Could not create canvas for OCR.");
          }

          await page.render({ canvasContext: context, viewport, canvas }).promise;
          const imageData = canvas.toDataURL("image/png");
          const ocrResult = await ocrWorker.recognize(imageData);
          const ocrText = ocrResult?.data?.text?.trim() ?? "";

          if (countWords(ocrText) > countWords(pageText)) {
            pageText = ocrText;
            usedOcr = true;
          }

          ocrPages += 1;
        }

        allPages.push(`--- Page ${i} ---\n${pageText}`);
      }

      if (ocrWorker) {
        await ocrWorker.terminate();
      }

      const fullText = allPages.join("\n\n").trim();
      const extractionMethod = usedOcr
        ? ocrPages >= totalPages
          ? "OCR"
          : "Direct text + OCR fallback"
        : "Direct text extraction";

      setResult(parseInvoice(fullText, totalPages, extractionMethod));
      setProgress("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not extract invoice data from this PDF."
      );
      setProgress("");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setLoading(false);
    setProgress("");
    setError(null);
    setResult(null);
    setCopied(false);
  }, []);

  const handleCopyJson = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handleDownloadJson = useCallback(() => {
    if (!result || !file) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "") + "_invoice.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [file, result]);

  return (
    <div className="card space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "application/pdf": [".pdf"] }}
          multiple={false}
          label="Drop your invoice PDF here"
          sublabel="Extract invoice number, dates, parties, totals, tax, and more"
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">
              Change file
            </button>
          </div>

          {!result && !loading && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-6 text-amber-800">
                Works with text invoices and scanned invoices. OCR starts automatically when the PDF does not contain enough selectable text.
              </p>
              <button onClick={handleExtract} className="btn-primary mt-4 w-full">
                Extract Invoice Data
              </button>
            </div>
          )}

          {loading && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
              <p className="mt-3 text-sm font-medium text-blue-700">{progress}</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Pages</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{result.pageCount}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Currency</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{result.currency ?? "Not detected"}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Dates found</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{result.datesFound.length}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Method</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{result.extractionMethod}</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Invoice Fields</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    {[
                      ["Invoice number", result.invoiceNumber],
                      ["Invoice date", result.invoiceDate],
                      ["Due date", result.dueDate],
                      ["Vendor", result.vendorName],
                      ["Customer", result.customerName],
                      ["Subtotal", result.subtotal],
                      ["Tax", result.tax],
                      ["Total", result.total],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                        <dt className="font-medium text-slate-600">{label}</dt>
                        <dd className="text-right text-slate-900">{value || "Not detected"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Quick Lists</h3>
                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-slate-700">Dates found</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {result.datesFound.length ? (
                          result.datesFound.map((item) => (
                            <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500">No dates detected</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Amounts found</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {result.amountsFound.length ? (
                          result.amountsFound.map((item) => (
                            <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500">No amounts detected</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={handleCopyJson} className="btn-secondary">
                  {copied ? "Copied JSON" : "Copy JSON"}
                </button>
                <button onClick={handleDownloadJson} className="btn-primary">
                  Download JSON
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Extracted text</p>
                <textarea
                  readOnly
                  value={result.rawText}
                  rows={16}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-700 outline-none"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
