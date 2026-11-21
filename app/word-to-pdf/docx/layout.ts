// DOCX layout: line breaking, tables and pagination. Produces drawing commands per page.
import { Block, Border, Cell, Crop, DocModel, Inline, Para, RStyle, SectProps, Table } from "./model";

export interface LTok {
  x: number;
  w: number;
  text: string;
  css: string;
  size: number;
  family: string;
  offset: number; // px up
  st: RStyle;
  kind: "w" | "s" | "tab" | "img";
  leader?: string;
  img?: { path: string | null; w: number; h: number; crop: Crop; rot: number };
}

export interface LLine {
  toks: LTok[];
  h: number;
  descent: number;
  breakAfter: boolean;
}

export type Cmd =
  | { t: "line"; x: number; y: number; line: LLine }
  | { t: "rect"; x: number; y: number; w: number; h: number; fill: string }
  | { t: "ln"; x1: number; y1: number; x2: number; y2: number; w: number; color: string; style: string }
  | { t: "img"; x: number; y: number; w: number; h: number; path: string | null; crop: Crop; rot: number; z: number };

export interface PageLayout {
  cmds: Cmd[];
  sect: SectProps;
  kind: "default" | "first" | "even";
}

export interface LC {
  g: CanvasRenderingContext2D;
  defaultTab: number;
}

export interface FieldCtx {
  page: number;
  total: number;
}

interface LFloat {
  inl: Extract<Inline, { k: "img" }>;
}

interface LPara {
  lines: LLine[];
  floats: LFloat[];
}

// ---------------------------------------------------------------------------------------------
// Fonts and measuring
// ---------------------------------------------------------------------------------------------

const LH: Record<string, number> = {
  calibri: 1.22, "calibri light": 1.22, cambria: 1.17, arial: 1.15, "arial narrow": 1.15, "times new roman": 1.15,
  verdana: 1.215, tahoma: 1.207, "segoe ui": 1.33, georgia: 1.136, "trebuchet ms": 1.16, consolas: 1.17,
  "courier new": 1.133, aptos: 1.2, "century gothic": 1.22, "comic sans ms": 1.39, "nirmala ui": 1.5, shruti: 1.5,
  mangal: 1.4, "noto sans gujarati": 1.5, "noto sans devanagari": 1.5,
};

const SERIF = /^(times|georgia|cambria|garamond|palatino|book antiqua|bookman|century schoolbook|baskerville|constantia|minion|sylfaen|rockwell|cambria math)/i;
const MONO = /^(consolas|courier|lucida console|monaco|menlo|andale mono|cascadia)/i;

const stackCache = new Map<string, string>();

