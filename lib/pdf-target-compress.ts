// Gets a PDF under a size limit while keeping it as readable as possible. The 100KB and 200KB pages use
// this when shrinking the embedded pictures is not enough and the pages have to become images.
//
// There is a list of quality steps, best first. The best step whose result fits the limit wins. Pages
// that are mostly text switch to sharp black and white before colour would turn blurry, and pictures
// on such pages (photos, stamps) are laid back on top as small JPEGs.
import {
  PDFDocument,
  concatTransformationMatrix,
  drawObject,
  popGraphicsState,
  pushGraphicsState,
  type PDFPage,
} from "pdf-lib";
import { EncryptedPdfError, loadPdfJs } from "@/lib/pdf-compress-engine";

export type PageStyle = "auto" | "colour" | "bw";

export interface TargetResult {
  bytes: Uint8Array;
  fits: boolean;
  pages: number;
  /** pages that were turned into black and white */
  bwPages: number;
  /** the resolution had to go so low that small text may not be readable */
  hardToRead: boolean;
}

interface Setting {
  bw: boolean;
  /** resolution on an A4 sheet */
  dpi: number;
  quality: number;
}

const colour = (dpi: number, quality: number): Setting => ({ bw: false, dpi, quality });
const mono = (dpi: number): Setting => ({ bw: true, dpi, quality: 0 });

// The three lists have the same length: entry n of each is "step n".
const COLOUR_STEPS = [
  colour(150, 0.75), colour(130, 0.65), colour(115, 0.55), colour(105, 0.5), colour(95, 0.46), colour(85, 0.42),
  colour(80, 0.4), colour(75, 0.4), colour(72, 0.37), colour(70, 0.35), colour(67, 0.33), colour(65, 0.32),
  colour(60, 0.3), colour(50, 0.3), colour(40, 0.28),
];
const TEXT_STEPS = [
  colour(150, 0.72), colour(130, 0.65), colour(115, 0.55), mono(150), mono(130), mono(115), mono(100), mono(90),
  mono(85), mono(80), mono(75), mono(70), mono(60), mono(55), mono(50),
];
const BW_STEPS = [
  mono(200), mono(170), mono(150), mono(130), mono(115), mono(100), mono(90), mono(85), mono(80), mono(75),
  mono(70), mono(65), mono(60), mono(50), mono(45),
];

// Used when no step fits: still comfortable to read, so the person gets a usable file.
const READABLE_STEP = 7;
// Below these resolutions small print is likely to be lost.
const LOW_BW_DPI = 80;
const LOW_COLOUR_DPI = 70;

const A4_AREA = 595 * 842;
const MAX_PIXELS = 6_000_000;
// rough size of everything in the file that is not picture data
const FILE_OVERHEAD = 700;
const PAGE_OVERHEAD = 350;
const IMAGE_OVERHEAD = 200;

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/* eslint-disable @typescript-eslint/no-explicit-any */
async function renderPage(page: any, dpi: number): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }> {
  const base = page.getViewport({ scale: 1 });
  const area = base.width * base.height;
  // Small pages (ID cards, receipts) are drawn more sharply, oversized ones with only some extra pixels.
  const oversize = Math.min(1.4, Math.max(1, Math.sqrt(area / A4_AREA)));
  const factor = Math.min(2, oversize * Math.sqrt(A4_AREA / area));
  const scale = Math.min((dpi / 72) * factor, Math.sqrt(MAX_PIXELS / area));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not draw the page.");
  await page.render({ canvasContext: ctx, canvas, viewport }).promise;
  return { canvas, ctx };
}

async function toJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Uint8Array> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob) throw new Error("Could not encode page image");
  return new Uint8Array(await blob.arrayBuffer());
}

function release(canvas: HTMLCanvasElement) {
  canvas.width = 0;
  canvas.height = 0;
}

function percentile(histogram: Uint32Array, total: number, share: number): number {
  let seen = 0;
  for (let v = 0; v < 256; v++) {
    seen += histogram[v];
    if (seen >= total * share) return v;
  }
  return 255;
}

function luminance(rgba: Uint8ClampedArray): Uint8Array {
  const gray = new Uint8Array(rgba.length / 4);
  for (let i = 0, p = 0; p < gray.length; i += 4, p++) {
    gray[p] = (rgba[i] * 77 + rgba[i + 1] * 150 + rgba[i + 2] * 29) >> 8;
  }
  return gray;
}

