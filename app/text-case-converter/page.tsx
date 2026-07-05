import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const TextCaseClient = dynamic(() => import("./TextCaseClient"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" />,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/text-case-converter`;

export const metadata: Metadata = buildPageMetadata({
  title: "Text Case Converter — Uppercase, Lowercase, Title Case, camelCase Online Free",
  description:
    "Free online text case converter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and more. Instant, no sign-up.",
  url: PAGE_URL,
  keywords: [
    "text case converter",
    "uppercase to lowercase",
    "lowercase to uppercase",
    "title case converter",
    "camelcase converter",
    "snake case converter",
    "text converter online",
    "change text case online free",
  ],
});

const faqItems = [
  { q: "What is Title Case?", a: "Title Case capitalizes the first letter of every word: 'Hello World Example'. Used for headings, titles, and names." },
  { q: "What is camelCase?", a: "camelCase removes spaces and capitalizes the first letter of each word except the first: 'helloWorldExample'. Used in JavaScript, Java, and many programming languages for variable names." },
  { q: "What is snake_case?", a: "snake_case replaces spaces with underscores and uses all lowercase: 'hello_world_example'. Commonly used in Python, Ruby, and database column names." },
  { q: "What is kebab-case?", a: "kebab-case replaces spaces with hyphens: 'hello-world-example'. Used in CSS class names, HTML attributes, and URL slugs." },
  { q: "What is PascalCase?", a: "PascalCase capitalizes the first letter of every word with no spaces: 'HelloWorldExample'. Used for class names in most programming languages." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Text Case Converter",
      url: PAGE_URL,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convert text between 10 different cases including uppercase, camelCase, snake_case and more.",
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
        { "@type": "ListItem", position: 2, name: "Utility Tools", item: `${SITE_URL}/utility-tools` },
        { "@type": "ListItem", position: 3, name: "Text Case Converter", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function TextCaseConverterPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Utility Tools", href: "/utility-tools" },
          { label: "Text Case Converter" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Text Case Converter
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime="2026-07-05">Updated July 5, 2026</time>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Convert text between 10 different cases instantly — UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and more. Click any result to copy.
          </p>
          <div className="mt-8">
            <TextCaseClient />
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
              { href: "/word-counter", label: "Word Counter" },
              { href: "/lorem-ipsum", label: "Lorem Ipsum Generator" },
              { href: "/utility-tools", label: "All Utility Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        <ToolSeoGrowth slug="text-case-converter" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Glossary/Camel_case", label: "MDN: camelCase glossary" },
            { href: "https://developer.mozilla.org/en-US/docs/Glossary/Snake_case", label: "MDN: snake_case glossary" },
            { href: "https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case", label: "MDN: kebab-case glossary" },
          ]}
        />
      </main>
    </div>
  );
}
