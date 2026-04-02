import type { Metadata } from "next";
import dynamic from "next/dynamic";

const QrGeneratorClient = dynamic(() => import("./QrGeneratorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free QR Code Generator Online — Create QR Codes Instantly",
  description:
    "Generate QR codes for any text or URL for free online. Customize size, colors, and download as PNG. No signup — runs in your browser.",
  keywords: [
    "qr code generator",
    "create qr code online",
    "free qr code",
    "qr code maker",
    "url to qr code",
    "text to qr code",
  ],
  openGraph: {
    title: "Free QR Code Generator Online — Create QR Codes Instantly",
    description:
      "Generate QR codes for any text or URL for free online. Customize size, colors, and download as PNG. No signup — runs in your browser.",
    url: "https://thepdftools.site/qr-generator",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/qr-generator",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
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
];

export default function QrGeneratorPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 14.625a1.125 1.125 0 011.125-1.125h.375m0 0h3a.75.75 0 01.75.75v.375m0 0v3a.75.75 0 01-.75.75h-.375m0 0h-3a.75.75 0 01-.75-.75v-.375m0 0v-3a.75.75 0 01.75-.75h.375" />
            </svg>
            QR Generator
          </div>
          <h1 className="tool-page-title">Free QR Code Generator Online</h1>
          <p className="tool-page-description">
            Generate QR codes for any text or URL instantly. Customize size and
            colors, then download or copy — no upload, no server, completely
            private.
          </p>
        </div>

        <QrGeneratorClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Create a QR Code</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Enter the URL or text you want to encode into the input field.</li>
              <li>Customize the foreground and background colors to match your brand or design.</li>
              <li>Choose your preferred size for the QR code output.</li>
              <li>Click the download button to save your QR code as a PNG image.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our QR Code Generator?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Custom Colors</h3><p className="mt-1 text-sm text-gray-500">Pick any foreground and background color to create QR codes that match your brand identity or design requirements.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Multiple Sizes</h3><p className="mt-1 text-sm text-gray-500">Generate QR codes in various sizes to fit any use case, from business cards to large banners and posters.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Instant Preview</h3><p className="mt-1 text-sm text-gray-500">See your QR code update in real time as you type or change settings. No waiting or page reloads needed.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Download as Image</h3><p className="mt-1 text-sm text-gray-500">Save your finished QR code as a high-quality PNG image ready for print, web, or any digital platform.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What types of data can I encode in a QR code?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">You can encode any text, URLs, email addresses, phone numbers, Wi-Fi credentials, or plain messages. The QR code reader will interpret the data based on its format.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I customize the colors of my QR code?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, you can set both the foreground (dark modules) and background colors using the built-in color pickers. Ensure enough contrast between the two colors for reliable scanning.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What size options are available?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">You can adjust the QR code size to suit your needs. Larger sizes are better for print materials, while smaller sizes work well for digital use and web pages.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I use generated QR codes for commercial purposes?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Absolutely. All QR codes you generate are yours to use freely for personal or commercial projects, including marketing materials, product packaging, and business cards.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free QR code generator lets you create QR codes online in seconds. Whether you need a qr code maker for URLs, text, or contact info, this tool delivers instant results with custom colors and multiple size options. No signup, no watermarks — generate unlimited QR codes directly in your browser. Every QR code is created client-side, so your data never leaves your device.</p>
        </div>
      </div>
    </div>
  );
}