// How bright the empty paper is around every pixel, following shadows and yellowed corners. `cell` is
// the size of the squares the page is measured in.
function paperBrightness(gray: Uint8Array, width: number, height: number, overall: number, cell: number) {
  const histogram = new Uint32Array(256);
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const values = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      histogram.fill(0);
      let count = 0;
      for (let y = r * cell; y < Math.min(height, (r + 1) * cell); y++) {
        for (let x = c * cell; x < Math.min(width, (c + 1) * cell); x++) {
          histogram[gray[y * width + x]]++;
          count++;
        }
      }
      // A cell that is very dark all over is part of a picture or a filled box, not shaded paper.
      values[r * cols + c] = Math.max(percentile(histogram, count, 0.9), overall * 0.4);
    }
  }

  const map = new Uint8Array(gray.length);
  for (let y = 0; y < height; y++) {
    const fy = Math.min(rows - 1, Math.max(0, y / cell - 0.5));
    const r0 = Math.floor(fy);
    const r1 = Math.min(rows - 1, r0 + 1);
    const wy = fy - r0;
    for (let x = 0; x < width; x++) {
      const fx = Math.min(cols - 1, Math.max(0, x / cell - 0.5));
      const c0 = Math.floor(fx);
      const c1 = Math.min(cols - 1, c0 + 1);
      const wx = fx - c0;
      const top = values[r0 * cols + c0] * (1 - wx) + values[r0 * cols + c1] * wx;
      const bottom = values[r1 * cols + c0] * (1 - wx) + values[r1 * cols + c1] * wx;
      map[y * width + x] = top * (1 - wy) + bottom * wy;
    }
  }
  return map;
}

function paperLevel(gray: Uint8Array): number {
  const histogram = new Uint32Array(256);
  for (let p = 0; p < gray.length; p++) histogram[gray[p]]++;
  return percentile(histogram, gray.length, 0.85);
}

const chroma = (rgba: Uint8ClampedArray, i: number) =>
  Math.max(rgba[i], rgba[i + 1], rgba[i + 2]) - Math.min(rgba[i], rgba[i + 1], rgba[i + 2]);

// A letter, form or certificate with little strong colour, either evenly lit like a scan or a phone
// photo with shadows across it.
async function looksLikeText(page: any): Promise<boolean> {
  const { canvas, ctx } = await renderPage(page, 60);
  const width = canvas.width;
  const height = canvas.height;
  const rgba = ctx.getImageData(0, 0, width, height).data;
  release(canvas);
  const gray = luminance(rgba);
  const overall = paperLevel(gray);
  const local = paperBrightness(gray, width, height, overall, Math.max(16, Math.round(width / 24)));
  let light = 0;
  let lightNearby = 0;
  let inkNearby = 0;
  let vivid = 0;
  for (let p = 0; p < gray.length; p++) {
    if (gray[p] >= overall * 0.85) light++;
    if (gray[p] >= local[p] * 0.85) lightNearby++;
    else if (gray[p] < local[p] * 0.65) inkNearby++;
    if (chroma(rgba, p * 4) > 60) vivid++;
  }
  const n = gray.length;
  const evenlyLit = overall >= 140 && light / n >= 0.65 && vivid / n <= 0.15;
  // Shadows change slowly: compared with its surroundings the page is still paper plus some ink,
  // with little in between. Photographs have many in-between shades or no ink at all.
  const inBetween = (n - lightNearby - inkNearby) / n;
  const shaded =
    overall >= 110 &&
    lightNearby / n >= 0.75 &&
    inkNearby / n >= 0.01 &&
    inkNearby / n <= 0.2 &&
    inBetween <= 0.12 &&
    vivid / n <= 0.1;
  return evenlyLit || shaded;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Groups of touching marked blocks.
function groups(marked: Uint8Array, cols: number) {
  const seen = new Uint8Array(marked.length);
  const found: { members: number[]; c0: number; r0: number; c1: number; r1: number }[] = [];
  for (let start = 0; start < marked.length; start++) {
    if (!marked[start] || seen[start]) continue;
    const group = { members: [start], c0: cols, r0: marked.length, c1: 0, r1: 0 };
    seen[start] = 1;
    for (let q = 0; q < group.members.length; q++) {
      const c = group.members[q] % cols;
      const r = Math.floor(group.members[q] / cols);
      group.c0 = Math.min(group.c0, c);
      group.r0 = Math.min(group.r0, r);
      group.c1 = Math.max(group.c1, c);
      group.r1 = Math.max(group.r1, r);
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const next = (r + dr) * cols + c + dc;
          if (c + dc < 0 || c + dc >= cols || next < 0 || next >= marked.length || !marked[next] || seen[next]) continue;
          seen[next] = 1;
          group.members.push(next);
        }
      }
    }
    found.push(group);
  }
  return found;
}

