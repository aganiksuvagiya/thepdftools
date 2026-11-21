// Intermediate model for a parsed DOCX document (units: CSS px at 96 dpi unless noted).

export interface RStyle {
  fL: string; // latin font family
  fC: string; // complex-script font family
  fE: string; // east-asian font family
  szL: number; // px
  szC: number;
  bL: boolean;
  bC: boolean;
  iL: boolean;
  iC: boolean;
  u: string | null;
  strike: boolean;
  dstrike: boolean;
  color: string;
  highlight: string | null;
  shade: string | null;
  vert: "base" | "super" | "sub";
  caps: boolean;
  smallCaps: boolean;
  spacing: number; // px
  vanish: boolean;
}

export interface Crop {
  l: number;
  t: number;
  r: number;
  b: number;
}

export interface Anchor {
  behind: boolean;
  wrap: string; // none | square | tight | through | topAndBottom
  relH: string;
  relV: string;
  offH: number;
  offV: number;
  alignH: string | null;
  alignV: string | null;
}

export type Inline =
  | { k: "t"; text: string; st: RStyle }
  | { k: "tab"; st: RStyle }
  | { k: "br"; type: "line" | "page" | "column"; st: RStyle }
  | { k: "img"; path: string | null; w: number; h: number; crop: Crop; rot: number; anchor: Anchor | null; st: RStyle }
  | { k: "fld"; kind: "page" | "numpages"; text: string; st: RStyle };

export interface Tab {
  pos: number; // px from the paragraph column's left edge
  kind: string; // left | center | right | decimal | bar | clear
  leader: string; // none | dot | hyphen | underscore | ...
}

export interface Border {
  w: number;
  color: string;
  style: string;
}

export interface Borders {
  top: Border | null;
  right: Border | null;
  bottom: Border | null;
  left: Border | null;
}

export interface PStyle {
  jc: "left" | "center" | "right" | "both";
  indLeft: number;
  indRight: number;
  indFirst: number; // first line offset, negative = hanging
  before: number;
  after: number;
  line: number; // auto: multiplier; exact/atLeast: px
  lineRule: "auto" | "exact" | "atLeast";
  keepNext: boolean;
  keepLines: boolean;
  pageBreakBefore: boolean;
  widow: boolean;
  contextual: boolean;
  tabs: Tab[];
  shade: string | null;
  borders: Borders;
}

export interface NumLabel {
  text: string;
  st: RStyle;
  suffix: "tab" | "space" | "none";
}

export interface Para {
  k: "p";
  ps: PStyle;
  inlines: Inline[];
  num: NumLabel | null;
  endSt: RStyle;
  styleId: string;
  sect: SectProps | null;
}

export interface Cell {
  blocks: Block[];
  span: number;
  vmerge: "restart" | "continue" | null;
  shade: string | null;
  borders: Partial<Borders>;
  mar: { t: number | null; r: number | null; b: number | null; l: number | null };
  valign: string;
  widthPx: number;
}

export interface Row {
  cells: Cell[];
  height: number;
  hRule: string;
  header: boolean;
  cantSplit: boolean;
}

export interface TableBorders extends Borders {
  insideH: Border | null;
  insideV: Border | null;
}

export interface Table {
  k: "tbl";
  rows: Row[];
  grid: number[];
  indent: number;
  borders: TableBorders;
  mar: { t: number; r: number; b: number; l: number };
  jc: string;
  widthPx: number | null;
}

export type Block = Para | Table;

export interface SectProps {
  pageW: number;
  pageH: number;
  mT: number;
  mR: number;
  mB: number;
  mL: number;
  hdrDist: number;
  ftrDist: number;
  titlePg: boolean;
  headers: { default?: string; first?: string; even?: string };
  footers: { default?: string; first?: string; even?: string };
  cols: number;
  type: string;
}

export interface DocSection {
  props: SectProps;
  blocks: Block[];
}

export interface DocModel {
  sections: DocSection[];
  parts: Map<string, Block[]>; // header / footer parts by relationship id
  evenOdd: boolean;
  defaultTab: number;
  imagePaths: string[];
  warnings: Record<string, number>;
}
