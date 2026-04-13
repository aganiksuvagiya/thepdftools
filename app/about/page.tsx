import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ThePDFTools — Free Online PDF & Image Tools",
  description:
    "ThePDFTools is a free, browser-based toolkit for PDF and image tasks. No upload, no signup, no tracking — every tool runs 100% in your browser.",
  alternates: {
    canonical: "https://thepdftools.site/about",
  },
  openGraph: {
    title: "About ThePDFTools",
    description: "Free browser-based PDF and image tools. No upload, no signup, no limits.",
    url: "https://thepdftools.site/about",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
};

const tools = [
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "PDF Compress", href: "/pdf-compress" },
  { name: "PDF Split", href: "/pdf-split" },
  { name: "PDF to Word", href: "/pdf-to-word" },
  { name: "Word to PDF", href: "/word-to-pdf" },
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Background Remover", href: "/background-remover" },
  { name: "Image Upscaler", href: "/image-upscaler" },
  { name: "JPG to PNG", href: "/jpg-to-png" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
  { name: "Image Watermark", href: "/image-watermark" },
  { name: "QR Generator", href: "/qr-generator" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            About ThePDFTools
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            ThePDFTools is a free, privacy-first toolkit for everyday PDF and image tasks. Every tool on this site runs 100% in your browser — no files are ever uploaded to any server, no account is required, and there are no daily limits.
          </p>

          <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">What we offer</h2>
              <p className="mt-2">
                Over 30 tools for PDF and image processing — merge, split, compress, convert, watermark, resize, upscale, remove backgrounds, and more. All tools work offline in your browser using modern Web APIs like Canvas, WebAssembly, and the File System Access API.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Why no upload?</h2>
              <p className="mt-2">
                Most online tools send your files to a remote server for processing. This creates privacy risks, especially for sensitive documents like contracts, invoices, IDs, and personal photos. ThePDFTools processes everything locally on your device — your files never leave your browser tab.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Who uses ThePDFTools?</h2>
              <p className="mt-2">
                Students, freelancers, designers, developers, small business owners, and anyone who regularly works with PDFs and images. Our tools are especially popular for compressing images before uploading to websites, merging PDF documents, converting Word files to PDF, and removing backgrounds from product photos.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Is it free?</h2>
              <p className="mt-2">
                Yes — completely free with no hidden limits. All 30+ tools are available at no cost, with no login required and no file size restrictions beyond what your device's RAM can handle.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-slate-900">Popular Tools</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-4 text-sm">
            <Link href="/" className="text-brand-600 hover:underline font-medium">← Back to Tools</Link>
            <Link href="/privacy" className="text-slate-500 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
