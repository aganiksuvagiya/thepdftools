"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

const tools = [
  { href: "/image-compressor", label: "Compress" },
  { href: "/jpg-to-png", label: "JPG→PNG" },
  { href: "/png-to-jpg", label: "PNG→JPG" },
  { href: "/image-to-webp", label: "WebP" },
  { href: "/image-cropper", label: "Crop" },
  { href: "/image-resizer", label: "Resize" },
  { href: "/pdf-merge", label: "PDF Merge" },
  { href: "/background-remover", label: "BG Remove" },
];

const moreTools = [
  { href: "/image-rotate", label: "Rotate & Flip" },
  { href: "/image-watermark", label: "Watermark" },
  { href: "/image-upscaler", label: "AI Upscaler" },
  { href: "/pdf-to-image", label: "PDF to Image" },
  { href: "/pdf-split", label: "PDF Split" },
  { href: "/screenshot-to-pdf", label: "Screenshot to PDF" },
  { href: "/qr-generator", label: "QR Generator" },
  { href: "/color-picker", label: "Color Picker" },
  { href: "/base64", label: "Base64" },
  { href: "/word-counter", label: "Word Counter" },
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/lorem-ipsum", label: "Lorem Ipsum" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav border-b border-gray-200/50 shadow-sm" : "bg-white/0"
      )}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <span className="text-white text-sm font-black">P</span>
            </div>
            <span className="text-[15px] font-bold text-gray-900 hidden sm:block">
              thepdftools
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                  pathname === t.href
                    ? "bg-brand-600 text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {t.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className={clsx("block h-0.5 w-4 bg-gray-600 rounded transition-all duration-200", open && "rotate-45 translate-y-[3px]")} />
              <span className={clsx("block h-0.5 w-4 bg-gray-600 rounded transition-all duration-200", open && "-rotate-45 -translate-y-[3px]")} />
            </div>
          </button>
        </div>

        {/* Mobile */}
        <div className={clsx("lg:hidden overflow-hidden transition-all duration-300", open ? "max-h-[600px] pb-4" : "max-h-0")}>
          <div className="grid grid-cols-3 gap-1 pt-2">
            {[...tools, ...moreTools].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "px-3 py-2.5 rounded-lg text-[13px] font-medium text-center transition-all duration-150",
                  pathname === t.href
                    ? "bg-brand-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
