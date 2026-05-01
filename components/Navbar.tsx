"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type ToolItem = {
  href: string;
  label: string;
  icon: string;
};

type ToolSection = {
  label: string;
  items: ToolItem[];
};

type ToolColumn = {
  id: string;
  sections: ToolSection[];
};

const primaryLinks = [
  { href: "/image-compressor", label: "Compress" },
  { href: "/background-remover", label: "Background" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-editor", label: "Edit PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
];

const megaColumns: ToolColumn[] = [
  {
    id: "image",
    sections: [
      {
        label: "IMAGE TOOLS",
        items: [
          { href: "/image-compressor", label: "Image Compressor", icon: "compress" },
          { href: "/image-resizer", label: "Image Resizer", icon: "resize" },
          { href: "/image-cropper", label: "Image Cropper", icon: "crop" },
          { href: "/jpg-to-png", label: "JPG to PNG", icon: "image" },
          { href: "/png-to-jpg", label: "PNG to JPG", icon: "image" },
          { href: "/image-to-webp", label: "Image to WebP", icon: "spark" },
          { href: "/background-remover", label: "Background Remover", icon: "magic" },
          { href: "/image-upscaler", label: "AI Upscaler", icon: "spark" },
          { href: "/image-watermark", label: "Image Watermark", icon: "droplet" },
          { href: "/image-rotate", label: "Rotate & Flip", icon: "rotate" },
          { href: "/svg-to-png", label: "SVG to PNG", icon: "shape" },
          { href: "/heic-to-jpg", label: "HEIC to JPG", icon: "photo" },
          { href: "/video-to-gif", label: "Video to GIF", icon: "video" },
        ],
      },
    ],
  },
  {
    id: "organize",
    sections: [
      {
        label: "PDF ORGANIZE",
        items: [
          { href: "/pdf-merge", label: "PDF Merge", icon: "merge" },
          { href: "/pdf-split", label: "PDF Split", icon: "split" },
          { href: "/screenshot-to-pdf", label: "Screenshot to PDF", icon: "screen" },
          { href: "/image-to-pdf", label: "Image to PDF", icon: "photo" },
          { href: "/text-to-pdf", label: "Text to PDF", icon: "text" },
        ],
      },
      {
        label: "PDF OPTIMIZE",
        items: [
          { href: "/pdf-compress", label: "PDF Compress", icon: "compress" },
          { href: "/pdf-unlock", label: "PDF Unlock", icon: "unlock" },
        ],
      },
    ],
  },
  {
    id: "convert",
    sections: [
      {
        label: "PDF CONVERT",
        items: [
          { href: "/pdf-to-word", label: "PDF to Word", icon: "word" },
          { href: "/pdf-to-excel", label: "PDF to Excel", icon: "sheet" },
          { href: "/pdf-to-image", label: "PDF to Image", icon: "photo" },
          { href: "/word-to-pdf", label: "Word to PDF", icon: "word" },
          { href: "/excel-to-pdf", label: "Excel to PDF", icon: "sheet" },
          { href: "/ppt-to-pdf", label: "PPTX to PDF", icon: "slides" },
          { href: "/html-to-pdf", label: "HTML to PDF", icon: "code" },
        ],
      },
      {
        label: "PDF EDIT",
        items: [{ href: "/pdf-editor", label: "PDF Editor", icon: "edit" }],
      },
    ],
  },
  {
    id: "utility",
    sections: [
      {
        label: "UTILITIES",
        items: [
          { href: "/qr-generator", label: "QR Generator", icon: "qr" },
          { href: "/color-picker", label: "Color Picker", icon: "palette" },
          { href: "/base64", label: "Base64", icon: "code" },
          { href: "/word-counter", label: "Word Counter", icon: "text" },
          { href: "/json-formatter", label: "JSON Formatter", icon: "braces" },
          { href: "/csv-to-json", label: "CSV to JSON", icon: "table" },
          { href: "/lorem-ipsum", label: "Lorem Ipsum", icon: "paragraph" },
          { href: "/invoice-generator", label: "Invoice Generator", icon: "invoice" },
        ],
      },
      {
        label: "MORE PDF",
        items: [
          { href: "/pdf-redaction", label: "PDF Redaction", icon: "shield" },
          { href: "/pdf-compare", label: "PDF Compare", icon: "compare" },
          {
            href: "/scanned-pdf-to-searchable-pdf",
            label: "Searchable PDF OCR",
            icon: "scan",
          },
          { href: "/ai-invoice-extractor", label: "AI Invoice Extractor", icon: "spark" },
          { href: "/pdf-sign", label: "PDF Sign", icon: "sign" },
          { href: "/pdf-protect", label: "PDF Protect", icon: "lock" },
          { href: "/pdf-watermark", label: "PDF Watermark", icon: "droplet" },
          { href: "/pdf-rotate", label: "PDF Rotate", icon: "rotate" },
          { href: "/pdf-page-numbers", label: "PDF Page Numbers", icon: "numbers" },
          { href: "/markdown-to-pdf", label: "Markdown to PDF", icon: "markdown" },
          { href: "/pdf-to-ppt", label: "PDF to PPT", icon: "slides" },
          { href: "/pdf-ocr", label: "PDF OCR", icon: "scan" },
        ],
      },
    ],
  },
];

const allSections = megaColumns.flatMap((column) => column.sections);
const allTools = allSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, category: section.label }))
);

