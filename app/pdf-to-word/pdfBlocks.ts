// Rebuilds readable structure (paragraphs, headings, lists, tables) from the positioned text of a PDF page.

export interface RawItem {
  str: string;
  x: number;
  y: number; // baseline, PDF units (up = larger)
  w: number;
  size: number;
  bold: boolean;
  italic: boolean;
  font: string;
}

export interface RunOut {
  text: string;
  bold: boolean;
  italic: boolean;
  size: number;
  font: string;
}

export interface CellOut {
  runs: RunOut[];
  align: "left" | "right" | "center";
}

export type Block =
  | { k: "p"; runs: RunOut[]; style: "Normal" | "Heading1" | "Heading2" | "Heading3"; align: "left" | "center" | "right"; left: number; hanging: number; firstLine: number; before: number }
  | { k: "table"; rows: CellOut[][]; colW: number[]; headerBold: boolean };

interface Seg {
  text: string;
  x0: number;
  x1: number;
  runs: RunOut[];
}

interface Line {
  y: number;
  x0: number;
  x1: number;
  size: number;
  bold: boolean;
  segs: Seg[];
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

function mergeRuns(runs: RunOut[]): RunOut[] {
  const out: RunOut[] = [];
  runs.forEach((r) => {
    const last = out[out.length - 1];
    if (last && last.bold === r.bold && last.italic === r.italic && Math.abs(last.size - r.size) < 0.6 && last.font === r.font) last.text += r.text;
    else out.push({ ...r });
  });
  return out;
}

export function bodyFontSize(pages: RawItem[][]): number {
  const counts = new Map<number, number>();
  pages.forEach((items) =>
    items.forEach((it) => {
      const k = Math.round(it.size * 2) / 2;
      counts.set(k, (counts.get(k) || 0) + it.str.trim().length);
    })
  );
  let best = 11;
  let bc = -1;
  counts.forEach((c, k) => {
    if (c > bc) {
      bc = c;
      best = k;
    }
  });
  return best;
}

function buildLines(items: RawItem[]): Line[] {
  // pdf.js reports the blank space between words and columns as items of their own; the gaps are measured instead
  const sorted = items.filter((i) => i.str.trim().length > 0 && i.size > 0).sort((a, b) => (Math.abs(b.y - a.y) > 0.01 ? b.y - a.y : a.x - b.x));
  const groups: RawItem[][] = [];
  sorted.forEach((it) => {
    const g = groups[groups.length - 1];
    if (g) {
      const ref = g[0];
      if (Math.abs(ref.y - it.y) <= Math.max(2, Math.min(ref.size, it.size) * 0.4)) {
        g.push(it);
        return;
      }
    }
    groups.push([it]);
  });

  const lines: Line[] = [];
  groups.forEach((g) => {
    g.sort((a, b) => a.x - b.x);
    const segs: Seg[] = [];
    g.forEach((it) => {
      const size = it.size;
      const run: RunOut = { text: it.str, bold: it.bold, italic: it.italic, size, font: it.font };
      const x1 = it.x + it.w;
      const cur = segs[segs.length - 1];
      if (cur) {
        const gap = it.x - cur.x1;
        if (gap > Math.max(5, size * 0.95)) {
          segs.push({ text: it.str, x0: it.x, x1, runs: [run] });
          return;
        }
        const needSpace = gap > size * 0.14 && !/\s$/.test(cur.text) && !/^\s/.test(it.str);
        if (needSpace) cur.runs.push({ ...run, text: " " });
        cur.runs.push(run);
        cur.text += (needSpace ? " " : "") + it.str;
        cur.x1 = Math.max(cur.x1, x1);
      } else segs.push({ text: it.str, x0: it.x, x1, runs: [run] });
    });
    let cleaned = segs.filter((s) => norm(s.text).length > 0);
    if (!cleaned.length) return;
    if (cleaned.length >= 2 && /^(?:[•●▪◦○■□–—\-*·➢➤✓✔]|\d{1,3}[.)]|[a-zA-Z][.)])$/.test(norm(cleaned[0].text))) {
      const [m, nx, ...rest] = cleaned;
      cleaned = [{ text: m.text + " " + nx.text, x0: m.x0, x1: nx.x1, runs: [...m.runs, { ...nx.runs[0], text: " " }, ...nx.runs] }, ...rest];
    }
    const chars = g.reduce((a, it) => a + it.str.trim().length, 0) || 1;
    const size = g.reduce((a, it) => a + it.size * it.str.trim().length, 0) / chars;
    const boldChars = g.reduce((a, it) => a + (it.bold ? it.str.trim().length : 0), 0);
    lines.push({
      y: g[0].y,
      x0: cleaned[0].x0,
      x1: cleaned[cleaned.length - 1].x1,
      size,
      bold: boldChars / chars > 0.7,
      segs: cleaned,
    });
  });
  return lines;
}

