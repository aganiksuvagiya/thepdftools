// Saving an edited picture: a JPG stays a JPG and a WebP stays a WebP; everything else becomes PNG.

export type OutputMime = "image/jpeg" | "image/png" | "image/webp";

export function sameFormat(fileType: string): OutputMime {
  if (fileType === "image/jpeg" || fileType === "image/jpg" || fileType === "image/pjpeg") return "image/jpeg";
  return fileType === "image/webp" ? "image/webp" : "image/png";
}

/** Use the type of the blob that was really produced: some browsers return PNG when asked for WebP. */
export function extensionFor(mime: string): "jpg" | "png" | "webp" {
  if (mime === "image/jpeg") return "jpg";
  return mime === "image/webp" ? "webp" : "png";
}

export function canvasToImage(canvas: HTMLCanvasElement, mime: OutputMime, quality = 0.92): Promise<Blob> {
  if (mime === "image/jpeg") {
    // JPG has no transparency: put white behind the picture, otherwise empty areas turn black.
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not save the image."))), mime, quality);
  });
}
