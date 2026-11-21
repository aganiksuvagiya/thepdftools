// Text layout and painting for PPTX text bodies (paragraphs, runs, bullets, wrapping, autofit).
import { El, kid, kids, at, numAt, boolAt, EMU } from "@/lib/ooxml/xml";
import { StyleCtx, RGBA, Theme, colorOf, rgba, findFillEl } from "@/lib/ooxml/theme";

const PT = 96 / 72; // px per pt

export interface RunProps {
  sz?: number;
  b?: boolean;
  i?: boolean;
  u?: boolean;
  strike?: boolean;
  baseline?: number;
  cap?: string;
  spc?: number;
  fillEl?: El | null;
  noFill?: boolean;
  font?: string;
  hlink?: boolean;
  highlightEl?: El | null;
}

export interface ParaProps {
  algn?: string;
  marL?: number;
  marR?: number;
  indent?: number;
  lnPct?: number;
  lnPts?: number;
  befPct?: number;
  befPts?: number;
  aftPct?: number;
  aftPts?: number;
  buType?: "none" | "char" | "auto";
  buChar?: string;
  buAuto?: string;
  buStart?: number;
  buFont?: string;
  buClrEl?: El | null;
  buSzPct?: number;
  rpr: RunProps;
}

export interface TextEnv {
  sc: StyleCtx;
  chain: Array<El | null>; // lstStyle-like containers, highest priority first
  defaultColor: RGBA;
  slideNum: number;
  bold?: boolean; // default bold (table header cells etc.)
  skipColorIn?: El | null; // ignore text colour from this list-style container (shape style fontRef wins)
}

export interface TextRecord {
  text: string;
  x: number;
  y: number;
  w: number;
  size: number;
}

export function readRPr(el: El | null): RunProps {
  const o: RunProps = {};
  if (!el) return o;
  const sz = at(el, "sz");
  if (sz) o.sz = parseInt(sz, 10) / 100;
  if (at(el, "b") !== null) o.b = boolAt(el, "b", false);
  if (at(el, "i") !== null) o.i = boolAt(el, "i", false);
  const u = at(el, "u");
  if (u !== null) o.u = u !== "none";
  const st = at(el, "strike");
  if (st !== null) o.strike = st !== "noStrike";
  if (at(el, "baseline") !== null) o.baseline = numAt(el, "baseline", 0) / 100000;
  const cap = at(el, "cap");
  if (cap) o.cap = cap;
  if (at(el, "spc") !== null) o.spc = numAt(el, "spc", 0) / 100;
  const f = findFillEl(el);
  if (f) {
    if (f.localName === "noFill") o.noFill = true;
    else if (f.localName === "solidFill") o.fillEl = f;
    else if (f.localName === "gradFill") o.fillEl = kid(kid(f, "gsLst"), "gs");
  }
  const lat = kid(el, "latin");
  if (lat && at(lat, "typeface")) o.font = at(lat, "typeface") as string;
  if (kid(el, "hlinkClick")) o.hlink = true;
  const hl = kid(el, "highlight");
  if (hl) o.highlightEl = hl;
  return o;
}

function spacing(el: El | null): { pct?: number; pts?: number } {
  if (!el) return {};
  const pct = kid(el, "spcPct");
  const pts = kid(el, "spcPts");
  if (pct) return { pct: numAt(pct, "val", 100000) / 100000 };
  if (pts) return { pts: numAt(pts, "val", 0) / 100 };
  return {};
}

