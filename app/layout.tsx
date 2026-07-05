import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";

const SidePopupAd = dynamic(() => import("@/components/SidePopupAd"), {
  ssr: false,
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
      "Free PDF Tools Online — Merge, Compress, Convert & Edit PDF | thepdftools",
    template: "%s | thepdftools",
  },
  description:
    "Free online PDF tools to merge PDF, compress PDF, convert PDF to Word, split PDF, and edit PDF files. No upload, no signup — runs privately in your browser. Also includes free image conversion tools.",
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
    title: "thepdftools — Free PDF Tools Online | Merge, Compress, Convert PDF",
    description:
      "Free online PDF tools: merge PDF, compress PDF, convert PDF to Word, split PDF, edit PDF, and more. Plus image tools — all free, private, no upload required.",
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
    title: "thepdftools — Free PDF Tools Online | Merge, Compress, Convert PDF",
    description:
      "Free online PDF tools: merge PDF, compress PDF, convert PDF to Word, split PDF, and edit PDF files. Plus image tools — all free, no upload required.",
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
  const shouldLoadAds =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_SHOW_ADS === "true";
  const shouldLoadAnalytics =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--surface)] text-slate-900 antialiased">
        <ThirdPartyScripts enableAnalytics={shouldLoadAnalytics} />
        {shouldLoadAds ? (
          <>
            <Script
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1726872213486410"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        ) : null}
        <div className="relative isolate overflow-x-clip">
          <Navbar />
          <main>{children}</main>
          <Footer />
          {shouldLoadAds ? <SidePopupAd /> : null}
        </div>
      </body>
    </html>
  );
}
