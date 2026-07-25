import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PdfSplitClient = dynamic(() => import("./PdfSplitClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-split`;

const pageTitle = "Split PDF Online Free — Extract Pages & Page Ranges";
const pageDescription =
  "Split a PDF into individual pages or custom page ranges in your browser. No re-encoding, no upload, no signup — download each part or all of them at once.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "split pdf online free",
    "pdf splitter",
    "extract pages from pdf online free",
    "split pdf pages",
    "pdf page extractor free",
    "separate pdf pages online",
    "split pdf by page range",
    "extract pdf pages no signup",
  ],
  imageAlt: "PDF split tool extracting page ranges into separate PDF files",
});

const howToSteps = [
  {
    name: "Upload your PDF",
    text: "Open the splitter above and drop in the PDF you want to split, or click to browse for one.",
  },
  {
    name: "Choose a split mode",
    text: "Pick \"Split all pages\" to turn every page into its own single-page PDF, or \"Custom range\" to define exactly which pages to pull out.",
  },
  {
    name: "Enter ranges if using Custom",
    text: "Type ranges like \"1-3, 5, 7-10\", separated by commas. Each comma-separated group becomes its own separate PDF file — a range like 1-3 stays together as one 3-page file.",
  },
  {
    name: "Split",
    text: "Click Split PDF. Pages are copied directly with pdf-lib, so there's no re-encoding and no quality loss.",
  },
  {
    name: "Download",
    text: "Download each resulting PDF individually, or use Download All to save every part at once.",
  },
] as const;

