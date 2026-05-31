import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/document-tools`;

export const metadata: Metadata = {
  title: "Free Document Converter Tools — Word to PDF, Excel to PDF, HTML to PDF & More",
  description:
    "Free online document converter tools: convert Word to PDF, Excel to PDF, Markdown to PDF, HTML to PDF, and more. No software installation required.",
  keywords: [
    "free document converter online",
    "word to pdf",
    "excel to pdf",
    "html to pdf",
    "markdown to pdf",
    "document conversion tools",
    "convert documents online free",
    "text to pdf",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Free Document Converter Tools — Word to PDF, Excel to PDF, HTML to PDF & More",
    description:
      "Free online document converters: Word to PDF, Excel to PDF, HTML to PDF, Markdown to PDF, and more.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const documentTools = [
  {
    group: "Convert to PDF",
    tools: [
      { href: "/word-to-pdf", label: "Word to PDF", desc: "Convert DOCX/DOC files to PDF without Microsoft Office." },
      { href: "/excel-to-pdf", label: "Excel to PDF", desc: "Convert Excel spreadsheets to PDF documents." },
      { href: "/ppt-to-pdf", label: "PowerPoint to PDF", desc: "Convert PPT/PPTX presentations to PDF." },
      { href: "/html-to-pdf", label: "HTML to PDF", desc: "Convert HTML code or web pages to PDF." },
      { href: "/markdown-to-pdf", label: "Markdown to PDF", desc: "Render Markdown documents as clean PDF files." },
      { href: "/text-to-pdf", label: "Text to PDF", desc: "Convert plain .txt files to PDF format." },
      { href: "/screenshot-to-pdf", label: "Screenshot to PDF", desc: "Save screenshots and images as a PDF document." },
    ],
  },
  {
    group: "Extract from PDF",
    tools: [
      { href: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF back to editable DOCX format." },
      { href: "/pdf-to-excel", label: "PDF to Excel", desc: "Extract tables from PDF into Excel spreadsheets." },
      { href: "/pdf-to-ppt", label: "PDF to PowerPoint", desc: "Convert PDF slides back to editable PPT." },
      { href: "/pdf-ocr", label: "PDF OCR", desc: "Extract text from scanned PDF using OCR." },
    ],
  },
];

const faqItems = [
  {
    q: "Can I convert Word to PDF without Microsoft Office?",
    a: "Yes. The Word to PDF converter runs in your browser and does not require Microsoft Office or any desktop software.",
  },
  {
    q: "Does conversion preserve formatting?",
    a: "Yes. The converters are designed to maintain original layout, fonts, tables, and images as closely as possible.",
  },
  {
    q: "Are these document tools free?",
    a: "Yes. Every document conversion tool on this page is free to use with no sign-up and no watermarks.",
  },
  {
    q: "What document formats are supported?",
    a: "The tools support DOCX, DOC, XLSX, XLS, PPTX, PPT, HTML, Markdown, plain text, and image formats as input.",
  },
  {
    q: "Do these tools work on mobile?",
    a: "Yes. All document tools are mobile-responsive and work on phones and tablets without any app installation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Document Converter Tools Online",
      url: PAGE_URL,
      description: "Free browser-based document converter tools: Word to PDF, Excel to PDF, HTML to PDF, and more.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Document Tools", item: PAGE_URL },
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

export default function DocumentToolsPage() {
  const toolCount = documentTools.reduce((acc, g) => acc + g.tools.length, 0);

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
          <span className="text-slate-800 font-medium">Document Tools</span>
        </nav>

        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
          <p className="inline-flex rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-700">
            {toolCount} Free Tools
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Document Converter Tools
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Convert Word, Excel, PowerPoint, HTML, and Markdown documents to PDF — and back. Free, browser-based, no sign-up required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            {["No Sign-up", "No Software Needed", "Works on Mobile", "100% Free"].map((b) => (
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
        {documentTools.map((group) => (
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
            What Are These Document Tools?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            These {toolCount} free document conversion tools let you move files between formats without needing Microsoft Office, LibreOffice, or any other desktop application. Convert a Word report to PDF before sending it, turn an Excel spreadsheet into a formatted PDF for printing, or extract a scanned PDF back into editable text using OCR.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Particularly useful for professionals working on shared devices, students submitting coursework online, and developers who need to render HTML or Markdown as PDF programmatically.
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
      </main>
    </div>
  );
}
