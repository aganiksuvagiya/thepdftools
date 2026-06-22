import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const PdfOcrClient = dynamic(() => import("./PdfOcrClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-ocr`;

const faqItems = [
  {
    q: "How accurate is PDF OCR online?",
    a: "Accuracy depends on scan quality, resolution, text clarity, and page alignment. Clean, high-resolution scanned PDFs usually deliver strong OCR accuracy, while blurry, skewed, or low-contrast pages may need manual review.",
  },
  {
    q: "Can I extract text from all pages of a scanned PDF?",
    a: "Yes. The tool processes every page in the PDF and combines the extracted text in reading order, which is useful for multi-page contracts, invoices, books, and research files.",
  },
  {
    q: "Does PDF OCR work on image-based PDFs?",
    a: "Yes. PDF OCR online is specifically designed for image-based PDFs, scanned documents, photographed pages, receipts, and printed files that do not already contain selectable text.",
  },
  {
    q: "Can I use OCR before I convert PDF to Word?",
    a: "Yes. OCR is often the first step before you convert PDF to Word because it turns scanned text into editable content that can be reused in other formats.",
  },
  {
    q: "Does OCR work on non-English PDFs?",
    a: "OCR language support depends on the recognition model being used. English scans are usually the safest default, while additional languages may vary in accuracy depending on character clarity and layout complexity.",
  },
  {
    q: "How long does PDF OCR take?",
    a: "Processing time depends on the number of pages, your device speed, and scan quality. Small PDFs are usually quick, while larger multi-page files may take longer because the OCR runs in your browser.",
  },
];

const peopleAlsoAsk = [
  {
    q: "What is PDF OCR online?",
    a: "PDF OCR online is a browser-based process that reads text from scanned or image-based PDF pages and turns it into searchable, selectable text.",
  },
  {
    q: "How do I make a scanned PDF searchable?",
    a: "Upload the scanned PDF to an OCR tool, run text recognition on each page, and use the extracted text for search, copy, or editing workflows.",
  },
  {
    q: "What is the difference between a scanned PDF and a searchable PDF?",
    a: "A scanned PDF behaves like an image, while a searchable PDF includes a machine-readable text layer created through OCR.",
  },
  {
    q: "Can OCR extract text from invoices and receipts?",
    a: "Yes. OCR is commonly used for invoices, receipts, and financial paperwork because it helps capture names, dates, totals, and line items faster.",
  },
  {
    q: "Is OCR better than typing scanned documents manually?",
    a: "For most multi-page documents, yes. OCR is usually much faster than manual typing, especially when followed by a quick proofreading pass.",
  },
  {
    q: "Can I edit PDF after OCR?",
    a: "Yes. After OCR, you can move into a document workflow where you edit PDF after OCR or export the content into a more editable format.",
  },
];

const howToSteps = [
  "Upload your scanned or image-based PDF into the OCR tool.",
  "Let the tool read each PDF page and recognize the text layer.",
  "Review the extracted text for names, dates, totals, formatting, and OCR edge cases.",
  "Copy the text, download it, or continue with related workflows like editing or conversion.",
];

export const metadata: Metadata = {
  title: "PDF OCR Online - Extract Text from Scanned PDF Free",
  description:
    "Use PDF OCR online to extract text from scanned PDFs and image-based documents for free. Search, copy, and reuse text in your browser with no upload needed.",
  keywords: [
    "pdf ocr online",
    "pdf ocr online free",
    "extract text from pdf",
    "ocr pdf online free",
    "scanned pdf to text",
    "searchable pdf ocr",
    "image based pdf to text",
    "convert scanned pdf to text free",
    "pdf text extraction no upload",
    "ocr for invoices and contracts",
  ],
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "PDF OCR Online - Extract Text from Scanned PDF Free",
    description:
      "Extract text from scanned PDFs online. Make image-based PDFs searchable in your browser with free PDF OCR online.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "PDF OCR Online tool preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF OCR Online - Extract Text from Scanned PDF Free",
    description:
      "Free PDF OCR online for scanned and image-based PDFs. Search, copy, and reuse extracted text in your browser.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function PdfOcrPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF OCR Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Use PDF OCR online to extract text from scanned and image-based PDF files in your browser for free.",
        browserRequirements: "Requires a modern web browser with JavaScript enabled",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${SITE_URL}/pdf-tools` },
          { "@type": "ListItem", position: 3, name: "PDF OCR", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "HowTo",
        name: "How to use PDF OCR online",
        description:
          "A simple workflow for extracting text from a scanned or image-based PDF using OCR online.",
        step: howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          text: step,
        })),
      },
      {
        "@type": "Organization",
        name: "thepdftools.site",
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        name: "thepdftools.site",
        url: SITE_URL,
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
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "PDF Tools", href: "/pdf-tools" },
            { label: "PDF OCR" },
          ]}
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                PDF OCR
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                PDF OCR online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  extract text from scanned PDF
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Use PDF OCR online to convert scanned PDFs and image-based PDF files
                into searchable text. Copy, review, and reuse extracted content
                directly in your browser with no upload required.
              </p>
            </div>
            <div className="mt-8">
              <PdfOcrClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Scanned PDFs",
                  text: "Extract text from invoices, receipts, contracts, books, forms, and other image-based PDFs.",
                },
                {
                  title: "Browser-based OCR",
                  text: "Powered by Tesseract.js, so OCR runs in your browser without sending the PDF to a server.",
                },
                {
                  title: "Search and reuse",
                  text: "Make text easier to search, copy, analyze, and move into related document workflows.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-secondary-50 p-8 shadow-sm">
            <div className="max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Featured Snippet
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                What is PDF OCR?
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                PDF OCR online is a text-recognition process that reads words from
                scanned or image-based PDF pages and converts them into searchable,
                selectable text. It is useful when a PDF behaves like a picture
                instead of a real text document and you need to search, copy,
                analyze, <Link href="/pdf-to-word" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PDF to Word</Link>, or <Link href="/pdf-editor" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">edit PDF after OCR</Link>.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Quick Answer</h2>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-7 text-slate-600">
                <li>Upload your scanned or image-based PDF into the OCR tool.</li>
                <li>Run OCR so the tool can detect text on each PDF page.</li>
                <li>Review the extracted text for names, figures, dates, and formatting details.</li>
                <li>Copy the result, download it, or continue with tools like <Link href="/word-counter" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">count words in PDF</Link> content or <Link href="/pdf-tools" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">explore all PDF tools</Link>.</li>
              </ol>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>PDF OCR online is best for scanned PDFs, photographed pages, and image-based documents.</li>
                <li>OCR helps turn static pages into reusable text for search, editing, and conversion workflows.</li>
                <li>Clear scans improve OCR accuracy and reduce time spent on manual correction.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Scanned PDF vs Searchable PDF</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Image-based PDF</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  A scanned PDF usually stores each page as an image. You can view the
                  content, but text selection, keyword search, and clean copy-paste
                  often do not work because there is no readable text layer.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Searchable PDF</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  A searchable PDF includes recognized text behind the page image. OCR
                  makes documents more useful for archives, legal review, research,
                  finance, and everyday business workflows.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The OCR workflow bridges the gap by reading page images, identifying
              characters, and turning them into machine-readable text. The biggest
              benefits are faster search, easier collaboration, improved accessibility,
              and less manual retyping.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">OCR vs Manual Typing Comparison Table</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead>
                  <tr className="text-slate-900">
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Best For</th>
                    <th className="px-4 py-3 font-semibold">Main Advantage</th>
                    <th className="px-4 py-3 font-semibold">Tradeoff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">OCR extraction</td>
                    <td className="px-4 py-3">Scanned PDFs, reports, receipts, and multi-page documents</td>
                    <td className="px-4 py-3">Faster bulk text extraction</td>
                    <td className="px-4 py-3">May need proofreading on low-quality scans</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Manual typing</td>
                    <td className="px-4 py-3">Short passages or severely damaged scans</td>
                    <td className="px-4 py-3">Maximum human control</td>
                    <td className="px-4 py-3">Slow and repetitive for long files</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">OCR + review</td>
                    <td className="px-4 py-3">Invoices, contracts, books, and research documents</td>
                    <td className="px-4 py-3">Best mix of speed and final accuracy</td>
                    <td className="px-4 py-3">Requires a quick validation pass</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">How OCR Works</h2>
              <ol className="mt-4 list-inside list-decimal space-y-3 text-sm leading-7 text-slate-600">
                <li>The PDF pages are rendered as images so the OCR engine can inspect visible text.</li>
                <li>The OCR model detects letters, words, and line structure from each page.</li>
                <li>The recognized output is combined into readable text that can be searched, copied, and reviewed.</li>
                <li>You can then move into next-step workflows such as <Link href="/pdf-to-word" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PDF to Word</Link> or <Link href="/pdf-editor" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">edit PDF after OCR</Link>.</li>
              </ol>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">OCR Accuracy Tips</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Use high-resolution scans with clear contrast between text and background.</li>
                <li>Straighten rotated pages before OCR so lines are easier to detect correctly.</li>
                <li>Avoid heavy shadows, cut-off margins, and blurry phone captures when possible.</li>
                <li>Double-check names, dates, totals, references, and legal clauses after extraction.</li>
                <li>Use a review pass before you <Link href="/word-counter" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">count words in PDF</Link> text or export it into another workflow.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">OCR Languages Supported</h2>
              <p className="text-sm leading-7 text-slate-600">
                OCR language performance depends on the recognition model and how
                clearly the characters appear on the page. English scans typically
                perform best when the source PDF is clean, while multilingual or
                stylized documents may require closer review after extraction.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                For the best results, use clear printed text, stable page orientation,
                and minimal background noise. Complex layouts, tables, handwritten
                notes, and mixed-language pages are more likely to need manual
                correction after OCR.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Common OCR Mistakes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Running OCR on blurry scans and expecting perfect output.</li>
                <li>Skipping review of numbers, totals, names, and citations.</li>
                <li>Ignoring page rotation, skew, or cut-off document edges.</li>
                <li>Assuming every PDF already includes searchable text.</li>
                <li>Using extracted text immediately without checking structure or spacing.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Real World OCR Use Cases</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Invoices",
                  text: "Extract vendor names, dates, totals, and line items from scanned invoice PDFs.",
                },
                {
                  title: "Contracts",
                  text: "Search key clauses, signatures, dates, and legal references in scanned agreements.",
                },
                {
                  title: "Books",
                  text: "Turn scanned pages into searchable text for research, notes, and archive workflows.",
                },
                {
                  title: "Research papers",
                  text: "Find terminology, quotes, and references quickly across academic PDFs.",
                },
                {
                  title: "Government documents",
                  text: "Improve retrieval and usability of official notices, forms, and records.",
                },
                {
                  title: "Receipts and bills",
                  text: "Capture text from expense documents for accounting, review, and recordkeeping.",
                },
                {
                  title: "Internal archives",
                  text: "Make legacy business records easier to search and reuse across teams.",
                },
                {
                  title: "Editing workflows",
                  text: "Recognize text first, then refine the document with tools that continue the workflow.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">People Also Ask</h2>
            <div className="mt-5 space-y-4">
              {peopleAlsoAsk.map((item) => (
                <div key={item.q} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-medium text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Trust &amp; Security</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Browser-based processing</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  OCR runs in your browser, which helps keep scanned PDFs, internal
                  records, contracts, and personal files on your device during
                  processing.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Practical workflow</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  After extraction, you can <Link href="/word-counter" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">count words in PDF</Link> text, <Link href="/pdf-to-word" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PDF to Word</Link>, or <Link href="/pdf-tools" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">explore all PDF tools</Link>.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">AI-friendly answers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  The page includes direct definitions, workflow steps, and entity-rich
                  content to make the topic easier for search engines, AI overviews,
                  and answer engines to interpret.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
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
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              This free PDF OCR online page is built for users who need more than a
              basic text extractor. It covers scanned PDF OCR, searchable PDF
              conversion, OCR workflow steps, accuracy guidance, language
              considerations, and practical follow-up actions. Whether you are
              handling invoices, contracts, books, research papers, or government
              records, the goal is to make text extraction clearer, faster, and more
              useful in real workflows.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pdf-to-word"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF to Word
              </Link>
              <Link
                href="/pdf-editor"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Editor
              </Link>
              <Link
                href="/word-counter"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Word Counter
              </Link>
              <Link
                href="/pdf-tools"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Tools
              </Link>
              <Link
                href="/scanned-pdf-to-searchable-pdf"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Searchable PDF OCR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