function stack(name: string): string {
  let s = stackCache.get(name);
  if (s) return s;
  const q = '"' + name.replace(/"/g, "") + '"';
  if (/^calibri/i.test(name)) s = `${q}, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
  else if (/^(arial|helvetica)/i.test(name)) s = `${q}, Arial, Helvetica, "Liberation Sans", sans-serif`;
  else if (/^times/i.test(name)) s = `${q}, "Times New Roman", Times, "Liberation Serif", serif`;
  else if (SERIF.test(name)) s = `${q}, Georgia, "Times New Roman", serif`;
  else if (MONO.test(name)) s = `${q}, "Courier New", Menlo, monospace`;
  else s = `${q}, Calibri, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
  stackCache.set(name, s);
  return s;
}

type Cls = "l" | "c" | "e";
const CS_RE = /[֐-ࣿऀ-෿฀-࿿]/;
const EA_RE = /[⺀-鿿豈-﫿＀-￯]/;
const PIECE_RE = /[֐-ࣿऀ-෿฀-࿿]+|[⺀-鿿豈-﫿＀-￯]|[^\s֐-ࣿऀ-෿฀-࿿⺀-鿿豈-﫿＀-￯]+/g;

function clsOf(s: string): Cls {
  if (CS_RE.test(s)) return "c";
  if (EA_RE.test(s)) return "e";
  return "l";
}

function fontOf(st: RStyle, cls: Cls): { css: string; size: number; family: string } {
  const family = cls === "c" ? st.fC : cls === "e" ? st.fE : st.fL;
  let size = cls === "c" ? st.szC : st.szL;
  const bold = cls === "c" ? st.bC : st.bL;
  const italic = cls === "c" ? st.iC : st.iL;
  if (st.vert !== "base") size *= 0.65;
  else if (st.smallCaps && !st.caps) size *= 0.8;
  return { css: `${italic ? "italic " : ""}${bold ? "bold " : ""}${size.toFixed(2)}px ${stack(family)}`, size, family };
}

function lineFactor(family: string): number {
  return LH[family.toLowerCase()] || 1.2;
}

const HAS_LS = typeof CanvasRenderingContext2D !== "undefined" && "letterSpacing" in CanvasRenderingContext2D.prototype;
const widthCache = new Map<string, number>();

function measure(g: CanvasRenderingContext2D, text: string, css: string, spacing: number): number {
  const key = css + "|" + spacing + "|" + text;
  const hit = widthCache.get(key);
  if (hit !== undefined) return hit;
  g.font = css;
  if (HAS_LS) (g as any).letterSpacing = spacing ? spacing + "px" : "0px";
  let w = g.measureText(text).width;
  if (!HAS_LS && spacing) w += spacing * text.length;
  if (widthCache.size > 60000) widthCache.clear();
  widthCache.set(key, w);
  return w;
}

// ---------------------------------------------------------------------------------------------
// Paragraph layout
// ---------------------------------------------------------------------------------------------

interface Tk {
  kind: "w" | "s" | "tab" | "img" | "br";
  text: string;
  w: number;
  st: RStyle;
  css: string;
  size: number;
  family: string;
  cls: Cls;
  glue: boolean;
  offset: number;
  img?: LTok["img"];
  page?: boolean;
  numTab?: boolean;
}

function textTokens(lc: LC, text: string, st: RStyle, out: Tk[]) {
  const t = st.caps || st.smallCaps ? text.toUpperCase() : text;
  const offset = st.vert === "super" ? st.szL * 0.35 : st.vert === "sub" ? -st.szL * 0.12 : 0;
  t.split(/(\s+)/).forEach((chunk) => {
    if (!chunk) return;
    if (/^\s+$/.test(chunk)) {
      const s = chunk.replace(/\t/g, " ");
      const f = fontOf(st, "l");
      out.push({ kind: "s", text: s, w: measure(lc.g, s, f.css, st.spacing), st, css: f.css, size: f.size, family: f.family, cls: "l", glue: false, offset });
      return;
    }
    const pieces = chunk.match(PIECE_RE) || [chunk];
    pieces.forEach((piece, i) => {
      const cls = clsOf(piece);
      const f = fontOf(st, cls);
      out.push({
        kind: "w",
        text: piece,
        w: measure(lc.g, piece, f.css, st.spacing),
        st,
        css: f.css,
        size: f.size,
        family: f.family,
        cls,
        glue: i > 0,
        offset,
      });
    });
  });
}

function blankTok(st: RStyle, kind: Tk["kind"]): Tk {
  const f = fontOf(st, "l");
  return { kind, text: "", w: 0, st, css: f.css, size: f.size, family: f.family, cls: "l", glue: false, offset: 0 };
}

export function layoutPara(lc: LC, p: Para, colW: number, fld: FieldCtx | null, inCell = false): LPara {
  const ps = p.ps;
  const toks: Tk[] = [];
  const floats: LFloat[] = [];
  const maxInline = Math.max(20, colW - ps.indLeft - ps.indRight);

  if (p.num) {
    textTokens(lc, p.num.text, p.num.st, toks);
    if (p.num.suffix === "tab") {
      const t = blankTok(p.num.st, "tab");
      t.numTab = true;
      toks.push(t);
    } else if (p.num.suffix === "space") textTokens(lc, " ", p.num.st, toks);
  }

  p.inlines.forEach((inl) => {
    switch (inl.k) {
      case "t":
        textTokens(lc, inl.text, inl.st, toks);
        break;
      case "fld": {
        const text = fld ? String(inl.kind === "page" ? fld.page : fld.total) : inl.text;
        textTokens(lc, text, inl.st, toks);
        break;
      }
      case "tab":
        toks.push(blankTok(inl.st, "tab"));
        break;
      case "br": {
        const t = blankTok(inl.st, "br");
        t.page = inl.type !== "line";
        toks.push(t);
        break;
      }
      case "img": {
        if (!inCell && inl.anchor && (inl.anchor.behind || inl.anchor.wrap === "none")) {
          floats.push({ inl });
          break;
        }
        let w = inl.w, h = inl.h;
        if (w > maxInline) {
          h = (h * maxInline) / w;
          w = maxInline;
        }
        const t = blankTok(inl.st, "img");
        t.w = w;
        t.img = { path: inl.path, w, h, crop: inl.crop, rot: inl.rot };
        toks.push(t);
        break;
      }
    }
  });

  const first = Math.max(0, ps.indLeft + ps.indFirst);
  const right = colW - ps.indRight;
  const lines: LLine[] = [];

  // custom tab stops (+ implicit stop at the hanging indent)
  const stops = ps.tabs.filter((t) => t.kind !== "clear" && t.kind !== "bar").map((t) => ({ pos: t.pos, kind: t.kind, leader: t.leader }));
  if (ps.indFirst < 0 || p.num) stops.push({ pos: ps.indLeft, kind: "left", leader: "none" });
  stops.sort((a, b) => a.pos - b.pos);

  const nextStop = (x: number) => {
    for (let i = 0; i < stops.length; i++) if (stops[i].pos > x + 0.5) return stops[i];
    const d = lc.defaultTab || 48;
    return { pos: (Math.floor((x + 0.5) / d) + 1) * d, kind: "left", leader: "none" };
  };

  const lookWidth = (from: number, decimal: boolean): number => {
    let w = 0;
    for (let k = from; k < toks.length; k++) {
      const t = toks[k];
      if (t.kind === "tab" || t.kind === "br") break;
      if (decimal && t.kind === "w") {
        const i = t.text.indexOf(".");
        if (i >= 0) return w + measure(lc.g, t.text.slice(0, i), t.css, t.st.spacing);
      }
      w += t.w;
    }
    return w;
  };

  let cur: LTok[] = [];
  let x = first;
  let lineStart = first;
  let hasTab = false;
  let hasContent = false;
  let spaceCount = 0;

  const finish = (hard: boolean, pageBreak: boolean) => {
    // trim trailing spaces
    while (cur.length && cur[cur.length - 1].kind === "s") cur.pop();
    const textToks = cur.filter((t) => t.kind !== "img");
    let natural = 0;
    let ascentImg = 0;
    let maxSize = 0;
    cur.forEach((t) => {
      if (t.kind === "img" && t.img) ascentImg = Math.max(ascentImg, t.img.h);
      else {
        natural = Math.max(natural, t.size * lineFactor(t.family));
        maxSize = Math.max(maxSize, t.size);
      }
    });
    if (!textToks.length && !ascentImg) {
      const f = fontOf(p.endSt, "l");
      natural = f.size * lineFactor(f.family);
      maxSize = f.size;
    }
    const descent = natural * 0.22;
    let h = natural;
    if (ps.lineRule === "auto") h = Math.max(natural * ps.line, ascentImg ? ascentImg + descent : 0);
    else if (ps.lineRule === "exact") h = ps.line;
    else h = Math.max(natural, ps.line, ascentImg ? ascentImg + descent : 0);

    // alignment
    const L = lineStart;
    const end = cur.length ? cur[cur.length - 1].x + cur[cur.length - 1].w : L;
    const contentW = end - L;
    const R = right;
    if (!hasTab && cur.length) {
      if (ps.jc === "center") {
        const sh = (R - L - contentW) / 2;
        cur.forEach((t) => (t.x += sh));
      } else if (ps.jc === "right") {
        const sh = R - L - contentW;
        cur.forEach((t) => (t.x += sh));
      } else if (ps.jc === "both" && !hard && R - L > contentW && cur.some((t) => t.kind === "s")) {
        const extra = (R - L - contentW) / cur.filter((t) => t.kind === "s").length;
        let acc = 0;
        cur.forEach((t) => {
          t.x += acc;
          if (t.kind === "s") acc += extra;
        });
      }
    }
    lines.push({ toks: cur, h, descent, breakAfter: pageBreak });
    cur = [];
    hasContent = false;
    hasTab = false;
    spaceCount = 0;
    lineStart = Math.max(0, ps.indLeft);
    x = lineStart;
  };

  const placeTok = (t: Tk, w: number): LTok => {
    const lt: LTok = { x, w, text: t.text, css: t.css, size: t.size, family: t.family, offset: t.offset, st: t.st, kind: t.kind as LTok["kind"] };
    if (t.img) lt.img = t.img;
    x += w;
    return lt;
  };

  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.kind === "br") {
      finish(true, !!t.page);
      continue;
    }
    if (t.kind === "tab") {
      const stop = nextStop(x);
      let target = stop.pos;
      if (stop.kind === "right") target = stop.pos - lookWidth(i + 1, false);
      else if (stop.kind === "center") target = stop.pos - lookWidth(i + 1, false) / 2;
      else if (stop.kind === "decimal") target = stop.pos - lookWidth(i + 1, true);
      if (target < x) target = x;
      const lt: LTok = { x, w: target - x, text: "", css: t.css, size: t.size, family: t.family, offset: 0, st: t.st, kind: "tab", leader: stop.leader };
      x = target;
      cur.push(lt);
      hasTab = true;
      hasContent = true;
      continue;
    }
    if (t.kind === "s") {
      if (!hasContent && lines.length > 0) continue; // skip leading spaces on wrapped lines
      cur.push(placeTok(t, t.w));
      spaceCount++;
      hasContent = true;
      continue;
    }
    // word or image: measure the unbreakable unit (glued pieces)
    let unit = t.w;
    if (t.cls !== "e") {
      for (let k = i + 1; k < toks.length; k++) {
        const n = toks[k];
        if (n.kind === "w" && n.glue && n.cls !== "e") unit += n.w;
        else break;
      }
    }
    if (t.glue && t.cls !== "e" && i > 0 && toks[i - 1].cls !== "e") unit = t.w; // already inside a unit
    if (!t.glue && x + unit > right + 0.5 && cur.some((c) => c.kind !== "s")) finish(false, false);
    else if (t.glue && t.cls === "e" && x + t.w > right + 0.5 && cur.length) finish(false, false);
    cur.push(placeTok(t, t.w));
    hasContent = true;
  }
  if (cur.length || !lines.length || toks.length === 0) finish(true, false);
  else if (cur.length === 0 && lines.length && toks[toks.length - 1].kind === "br") finish(true, false);

  return { lines, floats };
}

