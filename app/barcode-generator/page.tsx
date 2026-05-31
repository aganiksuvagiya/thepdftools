import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";

const BarcodeClient = dynamic(() => import("./BarcodeClient"), {
  loading: () => <div className="animate-pulse h-64 rounded-2xl bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Barcode Generator Online — Code 128, EAN-13, QR & More",
  description: "Generate barcodes online for free. Supports Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14. Download as PNG or SVG. No signup required.",
  keywords: ["barcode generator online free", "ean-13 barcode generator", "code 128 barcode generator", "barcode maker online", "free barcode creator", "upc barcode generator", "barcode generator download"],
  openGraph: {
    title: "Free Barcode Generator Online — Code 128, EAN-13, QR & More",
    description: "Generate barcodes online free. Code 128, EAN-13, EAN-8, UPC-A, Code 39. Download PNG or SVG instantly.",
    url: "https://thepdftools.site/barcode-generator",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/barcode-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", name: "Free Barcode Generator", url: "https://thepdftools.site/barcode-generator", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What barcode formats are supported?",
            acceptedAnswer: { "@type": "Answer", text: "Code 128, EAN-13, EAN-8, UPC-A, Code 39, and ITF-14 are supported. Each format suits different use cases from retail to logistics." },
          },
          {
            "@type": "Question",
            name: "Can I download the barcode as PNG or SVG?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Download your barcode as a high-resolution PNG for printing or as an SVG vector for scalable use in designs." },
          },
          {
            "@type": "Question",
            name: "What is the difference between EAN-13 and Code 128?",
            acceptedAnswer: { "@type": "Answer", text: "EAN-13 encodes exactly 13 numeric digits and is used for retail products worldwide. Code 128 encodes any ASCII character with variable length, used for shipping and inventory." },
          },
          {
            "@type": "Question",
            name: "Is the barcode generator free?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Completely free with no signup, no watermarks, and no limits on the number of barcodes generated." },
          },
          {
            "@type": "Question",
            name: "Can I use generated barcodes for commercial products?",
            acceptedAnswer: { "@type": "Answer", text: "The tool generates the barcode image. For retail products sold in stores, you need to purchase official EAN/UPC barcodes from GS1." },
          }
        ],
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" }, { "@type": "ListItem", position: 2, name: "Generators", item: "https://thepdftools.site/generators" }, { "@type": "ListItem", position: 3, name: "Barcode Generator", item: "https://thepdftools.site/barcode-generator" }]},
  ],
};

export default function BarcodePage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Generators", href: "/generators" },
          { label: "Barcode Generator" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.06),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h1M4 10h1M4 14h1M4 18h1M8 6h1M8 10h1M8 14h1M8 18h1M13 6h1v12h-1M16 6h4v12h-4" /></svg>
                Barcode Generator
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Generate barcodes
                <span className="block bg-gradient-to-r from-teal-600 via-brand-600 to-indigo-500 bg-clip-text text-transparent">instantly online</span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">Create Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14 barcodes in seconds. Customize colors and size. Download PNG or SVG — free, no signup.</p>
            </div>
            <div className="mt-8"><BarcodeClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "7 barcode formats", text: "Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14, MSI — all major standards supported." },
                { title: "PNG & SVG export", text: "Download crisp vector SVG for printing or PNG for digital use at any size." },
                { title: "Custom colors", text: "Change bar color and background to match your brand. Works on colored labels too." },
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
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">QR Generator</Link>
              <Link href="/invoice-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Invoice Generator</Link>
              <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Editor</Link>
            </div>
          </div>
          
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {[
                { q: "What barcode formats are supported?", a: "Code 128, EAN-13, EAN-8, UPC-A, Code 39, and ITF-14 are supported. Each format suits different use cases from retail to logistics." },
                { q: "Can I download the barcode as PNG or SVG?", a: "Yes. Download your barcode as a high-resolution PNG for printing or as an SVG vector for scalable use in designs." },
                { q: "What is the difference between EAN-13 and Code 128?", a: "EAN-13 encodes exactly 13 numeric digits and is used for retail products worldwide. Code 128 encodes any ASCII character with variable length, used for shipping and inventory." },
                { q: "Is the barcode generator free?", a: "Yes. Completely free with no signup, no watermarks, and no limits on the number of barcodes generated." },
                { q: "Can I use generated barcodes for commercial products?", a: "The tool generates the barcode image. For retail products sold in stores, you need to purchase official EAN/UPC barcodes from GS1." }
              ].map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-slate-900 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          <ToolSeoGrowth slug="barcode-generator" />
        </div>
      </div>
    </div>
  );
}
