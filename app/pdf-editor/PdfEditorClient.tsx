"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/DropZone";
import {
  Canvas as FabricCanvas,
  Rect,
  Circle,
  Line,
  Textbox,
  PencilBrush,
  FabricImage,
  FabricObject,
  Triangle,
  Group,
} from "fabric";
import { PDFDocument } from "pdf-lib";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tool =
  | "select"
  | "text"
  | "editText"
  | "image"
  | "draw"
  | "highlight"
  | "rect"
  | "circle"
  | "line"
  | "arrow"
  | "eraser"
  | "whiteout";

interface TextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number; // in viewport pixels (scaled)
  fontSizePt: number; // in PDF points (unscaled)
  color: string; // text colour read from the rendered page
  bgColor?: string; // colour behind the text (the edit cover uses it); undefined = plain white
  fontWeight: string; // "normal" or "bold"
  fontStyle: string; // "normal" or "italic"
  lossy?: boolean; // the PDF could not map some glyphs back to text (they were dropped)
  coverLeft?: number; // the white cover must reach this far left/right (unmapped glyphs next to the text)
  coverRight?: number;
}

interface EditableTextData {
  type: "editableText";
  itemKey?: number; // index of the source text item in PageData.textItems
  originalText: string;
  changed: boolean;
  originalFontSize: number; // viewport px
  originalFontSizePt: number; // PDF points
  originalFontWeight: string;
  originalFontStyle: string;
  originalFill: string;
}

interface TextCoverData {
  type: "textCover";
  itemKey?: number;
  originalText: string;
}

interface TextHotspotData {
  type: "textHotspot";
  itemKey?: number;
  originalText: string;
}

interface PageData {
  id: string; // stable identity, survives reordering and deleting other pages
  srcIndex: number | null; // page index in the original PDF (null for pages added in the editor)
  dataUrl: string; // rendered page as PNG data-url (without text)
  width: number;
  height: number;
  fabricJson: string | null; // serialised fabric canvas state
  thumb?: string; // sidebar thumbnail that includes the edits (absent = show the plain page image)
  textItems: TextItem[]; // extracted text items with positions
  scale: number; // render scale used
  loaded: boolean; // whether the page has been fully rendered
}

type CanvasTargetLike = FabricObject & {
  text?: string;
  enterEditing?: () => void;
  hiddenTextarea?: HTMLTextAreaElement | null;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ZOOM_STEP = 0.15;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const THUMBNAIL_HEIGHT = 120;
const THUMBNAIL_RENDER_WIDTH = 300; // px; sidebar thumbnails are drawn at ~150 css px, so 2x for sharp screens
const DELETED_PAGE_NOTICE_MS = 30000; // how long the "Page deleted - Undo" bar stays up
const MOBILE_QUERY = "(max-width: 767px)";

// Every page is rendered at this many canvas px per PDF point (1 pt = 1/72 inch).
// Font sizes are shown to the user in points and stored on canvas objects in canvas px.
const RENDER_SCALE = 1.5;
const MIN_FONT_PT = 4;
const MAX_FONT_PT = 200;
const DEFAULT_TEXT_PT = 12;

/** Canvas px -> PDF points, rounded to 0.1 for display. */
function pxToPt(px: number, scale: number = RENDER_SCALE): number {
  return Math.round((px / scale) * 10) / 10;
}

/** PDF points -> canvas px (no rounding, so 13 pt stays exactly 13 pt). */
function ptToPx(pt: number, scale: number = RENDER_SCALE): number {
  return pt * scale;
}

// Fabric only serialises known properties. Without this, `data` (which marks edited PDF text,
// covers and hotspots) is dropped by toJSON(), so edits cannot be restored after a reload.
if (!FabricObject.customProperties.includes("data")) {
  FabricObject.customProperties = [...FabricObject.customProperties, "data"];
}

/**
 * Canvas state as JSON without the page background. The background is the full page PNG, so keeping it
 * in every undo snapshot would cost megabytes per step; it is always re-applied from PageData on load.
 */
function serializeCanvas(fc: FabricCanvas): string {
  const obj = fc.toObject() as Record<string, unknown>;
  delete obj.backgroundImage;
  return JSON.stringify(obj);
}

/**
 * True when a canvas snapshot holds something the user made: an annotation, or PDF text they changed.
 * Merely clicking a line (opens an editing box that is still identical to the original) is not an edit.
 */
function snapshotHasRealEdits(json: string | undefined | null): boolean {
  if (!json) return false;
  try {
    const parsed = JSON.parse(json) as { objects?: { data?: { type?: string; changed?: boolean } }[] };
    return (parsed.objects ?? []).some((o) => !o.data || (o.data.type === "editableText" && o.data.changed === true));
  } catch {
    return true; // cannot tell: assume there is something to lose
  }
}

let pageIdCounter = 0;
const newPageId = () => `page-${++pageIdCounter}-${Math.random().toString(36).slice(2, 7)}`;

/** Pick a canvas font family close to the PDF font, so edited text does not turn into a different typeface. */
function pickFontFamily(pdfFontName: string, styleFamily?: string): string {
  const name = (pdfFontName || "").toLowerCase();
  const family = (styleFamily || "").toLowerCase();
  if (/courier|mono|consolas|typewriter/.test(name) || family.includes("monospace")) {
    return '"Courier New", Courier, monospace';
  }
  const looksSerif = /times|georgia|garamond|palatino|bookman|cambria|minion|serif/.test(name) && !/sans/.test(name);
  if (looksSerif || family === "serif") {
    return '"Times New Roman", Times, serif';
  }
  return "Helvetica, Arial, sans-serif";
}

/** True when an edited copy of existing PDF text differs from the original (text, size, weight, style or color). */
function isEditableTextChanged(textbox: FabricObject): boolean {
  const data = textbox.get("data") as EditableTextData | undefined;
  if (!data || data.type !== "editableText") return false;
  const tb = textbox as FabricObject & { text?: string; fontSize?: number; fontWeight?: string | number; fontStyle?: string };
  return (
    (tb.text || "").trim() !== data.originalText.trim() ||
    Math.abs((tb.fontSize || 0) - data.originalFontSize) > 0.01 ||
    String(tb.fontWeight || "normal") !== data.originalFontWeight ||
    String(tb.fontStyle || "normal") !== data.originalFontStyle ||
    String(tb.fill || "") !== data.originalFill
  );
}

function mergeNearbyTextItems(items: TextItem[]) {
  if (items.length <= 1) return items;

  // Step 1: Group items into lines based on Y proximity
  const lines: TextItem[][] = [];
  const used = new Array(items.length).fill(false);

  // Sort by Y first to help grouping
  const byY = items.map((item, i) => ({ item, i })).sort((a, b) => a.item.y - b.item.y);

  for (let i = 0; i < byY.length; i++) {
    if (used[byY[i].i]) continue;
    const line: TextItem[] = [byY[i].item];
    used[byY[i].i] = true;
    const refY = byY[i].item.y;
    const refH = byY[i].item.height;

    // Find all items on the same visual line
    for (let j = i + 1; j < byY.length; j++) {
      if (used[byY[j].i]) continue;
      const other = byY[j].item;
      const yTolerance = Math.max(8, Math.max(refH, other.height) * 0.7);
      if (Math.abs(other.y - refY) <= yTolerance) {
        const heightTolerance = Math.max(8, Math.min(refH, other.height) * 0.75);
        if (Math.abs(other.height - refH) <= heightTolerance) {
          line.push(other);
          used[byY[j].i] = true;
        }
      } else if (other.y - refY > yTolerance + refH) {
        break; // too far below, stop looking
      }
    }

    // Sort line items by X position
    line.sort((a, b) => a.x - b.x);
    lines.push(line);
  }

  // Step 2: Merge ALL items on each line into one item.
  // Since Step 1 already verified Y proximity + similar height,
  // everything on the same line belongs together as one selectable unit.
  // Only split if there's a truly massive gap (>40% of page width)
  // which indicates separate columns.
  const merged: TextItem[] = [];

  for (const line of lines) {
    let current = { ...line[0] };
    // Estimate page width from the rightmost item
    const lineRight = Math.max(...line.map((it) => it.x + it.width));
    const lineWidth = lineRight - line[0].x;
    const columnGapThreshold = Math.max(100, lineWidth * 0.4);

    for (let i = 1; i < line.length; i++) {
      const item = line[i];
      const currentRight = current.x + current.width;
      const gap = item.x - currentRight;

      // Only split for column-level gaps (very large horizontal distance)
      if (gap > columnGapThreshold) {
        merged.push(current);
        current = { ...item };
      } else {
        const needsSpace = gap > Math.max(2, item.fontSize * 0.15) && !current.str.endsWith(" ") && !item.str.startsWith(" ");
        current.str = `${current.str}${needsSpace ? " " : ""}${item.str}`;
        current.width = Math.max(currentRight, item.x + item.width) - current.x;
        current.height = Math.max(current.height, item.height);
        current.fontSize = Math.max(current.fontSize, item.fontSize);
        current.fontSizePt = Math.max(current.fontSizePt, item.fontSizePt);
        // Preserve bold/italic if any fragment has it
        if (item.fontWeight === "bold") current.fontWeight = "bold";
        if (item.fontStyle === "italic") current.fontStyle = "italic";
        if (item.lossy) current.lossy = true;
        if (item.coverLeft !== undefined || current.coverLeft !== undefined) {
          current.coverLeft = Math.min(current.coverLeft ?? current.x, item.coverLeft ?? item.x);
        }
        if (item.coverRight !== undefined || current.coverRight !== undefined) {
          current.coverRight = Math.max(current.coverRight ?? currentRight, item.coverRight ?? item.x + item.width);
        }
      }
    }

    merged.push(current);
  }

  // Sort final result by Y then X
  merged.sort((a, b) => {
    if (Math.abs(a.y - b.y) > 4) return a.y - b.y;
    return a.x - b.x;
  });

  return merged;
}

function resolveFabricTarget(result: unknown): CanvasTargetLike | null {
  if (!result || typeof result !== "object") return null;

  if ("target" in result) {
    const maybeTarget = (result as { target?: unknown }).target;
    return maybeTarget && typeof maybeTarget === "object" ? (maybeTarget as CanvasTargetLike) : null;
  }

  return "get" in result ? (result as CanvasTargetLike) : null;
}

/** Hit tolerance (screen px) for thin annotations such as lines, arrows and pen strokes. */
const THIN_HIT_TOLERANCE_PX = 8;
// Scripts whose glyphs reach far above/below the line box (Indic, Thai/Lao, Myanmar, Arabic).
const COMPLEX_SCRIPT_RE = /[؀-ۿऀ-໿က-႟]/;
// Space kept between an edited line and the right page edge before the text wraps.
const EDIT_RIGHT_MARGIN_PX = 24;

/**
 * Fabric only hits a line within its own 2px box, which is almost impossible to click.
 * Find the topmost plain annotation (no PDF text/cover/hotspot data) whose bounding box,
 * grown by a small tolerance, contains the point.
 */
function findAnnotationNear(fc: FabricCanvas, point: { x: number; y: number }): FabricObject | null {
  const tol = THIN_HIT_TOLERANCE_PX / (fc.getZoom() || 1);
  const objects = fc.getObjects();
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    if (!obj.visible || obj.get("data")) continue;
    const b = obj.getBoundingRect();
    if (point.x >= b.left - tol && point.x <= b.left + b.width + tol && point.y >= b.top - tol && point.y <= b.top + b.height + tol) {
      return obj;
    }
  }
  return null;
}

