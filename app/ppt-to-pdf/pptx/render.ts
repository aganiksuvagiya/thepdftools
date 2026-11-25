// PPTX -> canvas slide renderer (backgrounds, masters/layouts, shapes, pictures, groups, tables, SmartArt).
import { El, EMU, Pkg, Rel, kid, kids, dig, at, numAt, boolAt, relId } from "@/lib/ooxml/xml";
import { RGBA, StyleCtx, Theme, parseTheme, emptyTheme, withPh, colorOf, rgba, findFillEl, makeGradient } from "@/lib/ooxml/theme";
import { Geom, presetGeom, customGeom } from "./geometry";
import { TextEnv, TextRecord, drawTextBody, hasText, layoutText } from "./text";
import { drawChart } from "@/lib/ooxml/chart";

export interface SlideRef {
  path: string;
  hidden: boolean;
  index: number;
}

interface Part {
  path: string;
  root: El;
  rels: Map<string, Rel>;
}

export interface Deck {
  pkg: Pkg;
  width: number; // px @96dpi
  height: number;
  slides: SlideRef[];
  defaultText: El | null;
  tableStyles: El | null;
  parts: Map<string, Promise<Part | null>>;
  themes: Map<string, Theme>;
}

export interface RenderedSlide {
  canvas: HTMLCanvasElement;
  texts: TextRecord[]; // device-pixel coordinates of the canvas
  warnings: Record<string, number>;
}

interface State {
  deck: Deck;
  g: CanvasRenderingContext2D;
  sc: StyleCtx;
  slide: Part;
  layout: Part | null;
  master: Part | null;
  texts: TextRecord[];
  warn: Record<string, number>;
  slideNum: number;
  txStyles: El | null;
  tx1: RGBA;
  W: number;
  H: number;
}

function warn(S: State, key: string) {
  S.warn[key] = (S.warn[key] || 0) + 1;
}

// ------------------------------------------------------------------------------------------
// Deck loading
// ------------------------------------------------------------------------------------------

export async function loadDeck(buf: ArrayBuffer): Promise<Deck> {
  const JSZip = (await import("jszip")).default;
  let zip: any;
  try {
    zip = await JSZip.loadAsync(buf);
  } catch {
    throw new Error("This file could not be opened. Make sure it is a valid .pptx file (not an old .ppt).");
  }
  const pkg = new Pkg(zip);
  const pres = await pkg.xml("ppt/presentation.xml");
  if (!pres) throw new Error("This does not look like a PowerPoint (.pptx) file.");
  const sz = kid(pres, "sldSz");
  const width = numAt(sz, "cx", 9144000) / EMU;
  const height = numAt(sz, "cy", 6858000) / EMU;
  const rels = await pkg.rels("ppt/presentation.xml");

  const paths: string[] = [];
  kids(kid(pres, "sldIdLst"), "sldId").forEach((s) => {
    const rel = rels.get(relId(s, "id"));
    if (rel && !rel.external) paths.push(rel.target);
  });
  if (!paths.length) {
    Object.keys(zip.files)
      .filter((f: string) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
      .sort((a: string, b: string) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10))
      .forEach((f: string) => paths.push(f));
  }
  if (!paths.length) throw new Error("No slides found in this presentation.");

  const slides: SlideRef[] = [];
  for (let i = 0; i < paths.length; i++) {
    const root = await pkg.xml(paths[i]);
    slides.push({ path: paths[i], hidden: at(root, "show") === "0", index: i });
  }
  return {
    pkg,
    width,
    height,
    slides,
    defaultText: kid(pres, "defaultTextStyle"),
    tableStyles: await pkg.xml("ppt/tableStyles.xml"),
    parts: new Map(),
    themes: new Map(),
  };
}

export function disposeDeck(deck: Deck) {
  deck.pkg.dispose();
}

function getPart(deck: Deck, path: string): Promise<Part | null> {
  let p = deck.parts.get(path);
  if (!p) {
    p = (async () => {
      const root = await deck.pkg.xml(path);
      if (!root) return null;
      return { path, root, rels: await deck.pkg.rels(path) } as Part;
    })();
    deck.parts.set(path, p);
  }
  return p;
}

function relTarget(part: Part | null, typeSuffix: string): string | null {
  if (!part) return null;
  let out: string | null = null;
  part.rels.forEach((r) => {
    if (!out && !r.external && r.type.slice(-typeSuffix.length) === typeSuffix) out = r.target;
  });
  return out;
}

function textOfParas(txBody: El | null): string {
  return kids(txBody, "p")
    .map((p) =>
      kids(p)
        .map((n) => {
          if (n.localName === "br") return "\n";
          if (n.localName === "r" || n.localName === "fld") return kid(n, "t")?.textContent || "";
          return "";
        })
        .join("")
    )
    .join("\n");
}

export async function getNotes(deck: Deck, ref: SlideRef): Promise<string> {
  const slide = await getPart(deck, ref.path);
  const np = relTarget(slide, "/notesSlide");
  if (!np) return "";
  const root = await deck.pkg.xml(np);
  const tree = dig(root, "cSld", "spTree");
  let text = "";
  kids(tree, "sp").forEach((sp) => {
    const ph = phOf(sp);
    if (ph && ph.type === "body") text += textOfParas(kid(sp, "txBody")) + "\n";
  });
  return text.trim();
}

// ------------------------------------------------------------------------------------------
// Shared helpers
// ------------------------------------------------------------------------------------------

interface Xf {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  flipH: boolean;
  flipV: boolean;
}

function readXfrm(x: El | null): Xf | null {
  if (!x) return null;
  const off = kid(x, "off");
  const ext = kid(x, "ext");
  if (!off && !ext) return null;
  return {
    x: numAt(off, "x", 0) / EMU,
    y: numAt(off, "y", 0) / EMU,
    w: numAt(ext, "cx", 0) / EMU,
    h: numAt(ext, "cy", 0) / EMU,
    rot: ((numAt(x, "rot", 0) / 60000) * Math.PI) / 180,
    flipH: boolAt(x, "flipH", false),
    flipV: boolAt(x, "flipV", false),
  };
}

