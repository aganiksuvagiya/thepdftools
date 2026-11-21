// DOCX styles, numbering and property resolution.
import { El, kid, kids, dig } from "@/lib/ooxml/xml";
import { Theme } from "@/lib/ooxml/theme";
import { Border, Borders, PStyle, RStyle, Tab } from "./model";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
export const TW = 1 / 15; // twips -> px
const HP = 96 / 144; // half-points -> px

/** Attribute in the w: namespace. */
export function wa(el: El | null | undefined, name: string): string | null {
  if (!el) return null;
  const v = el.getAttributeNS(W_NS, name);
  if (v !== null && v !== "") return v;
  return el.getAttribute("w:" + name);
}

function wnum(el: El | null | undefined, name: string): number | undefined {
  const v = wa(el, name);
  if (v === null || v === "") return undefined;
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
}

function onOff(el: El): boolean {
  const v = wa(el, "val");
  return !(v === "0" || v === "false" || v === "off");
}

// ---------------------------------------------------------------------------------------------
// Raw property bags
// ---------------------------------------------------------------------------------------------

export interface RawColor {
  val?: string;
  theme?: string;
  tint?: string;
  shade?: string;
}

export interface RawR {
  fonts?: Record<string, string>;
  sz?: number;
  szCs?: number;
  b?: boolean;
  bCs?: boolean;
  i?: boolean;
  iCs?: boolean;
  u?: string | null;
  strike?: boolean;
  dstrike?: boolean;
  color?: RawColor;
  highlight?: string | null;
  shd?: string | null;
  vert?: string;
  caps?: boolean;
  smallCaps?: boolean;
  spacing?: number;
  vanish?: boolean;
  rStyle?: string;
}

export interface RawP {
  jc?: string;
  ind?: { left?: number; right?: number; firstLine?: number; hanging?: number };
  spacing?: { before?: number; after?: number; line?: number; lineRule?: string };
  keepNext?: boolean;
  keepLines?: boolean;
  pageBreakBefore?: boolean;
  widowControl?: boolean;
  contextual?: boolean;
  tabs?: Tab[];
  shd?: string | null;
  bdr?: Partial<Borders>;
  numId?: string;
  ilvl?: number;
  pStyle?: string;
  rpr?: RawR;
}

export function readBorder(el: El | null): Border | null {
  const style = wa(el, "val") || "single";
  if (!el || style === "nil" || style === "none") return null;
  const sz = wnum(el, "sz") ?? 4;
  const color = wa(el, "color");
  return { w: Math.max(0.5, (sz / 8) * (96 / 72)), color: !color || color === "auto" ? "#000000" : "#" + color, style };
}

export function readBorders(el: El | null): Record<string, Border | null> {
  const out: Record<string, Border | null> = {};
  kids(el).forEach((b) => {
    const n = b.localName === "start" ? "left" : b.localName === "end" ? "right" : b.localName;
    out[n] = readBorder(b);
  });
  return out;
}

export function readR(el: El | null): RawR {
  const o: RawR = {};
  if (!el) return o;
  kids(el).forEach((c) => {
    switch (c.localName) {
      case "rFonts": {
        const f: Record<string, string> = {};
        ["ascii", "hAnsi", "eastAsia", "cs", "asciiTheme", "hAnsiTheme", "eastAsiaTheme", "cstheme"].forEach((k) => {
          const v = wa(c, k);
          if (v) f[k] = v;
        });
        o.fonts = f;
        break;
      }
      case "sz": o.sz = wnum(c, "val"); break;
      case "szCs": o.szCs = wnum(c, "val"); break;
      case "b": o.b = onOff(c); break;
      case "bCs": o.bCs = onOff(c); break;
      case "i": o.i = onOff(c); break;
      case "iCs": o.iCs = onOff(c); break;
      case "u": { const v = wa(c, "val"); o.u = !v || v === "none" ? null : v; break; }
      case "strike": o.strike = onOff(c); break;
      case "dstrike": o.dstrike = onOff(c); break;
      case "color":
        o.color = { val: wa(c, "val") || undefined, theme: wa(c, "themeColor") || undefined, tint: wa(c, "themeTint") || undefined, shade: wa(c, "themeShade") || undefined };
        break;
      case "highlight": { const v = wa(c, "val"); o.highlight = !v || v === "none" ? null : v; break; }
      case "shd": { const f = wa(c, "fill"); o.shd = !f || f === "auto" ? null : f; break; }
      case "vertAlign": o.vert = wa(c, "val") || undefined; break;
      case "caps": o.caps = onOff(c); break;
      case "smallCaps": o.smallCaps = onOff(c); break;
      case "vanish": o.vanish = onOff(c); break;
      case "spacing": { const v = wnum(c, "val"); if (v !== undefined) o.spacing = v * TW; break; }
      case "rStyle": o.rStyle = wa(c, "val") || undefined; break;
    }
  });
  return o;
}

