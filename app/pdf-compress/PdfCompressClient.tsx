"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import ResultPreview from "./ResultPreview";
import {
  RASTER_LEVELS,
  smartCompress,
  rasterCompress,
  type CompressLevel,
  type SmartResult,
} from "@/lib/pdf-compress-engine";
import { compressToTarget, type PageStyle } from "@/lib/pdf-target-compress";

interface PdfInfo {
  bytes: Uint8Array;
  size: number;
  name: string;
  method?: string;
  /** advice shown under the result, when it needs any */
  warning?: string;
}

function smartMethod(smart: SmartResult): string {
  return smart.imagesTotal > 0
    ? `Re-encoded ${smart.imagesShrunk} of ${smart.imagesTotal} embedded images. Text is still selectable.`
    : "Rebuilt the PDF structure. Text is still selectable.";
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function SizeBadge({
  label,
  size,
  highlight,
}: {
  label: string;
  size: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight
          ? "bg-brand-50 border border-brand-100"
          : "bg-gray-50"
      }`}
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-bold ${
          highlight ? "text-brand-700" : "text-gray-700"
        }`}
      >
        {formatBytes(size)}
      </p>
    </div>
  );
}

const LEVEL_CONFIG: Record<CompressLevel, { label: string; desc: string }> = {
  1: { label: "Light", desc: "Slight compression: embedded images are re-encoded at high quality. Text stays sharp." },
  2: { label: "Medium", desc: "Balanced compression: images are downscaled and re-encoded. Text stays selectable." },
  3: { label: "Maximum", desc: "Aggressive compression: smallest images, reduced picture quality. Text stays selectable." },
};

const PAGE_STYLES: { id: PageStyle; label: string; desc: string }[] = [
  {
    id: "auto",
    label: "Auto",
    desc: "Best for most files. Colour is kept when it fits. If it does not, text pages become sharp black and white and photos stay in colour.",
  },
  {
    id: "colour",
    label: "Colour",
    desc: "Keeps colour on every page. With many pages, small text turns blurry sooner.",
  },
  {
    id: "bw",
    label: "Black & white",
    desc: "Every page becomes a sharp black-and-white image, so text is no longer selectable. Best for scanned documents. Photos and stamps turn grey.",
  },
];

