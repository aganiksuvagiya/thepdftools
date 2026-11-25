// XLSX sheet layout (paper, scaling, page breaks) and painting onto canvas pages.
import { XBook, XCell, XDrawing, XRow, XSheet, XXf, parseRange } from "./parse";
import type { El } from "@/lib/ooxml/xml";
import { formatValue } from "./numfmt";
import { drawChart } from "@/lib/ooxml/chart";
import { StyleCtx } from "@/lib/ooxml/theme";
import { fontStack, lineFactor } from "@/lib/ooxml/fonts";

export interface Options {
  orientation: "auto" | "portrait" | "landscape";
  fitWidth: boolean;
  gridLines: boolean;
}

export interface PagePlan {
  r0: number;
  r1: number;
  c0: number;
  c1: number;
  titleRows: { r0: number; r1: number } | null;
  pageInSheet: number;
  pagesInSheet: number;
}

export interface SheetLayout {
  sheet: XSheet;
  book: XBook;
  rowTop: Float64Array; // absolute, index = row (1-based)
  colLeft: Float64Array; // absolute, index = column (0-based)
  startR: number;
  endR: number;
  startC: number;
  endC: number;
  paperW: number;
  paperH: number;
  zoom: number;
  availW: number;
  availH: number;
  pages: PagePlan[];
  cells: Map<number, XCell>;
  mergeTL: Map<number, { r0: number; c0: number; r1: number; c1: number }>;
  covered: Set<number>;
  gridLines: boolean;
}

export interface Painted {
  canvas: HTMLCanvasElement;
  texts: Array<{ text: string; x: number; y: number; w: number; size: number }>;
}

const PAPER: Record<number, [number, number]> = {
  1: [816, 1056], 5: [816, 1344], 7: [696, 1008], 8: [1123, 1587], 9: [794, 1123], 11: [559, 794], 13: [690, 976],
};

const KEY = 16384;
const key = (r: number, c: number) => r * KEY + c;

let measureCanvas: CanvasRenderingContext2D | null = null;
function mctx(): CanvasRenderingContext2D {
  if (!measureCanvas) measureCanvas = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
  return measureCanvas;
}

const widthCache = new Map<string, number>();
function measure(css: string, text: string): number {
  const k = css + "|" + text;
  const hit = widthCache.get(k);
  if (hit !== undefined) return hit;
  const g = mctx();
  g.font = css;
  const w = g.measureText(text).width;
  if (widthCache.size > 50000) widthCache.clear();
  widthCache.set(k, w);
  return w;
}

function fontCss(xf: XXf, theme: XBook["theme"], scale = 1): string {
  const px = ((xf.font.sz * 96) / 72) * scale;
  return `${xf.font.i ? "italic " : ""}${xf.font.b ? "bold " : ""}${px.toFixed(2)}px ${fontStack(xf.font.name, theme)}`;
}

function display(book: XBook, cell: XCell, xf: XXf): { text: string; color: string | null; numeric: boolean } {
  if (cell.v === null) return { text: "", color: null, numeric: false };
  if (cell.t === "n") {
    const f = formatValue(cell.v as number, xf.fmt, book.d1904);
    return { text: f.text, color: f.color, numeric: true };
  }
  if (cell.t === "b") return { text: cell.v ? "TRUE" : "FALSE", color: null, numeric: false };
  if (cell.t === "e") return { text: String(cell.v), color: null, numeric: false };
  const s = String(cell.v);
  if (xf.fmt.indexOf("@") >= 0 && xf.fmt !== "@") {
    const f = formatValue(s, xf.fmt, book.d1904);
    return { text: f.text, color: f.color, numeric: false };
  }
  return { text: s, color: null, numeric: false };
}

function wrapLines(css: string, text: string, maxW: number): string[] {
  const out: string[] = [];
  text.split(/\r?\n/).forEach((para) => {
    let line = "";
    para.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      const test = line + tok;
      if (line && measure(css, test.replace(/\s+$/, "")) > maxW) {
        out.push(line.replace(/\s+$/, ""));
        line = tok.replace(/^\s+/, "");
      } else line = test;
    });
    out.push(line.replace(/\s+$/, ""));
  });
  return out;
}


