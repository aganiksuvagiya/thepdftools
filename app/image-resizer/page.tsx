import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageResizerClient = dynamic(() => import("./ImageResizerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Resizer Online — Resize Images to Any Size",
  description:
    "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly. No upload, no signup — runs in your browser.",
  keywords: [
    "image resizer",
    "resize image online",
    "image dimensions",
    "resize jpg",
    "resize png",
    "free image resizer",
  ],
  openGraph: {
    title: "Free Image Resizer Online — Resize Images to Any Size",
    description:
      "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.com/image-resizer",
    images: [
      {
        url: "https://thepdftools.com/og-image-resizer.png",
        width: 1200,
        height: 630,
        alt: "Free Image Resizer Tool - thepdftools.com",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.com/image-resizer",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Image Resizer Tool",
    url: "https://thepdftools.com/image-resizer",
    description:
      "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly.",
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
        name: "Can I resize multiple images at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can drop or select multiple images at once and apply the same dimensions to all of them. Each resized image can be downloaded individually or as a batch.",
        },
      },
      {
        "@type": "Question",
        name: "Will resizing reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enlarging images beyond their original size may reduce sharpness, but downscaling preserves quality. The tool uses high-quality canvas rendering with smooth interpolation to give you the best possible result.",
        },
      },
      {
        "@type": "Question",
        name: "What preset sizes are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common presets include social media sizes (Instagram, Facebook, Twitter), standard web dimensions, and custom sizes. You can also enter any exact pixel width and height you need.",
        },
      },
      {
        "@type": "Question",
        name: "Can I change the output format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can resize your image and download it as JPG, PNG, or WebP regardless of the original format. This lets you resize and convert in a single step.",
        },
      },
    ],
  },
];

export default function ImageResizerPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            Image Resizer
          </div>
          <h1 className="tool-page-title">Free Image Resizer Online</h1>
          <p className="tool-page-description">
            Resize JPG, PNG, and WebP images to any dimension instantly in your
            browser. Lock aspect ratio, batch resize, and download — no upload,
            no server, completely private.
          </p>
        </div>

        <ImageResizerClient />
      </div>
    </div>
  );
}
