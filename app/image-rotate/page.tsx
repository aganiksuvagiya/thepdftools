import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageRotateClient = dynamic(() => import("./ImageRotateClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Rotate & Flip Tool Online — Rotate Images Instantly",
  description:
    "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically. No upload, no signup — runs in your browser.",
  keywords: [
    "image rotate",
    "rotate image online",
    "flip image",
    "mirror image",
    "rotate jpg",
    "rotate png",
    "free image rotate",
    "image flip tool",
  ],
  openGraph: {
    title: "Free Image Rotate & Flip Tool Online — Rotate Images Instantly",
    description:
      "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-rotate",
    images: [
      {
        url: "https://thepdftools.site/og-image-rotate.png",
        width: 1200,
        height: 630,
        alt: "Free Image Rotate & Flip Tool - thepdftools.site",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-rotate",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Image Rotate & Flip Tool",
    url: "https://thepdftools.site/image-rotate",
    description:
      "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I rotate by a custom angle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! In addition to quick 90° and 180° presets, you can enter any custom angle from 0° to 360° using the angle slider or input field. The preview updates in real time so you can fine-tune the rotation.",
        },
      },
      {
        "@type": "Question",
        name: "Does rotating reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rotations at 90°, 180°, and 270° are lossless. Custom angle rotations use high-quality canvas rendering to preserve as much detail as possible. You can also choose your output format and quality level.",
        },
      },
      {
        "@type": "Question",
        name: "Can I flip and rotate at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. You can combine any rotation with a horizontal or vertical flip. All transformations are applied together and previewed in real time before you download.",
        },
      },
      {
        "@type": "Question",
        name: "What formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool supports JPG, PNG, and WebP images. You can rotate or flip any of these formats and download the result in the same format or convert to another supported format.",
        },
      },
    ],
  },
];

export default function ImageRotatePage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Image Rotate &amp; Flip
          </div>
          <h1 className="tool-page-title">Free Image Rotate &amp; Flip Online</h1>
          <p className="tool-page-description">
            Rotate JPG, PNG, and WebP images by any angle, flip horizontally or
            vertically — all instantly in your browser. No upload, no server,
            completely private.
          </p>
        </div>

        <ImageRotateClient />
      </div>
    </div>
  );
}
