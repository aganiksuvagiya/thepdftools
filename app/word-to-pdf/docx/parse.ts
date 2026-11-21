// DOCX package -> DocModel (sections, paragraphs, runs, tables, images, headers/footers).
import { El, EMU, Pkg, Rel, kid, kids, dig, at, numAt, relId } from "@/lib/ooxml/xml";
import { Theme, emptyTheme, parseTheme } from "@/lib/ooxml/theme";
import {
  Numbering, RawP, RawR, StyleSheet, TblPart, TW, mergeP, mergeR, readBorders, readP, readR, resolveP, resolveR, shadeCss, wa,
} from "./styles";
import { Anchor, Block, Border, Borders, Cell, DocModel, Inline, NumLabel, Para, RStyle, Row, SectProps, Table, TableBorders } from "./model";

interface Layer {
  p: RawP;
  r: RawR;
}

interface Field {
  instr: string;
  sep: boolean;
  kind: "page" | "numpages" | null;
}

interface Ctx {
  pkg: Pkg;
  ss: StyleSheet;
  num: Numbering;
  theme: Theme;
  model: DocModel;
  rels: Map<string, Rel>;
  fields: Field[];
  footnotes: number;
}

function warn(c: Ctx, key: string) {
  c.model.warnings[key] = (c.model.warnings[key] || 0) + 1;
}

function fieldKind(instr: string): "page" | "numpages" | null {
  const t = instr.trim().toUpperCase();
  if (/^PAGE\b/.test(t)) return "page";
  if (/^(NUMPAGES|SECTIONPAGES)\b/.test(t)) return "numpages";
  return null;
}

function hidden(c: Ctx): boolean {
  for (let i = 0; i < c.fields.length; i++) if (c.fields[i].sep && c.fields[i].kind) return true;
  return false;
}

// ---------------------------------------------------------------------------------------------
// Inline content
// ---------------------------------------------------------------------------------------------

function parseAnchor(holder: El): Anchor | null {
  if (holder.localName !== "anchor") return null;
  const wrapEl = kids(holder).filter((k) => /^wrap/.test(k.localName))[0];
  const wrap = wrapEl ? wrapEl.localName.slice(4) : "none";
  const pos = (name: string) => {
    const p = kid(holder, name);
    const off = kid(p, "posOffset");
    const al = kid(p, "align");
    return { rel: at(p, "relativeFrom") || "", off: off ? parseFloat(off.textContent || "0") / EMU : 0, align: al ? (al.textContent || "").trim() : null };
  };
  const h = pos("positionH"), v = pos("positionV");
  return {
    behind: at(holder, "behindDoc") === "1",
    wrap: wrap.charAt(0).toLowerCase() + wrap.slice(1),
    relH: h.rel,
    relV: v.rel,
    offH: h.off,
    offV: v.off,
    alignH: h.align,
    alignV: v.align,
  };
}

function parseDrawing(c: Ctx, drawing: El, st: RStyle, out: Inline[]) {
  const holder = kid(drawing, "inline") || kid(drawing, "anchor");
  if (!holder) return;
  const ext = kid(holder, "extent");
  const w = numAt(ext, "cx", 0) / EMU;
  const h = numAt(ext, "cy", 0) / EMU;
  const blip = holder.getElementsByTagNameNS("*", "blip")[0];
  if (!blip) {
    const gd = holder.getElementsByTagNameNS("*", "graphicData")[0];
    const uri = at(gd, "uri") || "";
    warn(c, /chart/.test(uri) ? "chart" : /diagram/.test(uri) ? "smartart" : "shape");
    return;
  }
  if (w <= 0 || h <= 0) return;
  const rel = c.rels.get(relId(blip, "embed"));
  const path = rel && !rel.external ? rel.target : null;
  if (path) c.model.imagePaths.push(path);
  const sr = holder.getElementsByTagNameNS("*", "srcRect")[0];
  const xf = holder.getElementsByTagNameNS("*", "xfrm")[0];
  out.push({
    k: "img",
    path,
    w,
    h,
    crop: { l: numAt(sr, "l", 0) / 100000, t: numAt(sr, "t", 0) / 100000, r: numAt(sr, "r", 0) / 100000, b: numAt(sr, "b", 0) / 100000 },
    rot: ((numAt(xf, "rot", 0) / 60000) * Math.PI) / 180,
    anchor: parseAnchor(holder),
    st,
  });
}