export function readP(el: El | null): RawP {
  const o: RawP = {};
  if (!el) return o;
  kids(el).forEach((c) => {
    switch (c.localName) {
      case "jc": o.jc = wa(c, "val") || undefined; break;
      case "ind": {
        const ind: NonNullable<RawP["ind"]> = {};
        const l = wnum(c, "left") ?? wnum(c, "start");
        const r = wnum(c, "right") ?? wnum(c, "end");
        const fl = wnum(c, "firstLine");
        const hg = wnum(c, "hanging");
        if (l !== undefined) ind.left = l * TW;
        if (r !== undefined) ind.right = r * TW;
        if (fl !== undefined) ind.firstLine = fl * TW;
        if (hg !== undefined) ind.hanging = hg * TW;
        o.ind = ind;
        break;
      }
      case "spacing": {
        const sp: NonNullable<RawP["spacing"]> = {};
        const b = wnum(c, "before"), a = wnum(c, "after"), ln = wnum(c, "line");
        if (b !== undefined) sp.before = b * TW;
        if (a !== undefined) sp.after = a * TW;
        if (wa(c, "beforeAutospacing") === "1") sp.before = 14 * (96 / 72);
        if (wa(c, "afterAutospacing") === "1") sp.after = 14 * (96 / 72);
        const rule = wa(c, "lineRule") || "auto";
        if (ln !== undefined) {
          sp.lineRule = rule;
          sp.line = rule === "auto" ? ln : ln * TW;
        }
        o.spacing = sp;
        break;
      }
      case "keepNext": o.keepNext = onOff(c); break;
      case "keepLines": o.keepLines = onOff(c); break;
      case "pageBreakBefore": o.pageBreakBefore = onOff(c); break;
      case "widowControl": o.widowControl = onOff(c); break;
      case "contextualSpacing": o.contextual = onOff(c); break;
      case "tabs": {
        o.tabs = kids(c, "tab").map((t) => ({
          pos: (wnum(t, "pos") || 0) * TW,
          kind: wa(t, "val") || "left",
          leader: wa(t, "leader") || "none",
        }));
        break;
      }
      case "shd": { const f = wa(c, "fill"); o.shd = !f || f === "auto" ? null : f; break; }
      case "pBdr": o.bdr = readBorders(c) as Partial<Borders>; break;
      case "numPr": {
        const id = wa(kid(c, "numId"), "val");
        const lv = wnum(kid(c, "ilvl"), "val");
        if (id !== null) o.numId = id;
        if (lv !== undefined) o.ilvl = lv;
        break;
      }
      case "pStyle": o.pStyle = wa(c, "val") || undefined; break;
      case "rPr": o.rpr = readR(c); break;
    }
  });
  return o;
}

export function mergeR(a: RawR, b: RawR): RawR {
  const o: RawR = { ...a, ...b };
  if (a.fonts || b.fonts) o.fonts = { ...a.fonts, ...b.fonts };
  return o;
}

