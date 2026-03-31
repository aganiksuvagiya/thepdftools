import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BackgroundRemoverClient = dynamic(() => import("./BackgroundRemoverClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free AI Background Remover Online — Remove Image Background Instantly",
  description:
    "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
  keywords: [
    "background remover",
    "remove background online",
    "ai background removal",
    "transparent background",
    "remove image background free",
  ],
  openGraph: {
    title: "Free AI Background Remover Online — Remove Image Background Instantly",
    description:
      "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
    url: "https://thepdftools.site/background-remover",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/background-remover",
  },
};

export default function BackgroundRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free AI Background Remover",
        url: "https://thepdftools.site/background-remover",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does AI background removal work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our tool uses a machine learning model that runs directly in your browser. It analyzes the image to detect the foreground subject and separates it from the background, producing a transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "What image quality can I expect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The AI produces clean, high-quality cutouts with smooth edges. Results are best with clear subjects and good contrast between foreground and background. The output is a full-resolution transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "Is it free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free with no watermarks, no signup required, and no usage limits. The AI model runs in your browser so there are no server costs.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work with complex backgrounds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the AI model handles complex and cluttered backgrounds well. It works best with photos of people, products, and animals, even against busy or multicolored backgrounds.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            AI Background Remover
          </div>
          <h1 className="tool-page-title">
            Free AI Background Remover Online
          </h1>
          <p className="tool-page-description">
            Remove backgrounds from photos instantly using AI. Perfect for
            product images, profile pictures, and logos. Download as
            transparent PNG.
          </p>
        </div>

        <BackgroundRemoverClient />
      </div>
    </div>
  );
}
