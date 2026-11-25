// XLSX (and CSV) -> workbook model: sheets, cells, styles, merges, page setup, drawings.
import { El, EMU, Pkg, kid, kids, at, numAt, boolAt, relId } from "@/lib/ooxml/xml";
import { Theme, emptyTheme, parseTheme } from "@/lib/ooxml/theme";
import { builtinFormat } from "./numfmt";

export interface XFont {
  name: string;
  sz: number; // pt
  b: boolean;
  i: boolean;
  u: boolean;
  strike: boolean;
  color: string | null;
}

export interface XSide {
  style: string;
  color: string;
}

export interface XXf {
  font: XFont;
  fill: string | null;
  l: XSide | null;
  r: XSide | null;
  t: XSide | null;
  b: XSide | null;
  fmt: string;
  h: string | null;
  v: string | null;
  wrap: boolean;
  indent: number;
  rot: number;
  shrink: boolean;
  visible: boolean; // has a fill or a border
}

export interface XCell {
  c: number;
  v: number | string | boolean | null;
  t: "n" | "s" | "b" | "e";
  xf: number;
}

export interface XRow {
  r: number;
  ht: number | null; // px
  hidden: boolean;
  cells: XCell[];
}

export interface XAnchorPos {
  c: number;
  r: number;
  co: number; // px
  ro: number;
}

export interface XDrawing {
  kind: "pic" | "chart";
  from: XAnchorPos;
  to: XAnchorPos | null;
  w: number;
  h: number;
  path: string | null;
  chart: El | null;
}

export interface XSheet {
  name: string;
  hidden: boolean;
  rows: XRow[];
  colW: Map<number, { w: number; hidden: boolean }>;
  defaultColW: number;
  defaultRowH: number;
  merges: Array<{ r0: number; c0: number; r1: number; c1: number }>;
  orientation: "portrait" | "landscape" | null;
  paperSize: number | null;
  scale: number | null;
  fitToPage: boolean;
  fitW: number;
  fitH: number;
  margins: { l: number; r: number; t: number; b: number; header: number; footer: number };
  gridLines: boolean;
  printArea: { r0: number; c0: number; r1: number; c1: number } | null;
  titleRows: { r0: number; r1: number } | null;
  rowBreaks: number[];
  colBreaks: number[];
  header: string;
  footer: string;
  drawings: XDrawing[];
  hasCondFmt: boolean;
  overThenDown: boolean;
}

export interface XBook {
  sheets: XSheet[];
  xfs: XXf[];
  d1904: boolean;
  theme: Theme;
  pkg: Pkg | null;
  warnings: Record<string, number>;
}

// ---------------------------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------------------------

const INDEXED = [
  "000000", "FFFFFF", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "000000", "FFFFFF", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF",
  "800000", "008000", "000080", "808000", "800080", "008080", "C0C0C0", "808080", "9999FF", "993366", "FFFFCC", "CCFFFF", "660066", "FF8080", "0066CC", "CCCCFF",
  "000080", "FF00FF", "FFFF00", "00FFFF", "800080", "800000", "008080", "0000FF", "00CCFF", "CCFFFF", "CCFFCC", "FFFF99", "99CCFF", "FF99CC", "CC99FF", "FFCC99",
  "3366FF", "33CCCC", "99CC00", "FFCC00", "FF9900", "FF6600", "666699", "969696", "003366", "339966", "003300", "333300", "993300", "993366", "333399", "333333",
];

const THEME_ORDER = ["lt1", "dk1", "lt2", "dk2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];

function tintHex(hex: string, tint: number): string {
  let r = parseInt(hex.slice(0, 2), 16) / 255, g = parseInt(hex.slice(2, 4), 16) / 255, b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  let l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  l = tint < 0 ? l * (1 + tint) : l * (1 - tint) + tint;
  const f = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) r = g = b = l;
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = f(p, q, h + 1 / 3);
    g = f(p, q, h);
    b = f(p, q, h - 1 / 3);
  }
  const x = (v: number) => ("0" + Math.max(0, Math.min(255, Math.round(v * 255))).toString(16)).slice(-2);
  return x(r) + x(g) + x(b);
}

