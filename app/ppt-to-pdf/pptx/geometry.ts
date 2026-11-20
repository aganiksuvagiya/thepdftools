// Preset and custom shape geometry for PPTX rendering (local box coordinates 0..w, 0..h).
import { El, kid, kids, at, numAt } from "./xml";

export interface GeomPart {
  path: Path2D;
  fill: boolean;
  stroke: boolean;
}

export interface Geom {
  parts: GeomPart[];
  open: boolean; // pure line / connector (no fill)
  // Line end data for arrowheads (open shapes)
  start?: { x: number; y: number; dx: number; dy: number };
  end?: { x: number; y: number; dx: number; dy: number };
}

class Builder {
  path = new Path2D();
  pts: Array<[number, number]> = [];
  private cx = 0;
  private cy = 0;
  private sx = 0;
  private sy = 0;

  private rec(x: number, y: number) {
    this.pts.push([x, y]);
    this.cx = x;
    this.cy = y;
  }
  cur() {
    return { x: this.cx, y: this.cy };
  }
  M(x: number, y: number) {
    this.path.moveTo(x, y);
    this.sx = x;
    this.sy = y;
    this.rec(x, y);
    return this;
  }
  L(x: number, y: number) {
    this.path.lineTo(x, y);
    this.rec(x, y);
    return this;
  }
  C(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
    this.path.bezierCurveTo(x1, y1, x2, y2, x, y);
    this.rec(x1, y1);
    this.rec(x2, y2);
    this.rec(x, y);
    return this;
  }
  Q(x1: number, y1: number, x: number, y: number) {
    this.path.quadraticCurveTo(x1, y1, x, y);
    this.rec(x1, y1);
    this.rec(x, y);
    return this;
  }
  Z() {
    this.path.closePath();
    this.cx = this.sx;
    this.cy = this.sy;
    return this;
  }
  poly(points: Array<[number, number]>) {
    points.forEach((p, i) => (i === 0 ? this.M(p[0], p[1]) : this.L(p[0], p[1])));
    return this.Z();
  }
  ellipse(cx: number, cy: number, rx: number, ry: number, a0 = 0, a1 = Math.PI * 2, ccw = false) {
    this.path.ellipse(cx, cy, Math.max(0.01, rx), Math.max(0.01, ry), 0, a0, a1, ccw);
    this.rec(cx + rx * Math.cos(a0), cy + ry * Math.sin(a0));
    this.rec(cx + rx * Math.cos(a1), cy + ry * Math.sin(a1));
    return this;
  }
  arcTo(wR: number, hR: number, stAng: number, swAng: number) {
    const st = (stAng / 60000) * (Math.PI / 180);
    const sw = (swAng / 60000) * (Math.PI / 180);
    const t1 = Math.atan2(wR * Math.sin(st), hR * Math.cos(st));
    const endV = st + sw;
    const t2 = Math.atan2(wR * Math.sin(endV), hR * Math.cos(endV));
    let dt = t2 - t1;
    if (sw > 0) while (dt < 0) dt += Math.PI * 2;
    else while (dt > 0) dt -= Math.PI * 2;
    if (Math.abs(sw) >= Math.PI * 2 - 1e-6) dt = sw > 0 ? Math.PI * 2 : -Math.PI * 2;
    const cx = this.cx - wR * Math.cos(t1);
    const cy = this.cy - hR * Math.sin(t1);
    this.path.ellipse(cx, cy, Math.max(0.01, wR), Math.max(0.01, hR), 0, t1, t1 + dt, sw < 0);
    this.rec(cx + wR * Math.cos(t1 + dt), cy + hR * Math.sin(t1 + dt));
    return this;
  }
}

function norm(dx: number, dy: number) {
  const l = Math.hypot(dx, dy) || 1;
  return { dx: dx / l, dy: dy / l };
}

