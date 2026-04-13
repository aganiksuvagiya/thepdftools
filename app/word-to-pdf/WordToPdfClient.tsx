"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

interface ConversionResult {
  url: string;
  pdfSize: number;
  name: string;
  pageCount: number;
}

const WNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function getAttr(el: Element, ns: string, local: string): string {
  return el.getAttributeNS(ns, local) || el.getAttribute(`w:${local}`) || "";
}

interface RunProps {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number; // half-points
  color: string; // hex or ""
}

interface Run {
  text: string;
  props: RunProps;
}

interface Para {
  runs: Run[];
  style: string; // Heading1, Heading2, Normal, ListParagraph, etc.
  numId: string;
  ilvl: number;
  align: string; // left, center, right, both
  spaceBefore: number; // twips
  spaceAfter: number;
  indentLeft: number; // twips
}

interface TableCell {
  paragraphs: Para[];
}
interface TableRow {
  cells: TableCell[];
}
interface DocTable {
  rows: TableRow[];
}

type Block = { type: "para"; para: Para } | { type: "table"; table: DocTable };

function parseRunProps(rPr: Element | null): RunProps {
  const props: RunProps = { bold: false, italic: false, underline: false, fontSize: 24, color: "" };
  if (!rPr) return props;
  if (rPr.getElementsByTagNameNS(WNS, "b").length > 0) props.bold = true;
  if (rPr.getElementsByTagNameNS(WNS, "i").length > 0) props.italic = true;
  if (rPr.getElementsByTagNameNS(WNS, "u").length > 0) props.underline = true;
  const sz = rPr.getElementsByTagNameNS(WNS, "sz")[0];
  if (sz) props.fontSize = parseInt(getAttr(sz, WNS, "val") || "24", 10);
  const color = rPr.getElementsByTagNameNS(WNS, "color")[0];
  if (color) {
    const val = getAttr(color, WNS, "val");
    if (val && val !== "auto") props.color = val;
  }
  return props;
}

function parsePara(pEl: Element): Para {
  const pPr = pEl.getElementsByTagNameNS(WNS, "pPr")[0] || null;
  let style = "Normal";
  let numId = "";
  let ilvl = 0;
  let align = "left";
  let spaceBefore = 0;
  let spaceAfter = 0;
  let indentLeft = 0;

  if (pPr) {
    const pStyle = pPr.getElementsByTagNameNS(WNS, "pStyle")[0];
    if (pStyle) style = getAttr(pStyle, WNS, "val") || "Normal";

    const numPr = pPr.getElementsByTagNameNS(WNS, "numPr")[0];
    if (numPr) {
      const numIdEl = numPr.getElementsByTagNameNS(WNS, "numId")[0];
      const ilvlEl = numPr.getElementsByTagNameNS(WNS, "ilvl")[0];
      if (numIdEl) numId = getAttr(numIdEl, WNS, "val");
      if (ilvlEl) ilvl = parseInt(getAttr(ilvlEl, WNS, "val") || "0", 10);
    }

    const jc = pPr.getElementsByTagNameNS(WNS, "jc")[0];
    if (jc) align = getAttr(jc, WNS, "val") || "left";

    const spacing = pPr.getElementsByTagNameNS(WNS, "spacing")[0];
    if (spacing) {
      spaceBefore = parseInt(getAttr(spacing, WNS, "before") || "0", 10);
      spaceAfter = parseInt(getAttr(spacing, WNS, "after") || "0", 10);
    }

    const ind = pPr.getElementsByTagNameNS(WNS, "ind")[0];
    if (ind) indentLeft = parseInt(getAttr(ind, WNS, "left") || "0", 10);
  }

  const runs: Run[] = [];
  const rEls = pEl.getElementsByTagNameNS(WNS, "r");
  for (let i = 0; i < rEls.length; i++) {
    const rEl = rEls[i];
    const rPr = rEl.getElementsByTagNameNS(WNS, "rPr")[0] || null;
    const tEls = rEl.getElementsByTagNameNS(WNS, "t");
    let text = "";
    for (let j = 0; j < tEls.length; j++) text += tEls[j].textContent || "";
    if (text) runs.push({ text, props: parseRunProps(rPr) });
  }

  return { runs, style, numId, ilvl, align, spaceBefore, spaceAfter, indentLeft };
}

