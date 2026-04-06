import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ScreenshotToPdfClient = dynamic(() => import("./ScreenshotToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Screenshot to PDF Converter Online",
  description:
    "Convert screenshots and images to PDF for free online. Combine multiple images into a single PDF with custom page sizes and margins. No upload, no signup — runs in your browser.",
  keywords: [
    "screenshot to pdf",
    "image to pdf",
    "convert screenshot to pdf",
    "images to pdf converter",
    "free screenshot pdf",
    "combine images to pdf",
  ],
  openGraph: {
    title: "Free Screenshot to PDF Converter Online",
    description:
      "Convert screenshots and images to PDF for free online. Combine multiple images into a single PDF with custom page sizes and margins. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/screenshot-to-pdf",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/screenshot-to-pdf",
  },
};

export default function ScreenshotToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Screenshot to PDF Converter",
        url: "https://thepdftools.site/screenshot-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert screenshots and images to PDF for free online. Combine multiple images into a single PDF.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I combine multiple screenshots into one PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Upload multiple screenshots or images and they will be combined into a single PDF document. You can reorder them before converting.",
            },
          },
          {
            "@type": "Question",
            name: "What page sizes are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A4, US Letter, and Auto (fit to image) page sizes are supported. You can also choose portrait, landscape, or auto orientation.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats can I convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG/JPEG, PNG, and WebP formats are supported. WebP images are automatically converted to PNG before embedding in the PDF.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "Screenshot to PDF", "item": "https://thepdftools.site/screenshot-to-pdf" },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Screenshot to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Screenshots to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  in one clean document
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert screenshots and images to a PDF document instantly in your
                browser. Upload multiple images, reorder them, choose page size and
                margins — no upload, no server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <ScreenshotToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for documentation", text: "Compile multiple screenshots into a single organized PDF document." },
                { title: "Best for reports", text: "Create visual reports and guides from captured screen images." },
                { title: "Best for privacy", text: "All processing runs locally in your browser — nothing gets uploaded." },
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
              <li>Drag and drop multiple screenshots at once.</li>
              <li>Reorder images before converting for the right page sequence.</li>
              <li>The PDF preserves full image resolution.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Bug reports", "User guides", "Visual documentation", "Process recording"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Screenshots to PDF</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Click the upload area or drag and drop your screenshots and images into the tool.</li>
              <li>Add multiple images — JPG, PNG, and WebP formats are all supported.</li>
              <li>Reorder images by dragging them into the desired page sequence.</li>
              <li>Choose your preferred page size (A4, Letter, or Auto) and orientation.</li>
              <li>Click &quot;Convert to PDF&quot; and download your finished PDF document.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Screenshot to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Images</h3>
                <p className="mt-1 text-sm text-slate-500">Upload and combine multiple screenshots and photos into a single, organized PDF document in one session.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Reorder Pages</h3>
                <p className="mt-1 text-sm text-slate-500">Easily drag and rearrange your images before conversion to ensure pages appear in the correct order in your PDF.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Page Size Options</h3>
                <p className="mt-1 text-sm text-slate-500">Choose from A4, US Letter, or Auto page sizes with portrait, landscape, or automatic orientation to fit your needs.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload Required</h3>
                <p className="mt-1 text-sm text-slate-500">All processing runs locally in your browser. Your images are never sent to a server, ensuring complete privacy.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How many images can I add?", a: "There is no fixed limit on the number of images. Processing happens in your browser, so the practical limit depends on your device's memory. Most users can combine dozens of images without issues." },
                { q: "What page sizes are available?", a: "A4, US Letter, and Auto (fit to image) page sizes are supported. You can also choose portrait, landscape, or auto orientation for each conversion." },
                { q: "Can I change the page orientation?", a: "Yes. You can select portrait, landscape, or auto orientation. Auto orientation will match each page to the dimensions of the corresponding image." },
                { q: "Are WebP images supported?", a: "Yes. JPG/JPEG, PNG, and WebP formats are all supported. WebP images are automatically converted to PNG before embedding in the PDF for maximum compatibility." },
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
            <p className="text-[15px] leading-8 text-slate-500">Convert screenshots to PDF and images to PDF online for free with our browser-based converter. Combine multiple photos, screenshots, and images into a single PDF document with customizable page sizes and orientation. This free screenshot to PDF tool is perfect for creating photo portfolios, archiving screenshots, compiling receipts, or sharing image collections as a professional PDF. No upload, no signup, no watermark.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