function finish(b: Builder, open = false): Geom {
  const g: Geom = { parts: [{ path: b.path, fill: !open, stroke: true }], open };
  if (open && b.pts.length >= 2) {
    const p = b.pts;
    let i = 1;
    while (i < p.length - 1 && Math.hypot(p[i][0] - p[0][0], p[i][1] - p[0][1]) < 0.001) i++;
    g.start = { x: p[0][0], y: p[0][1], ...norm(p[0][0] - p[i][0], p[0][1] - p[i][1]) };
    let j = p.length - 2;
    const last = p[p.length - 1];
    while (j > 0 && Math.hypot(p[j][0] - last[0], p[j][1] - last[1]) < 0.001) j--;
    g.end = { x: last[0], y: last[1], ...norm(last[0] - p[j][0], last[1] - p[j][1]) };
  }
  return g;
}

function roundedRect(b: Builder, w: number, h: number, tl: number, tr: number, br: number, bl: number) {
  const m = Math.min(w, h) / 2;
  tl = Math.min(tl, m); tr = Math.min(tr, m); br = Math.min(br, m); bl = Math.min(bl, m);
  b.M(tl, 0).L(w - tr, 0);
  if (tr) b.path.arcTo(w, 0, w, tr, tr);
  b.L(w, h - br);
  if (br) b.path.arcTo(w, h, w - br, h, br);
  b.L(bl, h);
  if (bl) b.path.arcTo(0, h, 0, h - bl, bl);
  b.L(0, tl);
  if (tl) b.path.arcTo(0, 0, tl, 0, tl);
  b.Z();
}

function star(b: Builder, w: number, h: number, n: number, ratio: number) {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n * 2; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / n;
    const r = i % 2 === 0 ? 1 : ratio;
    pts.push([Math.cos(ang) * r, Math.sin(ang) * r]);
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  pts.forEach((p) => {
    minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
    minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
  });
  b.poly(pts.map((p) => [((p[0] - minX) / (maxX - minX)) * w, ((p[1] - minY) / (maxY - minY)) * h] as [number, number]));
}

