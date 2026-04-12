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
  color: string;
  fontWeight: string; // "normal" or "bold"
  fontStyle: string; // "normal" or "italic"
}

interface EditableTextData {
  type: "editableText";
  originalText: string;
  changed: boolean;
  originalFontSize: number; // viewport px
  originalFontSizePt: number; // PDF points
  originalFontWeight: string;
  originalFontStyle: string;
}

interface TextCoverData {
  type: "textCover";
  originalText: string;
}

interface TextHotspotData {
  type: "textHotspot";
  originalText: string;
}

interface PageData {
  dataUrl: string; // rendered page as PNG data-url (without text)
  width: number;
  height: number;
  fabricJson: string | null; // serialised fabric canvas state
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
const MOBILE_QUERY = "(max-width: 767px)";

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

async function extractTextItemsFromTextLayer(pdfjsLib: any, page: any, viewport: any) {
  const textContent = await page.getTextContent();
  if (typeof window === "undefined") return [];

  const items: TextItem[] = [];
  for (const item of textContent.items) {
    if (!("str" in item) || !item.str.trim()) continue;
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    const style = textContent.styles?.[item.fontName];
    const fontHeight = Math.hypot(tx[2], tx[3]);
    const ascent = style?.ascent
      ? style.ascent * fontHeight
      : style?.descent
        ? (1 + style.descent) * fontHeight
        : fontHeight * 0.8;

    // Detect bold/italic from PDF font name
    const fn = (item.fontName || "").toLowerCase();
    const isBold = fn.includes("bold") || fn.includes("heavy") || fn.includes("black");
    const isItalic = fn.includes("italic") || fn.includes("oblique");

    items.push({
      str: item.str,
      x: tx[4],
      y: tx[5] - ascent,
      width: Math.max(item.width * viewport.scale, item.str.length * fontHeight * 0.45),
      height: fontHeight,
      fontFamily: item.fontName || "Helvetica",
      fontSize: parseFloat(fontHeight.toFixed(2)),
      fontSizePt: parseFloat((fontHeight / viewport.scale).toFixed(2)),
      color: "#000000",
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
    });
  }

  return mergeNearbyTextItems(items);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PdfEditorClient() {
  /* --- state --- */
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [pages, setPages] = useState<PageData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const zoomPerPageRef = useRef<Map<number, number>>(new Map());

  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [fontSize, setFontSize] = useState(18);
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
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfjsLibRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);

  const clipboardRef = useRef<string | null>(null);
  const bgImageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

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

  const createEditableTextObjects = useCallback((item: TextItem) => {
    const cover = new Rect({
      left: item.x - 2,
      top: item.y - 2,
      width: item.width + 6,
      height: item.height + 6,
      originX: "left",
      originY: "top",
      fill: "#ffffff",
      selectable: false,
      evented: false,
      visible: false,
      excludeFromExport: true,
      data: { type: "textCover", originalText: item.str } satisfies TextCoverData,
    });

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
      fontFamily: "Helvetica",
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
        originalText: item.str,
        changed: false,
        originalFontSize: item.fontSize,
        originalFontSizePt: item.fontSizePt,
        originalFontWeight: item.fontWeight || "normal",
        originalFontStyle: item.fontStyle || "normal",
      } satisfies EditableTextData,
    });

