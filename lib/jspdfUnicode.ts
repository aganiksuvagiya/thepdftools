// jsPDF's built-in fonts only cover WinAnsi: a single Gujarati / Hindi letter or "₹" turns the whole
// string into garbage. This patches one jsPDF document so such strings are drawn with the browser's own
// fonts and placed as images; everything else stays normal PDF text. saveUnicodePdf() then lays
// invisible text over those images, so they can be selected, copied and searched too.
// The document must use millimetres as its unit.
import type { jsPDF } from "jspdf";
import { needsUnicode } from "@/app/text-to-pdf/unicodePdf";
import { createTextLayer } from "@/lib/pdfTextLayer";

const PX_PER_MM = 12; // about 300 DPI
const PT_TO_MM = 25.4 / 72;

/** a line that was placed as an image: position in millimetres from the top left of its page */
type ImageLine = { page: number; text: string; x: number; y: number; sizePt: number; width: number };
const imageLines = new WeakMap<jsPDF, ImageLine[]>();

export async function saveUnicodePdf(doc: jsPDF, filename: string): Promise<void> {
  const lines = imageLines.get(doc);
  if (!lines || !lines.length) {
    doc.save(filename);
    return;
  }
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(doc.output("arraybuffer"), { updateMetadata: false });
  const layer = await createTextLayer(pdf);
  lines.forEach((line) => {
    const page = pdf.getPage(line.page - 1);
    layer.add(page, {
      text: line.text,
      x: line.x / PT_TO_MM,
      y: page.getHeight() - line.y / PT_TO_MM,
      size: line.sizePt,
      width: line.width / PT_TO_MM,
    });
  });
  layer.finish();
  const url = URL.createObjectURL(new Blob([new Uint8Array(await pdf.save())], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function enableUnicodeText(doc: jsPDF): jsPDF {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return doc;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const d = doc as any;
  const drawText = d.text.bind(doc);
  const splitText = d.splitTextToSize.bind(doc);
  const textWidth = d.getTextWidth.bind(doc);

  const cssFont = () => {
    const f = doc.getFont();
    const sizePx = doc.getFontSize() * PT_TO_MM * PX_PER_MM;
    const style = /italic|oblique/i.test(f.fontStyle) ? "italic " : "";
    const weight = /bold/i.test(f.fontStyle) ? "bold " : "";
    const family = /courier/i.test(f.fontName)
      ? '"Courier New", Courier, monospace'
      : /times/i.test(f.fontName)
        ? '"Times New Roman", Times, "Noto Serif", serif'
        : 'Arial, Helvetica, "Nirmala UI", "Noto Sans", "Noto Sans Gujarati", "Noto Sans Devanagari", sans-serif';
    return `${style}${weight}${sizePx.toFixed(2)}px ${family}`;
  };

  const widthMm = (value: string) => {
    ctx.font = cssFont();
    return ctx.measureText(value).width / PX_PER_MM;
  };

  const wrap = (value: string, maxMm: number): string[] => {
    const out: string[] = [];
    value.replace(/\r\n?/g, "\n").split("\n").forEach((para) => {
      let line = "";
      para.split(/(\s+)/).forEach((token) => {
        if (!token) return;
        if (line && widthMm((line + token).replace(/\s+$/, "")) > maxMm) {
          out.push(line.replace(/\s+$/, ""));
          line = token.replace(/^\s+/, "");
        } else line += token;
        // break words that are wider than the line
        while (widthMm(line) > maxMm && line.length > 1) {
          const chars = Array.from(line);
          let cut = chars.length - 1;
          while (cut > 1 && widthMm(chars.slice(0, cut).join("")) > maxMm) cut--;
          out.push(chars.slice(0, cut).join(""));
          line = chars.slice(cut).join("");
        }
      });
      out.push(line.replace(/\s+$/, ""));
    });
    return out;
  };

  const drawImageLine = (line: string, x: number, y: number, align?: string) => {
    if (!line.trim()) return;
    const font = cssFont();
    const sizePx = doc.getFontSize() * PT_TO_MM * PX_PER_MM;
    const pad = 4;
    ctx.font = font;
    const textPx = ctx.measureText(line).width;
    const ascent = Math.ceil(sizePx * 1.2);
    canvas.width = Math.ceil(textPx) + pad * 2;
    canvas.height = ascent + Math.ceil(sizePx * 0.5);
    // resizing a canvas resets its state
    ctx.font = font;
    ctx.fillStyle = doc.getTextColor();
    ctx.textBaseline = "alphabetic";
    ctx.fillText(line, pad, ascent);
    const textMm = textPx / PX_PER_MM;
    const left = align === "center" ? x - textMm / 2 : align === "right" ? x - textMm : x;
    const placed = imageLines.get(doc) || [];
    placed.push({ page: d.getCurrentPageInfo().pageNumber, text: line, x: left, y, sizePt: doc.getFontSize(), width: textMm });
    imageLines.set(doc, placed);
    doc.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      left - pad / PX_PER_MM,
      y - ascent / PX_PER_MM,
      canvas.width / PX_PER_MM,
      canvas.height / PX_PER_MM,
      undefined,
      "FAST"
    );
  };

  d.getTextWidth = (value: string) => (needsUnicode(String(value)) ? widthMm(String(value)) : textWidth(value));

  d.splitTextToSize = (value: any, maxWidth: number, options?: any) =>
    typeof value === "string" && needsUnicode(value) ? wrap(value, maxWidth) : splitText(value, maxWidth, options);

  d.text = (value: any, x: number, y: number, options?: any, transform?: any) => {
    const source: string[] = Array.isArray(value) ? value.map(String) : String(value).split("\n");
    if (!source.some(needsUnicode)) return drawText(value, x, y, options, transform);

    const maxWidth: number | undefined = options?.maxWidth;
    const lines = maxWidth
      ? source.reduce<string[]>((all, line) => all.concat(d.splitTextToSize(line, maxWidth) as string[]), [])
      : source;
    const factor: number = d.getLineHeightFactor?.() ?? 1.15;
    const lineHeight = doc.getFontSize() * PT_TO_MM * factor;
    lines.forEach((line, i) => {
      const lineY = y + i * lineHeight;
      if (needsUnicode(line)) drawImageLine(line, x, lineY, options?.align);
      else drawText(line, x, lineY, { ...options, maxWidth: undefined }, transform);
    });
    return doc;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return doc;
}
