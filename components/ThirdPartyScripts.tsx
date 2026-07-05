"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GTAG_SRC = "https://www.googletagmanager.com/gtag/js?id=G-NWTNKWJ1JF";

function isGtagFetchError(event: ErrorEvent | PromiseRejectionEvent) {
  const reason =
    "reason" in event
      ? event.reason
      : event.error ?? event.message;

  const message =
    typeof reason === "string"
      ? reason
      : reason instanceof Error
        ? reason.message
        : typeof reason?.message === "string"
          ? reason.message
          : "";

  const stack =
    reason instanceof Error
      ? reason.stack ?? ""
      : typeof reason?.stack === "string"
        ? reason.stack
        : "error" in event && typeof event.error?.stack === "string"
          ? event.error.stack
          : "";

  return (
    message.includes("Failed to fetch") &&
    (stack.includes("googletagmanager.com/gtag/js") ||
      stack.includes("chrome-extension://") ||
      stack.includes("frame_ant.js"))
  );
}

export default function ThirdPartyScripts({
  enableAnalytics,
}: {
  enableAnalytics: boolean;
}) {
  useEffect(() => {
    if (!enableAnalytics) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    const handleWindowError = (event: ErrorEvent) => {
      if (!isGtagFetchError(event)) return;
      event.preventDefault();
      console.warn("Suppressed third-party analytics fetch error.", event.error ?? event.message);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (!isGtagFetchError(event)) return;
      event.preventDefault();
      console.warn("Suppressed third-party analytics rejection.", event.reason);
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleRejection);

    const script = document.createElement("script");
    script.src = GTAG_SRC;
    script.async = true;
    script.onload = () => {
      try {
        window.gtag?.("js", new Date());
        window.gtag?.("config", "G-NWTNKWJ1JF");
      } catch (error) {
        console.warn("Analytics initialization failed.", error);
      }
    };
    script.onerror = () => {
      console.warn("Analytics script failed to load.");
    };

    document.head.appendChild(script);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleRejection);
      script.remove();
    };
  }, [enableAnalytics]);

  return null;
}
