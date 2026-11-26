// Browser-only PDF compression helpers used by the PDF compressor and its size-target variants.
//
// Two strategies:
//  1. smartCompress  - keeps the PDF structure (text, links, forms, bookmarks) and only
//                      re-encodes embedded JPEG and lossless (PNG-style) images as smaller JPEGs.
//  2. rasterCompress - renders every page to a JPEG and rebuilds the PDF from those images.
//                      Smallest result for scanned files, but text is no longer selectable.

import { decodePDFRawStream, PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber, PDFRawStream, PDFRef } from "pdf-lib";
import type { PDFContext, PDFObject } from "pdf-lib";

export type CompressLevel = 1 | 2 | 3;

export const SMART_LEVELS: Record<CompressLevel, { maxSide: number; quality: number }> = {
  1: { maxSide: 2400, quality: 0.8 },
  2: { maxSide: 1600, quality: 0.65 },
  3: { maxSide: 1100, quality: 0.5 },
};

export const RASTER_LEVELS: Record<CompressLevel, { scale: number; quality: number }> = {
  1: { scale: 1.5, quality: 0.85 },
  2: { scale: 1.2, quality: 0.7 },
  3: { scale: 1.0, quality: 0.5 },
};

// Progressively harsher raster settings, used only when a size target must be reached.
export const RASTER_LADDER: { scale: number; quality: number }[] = [
  { scale: 1.0, quality: 0.5 },
  { scale: 0.85, quality: 0.4 },
  { scale: 0.7, quality: 0.35 },
  { scale: 0.55, quality: 0.3 },
];

export class EncryptedPdfError extends Error {
  constructor() {
    super("This PDF is password-protected. Unlock it with the PDF Unlock tool first, then compress it.");
    this.name = "EncryptedPdfError";
  }
}

const MIN_IMAGE_BYTES = 8 * 1024; // smaller images are not worth re-encoding
const MAX_LOSSLESS_PIXELS = 50_000_000; // larger ones could run the browser tab out of memory
// A lossless image is only turned into a JPEG when that saves a lot. Screenshots, charts and line art
// already compress well without loss, so they fail this test and stay sharp.
const LOSSLESS_MAX_RATIO = 0.7;

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function nameOf(obj: PDFObject | undefined): string {
  return obj instanceof PDFName ? obj.toString() : "";
}

function numberOf(obj: PDFObject | undefined): number {
  return obj instanceof PDFNumber ? obj.asNumber() : NaN;
}

function isSingleFilter(filter: PDFObject | undefined, name: "/DCTDecode" | "/FlateDecode"): boolean {
  if (filter instanceof PDFName) return filter.toString() === name;
  if (filter instanceof PDFArray && filter.size() === 1) return nameOf(filter.lookup(0)) === name;
  return false;
}

// 1 for gray, 3 for RGB, 0 for colour spaces that cannot be safely turned into a JPEG (CMYK, palette...).
function colorChannels(dict: PDFDict): 0 | 1 | 3 {
  const cs = dict.lookup(PDFName.of("ColorSpace"));
  const csName = nameOf(cs);
  if (csName === "/DeviceRGB") return 3;
  if (csName === "/DeviceGray") return 1;
  if (cs instanceof PDFArray && nameOf(cs.lookup(0)) === "/ICCBased") {
    const icc = cs.lookup(1);
    if (icc && "dict" in icc) {
      const n = numberOf((icc as PDFRawStream).dict.lookup(PDFName.of("N")));
      if (n === 1 || n === 3) return n;
    }
  }
  return 0;
}

// Returns how the image is stored when it can be safely re-encoded, otherwise null.
function imageKind(stream: PDFRawStream): "jpeg" | "lossless" | null {
  const dict = stream.dict;
  if (nameOf(dict.lookup(PDFName.of("Subtype"))) !== "/Image") return null;
  if (stream.contents.length < MIN_IMAGE_BYTES) return null;
  // Stencil masks, colour-key masks and inverted decode arrays would be corrupted by a re-encode.
  if (dict.has(PDFName.of("Decode")) || dict.has(PDFName.of("Mask")) || dict.has(PDFName.of("ImageMask"))) return null;
  if (!colorChannels(dict)) return null;

  const filter = dict.lookup(PDFName.of("Filter"));
  if (isSingleFilter(filter, "/DCTDecode")) return "jpeg";
  if (!isSingleFilter(filter, "/FlateDecode")) return null;
  if (numberOf(dict.lookup(PDFName.of("BitsPerComponent"))) !== 8) return null;
  // A "matte" soft mask must keep exactly the same size as its image, with unchanged colours.
  const smask = dict.lookup(PDFName.of("SMask"));
  if (smask instanceof PDFRawStream && smask.dict.has(PDFName.of("Matte"))) return null;
  return "lossless";
}

