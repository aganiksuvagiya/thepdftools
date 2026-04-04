import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

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
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                Word Counter
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Count words
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  characters and more
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Paste or type your text to instantly see word count, character count,
                sentences, paragraphs, reading time, and more.
              </p>
            </div>

            <div className="mt-8">
              <WordCounterClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for writers", text: "Track word count, character count, and reading time for your content." },
                { title: "Best for SEO", text: "Monitor content length for optimal search engine rankings." },
                { title: "Best for students", text: "Ensure essays and assignments meet word count requirements." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Paste your text to get instant word and character counts.</li>
              <li>Use reading time estimates for blog post planning.</li>
              <li>Check character limits for social media posts.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Blog writing", "Academic papers", "Social media posts", "SEO content"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Count Words and Characters</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Type or paste your text into the editor area.</li>
              <li>View real-time statistics including words, characters, sentences, and paragraphs.</li>
              <li>Check estimated reading and speaking times for your content.</li>
              <li>See the top most frequently used words in your text.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Word Counter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Real-Time Counting</h3>
                <p className="mt-1 text-sm text-slate-500">All stats update instantly as you type or edit. No need to click a button — see word count, character count, and more in real time.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Reading &amp; Speaking Time</h3>
                <p className="mt-1 text-sm text-slate-500">Get estimated reading time (based on 225 WPM) and speaking time (based on 150 WPM) to plan articles, presentations, and speeches.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Top Words Analysis</h3>
                <p className="mt-1 text-sm text-slate-500">Discover the most frequently used words in your text to improve writing quality, check keyword density, and avoid repetition.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Comprehensive Stats</h3>
                <p className="mt-1 text-sm text-slate-500">Track words, characters (with and without spaces), sentences, paragraphs, and average word length all in one view.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How are words counted?", a: "Words are counted by splitting text on whitespace boundaries. Hyphenated words count as a single word, and numbers are included in the word count. Empty lines and extra spaces are ignored." },
                { q: "How is reading time calculated?", a: "Reading time is estimated at approximately 225 words per minute, which is the average adult reading speed. Speaking time uses a slower rate of about 150 words per minute for presentations." },
                { q: "How are sentences detected?", a: "Sentences are detected by counting terminal punctuation marks including periods, question marks, and exclamation points. Abbreviations and decimal numbers may occasionally affect the count." },
                { q: "Is there a maximum text length?", a: "There is no hard limit. The tool runs entirely in your browser, so it can handle very large texts. Performance may vary with extremely large documents depending on your device capabilities." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Our free word counter and character counter tool lets you count words online instantly as you type. Track character count, sentence count, paragraph count, reading time, and speaking time in real time. Whether you are writing an essay, blog post, or social media caption, this word count tool helps you stay within limits and analyze your text. Everything runs in your browser — no data is uploaded or stored.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Writing Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/lorem-ipsum" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Lorem Ipsum Generator</Link>
              <Link href="/json-formatter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JSON Formatter</Link>
              <Link href="/base64" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Base64 Encoder/Decoder</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
