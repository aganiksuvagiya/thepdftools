import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const ImageToPdfClient = dynamic(() => import("../image-to-pdf/ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Scan to PDF Online Free — Turn Photos of Documents into PDF",
  description:
    "Turn phone photos or scans of documents into a PDF online for free. Upload images, arrange page order, and download a PDF instantly. No signup, no upload to server.",
  url: "https://thepdftools.site/scan-to-pdf",
  keywords: [
    "scan to pdf",
    "scan to pdf online free",
    "convert scanned images to pdf",
    "photo to pdf converter",
    "document scan to pdf",
  ],
  imageAlt: "Scan to PDF Online Free",
});

const faqItems = [
  { q: "Can I turn phone camera photos into a PDF?", a: "Yes. Upload photos taken with your phone camera (JPG, PNG, or WebP) and the tool combines them into a single PDF in the order you set." },
  { q: "Do I need a physical scanner?", a: "No. Any photo of a document taken with a phone or camera works — the tool converts images into PDF pages, it doesn't require dedicated scanning hardware." },
  { q: "Can I scan multiple pages into one PDF?", a: "Yes. Upload multiple photos and arrange them in order before converting — each photo becomes one page." },
  { q: "Is this scan to PDF tool free?", a: "Yes, completely free with no signup, no watermark, and no upload to any server." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free Scan to PDF Converter",
      url: "https://thepdftools.site/scan-to-pdf",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Turn photos or scans of documents into a PDF online for free. Runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
        { "@type": "ListItem", position: 3, name: "Scan to PDF", item: "https://thepdftools.site/scan-to-pdf" },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function ScanToPdfPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "Scan to PDF" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                Scan to PDF
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Scan to PDF
                <span className="block bg-gradient-to-r from-red-500 via-brand-600 to-indigo-500 bg-clip-text text-transparent">
                  from photos, free online
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload photos of documents from your phone or camera and turn
                them into a single PDF — no scanner needed, no signup, no
                upload to any server.
              </p>
            </div>
            <div className="mt-8">
              <ImageToPdfClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "No scanner needed", text: "Use any photo taken with your phone camera as a document page." },
                { title: "Multi-page documents", text: "Upload several photos and arrange them into one multi-page PDF." },
                { title: "Browser-based", text: "Photos never leave your device. Everything runs locally — fast and private." },
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
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image to PDF</Link>
              <Link href="/scanned-pdf-to-searchable-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Searchable PDF (OCR)</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => (
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
          <ToolSeoGrowth slug="scan-to-pdf" />
          <SeoReferences
            links={[
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: File API reference" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API", label: "MDN: Canvas API reference" },
              { href: "https://pdf-lib.js.org/", label: "pdf-lib documentation" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
