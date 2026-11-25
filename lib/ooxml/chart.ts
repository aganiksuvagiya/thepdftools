// Simple chart renderer for PPTX charts (bar/column, line, area, pie, doughnut) from the chart XML data cache.
import { El, kid, kids, dig, at, numAt, boolAt } from "@/lib/ooxml/xml";
import { RGBA, StyleCtx, colorOf, rgba, findFillEl } from "@/lib/ooxml/theme";
import { fontStack } from "./fonts";

const PT = 96 / 72;

interface Series {
  name: string;
  cats: string[];
  vals: Array<number | null>;
  color: RGBA | null;
  lineW: number | null;
  marker: boolean | null;
  ptColors: Record<number, RGBA>;
  showVal: boolean;
  showPct: boolean;
  showCat: boolean;
  fmt: string | null;
}

interface Group {
  kind: "bar" | "line" | "area" | "pie" | "doughnut";
  horiz: boolean;
  grouping: string; // clustered | stacked | percentStacked | standard
  gap: number;
  overlap: number;
  hole: number;
  firstAngle: number;
  markerDefault: boolean;
  series: Series[];
}

const SUPPORTED: Record<string, Group["kind"]> = {
  barChart: "bar", bar3DChart: "bar", lineChart: "line", line3DChart: "line", areaChart: "area", area3DChart: "area",
  pieChart: "pie", pie3DChart: "pie", doughnutChart: "doughnut",
};

function points(cache: El | null): string[] {
  if (!cache) return [];
  const count = numAt(kid(cache, "ptCount"), "val", 0);
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push("");
  kids(cache, "pt").forEach((pt) => {
    const idx = numAt(pt, "idx", 0);
    while (out.length <= idx) out.push("");
    out[idx] = kid(pt, "v")?.textContent || "";
  });
  return out;
}

function cacheOf(container: El | null): El | null {
  if (!container) return null;
  const ml = dig(container, "multiLvlStrRef", "multiLvlStrCache");
  if (ml) return kids(ml, "lvl")[0] || null;
  return (
    dig(container, "strRef", "strCache") ||
    dig(container, "numRef", "numCache") ||
    kid(container, "strLit") ||
    kid(container, "numLit")
  );
}

function fmtCode(container: El | null): string | null {
  const nc = dig(container, "numRef", "numCache") || kid(container, "numLit");
  return kid(nc, "formatCode")?.textContent || null;
}

export function formatNumber(v: number, code: string | null): string {
  const c = code || "General";
  const pct = c.indexOf("%") >= 0;
  const dm = /\.(0+)/.exec(c);
  let decimals = dm ? dm[1].length : -1;
  let x = pct ? v * 100 : v;
  let s: string;
  if (decimals >= 0) s = x.toFixed(decimals);
  else if (Math.abs(x - Math.round(x)) < 1e-9) s = String(Math.round(x));
  else s = String(parseFloat(x.toFixed(2)));
  if (c.indexOf(",") >= 0 || /#,##0/.test(c)) {
    const parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    s = parts.join(".");
  }
  if (pct) s += "%";
  const cur = /[$€£¥]/.exec(c);
  if (cur) s = cur[0] + s;
  return s;
}