function applyXf(g: CanvasRenderingContext2D, xf: Xf) {
  g.translate(xf.x + xf.w / 2, xf.y + xf.h / 2);
  if (xf.rot) g.rotate(xf.rot);
  if (xf.flipH || xf.flipV) g.scale(xf.flipH ? -1 : 1, xf.flipV ? -1 : 1);
  g.translate(-xf.w / 2, -xf.h / 2);
}

function undoFlip(g: CanvasRenderingContext2D, xf: Xf) {
  if (xf.flipH) {
    g.translate(xf.w, 0);
    g.scale(-1, 1);
  }
  if (xf.flipV) {
    g.translate(0, xf.h);
    g.scale(1, -1);
    g.translate(xf.w / 2, xf.h / 2);
    g.rotate(Math.PI);
    g.translate(-xf.w / 2, -xf.h / 2);
  }
}

function nonNull(list: Array<El | null | undefined>): El[] {
  return list.filter((x): x is El => !!x);
}

function nvCNvPr(n: El): El | null {
  const nv = kids(n).filter((k) => /^nv/.test(k.localName))[0];
  return kid(nv, "cNvPr");
}

function isHidden(n: El): boolean {
  return at(nvCNvPr(n), "hidden") === "1";
}

interface Ph {
  type: string;
  idx: string | null;
}

function phOf(n: El): Ph | null {
  const nv = kids(n).filter((k) => /^nv/.test(k.localName))[0];
  const ph = dig(nv, "nvPr", "ph");
  if (!ph) return null;
  return { type: at(ph, "type") || "obj", idx: at(ph, "idx") };
}

function normType(t: string): string {
  if (t === "ctrTitle") return "title";
  if (t === "subTitle" || t === "obj") return "body";
  return t;
}

