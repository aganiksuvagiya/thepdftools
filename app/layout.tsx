import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://thepdftools.site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "thepdftools",
  title: {
    default: "thepdftools — Free Online Image & PDF Tools | No Upload Required",
    template: "%s | thepdftools — Free Online Tools",
  },
  description:
    "10+ free browser-based tools: compress images, convert JPG/PNG/WebP, merge PDFs, crop, resize, rotate, watermark & remove backgrounds. 100% private — files never leave your device.",
  keywords: [
    "free online tools",
    "online pdf tools",
    "online image tools",
    "free image tools",
    "free pdf tools",
    "image compressor online",
    "compress image online free",
    "compress jpg online",
    "compress png online",
    "jpg to png converter free",
    "png to jpg converter",
    "image to webp converter",
    "image cropper online",
    "image watermark tool",
    "image rotate flip online",
    "image resizer free",
    "ai image upscaler",
    "image upscaler online",
    "background remover ai",
    "remove background online free",
    "pdf merge online",
    "merge pdf free",
    "split pdf online",
    "pdf to image converter",
    "pdf to word converter",
    "screenshot to pdf",
    "ppt to pdf converter",
    "qr code generator free",
    "json formatter online",
    "word counter online",
    "base64 encoder decoder",
    "color picker from image",
    "lorem ipsum generator",
    "compress image without losing quality",
    "convert image format online",
    "browser based image tools",
    "browser based pdf tools",
    "no upload image editor",
    "no upload pdf tools",
    "private image tools",
    "private pdf tools",
    "client side image processing",
    "client side pdf processing",
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
    title: "thepdftools — 10+ Free Online Image & PDF Tools",
    description:
      "Compress, convert, crop, resize, rotate, watermark images & merge PDFs — all free, all private. No upload, no signup. Runs 100% in your browser.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "thepdftools — Free Online Image & PDF Tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "thepdftools — 10+ Free Online Image & PDF Tools",
    description:
      "Compress, convert, crop, resize, rotate, watermark images & merge PDFs — free & private in your browser.",
    images: [`${SITE_URL}/og-image.png`],
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
    "msapplication-TileColor": "#4f46e5",
    "apple-mobile-web-app-title": "thepdftools",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