    return { cover, textbox };
  }, []);

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

  /* ================================================================ */
  /*  PDF loading via pdfjs-dist CDN                                   */
  /* ================================================================ */

  const handleFiles = useCallback((files: File[]) => {
    if (files.length > 0) {
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

        const renderScale = 1.5;
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
            const ctx = canvas.getContext("2d")!;
            await page.render({ canvasContext: ctx, viewport }).promise;

            const mergedTextItems = await extractTextItemsFromTextLayer(pdfjsLib, page, viewport);

            pagesArr.push({
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

  const saveCurrentPageState = useCallback(() => {
    const fc = fabricRef.current;
    if (!fc || isLoadingPage.current) return;
    const json = JSON.stringify(fc.toJSON());
    setPages((prev) => {
      const next = [...prev];
      if (next[currentPage]) next[currentPage] = { ...next[currentPage], fabricJson: json };
      return next;
    });
  }, [currentPage]);

  const pushUndo = useCallback(() => {
    const fc = fabricRef.current;
    if (!fc || isLoadingPage.current) return;
    const json = JSON.stringify(fc.toJSON());
    setUndoStack((prev) => {
      // Skip if identical to last state
      if (prev.length > 0 && prev[prev.length - 1] === json) return prev;
      return [...prev.slice(-29), json];
    });
    setRedoStack([]);
  }, []);

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
    isLoadingPage.current = true;

    const pageData = pages[currentPage];
    if (!pageData) return;

      fc.setViewportTransform([1, 0, 0, 1, 0, 0]);
      fc.setDimensions({ width: pageData.width, height: pageData.height });

    const loadPage = async () => {
      // Clear canvas
      fc.clear();

      // Set background image (the rendered PDF page)
      fc.backgroundImage = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);

      // Restore fabric objects if any
      if (pageData.fabricJson) {
        const parsed = JSON.parse(pageData.fabricJson);
        if (parsed.objects && parsed.objects.length > 0) {
          await fc.loadFromJSON(parsed);
          // Re-set background since loadFromJSON may overwrite it
          fc.backgroundImage = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);
        }
      }

      // In text edit mode, add click targets instead of rendering every text overlay up front.
      if (textEditMode && !pageData.fabricJson && pageData.textItems.length > 0) {
        for (const item of pageData.textItems) {
          const hotspot = new Rect({
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
            data: { type: "textHotspot", originalText: item.str } satisfies TextHotspotData,
          });
          fc.add(hotspot);
        }
      }

      applyTextEditInteractivity(fc);
      fc.renderAll();
      applyCanvasZoom(fc, pageData, zoom);
      isLoadingPage.current = false;
    };

    loadPage();
  }, [currentPage, pages, textEditMode, zoom, createBackgroundImage, applyCanvasZoom, applyTextEditInteractivity]);

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
          const item = pages[currentPage]?.textItems.find(
            (textItem) =>
              textItem.str === originalText &&
              Math.abs(textItem.x - ((resolvedTarget?.left || 0))) < 6 &&
              Math.abs(textItem.y - ((resolvedTarget?.top || 0))) < 6
          );

          if (item) {
            const { cover, textbox } = createEditableTextObjects(item);

            // Track cover-textbox pair via a ref on the textbox
            (textbox as any).__coverRef = cover;
            (textbox as any).__hotspotRef = resolvedTarget;

            const syncEditedState = () => {
              const currentText = (textbox.text || "").trim();
              const tbData = textbox.get("data") as EditableTextData;
              const changed = currentText !== tbData.originalText.trim();

              textbox.set("data", { ...tbData, changed } satisfies EditableTextData);

              if (changed) {
                // Text was modified — keep cover visible, keep textbox on canvas
                cover.set({ visible: true, excludeFromExport: false });
              } else if (!textbox.isEditing) {
                // Unchanged and not editing — restore hotspot, remove textbox
                fc.remove(cover);
                fc.remove(textbox);
                if (resolvedTarget) fc.add(resolvedTarget as unknown as FabricObject);
              }

              fc.requestRenderAll();
            };

            textbox.on("editing:entered", () => {
              cover.set({ visible: true, excludeFromExport: false });
              fc.requestRenderAll();
            });
            textbox.on("editing:exited", syncEditedState);
            textbox.on("modified", syncEditedState);

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
        if (target) {
          fc.remove(target as unknown as FabricObject);
          fc.requestRenderAll();
          pushUndo();
        }
        return;
      }

      if (activeTool === "text") {
        const text = new Textbox("Type here", {
          left: pointer.x,
          top: pointer.y,
          originX: "left",
          originY: "top",
          fontSize: fontSize,
          fill: brushColor,
          fontWeight: fontBold ? "bold" : "normal",
          fontStyle: fontItalic ? "italic" : "normal",
          width: 200,
          editable: true,
        });
        fc.add(text);
        fc.setActiveObject(text);
        text.enterEditing();
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
          stroke: "#e2e8f0",
          strokeWidth: 1,
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
        // Arrow = line + triangle head
        const x1 = pointer.x, y1 = pointer.y;
        const x2 = x1 + 150, y2 = y1;
        const line = new Line([x1, y1, x2, y2], {
          stroke: brushColor,
          strokeWidth: 2,
        });
        const headSize = 12;
        const arrowHead = new Triangle({
          left: x2,
          top: y2 - headSize / 2,
          width: headSize,
          height: headSize,
          fill: brushColor,
          angle: 90,
          originX: "center",
          originY: "center",
        });
        fc.add(line);
        fc.add(arrowHead);
        fc.requestRenderAll();
        setActiveTool("select");
        return;
      }
    };

    fc.on("mouse:down", handleMouseDown);
    return () => {
      fc.off("mouse:down", handleMouseDown);
    };
  }, [activeTool, brushColor, fontSize, fontBold, fontItalic, brushSize, pushUndo, textEditMode, pages, currentPage, createEditableTextObjects]);

  /* ================================================================ */
  /*  Undo / Redo                                                      */
  /* ================================================================ */

  const handleUndo = useCallback(async () => {
    const fc = fabricRef.current;
    if (!fc || undoStack.length === 0) return;
    const currentJson = JSON.stringify(fc.toJSON());
    setRedoStack((prev) => [...prev, currentJson]);
    const prevState = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));

    isLoadingPage.current = true;
    const pageData = pages[currentPage];
    await fc.loadFromJSON(JSON.parse(prevState));
    fc.backgroundImage = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);
    applyCanvasZoom(fc, pageData, zoom);
    fc.renderAll();
    isLoadingPage.current = false;
  }, [undoStack, pages, currentPage, zoom, createBackgroundImage, applyCanvasZoom]);

  const handleRedo = useCallback(async () => {
    const fc = fabricRef.current;
    if (!fc || redoStack.length === 0) return;
    const currentJson = JSON.stringify(fc.toJSON());
    setUndoStack((prev) => [...prev, currentJson]);
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));

    isLoadingPage.current = true;
    const pageData = pages[currentPage];
    await fc.loadFromJSON(JSON.parse(nextState));
    fc.backgroundImage = await createBackgroundImage(pageData.dataUrl, pageData.width, pageData.height);
    applyCanvasZoom(fc, pageData, zoom);
    fc.renderAll();
    isLoadingPage.current = false;
  }, [redoStack, pages, currentPage, zoom, createBackgroundImage, applyCanvasZoom]);

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

  const loadSinglePage = useCallback(async (pageIndex: number) => {
    const pdfjsLib = pdfjsLibRef.current;
    const pdf = pdfDocRef.current;
    if (!pdfjsLib || !pdf) return;

    const renderScale = 1.5;
    const page = await pdf.getPage(pageIndex + 1); // pdfjs uses 1-based
    const viewport = page.getViewport({ scale: renderScale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const mergedTextItems = await extractTextItemsFromTextLayer(pdfjsLib, page, viewport);

    setPages((prev) => {
      const next = [...prev];
      next[pageIndex] = {
        ...next[pageIndex],
        dataUrl: canvas.toDataURL("image/png"),
        textItems: mergedTextItems,
        loaded: true,
      };
      return next;
    });
  }, []);

  /* ================================================================ */
  /*  Page navigation                                                  */
  /* ================================================================ */

  const goToPage = useCallback(
    async (idx: number) => {
      if (idx < 0 || idx >= pages.length || idx === currentPage) return;
      // Lazy load if not yet rendered
      if (!pages[idx].loaded) {
        setProgress(`Loading page ${idx + 1}...`);
        await loadSinglePage(idx);
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

  const deletePage = useCallback(
    (idx: number) => {
      if (pages.length <= 1) return;
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
    [pages.length, currentPage, saveCurrentPageState]
  );

  const movePage = useCallback(
    (idx: number, direction: "up" | "down") => {
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= pages.length) return;
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
    const w = pages[currentPage]?.width || 1190;
    const h = pages[currentPage]?.height || 1684;
    // Create blank white image
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/png");
    saveCurrentPageState();
    setPages((prev) => [
      ...prev.slice(0, currentPage + 1),
      { dataUrl, width: w, height: h, fabricJson: null, textItems: [], scale: 2, loaded: true },
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
          import("fabric").then(({ util }) => {
            util.enlivenObjects([parsed]).then((objects) => {
              for (const obj of objects) {
                const fObj = obj as FabricObject;
                fObj.set({ originX: "left", originY: "top" });
                fc.add(fObj);
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
        fabricJson: JSON.stringify(fc.toJSON()),
      };

      // Create new PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < latestPages.length; i++) {
        const pg = latestPages[i];

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
        // Use original page dimensions (at scale 2, so divide by 2 for PDF points)
        const pageWidth = pg.width / 2;
        const pageHeight = pg.height / 2;
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
    obj.set(prop as any, value);
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
          disabled={undoStack.length === 0}
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
            <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Size</label>
            <input
              type="number"
              min={8}
              max={120}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
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
              <input
                type="number"
                min={4}
                max={200}
                value={(() => {
                  const data = (selectedObject as any).get?.("data") as EditableTextData | undefined;
                  return data?.originalFontSizePt || Math.round((selectedObject as any).fontSize / 1.5);
                })()}
                onChange={(e) => {
                  const ptVal = Number(e.target.value);
                  if (ptVal >= 4 && ptVal <= 200) {
                    // Convert pt to viewport pixels (multiply by renderScale)
                    const vpVal = Math.round(ptVal * 1.5);
                    updateSelectedProp("fontSize", vpVal);
                  }
                }}
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
          onClick={() => {
            setFile(null);
            setPages([]);
            setCurrentPage(0);
            setUndoStack([]);
            setRedoStack([]);
            fabricRef.current?.dispose();
            fabricRef.current = null;
          }}
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
                <div key={idx} className="group relative">
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
                        src={pg.dataUrl}
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
                : "w-[200px] space-y-3 overflow-y-auto border-l border-slate-200 bg-white p-3"
            }
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Properties</h3>

            {/* Fill color */}
            <div>
              <label className="text-[10px] font-medium text-slate-500 block mb-1">Fill Color</label>
              <input
                type="color"
                value={(selectedObject.get("fill") as string) || "#000000"}
                onChange={(e) => updateSelectedProp("fill", e.target.value)}
                className="h-7 w-full cursor-pointer rounded border border-slate-200"
              />
            </div>

            {/* Stroke color */}
            <div>
              <label className="text-[10px] font-medium text-slate-500 block mb-1">Stroke Color</label>
              <input
                type="color"
                value={(selectedObject.get("stroke") as string) || "#000000"}
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
                value={selectedObject.get("strokeWidth") || 0}
                onChange={(e) => updateSelectedProp("strokeWidth", Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

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
                  <label className="text-[10px] font-medium text-slate-500 block mb-1">Font Size</label>
                  <input
                    type="number"
                    min={8}
                    max={200}
                    value={(selectedObject as any).fontSize || 18}
                    onChange={(e) => updateSelectedProp("fontSize", Number(e.target.value))}
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
      </div>
    </div>
  );
}
