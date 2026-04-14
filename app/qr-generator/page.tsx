import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const QrGeneratorClient = dynamic(() => import("./QrGeneratorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "QR Generator Online Free No Upload",
  description:
    "Use QR Generator online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "qr code generator",
    "create qr code online",
    "free qr code",
    "qr code maker",
    "url to qr code",
    "text to qr code",
  ],
  openGraph: {
    title: "QR Generator Online Free No Upload",
    description:
    "Use QR Generator online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/qr-generator",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/qr-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free QR Code Generator",
      url: "https://thepdftools.site/qr-generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Generate QR codes for any text or URL for free online. Customize size, colors, and download instantly.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this QR code generator free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, it is 100% free. Generate unlimited QR codes with custom colors and sizes without any signup or payment.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customize the QR code colors?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can pick any foreground and background color using the built-in color pickers to match your brand or design.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "QR Generator", "item": "https://thepdftools.site/qr-generator" },
      ],
    },
  ],
};

export default function QrGeneratorPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 14.625a1.125 1.125 0 011.125-1.125h.375m0 0h3a.75.75 0 01.75.75v.375m0 0v3a.75.75 0 01-.75.75h-.375m0 0h-3a.75.75 0 01-.75-.75v-.375m0 0v-3a.75.75 0 01.75-.75h.375" />
                </svg>
                QR Code Generator
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Generate QR codes
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for any content
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Generate QR codes for any text or URL instantly. Customize size and
                colors, then download or copy — no upload, no server, completely
                private.
              </p>
            </div>

            <div className="mt-8">
              <QrGeneratorClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for marketing", text: "Create QR codes for URLs, contacts, and promotions in seconds." },
                { title: "Best for business", text: "Generate scannable codes for business cards, flyers, and packaging." },
                { title: "Best for privacy", text: "QR codes are generated entirely in your browser — no data sent anywhere." },
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
              <li>Use shorter URLs for cleaner, more scannable QR codes.</li>
              <li>Download as PNG for print or SVG for scalable use.</li>
              <li>Test your QR code with a phone camera before distributing.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Business cards", "Marketing materials", "Product packaging", "Event tickets"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Create a QR Code</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Enter the URL or text you want to encode into the input field.</li>
              <li>Customize the foreground and background colors to match your brand or design.</li>
              <li>Choose your preferred size for the QR code output.</li>
              <li>Click the download button to save your QR code as a PNG image.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our QR Code Generator?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Colors</h3>
                <p className="mt-1 text-sm text-slate-500">Pick any foreground and background color to create QR codes that match your brand identity or design requirements.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Sizes</h3>
                <p className="mt-1 text-sm text-slate-500">Generate QR codes in various sizes to fit any use case, from business cards to large banners and posters.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Instant Preview</h3>
                <p className="mt-1 text-sm text-slate-500">See your QR code update in real time as you type or change settings. No waiting or page reloads needed.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Download as Image</h3>
                <p className="mt-1 text-sm text-slate-500">Save your finished QR code as a high-quality PNG image ready for print, web, or any digital platform.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What types of data can I encode in a QR code?", a: "You can encode any text, URLs, email addresses, phone numbers, Wi-Fi credentials, or plain messages. The QR code reader will interpret the data based on its format." },
                { q: "Can I customize the colors of my QR code?", a: "Yes, you can set both the foreground (dark modules) and background colors using the built-in color pickers. Ensure enough contrast between the two colors for reliable scanning." },
                { q: "What size options are available?", a: "You can adjust the QR code size to suit your needs. Larger sizes are better for print materials, while smaller sizes work well for digital use and web pages." },
                { q: "Can I use generated QR codes for commercial purposes?", a: "Absolutely. All QR codes you generate are yours to use freely for personal or commercial projects, including marketing materials, product packaging, and business cards." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free QR code generator lets you create QR codes online in seconds. Whether you need a qr code maker for URLs, text, or contact info, this tool delivers instant results with custom colors and multiple size options. No signup, no watermarks — generate unlimited QR codes directly in your browser. Every QR code is created client-side, so your data never leaves your device.</p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Utility Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/color-picker" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Color Picker</Link>
              <Link href="/base64" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Base64 Encoder/Decoder</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="qr-generator" />
        </div>
      </div>
    </div>
  );
}
