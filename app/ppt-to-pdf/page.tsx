import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PptToPdfClient = dynamic(() => import("./PptToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PowerPoint to PDF Converter Online — Convert PPTX to PDF",
  description:
    "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser. Extract slide content from PPTX and download as PDF instantly.",
  keywords: [
    "ppt to pdf",
    "powerpoint to pdf",
    "convert pptx to pdf online",
    "ppt to pdf converter free",
    "ppt to pdf online free no upload",
    "powerpoint to pdf no signup",
    "convert powerpoint to pdf free",
    "pptx to pdf converter no watermark",
    "pptx to pdf",
    "presentation to pdf",
  ],
  openGraph: {
    title: "Free PowerPoint to PDF Converter Online — Convert PPTX to PDF",
    description:
      "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser. Download your PDF instantly.",
    url: "https://thepdftools.site/ppt-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/ppt-to-pdf",
  },
};

export default function PptToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PowerPoint to PDF Converter",
        url: "https://thepdftools.site/ppt-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does this converter preserve formatting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This lightweight browser-based converter extracts text content from your PowerPoint slides and creates a clean PDF. For full formatting, images, and layout preservation, use Microsoft Office or Google Slides to export as PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to convert my PowerPoint here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PowerPoint file never leaves your browser. All processing is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What file formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool supports .pptx (PowerPoint 2007+) files for free online PowerPoint to PDF conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple presentations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can convert presentations one after another. Each conversion happens instantly in your browser with no waiting for server processing.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "PPTX to PDF", "item": "https://thepdftools.site/ppt-to-pdf" },
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
                PPTX to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert PPTX to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free online
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert your PowerPoint presentation to PDF format instantly in your
                browser. Use this free PPTX to PDF converter with no upload, no
                signup, and no watermark.
              </p>
            </div>

            <div className="mt-8">
              <PptToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for sharing", text: "Convert presentations to universally viewable PDF format." },
                { title: "Best for printing", text: "PDF preserves exact layout and fonts for professional printing." },
                { title: "Best for archiving", text: "Archive presentations in a compact, non-editable format." },
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
              <li>PDF format ensures your slides look the same on any device.</li>
              <li>Convert before sharing to prevent accidental edits.</li>
              <li>Ideal for creating handouts from PPTX and PowerPoint presentation files.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Meeting handouts", "Client proposals", "Course materials", "Portfolio presentations"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert PowerPoint to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Click the upload area above or drag and drop your .pptx file into the converter.</li>
              <li>The tool reads your PowerPoint file directly in your browser — nothing is sent to a server.</li>
              <li>Text content is extracted from each slide and organized into a PDF document.</li>
              <li>Review the slide count and file information displayed after processing.</li>
              <li>Click the download button to save the converted PDF file to your device.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Benefits of Converting PPT to PDF</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Universal Compatibility</h3>
                <p className="mt-1 text-sm text-slate-500">PDF files can be opened on any device without needing PowerPoint installed. Share your presentation content with anyone, regardless of their software or operating system.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Browser-Based</h3>
                <p className="mt-1 text-sm text-slate-500">Your PowerPoint files never leave your device. The entire conversion runs locally using JavaScript, so there is no upload delay, no server queue, and no privacy risk.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Quick Text Extraction</h3>
                <p className="mt-1 text-sm text-slate-500">Extracts all text content from your slides and organizes it into a clean, readable PDF. Perfect for archiving presentation notes, sharing talking points, or creating text-based summaries.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start converting immediately with no account registration, no email verification, and no daily limits. The tool is completely free and always available.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Does this converter preserve full formatting?", a: "This lightweight browser-based converter focuses on extracting text content from your PowerPoint slides and creating a clean PDF. It does not preserve complex layouts, animations, embedded images, or custom fonts. For full visual fidelity, export directly from Microsoft PowerPoint or Google Slides." },
                { q: "Is it safe to convert my PowerPoint file here?", a: "Absolutely. Your PowerPoint file is processed entirely within your web browser using JavaScript. No files are uploaded to any external server, no data is stored remotely, and no third parties ever see your content. The tool works with complete privacy." },
                { q: "What file formats are supported?", a: "This tool supports .pptx (Office Open XML, PowerPoint 2007 and later) files." },
                { q: "Can I convert multiple presentations?", a: "Yes. You can convert as many PowerPoint files as you need, one after another. Each conversion happens instantly inside your browser with no server round-trip. There are no daily limits or file-count restrictions." },
                { q: "Is there a file size limit?", a: "There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device's available memory. Most presentations under 100 MB convert without any issues." },
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

          {/* SEO paragraph */}
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Our free online PowerPoint to PDF converter is designed for anyone who needs to convert PPTX presentations to PDF format quickly and securely. Whether you are a student converting lecture slides for study notes, a professional sharing presentation content with colleagues who do not have PowerPoint, or a teacher creating printable handouts from your slides, this tool handles it efficiently. Because the conversion runs entirely inside your browser using JavaScript, your files never leave your computer, eliminating privacy concerns and the wait times associated with server-side processing. The tool extracts text content from each slide in your presentation and creates a clean, organized PDF document with one page per slide. This makes it ideal for archiving presentation text, creating searchable documents from slide content, and sharing talking points without requiring PowerPoint software. The converter supports modern .pptx files (PowerPoint 2007 and later). It works on Windows, macOS, Linux, Android, and iOS devices with any modern web browser. There are no file-size limits, no daily conversion caps, and no account registration required. Simply drop your PowerPoint file, wait for processing, and download your PDF instantly.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Conversion Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
