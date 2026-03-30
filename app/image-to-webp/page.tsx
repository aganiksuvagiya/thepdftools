import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageToWebpClient = dynamic(() => import("./ImageToWebpClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image to WebP Converter Online — Convert JPG/PNG to WebP",
  description:
    "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. No upload required — conversion happens in your browser.",
  keywords: [
    "image to webp",
    "jpg to webp",
    "png to webp converter",
    "convert image to webp online",
    "free webp converter",
    "webp converter",
  ],
  openGraph: {
    title: "Free Image to WebP Converter Online — Convert JPG/PNG to WebP",
    description:
      "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. Runs entirely in your browser.",
    url: "https://thepdftools.com/image-to-webp",
    images: [
      {
        url: "https://thepdftools.com/og-image-to-webp.png",
        width: 1200,
        height: 630,
        alt: "Image to WebP Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.com/image-to-webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image to WebP Converter Online",
      "url": "https://thepdftools.com/image-to-webp",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. Runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is WebP format?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP is a modern image format developed by Google that provides superior lossy and lossless compression for images on the web. It supports transparency and animation while producing significantly smaller files than PNG or JPEG.",
          },
        },
        {
          "@type": "Question",
          "name": "Which browsers support WebP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP is supported by all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, Safari (14.1+), and Opera. It covers over 97% of global browser usage.",
          },
        },
        {
          "@type": "Question",
          "name": "How much smaller are WebP files?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP images are typically 25-35% smaller than JPEG files and up to 26% smaller than PNG files at equivalent visual quality, making them ideal for faster web page loading.",
          },
        },
        {
          "@type": "Question",
          "name": "Will I lose quality converting to WebP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With lossy compression there is a small quality reduction, but it is usually imperceptible at the default quality setting. You can adjust the quality slider to find the perfect balance between file size and visual fidelity.",
          },
        },
      ],
    },
  ],
};

export default function ImageToWebpPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Image to WebP
          </div>
          <h1 className="tool-page-title">Free Image to WebP Converter Online</h1>
          <p className="tool-page-description">
            Convert JPG, PNG, and other images to WebP format instantly in your
            browser. Adjust quality for the perfect balance between size and
            clarity — no server upload required.
          </p>
        </div>

        <ImageToWebpClient />
      </div>
    </div>
  );
}
