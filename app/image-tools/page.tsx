import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/image-tools`;

export const metadata: Metadata = {
  title: "Free Image Tools Online — Compress, Resize, Convert & Edit Images",
  description:
    "20+ free image tools: compress images without quality loss, resize photos, convert JPG to PNG, remove backgrounds, crop, rotate, and more. No software needed.",
  keywords: [
    "free image tools online",
    "image compressor",
    "resize image online",
    "jpg to png",
    "png to jpg",
    "remove background online",
    "image converter",
    "compress image without losing quality",
    "image tools no upload",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Free Image Tools Online — Compress, Resize, Convert & Edit Images",
    description:
      "20+ free image tools: compress, resize, convert, remove backgrounds, and more. No software needed.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const imageTools = [
  {
    group: "Compress & Optimize",
    tools: [
      { href: "/image-compressor", label: "Compress Image", desc: "Reduce image file size without visible quality loss." },
    ],
  },
  {
    group: "Resize & Crop",
    tools: [
      { href: "/image-resizer", label: "Resize Image", desc: "Resize photos to exact pixel dimensions." },
      { href: "/image-cropper", label: "Crop Image", desc: "Crop images to a custom size or ratio." },
    ],
  },
  {
    group: "Convert Image Format",
    tools: [
      { href: "/jpg-to-png", label: "JPG to PNG", desc: "Convert JPEG images to transparent-capable PNG." },
      { href: "/png-to-jpg", label: "PNG to JPG", desc: "Convert PNG files to compact JPEG format." },
      { href: "/image-to-webp", label: "Image to WebP", desc: "Convert JPG/PNG to modern WebP format." },
      { href: "/svg-to-png", label: "SVG to PNG", desc: "Rasterize SVG vector files to PNG." },
      { href: "/heic-to-jpg", label: "HEIC to JPG", desc: "Convert iPhone HEIC photos to JPG." },
      { href: "/convert-jpeg-to-png-online-free", label: "JPEG to PNG Free", desc: "Fast JPEG to PNG with no upload." },
      { href: "/convert-png-to-jpg-online-free", label: "PNG to JPG Free", desc: "Fast PNG to JPG with no upload." },
    ],
  },
  {
    group: "Edit & Enhance",
    tools: [
      { href: "/background-remover", label: "Remove Background", desc: "Auto-remove image backgrounds with AI." },
      { href: "/image-rotate", label: "Rotate & Flip", desc: "Rotate or flip images in any direction." },
      { href: "/image-watermark", label: "Add Watermark", desc: "Stamp text or image watermark on photos." },
      { href: "/image-upscaler", label: "Upscale Image", desc: "Increase image resolution with AI upscaling." },
    ],
  },
  {
    group: "Convert to PDF",
    tools: [
      { href: "/jpg-to-pdf", label: "JPG to PDF", desc: "Convert JPG images to a PDF document." },
      { href: "/image-to-pdf", label: "Image to PDF", desc: "Combine multiple images into one PDF." },
    ],
  },
  {
    group: "Utility",
    tools: [
      { href: "/video-to-gif", label: "Video to GIF", desc: "Convert short video clips to animated GIF." },
      { href: "/favicon-generator", label: "Favicon Generator", desc: "Create favicons from any image file." },
      { href: "/color-picker", label: "Color Picker", desc: "Pick and identify colors from any image." },
      { href: "/color-gradient", label: "Gradient Generator", desc: "Build custom CSS color gradients." },
    ],
  },
];

const faqItems = [
  {
    q: "Do image tools compress without losing quality?",
    a: "Yes. The image compressor uses smart compression to reduce file size while keeping images sharp and clear for web and print use.",
  },
  {
    q: "What image formats are supported?",
    a: "The tools support JPG, JPEG, PNG, WebP, SVG, HEIC, and GIF depending on the specific tool.",
  },
  {
    q: "Can I use these image tools on my phone?",
    a: "Yes. All tools are mobile-responsive and work on iPhone and Android browsers without any app installation.",
  },
  {
    q: "Are these image tools free?",
    a: "Yes. Every image tool on this page is completely free with no sign-up and no watermarks added to your output.",
  },
  {
    q: "Do you store my images?",
    a: "No. Image processing runs in your browser. Your photos are not uploaded to any server.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Image Tools Online",
      url: PAGE_URL,
      description: "20+ free browser-based image tools: compress, resize, convert, and edit images.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Image Tools", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function ImageToolsPage() {
  const toolCount = imageTools.reduce((acc, g) => acc + g.tools.length, 0);

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Image Tools</span>
        </nav>

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
          <p className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-700">
            {toolCount} Free Tools
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Image Tools Online
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Compress, resize, crop, convert, and edit images — all free, all in your browser. Works on JPG, PNG, WebP, SVG, HEIC, and more. No sign-up required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            {["No Sign-up", "No Upload Required", "Works on Mobile", "100% Free"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
                <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Tool Groups */}
        {imageTools.map((group) => (
          <section key={group.group} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-slate-950 mb-4">{group.group}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
                >
                  <span className="text-[15px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {tool.label}
                  </span>
                  <span className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* What is section */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            What Are These Image Tools?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            This collection of {toolCount} free image tools covers every common image editing task — from compressing product photos for faster website loading, to removing backgrounds for e-commerce listings, to converting iPhone HEIC photos to JPG for sharing. Every tool runs directly in your browser without uploading files to any server.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Whether you are a web developer optimizing images for Google PageSpeed, a photographer converting RAW exports, a designer preparing transparent PNGs, or a student resizing a photo for an online submission — these tools handle it instantly without requiring Photoshop, Lightroom, or any paid software.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 hover:text-brand-700 transition-colors [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other Categories */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">Explore Other Tool Categories</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/pdf-tools", label: "PDF Tools", desc: "Merge, split, compress, and convert PDF files." },
              { href: "/developer-tools", label: "Developer Tools", desc: "JSON, Base64, URL encoder, regex, and more." },
              { href: "/generators", label: "Generators", desc: "QR codes, passwords, lorem ipsum, and more." },
              { href: "/document-tools", label: "Document Tools", desc: "Convert Word, Excel, and HTML documents." },
              { href: "/utility-tools", label: "Utility Tools", desc: "Word counter, unit converter, diff checker." },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-brand-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-[15px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{cat.label} →</span>
                <span className="mt-1 text-[13px] text-slate-500">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