function hasActivePath(pathname: string, hrefs: string[]) {
  return hrefs.includes(pathname);
}

function ToolGlyph({ icon }: { icon: string }) {
  const base = "h-[15px] w-[15px]";

  switch (icon) {
    case "compress":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m16-5h-3m3 0v3M3 16v3a2 2 0 002 2h3m11-5v3a2 2 0 01-2 2h-3" />
        </svg>
      );
    case "resize":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5m11-5v5h-5" />
        </svg>
      );
    case "crop":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14" />
        </svg>
      );
    case "image":
    case "photo":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-1-1l1.5-1.5a2 2 0 012.8 0L20 15m-14 5h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm3-11h.01" />
        </svg>
      );
    case "spark":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
        </svg>
      );
    case "magic":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4l1.5 3.5L12 9l-3.5 1.5L7 14l-1.5-3.5L2 9l3.5-1.5L7 4zm10 6l1 2.5L20.5 13 18 14l-1 2.5L16 14l-2.5-1 2.5-.5L17 10zm-1 7h5" />
        </svg>
      );
    case "droplet":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c3 4 6 7 6 10a6 6 0 11-12 0c0-3 3-6 6-10z" />
        </svg>
      );
    case "rotate":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M20 10A8 8 0 006.3 5.3L4 10m16 4l-2.3 4.7A8 8 0 013 14" />
        </svg>
      );
    case "shape":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="7" cy="7" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5h7v7h-7zM5 14h6v6H5zM14 14l5 5" />
        </svg>
      );
    case "video":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.5-2.5v9L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      );
    case "merge":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h4v4M13 13h4v4M11 11l6 6M7 17V7" />
        </svg>
      );
    case "split":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16M16 4v16M4 8h4m0 8H4m12-8h4m-4 8h4" />
        </svg>
      );
    case "screen":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v10H4zM8 19h8" />
        </svg>
      );
    case "text":
    case "paragraph":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14M5 12h10M5 18h8" />
        </svg>
      );
    case "word":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5zM8 8l2 8 2-5 2 5 2-8" />
        </svg>
      );
    case "sheet":
    case "table":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4zM4 10h16M9 5v14M15 5v14" />
        </svg>
      );
    case "slides":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v10H4zM9 19h6M12 15v4" />
        </svg>
      );
    case "code":
    case "braces":
    case "markdown":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
        </svg>
      );
    case "edit":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z" />
        </svg>
      );
    case "qr":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14h3v3h-3zM14 17h3v3h-3z" />
        </svg>
      );
    case "palette":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18h1.2a1.8 1.8 0 001.8-1.8 1.8 1.8 0 011.8-1.8H18A3 3 0 0021 14a11 11 0 00-9-11z" />
          <circle cx="7.5" cy="10" r="1" />
          <circle cx="10" cy="7" r="1" />
          <circle cx="14" cy="7" r="1" />
        </svg>
      );
    case "invoice":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" />
        </svg>
      );
    case "shield":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V6l7-3z" />
        </svg>
      );
    case "compare":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4H5v16h4M15 4h4v16h-4M9 12h6" />
        </svg>
      );
    case "scan":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4H5a2 2 0 00-2 2v2m16-4h-2m2 0v2M7 20H5a2 2 0 01-2-2v-2m16 4h-2a2 2 0 01-2-2v-2M6 12h12" />
        </svg>
      );
    case "sign":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 17c2-2 4-3 6-3 2.5 0 3.5 2 6 2 1.5 0 2.8-.5 4-1.5M6 12l7-7 4 4-7 7H6v-4z" />
        </svg>
      );
    case "lock":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 0110 0v3m-9 0h8a2 2 0 012 2v6H6v-6a2 2 0 012-2z" />
        </svg>
      );
    case "unlock":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 019.8-1.4M8 11h8a2 2 0 012 2v6H6v-6a2 2 0 012-2z" />
        </svg>
      );
    case "numbers":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5L6 19M14 5l-2 14M4 10h14M3 15h14" />
        </svg>
      );
    default:
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" />
        </svg>
      );
  }
}

