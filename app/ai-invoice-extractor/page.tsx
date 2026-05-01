import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const InvoiceExtractorClient = dynamic(() => import("./InvoiceExtractorClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/ai-invoice-extractor`;

export const metadata: Metadata = {
  title: "AI Invoice Extractor Online Free",
  description:
    "Extract invoice data from PDF online for free. Pull invoice number, dates, vendor, customer, tax, subtotal, and total from invoice PDFs with OCR fallback.",
  keywords: [
    "ai invoice extractor",
    "invoice data extractor pdf",
    "extract invoice number from pdf",
    "invoice parser online free",
    "pdf invoice extractor",
    "invoice to json",
  ],
  openGraph: {
    title: "AI Invoice Extractor Online Free",
    description:
      "Upload an invoice PDF and extract key invoice fields instantly with OCR support and JSON output.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function AiInvoiceExtractorPage() {
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
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What fields can this invoice extractor detect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It can detect invoice number, invoice date, due date, vendor, customer, subtotal, tax, total, currency, and the full extracted invoice text.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work on scanned invoice PDFs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. If the PDF does not contain enough selectable text, OCR starts automatically to read scanned invoices.",
            },
          },
          {
            "@type": "Question",
            name: "Can I export the extracted data?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can copy the extracted invoice JSON or download it for later use in spreadsheets, scripts, or accounting workflows.",
            },
          },
        ],
      },
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
      </div>
    </div>
  );
}
