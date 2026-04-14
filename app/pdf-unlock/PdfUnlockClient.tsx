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

type Stage = "idle" | "checking" | "ready" | "needs-password" | "unlocking" | "done" | "error";

async function loadPdfjsLib() {
  const lib = await (Function(`return import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.mjs")`)() as Promise<any>);
  lib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs";
  return lib;
}

function copyFileBuffer(buffer: ArrayBuffer) {
  return buffer.slice(0);
}

function toArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

function getPasswordMessage(error: any) {
  return error?.name === "PasswordException" || /password/i.test(error?.message || "");
}

export default function PdfUnlockClient() {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [pageCount, setPageCount] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setStage("idle");
    setPageCount(0);
    setPassword("");
    setPasswordError("");
    setProgress("");
    setError("");
    setResultUrl(null);
    setResultSize(0);
  };

  const checkPdf = useCallback(async (f: File) => {
    setStage("checking");
    setProgress("Checking PDF...");
    setError("");

    try {
      const buffer = await f.arrayBuffer();
      const pdfjsLib = await loadPdfjsLib();

      try {
        const pdf = await pdfjsLib.getDocument({ data: copyFileBuffer(buffer) }).promise;
        setPageCount(pdf.numPages);
        await pdf.destroy();
        setStage("ready");
        setProgress("");
      } catch (e: any) {
        if (getPasswordMessage(e)) {
          setStage("needs-password");
          setProgress("");
          setTimeout(() => passwordInputRef.current?.focus(), 100);
        } else {
          throw e;
        }
      }
    } catch (err: any) {
      setStage("error");
      setError(err?.message || "Failed to read PDF. Please try another file.");
    }
  }, []);

  const saveUnlockedPdf = useCallback((bytes: Uint8Array, numPages: number) => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    const blob = new Blob([toArrayBuffer(bytes)], { type: "application/pdf" });
    setResultUrl(URL.createObjectURL(blob));
    setResultSize(blob.size);
    setPageCount(numPages);
    setStage("done");
    setProgress("");
  }, [resultUrl]);

  const unlockWithPdfLib = useCallback(async (buffer: ArrayBuffer) => {
    const { PDFDocument } = await import("pdf-lib");
    const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(srcDoc, srcDoc.getPageIndices());
    copiedPages.forEach((page) => newPdf.addPage(page));
    return {
      bytes: await newPdf.save(),
      numPages: copiedPages.length,
    };
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    checkPdf(f);
  }, [checkPdf]);

  const handleUnlock = useCallback(async (pwd?: string) => {
    if (!file) return;
    setStage("unlocking");
    setPasswordError("");
    setError("");

    try {
      const buffer = await file.arrayBuffer();

      if (!pwd) {
        setProgress("Removing restrictions...");
        const { bytes, numPages } = await unlockWithPdfLib(copyFileBuffer(buffer));
        saveUnlockedPdf(bytes, numPages);
        return;
      }

      const pdfjsLib = await loadPdfjsLib();

      setProgress("Loading PDF...");

      // Load with password if provided
      const loadParams: any = { data: copyFileBuffer(buffer) };
      if (pwd) loadParams.password = pwd;

      let pdfDoc: any;
      try {
        pdfDoc = await pdfjsLib.getDocument(loadParams).promise;
      } catch (e: any) {
        if (getPasswordMessage(e)) {
          setStage("needs-password");
          setPasswordError("Incorrect password. Please try again.");
          setProgress("");
          setTimeout(() => passwordInputRef.current?.focus(), 100);
          return;
        }
        throw e;
      }

      const numPages = pdfDoc.numPages;
      setPageCount(numPages);

      setProgress("Removing restrictions...");

      // Render each page to canvas then embed as image in new PDF
      const { PDFDocument } = await import("pdf-lib");
      const newPdf = await PDFDocument.create();

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Processing page ${i} of ${numPages}...`);
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgBytes = await fetch(imgData).then((r) => r.arrayBuffer());
        const img = await newPdf.embedJpg(imgBytes);

        const pw = viewport.width / 2;
        const ph = viewport.height / 2;
        const newPage = newPdf.addPage([pw, ph]);
        newPage.drawImage(img, { x: 0, y: 0, width: pw, height: ph });
      }

      setProgress("Saving unlocked PDF...");
      const pdfBytes = await newPdf.save();
      await pdfDoc.destroy();
      saveUnlockedPdf(pdfBytes, numPages);
    } catch (err: any) {
      setStage("error");
      setError(err?.message || "Failed to unlock PDF.");
      setProgress("");
    }
  }, [file, saveUnlockedPdf, unlockWithPdfLib]);

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}_unlocked.pdf`;
    a.click();
  };

  // ── UI ──────────────────────────────────────────────────────────────────

  if (stage === "idle") {
    return (
      <DropZone
        onFilesAccepted={handleFiles}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop your PDF here"
        sublabel="Password-protected or restricted PDFs · Click to browse"
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* File info */}
      <div className="card p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800 truncate max-w-xs">{file?.name}</p>
          <p className="text-xs text-gray-500">
            {formatBytes(file?.size ?? 0)}
            {pageCount > 0 && <> &middot; {pageCount} page{pageCount !== 1 ? "s" : ""}</>}
            {stage === "needs-password" && (
              <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Password Protected
              </span>
            )}
            {stage === "ready" && (
              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                Ready
              </span>
            )}
          </p>
        </div>
        <button onClick={reset} className="btn-secondary text-sm">Change file</button>
      </div>

      {/* Checking */}
      {stage === "checking" && (
        <div className="card p-6 flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-violet-600" />
          <p className="text-sm text-gray-500">Checking PDF...</p>
        </div>
      )}

      {/* Ready - no password needed */}
      {stage === "ready" && (
        <div className="space-y-4">
          <div className="card p-4 bg-blue-50 border-blue-100">
            <p className="text-sm text-blue-700 font-medium">PDF loaded successfully</p>
            <p className="text-xs text-blue-500 mt-1">Click below to remove all restrictions (printing, copying, editing).</p>
          </div>
          <button onClick={() => handleUnlock()} className="btn-primary w-full">
            Remove Restrictions
          </button>
        </div>
      )}

      {/* Password required */}
      {stage === "needs-password" && (
        <div className="space-y-4">
          <div className="card p-4 bg-amber-50 border-amber-100">
            <p className="text-sm text-amber-700 font-medium">Password Required</p>
            <p className="text-xs text-amber-600 mt-1">This PDF is password-protected. Enter the password to unlock it.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">PDF Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter" && password) handleUnlock(password); }}
              placeholder="Enter PDF password..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
          </div>
          <button
            onClick={() => password && handleUnlock(password)}
            disabled={!password}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock PDF
          </button>
        </div>
      )}

      {/* Unlocking progress */}
      {stage === "unlocking" && (
        <div className="card p-6 text-center space-y-3">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-violet-600" />
          <p className="text-sm text-gray-500">{progress}</p>
        </div>
      )}

      {/* Done */}
      {stage === "done" && (
        <div className="space-y-4">
          <div className="card p-4 bg-green-50 border-green-100">
            <p className="text-sm font-semibold text-green-700">PDF Unlocked Successfully!</p>
            <p className="mt-1 text-xs text-green-600">
              {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(resultSize)}
            </p>
          </div>
          <button onClick={handleDownload} className="btn-primary w-full">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Unlocked PDF
          </button>
          <button onClick={reset} className="btn-secondary w-full">Unlock Another PDF</button>
        </div>
      )}

      {/* Error */}
      {stage === "error" && (
        <div className="space-y-4">
          <div className="card p-4 bg-red-50 border-red-100 text-sm text-red-600">
            {error}
          </div>
          <button onClick={reset} className="btn-secondary w-full">Try Another File</button>
        </div>
      )}
    </div>
  );
}
