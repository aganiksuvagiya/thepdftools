import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PngToJpgClient = dynamic(() => import("./PngToJpgClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PNG to JPG Converter Online — Convert PNG to JPEG Instantly",
  description:
    "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser using HTML Canvas.",
  keywords: [
    "png to jpg",
    "png to jpeg converter",
    "convert png to jpg online",
    "free image converter",
    "png jpg converter",
  ],
  openGraph: {
    title: "Free PNG to JPG Converter Online — Convert PNG to JPEG Instantly",
    description:
      "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser.",
    url: "https://thepdftools.site/png-to-jpg",
    images: [
      {
        url: "https://thepdftools.site/og-png-to-jpg.png",
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/png-to-jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free PNG to JPG Converter Online",
      "url": "https://thepdftools.site/png-to-jpg",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens to transparent areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JPG does not support transparency. Any transparent areas in your PNG will be filled with a white background during conversion.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I control JPG quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use the quality slider to choose a value between 0 and 1. Higher values produce better-looking images with larger file sizes, while lower values create smaller files with some quality loss.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my image uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The entire conversion happens locally in your browser using the HTML Canvas API. Your images never leave your device.",
          },
        },
        {
          "@type": "Question",
          "name": "What's the difference between PNG and JPG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PNG is a lossless format that supports transparency, making it ideal for graphics and logos. JPG uses lossy compression, producing much smaller files suited for photographs and web images where transparency is not needed.",
          },
        },
      ],
    },
  ],
};

export default function PngToJpgPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            PNG to JPG
          </div>
          <h1 className="tool-page-title">Free PNG to JPG Converter Online</h1>
          <p className="tool-page-description">
            Convert PNG images to JPG format instantly in your browser. Adjust
            quality, handle transparency with a white background — download your
            JPG in seconds.
          </p>
        </div>

        <PngToJpgClient />
      </div>
    </div>
  );
}
