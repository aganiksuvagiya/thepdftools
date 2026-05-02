import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfHighlightClient = dynamic(() => import("./PdfHighlightClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-highlight`;

export const metadata: Metadata = {
  title: "PDF Highlight Online Free - Highlight Text in PDF",
  description:
    "Highlight important text, clauses, and sections in a PDF online for free. Mark PDF pages in your browser and export a highlighted PDF with no upload or signup.",
  keywords: [
    "pdf highlighter online free",
    "highlight pdf online",
    "highlight text in pdf",
    "pdf marker online",
    "annotate pdf highlight",
  ],
  openGraph: {
    title: "PDF Highlight Online Free - Highlight Text in PDF",
    description: "Highlight key lines and sections in a PDF directly in your browser and export the marked file.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfHighlightPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF Highlight Tool",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Highlight important text and sections in PDF files and export the annotated file.",
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(245,158,11,0.22)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-9 8h10a2 2 0 002-2V6l-4-3H7a2 2 0 00-2 2v13a2 2 0 002 2z" />
                </svg>
                PDF Highlight
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Highlight important parts of a PDF
                <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  mark key lines before you share
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Mark contracts, totals, notes, or sections in a PDF directly in your browser. Export a highlighted PDF with no upload and no signup.
              </p>
            </div>
            <div className="mt-8">
              <PdfHighlightClient />
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Guides</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/blog/how-to-highlight-pdf-online-free" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              How to Highlight PDF
            </Link>
            <Link href="/blog/edit-pdf-online-free-no-signup-guide" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              Edit PDF Online Free
            </Link>
            <Link href="/blog/sign-pdf-online-free-no-signup" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              Sign PDF Online Free
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Editor
            </Link>
            <Link href="/pdf-redaction" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Redaction
            </Link>
            <Link href="/pdf-sign" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Sign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
