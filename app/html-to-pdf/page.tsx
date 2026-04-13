import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const HtmlToPdfClient = dynamic(() => import("./HtmlToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Convert HTML to PDF Free Online – No Upload Required",
  description:
    "Convert HTML code or files to PDF format free online. Paste HTML or upload an .html file and save as PDF with full formatting. No signup, no server upload — runs entirely in your browser.",
  keywords: [
    "html to pdf",
    "convert html to pdf",
    "webpage to pdf",
    "save html as pdf",
    "html to pdf converter",
    "html file to pdf",
    "convert webpage to pdf",
    "html to pdf online free",
  ],
  openGraph: {
    title: "Convert HTML to PDF Free Online – No Upload Required",
    description:
      "Convert HTML code or files to PDF format free online. No signup, no server upload — runs entirely in your browser.",
    url: "https://thepdftools.site/html-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/html-to-pdf",
  },
};

export default function HtmlToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free HTML to PDF Converter",
        url: "https://thepdftools.site/html-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert HTML code or files to PDF format free online. No signup, no upload — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does this preserve CSS styling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The 'Save as PDF' option uses your browser's built-in print engine, which preserves all CSS styling, images, and layout. The 'Extract Text to PDF' option creates a clean text-only PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to convert HTML here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your HTML content is processed entirely in your browser. Nothing is uploaded to any server. The preview uses a sandboxed iframe for security.",
            },
          },
          {
            "@type": "Question",
            name: "Can I paste HTML code directly?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can either paste HTML code into the text editor or upload an .html file. Both methods work with full preview and conversion support.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between the two conversion options?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "'Save as PDF' opens your browser's print dialog which preserves all formatting, images, and CSS. 'Extract Text to PDF' creates a lightweight PDF with just the text content using pdf-lib.",
            },
          },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                HTML to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert HTML to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  with full formatting
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Paste HTML code or upload an .html file and convert it to PDF instantly
                in your browser. Preview your content live and save with full CSS styling.
              </p>
            </div>

            <div className="mt-8">
              <HtmlToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for developers", text: "Preview and convert HTML code to PDF with live rendering and full CSS support." },
                { title: "Best for archiving", text: "Save web pages and HTML documents as PDF files for permanent offline access." },
                { title: "Best for privacy", text: "Everything runs locally in your browser — your HTML content never leaves your device." },
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
              <li>Paste complete HTML including styles for best results.</li>
              <li>&quot;Save as PDF&quot; preserves all CSS, images, and layout via the print dialog.</li>
              <li>&quot;Extract Text to PDF&quot; creates a lightweight text-only PDF.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Email templates", "Web page archiving", "Invoice generation", "Report rendering"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert HTML to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Paste your HTML code into the editor or upload an .html file using the file upload area.</li>
              <li>Preview your rendered HTML in the live preview panel to verify it looks correct.</li>
              <li>Click &quot;Save as PDF&quot; to open the browser print dialog and save with full formatting, or click &quot;Extract Text to PDF&quot; for a text-only version.</li>
              <li>Download or save the PDF from the print dialog. Your file is ready for sharing.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our HTML to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Full CSS Support</h3>
                <p className="mt-1 text-sm text-slate-500">The print-based conversion preserves all CSS styling, web fonts, images, and layout exactly as rendered in the browser.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Live Preview</h3>
                <p className="mt-1 text-sm text-slate-500">See your HTML rendered in real-time in a sandboxed iframe. Verify your content and styling before converting to PDF.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Two Conversion Modes</h3>
                <p className="mt-1 text-sm text-slate-500">Choose between full-formatting PDF via the print dialog or a lightweight text-only PDF generated with pdf-lib.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start converting immediately without creating an account, providing an email address, or installing any software.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Does this preserve CSS styling and images?", a: "Yes. The 'Save as PDF' option uses your browser's native print engine, which faithfully renders all CSS, images, web fonts, and layout. This produces the highest quality PDF output." },
                { q: "Can I paste raw HTML code?", a: "Yes. The editor accepts any valid HTML code including inline styles, embedded CSS, and full HTML documents. You can also upload .html files directly." },
                { q: "Is the preview secure?", a: "The HTML preview runs in a sandboxed iframe with restricted permissions. JavaScript execution is isolated and cannot access the parent page or your data." },
                { q: "What is 'Extract Text to PDF'?", a: "This option strips all HTML tags and extracts plain text content, then generates a clean PDF document using pdf-lib. It is useful when you only need the text content without any formatting." },
                { q: "Can I convert web pages?", a: "You can copy the HTML source of any web page and paste it into the editor. External resources (images, CSS files) may not load if they require the original server. For best results, use inline styles and base64-encoded images." },
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
            <p>Our free HTML to PDF converter lets you transform HTML code and files into professional PDF documents directly in your browser. Paste HTML with CSS styling or upload .html files, preview the rendered output in real-time, and save as PDF with full formatting using the browser print engine. You can also extract plain text content into a lightweight PDF using pdf-lib. No data ever leaves your device.</p>
            <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Paste HTML code or upload .html files with drag-and-drop</li>
              <li>Live sandboxed preview of rendered HTML content</li>
              <li>Full CSS and image preservation via browser print dialog</li>
              <li>Lightweight text-only PDF extraction option</li>
            </ul>
            <p className="text-xs text-gray-400">Convert html to pdf, html to pdf converter online free, save webpage as pdf, html file to pdf, convert html code to pdf, webpage to pdf no upload, html to pdf browser based, save html as pdf free, convert html email to pdf, html to pdf without installing software.</p>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Converting HTML to PDF is essential for web developers, designers, and anyone who needs to archive or share web content in a portable format. Whether you need to save an HTML email template as a PDF for review, archive a web page for offline access, generate invoices from HTML templates, or create reports from rendered HTML, our free online HTML to PDF converter handles it efficiently. The tool offers two conversion approaches: a full-formatting option that uses your browser built-in print engine to preserve all CSS styling, images, fonts, and layout; and a text extraction option that creates a lightweight PDF with just the text content. Both methods run entirely in your browser, so your HTML content never leaves your device.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Document Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/excel-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Excel to PDF</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/ppt-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PPT to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
