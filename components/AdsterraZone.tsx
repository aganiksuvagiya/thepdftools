"use client";

import { useEffect, useRef } from "react";

type AdsterraZoneProps = {
  scriptSrc: string;
  className?: string;
  minHeightClassName?: string;
};

export default function AdsterraZone({
  scriptSrc,
  className = "",
  minHeightClassName = "min-h-[90px]",
}: AdsterraZoneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = scriptSrc;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [scriptSrc]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className={`mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${minHeightClassName}`}
      />
    </div>
  );
}
