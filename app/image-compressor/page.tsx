import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorClient = dynamic(() => import("./ImageCompressorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Compressor Online — Reduce Image Size Without Quality Loss",
  description:
    "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality. No upload, no signup — runs in your browser.",
  keywords: [
    "image compressor",
    "compress image online",
    "reduce image size",
    "jpg compressor",
    "png compressor",
    "free image compression",
  ],
  openGraph: {
    title: "Free Image Compressor Online — Reduce Image Size Without Quality Loss",
    description:
      "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-compressor",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-compressor",
  },
};

export default function ImageCompressorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Image Compressor",
        url: "https://thepdftools.site/image-compressor",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to compress images here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your images never leave your browser. All compression is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can compress any of these formats and download the optimized result instantly.",
            },
          },
          {
            "@type": "Question",
            name: "How much can I reduce file size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Up to 90% reduction depending on the original image and quality settings. You can adjust the quality slider to find the perfect balance between file size and visual quality.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            Image Compressor
          </div>
          <h1 className="tool-page-title">Free Image Compressor Online</h1>
          <p className="tool-page-description">
            Compress JPEG, PNG, and WebP images instantly in your browser.
            Reduce file size by up to 90% — no upload, no server, completely
            private.
          </p>
        </div>

        <ImageCompressorClient />
      </div>
    </div>
  );
}
