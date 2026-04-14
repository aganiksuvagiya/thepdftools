import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const Base64Client = dynamic(() => import("./Base64Client"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Base64 Online Free No Upload",
  description:
    "Use Base64 online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 online",
    "encode base64",
    "decode base64",
    "free base64 tool",
  ],
  openGraph: {
    title: "Base64 Online Free No Upload",
    description:
    "Use Base64 online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/base64",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/base64",
  },
};

export default function Base64Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "Base64 Encoder", "item": "https://thepdftools.site/base64" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this Base64 encoder and decoder free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The Base64 encoder and decoder is free to use with no signup required.",
            },
          },
          {
            "@type": "Question",
            "name": "Does Base64 encoding happen in my browser?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Base64 encoding and decoding runs locally in your browser so your text stays on your device.",
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
                Base64 Encoder/Decoder
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Encode &amp; decode
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Base64 instantly
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Encode text to Base64 or decode Base64 back to text instantly in your
                browser. No upload, no server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <Base64Client />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for developers", text: "Quickly encode or decode Base64 strings for APIs, data URIs, and debugging." },
                { title: "Best for data URIs", text: "Convert images and files to Base64 data URIs for embedding in HTML and CSS." },
                { title: "Best for privacy", text: "All encoding and decoding runs locally in your browser." },
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
              <li>Use Base64 for embedding small images directly in HTML.</li>
              <li>Decode API responses to inspect the original data.</li>
              <li>Base64 increases data size by ~33% — use only when needed.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["API development", "Data URI creation", "Email encoding", "Debug & testing"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Encode and Decode Base64</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Enter or paste the text you want to encode or the Base64 string you want to decode.</li>
              <li>Click Encode to convert text to Base64 or Decode to convert Base64 back to text.</li>
              <li>View the result instantly in the output area.</li>
              <li>Copy the result to your clipboard with one click.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Base64 Tool?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Full Unicode Support</h3>
                <p className="mt-1 text-sm text-slate-500">Encode and decode text containing emojis, accented characters, CJK scripts, and any Unicode content without errors.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Auto-Encode Mode</h3>
                <p className="mt-1 text-sm text-slate-500">Enable real-time encoding that updates the output automatically as you type, streamlining your workflow for quick conversions.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Clear Error Handling</h3>
                <p className="mt-1 text-sm text-slate-500">Get helpful error messages when decoding invalid Base64 strings so you can quickly identify and fix issues in your data.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Data Sent to Servers</h3>
                <p className="mt-1 text-sm text-slate-500">Everything runs entirely in your browser. Your text and encoded data never leave your device, ensuring complete privacy.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that converts data into a set of 64 ASCII characters. It is commonly used to transmit binary data over text-based protocols like email, JSON, and URLs." },
                { q: "Does it support Unicode and special characters?", a: "Yes, this tool fully supports Unicode text including emojis, non-Latin scripts, and special characters. It uses UTF-8 encoding internally to ensure accurate results." },
                { q: "What are common use cases for Base64?", a: "Base64 is used to embed images in HTML/CSS via data URIs, encode email attachments (MIME), transmit binary data in JSON APIs, and encode credentials in HTTP Basic Authentication headers." },
                { q: "Is my data safe when using this tool?", a: "Absolutely. All encoding and decoding happens locally in your browser using JavaScript. No data is sent to any server, making it safe to use with sensitive information." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free Base64 encoder and decoder lets you encode text to Base64 or decode Base64 back to plain text instantly online. With full Unicode support, auto-encode mode, and clear error handling, this tool is ideal for developers working with APIs, data URIs, email encoding, and authentication tokens. Everything runs in your browser — no data is ever sent to a server, keeping your information completely private and secure.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Developer Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/json-formatter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JSON Formatter</Link>
              <Link href="/word-counter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word Counter</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Code Generator</Link>
              <Link href="/color-picker" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Color Picker</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="base64" />
        </div>
      </div>
    </div>
  );
}
