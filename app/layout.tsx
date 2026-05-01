import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const SITE_URL = "https://thepdftools.site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "thepdftools",
  manifest: "/manifest.webmanifest",
  title: {
    default:
      "thepdftools — Free Online PDF & Image Tools | Compress, Convert, Edit",
    template: "%s | thepdftools",
  },
  description:
    "Free browser-based PDF and image tools to compress, convert, merge, sign, crop, OCR, and edit files online with no upload required. Fast, private, and built to run locally in your browser.",
  keywords: [
    "free online tools",
    "online pdf tools",
    "online image tools",
    "free pdf tools no upload",
    "browser based pdf tools",
    "free pdf tools no signup",
    "free online pdf converter",
    "free online image converter",
    "private pdf tools online",
    "client side image tools",
    "free document tools online",
    "no upload pdf editor",
    "no upload image editor",
    "image compressor online",
    "compress image online free",
    "reduce image size online",
    "background remover online",
    "remove background online free",
    "pdf merge online",
    "pdf split online",
    "compress pdf online free",
    "merge pdf online free",
    "split pdf online free",
    "pdf redaction online",
    "pdf compare online",
    "searchable pdf ocr",
    "ai invoice extractor",
    "pdf sign online free",
    "pdf watermark online",
    "pdf protect online",
    "pdf rotate online",
    "pdf page numbers online",
    "pdf to ppt converter",
    "ppt to pdf online free",
    "pdf to excel converter",
    "pdf to word converter",
    "word to pdf converter",
    "excel to pdf converter",
    "html to pdf converter",
    "image to pdf online",
    "text to pdf online",
    "screenshot to pdf online",
    "scanned pdf to text",
    "searchable scanned pdf",
    "pdf to image converter",
    "word to pdf online",
    "png to jpg converter",
    "jpg to png converter",
    "svg to png converter",
    "heic to jpg converter",
    "video to gif converter",
    "image to webp converter",
    "image cropper online",
    "image resizer online",
    "image watermark online",
    "ai image upscaler",
    "image rotate and flip online",
    "qr code generator free",
    "json formatter online",
    "csv to json converter",
    "base64 encoder decoder",
    "word counter online",
    "lorem ipsum generator",
    "invoice generator free",
    "browser based tools",
    "client side pdf tools",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  authors: [{ name: "thepdftools", url: SITE_URL }],
  creator: "thepdftools",
  publisher: "thepdftools",
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "thepdftools",
    title: "thepdftools — Free Online PDF & Image Tools",
    description:
      "Compress, convert, crop, resize, watermark, merge, sign, redact, and OCR files in a fast browser-based workspace.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "thepdftools — Free Online Image & PDF Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "thepdftools — Free Online PDF & Image Tools",
    description:
      "A cleaner, faster workspace for PDF tools, image tools, and useful browser-based utilities.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "msapplication-TileColor": "#0f766e",
    "apple-mobile-web-app-title": "thepdftools",
    "google-adsense-account": "ca-pub-1726872213486410",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldLoadAds = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={sora.variable}>
      <body className="min-h-screen bg-[var(--surface)] text-slate-900 antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NWTNKWJ1JF"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NWTNKWJ1JF');
          `}
        </Script>
        {shouldLoadAds ? (
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1726872213486410"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <div className="relative isolate overflow-x-clip">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
