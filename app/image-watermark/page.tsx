import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageWatermarkClient = dynamic(() => import("./ImageWatermarkClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Watermark Tool Online — Add Watermarks Instantly",
  description:
    "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "image watermark",
    "add watermark online",
    "watermark tool",
    "text watermark",
    "watermark image free",
    "photo watermark",
  ],
  openGraph: {
    title: "Free Image Watermark Tool Online — Add Watermarks Instantly",
    description:
      "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling. Runs entirely in your browser.",
    url: "https://thepdftools.com/image-watermark",
    images: [
      {
        url: "https://thepdftools.com/og-image-watermark.png",
        width: 1200,
        height: 630,
        alt: "Image Watermark Tool - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.com/image-watermark",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image Watermark Tool Online",
      "url": "https://thepdftools.com/image-watermark",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I add watermarks in bulk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently the tool processes one image at a time. You can quickly watermark multiple images by repeating the process — each takes just seconds since everything runs locally in your browser.",
          },
        },
        {
          "@type": "Question",
          "name": "What watermark styles are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can customize the watermark text, font size, color, opacity, and position. You can also enable tiling to repeat the watermark diagonally across the entire image for maximum protection.",
          },
        },
        {
          "@type": "Question",
          "name": "Does watermarking reduce image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The watermark is composited onto the image using the Canvas API at full resolution. The underlying image quality remains unchanged — only the watermark overlay is added.",
          },
        },
        {
          "@type": "Question",
          "name": "Is the watermark permanent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Once you download the watermarked image, the text is permanently embedded into the image pixels. It cannot be removed without visibly damaging the image, which is what makes watermarks effective for copyright protection.",
          },
        },
      ],
    },
  ],
};

export default function ImageWatermarkPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.365.364.028.667.307.667.672v3.225l3.15-2.363a1.342 1.342 0 01.622-.26c1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3.176a48.394 48.394 0 00-5.293.337C5.123 3.746 4 5.14 4 6.741v6.009z" />
            </svg>
            Image Watermark
          </div>
          <h1 className="tool-page-title">Free Image Watermark Tool Online</h1>
          <p className="tool-page-description">
            Add custom text watermarks to your images instantly in your browser.
            Control font size, opacity, color, position, and tiling — no upload,
            no server, completely private.
          </p>
        </div>

        <ImageWatermarkClient />
      </div>
    </div>
  );
}