function colorOf(el: El | null, theme: Theme): string | null {
  if (!el) return null;
  let hex: string | null = null;
  const rgb = at(el, "rgb");
  if (rgb) hex = rgb.slice(-6);
  else if (at(el, "theme") !== null) hex = theme.colors[THEME_ORDER[numAt(el, "theme", 1)] || "dk1"] || null;
  else if (at(el, "indexed") !== null) {
    const i = numAt(el, "indexed", 0);
    hex = i === 64 ? "000000" : i === 65 ? "FFFFFF" : INDEXED[i] || null;
  } else if (boolAt(el, "auto", false)) return null;
  if (!hex || !/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const tint = numAt(el, "tint", 0);
  if (tint) hex = tintHex(hex, tint);
  return "#" + hex;
}

// ---------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------

function parseStyles(root: El | null, theme: Theme): XXf[] {
  const defFont: XFont = { name: "Calibri", sz: 11, b: false, i: false, u: false, strike: false, color: null };
  if (!root) return [{ font: defFont, fill: null, l: null, r: null, t: null, b: null, fmt: "General", h: null, v: null, wrap: false, indent: 0, rot: 0, shrink: false, visible: false }];

  const fmts: Record<number, string> = {};
  kids(kid(root, "numFmts"), "numFmt").forEach((n) => {
    fmts[numAt(n, "numFmtId", 0)] = at(n, "formatCode") || "General";
  });

  const fonts: XFont[] = kids(kid(root, "fonts"), "font").map((f) => ({
    name: at(kid(f, "name"), "val") || "Calibri",
    sz: numAt(kid(f, "sz"), "val", 11),
    b: !!kid(f, "b") && at(kid(f, "b"), "val") !== "0",
    i: !!kid(f, "i") && at(kid(f, "i"), "val") !== "0",
    u: !!kid(f, "u") && at(kid(f, "u"), "val") !== "none",
    strike: !!kid(f, "strike") && at(kid(f, "strike"), "val") !== "0",
    color: colorOf(kid(f, "color"), theme),
  }));

  const fills: Array<string | null> = kids(kid(root, "fills"), "fill").map((f) => {
    const p = kid(f, "patternFill");
    if (!p) return null;
    const type = at(p, "patternType") || "none";
    if (type === "none") return null;
    const fg = colorOf(kid(p, "fgColor"), theme);
    if (type === "solid") return fg || colorOf(kid(p, "bgColor"), theme);
    // other patterns: approximate with a light mix of the foreground colour
    return fg ? tintToward(fg) : null;
  });

  const sideOf = (b: El | null): XSide | null => {
    const style = at(b, "style");
    if (!b || !style) return null;
    return { style, color: colorOf(kid(b, "color"), theme) || "#000000" };
  };
  const borders = kids(kid(root, "borders"), "border").map((b) => ({ l: sideOf(kid(b, "left") || kid(b, "start")), r: sideOf(kid(b, "right") || kid(b, "end")), t: sideOf(kid(b, "top")), b: sideOf(kid(b, "bottom")) }));

  const xfs: XXf[] = kids(kid(root, "cellXfs"), "xf").map((x) => {
    const id = numAt(x, "numFmtId", 0);
    const al = kid(x, "alignment");
    const border = borders[numAt(x, "borderId", 0)] || { l: null, r: null, t: null, b: null };
    const fill = fills[numAt(x, "fillId", 0)] || null;
    return {
      font: fonts[numAt(x, "fontId", 0)] || defFont,
      fill,
      l: border.l,
      r: border.r,
      t: border.t,
      b: border.b,
      fmt: fmts[id] !== undefined ? fmts[id] : builtinFormat(id),
      h: at(al, "horizontal"),
      v: at(al, "vertical"),
      wrap: boolAt(al, "wrapText", false),
      indent: numAt(al, "indent", 0),
      rot: numAt(al, "textRotation", 0),
      shrink: boolAt(al, "shrinkToFit", false),
      visible: !!fill || !!border.l || !!border.r || !!border.t || !!border.b,
    };
  });
  return xfs.length ? xfs : [{ font: defFont, fill: null, l: null, r: null, t: null, b: null, fmt: "General", h: null, v: null, wrap: false, indent: 0, rot: 0, shrink: false, visible: false }];
}

function tintToward(hex: string): string {
  return "#" + tintHex(hex.slice(1), 0.6);
}

// ---------------------------------------------------------------------------------------------
// Sheets
// ---------------------------------------------------------------------------------------------

function colIndex(letters: string): number {
  let n = 0;
  for (let i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64);
  return n - 1;
}

function parseRef(ref: string): { c: number; r: number } | null {
  const m = /^\$?([A-Z]+)\$?(\d+)$/.exec(ref.trim());
  return m ? { c: colIndex(m[1]), r: parseInt(m[2], 10) } : null;
}

export function parseRange(text: string): { r0: number; c0: number; r1: number; c1: number } | null {
  const part = text.split("!").pop() || "";
  const [a, b] = part.split(",")[0].split(":");
  const p0 = parseRef(a || "");
  const p1 = parseRef(b || a || "");
  if (!p0 || !p1) return null;
  return { r0: Math.min(p0.r, p1.r), c0: Math.min(p0.c, p1.c), r1: Math.max(p0.r, p1.r), c1: Math.max(p0.c, p1.c) };
}

function newSheet(name: string, hidden: boolean): XSheet {
  return {
    name,
    hidden,
    rows: [],
    colW: new Map(),
    defaultColW: 64,
    defaultRowH: 20,
    merges: [],
    orientation: null,
    paperSize: null,
    scale: null,
    fitToPage: false,
    fitW: 1,
    fitH: 1,
    margins: { l: 0.7 * 96, r: 0.7 * 96, t: 0.75 * 96, b: 0.75 * 96, header: 0.3 * 96, footer: 0.3 * 96 },
    gridLines: false,
    printArea: null,
    titleRows: null,
    rowBreaks: [],
    colBreaks: [],
    header: "",
    footer: "",
    drawings: [],
    hasCondFmt: false,
    overThenDown: false,
  };
}

function sharedStringText(si: El): string {
  const direct = kid(si, "t");
  if (direct) return direct.textContent || "";
  return kids(si, "r")
    .map((r) => kid(r, "t")?.textContent || "")
    .join("");
}

function anchorPos(el: El | null): XAnchorPos {
  return {
    c: parseInt(kid(el, "col")?.textContent || "0", 10),
    r: parseInt(kid(el, "row")?.textContent || "0", 10),
    co: parseFloat(kid(el, "colOff")?.textContent || "0") / EMU,
    ro: parseFloat(kid(el, "rowOff")?.textContent || "0") / EMU,
  };
}

async function parseDrawings(pkg: Pkg, sheetPath: string, root: El, sheet: XSheet, book: XBook) {
  const drawingEl = kid(root, "drawing");
  if (!drawingEl) return;
  const rels = await pkg.rels(sheetPath);
  const rel = rels.get(relId(drawingEl, "id"));
  if (!rel) return;
  const dRoot = await pkg.xml(rel.target);
  const dRels = await pkg.rels(rel.target);
  if (!dRoot) return;
  for (const anchor of kids(dRoot)) {
    const kind = anchor.localName;
    if (kind !== "twoCellAnchor" && kind !== "oneCellAnchor" && kind !== "absoluteAnchor") continue;
    const from = kind === "absoluteAnchor" ? { c: 0, r: 0, co: numAt(kid(anchor, "pos"), "x", 0) / EMU, ro: numAt(kid(anchor, "pos"), "y", 0) / EMU } : anchorPos(kid(anchor, "from"));
    const to = kind === "twoCellAnchor" ? anchorPos(kid(anchor, "to")) : null;
    const ext = kid(anchor, "ext");
    const w = numAt(ext, "cx", 0) / EMU, h = numAt(ext, "cy", 0) / EMU;
    const pic = kid(anchor, "pic");
    const gf = kid(anchor, "graphicFrame");
    if (pic) {
      const blip = pic.getElementsByTagNameNS("*", "blip")[0];
      const r = dRels.get(relId(blip, "embed"));
      sheet.drawings.push({ kind: "pic", from, to, w, h, path: r && !r.external ? r.target : null, chart: null });
    } else if (gf) {
      const chartEl = gf.getElementsByTagNameNS("*", "chart")[0];
      const r = chartEl ? dRels.get(relId(chartEl, "id")) : null;
      const chart = r && !r.external ? await pkg.xml(r.target) : null;
      if (chart) sheet.drawings.push({ kind: "chart", from, to, w, h, path: null, chart });
      else book.warnings.object = (book.warnings.object || 0) + 1;
    } else if (kid(anchor, "sp") || kid(anchor, "grpSp") || kid(anchor, "cxnSp")) {
      book.warnings.shape = (book.warnings.shape || 0) + 1;
    }
  }
}

async function parseSheet(pkg: Pkg, path: string, name: string, hidden: boolean, sst: string[], book: XBook): Promise<XSheet> {
  const sheet = newSheet(name, hidden);
  const root = await pkg.xml(path);
  if (!root) return sheet;

  const fmtPr = kid(root, "sheetFormatPr");
  sheet.defaultRowH = ((numAt(fmtPr, "defaultRowHeight", 15) || 15) * 96) / 72;
  const dcw = numAt(fmtPr, "defaultColWidth", 0);
  sheet.defaultColW = dcw ? Math.round(dcw * 7) : 64;

  kids(kid(root, "cols"), "col").forEach((c) => {
    const min = numAt(c, "min", 1), max = Math.min(numAt(c, "max", min), min + 2000);
    const w = Math.round(numAt(c, "width", 0) * 7);
    const hid = boolAt(c, "hidden", false);
    for (let i = min; i <= max; i++) sheet.colW.set(i - 1, { w: w || sheet.defaultColW, hidden: hid });
  });

  const rows: XRow[] = [];
  kids(kid(root, "sheetData"), "row").forEach((rEl, idx) => {
    const r = numAt(rEl, "r", idx + 1);
    const ht = at(rEl, "ht");
    const row: XRow = { r, ht: ht ? (parseFloat(ht) * 96) / 72 : null, hidden: boolAt(rEl, "hidden", false), cells: [] };
    let nextCol = 0;
    kids(rEl, "c").forEach((cEl) => {
      const ref = parseRef(at(cEl, "r") || "");
      const c = ref ? ref.c : nextCol;
      nextCol = c + 1;
      const t = at(cEl, "t") || "n";
      const xf = numAt(cEl, "s", 0);
      const vEl = kid(cEl, "v");
      let v: XCell["v"] = null;
      let type: XCell["t"] = "n";
      if (t === "s") {
        const s = sst[parseInt(vEl?.textContent || "-1", 10)];
        if (s !== undefined) {
          v = s;
          type = "s";
        }
      } else if (t === "inlineStr") {
        v = kids(kid(cEl, "is")).length ? sharedStringText(kid(cEl, "is") as El) : "";
        type = "s";
      } else if (t === "str") {
        v = vEl?.textContent ?? "";
        type = "s";
      } else if (t === "b") {
        v = vEl?.textContent === "1";
        type = "b";
      } else if (t === "e") {
        v = vEl?.textContent || "#ERROR!";
        type = "e";
      } else if (t === "d") {
        const ms = Date.parse(vEl?.textContent || "");
        v = isNaN(ms) ? null : ms / 86400000 + 25569;
      } else if (vEl && vEl.textContent !== "") {
        const n = parseFloat(vEl.textContent || "");
        v = isNaN(n) ? null : n;
      }
      const style = book.xfs[xf];
      if (v === null && !(style && style.visible)) return;
      row.cells.push({ c, v, t: type, xf });
    });
    if (row.cells.length || row.ht !== null || row.hidden) rows.push(row);
  });
  sheet.rows = rows;

  kids(kid(root, "mergeCells"), "mergeCell").forEach((m) => {
    const rg = parseRange(at(m, "ref") || "");
    if (rg) sheet.merges.push(rg);
  });

  const ps = kid(root, "pageSetup");
  const o = at(ps, "orientation");
  sheet.orientation = o === "landscape" ? "landscape" : o === "portrait" ? "portrait" : null;
  sheet.paperSize = at(ps, "paperSize") ? numAt(ps, "paperSize", 1) : null;
  sheet.scale = at(ps, "scale") ? numAt(ps, "scale", 100) / 100 : null;
  sheet.fitW = numAt(ps, "fitToWidth", 1);
  sheet.fitH = numAt(ps, "fitToHeight", 1);
  sheet.overThenDown = at(ps, "pageOrder") === "overThenDown";
  sheet.fitToPage = boolAt(kid(kid(root, "sheetPr"), "pageSetUpPr"), "fitToPage", false);
  const pm = kid(root, "pageMargins");
  if (pm) {
    const inch = (n: string, d: number) => numAt(pm, n, d) * 96;
    sheet.margins = { l: inch("left", 0.7), r: inch("right", 0.7), t: inch("top", 0.75), b: inch("bottom", 0.75), header: inch("header", 0.3), footer: inch("footer", 0.3) };
  }
  sheet.gridLines = boolAt(kid(root, "printOptions"), "gridLines", false);
  kids(kid(root, "rowBreaks"), "brk").forEach((b) => sheet.rowBreaks.push(numAt(b, "id", 0)));
  kids(kid(root, "colBreaks"), "brk").forEach((b) => sheet.colBreaks.push(numAt(b, "id", 0)));
  const hf = kid(root, "headerFooter");
  sheet.header = kid(hf, "oddHeader")?.textContent || "";
  sheet.footer = kid(hf, "oddFooter")?.textContent || "";
  sheet.hasCondFmt = !!kid(root, "conditionalFormatting");

  try {
    await parseDrawings(pkg, path, root, sheet, book);
  } catch {
    /* drawings are optional */
  }
  return sheet;
}

// ---------------------------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------------------------

export async function loadXlsx(buf: ArrayBuffer): Promise<XBook> {
  const JSZip = (await import("jszip")).default;
  let zip: any;
  try {
    zip = await JSZip.loadAsync(buf);
  } catch {
    throw new Error("This file could not be opened. Make sure it is a valid .xlsx file (not an old .xls).");
  }
  const pkg = new Pkg(zip);
  const wb = await pkg.xml("xl/workbook.xml");
  if (!wb) throw new Error("This does not look like an Excel (.xlsx) file.");
  const themeRoot = await pkg.xml("xl/theme/theme1.xml");
  const theme = themeRoot ? parseTheme(themeRoot) : emptyTheme();
  const xfs = parseStyles(await pkg.xml("xl/styles.xml"), theme);

  const sst: string[] = [];
  const sstRoot = await pkg.xml("xl/sharedStrings.xml");
  kids(sstRoot, "si").forEach((si) => sst.push(sharedStringText(si)));

  const book: XBook = { sheets: [], xfs, d1904: boolAt(kid(wb, "workbookPr"), "date1904", false), theme, pkg, warnings: {} };
  const rels = await pkg.rels("xl/workbook.xml");
  const metas = kids(kid(wb, "sheets"), "sheet");
  for (let i = 0; i < metas.length; i++) {
    const m = metas[i];
    const rel = rels.get(relId(m, "id"));
    if (!rel || rel.external) continue;
    const state = at(m, "state");
    const sheet = await parseSheet(pkg, rel.target, at(m, "name") || "Sheet" + (i + 1), state === "hidden" || state === "veryHidden", sst, book);
    book.sheets.push(sheet);
  }
  if (!book.sheets.length) throw new Error("No sheets found in this workbook.");

  // print areas and print titles
  kids(kid(wb, "definedNames"), "definedName").forEach((dn) => {
    const nm = at(dn, "name") || "";
    const local = at(dn, "localSheetId");
    if (local === null) return;
    const sheet = metas.length ? book.sheets.find((s) => s.name === at(metas[parseInt(local, 10)], "name")) : null;
    if (!sheet) return;
    const text = dn.textContent || "";
    if (nm === "_xlnm.Print_Area") sheet.printArea = parseRange(text);
    else if (nm === "_xlnm.Print_Titles") {
      const m = /\$(\d+):\$(\d+)/.exec(text.split("!").pop() || "");
      if (m) sheet.titleRows = { r0: parseInt(m[1], 10), r1: parseInt(m[2], 10) };
    }
  });

  if (book.sheets.some((s) => s.hasCondFmt)) book.warnings.condfmt = 1;
  return book;
}

function parseCsv(text: string): string[][] {
  const first = text.split(/\r?\n/, 1)[0] || "";
  const delim = [",", ";", "\t", "|"].reduce((best, d) => (first.split(d).length > first.split(best).length ? d : best), ",");
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let q = false;
  const s = text.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) {
      if (ch === '"' && s[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === delim) {
      row.push(cur);
      cur = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && s[i + 1] === "\n") i++;
      row.push(cur);
      cur = "";
      rows.push(row);
      row = [];
    } else cur += ch;
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c !== ""));
}