// Unpacks a Flate image into plain 8-bit samples, undoing the PNG or TIFF row predictor if one was used.
function readLosslessPixels(stream: PDFRawStream, width: number, height: number, channels: number): Uint8Array | null {
  let data: Uint8Array;
  try {
    data = decodePDFRawStream(stream).decode();
  } catch {
    return null;
  }
  let parms = stream.dict.lookup(PDFName.of("DecodeParms"));
  if (parms instanceof PDFArray) parms = parms.size() ? parms.lookup(0) : undefined;
  const param = (key: string, fallback: number) => {
    const value = parms instanceof PDFDict ? numberOf(parms.lookup(PDFName.of(key))) : NaN;
    return Number.isNaN(value) ? fallback : value;
  };

  const predictor = param("Predictor", 1);
  const rowBytes = width * channels;
  if (predictor === 1) return data.length >= rowBytes * height ? data : null;
  if (param("Colors", 1) !== channels || param("BitsPerComponent", 8) !== 8 || param("Columns", 1) !== width) return null;

  if (predictor === 2) {
    // TIFF: every sample is stored as the difference from the one to its left.
    if (data.length < rowBytes * height) return null;
    for (let y = 0; y < height; y++) {
      const row = y * rowBytes;
      for (let x = channels; x < rowBytes; x++) data[row + x] = (data[row + x] + data[row + x - channels]) & 255;
    }
    return data;
  }

  // PNG: each row starts with a byte that says which of five filters it uses.
  if (predictor < 10 || data.length < (rowBytes + 1) * height) return null;
  const out = new Uint8Array(rowBytes * height);
  for (let y = 0; y < height; y++) {
    const src = y * (rowBytes + 1);
    const dst = y * rowBytes;
    const type = data[src];
    if (type > 4) return null;
    for (let x = 0; x < rowBytes; x++) {
      const left = x >= channels ? out[dst + x - channels] : 0;
      const up = y > 0 ? out[dst + x - rowBytes] : 0;
      let add = 0;
      if (type === 1) add = left;
      else if (type === 2) add = up;
      else if (type === 3) add = (left + up) >> 1;
      else if (type === 4) {
        const upLeft = y > 0 && x >= channels ? out[dst + x - rowBytes - channels] : 0;
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        add = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
      }
      out[dst + x] = data[src + 1 + x] + add; // a Uint8Array wraps around at 256, as PNG expects
    }
  }
  return out;
}

async function jpegBitmap(jpeg: Uint8Array): Promise<ImageBitmap | null> {
  try {
    // 'none': PDF image data ignores EXIF orientation, so the browser must not rotate it.
    return await createImageBitmap(new Blob([jpeg as BlobPart], { type: "image/jpeg" }), {
      imageOrientation: "none",
    } as ImageBitmapOptions);
  } catch {
    return null;
  }
}

async function losslessBitmap(stream: PDFRawStream, width: number, height: number): Promise<ImageBitmap | null> {
  if (width * height > MAX_LOSSLESS_PIXELS) return null;
  const channels = colorChannels(stream.dict);
  const pixels = readLosslessPixels(stream, width, height, channels);
  if (!pixels) return null;
  try {
    const image = new ImageData(width, height);
    const rgba = image.data;
    const step = channels === 3 ? 1 : 0; // gray repeats the same sample for red, green and blue
    for (let o = 0, p = 0; o < rgba.length; o += 4, p += channels) {
      rgba[o] = pixels[p];
      rgba[o + 1] = pixels[p + step];
      rgba[o + 2] = pixels[p + step * 2];
      rgba[o + 3] = 255;
    }
    return await createImageBitmap(image);
  } catch {
    return null;
  }
}

// Draws the picture at the new size and saves it as a JPEG. Closes the bitmap.
async function encodeJpeg(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  maxSide: number,
  quality: number
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  const nw = Math.max(1, Math.round(width * scale));
  const nh = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = nw;
  canvas.height = nh;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return null;
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, nw, nh);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, nw, nh);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  canvas.width = 0;
  canvas.height = 0;
  if (!blob) return null;
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: nw, height: nh };
}

// Some generators (jsPDF among them) store pixels with no compression at all. Zipping them costs no quality,
// and afterwards they are ordinary lossless images. Returns the objects that became smaller.
function packRawImages(context: PDFContext): Set<PDFRef> {
  const packed = new Set<PDFRef>();
  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream) || obj.contents.length < MIN_IMAGE_BYTES) continue;
    const dict = obj.dict;
    if (nameOf(dict.lookup(PDFName.of("Subtype"))) !== "/Image" || dict.has(PDFName.of("Filter"))) continue;
    const bytes = context.flateStream(obj.contents).contents;
    if (bytes.length >= obj.contents.length) continue;
    dict.set(PDFName.of("Filter"), PDFName.of("FlateDecode"));
    dict.set(PDFName.of("Length"), PDFNumber.of(bytes.length));
    context.assign(ref, PDFRawStream.of(dict, bytes));
    packed.add(ref);
  }
  return packed;
}

