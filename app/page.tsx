import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Free Online Tools — Image Compressor, PDF Merge & More",
  description:
    "Free browser-based tools for everyday tasks. Compress images, convert JPG to PNG, merge PDFs, and remove backgrounds — instantly, no signup required.",
  openGraph: {
    title: "Free Online Tools — Image Compressor, PDF Merge & More",
    description:
      "Free browser-based tools for everyday tasks. Compress images, convert JPG to PNG, merge PDFs, and remove backgrounds — instantly, no signup required.",
    url: "https://thepdftools.site",
    images: [
      {
        url: "https://thepdftools.site/og-home.png",
        width: 1200,
        height: 630,
        alt: "thepdftools.site - Free Online Tools",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.site",
  },
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "thepdftools",
    url: "https://thepdftools.site",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thepdftools.site/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "thepdftools",
    url: "https://thepdftools.site",
    logo: "https://thepdftools.site/logo.png",
  },
];

const tools = [
  {
    href: "/image-compressor",
    title: "Image Compressor",
    description:
      "Reduce image file size without losing quality. Supports JPG, PNG, WebP. Instant client-side compression.",
    badge: "Popular",
    color: "blue" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    ),},
  {
    href: "/background-remover",
    title: "Background Remover",
    description:
      "Remove image backgrounds with one click using AI. Perfect for product photos, profile pictures, and more.",
    badge: "AI",
    color: "emerald" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),},
  {
    href: "/image-resizer",
    title: "Image Resizer",
    description:
      "Resize images to any dimension instantly. Set custom width & height, lock aspect ratio, batch resize — all in your browser.",
    badge: "New",
    color: "violet" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),},
  {
    href: "/image-cropper",
    title: "Image Cropper",
    description:
      "Crop images to any size with preset aspect ratios. Drag to select the area you want — no signup needed.",
    badge: "New",
    color: "teal" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5" />
      </svg>
    ),},
  {
    href: "/image-upscaler",
    title: "AI Image Upscaler",
    description:
      "Upscale and enhance images to 2x, 3x, or 4x resolution using high-quality canvas interpolation.",
    badge: "AI",
    color: "violet" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),},
  {
    href: "/jpg-to-png",
    title: "JPG to PNG Converter",
    description:
      "Convert JPEG images to transparent-ready PNG format instantly using your browser's canvas API.",
    badge: "Fast",
    color: "purple" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),},
  {
    href: "/png-to-jpg",
    title: "PNG to JPG Converter",
    description:
      "Convert PNG images to JPG format with adjustable quality. Handles transparency by filling with a white background.",
    badge: "New",
    color: "orange" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),},
  {
    href: "/image-to-webp",
    title: "Image to WebP",
    description:
      "Convert JPG, PNG, and BMP images to modern WebP format. Smaller files with the same quality.",
    badge: "Fast",
    color: "indigo" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),},
  {
    href: "/image-rotate",
    title: "Image Rotate & Flip",
    description:
      "Rotate images by 90°, 180°, or any custom angle. Flip horizontally or vertically — instant results.",
    badge: "New",
    color: "pink" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),},
  {
    href: "/image-watermark",
    title: "Image Watermark",
    description:
      "Add text watermarks to your images. Customize font size, opacity, color, position, or tile across the entire image.",
    badge: "New",
    color: "amber" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),},
  {
    href: "/pdf-merge",
    title: "PDF Merge Tool",
    description:
      "Combine multiple PDF files into one document. Drag, reorder, and merge — all without uploading to any server.",
    badge: "Free",
    color: "rose" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),},
  {
    href: "/pdf-split",
    title: "PDF Split",
    description:
      "Split PDF files into individual pages or custom ranges. Extract specific pages from large documents.",
    badge: "New",
    color: "violet" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),},
  {
    href: "/pdf-to-image",
    title: "PDF to Image",
    description:
      "Convert PDF pages to high-quality JPG or PNG images. Extract all pages or select specific ones.",
    badge: "New",
    color: "rose" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
  {
    href: "/pdf-to-word",
    title: "PDF to Word",
    description:
      "Convert PDF files to editable Word documents. Extract text with formatting preserved.",
    badge: "New",
    color: "blue" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
  {
    href: "/screenshot-to-pdf",
    title: "Screenshot to PDF",
    description:
      "Convert multiple screenshots or images into a single PDF document. Reorder and customize layout.",
    badge: "New",
    color: "blue" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      </svg>
    ),},
  {
    href: "/qr-generator",
    title: "QR Code Generator",
    description:
      "Generate QR codes for URLs, text, or any data. Customize size, colors, and download instantly.",
    badge: "Popular",
    color: "indigo" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      </svg>
    ),},
  {
    href: "/color-picker",
    title: "Color Picker",
    description:
      "Pick colors and convert between HEX, RGB, HSL, and CMYK formats. Copy values instantly.",
    badge: "Fast",
    color: "pink" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V4.5" />
      </svg>
    ),},
  {
    href: "/json-formatter",
    title: "JSON Formatter",
    description:
      "Format, minify, and validate JSON data. View stats and find errors with position info.",
    badge: "Dev",
    color: "amber" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),},
  {
    href: "/base64",
    title: "Base64 Encoder",
    description:
      "Encode text to Base64 or decode Base64 back to text. Supports Unicode characters.",
    badge: "Dev",
    color: "teal" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),},
  {
    href: "/word-counter",
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs. Estimate reading and speaking time.",
    badge: "Fast",
    color: "emerald" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),},
  {
    href: "/lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text in paragraphs, sentences, or words. Customizable output.",
    badge: "Fast",
    color: "purple" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
];

