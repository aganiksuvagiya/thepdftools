import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfCompressClient = dynamic(() => import("./PdfCompressClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Compressor Online — Reduce PDF File Size Instantly",
  description:
    "Compress PDF files for free online. Reduce PDF file size without losing quality. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "pdf compressor",
    "compress pdf online",
    "reduce pdf size",
    "pdf size reducer",
    "compress pdf free",
    "shrink pdf",
    "pdf compression tool",
    "compress pdf without losing quality",
    "reduce pdf file size",
    "online pdf compressor",
    "free pdf compressor",
  ],
  openGraph: {
    title: "Free PDF Compressor Online — Reduce PDF File Size Instantly",
    description:
      "Compress PDF files for free online. Reduce PDF file size without losing quality. No upload, no signup — runs entirely in your browser.",
    url: "https://thepdftools.site/pdf-compress",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-compress",
  },
};

export default function PdfCompressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Compressor",
        url: "https://thepdftools.site/pdf-compress",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Compress PDF files for free online. Reduce PDF file size without losing quality. Runs entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to compress PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your PDF files never leave your browser. All compression is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "How much can I reduce the PDF file size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Reduction depends on the original PDF content. PDFs with lots of metadata, unused objects, or embedded fonts can see significant size reductions. Typical savings range from 5% to 40%.",
            },
          },
          {
            "@type": "Question",
            name: "Will compressing my PDF reduce its quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Our compressor removes unnecessary metadata and unused objects without altering the visual content of your PDF. Text, images, and layout remain intact.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so it depends on your device's memory. Most PDFs up to 100MB work smoothly on modern devices.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "PDF Compressor", "item": "https://thepdftools.site/pdf-compress" },
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
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                PDF Compress
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Compress PDFs
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  without losing quality
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload a PDF file and reduce its size instantly in your browser.
                No signup, no upload to a server, and no extra steps.
              </p>
            </div>

            <div className="mt-8">
              <PdfCompressClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for sharing",
                  text: "Send smaller PDFs via email, chat, or file-sharing platforms without hitting size limits.",
                },
                {
                  title: "Best for storage",
                  text: "Free up disk space and cloud storage by compressing archived documents and reports.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No data leaves your machine.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use &quot;Medium&quot; compression for most documents — it strips metadata while preserving content.</li>
              <li>PDFs with lots of embedded fonts and unused objects see the biggest reductions.</li>
              <li>Compress before emailing to avoid attachment size limits.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Email attachments", "Cloud storage", "Document archiving", "Sharing reports"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Compress PDF Files Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your PDF by dragging and dropping or clicking the upload area. Our PDF compressor accepts any standard PDF file.</li>
              <li>Choose your compression level — Light, Medium, or Maximum — depending on how aggressively you want to reduce the file size.</li>
              <li>Download your compressed PDF instantly. The optimized file is ready for emailing, uploading, or archiving.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free PDF Compressor?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your PDFs never leave your device. All compression happens locally in your browser using JavaScript, keeping your documents 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Preserves Visual Quality</h3>
                <p className="mt-1 text-sm text-slate-500">Our compressor removes unnecessary metadata, unused objects, and redundant data without altering the visual content. Text, images, and layout remain untouched.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Compression Levels</h3>
                <p className="mt-1 text-sm text-slate-500">Choose from Light, Medium, or Maximum compression to control the trade-off between file size reduction and metadata preservation.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Works With Any PDF</h3>
                <p className="mt-1 text-sm text-slate-500">Handles scanned documents, text-heavy reports, presentations, forms, and more. No restrictions on page count or content type.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "Is it safe to compress PDFs here?",
                  a: "Absolutely. Your PDF files never leave your browser. All compression runs client-side using JavaScript, so no data is uploaded to any server. Your documents remain completely private on your device.",
                },
                {
                  q: "How much can I reduce the PDF file size?",
                  a: "Results vary depending on the original PDF. Documents with extensive metadata, unused objects, or redundant structures can see reductions of 5% to 40%. Already-optimized PDFs may show minimal further reduction.",
                },
                {
                  q: "Will compressing my PDF reduce its quality?",
                  a: "No. Our PDF compressor removes unnecessary metadata and unused internal objects without altering the visual content. All text, images, and formatting remain exactly as they were in the original document.",
                },
                {
                  q: "Is there a file size limit?",
                  a: "There is no hard file size limit. Since all processing happens in your browser, performance depends on your device memory. Most PDFs up to 100MB compress smoothly on modern devices.",
                },
                {
                  q: "What do the compression levels mean?",
                  a: "Light compression copies pages to a fresh PDF to remove unused objects. Medium adds metadata stripping (title, author, keywords). Maximum applies all optimizations including internal structure cleanup for the smallest possible file.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              PDF compression is essential for anyone who regularly works with digital documents. Whether you need to compress PDF files for email attachments that exceed size limits, reduce PDF size for faster uploads to cloud storage services like Google Drive, Dropbox, and OneDrive, or shrink PDF documents for archiving and long-term storage, our free online PDF compressor delivers reliable results. Unlike other tools that require uploading your files to remote servers, this PDF size reducer processes everything locally in your browser, ensuring complete privacy and security. Business professionals rely on PDF compression to share reports and proposals without worrying about file size restrictions. Students and academics compress research papers and lecture notes to save storage space. Legal and financial teams use it to manage large document libraries efficiently while maintaining full document integrity.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
