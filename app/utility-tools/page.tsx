import type { Metadata } from "next";
import Link from "next/link";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/utility-tools`;

export const metadata: Metadata = buildPageMetadata({
  title: "Free Utility Tools Online — Word Counter, Unit Converter, Diff Checker & More",
  description:
    "Free online utility tools: count words, check text differences, convert colors, and more. No sign-up. Works in your browser on any device.",
  url: PAGE_URL,
  keywords: [
    "free utility tools online",
    "word counter online",
    "diff checker online",
    "color converter",
    "tailwind colors",
    "online utility tools",
    "free web tools",
  ],
});

const utilityTools = [
  {
    group: "Text Tools",
    tools: [
      { href: "/word-counter", label: "Word Counter", desc: "Count words, characters, sentences, and reading time." },
      { href: "/text-case-converter", label: "Text Case Converter", desc: "Convert text to UPPERCASE, camelCase, snake_case and more." },
      { href: "/lorem-ipsum", label: "Lorem Ipsum Generator", desc: "Generate placeholder text for design mockups." },
    ],
  },
  {
    group: "Color Tools",
    tools: [
      { href: "/color-picker", label: "Color Picker", desc: "Pick colors from any image and get HEX, RGB, HSL values." },
      { href: "/color-gradient", label: "Gradient Generator", desc: "Build and copy custom CSS color gradients." },
      { href: "/tailwind-colors", label: "Tailwind Colors", desc: "Browse, search, and copy all Tailwind CSS colors." },
    ],
  },
];

const faqItems = [
  {
    q: "Are utility tools free?",
    a: "Yes. Every utility tool on this page is completely free to use with no account required.",
  },
  {
    q: "Do these tools work offline?",
    a: "Most tools run entirely in your browser. Once the page loads, many work without an active internet connection.",
  },
  {
    q: "Is my text or data sent to a server?",
    a: "No. All text processing and color tools run client-side in your browser. Your data never leaves your device.",
  },
  {
    q: "Do these tools work on mobile?",
    a: "Yes. All utility tools are mobile-responsive and work on phones and tablets.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Utility Tools Online",
      url: PAGE_URL,
      description: "Free browser-based utility tools: word counter, diff checker, color tools, and more.",
      author: { "@type": "Organization", name: "thepdftools Editorial Team" },
      dateModified: "2026-07-05",
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Utility Tools", item: PAGE_URL },
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

export default function UtilityToolsPage() {
  const lastUpdated = getLastUpdated("app/utility-tools/page.tsx");
  const toolCount = utilityTools.reduce((acc, g) => acc + g.tools.length, 0);

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
          <span className="text-slate-800 font-medium">Utility Tools</span>
        </nav>

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
          <p className="inline-flex rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
            {toolCount} Free Tools
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Online Utility Tools
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Word counters, color tools, gradient generators, and more productivity utilities — all free, running entirely in your browser with no account needed.
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
        {utilityTools.map((group) => (
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
            What Are These Utility Tools?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            These free utility tools are built for everyday tasks that don't fit neatly into "PDF tools" or "image tools" — counting words in an essay, comparing two versions of a text file, picking an exact color from a screenshot, or building a CSS gradient for a web project. Every tool runs client-side in your browser, so your content stays private.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Writers use the word counter for articles and assignments. Designers use the color picker and gradient generator. Developers use Tailwind Colors to copy design tokens. These are the tools you reach for repeatedly — so they are kept simple, fast, and free.
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
              { href: "/developer-tools", label: "Developer Tools", desc: "JSON, Base64, URL encoder, and more." },
              { href: "/generators", label: "Generators", desc: "QR codes, passwords, lorem ipsum, and more." },
              { href: "/document-tools", label: "Document Tools", desc: "Convert Word, Excel, and HTML documents." },
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: CSS gradient reference
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: CSS color value reference
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