export function readPPr(el: El | null): ParaProps {
  const o: ParaProps = { rpr: {} };
  if (!el) return o;
  const algn = at(el, "algn");
  if (algn) o.algn = algn;
  if (at(el, "marL") !== null) o.marL = numAt(el, "marL", 0) / EMU;
  if (at(el, "marR") !== null) o.marR = numAt(el, "marR", 0) / EMU;
  if (at(el, "indent") !== null) o.indent = numAt(el, "indent", 0) / EMU;
  const ln = spacing(kid(el, "lnSpc"));
  if (ln.pct !== undefined) o.lnPct = ln.pct;
  if (ln.pts !== undefined) o.lnPts = ln.pts;
  const bef = spacing(kid(el, "spcBef"));
  if (bef.pct !== undefined) o.befPct = bef.pct;
  if (bef.pts !== undefined) o.befPts = bef.pts;
  const aft = spacing(kid(el, "spcAft"));
  if (aft.pct !== undefined) o.aftPct = aft.pct;
  if (aft.pts !== undefined) o.aftPts = aft.pts;
  if (kid(el, "buNone")) o.buType = "none";
  const bc = kid(el, "buChar");
  if (bc) {
    o.buType = "char";
    o.buChar = at(bc, "char") || "•";
  }
  const ba = kid(el, "buAutoNum");
  if (ba) {
    o.buType = "auto";
    o.buAuto = at(ba, "type") || "arabicPeriod";
    o.buStart = numAt(ba, "startAt", 1);
  }
  if (kid(el, "buBlip")) {
    o.buType = "char";
    o.buChar = "•";
  }
  const bf = kid(el, "buFont");
  if (bf && at(bf, "typeface")) o.buFont = at(bf, "typeface") as string;
  const bclr = kid(el, "buClr");
  if (bclr) o.buClrEl = bclr;
  const bsz = kid(el, "buSzPct");
  if (bsz) o.buSzPct = numAt(bsz, "val", 100000) / 100000;
  o.rpr = readRPr(kid(el, "defRPr"));
  return o;
}

function mergeP(a: ParaProps, b: ParaProps): ParaProps {
  return { ...a, ...b, rpr: { ...a.rpr, ...b.rpr } };
}

/** Effective paragraph props for a level from a priority-ordered chain of list-style containers. */
function levelProps(chain: Array<El | null>, lvl: number, skipColorIn?: El | null): ParaProps {
  let out: ParaProps = { rpr: {} };
  for (let i = chain.length - 1; i >= 0; i--) {
    const c = chain[i];
    if (!c) continue;
    const parts: ParaProps[] = [];
    const def = kid(c, "defPPr");
    if (def) parts.push(readPPr(def));
    const l = kid(c, "lvl" + (lvl + 1) + "pPr");
    if (l) parts.push(readPPr(l));
    parts.forEach((pp) => {
      if (skipColorIn && c === skipColorIn) {
        delete pp.rpr.fillEl;
        delete pp.rpr.noFill;
      }
      out = mergeP(out, pp);
    });
  }
  return out;
}

// --- fonts ---------------------------------------------------------------------------------

const SERIF = /^(times|georgia|cambria|garamond|palatino|book antiqua|bookman|century schoolbook|baskerville|didot|constantia|minion|sylfaen|rockwell)/i;
const MONO = /^(consolas|courier|lucida console|monaco|menlo|andale mono|source code|fira code|cascadia)/i;

const LH: Record<string, number> = {
  calibri: 1.22, "calibri light": 1.22, cambria: 1.17, arial: 1.15, "arial narrow": 1.15, "arial black": 1.41,
  "times new roman": 1.15, verdana: 1.215, tahoma: 1.207, "segoe ui": 1.33, "century gothic": 1.22,
  georgia: 1.136, "trebuchet ms": 1.16, consolas: 1.17, "courier new": 1.133, impact: 1.22,
  "comic sans ms": 1.39, helvetica: 1.15, "helvetica neue": 1.17, "open sans": 1.36, roboto: 1.17,
  lato: 1.2, montserrat: 1.22, poppins: 1.5,
};

