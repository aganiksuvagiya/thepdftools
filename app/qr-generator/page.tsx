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
      </div>
    </div>
  );
}
