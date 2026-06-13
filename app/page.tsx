import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ScrollReveal from "@/components/ScrollReveal";
const staticBlogPosts = [
  { slug: "how-to-merge-pdf-files-online", title: "How to Merge PDF Files Online", description: "Step-by-step guide to combining PDFs for free in your browser.", date: "2025-04-10", readTime: "4 min read", tags: ["PDF", "Merge"] },
  { slug: "compress-pdf-files-free", title: "Compress PDF Files Free", description: "Reduce PDF file size without losing quality using free online tools.", date: "2025-04-08", readTime: "3 min read", tags: ["PDF", "Compress"] },
  { slug: "compress-pdf-for-email-online", title: "Compress PDF for Email Online", description: "Make PDFs small enough for email attachments with no signup.", date: "2025-04-06", readTime: "3 min read", tags: ["PDF", "Email"] },
  { slug: "convert-word-to-pdf-free", title: "Convert Word to PDF Free", description: "Convert DOCX files to PDF online without Microsoft Office.", date: "2025-03-28", readTime: "4 min read", tags: ["PDF", "Word"] },
  { slug: "jpg-vs-png-vs-webp-which-format", title: "JPG vs PNG vs WebP: Which Format Should You Use?", description: "A practical comparison of image formats for web and print.", date: "2025-03-20", readTime: "5 min read", tags: ["Image", "Guide"] },
  { slug: "how-to-compress-images-for-web", title: "How to Compress Images for the Web", description: "Optimize image file sizes for faster page load speeds.", date: "2025-03-15", readTime: "4 min read", tags: ["Image", "Web"] },
];

const SITE_URL = "https://thepdftools.site";

