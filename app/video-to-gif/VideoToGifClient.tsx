"use client";

import { useState, useCallback, useRef } from "react";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const FPS_OPTIONS = [5, 10, 15, 20];
const WIDTH_OPTIONS = [320, 480, 640, 800];

export default function VideoToGifClient() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifSize, setGifSize] = useState<number>(0);
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(480);
  const [quality, setQuality] = useState(10);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    setVideoFile(file);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setGifUrl(null);
    setGifSize(0);
    setError(null);
    setProgress(0);
    setStartTime(0);
    setDuration(0);
  }, [videoUrl, gifUrl]);

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      setVideoDuration(dur);
      if (duration === 0 || duration > dur) {
        setDuration(Math.min(dur, 5));
      }
    }
  };

  const handleConvert = async () => {
    if (!videoFile || !videoUrl || !videoRef.current) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setGifUrl(null);

    try {
      const { GIFEncoder, quantize, applyPalette } = await import("gifenc");

      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported in this browser.");

      const aspectRatio = video.videoHeight / video.videoWidth;
      const w = width;
      const h = Math.round(w * aspectRatio);
      canvas.width = w;
      canvas.height = h;

      const gif = GIFEncoder();
      const effectiveDuration = duration > 0 ? Math.min(duration, videoDuration - startTime) : videoDuration - startTime;
      const totalFrames = Math.ceil(effectiveDuration * fps);
      const delay = Math.round(1000 / fps);

      for (let i = 0; i < totalFrames; i++) {
        const time = startTime + i / fps;
        if (time > videoDuration) break;

        video.currentTime = time;
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
        });

        ctx.drawImage(video, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const { data } = imageData;

        const maxColors = Math.max(2, Math.min(256, Math.round(256 * (21 - quality) / 20)));
        const palette = quantize(data, maxColors);
        const index = applyPalette(data, palette);

        gif.writeFrame(index, w, h, {
          palette,
          delay,
          repeat: 0,
        });

        setProgress(Math.round(((i + 1) / totalFrames) * 100));
      }

      gif.finish();
      const output = gif.bytes();
      const blob = new Blob([new Uint8Array(output) as BlobPart], { type: "image/gif" });
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setGifSize(blob.size);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!gifUrl || !videoFile) return;
    const a = document.createElement("a");
    a.href = gifUrl;
    const baseName = videoFile.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.gif`;
    a.click();
  };

  return (
    <div className="card space-y-6">
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "video/*": [".mp4", ".webm", ".mov", ".avi"] }}
        label="Drop your video here"
        sublabel="MP4, WebM, MOV, or AVI · Click to browse"
      />

      {videoUrl && (
        <>
          {/* Video preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Video Preview</p>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                onLoadedMetadata={handleVideoLoaded}
                className="w-full max-h-64 object-contain"
              />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* FPS */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Frame Rate (FPS)
              </label>
              <div className="flex gap-2">
                {FPS_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFps(f)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      fps === f
                        ? "border-brand-300 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Width */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Output Width (px)
              </label>
              <div className="flex gap-2">
                {WIDTH_OPTIONS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWidth(w)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      width === w
                        ? "border-brand-300 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Quality
                </label>
                <span className="text-sm font-semibold text-brand-600">
                  {quality}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Best quality</span>
                <span>Smallest file</span>
              </div>
            </div>

            {/* Start time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Start Time (s)
                </label>
                <span className="text-sm font-semibold text-brand-600">
                  {startTime.toFixed(1)}s
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(0, videoDuration - 0.5)}
                step={0.1}
                value={startTime}
                onChange={(e) => setStartTime(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Duration (s)
                </label>
                <span className="text-sm font-semibold text-brand-600">
                  {duration.toFixed(1)}s
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={Math.max(0.5, videoDuration - startTime)}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-brand-600"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0.5s</span>
                <span>{Math.max(0.5, videoDuration - startTime).toFixed(1)}s</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Converting...</span>
                <span className="font-semibold text-brand-600">{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-secondary-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* GIF preview */}
          {gifUrl && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Generated GIF</p>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifUrl}
                  alt="Generated GIF"
                  className="w-full object-contain max-h-64 animate-fade-in"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="rounded-xl bg-brand-50 border border-brand-100 px-5 py-3 text-center">
                  <p className="text-xs text-brand-600">GIF Size</p>
                  <p className="font-semibold text-brand-700">{formatBytes(gifSize)}</p>
                </div>
                {videoFile && (
                  <div className="rounded-xl bg-gray-50 border border-gray-200 px-5 py-3 text-center">
                    <p className="text-xs text-gray-500">Original Video</p>
                    <p className="font-semibold text-gray-700">{formatBytes(videoFile.size)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleConvert}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Converting... {progress}%
              </>
            ) : (
              "Convert to GIF"
            )}
          </button>

          {gifUrl && (
            <button onClick={handleDownload} className="btn-secondary w-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download GIF
            </button>
          )}
        </>
      )}
    </div>
  );
}
