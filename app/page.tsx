import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Free Online Tools — Image Compressor, PDF Merge & More",
  description:
    "Free browser-based tools for everyday tasks. Compress images, convert JPG to PNG, merge PDFs, and remove backgrounds — instantly, no signup required.",
  keywords: [
    "free online tools",
    "image compressor online",
    "merge pdf online",
    "remove background online",
    "jpg to png converter",
    "png to jpg converter",
    "image resizer online",
    "image cropper online",
    "pdf tools online",
    "image tools online",
  ],
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
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular online tools",
    itemListElement: [
      "https://thepdftools.site/image-compressor",
      "https://thepdftools.site/pdf-merge",
      "https://thepdftools.site/background-remover",
      "https://thepdftools.site/image-resizer",
      "https://thepdftools.site/jpg-to-png",
      "https://thepdftools.site/png-to-jpg",
    ].map((url, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every tool on thepdftools is free to use with no signup required.",
        },
      },
      {
        "@type": "Question",
        name: "Do files get uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The main image and PDF tools process files locally in your browser for better privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Which tools are most popular?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Popular tools include Image Compressor, PDF Merge, Background Remover, JPG to PNG, PNG to JPG, and Image Resizer.",
        },
      },
    ],
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
    href: "/ppt-to-pdf",
    title: "PPT to PDF",
    description:
      "Convert PowerPoint presentations to PDF format. Extract text content from PPTX slides.",
    badge: "New",
    color: "orange" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
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

const seoGroups = [
  {
    title: "Popular Image Tools",
    description:
      "Use browser-based tools to compress images, resize photos, crop screenshots, remove backgrounds, add watermarks, and convert JPG, PNG, and WebP files.",
    links: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/image-cropper", label: "Image Cropper" },
      { href: "/background-remover", label: "Background Remover" },
      { href: "/image-watermark", label: "Image Watermark" },
      { href: "/image-upscaler", label: "AI Image Upscaler" },
    ],
  },
  {
    title: "Popular PDF Tools",
    description:
      "Work with PDFs online using fast tools to merge PDF files, split PDF pages, convert PDF to images, convert PDF to Word, and build PDFs from screenshots.",
    links: [
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-split", label: "PDF Split" },
      { href: "/pdf-to-image", label: "PDF to Image" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/screenshot-to-pdf", label: "Screenshot to PDF" },
      { href: "/ppt-to-pdf", label: "PPT to PDF" },
    ],
  },
];

const toolColorMap: Record<string, string> = {
  blue: "bg-tertiary-100 text-tertiary-600",
  purple: "bg-secondary-100 text-secondary-600",
  rose: "bg-secondary-100 text-secondary-600",
  emerald: "bg-brand-100 text-brand-600",
  violet: "bg-secondary-100 text-secondary-600",
  amber: "bg-brand-100 text-brand-700",
  orange: "bg-tertiary-100 text-tertiary-700",
  teal: "bg-tertiary-100 text-tertiary-600",
  indigo: "bg-brand-100 text-brand-700",
  pink: "bg-secondary-100 text-secondary-600",
};

const toolLookup = Object.fromEntries(tools.map((tool) => [tool.href, tool]));

