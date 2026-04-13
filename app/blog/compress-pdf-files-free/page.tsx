import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/compress-pdf-files-free`;

export const metadata: Metadata = {
  title: "How to Compress PDF Files Online — Reduce PDF Size for Free",
  description:
    "Learn how to compress PDF files online for free. Reduce PDF size for email, faster sharing, and storage savings with our free browser-based PDF compressor tool.",
  keywords: [
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "compress pdf online free",
    "shrink pdf file",
    "make pdf smaller",
    "pdf size reducer",
  ],
  openGraph: {
    title: "How to Compress PDF Files Online — Reduce PDF Size for Free",
    description:
      "Learn how to compress PDF files online for free. Reduce PDF size for email, faster sharing, and storage savings with our free PDF compressor.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "How to Compress PDF Files Online — Reduce PDF Size for Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress PDF Files Online — Reduce PDF Size for Free",
    description: "Learn how to compress PDF files online for free. Reduce PDF size for email, sharing, and storage savings.",
  },
  alternates: { canonical: POST_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Compress PDF Files Online — Reduce PDF Size for Free",
      description: "Learn how to compress PDF files online for free. Reduce PDF size for email, faster sharing, and storage savings with our free browser-based PDF compressor tool.",
      url: POST_URL,
      datePublished: "2026-04-07T00:00:00Z",
      dateModified: "2026-04-07T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 1100,
      articleSection: "PDF Compression",
      keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf file", "make pdf smaller"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Compress PDF Files Online", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I compress a PDF online for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can compress a PDF for free with the browser-based PDF Compressor on thepdftools, with no signup required.",
          },
        },
        {
          "@type": "Question",
          name: "Are PDF files uploaded while compressing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The PDF compression tool runs in your browser whenever possible, so your documents stay on your device instead of being uploaded to a server.",
          },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function CompressPdfFilesFree() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              {/* Back link */}
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["PDF Compression", "Free Tools"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Compress PDF Files Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Reduce PDF Size for Free
                </span>
              </h1>

              {/* Meta */}
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>April 7, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>5 min read</span>
              </div>

              {/* Intro */}
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                PDFs are everywhere&mdash;contracts, reports, presentations, invoices. But a bloated PDF can bounce back from an email inbox, take forever to upload, and eat through your cloud storage. This guide shows you how to compress PDF files online for free and keep them looking sharp.
              </p>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Compress PDF Files?</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Most email providers cap attachments at 25&nbsp;MB. A single scan-heavy PDF can easily exceed that limit, forcing you to use file-sharing links or split the document. Compressing the PDF first often brings it well under the threshold so it can be sent as a normal attachment.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Smaller PDFs also mean faster sharing. Whether you are uploading to a portal, sending via messaging apps, or embedding on a website, a lighter file loads and transfers in a fraction of the time. This matters especially for mobile users on slower connections.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Storage adds up quickly, too. If your team generates hundreds of PDFs per month, compressing each file by 50&ndash;80% can save gigabytes of cloud storage. Many government and university upload forms also enforce strict file-size limits&mdash;a good PDF compressor keeps you within bounds.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How PDF Compression Works</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Removing Duplicate Objects</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    PDFs often embed the same font or image multiple times across pages. A compressor deduplicates these objects so each resource is stored only once, which can shave off significant file weight without any visible change.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Optimizing Streams</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    PDF content streams can be re-encoded with more efficient compression algorithms like Flate or LZW. Images inside the PDF are re-compressed at a lower quality or converted to more efficient formats, delivering the biggest size reduction.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Additionally, stripping metadata&mdash;editing history, embedded thumbnails, and unused form fields&mdash;removes hidden bloat that serves no purpose in the final document.
              </p>
            </section>

            {/* Section 3 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Compress with Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/pdf-compress" className={toolLink}>free PDF Compressor</Link> runs entirely in your browser&mdash;no files are uploaded to any server, so your documents stay private.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the PDF Compressor tool.",
                  "Drag and drop your PDF file (or click to browse). There is no file-size limit.",
                  "Choose your compression level\u2014light, medium, or maximum\u2014depending on how small you need the file.",
                  "Click \u201cCompress\u201d and download your reduced PDF instantly.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-secondary-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <Link
                  href="/pdf-compress"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                  Try PDF Compressor Free
                </Link>
              </div>
            </section>

            {/* Section 4 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Best Compression Settings</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                The right compression level depends on what you plan to do with the PDF:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Light compression", desc: "Minimal quality loss. Best for documents you need to print or present professionally. Typically reduces file size by 20\u201340%." },
                  { label: "Medium compression", desc: "Good balance between quality and size. Ideal for email attachments, internal reports, and web uploads. Expect 40\u201360% reduction." },
                  { label: "Maximum compression", desc: "Prioritizes the smallest possible file. Great for archiving, form submissions with strict size limits, or sharing over slow connections. Can achieve 60\u201380% reduction, though image-heavy pages may show some quality loss." },
                  { label: "When to use each", desc: "Start with medium for everyday tasks. Switch to light when visual fidelity matters (portfolios, presentations). Use maximum only when you need to meet a hard file-size cap." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Try different levels with our <Link href="/pdf-compress" className={toolLink}>PDF Compressor</Link> to find the sweet spot for your document.
              </p>
            </section>

            {/* Section 5 - Tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">PDF Compression Tips</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Compress before sending.</strong> Always reduce the file size before attaching to an email or uploading to a portal. This avoids bounced messages and failed uploads.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Check quality after compressing.</strong> Open the compressed PDF and scroll through key pages. If images look too degraded, step down to a lighter compression level.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Split large PDFs first.</strong> If your document is hundreds of pages, use our <Link href="/pdf-split" className={toolLink}>PDF Splitter</Link> to break it into smaller sections before compressing. This gives you more control over each part.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Merge then compress.</strong> If you are combining multiple files, use our <Link href="/pdf-merge" className={toolLink}>PDF Merge tool</Link> first, then compress the merged result. Merging before compressing lets the optimizer deduplicate shared resources across all pages.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Remove passwords before compressing.</strong> Encrypted PDFs cannot be fully optimized. Use our <Link href="/pdf-unlock" className={toolLink}>PDF Unlocker</Link> to remove restrictions first, then compress.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Need to edit the content?</strong> Convert to Word with our <Link href="/pdf-to-word" className={toolLink}>PDF to Word tool</Link>, make your changes, then export back to PDF and compress.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 - Other Tools */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Other PDF Tools You Might Need</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Compression is just one piece of the PDF workflow. Here are more free tools to handle your documents end to end:
                </p>
                <ul className="mt-2 space-y-2 text-[15px] leading-8 text-slate-600">
                  <li><Link href="/pdf-merge" className={toolLink}>PDF Merge</Link> &mdash; Combine multiple PDFs into a single file.</li>
                  <li><Link href="/pdf-split" className={toolLink}>PDF Split</Link> &mdash; Extract specific pages or split a PDF into parts.</li>
                  <li><Link href="/pdf-unlock" className={toolLink}>PDF Unlock</Link> &mdash; Remove password protection from restricted PDFs.</li>
                  <li><Link href="/pdf-to-word" className={toolLink}>PDF to Word</Link> &mdash; Convert PDFs to editable Word documents.</li>
                </ul>
                <p className="text-[15px] leading-8 text-slate-600">
                  All tools run in your browser with zero uploads. Your files never leave your device.
                </p>
              </div>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A smaller PDF is easier to send, faster to open, and cheaper to store. Whether you are dealing with a single contract or a batch of scanned documents, compressing your PDFs should be a standard part of your workflow. Start with our free <Link href="/pdf-compress" className={toolLink}>PDF Compressor</Link> and shrink your files in seconds.
              </p>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Try These Tools */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/pdf-compress", label: "PDF Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/pdf-merge", label: "PDF Merge", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                  { href: "/pdf-split", label: "PDF Split", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
                  { href: "/pdf-to-word", label: "PDF to Word", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} /></svg>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Compress PDF Files?",
                  "How PDF Compression Works",
                  "Step-by-Step: Compress with Our Free Tool",
                  "Best Compression Settings",
                  "PDF Compression Tips",
                  "Other PDF Tools You Might Need",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            {/* Related Posts */}
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/how-to-merge-pdf-files-online" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Merge PDF Files Online
                </Link>
                <Link href="/blog/convert-pdf-to-excel-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Convert PDF to Excel Online
                </Link>
                <Link href="/blog/convert-word-to-pdf-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Convert Word to PDF Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
