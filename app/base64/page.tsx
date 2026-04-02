import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Base64Client = dynamic(() => import("./Base64Client"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Base64 Encoder & Decoder Online",
  description:
    "Encode and decode Base64 strings instantly in your browser. No upload, no signup — 100% free and private.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 online",
    "encode base64",
    "decode base64",
    "free base64 tool",
  ],
  openGraph: {
    title: "Free Base64 Encoder & Decoder Online",
    description:
      "Encode and decode Base64 strings instantly in your browser. No upload, no signup — 100% free and private.",
    url: "https://thepdftools.site/base64",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/base64",
  },
};

export default function Base64Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Base64 Encoder & Decoder",
    url: "https://thepdftools.site/base64",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Encode and decode Base64 strings instantly in your browser. No upload, no signup — 100% free and private.",
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            Base64
          </div>
          <h1 className="tool-page-title">Free Base64 Encoder & Decoder Online</h1>
          <p className="tool-page-description">
            Encode text to Base64 or decode Base64 back to text instantly in your
            browser. No upload, no server, completely private.
          </p>
        </div>

        <Base64Client />
      </div>
    </div>
  );
}