/** Colour shown in the properties panel; an arrow (group) reports the colour of its shaft. */
function panelColor(obj: FabricObject, prop: "fill" | "stroke"): string {
  const source = obj instanceof Group ? obj.getObjects()[0] ?? obj : obj;
  const value = source.get(prop);
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : "#000000";
}

const toHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

/**
 * pdf.js gives no colour for text, so read it from the rendered page: the most common colour in a
 * line's box is the background, and the most common colour among the pixels furthest from it is the
 * ink. Without this every edited line turned black (and white-on-dark text got a white cover).
 * Lines whose background is not a flat colour (photos, gradients) keep the plain black-on-white default.
 */
function sampleTextColors(ctx: CanvasRenderingContext2D, items: TextItem[]) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, width, height).data;
  } catch {
    return; // canvas not readable: keep the defaults
  }

  for (const item of items) {
    const x0 = Math.max(0, Math.floor(item.x));
    const x1 = Math.min(width, Math.ceil(item.x + item.width));
    const y0 = Math.max(0, Math.floor(item.y));
    const y1 = Math.min(height, Math.ceil(item.y + item.height));
    if (x1 - x0 < 2 || y1 - y0 < 2) continue;

    // Background: dominant colour bucket (5 bits per channel), averaged exactly.
    const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
    let total = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
        const bucket = buckets.get(key);
        if (bucket) {
          bucket.n++;
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
        } else {
          buckets.set(key, { n: 1, r, g, b });
        }
        total++;
      }
    }
    let top: { n: number; r: number; g: number; b: number } | null = null;
    for (const bucket of Array.from(buckets.values())) if (!top || bucket.n > top.n) top = bucket;
    if (!top || top.n / total < 0.3) continue;

    const bgR = Math.round(top.r / top.n);
    const bgG = Math.round(top.g / top.n);
    const bgB = Math.round(top.b / top.n);
    item.bgColor = bgR >= 250 && bgG >= 250 && bgB >= 250 ? "#ffffff" : toHex(bgR, bgG, bgB);

    // Ink: the exact colour that occurs most among the pixels furthest from the background.
    let maxDist = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 4;
        const d = Math.abs(data[i] - bgR) + Math.abs(data[i + 1] - bgG) + Math.abs(data[i + 2] - bgB);
        if (d > maxDist) maxDist = d;
      }
    }
    if (maxDist < 120) continue; // no readable ink found: keep the default text colour
    const cutoff = maxDist * 0.8;
    const counts = new Map<number, number>();
    let best = 0;
    let bestCount = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 4;
        const d = Math.abs(data[i] - bgR) + Math.abs(data[i + 1] - bgG) + Math.abs(data[i + 2] - bgB);
        if (d < cutoff) continue;
        const key = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
        const count = (counts.get(key) ?? 0) + 1;
        counts.set(key, count);
        if (count > bestCount) {
          bestCount = count;
          best = key;
        }
      }
    }
    let r = (best >> 16) & 255;
    let g = (best >> 8) & 255;
    let b = best & 255;
    // Thin black text is anti-aliased and may never reach pure black: snap near-black to black.
    if (r <= 32 && g <= 32 && b <= 32) {
      r = 0;
      g = 0;
      b = 0;
    }
    item.color = toHex(r, g, b);
  }
}

