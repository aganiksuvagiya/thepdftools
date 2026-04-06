import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Color Picker", "item": "https://thepdftools.site/color-picker" },
      ],
    },
  ],
};

export default function ColorPickerPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
                </svg>
                Color Picker
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Pick any color
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  in every format
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Pick any color and instantly see its HEX, RGB, HSL, and CMYK values.
                Edit any format to update all others. Copy with one click — no
                signup, runs in your browser.
              </p>
            </div>

            <div className="mt-8">
              <ColorPickerClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for design", text: "Get exact color values in HEX, RGB, and HSL for your design projects." },
                { title: "Best for development", text: "Copy color codes instantly for use in CSS, Tailwind, and design tools." },
                { title: "Best for accessibility", text: "Preview colors and ensure they work well in your UI designs." },
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
              <li>Click the color wheel to select your desired color.</li>
              <li>Copy HEX values for CSS and RGB for design tools.</li>
              <li>Use HSL for easier color adjustments and variations.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Web design", "CSS styling", "Brand guidelines", "UI development"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Pick and Convert Colors</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Use the color picker or enter a value in any format (HEX, RGB, HSL, or CMYK).</li>
              <li>View all color format conversions update instantly in real time.</li>
              <li>Click the copy button next to any value to copy it to your clipboard.</li>
              <li>Use the color history to revisit previously selected colors.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Color Picker?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">HEX, RGB, HSL &amp; CMYK</h3>
                <p className="mt-1 text-sm text-slate-500">Convert between all major color formats instantly. Perfect for designers, developers, and anyone working with colors across platforms.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">One-Click Copy</h3>
                <p className="mt-1 text-sm text-slate-500">Copy any color value to your clipboard with a single click. No need to manually select and copy text.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Color History</h3>
                <p className="mt-1 text-sm text-slate-500">Your recently picked colors are saved automatically so you can easily revisit and compare colors during your workflow.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Random Color Generator</h3>
                <p className="mt-1 text-sm text-slate-500">Generate random colors for inspiration or quick prototyping. Great for exploring new palettes and design ideas.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What color formats are supported?", a: "The color picker supports HEX, RGB, HSL, and CMYK formats. You can type in any format and all other values update automatically in real time." },
                { q: "How do I copy a color value?", a: "Each color value has a copy button next to it. Click it once and the value is copied to your clipboard, ready to paste into your CSS, design tool, or code editor." },
                { q: "Does the tool keep a color history?", a: "Yes, your recently selected colors are saved in a visual history panel so you can quickly go back to any color you picked during your session." },
                { q: "How accurate are the color conversions?", a: "The conversions use standard color math algorithms and are highly accurate. Note that CMYK values are approximations since exact CMYK depends on the specific print profile being used." },
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
            <p className="text-[15px] leading-8 text-slate-500">Use our free online color picker to convert between HEX, RGB, HSL, and CMYK color formats instantly. Whether you need to convert hex to rgb, rgb to hex, or find the perfect HSL value, this color converter handles it all in your browser. Save colors to your history, generate random colors for inspiration, and copy any value with one click. No signup required — ideal for web designers, developers, and digital artists.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Design Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Code Generator</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Background Remover</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