// Rectangles that hold photos, coloured stamps or filled boxes. Grey shadows and lettering do not count.
function findPictures(rgba: Uint8ClampedArray, gray: Uint8Array, paper: number, width: number, height: number): Rect[] {
  // measured in large squares, so shadows are evened out while photographs keep their tones
  const local = paperBrightness(gray, width, height, paper, Math.max(48, Math.round(width / 8)));
  const block = Math.max(10, Math.round(width / 50));
  const cols = Math.ceil(width / block);
  const rows = Math.ceil(height / block);
  const busy = new Uint8Array(cols * rows);
  // blocks that are somewhat darker than paper; part of a picture only when they touch a busy block
  const soft = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let strong = 0;
      let weak = 0;
      let count = 0;
      for (let y = r * block; y < Math.min(height, (r + 1) * block); y++) {
        for (let x = c * block; x < Math.min(width, (c + 1) * block); x++) {
          const p = y * width + x;
          const colourful = chroma(rgba, p * 4);
          const even = (gray[p] * paper) / Math.max(local[p], 1);
          if (colourful > 60 || even < paper * 0.45) strong++;
          if (colourful > 40 || even < paper * 0.85) weak++;
          count++;
        }
      }
      if (strong > count * 0.5) busy[r * cols + c] = 1;
      if (weak > count * 0.7) soft[r * cols + c] = 1;
    }
  }
  // Lines of bold lettering are only a block or two high. Pictures are bigger in both directions.
  groups(busy, cols).forEach((g) => {
    if (g.c1 - g.c0 < 2 || g.r1 - g.r0 < 2) g.members.forEach((i) => (busy[i] = 0));
  });
  // grow a few blocks outwards, so that a face between dark hair and clothes stays part of the photo
  for (let round = 0; round < 4; round++) {
    const grown: number[] = [];
    for (let i = 0; i < busy.length; i++) {
      if (busy[i] || !soft[i]) continue;
      const c = i % cols;
      if ((c > 0 && busy[i - 1]) || (c < cols - 1 && busy[i + 1]) || busy[i - cols] || busy[i + cols]) grown.push(i);
    }
    grown.forEach((i) => (busy[i] = 1));
  }

  const boxes = groups(busy, cols)
    .filter((g) => g.members.length >= 6)
    .map((g) => ({ c0: g.c0 - 1, r0: g.r0 - 1, c1: g.c1 + 1, r1: g.r1 + 1 }));

  // join rectangles that overlap, so no part of the page is stored twice
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];
      if (a.c0 > b.c1 || b.c0 > a.c1 || a.r0 > b.r1 || b.r0 > a.r1) continue;
      boxes[i] = { c0: Math.min(a.c0, b.c0), r0: Math.min(a.r0, b.r0), c1: Math.max(a.c1, b.c1), r1: Math.max(a.r1, b.r1) };
      boxes.splice(j, 1);
      j = i; // the bigger rectangle may now touch earlier ones
    }
  }

  return boxes.map((b) => {
    const x = Math.max(0, b.c0 * block);
    const y = Math.max(0, b.r0 * block);
    return {
      x,
      y,
      width: Math.min(width, (b.c1 + 1) * block) - x,
      height: Math.min(height, (b.r1 + 1) * block) - y,
    };
  });
}

// Which pixels are ink. Each pixel is compared with the brightness and contrast around it (Sauvola's
// method), so text stays clean under shadows and on yellowed paper.
function findInk(gray: Uint8Array, paper: number, width: number, height: number): Uint8Array {
  const radius = Math.max(7, Math.round(width / 80));
  const ink = new Uint8Array(gray.length);
  const columnSum = new Float64Array(width);
  const columnSquares = new Float64Array(width);
  let rows = 0;
  const addRow = (y: number, sign: number) => {
    for (let x = 0; x < width; x++) {
      const v = gray[y * width + x];
      columnSum[x] += sign * v;
      columnSquares[x] += sign * v * v;
    }
    rows += sign;
  };
  for (let y = 0; y < Math.min(radius, height); y++) addRow(y, 1);
  for (let y = 0; y < height; y++) {
    if (y + radius < height) addRow(y + radius, 1);
    if (y - radius - 1 >= 0) addRow(y - radius - 1, -1);
    let sum = 0;
    let squares = 0;
    let columns = 0;
    for (let x = 0; x < Math.min(radius, width); x++) {
      sum += columnSum[x];
      squares += columnSquares[x];
      columns++;
    }
    for (let x = 0; x < width; x++) {
      if (x + radius < width) {
        sum += columnSum[x + radius];
        squares += columnSquares[x + radius];
        columns++;
      }
      if (x - radius - 1 >= 0) {
        sum -= columnSum[x - radius - 1];
        squares -= columnSquares[x - radius - 1];
        columns--;
      }
      const n = rows * columns;
      const mean = sum / n;
      const spread = Math.sqrt(Math.max(0, squares / n - mean * mean));
      const p = y * width + x;
      // the second test keeps the inside of solid black areas black
      if (gray[p] < mean * (1 + 0.25 * (spread / 128 - 1)) || gray[p] < paper * 0.35) ink[p] = 1;
    }
  }
  return ink;
}

