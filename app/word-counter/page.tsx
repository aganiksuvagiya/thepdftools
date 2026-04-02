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

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Count Words and Characters</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Type or paste your text into the editor area.</li>
              <li>View real-time statistics including words, characters, sentences, and paragraphs.</li>
              <li>Check estimated reading and speaking times for your content.</li>
              <li>See the top most frequently used words in your text.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Word Counter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Real-Time Counting</h3><p className="mt-1 text-sm text-gray-500">All stats update instantly as you type or edit. No need to click a button — see word count, character count, and more in real time.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Reading & Speaking Time</h3><p className="mt-1 text-sm text-gray-500">Get estimated reading time (based on 225 WPM) and speaking time (based on 150 WPM) to plan articles, presentations, and speeches.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Top Words Analysis</h3><p className="mt-1 text-sm text-gray-500">Discover the most frequently used words in your text to improve writing quality, check keyword density, and avoid repetition.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Comprehensive Stats</h3><p className="mt-1 text-sm text-gray-500">Track words, characters (with and without spaces), sentences, paragraphs, and average word length all in one view.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How are words counted?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Words are counted by splitting text on whitespace boundaries. Hyphenated words count as a single word, and numbers are included in the word count. Empty lines and extra spaces are ignored.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How is reading time calculated?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Reading time is estimated at approximately 225 words per minute, which is the average adult reading speed. Speaking time uses a slower rate of about 150 words per minute for presentations.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How are sentences detected?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Sentences are detected by counting terminal punctuation marks including periods, question marks, and exclamation points. Abbreviations and decimal numbers may occasionally affect the count.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is there a maximum text length?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">There is no hard limit. The tool runs entirely in your browser, so it can handle very large texts. Performance may vary with extremely large documents depending on your device capabilities.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free word counter and character counter tool lets you count words online instantly as you type. Track character count, sentence count, paragraph count, reading time, and speaking time in real time. Whether you are writing an essay, blog post, or social media caption, this word count tool helps you stay within limits and analyze your text. Everything runs in your browser — no data is uploaded or stored.</p>
        </div>
      </div>
    </div>
  );
}
