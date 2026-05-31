import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfCompareClient = dynamic(() => import("./PdfCompareClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-compare`;

export const metadata: Metadata = {
  title: "Compare Two PDFs Online Free",
  description:
    "Compare two PDF files online for free. Detect changed pages, added lines, and removed text between PDF versions in your browser with no upload.",
  keywords: [
    "compare two pdfs online",
    "pdf compare online free",
    "compare pdf versions",
    "difference between two pdf files",
    "pdf diff tool",
    "compare revised pdf",
  ],
  openGraph: {
    title: "Compare Two PDFs Online Free",
    description:
      "Upload two PDFs and find text differences page by page in your browser with no signup and no upload.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF Compare Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Compare two PDF versions, detect changed pages, and review added or removed text directly in your browser.",
      },
      
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the PDF Compare tool work?",
            acceptedAnswer: { "@type": "Answer", text: "Upload two PDF files — the original and the revised version. The tool analyzes both page by page and highlights pages where differences were detected." },
          },
          {
            "@type": "Question",
            name: "What types of differences are detected?",
            acceptedAnswer: { "@type": "Answer", text: "The tool detects visual differences between corresponding pages — added text, removed text, image changes, and layout modifications." },
          },
          {
            "@type": "Question",
            name: "Can I compare specific pages?",
            acceptedAnswer: { "@type": "Answer", text: "The tool compares documents page by page. Upload PDFs with matching page counts for best results." },
          },
          {
            "@type": "Question",
            name: "Is the PDF comparison accurate?",
            acceptedAnswer: { "@type": "Answer", text: "The tool provides a visual comparison. For legal or contractual documents, always review differences manually before making decisions." },
          },
          {
            "@type": "Question",
            name: "Is the PDF Compare tool free?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Free with no signup and no upload to any server." },
          }
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
          { "@type": "ListItem", position: 3, name: "PDF Compare", item: PAGE_URL },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6m0 0V5m0 6h6m-6 0H3m12 6v-6m0 0V5m0 6h6m-6 0H9" />
                </svg>
                PDF Compare
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Compare two PDF versions
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  page changes, added lines, removed text
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload an original PDF and a revised PDF to see which pages changed and what text was added or removed. Runs locally in your browser.
              </p>
            </div>
            <div className="mt-8">
              <PdfCompareClient />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Version review",
              text: "Useful for contracts, proposals, reports, policies, and revised business documents.",
            },
            {
              title: "Page-by-page output",
              text: "See exactly which pages changed and which lines differ between versions.",
            },
            {
              title: "No upload needed",
              text: "Comparison stays inside your browser for faster private review.",
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
            <Link href="/pdf-redaction" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Redaction
            </Link>
            <Link href="/pdf-ocr" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF OCR
            </Link>
            <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF Editor
            </Link>
            <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
              PDF to Word
            </Link>
          </div>
        </div>
      
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {[
                { q: "How does the PDF Compare tool work?", a: "Upload two PDF files — the original and the revised version. The tool analyzes both page by page and highlights pages where differences were detected." },
                { q: "What types of differences are detected?", a: "The tool detects visual differences between corresponding pages — added text, removed text, image changes, and layout modifications." },
                { q: "Can I compare specific pages?", a: "The tool compares documents page by page. Upload PDFs with matching page counts for best results." },
                { q: "Is the PDF comparison accurate?", a: "The tool provides a visual comparison. For legal or contractual documents, always review differences manually before making decisions." },
                { q: "Is the PDF Compare tool free?", a: "Yes. Free with no signup and no upload to any server." }
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
          </div>
    </div>
  );
}
