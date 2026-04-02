import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    ],
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Screenshot to PDF
          </div>
          <h1 className="tool-page-title">Free Screenshot to PDF Converter</h1>
          <p className="tool-page-description">
            Convert screenshots and images to a PDF document instantly in your
            browser. Upload multiple images, reorder them, choose page size and
            margins — no upload, no server, completely private.
          </p>
        </div>

        <ScreenshotToPdfClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert Screenshots to PDF</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Click the upload area or drag and drop your screenshots and images into the tool.</li>
              <li>Add multiple images — JPG, PNG, and WebP formats are all supported.</li>
              <li>Reorder images by dragging them into the desired page sequence.</li>
              <li>Choose your preferred page size (A4, Letter, or Auto) and orientation.</li>
              <li>Click &quot;Convert to PDF&quot; and download your finished PDF document.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Screenshot to PDF Converter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Multiple Images</h3><p className="mt-1 text-sm text-gray-500">Upload and combine multiple screenshots and photos into a single, organized PDF document in one session.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Reorder Pages</h3><p className="mt-1 text-sm text-gray-500">Easily drag and rearrange your images before conversion to ensure pages appear in the correct order in your PDF.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Page Size Options</h3><p className="mt-1 text-sm text-gray-500">Choose from A4, US Letter, or Auto page sizes with portrait, landscape, or automatic orientation to fit your needs.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No Upload Required</h3><p className="mt-1 text-sm text-gray-500">All processing runs locally in your browser. Your images are never sent to a server, ensuring complete privacy.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How many images can I add?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">There is no fixed limit on the number of images. Processing happens in your browser, so the practical limit depends on your device&apos;s memory. Most users can combine dozens of images without issues.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What page sizes are available?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">A4, US Letter, and Auto (fit to image) page sizes are supported. You can also choose portrait, landscape, or auto orientation for each conversion.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I change the page orientation?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. You can select portrait, landscape, or auto orientation. Auto orientation will match each page to the dimensions of the corresponding image.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Are WebP images supported?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. JPG/JPEG, PNG, and WebP formats are all supported. WebP images are automatically converted to PNG before embedding in the PDF for maximum compatibility.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Convert screenshots to PDF and images to PDF online for free with our browser-based converter. Combine multiple photos, screenshots, and images into a single PDF document with customizable page sizes and orientation. This free screenshot to PDF tool is perfect for creating photo portfolios, archiving screenshots, compiling receipts, or sharing image collections as a professional PDF. No upload, no signup, no watermark.</p>
        </div>
      </div>
    </div>
  );
}