export function mergeP(a: RawP, b: RawP): RawP {
  const o: RawP = { ...a, ...b };
  if (a.ind || b.ind) o.ind = { ...a.ind, ...b.ind };
  if (a.spacing || b.spacing) o.spacing = { ...a.spacing, ...b.spacing };
  if (a.bdr || b.bdr) o.bdr = { ...a.bdr, ...b.bdr };
  if (a.rpr || b.rpr) o.rpr = mergeR(a.rpr || {}, b.rpr || {});
  if (a.tabs || b.tabs) {
    let list = (a.tabs || []).slice();
    (b.tabs || []).forEach((t) => {
      list = list.filter((x) => Math.abs(x.pos - t.pos) > 0.5);
      if (t.kind !== "clear") list.push(t);
    });
    o.tabs = list;
  }
  return o;
}

// ---------------------------------------------------------------------------------------------
// Style sheet
// ---------------------------------------------------------------------------------------------

export interface TblPart {
  p: RawP;
  r: RawR;
  shd?: string | null;
  borders?: Record<string, Border | null>;
  mar?: { t?: number; r?: number; b?: number; l?: number };
}

export interface RawTblStyle {
  whole: TblPart;
  cond: Record<string, TblPart>;
}

interface StyleDef {
  id: string;
  type: string;
  basedOn: string | null;
  p: RawP;
  r: RawR;
  isDefault: boolean;
  tbl: RawTblStyle | null;
}

function readTblPart(parent: El): TblPart {
  const out: TblPart = { p: readP(kid(parent, "pPr")), r: readR(kid(parent, "rPr")) };
  const tcPr = kid(parent, "tcPr");
  const shd = kid(tcPr, "shd");
  if (shd) {
    const f = wa(shd, "fill");
    out.shd = !f || f === "auto" ? null : f;
  }
  const borders: Record<string, Border | null> = {};
  Object.assign(borders, readBorders(kid(kid(parent, "tblPr"), "tblBorders")));
  Object.assign(borders, readBorders(kid(tcPr, "tcBorders")));
  if (Object.keys(borders).length) out.borders = borders;
  const cm = kid(kid(parent, "tblPr"), "tblCellMar");
  if (cm) {
    const g = (n: string) => {
      const v = wnum(kid(cm, n) || kid(cm, n === "left" ? "start" : n === "right" ? "end" : n), "w");
      return v === undefined ? undefined : v * TW;
    };
    out.mar = { t: g("top"), r: g("right"), b: g("bottom"), l: g("left") };
  }
  return out;
}

function mergeTblPart(a: TblPart, b: TblPart): TblPart {
  return {
    p: mergeP(a.p, b.p),
    r: mergeR(a.r, b.r),
    shd: b.shd !== undefined ? b.shd : a.shd,
    borders: { ...a.borders, ...b.borders },
    mar: { ...a.mar, ...b.mar },
  };
}

export class StyleSheet {
  defaultR: RawR = {};
  defaultP: RawP = {};
  styles = new Map<string, StyleDef>();
  defaultParaId = "Normal";
  defaultTblId = "";
  private cacheP = new Map<string, { p: RawP; r: RawR }>();
  private cacheC = new Map<string, RawR>();
  private cacheT = new Map<string, RawTblStyle>();

  constructor(root: El | null) {
    if (!root) return;
    const dd = kid(root, "docDefaults");
    this.defaultR = readR(dig(dd, "rPrDefault", "rPr"));
    this.defaultP = readP(dig(dd, "pPrDefault", "pPr"));
    kids(root, "style").forEach((s) => {
      const id = wa(s, "styleId") || "";
      const type = wa(s, "type") || "paragraph";
      const def: StyleDef = {
        id,
        type,
        basedOn: wa(kid(s, "basedOn"), "val"),
        p: readP(kid(s, "pPr")),
        r: readR(kid(s, "rPr")),
        isDefault: wa(s, "default") === "1",
        tbl: null,
      };
      if (type === "table") {
        const cond: Record<string, TblPart> = {};
        kids(s, "tblStylePr").forEach((sp) => {
          cond[wa(sp, "type") || ""] = readTblPart(sp);
        });
        def.tbl = { whole: readTblPart(s), cond };
      }
      this.styles.set(id, def);
      if (def.isDefault && type === "paragraph") this.defaultParaId = id;
      if (def.isDefault && type === "table") this.defaultTblId = id;
    });
  }