// Charts written by some tools (for example openpyxl) have no cached values: fill them from the sheet data.
const sheetCellMaps = new WeakMap<XSheet, Map<number, XCell>>();
function sheetCells(sheet: XSheet): Map<number, XCell> {
  let m = sheetCellMaps.get(sheet);
  if (!m) {
    m = new Map();
    sheet.rows.forEach((row) => row.cells.forEach((c) => m!.set(key(row.r, c.c), c)));
    sheetCellMaps.set(sheet, m);
  }
  return m;
}

function ensureChartCaches(book: XBook, chart: El) {
  if ((chart as any).__filled) return;
  (chart as any).__filled = true;
  const C = "http://schemas.openxmlformats.org/drawingml/2006/chart";
  const doc = chart.ownerDocument;
  const refs: El[] = [];
  ["numRef", "strRef"].forEach((n) => {
    const list = chart.getElementsByTagNameNS(C, n);
    for (let i = 0; i < list.length; i++) refs.push(list[i]);
  });
  refs.forEach((ref) => {
    const isNum = ref.localName === "numRef";
    const cacheName = isNum ? "numCache" : "strCache";
    const isCat = !!ref.parentElement && ref.parentElement.localName === "cat";
    for (let k = ref.firstElementChild; k; k = k.nextElementSibling) if (k.localName === cacheName) return;
    let f = "";
    for (let k = ref.firstElementChild; k; k = k.nextElementSibling) if (k.localName === "f") f = k.textContent || "";
    const bang = f.lastIndexOf("!");
    if (bang < 0) return;
    const sheetName = f.slice(0, bang).replace(/^'|'$/g, "").replace(/''/g, "'");
    const rng = parseRange(f);
    const sh = book.sheets.find((s) => s.name === sheetName);
    if (!sh || !rng) return;
    const cells = sheetCells(sh);
    const values: Array<string | null> = [];
    let fmt = "General";
    for (let r = rng.r0; r <= rng.r1; r++) {
      for (let c = rng.c0; c <= rng.c1; c++) {
        const cell = cells.get(key(r, c));
        if (!cell || cell.v === null) {
          values.push(null);
          continue;
        }
        const xf = book.xfs[cell.xf] || book.xfs[0];
        if (isNum && !isCat) {
          values.push(cell.t === "n" ? String(cell.v) : null);
          if (fmt === "General" && xf.fmt) fmt = xf.fmt;
        } else values.push(display(book, cell, xf).text);
      }
    }
    const cache = doc.createElementNS(C, "c:" + cacheName);
    if (isNum) {
      const fc = doc.createElementNS(C, "c:formatCode");
      fc.textContent = fmt;
      cache.appendChild(fc);
    }
    const pc = doc.createElementNS(C, "c:ptCount");
    pc.setAttribute("val", String(values.length));
    cache.appendChild(pc);
    values.forEach((v, i) => {
      if (v === null) return;
      const pt = doc.createElementNS(C, "c:pt");
      pt.setAttribute("idx", String(i));
      const ve = doc.createElementNS(C, "c:v");
      ve.textContent = v;
      pt.appendChild(ve);
      cache.appendChild(pt);
    });
    ref.appendChild(cache);
  });
}

// ---------------------------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------------------------

