import type { Metadata } from "next";
import dynamic from "next/dynamic";

const JpgToPngClient = dynamic(() => import("./JpgToPngClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free JPG to PNG Converter Online — Convert JPEG to PNG Instantly",
  description:
    "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser using HTML Canvas. Download your PNG instantly.",
  keywords: [
    "jpg to png",
    "jpeg to png converter",
    "convert jpg to png online",
    "free image converter",
    "jpg png converter",
  ],
  openGraph: {
    title: "Free JPG to PNG Converter Online — Convert JPEG to PNG Instantly",
    description:
      "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser using HTML Canvas. Download your PNG instantly.",
    url: "https://thepdftools.com/jpg-to-png",
    images: [{ url: "https://thepdftools.com/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.com/jpg-to-png",
  },
};

export default function JpgToPngPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free JPG to PNG Converter",
        url: "https://thepdftools.com/jpg-to-png",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why convert JPG to PNG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PNG supports transparency (alpha channel), is lossless with no compression artifacts, and is better for screenshots, logos, and images with text. Converting from JPG to PNG preserves quality for further editing.",
            },
          },
          {
            "@type": "Question",
            name: "Does conversion lose quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The conversion from JPG to PNG is lossless — the PNG output preserves every pixel of the original JPG. PNG is a lossless format, so no additional quality is lost during conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can convert multiple JPG files to PNG one after another. Each conversion happens instantly in your browser with no waiting for server processing.",
            },
          },
          {
            "@type": "Question",
            name: "Is my data safe?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. Your images never leave your device. The conversion uses the HTML Canvas API directly in your browser — no files are uploaded to any server.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            JPG to PNG
          </div>
          <h1 className="tool-page-title">Free JPG to PNG Converter Online</h1>
          <p className="tool-page-description">
            Convert JPEG images to PNG format instantly in your browser. No
            server upload, no quality loss — download your PNG in seconds.
          </p>
        </div>

        <JpgToPngClient />
      </div>
    </div>
  );
}
