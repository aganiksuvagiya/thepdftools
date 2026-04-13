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
  slideCount: number;
}

const ANS = "http://schemas.openxmlformats.org/drawingml/2006/main";
const PNS = "http://schemas.openxmlformats.org/presentationml/2006/main";

interface TextRun {
  text: string;
  bold: boolean;
  italic: boolean;
  fontSize: number; // pts (already halved from hundredths)
  color: string;
}

interface TextPara {
  runs: TextRun[];
  align: string;
  bulletChar: string;
  indent: number;
}

interface Shape {
  type: "title" | "body" | "other";
  paragraphs: TextPara[];
  x: number; y: number; w: number; h: number; // EMUs
}

interface Slide {
  slideNumber: number;
  bgColor: string;
  shapes: Shape[];
}

function parseColor(el: Element | null): string {
  if (!el) return "";
  const srgb = el.getElementsByTagNameNS(ANS, "srgbClr")[0];
  if (srgb) return srgb.getAttribute("val") || "";
  return "";
}

function parseTextRun(rEl: Element): TextRun {
  const run: TextRun = { text: "", bold: false, italic: false, fontSize: 18, color: "" };
  const tEl = rEl.getElementsByTagNameNS(ANS, "t")[0];
  run.text = tEl?.textContent || "";
  const rPr = rEl.getElementsByTagNameNS(ANS, "rPr")[0];
  if (rPr) {
    run.bold = rPr.getAttribute("b") === "1" || rPr.getAttribute("b") === "true";
    run.italic = rPr.getAttribute("i") === "1" || rPr.getAttribute("i") === "true";
    const sz = rPr.getAttribute("sz");
    if (sz) run.fontSize = parseInt(sz, 10) / 100;
    const solidFill = rPr.getElementsByTagNameNS(ANS, "solidFill")[0];
    if (solidFill) run.color = parseColor(solidFill);
  }
  return run;
}

function parseTextPara(pEl: Element): TextPara {
  const para: TextPara = { runs: [], align: "left", bulletChar: "", indent: 0 };
  const pPr = pEl.getElementsByTagNameNS(ANS, "pPr")[0];
  if (pPr) {
    para.align = pPr.getAttribute("algn") || "left";
    const lvl = parseInt(pPr.getAttribute("lvl") || "0", 10);
    para.indent = lvl;
    const buChar = pPr.getElementsByTagNameNS(ANS, "buChar")[0];
    if (buChar) para.bulletChar = buChar.getAttribute("char") || "•";
    const buFont = pPr.getElementsByTagNameNS(ANS, "buFont")[0];
    if (buFont && !para.bulletChar) para.bulletChar = "•";
    const buNone = pPr.getElementsByTagNameNS(ANS, "buNone")[0];
    if (buNone) para.bulletChar = "";
  }
  const rEls = pEl.getElementsByTagNameNS(ANS, "r");
  for (let i = 0; i < rEls.length; i++) {
    const r = parseTextRun(rEls[i]);
    if (r.text) para.runs.push(r);
  }
  return para;
}

function parseShape(spEl: Element): Shape | null {
  // Detect shape type via placeholder
  let shapeType: Shape["type"] = "other";
  const ph = spEl.getElementsByTagNameNS(PNS, "ph")[0];
  if (ph) {
    const phType = ph.getAttribute("type") || "";
    if (phType === "title" || phType === "ctrTitle") shapeType = "title";
    else if (phType === "body" || phType === "subTitle" || phType === "") shapeType = "body";
  }

  // Position/size from spPr > xfrm
  const xfrm = spEl.getElementsByTagNameNS(ANS, "xfrm")[0];
  let x = 0, y = 0, w = 6858000, h = 1143000;
  if (xfrm) {
    const off = xfrm.getElementsByTagNameNS(ANS, "off")[0];
    const ext = xfrm.getElementsByTagNameNS(ANS, "ext")[0];
    if (off) { x = parseInt(off.getAttribute("x") || "0", 10); y = parseInt(off.getAttribute("y") || "0", 10); }
    if (ext) { w = parseInt(ext.getAttribute("cx") || "6858000", 10); h = parseInt(ext.getAttribute("cy") || "1143000", 10); }
  }

  // Text body
  const txBody = spEl.getElementsByTagNameNS(PNS, "txBody")[0]
    || spEl.getElementsByTagNameNS(ANS, "txBody")[0];
  if (!txBody) return null;

  const pEls = txBody.getElementsByTagNameNS(ANS, "p");
  const paragraphs: TextPara[] = [];
  for (let i = 0; i < pEls.length; i++) {
    paragraphs.push(parseTextPara(pEls[i]));
  }

  if (paragraphs.every((p) => p.runs.length === 0)) return null;
  return { type: shapeType, paragraphs, x, y, w, h };
}

