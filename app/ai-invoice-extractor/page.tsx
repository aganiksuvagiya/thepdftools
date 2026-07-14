import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const InvoiceExtractorClient = dynamic(() => import("./InvoiceExtractorClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/ai-invoice-extractor`;

export const metadata: Metadata = buildPageMetadata({
  title: "AI Invoice Extractor Online Free",
  description:
    "Extract invoice data from PDF online for free. Pull invoice number, dates, vendor, customer, tax, subtotal, and total from invoice PDFs with OCR fallback.",
  url: PAGE_URL,
  keywords: [
    "ai invoice extractor",
    "invoice data extractor pdf",
    "extract invoice number from pdf",
    "invoice parser online free",
    "pdf invoice extractor",
    "invoice to json",
  ],
});

const faqItems = [
  {
    q: "What invoice fields can the extractor detect?",
    a: "It looks for invoice number, issue date, due date, vendor name, customer name, subtotal, tax, total amount, and raw text that helps you validate the result manually.",
  },
  {
    q: "Does it work on scanned or photographed invoices?",
    a: "Yes. If a PDF has no usable text layer, the workflow can fall back to OCR so scanned invoices still have a path to extraction.",
  },
  {
    q: "Can I use the result in spreadsheets or automation tools?",
    a: "Yes. The output is designed to be copied into JSON workflows, spreadsheet cleanup steps, bookkeeping reviews, and downstream automation.",
  },
  {
    q: "Will my invoice PDF be uploaded anywhere?",
    a: "No. The page follows a browser-first workflow so invoice review and extraction stay local to your device whenever processing support is available.",
  },
];

export default function AiInvoiceExtractorPage() {
  const lastUpdated = getLastUpdated("app/ai-invoice-extractor/page.tsx");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "AI Invoice Extractor",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Extract invoice number, dates, amounts, tax, vendor, customer, and raw invoice text from PDFs directly in your browser.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Generators", item: "https://thepdftools.site/generators" },
          { "@type": "ListItem", position: 3, name: "AI Invoice Extractor", item: PAGE_URL },
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
      buildOrganizationSchema(),
      buildWebsiteSchema(),
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                AI Invoice Extractor
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Extract invoice data from PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  invoice number, dates, totals, tax
                </span>
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload an invoice PDF and pull key fields instantly. Works with text-based invoices and scanned invoices using OCR fallback.
              </p>
            </div>

            <div className="mt-8">
              <InvoiceExtractorClient />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Smart field detection",
              text: "Detect invoice number, issue date, due date, vendor, customer, subtotal, tax, and total.",
            },
            {
              title: "OCR for scans",
              text: "Scanned image invoices trigger OCR automatically when normal PDF text extraction is not enough.",
            },
            {
              title: "JSON-ready output",
              text: "Copy or download extracted invoice data as JSON for spreadsheets, scripts, and workflows.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Tools</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/invoice-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              Invoice Generator
            </Link>
            <Link href="/pdf-ocr" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF OCR
            </Link>
            <Link href="/pdf-to-excel" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF to Excel
            </Link>
            <Link href="/pdf-compare" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Compare
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
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

        <ToolSeoGrowth slug="ai-invoice-extractor" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON", label: "MDN: JSON data format reference" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: browser file handling" },
            { href: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics", label: "Google Search Central: JavaScript SEO basics" },
          ]}
        />
      </div>
    </div>
  );
}
