import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-tools`;

export const metadata: Metadata = {
  title: "PDF Tools Category — Merge, Split, Compress & Convert PDF Online",
  description:
    "Browse the PDF Tools category on thepdftools.site. Merge, split, compress, convert, edit, and secure PDF files online with free browser-based tools.",
  keywords: [
    "free pdf tools online",
    "pdf tools",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "pdf to word",
    "pdf converter",
    "free pdf editor",
    "pdf tools no upload",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PDF Tools Category — Merge, Split, Compress & Convert PDF Online",
    description:
      "Browse free browser-based PDF tools for merging, compressing, converting, editing, and securing documents.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const pdfTools = [
  {
    group: "Organize & Merge",
    tools: [
      { href: "/pdf-merge", label: "Merge PDF", desc: "Combine multiple PDFs into one file." },
      { href: "/pdf-split", label: "Split PDF", desc: "Extract pages or split into separate files." },
      { href: "/pdf-rotate", label: "Rotate PDF", desc: "Rotate pages to the correct orientation." },
      { href: "/pdf-page-numbers", label: "Add Page Numbers", desc: "Stamp page numbers on every page." },
    ],
  },
  {
    group: "Compress & Optimize",
    tools: [
      { href: "/pdf-compress", label: "Compress PDF", desc: "Reduce PDF file size without quality loss." },
      { href: "/compress-pdf-to-100kb", label: "Compress to 100KB", desc: "Get your PDF under 100KB for form uploads." },
      { href: "/compress-pdf-for-govt-exam", label: "Compress for Govt Exam", desc: "Meet government portal file size limits." },
      { href: "/reduce-pdf-size-online-free", label: "Reduce PDF Size", desc: "Fast, free PDF size reduction online." },
    ],
  },
  {
    group: "Convert PDF",
    tools: [
      { href: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF to editable DOCX format." },
      { href: "/pdf-to-excel", label: "PDF to Excel", desc: "Extract tables from PDF into spreadsheets." },
      { href: "/pdf-to-jpg", label: "PDF to JPG", desc: "Convert PDF pages to JPG images." },
      { href: "/pdf-to-image", label: "PDF to Image", desc: "Export PDF pages as PNG or JPG." },
      { href: "/pdf-to-ppt", label: "PDF to PowerPoint", desc: "Convert PDF slides to editable PPT." },
    ],
  },
  {
    group: "Create PDF",
    tools: [
      { href: "/word-to-pdf", label: "Word to PDF", desc: "Convert DOCX files to PDF format." },
      { href: "/excel-to-pdf", label: "Excel to PDF", desc: "Turn spreadsheets into PDF documents." },
      { href: "/ppt-to-pdf", label: "PowerPoint to PDF", desc: "Convert PPT/PPTX slides to PDF." },
      { href: "/jpg-to-pdf", label: "JPG to PDF", desc: "Convert JPG images to a PDF document." },
      { href: "/image-to-pdf", label: "Image to PDF", desc: "Combine images into a single PDF." },
      { href: "/html-to-pdf", label: "HTML to PDF", desc: "Convert web pages or HTML code to PDF." },
      { href: "/markdown-to-pdf", label: "Markdown to PDF", desc: "Render Markdown files as PDF." },
      { href: "/text-to-pdf", label: "Text to PDF", desc: "Convert plain text files to PDF." },
      { href: "/screenshot-to-pdf", label: "Screenshot to PDF", desc: "Save screenshots as a PDF file." },
    ],
  },
  {
    group: "Edit PDF",
    tools: [
      { href: "/pdf-editor", label: "PDF Editor", desc: "Add text, shapes, and annotations." },
      { href: "/pdf-highlight", label: "Highlight PDF", desc: "Highlight and annotate PDF text." },
      { href: "/pdf-watermark", label: "Add Watermark", desc: "Stamp a watermark on PDF pages." },
      { href: "/pdf-redaction", label: "Redact PDF", desc: "Permanently hide sensitive content." },
      { href: "/pdf-form-filler", label: "Fill PDF Form", desc: "Fill out PDF forms in your browser." },
    ],
  },
  {
    group: "Secure PDF",
    tools: [
      { href: "/pdf-protect", label: "Protect PDF", desc: "Password-protect your PDF file." },
      { href: "/pdf-unlock", label: "Unlock PDF", desc: "Remove password from a PDF." },
      { href: "/pdf-sign", label: "Sign PDF", desc: "Add a digital signature to a PDF." },
    ],
  },
  {
    group: "Advanced PDF",
    tools: [
      { href: "/pdf-ocr", label: "PDF OCR", desc: "Make scanned PDFs searchable with OCR." },
      { href: "/scanned-pdf-to-searchable-pdf", label: "Scanned PDF to Searchable", desc: "Convert image PDFs to searchable text." },
      { href: "/pdf-compare", label: "Compare PDFs", desc: "Highlight differences between two PDFs." },
    ],
  },
];

const faqItems = [
  {
    q: "Are all PDF tools free?",
    a: "Yes. Every tool on this page is completely free to use with no sign-up and no watermarks.",
  },
  {
    q: "Do you upload my files to a server?",
    a: "Most tools process files directly in your browser. Your documents are not sent to any server.",
  },
  {
    q: "Do these PDF tools work on mobile?",
    a: "Yes. All tools are mobile-responsive and work on iPhone, Android, tablet, and desktop browsers.",
  },
  {
    q: "Is there a file size limit?",
    a: "Browser-based tools work with files up to the memory capacity of your device. There is no hard upload limit for client-side tools.",
  },
  {
    q: "Can I use these tools without installing software?",
    a: "Yes. Every tool runs in your web browser. No download or installation is needed.",
  },
];

const heroHighlights = ["No sign-up needed", "Most tools run locally", "Works on mobile", "100% free"];

const categoryThemes: Record<
  string,
  { accent: string; surface: string; icon: string }
> = {
  "Organize & Merge": {
    accent: "text-violet-700",
    surface: "bg-violet-50 border-violet-100",
    icon: "M7.5 6.75h9m-9 5.25h9m-9 5.25H12M4.5 4.5h15v15h-15z",
  },
  "Compress & Optimize": {
    accent: "text-rose-700",
    surface: "bg-rose-50 border-rose-100",
    icon: "M12 3v12m0 0 4-4m-4 4-4-4M4.5 16.5v1.125A2.625 2.625 0 007.125 20.25h9.75a2.625 2.625 0 002.625-2.625V16.5",
  },
  "Convert PDF": {
    accent: "text-blue-700",
    surface: "bg-blue-50 border-blue-100",
    icon: "M4.5 6.75A2.25 2.25 0 016.75 4.5h6l6 6v6.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V6.75zm8.25-2.25v6h6",
  },
  "Create PDF": {
    accent: "text-emerald-700",
    surface: "bg-emerald-50 border-emerald-100",
    icon: "M12 4.5v15m0-15 4.5 4.5M12 4.5 7.5 9M5.25 19.5h13.5",
  },
  "Edit PDF": {
    accent: "text-amber-700",
    surface: "bg-amber-50 border-amber-100",
    icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z",
  },
  "Secure PDF": {
    accent: "text-indigo-700",
    surface: "bg-indigo-50 border-indigo-100",
    icon: "M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 9h10.5A2.25 2.25 0 0019.5 17.25v-4.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 12.75v4.5A2.25 2.25 0 006.75 19.5z",
  },
  "Advanced PDF": {
    accent: "text-teal-700",
    surface: "bg-teal-50 border-teal-100",
    icon: "M3.75 12h16.5m-8.25-8.25v16.5",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "PDF Tools Category",
      url: PAGE_URL,
      description: "Category page for browser-based PDF tools including merge, split, compress, convert, edit, and secure workflows.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: PAGE_URL },
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

export default function PdfToolsPage() {
  const toolCount = pdfTools.reduce((acc, g) => acc + g.tools.length, 0);

  return (
    <div className="bg-[#f8fafc] py-5 sm:py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">PDF Tools</span>
        </nav>

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-sm sm:p-7 lg:p-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.16),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.12),transparent_20%)]" />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">
                PDF tools category
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-[2.8rem] lg:text-[3rem] lg:leading-[0.98]">
                PDF Tools
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
                Browse tools for merging, splitting, compressing, converting,
                editing, and securing PDF files. This page is the PDF tools
                category of thepdftools.site.
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5 text-sm font-medium text-slate-600">
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5"
                  >
                    <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#pdf-tool-groups"
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.55)] transition-transform hover:-translate-y-0.5"
                >
                  Browse PDF tools
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { value: `${toolCount}+`, label: "PDF tools" },
                  { value: "Free", label: "No sign-up" },
                  { value: "Local", label: "Browser use" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 text-center shadow-sm">
                    <div className="text-xl font-black tracking-[-0.05em] text-slate-900">{item.value}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pdf-tool-groups" className="mt-8 space-y-5">
          {pdfTools.map((group) => {
            const theme = categoryThemes[group.group] ?? {
              accent: "text-slate-700",
              surface: "bg-slate-50 border-slate-200",
              icon: "M4.5 12h15",
            };

            return (
              <section key={group.group} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className={`border-b px-5 py-4 sm:px-6 ${theme.surface}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border bg-white ${theme.accent}`}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={theme.icon} />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-950">
                          {group.group}
                        </h2>
                        <p className="mt-1 text-xs leading-6 text-slate-600">
                          {group.tools.length} tools for this workflow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/30"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.surface} ${theme.accent}`}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-6-6 6 6-6 6" />
                        </svg>
                      </div>
                      <span className="mt-3 text-[15px] font-semibold text-slate-900 transition-colors group-hover:text-brand-700">
                        {tool.label}
                      </span>
                      <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-500">
                        {tool.desc}
                      </span>
                      <span className="mt-4 inline-flex items-center text-[13px] font-medium text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                        Open tool
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
