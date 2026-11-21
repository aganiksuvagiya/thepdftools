// Paints laid-out DOCX pages onto a canvas and collects text lines for an invisible PDF text layer.
import { Crop } from "./model";
import { Cmd, LLine, PageLayout } from "./layout";

export interface TextRec {
  text: string;
  x: number; // canvas device px
  y: number; // baseline, canvas device px
  w: number;
  size: number;
}

export interface Painted {
  canvas: HTMLCanvasElement;
  texts: TextRec[];
}

const HAS_LS = typeof CanvasRenderingContext2D !== "undefined" && "letterSpacing" in CanvasRenderingContext2D.prototype;

function dashFor(style: string, w: number): number[] {
  const u = Math.max(1, w);
  if (style === "dotted") return [u, u * 1.5];
  if (style === "dashed" || style === "dashSmallGap") return [u * 4, u * 2];
  if (style === "dotDash") return [u * 4, u * 2, u, u * 2];
  return [];
}

function drawImageCrop(g: CanvasRenderingContext2D, img: CanvasImageSource, crop: Crop, w: number, h: number) {
  const fw = Math.max(0.001, 1 - crop.l - crop.r), fh = Math.max(0.001, 1 - crop.t - crop.b);
  const dw = w / fw, dh = h / fh;
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(img, -crop.l * dw, -crop.t * dh, dw, dh);
}

function drawImage(g: CanvasRenderingContext2D, img: CanvasImageSource | null | undefined, x: number, y: number, w: number, h: number, crop: Crop, rot: number) {
  if (!img) return;
  g.save();
  g.translate(x + w / 2, y + h / 2);
  if (rot) g.rotate(rot);
  g.translate(-w / 2, -h / 2);
  g.beginPath();
  g.rect(0, 0, w, h);
  g.clip();
  drawImageCrop(g, img, crop, w, h);
  g.restore();
}

function paintLine(g: CanvasRenderingContext2D, x0: number, y0: number, line: LLine, images: Map<string, CanvasImageSource | null>, scale: number, texts: TextRec[]) {
  const baseY = y0 + line.h - line.descent;
  let text = "";
  let firstX = -1;
  let endX = 0;
  let maxSize = 0;
  g.textBaseline = "alphabetic";
  g.textAlign = "left";
  line.toks.forEach((t) => {
    const x = x0 + t.x;
    if (t.kind === "img" && t.img) {
      drawImage(g, t.img.path ? images.get(t.img.path) : null, x, baseY - t.img.h, t.img.w, t.img.h, t.img.crop, t.img.rot);
      return;
    }
    if (t.kind === "tab") {
      if (t.leader && t.leader !== "none" && t.w > 6) {
        g.fillStyle = t.st.color;
        g.strokeStyle = t.st.color;
        g.lineWidth = Math.max(0.6, t.size / 18);
        if (t.leader === "dot" || t.leader === "middleDot") {
          const step = Math.max(3, t.size * 0.35);
          for (let px = x + step / 2; px < x + t.w - 1; px += step) g.fillRect(px, baseY - 1, Math.max(1, t.size / 14), Math.max(1, t.size / 14));
        } else if (t.leader === "hyphen") {
          g.setLineDash([t.size * 0.4, t.size * 0.3]);
          g.beginPath();
          g.moveTo(x, baseY - t.size * 0.25);
          g.lineTo(x + t.w, baseY - t.size * 0.25);
          g.stroke();
          g.setLineDash([]);
        } else {
          g.beginPath();
          g.moveTo(x, baseY + 1);
          g.lineTo(x + t.w, baseY + 1);
          g.stroke();
        }
      }
      return;
    }
    const st = t.st;
    if (st.shade) {
      g.fillStyle = st.shade;
      g.fillRect(x, baseY - t.size * 0.95, t.w, t.size * 1.2);
    }
    if (st.highlight) {
      g.fillStyle = st.highlight;
      g.fillRect(x, baseY - t.size * 0.95, t.w, t.size * 1.2);
    }
    const yy = baseY - t.offset;
    if (t.kind === "w") {
      g.font = t.css;
      g.fillStyle = st.color;
      if (HAS_LS) {
        (g as any).letterSpacing = st.spacing ? st.spacing + "px" : "0px";
        g.fillText(t.text, x, yy);
      } else if (st.spacing) {
        let cx = x;
        Array.from(t.text).forEach((ch) => {
          g.fillText(ch, cx, yy);
          cx += g.measureText(ch).width + st.spacing;
        });
      } else g.fillText(t.text, x, yy);
    }
    if (st.u || st.strike || st.dstrike) {
      g.fillStyle = st.color;
      const th = Math.max(1, t.size / 16);
      if (st.u) {
        g.fillRect(x, yy + t.size * 0.12, t.w, th);
        if (st.u === "double") g.fillRect(x, yy + t.size * 0.12 + th * 2, t.w, th);
      }
      if (st.strike) g.fillRect(x, yy - t.size * 0.3, t.w, th);
      if (st.dstrike) {
        g.fillRect(x, yy - t.size * 0.34, t.w, th);
        g.fillRect(x, yy - t.size * 0.24, t.w, th);
      }
    }
    if (firstX < 0) firstX = x;
    endX = x + t.w;
    text += t.text;
    maxSize = Math.max(maxSize, t.size);
  });
  if (HAS_LS) (g as any).letterSpacing = "0px";
  if (text.trim()) {
    texts.push({ text: text.replace(/\s+$/, ""), x: firstX * scale, y: baseY * scale, w: (endX - firstX) * scale, size: maxSize * scale });
  }
}

export function paintPage(page: PageLayout, extra: Cmd[], scale: number, images: Map<string, CanvasImageSource | null>): Painted {
  const w = page.sect.pageW, h = page.sect.pageH;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const g = canvas.getContext("2d");
  if (!g) throw new Error("Canvas is not available in this browser.");
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, canvas.width, canvas.height);
  g.scale(scale, scale);
  const texts: TextRec[] = [];

  const all = extra.concat(page.cmds);
  const behind = all.filter((c) => c.t === "img" && c.z < 0);
  const rest = all.filter((c) => !(c.t === "img" && c.z < 0) && !(c.t === "img" && c.z > 0));
  const front = all.filter((c) => c.t === "img" && c.z > 0);
  behind.concat(rest, front).forEach((c) => {
    switch (c.t) {
      case "rect":
        g.fillStyle = c.fill;
        g.fillRect(c.x, c.y, c.w, c.h);
        break;
      case "ln": {
        g.strokeStyle = c.color;
        g.lineWidth = c.w;
        g.setLineDash(dashFor(c.style, c.w));
        g.beginPath();
        g.moveTo(c.x1, c.y1);
        g.lineTo(c.x2, c.y2);
        g.stroke();
        g.setLineDash([]);
        break;
      }
      case "img":
        drawImage(g, c.path ? images.get(c.path) : null, c.x, c.y, c.w, c.h, c.crop, c.rot);
        break;
      case "line":
        paintLine(g, c.x, c.y, c.line, images, scale, texts);
        break;
    }
  });
  return { canvas, texts };
}