const stats = [
  { value: "100%", label: "Free forever" },
  { value: "0 MB", label: "Data uploaded" },
  { value: "20+", label: "Tools available" },
  { value: "<1s", label: "Processing time" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pt-20 pb-16 sm:pt-28 sm:pb-20">
        {/* Soft glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-200/30 blur-3xl -z-10" />

        <div className="mx-auto max-w-3xl px-5 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-brand-600 shadow-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              100% Private &middot; No Upload &middot; Free Forever
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Free Image & PDF Tools
              <br />
              <span className="text-brand-600">Right in Your Browser</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
              Compress, convert, crop, resize, watermark images and merge PDFs.
              Everything processes locally — your files never leave your device.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#tools" className="btn-primary px-8 py-3.5">
                Explore All Tools
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#how" className="btn-secondary">
                How It Works
              </a>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal delay={320}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-brand-600">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="py-20 bg-[#f8f9fc]">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">All tools</h2>
              <p className="mt-2 text-gray-400">Pick one and start instantly. No account needed.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 60} distance={20}>
                <ToolCard {...tool} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-5">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">How it works</h2>
              <p className="mt-2 text-gray-400">Three steps. Zero hassle.</p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { n: "1", title: "Choose a tool", desc: "Pick from 10+ free image & PDF tools.", color: "bg-brand-100 text-brand-600", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
              { n: "2", title: "Upload your file", desc: "Drag & drop or click. Files stay local.", color: "bg-purple-100 text-purple-600", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" },
              { n: "3", title: "Download result", desc: "Instant processing, instant download.", color: "bg-emerald-100 text-emerald-600", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 120}>
                <div className="text-center">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="mt-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">{step.n}</div>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Why thepdftools?</h2>
              <p className="mt-2 text-gray-400">Built different from the start.</p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { title: "100% Private", desc: "Your files never leave your browser. No uploads, no tracking, no analytics on your content.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "bg-emerald-100 text-emerald-600" },
              { title: "Lightning Fast", desc: "No server round-trips. Everything processes instantly using Canvas and WebAssembly.", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", color: "bg-amber-100 text-amber-600" },
              { title: "Always Free", desc: "No subscriptions, no premium plans, no limits. Every tool is free to use forever.", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", color: "bg-brand-100 text-brand-600" },
            ].map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 100}>
                <div className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-5">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-3xl">Frequently asked questions</h2>
          </ScrollReveal>

          <div className="mt-10 space-y-3">
            {[
              { q: "Are these tools really free?", a: "Yes, 100% free forever. No hidden fees, no premium tiers. Every tool is free with no limits." },
              { q: "Is my data safe?", a: "Absolutely. Everything happens in your browser. Files are never uploaded anywhere." },
              { q: "Do I need an account?", a: "No. Just open a tool and start using it. No signup needed." },
              { q: "What formats are supported?", a: "JPG, PNG, WebP, BMP for images and PDF for documents." },
              { q: "Works on mobile?", a: "Yes. Fully responsive on desktop, tablet, and phone." },
            ].map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 50} distance={10}>
                <details className="group rounded-xl border border-gray-100 bg-[#f8f9fc] overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-16 bg-[#f8f9fc]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-purple-700 p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
              <h2 className="relative text-2xl font-bold text-white sm:text-3xl">Ready to get started?</h2>
              <p className="relative mt-3 text-brand-100/80 max-w-md mx-auto">
                Pick any tool and start processing your files instantly. No signup, no downloads.
              </p>
              <a href="#tools" className="relative mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all duration-200 hover:bg-brand-50 active:scale-[0.97]">
                Browse all tools
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