export interface SmartResult {
  bytes: Uint8Array;
  imagesTotal: number;
  imagesShrunk: number;
}

export async function smartCompress(
  input: Uint8Array,
  level: CompressLevel,
  onProgress?: (pct: number) => void
): Promise<SmartResult> {
  const { maxSide, quality } = SMART_LEVELS[level];
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(input, { updateMetadata: false });
  } catch (err) {
    if (err instanceof Error && /encrypted/i.test(err.message)) throw new EncryptedPdfError();
    throw err;
  }
  const context: PDFContext = doc.context;

  const packed = packRawImages(context);
  const objects = context.enumerateIndirectObjects();
  // Transparency masks are images too, but they must stay exactly as they are (grayscale, no JPEG halos).
  const masks = new Set<PDFObject>();
  for (const [, obj] of objects) {
    if (!(obj instanceof PDFRawStream)) continue;
    for (const key of ["SMask", "Mask"]) {
      const mask = obj.dict.lookup(PDFName.of(key));
      if (mask) masks.add(mask);
    }
  }

  const images: [PDFRef, PDFRawStream, "jpeg" | "lossless"][] = [];
  for (const [ref, obj] of objects) {
    if (!(obj instanceof PDFRawStream) || masks.has(obj)) continue;
    const kind = imageKind(obj);
    if (kind) images.push([ref, obj, kind]);
  }

  let shrunk = 0;
  for (let i = 0; i < images.length; i++) {
    const [ref, stream, kind] = images[i];
    const width = numberOf(stream.dict.lookup(PDFName.of("Width")));
    const height = numberOf(stream.dict.lookup(PDFName.of("Height")));
    if (width > 0 && height > 0) {
      const bitmap =
        kind === "jpeg" ? await jpegBitmap(stream.contents) : await losslessBitmap(stream, width, height);
      const out = bitmap ? await encodeJpeg(bitmap, width, height, maxSide, quality) : null;
      // Only swap the image when the new one is clearly smaller.
      const maxRatio = kind === "jpeg" ? 0.95 : LOSSLESS_MAX_RATIO;
      if (out && out.bytes.length < stream.contents.length * maxRatio) {
        const dict = stream.dict;
        // The JPEG is always three-channel. A lossless RGB image keeps its colour profile, because its
        // sample values were copied unchanged.
        if (kind === "jpeg" || colorChannels(dict) !== 3) {
          dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
        }
        dict.set(PDFName.of("Width"), PDFNumber.of(out.width));
        dict.set(PDFName.of("Height"), PDFNumber.of(out.height));
        dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
        dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
        dict.delete(PDFName.of("DecodeParms"));
        dict.set(PDFName.of("Length"), PDFNumber.of(out.bytes.length));
        context.assign(ref, PDFRawStream.of(dict, out.bytes));
        shrunk++;
      } else if (packed.has(ref)) {
        shrunk++;
      }
    }
    onProgress?.(Math.round(((i + 1) / images.length) * 90));
    await tick();
  }

  const bytes = await doc.save({ useObjectStreams: true });
  onProgress?.(100);
  return { bytes, imagesTotal: images.length, imagesShrunk: shrunk };
}

async function loadPdfJs() {
  const cdnUrl = "/vendor/pdfjs-4.0.379/pdf.mjs";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs-4.0.379/pdf.worker.mjs";
  return pdfjsLib;
}

export async function rasterCompress(
  input: Uint8Array,
  scale: number,
  quality: number,
  onProgress?: (pct: number) => void
): Promise<Uint8Array> {
  const pdfjsLib = await loadPdfJs();
  const copy = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength);
  let pdfDoc;
  try {
    pdfDoc = await pdfjsLib.getDocument({ data: copy }).promise;
  } catch (err) {
    if (err && (err as { name?: string }).name === "PasswordException") throw new EncryptedPdfError();
    throw err;
  }
  const totalPages: number = pdfDoc.numPages;
  const outDoc = await PDFDocument.create();

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, canvas, viewport }).promise;

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (!blob) throw new Error("Could not encode page image");
    const jpg = await outDoc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const { width, height } = page.getViewport({ scale: 1 });
    const pdfPage = outDoc.addPage([width, height]);
    pdfPage.drawImage(jpg, { x: 0, y: 0, width, height });

    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
    onProgress?.(Math.round((pageNum / totalPages) * 100));
    await tick();
  }

  await pdfDoc.destroy();
  return outDoc.save();
}
