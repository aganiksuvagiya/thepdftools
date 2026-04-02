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

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Generate Lorem Ipsum Text</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Choose the type of output: paragraphs, sentences, or words.</li>
              <li>Set the number of units you want to generate.</li>
              <li>Click Generate to create your placeholder text instantly.</li>
              <li>Copy the generated text to your clipboard with one click.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Lorem Ipsum Generator?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Paragraphs, Sentences & Words</h3><p className="mt-1 text-sm text-gray-500">Generate placeholder text in three different modes to match exactly what your design or layout requires.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Classic Start Option</h3><p className="mt-1 text-sm text-gray-500">Optionally start with the traditional &quot;Lorem ipsum dolor sit amet...&quot; opening for a recognizable placeholder feel.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Customizable Count</h3><p className="mt-1 text-sm text-gray-500">Control exactly how much text you need by setting the number of paragraphs, sentences, or words to generate.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">One-Click Copy</h3><p className="mt-1 text-sm text-gray-500">Copy all generated text to your clipboard instantly with a single click, ready to paste into your design or document.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What is Lorem Ipsum?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Lorem Ipsum is dummy text used by the printing and typesetting industry since the 1500s. It provides a natural-looking distribution of letters and words, making it ideal for previewing layouts without distracting with readable content.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Why use Lorem Ipsum instead of real text?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Lorem Ipsum lets designers and developers focus on visual layout and typography without readers being distracted by meaningful content. It provides realistic text flow while keeping attention on the design itself.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I customize the amount of text generated?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, you can choose between paragraphs, sentences, or words, and set the exact count you need. This gives you precise control over the amount of placeholder text for your project.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is the generated text real Latin?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Lorem Ipsum is derived from a work by Cicero written in 45 BC, but it has been altered and scrambled over the centuries. The text resembles Latin but is not grammatically correct or meaningful in modern Latin.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free lorem ipsum generator creates placeholder text and dummy text for your designs, mockups, and prototypes. Generate lorem ipsum paragraphs, sentences, or individual words with customizable counts and the classic start option. Perfect for web designers, developers, and content creators who need quick dummy text generator output. No signup required — generate placeholder text instantly in your browser.</p>
        </div>
      </div>
    </div>
  );
}
