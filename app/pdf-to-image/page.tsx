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
      </div>
    </div>
  );
}