function cssSize(style: string, name: string): number | null {
  const m = new RegExp("(?:^|;)\\s*" + name + "\\s*:\\s*([\\d.]+)\\s*(pt|px|in|cm|mm)?").exec(style);
  if (!m) return null;
  const v = parseFloat(m[1]);
  const u = m[2] || "px";
  return u === "pt" ? v * (96 / 72) : u === "in" ? v * 96 : u === "cm" ? (v * 96) / 2.54 : u === "mm" ? (v * 96) / 25.4 : v;
}

function parseVml(c: Ctx, pict: El, st: RStyle, out: Inline[]) {
  const img = pict.getElementsByTagNameNS("*", "imagedata")[0];
  if (!img) {
    warn(c, "shape");
    return;
  }
  const rel = c.rels.get(relId(img, "id"));
  const path = rel && !rel.external ? rel.target : null;
  const shape = img.parentElement;
  const style = at(shape, "style") || "";
  const w = cssSize(style, "width");
  const h = cssSize(style, "height");
  if (!path || !w || !h) return;
  c.model.imagePaths.push(path);
  out.push({ k: "img", path, w, h, crop: { l: 0, t: 0, r: 0, b: 0 }, rot: 0, anchor: null, st });
}

function runText(el: El): string {
  return el.textContent || "";
}

function parseRun(c: Ctx, r: El, base: RawR, hyperlink: boolean, out: Inline[]) {
  const direct = readR(kid(r, "rPr"));
  let raw = base;
  if (direct.rStyle) raw = mergeR(raw, c.ss.character(direct.rStyle));
  raw = mergeR(raw, direct);
  if (hyperlink && !direct.rStyle && !direct.color) raw = mergeR(raw, { color: { val: "0563C1" }, u: "single" });
  const st = resolveR(raw, c.theme);

  kids(r).forEach((n) => {
    switch (n.localName) {
      case "fldChar": {
        const t = wa(n, "fldCharType");
        if (t === "begin") c.fields.push({ instr: "", sep: false, kind: null });
        else if (t === "separate") {
          const top = c.fields[c.fields.length - 1];
          if (top) {
            top.sep = true;
            top.kind = fieldKind(top.instr);
            if (top.kind) out.push({ k: "fld", kind: top.kind, text: "1", st });
          }
        } else if (t === "end") c.fields.pop();
        return;
      }
      case "instrText": {
        const top = c.fields[c.fields.length - 1];
        if (top && !top.sep) top.instr += runText(n);
        return;
      }
    }
    if (st.vanish || hidden(c)) return;
    switch (n.localName) {
      case "t": {
        const text = runText(n);
        if (text) out.push({ k: "t", text, st });
        break;
      }
      case "tab":
      case "ptab":
        out.push({ k: "tab", st });
        break;
      case "br": {
        const t = wa(n, "type");
        out.push({ k: "br", type: t === "page" ? "page" : t === "column" ? "column" : "line", st });
        break;
      }
      case "cr":
        out.push({ k: "br", type: "line", st });
        break;
      case "noBreakHyphen":
        out.push({ k: "t", text: "‑", st });
        break;
      case "sym": {
        const code = parseInt(wa(n, "char") || "0", 16);
        if (code) out.push({ k: "t", text: String.fromCharCode(code >= 0xf000 ? code - 0xf000 : code), st });
        break;
      }
      case "drawing":
        parseDrawing(c, n, st, out);
        break;
      case "pict":
        parseVml(c, n, st, out);
        break;
      case "footnoteReference":
      case "endnoteReference": {
        c.footnotes++;
        warn(c, "footnote");
        out.push({ k: "t", text: String(c.footnotes), st: { ...st, vert: "super" } });
        break;
      }
      case "object":
        warn(c, "object");
        break;
      case "AlternateContent": {
        const pick = kid(n, "Choice") || kid(n, "Fallback");
        kids(pick).forEach((x) => {
          if (x.localName === "drawing") parseDrawing(c, x, st, out);
          else if (x.localName === "pict") parseVml(c, x, st, out);
        });
        break;
      }
    }
  });
}