const faqItems = [
  {
    q: "Can I extract a specific page range from a PDF?",
    a: "Yes. Choose Custom range and type something like \"3-10\" to pull those pages out as one combined PDF.",
  },
  {
    q: "If I type \"1, 3, 5\" do I get one PDF with those three pages together?",
    a: "No. Each comma-separated entry becomes its own separate PDF file. Typing \"1, 3, 5\" produces three separate one-page files, not a single combined 3-page file. Use a single range like \"1-5\" if you want consecutive pages kept together in one file.",
  },
  {
    q: "What does \"Split all pages\" do?",
    a: "It turns every page of the PDF into its own individual single-page PDF file — useful when you need each page as a standalone document rather than a specific subset.",
  },
  {
    q: "Does splitting reduce the quality of the pages?",
    a: "No. Pages are copied directly from the source document using pdf-lib rather than being re-rendered or re-encoded, so text, images, and formatting stay exactly as they were in the original.",
  },
  {
    q: "Does \"Download All\" create a single ZIP file?",
    a: "No. Download All triggers a separate download for each resulting PDF at once rather than bundling them into one ZIP archive. If your browser blocks multiple simultaneous downloads, allow pop-ups/downloads for this site or download each file individually.",
  },
  {
    q: "Can I split a password-protected PDF?",
    a: "Not directly. The tool needs to read the PDF's contents to split it, so an encrypted or password-protected file will fail to load until the password is removed first.",
  },
  {
    q: "Is there a maximum number of pages I can split?",
    a: "There's no fixed page-count limit set by the tool. Since everything runs in your browser, very large documents depend on your device's available memory rather than a server-side cap.",
  },
  {
    q: "Does the file get uploaded to a server to be split?",
    a: "No. Splitting happens in your browser using the pdf-lib library — the file is read and processed locally and isn't sent to a remote server.",
  },
  {
    q: "Can I split more than one PDF at a time?",
    a: "No, this tool works with one source PDF per session. Reset and upload a new file after you've finished with the current one.",
  },
  {
    q: "Will the split files keep the original page size and orientation?",
    a: "Yes. Because pages are copied rather than re-rendered, each output file keeps the exact page size and orientation of the source PDF.",
  },
  {
    q: "How do I extract just one page from a long PDF?",
    a: "Choose Custom range and enter just that page number, for example \"12\", to get a single-page PDF containing only that page.",
  },
  {
    q: "Can I extract multiple separate ranges in one operation?",
    a: "Yes. Enter multiple ranges separated by commas, like \"1-2, 10-15, 20\". Each range or page number becomes its own downloadable PDF in a single split operation.",
  },
  {
    q: "Why did I get an error about an invalid page range?",
    a: "This happens if a range starts after it ends (like \"10-5\") or references a page number higher than the document's actual page count. Check the page count shown after upload and adjust the range.",
  },
  {
    q: "Are bookmarks or annotations preserved in the split files?",
    a: "Page content, text, and images are preserved exactly. Document-level features like bookmarks or embedded form fields tied to the original file structure are not guaranteed to carry over into each extracted file.",
  },
  {
    q: "Can I use this to pull chapters out of an e-book or manual?",
    a: "Yes. If you know the page ranges for each chapter, enter them as separate comma-separated ranges and each chapter will come out as its own PDF.",
  },
  {
    q: "Can I use this to separate invoice pages from a combined report?",
    a: "Yes. This is one of the more common uses — extracting a specific invoice's pages out of a larger combined document by entering its page range.",
  },
  {
    q: "Is my PDF saved anywhere after I close the tab?",
    a: "No. Split results exist only in your browser's memory for that session. Download the files you need before closing or refreshing the tab.",
  },
  {
    q: "Can I split a scanned PDF the same way as a text-based one?",
    a: "Yes, splitting works on page structure, not on whether the content is scanned or selectable text, so scanned PDFs split the same way as text-based ones.",
  },
  {
    q: "What should I do if my split file is still too large to upload somewhere?",
    a: "Run the extracted PDF through a compressor afterward. Use PDF Compress for general size reduction, or Compress PDF to 100KB if the destination enforces that specific limit.",
  },
  {
    q: "Can I merge the split files back together later?",
    a: "Yes. Use PDF Merge to recombine selected split files, or add other documents alongside them, in whatever order you need.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: pageTitle,
      url: PAGE_URL,
      description: pageDescription,
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "PDF Split",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Split a PDF into individual single-page files",
        "Extract custom page ranges as separate PDF files, entirely in the browser",
        "Copy pages without re-encoding, preserving original quality",
        "Download each result individually or all at once",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to split a PDF online",
      description: "A workflow for extracting individual pages or custom page ranges from a PDF.",
      step: howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${SITE_URL}/pdf-tools` },
        { "@type": "ListItem", position: 3, name: "PDF Split", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function PdfSplitPage() {
  const lastUpdated = getLastUpdated("app/pdf-split/page.tsx");

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "Split PDF" },
        ]} />
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
                  into separate pages or ranges
                </span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Split a PDF into individual pages, or extract custom page
                ranges as separate files, instantly in your browser. Pages are
                copied without re-encoding, so there's no quality loss — and
                nothing is uploaded to a server.
              </p>
            </div>

            <div className="mt-8">
              <PdfSplitClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for extraction", text: "Pull specific pages or ranges out of large PDFs without any quality loss." },
                { title: "Best for organization", text: "Turn a multi-page document into individual files for easier sharing." },
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
              <li>Use a single range like "3-10" to keep consecutive pages together in one file.</li>
              <li>Use "Split all pages" when you need every page as its own standalone document.</li>
              <li>Remove the password from a locked PDF first — encrypted files will fail to load.</li>
              <li>If your browser only saves one file from "Download All," allow multiple downloads/pop-ups for this site.</li>
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
          {/* What this tool does */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">What This Tool Actually Does</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                This splitter reads your PDF with pdf-lib and copies pages
                directly into new documents — nothing is re-rendered or
                re-encoded, so quality is identical to the source. There are
                two modes: <strong>Split all pages</strong>, which turns every
                page into its own single-page file, and{" "}
                <strong>Custom range</strong>, where you type comma-separated
                ranges like &quot;1-3, 5, 7-10&quot;.
              </p>
              <p>
                One detail that trips people up: each comma-separated entry in
                a custom range becomes its own separate output file. A range
                like &quot;1-3&quot; stays together as one 3-page PDF, but
                typing &quot;1, 3, 5&quot; produces three separate one-page
                PDFs — not one combined 3-page file. Plan your ranges with
                that in mind.
              </p>
            </div>
          </div>

          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Split a PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              {howToSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
          </div>

          {/* Real-life examples */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Real-World Examples</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Chapters from an E-book</h3>
                <p className="mt-1 text-sm text-slate-500">Enter each chapter's page range (e.g. "1-12, 13-30, 31-48") to get one PDF per chapter in a single pass.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">One Invoice from a Combined Report</h3>
                <p className="mt-1 text-sm text-slate-500">If an invoice spans pages 42-45 of a larger report, enter "42-45" to extract exactly that invoice as its own file.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Individual Signed Pages</h3>
                <p className="mt-1 text-sm text-slate-500">Use "Split all pages" on a signed contract to get each page as its own file for separate distribution or filing.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Scanned Homework Pages</h3>
                <p className="mt-1 text-sm text-slate-500">Pull out just the pages a teacher asked to resubmit, then merge them back with a corrected page using PDF Merge.</p>
              </div>
            </div>
          </div>

          {/* Common mistakes / Best practices */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Common Mistakes</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Typing "1, 3, 5" expecting one combined file instead of three separate ones.</li>
                <li>Entering a range that starts after it ends, like "10-5".</li>
                <li>Referencing a page number beyond the document's actual page count.</li>
                <li>Uploading a password-protected PDF without removing the password first.</li>
                <li>Assuming "Download All" produces a single ZIP file rather than several individual downloads.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Best Practices &amp; Expert Tips</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Check the page count shown after upload before typing a custom range.</li>
                <li>Group consecutive pages into one range when you want them to stay together.</li>
                <li>Allow multiple downloads/pop-ups for this site if you plan to use Download All.</li>
                <li>Compress a split file afterward if it still needs to fit a portal's size limit.</li>
                <li>Download the files you need before closing the tab — results aren't saved anywhere.</li>
              </ul>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Troubleshooting</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                <strong>The file won't load:</strong> the most common cause is
                a password-protected or corrupted PDF — remove the password
                using another tool first.
              </p>
              <p>
                <strong>"Invalid range" error:</strong> check that your range
                doesn't exceed the page count shown after upload, and that the
                start number is smaller than the end number.
              </p>
              <p>
                <strong>Only one file downloaded after clicking Download All:</strong>{" "}
                some browsers block multiple simultaneous downloads by
                default — allow downloads or pop-ups for this site, or
                download each result individually instead.
              </p>
              <p>
                <strong>Splitting is slow on a very large PDF:</strong>{" "}
                processing happens on your device, so a very large scanned
                document may take longer on a lower-memory device than on a
                desktop.
              </p>
            </div>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use This PDF Splitter</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Ranges</h3>
                <p className="mt-1 text-sm text-slate-500">Specify exact page ranges like &quot;1-3, 5, 7-10&quot; to extract only the pages you need, each as its own file.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Quality Loss</h3>
                <p className="mt-1 text-sm text-slate-500">Pages are copied directly with pdf-lib rather than re-rendered, so text and images stay exactly as they were.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Fast, Local Processing</h3>
                <p className="mt-1 text-sm text-slate-500">Splitting happens instantly in your browser. No waiting for a server upload or download queue.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload Required</h3>
                <p className="mt-1 text-sm text-slate-500">Your file stays on your device the entire time — nothing is sent to a server to be split.</p>
              </div>
            </div>
          </div>

          {/* Privacy, Security, Limitations, Trust */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Privacy &amp; Security</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your PDF is read and split locally in your browser using
                pdf-lib — the file itself is never uploaded to a server to
                perform the split, which matters for contracts, financial
                documents, and scanned records.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Tool Limitations</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-7 text-slate-600">
                <li>Password-protected PDFs must be unlocked before splitting.</li>
                <li>Comma-separated ranges each produce their own separate file — not one combined file.</li>
                <li>"Download All" triggers multiple browser downloads rather than a single ZIP.</li>
                <li>One source PDF per session — no batch splitting of multiple files at once.</li>
                <li>Bookmarks and form fields tied to the original document structure may not carry over.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">Why Trust This Page</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This page is written and maintained by the thepdftools editorial
              team and is checked directly against the live splitter's
              behavior, including exactly how custom ranges and Download All
              work.
            </p>
          </div>

          {/* Best Next Step */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Best Next Step After Splitting</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If an extracted file still needs to fit a portal's size limit,
              compress it next. If you need to recombine specific split pages
              with other documents, merge them instead.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-compress" className="rounded-full border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700 shadow-sm transition-colors hover:border-brand-300 hover:bg-white">
                Compress Final PDF
              </Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                Merge PDF Pages
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
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

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF</Link>
              <Link href="/compress-pdf-to-100kb" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF to 100KB</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://pdf-lib.js.org/", label: "pdf-lib: PDF splitting in JavaScript" },
              { href: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/", label: "Adobe PDF standards overview" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", label: "MDN: Browser-based file processing" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
