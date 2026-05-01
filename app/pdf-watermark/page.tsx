import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfWatermarkClient = dynamic(() => import("./PdfWatermarkClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-watermark`;

export const metadata: Metadata = {
  title: "Add Watermark to PDF Online Free — No Upload",
  description:
    "Add a text watermark to your PDF online for free. Stamp PDFs with custom text, choose position and opacity — no upload, no signup, runs in your browser.",
  keywords: [
    "add watermark to pdf online free",
    "pdf watermark tool",
    "watermark pdf no upload",
    "stamp pdf online",
    "pdf text watermark free",
    "add stamp to pdf",
    "watermark pdf pages free",
    "confidential watermark pdf",
  ],
  openGraph: {
    title: "Add Watermark to PDF Online Free — No Upload",
    description: "Add a text watermark to your PDF online for free. No upload, no signup.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfWatermarkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Watermark Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Add text watermarks to PDF files online for free. No upload required.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to watermark PDFs here?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Your PDF never leaves your browser. All processing runs locally using pdf-lib — nothing is uploaded to any server." },
          },
          {
            "@type": "Question",
            name: "Can I customize the watermark?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. You can set custom watermark text, choose the position (center diagonal, corners), adjust font size, and control opacity." },
          },
          {
            "@type": "Question",
            name: "Will the watermark appear on all pages?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. The watermark is applied to every page of your PDF document." },
          },
          {
            "@type": "Question",
            name: "Can the watermark be removed?",
            acceptedAnswer: { "@type": "Answer", text: "Watermarks added by this tool are embedded directly into the PDF content. They are not easily removable with standard PDF readers." },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Watermark", item: PAGE_URL },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                PDF Watermark
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Add watermark to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free &amp; no upload
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Stamp your PDF with custom text — CONFIDENTIAL, DRAFT, DO NOT COPY, or anything you choose. Runs entirely in your browser with no file upload.
              </p>
            </div>
            <div className="mt-8"><PdfWatermarkClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Custom text", text: "Use any watermark text: CONFIDENTIAL, DRAFT, your company name, or anything else." },
                { title: "Full control", text: "Choose position, font size, and opacity to get the look you need." },
                { title: "No upload", text: "Your PDF stays on your device. All processing runs locally in your browser." },
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
                { q: "Can I choose where the watermark appears?", a: "Yes. You can place the watermark diagonally across the center of each page, or position it in any corner." },
                { q: "What font size should I use?", a: "For a diagonal center watermark, 48–72pt works well for A4/Letter PDFs. For corner watermarks, 20–30pt is typically appropriate." },
                { q: "Does it work on scanned PDFs?", a: "Yes. The watermark is added as a text layer on top of each page, so it works on all PDFs including scanned documents." },
                { q: "Is there a page limit?", a: "No. The tool processes all pages in your PDF regardless of page count." },
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
              Use our free online PDF watermark tool to add text watermarks to PDF files, stamp PDFs with CONFIDENTIAL or DRAFT labels, and protect documents before sharing. This browser-based PDF stamping tool lets you watermark PDF pages without uploading your file to any server. Perfect for marking contracts, reports, and sensitive documents.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-protect" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Password Protect</Link>
              <Link href="/pdf-sign" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Sign</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
