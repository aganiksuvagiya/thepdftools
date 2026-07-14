import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BLOG_URL,
  blogCategories,
  getCategoryUrl,
  getPostsByCategory,
} from "@/lib/blog";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

export const revalidate = 86400;

type Props = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  return blogCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = blogCategories.find((item) => item.slug === params.category);
  if (!category) return {};
  const url = getCategoryUrl(category.name);
  const metadata = buildPageMetadata({
    title: `${category.name} Articles`,
    description: `Browse ${category.name.toLowerCase()} articles on thepdftools, including step-by-step guides, comparisons, and tool workflows.`,
    url,
    keywords: [category.name, `${category.name} blog`, `${category.name} guides`, "thepdftools blog"],
    imageAlt: `${category.name} articles on thepdftools`,
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

export default function BlogCategoryPage({ params }: Props) {
  const lastUpdated = getLastUpdated("app/blog/category/[category]/page.tsx");
  const category = blogCategories.find((item) => item.slug === params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(params.category);
  const categoryUrl = getCategoryUrl(category.name);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "CollectionPage",
        name: `${category.name} Articles`,
        url: categoryUrl,
        description: `Browse ${category.name.toLowerCase()} articles on thepdftools.`,
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
          { "@type": "ListItem", position: 3, name: category.name, item: categoryUrl },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${BLOG_URL}/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/blog" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              Back to blog
            </Link>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              {posts.length} articles
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{category.name} Articles</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            Explore guides, how-tos, and related resources in the {category.name.toLowerCase()} category.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`${BLOG_URL}/${post.slug}`}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-white"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{post.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                <p className="mt-4 text-xs text-slate-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">More Archives</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {blogCategories
                .filter((item) => item.slug !== category.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={getCategoryUrl(item.name)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:text-brand-700"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">References</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://developers.google.com/search/docs/crawling-indexing/internal-links" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                  Google Search Central: Internal linking best practices
                </a>
              </li>
              <li>
                <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                  Google Search Central: Introduction to structured data
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
