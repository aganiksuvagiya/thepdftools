// Text -> PDF for text that the standard PDF fonts cannot show (Gujarati, Hindi, Arabic, CJK, emoji...):
// the pages are drawn on a canvas with the browser's own fonts and added as images, with an invisible
// text layer on top so the text can still be selected, copied and searched.
import { addCanvasPage } from "@/lib/ooxml/pdfPage";
import { createTextLayer } from "@/lib/pdfTextLayer";

export type FamilyName = "helvetica" | "courier" | "times";

const MM_TO_PX = 96 / 25.4;
const PT_TO_PX = 96 / 72;
const PX_TO_PT = 0.75;

// characters the built-in PDF fonts (WinAnsi) can show
export function needsUnicode(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c <= 0xff) continue;
    if (c === 0x2013 || c === 0x2014 || c === 0x2018 || c === 0x2019 || c === 0x201c || c === 0x201d || c === 0x2022 || c === 0x2026 || c === 0x20ac || c === 0x2122) continue;
    return true;
  }
  return false;
}

function stackFor(family: FamilyName): string {
  if (family === "courier") return '"Courier New", Courier, "Liberation Mono", monospace';
  if (family === "times") return '"Times New Roman", Times, "Liberation Serif", "Noto Serif", serif';
  return 'Arial, Helvetica, "Liberation Sans", "Nirmala UI", "Noto Sans", "Noto Sans Gujarati", "Noto Sans Devanagari", sans-serif';
}

export async function generateUnicodePdf(opts: {
  text: string;
  pageWmm: number;
  pageHmm: number;
  marginMm: number;
  fontSizePt: number;
  family: FamilyName;
  lineHeight: number;
}): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const pageW = opts.pageWmm * MM_TO_PX;
  const pageH = opts.pageHmm * MM_TO_PX;
  const margin = opts.marginMm * MM_TO_PX;
  const size = opts.fontSizePt * PT_TO_PX;
  const lineH = size * opts.lineHeight;
  const maxW = pageW - margin * 2;
  const font = `${size.toFixed(2)}px ${stackFor(opts.family)}`;

  const scratch = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
  scratch.font = font;
  const widthOf = (s: string) => scratch.measureText(s).width;

  // wrap
  const lines: string[] = [];
  opts.text.replace(/\r\n?/g, "\n").replace(/\t/g, "    ").split("\n").forEach((para) => {
    if (!para.trim()) {
      lines.push("");
      return;
    }
    let line = "";
    para.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (line && widthOf((line + tok).replace(/\s+$/, "")) > maxW) {
        lines.push(line.replace(/\s+$/, ""));
        line = tok.replace(/^\s+/, "");
      } else line += tok;
      // break words that are wider than the line
      while (widthOf(line) > maxW && line.length > 1) {
        const chars = Array.from(line);
        let cut = chars.length - 1;
        while (cut > 1 && widthOf(chars.slice(0, cut).join("")) > maxW) cut--;
        lines.push(chars.slice(0, cut).join(""));
        line = chars.slice(cut).join("");
      }
    });
    lines.push(line.replace(/\s+$/, ""));
  });

  const perPage = Math.max(1, Math.floor((pageH - margin * 2) / lineH));
  const pageCount = Math.max(1, Math.ceil(lines.length / perPage));
  const pdf = await PDFDocument.create();
  const hidden = await createTextLayer(pdf);
  const dpi = Math.min(2, 4096 / Math.max(pageW, pageH));

  for (let p = 0; p < pageCount; p++) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(pageW * dpi);
    canvas.height = Math.round(pageH * dpi);
    const g = canvas.getContext("2d") as CanvasRenderingContext2D;
    g.fillStyle = "#ffffff";
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.scale(dpi, dpi);
    g.fillStyle = "#111111";
    g.font = font;
    g.textBaseline = "alphabetic";
    const pageLines = lines.slice(p * perPage, (p + 1) * perPage);
    const page = await addCanvasPage(
      pdf,
      (() => {
        pageLines.forEach((ln, i) => {
          if (ln) g.fillText(ln, margin, margin + i * lineH + lineH - lineH * 0.25);
        });
        return canvas;
      })(),
      pageW * PX_TO_PT,
      pageH * PX_TO_PT,
      0.9
    );
    pageLines.forEach((ln, i) =>
      hidden.add(page, {
        text: ln,
        x: margin * PX_TO_PT,
        y: (pageH - (margin + i * lineH + lineH - lineH * 0.25)) * PX_TO_PT,
        size: size * PX_TO_PT,
        width: widthOf(ln) * PX_TO_PT,
      })
    );
    canvas.width = 0;
    canvas.height = 0;
  }
  pdf.setProducer("ThePDFTools");
  pdf.setTitle("text-document");
  hidden.finish();
  const bytes = await pdf.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}
