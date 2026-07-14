import type { Metadata } from "next";
import Link from "next/link";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/generators`;

export const metadata: Metadata = buildPageMetadata({
  title: "Free Online Generators — QR Code, Barcode, Password, Lorem Ipsum & More",
  description:
    "Free online generators: create QR codes, barcodes, strong passwords, lorem ipsum placeholder text, invoices, and more. Instant results, no sign-up required.",
  url: PAGE_URL,
  keywords: [
    "free online generators",
    "qr code generator",
    "barcode generator",
    "password generator",
    "lorem ipsum generator",
    "invoice generator",
    "online generator tools",
    "free qr code generator",
  ],
});

const generatorTools = [
  {
    group: "QR & Barcode",
    tools: [
      { href: "/qr-generator", label: "QR Code Generator", desc: "Generate QR codes for URLs, text, Wi-Fi, contacts, and more." },
      { href: "/barcode-generator", label: "Barcode Generator", desc: "Create 1D barcodes in multiple formats including Code 128." },
    ],
  },
  {
    group: "Document Generators",
    tools: [
      { href: "/invoice-generator", label: "Invoice Generator", desc: "Create professional invoices and export as PDF." },
      { href: "/resume-builder", label: "Resume Builder", desc: "Build a professional resume and download it as a PDF." },
      { href: "/ai-invoice-extractor", label: "AI Invoice Extractor", desc: "Extract data from invoice PDFs automatically using AI." },
      { href: "/signature-generator", label: "Signature Generator", desc: "Create a digital handwritten signature online." },
    ],
  },
  {
    group: "Text & Content",
    tools: [
      { href: "/lorem-ipsum", label: "Lorem Ipsum Generator", desc: "Generate placeholder text for mockups and designs." },
      { href: "/password-generator", label: "Password Generator", desc: "Generate strong, secure random passwords instantly." },
    ],
  },
];

const faqItems = [
  {
    q: "Are these generators free to use?",
    a: "Yes. Every generator on this page is completely free to use with no account required and no watermarks on output.",
  },
  {
    q: "Can I generate a QR code for a website link?",
    a: "Yes. The QR Code Generator supports URLs, plain text, Wi-Fi credentials, email addresses, phone numbers, and vCards.",
  },
  {
    q: "Can I download the generated output?",
    a: "Yes. All generators allow you to download your output — QR codes as PNG/SVG, invoices as PDF, and barcodes as image files.",
  },
  {
    q: "Do these generators work on mobile?",
    a: "Yes. All tools are mobile-responsive and work on iPhone, Android, and tablet browsers.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Online Generators",
      url: PAGE_URL,
      description: "Free online generators: QR codes, barcodes, passwords, lorem ipsum, and invoices.",
      author: { "@type": "Organization", name: "thepdftools Editorial Team" },
      dateModified: "2026-07-05",
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Generators", item: PAGE_URL },
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

export default function GeneratorsPage() {
  const lastUpdated = getLastUpdated("app/generators/page.tsx");
  const toolCount = generatorTools.reduce((acc, g) => acc + g.tools.length, 0);

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
          <span className="text-slate-800 font-medium">Generators</span>
        </nav>

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
          <p className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
            {toolCount} Free Tools
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Online Generators
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Generate QR codes, barcodes, invoices, signatures, and placeholder text — all free, all instant, right in your browser. No software needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            {["No Sign-up", "Instant Results", "Works on Mobile", "100% Free"].map((b) => (
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
        {generatorTools.map((group) => (
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
            What Are These Generator Tools?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            These free online generators let you create outputs instantly — whether that is a QR code for a restaurant menu, a barcode for a product label, an invoice for a freelance client, or placeholder text for a design mockup. Each tool produces a downloadable output with no account needed.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Businesses, designers, developers, and freelancers use these tools daily. The QR Code Generator alone supports URLs, Wi-Fi login sharing, vCard contacts, and plain text. The Invoice Generator lets you build, preview, and export professional invoices as PDF.
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
              { href: "/developer-tools", label: "Developer Tools", desc: "JSON, Base64, URL encoder, regex, and more." },
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
              <a href="https://developers.google.com/search/docs/appearance/structured-data/logo" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                Google Search Central: Logo and structured data guidance
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: Web Crypto secure random values
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
