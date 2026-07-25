import type { Metadata } from "next";
import Link from "next/link";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = buildPageMetadata({
  title: "About ThePDFTools — Free Online PDF, Image & Developer Tools",
  description:
    "ThePDFTools is a free, browser-based toolkit with 100+ tools for PDF, image, and developer tasks. No upload, no signup, no tracking — everything runs privately in your browser.",
  url: PAGE_URL,
  keywords: [
    "about thepdftools",
    "free browser based tools",
    "privacy first pdf tools",
    "free image tools online",
    "developer tools online",
  ],
  imageAlt: "About thepdftools",
});

const stats = [
  { value: "100+", label: "Free Tools" },
  { value: "6", label: "Tool Categories" },
  { value: "0", label: "Sign-ups Required" },
  { value: "100%", label: "Browser-Based" },
];

const categories = [
  { href: "/pdf-tools", label: "PDF Tools", desc: "Merge, split, compress, convert, edit, and secure PDF files.", count: "30+" },
  { href: "/image-tools", label: "Image Tools", desc: "Compress, resize, crop, convert, and edit images.", count: "18+" },
  { href: "/developer-tools", label: "Developer Tools", desc: "JSON formatter, Base64, URL encoder, regex tester, and more.", count: "10+" },
  { href: "/generators", label: "Generators", desc: "QR codes, barcodes, passwords, invoices, and lorem ipsum.", count: "8+" },
  { href: "/document-tools", label: "Document Tools", desc: "Convert Word, Excel, PowerPoint, HTML, and Markdown to PDF.", count: "11+" },
  { href: "/utility-tools", label: "Utility Tools", desc: "Word counter, text case converter, color tools, and more.", count: "6+" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    {
      "@type": "AboutPage",
      url: PAGE_URL,
      name: "About ThePDFTools",
      description: "Learn how thepdftools works, why it is privacy-first, and which users it helps.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc] py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">About</span>
        </nav>

        {/* Hero */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            About ThePDFTools
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            ThePDFTools is a free, privacy-first online toolkit for PDF, image, and developer tasks. Every tool runs 100% in your browser — no files are ever uploaded to any server, no account is required, and there are no daily limits or hidden fees.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-brand-700">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            Most online tools send your files to a remote server. This creates privacy risks — especially for sensitive documents like contracts, invoices, ID documents, tax files, and personal photos. ThePDFTools was built to solve this: every tool processes files locally on your device using modern browser technology including WebAssembly, the Canvas API, and the Web Crypto API.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            We believe productivity tools should be accessible to everyone — students, freelancers, small businesses, and developers in every country — without paywalls, subscriptions, or forced account creation.
          </p>
        </div>

        {/* How it works */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">How It Works</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              <strong>PDF tools</strong> use WebAssembly-compiled PDF libraries that run directly in your browser tab. When you compress a PDF or merge files, the processing happens on your device — the same way a desktop app works, but without installation.
            </p>
            <p>
              <strong>Image tools</strong> use the HTML5 Canvas API and, for AI features like background removal and upscaling, ONNX Runtime Web — a machine learning runtime that executes AI models entirely client-side.
            </p>
            <p>
              <strong>Developer tools</strong> use JavaScript built-in APIs. JSON formatting, Base64 encoding, URL encoding, regex testing, and timestamp conversion are all pure browser operations with no server involvement.
            </p>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Tool Categories</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-brand-200 hover:bg-white"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-[14px] font-semibold text-slate-900 group-hover:text-brand-700">{cat.label}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{cat.desc}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 border border-slate-200">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-8">
          <h2 className="text-xl font-bold text-slate-900">Privacy Commitment</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-slate-700">
            {[
              "Files are never uploaded to our servers",
              "No account or email address required",
              "No cookies used for tracking",
              "No ads that track your behavior",
              "All processing happens in your browser tab",
              "Files are never stored or retained after you close the tab",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Read the full <Link href="/privacy" className="text-brand-700 underline hover:text-brand-800">Privacy Policy</Link>.
          </p>
        </div>

        {/* Who uses */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Who Uses ThePDFTools?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { who: "Students", what: "Compress and merge assignment PDFs, convert PPTX to PDF for submissions" },
              { who: "Freelancers", what: "Generate invoices, create PDF portfolios, watermark client work" },
              { who: "Small Businesses", what: "Merge contracts, compress documents for email, generate QR codes" },
              { who: "Web Developers", what: "Format JSON, test regex, encode URLs, convert timestamps" },
              { who: "Designers", what: "Remove backgrounds, convert image formats, compress for web" },
              { who: "HR & Admin", what: "Merge resumes, protect PDFs with passwords, add page numbers" },
            ].map((item) => (
              <div key={item.who} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[13px] font-bold text-brand-700">{item.who}</p>
                <p className="mt-1 text-[12px] text-slate-600">{item.what}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-brand-600 hover:underline font-medium">← Back to All Tools</Link>
          <Link href="/pdf-tools" className="text-slate-500 hover:underline">PDF Tools</Link>
          <Link href="/image-tools" className="text-slate-500 hover:underline">Image Tools</Link>
          <Link href="/privacy" className="text-slate-500 hover:underline">Privacy Policy</Link>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">References</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: Canvas API documentation
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/WebAssembly" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: WebAssembly overview
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                MDN: Web Crypto API overview
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