export function fontStack(face: string | undefined, theme: Theme): string {
  let name = face || theme.minor;
  if (name.indexOf("+mj") === 0) name = theme.major;
  else if (name.indexOf("+mn") === 0) name = theme.minor;
  const q = '"' + name.replace(/"/g, "") + '"';
  if (/^calibri/i.test(name)) return `${q}, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
  if (/^(arial|helvetica)/i.test(name)) return `${q}, Arial, Helvetica, "Liberation Sans", sans-serif`;
  if (/^times/i.test(name)) return `${q}, "Times New Roman", Times, "Liberation Serif", serif`;
  if (SERIF.test(name)) return `${q}, Georgia, "Times New Roman", serif`;
  if (MONO.test(name)) return `${q}, "Courier New", Menlo, monospace`;
  return `${q}, Calibri, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
}

function lhFactor(face: string | undefined, theme: Theme): number {
  let name = face || theme.minor;
  if (name.indexOf("+mj") === 0) name = theme.major;
  else if (name.indexOf("+mn") === 0) name = theme.minor;
  return LH[name.toLowerCase()] || 1.2;
}

const WINGDINGS: Record<string, string> = {
  "§": "▪", "Ø": "➢", "ü": "✓", "q": "❑", "l": "●", "n": "■", "v": "❖", "è": "➔", "þ": "☑", "¨": "◻",
  "u": "◆", "p": "▪", "J": "☺", "ý": "☒", "o": "□", "w": "◆", "Ä": "✓", "·": "•", "ø": "➢", "â": "➢",
};

function bulletGlyph(ch: string, font: string | undefined): { text: string; font: string | undefined } {
  let c = ch;
  if (c.length === 1 && c.charCodeAt(0) >= 0xf000) c = String.fromCharCode(c.charCodeAt(0) - 0xf000);
  if (font && /wingdings|webdings|symbol/i.test(font)) return { text: WINGDINGS[c] || "•", font: undefined };
  return { text: c, font };
}

function autoNumText(type: string, n: number): string {
  const alpha = (k: number, upper: boolean) => {
    let s = "";
    let v = k;
    while (v > 0) {
      s = String.fromCharCode(97 + ((v - 1) % 26)) + s;
      v = Math.floor((v - 1) / 26);
    }
    return upper ? s.toUpperCase() : s;
  };
  const roman = (k: number, upper: boolean) => {
    const map: Array<[number, string]> = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
    let s = "";
    let v = k;
    map.forEach(([val, sym]) => {
      while (v >= val) {
        s += sym;
        v -= val;
      }
    });
    return upper ? s.toUpperCase() : s;
  };
  if (/^alphaLc/.test(type)) return alpha(n, false) + (/ParenBoth/.test(type) ? ")" : /ParenR/.test(type) ? ")" : ".");
  if (/^alphaUc/.test(type)) return alpha(n, true) + (/ParenR|ParenBoth/.test(type) ? ")" : ".");
  if (/^romanLc/.test(type)) return roman(n, false) + (/ParenR|ParenBoth/.test(type) ? ")" : ".");
  if (/^romanUc/.test(type)) return roman(n, true) + (/ParenR|ParenBoth/.test(type) ? ")" : ".");
  if (/ParenBoth/.test(type)) return "(" + n + ")";
  if (/ParenR/.test(type)) return n + ")";
  if (/Plain/.test(type)) return String(n);
  return n + ".";
}

// --- layout --------------------------------------------------------------------------------

interface RunStyle {
  css: string;
  size: number; // px (effective)
  color: string;
  underline: boolean;
  strike: boolean;
  offset: number; // px, positive = up
  spc: number; // px
  lh: number; // line height factor
  highlight: string | null;
}

interface Tok {
  text: string;
  w: number;
  space: boolean;
  br: boolean;
  st: RunStyle;
}

interface Line {
  toks: Tok[];
  width: number; // without trailing spaces
  height: number;
  descent: number;
  x: number;
  y: number;
  extra: number; // extra px per space (justify)
  bullet: { text: string; css: string; color: string; x: number; size: number } | null;
}

export interface Layout {
  lines: Line[];
  height: number;
}

function resolveRun(rp: RunProps, env: TextEnv, fontScale: number): RunStyle {
  const theme = env.sc.theme;
  const sizePt = (rp.sz !== undefined ? rp.sz : 18) * fontScale;
  let size = sizePt * PT;
  let offset = 0;
  if (rp.baseline) {
    offset = rp.baseline * size;
    size *= 0.67;
  }
  if (rp.cap === "small") size *= 0.8;
  const stack = fontStack(rp.font, theme);
  let color: RGBA = env.defaultColor;
  if (rp.hlink) {
    const hl = theme.colors[env.sc.clrMap["hlink"] || "hlink"] || "0563C1";
    const n = parseInt(hl, 16);
    color = { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  } else if (rp.fillEl) {
    color = colorOf(rp.fillEl, env.sc) || color;
  }
  const hlColor = rp.highlightEl ? colorOf(rp.highlightEl, env.sc) : null;
  return {
    css: `${rp.i ? "italic " : ""}${(rp.b !== undefined ? rp.b : env.bold) ? "bold " : ""}${size.toFixed(2)}px ${stack}`,
    size,
    color: rgba(color),
    underline: !!rp.u || !!rp.hlink,
    strike: !!rp.strike,
    offset,
    spc: (rp.spc || 0) * PT,
    lh: lhFactor(rp.font, theme),
    highlight: hlColor ? rgba(hlColor) : null,
  };
}

const TOKEN_RE = /\s+|[⺀-鿿豈-﫿＀-￯]|[^\s⺀-鿿豈-﫿＀-￯]+/g;
const HAS_LS = typeof CanvasRenderingContext2D !== "undefined" && "letterSpacing" in CanvasRenderingContext2D.prototype;

function measure(g: CanvasRenderingContext2D, text: string, st: RunStyle): number {
  g.font = st.css;
  if (HAS_LS) {
    (g as any).letterSpacing = st.spc ? st.spc + "px" : "0px";
    return g.measureText(text).width;
  }
  return g.measureText(text).width + st.spc * text.length;
}

function applyCase(text: string, cap: string | undefined): string {
  return cap === "all" || cap === "small" ? text.toUpperCase() : text;
}

export function layoutText(
  g: CanvasRenderingContext2D,
  txBody: El,
  availW: number,
  env: TextEnv,
  fontScale: number,
  lnReduce: number,
  wrap: boolean
): Layout {
  const paras = kids(txBody, "p");
  const lines: Line[] = [];
  let y = 0;
  const counters: number[] = [];

  paras.forEach((p, pIdx) => {
    const pPrEl = kid(p, "pPr");
    const lvl = Math.max(0, Math.min(8, numAt(pPrEl, "lvl", 0)));
    const props = mergeP(levelProps(env.chain, lvl, env.skipColorIn), readPPr(pPrEl));
    const marL = Math.max(0, props.marL || 0);
    const marR = Math.max(0, props.marR || 0);
    const indent = props.indent || 0;

    // Build tokens
    const toks: Tok[] = [];
    let firstRp = null as RunProps | null;
    const baseR = props.rpr;
    kids(p).forEach((n) => {
      const nm = n.localName;
      if (nm === "r" || nm === "fld" || nm === "br") {
        const rp: RunProps = { ...baseR, ...readRPr(kid(n, "rPr")) };
        const st = resolveRun(rp, env, fontScale);
        if (nm === "br") {
          toks.push({ text: "", w: 0, space: false, br: true, st });
          return;
        }
        let text = kid(n, "t")?.textContent || "";
        if (nm === "fld" && /slidenum/i.test(at(n, "type") || "")) text = String(env.slideNum);
        if (!text) return;
        if (!firstRp) firstRp = rp;
        text = applyCase(text.replace(/\u000b/g, "\n"), rp.cap);
        const parts = text.split("\n");
        parts.forEach((part, pi) => {
          if (pi > 0) toks.push({ text: "", w: 0, space: false, br: true, st });
          const m = part.match(TOKEN_RE) || [];
          m.forEach((w) => {
            const isSpace = /^\s+$/.test(w);
            const t = isSpace ? w.replace(/\t/g, "    ") : w;
            toks.push({ text: t, w: measure(g, t, st), space: isSpace, br: false, st });
          });
        });
      }
    });
    const endRp: RunProps = { ...baseR, ...readRPr(kid(p, "endParaRPr")) };
    const endStyle = resolveRun(firstRp || endRp, env, fontScale);
    const hasText = toks.some((t) => !t.space && !t.br);

    // Bullet
    let bullet: Line["bullet"] = null;
    let bulletW = 0;
    if (props.buType === "auto" || props.buType === "char") {
      for (let k = lvl + 1; k < counters.length; k++) counters[k] = 0;
    } else {
      for (let k = lvl; k < counters.length; k++) counters[k] = 0;
    }
    if (hasText && (props.buType === "char" || props.buType === "auto")) {
      const sizePx = endStyle.size * (props.buSzPct || 1);
      let text: string;
      let bfont: string | undefined = props.buFont;
      if (props.buType === "auto") {
        counters[lvl] = (counters[lvl] || 0) === 0 ? props.buStart || 1 : counters[lvl] + 1;
        text = autoNumText(props.buAuto || "arabicPeriod", counters[lvl]);
        bfont = bfont || undefined;
      } else {
        const gl = bulletGlyph(props.buChar || "•", bfont);
        text = gl.text;
        bfont = gl.font;
      }
      const stack = fontStack(bfont || (firstRp ? firstRp.font : undefined), env.sc.theme);
      const css = `${sizePx.toFixed(2)}px ${stack}`;
      g.font = css;
      if (HAS_LS) (g as any).letterSpacing = "0px";
      bulletW = g.measureText(text + " ").width;
      let bcolor = endStyle.color;
      if (props.buClrEl) {
        const c = colorOf(props.buClrEl, env.sc);
        if (c) bcolor = rgba(c);
      }
      bullet = { text, css, color: bcolor, x: marL + indent, size: sizePx };
    } else if (props.buType !== "char" && props.buType !== "auto") {
      // a paragraph without bullet breaks auto numbering at this level
      counters[lvl] = 0;
    }

    const textStart1 = bullet ? Math.max(marL, bullet.x + bulletW) : Math.max(0, marL + indent);
    const textStart = marL;
    const algn = props.algn || "l";

    // Wrap into lines
    const para: Array<{ toks: Tok[]; hard: boolean }> = [];
    let cur: Tok[] = [];
    let curW = 0;
    let lineNo = 0;
    const limit = () => availW - marR - (lineNo === 0 ? textStart1 : textStart);
    const flush = (hard: boolean) => {
      para.push({ toks: cur, hard });
      cur = [];
      curW = 0;
      lineNo++;
    };
    toks.forEach((t) => {
      if (t.br) {
        flush(true);
        return;
      }
      if (t.space) {
        if (cur.length === 0 && lineNo > 0) return;
        cur.push(t);
        curW += t.w;
        return;
      }
      if (wrap && curW + t.w > limit() + 0.5 && cur.some((c) => !c.space)) {
        flush(false);
      }
      if (wrap && t.w > limit() + 0.5 && cur.length === 0) {
        // break an over-long word by characters
        const chars = Array.from(t.text);
        let piece = "";
        chars.forEach((ch) => {
          const test = piece + ch;
          if (piece && measure(g, test, t.st) > limit()) {
            cur.push({ text: piece, w: measure(g, piece, t.st), space: false, br: false, st: t.st });
            flush(false);
            piece = ch;
          } else piece = test;
        });
        if (piece) {
          cur.push({ text: piece, w: measure(g, piece, t.st), space: false, br: false, st: t.st });
          curW += cur[cur.length - 1].w;
        }
        return;
      }
      cur.push(t);
      curW += t.w;
    });
    flush(true);

    // Vertical metrics
    const lnPct = props.lnPct !== undefined ? Math.max(0.1, props.lnPct - lnReduce) : 1 - lnReduce;
    para.forEach((ln, idx) => {
      const real = ln.toks.filter((t) => !t.br);
      let base = 0;
      let maxSize = 0;
      real.forEach((t) => {
        base = Math.max(base, t.st.size * t.st.lh);
        maxSize = Math.max(maxSize, t.st.size);
      });
      if (!real.length) {
        base = endStyle.size * endStyle.lh;
        maxSize = endStyle.size;
      }
      let lineH = base * lnPct;
      if (props.lnPts !== undefined) lineH = props.lnPts * PT * fontScale;
      const descent = base * 0.22;

      let w = 0;
      let lastReal = real.length - 1;
      while (lastReal >= 0 && real[lastReal].space) lastReal--;
      real.forEach((t, i) => {
        if (i <= lastReal) w += t.w;
      });
      const start = idx === 0 ? textStart1 : textStart;
      const maxW = availW - marR - start;
      let x = start;
      let extra = 0;
      if (algn === "ctr") x = start + (maxW - w) / 2;
      else if (algn === "r") x = start + (maxW - w);
      else if ((algn === "just" || algn === "dist") && !ln.hard && wrap) {
        let spaces = 0;
        real.forEach((t, i) => {
          if (t.space && i < lastReal) spaces++;
        });
        if (spaces > 0 && maxW > w) extra = (maxW - w) / spaces;
      }

      // Space before first line, after last line
      let before = 0;
      if (idx === 0 && pIdx > 0) {
        before = props.befPts !== undefined ? props.befPts * PT : props.befPct !== undefined ? props.befPct * maxSize : 0;
      }
      let after = 0;
      if (idx === para.length - 1) {
        after = props.aftPts !== undefined ? props.aftPts * PT : props.aftPct !== undefined ? props.aftPct * maxSize : 0;
      }
      y += before;
      lines.push({
        toks: real.slice(0, lastReal + 1),
        width: w,
        height: lineH,
        descent,
        x,
        y,
        extra,
        bullet: idx === 0 ? bullet : null,
      });
      y += lineH + after;
    });
  });

  return { lines, height: y };
}

export function paintLayout(
  g: CanvasRenderingContext2D,
  lay: Layout,
  x0: number,
  y0: number,
  records: TextRecord[] | null
) {
  g.textBaseline = "alphabetic";
  g.textAlign = "left";
  const m = g.getTransform();
  const recordable = !!records && Math.abs(m.b) < 1e-3 && Math.abs(m.c) < 1e-3 && m.a > 0 && m.d > 0;

  lay.lines.forEach((ln) => {
    const baseY = y0 + ln.y + ln.height - ln.descent;
    if (ln.bullet) {
      g.font = ln.bullet.css;
      if (HAS_LS) (g as any).letterSpacing = "0px";
      g.fillStyle = ln.bullet.color;
      g.fillText(ln.bullet.text, x0 + ln.bullet.x, baseY);
    }
    let x = x0 + ln.x;
    let text = "";
    let maxSize = 0;
    ln.toks.forEach((t) => {
      const w = t.w + (t.space ? ln.extra : 0);
      const st = t.st;
      maxSize = Math.max(maxSize, st.size);
      if (!t.space) {
        if (st.highlight) {
          g.fillStyle = st.highlight;
          g.fillRect(x, baseY - st.size * 0.95, w, st.size * 1.2);
        }
        g.font = st.css;
        if (HAS_LS) (g as any).letterSpacing = st.spc ? st.spc + "px" : "0px";
        g.fillStyle = st.color;
        const yy = baseY - st.offset;
        if (HAS_LS || !st.spc) g.fillText(t.text, x, yy);
        else {
          let cx = x;
          Array.from(t.text).forEach((ch) => {
            g.fillText(ch, cx, yy);
            cx += g.measureText(ch).width + st.spc;
          });
        }
      }
      if (st.underline || st.strike) {
        g.fillStyle = st.color;
        const th = Math.max(1, st.size / 16);
        if (st.underline) g.fillRect(x, baseY - st.offset + st.size * 0.1, w, th);
        if (st.strike) g.fillRect(x, baseY - st.offset - st.size * 0.3, w, th);
      }
      text += t.text;
      x += w;
    });
    if (HAS_LS) (g as any).letterSpacing = "0px";
    if (recordable && records && text.trim()) {
      const px = m.a * (x0 + ln.x) + m.c * baseY + m.e;
      const py = m.b * (x0 + ln.x) + m.d * baseY + m.f;
      records.push({ text: text.replace(/\s+$/, ""), x: px, y: py, w: ln.width * m.a, size: maxSize * m.d });
    }
  });
}

export interface BodyOpts {
  w: number;
  h: number;
  lIns: number;
  tIns: number;
  rIns: number;
  bIns: number;
  anchor: string; // t | ctr | b
  wrap: boolean;
  normAutofit: boolean;
  fontScale: number; // from normAutofit fontScale (1 = none)
  lnReduce: number;
  hasFontScale: boolean;
}

export function hasText(txBody: El | null): boolean {
  if (!txBody) return false;
  return kids(txBody, "p").some((p) =>
    kids(p).some((n) => (n.localName === "r" || n.localName === "fld") && (kid(n, "t")?.textContent || "").length > 0)
  );
}

export function drawTextBody(g: CanvasRenderingContext2D, txBody: El, o: BodyOpts, env: TextEnv, records: TextRecord[] | null): Layout {
  const availW = Math.max(1, o.w - o.lIns - o.rIns);
  const availH = o.h - o.tIns - o.bIns;
  let fs = o.fontScale;
  let lr = o.lnReduce;
  let lay = layoutText(g, txBody, availW, env, fs, lr, o.wrap);
  if (o.normAutofit && !o.hasFontScale && lay.height > availH + 1) {
    for (let s = 0.95; s >= 0.4; s -= 0.05) {
      fs = s;
      lr = 0.1;
      lay = layoutText(g, txBody, availW, env, fs, lr, o.wrap);
      if (lay.height <= availH + 1) break;
    }
  }
  let dy = 0;
  if (o.anchor === "ctr") dy = (availH - lay.height) / 2;
  else if (o.anchor === "b") dy = availH - lay.height;
  paintLayout(g, lay, o.lIns, o.tIns + dy, records);
  return lay;
}