export function layoutSheet(book: XBook, sheet: XSheet, opts: Options): SheetLayout | null {
  const cells = new Map<number, XCell>();
  const rowMap = new Map<number, XRow>();
  let minR = Infinity, minC = Infinity, maxR = 0, maxC = -1;
  sheet.rows.forEach((row) => {
    rowMap.set(row.r, row);
    row.cells.forEach((c) => {
      cells.set(key(row.r, c.c), c);
      const vis = (c.v !== null && c.v !== "") || (book.xfs[c.xf] && book.xfs[c.xf].visible);
      if (!vis) return;
      minR = Math.min(minR, row.r);
      minC = Math.min(minC, c.c);
      maxR = Math.max(maxR, row.r);
      maxC = Math.max(maxC, c.c);
    });
  });
  sheet.merges.forEach((m) => {
    minR = Math.min(minR, m.r0);
    minC = Math.min(minC, m.c0);
    maxR = Math.max(maxR, m.r1);
    maxC = Math.max(maxC, m.c1);
  });
  sheet.drawings.forEach((d) => {
    let ec = d.to ? d.to.c : d.from.c;
    let er = d.to ? d.to.r + 1 : d.from.r + 1;
    if (!d.to) {
      let acc = -d.from.co;
      while (acc < d.w && ec < 2000) {
        const cw = sheet.colW.get(ec);
        acc += cw ? (cw.hidden ? 0 : cw.w) : sheet.defaultColW;
        if (acc < d.w) ec++;
      }
      acc = -d.from.ro;
      while (acc < d.h && er < 100000) {
        const row = rowMap.get(er);
        acc += row ? (row.hidden ? 0 : row.ht !== null ? row.ht : sheet.defaultRowH) : sheet.defaultRowH;
        if (acc < d.h) er++;
      }
    }
    minR = Math.min(minR, d.from.r + 1);
    minC = Math.min(minC, d.from.c);
    maxR = Math.max(maxR, er);
    maxC = Math.max(maxC, ec);
  });
  let startR = minR === Infinity ? 1 : minR, startC = minC === Infinity ? 0 : minC;
  let endR = maxR, endC = maxC;
  if (sheet.printArea) {
    startR = sheet.printArea.r0;
    startC = sheet.printArea.c0;
    endR = sheet.printArea.r1;
    endC = sheet.printArea.c1;
  }
  if (endC < 0 || endR < 1) return null;
  endC = Math.min(endC, 2000);
  endR = Math.min(endR, 1048576);

  // column positions
  const colLeft = new Float64Array(endC + 2);
  for (let c = 0; c <= endC; c++) {
    const d = sheet.colW.get(c);
    colLeft[c + 1] = colLeft[c] + (d ? (d.hidden ? 0 : d.w) : sheet.defaultColW);
  }
  // row positions (wrapped text without explicit height grows the row)
  const rowTop = new Float64Array(endR + 2);
  for (let r = 1; r <= endR; r++) {
    const row = rowMap.get(r);
    let h = row && row.ht !== null ? row.ht : sheet.defaultRowH;
    if (row && row.hidden) h = 0;
    else if (row && row.ht === null) {
      row.cells.forEach((c) => {
        const xf = book.xfs[c.xf];
        if (!xf || !xf.wrap || c.t !== "s" || typeof c.v !== "string" || c.c > endC) return;
        const w = colLeft[c.c + 1] - colLeft[c.c] - 6;
        if (w <= 10) return;
        const css = fontCss(xf, book.theme);
        const lines = wrapLines(css, c.v, w).length;
        const lh = ((xf.font.sz * 96) / 72) * lineFactor(xf.font.name);
        h = Math.max(h, lines * lh + 4);
      });
    }
    rowTop[r + 1] = rowTop[r] + h;
  }
  rowTop[1] = rowTop[1] || 0;

  const mergeTL = new Map<number, { r0: number; c0: number; r1: number; c1: number }>();
  const covered = new Set<number>();
  sheet.merges.forEach((m) => {
    mergeTL.set(key(m.r0, m.c0), m);
    for (let r = m.r0; r <= Math.min(m.r1, endR); r++) for (let c = m.c0; c <= Math.min(m.c1, endC); c++) if (r !== m.r0 || c !== m.c0) covered.add(key(r, c));
  });

  // paper, orientation and zoom
  const base = PAPER[sheet.paperSize || 1] || PAPER[1];
  const m = sheet.margins;
  const contentW = colLeft[endC + 1] - colLeft[startC];
  const contentH = rowTop[endR + 1] - rowTop[startR];
  let orient: "portrait" | "landscape" = "portrait";
  if (opts.orientation !== "auto") orient = opts.orientation;
  else if (sheet.orientation) orient = sheet.orientation;
  else if (contentW > base[0] - m.l - m.r) orient = "landscape";
  const paperW = orient === "landscape" ? base[1] : base[0];
  const paperH = orient === "landscape" ? base[0] : base[1];
  const availW = Math.max(100, paperW - m.l - m.r);
  const availH = Math.max(100, paperH - m.t - m.b);

  let zoom = 1;
  if (sheet.fitToPage) {
    const zw = sheet.fitW > 0 ? availW / contentW : Infinity;
    const zh = sheet.fitH > 0 ? availH / contentH : Infinity;
    zoom = Math.max(0.1, Math.min(1, zw, zh));
  } else if (opts.fitWidth) zoom = Math.max(0.35, Math.min(1, availW / contentW));
  else zoom = sheet.scale || 1;

  const pageW = availW / zoom, pageH = availH / zoom;
  const titleRows = sheet.titleRows;
  const titleH = titleRows ? rowTop[Math.min(titleRows.r1, endR) + 1] - rowTop[titleRows.r0] : 0;
  const rowBreaks = new Set(sheet.rowBreaks);
  const colBreaks = new Set(sheet.colBreaks);

  const rowRanges: Array<{ r0: number; r1: number }> = [];
  for (let r = startR; r <= endR; ) {
    const start = r;
    let used = rowRanges.length && titleRows && start > titleRows.r1 ? titleH : 0;
    while (r <= endR) {
      const h = rowTop[r + 1] - rowTop[r];
      if (used + h > pageH + 0.01 && r > start) break;
      used += h;
      r++;
      if (rowBreaks.has(r - 1)) break;
    }
    rowRanges.push({ r0: start, r1: r - 1 });
  }
  const colRanges: Array<{ c0: number; c1: number }> = [];
  for (let c = startC; c <= endC; ) {
    const start = c;
    let used = 0;
    while (c <= endC) {
      const w = colLeft[c + 1] - colLeft[c];
      if (used + w > pageW + 0.01 && c > start) break;
      used += w;
      c++;
      if (colBreaks.has(c)) break;
    }
    colRanges.push({ c0: start, c1: c - 1 });
  }

  const hasContent = (r0: number, r1: number, c0: number, c1: number): boolean => {
    for (let r = r0; r <= r1; r++) {
      const row = rowMap.get(r);
      if (!row) continue;
      for (let i = 0; i < row.cells.length; i++) {
        const c = row.cells[i];
        if (c.c < c0 || c.c > c1) continue;
        if ((c.v !== null && c.v !== "") || (book.xfs[c.xf] && book.xfs[c.xf].visible)) return true;
      }
    }
    for (let i = 0; i < sheet.drawings.length; i++) {
      const d = sheet.drawings[i];
      const rect = drawingRect({ colLeft, rowTop, endC, endR } as unknown as SheetLayout, d);
      if (rect.x < colLeft[c1 + 1] && rect.x + rect.w > colLeft[c0] && rect.y < rowTop[r1 + 1] && rect.y + rect.h > rowTop[r0]) return true;
    }
    return sheet.merges.some((mg) => mg.r0 <= r1 && mg.r1 >= r0 && mg.c0 <= c1 && mg.c1 >= c0);
  };

  const plans: PagePlan[] = [];
  const addPage = (rr: { r0: number; r1: number }, cr: { c0: number; c1: number }, ri: number) => {
    if (!hasContent(rr.r0, rr.r1, cr.c0, cr.c1)) return;
    plans.push({
      r0: rr.r0,
      r1: rr.r1,
      c0: cr.c0,
      c1: cr.c1,
      titleRows: titleRows && ri > 0 && rr.r0 > titleRows.r1 ? titleRows : null,
      pageInSheet: 0,
      pagesInSheet: 0,
    });
  };
  if (sheet.overThenDown) rowRanges.forEach((rr, ri) => colRanges.forEach((cr) => addPage(rr, cr, ri)));
  else colRanges.forEach((cr) => rowRanges.forEach((rr, ri) => addPage(rr, cr, ri)));
  plans.forEach((p, i) => {
    p.pageInSheet = i + 1;
    p.pagesInSheet = plans.length;
  });
  if (!plans.length) return null;

  return {
    sheet, book, rowTop, colLeft, startR, endR, startC, endC, paperW, paperH, zoom, availW, availH, pages: plans, cells, mergeTL, covered,
    gridLines: opts.gridLines || sheet.gridLines,
  };
}