export default function PdfCompressClient({ targetKB }: { targetKB?: number } = {}) {
  const [original, setOriginal] = useState<PdfInfo | null>(null);
  const [compressed, setCompressed] = useState<PdfInfo | null>(null);
  const [level, setLevel] = useState<CompressLevel>(2);
  const [flatten, setFlatten] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [noGain, setNoGain] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageStyle, setPageStyle] = useState<PageStyle>("auto");
  const [alreadySmall, setAlreadySmall] = useState(false);

  const targetBytes = targetKB ? targetKB * 1024 : 0;

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setCompressed(null);
    setNoGain(false);
    setAlreadySmall(false);
    setError(null);
    setProgress(0);
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      setOriginal({ bytes, size: bytes.byteLength, name: file.name });
    };
    reader.readAsArrayBuffer(file);
  }, []);

  // Size-target pages: keep the text if shrinking the pictures is enough, otherwise turn pages into images.
  const compressForTarget = async (file: PdfInfo): Promise<Omit<PdfInfo, "size" | "name"> | null> => {
    let kept: SmartResult | null = null;
    // Black and white was asked for explicitly, so the original colour pictures are not an option then.
    if (pageStyle !== "bw") {
      const attempt = async (lvl: CompressLevel) => {
        setStage(`Optimizing images (${LEVEL_CONFIG[lvl].label})...`);
        setProgress(0);
        return smartCompress(file.bytes, lvl, setProgress);
      };
      const fits = (smart: SmartResult) => smart.bytes.byteLength <= targetBytes;
      // Strongest first: when even that is too big, the gentler levels cannot fit either.
      kept = await attempt(3);
      if (fits(kept)) {
        for (const lvl of [1, 2] as CompressLevel[]) {
          const gentler = await attempt(lvl);
          if (fits(gentler)) {
            kept = gentler;
            break;
          }
        }
        return { bytes: kept.bytes, method: smartMethod(kept) };
      }
    }

    const result = await compressToTarget(file.bytes, targetBytes, pageStyle, (count, pct) => {
      setStage(`Finding the clearest version (try ${count})...`);
      setProgress(pct);
    });
    const colourNote =
      result.bwPages === 0
        ? ""
        : result.pages === 1
          ? " The page is black and white."
          : ` ${result.bwPages} of ${result.pages} pages are black and white.`;
    const method = `Pages were converted to images.${colourNote} Text is no longer selectable.`;

    if (result.fits) {
      return {
        bytes: result.bytes,
        method,
        warning: result.hardToRead
          ? `It is under ${targetKB} KB, but small text may be hard to read. Check the preview before you upload it. Fewer pages give a clearer result.`
          : undefined,
      };
    }

    // Nothing fits. Offer the smaller of the two readable versions and say what would work.
    const useKept = !!kept && kept.bytes.byteLength < result.bytes.byteLength;
    const bytes = useKept ? kept!.bytes : result.bytes;
    if (bytes.byteLength >= file.size) return null;
    const room = Math.max(1, Math.floor((result.pages * targetBytes) / bytes.byteLength));
    const advice =
      result.pages > 1
        ? `About ${room} ${room === 1 ? "page fits" : "pages fit"} in ${targetKB} KB while staying readable. Split the file with the PDF Split tool and compress each part.`
        : "Try Black & white, or scan the page again at a lower resolution.";
    return {
      bytes,
      method: useKept ? smartMethod(kept!) : method,
      warning: `The smallest readable result is ${formatBytes(bytes.byteLength)}, which is still above ${targetKB} KB. ${
        pageStyle === "colour" ? "Black & white may make it much smaller. " : ""
      }${advice}`,
    };
  };

  // General compressor: one pass at the chosen level.
  const compressAtLevel = async (file: PdfInfo): Promise<Omit<PdfInfo, "size" | "name"> | null> => {
    setStage(`Optimizing images (${LEVEL_CONFIG[level].label})...`);
    const smart = await smartCompress(file.bytes, level, setProgress);
    let best = { bytes: smart.bytes, method: smartMethod(smart) };
    if (flatten) {
      setStage("Converting pages to images...");
      setProgress(0);
      const flat = await rasterCompress(file.bytes, RASTER_LEVELS[level].scale, RASTER_LEVELS[level].quality, setProgress);
      if (flat.byteLength < best.bytes.byteLength) {
        best = { bytes: flat, method: "Pages were converted to images. Text is no longer selectable." };
      }
    }
    return best.bytes.byteLength < file.size ? best : null;
  };

  const handleCompress = async () => {
    if (!original) return;
    setError(null);
    setProgress(0);
    setCompressed(null);
    setNoGain(false);
    setAlreadySmall(false);
    if (targetBytes && original.size <= targetBytes) {
      setAlreadySmall(true);
      return;
    }
    setLoading(true);

    try {
      const found = targetBytes ? await compressForTarget(original) : await compressAtLevel(original);
      if (found) {
        setCompressed({
          ...found,
          size: found.bytes.byteLength,
          name: original.name.replace(/\.pdf$/i, "") + "-compressed.pdf",
        });
      } else {
        setNoGain(true);
      }
    } catch (err) {
      console.error("PDF compression error:", err);
      setError(`Compression failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
      setStage("");
    }
  };

  const handleDownload = () => {
    if (!compressed) return;
    const blob = new Blob([compressed.bytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressed.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const reduction =
    original && compressed
      ? Math.round((1 - compressed.size / original.size) * 100)
      : null;

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop your PDF here"
        sublabel="PDF files only · Click to browse"
      />

      {original && (
        <>
          {targetKB ? (
            <div className="space-y-3">
              <p className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
                Target: under <strong>{targetKB} KB</strong>. The tool first shrinks the pictures and keeps text
                selectable. If that is not enough, it turns pages into images and picks the clearest quality that fits.
              </p>
              <div>
                <p id="page-style-label" className="text-sm font-medium text-gray-700">
                  Page style
                </p>
                <div role="radiogroup" aria-labelledby="page-style-label" className="mt-2 grid grid-cols-3 gap-2">
                  {PAGE_STYLES.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={pageStyle === option.id}
                      disabled={loading}
                      onClick={() => {
                        setPageStyle(option.id);
                        setCompressed(null);
                        setNoGain(false);
                      }}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
                        pageStyle === option.id
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-gray-200 text-gray-600 hover:border-brand-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">{PAGE_STYLES.find((o) => o.id === pageStyle)?.desc}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Compression level slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Compression Level
                  </label>
                  <span className="text-sm font-semibold text-brand-600">
                    {LEVEL_CONFIG[level].label}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={1}
                  value={level}
                  onChange={(e) => {
                    setLevel(parseInt(e.target.value) as CompressLevel);
                    setCompressed(null);
                    setNoGain(false);
                  }}
                  className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Light</span>
                  <span>Medium</span>
                  <span>Maximum</span>
                </div>
              </div>

              {/* Compression level description */}
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                {LEVEL_CONFIG[level].desc}
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={flatten}
                  onChange={(e) => {
                    setFlatten(e.target.checked);
                    setCompressed(null);
                    setNoGain(false);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600"
                />
                <span>
                  <span className="font-medium">Convert pages to images (scanned PDFs)</span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    Gives the smallest file for scans and photo-only PDFs. Text, links and forms are lost, so leave this off
                    for resumes, contracts and fillable forms.
                  </span>
                </span>
              </label>
            </>
          )}

          <button
            onClick={handleCompress}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {stage || "Compressing..."} {progress}%
              </>
            ) : (
              "Compress PDF"
            )}
          </button>

          {/* Progress bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Size comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SizeBadge label="Original Size" size={original.size} />
            {compressed ? (
              <SizeBadge
                label="Compressed Size"
                size={compressed.size}
                highlight
              />
            ) : (
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Compressed Size
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {loading ? `Processing... ${progress}%` : "Result will appear here"}
                </p>
              </div>
            )}
          </div>

          {/* Result summary */}
          {alreadySmall && (
            <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-medium text-green-800">
              This PDF is already under {targetKB} KB, so it does not need compressing. You can upload it as it is.
            </div>
          )}

          {noGain && (
            <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-sm font-medium text-yellow-800">
              No smaller version could be made. This PDF is already well optimized
              {flatten || targetKB ? "." : ", or it is mostly text. For a scanned PDF, tick “Convert pages to images” and try again."}
              {" "}Your original file is unchanged.
            </div>
          )}

          {reduction !== null && compressed && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-green-700">
                  {reduction}% smaller — saved {formatBytes(original.size - compressed.size)}
                </span>
              </div>
              {compressed.method && <p className="text-center text-xs text-gray-500">{compressed.method}</p>}
              {compressed.warning && (
                <p role="alert" className="rounded-lg bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
                  {compressed.warning}
                </p>
              )}
            </div>
          )}

          {compressed && targetKB ? <ResultPreview bytes={compressed.bytes} /> : null}

          {compressed && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Compressed PDF
            </button>
          )}
        </>
      )}
    </div>
  );
}