// ---------------------------------------------------------------------------------------------
// Flow layout (no pagination): used for table cells, headers and footers
// ---------------------------------------------------------------------------------------------

export function translate(cmds: Cmd[], dx: number, dy: number): Cmd[] {
  return cmds.map((c) => {
    switch (c.t) {
      case "ln":
        return { ...c, x1: c.x1 + dx, y1: c.y1 + dy, x2: c.x2 + dx, y2: c.y2 + dy };
      default:
        return { ...c, x: c.x + dx, y: c.y + dy };
    }
  });
}

function paraDecor(p: Para, x0: number, x1: number, y0: number, y1: number): Cmd[] {
  const out: Cmd[] = [];
  const ps = p.ps;
  const left = x0 + Math.min(ps.indLeft, ps.indLeft + ps.indFirst);
  const right = x1 - ps.indRight;
  if (ps.shade) out.push({ t: "rect", x: left, y: y0, w: right - left, h: y1 - y0, fill: ps.shade });
  const b = ps.borders;
  const ln = (bd: Border | null, ax: number, ay: number, bx: number, by: number) => {
    if (bd) out.push({ t: "ln", x1: ax, y1: ay, x2: bx, y2: by, w: bd.w, color: bd.color, style: bd.style });
  };
  ln(b.top, left, y0, right, y0);
  ln(b.bottom, left, y1, right, y1);
  ln(b.left, left, y0, left, y1);
  ln(b.right, right, y0, right, y1);
  return out;
}