function walkInlines(c: Ctx, parent: El, base: RawR, hyperlink: boolean, out: Inline[]) {
  kids(parent).forEach((n) => {
    switch (n.localName) {
      case "r":
        parseRun(c, n, base, hyperlink, out);
        break;
      case "hyperlink":
        walkInlines(c, n, base, true, out);
        break;
      case "fldSimple": {
        const kind = fieldKind(wa(n, "instr") || "");
        if (kind) {
          const r0 = kid(n, "r");
          const direct = readR(kid(r0, "rPr"));
          out.push({ k: "fld", kind, text: "1", st: resolveR(mergeR(base, direct), c.theme) });
        } else walkInlines(c, n, base, hyperlink, out);
        break;
      }
      case "ins":
      case "smartTag":
      case "moveTo":
      case "customXml":
        walkInlines(c, n, base, hyperlink, out);
        break;
      case "sdt":
        walkInlines(c, kid(n, "sdtContent") || n, base, hyperlink, out);
        break;
    }
  });
}

// ---------------------------------------------------------------------------------------------
// Blocks
// ---------------------------------------------------------------------------------------------

function parseSectPr(c: Ctx, el: El): SectProps {
  const pgSz = kid(el, "pgSz");
  const pgMar = kid(el, "pgMar");
  const tw = (e: El | null, n: string, d: number) => {
    const v = wa(e, n);
    return (v !== null && v !== "" && !isNaN(parseFloat(v)) ? parseFloat(v) : d) * TW;
  };
  const headers: SectProps["headers"] = {};
  const footers: SectProps["footers"] = {};
  kids(el, "headerReference").forEach((h) => {
    const t = (wa(h, "type") || "default") as "default" | "first" | "even";
    headers[t] = relId(h, "id");
  });
  kids(el, "footerReference").forEach((h) => {
    const t = (wa(h, "type") || "default") as "default" | "first" | "even";
    footers[t] = relId(h, "id");
  });
  let titlePg = false;
  const tp = kid(el, "titlePg");
  if (tp) titlePg = wa(tp, "val") !== "0" && wa(tp, "val") !== "false";
  return {
    pageW: tw(pgSz, "w", 12240),
    pageH: tw(pgSz, "h", 15840),
    mT: tw(pgMar, "top", 1440),
    mR: tw(pgMar, "right", 1440),
    mB: tw(pgMar, "bottom", 1440),
    mL: tw(pgMar, "left", 1440) + tw(pgMar, "gutter", 0),
    hdrDist: tw(pgMar, "header", 720),
    ftrDist: tw(pgMar, "footer", 720),
    titlePg,
    headers,
    footers,
    cols: parseInt(wa(kid(el, "cols"), "num") || "1", 10) || 1,
    type: wa(kid(el, "type"), "val") || "nextPage",
  };
}

function parsePara(c: Ctx, pEl: El, layer: Layer | null): Para {
  const direct = readP(kid(pEl, "pPr"));
  const st = c.ss.paragraph(direct.pStyle || null);
  let p: RawP = mergeP(c.ss.defaultP, layer ? layer.p : {});
  p = mergeP(p, st.p);
  const numId = direct.numId !== undefined ? direct.numId : st.p.numId;
  const ilvl = direct.ilvl !== undefined ? direct.ilvl : st.p.ilvl || 0;
  let numInfo: ReturnType<Numbering["next"]> = null;
  if (numId && numId !== "0") {
    numInfo = c.num.next(numId, ilvl);
    if (numInfo) p = mergeP(p, numInfo.def.p);
  }
  p = mergeP(p, direct);

  let baseR = mergeR(c.ss.defaultR, layer ? layer.r : {});
  baseR = mergeR(baseR, st.r);

  const inlines: Inline[] = [];
  walkInlines(c, pEl, baseR, false, inlines);

  const markR = mergeR(baseR, direct.rpr || {});
  let num: NumLabel | null = null;
  if (numInfo && inlines.some((i) => i.k !== "br" || true)) {
    let nr = mergeR(baseR, numInfo.def.r);
    if (numInfo.bullet) nr = { ...nr, fonts: undefined };
    nr = mergeR(nr, direct.rpr ? { ...direct.rpr, fonts: undefined } : {});
    // list text without any visible content has no label
    num = { text: numInfo.text, st: resolveR(nr, c.theme), suffix: numInfo.def.suff };
  }

  const sectEl = kid(kid(pEl, "pPr"), "sectPr");
  return {
    k: "p",
    ps: resolveP(p),
    inlines,
    num,
    endSt: resolveR(markR, c.theme),
    styleId: direct.pStyle || c.ss.defaultParaId,
    sect: sectEl ? parseSectPr(c, sectEl) : null,
  };
}