function readSeries(ser: El, sc: StyleCtx, accent: (i: number) => RGBA, idx: number, groupDl: El | null): Series {
  const name = points(cacheOf(kid(ser, "tx"))).join("") || "Series " + (idx + 1);
  const cats = points(cacheOf(kid(ser, "cat")));
  const valEl = kid(ser, "val") || kid(ser, "yVal");
  const vals = points(cacheOf(valEl)).map((s) => (s === "" || isNaN(parseFloat(s)) ? null : parseFloat(s)));
  const spPr = kid(ser, "spPr");
  const fill = findFillEl(spPr);
  let color: RGBA | null = fill && fill.localName === "solidFill" ? colorOf(fill, sc) : null;
  const ln = kid(spPr, "ln");
  const lnFill = findFillEl(ln);
  const lineColor = lnFill && lnFill.localName === "solidFill" ? colorOf(lnFill, sc) : null;
  if (!color && lineColor) color = lineColor;
  if (!color) color = accent(idx);
  const ptColors: Record<number, RGBA> = {};
  kids(ser, "dPt").forEach((dp) => {
    const f = findFillEl(kid(dp, "spPr"));
    const c = f && f.localName === "solidFill" ? colorOf(f, sc) : null;
    if (c) ptColors[numAt(kid(dp, "idx"), "val", 0)] = c;
  });
  let dl = kid(ser, "dLbls") || groupDl;
  if (dl && boolAt(kid(dl, "delete"), "val", false)) dl = null;
  const marker = kid(ser, "marker");
  const sym = at(kid(marker, "symbol"), "val");
  return {
    name,
    cats,
    vals,
    color: lineColor && !fill ? lineColor : color,
    lineW: ln && at(ln, "w") ? numAt(ln, "w", 28575) / 9525 : null,
    marker: sym ? sym !== "none" : null,
    ptColors,
    showVal: !!dl && boolAt(kid(dl, "showVal"), "val", false),
    showPct: !!dl && boolAt(kid(dl, "showPercent"), "val", false),
    showCat: !!dl && boolAt(kid(dl, "showCatName"), "val", false),
    fmt: (dl && at(kid(dl, "numFmt"), "formatCode")) || fmtCode(kid(ser, "val")),
  };
}

function niceScale(minV: number, maxV: number, eMin: number | null, eMax: number | null) {
  let lo = eMin !== null ? eMin : Math.min(0, minV);
  let hi = eMax !== null ? eMax : Math.max(0, maxV);
  if (hi <= lo) hi = lo + 1;
  const raw = (hi - lo) / 5;
  const mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  if (eMin === null) lo = Math.floor(lo / step + 1e-9) * step;
  if (eMax === null) hi = Math.ceil(hi / step - 1e-9) * step;
  return { lo, hi, step };
}

function title(chart: El | null): string {
  const t = kid(chart, "title");
  if (!t) return "";
  return kids(dig(t, "tx", "rich"), "p")
    .map((p) => kids(p, "r").map((r) => kid(r, "t")?.textContent || "").join(""))
    .join(" ")
    .trim();
}

function textSize(el: El | null, def: number): number {
  const rpr = el ? el.getElementsByTagNameNS("*", "defRPr")[0] || el.getElementsByTagNameNS("*", "rPr")[0] : null;
  const sz = rpr ? at(rpr, "sz") : null;
  return (sz ? parseInt(sz, 10) / 100 : def) * PT;
}

