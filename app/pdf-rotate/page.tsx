import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfRotateClient = dynamic(() => import("./PdfRotateClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-rotate`;

export const metadata: Metadata = {
  title: "Rotate PDF Online Free — No Upload Required",
  description:
    "Rotate PDF pages 90°, 180°, or 270° online for free. No upload, no signup — runs entirely in your browser for complete privacy.",
  keywords: [
    "rotate pdf online free",
    "rotate pdf pages",
    "pdf page rotator",
    "rotate pdf no upload",
    "rotate pdf 90 degrees",
    "flip pdf pages online",
    "pdf rotate tool free",
    "rotate pdf without upload",
  ],
  openGraph: {
    title: "Rotate PDF Online Free — No Upload Required",
    description:
      "Rotate PDF pages 90°, 180°, or 270° online for free. No upload, no signup — runs entirely in your browser.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfRotatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Rotate Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Rotate PDF pages online for free. Choose 90°, 180°, or 270° rotation for all pages or specific pages. No upload required.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to rotate PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF never leaves your browser. All rotation is done client-side using pdf-lib — no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I rotate only specific pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can rotate all pages at once or choose individual pages to rotate independently.",
            },
          },
          {
            "@type": "Question",
            name: "Does rotation affect PDF quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Rotating a PDF only changes the page orientation metadata — text, images, and formatting remain at full quality.",
            },
          },
          {
            "@type": "Question",
            name: "What rotation angles are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can rotate pages by 90° (clockwise), 180° (upside down), or 270° (counter-clockwise / 90° left).",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Rotate", item: PAGE_URL },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                PDF Rotate
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Rotate PDF pages
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  instantly in your browser
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Fix upside-down or sideways PDF pages in seconds. Rotate all pages or individual pages by 90°, 180°, or 270° — no upload, no server, completely private.
              </p>
            </div>
            <div className="mt-8">
              <PdfRotateClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "No upload needed", text: "Your PDF stays on your device. All rotation runs locally in your browser using pdf-lib." },
                { title: "Any angle", text: "Rotate by 90°, 180°, or 270°. Fix landscape pages or upside-down scans in one click." },
                { title: "Full quality", text: "Rotation only changes orientation metadata — no re-encoding, no quality loss." },
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
            <h2 className="text-lg font-semibold text-slate-900">How to Rotate a PDF Online</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600">
              <li>Upload your PDF by clicking the upload area or dragging it in.</li>
              <li>Choose to rotate all pages, or select individual pages.</li>
              <li>Pick your rotation angle: 90°, 180°, or 270°.</li>
              <li>Click &quot;Rotate PDF&quot; and download the result instantly.</li>
            </ol>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Scanned documents", "Sideways pages", "Upside-down PDFs", "Mixed orientation"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I rotate only one page?", a: "Yes. You can choose to rotate all pages at once, or select individual pages and apply different rotations to each." },
                { q: "Will the file size change after rotating?", a: "Rotation only modifies page orientation metadata in the PDF structure. The file size remains virtually unchanged." },
                { q: "Does it work on mobile?", a: "Yes. The tool runs entirely in your browser and works on any device including phones and tablets." },
                { q: "Can I rotate a password-protected PDF?", a: "Password-protected PDFs cannot be edited. Remove the password first using our PDF Unlock tool, then rotate the pages." },
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
              Use our free online PDF rotate tool to rotate PDF pages, fix sideways scans, and correct upside-down documents. This browser-based PDF page rotator supports 90°, 180°, and 270° rotations for all pages or individual pages. No file upload required — your document stays private on your device. Perfect for fixing scanned PDFs, correcting orientation errors, and preparing documents for printing or sharing.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
              <Link href="/pdf-unlock" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Unlock</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
