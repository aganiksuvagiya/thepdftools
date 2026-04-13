import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/compress-pdf-for-email-online`;

export const metadata: Metadata = {
  title: "How to Compress PDF for Email Online Free",
  description:
    "Learn how to compress a PDF for email online for free. Reduce PDF file size under attachment limits with no upload, no signup, and no watermark.",
  keywords: [
    "compress pdf for email",
    "reduce pdf size for email",
    "compress pdf under 25mb",
    "make pdf smaller for email",
    "pdf compressor online free no upload",
    "compress pdf no signup",
  ],
  openGraph: {
    title: "How to Compress PDF for Email Online Free",
    description:
      "Reduce PDF file size for Gmail, Outlook, and upload forms. Free online PDF compression with no upload and no signup.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-14T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Compress PDF for email online free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress PDF for Email Online Free",
    description: "Reduce PDF size for email with a free browser-based PDF compressor.",
  },
  alternates: { canonical: POST_URL },
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Compress PDF for Email Online Free",
      description: "Learn how to compress a PDF for email online for free with no upload, no signup, and no watermark.",
      url: POST_URL,
      datePublished: "2026-04-14T00:00:00Z",
      dateModified: "2026-04-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      articleSection: "PDF Tools",
      keywords: ["compress pdf for email", "reduce pdf size for email", "compress pdf under 25mb"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "Compress PDF for Email", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I compress a PDF for email?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use a PDF compressor, choose a compression level, and download the smaller PDF before attaching it to email.",
          },
        },
        {
          "@type": "Question",
          name: "What size should a PDF be for email?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many email services limit attachments to about 25 MB, so compressing a PDF below that size helps avoid failed sends.",
          },
        },
      ],
    },
  ],
};

export default function CompressPdfForEmailOnline() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          &larr; Back to Blog
        </Link>

        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How to Compress PDF for Email Online Free
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
            <time dateTime="2026-04-14">April 14, 2026</time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>5 min read</span>
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-8 text-slate-600">
            <p>
              A large PDF can fail when you attach it to Gmail, Outlook, school portals, job forms, or client emails. The common fix is simple: compress the PDF before sending it.
            </p>
            <p>
              Use the <Link href="/pdf-compress" className={toolLink}>free PDF Compressor</Link> to reduce PDF file size online with no upload, no signup, and no watermark.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">Steps to Compress a PDF for Email</h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>Open the <Link href="/pdf-compress" className={toolLink}>PDF Compressor</Link>.</li>
              <li>Select your PDF file.</li>
              <li>Choose medium compression for most email attachments.</li>
              <li>Download the smaller PDF.</li>
              <li>Attach the compressed PDF to your email.</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900">Best Compression Level for Email</h2>
            <p>
              Use medium compression for everyday documents, reports, invoices, and scanned forms. Use maximum compression when the file must fit a strict upload limit. Use light compression for presentations, portfolios, or PDFs with important images.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">More PDF Tips</h2>
            <p>
              If a PDF is still too large, split it into parts with the <Link href="/pdf-split" className={toolLink}>PDF Split tool</Link>. If you need to send multiple documents together, merge them first with <Link href="/pdf-merge" className={toolLink}>PDF Merge</Link>, then compress the final file.
            </p>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Try it now</h2>
              <p className="mt-2">
                Compress your PDF with the <Link href="/pdf-compress" className={toolLink}>free online PDF Compressor</Link> and make it easier to email.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
