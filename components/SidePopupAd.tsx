"use client";

import { useEffect, useRef, useState } from "react";

export default function SidePopupAd() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const optionsTag = document.createElement("script");
    optionsTag.text = `atOptions = {
  'key' : 'cc4425738f06f5ed0d6a50f38827eacf',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};`;
    host.appendChild(optionsTag);

    const invokeScript = document.createElement("script");
    invokeScript.async = true;
    invokeScript.src =
      "https://www.highperformanceformat.com/cc4425738f06f5ed0d6a50f38827eacf/invoke.js";
    host.appendChild(invokeScript);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-1">
      <button
        onClick={() => setVisible(false)}
        className="self-end rounded-full bg-slate-700/80 px-2 py-0.5 text-[11px] text-white hover:bg-slate-900"
        aria-label="Close ad"
      >
        ✕ Close
      </button>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div ref={hostRef} className="min-h-[90px] w-[728px] max-w-[calc(100vw-2rem)]" />
      </div>
    </div>
  );
}