export function layoutFlow(lc: LC, blocks: Block[], width: number, fld: FieldCtx | null, inCell = false): { cmds: Cmd[]; h: number } {
  const cmds: Cmd[] = [];
  let y = 0;
  let prev: Para | null = null;
  blocks.forEach((b) => {
    if (b.k === "p") {
      const lp = layoutPara(lc, b, width, fld, inCell);
      let before = b.ps.before;
      if (prev && b.ps.contextual && prev.styleId === b.styleId && prev.ps.contextual) {
        y -= prev.ps.after;
        before = 0;
      }
      y += before;
      const top = y;
      const start = cmds.length;
      lp.lines.forEach((ln) => {
        cmds.push({ t: "line", x: 0, y, line: ln });
        y += ln.h;
      });
      const decor = paraDecor(b, 0, width, top, y);
      if (decor.length) cmds.splice(start, 0, ...decor);
      y += b.ps.after;
      prev = b;
    } else {
      const lt = layoutTable(lc, b, width, fld);
      lt.rows.forEach((r) => {
        cmds.push(...translate(r.cmds, lt.x0, y));
        y += r.h;
      });
      prev = null;
    }
  });
  return { cmds, h: y };
}

// ---------------------------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------------------------

export interface LRow {
  cmds: Cmd[]; // relative to the table's top-left
  h: number;
  header: boolean;
}

