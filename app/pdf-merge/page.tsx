import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PdfMergeClient = dynamic(() => import("./PdfMergeClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Merge Tool Online — Combine PDF Files Instantly",
  description:
    "Merge multiple PDF files into one document for free online. No upload, no signup. Drag, reorder, and combine PDFs instantly in your browser using pdf-lib.",
  keywords: [
    "pdf merge",
    "merge pdf online",
    "combine pdf files",
    "pdf combiner",
    "free pdf merger",
    "join pdf",
  ],
  openGraph: {
    title: "Free PDF Merge Tool Online — Combine PDF Files Instantly",
    description:
      "Merge multiple PDF files into one document for free online. No upload, no signup. Drag, reorder, and combine PDFs instantly in your browser using pdf-lib.",
    url: "https://thepdftools.site/pdf-merge",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-merge",
  },
};

export default function PdfMergePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Merge Tool",
        url: "https://thepdftools.site/pdf-merge",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Merge multiple PDF files into one document for free online. No upload, no signup — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to merge PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "How many PDFs can I merge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device's memory. Most users can merge dozens of files without any issues.",
            },
          },
          {
            "@type": "Question",
            name: "Can I reorder pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document will follow the order you set.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            PDF Merge
          </div>
          <h1 className="tool-page-title">Free PDF Merge Tool Online</h1>
          <p className="tool-page-description">
            Combine multiple PDF files into a single document in seconds. Reorder
            files, then merge — everything happens in your browser, privately.
          </p>
        </div>

        <PdfMergeClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Merge PDF Files Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Click the upload area or drag and drop your PDF files into the tool.</li>
              <li>Add as many PDF documents as you need — there is no file limit.</li>
              <li>Use the arrow buttons to drag and reorder files in the desired sequence.</li>
              <li>Click the &quot;Merge PDFs&quot; button to combine all files into one document.</li>
              <li>Download your merged PDF instantly — no email or signup required.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our PDF Merger?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No File Limit</h3><p className="mt-1 text-sm text-gray-500">Combine as many PDF files as you want in a single session. There is no cap on the number of documents you can merge.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Drag to Reorder</h3><p className="mt-1 text-sm text-gray-500">Easily rearrange the order of your PDF files before merging so the final document is organized exactly the way you need.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Browser-Based</h3><p className="mt-1 text-sm text-gray-500">Everything runs in your browser using pdf-lib. Your files are never uploaded to a server, keeping your data completely private.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No Watermark</h3><p className="mt-1 text-sm text-gray-500">The merged PDF is clean and professional with no watermarks, branding, or hidden modifications added to your document.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is it safe to merge PDFs here?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How many PDFs can I merge at once?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device&apos;s memory. Most users can merge dozens of files without any issues.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I reorder the files before merging?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document will follow the order you set.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does it work offline?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is there a file size limit?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device&apos;s available memory. Files up to 100 MB typically work without issues.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online PDF merge tool lets you combine PDF files, join PDF documents, and merge multiple PDFs into one file without uploading to a server. This browser-based PDF merger is perfect for combining contracts, reports, invoices, and scanned documents into a single organized PDF. No registration, no watermark, no file limit — just a fast, private, and free PDF combiner that works on any device.</p>
        </div>
      </div>
    </div>
  );
}
