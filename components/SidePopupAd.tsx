"use client";

import { useEffect, useRef, useState } from "react";

export default function SidePopupAd() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pl29326575.profitablecpmratenetwork.com/d7/ee/d5/d7eed5555f86f85f375c72554f939983.js";
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-1 hidden">
      <button
        onClick={() => setVisible(false)}
        className="self-end rounded-full bg-slate-700/80 px-2 py-0.5 text-[11px] text-white hover:bg-slate-900"
        aria-label="Close ad"
      >
        ✕ Close
      </button>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div ref={hostRef} className="min-h-[60px] min-w-[200px]" />
      </div>
    </div>
  );
}
