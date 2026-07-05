import type { Metadata } from "next";
import {
  BLOG_URL,
  SITE_URL,
  type BlogFaq,
  type BlogPostEntry,
  getBlogPost,
  getBlogPostUrl,
} from "@/lib/blog";

const SITE_NAME = "thepdftools";
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export function buildBlogMetadata(slug: string): Metadata {
  const post = getRequiredBlogPost(slug);
  const url = getBlogPostUrl(slug);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    category: post.category,
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
      type: "article",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: toIso(post.publishedAt),
      modifiedTime: toIso(post.updatedAt),
      authors: [SITE_NAME],
      tags: post.tags,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [OG_IMAGE],
      creator: "@thepdftools",
    },
  };
}

export function buildBlogPostSchema(post: BlogPostEntry) {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getBlogPostUrl(post.slug),
    datePublished: toIso(post.publishedAt),
    dateModified: toIso(post.updatedAt),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getBlogPostUrl(post.slug),
    },
    articleSection: post.category,
    keywords: post.keywords,
    image: [OG_IMAGE],
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(post: BlogPostEntry) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
      { "@type": "ListItem", position: 3, name: post.category, item: `${BLOG_URL}/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` },
      { "@type": "ListItem", position: 4, name: post.title, item: getBlogPostUrl(post.slug) },
    ],
  };
}

export function buildFaqSchema(faq: BlogFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    inLanguage: "en-US",
  };
}

function getRequiredBlogPost(slug: string) {
  const post = getBlogPost(slug);
  if (!post) {
    throw new Error(`Unknown blog slug: ${slug}`);
  }
  return post;
}

function toIso(date: string) {
  return `${date}T00:00:00Z`;
}