export interface LTable {
  rows: LRow[];
  x0: number;
  width: number;
}

export function layoutTable(lc: LC, t: Table, availW: number, fld: FieldCtx | null): LTable {
  const total = t.grid.reduce((a, b) => a + b, 0) || 1;
  const room = Math.max(50, availW - t.indent);
  const scale = total > room * 1.005 ? room / total : 1;
  const grid = t.grid.map((g) => g * scale);
  const tw = grid.reduce((a, b) => a + b, 0);
  let x0 = t.indent;
  if (t.jc === "center") x0 = (availW - tw) / 2;
  else if (t.jc === "right" || t.jc === "end") x0 = availW - tw;

  const colX: number[] = [0];
  grid.forEach((g, i) => colX.push(colX[i] + g));

  interface CellInfo {
    cell: Cell;
    col: number;
    ri: number;
    x: number;
    w: number;
    marL: number;
    marR: number;
    marT: number;
    marB: number;
    content: { cmds: Cmd[]; h: number };
    rowspan: number;
    skip: boolean;
  }
  const infos: CellInfo[][] = [];
  t.rows.forEach((row, ri) => {
    let col = 0;
    const list: CellInfo[] = [];
    row.cells.forEach((cell) => {
      const x = colX[Math.min(col, grid.length)];
      const w = (colX[Math.min(grid.length, col + cell.span)] || tw) - x;
      const marL = cell.mar.l !== null ? cell.mar.l : t.mar.l;
      const marR = cell.mar.r !== null ? cell.mar.r : t.mar.r;
      const marT = cell.mar.t !== null ? cell.mar.t : t.mar.t;
      const marB = cell.mar.b !== null ? cell.mar.b : t.mar.b;
      const skip = cell.vmerge === "continue";
      const content = skip ? { cmds: [], h: 0 } : layoutFlow(lc, cell.blocks, Math.max(10, w - marL - marR), fld, true);
      list.push({ cell, col, ri, x, w, marL, marR, marT, marB, content, rowspan: 1, skip });
      col += cell.span;
    });
    infos.push(list);
  });

  // vertical merges: count rows spanned by each restart cell
  infos.forEach((list, ri) => {
    list.forEach((ci) => {
      if (ci.cell.vmerge !== "restart") return;
      let n = 1;
      for (let r2 = ri + 1; r2 < infos.length; r2++) {
        const below = infos[r2].find((c2) => c2.col === ci.col);
        if (below && below.cell.vmerge === "continue") n++;
        else break;
      }
      ci.rowspan = n;
    });
  });

  // row heights
  const heights = t.rows.map((row, ri) => {
    let h = 0;
    infos[ri].forEach((ci) => {
      if (ci.skip || ci.rowspan > 1) return;
      h = Math.max(h, ci.content.h + ci.marT + ci.marB);
    });
    if (row.hRule === "exact") h = row.height;
    else h = Math.max(h, row.height);
    return h;
  });
  infos.forEach((list, ri) => {
    list.forEach((ci) => {
      if (ci.rowspan <= 1) return;
      let sum = 0;
      for (let k = ri; k < ri + ci.rowspan; k++) sum += heights[k];
      const need = ci.content.h + ci.marT + ci.marB;
      if (need > sum) heights[ri + ci.rowspan - 1] += need - sum;
    });
  });

  const rows: LRow[] = [];
  let headerRun = true;
  t.rows.forEach((row, ri) => {
    const cmds: Cmd[] = [];
    infos[ri].forEach((ci) => {
      if (ci.skip) return;
      let h = 0;
      for (let k = ri; k < ri + ci.rowspan; k++) h += heights[k];
      if (ci.cell.shade) cmds.push({ t: "rect", x: ci.x, y: 0, w: ci.w, h, fill: ci.cell.shade });
      const innerH = h - ci.marT - ci.marB;
      let dy = ci.marT;
      if (ci.cell.valign === "center") dy += Math.max(0, (innerH - ci.content.h) / 2);
      else if (ci.cell.valign === "bottom") dy += Math.max(0, innerH - ci.content.h);
      cmds.push(...translate(ci.content.cmds, ci.x + ci.marL, dy));
      const b = ci.cell.borders;
      const line = (bd: Border | null | undefined, x1: number, y1: number, x2: number, y2: number) => {
        if (bd) cmds.push({ t: "ln", x1, y1, x2, y2, w: bd.w, color: bd.color, style: bd.style });
      };
      line(b.top, ci.x, 0, ci.x + ci.w, 0);
      line(b.bottom, ci.x, h, ci.x + ci.w, h);
      line(b.left, ci.x, 0, ci.x, h);
      line(b.right, ci.x + ci.w, 0, ci.x + ci.w, h);
    });
    if (!row.header) headerRun = false;
    rows.push({ cmds, h: heights[ri], header: headerRun && row.header });
  });
  return { rows, x0, width: tw };
}

