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

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Format and Validate JSON</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Paste your JSON data into the input editor or type it directly.</li>
              <li>Click Format to beautify, Minify to compress, or Validate to check for errors.</li>
              <li>Review the formatted output with syntax highlighting and error indicators.</li>
              <li>Copy the result to your clipboard with one click.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our JSON Formatter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Format & Beautify</h3><p className="mt-1 text-sm text-gray-500">Transform minified or messy JSON into clean, properly indented, human-readable output with customizable indentation levels.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Minify for Production</h3><p className="mt-1 text-sm text-gray-500">Compress JSON by removing all whitespace and line breaks, reducing file size for faster API responses and data transfer.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Validate with Error Details</h3><p className="mt-1 text-sm text-gray-500">Instantly detect JSON syntax errors with clear messages pinpointing the exact location and nature of each issue.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">JSON Statistics</h3><p className="mt-1 text-sm text-gray-500">View useful stats about your JSON data including key count, nesting depth, and overall structure at a glance.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What is JSON formatting?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">JSON formatting (also called beautifying or pretty-printing) adds proper indentation and line breaks to JSON data, making it easy for humans to read and understand the structure of nested objects and arrays.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does the validator show error messages?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, when your JSON has syntax errors, the tool displays detailed error messages indicating the position and type of error so you can quickly fix issues like missing commas, brackets, or quotes.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What indentation options are available?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">You can format your JSON with different indentation levels (2 spaces, 4 spaces, or tabs) to match your coding style or project conventions.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is there a maximum JSON size?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Since everything runs in your browser, the practical limit depends on your device memory. The tool handles most JSON files comfortably, including files with thousands of lines.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free JSON formatter and validator lets you format, beautify, minify, and validate JSON online in seconds. Whether you are debugging API responses, cleaning up configuration files, or preparing JSON for production, this json beautifier and json minifier handles it all. Paste your JSON, detect errors instantly, and copy formatted output — no data is sent to any server. Perfect for developers, testers, and anyone working with JSON data.</p>
        </div>
      </div>
    </div>
  );
}