const toolCategories = [
  {
    title: "Popular PDF Tools",
    hrefs: [
      "/pdf-merge",
      "/pdf-split",
      "/pdf-to-image",
      "/pdf-to-word",
      "/screenshot-to-pdf",
      "/ppt-to-pdf",
    ],
  },
  {
    title: "Image & Graphics",
    hrefs: [
      "/image-compressor",
      "/image-resizer",
      "/image-cropper",
      "/jpg-to-png",
      "/png-to-jpg",
      "/image-to-webp",
    ],
  },
  {
    title: "AI & Creative",
    hrefs: [
      "/background-remover",
      "/image-upscaler",
      "/image-watermark",
      "/image-rotate",
    ],
  },
  {
    title: "Quick Utilities",
    hrefs: [
      "/qr-generator",
      "/color-picker",
      "/json-formatter",
      "/base64",
      "/word-counter",
      "/lorem-ipsum",
    ],
  },
].map((category) => ({
  ...category,
  tools: category.hrefs
    .map((href) => toolLookup[href])
    .filter(Boolean),
}));

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#fcfcfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_42%,rgba(79,70,229,0.14),transparent_18%),radial-gradient(circle_at_65%_60%,rgba(147,51,234,0.12),transparent_24%)]" />

        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[640px]">
              <ScrollReveal>
                <div className="inline-flex rounded-full bg-brand-100 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-brand-700">
                  Browser-Based Productivity Tools
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[5rem] lg:leading-[0.94]">
                  All-in-One{" "}
                  <span className="bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                    File Converter
                  </span>{" "}
                  &amp; Tools
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-500 sm:text-[1.2rem]">
                  Compress images, merge PDFs, convert formats, and finish
                  everyday file tasks in one clean workspace built for speed and privacy.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#featured-tools"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.6)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Start with popular tools
                  </a>
                  <a
                    href="#all-tools"
                    className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-slate-900 transition-colors hover:text-brand-700"
                  >
                    Browse everything
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </ScrollReveal>

            </div>

            <ScrollReveal delay={140}>
              <div className="relative mx-auto flex min-h-[630px] w-full max-w-[560px] items-center justify-center">
                <div className="hero-glow-pulse absolute inset-x-10 top-20 h-72 rounded-full bg-secondary-200/45 blur-3xl" />

                <div className="hero-float absolute right-0 top-0 w-[300px] rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Quick actions
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      { name: "Image Compressor", meta: "Reduce file size instantly" },
                      { name: "PDF Merge", meta: "Combine pages in one click" },
                      { name: "Background Remover", meta: "Clean cutout in browser" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <div className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          {item.meta}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-float-delayed absolute left-2 top-[56%] z-10 flex w-[270px] items-center gap-4 rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tertiary-100 text-tertiary-600">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">
                      Enhancement ready
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Processed locally in your browser
                    </div>
                  </div>
                </div>

               

                <div className="hero-float-late absolute bottom-5 right-0 rounded-[1.75rem] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Active tools
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-3xl font-black tracking-[-0.05em] text-slate-900">
                      20+
                    </div>
                    <div className="text-sm text-slate-500">
                      ready for daily work
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={360}>
            <div className="mt-14 grid grid-cols-2 gap-4 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="featured-tools" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                  Featured Tools
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Start with the tools people use most
                </h2>
              </div>
              {/* <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                These are the highest-intent tools across image compression,
                PDF merging, resizing, and AI background cleanup.
              </p> */}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.slice(0, 9).map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 60} distance={20}>
                <ToolCard {...tool} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary-300">
                  Why This Feels Better
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Less waiting, less clutter, less risk
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  Most online tools slow you down with uploads, ads, and extra
                  steps. Here, the flow is straightforward: pick a tool, process
                  your file, and move on.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Private by default",
                    desc: "Main tools process locally in your browser whenever possible.",
                  },
                  {
                    title: "Made for speed",
                    desc: "Simple flows, instant actions, and lightweight interfaces.",
                  },
                  {
                    title: "Useful coverage",
                    desc: "Images, PDFs, quick utilities, and creator-friendly tasks in one place.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="mt-3 text-sm leading-6 text-slate-300">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                How It Works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Three simple steps
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { n: "01", title: "Pick a tool", desc: "Choose the exact task you want to finish, from image work to PDF handling.", color: "bg-brand-100 text-brand-700", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
              { n: "02", title: "Add your file", desc: "Drag, drop, or browse. The interface stays simple and focused on the task.", color: "bg-secondary-100 text-secondary-700", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" },
              { n: "03", title: "Download the result", desc: "Get the processed file immediately and move on with your work.", color: "bg-tertiary-100 text-tertiary-700", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 120}>
                <div className="rounded-3xl border border-slate-100 bg-[#f8fafc] p-7 text-center shadow-sm">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{step.n}</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="all-tools" className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Browse Everything
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                All tools in one organized grid
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                Explore every tool by category and jump straight to the task you need.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {toolCategories.map((category, categoryIndex) => (
              <ScrollReveal key={category.title} delay={categoryIndex * 60}>
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {category.title}
                    </h3>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {category.tools.map((tool, toolIndex) => (
                      <ScrollReveal className="h-full" key={tool.href} delay={toolIndex * 40} distance={18}>
                        <ToolCard {...tool}   />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-700">
                Explore by Intent
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Popular paths for image and PDF work
              </h2>
              <p className="mt-3 mx-auto max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Jump into the category you need most often and move through related tools faster.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {seoGroups.map((group, index) => (
              <ScrollReveal key={group.title} delay={index * 80}>
                <div className="rounded-2xl border border-gray-100 bg-[#f8f9fc] p-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {group.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={160}>
            <div className="mt-8 rounded-3xl border border-brand-100 bg-brand-50 p-6 text-sm leading-7 text-slate-600">
              People usually come here to compress images, merge PDFs, resize photos,
              convert JPG to PNG, remove backgrounds, and handle quick utility tasks.
              This homepage is designed to surface those paths quickly and keep the
              browsing experience focused.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-5xl px-5">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Common questions before you start
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {[
              { q: "Are these tools really free?", a: "Yes, 100% free forever. No hidden fees, no premium tiers. Every tool is free with no limits." },
              { q: "Is my data safe?", a: "Absolutely. Everything happens in your browser. Files are never uploaded anywhere." },
              { q: "Do I need an account?", a: "No. Just open a tool and start using it. No signup needed." },
              { q: "What formats are supported?", a: "JPG, PNG, WebP, BMP for images and PDF for documents." },
              { q: "Works on mobile?", a: "Yes. Fully responsive on desktop, tablet, and phone." },
            ].map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 50} distance={10}>
                <details className="group rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg className="ml-4 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white ">
              <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
                <div>
                  <div className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">
                    Start Here
                  </div>
                  <h2 className="mt-5 max-w-[14ch] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Pick the right tool and move faster
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
                    Everything is built to stay simple: open a tool, finish the task,
                    and download the result without extra setup.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-sm">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Fast", value: "20+ tools" },
                      { label: "Private", value: "No upload" },
                      { label: "Simple", value: "No signup" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center"
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {item.label}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#featured-tools"
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:bg-secondary-600 hover:shadow-lg hover:shadow-secondary-600/25"
                    >
                      Explore featured tools
                    </a>
                    <a
                      href="#all-tools"
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-brand-700"
                    >
                      View all tools
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