export const metadata: Metadata = {
  title: "Free PDF Tools Online — Merge, Compress, Convert & Edit PDF",
  description:
    "The best free online PDF tools: merge PDF, compress PDF, convert PDF to Word, split PDF, edit PDF online, PDF to JPG, JPG to PDF, and more. No upload, no signup — all processing runs privately in your browser.",
  keywords: [
    "pdf tool",
    "pdf tools",
    "free pdf tools",
    "online pdf tools",
    "free pdf tools online",
    "pdf converter",
    "free pdf converter",
    "pdf editor",
    "online pdf editor",
    "free online pdf editor",
    "merge pdf",
    "merge pdf online",
    "pdf merger",
    "compress pdf",
    "compress pdf online",
    "pdf compressor",
    "split pdf",
    "split pdf online",
    "pdf splitter",
    "pdf to word",
    "word to pdf",
    "jpg to pdf",
    "pdf to jpg",
    "image to pdf",
    "all in one pdf tool",
    "convert pdf online",
    "pdf file converter",
    "document converter",
    "convert files online",
    "free online pdf tools no upload",
    "pdf tools no upload",
    "online pdf converter free",
    "compress pdf online free",
    "merge pdf online free",
    "split pdf online free",
    "pdf to word converter free",
    "pdf to excel converter free",
    "edit pdf online free",
    "pdf sign online free",
    "pdf highlight online free",
    "scanned pdf to searchable pdf",
    "free image tools online",
    "image compressor online",
    "jpg to png converter free",
    "png to jpg converter free",
  ],
  openGraph: {
    title: "Free PDF Tools Online — Merge, Compress, Convert & Edit PDF",
    description:
      "Merge PDF, compress PDF, convert PDF to Word, split PDF, edit PDF online — all free. No upload, no signup. Plus free image tools. Runs privately in your browser.",
    url: "https://thepdftools.site",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "thepdftools.site — Free PDF Tools Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Tools Online — Merge, Compress, Convert & Edit PDF",
    description:
      "Merge PDF, compress PDF, convert PDF to Word, split PDF, and edit PDF files online — free, no upload, no signup required.",
    images: ["https://thepdftools.site/opengraph-image"],
  },
  alternates: {
    canonical: "https://thepdftools.site",
  },
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "thepdftools — Free PDF Tools Online",
    url: SITE_URL,
    inLanguage: "en",
    description:
      "Free online PDF tools to merge, compress, convert, split, and edit PDF files. No upload, no signup required.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "thepdftools",
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "thepdftools",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
    },
    description:
      "thepdftools provides free online PDF tools including PDF merger, PDF compressor, PDF converter, PDF editor, and image tools — all running privately in your browser.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "thepdftools — Free PDF Tools Online",
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online PDF tools: merge PDF, compress PDF, convert PDF to Word, split PDF, edit PDF files, and convert images. All tools run privately in your browser with no upload and no signup.",
    featureList: [
      "Merge PDF files online free",
      "Compress PDF files online free",
      "Split PDF files online free",
      "Convert PDF to Word online free",
      "Convert PDF to JPG online free",
      "Convert JPG to PDF online free",
      "Edit PDF online free",
      "Sign PDF files online free",
      "Highlight PDF files online free",
      "Convert PDF to Excel online free",
      "Compress images online free",
      "Convert image formats online free",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular free PDF tools online",
    itemListElement: [
      `${SITE_URL}/pdf-merge`,
      `${SITE_URL}/pdf-compress`,
      `${SITE_URL}/pdf-split`,
      `${SITE_URL}/pdf-to-word`,
      `${SITE_URL}/jpg-to-pdf`,
      `${SITE_URL}/pdf-to-jpg`,
      `${SITE_URL}/pdf-to-excel`,
      `${SITE_URL}/image-to-pdf`,
      `${SITE_URL}/pdf-sign`,
      `${SITE_URL}/pdf-highlight`,
      `${SITE_URL}/image-compressor`,
      `${SITE_URL}/background-remover`,
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
        name: "Are these online PDF tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All PDF tools on thepdftools.site are completely free with no hidden fees, no account, and no signup required.",
        },
      },
      {
        "@type": "Question",
        name: "How do I merge PDF files online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the free PDF Merge tool at thepdftools.site/pdf-merge. Upload your PDF files, drag to reorder pages if needed, then click merge. Your combined PDF downloads instantly with no upload to any server.",
        },
      },
      {
        "@type": "Question",
        name: "How do I compress a PDF file online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the PDF Compressor at thepdftools.site/pdf-compress, upload your PDF, and download the compressed file. The tool reduces PDF file size for email, sharing, and portal uploads — no signup needed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert PDF to Word online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the PDF to Word converter at thepdftools.site/pdf-to-word to convert PDF files to editable Word documents instantly, completely free with no upload to a server.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to a server when using these PDF tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The main PDF and image tools on thepdftools.site process files locally in your browser using client-side JavaScript. Your files stay on your device and are never sent to any server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert JPG to PDF online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the JPG to PDF tool at thepdftools.site/jpg-to-pdf to convert JPG, PNG, or WebP images to a PDF document. Combine multiple images into one PDF — free and no signup required.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "thepdftools Guides",
    url: `${SITE_URL}/blog`,
    blogPost: staticBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
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
    href: "/pdf-highlight",
    title: "PDF Highlight",
    description:
      "Highlight important text, clauses, totals, and sections in a PDF online. Export a clean highlighted PDF in your browser.",
    badge: "New",
    color: "amber" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3h6l3 3-9 9-4 1 1-4 9-9zM7 17h10M6 21h12" />
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
    title: "PPTX to PDF",
    description:
      "Convert PowerPoint presentations to PDF format. Upload your PPTX file and download a clean PDF instantly.",
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
    href: "/tailwind-colors",
    title: "Tailwind Colors",
    description:
      "Browse all Tailwind CSS colors with HEX codes. Copy classes instantly for web design.",
    badge: "Design",
    color: "indigo" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125H12M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.592l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
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
  {
    href: "/pdf-compress",
    title: "PDF Compressor",
    description:
      "Reduce PDF file size without losing quality. Compress large PDFs for email, sharing, and storage.",
    badge: "Popular",
    color: "rose" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
  {
    href: "/image-to-pdf",
    title: "Image to PDF",
    description:
      "Convert JPG, PNG, or WebP images to PDF. Combine multiple images into a single PDF document.",
    badge: "New",
    color: "blue" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),},
  {
    href: "/text-to-pdf",
    title: "Text to PDF",
    description:
      "Convert plain text to PDF documents. Choose fonts, page size, and margins for perfect output.",
    badge: "New",
    color: "emerald" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
  {
    href: "/pdf-unlock",
    title: "PDF Unlock",
    description:
      "Remove PDF restrictions for printing, copying, and editing. Unlock your own protected PDFs.",
    badge: "New",
    color: "violet" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),},
  {
    href: "/svg-to-png",
    title: "SVG to PNG",
    description:
      "Convert SVG vector files to PNG images at 1x–4x scale. Transparent or white background.",
    badge: "New",
    color: "teal" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),},
  {
    href: "/csv-to-json",
    title: "CSV to JSON",
    description:
      "Convert CSV data to JSON format. Supports custom delimiters, headers, and pretty printing.",
    badge: "Dev",
    color: "amber" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12h-7.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125M12 16.875c0-.621.504-1.125 1.125-1.125" />
      </svg>
    ),},
  {
    href: "/pdf-to-excel",
    title: "PDF to Excel",
    description:
      "Convert PDF tables to Excel spreadsheets. Extract data from PDFs into editable XLSX files.",
    badge: "New",
    color: "emerald" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125" />
      </svg>
    ),},
  {
    href: "/heic-to-jpg",
    title: "HEIC to JPG",
    description:
      "Convert iPhone HEIC photos to JPG format. Batch convert Apple photos for universal compatibility.",
    badge: "Popular",
    color: "pink" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),},
  {
    href: "/video-to-gif",
    title: "Video to GIF",
    description:
      "Convert MP4, WebM, or MOV videos to animated GIFs. Customize FPS, size, and duration.",
    badge: "New",
    color: "purple" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5c-.621 0-1.125-.504-1.125-1.125M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),},
  {
    href: "/markdown-to-pdf",
    title: "Markdown to PDF",
    description:
      "Convert Markdown files to PDF documents. Live preview with customizable fonts and page sizes.",
    badge: "Dev",
    color: "indigo" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),},
  {
    href: "/invoice-generator",
    title: "Invoice Generator",
    description:
      "Create professional PDF invoices for free. Add items, taxes, discounts — download instantly.",
    badge: "Popular",
    color: "orange" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),},
  {
    href: "/resume-builder",
    title: "Resume Builder",
    description:
      "Build a professional resume with your experience, education, and skills — download as PDF.",
    badge: "New",
    color: "teal" as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" />
      </svg>
    ),},
];

