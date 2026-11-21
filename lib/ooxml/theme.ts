// Theme parsing, colour resolution and gradient helpers for PPTX rendering.
import { El, kid, kids, dig, at, numAt } from "./xml";

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Theme {
  colors: Record<string, string>; // dk1, lt1, accent1... -> RRGGBB
  major: string;
  minor: string;
  fillStyles: El[];
  lnStyles: El[];
  bgFillStyles: El[];
}

export interface StyleCtx {
  theme: Theme;
  clrMap: Record<string, string>;
  phClr: RGBA | null;
}

const DEFAULT_COLORS: Record<string, string> = {
  dk1: "000000", lt1: "FFFFFF", dk2: "44546A", lt2: "E7E6E6",
  accent1: "4472C4", accent2: "ED7D31", accent3: "A5A5A5", accent4: "FFC000", accent5: "5B9BD5", accent6: "70AD47",
  hlink: "0563C1", folHlink: "954F72",
};

export function emptyTheme(): Theme {
  return { colors: { ...DEFAULT_COLORS }, major: "Calibri Light", minor: "Calibri", fillStyles: [], lnStyles: [], bgFillStyles: [] };
}

export function parseTheme(root: El | null): Theme {
  const t = emptyTheme();
  if (!root) return t;
  const elements = kid(root, "themeElements");
  const scheme = kid(elements, "clrScheme");
  kids(scheme).forEach((c) => {
    const inner = c.firstElementChild;
    if (!inner) return;
    const v = inner.localName === "sysClr" ? at(inner, "lastClr") || at(inner, "val") : at(inner, "val");
    if (v && /^[0-9a-fA-F]{6}$/.test(v)) t.colors[c.localName] = v.toUpperCase();
  });
  const fonts = kid(elements, "fontScheme");
  t.major = at(dig(fonts, "majorFont", "latin"), "typeface") || t.major;
  t.minor = at(dig(fonts, "minorFont", "latin"), "typeface") || t.minor;
  const fmt = kid(elements, "fmtScheme");
  t.fillStyles = kids(kid(fmt, "fillStyleLst"));
  t.lnStyles = kids(kid(fmt, "lnStyleLst"));
  t.bgFillStyles = kids(kid(fmt, "bgFillStyleLst"));
  return t;
}

export function withPh(sc: StyleCtx, phClr: RGBA | null): StyleCtx {
  return { theme: sc.theme, clrMap: sc.clrMap, phClr };
}

const COLOR_NAMES: Record<string, boolean> = { srgbClr: true, schemeClr: true, sysClr: true, prstClr: true, scrgbClr: true, hslClr: true };

const PRESET_COLORS: Record<string, string> = {
  black: "000000", white: "FFFFFF", red: "FF0000", green: "008000", blue: "0000FF", yellow: "FFFF00",
  cyan: "00FFFF", magenta: "FF00FF", gray: "808080", grey: "808080", darkGray: "A9A9A9", dkGray: "A9A9A9",
  lightGray: "D3D3D3", ltGray: "D3D3D3", orange: "FFA500", purple: "800080", brown: "A52A2A", pink: "FFC0CB",
  darkBlue: "00008B", dkBlue: "00008B", darkRed: "8B0000", dkRed: "8B0000", darkGreen: "006400", dkGreen: "006400",
  lightBlue: "ADD8E6", ltBlue: "ADD8E6", lightGreen: "90EE90", ltGreen: "90EE90", navy: "000080", gold: "FFD700",
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgb2hsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}

function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

const clamp255 = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