interface TblFlags {
  firstRow: boolean;
  lastRow: boolean;
  firstCol: boolean;
  lastCol: boolean;
  bandH: boolean;
  bandV: boolean;
}

function tblFlags(look: El | null): TblFlags {
  const val = wa(look, "val");
  const flag = (name: string, bit: number, def: boolean) => {
    const a = wa(look, name);
    if (a !== null) return a === "1" || a === "true";
    if (val) return (parseInt(val, 16) & bit) !== 0;
    return def;
  };
  const noH = flag("noHBand", 0x200, false);
  const noV = flag("noVBand", 0x400, false);
  return {
    firstRow: flag("firstRow", 0x20, true),
    lastRow: flag("lastRow", 0x40, false),
    firstCol: flag("firstColumn", 0x80, true),
    lastCol: flag("lastColumn", 0x100, false),
    bandH: !noH,
    bandV: !noV,
  };
}

function cellStyleLayers(ts: ReturnType<StyleSheet["table"]>, f: TblFlags, r: number, col: number, nR: number, nC: number, colEnd: number): TblPart[] {
  const out: TblPart[] = [ts.whole];
  const first = f.firstRow ? 1 : 0;
  if (f.bandH && r >= first && !(f.lastRow && r === nR - 1)) {
    const part = ts.cond[(r - first) % 2 === 0 ? "band1Horz" : "band2Horz"];
    if (part) out.push(part);
  }
  if (f.bandV) {
    const fc = f.firstCol ? 1 : 0;
    if (col >= fc && !(f.lastCol && colEnd === nC - 1)) {
      const part = ts.cond[(col - fc) % 2 === 0 ? "band1Vert" : "band2Vert"];
      if (part) out.push(part);
    }
  }
  if (f.firstCol && col === 0 && ts.cond.firstCol) out.push(ts.cond.firstCol);
  if (f.lastCol && colEnd === nC - 1 && ts.cond.lastCol) out.push(ts.cond.lastCol);
  if (f.lastRow && r === nR - 1 && ts.cond.lastRow) out.push(ts.cond.lastRow);
  if (f.firstRow && r === 0 && ts.cond.firstRow) out.push(ts.cond.firstRow);
  return out;
}

