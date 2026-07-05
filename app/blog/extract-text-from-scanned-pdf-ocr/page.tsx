import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/extract-text-from-scanned-pdf-ocr`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata("extract-text-from-scanned-pdf-ocr");
}


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Extract Text from Scanned PDFs with OCR (Free Guide)",
      description:
        "Turn scanned PDFs and image-based documents into searchable, selectable, copy-pasteable text using free OCR tools. Learn how OCR works, when you need it, and how to make a scanned PDF searchable in minutes.",
      url: POST_URL,
      datePublished: "2026-06-14T00:00:00Z",
      dateModified: "2026-06-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 2300,
      articleSection: "PDF Tools",
      keywords: ["extract text from pdf ocr", "scanned pdf to text", "ocr pdf free", "make scanned pdf searchable", "pdf text recognition"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Extract Text from Scanned PDFs with OCR", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is OCR and why do scanned PDFs need it?",
          acceptedAnswer: { "@type": "Answer", text: "OCR (Optical Character Recognition) analyzes the shapes in a scanned image and converts them into actual text characters. A scanned PDF is just a picture of a page — without OCR, you can't search, copy, or select any of its text." },
        },
        {
          "@type": "Question",
          name: "Will OCR work on handwriting?",
          acceptedAnswer: { "@type": "Answer", text: "OCR works best on printed text. Most general-purpose OCR tools struggle with handwriting, especially cursive — results vary widely and often need manual correction." },
        },
        {
          "@type": "Question",
          name: "Does OCR change the original document?",
          acceptedAnswer: { "@type": "Answer", text: "No. A good OCR tool keeps the original page images intact and adds an invisible text layer behind them, so the PDF looks exactly the same but becomes searchable and selectable." },
        },
        {
          "@type": "Question",
          name: "Can I OCR a PDF for free without installing software?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Our browser-based OCR tool processes your PDF locally — upload a scanned PDF and download a searchable version, with no installation, signup, or file size limits tied to a paid plan." },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function ExtractTextFromScannedPdfOcr() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              <div className="mt-6 flex flex-wrap gap-2">
                {["PDF Tools", "OCR"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Extract Text from Scanned PDFs
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  with Free OCR — Step by Step
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>June 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>11 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                If you&rsquo;ve ever tried to search, copy, or edit text in a scanned PDF and found that nothing happens when you select it, you&rsquo;ve run into the most common limitation of scanned documents: they&rsquo;re images, not text. This guide explains how OCR (Optical Character Recognition) solves that problem, when you need it, and how to convert any scanned PDF into a searchable, selectable document for free.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why a Scanned PDF Isn&rsquo;t Really "Text"</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  When you scan a paper document — or take a photo of it with your phone and save it as a PDF — what you get is a picture of the page, wrapped inside a PDF container. To your computer, that page is no different from a photo of a sunset: a grid of pixels with no concept of letters, words, or paragraphs.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  This creates real problems. You can&rsquo;t press Ctrl+F to find a clause in a scanned contract. You can&rsquo;t copy a paragraph to paste into an email. Screen readers used by visually impaired users can&rsquo;t read the content aloud. And if you need to translate the document or run it through any text-processing tool, you&rsquo;re stuck retyping everything by hand.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  OCR (Optical Character Recognition) solves this by analyzing the shapes on each page, recognizing them as letters and numbers, and reconstructing the actual text — turning a "picture of words" into real, searchable, selectable words.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How OCR Works (In Plain Terms)</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Modern OCR engines go through a few stages for each page of your document:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">1. Pre-processing</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The image is cleaned up — straightened if it was scanned at an angle, contrast adjusted, and noise removed so text stands out clearly from the background.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">2. Layout Analysis</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The engine identifies which regions of the page contain text, images, or tables, and determines the reading order — important for multi-column documents.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">3. Character Recognition</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Each text region is broken into individual characters and words, which are matched against trained models to determine the most likely letters and numbers.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">4. Text Layer Output</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The recognized text is placed into an invisible layer positioned exactly over the original image, so the page still looks like a scan but now contains real, selectable text underneath.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 — Step by step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Make Your Scanned PDF Searchable</h2>
              <ol className="mt-5 space-y-4">
                {[
                  "Open our OCR tool and upload your scanned PDF — this can be a document you scanned, downloaded, or photographed with your phone and converted to PDF.",
                  "The tool analyzes each page and runs OCR locally in your browser, identifying text regions and recognizing characters.",
                  "Review the recognized text. For most printed documents — invoices, reports, books, forms — recognition accuracy is very high; for low-quality scans or unusual fonts, spot-check a few pages.",
                  "Download the new searchable PDF. It looks identical to the original but now has a text layer behind every page, so Ctrl+F and copy-paste work as expected.",
                  "If you need the raw text separately (for example, to paste into a document or translation tool), use the extracted text output alongside the searchable PDF.",
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
                  href="/pdf-ocr"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-9 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Run OCR on Your PDF Free
                </Link>
              </div>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                You can also use our <Link href="/scanned-pdf-to-searchable-pdf" className={toolLink}>Scanned PDF to Searchable PDF</Link> tool, which is built specifically for converting batches of scanned pages into a single searchable document.
              </p>
            </section>

            {/* Section 4 — When you need OCR */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Common Situations Where OCR Saves the Day</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Old Scanned Records", desc: "Digitizing years of paper archives — contracts, invoices, certificates — into a searchable digital library." },
                  { label: "Photographed Receipts & Invoices", desc: "Turn phone photos of receipts into text you can extract line items, totals, and dates from for expense tracking." },
                  { label: "Research Papers & Books", desc: "Make scanned academic papers or out-of-print books searchable and quotable for research." },
                  { label: "Government & Legal Forms", desc: "Search through scanned filings, applications, or court documents for specific clauses or names." },
                  { label: "Foreign Language Documents", desc: "Extract text from scanned foreign-language documents so it can be pasted into a translation tool." },
                  { label: "Accessibility", desc: "Add a text layer so screen readers can read scanned documents aloud for visually impaired users." },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 — Improving accuracy */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Tips for Getting the Best OCR Results</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Scan at a Higher Resolution</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    OCR accuracy improves significantly with resolution. If you&rsquo;re scanning fresh documents, use at least 300 DPI — low-resolution scans (especially under 150 DPI) can cause characters to blur together and reduce accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Straighten Skewed Pages</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    A page scanned at an angle is much harder for OCR to read. If your scanner doesn&rsquo;t auto-straighten, try our <Link href="/pdf-rotate" className={toolLink}>PDF Rotate</Link> tool to correct orientation before running OCR.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Use Good Lighting for Phone Photos</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    If you&rsquo;re photographing a document instead of scanning it, avoid shadows and glare. Even lighting and a flat, well-lit surface dramatically improve OCR accuracy on phone-captured pages.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Check Multi-Column Layouts</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    Newspapers, academic papers, and brochures with multiple columns can sometimes have their reading order mixed up. Spot-check the extracted text order on these layouts after OCR.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 — Pro tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for Working with Scanned Documents</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>OCR before you sign.</strong> If you need to find a specific clause to sign or initial, run OCR first so you can search the document, then use our <Link href="/pdf-sign" className={toolLink}>PDF Sign</Link> tool.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Compress after OCR.</strong> Searchable PDFs can be slightly larger due to the added text layer — run the result through <Link href="/pdf-compress" className={toolLink}>PDF Compress</Link> if file size matters.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Combine multiple scans first.</strong> If you scanned a multi-page document as separate files, use <Link href="/pdf-merge" className={toolLink}>PDF Merge</Link> to combine them before running OCR — it's faster than processing each file separately.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep both versions.</strong> Store the OCR'd searchable version for daily use, but keep the original scan as your archival copy.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Don't expect perfect handwriting recognition.</strong> If your documents include handwritten notes or signatures, expect those areas to need manual review even after OCR.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A scanned PDF doesn&rsquo;t have to stay a dead-end image file. With free, browser-based <Link href="/pdf-ocr" className={toolLink}>OCR</Link>, you can turn any scanned document into a searchable, selectable, accessible PDF in minutes — no software installation, no per-page fees, and no file ever leaving your device.
              </p>
            </section>
          <BlogFooterLinks slug="extract-text-from-scanned-pdf-ocr" includeBreadcrumbSchema={false} includeFaqSchema={false} />
      </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/pdf-ocr", label: "PDF OCR", icon: "M9 12h6m-6 4h6m-9 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
                  { href: "/scanned-pdf-to-searchable-pdf", label: "Scanned PDF to Searchable", icon: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" },
                  { href: "/pdf-merge", label: "Merge PDF", icon: "M9 9h6v6H9V9zm-6 0h3v3H3V9zm0 6h3v3H3v-3zm15-6h3v3h-3V9zm0 6h3v3h-3v-3z" },
                  { href: "/pdf-compress", label: "Compress PDF", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
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

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why a Scanned PDF Isn't Text",
                  "How OCR Works",
                  "Step-by-Step: Make It Searchable",
                  "Common Situations for OCR",
                  "Tips for Best OCR Results",
                  "Pro Tips for Scanned Documents",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/how-to-merge-pdf-files-online" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Merge PDF Files Online
                </Link>
                <Link href="/blog/compress-pdf-files-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Compress PDF Files Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
