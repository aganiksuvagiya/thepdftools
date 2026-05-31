import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const TimestampClient = dynamic(() => import("./TimestampClient"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" />,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/timestamp-converter`;

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch to Date & Date to Timestamp",
  description:
    "Free online Unix timestamp converter. Convert epoch timestamp to human-readable date, or date to Unix timestamp. Supports seconds and milliseconds. No sign-up.",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "epoch to date online",
    "unix time converter",
    "epoch timestamp converter online",
    "convert timestamp to date free",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Unix Timestamp Converter — Epoch to Date & Date to Timestamp",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Free, instant, no sign-up.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const faqItems = [
  { q: "What is a Unix timestamp?", a: "A Unix timestamp (also called epoch time) is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC. It is used in programming to store and compare dates as simple integers." },
  { q: "What is the difference between seconds and milliseconds timestamps?", a: "Unix timestamps in seconds are 10 digits (e.g., 1717027200). Millisecond timestamps are 13 digits (e.g., 1717027200000). JavaScript uses milliseconds by default, while most Unix systems use seconds." },
  { q: "What is the current Unix timestamp?", a: "The current Unix timestamp changes every second. Use the 'Refresh' button on this page to get the latest value." },
  { q: "When does Unix time overflow?", a: "On 32-bit systems, Unix timestamps will overflow on January 19, 2038, known as the Year 2038 problem. 64-bit systems are not affected." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Unix Timestamp Converter",
      url: PAGE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convert Unix epoch timestamps to human-readable dates and convert dates to Unix timestamps.",
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
        { "@type": "ListItem", position: 3, name: "Timestamp Converter", item: PAGE_URL },
      ],
    },
  ],
};

export default function TimestampConverterPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/developer-tools" },
          { label: "Timestamp Converter" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Unix Timestamp Converter
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Convert Unix epoch timestamps to human-readable dates (ISO, UTC, local time) and convert any date back to a Unix timestamp. Supports both seconds and milliseconds.
          </p>
          <div className="mt-8">
            <TimestampClient />
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
              { href: "/base64", label: "Base64 Encoder" },
              { href: "/url-encoder", label: "URL Encoder" },
              { href: "/developer-tools", label: "All Developer Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