function lineText(l: Line): string {
  return norm(l.segs.map((s) => s.text).join("  "));
}

function lineRuns(l: Line): RunOut[] {
  const runs: RunOut[] = [];
  l.segs.forEach((s, i) => {
    if (i > 0) runs.push({ text: "    ", bold: false, italic: false, size: l.size, font: s.runs[0].font });
    runs.push(...s.runs);
  });
  return mergeRuns(runs);
}

const BULLET_RE = /^\s*([•●▪◦○■□–—\-*·➢➤✓✔])\s+/;
const NUM_RE = /^\s*(\d{1,3}[.)]|[a-zA-Z][.)]|\([a-zA-Z0-9]{1,3}\))\s+/;

const isNumeric = (t: string) => /^\(?-?[$€£₹]?\s?[\d,]+(\.\d+)?\)?%?$/.test(t.trim());

function columnsOf(lines: Line[]): Array<{ x0: number; x1: number }> {
  const spans: Array<{ x0: number; x1: number }> = [];
  lines.forEach((l) => l.segs.forEach((s) => spans.push({ x0: s.x0, x1: s.x1 })));
  spans.sort((a, b) => a.x0 - b.x0);
  const cols: Array<{ x0: number; x1: number }> = [];
  spans.forEach((s) => {
    const last = cols[cols.length - 1];
    if (last && s.x0 <= last.x1 + 1) last.x1 = Math.max(last.x1, s.x1);
    else cols.push({ x0: s.x0, x1: s.x1 });
  });
  return cols;
}

