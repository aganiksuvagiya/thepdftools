// One line of text drawn with the browser's fonts, for PDF text that pdf-lib's built-in fonts cannot
// encode (Gujarati, Hindi, "₹", emoji...). Sizes are in PDF points.
const SCALE = 4; // canvas pixels per point

export function textToPng(text: string, sizePt: number, color: string, bold: boolean) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const font = `${bold ? "bold " : ""}${sizePt * SCALE}px Arial, Helvetica, "Nirmala UI", "Noto Sans", "Noto Sans Gujarati", "Noto Sans Devanagari", sans-serif`;
  const pad = 2; // points of empty space left and right of the text
  ctx.font = font;
  const textWidth = ctx.measureText(text).width / SCALE;
  const ascent = sizePt * 1.2;
  const descent = sizePt * 0.5;
  canvas.width = Math.ceil((textWidth + pad * 2) * SCALE);
  canvas.height = Math.ceil((ascent + descent) * SCALE);
  // resizing a canvas resets its state
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, pad * SCALE, ascent * SCALE);
  return {
    dataUrl: canvas.toDataURL("image/png"),
    /** width of the text itself, without the padding */
    textWidth,
    /** size of the whole image */
    width: canvas.width / SCALE,
    height: canvas.height / SCALE,
    /** distance from the image's bottom edge up to the text baseline */
    descent: canvas.height / SCALE - ascent,
    pad,
  };
}