const stats = [
  { value: "100%", label: "Free forever" },
  { value: "0 MB", label: "Data uploaded" },
  { value: "33+", label: "Tools available" },
  { value: "<1s", label: "Processing time" },
];

const newTools = [
  {
    href: "/password-generator",
    title: "Password Generator",
    description: "Generate strong, cryptographically secure passwords. Customize length, uppercase, numbers, and symbols.",
    badge: "New",
    color: "rose" as const,
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  },
  {
    href: "/regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions in real time with match highlighting. Supports g, i, m, s flags.",
    badge: "New",
    color: "violet" as const,
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></svg>,
  },
  {
    href: "/timestamp-converter",
    title: "Timestamp Converter",
    description: "Convert Unix epoch timestamps to human-readable dates or dates to Unix timestamps instantly.",
    badge: "New",
    color: "amber" as const,
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    href: "/url-encoder",
    title: "URL Encoder",
    description: "Encode and decode URLs using percent-encoding. Supports full URL and query string parameters.",
    badge: "New",
    color: "teal" as const,
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  },
  {
    href: "/text-case-converter",
    title: "Text Case Converter",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    badge: "New",
    color: "indigo" as const,
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
  },
];

const toolLookup = Object.fromEntries([...tools, ...newTools].map((tool) => [tool.href, tool]));

const featuredPdfHrefs = [
  "/pdf-merge",
  "/pdf-compress",
  "/pdf-split",
  "/pdf-to-word",
  "/image-to-pdf",
  "/pdf-to-image",
  "/pdf-to-excel",
  "/pdf-highlight",
  "/pdf-unlock",
];
const featuredTools = featuredPdfHrefs.map((href) => toolLookup[href]).filter(Boolean);

const toolCategories = [
  {
    title: "PDF Converter Tools",
    hrefs: [
      "/pdf-to-word",
      "/pdf-to-excel",
      "/pdf-to-jpg",
      "/jpg-to-pdf",
      "/image-to-pdf",
      "/word-to-pdf",
      "/pdf-to-image",
      "/ppt-to-pdf",
    ],
  },
  {
    title: "PDF Editor & Utility Tools",
    hrefs: [
      "/pdf-merge",
      "/pdf-split",
      "/pdf-compress",
      "/pdf-highlight",
      "/pdf-sign",
      "/pdf-unlock",
      "/screenshot-to-pdf",
      "/pdf-to-excel",
      "/text-to-pdf",
      "/markdown-to-pdf",
      "/invoice-generator",
      "/resume-builder",
    ],
  },
  {
    title: "Image Converter Tools",
    hrefs: [
      "/image-compressor",
      "/jpg-to-png",
      "/png-to-jpg",
      "/image-resizer",
      "/image-cropper",
      "/image-to-webp",
      "/heic-to-jpg",
      "/svg-to-png",
    ],
  },
  {
    title: "AI & Creative Tools",
    hrefs: [
      "/background-remover",
      "/image-upscaler",
      "/image-watermark",
      "/image-rotate",
      "/video-to-gif",
    ],
  },
  {
    title: "Developer & Utility Tools",
    hrefs: [
      "/qr-generator",
      "/password-generator",
      "/json-formatter",
      "/regex-tester",
      "/csv-to-json",
      "/base64",
      "/url-encoder",
      "/timestamp-converter",
      "/text-case-converter",
      "/word-counter",
      "/lorem-ipsum",
      "/color-picker",
      "/tailwind-colors",
    ],
  },
].map((category) => ({
  ...category,
  tools: category.hrefs
    .map((href) => toolLookup[href])
    .filter(Boolean),
}));

