import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PasswordGeneratorClient = dynamic(() => import("./PasswordGeneratorClient"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" />,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/password-generator`;

export const metadata: Metadata = buildPageMetadata({
  title: "Password Generator — Free Strong Password Generator Online",
  description:
    "Generate strong, secure random passwords online for free. Customize length, include uppercase, lowercase, numbers, and symbols. Copy instantly, no sign-up.",
  url: PAGE_URL,
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator online",
    "free password generator",
    "password generator online",
    "generate strong password",
    "random password online free",
  ],
});

const faqItems = [
  { q: "Is this password generator secure?", a: "Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure. Nothing is sent to any server." },
  { q: "How long should a password be?", a: "At least 12 characters for most accounts. Use 16+ characters for banking, email, and work accounts. 20+ for high-value accounts." },
  { q: "What makes a password strong?", a: "A strong password is long (12+ characters), uses a mix of uppercase, lowercase, numbers, and symbols, and is not based on dictionary words." },
  { q: "Can I generate multiple passwords at once?", a: "Yes. Set the count and click Generate Batch to create up to 20 passwords at once. Copy all with one click." },
  { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated entirely in your browser and never sent to any server or stored anywhere." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Password Generator",
      url: PAGE_URL,
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free cryptographically secure password generator. Customize length and character types.",
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
        { "@type": "ListItem", position: 2, name: "Generators", item: `${SITE_URL}/generators` },
        { "@type": "ListItem", position: 3, name: "Password Generator", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function PasswordGeneratorPage() {
  const lastUpdated = getLastUpdated("app/password-generator/page.tsx");
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Generators", href: "/generators" },
          { label: "Password Generator" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Password Generator
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Generate strong, cryptographically secure random passwords. Customize length, character types, and copy instantly. Nothing is sent to any server.
          </p>

          <div className="mt-8">
            <PasswordGeneratorClient />
          </div>
        </div>

        {/* Tips */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Password Security Tips</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-7 text-slate-600">
            <li>✓ Use a different password for every account</li>
            <li>✓ Use a password manager to store passwords securely</li>
            <li>✓ Enable two-factor authentication (2FA) wherever possible</li>
            <li>✓ Never share passwords over email or chat</li>
            <li>✓ Change passwords immediately if a service reports a breach</li>
            <li>✓ Avoid using personal information (birthdays, names) in passwords</li>
          </ul>
        </section>

        {/* FAQ */}
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

        {/* Related */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/qr-generator", label: "QR Code Generator" },
              { href: "/barcode-generator", label: "Barcode Generator" },
              { href: "/signature-generator", label: "Signature Generator" },
              { href: "/generators", label: "All Generators →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        <ToolSeoGrowth slug="password-generator" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues", label: "MDN: Web Crypto `getRandomValues()`" },
            { href: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html", label: "OWASP: password security guidance" },
            { href: "https://pages.nist.gov/800-63-4/sp800-63b.html", label: "NIST SP 800-63B digital identity guidelines" },
          ]}
        />
      </main>
    </div>
  );
}
