import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const ImageToPdfClient = dynamic(() => import("../image-to-pdf/ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "JPG to PDF Online Free — Convert JPG Images to PDF Instantly",
  description:
    "Convert JPG to PDF online for free. Upload multiple JPG images, arrange order, choose page size, and download a PDF instantly. No signup, no upload to server.",
  keywords: [
    "jpg to pdf online free",
    "convert jpg to pdf",
    "jpeg to pdf converter online",
    "jpg to pdf no upload",
    "multiple jpg to pdf",
    "jpg images to pdf",
    "free jpg to pdf converter",
    "jpg to pdf without signup",
  ],
  openGraph: {
    title: "JPG to PDF Online Free — Convert JPG Images to PDF Instantly",
    description:
      "Convert JPG images to PDF online free. Multiple images, custom page size, instant download. No signup required.",
    url: "https://thepdftools.site/jpg-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/jpg-to-pdf" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free JPG to PDF Converter",
      url: "https://thepdftools.site/jpg-to-pdf",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convert JPG and PNG images to PDF online for free. No upload required — runs entirely in your browser.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "JPG to PDF", item: "https://thepdftools.site/jpg-to-pdf" },
      ],
    },
  ],
};

export default function JpgToPdfPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.07),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.06),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-1-1l1.5-1.5a2 2 0 012.8 0L20 15m-14 5h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                JPG to PDF
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Convert JPG to PDF
                <span className="block bg-gradient-to-r from-red-500 via-brand-600 to-indigo-500 bg-clip-text text-transparent">
                  free online
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload one or multiple JPG images and convert them to a PDF instantly.
                Arrange order, pick page size, and download — no signup, no upload to any server.
              </p>
            </div>
            <div className="mt-8">
              <ImageToPdfClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Multiple images", text: "Upload several JPG or PNG files and combine them into one PDF in your chosen order." },
                { title: "Page size control", text: "Choose A4, Letter, or fit-to-image. Set portrait or landscape and adjust margins." },
                { title: "Browser-based", text: "Your images never leave your device. Everything runs locally — fast and private." },
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
              <Link href="/pdf-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF to JPG</Link>
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image to PDF</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Compressor</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="jpg-to-pdf" />
        </div>
      </div>
    </div>
  );
}
