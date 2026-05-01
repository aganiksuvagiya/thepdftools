import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const SearchablePdfClient = dynamic(() => import("./SearchablePdfClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/scanned-pdf-to-searchable-pdf`;

export const metadata: Metadata = {
  title: "Scanned PDF to Searchable PDF Online Free",
  description:
    "Convert scanned PDF to searchable PDF online for free. Add OCR text to image-based PDFs in your browser with no upload and no signup.",
  keywords: [
    "scanned pdf to searchable pdf",
    "searchable pdf ocr online",
    "ocr searchable pdf",
    "image pdf to searchable pdf",
    "convert scanned pdf to searchable pdf free",
    "pdf ocr searchable download",
  ],
  openGraph: {
    title: "Scanned PDF to Searchable PDF Online Free",
    description:
      "Turn image-based PDFs into searchable PDFs with OCR. Browser-based, private, and free.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function SearchablePdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Scanned PDF to Searchable PDF",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Convert scanned PDFs into searchable PDFs using OCR entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a searchable PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A searchable PDF contains selectable text behind the scanned page image, so you can search, copy, and find words inside the document.",
            },
          },
          {
            "@type": "Question",
            name: "Does my scanned PDF get uploaded?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. OCR and PDF rebuilding happen in your browser using client-side libraries.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use it for invoices and forms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It works well for scanned invoices, receipts, books, reports, and many document types that need searchable text.",
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
                Searchable PDF OCR
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Turn scanned PDFs into
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  searchable PDF files
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Add OCR text to image-based PDFs so you can search, copy, and find words inside invoices, forms, reports, and scanned documents.
              </p>
            </div>

            <div className="mt-8">
              <SearchablePdfClient />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Search inside scans",
              text: "Turn image-only PDF pages into searchable documents with OCR text behind each page.",
            },
            {
              title: "Download the rebuilt PDF",
              text: "Get a new searchable PDF file you can store, share, or use in later workflows.",
            },
            {
              title: "Private processing",
              text: "Everything runs in your browser using pdf.js, Tesseract.js, and pdf-lib with no upload.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/pdf-ocr" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF OCR
            </Link>
            <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF to Word
            </Link>
            <Link href="/pdf-to-excel" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF to Excel
            </Link>
            <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Compress
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
