import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_URL, SITE_URL, blogCategories, blogPostsSorted, getCategoryUrl } from "@/lib/blog";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - Tips, Guides & Tutorials for Image & PDF Tools",
    description: "Learn how to compress images, convert formats, merge PDFs, improve website speed, and finish common document tasks with step-by-step guides.",
    keywords: [
      "thepdftools blog",
      "PDF tutorials",
      "image optimization guides",
      "blog for PDF tools",
      "file conversion tutorials",
      "SEO image guides",
    ],
    alternates: {
      canonical: BLOG_URL,
      languages: {
        "en-US": BLOG_URL,
        "x-default": BLOG_URL,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Blog - Tips, Guides & Tutorials | thepdftools",
      description: "Step-by-step tutorials for image compression, PDF workflows, file conversion, and search-friendly web optimization.",
      url: BLOG_URL,
      type: "website",
      siteName: "thepdftools",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "thepdftools blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Tips, Guides & Tutorials | thepdftools",
      description: "Step-by-step tutorials for image compression, PDF workflows, file conversion, and web optimization.",
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "thepdftools Blog",
        url: BLOG_URL,
        description: "Tips, guides, and tutorials for image compression, PDF editing, file conversion, and technical SEO improvements.",
        blogPost: blogPostsSorted.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: `${post.publishedAt}T00:00:00Z`,
          dateModified: `${post.updatedAt}T00:00:00Z`,
          url: `${BLOG_URL}/${post.slug}`,
          articleSection: post.category,
          author: {
            "@type": "Organization",
            name: "thepdftools",
          },
        })),
      },
      {
        "@type": "Organization",
        name: "thepdftools",
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        url: SITE_URL,
        name: "thepdftools",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
        ],
      },
    ],
  };

  const featuredPosts = blogPostsSorted.slice(0, 6);

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Blog</span>
        </nav>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                Guides that connect directly to tools
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Blog
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Guides, Tutorials & Resources
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Browse crawlable archives for PDF workflows, image optimization, conversions, business templates, and practical search-friendly content.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Category Archives</h2>
              <p className="mt-1 text-sm text-slate-500">Each archive groups related posts and creates more internal discovery paths.</p>
            </div>
            <Link href="/blog/category" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              View all categories
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryUrl(category.name)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">All Articles</h2>
              <p className="mt-1 text-sm text-slate-500">Every post stays reachable from the archive, category pages, and related links on each article.</p>
            </div>
            <Link href="/" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              Back to homepage
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {blogPostsSorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-white"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                    {post.category}
                  </span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                <p className="mt-4 text-xs text-slate-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">References</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                Google Search Central: Helpful, reliable, people-first content
              </a>
            </li>
            <li>
              <a href="https://developers.google.com/search/docs/appearance/structured-data/article" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
                Google Search Central: Article structured data guidance
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