// ---------------------------------------------------------------------------------------------
// Painting
// ---------------------------------------------------------------------------------------------

function dashFor(style: string, w: number): number[] {
  if (style === "dotted" || style === "hair") return [w, w];
  if (style.indexOf("dash") >= 0 || style.indexOf("Dash") >= 0) return [w * 4, w * 2];
  return [];
}

function sideWidth(style: string): number {
  if (style === "thick") return 3;
  if (style === "medium" || style === "mediumDashed" || style === "mediumDashDot" || style === "mediumDashDotDot" || style === "slantDashDot") return 2;
  if (style === "hair") return 0.5;
  return 1;
}

const chartCtx = (book: XBook): StyleCtx => ({
  theme: book.theme,
  clrMap: { bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2", accent1: "accent1", accent2: "accent2", accent3: "accent3", accent4: "accent4", accent5: "accent5", accent6: "accent6", hlink: "hlink", folHlink: "folHlink" },
  phClr: null,
});

function headerText(raw: string, sheet: XSheet, page: PagePlan, fileName: string): { l: string; c: string; r: string } {
  const out = { l: "", c: "", r: "" };
  let cur: "l" | "c" | "r" = "c";
  const now = new Date();
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch !== "&") {
      out[cur] += ch;
      continue;
    }
    const n = raw[++i];
    if (n === "L") cur = "l";
    else if (n === "C") cur = "c";
    else if (n === "R") cur = "r";
    else if (n === "P") out[cur] += String(page.pageInSheet);
    else if (n === "N") out[cur] += String(page.pagesInSheet);
    else if (n === "A") out[cur] += sheet.name;
    else if (n === "F") out[cur] += fileName;
    else if (n === "D") out[cur] += now.toLocaleDateString();
    else if (n === "T") out[cur] += now.toLocaleTimeString();
    else if (n === "&") out[cur] += "&";
    else if (n === '"') {
      const j = raw.indexOf('"', i + 1);
      i = j < 0 ? raw.length : j;
    } else if (n === "K") i += 6;
    else if (n >= "0" && n <= "9") {
      while (i + 1 < raw.length && raw[i + 1] >= "0" && raw[i + 1] <= "9") i++;
    }
  }
  return out;
}

