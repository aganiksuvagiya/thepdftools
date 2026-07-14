import type { Metadata } from "next";
import Link from "next/link";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/developer-tools`;

export const metadata: Metadata = buildPageMetadata({
  title: "Free Developer Tools Online — JSON Formatter, Base64, URL Encoder & More",
  description:
    "Free online developer tools: format and validate JSON, encode/decode Base64 and URLs, convert CSV to JSON, minify code, test regex, and more. No sign-up needed.",
  url: PAGE_URL,
  keywords: [
    "free developer tools online",
    "json formatter",
    "base64 encoder decoder",
    "url encoder decoder",
    "csv to json",
    "json validator",
    "developer utilities online",
    "code formatter online",
  ],
});

const devTools = [
  {
    group: "JSON Tools",
    tools: [
      { href: "/json-formatter", label: "JSON Formatter", desc: "Format, validate, and pretty-print JSON." },
    ],
  },
  {
    group: "Convert & Transform",
    tools: [
      { href: "/csv-to-json", label: "CSV to JSON", desc: "Convert CSV spreadsheet data to JSON format." },
    ],
  },
  {
    group: "Encode & Decode",
    tools: [
      { href: "/base64", label: "Base64 Encoder / Decoder", desc: "Encode text or files to Base64 and decode Base64 strings." },
      { href: "/url-encoder", label: "URL Encoder / Decoder", desc: "Percent-encode URLs or decode encoded URL strings." },
    ],
  },
  {
    group: "Test & Debug",
    tools: [
      { href: "/regex-tester", label: "Regex Tester", desc: "Test regular expressions with real-time match highlighting." },
      { href: "/timestamp-converter", label: "Timestamp Converter", desc: "Convert Unix epoch timestamps to human-readable dates." },
    ],
  },
  {
    group: "Design & Color",
    tools: [
      { href: "/color-picker", label: "Color Picker", desc: "Pick colors from images and get HEX, RGB, HSL values." },
      { href: "/color-gradient", label: "Gradient Generator", desc: "Build custom CSS linear and radial gradients." },
      { href: "/tailwind-colors", label: "Tailwind Colors", desc: "Browse and copy all Tailwind CSS color palettes." },
      { href: "/favicon-generator", label: "Favicon Generator", desc: "Generate favicons in all required sizes from any image." },
    ],
  },
];

const faqItems = [
  {
    q: "Are these developer tools free?",
    a: "Yes. Every developer tool on this page is completely free to use with no account required.",
  },
  {
    q: "Do these tools work offline?",
    a: "Most tools run entirely in your browser using JavaScript. Once the page is loaded, many tools work without an active internet connection.",
  },
  {
    q: "Is my data sent to a server?",
    a: "No. All processing happens client-side in your browser. Your code, JSON, or text never leaves your device.",
  },
  {
    q: "Can I use these tools on mobile?",
    a: "Yes. All developer tools are mobile-responsive and work on phones and tablets.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Developer Tools Online",
      url: PAGE_URL,
      description: "Free browser-based developer tools: JSON formatter, Base64, URL encoder, CSV to JSON, and more.",
      author: { "@type": "Organization", name: "thepdftools Editorial Team" },
      dateModified: "2026-07-05",
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Developer Tools", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function DeveloperToolsPage() {
  const lastUpdated = getLastUpdated("app/developer-tools/page.tsx");
  const toolCount = devTools.reduce((acc, g) => acc + g.tools.length, 0);

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Developer Tools</span>
        </nav>

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
          <p className="inline-flex rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700">
            {toolCount} Free Tools
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Developer Tools Online
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Format JSON, encode Base64, convert CSV to JSON, generate colors, and more — all free developer utilities that run in your browser with no sign-up required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            {["No Sign-up", "Client-Side Processing", "Works on Mobile", "100% Free"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
                <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Tool Groups */}
        {devTools.map((group) => (
          <section key={group.group} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-slate-950 mb-4">{group.group}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
                >
                  <span className="text-[15px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {tool.label}
                  </span>
                  <span className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* What is section */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            What Are These Developer Tools?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            These free developer utilities solve everyday tasks that programmers, DevOps engineers, and web developers encounter repeatedly — formatting a JSON response to read it clearly, converting a CSV export to JSON for an API, encoding a binary file to Base64, or picking the exact hex color for a design system.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            All tools run entirely in the browser. No data is sent to a server — which matters when you are working with API responses, config files, or environment data that should stay private.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 hover:text-brand-700 transition-colors [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other Categories */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">Explore Other Tool Categories</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/pdf-tools", label: "PDF Tools", desc: "Merge, split, compress, and convert PDF files." },
              { href: "/image-tools", label: "Image Tools", desc: "Compress, resize, convert, and edit images." },
              { href: "/generators", label: "Generators", desc: "QR codes, passwords, lorem ipsum, and more." },
              { href: "/document-tools", label: "Document Tools", desc: "Convert Word, Excel, and HTML documents." },
              { href: "/utility-tools", label: "Utility Tools", desc: "Word counter, unit converter, diff checker." },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-brand-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-[15px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{cat.label} →</span>
                <span className="mt-1 text-[13px] text-slate-500">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">References</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: JSON object reference
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Glossary/Base64" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: Base64 glossary reference
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
