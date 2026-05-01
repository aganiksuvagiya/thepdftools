import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfPageNumbersClient = dynamic(() => import("./PdfPageNumbersClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-page-numbers`;

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online Free — No Upload",
  description:
    "Add page numbers to your PDF online for free. Choose position, format, and starting number — runs entirely in your browser with no upload required.",
  keywords: [
    "add page numbers to pdf online free",
    "number pdf pages",
    "pdf page numbering tool",
    "add numbers to pdf",
    "pdf page counter free",
    "insert page numbers pdf",
    "pdf footer page number",
    "number pages in pdf no upload",
  ],
  openGraph: {
    title: "Add Page Numbers to PDF Online Free — No Upload",
    description: "Add page numbers to your PDF online for free. No upload, no signup.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfPageNumbersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Add Page Numbers to PDF Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Add page numbers to PDF files online for free. No upload required.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I choose where the page numbers appear?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. You can place page numbers at the bottom center, bottom right, bottom left, or top center of each page." },
          },
          {
            "@type": "Question",
            name: "Can I choose the starting page number?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. You can set any starting number, for example starting from page 5 if this PDF continues from another document." },
          },
          {
            "@type": "Question",
            name: "What number formats are available?",
            acceptedAnswer: { "@type": "Answer", text: 'You can choose from: plain numbers (1, 2, 3), "Page 1" format, "1 / 10" format, or "Page 1 of 10" format.' },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: { "@type": "Answer", text: "No hard limit. All processing happens in your browser using pdf-lib, so performance depends on your device." },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Page Numbers", item: PAGE_URL },
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
                PDF Page Numbers
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Add page numbers to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free &amp; no upload
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Insert page numbers into any PDF instantly. Choose position, number format, and starting page — all processed locally in your browser.
              </p>
            </div>
            <div className="mt-8"><PdfPageNumbersClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Flexible format", text: "Choose from plain numbers, 'Page 1', '1 / 10', or 'Page 1 of 10' formats." },
                { title: "Custom position", text: "Place numbers at the bottom center, bottom right, bottom left, or top center." },
                { title: "Custom start", text: "Set any starting number — perfect for documents that continue from another file." },
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
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I add numbers to only some pages?", a: "Currently the tool adds page numbers to all pages. You can split the PDF first, add numbers, then merge if needed." },
                { q: "Does it affect PDF quality?", a: "No. Only a text footer/header is added to each page. The original content, images, and formatting are untouched." },
                { q: "Can I remove page numbers later?", a: "Page numbers added by this tool are embedded as PDF content. They are not separately removable without a PDF editor." },
                { q: "Does it work on scanned PDFs?", a: "Yes. The page numbers are added as a text layer on top, so it works on all PDFs including scanned images." },
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

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Use our free online PDF page numbering tool to add page numbers to PDF files, insert footer numbers, and number PDF pages for documents, reports, and books. This browser-based tool lets you number PDF pages without uploading your file to any server. Choose from multiple formats and positions to match your document style.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Watermark</Link>
              <Link href="/pdf-rotate" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Rotate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