export function loadCsv(text: string, name: string): XBook {
  const theme = emptyTheme();
  const xfs = parseStyles(null, theme);
  // style 1: header row (bold, light fill, thin borders); style 2: body cells with thin borders
  const side: XSide = { style: "thin", color: "#c8ced8" };
  xfs.push({ ...xfs[0], font: { ...xfs[0].font, b: true }, fill: "#eef2f7", l: side, r: side, t: side, b: side, visible: true });
  xfs.push({ ...xfs[0], l: side, r: side, t: side, b: side, visible: true });
  const book: XBook = { sheets: [], xfs, d1904: false, theme, pkg: null, warnings: {} };
  const sheet = newSheet(name, false);
  const widths: number[] = [];
  parseCsv(text).forEach((cells, ri) => {
    const row: XRow = { r: ri + 1, ht: null, hidden: false, cells: [] };
    cells.forEach((v, ci) => {
      if (v === "") return;
      const num = /^-?(\d+|\d*\.\d+)$/.test(v.trim()) && !/^-?0\d/.test(v.trim());
      row.cells.push({ c: ci, v: num ? parseFloat(v) : v, t: num ? "n" : "s", xf: ri === 0 ? 1 : 2 });
      widths[ci] = Math.max(widths[ci] || 0, Math.min(60, v.length));
    });
    if (row.cells.length) sheet.rows.push(row);
  });
  widths.forEach((w, ci) => sheet.colW.set(ci, { w: Math.max(64, Math.min(420, Math.round(w * 7.2 + 14))), hidden: false }));
  book.sheets.push(sheet);
  return book;
}
