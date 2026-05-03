"use client";

import { useEffect, useRef } from "react";

type AdsterraZoneProps = {
  scriptSrc: string;
  containerId: string;
  className?: string;
};

export default function AdsterraZone({
  scriptSrc,
  containerId,
  className = "",
}: AdsterraZoneProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    host.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = scriptSrc;

    const container = document.createElement("div");
    container.id = containerId;

    host.appendChild(script);
    host.appendChild(container);

    return () => {
      host.innerHTML = "";
    };
  }, [containerId, scriptSrc]);

  return (
    <div className={className}>
      <div
        ref={hostRef}
        className="mx-auto min-h-[90px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      />
    </div>
  );
}
