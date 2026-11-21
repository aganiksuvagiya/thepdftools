// Small helpers for reading OOXML (PPTX) packages in the browser.

export const EMU = 9525; // EMU per CSS pixel (96 dpi)
export const R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

export type El = Element;

export function kids(el: El | null | undefined, name?: string): El[] {
  const out: El[] = [];
  if (!el) return out;
  for (let c = el.firstElementChild; c; c = c.nextElementSibling) {
    if (!name || c.localName === name) out.push(c);
  }
  return out;
}

export function kid(el: El | null | undefined, name: string): El | null {
  if (!el) return null;
  for (let c = el.firstElementChild; c; c = c.nextElementSibling) {
    if (c.localName === name) return c;
  }
  return null;
}

export function dig(el: El | null | undefined, ...names: string[]): El | null {
  let cur: El | null | undefined = el;
  for (const n of names) {
    cur = kid(cur, n);
    if (!cur) return null;
  }
  return cur || null;
}

export function at(el: El | null | undefined, name: string): string | null {
  return el ? el.getAttribute(name) : null;
}

export function numAt(el: El | null | undefined, name: string, def: number): number {
  const v = el ? el.getAttribute(name) : null;
  if (v === null || v === "") return def;
  const n = parseFloat(v);
  return isNaN(n) ? def : n;
}

export function boolAt(el: El | null | undefined, name: string, def: boolean): boolean {
  const v = el ? el.getAttribute(name) : null;
  if (v === null) return def;
  return v === "1" || v === "true" || v === "on";
}

/** Relationship id attribute such as r:embed / r:id (namespace aware). */
export function relId(el: El | null | undefined, name: string): string {
  if (!el) return "";
  return el.getAttributeNS(R_NS, name) || el.getAttribute("r:" + name) || "";
}

export function parseXml(text: string): El {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new Error("Corrupt XML in the presentation file.");
  return doc.documentElement;
}

export function resolvePath(baseDir: string, target: string): string {
  if (target.charAt(0) === "/") return target.slice(1);
  const parts = (baseDir ? baseDir.split("/") : []).concat(target.split("/"));
  const out: string[] = [];
  for (const p of parts) {
    if (p === "..") out.pop();
    else if (p && p !== ".") out.push(p);
  }
  return out.join("/");
}

export function dirOf(path: string): string {
  const i = path.lastIndexOf("/");
  return i < 0 ? "" : path.slice(0, i);
}

export interface Rel {
  id: string;
  type: string;
  target: string; // absolute path inside the zip (or URL when external)
  external: boolean;
}

const UNSUPPORTED_IMG = /\.(emf|wmf|tif|tiff|wdp|jxr|pict)$/i;

export class Pkg {
  zip: any;
  private lower = new Map<string, string>();
  private xmlCache = new Map<string, El | null>();
  private relCache = new Map<string, Map<string, Rel>>();
  private imgCache = new Map<string, Promise<CanvasImageSource | null>>();
  private disposers: Array<() => void> = [];
  unsupportedImages = 0;

  constructor(zip: any) {
    this.zip = zip;
    Object.keys(zip.files).forEach((k) => this.lower.set(k.toLowerCase(), k));
  }

  private real(path: string): string | null {
    if (this.zip.file(path)) return path;
    const alt = this.lower.get(path.toLowerCase());
    return alt && this.zip.file(alt) ? alt : null;
  }

  has(path: string): boolean {
    return !!this.real(path);
  }

  async text(path: string): Promise<string | null> {
    const p = this.real(path);
    return p ? this.zip.file(p).async("string") : null;
  }

  async xml(path: string): Promise<El | null> {
    if (this.xmlCache.has(path)) return this.xmlCache.get(path) || null;
    const t = await this.text(path);
    const x = t ? parseXml(t) : null;
    this.xmlCache.set(path, x);
    return x;
  }

  async rels(part: string): Promise<Map<string, Rel>> {
    const cached = this.relCache.get(part);
    if (cached) return cached;
    const dir = dirOf(part);
    const base = part.slice(part.lastIndexOf("/") + 1);
    const relPath = (dir ? dir + "/" : "") + "_rels/" + base + ".rels";
    const out = new Map<string, Rel>();
    const root = await this.xml(relPath);
    kids(root, "Relationship").forEach((r) => {
      const external = r.getAttribute("TargetMode") === "External";
      const target = r.getAttribute("Target") || "";
      out.set(r.getAttribute("Id") || "", {
        id: r.getAttribute("Id") || "",
        type: r.getAttribute("Type") || "",
        target: external ? target : resolvePath(dir, target),
        external,
      });
    });
    this.relCache.set(part, out);
    return out;
  }

  image(path: string): Promise<CanvasImageSource | null> {
    let p = this.imgCache.get(path);
    if (!p) {
      p = this.loadImage(path);
      this.imgCache.set(path, p);
    }
    return p;
  }

  private async loadImage(path: string): Promise<CanvasImageSource | null> {
    const real = this.real(path);
    if (!real) return null;
    if (UNSUPPORTED_IMG.test(real)) {
      this.unsupportedImages++;
      return null;
    }
    const lowerName = real.toLowerCase();
    const mime = lowerName.endsWith(".png")
      ? "image/png"
      : lowerName.endsWith(".gif")
      ? "image/gif"
      : lowerName.endsWith(".svg")
      ? "image/svg+xml"
      : lowerName.endsWith(".webp")
      ? "image/webp"
      : lowerName.endsWith(".bmp")
      ? "image/bmp"
      : "image/jpeg";
    const raw: Blob = await this.zip.file(real).async("blob");
    const blob = raw.type === mime ? raw : new Blob([raw], { type: mime });
    if (mime !== "image/svg+xml" && typeof createImageBitmap === "function") {
      try {
        const bmp = await createImageBitmap(blob);
        this.disposers.push(() => bmp.close());
        return bmp;
      } catch {
        /* fall through to <img> */
      }
    }
    try {
      const url = URL.createObjectURL(blob);
      this.disposers.push(() => URL.revokeObjectURL(url));
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } catch {
      this.unsupportedImages++;
      return null;
    }
  }

  dispose() {
    this.disposers.forEach((f) => {
      try {
        f();
      } catch {
        /* ignore */
      }
    });
    this.disposers = [];
    this.imgCache.clear();
  }
}