function parseTable(tEl: Element): DocTable {
  const rows: TableRow[] = [];
  const trEls = tEl.getElementsByTagNameNS(WNS, "tr");
  for (let r = 0; r < trEls.length; r++) {
    const cells: TableCell[] = [];
    const tcEls = trEls[r].getElementsByTagNameNS(WNS, "tc");
    for (let c = 0; c < tcEls.length; c++) {
      const pEls = tcEls[c].getElementsByTagNameNS(WNS, "p");
      const paragraphs: Para[] = [];
      for (let p = 0; p < pEls.length; p++) paragraphs.push(parsePara(pEls[p]));
      cells.push({ paragraphs });
    }
    if (cells.length) rows.push({ cells });
  }
  return { rows };
}

function parseDocument(xml: string): Block[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const body = doc.getElementsByTagNameNS(WNS, "body")[0];
  if (!body) return [];

  const blocks: Block[] = [];
  for (let i = 0; i < body.children.length; i++) {
    const child = body.children[i];
    const localName = child.localName;
    if (localName === "p") {
      blocks.push({ type: "para", para: parsePara(child) });
    } else if (localName === "tbl") {
      blocks.push({ type: "table", table: parseTable(child) });
    }
  }
  return blocks;
}

// twips to points (1 point = 20 twips)
function twipsToPt(twips: number): number {
  return twips / 20;
}

