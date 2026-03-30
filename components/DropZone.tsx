"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

interface DropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
}

export default function DropZone({
  onFilesAccepted,
  accept,
  multiple = false,
  label = "Drop your file here",
  sublabel = "or click to browse",
  disabled = false,
}: DropZoneProps) {
  const [ripple, setRipple] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setRipple(true);
        setTimeout(() => setRipple(false), 600);
        onFilesAccepted(acceptedFiles);
      }
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ onDrop, accept, multiple, disabled });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-300",
        isDragActive && !isDragReject && "border-brand-400 bg-brand-50 scale-[1.01]",
        isDragReject && "border-red-400 bg-red-50",
        !isDragActive && !isDragReject && "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50",
        disabled && "cursor-not-allowed opacity-50",
        ripple && "animate-[pulse_0.5s_ease-out]"
      )}
    >
      <input {...getInputProps()} />

      <div
        className={clsx(
          "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
          isDragActive && !isDragReject && "bg-brand-100 scale-110",
          isDragReject && "bg-red-100",
          !isDragActive && !isDragReject && "bg-white shadow-sm group-hover:shadow group-hover:scale-105"
        )}
      >
        {isDragReject ? (
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className={clsx(
              "h-6 w-6 transition-all duration-300",
              isDragActive ? "text-brand-600 -translate-y-1" : "text-gray-400 group-hover:text-gray-600"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        )}
      </div>

      <p className={clsx(
        "mt-4 text-sm font-semibold",
        isDragActive && !isDragReject && "text-brand-700",
        isDragReject && "text-red-600",
        !isDragActive && !isDragReject && "text-gray-600"
      )}>
        {isDragReject ? "File type not supported" : isDragActive ? "Release to upload" : label}
      </p>
      {!isDragActive && (
        <p className="mt-1 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}
