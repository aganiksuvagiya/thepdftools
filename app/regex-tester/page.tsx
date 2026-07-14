import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const RegexClient = dynamic(() => import("./RegexClient"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" />,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/regex-tester`;

export const metadata: Metadata = buildPageMetadata({
  title: "Regex Tester Online Free — Test Regular Expressions in Real Time",
  description:
    "Free online regex tester. Test and debug regular expressions in real time with match highlighting, group capture, and flag support (g, i, m, s). No sign-up.",
  url: PAGE_URL,
  keywords: [
    "regex tester",
    "regex tester online",
    "regular expression tester",
    "regex online",
    "test regex online free",
    "regexp tester",
    "regex debugger online",
    "regex matcher online",
  ],
});

const faqItems = [
  { q: "What regex flags are supported?", a: "This tester supports the g (global), i (case insensitive), m (multiline), and s (dotAll) flags — the same flags supported by JavaScript's RegExp." },
  { q: "What does the 'g' flag do?", a: "The global flag (g) finds all matches in the test string. Without it, only the first match is found." },
  { q: "What does the 'i' flag do?", a: "The case-insensitive flag (i) makes the pattern match uppercase and lowercase letters interchangeably." },
  { q: "Can I test capture groups?", a: "Yes. The match details section shows captured groups for each match. Use parentheses in your pattern to create capture groups, e.g. (\\d+)-(\\d+)." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Regex Tester",
      url: PAGE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free online regex tester with real-time match highlighting.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${SITE_URL}/developer-tools` },
        { "@type": "ListItem", position: 3, name: "Regex Tester", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function RegexTesterPage() {
  const lastUpdated = getLastUpdated("app/regex-tester/page.tsx");
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/developer-tools" },
          { label: "Regex Tester" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Regex Tester
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Test and debug regular expressions in real time. Matches are highlighted as you type. Supports flags g, i, m, and s. No server required.
          </p>
          <div className="mt-8">
            <RegexClient />
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-slate-900 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/json-formatter", label: "JSON Formatter" },
              { href: "/url-encoder", label: "URL Encoder" },
              { href: "/base64", label: "Base64 Encoder" },
              { href: "/developer-tools", label: "All Developer Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        <ToolSeoGrowth slug="regex-tester" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions", label: "MDN: JavaScript regular expressions guide" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp", label: "MDN: `RegExp` reference" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group", label: "MDN: capturing groups" },
          ]}
        />
      </main>
    </div>
  );
}