async function extractTextItemsFromTextLayer(
  pdfjsLib: any,
  page: any,
  viewport: any,
  renderedCtx?: CanvasRenderingContext2D
) {
  const textContent = await page.getTextContent();
  if (typeof window === "undefined") return [];

  const items: TextItem[] = [];
  const unmapped: { baseline: number; x: number; width: number }[] = [];
  for (const item of textContent.items) {
    if (!("str" in item)) continue;
    // Gujarati/Hindi PDFs often have glyphs (such as the short "i" sign) with no text mapping;
    // pdf.js reports those as NUL characters. Drop them, but remember the line lost something.
    const lossy = item.str.includes("\u0000");
    const str: string = lossy ? item.str.replace(/\u0000/g, "") : item.str;
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    if (!str.trim()) {
      // A piece that was nothing but unmapped glyphs: remember where, so the line it belongs to is flagged.
      if (lossy) unmapped.push({ baseline: tx[5], x: tx[4], width: (item.width || 0) * viewport.scale });
      continue;
    }
    const style = textContent.styles?.[item.fontName];
    const fontHeight = Math.hypot(tx[2], tx[3]);
    const ascent = style?.ascent
      ? style.ascent * fontHeight
      : style?.descent
        ? (1 + style.descent) * fontHeight
        : fontHeight * 0.8;

    // pdf.js ids like "g_d0_f1" say nothing about the font; once the page is rendered the real
    // BaseFont name (for example "ABCDEF+Arial-BoldMT") is available from commonObjs.
    let realFontName: string = item.fontName || "";
    try {
      if (page.commonObjs?.has(item.fontName)) {
        realFontName = page.commonObjs.get(item.fontName)?.name || realFontName;
      }
    } catch {
      // font object not resolved; keep the pdf.js id
    }

    // Detect bold/italic from PDF font name
    const fn = realFontName.toLowerCase();
    const isBold = fn.includes("bold") || fn.includes("heavy") || fn.includes("black");
    const isItalic = fn.includes("italic") || fn.includes("oblique");

    items.push({
      str,
      lossy,
      x: tx[4],
      y: tx[5] - ascent,
      width: Math.max(item.width * viewport.scale, str.length * fontHeight * 0.45),
      height: fontHeight,
      fontFamily: pickFontFamily(realFontName, style?.fontFamily),
      fontSize: parseFloat(fontHeight.toFixed(2)),
      fontSizePt: parseFloat((fontHeight / viewport.scale).toFixed(2)),
      color: "#000000",
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
    });
  }

  // Flag the line each unmapped piece sat on (its baseline falls inside that line's box) and let the
  // white cover reach it, so the glyphs that have no text are hidden too (the text itself is unchanged).
  for (const piece of unmapped) {
    for (const entry of items) {
      if (piece.baseline < entry.y - 2 || piece.baseline > entry.y + entry.height * 1.3) continue;
      const nearLeft = piece.x + piece.width >= entry.x - entry.height * 2;
      const nearRight = piece.x <= entry.x + entry.width + entry.height * 2;
      if (!nearLeft || !nearRight) continue;
      entry.lossy = true;
      entry.coverLeft = Math.min(entry.coverLeft ?? entry.x, piece.x);
      entry.coverRight = Math.max(entry.coverRight ?? entry.x + entry.width, piece.x + piece.width);
    }
  }

  const merged = mergeNearbyTextItems(items);
  if (renderedCtx) sampleTextColors(renderedCtx, merged);
  return merged;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Point-size input. Always shows the real current size (never a stale value), lets the user
 * type multi-digit numbers freely (a draft is kept while typing), and applies every valid value live.
 */
function PtInput({
  value,
  onCommit,
  className,
  min = MIN_FONT_PT,
  max = MAX_FONT_PT,
  ariaLabel,
}: {
  value: number;
  onCommit: (pt: number) => void;
  className?: string;
  min?: number;
  max?: number;
  ariaLabel?: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      type="number"
      min={min}
      max={max}
      step={1}
      aria-label={ariaLabel}
      value={draft ?? String(value)}
      onChange={(e) => {
        setDraft(e.target.value);
        const n = parseFloat(e.target.value);
        if (Number.isFinite(n) && n >= min && n <= max) onCommit(n);
      }}
      onBlur={() => setDraft(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
      className={className}
    />
  );
}

export default function PdfEditorClient() {
  /* --- state --- */
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [pages, setPages] = useState<PageData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  // Canvas px per PDF point for the page being edited (used to convert font sizes to/from points).
  const pageScale = pages[currentPage]?.scale ?? RENDER_SCALE;
  const [zoom, setZoom] = useState(1);
  const zoomPerPageRef = useRef<Map<number, number>>(new Map());
  // Latest zoom for async loaders; zoom changes alone must never reload (and so reset) the canvas.
  const zoomRef = useRef(1);
  zoomRef.current = zoom;

  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [fontSize, setFontSize] = useState(DEFAULT_TEXT_PT); // text tool size, in PDF points
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);

  const [saving, setSaving] = useState(false);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  const [textEditMode, setTextEditMode] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);
  const isLoadingPage = useRef(false);
  // Which page (by stable id) the fabric canvas currently shows, and with which load settings.
  const loadedPageIdRef = useRef<string | null>(null);
  const loadedSignatureRef = useRef("");
  const loadSeq = useRef(0);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfjsLibRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);

  const clipboardRef = useRef<string | null>(null);
  const bgImageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // The current page changed since its thumbnail was last drawn.
  const thumbDirtyRef = useRef(false);
  // Anything (an annotation, an edit, page add/move/delete) changed since the file was opened or saved.
  const docDirtyRef = useRef(false);
  // Pages removed with the sidebar button, newest last; "Undo" on the notice brings the last one back.
  const deletedPagesRef = useRef<{ page: PageData; index: number }[]>([]);
  const deletedNoticeTimer = useRef<number | null>(null);
  const [deletedNotice, setDeletedNotice] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);

  const createBackgroundImage = useCallback(async (dataUrl: string, width: number, height: number) => {
    // Use cached HTMLImageElement to avoid re-decoding the base64 data URL
    let htmlImg = bgImageCacheRef.current.get(dataUrl);
    if (!htmlImg) {
      htmlImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = dataUrl;
      });
      bgImageCacheRef.current.set(dataUrl, htmlImg);
    }

    const img = new FabricImage(htmlImg);
    const naturalWidth = img.width || width;
    const naturalHeight = img.height || height;

    img.set({
      left: 0,
      top: 0,
      originX: "left",
      originY: "top",
      selectable: false,
      evented: false,
      scaleX: width / naturalWidth,
      scaleY: height / naturalHeight,
    });

    return img;
  }, []);

  const applyCanvasZoom = useCallback((canvas: FabricCanvas, pageData: PageData, nextZoom: number) => {
    canvas.setViewportTransform([nextZoom, 0, 0, nextZoom, 0, 0]);
    canvas.setDimensions({
      width: pageData.width * nextZoom,
      height: pageData.height * nextZoom,
    });
    canvas.renderAll();
  }, []);

  const getFittedZoom = useCallback((pageData: PageData, mode: "page" | "width" = "page") => {
    if (!containerRef.current) return 0.5;

    const compact = typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
    const edgePadding = compact ? 24 : 64;
    const cw = Math.max(containerRef.current.clientWidth - edgePadding, 160);
    const ch = Math.max(containerRef.current.clientHeight - edgePadding, 160);
    const widthZoom = cw / pageData.width;
    const heightZoom = ch / pageData.height;
    const nextZoom = compact || mode === "width" ? widthZoom : Math.min(widthZoom, heightZoom);

    return Math.min(Math.max(nextZoom, MIN_ZOOM), 1);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const syncCompactLayout = () => {
      const compact = mediaQuery.matches;
      setIsCompact(compact);
      if (compact) {
        setShowThumbnails(false);
        setShowProperties(false);
      }
    };

    syncCompactLayout();
    mediaQuery.addEventListener("change", syncCompactLayout);
    return () => mediaQuery.removeEventListener("change", syncCompactLayout);
  }, []);

  const createCover = useCallback((item: TextItem, key: number) => {
    // Indic, Thai, Arabic... scripts have marks well above and below the line box; a Latin-sized
    // cover would leave pieces of the old glyphs showing around the new text.
    const tall = COMPLEX_SCRIPT_RE.test(item.str);
    const padTop = tall ? item.height * 0.3 : 2;
    const padBottom = tall ? item.height * 0.5 : 4;
    const coverL = Math.min(item.x, item.coverLeft ?? item.x);
    const coverR = Math.max(item.x + item.width, item.coverRight ?? 0);
    return new Rect({
      left: coverL - 2,
      top: item.y - padTop,
      width: coverR - coverL + 6,
      height: item.height + padTop + padBottom,
      originX: "left",
      originY: "top",
      fill: item.bgColor ?? "#ffffff",
      selectable: false,
      evented: false,
      visible: false,
      excludeFromExport: true,
      data: { type: "textCover", itemKey: key, originalText: item.str } satisfies TextCoverData,
    });
  }, []);

  // Invisible click target over a piece of original PDF text (only active in Edit Text mode).
  const createHotspot = useCallback((item: TextItem, key: number) => {
    return new Rect({
      left: item.x,
      top: item.y,
      width: item.width + 2,
      height: item.height + 2,
      originX: "left",
      originY: "top",
      fill: "transparent",
      stroke: "transparent",
      strokeWidth: 1,
      strokeDashArray: [4, 3],
      opacity: 0,
      selectable: false,
      evented: true,
      hoverCursor: "text",
      rx: 2,
      ry: 2,
      excludeFromExport: true,
      data: { type: "textHotspot", itemKey: key, originalText: item.str } satisfies TextHotspotData,
    });
  }, []);

  const createEditableTextObjects = useCallback((item: TextItem, key: number) => {
    const cover = createCover(item, key);

    // Use the exact viewport-pixel fontSize — no rounding.
    // The pt size is stored in data for display in the toolbar.
    const textbox = new Textbox(item.str, {
      left: item.x,
      top: item.y,
      originX: "left",
      originY: "top",
      fontSize: item.fontSize,
      lineHeight: 1,
      fill: item.color,
      fontFamily: item.fontFamily || "Helvetica, Arial, sans-serif",
      fontWeight: item.fontWeight || "normal",
      fontStyle: (item.fontStyle || "normal") as "" | "normal" | "italic" | "oblique",
      width: Math.max(item.width + 4, item.str.length * item.fontSize * 0.55),
      editable: true,
      backgroundColor: "transparent",
      borderColor: "#3B82F6",
      cornerColor: "#3B82F6",
      borderDashArray: [8, 6],
      cornerSize: 6,
      transparentCorners: false,
      padding: 0,
      hasControls: true,
      lockScalingFlip: true,
      excludeFromExport: false,
      data: {
        type: "editableText",
        itemKey: key,
        originalText: item.str,
        changed: false,
        originalFontSize: item.fontSize,
        originalFontSizePt: item.fontSizePt,
        originalFontWeight: item.fontWeight || "normal",
        originalFontStyle: item.fontStyle || "normal",
        originalFill: item.color,
      } satisfies EditableTextData,
    });

    return { cover, textbox };
  }, [createCover]);

  // Links an edited-text box to its white cover and keeps the "edited" bookkeeping in sync.
  // Called for a fresh box (click on a hotspot) and again for boxes restored from saved JSON.
  const wireEditable = useCallback((fc: FabricCanvas, textbox: Textbox, cover: FabricObject, item: TextItem, key: number) => {
    (textbox as any).__coverRef = cover;

    const syncEditedState = () => {
      // Leaving edit mode fires both "editing:exited" and "modified"; the second call must not
      // run again once the box has been removed, or the hotspot would be added twice.
      if (!fc.getObjects().includes(textbox)) return;
      const tbData = textbox.get("data") as EditableTextData;
      // Text, size, bold/italic or color changes all count as an edit (not just the characters).
      const changed = isEditableTextChanged(textbox);

      textbox.set("data", { ...tbData, changed } satisfies EditableTextData);

      if (changed) {
        // Text was modified — keep cover visible, keep textbox on canvas
        cover.set({ visible: true, excludeFromExport: false });
      } else if (!textbox.isEditing) {
        // Unchanged and not editing — restore the hotspot, remove the textbox
        fc.remove(cover);
        fc.remove(textbox);
        fc.add(createHotspot(item, key));
      }

      fc.requestRenderAll();
    };

    textbox.on("editing:entered", () => {
      cover.set({ visible: true, excludeFromExport: false });
      // A line of text must not wrap onto the line below while it is being typed: let the box
      // reach the right page margin (it shrinks back to the text when editing ends).
      const pageWidth = fc.getWidth() / (fc.getZoom() || 1);
      const room = pageWidth - (textbox.left ?? 0) - EDIT_RIGHT_MARGIN_PX;
      if (room > (textbox.width ?? 0)) {
        textbox.set({ width: room });
        textbox.initDimensions();
        textbox.setCoords();
      }
      fc.requestRenderAll();
    });
    textbox.on("editing:exited", () => {
      if (!fc.getObjects().includes(textbox)) return;
      const fitted = Math.ceil(textbox.calcTextWidth()) + 4;
      if (fitted < (textbox.width ?? 0)) {
        textbox.set({ width: fitted });
        textbox.initDimensions();
        textbox.setCoords();
      }
      syncEditedState();
    });
    textbox.on("modified", syncEditedState);
  }, [createHotspot]);

  // After loading saved canvas JSON: re-link edited text to its cover and return the text items
  // that are currently edited, so only the remaining items get a click target.
  const rewireEditables = useCallback((fc: FabricCanvas, pageData: PageData) => {
    const edited = new Set<number>();
    const covers = new Map<number, FabricObject>();
    const boxes: FabricObject[] = [];
    for (const obj of fc.getObjects()) {
      const d = obj.get("data") as { type?: string; itemKey?: number } | undefined;
      if (d?.type === "textCover" && typeof d.itemKey === "number") covers.set(d.itemKey, obj);
      if (d?.type === "editableText") boxes.push(obj);
    }

    for (const obj of boxes) {
      const d = obj.get("data") as EditableTextData;
      const key = d.itemKey;
      const item = typeof key === "number" ? pageData.textItems[key] : undefined;
      if (typeof key !== "number" || !item) continue; // not linked to the page text: leave as a plain box

      if (!isEditableTextChanged(obj)) {
        // Opened but never changed: drop it so the original text and its hotspot come back.
        const stale = covers.get(key);
        if (stale) fc.remove(stale);
        fc.remove(obj);
        continue;
      }

      let cover = covers.get(key);
      if (!cover) {
        cover = createCover(item, key);
        cover.set({ visible: true, excludeFromExport: false });
        fc.insertAt(Math.max(0, fc.getObjects().indexOf(obj)), cover);
      }
      wireEditable(fc, obj as Textbox, cover, item, key);
      edited.add(key);
    }
    return edited;
  }, [createCover, wireEditable]);

  const applyTextEditInteractivity = useCallback((canvas: FabricCanvas) => {
    for (const obj of canvas.getObjects()) {
      const data = obj.get("data") as { type?: string } | undefined;
      if (!data?.type) continue;

      if (data.type === "textHotspot") {
        obj.set({
          selectable: false,
          evented: textEditMode,
          hoverCursor: textEditMode ? "text" : "default",
          visible: textEditMode,
          opacity: 0,
          fill: "transparent",
          stroke: "transparent",
        });
      }

      if (data.type === "editableText") {
        obj.set({
          editable: textEditMode,
          selectable: true,
          evented: true,
          lockMovementX: !textEditMode,
          lockMovementY: !textEditMode,
        });
      }
    }
  }, [textEditMode]);

  // Fills the canvas for one page from saved JSON: background, annotations, edited text and
  // (in Edit Text mode) a click target for every text item that has not been edited yet.
  // Returns false when `isStale()` says a newer load superseded this one.
  const populateCanvas = useCallback(
    async (fc: FabricCanvas, pageData: PageData, json: string | null, isStale: () => boolean = () => false) => {
      fc.clear();
      const background = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);
      if (isStale()) return false;
      fc.backgroundImage = background;

      if (json) {
        const parsed = JSON.parse(json);
        if (parsed.objects && parsed.objects.length > 0) {
          await fc.loadFromJSON(parsed);
          if (isStale()) return false;
          // loadFromJSON resets the background, so put the page image back.
          fc.backgroundImage = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);
          if (isStale()) return false;
        }
      }

      const edited = rewireEditables(fc, pageData);
      if (textEditMode) {
        pageData.textItems.forEach((item, key) => {
          if (!edited.has(key)) fc.add(createHotspot(item, key));
        });
      }
      applyTextEditInteractivity(fc);
      return true;
    },
    [createBackgroundImage, rewireEditables, createHotspot, applyTextEditInteractivity, textEditMode]
  );

  /* ================================================================ */
  /*  PDF loading via pdfjs-dist CDN                                   */
  /* ================================================================ */

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
      docDirtyRef.current = false;
      thumbDirtyRef.current = false;
      setFile(files[0]);
      setError(null);
    }
  }, []);

  // Load PDF when file changes
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setProgress("Loading PDF library...");
      try {
        const cdnUrl = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs";
        const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";

        setProgress("Reading PDF file...");
        const arrayBuffer = await file.arrayBuffer();
        pdfBytesRef.current = arrayBuffer.slice(0);

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        pdfjsLibRef.current = pdfjsLib;
        pdfDocRef.current = pdf;
        const totalPages = pdf.numPages;
        const pagesArr: PageData[] = [];

        const renderScale = RENDER_SCALE;
        const EAGER_PAGES = Math.min(3, totalPages); // render first 3 upfront

        for (let i = 1; i <= totalPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: renderScale });

          if (i <= EAGER_PAGES) {
            // Fully render first few pages
            setProgress(`Rendering page ${i} of ${totalPages}...`);
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            // willReadFrequently keeps this canvas in CPU memory: the text colours are sampled from it,
            // and reading a GPU canvas back costs about half a second per page.
            const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
            await page.render({ canvasContext: ctx, viewport }).promise;

            const mergedTextItems = await extractTextItemsFromTextLayer(pdfjsLib, page, viewport, ctx);

            pagesArr.push({
              id: newPageId(),
              srcIndex: i - 1,
              dataUrl: canvas.toDataURL("image/png"),
              width: viewport.width,
              height: viewport.height,
              fabricJson: null,
              textItems: mergedTextItems,
              scale: renderScale,
              loaded: true,
            });
          } else {
            // Placeholder for lazy-loaded pages (just store dimensions)
            pagesArr.push({
              id: newPageId(),
              srcIndex: i - 1,
              dataUrl: "",
              width: viewport.width,
              height: viewport.height,
              fabricJson: null,
              textItems: [],
              scale: renderScale,
              loaded: false,
            });
          }
        }

        if (cancelled) return;
        setPages(pagesArr);
        setCurrentPage(0);
        setUndoStack([]);
        setRedoStack([]);
        // Auto-fit zoom — fit page inside container
        setTimeout(() => {
          setZoom(pagesArr[0] ? getFittedZoom(pagesArr[0]) : 0.5);
        }, 200);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load PDF");
      } finally {
        if (!cancelled) {
          setLoading(false);
          setProgress("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file, getFittedZoom]);

  /* ================================================================ */
  /*  Fabric canvas init / page switching                              */
  /* ================================================================ */

  // Small picture of the live canvas (page + annotations + edited text) for the sidebar.
  const makeThumbnail = useCallback((fc: FabricCanvas): string | null => {
    try {
      const width = fc.getWidth();
      if (!width) return null;
      return fc.toDataURL({ format: "jpeg", quality: 0.78, multiplier: THUMBNAIL_RENDER_WIDTH / width });
    } catch {
      return null;
    }
  }, []);

  const saveCurrentPageState = useCallback(() => {
    const fc = fabricRef.current;
    if (!fc || isLoadingPage.current) return;
    const json = serializeCanvas(fc);
    // Leaving the page soon after an edit: make sure its thumbnail shows that edit.
    const thumb = thumbDirtyRef.current ? makeThumbnail(fc) : null;
    thumbDirtyRef.current = false;
    setPages((prev) => {
      const next = [...prev];
      if (next[currentPage]) next[currentPage] = { ...next[currentPage], fabricJson: json, ...(thumb ? { thumb } : {}) };
      return next;
    });
  }, [currentPage, makeThumbnail]);

  const pushUndo = useCallback(() => {
    const fc = fabricRef.current;
    if (!fc || isLoadingPage.current) return;
    const json = serializeCanvas(fc);
    setUndoStack((prev) => {
      // Skip if identical to last state
      if (prev.length > 0 && prev[prev.length - 1] === json) return prev;
      return [...prev.slice(-29), json];
    });
    setRedoStack([]);
  }, []);

  // Every history change (draw, move, type, delete, undo, redo) means the page differs from what was
  // opened: remember that for the "New" warning, and redraw its sidebar thumbnail shortly after.
  useEffect(() => {
    if (undoStack.length <= 1 && redoStack.length === 0) return;
    if (!docDirtyRef.current && snapshotHasRealEdits(undoStack[undoStack.length - 1])) docDirtyRef.current = true;
    thumbDirtyRef.current = true;
    const pageId = loadedPageIdRef.current;
    const timer = window.setTimeout(() => {
      const fc = fabricRef.current;
      // The user may have moved to another page meanwhile; never put one page's picture on another.
      if (!fc || isLoadingPage.current || loadedPageIdRef.current !== pageId || !thumbDirtyRef.current) return;
      const thumb = makeThumbnail(fc);
      thumbDirtyRef.current = false;
      if (!thumb) return;
      setPages((prev) => prev.map((p) => (p.id === pageId ? { ...p, thumb } : p)));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [undoStack, redoStack, makeThumbnail]);

  // Initialize fabric canvas
  useEffect(() => {
    if (pages.length === 0 || !canvasRef.current) return;
    if (fabricRef.current) return; // already initialised

    const fc = new FabricCanvas(canvasRef.current, {
      width: pages[0].width,
      height: pages[0].height,
      backgroundColor: "#fff",
      selection: true,
    });
    fabricRef.current = fc;

    fc.on("object:modified", () => pushUndo());
    fc.on("object:added", () => {
      if (!isLoadingPage.current) pushUndo();
    });
    fc.on("selection:created", (e) => {
      setSelectedObject(e.selected?.[0] ?? null);
      setShowProperties(true);
    });
    fc.on("selection:updated", (e) => {
      setSelectedObject(e.selected?.[0] ?? null);
    });
    fc.on("selection:cleared", () => {
      setSelectedObject(null);
      setShowProperties(false);
    });

    return () => {
      saveCurrentPageState();
      fc.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length > 0]);

  // Load page content into fabric canvas
  useEffect(() => {
    const fc = fabricRef.current;
    if (!fc || pages.length === 0) return;

    const pageData = pages[currentPage];
    if (!pageData) return;

    // Same page, same mode, nothing new to show: leave the live canvas alone.
    const signature = `${pageData.id}|${pageData.dataUrl.length}|${pageData.textItems.length}|${textEditMode}`;
    const alreadyShowing = loadedPageIdRef.current === pageData.id;
    if (alreadyShowing && loadedSignatureRef.current === signature && !isLoadingPage.current) return;

    // When this page is already on the canvas (Edit Text toggled, page list changed), carry the live
    // edits over. Reloading from the last saved snapshot would silently drop unsaved annotations.
    const liveJson = alreadyShowing && !isLoadingPage.current ? serializeCanvas(fc) : null;

    const seq = ++loadSeq.current;
    isLoadingPage.current = true;

    fc.setViewportTransform([1, 0, 0, 1, 0, 0]);
    fc.setDimensions({ width: pageData.width, height: pageData.height });

    (async () => {
      const done = await populateCanvas(fc, pageData, liveJson ?? pageData.fabricJson, () => seq !== loadSeq.current);
      if (!done || seq !== loadSeq.current) return;

      applyCanvasZoom(fc, pageData, zoomRef.current);
      fc.renderAll();
      isLoadingPage.current = false;
      loadedPageIdRef.current = pageData.id;
      loadedSignatureRef.current = signature;

      if (!alreadyShowing) {
        // First time this page is shown: undo history starts from its current state.
        setUndoStack([serializeCanvas(fc)]);
        setRedoStack([]);
      }
    })();
  }, [currentPage, pages, textEditMode, applyCanvasZoom, populateCanvas]);

  useEffect(() => {
    const fc = fabricRef.current;
    const pageData = pages[currentPage];
    if (!fc || !pageData || isLoadingPage.current) return;

    applyTextEditInteractivity(fc);
    applyCanvasZoom(fc, pageData, zoom);
  }, [zoom, currentPage, pages, applyCanvasZoom, applyTextEditInteractivity]);

  useEffect(() => {
    if (pages.length === 0 || !containerRef.current || !isCompact) return;

    let frame = 0;
    const fitCurrentPage = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const pageData = pages[currentPage];
        if (pageData) setZoom(getFittedZoom(pageData, "width"));
      });
    };

    const observer = new ResizeObserver(fitCurrentPage);
    observer.observe(containerRef.current);
    window.addEventListener("orientationchange", fitCurrentPage);
    fitCurrentPage();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("orientationchange", fitCurrentPage);
    };
  }, [pages, currentPage, isCompact, getFittedZoom]);

  /* ================================================================ */
  /*  Text edit hover highlight                                        */
  /* ================================================================ */

  useEffect(() => {
    const fc = fabricRef.current;
    if (!fc || !textEditMode) return;

    let lastHovered: FabricObject | null = null;

    const handleMouseMove = (opt: any) => {
      if (isLoadingPage.current) return;
      const pointer = fc.getScenePoint(opt.e);

      // Find if pointer is over any textHotspot
      let found: FabricObject | null = null;
      for (const obj of fc.getObjects()) {
        const data = obj.get("data") as { type?: string } | undefined;
        if (data?.type !== "textHotspot") continue;
        const left = obj.left ?? 0;
        const top = obj.top ?? 0;
        const w = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const h = (obj.height ?? 0) * (obj.scaleY ?? 1);
        if (pointer.x >= left && pointer.x <= left + w && pointer.y >= top && pointer.y <= top + h) {
          found = obj;
          break;
        }
      }

      if (found === lastHovered) return;

      // Unhighlight previous
      if (lastHovered) {
        lastHovered.set({
          fill: "transparent",
          stroke: "transparent",
          opacity: 0,
        });
      }

      // Highlight new
      if (found) {
        found.set({
          fill: "rgba(59, 130, 246, 0.08)",
          stroke: "#93C5FD",
          opacity: 1,
        });
      }

      lastHovered = found;
      fc.requestRenderAll();
    };

    const handleMouseOut = () => {
      if (lastHovered) {
        lastHovered.set({
          fill: "transparent",
          stroke: "transparent",
          opacity: 0,
        });
        lastHovered = null;
        fc.requestRenderAll();
      }
    };

    fc.on("mouse:move", handleMouseMove);
    fc.on("mouse:out", handleMouseOut);

    return () => {
      fc.off("mouse:move", handleMouseMove);
      fc.off("mouse:out", handleMouseOut);
      // Clean up any lingering highlight
      if (lastHovered) {
        lastHovered.set({ fill: "transparent", stroke: "transparent", opacity: 0 });
        fc.renderAll();
      }
    };
  }, [textEditMode]);

  /* ================================================================ */
  /*  Tool handling                                                    */
  /* ================================================================ */

  useEffect(() => {
    const fc = fabricRef.current;
    if (!fc) return;

    // Reset drawing mode
    fc.isDrawingMode = false;
    fc.selection = true;
    fc.defaultCursor = "default";
    fc.hoverCursor = "move";

    if (textEditMode) {
      fc.defaultCursor = "text";
      fc.hoverCursor = "text";
    }

    if (activeTool === "draw" || activeTool === "highlight") {
      fc.isDrawingMode = true;
      const brush = new PencilBrush(fc);
      if (activeTool === "highlight") {
        brush.color = "rgba(255, 255, 0, 0.35)";
        brush.width = 24;
      } else {
        brush.color = brushColor;
        brush.width = brushSize;
      }
      fc.freeDrawingBrush = brush;
    } else if (activeTool === "eraser") {
      fc.defaultCursor = "crosshair";
      fc.hoverCursor = "pointer";
    } else if (activeTool === "text" || activeTool === "whiteout") {
      fc.defaultCursor = "crosshair";
      fc.selection = false;
    } else if (activeTool === "rect" || activeTool === "circle" || activeTool === "line" || activeTool === "arrow") {
      fc.defaultCursor = "crosshair";
      fc.selection = false;
    }
  }, [activeTool, brushColor, brushSize, textEditMode]);

  // Canvas click handler for placing objects
  useEffect(() => {
    const fc = fabricRef.current;
    if (!fc) return;

    const handleMouseDown = (opt: any) => {
      if (isLoadingPage.current) return;
      const target = resolveFabricTarget(fc.findTarget(opt.e));
      const pointer = fc.getScenePoint(opt.e);

      if (textEditMode) {
        const targetData = target?.get("data") as
          | (EditableTextData & { type: "editableText" })
          | (TextHotspotData & { type: "textHotspot" })
          | undefined;

        // Also find hotspot by pointer position in case findTarget missed opacity-0 objects
        let resolvedTarget = target;
        let resolvedData = targetData;
        if (!targetData || (targetData.type !== "textHotspot" && targetData.type !== "editableText")) {
          for (const obj of fc.getObjects()) {
            const d = obj.get("data") as { type?: string; originalText?: string } | undefined;
            if (d?.type !== "textHotspot") continue;
            const left = obj.left ?? 0;
            const top = obj.top ?? 0;
            const w = (obj.width ?? 0) * (obj.scaleX ?? 1);
            const h = (obj.height ?? 0) * (obj.scaleY ?? 1);
            if (pointer.x >= left && pointer.x <= left + w && pointer.y >= top && pointer.y <= top + h) {
              resolvedTarget = obj as CanvasTargetLike;
              resolvedData = d as TextHotspotData & { type: "textHotspot" };
              break;
            }
          }
        }

        if (resolvedData?.type === "textHotspot") {
          const originalText = resolvedData.originalText;
          const textItems = pages[currentPage]?.textItems ?? [];
          // Every hotspot knows which text item it covers; fall back to matching by text and position.
          let key = typeof resolvedData.itemKey === "number" ? resolvedData.itemKey : -1;
          if (key < 0 || !textItems[key]) {
            key = textItems.findIndex(
              (textItem) =>
                textItem.str === originalText &&
                Math.abs(textItem.x - (resolvedTarget?.left || 0)) < 6 &&
                Math.abs(textItem.y - (resolvedTarget?.top || 0)) < 6
            );
          }
          const item = key >= 0 ? textItems[key] : undefined;

          if (item) {
            const { cover, textbox } = createEditableTextObjects(item, key);
            wireEditable(fc, textbox, cover, item, key);

            if (resolvedTarget) fc.remove(resolvedTarget as unknown as FabricObject);
            fc.add(cover);
            fc.add(textbox);
            fc.setActiveObject(textbox);
            textbox.enterEditing();
            textbox.hiddenTextarea?.focus();
            fc.requestRenderAll();
          }
          return;
        }

        // Re-editing: click on an already-edited textbox
        if (resolvedData?.type === "editableText" && resolvedTarget?.enterEditing) {
          fc.setActiveObject(resolvedTarget as unknown as FabricObject);
          resolvedTarget.enterEditing();
          resolvedTarget.hiddenTextarea?.focus();
          fc.requestRenderAll();
          return;
        }
      }

      if (activeTool === "eraser") {
        const victim = (target as unknown as FabricObject | null) ?? findAnnotationNear(fc, pointer);
        if (victim) {
          fc.remove(victim);
          fc.requestRenderAll();
          pushUndo();
        }
        return;
      }

      // Thin lines/arrows are hard to hit exactly: give the select tool a small tolerance too.
      if (activeTool === "select" && !textEditMode && !target) {
        const near = findAnnotationNear(fc, pointer);
        if (near) {
          fc.setActiveObject(near);
          fc.requestRenderAll();
        }
      }

      if (activeTool === "text") {
        const text = new Textbox("Type here", {
          left: pointer.x,
          top: pointer.y,
          originX: "left",
          originY: "top",
          // The text tool size is in points; the canvas works in px at the page render scale.
          fontSize: ptToPx(Math.min(Math.max(fontSize || DEFAULT_TEXT_PT, MIN_FONT_PT), MAX_FONT_PT), pageScale),
          fill: brushColor,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: fontBold ? "bold" : "normal",
          fontStyle: fontItalic ? "italic" : "normal",
          width: 200,
          editable: true,
        });
        fc.add(text);
        fc.setActiveObject(text);
        text.enterEditing();
        // Select the placeholder so the first keystroke replaces "Type here" instead of appending to it.
        text.selectAll();
        text.hiddenTextarea?.focus();
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }

      if (activeTool === "whiteout") {
        const rect = new Rect({
          left: pointer.x,
          top: pointer.y,
          originX: "left",
          originY: "top",
          width: 150,
          height: 30,
          fill: "#ffffff",
          // No outline: a grey border would stay visible on the saved PDF after covering text.
          strokeWidth: 0,
        });
        fc.add(rect);
        fc.setActiveObject(rect);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }

      if (activeTool === "rect") {
        const rect = new Rect({
          left: pointer.x,
          top: pointer.y,
          originX: "left",
          originY: "top",
          width: 120,
          height: 80,
          fill: "transparent",
          stroke: brushColor,
          strokeWidth: 2,
        });
        fc.add(rect);
        fc.setActiveObject(rect);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }

      if (activeTool === "circle") {
        const circle = new Circle({
          left: pointer.x,
          top: pointer.y,
          originX: "left",
          originY: "top",
          radius: 50,
          fill: "transparent",
          stroke: brushColor,
          strokeWidth: 2,
        });
        fc.add(circle);
        fc.setActiveObject(circle);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }

      if (activeTool === "line") {
        const line = new Line([pointer.x, pointer.y, pointer.x + 150, pointer.y], {
          stroke: brushColor,
          strokeWidth: 2,
        });
        fc.add(line);
        fc.setActiveObject(line);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }

      if (activeTool === "arrow") {
        // Arrow = shaft + triangle head, kept together as ONE object so it can be moved,
        // erased, copied and recoloured as a whole.
        const x1 = pointer.x, y1 = pointer.y;
        const x2 = x1 + 150, y2 = y1;
        const headSize = 12;
        const shaft = new Line([x1, y1, x2 - headSize / 2, y2], {
          stroke: brushColor,
          strokeWidth: 2,
        });
        const arrowHead = new Triangle({
          // After the 90° turn the tip points right; the tip ends exactly at (x2, y2).
          left: x2 - headSize / 2,
          top: y2,
          width: headSize,
          height: headSize,
          fill: brushColor,
          angle: 90,
          originX: "center",
          originY: "center",
        });
        const arrow = new Group([shaft, arrowHead]);
        fc.add(arrow);
        fc.setActiveObject(arrow);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }
    };

    fc.on("mouse:down", handleMouseDown);
    return () => {
      fc.off("mouse:down", handleMouseDown);
    };
  }, [activeTool, brushColor, fontSize, fontBold, fontItalic, brushSize, pushUndo, textEditMode, pages, currentPage, pageScale, createEditableTextObjects, wireEditable]);

  /* ================================================================ */
  /*  Undo / Redo                                                      */
  /* ================================================================ */

  // The undo stack always ends with the state that is on the canvas right now, and starts with the
  // page as it was when it was opened. So one Undo = drop the last entry and show the one before it.
  const restoreSnapshot = useCallback(
    async (json: string) => {
      const fc = fabricRef.current;
      const pageData = pages[currentPage];
      if (!fc || !pageData) return;
      const seq = ++loadSeq.current;
      isLoadingPage.current = true;
      const done = await populateCanvas(fc, pageData, json, () => seq !== loadSeq.current);
      if (!done || seq !== loadSeq.current) return;
      applyCanvasZoom(fc, pageData, zoomRef.current);
      fc.renderAll();
      isLoadingPage.current = false;
    },
    [pages, currentPage, populateCanvas, applyCanvasZoom]
  );

  const handleUndo = useCallback(async () => {
    if (undoStack.length < 2 || isLoadingPage.current) return;
    const current = undoStack[undoStack.length - 1];
    const previous = undoStack[undoStack.length - 2];
    setRedoStack((prev) => [...prev, current]);
    setUndoStack((prev) => prev.slice(0, -1));
    await restoreSnapshot(previous);
  }, [undoStack, restoreSnapshot]);

  const handleRedo = useCallback(async () => {
    if (redoStack.length === 0 || isLoadingPage.current) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, next]);
    await restoreSnapshot(next);
  }, [redoStack, restoreSnapshot]);

  /* ================================================================ */
  /*  Image upload                                                     */
  /* ================================================================ */

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fc = fabricRef.current;
    if (!fc || !e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const img = await FabricImage.fromURL(reader.result as string);
      img.scaleToWidth(200);
      img.set({ left: 100, top: 100 });
      fc.add(img);
      fc.setActiveObject(img);
      fc.requestRenderAll();
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = "";
  }, []);

  /* ================================================================ */
  /*  Lazy page loading                                                */
  /* ================================================================ */

  // Renders a page that was left unrendered at open time. `srcIndex` is its page in the original PDF;
  // its position in the editor can differ after pages were deleted or moved, so never use that instead.
  const loadSinglePage = useCallback(async (pageId: string, srcIndex: number) => {
    const pdfjsLib = pdfjsLibRef.current;
    const pdf = pdfDocRef.current;
    if (!pdfjsLib || !pdf) return;

    const renderScale = RENDER_SCALE;
    const page = await pdf.getPage(srcIndex + 1); // pdfjs uses 1-based
    const viewport = page.getViewport({ scale: renderScale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!; // CPU canvas: colours are sampled from it
    await page.render({ canvasContext: ctx, viewport }).promise;

    const mergedTextItems = await extractTextItemsFromTextLayer(pdfjsLib, page, viewport, ctx);

    const dataUrl = canvas.toDataURL("image/png");
    setPages((prev) =>
      prev.map((p) => (p.id === pageId ? { ...p, dataUrl, textItems: mergedTextItems, loaded: true } : p))
    );
  }, []);

  /* ================================================================ */
  /*  Page navigation                                                  */
  /* ================================================================ */

  const goToPage = useCallback(
    async (idx: number) => {
      if (idx < 0 || idx >= pages.length || idx === currentPage) return;
      // Lazy load if not yet rendered
      const target = pages[idx];
      if (!target.loaded && target.srcIndex !== null) {
        setProgress(`Loading page ${idx + 1}...`);
        await loadSinglePage(target.id, target.srcIndex);
        setProgress("");
      }
      // Save current zoom for this page
      zoomPerPageRef.current.set(currentPage, zoom);
      saveCurrentPageState();
      setCurrentPage(idx);
      // Restore zoom for target page (or keep current)
      const savedZoom = zoomPerPageRef.current.get(idx);
      if (savedZoom !== undefined) setZoom(savedZoom);
      setUndoStack([]);
      setRedoStack([]);
    },
    [pages, currentPage, saveCurrentPageState, zoom, loadSinglePage]
  );

  /* ================================================================ */
  /*  Page management                                                  */
  /* ================================================================ */

  const showDeletedNotice = useCallback((label: string | null) => {
    if (deletedNoticeTimer.current !== null) window.clearTimeout(deletedNoticeTimer.current);
    deletedNoticeTimer.current = null;
    setDeletedNotice(label);
    if (label) {
      deletedNoticeTimer.current = window.setTimeout(() => {
        deletedNoticeTimer.current = null;
        setDeletedNotice(null);
        deletedPagesRef.current = []; // the offer to undo has expired
      }, DELETED_PAGE_NOTICE_MS);
    }
  }, []);

  const deletePage = useCallback(
    (idx: number) => {
      if (pages.length <= 1 || !pages[idx]) return;
      const fc = fabricRef.current;
      // Keep the page exactly as it is right now (live edits, thumbnail) so Undo can bring it back whole.
      let removed: PageData = pages[idx];
      if (idx === currentPage && fc && !isLoadingPage.current) {
        removed = {
          ...removed,
          fabricJson: serializeCanvas(fc),
          ...(thumbDirtyRef.current ? { thumb: makeThumbnail(fc) ?? removed.thumb } : {}),
        };
      }
      deletedPagesRef.current = [...deletedPagesRef.current, { page: removed, index: idx }].slice(-10);
      docDirtyRef.current = true;
      showDeletedNotice(`Page ${idx + 1} deleted`);

      saveCurrentPageState();
      setPages((prev) => prev.filter((_, i) => i !== idx));
      if (currentPage >= pages.length - 1) {
        setCurrentPage(Math.max(0, pages.length - 2));
      } else if (idx < currentPage) {
        setCurrentPage((p) => p - 1);
      } else if (idx === currentPage) {
        setCurrentPage(Math.min(idx, pages.length - 2));
      }
    },
    [pages, currentPage, saveCurrentPageState, makeThumbnail, showDeletedNotice]
  );

  // Puts the most recently deleted page back where it was and opens it.
  const undoDeletePage = useCallback(() => {
    const entry = deletedPagesRef.current[deletedPagesRef.current.length - 1];
    if (!entry) return;
    deletedPagesRef.current = deletedPagesRef.current.slice(0, -1);
    const at = Math.min(entry.index, pages.length);
    saveCurrentPageState();
    setPages((prev) => {
      const next = [...prev];
      next.splice(Math.min(entry.index, next.length), 0, entry.page);
      return next;
    });
    if (entry.page.loaded) {
      // Open the restored page so the user sees it is back.
      setCurrentPage(at);
      setUndoStack([]);
      setRedoStack([]);
    } else if (at <= currentPage) {
      // Never opened (still the "Click to load" placeholder): keep looking at the same page.
      setCurrentPage(currentPage + 1);
    }
    const earlier = deletedPagesRef.current[deletedPagesRef.current.length - 1];
    showDeletedNotice(earlier ? `Page ${earlier.index + 1} deleted` : null);
  }, [pages.length, currentPage, saveCurrentPageState, showDeletedNotice]);

  const movePage = useCallback(
    (idx: number, direction: "up" | "down") => {
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= pages.length) return;
      docDirtyRef.current = true;
      saveCurrentPageState();
      setPages((prev) => {
        const next = [...prev];
        [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
        return next;
      });
      if (currentPage === idx) setCurrentPage(newIdx);
      else if (currentPage === newIdx) setCurrentPage(idx);
    },
    [pages.length, currentPage, saveCurrentPageState]
  );

  const addBlankPage = useCallback(() => {
    // A blank page copies the current page's size and scale (fallback: A4 in points).
    const scale = pages[currentPage]?.scale ?? RENDER_SCALE;
    const w = pages[currentPage]?.width || Math.round(595 * scale);
    const h = pages[currentPage]?.height || Math.round(842 * scale);
    // Create blank white image
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/png");
    docDirtyRef.current = true;
    saveCurrentPageState();
    setPages((prev) => [
      ...prev.slice(0, currentPage + 1),
      { id: newPageId(), srcIndex: null, dataUrl, width: w, height: h, fabricJson: null, textItems: [], scale, loaded: true },
      ...prev.slice(currentPage + 1),
    ]);
    setCurrentPage(currentPage + 1);
  }, [pages, currentPage, saveCurrentPageState]);

  /* ================================================================ */
  /*  Zoom                                                             */
  /* ================================================================ */

  const handleZoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  const handleZoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
  const handleFitWidth = () => {
    const pageData = pages[currentPage];
    if (!pageData) return;
    setZoom(getFittedZoom(pageData, "width"));
  };

  /* ================================================================ */
  /*  Delete selected object                                           */
  /* ================================================================ */

  const deleteSelected = useCallback(() => {
    const fc = fabricRef.current;
    if (!fc) return;
    const active = fc.getActiveObjects();
    if (active.length > 0) {
      active.forEach((obj) => fc.remove(obj));
      fc.discardActiveObject();
      fc.requestRenderAll();
      pushUndo();
    }
  }, [pushUndo]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const fc = fabricRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      const isEditing = active && (active as any).isEditing;

      // Typing in a form field (font size, colour, the site search box...) must never run editor
      // shortcuts: Backspace in the size box used to delete the selected object. Fabric's own
      // hidden textarea (used while editing text on the canvas) is the one field we keep handling.
      const field = e.target as HTMLElement | null;
      const inFormField =
        !!field &&
        (field.tagName === "INPUT" || field.tagName === "TEXTAREA" || field.tagName === "SELECT" || field.isContentEditable) &&
        field !== (active as any)?.hiddenTextarea;
      if (inFormField) return;
      // A confirm dialog is open: its buttons own the keyboard (Backspace must not delete a shape behind it).
      if (field?.closest?.('[role="dialog"]')) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        if (isEditing) return;
        deleteSelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
      // Copy (Ctrl+C / Cmd+C)
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && !isEditing) {
        if (active) {
          active.clone().then((cloned: FabricObject) => {
            clipboardRef.current = JSON.stringify(cloned.toJSON());
          });
        }
      }
      // Paste (Ctrl+V / Cmd+V)
      if ((e.metaKey || e.ctrlKey) && e.key === "v" && !isEditing) {
        if (clipboardRef.current) {
          e.preventDefault();
          const parsed = JSON.parse(clipboardRef.current);
          // Offset pasted object to avoid exact overlap
          parsed.left = (parsed.left || 0) + 15;
          parsed.top = (parsed.top || 0) + 15;
          // A pasted copy is a plain object; it must not claim to be the edited original PDF text.
          delete parsed.data;
          import("fabric").then(({ util }) => {
            util.enlivenObjects([parsed]).then((objects) => {
              for (const obj of objects) {
                // Keep the copied object's own origin (pen strokes and lines are centre-based);
                // forcing left/top used to throw them half their size away from the original.
                fc.add(obj as FabricObject);
              }
              fc.setActiveObject(objects[0] as FabricObject);
              fc.requestRenderAll();
              pushUndo();
              // Update clipboard offset for next paste
              clipboardRef.current = JSON.stringify(parsed);
            });
          });
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deleteSelected, handleUndo, handleRedo, pushUndo]);

  /* ================================================================ */
  /*  Save / Export PDF                                                 */
  /* ================================================================ */

  const handleSave = async () => {
    if (pages.length === 0) return;
    setSaving(true);
    setError(null);

    try {
      // Save current page state first
      saveCurrentPageState();

      // Wait a tick for state to propagate
      await new Promise((r) => setTimeout(r, 50));

      const fc = fabricRef.current!;
      const latestPages = [...pages];
      // Update current page with latest fabric state
      latestPages[currentPage] = {
        ...latestPages[currentPage],
        fabricJson: serializeCanvas(fc),
      };

      // Create new PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();

      // Pages without any edit are copied from the original file, so their text, links and
      // quality stay exactly as they were. Only edited pages are flattened to an image.
      // If the original cannot be re-opened by pdf-lib (for example it is encrypted), every
      // page falls back to the image route.
      let sourceDoc: PDFDocument | null = null;
      if (pdfBytesRef.current) {
        try {
          sourceDoc = await PDFDocument.load(pdfBytesRef.current.slice(0));
        } catch {
          sourceDoc = null;
        }
      }

      for (let i = 0; i < latestPages.length; i++) {
        const pg = latestPages[i];

        let hasEdits = false;
        if (pg.fabricJson) {
          try {
            const parsedJson = JSON.parse(pg.fabricJson);
            hasEdits = Array.isArray(parsedJson.objects) && parsedJson.objects.length > 0;
          } catch {
            hasEdits = true;
          }
        }

        if (!hasEdits && sourceDoc && pg.srcIndex !== null && pg.srcIndex < sourceDoc.getPageCount()) {
          const [copied] = await pdfDoc.copyPages(sourceDoc, [pg.srcIndex]);
          pdfDoc.addPage(copied);
          continue;
        }

        if (!hasEdits && pg.srcIndex === null) {
          // Blank page added in the editor and left untouched.
          pdfDoc.addPage([pg.width / pg.scale, pg.height / pg.scale]);
          continue;
        }

        // Create a temporary fabric canvas to render the full page
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = pg.width;
        tempCanvas.height = pg.height;

        const tempFc = new FabricCanvas(tempCanvas, {
          width: pg.width,
          height: pg.height,
        });

        // Set background
        tempFc.backgroundImage = await createBackgroundImage(pg.dataUrl, pg.width, pg.height);

        // Load objects
        if (pg.fabricJson) {
          const parsed = JSON.parse(pg.fabricJson);
          if (parsed.objects && parsed.objects.length > 0) {
            await tempFc.loadFromJSON(parsed);
            // Re-set background
            tempFc.backgroundImage = await createBackgroundImage(pg.dataUrl, pg.width, pg.height);
          }
        }

        tempFc.renderAll();

        // Export to PNG at 2x for sharper text
        const dataUrl = tempFc.toDataURL({
          format: "png",
          multiplier: 2,
        });

        // Embed in PDF
        const imgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(imgBytes);
        // Keep the original physical page size: canvas px / render scale = PDF points.
        const pageWidth = pg.width / pg.scale;
        const pageHeight = pg.height / pg.scale;
        const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);
        pdfPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });

        tempFc.dispose();
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (file?.name?.replace(/\.pdf$/i, "") || "edited") + "_edited.pdf";
      a.click();
      URL.revokeObjectURL(url);
      // Everything so far is in the downloaded file; "New" need not warn until the next change.
      docDirtyRef.current = false;
    } catch (e: any) {
      setError("Failed to save PDF: " + (e?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  /* ================================================================ */
  /*  Property panel update                                            */
  /* ================================================================ */

  const updateSelectedProp = useCallback((prop: string, value: any) => {
    const fc = fabricRef.current;
    const obj = fc?.getActiveObject();
    if (!obj) return;

    const data = obj.get("data") as EditableTextData | undefined;
    const isExistingText = data?.type === "editableText";

    if (isExistingText && prop === "fontSize") {
      // Keep the original line breaks: the box grows/shrinks together with the glyphs.
      const oldSize = (obj as FabricObject & { fontSize?: number }).fontSize || value;
      const ratio = oldSize > 0 ? value / oldSize : 1;
      obj.set({ fontSize: value, width: (obj.width ?? 0) * ratio } as Partial<FabricObject>);
    } else if (obj instanceof Group) {
      // An arrow is a group: colour = shaft stroke + head fill, width = shaft width.
      const [shaft, head] = obj.getObjects();
      if (prop === "fill" || prop === "stroke") {
        shaft?.set("stroke", value);
        head?.set("fill", value);
      } else if (prop === "strokeWidth") {
        shaft?.set("strokeWidth", value);
      } else {
        obj.set(prop as keyof FabricObject, value);
      }
      obj.set("dirty", true);
    } else {
      obj.set(prop as keyof FabricObject, value);
    }

    if (isExistingText && data) {
      // Size, bold/italic and color edits count as edits too; otherwise leaving the box discards them.
      const changed = isEditableTextChanged(obj);
      obj.set("data", { ...data, changed } satisfies EditableTextData);
      const cover = (obj as FabricObject & { __coverRef?: FabricObject }).__coverRef;
      if (changed && cover) cover.set({ visible: true, excludeFromExport: false });
    }

    obj.setCoords();
    fc!.requestRenderAll();
    pushUndo();
  }, [pushUndo]);

  /* ================================================================ */
  /*  Toolbar button helper                                            */
  /* ================================================================ */

  const ToolBtn = ({
    tool,
    label,
    children,
  }: {
    tool: Tool;
    label: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => setActiveTool(tool)}
      className={`group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all ${
        activeTool === tool
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
      title={label}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">
        {label}
      </span>
    </button>
  );

  /* ================================================================ */
  /*  RENDER — Upload state                                            */
  /* ================================================================ */

  if (!file || pages.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
            <p className="text-sm font-medium text-slate-600">{progress}</p>
          </div>
        ) : (
          <>
            <DropZone
              onFilesAccepted={handleFiles}
              accept={{ "application/pdf": [".pdf"] }}
              label="Drop your PDF here to start editing"
              sublabel="or click to browse (PDF files only)"
            />
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER — Editor                                                  */
  /* ================================================================ */

  // Which property controls make sense for the selected object.
  const selectedType = selectedObject?.type ?? "";
  const isTextObject = selectedType === "textbox" || selectedType === "i-text";
  const isPictureObject = selectedType === "image";
  const showFill = !isPictureObject && selectedType !== "path" && selectedType !== "line";
  const showStroke = !isPictureObject;

  // Closes the current file and goes back to the upload screen (edits are gone for good).
  const resetEditorForNewFile = () => {
    setConfirmState(null);
    showDeletedNotice(null);
    deletedPagesRef.current = [];
    docDirtyRef.current = false;
    thumbDirtyRef.current = false;
    setFile(null);
    setPages([]);
    setCurrentPage(0);
    setUndoStack([]);
    setRedoStack([]);
    // The old canvas is gone, so a selection from it must not keep the properties panel open.
    setSelectedObject(null);
    setShowProperties(false);
    fabricRef.current?.dispose();
    fabricRef.current = null;
    loadedPageIdRef.current = null;
    loadedSignatureRef.current = "";
  };

  // "New" used to throw every edit away without a word. Ask first when there is anything to lose.
  const handleNewFile = () => {
    if (!docDirtyRef.current) {
      resetEditorForNewFile();
      return;
    }
    setConfirmState({
      title: "Discard your edits?",
      message: "Opening a new file closes this one, and the changes you have not saved with Save PDF will be lost.",
      confirmLabel: "Discard and open new",
      onConfirm: resetEditorForNewFile,
    });
  };

  // Edit Text mode only helps on pages that have real text: say so instead of staying silent.
  const noticePage = pages[currentPage];
  let textEditNotice: string | null = null;
  if (textEditMode && noticePage?.loaded && noticePage.srcIndex !== null) {
    if (noticePage.textItems.length === 0) {
      textEditNotice =
        "This page has no editable text (it looks scanned or image-only). Use White-out to cover something, then Add Text to type over it.";
    } else if (noticePage.textItems.some((item) => item.lossy)) {
      textEditNotice =
        "Some lines use characters this PDF cannot map back to text (common with Gujarati/Hindi). Those characters can drop out when you edit the line, so check the result or use White-out + Add Text.";
    }
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-[1.75rem]"
      style={{
        height: isCompact ? "calc(100dvh - 88px)" : "calc(100vh - 120px)",
        minHeight: isCompact ? 520 : 600,
      }}
    >
      {/* Hidden file input for images */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* ============ TOOLBAR ============ */}
      <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 py-2 sm:flex-wrap sm:px-3">
        {/* Select */}
        <ToolBtn tool="select" label="Select / Move">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>
        </ToolBtn>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Text */}
        <ToolBtn tool="text" label="Add Text">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v2m16-2v2M7 6v12m0 0h2m-2 0H5m12-12v12m0 0h2m-2 0h-2" />
          </svg>
        </ToolBtn>

        {/* Edit Existing Text */}
        <button
          onClick={() => {
            const next = !textEditMode;
            setTextEditMode(next);
            setPages((prev) => {
              const updated = [...prev];
              if (updated[currentPage]) {
                updated[currentPage] = { ...updated[currentPage] };
              }
              return updated;
            });
          }}
          className={`group relative flex h-9 flex-shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-all ${
            textEditMode
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
          title="Edit existing PDF text"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
          Edit Text
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">Edit existing PDF text</span>
        </button>

        {/* White-out */}
        <ToolBtn tool="whiteout" label="White-out (cover text)">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 12h18M3 16.5h18" />
            <rect x="6" y="9" width="12" height="5" fill="currentColor" opacity="0.3" rx="1" />
          </svg>
        </ToolBtn>

        {/* Image */}
        <button
          onClick={() => imageInputRef.current?.click()}
          className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
          title="Add Image"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 3.75h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6a2.25 2.25 0 012.25-2.25z" />
          </svg>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">Add Image</span>
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Draw */}
        <ToolBtn tool="draw" label="Freehand Draw">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
        </ToolBtn>

        {/* Highlight */}
        <ToolBtn tool="highlight" label="Highlighter">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            <rect x="2" y="20" width="20" height="3" rx="1" fill="rgba(255,255,0,0.5)" stroke="none" />
          </svg>
        </ToolBtn>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Shapes */}
        <ToolBtn tool="rect" label="Rectangle">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
          </svg>
        </ToolBtn>

        <ToolBtn tool="circle" label="Circle">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        </ToolBtn>

        <ToolBtn tool="line" label="Line">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 20L20 4" />
          </svg>
        </ToolBtn>

        <ToolBtn tool="arrow" label="Arrow">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l16-16m0 0h-10m10 0v10" />
          </svg>
        </ToolBtn>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Eraser */}
        <ToolBtn tool="eraser" label="Eraser (click element to remove)">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 012.828 0L19.07 12.414a2 2 0 010 2.828L15.9 18.414a2 2 0 01-2.828 0L3 12z" />
          </svg>
        </ToolBtn>

        {/* Delete selected */}
        <button
          onClick={deleteSelected}
          className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
          title="Delete Selected"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">Delete Selected</span>
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Undo / Redo */}
        <button
          onClick={handleUndo}
          disabled={undoStack.length < 2}
          className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
          title="Undo (Ctrl+Z)"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">Undo</span>
        </button>
        <button
          onClick={handleRedo}
          disabled={redoStack.length === 0}
          className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
          title="Redo (Ctrl+Shift+Z)"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
          </svg>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-50">Redo</span>
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Color picker */}
        <div className="relative flex flex-shrink-0 items-center gap-1">
          <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Color</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="h-7 w-7 cursor-pointer rounded border border-slate-200 p-0"
          />
        </div>

        {/* Brush size (for draw) */}
        {(activeTool === "draw") && (
          <div className="flex items-center gap-1 ml-1">
            <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Size</label>
            <input
              type="range"
              min={1}
              max={20}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16 accent-brand-600"
            />
            <span className="text-xs text-slate-500 w-4">{brushSize}</span>
          </div>
        )}

        {/* Font controls (for text tool) */}
        {(activeTool === "text") && (
          <div className="flex items-center gap-1.5 ml-1">
            <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Size (pt)</label>
            <PtInput
              ariaLabel="Text size in points"
              value={fontSize}
              onCommit={setFontSize}
              className="w-14 rounded border border-slate-200 px-1.5 py-0.5 text-xs text-center"
            />
            <button
              onClick={() => setFontBold(!fontBold)}
              className={`h-7 w-7 rounded text-xs font-bold ${fontBold ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              B
            </button>
            <button
              onClick={() => setFontItalic(!fontItalic)}
              className={`h-7 w-7 rounded text-xs italic ${fontItalic ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              I
            </button>
          </div>
        )}

        {/* Font size controls for edit text mode */}
        {textEditMode && selectedObject && (selectedObject as any).fontSize && (
          <div className="flex items-center gap-1.5 ml-1">
            <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Size (pt)</label>
            <div className="relative">
              <PtInput
                ariaLabel="Font size in points"
                value={pxToPt((selectedObject as any).fontSize, pageScale)}
                onCommit={(pt) => updateSelectedProp("fontSize", ptToPx(pt, pageScale))}
                className="w-14 rounded border border-slate-200 px-1.5 py-0.5 text-xs text-center"
              />
            </div>
            <button
              onClick={() => {
                const obj = selectedObject as any;
                updateSelectedProp("fontWeight", obj.fontWeight === "bold" ? "normal" : "bold");
              }}
              className={`h-7 w-7 rounded text-xs font-bold ${(selectedObject as any).fontWeight === "bold" ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              B
            </button>
            <button
              onClick={() => {
                const obj = selectedObject as any;
                updateSelectedProp("fontStyle", obj.fontStyle === "italic" ? "normal" : "italic");
              }}
              className={`h-7 w-7 rounded text-xs italic ${(selectedObject as any).fontStyle === "italic" ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              I
            </button>
          </div>
        )}

        {/* Spacer */}
        <div className="hidden flex-1 sm:block" />

        {/* Zoom */}
        <div className="flex flex-shrink-0 items-center gap-1">
          <button onClick={handleZoomOut} className="flex h-7 w-7 items-center justify-center rounded bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-sm" title="Zoom out">
            -
          </button>
          <span className="text-xs text-slate-600 w-10 text-center font-medium">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="flex h-7 w-7 items-center justify-center rounded bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-sm" title="Zoom in">
            +
          </button>
          <button onClick={handleFitWidth} className="flex h-7 items-center justify-center rounded bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-[10px] px-1.5 font-medium" title="Fit to width">
            Fit
          </button>
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Toggle thumbnails */}
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className={`flex h-9 flex-shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-medium transition-all ${showThumbnails ? "bg-brand-50 text-brand-700" : "bg-white text-slate-600 hover:bg-slate-100"}`}
          title="Toggle page thumbnails"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-4 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition-all"
        >
          {saving ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Save PDF
            </>
          )}
        </button>

        {/* New file */}
        <button
          onClick={handleNewFile}
          className="flex h-9 flex-shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-all"
          title="Open new file"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          New
        </button>
      </div>

      {/* Error bar */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-600">{error}</div>
      )}

      {/* ============ MAIN AREA ============ */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* --- Left sidebar: thumbnails --- */}
        {showThumbnails && (
          <div
            className={
              isCompact
                ? "absolute inset-y-0 left-0 z-20 flex w-[150px] flex-col overflow-y-auto border-r border-slate-200 bg-slate-50 shadow-xl"
                : "flex w-[160px] flex-col overflow-y-auto border-r border-slate-200 bg-slate-50"
            }
          >
            <div className="p-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Pages ({pages.length})
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
              {pages.map((pg, idx) => (
                <div key={pg.id} className="group relative">
                  <button
                    onClick={() => goToPage(idx)}
                    className={`w-full rounded-lg border-2 overflow-hidden transition-all ${
                      idx === currentPage
                        ? "border-brand-500 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {pg.loaded ? (
                      <img
                        src={pg.thumb ?? pg.dataUrl}
                        alt={`Page ${idx + 1}`}
                        className="w-full"
                        style={{ height: THUMBNAIL_HEIGHT, objectFit: "cover", objectPosition: "top" }}
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs"
                        style={{ height: THUMBNAIL_HEIGHT }}
                      >
                        Click to load
                      </div>
                    )}
                  </button>
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    idx === currentPage ? "bg-brand-600 text-white" : "bg-white/90 text-slate-600"
                  }`}>
                    {idx + 1}
                  </span>
                  {/* Page actions */}
                  <div className="absolute top-1 right-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx > 0 && (
                      <button onClick={() => movePage(idx, "up")} className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-slate-500 hover:text-slate-900 shadow-sm text-[10px]" title="Move up">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                      </button>
                    )}
                    {idx < pages.length - 1 && (
                      <button onClick={() => movePage(idx, "down")} className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-slate-500 hover:text-slate-900 shadow-sm text-[10px]" title="Move down">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    )}
                    {pages.length > 1 && (
                      <button onClick={() => deletePage(idx)} className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-red-500 hover:text-red-700 shadow-sm text-[10px]" title="Delete page">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {/* Add blank page */}
              <button
                onClick={addBlankPage}
                className="w-full rounded-lg border-2 border-dashed border-slate-300 py-4 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-brand-600 hover:border-brand-300 transition-all"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[10px] font-medium">Add Page</span>
              </button>
            </div>
          </div>
        )}

        {/* --- Center: canvas --- */}
        <div
          ref={containerRef}
          className="min-w-0 flex-1 touch-pan-x touch-pan-y overflow-auto bg-slate-100"
        >
          <div
            style={{
              width: (pages[currentPage]?.width || 800) * zoom,
              height: (pages[currentPage]?.height || 1100) * zoom,
              margin: isCompact ? "12px auto" : "24px auto",
            }}
          >
            <div className="shadow-2xl border border-slate-300 bg-white">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>

        {/* --- Right sidebar: properties --- */}
        {showProperties && selectedObject && (
          <div
            className={
              isCompact
                ? "absolute inset-x-3 bottom-3 z-30 max-h-[45%] space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 shadow-xl"
                : // Floats over the canvas instead of squeezing it: a side column made the page jump
                  // sideways the moment an object was clicked, so the first drag/click landed wrong.
                  "absolute right-4 top-3 z-30 max-h-[calc(100%-24px)] w-[200px] space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 shadow-xl"
            }
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Properties</h3>

            {/* Only offer what the selected object can really use: a picture has no fill or outline
                to colour, and a pen stroke or line has no fill. */}
            {showFill && (
              <div>
                <label className="text-[10px] font-medium text-slate-500 block mb-1">
                  {isTextObject ? "Text Color" : "Fill Color"}
                </label>
                <input
                  type="color"
                  value={panelColor(selectedObject, "fill")}
                  onChange={(e) => updateSelectedProp("fill", e.target.value)}
                  className="h-7 w-full cursor-pointer rounded border border-slate-200"
                />
              </div>
            )}

            {showStroke && (
              <>
                {/* Stroke color */}
                <div>
                  <label className="text-[10px] font-medium text-slate-500 block mb-1">Stroke Color</label>
                  <input
                    type="color"
                    value={panelColor(selectedObject, "stroke")}
                    onChange={(e) => updateSelectedProp("stroke", e.target.value)}
                    className="h-7 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>

                {/* Stroke width */}
                <div>
                  <label className="text-[10px] font-medium text-slate-500 block mb-1">Stroke Width</label>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={
                      (selectedObject instanceof Group
                        ? selectedObject.getObjects()[0]?.get("strokeWidth")
                        : selectedObject.get("strokeWidth")) || 0
                    }
                    onChange={(e) => updateSelectedProp("strokeWidth", Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
              </>
            )}

            {/* Opacity */}
            <div>
              <label className="text-[10px] font-medium text-slate-500 block mb-1">Opacity</label>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round((selectedObject.get("opacity") || 1) * 100)}
                onChange={(e) => updateSelectedProp("opacity", Number(e.target.value) / 100)}
                className="w-full accent-brand-600"
              />
            </div>

            {/* Font size (if text) */}
            {(selectedObject.type === "textbox" || selectedObject.type === "i-text") && (
              <>
                <div>
                  <label className="text-[10px] font-medium text-slate-500 block mb-1">Font Size (pt)</label>
                  <PtInput
                    ariaLabel="Font size in points"
                    value={pxToPt((selectedObject as any).fontSize || ptToPx(DEFAULT_TEXT_PT, pageScale), pageScale)}
                    onCommit={(pt) => updateSelectedProp("fontSize", ptToPx(pt, pageScale))}
                    className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
                  />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => updateSelectedProp("fontWeight", (selectedObject as any).fontWeight === "bold" ? "normal" : "bold")}
                    className={`flex-1 rounded py-1 text-xs font-bold ${(selectedObject as any).fontWeight === "bold" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    B
                  </button>
                  <button
                    onClick={() => updateSelectedProp("fontStyle", (selectedObject as any).fontStyle === "italic" ? "normal" : "italic")}
                    className={`flex-1 rounded py-1 text-xs italic ${(selectedObject as any).fontStyle === "italic" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    I
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Edit Text hint (scanned page / unreadable glyphs). Floats over the canvas area so it can
            never push the page around and throw off pointer positions. */}
        {textEditNotice && (
          <div
            role="status"
            className="pointer-events-none absolute inset-x-3 bottom-3 z-30 mx-auto max-w-xl rounded-lg border border-amber-200 bg-amber-50/95 px-3 py-2 text-xs text-amber-900 shadow-md"
          >
            {textEditNotice}
          </div>
        )}

        {/* A deleted page can be brought back for a few seconds. Floats over the canvas area. */}
        {deletedNotice && (
          <div
            role="status"
            className="absolute left-1/2 top-3 z-40 flex max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-3 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg"
          >
            <span>{deletedNotice}</span>
            <button
              onClick={undoDeletePage}
              className="rounded bg-white/15 px-2 py-0.5 font-semibold hover:bg-white/25"
            >
              Undo
            </button>
            <button
              onClick={() => showDeletedNotice(null)}
              aria-label="Dismiss"
              className="text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-3 py-1.5 sm:px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="rounded px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all"
          >
            Prev
          </button>
          <span className="text-xs font-medium text-slate-700">
            Page {currentPage + 1} of {pages.length}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pages.length - 1}
            className="rounded px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
        <span className="hidden text-[10px] text-slate-400 sm:inline">
          All edits are local — your PDF never leaves your browser
        </span>
        {/* On phones the toolbar scrolls sideways and Save PDF is its last button: keep a copy in reach. */}
        {isCompact && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save PDF"}
          </button>
        )}
      </div>

      {/* Confirm dialog (used before something that cannot be undone) */}
      {confirmState && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-editor-confirm-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
          onClick={() => setConfirmState(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setConfirmState(null);
          }}
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 id="pdf-editor-confirm-title" className="text-sm font-semibold text-slate-900">
              {confirmState.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{confirmState.message}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                autoFocus
                onClick={() => setConfirmState(null)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Keep editing
              </button>
              <button
                onClick={confirmState.onConfirm}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
