import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/smallpdf-vs-thepdftools`;

export const metadata: Metadata = {
  title: "Smallpdf vs ThePDFTools — Free No-Signup PDF Tool Comparison",
  description:
    "Smallpdf vs ThePDFTools: compare features, pricing, privacy, and upload limits. ThePDFTools is a free Smallpdf alternative with no signup, no upload, and no daily limits.",
  keywords: [
    "smallpdf alternative",
    "smallpdf alternative free",
    "smallpdf vs thepdftools",
    "free pdf tools no signup",
    "smallpdf free alternative",
    "pdf tools without upload",
    "smallpdf no account needed",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Smallpdf vs ThePDFTools — Free Alternative Comparison",
    description: "Compare Smallpdf vs ThePDFTools. See which is better for free, private, no-signup PDF work.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const faqItems = [
  { q: "Is ThePDFTools a free alternative to Smallpdf?", a: "Yes. ThePDFTools is completely free with no account required, no daily limits, and no watermarks. All tools work in your browser." },
  { q: "Does ThePDFTools require a signup like Smallpdf?", a: "No. ThePDFTools has no signup, no account, and no email required. Open any tool and start using it immediately." },
  { q: "Does ThePDFTools upload files to a server?", a: "No. Most tools process files locally in your browser. Your documents are never sent to any server." },
  { q: "What tools does ThePDFTools have that Smallpdf also has?", a: "PDF Merge, PDF Split, PDF Compress, PDF to Word, Word to PDF, PDF to JPG, JPG to PDF, PDF Sign, PDF Protect, PDF Unlock, Image Compressor, and more." },
  { q: "Is Smallpdf really free?", a: "Smallpdf offers limited free use with a daily task limit and requires signup for full access. Paid plans start at a monthly fee." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Smallpdf vs ThePDFTools — Free No-Signup PDF Tool Comparison",
      description: "Compare Smallpdf vs ThePDFTools for PDF compression, merge, split, and conversion. Pricing, privacy, and feature comparison.",
      url: PAGE_URL,
      datePublished: "2026-04-14T00:00:00Z",
      dateModified: "2026-05-30T00:00:00Z",
      author: { "@type": "Organization", name: "ThePDFTools", url: SITE_URL },
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
        { "@type": "ListItem", position: 2, name: "Smallpdf vs ThePDFTools", item: PAGE_URL },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Price", smallpdf: "Free (limited) / Paid from $9/mo", us: "100% Free" },
  { feature: "Account Required", smallpdf: "Required for full access", us: "No account ever" },
  { feature: "Daily Task Limit", smallpdf: "2 tasks/day on free plan", us: "Unlimited" },
  { feature: "File Upload to Server", smallpdf: "Yes — files sent to cloud", us: "No — browser only" },
  { feature: "File Size Limit", smallpdf: "Limited on free plan", us: "Device RAM limit" },
  { feature: "Watermarks", smallpdf: "None on paid, limited free", us: "Never" },
  { feature: "PDF Compress", smallpdf: "✓", us: "✓" },
  { feature: "PDF Merge", smallpdf: "✓", us: "✓" },
  { feature: "PDF Split", smallpdf: "✓", us: "✓" },
  { feature: "PDF to Word", smallpdf: "✓", us: "✓" },
  { feature: "Image Tools", smallpdf: "Limited", us: "18+ image tools" },
  { feature: "Developer Tools", smallpdf: "✗", us: "✓ (JSON, Base64, Regex...)" },
  { feature: "Password Generator", smallpdf: "✗", us: "✓" },
  { feature: "QR Code Generator", smallpdf: "✗", us: "✓" },
];

const tools = [
  { href: "/pdf-compress", label: "Compress PDF" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-split", label: "Split PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/word-to-pdf", label: "Word to PDF" },
  { href: "/image-compressor", label: "Compress Image" },
  { href: "/pdf-sign", label: "Sign PDF" },
  { href: "/pdf-protect", label: "Protect PDF" },
];

export default function SmallpdfComparisonPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <p className="inline-flex rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
            Smallpdf Alternative
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Smallpdf vs ThePDFTools
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Looking for a free Smallpdf alternative with no signup, no daily limits, and no file uploads? ThePDFTools offers the same core PDF tools — compress, merge, split, convert — completely free, running privately in your browser.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pdf-compress" className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
              Try Free PDF Compressor
            </Link>
            <Link href="/pdf-tools" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700">
              See All PDF Tools
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-950">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 w-1/3">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">Smallpdf</th>
                  <th className="px-6 py-4 text-center font-semibold text-brand-700 bg-brand-50">ThePDFTools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 font-medium text-slate-800">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{row.smallpdf}</td>
                    <td className="px-6 py-3.5 text-center font-medium text-brand-700 bg-brand-50/30">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why ThePDFTools */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Why Choose ThePDFTools Over Smallpdf?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { title: "No Account, Ever", desc: "Smallpdf requires a free account for full access. ThePDFTools never asks for your email, name, or any account details." },
              { title: "No Daily Limits", desc: "Smallpdf's free plan limits you to 2 tasks per day. ThePDFTools has no limits — run 100 tasks in a day if you need to." },
              { title: "Files Stay Private", desc: "Smallpdf processes files on their cloud servers. ThePDFTools runs in your browser — your documents never leave your device." },
              { title: "More Tool Categories", desc: "Beyond PDF tools, ThePDFTools includes 18+ image tools, developer tools (JSON, regex, Base64), QR generator, password generator, and more." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to use Smallpdf */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">When Smallpdf Might Be Better</h2>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            Smallpdf is a solid choice if you need <strong>team accounts</strong>, <strong>cloud storage integration</strong> (Google Drive, Dropbox), or <strong>enterprise-level PDF editing</strong> with advanced features like e-signatures on enterprise plans. If you are a business that needs compliance, audit trails, or SSO — Smallpdf's paid tier is worth evaluating.
          </p>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            For everyday PDF tasks — compression, merging, converting, signing — ThePDFTools handles everything without a credit card or account.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Start with These Free Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <Link key={t.href} href={t.href}
                className="group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:border-brand-300 hover:bg-white hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
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
      </main>
    </div>
  );
}
