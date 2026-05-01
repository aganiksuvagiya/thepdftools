import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfRedactionClient = dynamic(() => import("./PdfRedactionClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-redaction`;

export const metadata: Metadata = {
  title: "PDF Redaction Online Free - Black Out Sensitive PDF Data",
  description:
    "Redact PDF online for free. Black out names, addresses, account numbers, and sensitive PDF content in your browser with no upload and no signup.",
  keywords: [
    "pdf redaction online free",
    "redact pdf online",
    "black out text in pdf",
    "remove sensitive data from pdf",
    "pdf privacy redaction",
    "redact confidential pdf",
  ],
  openGraph: {
    title: "PDF Redaction Online Free - Black Out Sensitive PDF Data",
    description:
      "Redact private PDF content safely in your browser and download a flattened redacted PDF.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfRedactionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF Redaction Tool",
        url: PAGE_URL,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Black out sensitive information in PDF files and download a flattened redacted PDF.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does PDF redaction do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PDF redaction permanently hides sensitive information such as names, addresses, account numbers, and private notes before you share the file.",
            },
          },
          {
            "@type": "Question",
            name: "Is the redacted PDF safe to share?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool exports a flattened image-based PDF so text hidden under black boxes does not remain selectable in the final output.",
            },
          },
          {
            "@type": "Question",
            name: "Do files get uploaded?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Redaction and export happen locally in your browser without uploading the PDF to a server.",
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M7 21h10a2 2 0 002-2V7l-5-5H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
                </svg>
                PDF Redaction
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Redact private details from PDFs
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  black out sensitive data safely
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Hide names, addresses, account numbers, signatures, and confidential notes before you share a PDF. Export a flattened redacted file directly in your browser.
              </p>
            </div>
            <div className="mt-8">
              <PdfRedactionClient />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Click and drag redactions",
              text: "Place black boxes over any sensitive area on any page of the PDF.",
            },
            {
              title: "Flattened safe output",
              text: "The exported file is rebuilt as images so covered content stays hidden.",
            },
            {
              title: "No upload needed",
              text: "Everything runs locally in your browser for privacy and speed.",
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
            <Link href="/pdf-sign" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Sign
            </Link>
            <Link href="/pdf-protect" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Protect
            </Link>
            <Link href="/pdf-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Watermark
            </Link>
            <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Editor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
