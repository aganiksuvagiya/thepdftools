import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageUpscalerClient = dynamic(() => import("./ImageUpscalerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free AI Image Upscaler Online — Enhance Image Quality",
  description:
    "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation. No upload, no signup — runs in your browser.",
  keywords: [
    "image upscaler",
    "upscale image online",
    "enhance image quality",
    "increase image resolution",
    "ai image upscaler",
    "free image upscaler",
  ],
  openGraph: {
    title: "Free AI Image Upscaler Online — Enhance Image Quality",
    description:
      "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-upscaler",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-upscaler",
  },
};

export default function ImageUpscalerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free AI Image Upscaler",
        url: "https://thepdftools.site/image-upscaler",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the image upscaler work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The upscaler uses high-quality canvas interpolation to increase image resolution by 2x, 3x, or 4x while maintaining smooth edges and details.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can upscale any of these formats and download the enhanced result instantly.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so it depends on your device's memory. Most images up to 50MB work smoothly.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
            AI Upscaler
          </div>
          <h1 className="tool-page-title">Free AI Image Upscaler Online</h1>
          <p className="tool-page-description">
            Upscale and enhance your images by 2x, 3x, or 4x instantly in your
            browser. High-quality interpolation for crisp, clear results — no
            upload, no server, completely private.
          </p>
        </div>

        <ImageUpscalerClient />
      </div>
    </div>
  );
}
