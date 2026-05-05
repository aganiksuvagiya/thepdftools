"use client";

import { useEffect, useRef } from "react";

type AdsterraZoneProps = {
  optionsScript?: string;
  scriptSrc: string;
  className?: string;
};

export default function AdsterraZone({
  optionsScript,
  scriptSrc,
  className = "",
}: AdsterraZoneProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    host.innerHTML = "";

    if (optionsScript) {
      const optionsTag = document.createElement("script");
      optionsTag.text = optionsScript;
      host.appendChild(optionsTag);
    }

    const invokeScript = document.createElement("script");
    invokeScript.async = true;
    invokeScript.src = scriptSrc;
    host.appendChild(invokeScript);

    return () => {
      host.innerHTML = "";
    };
  }, [optionsScript, scriptSrc]);

  return (
    <div className={className}>
      <div
        ref={hostRef}
        className="mx-auto min-h-[60px] w-full overflow-hidden"
      />
    </div>
  );
}
