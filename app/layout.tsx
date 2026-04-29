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
  title: {
    default: "thepdftools — Free Online Image & PDF Tools | No Upload Required",
    template: "%s | thepdftools",
  },
  description:
    "Free browser-based tools to compress images, convert files, edit visuals, and work with PDFs. Fast, private, and built to run locally in your browser.",
  keywords: [
    "free online tools",
    "online pdf tools",
    "online image tools",
    "image compressor online",
    "background remover online",
    "pdf merge online",
    "pdf split online",
    "pdf to image converter",
    "word to pdf online",
    "png to jpg converter",
    "jpg to png converter",
    "image cropper online",
    "image resizer online",
    "image watermark online",
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
    title: "thepdftools — Free Online Image & PDF Tools",
    description:
      "Compress, convert, crop, resize, watermark, and merge files in a fast browser-based workspace.",
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
    title: "thepdftools — Free Online Image & PDF Tools",
    description:
      "A cleaner, faster workspace for image tools, PDF tools, and useful browser-based utilities.",
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
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          "google-site-verification":
            process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1726872213486410"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="relative isolate overflow-x-clip">
          
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
