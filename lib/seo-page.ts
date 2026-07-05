import type { Metadata } from "next";

const SITE_NAME = "thepdftools";
const DEFAULT_IMAGE = "https://thepdftools.site/opengraph-image";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
  imageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  url,
  keywords = [],
  openGraphType = "website",
  imageAlt,
}: BuildPageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: "thepdftools Editorial Team", url: "https://thepdftools.site" }],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "x-default": url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: openGraphType,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_IMAGE],
      creator: "@thepdftools",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: "https://thepdftools.site",
    logo: {
      "@type": "ImageObject",
      url: "https://thepdftools.site/icon.svg",
    },
    publishingPrinciples: "https://thepdftools.site/privacy",
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: "https://thepdftools.site",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://thepdftools.site",
    },
  };
}