function findPh(tree: El | null, ph: Ph): El | null {
  const nodes = kids(tree).filter((n) => n.localName === "sp" || n.localName === "pic" || n.localName === "graphicFrame");
  if (ph.idx !== null) {
    for (let i = 0; i < nodes.length; i++) {
      const info = phOf(nodes[i]);
      if (info && info.idx === ph.idx) return nodes[i];
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    const info = phOf(nodes[i]);
    if (info && normType(info.type) === normType(ph.type)) return nodes[i];
  }
  return null;
}

function treeOf(part: Part | null): El | null {
  return part ? dig(part.root, "cSld", "spTree") : null;
}

function inheritFor(S: State, part: Part, ph: Ph): { layoutPh: El | null; masterPh: El | null } {
  let layoutPh: El | null = null;
  let masterPh: El | null = null;
  if (part === S.slide) {
    layoutPh = findPh(treeOf(S.layout), ph);
    const info = (layoutPh && phOf(layoutPh)) || ph;
    masterPh = findPh(treeOf(S.master), info);
  } else if (part === S.layout) {
    masterPh = findPh(treeOf(S.master), ph);
  }
  return { layoutPh, masterPh };
}

function avList(avEl: El | null): Record<string, number> {
  const out: Record<string, number> = {};
  kids(avEl, "gd").forEach((gd) => {
    const m = /val\s+(-?\d+)/.exec(at(gd, "fmla") || "");
    if (m) out[at(gd, "name") || ""] = parseInt(m[1], 10);
  });
  return out;
}

function imgSize(img: CanvasImageSource): { w: number; h: number } {
  const a = img as any;
  return { w: a.naturalWidth || a.width || 0, h: a.naturalHeight || a.height || 0 };
}

function drawImageCrop(g: CanvasRenderingContext2D, img: CanvasImageSource, src: El | null, w: number, h: number) {
  const l = numAt(src, "l", 0) / 100000, t = numAt(src, "t", 0) / 100000;
  const r = numAt(src, "r", 0) / 100000, b = numAt(src, "b", 0) / 100000;
  const fw = Math.max(0.001, 1 - l - r), fh = Math.max(0.001, 1 - t - b);
  const dw = w / fw, dh = h / fh;
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(img, -l * dw, -t * dh, dw, dh);
}

// ------------------------------------------------------------------------------------------
// Fills and lines
// ------------------------------------------------------------------------------------------

async function paintFill(
  S: State,
  rels: Map<string, Rel>,
  fillEl: El,
  sc: StyleCtx,
  w: number,
  h: number,
  path: Path2D | null,
  evenodd = false
) {
  const g = S.g;
  const doFill = () => {
    if (path) g.fill(path, evenodd ? "evenodd" : "nonzero");
    else g.fillRect(0, 0, w, h);
  };
  switch (fillEl.localName) {
    case "solidFill": {
      const c = colorOf(fillEl, sc);
      if (c) {
        g.fillStyle = rgba(c);
        doFill();
      }
      break;
    }
    case "gradFill": {
      const gr = makeGradient(g, fillEl, sc, w, h);
      if (gr) {
        g.fillStyle = gr;
        doFill();
      }
      break;
    }
    case "pattFill": {
      const bg = colorOf(kid(fillEl, "bgClr"), sc);
      const fg = colorOf(kid(fillEl, "fgClr"), sc);
      if (bg) {
        g.fillStyle = rgba(bg);
        doFill();
      }
      if (fg) {
        g.fillStyle = rgba(fg, 0.3);
        doFill();
      }
      break;
    }
    case "blipFill": {
      const rel = rels.get(relId(kid(fillEl, "blip"), "embed"));
      const img = rel ? await S.deck.pkg.image(rel.target) : null;
      if (!img) break;
      g.save();
      if (path) g.clip(path);
      else {
        g.beginPath();
        g.rect(0, 0, w, h);
        g.clip();
      }
      drawImageCrop(g, img, kid(fillEl, "srcRect"), w, h);
      g.restore();
      break;
    }
  }
}

interface LineSpec {
  w: number;
  color: RGBA;
  dash: number[];
  cap: CanvasLineCap;
  join: CanvasLineJoin;
  head: El | null;
  tail: El | null;
}

const DASHES: Record<string, number[]> = {
  dot: [1, 3], sysDot: [1, 1], dash: [4, 3], sysDash: [3, 1], lgDash: [8, 3],
  dashDot: [4, 3, 1, 3], sysDashDot: [3, 1, 1, 1], lgDashDot: [8, 3, 1, 3],
  lgDashDotDot: [8, 3, 1, 3, 1, 3], sysDashDotDot: [3, 1, 1, 1, 1, 1],
};

function resolveLine(S: State, spPrs: El[], style: El | null): LineSpec | null {
  const sc = S.sc;
  const lns = nonNull(spPrs.map((s) => kid(s, "ln")));
  const lnRef = style ? kid(style, "lnRef") : null;
  let base: El | null = null;
  let refColor: RGBA | null = null;
  if (lnRef) {
    const idx = numAt(lnRef, "idx", 0);
    if (idx > 0) base = sc.theme.lnStyles[idx - 1] || null;
    refColor = colorOf(lnRef, sc);
  }
  const sc2 = withPh(sc, refColor);
  const all = base ? lns.concat([base]) : lns;
  let w: number | null = null;
  let fill: El | null = null;
  let dashName: string | null = null;
  let capAttr: string | null = null;
  let head: El | null = null;
  let tail: El | null = null;
  let join: CanvasLineJoin = "miter";
  all.forEach((ln) => {
    if (w === null && at(ln, "w") !== null) w = numAt(ln, "w", 12700) / EMU;
    if (!fill) {
      const f = findFillEl(ln);
      if (f && f.localName !== "blipFill" && f.localName !== "grpFill") fill = f;
    }
    if (!dashName) dashName = at(kid(ln, "prstDash"), "val");
    if (!capAttr) capAttr = at(ln, "cap");
    if (!head) {
      const e = kid(ln, "headEnd");
      if (e && at(e, "type") && at(e, "type") !== "none") head = e;
    }
    if (!tail) {
      const e = kid(ln, "tailEnd");
      if (e && at(e, "type") && at(e, "type") !== "none") tail = e;
    }
    if (kid(ln, "round")) join = "round";
    else if (kid(ln, "bevel")) join = "bevel";
  });
  const f = fill as El | null;
  if (!f || f.localName === "noFill") return null;
  let color: RGBA | null = null;
  if (f.localName === "solidFill") color = colorOf(f, sc2);
  else if (f.localName === "gradFill") color = colorOf(kid(kid(f, "gsLst"), "gs"), sc2);
  else if (f.localName === "pattFill") color = colorOf(kid(f, "fgClr"), sc2);
  if (!color) return null;
  const lw = w === null ? 1 : w;
  return {
    w: lw,
    color,
    dash: DASHES[dashName || ""] || [],
    cap: capAttr === "rnd" ? "round" : capAttr === "sq" ? "square" : "butt",
    join,
    head,
    tail,
  };
}

function applyLine(g: CanvasRenderingContext2D, ln: LineSpec) {
  g.lineWidth = Math.max(0.5, ln.w);
  g.strokeStyle = rgba(ln.color);
  g.lineCap = ln.cap;
  g.lineJoin = ln.join;
  g.setLineDash(ln.dash.map((d) => d * Math.max(1, ln.w)));
}

function arrowSize(v: string | null): number {
  return v === "lg" ? 5 : v === "sm" ? 2 : 3;
}

function drawArrowHead(g: CanvasRenderingContext2D, end: { x: number; y: number; dx: number; dy: number } | undefined, ln: LineSpec, el: El | null) {
  if (!end || !el) return;
  const type = at(el, "type") || "none";
  if (type === "none") return;
  const lw = Math.max(ln.w, 1.5);
  const aw = lw * arrowSize(at(el, "w")), al = lw * arrowSize(at(el, "len"));
  g.save();
  g.translate(end.x, end.y);
  g.rotate(Math.atan2(end.dy, end.dx));
  g.setLineDash([]);
  g.fillStyle = rgba(ln.color);
  g.beginPath();
  if (type === "arrow") {
    g.moveTo(-al, -aw / 2);
    g.lineTo(0, 0);
    g.lineTo(-al, aw / 2);
    g.stroke();
  } else if (type === "oval") {
    g.ellipse(-al / 2, 0, al / 2, aw / 2, 0, 0, Math.PI * 2);
    g.fill();
  } else if (type === "diamond") {
    g.moveTo(0, 0);
    g.lineTo(-al / 2, -aw / 2);
    g.lineTo(-al, 0);
    g.lineTo(-al / 2, aw / 2);
    g.closePath();
    g.fill();
  } else if (type === "stealth") {
    g.moveTo(0, 0);
    g.lineTo(-al, -aw / 2);
    g.lineTo(-al * 0.7, 0);
    g.lineTo(-al, aw / 2);
    g.closePath();
    g.fill();
  } else {
    g.moveTo(0, 0);
    g.lineTo(-al, -aw / 2);
    g.lineTo(-al, aw / 2);
    g.closePath();
    g.fill();
  }
  g.restore();
}

function textInset(prst: string, w: number, h: number, av: Record<string, number>) {
  if (prst === "ellipse" || prst === "flowChartConnector") {
    const ix = w * 0.14645, iy = h * 0.14645;
    return { l: ix, t: iy, r: ix, b: iy };
  }
  if (prst === "diamond" || prst === "flowChartDecision") return { l: w / 4, t: h / 4, r: w / 4, b: h / 4 };
  if (prst === "roundRect") {
    const i = ((Math.min(w, h) * (av.adj !== undefined ? av.adj : 16667)) / 100000) * 0.29289;
    return { l: i, t: i, r: i, b: i };
  }
  return { l: 0, t: 0, r: 0, b: 0 };
}

// ------------------------------------------------------------------------------------------
// Shapes
// ------------------------------------------------------------------------------------------

function listStyleKind(ph: Ph | null): string | null {
  if (!ph) return null;
  const t = normType(ph.type);
  if (t === "title") return "titleStyle";
  if (t === "body") return "bodyStyle";
  return "otherStyle";
}

async function drawNode(S: State, part: Part, n: El, skipPh: boolean): Promise<void> {
  switch (n.localName) {
    case "sp":
    case "cxnSp":
      return drawSp(S, part, n, skipPh);
    case "pic":
      return drawPic(S, part, n, skipPh);
    case "grpSp":
      return drawGroup(S, part, n, skipPh);
    case "graphicFrame":
      return drawFrame(S, part, n, skipPh);
    case "AlternateContent": {
      const pick = kid(n, "Fallback") || kid(n, "Choice");
      if (pick) {
        for (const c of kids(pick)) await drawNode(S, part, c, skipPh);
      }
      return;
    }
  }
}

async function drawTree(S: State, part: Part | null, skipPh: boolean) {
  if (!part) return;
  const tree = treeOf(part);
  for (const n of kids(tree)) await drawNode(S, part, n, skipPh);
}

async function drawSp(S: State, part: Part, sp: El, skipPh: boolean) {
  if (isHidden(sp)) return;
  const ph = phOf(sp);
  if (ph && skipPh) return;
  const g = S.g;
  const spPr = kid(sp, "spPr");
  const style = kid(sp, "style");
  let layoutPh: El | null = null;
  let masterPh: El | null = null;
  if (ph) {
    const r = inheritFor(S, part, ph);
    layoutPh = r.layoutPh;
    masterPh = r.masterPh;
  }
  const spPrs = nonNull([spPr, layoutPh && kid(layoutPh, "spPr"), masterPh && kid(masterPh, "spPr")]);

  let xf: Xf | null = null;
  for (const s of spPrs) {
    const x = readXfrm(kid(s, "xfrm"));
    if (x) {
      xf = x;
      break;
    }
  }
  if (!xf) return;

  let prst = sp.localName === "cxnSp" ? "line" : "rect";
  let avEl: El | null = null;
  let cust: El | null = null;
  for (const s of spPrs) {
    const c = kid(s, "custGeom");
    if (c) {
      cust = c;
      break;
    }
    const p = kid(s, "prstGeom");
    if (p) {
      prst = at(p, "prst") || "rect";
      avEl = kid(p, "avLst");
      break;
    }
  }
  const av = avList(avEl);

  // fill
  let fillEl: El | null = null;
  let fillSc = S.sc;
  for (const s of spPrs) {
    const f = findFillEl(s);
    if (f) {
      fillEl = f;
      break;
    }
  }
  if (!fillEl && style) {
    const fr = kid(style, "fillRef");
    const idx = numAt(fr, "idx", 0);
    const th = S.sc.theme;
    const styleFill = idx >= 1001 ? th.bgFillStyles[idx - 1001] : idx >= 1 ? th.fillStyles[idx - 1] : null;
    if (styleFill) {
      fillEl = styleFill;
      fillSc = withPh(S.sc, colorOf(fr, S.sc));
    }
  }
  if (fillEl && (fillEl.localName === "noFill" || fillEl.localName === "grpFill")) fillEl = null;

  const ln = resolveLine(S, spPrs, style);

  // shadow
  let shadow: { color: RGBA; blur: number; dx: number; dy: number } | null = null;
  for (const s of spPrs) {
    const sh = dig(s, "effectLst", "outerShdw");
    if (sh) {
      const color = colorOf(sh, S.sc);
      const dist = numAt(sh, "dist", 0) / EMU;
      const dir = (numAt(sh, "dir", 0) / 60000) * (Math.PI / 180);
      if (color) shadow = { color, blur: numAt(sh, "blurRad", 0) / EMU, dx: Math.cos(dir) * dist, dy: Math.sin(dir) * dist };
      break;
    }
  }

  const txBody = kid(sp, "txBody");
  const withText = !!txBody && hasText(txBody);
  if (!fillEl && !ln && !withText) return;
  if (xf.w <= 0 && xf.h <= 0 && !withText && !ln) return;

  const w = xf.w, h = xf.h;
  g.save();
  applyXf(g, xf);
  const geom: Geom = cust ? customGeom(cust, w, h) : presetGeom(prst, w, h, av);

  if (fillEl && !geom.open) {
    if (shadow) {
      const m = g.getTransform();
      const k = Math.hypot(m.a, m.b);
      g.shadowColor = rgba(shadow.color);
      g.shadowBlur = shadow.blur * k;
      g.shadowOffsetX = shadow.dx * k;
      g.shadowOffsetY = shadow.dy * k;
    }
    for (const gp of geom.parts) {
      if (gp.fill) await paintFill(S, part.rels, fillEl, fillSc, w, h, gp.path, !!(gp as any).evenodd);
    }
    g.shadowColor = "rgba(0,0,0,0)";
    g.shadowBlur = 0;
    g.shadowOffsetX = 0;
    g.shadowOffsetY = 0;
  }
  if (ln) {
    applyLine(g, ln);
    for (const gp of geom.parts) if (gp.stroke) g.stroke(gp.path);
    if (geom.open) {
      drawArrowHead(g, geom.start, ln, ln.head);
      drawArrowHead(g, geom.end, ln, ln.tail);
    }
  }

  if (txBody && withText) {
    g.save();
    undoFlip(g, xf);
    drawShapeText(S, sp, txBody, w, h, prst, av, layoutPh, masterPh, style, ph);
    g.restore();
  }
  g.restore();
}

function drawShapeText(
  S: State,
  sp: El,
  txBody: El,
  w: number,
  h: number,
  prst: string,
  av: Record<string, number>,
  layoutPh: El | null,
  masterPh: El | null,
  style: El | null,
  ph: Ph | null
) {
  const g = S.g;
  const bps = [kid(txBody, "bodyPr"), layoutPh ? dig(layoutPh, "txBody", "bodyPr") : null, masterPh ? dig(masterPh, "txBody", "bodyPr") : null];
  const battr = (n: string): string | null => {
    for (const bp of bps) {
      const v = at(bp, n);
      if (v !== null) return v;
    }
    return null;
  };
  const ins = (n: string, d: number) => {
    const v = battr(n);
    return (v === null ? d : parseFloat(v)) / EMU;
  };
  const lIns = ins("lIns", 91440), tIns = ins("tIns", 45720), rIns = ins("rIns", 91440), bIns = ins("bIns", 45720);
  const anchor = battr("anchor") || "t";
  const wrap = battr("wrap") !== "none";
  const vert = battr("vert") || "horz";

  let norm = false, fontScale = 1, lnReduce = 0, hasFs = false;
  for (const bp of bps) {
    if (!bp) continue;
    const na = kid(bp, "normAutofit");
    if (na) {
      norm = true;
      if (at(na, "fontScale") !== null) {
        hasFs = true;
        fontScale = numAt(na, "fontScale", 100000) / 100000;
      }
      lnReduce = numAt(na, "lnSpcReduction", 0) / 100000;
      break;
    }
    if (kid(bp, "noAutofit") || kid(bp, "spAutoFit")) break;
  }

  const tr = textInset(prst, w, h, av);
  let bw = w - tr.l - tr.r;
  let bh = h - tr.t - tr.b;

  const kind = listStyleKind(ph);
  const masterStyle = kind && S.txStyles ? kid(S.txStyles, kind) : null;
  const chain: Array<El | null> = [
    kid(txBody, "lstStyle"),
    layoutPh ? dig(layoutPh, "txBody", "lstStyle") : null,
    masterPh ? dig(masterPh, "txBody", "lstStyle") : null,
    masterStyle,
    S.deck.defaultText,
  ];
  const fr = style ? kid(style, "fontRef") : null;
  const frColor = fr ? colorOf(fr, S.sc) : null;
  const env: TextEnv = {
    sc: S.sc,
    chain,
    defaultColor: frColor || S.tx1,
    slideNum: S.slideNum,
    skipColorIn: frColor && !ph ? S.deck.defaultText : null,
  };

  g.save();
  g.translate(tr.l, tr.t);
  if (vert === "vert" || vert === "eaVert" || vert === "wordArtVert") {
    g.translate(bw / 2, bh / 2);
    g.rotate(Math.PI / 2);
    g.translate(-bh / 2, -bw / 2);
    const t = bw;
    bw = bh;
    bh = t;
  } else if (vert === "vert270") {
    g.translate(bw / 2, bh / 2);
    g.rotate(-Math.PI / 2);
    g.translate(-bh / 2, -bw / 2);
    const t = bw;
    bw = bh;
    bh = t;
  }
  drawTextBody(
    g,
    txBody,
    { w: bw, h: bh, lIns, tIns, rIns, bIns, anchor, wrap, normAutofit: norm, fontScale, lnReduce, hasFontScale: hasFs },
    env,
    S.texts
  );
  g.restore();
}

async function drawPic(S: State, part: Part, pic: El, skipPh: boolean) {
  if (isHidden(pic)) return;
  const ph = phOf(pic);
  if (ph && skipPh) return;
  const g = S.g;
  let layoutPh: El | null = null;
  let masterPh: El | null = null;
  if (ph) {
    const r = inheritFor(S, part, ph);
    layoutPh = r.layoutPh;
    masterPh = r.masterPh;
  }
  const spPrs = nonNull([kid(pic, "spPr"), layoutPh && kid(layoutPh, "spPr"), masterPh && kid(masterPh, "spPr")]);
  let xf: Xf | null = null;
  for (const s of spPrs) {
    const x = readXfrm(kid(s, "xfrm"));
    if (x) {
      xf = x;
      break;
    }
  }
  if (!xf || xf.w <= 0 || xf.h <= 0) return;
  const blipFill = kid(pic, "blipFill");
  const blip = kid(blipFill, "blip");
  const rel = part.rels.get(relId(blip, "embed"));
  const img = rel && !rel.external ? await S.deck.pkg.image(rel.target) : null;
  if (!img) {
    warn(S, "image");
    return;
  }
  let prst = "rect";
  let avEl: El | null = null;
  let cust: El | null = null;
  for (const s of spPrs) {
    const c = kid(s, "custGeom");
    if (c) {
      cust = c;
      break;
    }
    const p = kid(s, "prstGeom");
    if (p) {
      prst = at(p, "prst") || "rect";
      avEl = kid(p, "avLst");
      break;
    }
  }
  const w = xf.w, h = xf.h;
  const geom = cust ? customGeom(cust, w, h) : presetGeom(prst, w, h, avList(avEl));
  const ln = resolveLine(S, spPrs, kid(pic, "style"));

  g.save();
  applyXf(g, xf);
  g.save();
  if (prst === "rect" && !cust) {
    g.beginPath();
    g.rect(0, 0, w, h);
    g.clip();
  } else {
    g.clip(geom.parts[0].path);
  }
  const amt = at(kid(blip, "alphaModFix"), "amt");
  if (amt !== null) g.globalAlpha = Math.max(0, Math.min(1, parseFloat(amt) / 100000));
  if (kid(blip, "grayscl") && "filter" in g) (g as any).filter = "grayscale(1)";
  const size = imgSize(img);
  if (size.w > 0 || size.h > 0) drawImageCrop(g, img, kid(blipFill, "srcRect"), w, h);
  else g.drawImage(img, 0, 0, w, h);
  g.restore();
  if (ln) {
    applyLine(g, ln);
    g.stroke(geom.parts[0].path);
  }
  g.restore();
}

async function drawGroup(S: State, part: Part, grp: El, skipPh: boolean) {
  if (isHidden(grp)) return;
  const g = S.g;
  const xfEl = dig(grp, "grpSpPr", "xfrm");
  const children = kids(grp).filter((k) => ["sp", "cxnSp", "pic", "grpSp", "graphicFrame", "AlternateContent"].indexOf(k.localName) >= 0);
  if (!xfEl) {
    for (const c of children) await drawNode(S, part, c, skipPh);
    return;
  }
  const xf = readXfrm(xfEl);
  const cho = kid(xfEl, "chOff");
  const che = kid(xfEl, "chExt");
  if (!xf) return;
  const cx = numAt(cho, "x", 0) / EMU, cy = numAt(cho, "y", 0) / EMU;
  const cw = numAt(che, "cx", 0) / EMU, ch = numAt(che, "cy", 0) / EMU;
  g.save();
  applyXf(g, xf);
  g.scale(cw > 0 ? xf.w / cw : 1, ch > 0 ? xf.h / ch : 1);
  g.translate(-cx, -cy);
  for (const c of children) await drawNode(S, part, c, skipPh);
  g.restore();
}

// ------------------------------------------------------------------------------------------
// Graphic frames: tables, SmartArt, charts, OLE fallbacks
// ------------------------------------------------------------------------------------------

async function drawFrame(S: State, part: Part, gf: El, skipPh: boolean) {
  if (isHidden(gf)) return;
  if (phOf(gf) && skipPh) return;
  const xf = readXfrm(kid(gf, "xfrm"));
  const gd = dig(gf, "graphic", "graphicData");
  if (!xf || !gd) return;
  const tbl = kid(gd, "tbl");
  if (tbl) {
    await drawTable(S, tbl, xf.x, xf.y);
    return;
  }
  const relIds = kid(gd, "relIds");
  if (relIds) {
    await drawDiagram(S, part, relIds, xf.x, xf.y);
    return;
  }
  const chart = kid(gd, "chart");
  if (chart) {
    const rel = part.rels.get(relId(chart, "id"));
    const chartRoot = rel && !rel.external ? await S.deck.pkg.xml(rel.target) : null;
    let ok = false;
    if (chartRoot) {
      S.g.save();
      S.g.translate(xf.x, xf.y);
      S.g.beginPath();
      S.g.rect(0, 0, xf.w, xf.h);
      S.g.clip();
      try {
        ok = drawChart(S.g, chartRoot, xf.w, xf.h, S.sc);
      } catch {
        ok = false;
      }
      S.g.restore();
    }
    if (!ok) drawChartPlaceholder(S, xf);
    return;
  }
  const pics = gd.getElementsByTagNameNS("*", "pic");
  if (pics.length) {
    await drawPic(S, part, pics[0], false);
    return;
  }
  warn(S, "object");
}

function drawChartPlaceholder(S: State, xf: Xf) {
  const g = S.g;
  warn(S, "chart");
  g.save();
  g.fillStyle = "rgba(240,242,245,1)";
  g.strokeStyle = "rgba(160,170,185,1)";
  g.lineWidth = 1;
  g.setLineDash([6, 4]);
  g.fillRect(xf.x, xf.y, xf.w, xf.h);
  g.strokeRect(xf.x, xf.y, xf.w, xf.h);
  g.setLineDash([]);
  g.fillStyle = "rgba(110,120,135,1)";
  g.font = "16px Arial, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("Chart", xf.x + xf.w / 2, xf.y + xf.h / 2);
  g.restore();
}

async function drawDiagram(S: State, part: Part, relIds: El, fx: number, fy: number) {
  let drawingPath: string | null = null;
  const dm = part.rels.get(relId(relIds, "dm"));
  if (dm && !dm.external) {
    const dmRoot = await S.deck.pkg.xml(dm.target);
    const ext = dmRoot ? dmRoot.getElementsByTagNameNS("*", "dataModelExt")[0] : null;
    const rid = ext ? at(ext, "relId") : null;
    const rel = rid ? part.rels.get(rid) : null;
    if (rel && !rel.external) drawingPath = rel.target;
  }
  if (!drawingPath) drawingPath = relTarget(part, "/diagramDrawing");
  const dPart = drawingPath ? await getPart(S.deck, drawingPath) : null;
  const tree = dPart ? dig(dPart.root, "spTree") : null;
  if (!dPart || !tree) {
    warn(S, "smartart");
    return;
  }
  S.g.save();
  S.g.translate(fx, fy);
  for (const c of kids(tree)) await drawNode(S, dPart, c, false);
  S.g.restore();
}

// ---- tables

interface Border {
  w: number;
  color: RGBA;
}

interface CellStyle {
  fill: RGBA | null;
  text: RGBA | null;
  bold: boolean;
  l: Border | null;
  r: Border | null;
  t: Border | null;
  b: Border | null;
}

interface TblFlags {
  firstRow: boolean;
  lastRow: boolean;
  firstCol: boolean;
  lastCol: boolean;
  bandRow: boolean;
  bandCol: boolean;
}

const STYLE_NO_GRID = "{2D5ABB26-0587-4C30-8999-92F81FD0307C}";
const STYLE_GRID = "{5940675A-B579-460E-94D1-54222C63F5DA}";

function themeRgb(S: State, name: string): RGBA {
  const hex = S.sc.theme.colors[S.sc.clrMap[name] || name] || "000000";
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
}

function tint(c: RGBA, t: number): RGBA {
  return { r: Math.round(c.r * t + 255 * (1 - t)), g: Math.round(c.g * t + 255 * (1 - t)), b: Math.round(c.b * t + 255 * (1 - t)), a: c.a };
}

function lineToBorder(S: State, ln: El | null): Border | null {
  if (!ln) return null;
  const f = findFillEl(ln);
  if (!f || f.localName === "noFill") return null;
  const color = colorOf(f, S.sc);
  if (!color) return null;
  return { w: Math.max(0.5, numAt(ln, "w", 12700) / EMU), color };
}

function builtinCellStyle(S: State, id: string, f: TblFlags, r: number, c: number, nR: number, nC: number): CellStyle {
  const out: CellStyle = { fill: null, text: null, bold: false, l: null, r: null, t: null, b: null };
  if (id === STYLE_NO_GRID) return out;
  if (id === STYLE_GRID) {
    const black = { w: 1, color: { r: 0, g: 0, b: 0, a: 1 } };
    out.l = out.r = out.t = out.b = black;
    return out;
  }
  const acc = themeRgb(S, "accent1");
  const light = themeRgb(S, "lt1");
  const dark = themeRgb(S, "dk1");
  const isHead = f.firstRow && r === 0;
  const isLast = f.lastRow && r === nR - 1;
  const isFirstCol = f.firstCol && c === 0;
  const isLastCol = f.lastCol && c === nC - 1;
  const dataRow = r - (f.firstRow ? 1 : 0);
  out.fill = tint(acc, 0.2);
  if (f.bandRow && !isHead && dataRow % 2 === 0) out.fill = tint(acc, 0.4);
  out.text = dark;
  if (isHead || isLast || isFirstCol || isLastCol) {
    out.fill = acc;
    out.text = light;
    out.bold = true;
  }
  const white = { w: 1.33, color: light };
  out.l = out.r = out.t = out.b = white;
  if (isHead) out.b = { w: 4, color: light };
  return out;
}

function xmlCellStyle(S: State, style: El, f: TblFlags, r: number, c: number, nR: number, nC: number): CellStyle {
  const sc = S.sc;
  const out: CellStyle = { fill: null, text: null, bold: false, l: null, r: null, t: null, b: null };
  const layers: string[] = ["wholeTbl"];
  const firstDataRow = f.firstRow ? 1 : 0;
  if (f.bandRow && r >= firstDataRow && !(f.lastRow && r === nR - 1)) layers.push((r - firstDataRow) % 2 === 0 ? "band1H" : "band2H");
  if (f.bandCol) layers.push((c - (f.firstCol ? 1 : 0)) % 2 === 0 ? "band1V" : "band2V");
  if (f.firstCol && c === 0) layers.push("firstCol");
  if (f.lastCol && c === nC - 1) layers.push("lastCol");
  if (f.lastRow && r === nR - 1) layers.push("lastRow");
  if (f.firstRow && r === 0) layers.push("firstRow");

  layers.forEach((name) => {
    const part = kid(style, name);
    if (!part) return;
    const tx = kid(part, "tcTxStyle");
    if (tx) {
      const b = at(tx, "b");
      if (b === "on") out.bold = true;
      else if (b === "off") out.bold = false;
      const col = colorOf(tx, sc) || colorOf(kid(tx, "fontRef"), sc);
      if (col) out.text = col;
    }
    const tc = kid(part, "tcStyle");
    if (!tc) return;
    const fillWrap = kid(tc, "fill");
    if (fillWrap) {
      const ff = findFillEl(fillWrap);
      if (ff) out.fill = ff.localName === "solidFill" ? colorOf(ff, sc) : null;
    }
    const fr = kid(tc, "fillRef");
    if (fr && !fillWrap) {
      const col = colorOf(fr, sc);
      if (col && numAt(fr, "idx", 0) > 0) out.fill = col;
    }
    const bdr = kid(tc, "tcBdr");
    if (bdr) {
      const side = (n: string): Border | null | undefined => {
        const e = kid(bdr, n);
        if (!e) return undefined;
        const ln = kid(e, "ln");
        if (ln) return lineToBorder(S, ln);
        const lr = kid(e, "lnRef");
        if (lr) {
          const idx = numAt(lr, "idx", 0);
          const col = colorOf(lr, sc);
          const base = idx > 0 ? sc.theme.lnStyles[idx - 1] : null;
          if (!col || idx === 0) return null;
          return { w: Math.max(0.5, numAt(base, "w", 12700) / EMU), color: col };
        }
        return undefined;
      };
      const set = (key: "l" | "r" | "t" | "b", v: Border | null | undefined) => {
        if (v !== undefined) out[key] = v;
      };
      set("l", side(c === 0 ? "left" : "insideV"));
      set("r", side(c === nC - 1 ? "right" : "insideV"));
      set("t", side(r === 0 ? "top" : "insideH"));
      set("b", side(r === nR - 1 ? "bottom" : "insideH"));
    }
  });
  return out;
}

async function drawTable(S: State, tbl: El, fx: number, fy: number) {
  const g = S.g;
  const tblPr = kid(tbl, "tblPr");
  const flags: TblFlags = {
    firstRow: boolAt(tblPr, "firstRow", false),
    lastRow: boolAt(tblPr, "lastRow", false),
    firstCol: boolAt(tblPr, "firstCol", false),
    lastCol: boolAt(tblPr, "lastCol", false),
    bandRow: boolAt(tblPr, "bandRow", false),
    bandCol: boolAt(tblPr, "bandCol", false),
  };
  const styleId = (kid(tblPr, "tableStyleId")?.textContent || "").trim();
  const styleEl = S.deck.tableStyles
    ? kids(S.deck.tableStyles, "tblStyle").filter((s) => at(s, "styleId") === styleId)[0] || null
    : null;
  const grid = kids(kid(tbl, "tblGrid"), "gridCol").map((c) => numAt(c, "w", 0) / EMU);
  const rows = kids(tbl, "tr");
  const nR = rows.length, nC = grid.length;
  if (!nR || !nC) return;
  const colX: number[] = [0];
  grid.forEach((w, i) => colX.push(colX[i] + w));

  interface Cell {
    el: El;
    r: number;
    c: number;
    rs: number;
    cs: number;
    skip: boolean;
    style: CellStyle;
    fill: RGBA | null;
    txBody: El | null;
    mar: { l: number; r: number; t: number; b: number };
    anchor: string;
    env: TextEnv;
    w: number;
  }
  const cells: Cell[] = [];
  const rowH: number[] = rows.map((tr) => numAt(tr, "h", 0) / EMU);

  rows.forEach((tr, r) => {
    kids(tr, "tc").forEach((tc, c) => {
      if (c >= nC) return;
      const cs = Math.max(1, numAt(tc, "gridSpan", 1)), rs = Math.max(1, numAt(tc, "rowSpan", 1));
      const skip = boolAt(tc, "hMerge", false) || boolAt(tc, "vMerge", false);
      const st = styleEl ? xmlCellStyle(S, styleEl, flags, r, c, nR, nC) : builtinCellStyle(S, styleId, flags, r, c, nR, nC);
      const tcPr = kid(tc, "tcPr");
      let fill = st.fill;
      const ff = findFillEl(tcPr);
      if (ff) fill = ff.localName === "solidFill" ? colorOf(ff, S.sc) : null;
      const bsel: Array<["l" | "r" | "t" | "b", string]> = [["l", "lnL"], ["r", "lnR"], ["t", "lnT"], ["b", "lnB"]];
      bsel.forEach(([k, n]) => {
        const e = kid(tcPr, n);
        if (e) st[k] = lineToBorder(S, e);
      });
      const txBody = kid(tc, "txBody");
      const lw = colX[Math.min(nC, c + cs)] - colX[c];
      cells.push({
        el: tc,
        r,
        c,
        rs,
        cs,
        skip,
        style: st,
        fill,
        txBody,
        mar: {
          l: numAt(tcPr, "marL", 91440) / EMU,
          r: numAt(tcPr, "marR", 91440) / EMU,
          t: numAt(tcPr, "marT", 45720) / EMU,
          b: numAt(tcPr, "marB", 45720) / EMU,
        },
        anchor: at(tcPr, "anchor") || "t",
        w: lw,
        env: {
          sc: S.sc,
          chain: [kid(txBody, "lstStyle"), S.deck.defaultText],
          defaultColor: st.text || S.tx1,
          slideNum: S.slideNum,
          bold: st.bold,
          skipColorIn: st.text ? S.deck.defaultText : null,
        },
      });
    });
  });

  // grow rows to fit their text
  cells.forEach((cell) => {
    if (cell.skip || cell.rs > 1 || !cell.txBody) return;
    const lay = layoutText(g, cell.txBody, Math.max(1, cell.w - cell.mar.l - cell.mar.r), cell.env, 1, 0, true);
    const need = lay.height + cell.mar.t + cell.mar.b;
    if (need > rowH[cell.r]) rowH[cell.r] = need;
  });
  const rowY: number[] = [0];
  rowH.forEach((h, i) => rowY.push(rowY[i] + h));

  g.save();
  g.translate(fx, fy);
  // fills
  cells.forEach((cell) => {
    if (cell.skip || !cell.fill) return;
    const x = colX[cell.c], y = rowY[cell.r];
    g.fillStyle = rgba(cell.fill);
    g.fillRect(x, y, cell.w, rowY[Math.min(nR, cell.r + cell.rs)] - y);
  });
  // text
  cells.forEach((cell) => {
    if (cell.skip || !cell.txBody || !hasText(cell.txBody)) return;
    const x = colX[cell.c], y = rowY[cell.r];
    const h = rowY[Math.min(nR, cell.r + cell.rs)] - y;
    g.save();
    g.translate(x, y);
    drawTextBody(
      g,
      cell.txBody,
      { w: cell.w, h, lIns: cell.mar.l, tIns: cell.mar.t, rIns: cell.mar.r, bIns: cell.mar.b, anchor: cell.anchor, wrap: true, normAutofit: false, fontScale: 1, lnReduce: 0, hasFontScale: false },
      cell.env,
      S.texts
    );
    g.restore();
  });
  // borders
  g.setLineDash([]);
  g.lineCap = "butt";
  cells.forEach((cell) => {
    if (cell.skip) return;
    const x0 = colX[cell.c], x1 = x0 + cell.w;
    const y0 = rowY[cell.r], y1 = rowY[Math.min(nR, cell.r + cell.rs)];
    const line = (b: Border | null, ax: number, ay: number, bx: number, by: number) => {
      if (!b) return;
      g.strokeStyle = rgba(b.color);
      g.lineWidth = b.w;
      g.beginPath();
      g.moveTo(ax, ay);
      g.lineTo(bx, by);
      g.stroke();
    };
    line(cell.style.t, x0, y0, x1, y0);
    line(cell.style.b, x0, y1, x1, y1);
    line(cell.style.l, x0, y0, x0, y1);
    line(cell.style.r, x1, y0, x1, y1);
  });
  g.restore();
}

// ------------------------------------------------------------------------------------------
// Slide rendering
// ------------------------------------------------------------------------------------------

const IDENTITY_CLRMAP: Record<string, string> = {
  bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2", accent1: "accent1", accent2: "accent2", accent3: "accent3",
  accent4: "accent4", accent5: "accent5", accent6: "accent6", hlink: "hlink", folHlink: "folHlink",
};

function readClrMap(el: El | null): Record<string, string> | null {
  if (!el) return null;
  const out: Record<string, string> = {};
  for (let i = 0; i < el.attributes.length; i++) out[el.attributes[i].name] = el.attributes[i].value;
  return out;
}

async function drawBackground(S: State) {
  const parts = [S.slide, S.layout, S.master];
  for (const part of parts) {
    if (!part) continue;
    const bg = dig(part.root, "cSld", "bg");
    if (!bg) continue;
    const bgPr = kid(bg, "bgPr");
    if (bgPr) {
      const f = findFillEl(bgPr);
      if (f) await paintFill(S, part.rels, f, S.sc, S.W, S.H, null);
      return;
    }
    const ref = kid(bg, "bgRef");
    if (ref) {
      const idx = numAt(ref, "idx", 0);
      const th = S.sc.theme;
      const f = idx >= 1001 ? th.bgFillStyles[idx - 1001] : idx >= 1 ? th.fillStyles[idx - 1] : null;
      if (f) await paintFill(S, part.rels, f, withPh(S.sc, colorOf(ref, S.sc)), S.W, S.H, null);
      else {
        const c = colorOf(ref, S.sc);
        if (c) {
          S.g.fillStyle = rgba(c);
          S.g.fillRect(0, 0, S.W, S.H);
        }
      }
      return;
    }
  }
}

export async function renderSlide(deck: Deck, ref: SlideRef, slideNum: number, scale: number): Promise<RenderedSlide> {
  const slide = await getPart(deck, ref.path);
  if (!slide) throw new Error("Slide " + slideNum + " could not be read.");
  const layoutPath = relTarget(slide, "/slideLayout");
  const layout = layoutPath ? await getPart(deck, layoutPath) : null;
  const masterPath = relTarget(layout, "/slideMaster");
  const master = masterPath ? await getPart(deck, masterPath) : null;
  const themePath = relTarget(master, "/theme");
  let theme = themePath ? deck.themes.get(themePath) : undefined;
  if (!theme) {
    theme = themePath ? parseTheme(await deck.pkg.xml(themePath)) : emptyTheme();
    if (themePath) deck.themes.set(themePath, theme);
  }
  let clrMap = (master && readClrMap(kid(master.root, "clrMap"))) || { ...IDENTITY_CLRMAP };
  const lOv = layout ? readClrMap(dig(layout.root, "clrMapOvr", "overrideClrMapping")) : null;
  const sOv = readClrMap(dig(slide.root, "clrMapOvr", "overrideClrMapping"));
  if (lOv) clrMap = lOv;
  if (sOv) clrMap = sOv;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(deck.width * scale));
  canvas.height = Math.max(1, Math.round(deck.height * scale));
  const g = canvas.getContext("2d");
  if (!g) throw new Error("Canvas is not available in this browser.");
  g.scale(scale, scale);
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, deck.width, deck.height);

  const sc: StyleCtx = { theme, clrMap, phClr: null };
  const tx1hex = theme.colors[clrMap["tx1"] || "dk1"] || "000000";
  const n = parseInt(tx1hex, 16);
  const S: State = {
    deck,
    g,
    sc,
    slide,
    layout,
    master,
    texts: [],
    warn: {},
    slideNum,
    txStyles: master ? kid(master.root, "txStyles") : null,
    tx1: { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 },
    W: deck.width,
    H: deck.height,
  };

  await drawBackground(S);
  const slideShows = at(slide.root, "showMasterSp") !== "0";
  const layoutShows = !layout || at(layout.root, "showMasterSp") !== "0";
  if (slideShows) {
    if (layoutShows) await drawTree(S, master, true);
    await drawTree(S, layout, true);
  }
  await drawTree(S, slide, false);

  if (deck.pkg.unsupportedImages > 0) S.warn["image"] = Math.max(S.warn["image"] || 0, 1);
  return { canvas, texts: S.texts, warnings: S.warn };
}
