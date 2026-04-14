import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const CsvToJsonClient = dynamic(() => import("./CsvToJsonClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "CSV To JSON Online Free No Upload",
  description:
    "Use CSV To JSON online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "csv to json",
    "csv to json converter",
    "convert csv to json online",
    "csv to json online free",
    "csv converter",
    "csv parser",
    "csv to json tool",
    "csv file to json",
    "free csv converter",
    "csv to json formatter",
    "csv data converter",
  ],
  openGraph: {
    title: "CSV To JSON Online Free No Upload",
    description:
    "Use CSV To JSON online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/csv-to-json",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/csv-to-json",
  },
};

export default function CsvToJsonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free CSV to JSON Converter",
        url: "https://thepdftools.site/csv-to-json",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert CSV to JSON online for free. Paste CSV data or upload a file and get formatted JSON output instantly.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert CSV to JSON here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your CSV data never leaves your browser. All parsing and conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What delimiters are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The converter supports comma, semicolon, tab, and pipe delimiters. You can select your preferred delimiter before converting to ensure accurate parsing of your CSV data.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert CSV files with headers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When the 'First row as headers' option is enabled (default), the first row of your CSV is used as JSON object keys. Disable it to get arrays of values instead.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Since all processing happens in your browser, the practical limit depends on your device's memory. Most CSV files up to several megabytes convert smoothly.",
            },
          },
          {
            "@type": "Question",
            name: "Does it handle special characters and quoted fields?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The converter correctly handles quoted fields, commas inside quotes, newlines within fields, and escaped characters following the CSV standard (RFC 4180).",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "CSV to JSON", "item": "https://thepdftools.site/csv-to-json" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                CSV to JSON
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert CSV to
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  JSON instantly
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Paste CSV data or upload a file and convert it to clean, formatted JSON
                in your browser. No signup, no server, and no extra steps.
              </p>
            </div>

            <div className="mt-8">
              <CsvToJsonClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for developers",
                  text: "Quickly transform CSV exports into JSON for APIs, databases, and application configs.",
                },
                {
                  title: "Best for APIs",
                  text: "Convert spreadsheet data to JSON format ready for REST APIs, GraphQL, or any web service.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No data leaves your machine.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use &ldquo;First row as headers&rdquo; for CSV files exported from Excel or Google Sheets.</li>
              <li>Switch to the semicolon delimiter for European-format CSV files.</li>
              <li>Enable pretty print for readable output, or disable it for compact JSON.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["API integration", "Data migration", "Database imports", "Config files"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert CSV to JSON Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Paste your CSV data into the text area or upload a .csv file by dragging and dropping it onto the upload zone.</li>
              <li>Choose your delimiter (comma, semicolon, tab, or pipe) and toggle options for headers and pretty printing.</li>
              <li>Click &ldquo;Convert to JSON&rdquo; to instantly parse your CSV and generate formatted JSON output.</li>
              <li>Copy the result to your clipboard or download it as a .json file.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free CSV to JSON Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your CSV data never leaves your device. All parsing and conversion happens locally in your browser using JavaScript, keeping your data 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Smart CSV Parsing</h3>
                <p className="mt-1 text-sm text-slate-500">Handles quoted fields, commas inside quotes, multiline values, and escaped characters correctly following the CSV standard (RFC 4180). Powered by the robust PapaParse library.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Delimiter Support</h3>
                <p className="mt-1 text-sm text-slate-500">Convert comma-separated, semicolon-separated, tab-separated (TSV), and pipe-delimited files to JSON. Works with CSV exports from Excel, Google Sheets, and databases.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Instant Download</h3>
                <p className="mt-1 text-sm text-slate-500">Copy converted JSON to your clipboard with one click or download it as a .json file. View row count, column count, and output size at a glance.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "Is it safe to convert CSV to JSON here?",
                  a: "Absolutely. Your CSV data never leaves your browser. All parsing and conversion runs client-side using JavaScript, so no data is uploaded to any server. Your files remain completely private on your device.",
                },
                {
                  q: "What delimiters does the converter support?",
                  a: "Our CSV to JSON converter supports four delimiter types: comma (standard CSV), semicolon (common in European formats), tab (TSV files), and pipe. Select the appropriate delimiter before converting for accurate results.",
                },
                {
                  q: "Can I convert CSV files with headers?",
                  a: "Yes. When the 'First row as headers' option is enabled (the default), the first row of your CSV is used as keys in the resulting JSON objects. Disable it to get arrays of values instead of objects.",
                },
                {
                  q: "Does it handle special characters and quoted fields?",
                  a: "Yes. The converter correctly handles quoted fields, commas inside quotes, newlines within fields, and escaped characters following the CSV standard (RFC 4180). Complex spreadsheet exports convert accurately.",
                },
                {
                  q: "Is there a file size limit?",
                  a: "There is no hard file size limit. Since all processing happens in your browser, performance depends on your device memory. Most CSV files up to several megabytes convert smoothly on modern devices.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Converting CSV to JSON is a common task for developers, data engineers, and analysts working with modern web applications and APIs. Whether you need to transform a spreadsheet export into JSON for a REST API, migrate data between systems, or prepare configuration files, our free online CSV to JSON converter handles it all. Unlike other tools that require uploading your files to remote servers, this csv to json converter processes everything locally in your browser, ensuring complete privacy. The tool supports all common delimiters including comma, semicolon, tab, and pipe, making it compatible with CSV exports from Microsoft Excel, Google Sheets, database tools, and any other application that produces delimited text files. With options for header row detection, pretty printing, and instant download, converting csv to json online has never been easier or more secure.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Developer Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/json-formatter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JSON Formatter</Link>
              <Link href="/base64" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Base64 Encoder/Decoder</Link>
              <Link href="/word-counter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word Counter</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="csv-to-json" />
        </div>
      </div>
    </div>
  );
}
