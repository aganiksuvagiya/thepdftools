import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            PDF to Image
          </div>
          <h1 className="tool-page-title">Free PDF to Image Converter Online</h1>
          <p className="tool-page-description">
            Convert PDF pages to high-quality JPG or PNG images instantly in your
            browser. Adjust quality, preview pages, and download — no upload, no
            server, completely private.
          </p>
        </div>

        <PdfToImageClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert PDF to Image Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>Choose your preferred output format — JPG or PNG.</li>
              <li>Adjust the image quality slider to balance file size and clarity.</li>
              <li>Preview each converted page before downloading.</li>
              <li>Download individual page images or save all pages at once.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our PDF to Image Converter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">High Quality Output</h3><p className="mt-1 text-sm text-gray-500">Convert PDF pages to crisp, high-resolution images that preserve every detail of your original document.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">JPG or PNG Output</h3><p className="mt-1 text-sm text-gray-500">Choose between JPG for smaller file sizes or PNG for lossless quality with transparency support.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">All Pages at Once</h3><p className="mt-1 text-sm text-gray-500">Convert every page of your PDF in one go. No need to process pages individually — save time with batch conversion.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Adjustable Quality</h3><p className="mt-1 text-sm text-gray-500">Fine-tune the output quality with an easy slider. Get the perfect balance between image clarity and file size for your needs.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What resolution are the output images?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Images are rendered at high resolution using pdf.js. The output quality depends on the quality slider setting and the original PDF content. Higher settings produce sharper, larger images.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert all pages at once?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, the tool automatically converts all pages of your PDF at once. You can then download individual pages or save all of them.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I control the image quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. For JPG output, you can adjust the quality slider to find the perfect balance between image clarity and file size. PNG output is always lossless.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert large PDFs with many pages?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. There is no hard page limit. Processing happens in your browser, so very large PDFs may take longer depending on your device&apos;s memory and processing power.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Convert PDF to image online for free with our browser-based PDF to JPG and PDF to PNG converter. Turn PDF pages into high-quality images for presentations, social media, websites, or documentation. This free PDF to image tool processes your files locally — no upload to any server, no signup, no watermark. Works with any PDF document on any device.</p>
        </div>
      </div>
    </div>
  );
}
