import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfToImageClient = dynamic(() => import("./PdfToImageClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF to Image Converter Online — Convert PDF Pages to JPG/PNG",
  description:
    "Convert PDF pages to high-quality JPG or PNG images for free online. No upload, no signup — runs entirely in your browser using pdf.js.",
  keywords: [
    "pdf to image",
    "pdf to jpg",
    "pdf to png",
    "convert pdf to image online",
    "free pdf converter",
    "pdf page to image",
  ],
  openGraph: {
    title: "Free PDF to Image Converter Online — Convert PDF Pages to JPG/PNG",
    description:
      "Convert PDF pages to high-quality JPG or PNG images for free online. No upload, no signup — runs entirely in your browser using pdf.js.",
    url: "https://thepdftools.site/pdf-to-image",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-to-image",
  },
};

export default function PdfToImagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF to Image Converter",
        url: "https://thepdftools.site/pdf-to-image",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert PDF pages to high-quality JPG or PNG images for free online. No upload, no signup — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All conversion is done client-side using JavaScript (pdf.js), so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can convert PDF pages to JPG (JPEG) or PNG format. For JPG, you can also adjust the quality level to balance file size and image quality.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert all pages at once?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the tool converts all pages of your PDF at once. You can then download individual pages or all of them.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a page limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so performance depends on your device's memory and the PDF's complexity.",
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                PDF to Image
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert PDF to images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  in high resolution
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert PDF pages to high-quality JPG or PNG images instantly in your
                browser. Adjust quality, preview pages, and download — no upload, no
                server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <PdfToImageClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for presentations", text: "Convert PDF slides to images for easy embedding in presentations." },
                { title: "Best for sharing", text: "Share PDF content as images on social media and messaging apps." },
                { title: "Best for privacy", text: "Conversion runs entirely in your browser — no server uploads." },
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
              <li>Choose PNG for higher quality, JPG for smaller file sizes.</li>
              <li>Higher DPI settings produce sharper images for printing.</li>
              <li>Each PDF page becomes a separate image file.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Presentation slides", "Social media sharing", "Thumbnail generation", "Document previews"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert PDF to Image Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>Choose your preferred output format — JPG or PNG.</li>
              <li>Adjust the image quality slider to balance file size and clarity.</li>
              <li>Preview each converted page before downloading.</li>
              <li>Download individual page images or save all pages at once.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PDF to Image Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">High Quality Output</h3>
                <p className="mt-1 text-sm text-slate-500">Convert PDF pages to crisp, high-resolution images that preserve every detail of your original document.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">JPG or PNG Output</h3>
                <p className="mt-1 text-sm text-slate-500">Choose between JPG for smaller file sizes or PNG for lossless quality with transparency support.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">All Pages at Once</h3>
                <p className="mt-1 text-sm text-slate-500">Convert every page of your PDF in one go. No need to process pages individually — save time with batch conversion.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Adjustable Quality</h3>
                <p className="mt-1 text-sm text-slate-500">Fine-tune the output quality with an easy slider. Get the perfect balance between image clarity and file size for your needs.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What resolution are the output images?", a: "Images are rendered at high resolution using pdf.js. The output quality depends on the quality slider setting and the original PDF content. Higher settings produce sharper, larger images." },
                { q: "Can I convert all pages at once?", a: "Yes, the tool automatically converts all pages of your PDF at once. You can then download individual pages or save all of them." },
                { q: "Can I control the image quality?", a: "Yes. For JPG output, you can adjust the quality slider to find the perfect balance between image clarity and file size. PNG output is always lossless." },
                { q: "Can I convert large PDFs with many pages?", a: "Yes. There is no hard page limit. Processing happens in your browser, so very large PDFs may take longer depending on your device's memory and processing power." },
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
            <p className="text-[15px] leading-8 text-slate-500">Convert PDF to image online for free with our browser-based PDF to JPG and PDF to PNG converter. Turn PDF pages into high-quality images for presentations, social media, websites, or documentation. This free PDF to image tool processes your files locally — no upload to any server, no signup, no watermark. Works with any PDF document on any device.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
