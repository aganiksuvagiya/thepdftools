"use client";

import { useEffect, useRef, useState } from "react";
import { loadPdfJs } from "@/lib/pdf-compress-engine";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Shows the compressed file page by page, so its readability can be checked before downloading.
export default function ResultPreview({ bytes }: { bytes: Uint8Array }) {
  const [doc, setDoc] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let loaded: any = null;
    setDoc(null);
    setPage(1);
    setZoomed(false);
    setFailed(false);
    (async () => {
      try {
        const pdfjsLib = await loadPdfJs();
        // pdf.js takes over the buffer it is given, and the download still needs the original
        loaded = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
        if (cancelled) loaded.destroy();
        else setDoc(loaded);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [bytes]);

  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    let task: any = null;
    (async () => {
      try {
        const source = await doc.getPage(page);
        const canvas = canvasRef.current;
        if (cancelled || !canvas) return;
        const base = source.getViewport({ scale: 1 });
        const viewport = source.getViewport({ scale: Math.min(1600 / base.width, 2400 / base.height) });
        // drawn off screen first: two renders must never share one canvas
        const buffer = document.createElement("canvas");
        buffer.width = Math.round(viewport.width);
        buffer.height = Math.round(viewport.height);
        task = source.render({ canvasContext: buffer.getContext("2d")!, canvas: buffer, viewport });
        await task.promise;
        if (cancelled) return;
        canvas.width = buffer.width;
        canvas.height = buffer.height;
        canvas.getContext("2d")!.drawImage(buffer, 0, 0);
      } catch (err) {
        if (!cancelled && (err as { name?: string })?.name !== "RenderingCancelledException") setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, page]);

  if (failed) {
    return <p className="text-center text-sm text-gray-500">Preview is not available. Open the downloaded file to check it.</p>;
  }

  const total: number = doc?.numPages ?? 0;
  const buttonClass =
    "whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300 disabled:opacity-40";

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-700">
          Preview: check names, numbers and signatures
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {total > 1 && (
            <>
              <button type="button" className={buttonClass} disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
              <span className="whitespace-nowrap text-sm text-gray-500">
                Page {page} of {total}
              </span>
              <button type="button" className={buttonClass} disabled={page >= total} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </>
          )}
          <button type="button" className={buttonClass} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>
            {zoomed ? "Fit" : "Zoom in"}
          </button>
        </div>
      </div>
      <div className="max-h-[32rem] overflow-auto rounded-lg bg-slate-100 p-2">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Compressed page ${page}`}
          className={`mx-auto block h-auto bg-white shadow-sm ${zoomed ? "w-[200%] max-w-none" : "w-full max-w-2xl"}`}
        />
      </div>
    </div>
  );
}
