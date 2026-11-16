// Browser-only PDF compression helpers used by the PDF compressor and its size-target variants.
//
// Two strategies:
//  1. smartCompress  - keeps the PDF structure (text, links, forms, bookmarks) and only
//                      re-encodes embedded JPEG images at a lower quality / resolution.
//  2. rasterCompress - renders every page to a JPEG and rebuilds the PDF from those images.
//                      Smallest result for scanned files, but text is no longer selectable.

import { PDFArray, PDFDocument, PDFName, PDFNumber, PDFRawStream, PDFRef } from "pdf-lib";
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

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function nameOf(obj: PDFObject | undefined): string {
  return obj instanceof PDFName ? obj.toString() : "";
}

function numberOf(obj: PDFObject | undefined): number {
  return obj instanceof PDFNumber ? obj.asNumber() : NaN;
}

function isSingleDct(filter: PDFObject | undefined): boolean {
  if (filter instanceof PDFName) return filter.toString() === "/DCTDecode";
  if (filter instanceof PDFArray && filter.size() === 1) return nameOf(filter.lookup(0)) === "/DCTDecode";
  return false;
}

// Returns true when the image is a plain 8-bit gray/RGB JPEG that can be safely re-encoded.
function isRecompressibleJpeg(stream: PDFRawStream): boolean {
  const dict = stream.dict;
  if (nameOf(dict.lookup(PDFName.of("Subtype"))) !== "/Image") return false;
  if (!isSingleDct(dict.lookup(PDFName.of("Filter")))) return false;
  if (stream.contents.length < MIN_IMAGE_BYTES) return false;
  // Stencil masks, colour-key masks and inverted decode arrays would be corrupted by a re-encode.
  if (dict.has(PDFName.of("Decode")) || dict.has(PDFName.of("Mask")) || dict.has(PDFName.of("ImageMask"))) return false;

  const cs = dict.lookup(PDFName.of("ColorSpace"));
  const csName = nameOf(cs);
  if (csName === "/DeviceRGB" || csName === "/DeviceGray") return true;
  if (cs instanceof PDFArray && nameOf(cs.lookup(0)) === "/ICCBased") {
    const icc = cs.lookup(1);
    if (icc && "dict" in icc) {
      const n = numberOf((icc as PDFRawStream).dict.lookup(PDFName.of("N")));
      return n === 1 || n === 3;
    }
  }
  return false;
}

async function reencodeJpeg(
  jpeg: Uint8Array,
  width: number,
  height: number,
  maxSide: number,
  quality: number
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  let bitmap: ImageBitmap;
  try {
    // 'none': PDF image data ignores EXIF orientation, so the browser must not rotate it.
    bitmap = await createImageBitmap(new Blob([jpeg as BlobPart], { type: "image/jpeg" }), {
      imageOrientation: "none",
    } as ImageBitmapOptions);
  } catch {
    return null;
  }
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
  ctx.drawImage(bitmap, 0, 0, nw, nh);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  canvas.width = 0;
  canvas.height = 0;
  if (!blob) return null;
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: nw, height: nh };
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

  const images: [PDFRef, PDFRawStream][] = [];
  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream && isRecompressibleJpeg(obj)) images.push([ref, obj]);
  }

  let shrunk = 0;
  for (let i = 0; i < images.length; i++) {
    const [ref, stream] = images[i];
    const width = numberOf(stream.dict.lookup(PDFName.of("Width")));
    const height = numberOf(stream.dict.lookup(PDFName.of("Height")));
    if (width > 0 && height > 0) {
      const out = await reencodeJpeg(stream.contents, width, height, maxSide, quality);
      // Only swap the image when the new one is clearly smaller.
      if (out && out.bytes.length < stream.contents.length * 0.95) {
        const dict = stream.dict;
        dict.set(PDFName.of("Width"), PDFNumber.of(out.width));
        dict.set(PDFName.of("Height"), PDFNumber.of(out.height));
        dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
        dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
        dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
        dict.set(PDFName.of("Length"), PDFNumber.of(out.bytes.length));
        context.assign(ref, PDFRawStream.of(dict, out.bytes));
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
  const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
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