export function pageToBlocks(items: RawItem[], pageW: number, body: number, textWidthTwips: number): Block[] {
  const lines = buildLines(items);
  if (!lines.length) return [];
  const blocks: Block[] = [];

  const nonTable = lines.filter((l) => l.segs.length < 2);
  const minLeft = Math.min(...(nonTable.length ? nonTable : lines).map((l) => l.x0));
  const maxRight = Math.max(...(nonTable.length ? nonTable : lines).map((l) => l.x1));
  const W = Math.max(50, maxRight - minLeft);
  const pageCenter = pageW / 2;

  let open: { runs: RunOut[]; text: string; firstX: number; leftX: number; lastY: number; lastX1: number; size: number; bold: boolean; lines: number; list: boolean; style: "Normal" | "Heading1" | "Heading2" | "Heading3"; align: "left" | "center" | "right"; before: number } | null = null;
  let prevY: number | null = null;

  const flush = () => {
    if (!open) return;
    const toTw = (pt: number) => Math.max(0, Math.round(pt * 20));
    const leftIndent = open.leftX - minLeft;
    blocks.push({
      k: "p",
      runs: mergeRuns(open.runs).map((r) => ({ ...r, text: r.text.replace(/ {2,}/g, " ") })),
      style: open.style,
      align: open.align,
      left: open.list ? Math.max(720, toTw(leftIndent)) : open.align === "left" && leftIndent > 12 ? toTw(leftIndent) : 0,
      hanging: open.list ? 360 : 0,
      firstLine: !open.list && open.align === "left" && open.firstX - open.leftX > 6 ? toTw(open.firstX - open.leftX) : 0,
      before: open.before,
    });
    open = null;
  };

  let i = 0;
  while (i < lines.length) {
    const L = lines[i];
    // ---- table block
    if (L.segs.length >= 2) {
      let j = i;
      const blockLines: Line[] = [];
      while (j < lines.length) {
        const cur = lines[j];
        const prev = blockLines[blockLines.length - 1];
        const gap = prev ? prev.y - cur.y : 0;
        if (prev && gap > prev.size * 2.6) break;
        if (cur.segs.length >= 2) blockLines.push(cur);
        else if (prev && gap <= prev.size * 1.5 && blockLines.length) blockLines.push(cur); // wrapped cell text
        else break;
        j++;
      }
      const multi = blockLines.filter((l) => l.segs.length >= 2);
      const cols = columnsOf(multi);
      if (multi.length >= 2 && cols.length >= 2) {
        flush();
        const rows: CellOut[][] = [];
        blockLines.forEach((l) => {
          const cells: CellOut[] = cols.map(() => ({ runs: [], align: "left" }));
          if (l.segs.length < 2 && rows.length) {
            // continuation of the cell above
            const k = cols.findIndex((c) => l.x0 >= c.x0 - 3 && l.x0 <= c.x1 + 3);
            const above = rows[rows.length - 1][k < 0 ? 0 : k];
            above.runs.push({ text: " ", bold: false, italic: false, size: l.size, font: "Arial" }, ...lineRuns(l));
            return;
          }
          l.segs.forEach((s) => {
            const cx = (s.x0 + s.x1) / 2;
            let k = cols.findIndex((c) => cx >= c.x0 - 0.5 && cx <= c.x1 + 0.5);
            if (k < 0) {
              let bd = Infinity;
              cols.forEach((c, n) => {
                const d = Math.min(Math.abs(cx - c.x0), Math.abs(cx - c.x1));
                if (d < bd) {
                  bd = d;
                  k = n;
                }
              });
            }
            const cell = cells[k];
            if (cell.runs.length) cell.runs.push({ text: " ", bold: false, italic: false, size: l.size, font: s.runs[0].font });
            cell.runs.push(...mergeRuns(s.runs));
          });
          rows.push(cells);
        });
        // right-align columns whose body cells are numbers
        cols.forEach((_, k) => {
          const body = rows.slice(1).map((r) => r[k].runs.map((x) => x.text).join(""));
          const filled = body.filter((t) => t.trim());
          if (filled.length && filled.every(isNumeric)) rows.forEach((r) => (r[k].align = "right"));
        });
        const total = cols[cols.length - 1].x1 - cols[0].x0 || 1;
        const widths = cols.map((c, n) => {
          const next = cols[n + 1];
          return (next ? next.x0 - c.x0 : c.x1 - c.x0 + 8) / (total + 8);
        });
        const sumW = widths.reduce((a, b) => a + b, 0);
        const colW = widths.map((w) => Math.max(500, Math.round((w / sumW) * textWidthTwips)));
        const headerBold = rows[0].every((c) => c.runs.length === 0 || c.runs.every((r) => r.bold));
        blocks.push({ k: "table", rows, colW, headerBold });
        prevY = blockLines[blockLines.length - 1].y;
        i = i + blockLines.length;
        continue;
      }
    }

    // ---- text line
    const text = lineText(L);
    const sizeRatio = L.size / body;
    const bullet = BULLET_RE.exec(text);
    const numbered = !bullet && NUM_RE.exec(text);
    const headingLike = sizeRatio >= 1.12 || (L.bold && text.length <= 90 && sizeRatio >= 0.95 && !/[.,;:]$/.test(text.replace(NUM_RE, "")));
    const isList = !!bullet || (!!numbered && text.length < 400 && !headingLike);
    const gapPrev = prevY === null ? 0 : prevY - L.y;
    const centered = Math.abs((L.x0 + L.x1) / 2 - pageCenter) <= pageW * 0.02 && L.x0 - minLeft > W * 0.06;
    const rightAligned = L.x1 >= maxRight - 3 && L.x0 - minLeft > W * 0.45;
    let style: "Normal" | "Heading1" | "Heading2" | "Heading3" = "Normal";
    if (!isList && text.length <= 140) {
      if (sizeRatio >= 1.75) style = "Heading1";
      else if (sizeRatio >= 1.35) style = "Heading2";
      else if (sizeRatio >= 1.12 || (L.bold && text.length <= 90 && !/[.,;:]$/.test(text) && sizeRatio >= 0.95)) style = "Heading3";
    }

    // continue the open paragraph?
    const o = open;
    let merged = false;
    if (o && !isList && style === "Normal" && !o.list === !isList) {
      const sameSize = Math.abs(o.size - L.size) <= 1;
      const sameWeight = o.bold === L.bold;
      const close = gapPrev > L.size * 0.6 && gapPrev <= L.size * 1.8;
      const wrapped = o.lastX1 >= maxRight - Math.max(6, W * 0.08);
      const aligned = Math.abs(L.x0 - o.leftX) <= Math.max(4, W * 0.03) || (o.lines === 1 && L.x0 <= o.firstX + 4 && L.x0 >= o.firstX - 40);
      if (o.style === "Normal" && sameSize && sameWeight && close && wrapped && aligned && o.align === "left" && !centered) merged = true;
    }
    const o2 = open;
    if (o2 && isList === false && style === "Normal" && o2.list) {
      // continuation of a wrapped list item
      const close = gapPrev > L.size * 0.6 && gapPrev <= L.size * 1.8;
      const wrapped = o2.lastX1 >= maxRight - Math.max(6, W * 0.08);
      if (close && wrapped && L.x0 > o2.leftX + 4 && Math.abs(o2.size - L.size) <= 1) merged = true;
    }

    if (merged && open) {
      const cur = open as NonNullable<typeof open>;
      const runs = lineRuns(L);
      const lastRun = cur.runs[cur.runs.length - 1];
      if (lastRun && /-$/.test(lastRun.text) && /^[a-z]/.test(runs[0].text)) lastRun.text = lastRun.text.replace(/-$/, "");
      else cur.runs.push({ text: " ", bold: L.bold, italic: false, size: L.size, font: runs[0].font });
      cur.runs.push(...runs);
      cur.lastY = L.y;
      cur.lastX1 = L.x1;
      cur.lines++;
    } else {
      flush();
      let runs = lineRuns(L);
      if (isList) {
        const raw = runs.map((r) => r.text).join("");
        const re = bullet ? BULLET_RE : NUM_RE;
        const m = re.exec(raw);
        if (m) {
          let remaining = m[0].length;
          runs = runs
            .map((r) => {
              if (remaining <= 0) return r;
              const cut = Math.min(remaining, r.text.length);
              remaining -= cut;
              return { ...r, text: r.text.slice(cut) };
            })
            .filter((r) => r.text.length > 0);
          const marker = bullet ? "\u2022" : (numbered ? numbered[1] : "");
          runs.unshift({ text: marker + "\t", bold: false, italic: false, size: L.size, font: runs[0] ? runs[0].font : "Arial" });
        }
      }
      open = {
        runs,
        text,
        firstX: L.x0,
        leftX: isList ? L.x0 : L.x0,
        lastY: L.y,
        lastX1: L.x1,
        size: L.size,
        bold: L.bold,
        lines: 1,
        list: isList,
        style,
        align: centered ? "center" : rightAligned && text.length < 60 ? "right" : "left",
        before: gapPrev > L.size * 2 ? Math.min(Math.round((gapPrev - L.size * 1.25) * 20), 720) : 0,
      };
      if (style !== "Normal") flush();
    }
    prevY = L.y;
    i++;
  }
  flush();
  return blocks;
}

/** Plain text lines (OCR output) as paragraph blocks. */
export function textToBlocks(text: string, size = 11): Block[] {
  return text
    .split("\n")
    .map<Block>((line) => ({
      k: "p",
      runs: line.trim() ? [{ text: line.trim(), bold: false, italic: false, size, font: "Arial" }] : [],
      style: "Normal",
      align: "left",
      left: 0,
      hanging: 0,
      firstLine: 0,
      before: 0,
    }));
}
