import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PdfCompressClient = dynamic(() => import("./PdfCompressClient"), {
  loading: () => (
    <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
  ),
  ssr: false,
});

const SITE_URL = "https://www.thepdftools.site";
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
    text: "Choose Light to keep embedded images sharp, Medium for a balance, or Maximum when the smallest size matters most. Text, links and forms are kept at every level.",
  },
  {
    name: "Compress",
    text: "Click Compress PDF. The tool re-encodes the images inside your PDF at the chosen quality and rebuilds the file. For scanned PDFs you can also tick “Convert pages to images” for an even smaller result.",
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
    a: "By default it re-encodes the images embedded in your PDF (JPEG photos, and PNG-style pictures when that saves a lot of space) at a lower quality and, at Medium and Maximum, a lower resolution, then rebuilds the file with a more compact structure. Text, fonts, links and form fields are not touched. For scanned or photo-only PDFs there is an optional “Convert pages to images” setting that renders each page as an image for the smallest possible file.",
  },
  {
    q: "Will the text in my PDF still be selectable and searchable after compressing?",
    a: "Yes, with the default settings. Only the embedded images are re-encoded, so selectable, searchable and copyable text stays exactly as it was. The one exception is the optional “Convert pages to images” setting (and the automatic fallback on the 100KB and 200KB pages), which flattens every page into a picture, so text can no longer be selected.",
  },
  {
    q: "Is this tool a good choice for compressing a resume before a job application?",
    a: "Yes, as long as you leave “Convert pages to images” unticked. The default mode keeps the resume's text intact, so applicant tracking systems can still read it. Always open the result and check that it reads correctly before submitting.",
  },
  {
    q: "Does this always reduce PDF file size by 80%?",
    a: "No. Reductions of 50–80% are common on PDFs that contain large photos or scans. A PDF that is mostly text has few images to shrink, so it may get only a few percent smaller, or none at all.",
  },
  {
    q: "Why does the tool say \"No smaller version could be made\" on my file?",
    a: "It means none of the attempts produced a file smaller than the original, so the tool does not offer a download. This is typical for text-only PDFs and for files that were already compressed. If the file is a scan, tick “Convert pages to images” and try again.",
  },
  {
    q: "Which compression level should I use?",
    a: "Use Light for documents where picture quality matters most, such as brochures or reports you'll print. Use Medium as a general default. Use Maximum when you must hit a strict size limit, since it produces the most visible loss in photos.",
  },
  {
    q: "Is my PDF uploaded to a server during compression?",
    a: "No. The PDF file's contents are read and processed in your browser. The tool does load its PDF-rendering library from a public CDN, but your document itself is not sent anywhere.",
  },
  {
    q: "Can I compress a password-protected PDF?",
    a: "Not directly. An encrypted or password-protected file cannot be read until the password is removed, so use the PDF Unlock tool first and then compress the unlocked copy.",
  },
  {
    q: "Does compression affect PDF forms or embedded links?",
    a: "Not with the default settings: form fields, clickable links and bookmarks are kept. They are lost only if you tick “Convert pages to images”, or when the 100KB and 200KB pages have to fall back to it to reach their target size.",
  },
  {
    q: "Will small text still be readable after Maximum compression?",
    a: "Yes in the default mode, because text is not re-encoded. Photos and scanned pages inside the PDF can look softer at Maximum. If you tick “Convert pages to images”, small fonts can also turn blurry, so check the result before relying on it.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. The tool is free with no signup, no watermark, and no forced software installation.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes, the interface is responsive. Large PDFs with many big images, or the “Convert pages to images” option, can be slower on an older or lower-powered phone than on a desktop.",
  },
  {
    q: "How many pages can I compress at once?",
    a: "There's no fixed page limit. Very large files take proportionally longer and use more of your device's memory, especially when pages are converted to images.",
  },
  {
    q: "What's the difference between this and Compress PDF to 100KB?",
    a: "Compress PDF to 100KB and Compress PDF to 200KB use the same engine but keep going until the file is under the target: first stronger image compression with text kept, and only if that is not enough, converting pages to images at the clearest quality that fits, in colour or sharp black and white. Use this general compressor when you want to choose the level yourself.",
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
                Reduce PDF file size in your browser by re-encoding the images
                inside your PDF at a quality level you choose. Text, links and
                forms stay untouched. It works best on PDFs with photos or
                scans; for scanned files there is an optional setting that
                converts pages to images for an even smaller result.
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
              By default this tool looks for the images embedded in your
              PDF, re-encodes them at the quality (and, for Medium and
              Maximum, the resolution) you chose, and rebuilds the file with a
              more compact structure. PNG-style pictures are turned into JPEG
              only when that makes them much smaller, so most screenshots and
              line art stay sharp. <strong>Text, fonts, links, bookmarks and
              form fields are not touched</strong>, so the result stays
              selectable and searchable. A new version is only offered when it
              is actually smaller than your original.
            </p>
            <p>
              The limit of this approach is that a PDF with little or no
              embedded imagery (a text-only resume or contract, for example)
              has almost nothing to shrink, and the tool will tell you so
              instead of giving you a bigger file. For scanned or photo-only
              PDFs you can tick <strong>Convert pages to images</strong>. That
              renders every page as a picture, which gives the smallest
              files, but <strong>text is no longer selectable or searchable
              and links and form fields are lost</strong>, so leave it off for
              resumes, contracts and fillable forms. The 100KB and 200KB pages
              convert pages to images only when the target cannot be reached any
              other way, pick the clearest quality that fits, and say so in the
              result.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Privacy &amp; Security
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            Your PDF's contents are read and processed in your browser rather
            than uploaded to a server to be compressed. Its PDF libraries are
            loaded from this website, and your document itself is never
            transmitted anywhere. This keeps
            invoices, contracts, resumes, and other private documents off a
            remote upload queue.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Tool Limitations
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-[15px] leading-7 text-slate-600">
            <li>Only gray and RGB images are re-encoded. CMYK, palette and black-and-white fax images, transparency masks, vector art and text are not re-encoded.</li>
            <li>Text-only PDFs may shrink very little; if nothing smaller can be made, no download is offered.</li>
            <li>“Convert pages to images” makes text non-selectable and drops links, bookmarks and form fields.</li>
            <li>Password-protected PDFs must be unlocked before compressing.</li>
            <li>Maximum compression can make photos and scanned pages look soft — check before relying on it.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Common Mistakes &amp; Best Practices
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Compressing a resume before ATS submission</h3>
              <p className="mt-1 text-sm text-slate-500">Leave “Convert pages to images” off so the text stays readable, and open the result to check it before submitting.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Using Maximum on photo-heavy pages</h3>
              <p className="mt-1 text-sm text-slate-500">Try Light or Medium first and compare before assuming the smallest setting is the right one.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-medium text-slate-900">Flattening a fillable form</h3>
              <p className="mt-1 text-sm text-slate-500">Only tick “Convert pages to images” after a form is fully filled and finalized; interactive fields do not survive it.</p>
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
              <strong>Light</strong> re-encodes embedded images at high quality
              and keeps their resolution — the smallest visible change, best
              for documents you still need to look sharp.{" "}
              <strong>Medium</strong> lowers quality and caps image
              resolution, a reasonable default for general size reduction.{" "}
              <strong>Maximum</strong> uses the lowest quality and resolution
              for the smallest file, best reserved for strict size-limited
              portals, since it is the setting most likely to make photos
              look soft.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              When this tool is the right choice
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              This compressor is a strong fit for PDFs that contain photos,
              scans or other large images, and it keeps the text,
              links and forms of such documents intact. A PDF that is only
              text has almost nothing to shrink; the tool will report that
              honestly. For scans without any selectable text, the “Convert
              pages to images” option gives the smallest result.
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

          <SeoReferences
            links={[
              { href: "https://mozilla.github.io/pdf.js/", label: "PDF.js: Browser PDF rendering" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: Image formats and compression basics" },
              { href: "https://web.dev/learn/images/", label: "web.dev: Image optimization tradeoffs" },
            ]}
          />

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