function parseSlide(xml: string, slideNumber: number): Slide {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  // Background color
  let bgColor = "";
  const bgPr = doc.getElementsByTagNameNS(PNS, "bg")[0];
  if (bgPr) {
    const solidFill = bgPr.getElementsByTagNameNS(ANS, "solidFill")[0];
    if (solidFill) bgColor = parseColor(solidFill);
  }

  // Shapes
  const shapes: Shape[] = [];
  const spEls = doc.getElementsByTagNameNS(PNS, "sp");
  for (let i = 0; i < spEls.length; i++) {
    const shape = parseShape(spEls[i]);
    if (shape) shapes.push(shape);
  }

  // Sort by Y position
  shapes.sort((a, b) => a.y - b.y);

  return { slideNumber, bgColor, shapes };
}


export default function PptToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slideCount, setSlideCount] = useState<number>(0);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setResult(null);
    setError(null);
    setProgress("");
    setSlideCount(0);
  }, []);

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgress("Reading file...");

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

      const JSZip = (window as any).JSZip;
      setProgress("Parsing PowerPoint file...");
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      const slideFiles = Object.keys(zip.files)
        .filter((f: string) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
        .sort((a: string, b: string) => {
          const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
          const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
          return numA - numB;
        });

      if (slideFiles.length === 0) throw new Error("No slides found. Please ensure this is a valid .pptx file.");
      setSlideCount(slideFiles.length);

      const slides: Slide[] = [];
      for (let i = 0; i < slideFiles.length; i++) {
        setProgress(`Processing slide ${i + 1} of ${slideFiles.length}...`);
        const xml: string = await zip.file(slideFiles[i]).async("string");
        slides.push(parseSlide(xml, i + 1));
      }

      setProgress("Generating PDF...");
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
      const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

      // Widescreen slide: 10" x 7.5" = 720 x 540 pt
      const PW = 720;
      const PH = 540;
      const MARGIN = 40;

      const hexToRgb = (hex: string) => {
        const n = parseInt(hex, 16);
        if (isNaN(n)) return null;
        return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
      };

      const getFont = (bold: boolean, italic: boolean) => {
        if (bold && italic) return fontBoldItalic;
        if (bold) return fontBold;
        if (italic) return fontItalic;
        return fontReg;
      };

      const SLIDE_THEMES = [
        { bg: rgb(0.12, 0.18, 0.38), titleColor: rgb(1, 1, 1), accent: rgb(0.3, 0.6, 1) },
        { bg: rgb(0.08, 0.28, 0.22), titleColor: rgb(1, 1, 1), accent: rgb(0.3, 0.85, 0.6) },
        { bg: rgb(0.25, 0.1, 0.35), titleColor: rgb(1, 1, 1), accent: rgb(0.8, 0.5, 1) },
        { bg: rgb(0.35, 0.12, 0.1), titleColor: rgb(1, 1, 1), accent: rgb(1, 0.65, 0.4) },
        { bg: rgb(0.1, 0.22, 0.35), titleColor: rgb(1, 1, 1), accent: rgb(0.4, 0.75, 1) },
      ];

      for (let si = 0; si < slides.length; si++) {
        const slide = slides[si];
        const page = pdfDoc.addPage([PW, PH]);
        const theme = SLIDE_THEMES[si % SLIDE_THEMES.length];

        // Background
        let bgFill = theme.bg;
        if (slide.bgColor) {
          const c = hexToRgb(slide.bgColor);
          if (c) bgFill = c;
        }
        page.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: bgFill });

        // Accent bar at top
        page.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: theme.accent });

        // Slide number badge
        const badge = `${slide.slideNumber}/${slides.length}`;
        page.drawRectangle({ x: PW - MARGIN - 30, y: PH - 28, width: 34, height: 18, color: rgb(0.15, 0.15, 0.15) });
        page.drawText(badge, { x: PW - MARGIN - 26, y: PH - 22, size: 8, font: fontReg, color: rgb(0.9, 0.9, 0.9) });

        // Separate title shapes from body shapes
        const titleShapes = slide.shapes.filter((s) => s.type === "title");
        const bodyShapes = slide.shapes.filter((s) => s.type !== "title");

        // Draw title area
        let titleY = PH - MARGIN - 10;
        for (const shape of titleShapes) {
          for (const para of shape.paragraphs) {
            const text = para.runs.map((r) => r.text).join("");
            if (!text.trim()) continue;
            const sz = Math.max(para.runs[0]?.fontSize || 28, 20);
            const font = getFont(true, false);
            // Word wrap title
            const words = text.split(/\s+/);
            let line = "";
            const lines: string[] = [];
            for (const word of words) {
              const test = line ? `${line} ${word}` : word;
              if (font.widthOfTextAtSize(test, sz) > PW - 2 * MARGIN && line) {
                lines.push(line);
                line = word;
              } else {
                line = test;
              }
            }
            if (line) lines.push(line);
            for (const l of lines) {
              page.drawText(l, { x: MARGIN, y: titleY, size: sz, font, color: theme.titleColor });
              titleY -= sz * 1.3;
            }
          }
        }

        // Divider below title
        const dividerY = titleY - 6;
        page.drawLine({ start: { x: MARGIN, y: dividerY }, end: { x: PW - MARGIN, y: dividerY }, thickness: 1, color: theme.accent });

        // Body content
        let bodyY = dividerY - 18;
        const bodyContentW = PW - 2 * MARGIN;

        for (const shape of bodyShapes) {
          for (const para of shape.paragraphs) {
            const text = para.runs.map((r) => r.text).join("").trim();
            if (!text) { bodyY -= 6; continue; }

            const firstRun = para.runs[0];
            const sz = Math.min(Math.max(firstRun?.fontSize || 16, 10), 22);
            const bold = firstRun?.bold || false;
            const italic = firstRun?.italic || false;
            const font = getFont(bold, italic);
            const textColor = firstRun?.color ? (hexToRgb(firstRun.color) || rgb(0.9, 0.9, 0.9)) : rgb(0.9, 0.9, 0.9);

            const indent = para.indent * 14;
            const bullet = para.bulletChar ? para.bulletChar + " " : "";
            const bulletW = bullet ? font.widthOfTextAtSize(bullet, sz) : 0;
            const lineW = bodyContentW - indent - bulletW;

            // Word wrap
            const words = text.split(/\s+/);
            let line = "";
            const lines: string[] = [];
            for (const word of words) {
              const test = line ? `${line} ${word}` : word;
              if (font.widthOfTextAtSize(test, sz) > lineW && line) {
                lines.push(line);
                line = word;
              } else {
                line = test;
              }
            }
            if (line) lines.push(line);

            for (let li = 0; li < lines.length; li++) {
              if (bodyY < MARGIN + 20) break;
              if (li === 0 && bullet) {
                page.drawText(bullet, { x: MARGIN + indent, y: bodyY, size: sz, font, color: theme.accent });
              }
              page.drawText(lines[li], { x: MARGIN + indent + bulletW, y: bodyY, size: sz, font, color: textColor });
              bodyY -= sz * 1.5;
            }
            bodyY -= 4;
          }
        }

        // No-content fallback
        if (slide.shapes.length === 0) {
          page.drawText("(No text content on this slide)", {
            x: MARGIN, y: PH / 2, size: 14, font: fontItalic, color: rgb(0.6, 0.6, 0.6),
          });
        }
      }

      setProgress("Finalizing PDF...");
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      setResult({ url, pdfSize: blob.size, name: `${baseName}.pdf`, slideCount: slides.length });
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
    setSlideCount(0);
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{
          "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
        }}
        label="Drop your PowerPoint file here"
        sublabel="PPTX only · Click to browse"
      />

      {file && (
        <>
          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}{slideCount > 0 && ` · ${slideCount} slides`}
                  </p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Remove</button>
            </div>
          </div>

          {loading && progress && (
            <div className="flex items-center gap-3 rounded-lg bg-orange-50 px-4 py-3">
              <svg className="h-4 w-4 animate-spin text-orange-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium text-orange-700">{progress}</span>
            </div>
          )}

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-1 text-center">
              <p className="text-sm font-semibold text-green-800">Conversion Complete</p>
              <p className="text-xs text-green-600">{result.slideCount} slides · {formatBytes(result.pdfSize)}</p>
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
              ) : "Convert to PDF"}
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
              <button onClick={handleReset} className="btn-secondary w-full">Convert Another File</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
