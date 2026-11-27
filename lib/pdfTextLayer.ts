// Invisible, selectable text for pages whose visible letters are pictures (drawn with the browser's
// fonts, so Gujarati, Hindi, Arabic and the like are shaped correctly). The font used here has no
// visible shapes at all; a "ToUnicode" table tells PDF readers which characters each code stands for,
// which is what copy and search use. OCR programs make scans searchable the same way.
import type { PDFDocument, PDFName, PDFPage } from "pdf-lib";

export interface HiddenText {
  text: string;
  /** start of the baseline, in PDF points */
  x: number;
  y: number;
  /** font size in points */
  size: number;
  /** how wide the visible text is, in points */
  width: number;
  /** anticlockwise rotation in degrees */
  angle?: number;
}

const ADVANCE = 0.5; // every code is half an em wide; the text is then stretched to the real width

// Vowel signs that sit above or below a letter (and invisible joiners) get half that. macOS Preview
// drops the next letter when they get no room at all; at this width every reader keeps the whole text.
// (Firefox ignores their room, so its selection can stop a little short of the end of such a line.)
const MARK_ADVANCE = 0.25;
// (Built at run time because this project's TypeScript target does not accept the literal.)
const NO_ADVANCE = new RegExp("^[\\p{Mn}\\p{Cf}]$", "u");

/** The smallest TrueType font a PDF can carry: two empty glyphs. */
function blankFont(): Uint8Array {
  const bytes = (size: number, fill: (v: DataView) => void) => {
    const out = new Uint8Array(size);
    fill(new DataView(out.buffer));
    return out;
  };
  // sorted by tag, as the format requires
  const tables: [string, Uint8Array][] = [
    ["glyf", new Uint8Array(4)],
    [
      "head",
      bytes(54, (v) => {
        v.setUint32(0, 0x00010000);
        v.setUint32(4, 0x00010000);
        v.setUint32(12, 0x5f0f3cf5);
        v.setUint16(16, 3);
        v.setUint16(18, 1000); // units per em
        v.setInt16(38, -200);
        v.setInt16(40, ADVANCE * 1000);
        v.setInt16(42, 800);
        v.setUint16(46, 8);
        v.setInt16(48, 2);
      }),
    ],
    [
      "hhea",
      bytes(36, (v) => {
        v.setUint32(0, 0x00010000);
        v.setInt16(4, 800);
        v.setInt16(6, -200);
        v.setUint16(10, ADVANCE * 1000);
        v.setInt16(16, ADVANCE * 1000);
        v.setInt16(18, 1);
        v.setUint16(34, 2);
      }),
    ],
    [
      "hmtx",
      bytes(8, (v) => {
        v.setUint16(0, ADVANCE * 1000);
        v.setUint16(4, ADVANCE * 1000);
      }),
    ],
    ["loca", new Uint8Array(6)],
    [
      "maxp",
      bytes(32, (v) => {
        v.setUint32(0, 0x00010000);
        v.setUint16(4, 2); // two glyphs
        v.setUint16(14, 2);
      }),
    ],
  ];

  const padded = (n: number) => (n + 3) & ~3;
  const checksum = (data: Uint8Array) => {
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum = (sum + (((data[i] << 24) | ((data[i + 1] || 0) << 16) | ((data[i + 2] || 0) << 8) | (data[i + 3] || 0)) >>> 0)) >>> 0;
    }
    return sum;
  };
  const headerSize = 12 + tables.length * 16;
  const total = tables.reduce((n, [, data]) => n + padded(data.length), headerSize);
  const font = new Uint8Array(total);
  const view = new DataView(font.buffer);
  view.setUint32(0, 0x00010000);
  view.setUint16(4, tables.length);
  view.setUint16(6, 64);
  view.setUint16(8, 2);
  view.setUint16(10, tables.length * 16 - 64);
  let offset = headerSize;
  let headAt = 0;
  tables.forEach(([tag, data], i) => {
    const record = 12 + i * 16;
    for (let c = 0; c < 4; c++) font[record + c] = tag.charCodeAt(c);
    view.setUint32(record + 4, checksum(data));
    view.setUint32(record + 8, offset);
    view.setUint32(record + 12, data.length);
    font.set(data, offset);
    if (tag === "head") headAt = offset;
    offset += padded(data.length);
  });
  view.setUint32(headAt + 8, (0xb1b0afba - checksum(font)) >>> 0);
  return font;
}

const RTL = /[֐-ࣿיִ-﷿ﹰ-ﻼ]/;
const LTR = /[A-Za-z0-9À-ɏͰ-ӿऀ-ൿ]/;

// PDF text is stored left to right as it appears on the page; readers turn right-to-left runs back
// into reading order. So Arabic and Hebrew have to be written in their visual order.
function visualOrder(chars: string[]): string[] {
  if (!chars.some((c) => RTL.test(c))) return chars;
  let firstStrong = "";
  for (let i = 0; i < chars.length && !firstStrong; i++) {
    if (RTL.test(chars[i])) firstStrong = "rtl";
    else if (LTR.test(chars[i])) firstStrong = "ltr";
  }
  // reverses every run that starts and ends with a character of the other direction
  const flipRuns = (list: string[], inside: RegExp, outside: RegExp) => {
    const out = list.slice();
    let i = 0;
    while (i < out.length) {
      if (!inside.test(out[i])) {
        i++;
        continue;
      }
      let end = i;
      for (let j = i + 1; j < out.length && !outside.test(out[j]); j++) if (inside.test(out[j])) end = j;
      const run = out.slice(i, end + 1).reverse();
      for (let j = 0; j < run.length; j++) out[i + j] = run[j];
      i = end + 1;
    }
    return out;
  };
  if (firstStrong === "rtl") return flipRuns(chars.slice().reverse(), LTR, RTL);
  return flipRuns(chars, RTL, LTR);
}

