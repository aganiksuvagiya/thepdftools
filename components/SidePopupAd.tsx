"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SidePopupAd() {
  const pathname = usePathname();

  useEffect(() => {
    const existing = document.getElementById("profitable-ad-script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "profitable-ad-script";
    script.src =
      "https://pl29326575.profitablecpmratenetwork.com/d7/ee/d5/d7eed5555f86f85f375c72554f939983.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById("profitable-ad-script");
      if (s) s.remove();
    };
  }, [pathname]);

  return null;
}
