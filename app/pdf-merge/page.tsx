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
      </div>
    </div>
  );
}
