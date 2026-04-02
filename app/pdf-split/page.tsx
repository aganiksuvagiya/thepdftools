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
      </div>
    </div>
  );
}
