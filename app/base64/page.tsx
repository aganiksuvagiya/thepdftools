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

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Encode and Decode Base64</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Enter or paste the text you want to encode or the Base64 string you want to decode.</li>
              <li>Click Encode to convert text to Base64 or Decode to convert Base64 back to text.</li>
              <li>View the result instantly in the output area.</li>
              <li>Copy the result to your clipboard with one click.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Base64 Tool?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Full Unicode Support</h3><p className="mt-1 text-sm text-gray-500">Encode and decode text containing emojis, accented characters, CJK scripts, and any Unicode content without errors.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Auto-Encode Mode</h3><p className="mt-1 text-sm text-gray-500">Enable real-time encoding that updates the output automatically as you type, streamlining your workflow for quick conversions.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Clear Error Handling</h3><p className="mt-1 text-sm text-gray-500">Get helpful error messages when decoding invalid Base64 strings so you can quickly identify and fix issues in your data.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No Data Sent to Servers</h3><p className="mt-1 text-sm text-gray-500">Everything runs entirely in your browser. Your text and encoded data never leave your device, ensuring complete privacy.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What is Base64 encoding?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Base64 is a binary-to-text encoding scheme that converts data into a set of 64 ASCII characters. It is commonly used to transmit binary data over text-based protocols like email, JSON, and URLs.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does it support Unicode and special characters?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, this tool fully supports Unicode text including emojis, non-Latin scripts, and special characters. It uses UTF-8 encoding internally to ensure accurate results.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What are common use cases for Base64?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Base64 is used to embed images in HTML/CSS via data URIs, encode email attachments (MIME), transmit binary data in JSON APIs, and encode credentials in HTTP Basic Authentication headers.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is my data safe when using this tool?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Absolutely. All encoding and decoding happens locally in your browser using JavaScript. No data is sent to any server, making it safe to use with sensitive information.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free Base64 encoder and decoder lets you encode text to Base64 or decode Base64 back to plain text instantly online. With full Unicode support, auto-encode mode, and clear error handling, this tool is ideal for developers working with APIs, data URIs, email encoding, and authentication tokens. Everything runs in your browser — no data is ever sent to a server, keeping your information completely private and secure.</p>
        </div>
      </div>
    </div>
  );
}