// ---------------------------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------------------------

function pageKind(sect: SectProps, pageInSection: number, pageNo: number, evenOdd: boolean): PageLayout["kind"] {
  if (sect.titlePg && pageInSection === 0) return "first";
  if (evenOdd && pageNo % 2 === 0) return "even";
  return "default";
}

function partHeight(lc: LC, model: DocModel, rid: string | undefined, width: number): number {
  const blocks = rid ? model.parts.get(rid) : null;
  if (!blocks || !blocks.length) return 0;
  return layoutFlow(lc, blocks, width, { page: 1, total: 1 }).h;
}

export function paginate(lc: LC, model: DocModel, onProgress?: (n: number) => void): PageLayout[] {
  const pages: PageLayout[] = [];
  let cur: PageLayout | null = null;
  let y = 0, top = 0, bottom = 0, colLeft = 0, colW = 0;
  let sect: SectProps = model.sections[0].props;
  let pageInSection = 0;
  let autoBreak = false;
  let prevPara: Para | null = null;

  const hfCache = new Map<string, { h: number; f: number }>();
  const hfHeights = (kind: PageLayout["kind"]) => {
    const key = sect.pageW + "|" + kind + "|" + (sect.headers[kind] || "") + "|" + (sect.footers[kind] || "");
    let v = hfCache.get(key);
    if (!v) {
      const w = sect.pageW - sect.mL - sect.mR;
      v = { h: partHeight(lc, model, sect.headers[kind], w), f: partHeight(lc, model, sect.footers[kind], w) };
      hfCache.set(key, v);
    }
    return v;
  };

  const newPage = (auto: boolean) => {
    const kind = pageKind(sect, pageInSection, pages.length + 1, model.evenOdd);
    cur = { cmds: [], sect, kind };
    pages.push(cur);
    pageInSection++;
    const hf = hfHeights(kind);
    colLeft = sect.mL;
    colW = Math.max(50, sect.pageW - sect.mL - sect.mR);
    top = sect.mT;
    if (hf.h > 0) top = Math.max(top, sect.hdrDist + hf.h + 4);
    bottom = sect.pageH - sect.mB;
    if (hf.f > 0) bottom = Math.min(bottom, sect.pageH - sect.ftrDist - hf.f - 4);
    y = top;
    autoBreak = auto;
    prevPara = null;
    if (onProgress) onProgress(pages.length);
  };

  const placeFloat = (f: LFloat, paraTop: number) => {
    const a = f.inl.anchor;
    if (!a || !cur) return;
    const w = f.inl.w, h = f.inl.h;
    let x = 0, yy = 0;
    const baseX = a.relH === "page" ? 0 : sect.mL;
    const spanX = a.relH === "page" ? sect.pageW : sect.pageW - sect.mL - sect.mR;
    if (a.alignH) x = baseX + (a.alignH === "center" ? (spanX - w) / 2 : a.alignH === "right" || a.alignH === "outside" ? spanX - w : 0);
    else x = baseX + a.offH;
    const rv = a.relV;
    const baseY = rv === "page" ? 0 : rv === "margin" || rv === "topMargin" ? sect.mT : paraTop;
    const spanY = rv === "page" ? sect.pageH : sect.pageH - sect.mT - sect.mB;
    if (a.alignV) yy = baseY + (a.alignV === "center" ? (spanY - h) / 2 : a.alignV === "bottom" ? spanY - h : 0);
    else yy = baseY + a.offV;
    cur.cmds.push({ t: "img", x, y: yy, w, h, path: f.inl.path, crop: f.inl.crop, rot: f.inl.rot, z: a.behind ? -1 : 1 });
  };

  const emitLines = (p: Para, lp: LPara, from: number, count: number) => {
    const page = cur as PageLayout;
    const segTop = y;
    const start = page.cmds.length;
    for (let i = from; i < from + count; i++) {
      page.cmds.push({ t: "line", x: colLeft, y, line: lp.lines[i] });
      y += lp.lines[i].h;
    }
    const decor = paraDecor(p, colLeft, colLeft + colW, segTop, y);
    if (decor.length) page.cmds.splice(start, 0, ...decor);
  };

  const needAfterKeep = (b: Block | undefined): number => {
    if (!b) return 0;
    if (b.k === "p") {
      const lp = layoutPara(lc, b, colW, null);
      const n = Math.min(lp.lines.length, 2);
      let h = b.ps.before;
      for (let i = 0; i < n; i++) h += lp.lines[i].h;
      return h;
    }
    const lt = layoutTable(lc, b, colW, null);
    return lt.rows.length ? lt.rows[0].h : 0;
  };

  const placePara = (p: Para, next: Block | undefined) => {
    const lp = layoutPara(lc, p, colW, null);
    if (p.ps.pageBreakBefore && y > top + 0.5) newPage(false);
    let before = p.ps.before;
    if (prevPara && p.ps.contextual && prevPara.styleId === p.styleId && prevPara.ps.contextual) {
      y -= prevPara.ps.after;
      before = 0;
    }
    if (y <= top + 0.5 && autoBreak && pages.length > 1) before = 0;
    const total = lp.lines.reduce((a, l) => a + l.h, 0);
    if (p.ps.keepNext && y > top + 0.5) {
      const need = before + (p.ps.keepLines ? total : lp.lines[0] ? lp.lines[0].h : 0) + needAfterKeep(next);
      if (y + need > bottom) newPage(true);
    }
    y += before;
    const paraTop = y;
    const n = lp.lines.length;
    let floatsPlaced = false;
    const flushFloats = () => {
      if (!floatsPlaced) {
        floatsPlaced = true;
        lp.floats.forEach((f) => placeFloat(f, paraTop));
      }
    };
    const placeSegment = (from: number, to: number) => {
      let i = from;
      while (i < to) {
        const avail = bottom - y;
        let k = i;
        let hsum = 0;
        while (k < to && hsum + lp.lines[k].h <= avail + 0.01) {
          hsum += lp.lines[k].h;
          k++;
        }
        if (k >= to) {
          flushFloats();
          emitLines(p, lp, i, to - i);
          return;
        }
        let take = k - i;
        const atTop = y <= top + 0.5;
        if (p.ps.keepLines && i === from && !atTop) take = 0;
        else if (p.ps.widow) {
          if (i === from && take === 1 && to - from > 1) take = 0;
          else if (take > 1 && to - (i + take) === 1 && !atTop) take -= 1;
        }
        if (take <= 0) {
          if (atTop) take = Math.max(1, k - i);
          else {
            newPage(true);
            continue;
          }
        }
        flushFloats();
        emitLines(p, lp, i, take);
        i += take;
        newPage(true);
      }
    };
    let li = 0;
    while (li < n) {
      let end = n;
      for (let e = li; e < n; e++) {
        if (lp.lines[e].breakAfter) {
          end = e + 1;
          break;
        }
      }
      placeSegment(li, end);
      if (lp.lines[end - 1].breakAfter) newPage(false);
      li = end;
    }
    if (!n) flushFloats();
    y += p.ps.after;
    prevPara = p;
  };

  const placeTable = (t: Table) => {
    const lt = layoutTable(lc, t, colW, null);
    const header = lt.rows.filter((r) => r.header);
    prevPara = null;
    lt.rows.forEach((row, ri) => {
      if (y + row.h > bottom + 0.01 && y > top + 0.5) {
        newPage(true);
        if (header.length && !row.header) {
          header.forEach((hr) => {
            (cur as PageLayout).cmds.push(...translate(hr.cmds, colLeft + lt.x0, y));
            y += hr.h;
          });
        }
      }
      (cur as PageLayout).cmds.push(...translate(row.cmds, colLeft + lt.x0, y));
      y += row.h;
      void ri;
    });
  };

  model.sections.forEach((s, si) => {
    sect = s.props;
    pageInSection = 0;
    const continuous = s.props.type === "continuous" && cur && si > 0;
    if (!continuous) {
      newPage(false);
      if (s.props.type === "oddPage" && pages.length % 2 === 0) newPage(false);
      else if (s.props.type === "evenPage" && pages.length % 2 === 1) newPage(false);
    } else {
      colLeft = sect.mL;
      colW = Math.max(50, sect.pageW - sect.mL - sect.mR);
    }
    s.blocks.forEach((b, bi) => {
      if (b.k === "p") placePara(b, s.blocks[bi + 1]);
      else placeTable(b);
    });
  });
  if (!pages.length) newPage(false);
  return pages;
}

/** Header / footer commands for a page (page numbers resolved). */
export function headerFooterCmds(lc: LC, model: DocModel, page: PageLayout, pageNo: number, total: number): Cmd[] {
  const s = page.sect;
  const out: Cmd[] = [];
  const w = s.pageW - s.mL - s.mR;
  const hdr = s.headers[page.kind] || s.headers.default;
  const ftr = s.footers[page.kind] || s.footers.default;
  const fld = { page: pageNo, total };
  const hb = hdr ? model.parts.get(hdr) : null;
  if (hb && hb.length) {
    const flow = layoutFlow(lc, hb, w, fld);
    out.push(...translate(flow.cmds, s.mL, s.hdrDist));
  }
  const fb = ftr ? model.parts.get(ftr) : null;
  if (fb && fb.length) {
    const flow = layoutFlow(lc, fb, w, fld);
    out.push(...translate(flow.cmds, s.mL, s.pageH - s.ftrDist - flow.h));
  }
  return out;
}
