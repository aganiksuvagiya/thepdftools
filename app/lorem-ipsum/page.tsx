import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Lorem Ipsum Generator
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Generate lorem ipsum
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  placeholder text
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Generate placeholder text instantly. Choose paragraphs, sentences,
                or words — copy with one click.
              </p>
            </div>

            <div className="mt-8">
              <LoremIpsumClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for mockups", text: "Generate realistic placeholder text for wireframes and design mockups." },
                { title: "Best for development", text: "Fill content areas with dummy text during frontend development." },
                { title: "Best for presentations", text: "Create sample content for prototypes and client presentations." },
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
              <li>Choose between paragraphs, sentences, or words.</li>
              <li>Adjust the amount of text to match your layout needs.</li>
              <li>Copy the generated text with one click.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Design mockups", "Web prototypes", "Print layouts", "Content planning"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Generate Lorem Ipsum Text</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Choose the type of output: paragraphs, sentences, or words.</li>
              <li>Set the number of units you want to generate.</li>
              <li>Click Generate to create your placeholder text instantly.</li>
              <li>Copy the generated text to your clipboard with one click.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Lorem Ipsum Generator?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Paragraphs, Sentences &amp; Words</h3>
                <p className="mt-1 text-sm text-slate-500">Generate placeholder text in three different modes to match exactly what your design or layout requires.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Classic Start Option</h3>
                <p className="mt-1 text-sm text-slate-500">Optionally start with the traditional &quot;Lorem ipsum dolor sit amet...&quot; opening for a recognizable placeholder feel.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Customizable Count</h3>
                <p className="mt-1 text-sm text-slate-500">Control exactly how much text you need by setting the number of paragraphs, sentences, or words to generate.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">One-Click Copy</h3>
                <p className="mt-1 text-sm text-slate-500">Copy all generated text to your clipboard instantly with a single click, ready to paste into your design or document.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is dummy text used by the printing and typesetting industry since the 1500s. It provides a natural-looking distribution of letters and words, making it ideal for previewing layouts without distracting with readable content." },
                { q: "Why use Lorem Ipsum instead of real text?", a: "Lorem Ipsum lets designers and developers focus on visual layout and typography without readers being distracted by meaningful content. It provides realistic text flow while keeping attention on the design itself." },
                { q: "Can I customize the amount of text generated?", a: "Yes, you can choose between paragraphs, sentences, or words, and set the exact count you need. This gives you precise control over the amount of placeholder text for your project." },
                { q: "Is the generated text real Latin?", a: "Lorem Ipsum is derived from a work by Cicero written in 45 BC, but it has been altered and scrambled over the centuries. The text resembles Latin but is not grammatically correct or meaningful in modern Latin." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free lorem ipsum generator creates placeholder text and dummy text for your designs, mockups, and prototypes. Generate lorem ipsum paragraphs, sentences, or individual words with customizable counts and the classic start option. Perfect for web designers, developers, and content creators who need quick dummy text generator output. No signup required — generate placeholder text instantly in your browser.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Content Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/word-counter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word Counter</Link>
              <Link href="/json-formatter" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JSON Formatter</Link>
              <Link href="/base64" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Base64 Encoder/Decoder</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Code Generator</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
