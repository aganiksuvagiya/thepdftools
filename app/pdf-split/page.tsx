import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfSplitClient = dynamic(() => import("./PdfSplitClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Split Tool Online — Extract & Split PDF Pages",
  description:
    "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs entirely in your browser using pdf-lib.",
  keywords: [
    "pdf split",
    "split pdf online",
    "extract pdf pages",
    "pdf splitter",
    "free pdf split",
    "split pdf online free no upload",
    "extract pages from pdf online",
    "separate pdf pages no signup",
    "pdf page extractor free",
    "separate pdf pages",
  ],
  openGraph: {
    title: "Free PDF Split Tool Online — Extract & Split PDF Pages",
    description:
      "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs entirely in your browser using pdf-lib.",
    url: "https://thepdftools.site/pdf-split",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-split",
  },
};

export default function PdfSplitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Split Tool",
        url: "https://thepdftools.site/pdf-split",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to split PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All splitting is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract specific pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can split all pages into individual PDFs, or specify custom ranges like '1-3, 5, 7-10' to extract exactly the pages you need.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a page limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so performance depends on your device's memory. Most PDFs work smoothly.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the page is loaded, the splitting functionality works entirely in your browser. However, you need an internet connection to initially load the tool.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "PDF Split", "item": "https://thepdftools.site/pdf-split" },
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                PDF Split
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Split PDF files
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  into separate pages
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Split PDF files into individual pages or custom ranges instantly in
                your browser. Extract exactly the pages you need — no upload, no
                server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <PdfSplitClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for extraction", text: "Extract specific pages from large PDFs without any quality loss." },
                { title: "Best for organization", text: "Split multi-page documents into individual files for easy sharing." },
                { title: "Best for privacy", text: "All splitting happens locally in your browser using pdf-lib." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Select specific page ranges to extract only what you need.</li>
              <li>Split large reports into chapters for easier distribution.</li>
              <li>The split files preserve all formatting from the original PDF.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Report chapters", "Invoice extraction", "Page selection", "Document sharing"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Split a PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>Choose whether to split into individual pages or specify custom page ranges.</li>
              <li>Enter custom ranges like &quot;1-3, 5, 7-10&quot; to extract exactly the pages you need.</li>
              <li>Click the &quot;Split PDF&quot; button to process your document.</li>
              <li>Download the split pages as separate PDF files instantly.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PDF Splitter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Ranges</h3>
                <p className="mt-1 text-sm text-slate-500">Specify exact page ranges like &quot;1-3, 5, 7-10&quot; to extract only the pages you need from any PDF document.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Individual Pages</h3>
                <p className="mt-1 text-sm text-slate-500">Split your PDF into individual single-page files with one click. Perfect for extracting specific pages from large documents.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Fast Processing</h3>
                <p className="mt-1 text-sm text-slate-500">Splitting happens instantly in your browser using pdf-lib. No waiting for server uploads or downloads.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload Required</h3>
                <p className="mt-1 text-sm text-slate-500">Your files stay on your device. The entire splitting process runs locally in your browser for complete privacy.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I split by custom page ranges?", a: "Yes. You can enter custom ranges like \"1-3, 5, 7-10\" to extract exactly the pages you need, or split every page into its own PDF file." },
                { q: "Is there a maximum number of pages?", a: "No hard limit. Processing happens in your browser, so performance depends on your device's memory. Most PDFs work smoothly regardless of page count." },
                { q: "Does splitting affect the quality?", a: "No. The split pages retain the exact same quality as the original PDF. Text, images, and formatting are preserved perfectly since pages are extracted without re-encoding." },
                { q: "Can I split password-protected PDFs?", a: "Password-protected or encrypted PDFs are not currently supported. You will need to remove the password protection first using another tool before splitting." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* SEO paragraph */}
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Use our free online PDF splitter to split PDF files, extract PDF pages, and separate PDF documents into individual pages or custom ranges. This browser-based PDF split tool is ideal for extracting chapters from e-books, separating invoice pages, or pulling specific pages from large reports. No server upload, no registration — just a fast, private, and free PDF page extractor.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
