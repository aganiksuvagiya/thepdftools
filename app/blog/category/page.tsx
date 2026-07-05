import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_URL, blogCategories, getCategoryUrl, getPostsByCategory } from "@/lib/blog";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BLOG_URL}/category`;
  const metadata = buildPageMetadata({
    title: "Blog Categories",
    description: "Browse blog categories for PDF guides, image workflows, SEO tips, business resources, and productivity tutorials.",
    url,
    keywords: ["blog categories", "PDF blog", "image tools blog", "SEO blog", "productivity guides"],
    imageAlt: "thepdftools blog categories",
  });

  return {
    ...metadata,
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "x-default": url,
      },
    },
  };
}

export default function BlogCategoryIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "CollectionPage",
        name: "Blog Categories",
        url: `${BLOG_URL}/category`,
        description: "Browse blog category archives for PDF guides, image workflows, SEO tips, business resources, and productivity tutorials.",
        author: {
          "@type": "Organization",
          name: "thepdftools Editorial Team",
        },
        dateModified: "2026-07-05",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://thepdftools.site/blog" },
          { "@type": "ListItem", position: 3, name: "Blog Categories", item: `${BLOG_URL}/category` },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <Link href="/blog" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
            Back to blog
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Browse Blog Categories</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime="2026-07-05">Updated July 5, 2026</time>
          </div>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            Every article is grouped into a crawlable category archive so readers and search engines can reach related content quickly.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryUrl(category.name)}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-white"
              >
                <p className="text-lg font-bold text-slate-900">{category.name}</p>
                <p className="mt-2 text-sm text-slate-500">{getPostsByCategory(category.slug).length} articles</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">References</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                  Google Search Central: Helpful, reliable, people-first content
                </a>
              </li>
              <li>
                <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                  Google Search Central: Build and submit a sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