// One bit per pixel, rows padded to whole bytes, 1 = white. Areas covered by a picture stay white.
function toBlackAndWhite(gray: Uint8Array, paper: number, width: number, height: number, covered: Rect[]) {
  const ink = findInk(gray, paper, width, height);
  covered.forEach((box) => {
    for (let y = box.y; y < box.y + box.height; y++) ink.fill(0, y * width + box.x, y * width + box.x + box.width);
  });

  // No clean-up of single dots: at low resolution a decimal point or the dot of an "i" is one pixel.
  const rowBytes = Math.ceil(width / 8);
  const packed = new Uint8Array(rowBytes * height).fill(255);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (ink[y * width + x]) packed[y * rowBytes + (x >> 3)] &= ~(128 >> (x & 7));
    }
  }
  return packed;
}

// The colour of the empty paper, channel by channel.
function paperColour(rgba: Uint8ClampedArray, gray: Uint8Array, paper: number): number[] {
  const sum = [0, 0, 0];
  let count = 0;
  for (let p = 0; p < gray.length; p += 7) {
    if (gray[p] < paper * 0.97) continue;
    for (let c = 0; c < 3; c++) sum[c] += rgba[p * 4 + c];
    count++;
  }
  return count ? sum.map((v) => v / count) : [255, 255, 255];
}

async function encodePicture(
  source: HTMLCanvasElement,
  box: Rect,
  white: number[],
  dpi: number,
  gray: boolean
): Promise<Uint8Array> {
  const ctx = source.getContext("2d")!;
  const image = ctx.getImageData(box.x, box.y, box.width, box.height);
  const data = image.data;
  // brighten so the paper around the picture is as white as the rest of the page
  const lift = white.map((v) => Math.min(1.3, 258 / Math.max(v, 1)));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * lift[0];
    data[i + 1] = data[i + 1] * lift[1];
    data[i + 2] = data[i + 2] * lift[2];
    if (data[i] > 236 && data[i + 1] > 236 && data[i + 2] > 236) data[i] = data[i + 1] = data[i + 2] = 255;
    if (gray) data[i] = data[i + 1] = data[i + 2] = (data[i] * 77 + data[i + 1] * 150 + data[i + 2] * 29) >> 8;
  }
  const full = document.createElement("canvas");
  full.width = box.width;
  full.height = box.height;
  full.getContext("2d")!.putImageData(image, 0, 0);
  // pictures need less resolution than lettering
  const shrink = Math.min(1, 100 / dpi);
  const small = document.createElement("canvas");
  small.width = Math.max(1, Math.round(box.width * shrink));
  small.height = Math.max(1, Math.round(box.height * shrink));
  const smallCtx = small.getContext("2d")!;
  smallCtx.imageSmoothingQuality = "high";
  smallCtx.drawImage(full, 0, 0, small.width, small.height);
  const bytes = await toJpeg(small, dpi >= 100 ? 0.55 : 0.42);
  release(full);
  release(small);
  return bytes;
}

// Adds the page to the new document and returns about how many bytes it takes.
async function addColourPage(out: PDFDocument, source: any, setting: Setting): Promise<number> {
  const { canvas } = await renderPage(source, setting.dpi);
  const bytes = await toJpeg(canvas, setting.quality);
  release(canvas);
  const image = await out.embedJpg(bytes);
  const { width, height } = source.getViewport({ scale: 1 });
  out.addPage([width, height]).drawImage(image, { x: 0, y: 0, width, height });
  return bytes.length + PAGE_OVERHEAD + IMAGE_OVERHEAD;
}

