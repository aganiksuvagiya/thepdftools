import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PdfCompressClient = dynamic(() => import("./PdfCompressClient"), {
  loading: () => (
    <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
  ),
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-compress`;

const pageTitle = "Compress PDF Online Free — Reduce PDF File Size Instantly";
const pageDescription =
  "Compress a PDF in your browser by re-rendering pages at a chosen quality level. Works best on scanned or image-heavy PDFs. No upload, no signup, no watermark.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "compress pdf online free",
    "reduce pdf file size online",
    "pdf compressor no upload",
    "compress scanned pdf",
    "shrink pdf file size",
    "free pdf compressor browser",
  ],
  imageAlt: "PDF compressor showing original and compressed file size comparison",
});

const howToSteps = [
  {
    name: "Upload your PDF",
    text: "Open the compressor above and drop in the PDF you want to shrink.",
  },
  {
    name: "Pick a compression level",
    text: "Choose Light for text-heavy documents where you want to keep quality high, Medium for a balance, or Maximum for scanned or image-heavy files where the smallest size matters most.",
  },
  {
    name: "Compress",
    text: "Click Compress PDF. Each page is re-rendered as an image at your chosen quality, then rebuilt into a new PDF — this takes a few seconds per page.",
  },
  {
    name: "Check the result",
    text: "Compare the original and compressed size badges and the percentage saved before downloading.",
  },
  {
    name: "Download",
    text: "Click Download Compressed PDF to save the result to your device.",
  },
] as const;

const faqItems = [
  {
    q: "How does this PDF compressor actually reduce file size?",
    a: "It re-renders each page of the PDF as an image at your chosen quality level, then rebuilds a new PDF from those images. This works well for scanned pages and image-heavy documents, but it means every page becomes a flattened image rather than staying as live text.",
  },
  {
    q: "Will the text in my PDF still be selectable and searchable after compressing?",
    a: "No. Because compression works by rendering each page to an image, the output PDF no longer contains selectable, searchable, or copyable text — even if the original document did. If you need to keep text selectable, do not use this tool on that file.",
  },
  {
    q: "Is this tool a good choice for compressing a resume before a job application?",
    a: "Be cautious. Many applicant tracking systems (ATS) parse resume text directly from the PDF. Since this tool converts every page into an image, an ATS may no longer be able to read the resume's text after compression. For resumes, try Light compression only if the file must be smaller, and verify the result opens and reads correctly before submitting.",
  },
  {
    q: "Does this always reduce PDF file size by 80%?",
    a: "No. Reductions of 50–80% are common on scanned or image-heavy PDFs. Text-heavy documents can shrink much less, and in some cases the rendered-image version can end up larger than a well-optimized text-based original, since a photo of a page of text takes more data than the text itself.",
  },
  {
    q: "Why does the tool say \"No further reduction possible\" on my file?",
    a: "This means the image-rendered version at your chosen quality level didn't come out smaller than the original. This is more likely on already-compact, text-based PDFs. Try a lower quality level (Maximum), or consider that this file may not be a good candidate for this specific compression method.",
  },
  {
    q: "Which compression level should I use?",
    a: "Use Light for documents where readability and quality matter most, such as contracts or reports you'll print. Use Medium as a general default. Use Maximum only for scanned documents or image-heavy files headed to a strict size-limited portal, since it produces the most visible quality loss.",
  },
  {
    q: "Is my PDF uploaded to a server during compression?",
    a: "No. The PDF file's contents are read and processed in your browser. The tool does load its PDF-rendering library from a public CDN, but your document itself is not sent anywhere.",
  },
  {
    q: "Can I compress a password-protected PDF?",
    a: "No. The tool needs to read the PDF's pages to render them, so an encrypted or password-protected file will fail to process until the password is removed first.",
  },
  {
    q: "Does compression affect PDF forms or embedded links?",
    a: "Yes, significantly. Since every page is flattened into an image, interactive form fields, clickable links, and bookmarks from the original PDF do not survive compression. Use this tool on final, non-interactive documents, not on fillable forms you still need to be interactive.",
  },
  {
    q: "Will small text still be readable after Maximum compression?",
    a: "Not always. Maximum compression uses the lowest render scale and JPEG quality, which can make small fonts or fine print blurry. Check the result before relying on it, especially for documents with dense small text.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. The tool is free with no signup, no watermark, and no forced software installation.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes, the interface is responsive, though rendering many pages as images can be slower on an older or lower-powered phone than on a desktop.",
  },
  {
    q: "How many pages can I compress at once?",
    a: "There's no fixed page limit, but each page is individually rendered to an image, so very long documents take proportionally longer and use more of your device's memory.",
  },
  {
    q: "What's the difference between this and Compress PDF to 100KB?",
    a: "Compress PDF to 100KB is the same underlying approach tuned toward a specific 100KB target for portal uploads. Use this general compressor when you want to choose a quality level directly instead of targeting an exact file size.",
  },
  {
    q: "Should I merge or split PDFs before or after compressing?",
    a: "Usually merge first, then compress the combined file once, since compressing several small files separately can produce a larger total than compressing one merged document. If you only need part of a document, split it first, then compress just the pages you need.",
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
      name: "Compress PDF",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Compress a PDF in the browser by re-rendering pages at a chosen quality level",
        "Choose Light, Medium, or Maximum compression",
        "Preview original vs. compressed size and percentage saved before downloading",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to compress a PDF online",
      description: "A workflow for reducing PDF file size by re-rendering pages at a chosen quality level.",
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
        { "@type": "ListItem", position: 3, name: "Compress PDF Online Free", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function PdfCompressPage() {
  const lastUpdated = getLastUpdated("app/pdf-compress/page.tsx");

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "Compress PDF" },
        ]} />
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                PDF compressor no upload
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Compress PDF online free
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Reduce PDF file size in your browser by re-rendering pages at a
                quality level you choose. It works best on scanned or
                image-heavy PDFs — read below before using it on a document
                where you need to keep the text selectable or searchable.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pdf-compressor"
                  className="inline-flex justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
                >
                  Upload PDF
                </a>
                <a
                  href="#related-tools"
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  Try Other Tools
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["No Upload Required", "Your PDF is processed in the browser."],
                ["Choose Your Quality", "Light, Medium, or Maximum compression levels."],
                ["Free to Use", "No signup, no watermark, no install."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h2 className="text-sm font-bold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pdf-compressor" className="mt-8">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <PdfCompressClient />
          </div>
        </section>

        {/* What this tool actually does — the honesty-critical section */}
        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            How This Compressor Actually Works (Read This First)
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-700">
            <p>
              This tool reduces file size by rendering every page of your PDF
              as an image at your chosen quality level, then rebuilding a new
              PDF from those images. That approach shrinks scanned pages and
              image-heavy documents very effectively, but it comes with a
              real tradeoff: <strong>the output PDF no longer contains
              selectable, searchable, or copyable text</strong>, even if your
              original file did. Form fields, links, and bookmarks also do
              not survive the process.
            </p>
            <p>
              That matters most for resumes (many applicant tracking systems
              read resume text directly and may not be able to parse a
              flattened image version), contracts you still need to
              search or copy from, and any fillable form you plan to keep
              interactive. For those documents, use Light compression only if
              a smaller file is required, and always check the result before
              relying on it. For scanned documents, photographed pages, or
              already-flattened image-based PDFs, this tradeoff doesn't cost
              you anything you had to begin with.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Privacy &amp; Security
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            Your PDF's contents are read and processed in your browser rather
            than uploaded to a server to be compressed. The tool does load
            its PDF-rendering library from a public CDN on first use, but
            your document itself is never transmitted anywhere. This keeps
            invoices, contracts, resumes, and other private documents off a
            remote upload queue.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Tool Limitations
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-[15px] leading-7 text-slate-600">
            <li>Output pages are flattened images — text is no longer selectable, searchable, or copyable.</li>
            <li>Form fields, links, and bookmarks in the original PDF do not carry over.</li>
            <li>Password-protected PDFs must be unlocked before compressing.</li>
            <li>Text-heavy documents may shrink very little, or occasionally end up larger than the original.</li>
            <li>Maximum compression can make small or fine-print text blurry — check before relying on it.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Common Mistakes &amp; Best Practices
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Compressing a resume before ATS submission</h3>
              <p className="mt-1 text-sm text-slate-500">Verify the result still reads correctly, or skip compression if the file already meets the portal's size limit.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Using Maximum on dense small text</h3>
              <p className="mt-1 text-sm text-slate-500">Try Light or Medium first and compare before assuming the smallest setting is the right one.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Compressing a fillable form</h3>
              <p className="mt-1 text-sm text-slate-500">Interactive form fields don't survive this process — only compress a form after it's fully filled and finalized.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Compressing several files separately</h3>
              <p className="mt-1 text-sm text-slate-500">Merge them into one PDF first, then compress once — this usually produces a smaller total than compressing each file on its own.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Popular PDF compression pages
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            If you need a more specific workflow, use one of these focused
            landing pages built around common search intent and upload limits.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/compress-pdf-to-100kb"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Compress PDF to 100KB
            </Link>
            <Link
              href="/compress-pdf-for-govt-exam"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Compress PDF for Govt Exam
            </Link>
            <Link
              href="/reduce-pdf-size-online-free"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Reduce PDF Size Online Free
            </Link>
          </div>
        </section>

        <article className="mt-8 space-y-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Choosing a Compression Level
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              <strong>Light</strong> renders pages at the highest scale and
              JPEG quality of the three settings — the smallest visible
              quality change, best for documents you still need to look
              sharp. <strong>Medium</strong> is a reasonable default for
              general size reduction. <strong>Maximum</strong> renders at the
              lowest scale and quality for the smallest possible file, and is
              best reserved for already-scanned or image-heavy documents
              headed to a strict size-limited portal, since it's the setting
              most likely to make text look soft or blurry.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              When this tool is the right choice
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              This compressor is a strong fit for scanned reports, photographed
              pages, and image-heavy PDFs where the pages were never
              selectable text to begin with. For a text-based contract,
              resume, or report where you need to preserve copy-paste text,
              searchability, or embedded form fields, either accept the
              tradeoff explicitly or look for a text-preserving compression
              approach instead.
            </p>
          </section>

        <section id="related-tools" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Related PDF tools
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              Continue your PDF workflow with these internal tools.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pdf-merge"
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Merge PDF
              </Link>
              <Link
                href="/pdf-split"
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Split PDF
              </Link>
              <Link
                href="/pdf-to-word"
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF to Word
              </Link>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Related guides
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              Read these guides if you want extra help with compression settings, email limits, and related PDF workflows.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/blog/compress-pdf-files-free" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF Files Free</Link>
              <Link href="/blog/compress-pdf-for-email-online" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF for Email</Link>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