const latestGuides = staticBlogPosts;

const popularSearchPages = [
  {
    href: "/compress-pdf-to-100kb",
    title: "Compress PDF to 100KB",
    description:
      "Target-size workflow for forms, portals, and upload limits.",
  },
  {
    href: "/compress-pdf-for-govt-exam",
    title: "Compress PDF for Govt Exam",
    description:
      "Useful for exam portals, certificates, and application uploads.",
  },
  {
    href: "/reduce-pdf-size-online-free",
    title: "Reduce PDF Size Online Free",
    description:
      "General-purpose PDF compression page for email and sharing.",
  },
  {
    href: "/convert-jpeg-to-png-online-free",
    title: "Convert JPEG to PNG Online Free",
    description:
      "JPEG-focused image conversion page for editing and compatibility.",
  },
  {
    href: "/jpg-to-png-no-upload",
    title: "JPG to PNG No Upload",
    description:
      "Privacy-first image conversion with browser-based processing.",
  },
  {
    href: "/jpg-to-png-for-logos",
    title: "JPG to PNG for Logos",
    description:
      "Design-intent page for logos, graphics, and crisp image assets.",
  },
];

const categoryHubCards = [
  {
    href: "/pdf-tools",
    label: "PDF Tools",
    count: "30+",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    icon: "M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5",
  },
  {
    href: "/image-tools",
    label: "Image Tools",
    count: "18+",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    icon: "M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-1-1l1.5-1.5a2 2 0 012.8 0L20 15m-14 5h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm3-11h.01",
  },
  {
    href: "/developer-tools",
    label: "Dev Tools",
    count: "7+",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    icon: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16",
  },
  {
    href: "/generators",
    label: "Generators",
    count: "6+",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    icon: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z",
  },
  {
    href: "/document-tools",
    label: "Documents",
    count: "11+",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    href: "/utility-tools",
    label: "Utilities",
    count: "5+",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

const trustPoints = [
  {
    title: "Private by default",
    desc: "Core PDF and image tools process locally in your browser whenever possible.",
  },
  {
    title: "No signup needed",
    desc: "Open a tool, drop your file, and download the result without creating an account.",
  },
  {
    title: "Built for real tasks",
    desc: "Merge, compress, convert, sign, and optimize files with focused workflows.",
  },
];

const howItWorksSteps = [
  {
    n: "01",
    title: "Pick a tool",
    desc: "Choose the exact task you want to finish, from PDF conversion to quick image cleanup.",
    color: "bg-brand-100 text-brand-700",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    n: "02",
    title: "Add your file",
    desc: "Drag, drop, or browse. The interface stays simple and centered on the job you need done.",
    color: "bg-secondary-100 text-secondary-700",
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  },
  {
    n: "03",
    title: "Download the result",
    desc: "Get the processed file immediately and move on without extra steps or tool switching.",
    color: "bg-tertiary-100 text-tertiary-700",
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  },
];

const faqItems = [
  {
    q: "Are these free PDF tools really free?",
    a: "Yes. All PDF tools on thepdftools.site are 100% free with no hidden fees, no account, and no signup required. There are no watermarks added to your files.",
  },
  {
    q: "How do I merge PDF files online?",
    a: "Use the free PDF Merge tool: upload your PDFs, drag to reorder pages if needed, then click merge. Your combined PDF downloads instantly with no server upload.",
  },
  {
    q: "How do I compress a PDF without losing quality?",
    a: "Open the PDF Compressor, upload your PDF, and download the compressed result. The tool reduces file size while keeping text and images readable.",
  },
  {
    q: "Can I convert PDF to Word online for free?",
    a: "Yes. Use the PDF to Word converter to turn your PDF into an editable Word document with no signup required.",
  },
  {
    q: "Are my PDF files uploaded to a server?",
    a: "No. The main PDF and image tools run entirely in your browser, so your files stay on your device.",
  },
  {
    q: "How do I convert JPG to PDF online?",
    a: "Use the JPG to PDF tool: upload your JPG, PNG, or WebP images, arrange the order, and download a clean PDF.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#fcfcfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_42%,rgba(79,70,229,0.14),transparent_18%),radial-gradient(circle_at_65%_60%,rgba(147,51,234,0.12),transparent_24%)]" />

        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[640px]">
              <ScrollReveal>
                <div className="inline-flex rounded-full bg-brand-100 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-brand-700">
                  Free PDF Tools - No Upload, No Signup
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[4.5rem] lg:leading-[0.95]">
                  Free Online{" "}
                  <span className="bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                    PDF Tools
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-[1.05rem]">
                  Merge, compress, split, convert, and edit PDF files online for
                  free. Most tools run directly in your browser, so your files
                  stay private and your workflow stays fast.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#featured-tools"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.6)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Start with popular tools
                  </a>
                  <a
                    href="#all-tools"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:text-brand-700"
                  >
                    Browse everything
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </ScrollReveal>

            </div>

            <ScrollReveal delay={140}>
              <div className="relative mx-auto flex min-h-[500px] w-full max-w-[520px] items-center justify-center sm:min-h-[540px]">
                <div className="hero-glow-pulse absolute inset-x-10 top-16 h-60 rounded-full bg-secondary-200/45 blur-3xl" />

                <div className="hero-float absolute right-0 top-0 w-[280px] rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur sm:w-[300px]">
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
                  <div className="mt-5 space-y-3">
                    {[
                      { name: "PDF Merge", meta: "Combine PDFs in one click" },
                      { name: "PDF Compressor", meta: "Reduce PDF size instantly" },
                      { name: "PDF to Word", meta: "Convert PDF to editable doc" },
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

                <div className="hero-float-delayed absolute left-2 top-[54%] z-10 flex w-[250px] items-center gap-3 rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur sm:w-[270px]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-100 text-tertiary-600">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m5.25 2.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">
                      Privacy-first workflow
                    </div>
                    <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Processed locally in your browser
                    </div>
                  </div>
                </div>

               

                <div className="hero-float-late absolute bottom-4 right-0 rounded-[1.75rem] border border-white/80 bg-white/90 px-4 py-3 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.24)] backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Active tools
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-black tracking-[-0.05em] text-slate-900">
                      30+
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
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-sm sm:grid-cols-4">
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

      <section className="border-b border-slate-100 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Browse by Category
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Pick a tool category
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Start with PDFs, images, documents, generators, or quick utilities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categoryHubCards.map((cat, index) => (
              <ScrollReveal key={cat.href} delay={index * 40} distance={14}>
                <Link
                  href={cat.href}
                  className={`group flex h-full flex-col items-center rounded-[1.5rem] border p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cat.color}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-bold">{cat.label}</h3>
                    <p className="mt-1.5 text-sm font-medium opacity-75">
                      {cat.count} tools
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-tools" className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                  Popular PDF Tools
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Start with the most popular free PDF tools online
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                These are the tools people use most for document uploads,
                office work, applications, sharing, and day-to-day PDF tasks.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredTools.map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 60} distance={20}>
                <ToolCard {...tool} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-3">
              {popularSearchPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary-300">
                  How It Works
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Simple tools that stay out of your way
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  Open the tool you need, upload your file, and download the
                  result. No account walls, no complicated workflow, and no
                  unnecessary steps between you and the finished file.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {howItWorksSteps.map((step) => (
                  <div
                    key={step.n}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.color}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      {step.n}
                    </div>
                    <div className="mt-2 text-lg font-semibold">{step.title}</div>
                    <div className="mt-3 text-sm leading-6 text-slate-300">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <div className="mt-3 text-sm leading-6 text-slate-300">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="all-tools" className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                All Free PDF &amp; Image Tools
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Complete free PDF tools collection — convert, edit, compress &amp; merge
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                Browse every PDF and image tool by use case. Find converters,
                editors, compressors, utility tools, and quick file workflows in
                one place.
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

      <section className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                  Latest Guides
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Guides that support the main tools
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  Read quick guides for file conversion, compression, privacy,
                  and image workflows when you need help choosing the right tool.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
              >
                View all blog posts
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestGuides.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-2">
                    {(post as any).tags?.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-700">
                Quick Links
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                High-intent pages for common upload limits and edge cases
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Jump straight to focused workflows for size-restricted uploads,
                application forms, portal limits, and specific conversion needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularSearchPages.map((page, index) => (
              <ScrollReveal key={page.href} delay={index * 60}>
                <Link
                  href={page.href}
                  className="group block rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-sm transition-all hover:border-brand-200 hover:bg-white hover:shadow-md"
                >
                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {page.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-brand-600 transition-colors group-hover:text-brand-700">
                    Open page
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
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
            {faqItems.map((item, i) => (
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
        <section className="py-12 bg-white">
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