  private chain(id: string): StyleDef[] {
    const out: StyleDef[] = [];
    const seen: Record<string, boolean> = {};
    let cur: string | null = id;
    while (cur && !seen[cur]) {
      seen[cur] = true;
      const d = this.styles.get(cur);
      if (!d) break;
      out.unshift(d);
      cur = d.basedOn;
    }
    return out;
  }

  paragraph(id: string | null): { p: RawP; r: RawR } {
    const key = id || this.defaultParaId;
    const hit = this.cacheP.get(key);
    if (hit) return hit;
    let p: RawP = {};
    let r: RawR = {};
    this.chain(key).forEach((d) => {
      p = mergeP(p, d.p);
      r = mergeR(r, d.r);
    });
    const out = { p, r };
    this.cacheP.set(key, out);
    return out;
  }

  character(id: string): RawR {
    const hit = this.cacheC.get(id);
    if (hit) return hit;
    let r: RawR = {};
    this.chain(id).forEach((d) => {
      r = mergeR(r, d.r);
    });
    this.cacheC.set(id, r);
    return r;
  }

  table(id: string | null): RawTblStyle {
    const key = id || this.defaultTblId;
    const hit = this.cacheT.get(key);
    if (hit) return hit;
    let whole: TblPart = { p: {}, r: {} };
    const cond: Record<string, TblPart> = {};
    this.chain(key).forEach((d) => {
      if (!d.tbl) return;
      whole = mergeTblPart(whole, d.tbl.whole);
      Object.keys(d.tbl.cond).forEach((k) => {
        cond[k] = mergeTblPart(cond[k] || { p: {}, r: {} }, d.tbl!.cond[k]);
      });
    });
    const out = { whole, cond };
    this.cacheT.set(key, out);
    return out;
  }
}

// ---------------------------------------------------------------------------------------------
// Numbering
// ---------------------------------------------------------------------------------------------

export interface LvlDef {
  start: number;
  fmt: string;
  text: string;
  p: RawP;
  r: RawR;
  suff: "tab" | "space" | "none";
}

const PUA_BULLETS: Record<string, string> = {
  "·": "•", "§": "▪", "Ø": "➢", "ü": "✓", "v": "❖", "q": "❑", "¨": "◻",
  "o": "○", "n": "■", "l": "●", "è": "➔", "þ": "☑", "u": "◆", "²": "▪",
};

function roman(n: number, upper: boolean): string {
  const map: Array<[number, string]> = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
  let s = "";
  let v = n;
  map.forEach(([val, sym]) => {
    while (v >= val) {
      s += sym;
      v -= val;
    }
  });
  return upper ? s.toUpperCase() : s;
}

function letters(n: number, upper: boolean): string {
  let s = "";
  let v = n;
  while (v > 0) {
    s = String.fromCharCode(97 + ((v - 1) % 26)) + s;
    v = Math.floor((v - 1) / 26);
  }
  return upper ? s.toUpperCase() : s;
}

