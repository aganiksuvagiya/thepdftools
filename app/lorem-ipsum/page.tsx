import type { Metadata } from "next";
import dynamic from "next/dynamic";

const LoremIpsumClient = dynamic(() => import("./LoremIpsumClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator Online",
  description:
    "Generate lorem ipsum placeholder text instantly. Choose paragraphs, sentences, or words. Copy with one click — no signup, no ads.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text generator",
    "lorem ipsum online",
    "free lorem ipsum",
    "text generator",
  ],
  openGraph: {
    title: "Free Lorem Ipsum Generator Online",
    description:
      "Generate lorem ipsum placeholder text instantly. Choose paragraphs, sentences, or words. Copy with one click.",
    url: "https://thepdftools.site/lorem-ipsum",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/lorem-ipsum",
  },
};

export default function LoremIpsumPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Lorem Ipsum Generator",
        url: "https://thepdftools.site/lorem-ipsum",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Generate lorem ipsum placeholder text instantly. Choose paragraphs, sentences, or words.",
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Lorem Ipsum
          </div>
          <h1 className="tool-page-title">Free Lorem Ipsum Generator Online</h1>
          <p className="tool-page-description">
            Generate placeholder text instantly. Choose paragraphs, sentences,
            or words — copy with one click.
          </p>
        </div>

        <LoremIpsumClient />
      </div>
    </div>
  );
}