export function presetGeom(prst: string, w: number, h: number, av: Record<string, number>): Geom {
  const b = new Builder();
  const ss = Math.min(w, h);
  const a = (name: string, def: number) => (av[name] !== undefined ? av[name] : def);

  switch (prst) {
    case "line":
    case "straightConnector1":
      b.M(0, 0).L(w, h);
      return finish(b, true);
    case "bentConnector2":
      b.M(0, 0).L(w, 0).L(w, h);
      return finish(b, true);
    case "bentConnector3":
    case "bentConnector4":
    case "bentConnector5": {
      const x1 = (w * a("adj1", 50000)) / 100000;
      b.M(0, 0).L(x1, 0).L(x1, h).L(w, h);
      return finish(b, true);
    }
    case "curvedConnector2":
      b.M(0, 0).Q(w, 0, w, h);
      return finish(b, true);
    case "curvedConnector3":
    case "curvedConnector4":
    case "curvedConnector5": {
      const x1 = (w * a("adj1", 50000)) / 100000;
      b.M(0, 0).C(x1, 0, x1, h, w, h);
      return finish(b, true);
    }
    case "arc": {
      const st = (a("adj1", 16200000) / 60000) * (Math.PI / 180);
      const en = (a("adj2", 0) / 60000) * (Math.PI / 180);
      let e = en;
      if (e <= st) e += Math.PI * 2;
      b.ellipse(w / 2, h / 2, w / 2, h / 2, st, e);
      const g = finish(b, true);
      return g;
    }
    case "pie":
    case "chord": {
      const st = (a("adj1", 0) / 60000) * (Math.PI / 180);
      const en = (a("adj2", 16200000) / 60000) * (Math.PI / 180);
      let e = en;
      if (e <= st) e += Math.PI * 2;
      if (prst === "pie") b.M(w / 2, h / 2);
      b.ellipse(w / 2, h / 2, w / 2, h / 2, st, e);
      b.Z();
      return finish(b);
    }
    case "ellipse":
    case "flowChartConnector":
    case "flowChartOr":
    case "flowChartSummingJunction":
    case "cloud":
    case "cloudCallout":
      b.ellipse(w / 2, h / 2, w / 2, h / 2);
      return finish(b);
    case "donut": {
      const dr = (ss * a("adj", 25000)) / 100000;
      b.ellipse(w / 2, h / 2, w / 2, h / 2);
      b.path.moveTo(w - dr, h / 2);
      b.path.ellipse(w / 2, h / 2, Math.max(0.01, w / 2 - dr), Math.max(0.01, h / 2 - dr), 0, 0, Math.PI * 2, true);
      const g = finish(b);
      (g.parts[0] as any).evenodd = true;
      return g;
    }
    case "roundRect":
    case "flowChartAlternateProcess": {
      const r = (ss * a("adj", 16667)) / 100000;
      roundedRect(b, w, h, r, r, r, r);
      return finish(b);
    }
    case "flowChartTerminator":
      roundedRect(b, w, h, h / 2, h / 2, h / 2, h / 2);
      return finish(b);
    case "round1Rect": {
      const r = (ss * a("adj", 16667)) / 100000;
      roundedRect(b, w, h, 0, r, 0, 0);
      return finish(b);
    }
    case "round2SameRect": {
      const r1 = (ss * a("adj1", 16667)) / 100000, r2 = (ss * a("adj2", 0)) / 100000;
      roundedRect(b, w, h, r1, r1, r2, r2);
      return finish(b);
    }
    case "round2DiagRect": {
      const r1 = (ss * a("adj1", 16667)) / 100000, r2 = (ss * a("adj2", 0)) / 100000;
      roundedRect(b, w, h, r1, r2, r1, r2);
      return finish(b);
    }
    case "snip1Rect": {
      const s = (ss * a("adj", 16667)) / 100000;
      b.poly([[0, 0], [w - s, 0], [w, s], [w, h], [0, h]]);
      return finish(b);
    }
    case "snip2SameRect": {
      const s1 = (ss * a("adj1", 16667)) / 100000, s2 = (ss * a("adj2", 0)) / 100000;
      b.poly([[s1, 0], [w - s1, 0], [w, s1], [w, h - s2], [w - s2, h], [s2, h], [0, h - s2], [0, s1]]);
      return finish(b);
    }
    case "snip2DiagRect": {
      const s1 = (ss * a("adj1", 0)) / 100000, s2 = (ss * a("adj2", 16667)) / 100000;
      b.poly([[s1, 0], [w - s2, 0], [w, s2], [w, h - s1], [w - s1, h], [s2, h], [0, h - s2], [0, s1]]);
      return finish(b);
    }
    case "triangle": {
      const x = (w * a("adj", 50000)) / 100000;
      b.poly([[x, 0], [w, h], [0, h]]);
      return finish(b);
    }
    case "rtTriangle":
      b.poly([[0, 0], [w, h], [0, h]]);
      return finish(b);
    case "diamond":
    case "flowChartDecision":
      b.poly([[w / 2, 0], [w, h / 2], [w / 2, h], [0, h / 2]]);
      return finish(b);
    case "parallelogram":
    case "flowChartInputOutput": {
      const dx = prst === "parallelogram" ? Math.min(w, (ss * a("adj", 25000)) / 100000) : w * 0.2;
      b.poly([[dx, 0], [w, 0], [w - dx, h], [0, h]]);
      return finish(b);
    }
    case "trapezoid": {
      const dx = Math.min(w / 2, (ss * a("adj", 25000)) / 100000);
      b.poly([[dx, 0], [w - dx, 0], [w, h], [0, h]]);
      return finish(b);
    }
    case "flowChartManualOperation":
      b.poly([[0, 0], [w, 0], [w * 0.8, h], [w * 0.2, h]]);
      return finish(b);
    case "homePlate": {
      const dx = Math.min(w, (ss * a("adj", 50000)) / 100000);
      b.poly([[0, 0], [w - dx, 0], [w, h / 2], [w - dx, h], [0, h]]);
      return finish(b);
    }
    case "chevron": {
      const dx = Math.min(w, (ss * a("adj", 50000)) / 100000);
      b.poly([[0, 0], [w - dx, 0], [w, h / 2], [w - dx, h], [0, h], [dx, h / 2]]);
      return finish(b);
    }
    case "hexagon":
    case "flowChartPreparation": {
      const dx = Math.min(w / 2, (ss * (prst === "hexagon" ? a("adj", 25000) : 20000)) / 100000);
      b.poly([[0, h / 2], [dx, 0], [w - dx, 0], [w, h / 2], [w - dx, h], [dx, h]]);
      return finish(b);
    }
    case "pentagon": {
      b.poly([[w / 2, 0], [w, h * 0.38], [w * 0.81, h], [w * 0.19, h], [0, h * 0.38]]);
      return finish(b);
    }
    case "octagon": {
      const s = (ss * a("adj", 29289)) / 100000;
      b.poly([[0, s], [s, 0], [w - s, 0], [w, s], [w, h - s], [w - s, h], [s, h], [0, h - s]]);
      return finish(b);
    }
    case "plus":
    case "mathPlus": {
      const s = prst === "plus" ? (ss * a("adj", 25000)) / 100000 : (ss * 0.2);
      b.poly([[s, 0], [w - s, 0], [w - s, s], [w, s], [w, h - s], [w - s, h - s], [w - s, h], [s, h], [s, h - s], [0, h - s], [0, s], [s, s]]);
      return finish(b);
    }
    case "rightArrow":
    case "leftArrow": {
      const th = Math.min(100000, a("adj1", 50000)) / 100000;
      const hd = Math.min(w, (ss * a("adj2", 50000)) / 100000);
      const y1 = (h * (1 - th)) / 2, y2 = h - y1;
      if (prst === "rightArrow") b.poly([[0, y1], [w - hd, y1], [w - hd, 0], [w, h / 2], [w - hd, h], [w - hd, y2], [0, y2]]);
      else b.poly([[w, y1], [hd, y1], [hd, 0], [0, h / 2], [hd, h], [hd, y2], [w, y2]]);
      return finish(b);
    }
    case "upArrow":
    case "downArrow": {
      const th = Math.min(100000, a("adj1", 50000)) / 100000;
      const hd = Math.min(h, (ss * a("adj2", 50000)) / 100000);
      const x1 = (w * (1 - th)) / 2, x2 = w - x1;
      if (prst === "upArrow") b.poly([[x1, h], [x1, hd], [0, hd], [w / 2, 0], [w, hd], [x2, hd], [x2, h]]);
      else b.poly([[x1, 0], [x1, h - hd], [0, h - hd], [w / 2, h], [w, h - hd], [x2, h - hd], [x2, 0]]);
      return finish(b);
    }
    case "leftRightArrow": {
      const th = Math.min(100000, a("adj1", 50000)) / 100000;
      const hd = Math.min(w / 2, (ss * a("adj2", 50000)) / 100000);
      const y1 = (h * (1 - th)) / 2, y2 = h - y1;
      b.poly([[0, h / 2], [hd, 0], [hd, y1], [w - hd, y1], [w - hd, 0], [w, h / 2], [w - hd, h], [w - hd, y2], [hd, y2], [hd, h]]);
      return finish(b);
    }
    case "star4": star(b, w, h, 4, Math.min(1, a("adj", 12500) / 50000)); return finish(b);
    case "star5": star(b, w, h, 5, Math.min(1, a("adj", 19098) / 50000)); return finish(b);
    case "star6": star(b, w, h, 6, Math.min(1, a("adj", 28868) / 50000)); return finish(b);
    case "star7": star(b, w, h, 7, Math.min(1, a("adj", 34601) / 50000)); return finish(b);
    case "star8": star(b, w, h, 8, Math.min(1, a("adj", 37500) / 50000)); return finish(b);
    case "star10": star(b, w, h, 10, Math.min(1, a("adj", 42533) / 50000)); return finish(b);
    case "star12": star(b, w, h, 12, Math.min(1, a("adj", 37500) / 50000)); return finish(b);
    case "star16": star(b, w, h, 16, Math.min(1, a("adj", 37500) / 50000)); return finish(b);
    case "star24": star(b, w, h, 24, Math.min(1, a("adj", 37500) / 50000)); return finish(b);
    case "star32": star(b, w, h, 32, Math.min(1, a("adj", 37500) / 50000)); return finish(b);
    case "heart": {
      b.M(w / 2, h * 0.25)
        .C(w / 2, h * 0.1, w * 0.4, 0, w * 0.25, 0)
        .C(w * 0.08, 0, 0, h * 0.14, 0, h * 0.33)
        .C(0, h * 0.62, w * 0.4, h * 0.78, w / 2, h)
        .C(w * 0.6, h * 0.78, w, h * 0.62, w, h * 0.33)
        .C(w, h * 0.14, w * 0.92, 0, w * 0.75, 0)
        .C(w * 0.6, 0, w / 2, h * 0.1, w / 2, h * 0.25)
        .Z();
      return finish(b);
    }
    case "wedgeRectCallout":
    case "wedgeRoundRectCallout":
    case "wedgeEllipseCallout": {
      const tx = w / 2 + (w * a("adj1", -20833)) / 100000;
      const ty = h / 2 + (h * a("adj2", 62500)) / 100000;
      if (prst === "wedgeEllipseCallout") b.ellipse(w / 2, h / 2, w / 2, h / 2);
      else if (prst === "wedgeRoundRectCallout") {
        const r = (ss * a("adj3", 16667)) / 100000;
        roundedRect(b, w, h, r, r, r, r);
      } else b.poly([[0, 0], [w, 0], [w, h], [0, h]]);
      // tail: small triangle from the nearest edge towards the tip
      const horiz = Math.abs(tx - w / 2) / w > Math.abs(ty - h / 2) / h;
      if (horiz) {
        const ex = tx > w / 2 ? w : 0;
        b.poly([[ex, h * 0.35], [tx, ty], [ex, h * 0.55]]);
      } else {
        const ey = ty > h / 2 ? h : 0;
        b.poly([[w * 0.35, ey], [tx, ty], [w * 0.55, ey]]);
      }
      return finish(b);
    }
    case "flowChartDocument":
    case "flowChartMultidocument": {
      b.M(0, 0).L(w, 0).L(w, h * 0.85).C(w * 0.75, h * 0.7, w * 0.6, h * 1.0, w * 0.5, h * 0.9).C(w * 0.35, h * 0.78, w * 0.15, h * 1.0, 0, h * 0.9).Z();
      return finish(b);
    }
    default: // rect and everything unknown
      b.poly([[0, 0], [w, 0], [w, h], [0, h]]);
      return finish(b);
  }
}

