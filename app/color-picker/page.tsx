import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ColorPickerClient = dynamic(() => import("./ColorPickerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Color Picker & Converter Online — HEX, RGB, HSL, CMYK",
  description:
    "Pick any color and instantly convert between HEX, RGB, HSL, and CMYK formats. Copy values with one click. Free, no signup — runs in your browser.",
  keywords: [
    "color picker",
    "color converter",
    "hex to rgb",
    "rgb to hsl",
    "rgb to cmyk",
    "free color picker",
  ],
  openGraph: {
    title: "Free Color Picker & Converter Online — HEX, RGB, HSL, CMYK",
    description:
      "Pick any color and instantly convert between HEX, RGB, HSL, and CMYK formats. Copy values with one click. Free, no signup — runs in your browser.",
    url: "https://thepdftools.site/color-picker",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/color-picker",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Color Picker & Converter",
    url: "https://thepdftools.site/color-picker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Pick any color and convert between HEX, RGB, HSL, and CMYK instantly. Free online color tool.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What color formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEX, RGB, HSL, and CMYK. You can type in any format and see all others update in real time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I copy color values?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Each color value has a copy button next to it for one-click copying to your clipboard.",
        },
      },
    ],
  },
];

export default function ColorPickerPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
            </svg>
            Color Picker
          </div>
          <h1 className="tool-page-title">Free Color Picker &amp; Converter Online</h1>
          <p className="tool-page-description">
            Pick any color and instantly see its HEX, RGB, HSL, and CMYK values.
            Edit any format to update all others. Copy with one click — no
            signup, runs in your browser.
          </p>
        </div>

        <ColorPickerClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Pick and Convert Colors</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Use the color picker or enter a value in any format (HEX, RGB, HSL, or CMYK).</li>
              <li>View all color format conversions update instantly in real time.</li>
              <li>Click the copy button next to any value to copy it to your clipboard.</li>
              <li>Use the color history to revisit previously selected colors.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Color Picker?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">HEX, RGB, HSL & CMYK</h3><p className="mt-1 text-sm text-gray-500">Convert between all major color formats instantly. Perfect for designers, developers, and anyone working with colors across platforms.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">One-Click Copy</h3><p className="mt-1 text-sm text-gray-500">Copy any color value to your clipboard with a single click. No need to manually select and copy text.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Color History</h3><p className="mt-1 text-sm text-gray-500">Your recently picked colors are saved automatically so you can easily revisit and compare colors during your workflow.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Random Color Generator</h3><p className="mt-1 text-sm text-gray-500">Generate random colors for inspiration or quick prototyping. Great for exploring new palettes and design ideas.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What color formats are supported?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">The color picker supports HEX, RGB, HSL, and CMYK formats. You can type in any format and all other values update automatically in real time.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How do I copy a color value?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Each color value has a copy button next to it. Click it once and the value is copied to your clipboard, ready to paste into your CSS, design tool, or code editor.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does the tool keep a color history?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, your recently selected colors are saved in a visual history panel so you can quickly go back to any color you picked during your session.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">How accurate are the color conversions?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">The conversions use standard color math algorithms and are highly accurate. Note that CMYK values are approximations since exact CMYK depends on the specific print profile being used.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Use our free online color picker to convert between HEX, RGB, HSL, and CMYK color formats instantly. Whether you need to convert hex to rgb, rgb to hex, or find the perfect HSL value, this color converter handles it all in your browser. Save colors to your history, generate random colors for inspiration, and copy any value with one click. No signup required — ideal for web designers, developers, and digital artists.</p>
        </div>
      </div>
    </div>
  );
}
