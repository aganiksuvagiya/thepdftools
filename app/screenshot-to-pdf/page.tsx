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
      </div>
    </div>
  );
}
