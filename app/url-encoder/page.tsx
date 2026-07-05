import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const UrlEncoderClient = dynamic(() => import("./UrlEncoderClient"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" />,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/url-encoder`;

export const metadata: Metadata = buildPageMetadata({
  title: "URL Encoder / Decoder Online Free — Encode & Decode URLs",
  description:
    "Free online URL encoder and decoder. Encode special characters in URLs using percent-encoding, or decode encoded URLs back to readable text. Instant, no sign-up.",
  url: PAGE_URL,
  keywords: [
    "url encoder",
    "url decoder",
    "url encode online",
    "url decode online",
    "percent encoding",
    "encode url free",
    "decode url online",
    "url encoder decoder",
    "urlencode online",
  ],
});

const faqItems = [
  { q: "What is URL encoding?", a: "URL encoding (percent-encoding) converts special characters into a format that can be safely included in a URL. For example, a space becomes %20 and & becomes %26." },
  { q: "When do I need to encode a URL?", a: "You need URL encoding when a URL contains spaces, non-ASCII characters, or special characters like &, ?, =, #, and /. These characters have special meaning in URLs and must be encoded if used as data." },
  { q: "What is the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes a full URL and does not encode characters that have meaning in URLs (like / and ?). encodeURIComponent encodes everything including those characters, and is used for encoding parameter values." },
  { q: "This tool — does it use encodeURI or encodeURIComponent?", a: "This tool uses encodeURIComponent, which is the correct function for encoding URL parameter values and query string components." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "URL Encoder / Decoder",
      url: PAGE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free online URL encoder and decoder using percent-encoding.",
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
        { "@type": "ListItem", position: 3, name: "URL Encoder", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function UrlEncoderPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/developer-tools" },
          { label: "URL Encoder" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            URL Encoder / Decoder
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime="2026-07-05">Updated July 5, 2026</time>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Encode special characters in URLs using percent-encoding, or decode encoded URLs back to readable text. Supports full URL and query string parameter encoding.
          </p>
          <div className="mt-8">
            <UrlEncoderClient />
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
              { href: "/base64", label: "Base64 Encoder" },
              { href: "/json-formatter", label: "JSON Formatter" },
              { href: "/timestamp-converter", label: "Timestamp Converter" },
              { href: "/developer-tools", label: "All Developer Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        <ToolSeoGrowth slug="url-encoder" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding", label: "MDN: percent-encoding glossary" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent", label: "MDN: `encodeURIComponent()`" },
            { href: "https://url.spec.whatwg.org/", label: "WHATWG URL Standard" },
          ]}
        />
      </main>
    </div>
  );
}
