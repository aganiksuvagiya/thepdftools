// Finds a phrase in a page's text, including phrases that the PDF stores in several pieces or that
// wrap onto the next line, and returns the rectangles that cover each hit.

export type TextSpan = {
  text: string;
  x: number;
  /** top of the text */
  y: number;
  width: number;
  height: number;
  baseline: number;
  /** the PDF has a space after this piece */
  spaceAfter?: boolean;
  /** CSS font shorthand (size + family) used to measure where a match sits inside the span. */
  font?: string;
};

export type Box = { x: number; y: number; width: number; height: number };

export type TextHit = { text: string; boxes: Box[] };

/** width of `text` when drawn with the CSS font; 0 when it cannot be measured */
export type Measure = (font: string | undefined, text: string) => number;

const CJK = /[぀-ヿ㐀-䶿一-鿿가-힯豈-﫿＀-￯]/;
// A long address or code can continue on the next line right after one of these.
const JOINERS = "@./_\\:-‐‑";
const HYPHENS = "-­‐‑";

type Ref = { span: number; index: number } | null;

/** lower case without changing the length, so positions still match the original text */
function fold(ch: string): string {
  if (/\s/.test(ch)) return " ";
  const lower = ch.toLowerCase();
  return lower.length === 1 ? lower : ch;
}

// All text of the page as one string. "\n" marks a line break and refs[i] says where character i came from.
function joinSpans(spans: TextSpan[]): { text: string; refs: Ref[] } {
  const chars: string[] = [];
  const refs: Ref[] = [];
  spans.forEach((span, s) => {
    const prev = spans[s - 1];
    if (prev) {
      const size = Math.min(prev.height, span.height);
      const gap = span.x - (prev.x + prev.width);
      if (Math.abs(span.baseline - prev.baseline) > size * 0.5) {
        chars.push("\n");
        refs.push(null);
      } else if (prev.spaceAfter || gap > size * 0.15 || gap < -size) {
        chars.push(" ");
        refs.push(null);
      }
    }
    for (let i = 0; i < span.text.length; i++) {
      chars.push(span.text[i] === "\n" ? " " : fold(span.text[i]));
      refs.push({ span: s, index: i });
    }
  });
  return { text: chars.join(""), refs };
}

// Returns where the match that starts at `from` ends (exclusive), or -1.
function matchAt(text: string, from: number, needle: string): number {
  let i = from;
  let k = 0;
  while (k < needle.length) {
    const ch = text[i];
    if (needle[k] === " ") {
      if (ch !== " " && ch !== "\n") return -1;
      while (text[i] === " " || text[i] === "\n") i++;
      k++;
    } else if (ch === needle[k]) {
      i++;
      k++;
    } else if (k > 0 && ch !== undefined && HYPHENS.indexOf(ch) >= 0 && text[i + 1] === "\n") {
      i += 2; // "confiden-" / "tial"
    } else if (ch === "­") {
      i++;
    } else if (
      ch === "\n" &&
      k > 0 &&
      (JOINERS.indexOf(text[i - 1]) >= 0 ||
        JOINERS.indexOf(text[i + 1]) >= 0 ||
        (CJK.test(text[i - 1]) && CJK.test(text[i + 1] || "")))
    ) {
      i++;
    } else {
      return -1;
    }
  }
  return i;
}

// The rectangle that covers characters [from, to) of one span.
function boxFor(span: TextSpan, from: number, to: number, measure: Measure): Box {
  const total = measure(span.font, span.text);
  const spaceCount = span.text.split(" ").length - 1;
  const extra = span.width - total;
  // x offset (inside the span) of the boundary after `upTo` characters. Justified text stretches the
  // spaces, so when the span is clearly wider than its measured glyphs the extra width is shared
  // between the spaces instead of spread over every letter.
  const boundary = (upTo: number): number => {
    if (total <= 0) return (span.width / Math.max(span.text.length, 1)) * upTo;
    const head = span.text.slice(0, upTo);
    const w = measure(span.font, head);
    if (spaceCount > 0 && extra > total * 0.02) {
      return w + extra * ((head.split(" ").length - 1) / spaceCount);
    }
    return (w / total) * span.width;
  };
  const start = boundary(from);
  const end = boundary(to);
  // A little padding on every side so antialiased glyph edges are covered too.
  const padX = 3;
  return {
    x: Math.max(0, span.x + start - padX),
    y: span.y - 1,
    width: Math.max(end - start + padX * 2, 12),
    height: Math.max(span.height, 12) + 2,
  };
}

export function findInSpans(spans: TextSpan[], query: string, measure: Measure): TextHit[] {
  const needle = Array.from(query.trim().replace(/\s+/g, " ")).map((c) => (c.length === 1 ? fold(c) : c)).join("");
  if (!needle) return [];
  const { text, refs } = joinSpans(spans);
  const hits: TextHit[] = [];

  let from = 0;
  while (from < text.length) {
    const end = matchAt(text, from, needle);
    if (end < 0) {
      from++;
      continue;
    }
    // the first and last matched character of every span the hit runs through
    const parts: { span: number; first: number; last: number }[] = [];
    let shown = "";
    for (let i = from; i < end; i++) {
      const ref = refs[i];
      if (!ref) {
        shown += " ";
        continue;
      }
      shown += spans[ref.span].text[ref.index];
      const part = parts[parts.length - 1];
      if (part && part.span === ref.span) part.last = ref.index;
      else parts.push({ span: ref.span, first: ref.index, last: ref.index });
    }

    // Pieces on the same line become one box, so the gaps between them are covered too.
    const boxes: Box[] = [];
    let lineBaseline = NaN;
    parts.forEach((part) => {
      const span = spans[part.span];
      const box = boxFor(span, part.first, part.last + 1, measure);
      const prev = boxes[boxes.length - 1];
      if (prev && Math.abs(span.baseline - lineBaseline) <= span.height * 0.5 && box.x >= prev.x) {
        const right = Math.max(prev.x + prev.width, box.x + box.width);
        const bottom = Math.max(prev.y + prev.height, box.y + box.height);
        prev.y = Math.min(prev.y, box.y);
        prev.width = right - prev.x;
        prev.height = bottom - prev.y;
      } else {
        boxes.push(box);
        lineBaseline = span.baseline;
      }
    });
    if (boxes.length) hits.push({ text: shown, boxes });
    from = end;
  }
  return hits;
}
