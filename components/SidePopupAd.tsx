"use client";

import { useEffect } from "react";

export default function SidePopupAd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pl29326575.profitablecpmratenetwork.com/d7/ee/d5/d7eed5555f86f85f375c72554f939983.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
