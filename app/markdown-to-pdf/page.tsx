import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const MarkdownToPdfClient = dynamic(() => import("./MarkdownToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Markdown To PDF Online Free No Upload",
  description:
    "Use Markdown To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "markdown to pdf",
    "convert markdown to pdf",
    "md to pdf",
    "markdown to pdf converter",
    "markdown pdf online free",
    "markdown to pdf online",
    "md to pdf converter",
    "markdown export pdf",
    "markdown file to pdf",
    "free markdown converter",
    "markdown preview pdf",
  ],
  openGraph: {
    title: "Markdown To PDF Online Free No Upload",
    description:
    "Use Markdown To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/markdown-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/markdown-to-pdf",
  },
};

export default function MarkdownToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Markdown to PDF Converter",
        url: "https://thepdftools.site/markdown-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert Markdown to PDF for free online. Paste or upload your .md file and download a beautifully formatted PDF instantly.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert Markdown to PDF here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your Markdown content never leaves your browser. All conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What Markdown features are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All standard Markdown syntax is supported including headings, bold, italic, links, images, code blocks, blockquotes, tables, ordered and unordered lists, and horizontal rules.",
            },
          },
          {
            "@type": "Question",
            name: "Can I upload a .md file?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can either type/paste your Markdown content directly or upload a .md or .markdown file. The content will be parsed and rendered with a live preview before PDF generation.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customize the PDF output?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can choose the page size (A4 or Letter) and font size (Small, Medium, or Large) to customize how your PDF looks before generating it.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to install any software?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This Markdown to PDF converter runs entirely in your web browser. There is nothing to download or install. Just open the page and start converting.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Markdown to PDF", item: "https://thepdftools.site/markdown-to-pdf" },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Markdown to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert Markdown
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  to beautiful PDF files
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Paste or upload your Markdown, preview the rendered output, and download
                a professionally formatted PDF. No signup, no server upload.
              </p>
            </div>

            <div className="mt-8">
              <MarkdownToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for developers",
                  text: "Turn README files, changelogs, and documentation into shareable PDFs in seconds.",
                },
                {
                  title: "Best for documentation",
                  text: "Export technical docs, project specs, and knowledge-base articles with clean formatting.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No data leaves your machine.",
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
              <li>Use standard Markdown syntax for best results — headings, lists, bold, italic, and code blocks all render perfectly.</li>
              <li>For large documents, choose A4 page size and Medium font for optimal readability.</li>
              <li>Upload a .md file from your repo to quickly convert README or CHANGELOG files.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["README files", "Technical docs", "Project specs", "Blog drafts", "Changelogs"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Markdown to PDF</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Type or paste your Markdown content into the editor, or switch to upload mode and drop a .md file. The live preview shows exactly how your document will look.</li>
              <li>Choose your preferred page size (A4 or Letter) and font size (Small, Medium, or Large) to customize the PDF output to your needs.</li>
              <li>Click &ldquo;Generate PDF&rdquo; and your beautifully formatted PDF will download instantly. No waiting, no email required.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Markdown to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Client-Side Processing</h3>
                <p className="mt-1 text-sm text-slate-500">Your Markdown content never leaves your browser. All parsing and PDF generation happen locally using JavaScript, keeping your documents completely private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Full Markdown Support</h3>
                <p className="mt-1 text-sm text-slate-500">Supports all standard Markdown syntax including headings, bold, italic, links, images, code blocks with syntax highlighting, blockquotes, tables, and lists.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Live Preview</h3>
                <p className="mt-1 text-sm text-slate-500">See your rendered Markdown in real time as you type. The split-view editor lets you write and preview side by side, ensuring your document looks perfect before exporting.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Installation Required</h3>
                <p className="mt-1 text-sm text-slate-500">No need to install Pandoc, LaTeX, or any other software. Just open your browser, paste your Markdown, and download a professional PDF in seconds.</p>
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
                  q: "Is it safe to convert Markdown to PDF here?",
                  a: "Absolutely. Your Markdown content never leaves your browser. All parsing and PDF generation runs client-side using JavaScript, so no data is uploaded to any server. Your documents remain completely private on your device.",
                },
                {
                  q: "What Markdown features are supported?",
                  a: "All standard Markdown syntax is fully supported, including headings (H1-H6), bold, italic, strikethrough, links, images, ordered and unordered lists, code blocks, inline code, blockquotes, tables, and horizontal rules.",
                },
                {
                  q: "Can I upload a .md file instead of pasting?",
                  a: "Yes. Switch to the \"Upload .md File\" tab and drag-and-drop or browse for your Markdown file. The content will be loaded into the editor with a live preview so you can review it before generating the PDF.",
                },
                {
                  q: "Can I customize the PDF output?",
                  a: "Yes. You can choose between A4 and Letter page sizes, and select from Small (12px), Medium (14px), or Large (16px) font sizes to control how your PDF looks.",
                },
                {
                  q: "Do I need to install any software?",
                  a: "No. This Markdown to PDF converter runs entirely in your web browser. There is nothing to download or install — no Pandoc, no LaTeX, no command-line tools. Just open the page and start converting.",
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
              Markdown has become the standard writing format for developers, technical writers, and content creators. Whether you need to convert a README to PDF for a client presentation, export documentation from your GitHub repository, turn project specifications into printable documents, or share formatted notes with your team, our free Markdown to PDF converter makes it effortless. Unlike command-line tools like Pandoc that require installation and configuration, or desktop apps that cost money, this md to pdf converter runs entirely in your browser with zero setup. Developers use it to quickly generate PDF versions of their documentation without leaving the browser. Technical writers rely on it to produce clean, consistently formatted documents from Markdown sources. Students and researchers convert their Markdown notes into polished PDFs for submission. The live preview ensures your document looks exactly right before you generate the final PDF, saving time and eliminating guesswork.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/text-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Text to PDF</Link>
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/html-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">HTML to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="markdown-to-pdf" />
        </div>
      </div>
    </div>
  );
}
