import type { Metadata } from "next";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/ilovepdf-alternative`;

export const metadata: Metadata = buildPageMetadata({
  title: "iLovePDF Alternative Free — No Signup PDF Tools Online",
  description:
    "Looking for a free iLovePDF alternative? ThePDFTools offers PDF merge, split, compress, convert, sign and 30+ more tools — no account, no upload, no limits.",
  url: PAGE_URL,
  keywords: [
    "ilovepdf alternative",
    "ilovepdf alternative free",
    "free ilovepdf alternative",
    "pdf tools no signup",
    "ilovepdf no account",
    "free pdf tools online no signup",
    "ilovepdf free replacement",
  ],
  imageAlt: "iLovePDF Alternative Free",
});

const faqItems = [
  { q: "Is ThePDFTools a free iLovePDF alternative?", a: "Yes. ThePDFTools is completely free with no account required, no daily limits, and no watermarks on any output." },
  { q: "Does iLovePDF require a signup?", a: "iLovePDF has a free tier but limits the number of tasks per hour and day. A premium account is required for unlimited use. ThePDFTools has no limits at all." },
  { q: "Does ThePDFTools upload my files like iLovePDF?", a: "No. ThePDFTools processes files locally in your browser using WebAssembly. Your files never leave your device." },
  { q: "What PDF tools does ThePDFTools have compared to iLovePDF?", a: "ThePDFTools has all the core tools iLovePDF has — merge, split, compress, convert, rotate, watermark, protect, unlock, sign — plus image tools, developer tools, QR code generator, and more." },
  { q: "Can I use ThePDFTools on mobile?", a: "Yes. All tools are mobile-responsive and work on iPhone, Android, and tablet browsers without any app installation." },
];

const comparisonRows = [
  { feature: "Price", ilovepdf: "Free (limited) / Paid", us: "100% Free" },
  { feature: "Account Required", ilovepdf: "Required for full access", us: "Never" },
  { feature: "Task Limits", ilovepdf: "Limited on free plan", us: "Unlimited" },
  { feature: "Files Uploaded to Server", ilovepdf: "Yes", us: "No — browser only" },
  { feature: "Watermarks", ilovepdf: "On some free outputs", us: "Never" },
  { feature: "PDF Merge", ilovepdf: "✓", us: "✓" },
  { feature: "PDF Split", ilovepdf: "✓", us: "✓" },
  { feature: "PDF Compress", ilovepdf: "✓", us: "✓" },
  { feature: "PDF to Word", ilovepdf: "✓", us: "✓" },
  { feature: "Sign PDF", ilovepdf: "✓", us: "✓" },
  { feature: "Image Tools", ilovepdf: "Basic", us: "18+ tools" },
  { feature: "Developer Tools", ilovepdf: "✗", us: "✓" },
  { feature: "Mobile Friendly", ilovepdf: "✓", us: "✓" },
];

const allTools = [
  { href: "/pdf-compress", label: "Compress PDF", desc: "Reduce PDF size for email and portals." },
  { href: "/pdf-merge", label: "Merge PDF", desc: "Combine multiple PDFs into one." },
  { href: "/pdf-split", label: "Split PDF", desc: "Extract pages from large PDFs." },
  { href: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF to editable DOCX." },
  { href: "/word-to-pdf", label: "Word to PDF", desc: "Convert DOCX to PDF without Office." },
  { href: "/pdf-to-jpg", label: "PDF to JPG", desc: "Export PDF pages as images." },
  { href: "/jpg-to-pdf", label: "JPG to PDF", desc: "Build PDF from images." },
  { href: "/pdf-sign", label: "Sign PDF", desc: "Add a signature to any PDF." },
  { href: "/pdf-protect", label: "Protect PDF", desc: "Password-protect your PDF." },
  { href: "/pdf-unlock", label: "Unlock PDF", desc: "Remove password from PDF." },
  { href: "/pdf-rotate", label: "Rotate PDF", desc: "Fix page orientation." },
  { href: "/image-compressor", label: "Compress Image", desc: "Reduce JPG/PNG file size." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "iLovePDF Alternative Free — No Signup PDF Tools Online",
      description: "ThePDFTools is a free iLovePDF alternative with no account required and 30+ tools.",
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
        { "@type": "ListItem", position: 2, name: "iLovePDF Alternative", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function IlovePdfAlternativePage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <p className="inline-flex rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
            Free iLovePDF Alternative
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Free iLovePDF Alternative — No Account, No Limits
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            ThePDFTools is a free alternative to iLovePDF. Get the same core PDF tools — merge, split, compress, convert, sign — plus image tools and developer utilities. No account required, no daily limits, and files never leave your browser.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pdf-tools" className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
              Browse All PDF Tools
            </Link>
            <Link href="/pdf-compress" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700">
              Compress PDF Free
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-950">iLovePDF vs ThePDFTools — Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 w-1/3">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">iLovePDF</th>
                  <th className="px-6 py-4 text-center font-semibold text-brand-700 bg-brand-50">ThePDFTools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 font-medium text-slate-800">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{row.ilovepdf}</td>
                    <td className="px-6 py-3.5 text-center font-medium text-brand-700 bg-brand-50/30">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All Tools */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">All Free PDF Tools — No Account Required</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map((t) => (
              <Link key={t.href} href={t.href}
                className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-brand-200 hover:bg-white">
                <span className="text-[14px] font-semibold text-slate-900 group-hover:text-brand-700">{t.label}</span>
                <span className="mt-0.5 text-[12px] text-slate-500">{t.desc}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/pdf-tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all 30+ PDF Tools →
            </Link>
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
        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/WebAssembly", label: "MDN: WebAssembly overview" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: File API reference" },
            { href: "https://pdf-lib.js.org/", label: "pdf-lib documentation" },
          ]}
        />
      </main>
    </div>
  );
}
