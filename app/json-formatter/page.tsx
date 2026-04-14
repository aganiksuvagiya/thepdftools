import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const JsonFormatterClient = dynamic(() => import("./JsonFormatterClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "JSON Formatter Online Free No Upload",
  description:
    "Use JSON Formatter online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "json formatter",
    "json validator",
    "json minify",
    "format json online",
    "json beautifier",
    "free json tool",
  ],
  openGraph: {
    title: "JSON Formatter Online Free No Upload",
    description:
    "Use JSON Formatter online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/json-formatter",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
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
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "JSON Formatter", "item": "https://thepdftools.site/json-formatter" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I format JSON online for free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The JSON Formatter is free and formats, minifies, and validates JSON in your browser.",
            },
          },
          {
            "@type": "Question",
            "name": "Is my JSON uploaded to a server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. JSON formatting and validation runs locally in your browser so your data stays on your device.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                JSON Formatter
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Format &amp; validate
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  JSON beautifully
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Format, minify, and validate JSON instantly in your browser. No
                upload, no server — completely private.
              </p>
            </div>

            <div className="mt-8">
              <JsonFormatterClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for debugging", text: "Instantly format messy JSON into readable, properly indented output." },
                { title: "Best for validation", text: "Detect syntax errors and validate JSON structure in real time." },
                { title: "Best for privacy", text: "All formatting happens locally — your data never leaves the browser." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Paste minified JSON to expand it into readable format.</li>
              <li>Check for syntax errors before sending API requests.</li>
              <li>Use the formatted output to spot missing commas and brackets.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["API debugging", "Config editing", "Data inspection", "Code reviews"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Format and Validate JSON</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Paste your JSON data into the input editor or type it directly.</li>
              <li>Click Format to beautify, Minify to compress, or Validate to check for errors.</li>
              <li>Review the formatted output with syntax highlighting and error indicators.</li>
              <li>Copy the result to your clipboard with one click.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our JSON Formatter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Format &amp; Beautify</h3>
                <p className="mt-1 text-sm text-slate-500">Transform minified or messy JSON into clean, properly indented, human-readable output with customizable indentation levels.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Minify for Production</h3>
                <p className="mt-1 text-sm text-slate-500">Compress JSON by removing all whitespace and line breaks, reducing file size for faster API responses and data transfer.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Validate with Error Details</h3>
                <p className="mt-1 text-sm text-slate-500">Instantly detect JSON syntax errors with clear messages pinpointing the exact location and nature of each issue.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">JSON Statistics</h3>
                <p className="mt-1 text-sm text-slate-500">View useful stats about your JSON data including key count, nesting depth, and overall structure at a glance.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What is JSON formatting?", a: "JSON formatting (also called beautifying or pretty-printing) adds proper indentation and line breaks to JSON data, making it easy for humans to read and understand the structure of nested objects and arrays." },
                { q: "Does the validator show error messages?", a: "Yes, when your JSON has syntax errors, the tool displays detailed error messages indicating the position and type of error so you can quickly fix issues like missing commas, brackets, or quotes." },
                { q: "What indentation options are available?", a: "You can format your JSON with different indentation levels (2 spaces, 4 spaces, or tabs) to match your coding style or project conventions." },
                { q: "Is there a maximum JSON size?", a: "Since everything runs in your browser, the practical limit depends on your device memory. The tool handles most JSON files comfortably, including files with thousands of lines." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free JSON formatter and validator lets you format, beautify, minify, and validate JSON online in seconds. Whether you are debugging API responses, cleaning up configuration files, or preparing JSON for production, this json beautifier and json minifier handles it all. Paste your JSON, detect errors instantly, and copy formatted output — no data is sent to any server. Perfect for developers, testers, and anyone working with JSON data.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Developer Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/base64" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Base64 Encoder/Decoder</Link>
              <Link href="/word-counter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word Counter</Link>
              <Link href="/lorem-ipsum" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Lorem Ipsum Generator</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Code Generator</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="json-formatter" />
        </div>
      </div>
    </div>
  );
}
