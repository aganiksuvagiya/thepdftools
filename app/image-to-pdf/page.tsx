import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageToPdfClient = dynamic(() => import("./ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image to PDF Converter Online — Convert JPG, PNG to PDF",
  description:
    "Convert JPG, PNG, and WebP images to PDF for free online. Combine multiple images into one PDF with custom page size, orientation, and margins. No upload, no signup — runs in your browser.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "convert image to pdf",
    "photo to pdf",
    "picture to pdf free",
    "image to pdf converter",
    "combine images to pdf",
    "multiple images to pdf",
    "jpg to pdf converter free",
    "png to pdf online",
    "webp to pdf",
  ],
  openGraph: {
    title: "Free Image to PDF Converter Online — Convert JPG, PNG to PDF",
    description:
      "Convert JPG, PNG, and WebP images to PDF for free online. Combine multiple images into one PDF with custom page size, orientation, and margins. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-to-pdf",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-to-pdf",
  },
};

export default function ImageToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Image to PDF Converter",
        url: "https://thepdftools.site/image-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert JPG, PNG, and WebP images to PDF for free online. Combine multiple images into one PDF with custom page size, orientation, and margins.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert images to PDF here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your images never leave your browser. All conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats can I convert to PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can convert any of these formats into a professional PDF document instantly.",
            },
          },
          {
            "@type": "Question",
            name: "Can I combine multiple images into one PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! You can add multiple images, reorder them as needed, and combine them all into a single PDF document. Each image gets its own page.",
            },
          },
          {
            "@type": "Question",
            name: "Can I choose the page size and orientation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. You can choose A4, Letter, or Fit to Image page size. Portrait and Landscape orientations are available, along with adjustable margins.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a limit on how many images I can convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no hard limit. Since all processing happens in your browser, it depends on your device memory. Most users can convert dozens of images smoothly.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "Image to PDF", "item": "https://thepdftools.site/image-to-pdf" },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert images to
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  professional PDF files
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload JPG, PNG, or WebP images and combine them into a single PDF instantly in your browser.
                No signup, no upload to a server, and no extra steps.
              </p>
            </div>

            <div className="mt-8">
              <ImageToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for documents",
                  text: "Turn scanned pages, receipts, and photos into organized PDF documents for easy sharing.",
                },
                {
                  title: "Best for sharing",
                  text: "Combine multiple images into one PDF file that anyone can open on any device.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No files are uploaded.",
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
              <li>Use &ldquo;Fit to Image&rdquo; page size when you want to preserve exact image dimensions.</li>
              <li>Reorder images before converting to control the page sequence in your PDF.</li>
              <li>Choose &ldquo;No Margin&rdquo; for full-bleed photo pages or &ldquo;Medium&rdquo; for document-style layouts.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Scanned documents", "Photo albums", "Receipts & invoices", "Presentations"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Images to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your images by dragging and dropping or clicking the upload area. Our image to PDF converter supports JPG, PNG, and WebP formats. You can add multiple images at once.</li>
              <li>Arrange your images in the desired order using the reorder controls. Choose your preferred page size (A4, Letter, or Fit to Image), orientation, and margin settings.</li>
              <li>Click &ldquo;Convert to PDF&rdquo; and download your finished PDF instantly. Each image is placed on its own page, perfectly scaled and centered.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Image to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your images never leave your device. All conversion happens locally in your browser using JavaScript, keeping your photos and documents 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Combine Multiple Images</h3>
                <p className="mt-1 text-sm text-slate-500">Add as many images as you need and combine them into a single, organized PDF. Perfect for creating photo albums, document scans, or presentation handouts.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Page Layout</h3>
                <p className="mt-1 text-sm text-slate-500">Choose from A4, Letter, or Fit to Image page sizes. Set portrait or landscape orientation and adjust margins to get the exact layout you need.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Reorder with Ease</h3>
                <p className="mt-1 text-sm text-slate-500">Drag and reorder your images before converting. Remove individual images or rearrange the sequence to create the perfect PDF document every time.</p>
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
                  q: "Is it safe to convert images to PDF here?",
                  a: "Absolutely. Your images never leave your browser. All conversion runs client-side using JavaScript, so no data is uploaded to any server. Your files remain completely private on your device.",
                },
                {
                  q: "What image formats can I convert to PDF?",
                  a: "Our image to PDF converter fully supports JPG/JPEG, PNG, and WebP formats. Whether you have photographs, screenshots, scanned documents, or graphics, this tool converts them all into professional PDF files.",
                },
                {
                  q: "Can I combine multiple images into one PDF?",
                  a: "Yes! Simply upload multiple images, reorder them as needed using the arrow controls, and click Convert to PDF. Each image is placed on its own page in the final PDF document.",
                },
                {
                  q: "Can I choose the page size and orientation?",
                  a: "Absolutely. You can select A4, Letter, or Fit to Image page size. Portrait and Landscape orientations are available, along with None, Small, and Medium margin options to customize your layout.",
                },
                {
                  q: "Is there a limit on how many images I can convert?",
                  a: "There is no hard limit on the number of images. Since all processing happens in your browser, performance depends on your device memory. Most users can convert dozens of images smoothly on modern devices.",
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
              Converting images to PDF is one of the most common document tasks for professionals and everyday users alike. Whether you need to convert jpg to pdf for archiving important receipts, turn png to pdf for sharing design mockups, or combine multiple photos into a single pdf for a presentation, our free online image to pdf converter makes it effortless. Unlike other tools that require uploading your files to remote servers, this image to pdf converter processes everything locally in your browser, ensuring complete privacy. Students use it to compile scanned notes into study packets. Real estate agents convert property photos into professional listing documents. Accountants turn receipt images into organized PDF records for tax season. Photographers create portfolio PDFs from their best shots. With support for JPG, PNG, and WebP formats, custom page sizes including A4 and Letter, and adjustable margins and orientation, you have full control over the final output. No signup required, no watermarks, no file size limits — just fast, free, and private image to PDF conversion.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/html-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">HTML to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
