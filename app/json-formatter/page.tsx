import type { Metadata } from "next";
import dynamic from "next/dynamic";

const JsonFormatterClient = dynamic(() => import("./JsonFormatterClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online",
  description:
    "Format, minify, and validate JSON instantly in your browser. Syntax highlighting, error detection with line numbers, and indentation options. No upload, no signup — completely private.",
  keywords: [
    "json formatter",
    "json validator",
    "json minify",
    "format json online",
    "json beautifier",
    "free json tool",
  ],
  openGraph: {
    title: "Free JSON Formatter & Validator Online",
    description:
      "Format, minify, and validate JSON instantly in your browser. Syntax highlighting, error detection with line numbers, and indentation options.",
    url: "https://thepdftools.site/json-formatter",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/json-formatter",
  },
};

export default function JsonFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free JSON Formatter & Validator",
        url: "https://thepdftools.site/json-formatter",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Format, minify, and validate JSON instantly in your browser. No upload, no server, completely private.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            JSON Formatter
          </div>
          <h1 className="tool-page-title">Free JSON Formatter & Validator Online</h1>
          <p className="tool-page-description">
            Format, minify, and validate JSON instantly in your browser. No
            upload, no server — completely private.
          </p>
        </div>

        <JsonFormatterClient />
      </div>
    </div>
  );
}