/** `parent` is an element that contains a colour child (solidFill, gs, fontRef...) or the colour element itself. */
export function colorOf(parent: El | null | undefined, sc: StyleCtx): RGBA | null {
  if (!parent) return null;
  let c: El | null = COLOR_NAMES[parent.localName] ? parent : null;
  if (!c) {
    for (let k = parent.firstElementChild; k; k = k.nextElementSibling) {
      if (COLOR_NAMES[k.localName]) {
        c = k;
        break;
      }
    }
  }
  if (!c) return null;

  let r = 0, g = 0, b = 0, a = 1;
  switch (c.localName) {
    case "srgbClr": {
      const v = at(c, "val") || "000000";
      [r, g, b] = hexToRgb(v);
      break;
    }
    case "sysClr": {
      const v = at(c, "lastClr") || (at(c, "val") === "window" ? "FFFFFF" : "000000");
      [r, g, b] = hexToRgb(v);
      break;
    }
    case "prstClr": {
      [r, g, b] = hexToRgb(PRESET_COLORS[at(c, "val") || "black"] || "000000");
      break;
    }
    case "scrgbClr": {
      r = clamp255((numAt(c, "r", 0) / 100000) * 255);
      g = clamp255((numAt(c, "g", 0) / 100000) * 255);
      b = clamp255((numAt(c, "b", 0) / 100000) * 255);
      break;
    }
    case "hslClr": {
      [r, g, b] = hsl2rgb(numAt(c, "hue", 0) / 21600000, numAt(c, "sat", 0) / 100000, numAt(c, "lum", 0) / 100000);
      break;
    }
    case "schemeClr": {
      let v = at(c, "val") || "tx1";
      if (v === "phClr") {
        if (sc.phClr) {
          r = sc.phClr.r; g = sc.phClr.g; b = sc.phClr.b; a = sc.phClr.a;
        }
        break;
      }
      v = sc.clrMap[v] || v;
      [r, g, b] = hexToRgb(sc.theme.colors[v] || DEFAULT_COLORS[v] || "000000");
      break;
    }
  }

  for (let m = c.firstElementChild; m; m = m.nextElementSibling) {
    const val = numAt(m, "val", 0) / 100000;
    switch (m.localName) {
      case "alpha": a = val; break;
      case "alphaMod": a *= val; break;
      case "alphaOff": a += val; break;
      case "lumMod": case "lumOff": case "lum": case "satMod": case "satOff": case "sat": case "hueOff": {
        const hsl = rgb2hsl(r, g, b);
        if (m.localName === "lumMod") hsl[2] *= val;
        else if (m.localName === "lumOff") hsl[2] += val;
        else if (m.localName === "lum") hsl[2] = val;
        else if (m.localName === "satMod") hsl[1] *= val;
        else if (m.localName === "satOff") hsl[1] += val;
        else if (m.localName === "sat") hsl[1] = val;
        else hsl[0] = (hsl[0] + numAt(m, "val", 0) / 21600000 + 1) % 1;
        hsl[1] = Math.max(0, Math.min(1, hsl[1]));
        hsl[2] = Math.max(0, Math.min(1, hsl[2]));
        [r, g, b] = hsl2rgb(hsl[0], hsl[1], hsl[2]);
        break;
      }
      case "tint": // towards white
        r = clamp255(r * val + 255 * (1 - val));
        g = clamp255(g * val + 255 * (1 - val));
        b = clamp255(b * val + 255 * (1 - val));
        break;
      case "shade": // towards black
        r = clamp255(r * val); g = clamp255(g * val); b = clamp255(b * val);
        break;
      case "comp":
        r = 255 - r; g = 255 - g; b = 255 - b;
        break;
      case "inv":
        r = 255 - r; g = 255 - g; b = 255 - b;
        break;
      case "gray": {
        const y = clamp255(0.299 * r + 0.587 * g + 0.114 * b);
        r = g = b = y;
        break;
      }
    }
  }
  return { r: clamp255(r), g: clamp255(g), b: clamp255(b), a: Math.max(0, Math.min(1, a)) };
}

export function rgba(c: RGBA, extraAlpha = 1): string {
  const a = Math.max(0, Math.min(1, c.a * extraAlpha));
  return a >= 0.999 ? `rgb(${c.r},${c.g},${c.b})` : `rgba(${c.r},${c.g},${c.b},${a.toFixed(3)})`;
}

export const FILL_NAMES = ["noFill", "solidFill", "gradFill", "blipFill", "pattFill", "grpFill"];

export function findFillEl(parent: El | null | undefined): El | null {
  if (!parent) return null;
  for (let k = parent.firstElementChild; k; k = k.nextElementSibling) {
    if (FILL_NAMES.indexOf(k.localName) >= 0) return k;
  }
  return null;
}

/** Linear / radial gradient for a gradFill element in a w x h box (local coordinates). */
export function makeGradient(g: CanvasRenderingContext2D, grad: El, sc: StyleCtx, w: number, h: number): CanvasGradient | null {
  const stops: Array<{ pos: number; color: RGBA }> = [];
  kids(kid(grad, "gsLst"), "gs").forEach((gs) => {
    const color = colorOf(gs, sc);
    if (color) stops.push({ pos: Math.max(0, Math.min(1, numAt(gs, "pos", 0) / 100000)), color });
  });
  if (!stops.length) return null;
  stops.sort((x, y) => x.pos - y.pos);
  let cg: CanvasGradient;
  const lin = kid(grad, "lin");
  const path = kid(grad, "path");
  if (path) {
    const rect = kid(path, "fillToRect");
    const l = numAt(rect, "l", 50000) / 100000, t = numAt(rect, "t", 50000) / 100000;
    const r = numAt(rect, "r", 50000) / 100000, b = numAt(rect, "b", 50000) / 100000;
    const cx = (w * (l + (1 - r))) / 2, cy = (h * (t + (1 - b))) / 2;
    const rad = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy)) || 1;
    cg = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
  } else {
    const ang = (numAt(lin, "ang", 0) / 60000) * (Math.PI / 180);
    const dx = Math.cos(ang), dy = Math.sin(ang);
    const len = Math.abs(w * dx) + Math.abs(h * dy) || 1;
    const cx = w / 2, cy = h / 2;
    cg = g.createLinearGradient(cx - (dx * len) / 2, cy - (dy * len) / 2, cx + (dx * len) / 2, cy + (dy * len) / 2);
  }
  stops.forEach((s) => cg.addColorStop(s.pos, rgba(s.color)));
  return cg;
}
