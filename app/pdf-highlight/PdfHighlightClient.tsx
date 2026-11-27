"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DropZone from "@/components/DropZone";

type HighlightBox = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** index into HIGHLIGHT_COLORS */
  color: number;
};

type PagePreview = {
  pageNumber: number;
  width: number;
  height: number;
  imageUrl: string;
  highlights: HighlightBox[];
};

const HIGHLIGHT_COLORS: { name: string; rgb: [number, number, number] }[] = [
  { name: "Yellow", rgb: [1, 0.93, 0.2] },
  { name: "Green", rgb: [0.45, 0.93, 0.4] },
  { name: "Blue", rgb: [0.45, 0.78, 1] },
  { name: "Pink", rgb: [1, 0.58, 0.8] },
  { name: "Orange", rgb: [1, 0.68, 0.25] },
];
// The preview and the saved PDF both multiply the colour over the page, so black text stays black.
const HIGHLIGHT_OPACITY = 0.6;
const PREVIEW_SCALE = 1.35;

function cssColor(index: number, alpha: number): string {
  const [r, g, b] = HIGHLIGHT_COLORS[index].rgb;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function loadPdfJs() {
  const cdnUrl = "/vendor/pdfjs-4.0.379/pdf.mjs";
  const pdfjsLib = await (Function(`return import("${cdnUrl}")`)() as Promise<any>);
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "/vendor/pdfjs-4.0.379/pdf.worker.mjs";
  return pdfjsLib;
}

function createBoxId() {
  return `highlight-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function PdfHighlightClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PagePreview[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState(0);
  const [draftHighlight, setDraftHighlight] = useState<HighlightBox | null>(null);
  const [color, setColor] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageSurfaceRef = useRef<HTMLDivElement | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelLockRef = useRef(false);

  const activePage = pages[currentPage] ?? null;
  const totalHighlights = useMemo(
    () => pages.reduce((count, page) => count + page.highlights.length, 0),
    [pages],
  );

  useEffect(() => {
    const activeThumb = thumbnailsRef.current?.querySelector<HTMLButtonElement>(
      `[data-page-index="${currentPage}"]`,
    );
    activeThumb?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentPage]);

  // An exported file no longer matches the page once the highlights change.
  const dropDownload = useCallback(() => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setDownloadSize(0);
    setNotice(null);
  }, [downloadUrl]);

  const releaseUrls = useCallback((items: PagePreview[]) => {
    for (const page of items) {
      URL.revokeObjectURL(page.imageUrl);
    }
  }, []);

  const resetAll = useCallback(() => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    releaseUrls(pages);
    setFile(null);
    setPages([]);
    setCurrentPage(0);
    setLoading(false);
    setSaving(false);
    setProgress("");
    setError(null);
    setDownloadUrl(null);
    setDownloadSize(0);
    setDraftHighlight(null);
    setNotice(null);
  }, [downloadUrl, pages, releaseUrls]);

  const loadFile = useCallback(async (nextFile: File) => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    releaseUrls(pages);

    setFile(nextFile);
    setPages([]);
    setCurrentPage(0);
    setLoading(true);
    setSaving(false);
    setProgress("Loading PDF preview...");
    setError(null);
    setDownloadUrl(null);
    setDownloadSize(0);
    setDraftHighlight(null);
    setNotice(null);

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await nextFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const renderedPages: PagePreview[] = [];

      for (let i = 1; i <= pdf.numPages; i += 1) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: PREVIEW_SCALE });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Could not create preview canvas.");

        await page.render({ canvasContext: context, viewport, canvas }).promise;
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((value) => {
            if (value) resolve(value);
            else reject(new Error("Could not render the PDF preview."));
          }, "image/png");
        });

        renderedPages.push({
          pageNumber: i,
          width: canvas.width,
          height: canvas.height,
          imageUrl: URL.createObjectURL(blob),
          highlights: [],
        });
      }

      setPages(renderedPages);
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load this PDF.");
    } finally {
      setLoading(false);
    }
  }, [downloadUrl, pages, releaseUrls]);

  const handleFiles = useCallback((files: File[]) => {
    const nextFile = files[0];
    if (!nextFile) return;
    void loadFile(nextFile);
  }, [loadFile]);

  const getRelativePoint = useCallback((clientX: number, clientY: number) => {
    const surface = pageSurfaceRef.current;
    if (!surface || !activePage) return null;

    const rect = surface.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * activePage.width;
    const y = ((clientY - rect.top) / rect.height) * activePage.height;

    return {
      x: Math.max(0, Math.min(activePage.width, x)),
      y: Math.max(0, Math.min(activePage.height, y)),
    };
  }, [activePage]);

  const beginDrag = useCallback((clientX: number, clientY: number) => {
    const point = getRelativePoint(clientX, clientY);
    if (!point) return;
    dragStartRef.current = point;
    setDraftHighlight({ id: "draft", x: point.x, y: point.y, width: 0, height: 0, color });
  }, [color, getRelativePoint]);

  const updateDrag = useCallback((clientX: number, clientY: number) => {
    const start = dragStartRef.current;
    const end = getRelativePoint(clientX, clientY);
    if (!start || !end) return;

    setDraftHighlight({
      id: "draft",
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
      color,
    });
  }, [color, getRelativePoint]);

  const finishDrag = useCallback((clientX: number, clientY: number) => {
    const start = dragStartRef.current;
    dragStartRef.current = null;
    setDraftHighlight(null);
    const end = getRelativePoint(clientX, clientY);
    if (!start || !end) return;

    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    if (width < 12 || height < 12) return;

    dropDownload();
    setPages((current) =>
      current.map((page, index) =>
        index === currentPage
          ? {
              ...page,
              highlights: [...page.highlights, { id: createBoxId(), x, y, width, height, color }],
            }
          : page,
      ),
    );
  }, [color, currentPage, dropDownload, getRelativePoint]);

  const cancelDrag = useCallback(() => {
    dragStartRef.current = null;
    setDraftHighlight(null);
  }, []);

  const handleViewerWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (pages.length <= 1) return;
    event.preventDefault();
    if (wheelLockRef.current) return;
    if (Math.abs(event.deltaY) < 12) return;

    wheelLockRef.current = true;
    setCurrentPage((current) => (event.deltaY > 0 ? Math.min(current + 1, pages.length - 1) : Math.max(current - 1, 0)));
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 220);
  }, [pages.length]);

  const removeHighlight = useCallback((id: string) => {
    dropDownload();
    setPages((current) =>
      current.map((page, index) =>
        index === currentPage
          ? { ...page, highlights: page.highlights.filter((item) => item.id !== id) }
          : page,
      ),
    );
  }, [currentPage, dropDownload]);

  const clearCurrentPage = useCallback(() => {
    dropDownload();
    setPages((current) =>
      current.map((page, index) =>
        index === currentPage ? { ...page, highlights: [] } : page,
      ),
    );
  }, [currentPage, dropDownload]);

  const exportHighlightedPdf = useCallback(async () => {
    if (!file || !pages.length) return;

    setSaving(true);
    setProgress("Building highlighted PDF...");
    setError(null);
    dropDownload();

    try {
      const [pdfjsLib, pdfLib] = await Promise.all([loadPdfJs(), import("pdf-lib")]);
      const { PDFDocument, BlendMode, rgb } = pdfLib;
      const sourceBuffer = await file.arrayBuffer();
      // pdf.js takes over the buffer it is given, so each library gets its own copy.
      const pdf = await pdfjsLib.getDocument({ data: sourceBuffer.slice(0) }).promise;

      // Normal case: draw on top of the original pages, so text, links and quality stay as they were.
      let original: Awaited<ReturnType<typeof PDFDocument.load>> | null = null;
      try {
        original = await PDFDocument.load(sourceBuffer.slice(0), { updateMetadata: false });
        if (original.getPageCount() !== pdf.numPages) original = null;
      } catch {
        original = null; // protected or damaged file: rebuilt from page images below
      }
      const outPdf = original ?? (await PDFDocument.create());

      for (let i = 0; i < pages.length; i += 1) {
        const { highlights, width, height } = pages[i];
        if (original && !highlights.length) continue;
        setProgress(`Applying highlights to page ${i + 1} of ${pages.length}...`);
        const sourcePage = await pdf.getPage(i + 1);
        // The same view as the preview, which accounts for rotated and cropped pages.
        const viewport = sourcePage.getViewport({ scale: PREVIEW_SCALE });
        let outPage = original ? original.getPage(i) : null;

        if (!outPage) {
          const sharp = sourcePage.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(sharp.width);
          canvas.height = Math.ceil(sharp.height);
          const context = canvas.getContext("2d");

          if (!context) throw new Error("Could not create export canvas.");

          await sourcePage.render({ canvasContext: context, viewport: sharp, canvas }).promise;

          const dataUrl = canvas.toDataURL("image/png");
          const imageBytes = await fetch(dataUrl).then((response) => response.arrayBuffer());
          const embedded = await outPdf.embedPng(imageBytes);
          const pageWidth = viewport.width / PREVIEW_SCALE;
          const pageHeight = viewport.height / PREVIEW_SCALE;
          outPage = outPdf.addPage([pageWidth, pageHeight]);
          outPage.drawImage(embedded, { x: 0, y: 0, width: pageWidth, height: pageHeight });
        }

        const scaleX = viewport.width / width;
        const scaleY = viewport.height / height;
        for (const highlight of highlights) {
          const left = highlight.x * scaleX;
          const top = highlight.y * scaleY;
          const right = (highlight.x + highlight.width) * scaleX;
          const bottom = (highlight.y + highlight.height) * scaleY;
          // Preview pixels -> points on the page.
          const [x1, y1] = original
            ? viewport.convertToPdfPoint(left, top)
            : [left / PREVIEW_SCALE, (viewport.height - top) / PREVIEW_SCALE];
          const [x2, y2] = original
            ? viewport.convertToPdfPoint(right, bottom)
            : [right / PREVIEW_SCALE, (viewport.height - bottom) / PREVIEW_SCALE];
          outPage.drawRectangle({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
            color: rgb(...HIGHLIGHT_COLORS[highlight.color].rgb),
            opacity: HIGHLIGHT_OPACITY,
            blendMode: BlendMode.Multiply,
            borderWidth: 0,
          });
        }
      }

      const pdfBytes = await outPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize(blob.size);
      setNotice(
        original
          ? null
          : "This PDF is protected or damaged, so its pages were saved as images. Text in the new file cannot be selected.",
      );
      setProgress("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not export the highlighted PDF.");
      setProgress("");
    } finally {
      setSaving(false);
    }
  }, [dropDownload, file, pages]);

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFiles}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your PDF here"
          sublabel="Highlight important text or sections and export a clean annotated PDF"
        />
      ) : (
        <>
          <div className="card p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={clearCurrentPage} className="btn-secondary text-sm" disabled={!activePage?.highlights.length}>
                  Clear Page
                </button>
                <button onClick={resetAll} className="btn-secondary text-sm">
                  Change PDF
                </button>
              </div>
            </div>
          </div>

          {(loading || saving || progress) && (
            <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5 text-sm text-blue-700">
              {progress || "Working..."}
            </div>
          )}

          {error && (
            <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {pages.length > 0 && activePage && (
            <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="space-y-4 self-start rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm xl:sticky xl:top-24">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">Pages</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{pages.length}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">Marks</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{totalHighlights}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">Pages</p>
                  <div ref={thumbnailsRef} className="max-h-[calc(100vh-17rem)] space-y-2 overflow-y-auto pr-2">
                    {pages.map((page, index) => (
                      <button
                        key={page.pageNumber}
                        data-page-index={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-full rounded-xl border p-2 text-left transition ${
                          currentPage === index ? "border-brand-400 bg-brand-50" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img src={page.imageUrl} alt={`Preview page ${page.pageNumber}`} className="w-full rounded-lg border border-slate-100" />
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                          <span>Page {page.pageNumber}</span>
                          <span>{page.highlights.length} mark{page.highlights.length !== 1 ? "s" : ""}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Page {activePage.pageNumber}</h3>
                    <p className="text-sm text-slate-500">Click and drag to place a highlight box.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="mr-2 flex items-center gap-1.5" role="radiogroup" aria-label="Highlight color">
                      {HIGHLIGHT_COLORS.map((item, index) => (
                        <button
                          key={item.name}
                          type="button"
                          role="radio"
                          aria-checked={color === index}
                          aria-label={item.name}
                          title={item.name}
                          onClick={() => setColor(index)}
                          className={`h-7 w-7 rounded-full border-2 transition ${color === index ? "border-slate-900" : "border-white ring-1 ring-slate-200"}`}
                          style={{ backgroundColor: cssColor(index, 1) }}
                        />
                      ))}
                    </div>
                    <button onClick={exportHighlightedPdf} disabled={saving || loading || totalHighlights === 0} className="btn-primary text-sm">
                      {saving ? "Exporting..." : "Export Highlighted PDF"}
                    </button>
                    {downloadUrl ? (
                      <a href={downloadUrl} download={file.name.replace(/\.pdf$/i, "") + "_highlighted.pdf"} className="btn-secondary text-sm">
                        Download PDF
                      </a>
                    ) : null}
                  </div>
                </div>

                <div ref={containerRef} className="max-h-[calc(100vh-12rem)] overflow-auto rounded-[1.5rem] border border-slate-200 bg-slate-50 select-none" onWheel={handleViewerWheel}>
                  <div
                    ref={pageSurfaceRef}
                    className="relative w-full cursor-crosshair"
                    onMouseDown={(event) => beginDrag(event.clientX, event.clientY)}
                    onMouseMove={(event) => updateDrag(event.clientX, event.clientY)}
                    onMouseUp={(event) => finishDrag(event.clientX, event.clientY)}
                    onMouseLeave={cancelDrag}
                    onTouchStart={(event) => beginDrag(event.touches[0].clientX, event.touches[0].clientY)}
                    onTouchMove={(event) => {
                      const touch = event.touches[0];
                      if (touch) updateDrag(touch.clientX, touch.clientY);
                    }}
                    onTouchEnd={(event) => {
                      const touch = event.changedTouches[0];
                      if (touch) finishDrag(touch.clientX, touch.clientY);
                    }}
                  >
                    <img src={activePage.imageUrl} alt={`PDF page ${activePage.pageNumber}`} className="block h-auto w-full select-none" draggable={false} />

                    {draftHighlight && draftHighlight.width > 0 && draftHighlight.height > 0 ? (
                      <div
                        className="pointer-events-none absolute border border-slate-500 mix-blend-multiply"
                        style={{
                          backgroundColor: cssColor(draftHighlight.color, HIGHLIGHT_OPACITY),
                          left: `${(draftHighlight.x / activePage.width) * 100}%`,
                          top: `${(draftHighlight.y / activePage.height) * 100}%`,
                          width: `${(draftHighlight.width / activePage.width) * 100}%`,
                          height: `${(draftHighlight.height / activePage.height) * 100}%`,
                        }}
                      />
                    ) : null}

                    {activePage.highlights.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => removeHighlight(item.id)}
                        className="group absolute border border-transparent mix-blend-multiply transition hover:border-slate-600"
                        style={{
                          backgroundColor: cssColor(item.color, HIGHLIGHT_OPACITY),
                          left: `${(item.x / activePage.width) * 100}%`,
                          top: `${(item.y / activePage.height) * 100}%`,
                          width: `${(item.width / activePage.width) * 100}%`,
                          height: `${(item.height / activePage.height) * 100}%`,
                        }}
                        title="Click to remove this highlight"
                      >
                        <span className="absolute right-1 top-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 opacity-0 transition group-hover:opacity-100">
                          Remove
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  Use this tool to mark key text, comments, clauses, or totals before sharing a PDF with clients or teammates.
                </div>

                {downloadUrl ? (
                  <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
                    Highlighted PDF ready. File size: {formatBytes(downloadSize)}.
                    {notice ? <span className="mt-1 block text-amber-700">{notice}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