export function formatNum(n: number, fmt: string): string {
  switch (fmt) {
    case "lowerLetter": return letters(n, false);
    case "upperLetter": return letters(n, true);
    case "lowerRoman": return roman(n, false);
    case "upperRoman": return roman(n, true);
    case "decimalZero": return (n < 10 ? "0" : "") + n;
    case "ordinal": {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    case "none": return "";
    default: return String(n);
  }
}

export class Numbering {
  private abs = new Map<string, LvlDef[]>();
  private nums = new Map<string, { abs: string; starts: Record<number, number> }>();
  private counters = new Map<string, Array<number | undefined>>();

  constructor(root: El | null) {
    if (!root) return;
    kids(root, "abstractNum").forEach((a) => {
      const lv: LvlDef[] = [];
      kids(a, "lvl").forEach((l) => {
        const idx = wnum(l, "ilvl") || 0;
        const suff = wa(kid(l, "suff"), "val");
        lv[idx] = {
          start: wnum(kid(l, "start"), "val") ?? 1,
          fmt: wa(kid(l, "numFmt"), "val") || "decimal",
          text: wa(kid(l, "lvlText"), "val") || "",
          p: readP(kid(l, "pPr")),
          r: readR(kid(l, "rPr")),
          suff: suff === "space" ? "space" : suff === "nothing" ? "none" : "tab",
        };
      });
      this.abs.set(wa(a, "abstractNumId") || "", lv);
    });
    kids(root, "num").forEach((n) => {
      const starts: Record<number, number> = {};
      kids(n, "lvlOverride").forEach((o) => {
        const s = wnum(kid(o, "startOverride"), "val");
        if (s !== undefined) starts[wnum(o, "ilvl") || 0] = s;
      });
      this.nums.set(wa(n, "numId") || "", { abs: wa(kid(n, "abstractNumId"), "val") || "", starts });
    });
  }

  level(numId: string, ilvl: number): LvlDef | null {
    const n = this.nums.get(numId);
    const lv = n ? this.abs.get(n.abs) : null;
    return (lv && lv[ilvl]) || null;
  }

  /** Label text for the next paragraph at this list level (updates counters). */
  next(numId: string, ilvl: number): { text: string; def: LvlDef; bullet: boolean } | null {
    const n = this.nums.get(numId);
    const lv = n ? this.abs.get(n.abs) : null;
    const def = lv && lv[ilvl];
    if (!n || !lv || !def) return null;
    if (def.fmt === "bullet") {
      let t = def.text || "•";
      const fontName = (def.r.fonts && (def.r.fonts.ascii || def.r.fonts.hAnsi)) || "";
      if (t.length === 1 && t.charCodeAt(0) >= 0xf000) t = String.fromCharCode(t.charCodeAt(0) - 0xf000);
      if (/symbol|wingdings|webdings/i.test(fontName) || t.charCodeAt(0) < 0x20 || t.charCodeAt(0) > 0x7f || t === "o") {
        t = PUA_BULLETS[t] || (t === "o" ? "○" : /symbol|wingdings|webdings/i.test(fontName) ? "•" : t);
      }
      return { text: t, def, bullet: true };
    }
    const hasOverride = Object.keys(n.starts).length > 0;
    const key = hasOverride ? "n" + numId : "a" + n.abs;
    let arr = this.counters.get(key);
    if (!arr) {
      arr = [];
      this.counters.set(key, arr);
    }
    const start = n.starts[ilvl] !== undefined ? n.starts[ilvl] : def.start;
    arr[ilvl] = arr[ilvl] === undefined ? start : (arr[ilvl] as number) + 1;
    for (let k = ilvl + 1; k < 9; k++) arr[k] = undefined;
    const text = def.text.replace(/%(\d)/g, (_m, d) => {
      const li = parseInt(d, 10) - 1;
      const ld = lv[li];
      const val = arr![li] !== undefined ? (arr![li] as number) : ld ? ld.start : 1;
      return formatNum(val, ld ? ld.fmt : "decimal");
    });
    return { text, def, bullet: false };
  }
}

// ---------------------------------------------------------------------------------------------
// Resolution to concrete styles
// ---------------------------------------------------------------------------------------------

const THEME_COLOR_MAP: Record<string, string> = {
  dark1: "dk1", light1: "lt1", dark2: "dk2", light2: "lt2", text1: "dk1", text2: "dk2", background1: "lt1", background2: "lt2",
  accent1: "accent1", accent2: "accent2", accent3: "accent3", accent4: "accent4", accent5: "accent5", accent6: "accent6",
  hyperlink: "hlink", followedHyperlink: "folHlink",
};

const HIGHLIGHT: Record<string, string> = {
  yellow: "#FFFF00", green: "#00FF00", cyan: "#00FFFF", magenta: "#FF00FF", blue: "#0000FF", red: "#FF0000",
  darkBlue: "#000080", darkCyan: "#008080", darkGreen: "#008000", darkMagenta: "#800080", darkRed: "#800000",
  darkYellow: "#808000", darkGray: "#808080", lightGray: "#C0C0C0", black: "#000000", white: "#FFFFFF",
};

export function colorCss(c: RawColor | undefined, th: Theme): string {
  if (!c) return "#000000";
  let hex: string | null = null;
  if (c.theme) {
    hex = th.colors[THEME_COLOR_MAP[c.theme] || "dk1"] || null;
    if (hex) {
      let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
      if (c.shade) {
        const f = parseInt(c.shade, 16) / 255;
        r *= f; g *= f; b *= f;
      }
      if (c.tint) {
        const f = parseInt(c.tint, 16) / 255;
        r = r * f + 255 * (1 - f); g = g * f + 255 * (1 - f); b = b * f + 255 * (1 - f);
      }
      return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
    }
  }
  if (c.val && c.val !== "auto" && /^[0-9a-fA-F]{6}$/.test(c.val)) return "#" + c.val;
  return "#000000";
}

function themeFont(key: string | undefined, th: Theme): string | null {
  if (!key) return null;
  if (key.indexOf("major") === 0) return th.major;
  if (key.indexOf("minor") === 0) return th.minor;
  return null;
}

export function resolveR(r: RawR, th: Theme): RStyle {
  const f = r.fonts || {};
  const fL = themeFont(f.asciiTheme, th) || f.ascii || themeFont(f.hAnsiTheme, th) || f.hAnsi || th.minor || "Calibri";
  const fC = f.cs || fL;
  const fE = f.eastAsia || fL;
  const sz = r.sz !== undefined ? r.sz : 20;
  const szCs = r.szCs !== undefined ? r.szCs : sz;
  return {
    fL,
    fC,
    fE,
    szL: sz * HP,
    szC: szCs * HP,
    bL: !!r.b,
    bC: r.bCs !== undefined ? r.bCs : !!r.b,
    iL: !!r.i,
    iC: r.iCs !== undefined ? r.iCs : !!r.i,
    u: r.u || null,
    strike: !!r.strike,
    dstrike: !!r.dstrike,
    color: colorCss(r.color, th),
    highlight: r.highlight ? HIGHLIGHT[r.highlight] || null : null,
    shade: r.shd ? "#" + r.shd : null,
    vert: r.vert === "superscript" ? "super" : r.vert === "subscript" ? "sub" : "base",
    caps: !!r.caps,
    smallCaps: !!r.smallCaps,
    spacing: r.spacing || 0,
    vanish: !!r.vanish,
  };
}

export function resolveP(p: RawP): PStyle {
  const ind = p.ind || {};
  const sp = p.spacing || {};
  const rule = (sp.lineRule as PStyle["lineRule"]) || "auto";
  const jc = p.jc === "center" ? "center" : p.jc === "right" || p.jc === "end" ? "right" : p.jc === "both" || p.jc === "distribute" ? "both" : "left";
  const b = (p.bdr || {}) as Partial<Borders>;
  return {
    jc,
    indLeft: ind.left || 0,
    indRight: ind.right || 0,
    indFirst: ind.hanging !== undefined ? -ind.hanging : ind.firstLine || 0,
    before: sp.before || 0,
    after: sp.after || 0,
    line: sp.line !== undefined ? (rule === "auto" ? sp.line / 240 : sp.line) : 1,
    lineRule: sp.line !== undefined ? rule : "auto",
    keepNext: !!p.keepNext,
    keepLines: !!p.keepLines,
    pageBreakBefore: !!p.pageBreakBefore,
    widow: p.widowControl !== false,
    contextual: !!p.contextual,
    tabs: p.tabs || [],
    shade: p.shd ? "#" + p.shd : null,
    borders: { top: b.top || null, right: b.right || null, bottom: b.bottom || null, left: b.left || null },
  };
}

export function shadeCss(fill: string | null | undefined): string | null {
  return fill && /^[0-9a-fA-F]{6}$/.test(fill) ? "#" + fill : null;
}