const hex4 = (n: number) => ("000" + n.toString(16).toUpperCase()).slice(-4);

/** UTF-16 code units of one character, as hex */
function utf16Hex(ch: string): string {
  let out = "";
  for (let i = 0; i < ch.length; i++) out += hex4(ch.charCodeAt(i));
  return out;
}

export interface TextLayer {
  add(page: PDFPage, item: HiddenText): void;
  /** must be called once, before the document is saved */
  finish(): void;
}

export async function createTextLayer(doc: PDFDocument): Promise<TextLayer> {
  // loaded lazily so pdf-lib stays out of the page's first-load JavaScript
  const lib = await import("pdf-lib");
  const context = doc.context;
  const codes: Record<string, number> = {};
  const chars: string[] = []; // chars[code - 1]
  const names: { page: PDFPage; name: PDFName }[] = [];
  const fontRef = context.nextRef();

  const codeFor = (ch: string) => {
    if (codes[ch] === undefined) {
      if (chars.length >= 0xffff) return 0;
      chars.push(ch);
      codes[ch] = chars.length;
    }
    return codes[ch];
  };

  const nameOn = (page: PDFPage) => {
    for (let i = names.length - 1; i >= 0; i--) if (names[i].page === page) return names[i].name;
    const name = page.node.newFontDictionary("HiddenText", fontRef);
    names.push({ page, name });
    return name;
  };

  return {
    add(page, item) {
      const clean = item.text.replace(/[\u0000-\u001f\u007f]+/g, " ");
      if (!clean.trim() || !(item.size > 0)) return;
      const list = visualOrder(Array.from(clean));
      const hex = list.map((ch) => hex4(codeFor(ch))).join("");
      const marks = list.filter((ch) => NO_ADVANCE.test(ch)).length;
      const natural = (Math.max(1, list.length - marks) * ADVANCE + marks * MARK_ADVANCE) * item.size;
      const stretch = item.width > 0 ? Math.min(1000, Math.max(1, (item.width / natural) * 100)) : 100;
      const turn = ((item.angle || 0) * Math.PI) / 180;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      page.pushOperators(
        lib.pushGraphicsState(),
        lib.beginText(),
        lib.setTextRenderingMode(lib.TextRenderingMode.Invisible),
        lib.setFontAndSize(nameOn(page), item.size),
        lib.setCharacterSqueeze(stretch),
        lib.setTextMatrix(cos, sin, -sin, cos, item.x, item.y),
        lib.showText(lib.PDFHexString.of(hex)),
        lib.endText(),
        lib.popGraphicsState()
      );
    },

    finish() {
      if (!chars.length) return;
      const font = blankFont();
      const fontFile = context.register(context.flateStream(font, { Length1: font.length }));
      const descriptor = context.register(
        context.obj({
          Type: "FontDescriptor",
          FontName: "GlyphLessFont",
          Flags: 5,
          FontBBox: [0, -200, ADVANCE * 1000, 800],
          ItalicAngle: 0,
          Ascent: 800,
          Descent: -200,
          CapHeight: 800,
          StemV: 80,
          FontFile2: fontFile,
        })
      );
      // [first, last, width] for every vowel sign
      const widths: number[] = [];
      chars.forEach((ch, i) => {
        if (NO_ADVANCE.test(ch)) widths.push(i + 1, i + 1, MARK_ADVANCE * 1000);
      });
      // every code shows glyph 1, the blank one
      const gids = new Uint8Array((chars.length + 1) * 2);
      for (let i = 1; i <= chars.length; i++) gids[i * 2 + 1] = 1;
      const descendant = context.register(
        context.obj({
          Type: "Font",
          Subtype: "CIDFontType2",
          BaseFont: "GlyphLessFont",
          CIDSystemInfo: { Registry: lib.PDFString.of("Adobe"), Ordering: lib.PDFString.of("Identity"), Supplement: 0 },
          FontDescriptor: descriptor,
          DW: ADVANCE * 1000,
          W: widths,
          CIDToGIDMap: context.register(context.flateStream(gids)),
        })
      );

      const blocks: string[] = [];
      for (let start = 0; start < chars.length; start += 100) {
        const part = chars.slice(start, start + 100);
        blocks.push(
          `${part.length} beginbfchar\n` +
            part.map((ch, i) => `<${hex4(start + i + 1)}> <${utf16Hex(ch)}>`).join("\n") +
            "\nendbfchar"
        );
      }
      const cmap = [
        "/CIDInit /ProcSet findresource begin",
        "12 dict begin",
        "begincmap",
        "/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def",
        "/CMapName /Adobe-Identity-UCS def",
        "/CMapType 2 def",
        "1 begincodespacerange",
        "<0000> <FFFF>",
        "endcodespacerange",
        blocks.join("\n"),
        "endcmap",
        "CMapName currentdict /CMap defineresource pop",
        "end",
        "end",
      ].join("\n");

      context.assign(
        fontRef,
        context.obj({
          Type: "Font",
          Subtype: "Type0",
          BaseFont: "GlyphLessFont",
          Encoding: "Identity-H",
          DescendantFonts: [descendant],
          ToUnicode: context.register(context.flateStream(cmap)),
        })
      );
    },
  };
}
