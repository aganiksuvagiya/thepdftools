// Turns the text items of a PDF page into spreadsheet rows: lines are grouped by their baseline,
// cells are split at wide gaps and aligned to shared column ranges within each table block.

export interface TextItemLite {
  str: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Cell {
  text: string;
  x0: number;
  x1: number;
  h: number;
}

function toLines(items: TextItemLite[]): Cell[][] {
  const sorted = items
    .filter((i) => i.str.trim().length > 0)
    .sort((a, b) => (Math.abs(b.y - a.y) > 0.01 ? b.y - a.y : a.x - b.x));
  const lines: TextItemLite[][] = [];
  sorted.forEach((it) => {
    const line = lines[lines.length - 1];
    if (line) {
      const ref = line[0];
      const tol = Math.max(2, Math.min(ref.h, it.h || ref.h) * 0.5);
      if (Math.abs(ref.y - it.y) <= tol) {
        line.push(it);
        return;
      }
    }
    lines.push([it]);
  });

  return lines.map((line) => {
    line.sort((a, b) => a.x - b.x);
    const cells: Cell[] = [];
    line.forEach((it) => {
      const h = it.h || 10;
      const cur = cells[cells.length - 1];
      const x1 = it.x + it.w;
      if (cur) {
        const gap = it.x - cur.x1;
        if (gap > Math.max(5, h * 0.9)) {
          cells.push({ text: it.str.trim(), x0: it.x, x1, h });
        } else {
          cur.text += (gap > h * 0.12 && !/\s$/.test(cur.text) && !/^\s/.test(it.str) ? " " : "") + it.str;
          cur.x1 = Math.max(cur.x1, x1);
        }
      } else cells.push({ text: it.str.trim(), x0: it.x, x1, h });
    });
    cells.forEach((c) => (c.text = c.text.replace(/\s+/g, " ").trim()));
    return cells.filter((c) => c.text.length > 0);
  });
}

function columnsOf(lines: Cell[][]): Array<{ x0: number; x1: number }> {
  const spans: Array<{ x0: number; x1: number }> = [];
  lines.forEach((l) => l.forEach((c) => spans.push({ x0: c.x0, x1: c.x1 })));
  spans.sort((a, b) => a.x0 - b.x0);
  const cols: Array<{ x0: number; x1: number }> = [];
  spans.forEach((s) => {
    const last = cols[cols.length - 1];
    if (last && s.x0 <= last.x1 + 1) last.x1 = Math.max(last.x1, s.x1);
    else cols.push({ x0: s.x0, x1: s.x1 });
  });
  return cols;
}

export function pageToRows(items: TextItemLite[]): string[][] {
  const lines = toLines(items).filter((l) => l.length > 0);
  const rows: string[][] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].length < 2) {
      rows.push([lines[i][0].text]);
      i++;
      continue;
    }
    // a block of consecutive multi-cell lines shares one set of columns
    let j = i;
    while (j < lines.length && lines[j].length >= 2) j++;
    const block = lines.slice(i, j);
    const cols = columnsOf(block);
    block.forEach((line) => {
      const row: string[] = new Array(cols.length).fill("");
      line.forEach((c) => {
        const cx = (c.x0 + c.x1) / 2;
        let idx = cols.findIndex((k) => cx >= k.x0 - 0.5 && cx <= k.x1 + 0.5);
        if (idx < 0) {
          let best = 0;
          let bd = Infinity;
          cols.forEach((k, n) => {
            const d = Math.min(Math.abs(cx - k.x0), Math.abs(cx - k.x1));
            if (d < bd) {
              bd = d;
              best = n;
            }
          });
          idx = best;
        }
        row[idx] = row[idx] ? row[idx] + " " + c.text : c.text;
      });
      rows.push(row);
    });
    i = j;
  }
  return rows;
}

export interface TypedCell {
  v: string | number;
  z?: string;
}

const NUM_RE = /^\(?-?[$€£₹¥]?\s?(?:\d{1,3}(?:,\d{3})+|\d{1,2}(?:,\d{2})*,\d{3}|\d+)(?:\.\d+)?\)?%?$/;

/** Converts number-like text ("1,250.50", "$9.99", "12%", "(300)") to a numeric cell; everything else stays text. */
export function toTypedCell(text: string): TypedCell {
  const t = text.trim();
  if (!t || !NUM_RE.test(t)) return { v: text };
  const negative = /^\(.*\)$/.test(t) || /^-/.test(t.replace(/^\(/, ""));
  const percent = /%$/.test(t);
  const currency = /[$€£₹¥]/.exec(t);
  const digits = t.replace(/[()$€£₹¥%\s-]/g, "").replace(/,/g, "");
  const intPart = digits.split(".")[0];
  // keep codes such as 007, ZIP codes and very long identifiers as text
  if ((intPart.length > 1 && intPart[0] === "0") || intPart.length > 15) return { v: text };
  if (!/,/.test(t) && !currency && !percent && intPart.length >= 10) return { v: text };
  let n = parseFloat(digits);
  if (isNaN(n)) return { v: text };
  if (negative) n = -n;
  const decimals = digits.indexOf(".") >= 0 ? digits.split(".")[1].length : 0;
  const grouped = /,/.test(t);
  const dec = decimals > 0 ? "." + new Array(decimals + 1).join("0") : "";
  if (percent) return { v: n / 100, z: "0" + dec + "%" };
  const base = (grouped ? "#,##0" : "0") + dec;
  if (currency) return { v: n, z: `"${currency[0]}"${base}` };
  return decimals > 0 || grouped ? { v: n, z: base } : { v: n };
}
