import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PdfSplitClient = dynamic(() => import("./PdfSplitClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Split Tool Online — Extract & Split PDF Pages",
  description:
    "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs entirely in your browser using pdf-lib.",
  keywords: [
    "pdf split",
    "split pdf online",
    "extract pdf pages",
    "pdf splitter",
    "free pdf split",
    "separate pdf pages",
  ],
  openGraph: {
    title: "Free PDF Split Tool Online — Extract & Split PDF Pages",
    description:
      "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs entirely in your browser using pdf-lib.",
    url: "https://thepdftools.site/pdf-split",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-split",
  },
};

export default function PdfSplitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Split Tool",
        url: "https://thepdftools.site/pdf-split",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Split PDF files into individual pages or custom ranges for free online. No upload, no signup — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to split PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All splitting is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract specific pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can split all pages into individual PDFs, or specify custom ranges like '1-3, 5, 7-10' to extract exactly the pages you need.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a page limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so performance depends on your device's memory. Most PDFs work smoothly.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the page is loaded, the splitting functionality works entirely in your browser. However, you need an internet connection to initially load the tool.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            PDF Split
          </div>
          <h1 className="tool-page-title">Free PDF Split Tool Online</h1>
          <p className="tool-page-description">
            Split PDF files into individual pages or custom ranges instantly in
            your browser. Extract exactly the pages you need — no upload, no
            server, completely private.
          </p>
        </div>

        <PdfSplitClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Split a PDF Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>Choose whether to split into individual pages or specify custom page ranges.</li>
              <li>Enter custom ranges like &quot;1-3, 5, 7-10&quot; to extract exactly the pages you need.</li>
              <li>Click the &quot;Split PDF&quot; button to process your document.</li>
              <li>Download the split pages as separate PDF files instantly.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our PDF Splitter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Custom Ranges</h3><p className="mt-1 text-sm text-gray-500">Specify exact page ranges like &quot;1-3, 5, 7-10&quot; to extract only the pages you need from any PDF document.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Individual Pages</h3><p className="mt-1 text-sm text-gray-500">Split your PDF into individual single-page files with one click. Perfect for extracting specific pages from large documents.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Fast Processing</h3><p className="mt-1 text-sm text-gray-500">Splitting happens instantly in your browser using pdf-lib. No waiting for server uploads or downloads.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No Upload Required</h3><p className="mt-1 text-sm text-gray-500">Your files stay on your device. The entire splitting process runs locally in your browser for complete privacy.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I split by custom page ranges?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. You can enter custom ranges like &quot;1-3, 5, 7-10&quot; to extract exactly the pages you need, or split every page into its own PDF file.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is there a maximum number of pages?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">No hard limit. Processing happens in your browser, so performance depends on your device&apos;s memory. Most PDFs work smoothly regardless of page count.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does splitting affect the quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">No. The split pages retain the exact same quality as the original PDF. Text, images, and formatting are preserved perfectly since pages are extracted without re-encoding.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I split password-protected PDFs?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Password-protected or encrypted PDFs are not currently supported. You will need to remove the password protection first using another tool before splitting.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Use our free online PDF splitter to split PDF files, extract PDF pages, and separate PDF documents into individual pages or custom ranges. This browser-based PDF split tool is ideal for extracting chapters from e-books, separating invoice pages, or pulling specific pages from large reports. No server upload, no registration — just a fast, private, and free PDF page extractor.</p>
        </div>
      </div>
    </div>
  );
}
