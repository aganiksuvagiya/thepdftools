import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const PdfSplitClient = dynamic(() => import("../pdf-split/PdfSplitClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Extract PDF Pages Online Free — Pull Out Specific Pages",
  description:
    "Extract pages from a PDF online for free — pull out specific pages or page ranges into a new file. No upload to server, no signup, instant download.",
  url: "https://thepdftools.site/extract-pdf-pages",
  keywords: [
    "extract pdf pages",
    "extract pdf pages online free",
    "extract pages from pdf",
    "pull pages from pdf",
    "pdf page extractor",
  ],
  imageAlt: "Extract specific pages from PDF online",
});

export default function ExtractPdfPagesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Page Extractor",
        url: "https://thepdftools.site/extract-pdf-pages",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Extract specific pages or ranges from a PDF into a new file, for free. No upload, no signup.",
      },
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
          { "@type": "ListItem", position: 3, name: "Extract PDF Pages", item: "https://thepdftools.site/extract-pdf-pages" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "PDF Tools", href: "/pdf-tools" },
            { label: "Extract PDF Pages" },
          ]}
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                PDF Extract
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Extract PDF pages
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  pull out exactly what you need
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Enter a page range like &quot;1-3, 5&quot; to extract those
                pages into a new PDF — instantly, in your browser.
              </p>
            </div>
            <div className="mt-8">
              <PdfSplitClient />
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How do I extract specific pages from a PDF?", a: "Upload your PDF, choose Custom Range, enter something like \"1-3, 5, 7-10\", and click Split PDF to extract exactly those pages." },
                { q: "Can I extract non-adjacent pages?", a: "Yes — separate each page or range with a comma, for example \"2, 4, 9-11\"." },
                { q: "Does extraction reduce quality?", a: "No. Pages are copied without re-encoding, so the extracted pages match the original exactly." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/delete-pdf-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Delete PDF Pages</Link>
              <Link href="/pdf-organize-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Organize PDF Pages</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://pdf-lib.js.org/", label: "pdf-lib: PDF page extraction in JavaScript" },
              { href: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/", label: "Adobe PDF standards overview" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", label: "MDN: Browser-based document workflows" },
            ]}
          />
          <ToolSeoGrowth slug="extract-pdf-pages" />
        </div>
      </div>
    </div>
  );
}