function parseTable(c: Ctx, tbl: El): Table {
  const tblPr = kid(tbl, "tblPr");
  const ts = c.ss.table(wa(kid(tblPr, "tblStyle"), "val"));
  const flags = tblFlags(kid(tblPr, "tblLook"));

  let grid = kids(kid(tbl, "tblGrid"), "gridCol").map((g) => parseFloat(wa(g, "w") || "0") * TW);
  const trs = kids(tbl, "tr");
  const nR = trs.length;
  if (!grid.length) {
    const n = Math.max.apply(null, trs.map((t) => kids(t, "tc").length).concat([1]));
    grid = [];
    for (let i = 0; i < n; i++) grid.push(100);
  }
  const nC = grid.length;

  // table-level borders and margins: style, then direct
  const direct = readBorders(kid(tblPr, "tblBorders"));
  const sb = ts.whole.borders || {};
  const pick = (n: string): Border | null => (direct[n] !== undefined ? direct[n] : sb[n] !== undefined ? sb[n] : null);
  const borders: TableBorders = { top: pick("top"), right: pick("right"), bottom: pick("bottom"), left: pick("left"), insideH: pick("insideH"), insideV: pick("insideV") };
  const mar = { t: 0, r: 108 * TW, b: 0, l: 108 * TW };
  const sm = ts.whole.mar || {};
  if (sm.t !== undefined) mar.t = sm.t;
  if (sm.r !== undefined) mar.r = sm.r;
  if (sm.b !== undefined) mar.b = sm.b;
  if (sm.l !== undefined) mar.l = sm.l;
  const cm = kid(tblPr, "tblCellMar");
  if (cm) {
    const g = (n: string, alt: string) => {
      const e = kid(cm, n) || kid(cm, alt);
      return e ? parseFloat(wa(e, "w") || "0") * TW : null;
    };
    const t = g("top", "top"), r = g("right", "end"), b = g("bottom", "bottom"), l = g("left", "start");
    if (t !== null) mar.t = t;
    if (r !== null) mar.r = r;
    if (b !== null) mar.b = b;
    if (l !== null) mar.l = l;
  }

  const rows: Row[] = [];
  trs.forEach((tr, ri) => {
    const trPr = kid(tr, "trPr");
    const hEl = kid(trPr, "trHeight");
    const hv = wa(hEl, "val");
    const cells: Cell[] = [];
    let col = 0;
    kids(tr, "tc").forEach((tc) => {
      const tcPr = kid(tc, "tcPr");
      const span = Math.max(1, parseInt(wa(kid(tcPr, "gridSpan"), "val") || "1", 10));
      const colEnd = Math.min(nC - 1, col + span - 1);
      const layers = cellStyleLayers(ts, flags, ri, col, nR, nC, colEnd);
      let merged: TblPart = { p: {}, r: {} };
      let shd: string | null | undefined;
      const pb: Record<string, Border | null> = {};
      layers.forEach((l) => {
        merged = { p: mergeP(merged.p, l.p), r: mergeR(merged.r, l.r) };
        if (l.shd !== undefined) shd = l.shd;
        if (l.borders) Object.keys(l.borders).forEach((k) => (pb[k] = (l.borders as Record<string, Border | null>)[k]));
      });
      // edge borders: table borders, then style parts, then direct cell borders
      const lastRow = ri === nR - 1;
      const edge = (side: "top" | "bottom" | "left" | "right"): Border | null => {
        const interior = side === "top" ? ri > 0 : side === "bottom" ? !lastRow : side === "left" ? col > 0 : colEnd < nC - 1;
        const horiz = side === "top" || side === "bottom";
        let b: Border | null = interior ? (horiz ? borders.insideH : borders.insideV) : borders[side];
        const insKey = horiz ? "insideH" : "insideV";
        if (interior && pb[insKey] !== undefined) b = pb[insKey];
        if (!interior && pb[side] !== undefined) b = pb[side];
        // conditional rows/cols specify their own outer edge, which can also be interior to the table
        if (interior && pb[side] !== undefined && layers.length > 1) b = pb[side];
        return b;
      };
      const cb: Partial<Borders> = { top: edge("top"), bottom: edge("bottom"), left: edge("left"), right: edge("right") };
      const direct2 = readBorders(kid(tcPr, "tcBorders"));
      ["top", "bottom", "left", "right"].forEach((k) => {
        if (direct2[k] !== undefined) (cb as Record<string, Border | null>)[k] = direct2[k];
      });
      const shdEl = kid(tcPr, "shd");
      if (shdEl) {
        const f = wa(shdEl, "fill");
        shd = !f || f === "auto" ? null : f;
      }
      const vm = kid(tcPr, "vMerge");
      const vmerge: Cell["vmerge"] = vm ? (wa(vm, "val") === "restart" ? "restart" : "continue") : null;
      const tm = kid(tcPr, "tcMar");
      const cmar = (n: string, alt: string) => {
        const e = kid(tm, n) || kid(tm, alt);
        return e ? parseFloat(wa(e, "w") || "0") * TW : null;
      };
      let widthPx = 0;
      for (let k = col; k <= colEnd; k++) widthPx += grid[k] || 0;
      cells.push({
        blocks: parseBlocks(c, tc, { p: merged.p, r: merged.r }),
        span,
        vmerge,
        shade: shadeCss(shd || null),
        borders: cb,
        mar: { t: cmar("top", "top"), r: cmar("right", "end"), b: cmar("bottom", "bottom"), l: cmar("left", "start") },
        valign: wa(kid(tcPr, "vAlign"), "val") || "top",
        widthPx,
      });
      col += span;
    });
    rows.push({
      cells,
      height: hv ? parseFloat(hv) * TW : 0,
      hRule: wa(hEl, "hRule") || (hv ? "atLeast" : "auto"),
      header: !!kid(trPr, "tblHeader"),
      cantSplit: !!kid(trPr, "cantSplit"),
    });
  });

  const tw = kid(tblPr, "tblW");
  const widthPx = wa(tw, "type") === "dxa" ? parseFloat(wa(tw, "w") || "0") * TW : null;
  return {
    k: "tbl",
    rows,
    grid,
    indent: parseFloat(wa(kid(tblPr, "tblInd"), "w") || "0") * TW,
    borders,
    mar,
    jc: wa(kid(tblPr, "jc"), "val") || "left",
    widthPx,
  };
}

