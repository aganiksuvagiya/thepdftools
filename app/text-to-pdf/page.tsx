import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const TextToPdfClient = dynamic(() => import("./TextToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Text To PDF Online Free No Upload",
  description:
    "Use Text To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "text to pdf",
    "convert text to pdf",
    "txt to pdf",
    "text to pdf converter",
    "notepad to pdf",
    "plain text to pdf",
    "text to pdf online",
    "free text to pdf",
    "text file to pdf",
    "convert txt to pdf online",
    "text to pdf generator",
  ],
  openGraph: {
    title: "Text To PDF Online Free No Upload",
    description:
    "Use Text To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/text-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/text-to-pdf",
  },
};

export default function TextToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Text to PDF Converter",
        url: "https://thepdftools.site/text-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert plain text to PDF for free online. Choose font, size, margins, and page layout. Runs entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert text to PDF here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your text never leaves your browser. All PDF generation is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I choose the font and page size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can choose from Helvetica, Courier, or Times fonts, set the font size from 10pt to 18pt, pick A4 or Letter page size, and adjust margins to small, medium, or large.",
            },
          },
          {
            "@type": "Question",
            name: "Does it handle long text with multiple pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The converter automatically wraps text and creates as many pages as needed. You can see an estimated page count before generating the PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a character limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no hard character limit. Since processing happens in your browser, it depends on your device's memory. Most documents up to hundreds of pages work smoothly.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Text to PDF", item: "https://thepdftools.site/text-to-pdf" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Text to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert text to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  instantly in your browser
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Type or paste any text and generate a clean PDF with your preferred font,
                size, and layout. No signup, no upload to a server, and no extra steps.
              </p>
            </div>

            <div className="mt-8">
              <TextToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for documents",
                  text: "Create professional PDF documents from notes, drafts, or plain text files in seconds.",
                },
                {
                  title: "Best for sharing",
                  text: "Convert text to a universally readable PDF format for easy sharing via email or messaging.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. Your text stays private.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use 12pt font size for standard documents and reports.</li>
              <li>Choose Courier for code snippets or monospaced content.</li>
              <li>Use medium or large margins for a cleaner, more readable layout.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Meeting notes", "Quick letters", "Plain text files", "Study notes"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Text to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Type or paste your text into the text area above. There is no character limit, and the tool handles long documents with multiple pages automatically.</li>
              <li>Choose your preferred font, font size, page size, and margin settings. The estimated page count updates in real time so you know what to expect.</li>
              <li>Click &quot;Generate PDF&quot; and your document will be created and downloaded instantly. The entire process runs in your browser — nothing is uploaded.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Text to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your text never leaves your device. All PDF generation happens locally in your browser using JavaScript, keeping your content 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Customizable Formatting</h3>
                <p className="mt-1 text-sm text-slate-500">Choose from multiple fonts, font sizes, page sizes, and margin options. Create documents that look exactly the way you want without any design software.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Automatic Multi-Page Support</h3>
                <p className="mt-1 text-sm text-slate-500">Long text is automatically wrapped and split across multiple pages. The tool handles text overflow seamlessly so you never lose content.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Instant Download</h3>
                <p className="mt-1 text-sm text-slate-500">No waiting, no email verification, no account required. Generate and download your PDF in seconds, ready to share or print immediately.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "Is it safe to convert text to PDF here?",
                  a: "Absolutely. Your text never leaves your browser. All PDF generation runs client-side using JavaScript, so no data is uploaded to any server. Your content remains completely private on your device.",
                },
                {
                  q: "What fonts and sizes are available?",
                  a: "You can choose from three built-in fonts — Helvetica, Courier, and Times — and five font sizes ranging from 10pt to 18pt. These options cover most document needs from formal letters to code printouts.",
                },
                {
                  q: "Can I convert long text with many pages?",
                  a: "Yes. The converter automatically wraps your text and creates as many pages as needed. You can see an estimated page count before generating the PDF, so there are no surprises.",
                },
                {
                  q: "Is there a character or page limit?",
                  a: "There is no hard limit. Since all processing happens in your browser, performance depends on your device memory. Most documents up to hundreds of pages convert smoothly on modern devices.",
                },
                {
                  q: "Can I convert a .txt file to PDF?",
                  a: "Yes. Simply open your .txt file, copy its contents, and paste them into the text area. The converter will handle the formatting and produce a clean, properly formatted PDF document.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Converting text to PDF is one of the most common document tasks for students, professionals, and anyone who needs to share written content in a universal format. Whether you need to convert meeting notes into a polished PDF for your team, turn a plain text draft into a printable document, or create a quick PDF from a notepad file, our free text to PDF converter makes it effortless. Unlike other tools that require uploading your text to remote servers, this txt to pdf converter processes everything locally in your browser, ensuring complete privacy. Students use it to format study notes and essays. Professionals rely on it to create clean documents from quick drafts. Writers and researchers convert their plain text notes into properly formatted PDFs ready for sharing or archiving. The tool supports multiple fonts, sizes, and margin options so every document looks professional without needing word processing software.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to PDF</Link>
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Merge PDFs</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="text-to-pdf" />
        </div>
      </div>
    </div>
  );
}
