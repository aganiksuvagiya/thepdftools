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
      </div>
    </div>
  );
}
