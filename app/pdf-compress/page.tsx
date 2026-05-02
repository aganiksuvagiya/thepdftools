import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfCompressClient = dynamic(() => import("./PdfCompressClient"), {
  loading: () => (
    <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
  ),
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-compress`;

export const metadata: Metadata = {
  title: "Compress PDF Online Free - Reduce PDF Size No Upload",
  description:
    "Compress PDF online free and reduce PDF file size fast with no upload required. Private browser-based PDF compressor with no signup.",
  keywords: [
    "compress pdf online free",
    "compress pdf without losing quality online free",
    "reduce pdf file size online",
    "pdf compressor no upload",
    "free pdf compressor",
    "no upload pdf tools",
    "browser-based pdf compressor",
    "secure file processing",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Compress PDF Online Free - Reduce PDF Size No Upload",
    description:
      "Compress PDF online free and reduce PDF file size fast with no upload required. Private browser-based PDF compressor with no signup.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "compress pdf online free no upload",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online Free - Reduce PDF Size No Upload",
    description:
      "Compress PDF online free and reduce PDF file size fast with no upload required. Private browser-based PDF compressor with no signup.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const faqItems = [
  {
    question: "Is this PDF compressor safe?",
    answer:
      "Yes. This PDF compressor is safe to use because it is built for secure file processing in your browser. Your document is handled locally whenever browser-based compression is supported.",
  },
  {
    question: "Does it upload files?",
    answer:
      "No. This is a PDF compressor no upload workflow. Your file is processed in the browser, so you can reduce PDF file size online without sending the document to a server.",
  },
  {
    question: "How to compress PDF without losing quality?",
    answer:
      "To compress PDF without losing quality online free, upload your PDF, start with a balanced compression setting, preview the output, and download the reduced file. Text and layout are preserved while unnecessary file data is optimized.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. The tool is free to use with no signup, no watermark, and no forced software installation.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The PDF compressor works on modern mobile, tablet, and desktop browsers with a responsive interface.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Compress PDF Online Free",
      url: PAGE_URL,
      description:
        "Reduce PDF file size without losing quality. Free, fast & no upload required.",
      mainEntity: {
        "@id": `${PAGE_URL}#pdf-compressor-app`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}#pdf-compressor-app`,
      name: "Compress PDF Online Free",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: PAGE_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free browser-based PDF compressor no upload tool to reduce PDF file size online without losing quality.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Compress PDF Online Free",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function PdfCompressPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                PDF compressor no upload
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Compress PDF online free
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Reduce PDF file size online with a free, fast, browser-based
                PDF compressor. No upload required, no signup, and no extra
                software installation.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pdf-compressor"
                  className="inline-flex justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
                >
                  Upload PDF
                </a>
                <a
                  href="#pdf-compressor"
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  Compress Now
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
                ["No Upload Required", "Your PDF stays in the browser workflow."],
                ["Fast Compression", "Reduce PDF file size online in seconds."],
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

        <section className="mt-8 rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            100% Privacy - No File Upload Required
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            This no upload PDF tool is designed for people who need secure file
            processing without sending documents to a remote server. The PDF
            compressor runs as a browser-based tool whenever possible, so your
            file stays on your device while you reduce PDF file size online.
            That makes it useful for invoices, contracts, resumes, reports,
            school documents, tax files, and other private PDFs that should not
            pass through an unknown upload queue.
          </p>
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
              Compress PDF without losing quality
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              The best way to compress PDF without losing quality online free
              is to start with a balanced compression workflow. A PDF can become
              large because it contains embedded images, fonts, metadata,
              unused objects, editing history, or duplicate internal resources.
              A good PDF compressor does not simply blur the document or damage
              text. Instead, it optimizes the file structure, removes
              unnecessary data, and keeps the pages readable. That is why this
              page focuses on practical PDF compression for documents you still
              need to share, print, upload, or archive.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              Reduce PDF file size online
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              When you reduce PDF file size online, the goal is not always the
              smallest possible number. For email attachments, form submissions,
              job applications, and client reports, the better goal is a smaller
              file that still opens cleanly and looks professional. Use this
              free PDF compressor before uploading to portals with strict size
              limits, before sending documents through Gmail or Outlook, or
              before storing large batches of scanned files in cloud storage.
              The page is mobile responsive, so you can compress a PDF from a
              phone, tablet, laptop, or desktop browser.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              PDF compressor no upload
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              A PDF compressor no upload workflow is especially important when
              a document contains personal or business information. Many online
              tools require you to upload the file first, wait for server-side
              processing, then download the result. This browser-based PDF
              compressor keeps the flow direct: choose your PDF, compress it,
              and download the optimized version. There is no account gate, no
              hidden watermark step, and no need to install a desktop app just
              to make one file smaller.
            </p>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">
              Use the tool above when you need to compress PDF online free,
              reduce PDF file size online, or prepare a lighter document for
              sharing. After compression, open the result and check key pages:
              make sure text is sharp, images are acceptable, and the file size
              matches your upload requirement. If you are building a final
              document from multiple files, merge the PDFs first, then compress
              the finished file. If you only need a few pages, split the PDF
              first, then compress the smaller document.
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
              <Link href="/blog/how-to-compress-pdf-without-losing-quality" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF Without Losing Quality</Link>
              <Link href="/blog/compress-pdf-for-email-online" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF for Email</Link>
              <Link href="/blog/compress-pdf-files-free" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">Reduce PDF Size Free</Link>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.answer}
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