// Returns null, having added nothing, when the page is mostly pictures and should stay in colour.
async function addBlackAndWhitePage(
  out: PDFDocument,
  source: any,
  dpi: number,
  greyPictures: boolean,
  mayRefuse: boolean
): Promise<number | null> {
  const { canvas, ctx } = await renderPage(source, dpi);
  const width = canvas.width;
  const height = canvas.height;
  const rgba = ctx.getImageData(0, 0, width, height).data;
  const gray = luminance(rgba);
  const paper = paperLevel(gray);
  const pictures = findPictures(rgba, gray, paper, width, height);
  const pictureShare = pictures.reduce((sum, box) => sum + box.width * box.height, 0) / (width * height);
  if (mayRefuse && pictureShare > 0.45) {
    release(canvas);
    return null;
  }

  const bits = toBlackAndWhite(gray, paper, width, height, pictures);
  const white = paperColour(rgba, gray, paper);
  const stream = out.context.flateStream(bits, {
    Type: "XObject",
    Subtype: "Image",
    Width: width,
    Height: height,
    ColorSpace: "DeviceGray",
    BitsPerComponent: 1,
    // asks PDF readers to smooth the edges of the letters when the page is enlarged
    Interpolate: true,
  });
  const size = source.getViewport({ scale: 1 });
  const page: PDFPage = out.addPage([size.width, size.height]);
  const name = page.node.newXObject("Scan", out.context.register(stream));
  page.pushOperators(
    pushGraphicsState(),
    concatTransformationMatrix(size.width, 0, 0, size.height, 0, 0),
    drawObject(name),
    popGraphicsState()
  );
  let used = stream.contents.length + PAGE_OVERHEAD + IMAGE_OVERHEAD;

  for (let i = 0; i < pictures.length; i++) {
    const box = pictures[i];
    const bytes = await encodePicture(canvas, box, white, dpi, greyPictures);
    const image = await out.embedJpg(bytes);
    page.drawImage(image, {
      x: (box.x / width) * size.width,
      y: size.height - ((box.y + box.height) / height) * size.height,
      width: (box.width / width) * size.width,
      height: (box.height / height) * size.height,
    });
    used += bytes.length + IMAGE_OVERHEAD;
  }
  release(canvas);
  return used;
}

export async function compressToTarget(
  input: Uint8Array,
  targetBytes: number,
  style: PageStyle,
  onProgress?: (attempt: number, pct: number) => void
): Promise<TargetResult> {
  const pdfjsLib = await loadPdfJs();
  // pdf.js takes over the buffer it is given
  const copy = input.slice();
  let source: any;
  try {
    source = await pdfjsLib.getDocument({ data: copy }).promise;
  } catch (err) {
    if (err && (err as { name?: string }).name === "PasswordException") throw new EncryptedPdfError();
    throw err;
  }
  const pages: number = source.numPages;
  const textPage: boolean[] = [];
  let attempt = 0;

  // The whole document at one step, or null as soon as it is clearly going to be bigger than `limit`.
  const build = async (step: number, limit: number): Promise<TargetResult | null> => {
    attempt++;
    onProgress?.(attempt, 0);
    const out = await PDFDocument.create();
    let used = FILE_OVERHEAD;
    let bwPages = 0;
    let hardToRead = false;
    for (let n = 1; n <= pages; n++) {
      const page = await source.getPage(n);
      let setting = COLOUR_STEPS[step];
      if (style === "bw") setting = BW_STEPS[step];
      else if (style === "auto") {
        if (textPage[n] === undefined) textPage[n] = await looksLikeText(page);
        if (textPage[n]) setting = TEXT_STEPS[step];
      }

      let added: number | null = null;
      if (setting.bw) {
        added = await addBlackAndWhitePage(out, page, setting.dpi, style === "bw", style === "auto");
        if (added !== null) bwPages++;
        else setting = COLOUR_STEPS[step];
      }
      if (added === null) added = await addColourPage(out, page, setting);
      used += added;
      if (setting.dpi < (setting.bw ? LOW_BW_DPI : LOW_COLOUR_DPI)) hardToRead = true;

      page.cleanup();
      onProgress?.(attempt, Math.round((n / pages) * 100));
      await tick();
      if (used > limit) return null;
    }
    const bytes = await out.save({ useObjectStreams: true });
    return { bytes, fits: bytes.byteLength <= targetBytes, pages, bwPages, hardToRead };
  };

  try {
    let low = 0;
    let high = COLOUR_STEPS.length - 1;
    let best: TargetResult | null = null;
    while (low <= high) {
      const middle = (low + high) >> 1;
      const result: TargetResult | null = await build(middle, targetBytes);
      if (result && result.fits) {
        best = result;
        high = middle - 1;
      } else {
        low = middle + 1;
      }
    }
    return best || (await build(READABLE_STEP, Infinity))!;
  } finally {
    await source.destroy();
  }
}