function lum(c: RGBA): number {
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

/** Draws the chart in a w x h box at the current origin. Returns false when the chart type is not supported. */
export function drawChart(g: CanvasRenderingContext2D, chartSpace: El, w: number, h: number, sc: StyleCtx): boolean {
  const chart = kid(chartSpace, "chart");
  const plot = kid(chart, "plotArea");
  if (!plot) return false;

  const accent = (i: number): RGBA => {
    const hex = sc.theme.colors["accent" + ((i % 6) + 1)] || "4472C4";
    const n = parseInt(hex, 16);
    const f = i >= 6 ? 0.7 : 1;
    return { r: Math.round(((n >> 16) & 255) * f), g: Math.round(((n >> 8) & 255) * f), b: Math.round((n & 255) * f), a: 1 };
  };

  const groups: Group[] = [];
  let unsupported = false;
  let serIdx = 0;
  kids(plot).forEach((el) => {
    const nm = el.localName;
    if (/Chart$/.test(nm) && !SUPPORTED[nm]) {
      unsupported = true;
      return;
    }
    const kind = SUPPORTED[nm];
    if (!kind) return;
    const grouping = at(kid(el, "grouping"), "val") || (kind === "bar" ? "clustered" : "standard");
    const groupDl = kid(el, "dLbls");
    const series = kids(el, "ser").map((s) => readSeries(s, sc, accent, serIdx++, groupDl));
    groups.push({
      kind,
      horiz: kind === "bar" && at(kid(el, "barDir"), "val") === "bar",
      grouping,
      gap: numAt(kid(el, "gapWidth"), "val", 150),
      overlap: numAt(kid(el, "overlap"), "val", grouping === "clustered" ? 0 : 100),
      hole: numAt(kid(el, "holeSize"), "val", 50),
      firstAngle: numAt(kid(el, "firstSliceAng"), "val", 0),
      markerDefault: boolAt(kid(el, "marker"), "val", true),
      series,
    });
  });
  if (unsupported || !groups.length) return false;

  // chart background
  const bgFill = findFillEl(kid(chartSpace, "spPr"));
  if (bgFill && bgFill.localName === "solidFill") {
    const c = colorOf(bgFill, sc);
    if (c) {
      g.fillStyle = rgba(c);
      g.fillRect(0, 0, w, h);
    }
  }

  const baseSize = textSize(kid(chartSpace, "txPr"), 10);
  const fs = Math.max(8, baseSize);
  const stack = fontStack(undefined, sc.theme);
  const txt = "rgb(64,64,64)";
  const font = (size: number, bold = false) => `${bold ? "bold " : ""}${size.toFixed(1)}px ${stack}`;
  g.textBaseline = "alphabetic";

  let top = 6, bottom = h - 6, left = 6, right = w - 6;

  // title
  const ttl = title(chart);
  if (ttl) {
    const ts = textSize(kid(chart, "title"), 18);
    g.font = font(ts, false);
    g.fillStyle = txt;
    g.textAlign = "center";
    g.fillText(ttl, w / 2, top + ts);
    top += ts * 1.8;
  }

  const first = groups[0];
  const isPie = first.kind === "pie" || first.kind === "doughnut";

  // legend
  const legend = kid(chart, "legend");
  if (legend) {
    const pos = at(kid(legend, "legendPos"), "val") || "r";
    const items: Array<{ label: string; color: RGBA }> = [];
    if (isPie || (first.series.length === 1 && Object.keys(first.series[0].ptColors).length > 0)) {
      const s = first.series[0];
      s.vals.forEach((_, i) => items.push({ label: s.cats[i] || String(i + 1), color: s.ptColors[i] || accent(i) }));
    } else {
      groups.forEach((gr) => gr.series.forEach((s) => items.push({ label: s.name, color: s.color || accent(0) })));
    }
    g.font = font(fs);
    g.textAlign = "left";
    const box = fs * 0.8;
    const widths = items.map((it) => g.measureText(it.label).width + box + fs * 1.4);
    if (pos === "r" || pos === "l" || pos === "tr") {
      const lw = Math.max.apply(null, widths.concat([0])) + 4;
      const x0 = pos === "l" ? left : right - lw;
      const y0 = (top + bottom) / 2 - (items.length * fs * 1.6) / 2;
      items.forEach((it, i) => {
        const y = y0 + i * fs * 1.6;
        g.fillStyle = rgba(it.color);
        g.fillRect(x0, y, box, box);
        g.fillStyle = txt;
        g.fillText(it.label, x0 + box + fs * 0.5, y + box * 0.95);
      });
      if (pos === "l") left += lw + 6;
      else right -= lw + 6;
    } else {
      const total = widths.reduce((a, b) => a + b, 0);
      let x = (w - Math.min(total, w - 12)) / 2;
      const y = pos === "t" ? top : bottom - fs * 1.3;
      items.forEach((it, i) => {
        g.fillStyle = rgba(it.color);
        g.fillRect(x, y, box, box);
        g.fillStyle = txt;
        g.fillText(it.label, x + box + fs * 0.5, y + box * 0.95);
        x += widths[i];
      });
      if (pos === "t") top += fs * 1.9;
      else bottom -= fs * 1.9;
    }
  }

  // ---- pie / doughnut
  if (isPie) {
    const s = first.series[0];
    if (!s) return true;
    const vals = s.vals.map((v) => (v && v > 0 ? v : 0));
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    const cx = (left + right) / 2, cy = (top + bottom) / 2;
    const r = Math.max(10, Math.min(right - left, bottom - top) / 2 - 6);
    let ang = -Math.PI / 2 + (first.firstAngle * Math.PI) / 180;
    vals.forEach((v, i) => {
      const a1 = ang + (v / total) * Math.PI * 2;
      const color = s.ptColors[i] || accent(i);
      g.beginPath();
      if (first.kind === "doughnut") {
        const ri = (r * first.hole) / 100;
        g.arc(cx, cy, r, ang, a1);
        g.arc(cx, cy, ri, a1, ang, true);
      } else {
        g.moveTo(cx, cy);
        g.arc(cx, cy, r, ang, a1);
      }
      g.closePath();
      g.fillStyle = rgba(color);
      g.fill();
      g.strokeStyle = "#ffffff";
      g.lineWidth = 1.5;
      g.stroke();
      if (v > 0 && (s.showVal || s.showPct || s.showCat)) {
        const mid = (ang + a1) / 2;
        const lr = first.kind === "doughnut" ? r * (1 + first.hole / 100) / 2 : r * 0.65;
        const parts: string[] = [];
        if (s.showCat) parts.push(s.cats[i] || "");
        if (s.showVal) parts.push(formatNumber(v, s.fmt));
        if (s.showPct) parts.push(Math.round((v / total) * 100) + "%");
        g.font = font(fs);
        g.textAlign = "center";
        g.fillStyle = lum(color) < 150 ? "#ffffff" : "#222222";
        g.fillText(parts.join(" "), cx + Math.cos(mid) * lr, cy + Math.sin(mid) * lr + fs * 0.35);
      }
      ang = a1;
    });
    return true;
  }

  // ---- axes based charts
  const cats = first.series.reduce((best, s) => (s.cats.length > best.length ? s.cats : best), [] as string[]);
  const nCats = Math.max(cats.length, first.series.reduce((m, s) => Math.max(m, s.vals.length), 0));
  if (!nCats) return true;
  const horiz = first.horiz;
  const stacked = groups.some((gr) => gr.kind === "bar" && (gr.grouping === "stacked" || gr.grouping === "percentStacked"));
  const percent = groups.some((gr) => gr.kind === "bar" && gr.grouping === "percentStacked");

  // value range
  let vMin = 0, vMax = 0;
  if (percent) {
    vMin = 0;
    vMax = 1;
  } else if (stacked) {
    for (let i = 0; i < nCats; i++) {
      let pos = 0, neg = 0;
      groups.forEach((gr) => {
        if (gr.kind !== "bar") return;
        gr.series.forEach((s) => {
          const v = s.vals[i] || 0;
          if (v >= 0) pos += v;
          else neg += v;
        });
      });
      vMax = Math.max(vMax, pos);
      vMin = Math.min(vMin, neg);
    }
    groups.forEach((gr) => {
      if (gr.kind === "bar") return;
      gr.series.forEach((s) => s.vals.forEach((v) => {
        if (v !== null) { vMax = Math.max(vMax, v); vMin = Math.min(vMin, v); }
      }));
    });
  } else {
    groups.forEach((gr) =>
      gr.series.forEach((s) =>
        s.vals.forEach((v) => {
          if (v !== null) {
            vMax = Math.max(vMax, v);
            vMin = Math.min(vMin, v);
          }
        })
      )
    );
  }
  const valAx = kid(plot, "valAx");
  const catAx = kid(plot, "catAx") || kid(plot, "dateAx");
  const scaling = kid(valAx, "scaling");
  const eMin = scaling && kid(scaling, "min") ? numAt(kid(scaling, "min"), "val", 0) : null;
  const eMax = scaling && kid(scaling, "max") ? numAt(kid(scaling, "max"), "val", 0) : null;
  const ticks = niceScale(vMin, vMax, eMin, eMax);
  const valDeleted = boolAt(kid(valAx, "delete"), "val", false);
  const catDeleted = boolAt(kid(catAx, "delete"), "val", false);
  const valFmt = at(kid(valAx, "numFmt"), "formatCode") || (percent ? "0%" : first.series[0]?.fmt || null);
  const tickVals: number[] = [];
  for (let v = ticks.lo; v <= ticks.hi + ticks.step * 1e-6; v += ticks.step) tickVals.push(Math.abs(v) < ticks.step * 1e-9 ? 0 : v);

  g.font = font(fs);
  const valLabels = tickVals.map((v) => formatNumber(v, valFmt));
  const valLabelW = valDeleted ? 0 : Math.max.apply(null, valLabels.map((s) => g.measureText(s).width).concat([0])) + 8;
  const catLabelW = Math.max.apply(null, cats.map((s) => g.measureText(s).width).concat([0])) + 8;

  let px0 = left, px1 = right, py0 = top + fs * 0.6, py1 = bottom;
  if (horiz) {
    px0 += catDeleted ? 0 : catLabelW;
    px1 -= valDeleted ? 0 : (valLabelW > 0 ? Math.max.apply(null, valLabels.map((t) => g.measureText(t).width)) / 2 : 0);
    py1 -= valDeleted ? 0 : fs * 1.8;
  } else {
    px0 += valLabelW;
    py1 -= catDeleted ? 0 : fs * 1.8;
  }
  const pw = Math.max(20, px1 - px0), ph = Math.max(20, py1 - py0);

  const valToPos = (v: number) => (horiz ? px0 + ((v - ticks.lo) / (ticks.hi - ticks.lo)) * pw : py1 - ((v - ticks.lo) / (ticks.hi - ticks.lo)) * ph);
  const catLen = horiz ? ph : pw;
  const band = catLen / nCats;

  // gridlines + value labels
  const grid = !!kid(valAx, "majorGridlines");
  g.lineWidth = 1;
  tickVals.forEach((v, i) => {
    const p = valToPos(v);
    if (grid) {
      g.strokeStyle = "rgb(217,217,217)";
      g.beginPath();
      if (horiz) { g.moveTo(p, py0); g.lineTo(p, py1); } else { g.moveTo(px0, p); g.lineTo(px1, p); }
      g.stroke();
    }
    if (!valDeleted) {
      g.fillStyle = txt;
      g.font = font(fs);
      if (horiz) { g.textAlign = "center"; g.fillText(valLabels[i], p, py1 + fs * 1.4); }
      else { g.textAlign = "right"; g.fillText(valLabels[i], px0 - 6, p + fs * 0.35); }
    }
  });

  // category labels
  if (!catDeleted) {
    g.fillStyle = txt;
    g.font = font(fs);
    const maxW = horiz ? catLabelW : band - 4;
    for (let i = 0; i < nCats; i++) {
      let label = cats[i] || "";
      if (!horiz) {
        while (label.length > 1 && g.measureText(label).width > maxW + 2) label = label.slice(0, -1);
      }
      if (horiz) {
        g.textAlign = "right";
        g.fillText(label, px0 - 6, py1 - (i + 0.5) * band + fs * 0.35);
      } else {
        g.textAlign = "center";
        g.fillText(label, px0 + (i + 0.5) * band, py1 + fs * 1.4);
      }
    }
  }

  // baseline
  const zero = valToPos(Math.max(ticks.lo, Math.min(0, ticks.hi)));
  g.strokeStyle = "rgb(166,166,166)";
  g.beginPath();
  if (horiz) { g.moveTo(zero, py0); g.lineTo(zero, py1); } else { g.moveTo(px0, zero); g.lineTo(px1, zero); }
  g.stroke();

  const catCenter = (i: number) => (horiz ? py1 - (i + 0.5) * band : px0 + (i + 0.5) * band);
  const label = (text: string, x: number, y: number, align: CanvasTextAlign) => {
    g.font = font(fs);
    g.fillStyle = txt;
    g.textAlign = align;
    g.fillText(text, x, y);
  };

  // draw groups in order
  const barGroups = groups.filter((gr) => gr.kind === "bar");
  const totalBarSeries = barGroups.reduce((n, gr) => n + gr.series.length, 0);
  let barSeriesSeen = 0;
  groups.forEach((gr) => {
    if (gr.kind === "bar") {
      const clustered = !(gr.grouping === "stacked" || gr.grouping === "percentStacked");
      const m = clustered ? totalBarSeries : 1;
      const ov = clustered ? gr.overlap / 100 : 0;
      const units = m - (m - 1) * ov + gr.gap / 100;
      const bw = band / units;
      const start = (gr.gap / 200) * bw;
      const posAcc: number[] = [];
      const negAcc: number[] = [];
      gr.series.forEach((s, si) => {
        const slot = clustered ? barSeriesSeen + si : 0;
        for (let i = 0; i < nCats; i++) {
          let v = s.vals[i];
          if (v === null || v === undefined) continue;
          let v0 = 0, v1 = v;
          if (!clustered) {
            if (percent) {
              let tot = 0;
              gr.series.forEach((o) => (tot += Math.abs(o.vals[i] || 0)));
              v = tot ? v / tot : 0;
            }
            if (v >= 0) { v0 = posAcc[i] || 0; v1 = v0 + v; posAcc[i] = v1; }
            else { v0 = negAcc[i] || 0; v1 = v0 + v; negAcc[i] = v1; }
          }
          const color = s.ptColors[i] || s.color || accent(si);
          const off = start + slot * bw * (1 - ov);
          const a = valToPos(v0), b = valToPos(v1);
          g.fillStyle = rgba(color);
          let rx: number, ry: number, rw: number, rh: number;
          if (horiz) {
            rx = Math.min(a, b); rw = Math.abs(b - a);
            ry = py1 - i * band - off - bw; rh = bw;
          } else {
            rx = px0 + i * band + off; rw = bw;
            ry = Math.min(a, b); rh = Math.abs(b - a);
          }
          g.fillRect(rx, ry, rw, rh);
          if (s.showVal) {
            const t = formatNumber(v, percent ? "0%" : s.fmt);
            if (horiz) label(t, v >= 0 ? rx + rw + 4 : rx - 4, ry + rh / 2 + fs * 0.35, v >= 0 ? "left" : "right");
            else if (clustered) label(t, rx + rw / 2, v >= 0 ? ry - 4 : ry + rh + fs, "center");
            else {
              g.fillStyle = lum(color) < 150 ? "#ffffff" : "#222222";
              g.font = font(fs);
              g.textAlign = "center";
              g.fillText(t, rx + rw / 2, ry + rh / 2 + fs * 0.35);
            }
          }
        }
      });
      barSeriesSeen += gr.series.length;
    } else if (gr.kind === "line" || gr.kind === "area") {
      gr.series.forEach((s, si) => {
        const color = s.color || accent(si);
        const pts: Array<[number, number] | null> = [];
        for (let i = 0; i < nCats; i++) {
          const v = s.vals[i];
          if (v === null || v === undefined) {
            pts.push(null);
            continue;
          }
          const c = catCenter(i);
          pts.push(horiz ? [valToPos(v), c] : [c, valToPos(v)]);
        }
        if (gr.kind === "area") {
          const real = pts.filter((p): p is [number, number] => !!p);
          if (real.length > 1) {
            g.beginPath();
            g.moveTo(real[0][0], zero);
            real.forEach((p) => g.lineTo(p[0], p[1]));
            g.lineTo(real[real.length - 1][0], zero);
            g.closePath();
            g.fillStyle = rgba(color, 0.7);
            g.fill();
          }
        } else {
          g.strokeStyle = rgba(color);
          g.lineWidth = s.lineW || 3;
          g.lineJoin = "round";
          g.beginPath();
          let pen = false;
          pts.forEach((p) => {
            if (!p) { pen = false; return; }
            if (!pen) { g.moveTo(p[0], p[1]); pen = true; } else g.lineTo(p[0], p[1]);
          });
          g.stroke();
          const showMarker = s.marker !== null ? s.marker : gr.markerDefault;
          if (showMarker) {
            g.fillStyle = rgba(color);
            pts.forEach((p) => {
              if (!p) return;
              g.beginPath();
              g.arc(p[0], p[1], 3.5, 0, Math.PI * 2);
              g.fill();
            });
          }
        }
        if (s.showVal) {
          pts.forEach((p, i) => {
            if (p && s.vals[i] !== null) label(formatNumber(s.vals[i] as number, s.fmt), p[0], p[1] - 8, "center");
          });
        }
      });
    }
  });
  return true;
}
