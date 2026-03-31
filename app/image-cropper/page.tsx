import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCropperClient = dynamic(() => import("./ImageCropperClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Cropper Online — Crop Images Instantly",
  description:
    "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly. No upload, no signup — runs in your browser.",
  keywords: [
    "image cropper",
    "crop image online",
    "crop photo",
    "crop jpg",
    "crop png",
    "free image cropper",
    "aspect ratio crop",
  ],
  openGraph: {
    title: "Free Image Cropper Online — Crop Images Instantly",
    description:
      "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly. Runs entirely in your browser.",
    url: "https://thepdftools.site/image-cropper",
    images: [
      {
        url: "https://thepdftools.site/og-image-cropper.png",
        width: 1200,
        height: 630,
        alt: "Image Cropper - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/image-cropper",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image Cropper Online",
      "url": "https://thepdftools.site/image-cropper",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What aspect ratios are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tool includes common presets such as 1:1 (square), 4:3, 16:9, 3:2, and free-form selection so you can crop to any custom region.",
          },
        },
        {
          "@type": "Question",
          "name": "Does cropping reduce image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Cropping simply removes the pixels outside the selected area. The remaining pixels retain their original quality with no recompression.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I crop transparent PNGs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The cropper preserves the alpha channel, so transparent areas in your PNG remain transparent after cropping.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a size limit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no fixed limit. Because the tool runs entirely in your browser, the maximum size depends on your device's available memory. Most images up to 50 MP work smoothly.",
          },
        },
      ],
    },
  ],
};

export default function ImageCropperPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-teal-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Image Cropper
          </div>
          <h1 className="tool-page-title">Free Image Cropper Online</h1>
          <p className="tool-page-description">
            Crop JPG, PNG, and WebP images to any region instantly in your
            browser. Choose preset aspect ratios or free-form selection — no
            upload, no server, completely private.
          </p>
        </div>

        <ImageCropperClient />
      </div>
    </div>
  );
}
