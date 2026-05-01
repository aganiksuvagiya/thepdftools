"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import DropZone from "@/components/DropZone";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function PdfProtectClient() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setResultUrl(null);
  }, []);

  const handleProtect = useCallback(async () => {
    if (!file) return;
    if (!password) { setError("Please enter a password."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 4) { setError("Password must be at least 4 characters."); return; }

    setProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const pdfBytes = await doc.save({
        userPassword: password,
        ownerPassword: password + "_owner",
        permissions: {
          printing: "lowResolution",
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: false,
        },
        encryptionKey: undefined,
      } as Parameters<typeof doc.save>[0]);

      const pdfOutput = Uint8Array.from(pdfBytes);
      const blob = new Blob([pdfOutput], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to protect PDF.");
    } finally {
      setProcessing(false);
    }
  }, [file, password, confirm]);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPassword("");
    setConfirm("");
    setResultUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone
          onFilesAccepted={handleFile}
          accept={{ "application/pdf": [".pdf"] }}
          label="Drop your PDF here"
          sublabel="or click to browse"
        />
      ) : (
        <>
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="btn-secondary text-sm">Change file</button>
          </div>

          {!resultUrl && (
            <div className="card p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
                <input
                  type={showPw ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
              {password && confirm && password !== confirm && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
                ⚠ Remember your password — encrypted PDFs cannot be recovered without it.
              </div>
              <button onClick={handleProtect} disabled={processing} className="btn-primary w-full">
                {processing ? "Encrypting…" : "Protect PDF"}
              </button>
            </div>
          )}

          {resultUrl && (
            <div className="card p-6 text-center space-y-4">
              <div className="text-green-600 font-semibold text-sm">✓ PDF protected successfully</div>
              <p className="text-xs text-gray-400">{formatBytes(resultSize)}</p>
              <a
                href={resultUrl}
                download={file.name.replace(/\.pdf$/i, "") + "_protected.pdf"}
                className="btn-primary inline-block"
              >
                Download Protected PDF
              </a>
              <div>
                <button onClick={reset} className="btn-secondary text-sm">Protect Another PDF</button>
              </div>
            </div>
          )}

          {error && (
            <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
          )}
        </>
      )}
    </div>
  );
}