function ToolLink({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: ToolItem;
  active: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={clsx(
        "group flex items-center gap-3 rounded-2xl border border-transparent transition-all duration-200",
        compact ? "px-3 py-2.5" : "px-3.5 py-3",
        active
          ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
          : "text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950"
      )}
    >
      <span
        className={clsx(
          "flex shrink-0 items-center justify-center rounded-xl border transition-colors",
          compact ? "h-9 w-9" : "h-10 w-10",
          active
            ? "border-brand-200 bg-white text-brand-700"
            : "border-slate-200 bg-white text-slate-500 group-hover:border-slate-300 group-hover:text-brand-700"
        )}
      >
        <ToolGlyph icon={item.icon} />
      </span>
      <span className={clsx("font-medium tracking-tight", compact ? "text-[13px]" : "text-[13.5px]")}>
        {item.label}
      </span>
    </Link>
  );
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

  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!categoriesOpen) return;
    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [categoriesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const categoryHrefs = useMemo(() => allTools.map((item) => item.href), []);

  const filteredTools = allTools
    .filter((item) => item.label.toLowerCase().includes(toolQuery.trim().toLowerCase()))
    .slice(0, 12);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav border-b border-slate-200/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
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

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur lg:flex">
            {primaryLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-150",
                  idx >= 3 && "hidden xl:block",
                  pathname === link.href
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                onClick={() => setCategoriesOpen((value) => !value)}
                className={clsx(
                  "flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-150",
                  hasActivePath(pathname, categoryHrefs) &&
                    !hasActivePath(pathname, primaryLinks.map((item) => item.href))
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <span>All Tools</span>
                <svg
                  className={clsx("h-3.5 w-3.5 transition-transform duration-200", categoriesOpen && "rotate-180")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={clsx(
                  "absolute right-0 top-full pt-4 transition-all duration-200",
                  categoriesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
              >
                <div className="w-[min(1120px,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.28)]">
                  <div className="max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain p-5">
                    <div className="sticky top-0 z-10 mb-5 flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(248,250,252,0.96)_0%,rgba(238,244,255,0.98)_55%,rgba(248,250,252,0.96)_100%)] px-5 py-4 backdrop-blur">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-700">Mega Menu</p>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                          Every PDF and image workflow in one place
                        </h3>
                      </div>
                      <div className="hidden rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm xl:block">
                        Fast, private, browser-based tools
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5">
                      {megaColumns.map((column) => (
                        <div key={column.id} className="space-y-4 self-start">
                          {column.sections.map((section) => (
                            <div
                              key={section.label}
                              className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-3.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.2)]"
                            >
                              <div className="px-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                                {section.label}
                              </div>
                              <div className="mt-3 space-y-1.5">
                                {section.items.map((item) => (
                                  <ToolLink
                                    key={item.href}
                                    item={item}
                                    active={pathname === item.href}
                                    onClick={() => setCategoriesOpen(false)}
                                    compact
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
              className="h-10 w-44 rounded-xl border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:w-60 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
            {toolQuery.trim() && (
              <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-2 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
                {filteredTools.length ? (
                  filteredTools.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-700"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
                        <ToolGlyph icon={item.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.label}</span>
                        <span className="text-xs font-normal uppercase tracking-[0.16em] text-slate-400">
                          {item.category}
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-500">No matching tools yet.</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
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

      {mobileOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/20 backdrop-blur-sm sm:top-16 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={clsx(
          "fixed inset-x-0 top-14 z-50 overflow-y-auto transition-all duration-300 sm:top-16 lg:hidden",
          mobileOpen
            ? "max-h-[calc(100dvh-3.5rem)] opacity-100 sm:max-h-[calc(100dvh-4rem)]"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-5">
          <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-lg">
            <div className="rounded-[1.25rem] bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_55%,#f8fafc_100%)] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">All Tools</p>
              <p className="mt-1 text-sm text-slate-600">
                Professional PDF, image, and utility tools in a clean browser-first workspace.
              </p>
            </div>

            <div>
              <label className="sr-only" htmlFor="mobile-tool-search">
                Search tools
              </label>
              <input
                id="mobile-tool-search"
                value={toolQuery}
                onChange={(event) => setToolQuery(event.target.value)}
                placeholder="Search tools"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              {toolQuery.trim() && (
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {filteredTools.length ? (
                    filteredTools.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
                          <ToolGlyph icon={item.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{item.label}</span>
                          <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                            {item.category}
                          </span>
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
                      No matching tools yet.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Quick Links
              </div>
              <div className="grid grid-cols-2 gap-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "rounded-xl px-3 py-2.5 text-center text-[13px] font-medium transition-colors",
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

            {allSections.map((section) => (
              <div key={section.label} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/70 p-3">
                <div className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  {section.label}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <ToolLink
                      key={item.href}
                      item={item}
                      active={pathname === item.href}
                      onClick={() => setMobileOpen(false)}
                      compact
                    />
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