/** a:custGeom -> path parts scaled to the w x h box. */
export function customGeom(cust: El, w: number, h: number): Geom {
  const parts: GeomPart[] = [];
  let allOpen = true;
  const firstB: { b: Builder | null } = { b: null };
  kids(kid(cust, "pathLst"), "path").forEach((p) => {
    const pw = numAt(p, "w", 0) || w;
    const ph = numAt(p, "h", 0) || h;
    const sx = w / pw, sy = h / ph;
    const b = new Builder();
    let closed = false;
    const pt = (el: El | null) => ({ x: numAt(el, "x", 0) * sx, y: numAt(el, "y", 0) * sy });
    kids(p).forEach((cmd) => {
      const pts = kids(cmd, "pt");
      switch (cmd.localName) {
        case "moveTo": { const q = pt(pts[0]); b.M(q.x, q.y); break; }
        case "lnTo": { const q = pt(pts[0]); b.L(q.x, q.y); break; }
        case "cubicBezTo": {
          if (pts.length >= 3) {
            const a1 = pt(pts[0]), a2 = pt(pts[1]), a3 = pt(pts[2]);
            b.C(a1.x, a1.y, a2.x, a2.y, a3.x, a3.y);
          }
          break;
        }
        case "quadBezTo": {
          if (pts.length >= 2) {
            const a1 = pt(pts[0]), a2 = pt(pts[1]);
            b.Q(a1.x, a1.y, a2.x, a2.y);
          }
          break;
        }
        case "arcTo":
          b.arcTo(numAt(cmd, "wR", 0) * sx, numAt(cmd, "hR", 0) * sy, numAt(cmd, "stAng", 0), numAt(cmd, "swAng", 0));
          break;
        case "close":
          b.Z();
          closed = true;
          break;
      }
    });
    const fillAttr = at(p, "fill");
    const strokeAttr = at(p, "stroke");
    const fill = fillAttr !== "none";
    const stroke = strokeAttr !== "0" && strokeAttr !== "false";
    if (closed) allOpen = false;
    if (fill && !closed && fillAttr === null) allOpen = false;
    parts.push({ path: b.path, fill, stroke });
    if (!firstB.b) firstB.b = b;
  });
  const g: Geom = { parts, open: false };
  if (parts.length === 1 && allOpen && firstB.b) {
    const f = finish(firstB.b, true);
    f.parts[0].fill = false;
    return f;
  }
  return g;
}
