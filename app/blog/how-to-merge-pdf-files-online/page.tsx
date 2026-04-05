import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/how-to-merge-pdf-files-online`;

export const metadata: Metadata = {
  title: "How to Merge PDF Files Online for Free — Step by Step Guide",
  description:
    "Learn how to merge multiple PDF files into one document for free using our browser-based tool. No signup, no uploads to servers. Step-by-step guide with tips for organizing, reordering, and combining PDFs.",
  keywords: [
    "merge pdf files online",
    "combine pdf free",
    "merge pdf no signup",
    "join pdf files",
    "pdf combiner online",
    "merge pdf browser",
    "free pdf merger",
    "how to merge pdfs",
  ],
  openGraph: {
    title: "How to Merge PDF Files Online for Free — Step by Step Guide",
    description:
      "Learn how to merge multiple PDF files into one document for free. No signup, no server uploads. Step-by-step guide included.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-03-25T00:00:00Z",
    authors: ["thepdftools"],
    images: [
      {
        url: `${SITE_URL}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "How to Merge PDF Files Online for Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Merge PDF Files Online for Free — Step by Step Guide",
    description:
      "Merge multiple PDF files into one document for free. Browser-based, no signup required.",
  },
  alternates: {
    canonical: POST_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Merge PDF Files Online for Free — Step by Step Guide",
  description:
    "Learn how to merge multiple PDF files into one document for free using our browser-based tool. No signup, no uploads to servers. Step-by-step guide with tips for organizing, reordering, and combining PDFs.",
  url: POST_URL,
  datePublished: "2026-03-25T00:00:00Z",
  dateModified: "2026-03-25T00:00:00Z",
  author: {
    "@type": "Organization",
    name: "thepdftools",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "thepdftools",
    url: SITE_URL,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  wordCount: 950,
  articleSection: "PDF Tools",
  keywords: [
    "merge PDF",
    "combine PDF",
    "PDF tools",
    "productivity",
  ],
};

export default function HowToMergePdfFilesOnline() {
  const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

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
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              <div className="mt-6 flex flex-wrap gap-2">
                {["PDF Tools", "Productivity"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Merge PDF Files Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for Free &mdash; Step by Step
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>March 25, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>4 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Whether you are assembling a contract from multiple sections,
                compiling invoices for an accountant, or putting together a project
                portfolio, merging PDFs is something almost everyone needs to do
                eventually. Our{" "}
                <Link href="/pdf-merge" className={toolLink}>PDF Merge tool</Link>{" "}
                works entirely in your browser, so your files never leave your device.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">

            {/* Why Merge PDFs */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Merge PDFs?</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                PDF is the universal document format. Clients, colleagues, and
                institutions all expect it. But working with multiple separate PDFs
                quickly becomes unwieldy. Here are the most common reasons people merge:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Organization</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Combine related documents into a single file so nothing gets lost. Instead of attaching five files to an email, send one clean PDF.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Easier Sharing</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">A single merged document is simpler to share via email, cloud storage, or messaging apps. Recipients only need to open one file.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Professionalism</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">A merged, well-ordered PDF looks more polished than a collection of loose files. It shows attention to detail for client-facing deliverables.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Archiving</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Long-term storage is easier when related documents live in one file. Tax records, project documentation, and legal files all benefit.</p>
                </div>
              </div>
            </section>

            {/* Step-by-Step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step Guide to Merging PDFs</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Follow these steps to merge your PDF files in seconds using our free{" "}
                <Link href="/pdf-merge" className={toolLink}>PDF Merge tool</Link>:
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  <><strong>Open the tool.</strong> Navigate to the <Link href="/pdf-merge" className={toolLink}>PDF Merge</Link> page. No account or signup is required.</>,
                  <><strong>Add your files.</strong> Drag and drop your PDF files into the drop zone, or click to browse your computer. You can add as many files as you need.</>,
                  <><strong>Reorder if needed.</strong> Drag the file cards to arrange them in the order you want. The final merged document will follow this sequence from top to bottom.</>,
                  <><strong>Click &ldquo;Merge&rdquo;.</strong> The tool combines your PDFs instantly in your browser. No data is sent to any server.</>,
                  <><strong>Download your merged PDF.</strong> A single combined file is ready for download. Save it, share it, or print it&mdash;done.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-secondary-600 text-sm font-bold text-white shadow-sm">{i + 1}</span>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[15px] leading-8 text-slate-600">
                The entire process typically takes less than ten seconds, even for large documents.
              </p>
            </section>

            {/* Common Use Cases */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Common Use Cases</h2>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Contracts and agreements", desc: "Combine a cover letter, the main contract, appendices, and signature pages into one professional document." },
                  { label: "Reports and presentations", desc: <>Merge individual chapter PDFs or team contributions into a unified report. Use our <Link href="/ppt-to-pdf" className={toolLink}>PPT to PDF converter</Link> first if your presentation is in PowerPoint.</> },
                  { label: "Invoices and receipts", desc: "Consolidate monthly invoices or expense receipts into a single file for your accountant or bookkeeper." },
                  { label: "Scanned documents", desc: "If you scanned multiple pages as separate PDFs, merge them into one continuous document." },
                  { label: "Academic submissions", desc: "Combine a research paper, bibliography, and supplementary materials into a single submission file." },
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
            </section>

            {/* Tips for Merging */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Tips for Merging PDFs</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Check page orientation.</strong> Make sure all documents use consistent orientation (portrait or landscape) for a polished result.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Name your files clearly.</strong> Before merging, rename source files in the order you want (e.g., &ldquo;01-cover.pdf&rdquo;, &ldquo;02-contract.pdf&rdquo;). This makes reordering faster.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Extract pages first if needed.</strong> Use our <Link href="/pdf-split" className={toolLink}>PDF Split tool</Link> to extract specific pages before merging.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Convert Word docs to PDF first.</strong> Use our <Link href="/word-to-pdf" className={toolLink}>Word to PDF tool</Link> so everything is in the same format before combining.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Need to edit after merging?</strong> Convert the result to Word using our <Link href="/pdf-to-word" className={toolLink}>PDF to Word converter</Link>, make your edits, then convert back.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Extract images from your PDF.</strong> Need to pull out specific pages as images? Try our <Link href="/pdf-to-image" className={toolLink}>PDF to Image tool</Link> after merging.</span>
                </li>
              </ul>
            </section>

            {/* Privacy & Security */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Privacy &amp; Security</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Privacy is a top concern when working with sensitive documents. Most
                  online PDF tools require you to upload files to their servers, where
                  they may be stored, processed, or even retained for an unspecified
                  period. Our approach is fundamentally different.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Our{" "}
                  <Link href="/pdf-merge" className={toolLink}>PDF Merge tool</Link>{" "}
                  runs entirely in your browser using client-side JavaScript. When you
                  drop files into the tool, they are read directly from your device,
                  processed locally, and the merged result is generated on your
                  machine. No data is sent over the internet. No files are stored on
                  any server. This makes it safe for confidential contracts, medical
                  records, financial statements, and any other sensitive material.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  You can even use the tool offline once the page has loaded. Close
                  your browser tab and the files are gone&mdash;nothing persists.
                </p>
              </div>
            </section>

            {/* Final paragraph */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Merging PDFs does not have to be complicated or expensive. With a
                  browser-based tool that respects your privacy, you can combine any
                  number of PDF files in seconds&mdash;no software to install, no
                  account to create, and no file size limits. Head over to our{" "}
                  <Link href="/pdf-merge" className={toolLink}>PDF Merge tool</Link>{" "}
                  and try it now.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="mt-6">
              <Link href="/pdf-merge" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Try PDF Merge Free
              </Link>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/pdf-merge", label: "PDF Merge", icon: "M12 4v16m8-8H4" },
                  { href: "/pdf-split", label: "PDF Split", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
                  { href: "/pdf-to-word", label: "PDF to Word", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  { href: "/pdf-to-image", label: "PDF to Image", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} /></svg>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Merge PDFs?",
                  "Step-by-Step Guide",
                  "Common Use Cases",
                  "Tips for Merging PDFs",
                  "Privacy & Security",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/how-to-compress-images-for-web" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">How to Compress Images for the Web</Link>
                <Link href="/blog/convert-word-to-pdf-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">Convert Word to PDF Free</Link>
                <Link href="/blog/optimize-images-for-seo" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">Optimize Images for SEO</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