function parseBlocks(c: Ctx, parent: El, layer: Layer | null): Block[] {
  const out: Block[] = [];
  kids(parent).forEach((n) => {
    switch (n.localName) {
      case "p":
        out.push(parsePara(c, n, layer));
        break;
      case "tbl":
        out.push(parseTable(c, n));
        break;
      case "sdt": {
        const content = kid(n, "sdtContent");
        if (content) out.push.apply(out, parseBlocks(c, content, layer));
        break;
      }
      case "AlternateContent": {
        const pick = kid(n, "Fallback") || kid(n, "Choice");
        if (pick) out.push.apply(out, parseBlocks(c, pick, layer));
        break;
      }
    }
  });
  return out;
}

// ---------------------------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------------------------

export async function loadDocx(buf: ArrayBuffer): Promise<{ model: DocModel; pkg: Pkg }> {
  const JSZip = (await import("jszip")).default;
  let zip: any;
  try {
    zip = await JSZip.loadAsync(buf);
  } catch {
    throw new Error("This file could not be opened. Make sure it is a valid .docx file (not an old .doc).");
  }
  const pkg = new Pkg(zip);
  const docRoot = await pkg.xml("word/document.xml");
  const body = kid(docRoot, "body");
  if (!docRoot || !body) throw new Error("This does not look like a Word (.docx) file.");

  const themeRoot = await pkg.xml("word/theme/theme1.xml");
  const theme = themeRoot ? parseTheme(themeRoot) : emptyTheme();
  const settings = await pkg.xml("word/settings.xml");
  const dt = wa(kid(settings, "defaultTabStop"), "val");
  const model: DocModel = {
    sections: [],
    parts: new Map(),
    evenOdd: !!kid(settings, "evenAndOddHeaders"),
    defaultTab: (dt ? parseFloat(dt) : 720) * TW,
    imagePaths: [],
    warnings: {},
  };
  const c: Ctx = {
    pkg,
    ss: new StyleSheet(await pkg.xml("word/styles.xml")),
    num: new Numbering(await pkg.xml("word/numbering.xml")),
    theme,
    model,
    rels: await pkg.rels("word/document.xml"),
    fields: [],
    footnotes: 0,
  };
  const docRels = c.rels;

  // body -> sections
  let current: Block[] = [];
  const sections: Array<{ props: SectProps; blocks: Block[] }> = [];
  const children = kids(body);
  // parse in document order and cut sections at paragraphs that carry a section break
  children.forEach((n) => {
    if (n.localName === "sectPr") return;
    const blocks = parseOne(c, n);
    blocks.forEach((b) => {
      current.push(b);
      if (b.k === "p" && b.sect) {
        sections.push({ props: b.sect, blocks: current });
        current = [];
      }
    });
  });
  const finalSect = kid(body, "sectPr");
  const lastProps = finalSect ? parseSectPr(c, finalSect) : parseSectPr(c, body);
  sections.push({ props: lastProps, blocks: current });

  // header/footer inheritance
  for (let i = 1; i < sections.length; i++) {
    const prev = sections[i - 1].props, cur = sections[i].props;
    (["default", "first", "even"] as const).forEach((k) => {
      if (!cur.headers[k] && prev.headers[k]) cur.headers[k] = prev.headers[k];
      if (!cur.footers[k] && prev.footers[k]) cur.footers[k] = prev.footers[k];
    });
  }
  model.sections = sections;

  // header / footer parts
  const ids: Record<string, boolean> = {};
  sections.forEach((s) => {
    (["default", "first", "even"] as const).forEach((k) => {
      const h = s.props.headers[k], f = s.props.footers[k];
      if (h) ids[h] = true;
      if (f) ids[f] = true;
    });
  });
  for (const rid of Object.keys(ids)) {
    const rel = docRels.get(rid);
    if (!rel || rel.external) continue;
    const root = await pkg.xml(rel.target);
    if (!root) continue;
    c.rels = await pkg.rels(rel.target);
    c.fields = [];
    model.parts.set(rid, parseBlocks(c, root, null));
  }
  return { model, pkg };
}

function parseOne(c: Ctx, n: El): Block[] {
  switch (n.localName) {
    case "p":
      return [parsePara(c, n, null)];
    case "tbl":
      return [parseTable(c, n)];
    case "sdt": {
      const content = kid(n, "sdtContent");
      return content ? parseBlocks(c, content, null) : [];
    }
    case "AlternateContent": {
      const pick = kid(n, "Fallback") || kid(n, "Choice");
      return pick ? parseBlocks(c, pick, null) : [];
    }
  }
  return [];
}