export function paintPage(L: SheetLayout, pg: PagePlan, dpi: number, images: Map<string, CanvasImageSource | null>, fileName: string, warn: Record<string, number>): Painted {
  const { book, sheet } = L;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(L.paperW * dpi));
  canvas.height = Math.max(1, Math.round(L.paperH * dpi));
  const g = canvas.getContext("2d") as CanvasRenderingContext2D;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, canvas.width, canvas.height);
  g.scale(dpi, dpi);
  const texts: Painted["texts"] = [];
  const m = sheet.margins;

  // header / footer
  const hf = (raw: string, baseline: number) => {
    if (!raw) return;
    const parts = headerText(raw, sheet, pg, fileName);
    g.font = `${(10 * 96) / 72}px Arial, Helvetica, sans-serif`;
    g.fillStyle = "#000000";
    g.textBaseline = "alphabetic";
    (["l", "c", "r"] as const).forEach((k) => {
      const t = parts[k];
      if (!t) return;
      g.textAlign = k === "l" ? "left" : k === "c" ? "center" : "right";
      const x = k === "l" ? m.l : k === "c" ? L.paperW / 2 : L.paperW - m.r;
      g.fillText(t, x, baseline);
    });
  };
  hf(sheet.header, m.header + 13);
  hf(sheet.footer, L.paperH - m.footer);
  g.textAlign = "left";

  g.save();
  g.translate(m.l, m.t);
  g.beginPath();
  g.rect(0, 0, L.availW, L.availH);
  g.clip();
  g.scale(L.zoom, L.zoom);

  let oy = 0;
  if (pg.titleRows) {
    const tr = pg.titleRows;
    paintRegion(L, g, tr.r0, Math.min(tr.r1, L.endR), pg.c0, pg.c1, 0, 0, images, texts, dpi * L.zoom, m.l * dpi, m.t * dpi, warn, false);
    oy = L.rowTop[Math.min(tr.r1, L.endR) + 1] - L.rowTop[tr.r0];
  }
  paintRegion(L, g, pg.r0, pg.r1, pg.c0, pg.c1, 0, oy, images, texts, dpi * L.zoom, m.l * dpi, m.t * dpi + oy * dpi * L.zoom, warn, true);
  g.restore();
  return { canvas, texts };
}

