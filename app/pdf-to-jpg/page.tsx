import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const PdfToJpgClient = dynamic(() => import("./PdfToJpgClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "PDF to JPG Online Free — Convert PDF Pages to JPG Images",
  description:
    "Convert PDF to JPG online for free. Select specific pages, choose resolution and quality, download individual JPGs or all as ZIP. No signup, runs in your browser.",
  keywords: [
    "pdf to jpg online free",
    "convert pdf to jpg",
    "pdf to jpeg converter online",
    "pdf page to jpg",
    "pdf to jpg no upload",
    "free pdf to jpg converter",
    "pdf to image jpg",
    "pdf to jpg without signup",
    "high quality pdf to jpg",
  ],
  openGraph: {
    title: "PDF to JPG Online Free — Convert PDF Pages to JPG Images",
    description:
      "Convert PDF pages to JPG online free. Choose resolution, select pages, download as ZIP. No signup required.",
    url: "https://thepdftools.site/pdf-to-jpg",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/pdf-to-jpg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free PDF to JPG Converter",
      url: "https://thepdftools.site/pdf-to-jpg",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convert PDF pages to high-quality JPG images online for free. No upload required — runs entirely in your browser.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "PDF to JPG", item: "https://thepdftools.site/pdf-to-jpg" },
      ],
    },
  ],
};

export default function PdfToJpgPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.07),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                PDF to JPG
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Convert PDF to JPG
                <span className="block bg-gradient-to-r from-amber-500 via-brand-600 to-purple-500 bg-clip-text text-transparent">
                  free online
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert every page of your PDF to a high-quality JPG image. Select specific pages,
                set resolution up to 288 DPI, and download all as a ZIP — no signup, no server upload.
              </p>
            </div>
            <div className="mt-8">
              <PdfToJpgClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Select pages", text: "Choose specific pages to convert or select all at once with one click." },
                { title: "High resolution", text: "Set output DPI up to 288 for crisp, print-ready JPG images from any PDF." },
                { title: "Download as ZIP", text: "Convert multiple pages and download all JPGs in one ZIP file instantly." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Related Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">JPG to PDF</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF to Image</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Compressor</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="pdf-to-jpg" />
        </div>
      </div>
    </div>
  );
}
