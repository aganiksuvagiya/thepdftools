"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const primaryLinks = [
  { href: "/image-compressor", label: "Compress" },
  { href: "/background-remover", label: "BG Remove" },
  { href: "/image-resizer", label: "Resize" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/pdf-merge", label: "PDF Merge" },
];

const categories = [
  {
    label: "Image Tools",
    items: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/image-cropper", label: "Image Cropper" },
      { href: "/jpg-to-png", label: "JPG to PNG" },
      { href: "/png-to-jpg", label: "PNG to JPG" },
      { href: "/image-to-webp", label: "Image to WebP" },
      { href: "/background-remover", label: "Background Remover" },
      { href: "/image-upscaler", label: "AI Upscaler" },
      { href: "/image-watermark", label: "Image Watermark" },
      { href: "/image-rotate", label: "Rotate & Flip" },
      { href: "/svg-to-png", label: "SVG to PNG" },
      { href: "/heic-to-jpg", label: "HEIC to JPG" },
      { href: "/video-to-gif", label: "Video to GIF" },
    ],
  },
  {
    label: "PDF Tools",
    items: [
      { href: "/pdf-editor", label: "PDF Editor" },
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-split", label: "PDF Split" },
      { href: "/pdf-to-image", label: "PDF to Image" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/screenshot-to-pdf", label: "Screenshot to PDF" },
      { href: "/ppt-to-pdf", label: "PPTX to PDF" },
      { href: "/word-to-pdf", label: "Word to PDF" },
      { href: "/excel-to-pdf", label: "Excel to PDF" },
      { href: "/html-to-pdf", label: "HTML to PDF" },
      { href: "/pdf-compress", label: "PDF Compress" },
      { href: "/pdf-unlock", label: "PDF Unlock" },
      { href: "/pdf-to-excel", label: "PDF to Excel" },
      { href: "/pdf-redaction", label: "PDF Redaction" },
      { href: "/pdf-compare", label: "PDF Compare" },
      { href: "/ai-invoice-extractor", label: "AI Invoice Extractor" },
      { href: "/scanned-pdf-to-searchable-pdf", label: "Searchable PDF OCR" },
      { href: "/image-to-pdf", label: "Image to PDF" },
      { href: "/text-to-pdf", label: "Text to PDF" },
      { href: "/markdown-to-pdf", label: "Markdown to PDF" },
      { href: "/invoice-generator", label: "Invoice Generator" },
    ],
  },
  {
    label: "Utilities",
    items: [
      { href: "/qr-generator", label: "QR Generator" },
      { href: "/color-picker", label: "Color Picker" },
      { href: "/base64", label: "Base64" },
      { href: "/word-counter", label: "Word Counter" },
      { href: "/json-formatter", label: "JSON Formatter" },
      { href: "/lorem-ipsum", label: "Lorem Ipsum" },
      { href: "/csv-to-json", label: "CSV to JSON" },
    ],
  },
];

function hasActivePath(pathname: string, hrefs: string[]) {
  return hrefs.includes(pathname);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolQuery, setToolQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!categoriesOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [categoriesOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const categoryHrefs = categories.flatMap((c) => c.items.map((i) => i.href));
  const filteredTools = categories
    .flatMap((category) =>
      category.items.map((item) => ({ ...item, category: category.label }))
    )
    .filter((item) =>
      item.label.toLowerCase().includes(toolQuery.trim().toLowerCase())
    )
    .slice(0, 8);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-nav border-b border-slate-200/80 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-80 sm:gap-3">
            <Image
              src="/logo.svg"
              alt="thepdftools free online PDF tools no upload"
              width={80}
              height={30}
              className="h-7 w-auto"
              style={{ width: "auto", height: "28px" }}
              priority
            />
            <span className="text-[15px] font-bold tracking-tight text-slate-900"></span>
          </Link>

          {/* Desktop nav — single nav, responsive link visibility */}
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur lg:flex">
            {primaryLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-all duration-150 xl:px-3.5",
                  // Hide 4th and 5th link on lg, show on xl
                  idx >= 3 && "hidden xl:block",
                  pathname === link.href
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories / All Tools dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesOpen((v) => !v)}
                className={clsx(
                  "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-all duration-150 xl:px-3.5",
                  hasActivePath(pathname, categoryHrefs) &&
                    !hasActivePath(
                      pathname,
                      primaryLinks.map((l) => l.href)
                    )
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <span className="xl:hidden">All Tools</span>
                <span className="hidden xl:inline">Categories</span>
                <svg
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform",
                    categoriesOpen && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {categoriesOpen && (
                <div className="absolute right-0 mt-3 w-[min(680px,calc(100vw-2rem))] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)] sm:p-5">
                  <div className="grid grid-cols-3 gap-4 sm:gap-5">
                    {categories.map((category) => (
                      <div key={category.label}>
                        <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {category.label}
                        </div>
                        <div className="mt-2 space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setCategoriesOpen(false)}
                              className={clsx(
                                "block rounded-xl px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-3 sm:py-2.5",
                                pathname === item.href
                                  ? "bg-brand-50 text-brand-700"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="relative hidden xl:block">
            <label className="sr-only" htmlFor="tool-search">
              Search tools
            </label>
            <input
              id="tool-search"
              value={toolQuery}
              onChange={(event) => setToolQuery(event.target.value)}
              placeholder="Search tools"
              className="h-10 w-44 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:w-56 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
            {toolQuery.trim() && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-2 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
                {filteredTools.length ? (
                  filteredTools.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-700"
                    >
                      <span>{item.label}</span>
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        {item.category}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-500">
                    No matching tools yet.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger — below lg */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:h-10 sm:w-10 lg:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span
                className={clsx(
                  "block h-0.5 w-4 rounded bg-current transition-all duration-200",
                  mobileOpen && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-4 rounded bg-current transition-all duration-200",
                  mobileOpen && "-translate-y-[3px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/20 backdrop-blur-sm sm:top-16 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-x-0 top-14 z-50 overflow-y-auto transition-all duration-300 sm:top-16 lg:hidden",
          mobileOpen
            ? "max-h-[calc(100dvh-3.5rem)] opacity-100 sm:max-h-[calc(100dvh-4rem)]"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-5">
          <div className="space-y-3 rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-lg sm:space-y-4 sm:rounded-[1.5rem] sm:p-4">
            <div>
              <label className="sr-only" htmlFor="mobile-tool-search">
                Search tools
              </label>
              <input
                id="mobile-tool-search"
                value={toolQuery}
                onChange={(event) => setToolQuery(event.target.value)}
                placeholder="Search tools"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              {toolQuery.trim() && (
                <div className="mt-2 grid grid-cols-1 gap-1.5">
                  {filteredTools.length ? (
                    filteredTools.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {item.label}
                      </Link>
                    ))
                  ) : (
                    <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
                      No matching tools yet.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quick Links
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "rounded-xl px-2.5 py-2 text-center text-[12px] font-medium transition-colors sm:px-3 sm:py-2.5 sm:text-[13px]",
                      pathname === link.href
                        ? "bg-brand-600 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Category sections */}
            {categories.map((category) => (
              <div key={category.label}>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {category.label}
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        "rounded-xl px-2.5 py-2 text-[12px] font-medium transition-colors sm:px-3 sm:py-2.5 sm:text-[13px]",
                        pathname === item.href
                          ? "bg-brand-600 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
