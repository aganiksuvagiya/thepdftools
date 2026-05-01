import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfOcrClient = dynamic(() => import("./PdfOcrClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-ocr`;

export const metadata: Metadata = {
  title: "PDF OCR Online Free — Extract Text from PDF, No Upload",
  description:
    "Extract text from scanned PDFs using OCR online for free. Convert PDF to text instantly in your browser — no upload, no signup required.",
  keywords: [
    "pdf ocr online free",
    "extract text from pdf",
    "ocr pdf online free",
    "scanned pdf to text",
    "pdf to text converter",
    "pdf text extraction no upload",
    "ocr pdf no signup",
    "convert scanned pdf to text free",
  ],
  openGraph: {
    title: "PDF OCR Online Free — Extract Text from PDF, No Upload",
    description: "Extract text from scanned PDFs using OCR online for free. No upload, no signup.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
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
          "Extract text from scanned PDF files using OCR online for free. No upload required — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is PDF OCR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "OCR (Optical Character Recognition) reads text from scanned images or image-based PDFs and converts it into selectable, copyable text.",
            },
          },
          {
            "@type": "Question",
            name: "Is my PDF uploaded to a server?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. All OCR processing happens in your browser using pdf.js and Tesseract.js. Your file never leaves your device.",
            },
          },
          {
            "@type": "Question",
            name: "What languages are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool supports English OCR. Tesseract.js supports many languages — English is loaded by default for fast processing.",
            },
          },
          {
            "@type": "Question",
            name: "Will it work on all PDFs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It works best on scanned PDFs and image-based PDFs. For PDFs that already contain selectable text, you can copy text directly without OCR.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF OCR", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF OCR
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Extract text from PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free OCR, no upload
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert scanned PDFs and image-based PDFs to text using OCR. Copy, download, or search the extracted text — runs entirely in your browser.
              </p>
            </div>
            <div className="mt-8">
              <PdfOcrClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Scanned PDFs", text: "Extract text from scanned documents, receipts, invoices, and image-based PDFs." },
                { title: "Browser-based OCR", text: "Powered by Tesseract.js — runs entirely in your browser with no server upload." },
                { title: "Copy or download", text: "Copy extracted text to clipboard or download it as a .txt file." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How accurate is the OCR?", a: "Accuracy depends on the quality of the scanned PDF. Clean, high-resolution scans typically yield 95%+ accuracy. Blurry or low-resolution scans may have more errors." },
                { q: "Can I extract text from all pages?", a: "Yes. The tool processes all pages of your PDF and combines the extracted text in order." },
                { q: "Does it work on non-English PDFs?", a: "The default model is optimised for English. OCR accuracy on other languages may vary." },
                { q: "How long does OCR take?", a: "Processing time depends on the number of pages and your device speed. A typical 5-page scanned PDF takes around 10–30 seconds." },
              ].map((item) => (
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

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Use our free online PDF OCR tool to extract text from scanned PDFs, convert image-based PDFs to text, and make scanned documents searchable. This browser-based OCR PDF tool uses Tesseract.js to recognise text from PDF pages without uploading your file to any server. Ideal for extracting text from scanned invoices, contracts, books, and documents.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/scanned-pdf-to-searchable-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Searchable PDF OCR</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
              <Link href="/pdf-to-ppt" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to PPT</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
