import type { Metadata } from "next";
import dynamic from "next/dynamic";

const WordCounterClient = dynamic(() => import("./WordCounterClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Word & Character Counter Online",
  description:
    "Count words, characters, sentences, and paragraphs instantly. See reading and speaking time estimates. Free, no signup — runs in your browser.",
  keywords: [
    "word counter",
    "character counter",
    "word count online",
    "character count",
    "sentence counter",
    "reading time calculator",
  ],
  openGraph: {
    title: "Free Word & Character Counter Online",
    description:
      "Count words, characters, sentences, and paragraphs instantly. See reading and speaking time estimates. Free, no signup — runs in your browser.",
    url: "https://thepdftools.site/word-counter",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/word-counter",
  },
};

export default function WordCounterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Word & Character Counter",
    url: "https://thepdftools.site/word-counter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Count words, characters, sentences, and paragraphs instantly. See reading and speaking time estimates.",
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            Word Counter
          </div>
          <h1 className="tool-page-title">Free Word & Character Counter Online</h1>
          <p className="tool-page-description">
            Paste or type your text to instantly see word count, character count,
            sentences, paragraphs, reading time, and more.
          </p>
        </div>

        <WordCounterClient />
      </div>
    </div>
  );
}
