// Writes the blocks rebuilt from a PDF into a real .docx (styles, headings, lists, tables, page breaks).
import { Block, CellOut, RunOut } from "./pdfBlocks";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export interface PageSetup {
  wTw: number;
  hTw: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function esc(str: string): string {
  return (
    str
      // characters that are not allowed in XML 1.0 would make Word reject the file
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  );
}

function runXml(r: RunOut, base: number, heading: boolean): string {
  const f = esc(r.font || "Arial");
  const props =
    `<w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}"/>` +
    (!heading && r.bold ? "<w:b/>" : "") +
    (r.italic ? "<w:i/>" : "") +
    (!heading && Math.abs(r.size - base) > 0.6 ? `<w:sz w:val="${Math.max(2, Math.round(r.size * 2))}"/>` : "");
  const parts = r.text.split("\t");
  const inner = parts.map((t, i) => (i > 0 ? "<w:tab/>" : "") + (t ? `<w:t xml:space="preserve">${esc(t)}</w:t>` : "")).join("");
  return `<w:r><w:rPr>${props}</w:rPr>${inner}</w:r>`;
}

function cellXml(c: CellOut, width: number, base: number): string {
  const jc = c.align !== "left" ? `<w:jc w:val="${c.align}"/>` : "";
  return (
    `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/></w:tcPr>` +
    `<w:p><w:pPr><w:spacing w:before="20" w:after="20"/>${jc}</w:pPr>${c.runs.map((r) => runXml(r, base, false)).join("")}</w:p></w:tc>`
  );
}

const EMPTY_AFTER_TABLE = '<w:p><w:pPr><w:spacing w:after="0" w:line="120" w:lineRule="exact"/></w:pPr></w:p>';

export async function buildDocx(pages: Block[][], setup: PageSetup, base: number): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const body: string[] = [];

  pages.forEach((blocks, pi) => {
    const breakBefore = pi > 0;
    if (!blocks.length) {
      if (breakBefore) body.push('<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>');
      return;
    }
    blocks.forEach((b, bi) => {
      const pb = breakBefore && bi === 0;
      if (b.k === "table") {
        if (pb) body.push('<w:p><w:pPr><w:pageBreakBefore/><w:spacing w:after="0" w:line="20" w:lineRule="exact"/></w:pPr></w:p>');
        const total = b.colW.reduce((a, c) => a + c, 0);
        const grid = b.colW.map((w) => `<w:gridCol w:w="${w}"/>`).join("");
        const rows = b.rows
          .map((r) => `<w:tr>${r.map((c, ci) => cellXml(c, b.colW[ci], base)).join("")}</w:tr>`)
          .join("");
        const border = (n: string) => `<w:${n} w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>`;
        body.push(
          `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"].map(border).join("")}</w:tblBorders>` +
            `<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>` +
            `<w:tblGrid>${grid}</w:tblGrid>${rows}</w:tbl>` +
            EMPTY_AFTER_TABLE
        );
        return;
      }
      const heading = b.style !== "Normal";
      const ppr =
        (heading ? `<w:pStyle w:val="${b.style}"/>` : "") +
        (pb ? "<w:pageBreakBefore/>" : "") +
        `<w:spacing w:before="${b.before}" w:after="${heading ? 120 : 80}"${heading ? "" : ' w:line="276" w:lineRule="auto"'}/>` +
        (b.left || b.hanging || b.firstLine
          ? `<w:ind w:left="${b.left}"${b.hanging ? ` w:hanging="${b.hanging}"` : b.firstLine ? ` w:firstLine="${b.firstLine}"` : ""}/>`
          : "") +
        (b.align !== "left" ? `<w:jc w:val="${b.align}"/>` : "");
      body.push(`<w:p><w:pPr>${ppr}</w:pPr>${b.runs.map((r) => runXml(r, base, heading)).join("")}</w:p>`);
    });
  });

  const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  const documentXml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    `<w:document xmlns:w="${W}"><w:body>${body.join("")}` +
    `<w:sectPr><w:pgSz w:w="${setup.wTw}" w:h="${setup.hTw}"/><w:pgMar w:top="${setup.top}" w:right="${setup.right}" w:bottom="${setup.bottom}" w:left="${setup.left}" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>` +
    "</w:body></w:document>";

  const head = (sz: number, before: number) =>
    `<w:pPr><w:keepNext/><w:spacing w:before="${before}" w:after="120"/></w:pPr><w:rPr><w:b/><w:sz w:val="${sz}"/></w:rPr>`;
  const stylesXml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    `<w:styles xmlns:w="${W}">` +
    `<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial" w:eastAsia="Arial"/><w:sz w:val="${Math.max(2, Math.round(base * 2))}"/><w:szCs w:val="${Math.max(2, Math.round(base * 2))}"/></w:rPr></w:rPrDefault>` +
    '<w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>' +
    `<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>${head(36, 240)}</w:style>` +
    `<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>${head(30, 200)}</w:style>` +
    `<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>${head(26, 160)}</w:style>` +
    "</w:styles>";

  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      "</Types>"
  );
  zip.file(
    "_rels/.rels",
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      "</Relationships>"
  );
  zip.file(
    "word/_rels/document.xml.rels",
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      "</Relationships>"
  );
  zip.file("word/document.xml", documentXml);
  zip.file("word/styles.xml", stylesXml);
  return zip.generateAsync({ type: "blob", mimeType: DOCX_MIME, compression: "DEFLATE" });
}
