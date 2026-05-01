import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const PdfMergeClient = dynamic(() => import("./PdfMergeClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free - Combine PDFs No Upload",
  description:
    "Merge PDF files online free with no upload required. Combine multiple PDFs into one document in your browser with no signup.",
  keywords: [
    "pdf merge",
    "merge pdf online",
    "combine pdf files",
    "pdf combiner",
    "free pdf merger",
    "join pdf",
    "merge pdf free",
    "merge pdf online free no upload",
    "combine pdf files no signup",
    "merge pdf without watermark",
    "join pdf files online free",
    "combine pdf online",
    "pdf merger online",
    "merge multiple pdf files",
  ],
  openGraph: {
    title: "Merge PDF Files Online Free - Combine PDFs No Upload",
    description:
    "Merge PDF files online free with no upload required. Combine multiple PDFs into one document in your browser with no signup.",
    url: "https://thepdftools.site/pdf-merge",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-merge",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free PDF Merge Tool",
      url: "https://thepdftools.site/pdf-merge",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Merge multiple PDF files into one document for free online. No upload, no signup — runs in your browser.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it safe to merge PDFs here?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.",
          },
        },
        {
          "@type": "Question",
          name: "How many PDFs can I merge?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device's memory. Most users can merge dozens of files without any issues.",
          },
        },
        {
          "@type": "Question",
          name: "Can I reorder pages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document will follow the order you set.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work offline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "PDF Merge", "item": "https://thepdftools.site/pdf-merge" },
      ],
    },
  ],
};

export default function PdfMergePage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                PDF Merge
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Merge PDF files online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  into one document free
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Combine multiple PDF files into a single document in seconds.
                Reorder files, then merge them privately in your browser with no
                upload required.
              </p>
            </div>

            <div className="mt-8">
              <PdfMergeClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for documents", text: "Combine contracts, reports, and invoices into one organized PDF file." },
                { title: "Best for organization", text: "Reorder pages with drag-and-drop before merging for perfect sequence." },
                { title: "Best for privacy", text: "Merging runs locally using pdf-lib — no files leave your browser." },
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
              <li>Drag files to reorder them before merging.</li>
              <li>There is no limit on the number of PDFs you can combine.</li>
              <li>The merged PDF preserves all formatting from the original files.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Contracts & reports", "Invoice bundles", "Scanned documents", "Presentation packets"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Merge PDF Files Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Click the upload area or drag and drop your PDF files into the tool.</li>
              <li>Add as many PDF documents as you need — there is no file limit.</li>
              <li>Use the arrow buttons to drag and reorder files in the desired sequence.</li>
              <li>Click the &quot;Merge PDFs&quot; button to combine all files into one document.</li>
              <li>Download your merged PDF instantly — no email or signup required.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PDF Merger?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No File Limit</h3>
                <p className="mt-1 text-sm text-slate-500">Combine as many PDF files as you want in a single session. There is no cap on the number of documents you can merge.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Drag to Reorder</h3>
                <p className="mt-1 text-sm text-slate-500">Easily rearrange the order of your PDF files before merging so the final document is organized exactly the way you need.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Browser-Based</h3>
                <p className="mt-1 text-sm text-slate-500">Everything runs in your browser using pdf-lib. Your files are never uploaded to a server, keeping your data completely private.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Watermark</h3>
                <p className="mt-1 text-sm text-slate-500">The merged PDF is clean and professional with no watermarks, branding, or hidden modifications added to your document.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is it safe to merge PDFs here?", a: "Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server." },
                { q: "How many PDFs can I merge at once?", a: "There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device's memory. Most users can merge dozens of files without any issues." },
                { q: "Can I reorder the files before merging?", a: "Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document will follow the order you set." },
                { q: "Does it work offline?", a: "Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool." },
                { q: "Is there a file size limit?", a: "There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device's available memory. Files up to 100 MB typically work without issues." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free online PDF merge tool lets you combine PDF files, join PDF documents, and merge multiple PDFs into one file without uploading to a server. This browser-based PDF merger is perfect for combining contracts, reports, invoices, and scanned documents into a single organized PDF. No registration, no watermark, no file limit — just a fast, private, and free PDF combiner that works on any device.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="pdf-merge" />
        </div>
      </div>
    </div>
  );
}
