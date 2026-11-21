// Puts a rendered canvas on a PDF page: lossless Flate for text/flat graphics (small and sharp),
// JPEG for photo-like pages.
import type { PDFDocument, PDFPage } from "pdf-lib";

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) return reject(new Error("Could not encode a page image."));
        resolve(new Uint8Array(await blob.arrayBuffer()));
      },
      "image/jpeg",
      quality
    );
  });
}

let counter = 0;

export async function addCanvasPage(
  pdfDoc: PDFDocument,
  canvas: HTMLCanvasElement,
  pageW: number,
  pageH: number,
  jpegQuality: number
): Promise<PDFPage> {
  // loaded lazily so pdf-lib stays out of the page's first-load JavaScript
  const { PDFHexString, concatTransformationMatrix, drawObject, popGraphicsState, pushGraphicsState } = await import("pdf-lib");
  const page = pdfDoc.addPage([pageW, pageH]);
  const w = canvas.width, h = canvas.height;
  const ctx = canvas.getContext("2d");
  let photo = true;
  let gray = false;
  let data: Uint8ClampedArray | null = null;
  if (ctx) {
    data = ctx.getImageData(0, 0, w, h).data;
    gray = true;
    const seen = new Uint8Array(4096);
    let distinct = 0;
    for (let i = 0; i < data.length; i += 20) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (gray && (Math.abs(r - g) > 2 || Math.abs(g - b) > 2)) gray = false;
      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      if (!seen[key]) {
        seen[key] = 1;
        distinct++;
      }
    }
    photo = distinct > 900;
  }

  if (photo || !data) {
    const img = await pdfDoc.embedJpg(await canvasToJpeg(canvas, jpegQuality));
    page.drawImage(img, { x: 0, y: 0, width: pageW, height: pageH });
    return page;
  }

  // Flate image with the PNG "Up" predictor: flat areas compress to almost nothing.
  // Gray pages use 16 gray levels (4 bit); colour pages use an indexed palette of up to 256 colours.
  const bpc = gray ? 4 : 8;
  const rowBytes = gray ? Math.ceil(w / 2) : w;
  const out = new Uint8Array((rowBytes + 1) * h);
  const prev = new Uint8Array(rowBytes);
  const cur = new Uint8Array(rowBytes);
  let palette = "";

  let lookup: Uint8Array | null = null;
  if (!gray) {
    const count = new Uint32Array(4096);
    const sr = new Float64Array(4096), sg = new Float64Array(4096), sb = new Float64Array(4096);
    for (let j = 0; j < data.length; j += 4) {
      const key = ((data[j] >> 4) << 8) | ((data[j + 1] >> 4) << 4) | (data[j + 2] >> 4);
      count[key]++;
      sr[key] += data[j];
      sg[key] += data[j + 1];
      sb[key] += data[j + 2];
    }
    const keys: number[] = [];
    for (let k = 0; k < 4096; k++) if (count[k]) keys.push(k);
    if (keys.length > 256) {
      // gradients and photos need more than a 256 colour palette: keep them as JPEG
      const img = await pdfDoc.embedJpg(await canvasToJpeg(canvas, jpegQuality));
      page.drawImage(img, { x: 0, y: 0, width: pageW, height: pageH });
      return page;
    }
    keys.sort((x, y) => count[y] - count[x]);
    const chosen = keys.slice(0, 256);
    const pal: number[][] = chosen.map((k) => [Math.round(sr[k] / count[k]), Math.round(sg[k] / count[k]), Math.round(sb[k] / count[k])]);
    lookup = new Uint8Array(4096);
    const idxOf: Record<number, number> = {};
    chosen.forEach((k, i) => (idxOf[k] = i));
    keys.forEach((k) => {
      if (idxOf[k] !== undefined) {
        lookup![k] = idxOf[k];
        return;
      }
      const r = sr[k] / count[k], g = sg[k] / count[k], b = sb[k] / count[k];
      let best = 0, bd = Infinity;
      for (let i = 0; i < pal.length; i++) {
        const d = (pal[i][0] - r) * (pal[i][0] - r) + (pal[i][1] - g) * (pal[i][1] - g) + (pal[i][2] - b) * (pal[i][2] - b);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      lookup![k] = best;
    });
    pal.forEach((c) => {
      palette += c.map((v) => (v < 16 ? "0" : "") + v.toString(16)).join("");
    });
    while (palette.length < 256 * 6) palette += "000000";
  }

  for (let y = 0; y < h; y++) {
    let j = y * w * 4;
    if (gray) {
      cur.fill(0);
      for (let x = 0; x < w; x++, j += 4) {
        const v = data[j] >> 4;
        cur[x >> 1] |= x & 1 ? v : v << 4;
      }
    } else {
      for (let x = 0; x < w; x++, j += 4) {
        cur[x] = (lookup as Uint8Array)[((data[j] >> 4) << 8) | ((data[j + 1] >> 4) << 4) | (data[j + 2] >> 4)];
      }
    }
    const o = y * (rowBytes + 1);
    out[o] = 2;
    for (let i = 0; i < rowBytes; i++) {
      out[o + 1 + i] = (cur[i] - prev[i]) & 255;
      prev[i] = cur[i];
    }
  }
  const stream = pdfDoc.context.flateStream(out, {
    Type: "XObject",
    Subtype: "Image",
    Width: w,
    Height: h,
    ColorSpace: gray ? "DeviceGray" : pdfDoc.context.obj(["Indexed", "DeviceRGB", 255, PDFHexString.of(palette)]),
    BitsPerComponent: bpc,
    DecodeParms: { Predictor: 15, Colors: 1, BitsPerComponent: bpc, Columns: w },
  });
  const ref = pdfDoc.context.register(stream);
  const name = page.node.newXObject("Pg" + counter++, ref);
  page.pushOperators(pushGraphicsState(), concatTransformationMatrix(pageW, 0, 0, pageH, 0, 0), drawObject(name), popGraphicsState());
  return page;
}