export default function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setResult(null);
    setError(null);
    setProgress("");
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setProgress("Reading Word document...");

    try {
      setProgress("Loading dependencies...");
      if (!(window as any).JSZip) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load JSZip library"));
          document.head.appendChild(script);
        });
      }

      setProgress("Parsing Word document...");
      const arrayBuffer = await file.arrayBuffer();
      const JSZip = (window as any).JSZip;
      const zip = await JSZip.loadAsync(arrayBuffer);

      const docXmlFile = zip.file("word/document.xml");
      if (!docXmlFile) throw new Error("Not a valid DOCX file.");
      const xml: string = await docXmlFile.async("string");

      setProgress("Extracting content & formatting...");
      const blocks = parseDocument(xml);

      if (blocks.length === 0) throw new Error("No content found in this document.");

      setProgress("Generating PDF...");
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();

      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
      const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

      const PAGE_W = 612;
      const PAGE_H = 792;
      const MARGIN_X = 60;
      const MARGIN_Y = 60;
      const CONTENT_W = PAGE_W - 2 * MARGIN_X;

      let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      let y = PAGE_H - MARGIN_Y;
      let pageCount = 1;

      const ensureSpace = (needed: number) => {
        if (y - needed < MARGIN_Y) {
          page = pdfDoc.addPage([PAGE_W, PAGE_H]);
          y = PAGE_H - MARGIN_Y;
          pageCount++;
        }
      };

      const hexToRgb = (hex: string) => {
        const n = parseInt(hex.replace("#", ""), 16);
        return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
      };

      const getFont = (bold: boolean, italic: boolean) => {
        if (bold && italic) return fontBoldItalic;
        if (bold) return fontBold;
        if (italic) return fontItalic;
        return fontRegular;
      };

      // Heading styles
      const headingConfig: Record<string, { size: number; bold: boolean; spaceBefore: number; spaceAfter: number }> = {
        Heading1: { size: 20, bold: true, spaceBefore: 14, spaceAfter: 6 },
        Heading2: { size: 16, bold: true, spaceBefore: 12, spaceAfter: 4 },
        Heading3: { size: 13, bold: true, spaceBefore: 10, spaceAfter: 3 },
        Heading4: { size: 12, bold: true, spaceBefore: 8, spaceAfter: 2 },
        Title: { size: 24, bold: true, spaceBefore: 0, spaceAfter: 10 },
        Subtitle: { size: 14, bold: false, spaceBefore: 0, spaceAfter: 8 },
      };

      const drawWrappedRuns = (
        runs: Run[],
        x: number,
        contentW: number,
        defaultSize: number,
        defaultBold: boolean,
        colorOverride?: ReturnType<typeof rgb>
      ): number => {
        // Word-wrap across runs
        interface Word { text: string; props: RunProps }
        const words: Word[] = [];
        for (const run of runs) {
          const parts = run.text.split(/( )/);
          for (const part of parts) {
            if (part) words.push({ text: part, props: run.props });
          }
        }

        let lineWords: Word[] = [];
        let lineWidth = 0;
        let linesDrawn = 0;

        const flushLine = (isLast: boolean) => {
          if (lineWords.length === 0) return;
          ensureSpace(defaultSize * 1.6);
          let cx = x;
          for (const w of lineWords) {
            const sz = w.props.fontSize > 0 ? w.props.fontSize / 2 : defaultSize;
            const bold = defaultBold || w.props.bold;
            const font = getFont(bold, w.props.italic);
            const color = colorOverride || (w.props.color ? hexToRgb(w.props.color) : rgb(0.1, 0.1, 0.1));
            page.drawText(w.text, { x: cx, y, size: sz, font, color });
            cx += font.widthOfTextAtSize(w.text, sz);
          }
          if (!isLast) y -= defaultSize * 1.6;
          linesDrawn++;
          lineWords = [];
          lineWidth = 0;
        };

        for (const word of words) {
          const sz = word.props.fontSize > 0 ? word.props.fontSize / 2 : defaultSize;
          const font = getFont(defaultBold || word.props.bold, word.props.italic);
          const ww = font.widthOfTextAtSize(word.text, sz);

          if (lineWidth + ww > contentW && lineWords.length > 0) {
            flushLine(false);
          }
          lineWords.push(word);
          lineWidth += ww;
        }
        flushLine(true);
        return linesDrawn;
      };

      const drawPara = (para: Para) => {
        const isHeading = headingConfig[para.style];
        const isList = para.numId !== "";

        const baseSize = isHeading
          ? headingConfig[para.style].size
          : para.runs.length > 0 && para.runs[0].props.fontSize > 0
          ? para.runs[0].props.fontSize / 2
          : 11;

        const boldDefault = isHeading ? headingConfig[para.style].bold : false;

        // Space before
        let spBefore = isHeading
          ? headingConfig[para.style].spaceBefore
          : para.spaceBefore > 0
          ? Math.min(twipsToPt(para.spaceBefore), 20)
          : 4;
        if (isList) spBefore = 2;

        const spAfter = isHeading
          ? headingConfig[para.style].spaceAfter
          : para.spaceAfter > 0
          ? Math.min(twipsToPt(para.spaceAfter), 16)
          : 4;

        ensureSpace(baseSize + spBefore + spAfter);
        y -= spBefore;

        const indent = isList ? MARGIN_X + 14 + para.ilvl * 14 : MARGIN_X + Math.min(twipsToPt(para.indentLeft), 60);
        const contentW = PAGE_W - indent - MARGIN_X;

        // List bullet
        if (isList) {
          const bullet = "•";
          page.drawText(bullet, { x: indent - 12, y, size: baseSize, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });
        }

        // Heading color
        let headingColor: ReturnType<typeof rgb> | undefined;
        if (para.style === "Heading1") headingColor = rgb(0.1, 0.2, 0.5);
        else if (para.style === "Heading2") headingColor = rgb(0.15, 0.3, 0.55);
        else if (para.style === "Heading3") headingColor = rgb(0.2, 0.35, 0.6);

        if (para.runs.length === 0) {
          y -= baseSize * 0.6;
        } else {
          drawWrappedRuns(para.runs, indent, contentW, baseSize, boldDefault, headingColor);
          y -= baseSize * 1.6;
        }

        // Heading underline
        if (para.style === "Heading1") {
          ensureSpace(4);
          page.drawLine({
            start: { x: MARGIN_X, y: y + 2 },
            end: { x: PAGE_W - MARGIN_X, y: y + 2 },
            thickness: 0.5,
            color: rgb(0.7, 0.75, 0.85),
          });
          y -= 4;
        }

        y -= spAfter;
      };

      const drawTable = (table: DocTable) => {
        if (table.rows.length === 0) return;
        const colCount = Math.max(...table.rows.map((r) => r.cells.length));
        const colW = CONTENT_W / colCount;
        const cellPad = 4;
        const fontSize = 10;
        const lineH = fontSize * 1.5;

        for (let ri = 0; ri < table.rows.length; ri++) {
          const row = table.rows[ri];
          const isHeader = ri === 0;

          // Estimate row height
          let rowH = lineH + cellPad * 2;
          ensureSpace(rowH + 4);

          const rowY = y;

          // Draw cells
          for (let ci = 0; ci < row.cells.length; ci++) {
            const cellX = MARGIN_X + ci * colW;
            // Cell background for header
            if (isHeader) {
              page.drawRectangle({
                x: cellX,
                y: rowY - rowH,
                width: colW,
                height: rowH,
                color: rgb(0.2, 0.35, 0.6),
              });
            } else if (ri % 2 === 0) {
              page.drawRectangle({
                x: cellX,
                y: rowY - rowH,
                width: colW,
                height: rowH,
                color: rgb(0.96, 0.97, 0.99),
              });
            }
            // Cell border
            page.drawRectangle({
              x: cellX,
              y: rowY - rowH,
              width: colW,
              height: rowH,
              borderColor: rgb(0.8, 0.82, 0.88),
              borderWidth: 0.5,
            });

            // Cell text
            const cell = row.cells[ci];
            const textColor = isHeader ? rgb(1, 1, 1) : rgb(0.15, 0.15, 0.15);
            let textY = rowY - cellPad - fontSize;
            for (const para of cell.paragraphs) {
              const text = para.runs.map((r) => r.text).join("");
              if (!text.trim()) continue;
              const font = isHeader ? fontBold : fontRegular;
              // Simple truncate for table cells
              let displayText = text;
              while (displayText.length > 0 && font.widthOfTextAtSize(displayText, fontSize) > colW - cellPad * 2) {
                displayText = displayText.slice(0, -1);
              }
              page.drawText(displayText, { x: cellX + cellPad, y: textY, size: fontSize, font, color: textColor });
              textY -= lineH;
            }
          }

          y = rowY - rowH;
        }
        y -= 8;
      };

      // Render all blocks
      for (const block of blocks) {
        if (block.type === "para") {
          drawPara(block.para);
        } else {
          drawTable(block.table);
        }
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      setResult({ url, pdfSize: blob.size, name: `${baseName}.pdf`, pageCount });
      setProgress("");
    } catch (err: any) {
      setError(err.message || "Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  const handleReset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError(null);
    setProgress("");
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        }}
        label="Drop your Word file here"
        sublabel="DOC or DOCX · Click to browse"
      />

      {file && (
        <>
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Remove
              </button>
            </div>
          </div>

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-blue-700">{progress}</span>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-1 text-center">
              <p className="text-sm font-semibold text-green-800">Conversion Complete</p>
              <p className="text-xs text-green-600">
                {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} · {formatBytes(result.pdfSize)}
              </p>
            </div>
          )}

          {!result && (
            <button onClick={handleConvert} disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </button>
          )}

          {result && (
            <div className="space-y-3">
              <button onClick={handleDownload} className="btn-primary w-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {result.name}
              </button>
              <button onClick={handleReset} className="btn-secondary w-full">
                Convert Another File
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
