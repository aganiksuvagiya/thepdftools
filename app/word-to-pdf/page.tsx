import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const WordToPdfClient = dynamic(() => import("./WordToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Word to PDF Converter Online Free - DOCX No Upload",
  description:
    "Convert Word to PDF online free with no upload required. Turn DOCX files into PDFs that keep fonts, headings, lists, tables, images and page numbers, right in your browser with no signup.",
  url: "https://thepdftools.site/word-to-pdf",
  keywords: [
    "word to pdf",
    "docx to pdf",
    "convert word to pdf free",
    "doc to pdf online",
    "word to pdf converter",
    "word to pdf online free no upload",
    "docx to pdf converter no signup",
    "convert doc to pdf free",
    "word to pdf no watermark",
    "word document to pdf",
    "free word to pdf",
    "convert docx to pdf online",
  ],
  imageAlt: "Word to PDF converter online",
});

export default function WordToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Word to PDF Converter",
        url: "https://thepdftools.site/word-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert Word documents to PDF format free online. No signup, no upload — runs in your browser.",
      },
            {
        "@type": "HowTo",
        name: "How to Convert Word to PDF Online",
        description: "Convert a Word document to PDF format for free in your browser — no Microsoft Office needed.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Open the Word to PDF converter",
            text: "Go to https://thepdftools.site/word-to-pdf and open the free converter.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Upload your Word file",
            text: "Click the upload area or drag and drop your DOCX file.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Convert to PDF",
            text: "Click Convert to PDF to process the document in your browser.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Download the PDF",
            text: "Click Download to save the converted PDF file to your device.",
          }
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
          { "@type": "ListItem", position: 3, name: "Word to PDF", item: "https://thepdftools.site/word-to-pdf" },
        ],
      },
      buildOrganizationSchema(),
      buildWebsiteSchema(),
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "Word to PDF" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Word to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Word to PDF converter
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  online free with no upload
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload a DOCX file and convert it to PDF in your browser. Fonts,
                headings, lists, tables, pictures, headers and page numbers are
                kept. No signup, no server upload — your documents stay private.
              </p>
            </div>

            <div className="mt-8">
              <WordToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for sharing", text: "PDF format ensures your document looks the same on every device and platform." },
                { title: "Best for printing", text: "PDF preserves exact layout, fonts, and spacing for professional printing." },
                { title: "Best for privacy", text: "Everything runs locally in your browser — your documents never leave your device." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Save old .doc files as .docx in Word or Google Docs first.</li>
              <li>If a font is not installed on your device, a similar font is used, so page breaks can shift slightly.</li>
              <li>Text boxes, shapes, charts and footnote text are not drawn yet.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Reports & essays", "Resumes & CVs", "Contracts", "Invoices"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Word to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your Word document by dragging and dropping or clicking the upload area. DOCX (Word 2007 and later) is supported.</li>
              <li>Click the &quot;Convert to PDF&quot; button. The tool reads your document, lays out every page with its fonts, styles, lists, tables, pictures, headers and footers, and generates the PDF.</li>
              <li>Download your PDF instantly. The converted file is ready for sharing, printing, or archiving.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Word to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your Word documents never leave your device. All conversion happens locally in your browser, keeping your files 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Real Page Layout</h3>
                <p className="mt-1 text-sm text-slate-500">Each page is laid out like in Word: paper size and margins, fonts, headings, bullets and numbering, tables, pictures, headers, footers and page numbers. Latin text stays searchable and copyable.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Universal PDF Format</h3>
                <p className="mt-1 text-sm text-slate-500">PDF files look identical on every device and operating system. No more formatting issues when sharing documents with others.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Free & Unlimited</h3>
                <p className="mt-1 text-sm text-slate-500">Convert as many Word documents as you need with no daily limits, no watermarks, and no account registration required.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is it safe to convert Word documents here?", a: "Absolutely. Your Word files never leave your browser. All conversion runs client-side using JavaScript, so no data is uploaded to any server. Your documents remain completely private on your device." },
                { q: "What Word formats are supported?", a: "DOCX files (Microsoft Word 2007 and later) are supported. Old binary .doc files cannot be read in the browser: open them in Word or Google Docs and save them as .docx first." },
                { q: "Will my formatting be preserved in the PDF?", a: "For most documents, yes. Paper size and margins, fonts, bold and italic, colours, headings, bullets and numbering, tabs, tables with borders and shading, pictures, headers, footers and page numbers are kept. Not supported yet: text boxes and shapes, charts, SmartArt, footnote text, multi-column layouts and equations. If a font is not installed on your device, a similar font is used, so line and page breaks can differ slightly from Word. For a pixel-perfect legal or print file, export directly from Word. Latin text is searchable and copyable; Gujarati, Hindi and other scripts look correct but cannot be selected." },
                { q: "Is there a file size limit?", a: "There is no hard file size limit. Since all processing happens in your browser, performance depends on your device memory. Most Word documents up to 20MB convert smoothly on modern devices." },
                { q: "Can I convert multiple Word files at once?", a: "You can convert Word files one at a time for best results. Each conversion happens instantly in your browser, so batch workflows are fast. Simply upload your next document after downloading the previous PDF." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 space-y-6 text-sm text-gray-500 leading-relaxed">
            <h2 className="text-lg font-semibold text-gray-900">About This Tool</h2>
            <p>Our free Word to PDF converter lets you transform DOCX files into clean, portable PDF documents directly in your browser. The tool reads the internal XML structure of your Word document, applies its styles, numbering, tables and headers, and draws every page like Word does, with the right paper size, margins and page numbers. No data ever leaves your device.</p>
            <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>100% browser-based conversion with no server uploads</li>
              <li>Supports DOCX files (save old .doc files as .docx first)</li>
              <li>Keeps fonts, headings, lists, tables, pictures, headers, footers and page numbers</li>
              <li>Instant download with no watermarks or signup required</li>
            </ul>
            <p className="text-xs text-gray-400">Convert word to pdf, docx to pdf converter, free online word to pdf tool, doc to pdf no upload, convert microsoft word document to pdf format, word to pdf browser based, docx to pdf free online converter, word file to pdf no signup, convert doc to pdf instantly, word to pdf without installing software.</p>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Converting Word documents to PDF is one of the most common document tasks in both professional and personal settings. Whether you need to convert a resume to PDF for a job application, share a contract in a format that cannot be easily edited, prepare a report for printing, or archive important documents in a universal format, our free online Word to PDF converter handles it all. Unlike other tools that require uploading your sensitive documents to remote servers, this converter processes everything locally in your browser using JavaScript, ensuring complete privacy and data security. PDF is the gold standard for document sharing because it preserves exact formatting across all devices and operating systems.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">References</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/File" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">MDN: File API overview</a></li>
              <li><a href="https://developers.google.com/search/docs/crawling-indexing/internal-links" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">Google Search Central: Internal linking best practices</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Document Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/excel-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Excel to PDF</Link>
              <Link href="/html-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">HTML to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="word-to-pdf" />
        </div>
      </div>
    </div>
  );
}
