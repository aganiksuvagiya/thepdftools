"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type DropdownItem = {
  href: string;
  label: string;
  icon: string;
  bg: string;
  fg: string;
};

type DropdownSection = {
  title: string;
  items: DropdownItem[];
};

type SearchTool = DropdownItem & {
  category: string;
};

const primaryLinks = [
  { href: "/pdf-compress", label: "Compress PDF" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-editor", label: "Edit PDF" },
  { href: "/pdf-highlight", label: "Highlight PDF" },
  { href: "/image-compressor", label: "Compress Image" },
];

const pdfSections: DropdownSection[] = [
  {
    title: "Organize & Optimize",
    items: [
      { href: "/pdf-merge", label: "PDF Merge", icon: "merge", bg: "bg-violet-100", fg: "text-violet-700" },
      { href: "/pdf-split", label: "PDF Split", icon: "split", bg: "bg-blue-100", fg: "text-blue-700" },
      { href: "/pdf-compress", label: "PDF Compress", icon: "compress", bg: "bg-emerald-100", fg: "text-emerald-700" },
      { href: "/pdf-protect", label: "PDF Protect", icon: "lock", bg: "bg-slate-100", fg: "text-slate-700" },
      { href: "/pdf-unlock", label: "PDF Unlock", icon: "unlock", bg: "bg-teal-100", fg: "text-teal-700" },
      { href: "/pdf-rotate", label: "PDF Rotate", icon: "rotate", bg: "bg-cyan-100", fg: "text-cyan-700" },
    ],
  },
  {
    title: "Convert & Create",
    items: [
      { href: "/image-to-pdf", label: "Image to PDF", icon: "photo", bg: "bg-sky-100", fg: "text-sky-700" },
      { href: "/word-to-pdf", label: "Word to PDF", icon: "word", bg: "bg-blue-100", fg: "text-blue-700" },
      { href: "/excel-to-pdf", label: "Excel to PDF", icon: "sheet", bg: "bg-green-100", fg: "text-green-700" },
      { href: "/ppt-to-pdf", label: "PPT to PDF", icon: "slides", bg: "bg-orange-100", fg: "text-orange-700" },
      { href: "/html-to-pdf", label: "HTML to PDF", icon: "code", bg: "bg-zinc-100", fg: "text-zinc-700" },
      { href: "/text-to-pdf", label: "Text to PDF", icon: "text", bg: "bg-amber-100", fg: "text-amber-700" },
      { href: "/markdown-to-pdf", label: "Markdown to PDF", icon: "markdown", bg: "bg-stone-100", fg: "text-stone-700" },
      { href: "/screenshot-to-pdf", label: "Screenshot to PDF", icon: "screen", bg: "bg-indigo-100", fg: "text-indigo-700" },
    ],
  },
  {
    title: "Edit & Review",
    items: [
      { href: "/pdf-to-word", label: "PDF to Word", icon: "word", bg: "bg-blue-100", fg: "text-blue-700" },
      { href: "/pdf-to-excel", label: "PDF to Excel", icon: "sheet", bg: "bg-green-100", fg: "text-green-700" },
      { href: "/pdf-to-ppt", label: "PDF to PPT", icon: "slides", bg: "bg-orange-100", fg: "text-orange-700" },
      { href: "/pdf-editor", label: "PDF Editor", icon: "edit", bg: "bg-amber-100", fg: "text-amber-700" },
      { href: "/pdf-highlight", label: "PDF Highlight", icon: "highlight", bg: "bg-yellow-100", fg: "text-yellow-700" },
      { href: "/pdf-sign", label: "PDF Sign", icon: "sign", bg: "bg-rose-100", fg: "text-rose-700" },
      { href: "/pdf-to-image", label: "PDF to Image", icon: "photo", bg: "bg-pink-100", fg: "text-pink-700" },
    ],
  },
  {
    title: "Security & OCR",
    items: [
      { href: "/pdf-watermark", label: "PDF Watermark", icon: "droplet", bg: "bg-sky-100", fg: "text-sky-700" },
      { href: "/pdf-redaction", label: "PDF Redaction", icon: "shield", bg: "bg-rose-100", fg: "text-rose-700" },
      { href: "/pdf-compare", label: "PDF Compare", icon: "compare", bg: "bg-slate-100", fg: "text-slate-700" },
      { href: "/pdf-page-numbers", label: "Page Numbers", icon: "numbers", bg: "bg-violet-100", fg: "text-violet-700" },
      { href: "/pdf-ocr", label: "PDF OCR", icon: "scan", bg: "bg-emerald-100", fg: "text-emerald-700" },
      { href: "/scanned-pdf-to-searchable-pdf", label: "Searchable PDF OCR", icon: "scan", bg: "bg-teal-100", fg: "text-teal-700" },
      { href: "/ai-invoice-extractor", label: "AI Invoice Extractor", icon: "spark", bg: "bg-fuchsia-100", fg: "text-fuchsia-700" },
    ],
  },
];

const imageSections: DropdownSection[] = [
  {
    title: "Edit & Enhance",
    items: [
      { href: "/image-compressor", label: "Image Compressor", icon: "compress", bg: "bg-blue-100", fg: "text-blue-700" },
      { href: "/image-resizer", label: "Image Resizer", icon: "resize", bg: "bg-violet-100", fg: "text-violet-700" },
      { href: "/image-cropper", label: "Image Cropper", icon: "crop", bg: "bg-indigo-100", fg: "text-indigo-700" },
      { href: "/background-remover", label: "Background Remover", icon: "magic", bg: "bg-purple-100", fg: "text-purple-700" },
      { href: "/image-upscaler", label: "AI Upscaler", icon: "spark", bg: "bg-pink-100", fg: "text-pink-700" },
      { href: "/image-watermark", label: "Image Watermark", icon: "droplet", bg: "bg-sky-100", fg: "text-sky-700" },
      { href: "/image-rotate", label: "Rotate & Flip", icon: "rotate", bg: "bg-teal-100", fg: "text-teal-700" },
    ],
  },
  {
    title: "Convert & Export",
    items: [
      { href: "/jpg-to-png", label: "JPG to PNG", icon: "image", bg: "bg-orange-100", fg: "text-orange-700" },
      { href: "/png-to-jpg", label: "PNG to JPG", icon: "image", bg: "bg-amber-100", fg: "text-amber-700" },
      { href: "/heic-to-jpg", label: "HEIC to JPG", icon: "photo", bg: "bg-rose-100", fg: "text-rose-700" },
      { href: "/image-to-webp", label: "Image to WebP", icon: "spark", bg: "bg-lime-100", fg: "text-lime-700" },
      { href: "/svg-to-png", label: "SVG to PNG", icon: "shape", bg: "bg-indigo-100", fg: "text-indigo-700" },
      { href: "/video-to-gif", label: "Video to GIF", icon: "video", bg: "bg-slate-100", fg: "text-slate-700" },
    ],
  },
  {
    title: "Generators",
    items: [
      { href: "/qr-generator", label: "QR Generator", icon: "qr", bg: "bg-teal-100", fg: "text-teal-700" },
      { href: "/invoice-generator", label: "Invoice Generator", icon: "invoice", bg: "bg-green-100", fg: "text-green-700" },
    ],
  },
];

const utilitySections: DropdownSection[] = [
  {
    title: "Quick Utilities",
    items: [
      { href: "/color-picker", label: "Color Picker", icon: "palette", bg: "bg-pink-100", fg: "text-pink-700" },
      { href: "/json-formatter", label: "JSON Formatter", icon: "braces", bg: "bg-slate-100", fg: "text-slate-700" },
      { href: "/csv-to-json", label: "CSV to JSON", icon: "table", bg: "bg-blue-100", fg: "text-blue-700" },
      { href: "/base64", label: "Base64", icon: "code", bg: "bg-zinc-100", fg: "text-zinc-700" },
      { href: "/word-counter", label: "Word Counter", icon: "text", bg: "bg-amber-100", fg: "text-amber-700" },
      { href: "/lorem-ipsum", label: "Lorem Ipsum", icon: "paragraph", bg: "bg-emerald-100", fg: "text-emerald-700" },
    ],
  },
];

const searchTools: SearchTool[] = [
  ...pdfSections.flatMap((section) => section.items.map((item) => ({ ...item, category: section.title }))),
  ...imageSections.flatMap((section) => section.items.map((item) => ({ ...item, category: section.title }))),
  ...utilitySections.flatMap((section) => section.items.map((item) => ({ ...item, category: section.title }))),
];

function ToolGlyph({ icon, cls = "h-4 w-4" }: { icon: string; cls?: string }) {
  switch (icon) {
    case "compress":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m16-5h-3m3 0v3M3 16v3a2 2 0 002 2h3m11-5v3a2 2 0 01-2 2h-3" /></svg>;
    case "resize":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5m11-5v5h-5" /></svg>;
    case "crop":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14" /></svg>;
    case "image":
    case "photo":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-1-1l1.5-1.5a2 2 0 012.8 0L20 15m-14 5h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm3-11h.01" /></svg>;
    case "spark":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" /></svg>;
    case "magic":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4l1.5 3.5L12 9l-3.5 1.5L7 14l-1.5-3.5L2 9l3.5-1.5L7 4z" /></svg>;
    case "droplet":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c3 4 6 7 6 10a6 6 0 11-12 0c0-3 3-6 6-10z" /></svg>;
    case "rotate":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M20 10A8 8 0 006.3 5.3L4 10m16 4l-2.3 4.7A8 8 0 013 14" /></svg>;
    case "shape":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="7" cy="7" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 5h7v7h-7zM5 14h6v6H5z" /></svg>;
    case "video":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.5-2.5v9L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>;
    case "merge":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h4v4M13 13h4v4M11 11l6 6M7 17V7" /></svg>;
    case "split":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16M16 4v16M4 8h4m0 8H4m12-8h4m-4 8h4" /></svg>;
    case "screen":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v10H4zM8 19h8" /></svg>;
    case "text":
    case "paragraph":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14M5 12h10M5 18h8" /></svg>;
    case "word":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5zM8 8l2 8 2-5 2 5 2-8" /></svg>;
    case "sheet":
    case "table":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4zM4 10h16M9 5v14M15 5v14" /></svg>;
    case "slides":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v10H4zM9 19h6M12 15v4" /></svg>;
    case "code":
    case "braces":
    case "markdown":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></svg>;
    case "edit":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z" /></svg>;
    case "highlight":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l3 3-9 9-4 1 1-4 9-9zM7 17h10M6 21h12" /></svg>;
    case "pin":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.33 6-11a6 6 0 10-12 0c0 5.67 6 11 6 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "globe":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.8 2.6 4.5 5.8 4.5 9S14.8 18.4 12 21c-2.8-2.6-4.5-5.8-4.5-9S9.2 5.6 12 3z" /></svg>;
    case "qr":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14h3v3h-3zM14 17h3v3h-3z" /></svg>;
    case "palette":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18h1.2a1.8 1.8 0 001.8-1.8 1.8 1.8 0 011.8-1.8H18A3 3 0 0021 14a11 11 0 00-9-11z" /></svg>;
    case "invoice":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" /></svg>;
    case "shield":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V6l7-3z" /></svg>;
    case "compare":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 4H5v16h4M15 4h4v16h-4M9 12h6" /></svg>;
    case "scan":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4H5a2 2 0 00-2 2v2m16-4h-2m2 0v2M7 20H5a2 2 0 01-2-2v-2m16 4h-2a2 2 0 01-2-2v-2M6 12h12" /></svg>;
    case "sign":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 17c2-2 4-3 6-3 2.5 0 3.5 2 6 2 1.5 0 2.8-.5 4-1.5M6 12l7-7 4 4-7 7H6v-4z" /></svg>;
    case "lock":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 0110 0v3m-9 0h8a2 2 0 012 2v6H6v-6a2 2 0 012-2z" /></svg>;
    case "unlock":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 019.8-1.4M8 11h8a2 2 0 012 2v6H6v-6a2 2 0 012-2z" /></svg>;
    case "numbers":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5L6 19M14 5l-2 14M4 10h14M3 15h14" /></svg>;
    default:
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" /></svg>;
  }
}

function DropdownPanel({
  sections,
  pathname,
  onClose,
  viewAllHref,
}: {
  sections: DropdownSection[];
  pathname: string;
  onClose: () => void;
  viewAllHref: string;
}) {
  return (
    <div className="w-[min(980px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_-10px_rgba(15,23,42,0.14),0_4px_16px_-4px_rgba(15,23,42,0.07)]">
      <div
        className="grid max-h-[70vh] overflow-y-auto p-6"
        style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
      >
        {sections.map((section, index) => (
          <div key={section.title} className={clsx(index > 0 && "border-l border-slate-100 pl-6", index < sections.length - 1 && "pr-6")}>
            <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    "group flex items-center gap-3.5 rounded-xl px-2 py-2 transition-colors",
                    pathname === item.href ? "bg-slate-50" : "hover:bg-slate-50",
                  )}
                >
                  <span className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105", item.bg, item.fg)}>
                    <ToolGlyph icon={item.icon} cls="h-[18px] w-[18px]" />
                  </span>
                  <span className={clsx("text-[14px] font-medium leading-tight", pathname === item.href ? "text-brand-700" : "text-slate-800 group-hover:text-slate-900")}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 px-6 py-3.5">
        <Link
          href={viewAllHref}
          onClick={onClose}
          className="flex items-center justify-between text-[13px] font-medium text-slate-500 transition-colors hover:text-brand-600"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Full tool library · Fast, private, browser-based
          </span>
          <span className="text-brand-600">View all tools →</span>
        </Link>
      </div>
    </div>
  );
}

function MobileSection({
  sections,
  pathname,
  onSelect,
}: {
  sections: DropdownSection[];
  pathname: string;
  onSelect: () => void;
}) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400">{section.title}</p>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onSelect}
                className={clsx(
                  "group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50",
                  pathname === item.href && "bg-slate-50",
                )}
              >
                <span className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", item.bg, item.fg)}>
                  <ToolGlyph icon={item.icon} cls="h-[16px] w-[16px]" />
                </span>
                <span className={clsx("text-[13.5px] font-medium", pathname === item.href ? "text-brand-700" : "text-slate-700 group-hover:text-slate-900")}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolQuery, setToolQuery] = useState("");

  const pdfRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);

  const filteredTools = searchTools
    .filter((tool) => tool.label.toLowerCase().includes(toolQuery.trim().toLowerCase()))
    .slice(0, 8);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPdfOpen(false);
    setImageOpen(false);
    setUtilityOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      if (pdfRef.current && !pdfRef.current.contains(event.target as Node)) setPdfOpen(false);
      if (imageRef.current && !imageRef.current.contains(event.target as Node)) setImageOpen(false);
      if (utilityRef.current && !utilityRef.current.contains(event.target as Node)) setUtilityOpen(false);
    };

    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={clsx("h-3.5 w-3.5 text-slate-400 transition-transform duration-200", open && "rotate-180")}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-200",
        scrolled ? "border-slate-200 bg-white shadow-sm" : "border-slate-100 bg-white/95 backdrop-blur",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[56px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 xl:gap-6">
            <Link href="/" className="shrink-0 transition-opacity hover:opacity-75">
              <Image src="/logo.svg" alt="thepdftools" width={88} height={30} className="h-7 w-auto" style={{ width: "auto", height: "28px" }} priority />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              <div
                className="relative"
                ref={pdfRef}
                onMouseEnter={() => {
                  setPdfOpen(true);
                  setImageOpen(false);
                  setUtilityOpen(false);
                }}
                onMouseLeave={() => setPdfOpen(false)}
              >
                <button
                  onClick={() => {
                    setPdfOpen((value) => !value);
                    setImageOpen(false);
                    setUtilityOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    pdfOpen ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  PDF Tools <Chevron open={pdfOpen} />
                </button>
                {pdfOpen && (
                  <div className="absolute left-0 top-full pt-3">
                    <DropdownPanel sections={pdfSections} pathname={pathname} onClose={() => setPdfOpen(false)} viewAllHref="/" />
                  </div>
                )}
              </div>

              <div
                className="relative"
                ref={imageRef}
                onMouseEnter={() => {
                  setImageOpen(true);
                  setPdfOpen(false);
                  setUtilityOpen(false);
                }}
                onMouseLeave={() => setImageOpen(false)}
              >
                <button
                  onClick={() => {
                    setImageOpen((value) => !value);
                    setPdfOpen(false);
                    setUtilityOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    imageOpen ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  Image Tools <Chevron open={imageOpen} />
                </button>
                {imageOpen && (
                  <div className="absolute left-0 top-full pt-3">
                    <DropdownPanel sections={imageSections} pathname={pathname} onClose={() => setImageOpen(false)} viewAllHref="/" />
                  </div>
                )}
              </div>

              <div
                className="relative"
                ref={utilityRef}
                onMouseEnter={() => {
                  setUtilityOpen(true);
                  setPdfOpen(false);
                  setImageOpen(false);
                }}
                onMouseLeave={() => setUtilityOpen(false)}
              >
                <button
                  onClick={() => {
                    setUtilityOpen((value) => !value);
                    setPdfOpen(false);
                    setImageOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    utilityOpen ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  Utilities <Chevron open={utilityOpen} />
                </button>
                {utilityOpen && (
                  <div className="absolute left-0 top-full pt-3">
                    <DropdownPanel sections={utilitySections} pathname={pathname} onClose={() => setUtilityOpen(false)} viewAllHref="/" />
                  </div>
                )}
              </div>

              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors xl:inline-flex",
                    pathname === link.href ? "text-brand-600" : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <div className="relative hidden lg:block">
              <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                value={toolQuery}
                onChange={(event) => setToolQuery(event.target.value)}
                placeholder="Search tools..."
                className="h-9 w-44 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[13px] text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:w-56 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              {toolQuery.trim() && (
                <div className="absolute right-0 mt-1.5 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  {filteredTools.length ? (
                    filteredTools.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setToolQuery("")} className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-slate-50">
                        <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", item.bg, item.fg)}>
                          <ToolGlyph icon={item.icon} cls="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-slate-800">{item.label}</p>
                          <p className="text-[10.5px] text-slate-400">{item.category}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-[13px] text-slate-400">No tools found.</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
              aria-label="Menu"
            >
              <div className="space-y-[5px]">
                <span className={clsx("block h-0.5 w-[18px] rounded bg-current transition-all duration-200", mobileOpen && "translate-y-[7px] rotate-45")} />
                <span className={clsx("block h-0.5 w-[18px] rounded bg-current transition-all duration-200", mobileOpen && "opacity-0")} />
                <span className={clsx("block h-0.5 w-[18px] rounded bg-current transition-all duration-200", mobileOpen && "-translate-y-[7px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && <div className="fixed inset-0 top-[56px] z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div
        className={clsx(
          "fixed inset-x-0 top-[56px] z-50 overflow-y-auto transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[calc(100dvh-56px)] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
            <div>
              <input
                value={toolQuery}
                onChange={(event) => setToolQuery(event.target.value)}
                placeholder="Search tools..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              {toolQuery.trim() && (
                <div className="mt-3 space-y-1 rounded-xl border border-slate-100 bg-slate-50/60 p-2">
                  {filteredTools.length ? (
                    filteredTools.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setToolQuery("");
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-white"
                      >
                        <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", item.bg, item.fg)}>
                          <ToolGlyph icon={item.icon} cls="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-slate-800">{item.label}</p>
                          <p className="text-[10.5px] text-slate-400">{item.category}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-[13px] text-slate-400">No tools found.</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400">Main Menu</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                      pathname === link.href ? "bg-slate-50 text-brand-700" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <MobileSection sections={pdfSections} pathname={pathname} onSelect={() => setMobileOpen(false)} />
            <MobileSection sections={imageSections} pathname={pathname} onSelect={() => setMobileOpen(false)} />
            <MobileSection sections={utilitySections} pathname={pathname} onSelect={() => setMobileOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