function paintRegion(
  L: SheetLayout,
  g: CanvasRenderingContext2D,
  r0: number,
  r1: number,
  c0: number,
  c1: number,
  ox: number,
  oy: number,
  images: Map<string, CanvasImageSource | null>,
  texts: Painted["texts"],
  devScale: number,
  devX: number,
  devY: number,
  warn: Record<string, number>,
  withDrawings: boolean
) {
  const { book, sheet } = L;
  const X = (c: number) => L.colLeft[c] - L.colLeft[c0] + ox;
  const Y = (r: number) => L.rowTop[r] - L.rowTop[r0] + oy;
  const regionW = X(c1 + 1) - ox, regionH = Y(r1 + 1) - oy;
  const xfOf = (cell: XCell | undefined) => (cell ? book.xfs[cell.xf] || book.xfs[0] : book.xfs[0]);

  // visible rows slice
  const rows = sheet.rows;
  let lo = 0, hi = rows.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (rows[mid].r < r0) lo = mid + 1;
    else hi = mid;
  }
  const visible: Array<{ row: XRow; cell: XCell }> = [];
  for (let i = lo; i < rows.length && rows[i].r <= r1; i++) {
    const row = rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      const c = row.cells[j];
      if (c.c < c0 || c.c > c1 || L.covered.has(key(row.r, c.c)) || L.mergeTL.has(key(row.r, c.c))) continue;
      visible.push({ row, cell: c });
    }
  }
  const merges = sheet.merges.filter((mg) => mg.r0 <= r1 && mg.r1 >= r0 && mg.c0 <= c1 && mg.c1 >= c0);

  const rectOf = (r: number, c: number, mg?: { r0: number; c0: number; r1: number; c1: number }) => {
    const rr0 = mg ? mg.r0 : r, cc0 = mg ? mg.c0 : c;
    const rr1 = mg ? mg.r1 : r, cc1 = mg ? mg.c1 : c;
    const x = L.colLeft[cc0] - L.colLeft[c0] + ox;
    const y = L.rowTop[rr0] - L.rowTop[r0] + oy;
    return { x, y, w: L.colLeft[Math.min(cc1, L.endC) + 1] - L.colLeft[cc0], h: L.rowTop[Math.min(rr1, L.endR) + 1] - L.rowTop[rr0] };
  };

  // 1. fills
  visible.forEach(({ row, cell }) => {
    const xf = xfOf(cell);
    if (!xf.fill) return;
    const rc = rectOf(row.r, cell.c);
    g.fillStyle = xf.fill;
    g.fillRect(rc.x, rc.y, rc.w, rc.h);
  });
  merges.forEach((mg) => {
    const xf = xfOf(L.cells.get(key(mg.r0, mg.c0)));
    if (!xf.fill) return;
    const rc = rectOf(0, 0, mg);
    g.fillStyle = xf.fill;
    g.fillRect(rc.x, rc.y, rc.w, rc.h);
  });

  // 2. gridlines
  if (L.gridLines) {
    g.strokeStyle = "#b8b8b8";
    g.lineWidth = 0.75;
    g.beginPath();
    for (let c = c0; c <= c1 + 1; c++) {
      const x = X(c);
      g.moveTo(x, oy);
      g.lineTo(x, oy + regionH);
    }
    for (let r = r0; r <= r1 + 1; r++) {
      const y = Y(r);
      g.moveTo(ox, y);
      g.lineTo(ox + regionW, y);
    }
    g.stroke();
  }

  // 3. text
  const emptyAt = (r: number, c: number) => {
    if (c < c0 || c > c1) return false;
    if (L.covered.has(key(r, c)) || L.mergeTL.has(key(r, c))) return false;
    const cell = L.cells.get(key(r, c));
    return !cell || cell.v === null || cell.v === "";
  };
  const drawText = (r: number, c: number, mg: { r0: number; c0: number; r1: number; c1: number } | undefined, cell: XCell) => {
    const xf = xfOf(cell);
    const d = display(book, cell, xf);
    if (!d.text) return;
    const rc = rectOf(r, c, mg);
    if (rc.w <= 0 || rc.h <= 0) return;
    let css = fontCss(xf, book.theme);
    let size = (xf.font.sz * 96) / 72;
    const pad = 3;
    const color = d.color || xf.font.color || "#000000";
    let text = d.text;
    const horiz = xf.h && xf.h !== "general" ? xf.h : cell.t === "n" ? "right" : cell.t === "s" ? "left" : "center";
    const align = horiz === "centerContinuous" || horiz === "distributed" ? "center" : horiz === "justify" || horiz === "fill" ? "left" : horiz;
    const indent = xf.indent * 9;
    const innerW = rc.w - pad * 2 - (align === "center" ? 0 : indent);

    g.save();
    g.textBaseline = "alphabetic";
    g.fillStyle = color;
    const lf = lineFactor(xf.font.name);

    if (xf.rot === 90 || xf.rot === 180 + 90) {
      g.beginPath();
      g.rect(rc.x, rc.y, rc.w, rc.h);
      g.clip();
      g.translate(rc.x + rc.w / 2, rc.y + rc.h / 2);
      g.rotate(xf.rot === 90 ? -Math.PI / 2 : Math.PI / 2);
      g.font = css;
      g.textAlign = "center";
      g.fillText(text, 0, size * 0.35);
      g.restore();
      return;
    }

    let clipX = rc.x, clipW = rc.w;
    let lines: string[];
    if (xf.wrap && cell.t === "s") lines = wrapLines(css, text, Math.max(10, innerW));
    else {
      if (xf.shrink && measure(css, text) > innerW && innerW > 0) {
        const f = Math.max(0.5, innerW / measure(css, text));
        css = fontCss(xf, book.theme, f);
        size *= f;
      }
      let w = measure(css, text);
      if (d.numeric && w > innerW) {
        const hw = measure(css, "#") || 6;
        text = new Array(Math.max(1, Math.floor(innerW / hw))).join("#") + "#";
        w = measure(css, text);
      } else if (w > innerW && cell.t === "s" && !mg) {
        // overflow into empty neighbouring cells
        let extra = 0;
        if (align === "left") {
          for (let cc = c + 1; cc <= c1 && emptyAt(r, cc) && extra < w; cc++) extra += L.colLeft[cc + 1] - L.colLeft[cc];
          clipW += extra;
        } else if (align === "right") {
          for (let cc = c - 1; cc >= c0 && emptyAt(r, cc) && extra < w; cc--) extra += L.colLeft[cc + 1] - L.colLeft[cc];
          clipX -= extra;
          clipW += extra;
        } else {
          let left = 0, right = 0;
          for (let cc = c + 1; cc <= c1 && emptyAt(r, cc) && right < w / 2; cc++) right += L.colLeft[cc + 1] - L.colLeft[cc];
          for (let cc = c - 1; cc >= c0 && emptyAt(r, cc) && left < w / 2; cc--) left += L.colLeft[cc + 1] - L.colLeft[cc];
          clipX -= left;
          clipW += left + right;
        }
      }
      lines = [text];
    }
    g.beginPath();
    g.rect(clipX, rc.y, clipW, rc.h);
    g.clip();
    g.font = css;
    const lh = size * lf;
    const total = lines.length * lh;
    const v = xf.v || "bottom";
    let top: number;
    if (v === "top") top = rc.y + 1;
    else if (v === "center" || v === "distributed" || v === "justify") top = rc.y + (rc.h - total) / 2;
    else top = rc.y + rc.h - total - 1;
    const m2 = g.getTransform();
    lines.forEach((ln, i) => {
      const base = top + i * lh + lh - lh * 0.22;
      const w = measure(css, ln);
      let x: number;
      if (align === "right") x = rc.x + rc.w - pad - w - indent;
      else if (align === "center") x = rc.x + (rc.w - w) / 2;
      else x = rc.x + pad + indent;
      g.textAlign = "left";
      g.fillText(ln, x, base);
      if (xf.font.u) g.fillRect(x, base + size * 0.12, w, Math.max(1, size / 16));
      if (xf.font.strike) g.fillRect(x, base - size * 0.3, w, Math.max(1, size / 16));
      if (ln.trim() && Math.abs(m2.b) < 1e-3 && Math.abs(m2.c) < 1e-3) {
        texts.push({ text: ln, x: m2.a * x + m2.e, y: m2.d * base + m2.f, w: w * m2.a, size: size * m2.d });
      }
    });
    g.restore();
  };

  visible.forEach(({ row, cell }) => drawText(row.r, cell.c, undefined, cell));
  merges.forEach((mg) => {
    const cell = L.cells.get(key(mg.r0, mg.c0));
    if (cell) drawText(mg.r0, mg.c0, mg, cell);
  });

  // 4. borders
  const line = (s: { style: string; color: string } | null, x1: number, y1: number, x2: number, y2: number) => {
    if (!s) return;
    const w = sideWidth(s.style);
    g.strokeStyle = s.color;
    g.lineWidth = w;
    g.setLineDash(dashFor(s.style, w));
    g.beginPath();
    if (s.style === "double") {
      const horizontal = y1 === y2;
      g.lineWidth = 1;
      if (horizontal) {
        g.moveTo(x1, y1 - 1);
        g.lineTo(x2, y2 - 1);
        g.moveTo(x1, y1 + 1);
        g.lineTo(x2, y2 + 1);
      } else {
        g.moveTo(x1 - 1, y1);
        g.lineTo(x2 - 1, y2);
        g.moveTo(x1 + 1, y1);
        g.lineTo(x2 + 1, y2);
      }
    } else {
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
    }
    g.stroke();
    g.setLineDash([]);
  };
  visible.forEach(({ row, cell }) => {
    const xf = xfOf(cell);
    if (!xf.visible) return;
    const rc = rectOf(row.r, cell.c);
    line(xf.t, rc.x, rc.y, rc.x + rc.w, rc.y);
    line(xf.b, rc.x, rc.y + rc.h, rc.x + rc.w, rc.y + rc.h);
    line(xf.l, rc.x, rc.y, rc.x, rc.y + rc.h);
    line(xf.r, rc.x + rc.w, rc.y, rc.x + rc.w, rc.y + rc.h);
  });
  merges.forEach((mg) => {
    const tl = xfOf(L.cells.get(key(mg.r0, mg.c0)));
    const tr = xfOf(L.cells.get(key(mg.r0, mg.c1)));
    const bl = xfOf(L.cells.get(key(mg.r1, mg.c0)));
    const rc = rectOf(0, 0, mg);
    line(tl.t, rc.x, rc.y, rc.x + rc.w, rc.y);
    line(bl.b, rc.x, rc.y + rc.h, rc.x + rc.w, rc.y + rc.h);
    line(tl.l, rc.x, rc.y, rc.x, rc.y + rc.h);
    line(tr.r, rc.x + rc.w, rc.y, rc.x + rc.w, rc.y + rc.h);
  });

  // 5. pictures and charts
  if (withDrawings) {
    sheet.drawings.forEach((d) => {
      const rect = drawingRect(L, d);
      const x = rect.x - L.colLeft[c0] + ox, y = rect.y - L.rowTop[r0] + oy;
      if (x > ox + regionW || y > oy + regionH || x + rect.w < ox || y + rect.h < oy) return;
      g.save();
      g.beginPath();
      g.rect(ox, oy, regionW, regionH);
      g.clip();
      if (d.kind === "pic") {
        const img = d.path ? images.get(d.path) : null;
        if (img) {
          g.imageSmoothingQuality = "high";
          g.drawImage(img, x, y, rect.w, rect.h);
        } else warn.image = (warn.image || 0) + 1;
      } else if (d.chart) {
        g.translate(x, y);
        g.beginPath();
        g.rect(0, 0, rect.w, rect.h);
        g.clip();
        let ok = false;
        try {
          ensureChartCaches(book, d.chart);
          ok = drawChart(g, d.chart, rect.w, rect.h, chartCtx(book));
        } catch {
          ok = false;
        }
        if (!ok) {
          warn.chart = (warn.chart || 0) + 1;
          g.fillStyle = "#f0f2f5";
          g.fillRect(0, 0, rect.w, rect.h);
          g.strokeStyle = "#a0aab9";
          g.setLineDash([6, 4]);
          g.strokeRect(0.5, 0.5, rect.w - 1, rect.h - 1);
          g.setLineDash([]);
          g.fillStyle = "#6e7887";
          g.font = "14px Arial, sans-serif";
          g.textAlign = "center";
          g.fillText("Chart", rect.w / 2, rect.h / 2);
        }
      }
      g.restore();
    });
  }
  void devScale;
  void devY;
}

function drawingRect(L: SheetLayout, d: XDrawing): { x: number; y: number; w: number; h: number } {
  const colX = (c: number) => L.colLeft[Math.max(0, Math.min(c, L.endC + 1))];
  const rowY = (r: number) => L.rowTop[Math.max(1, Math.min(r + 1, L.endR + 1))];
  const x = colX(d.from.c) + d.from.co;
  const y = rowY(d.from.r) + d.from.ro;
  if (d.to) return { x, y, w: Math.max(1, colX(d.to.c) + d.to.co - x), h: Math.max(1, rowY(d.to.r) + d.to.ro - y) };
  return { x, y, w: d.w, h: d.h };
}
