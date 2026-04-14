import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGrowthBlogPost,
  growthBlogPosts,
  SITE_URL,
} from "@/lib/seo-growth";

type PageProps = {
  params: { slug: string };
};

const toolLinkClass =
  "font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800";

export function generateStaticParams() {
  return growthBlogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getGrowthBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: [
      post.primaryKeyword,
      ...post.tags,
      "free pdf tools no signup",
      "no upload required",
      "thepdftools",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: `${post.date}T00:00:00Z`,
      authors: ["thepdftools"],
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
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
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default function GrowthBlogPostPage({ params }: PageProps) {
  const post = getGrowthBlogPost(params.slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        datePublished: `${post.date}T00:00:00Z`,
        dateModified: "2026-04-14T00:00:00Z",
        image: `${SITE_URL}/opengraph-image`,
        author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "thepdftools",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        wordCount: 1250,
        keywords: [post.primaryKeyword, ...post.tags],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <Link
                href="/blog"
                className="text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
              >
                Back to blog
              </Link>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {post.description} This guide is written for the long-tail
                keyword <strong>{post.primaryKeyword}</strong> and links
                directly to the tool when you are ready to act.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>No Upload Required</span>
              </div>
              <Link
                href={post.toolHref}
                className="mt-7 inline-flex rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
              >
                {post.toolCta}
              </Link>
            </header>

            {post.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-8 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                FAQ
              </h2>
              <div className="mt-5 divide-y divide-slate-100">
                {post.faq.map((item) => (
                  <details key={item.q} className="py-5">
                    <summary className="cursor-pointer list-none text-[15px] font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              Try Tool Now
            </p>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
              Finish the task in your browser
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              No upload required where browser processing is supported. No
              signup. Instant processing for everyday PDF and image workflows.
            </p>
            <Link
              href={post.toolHref}
              className="mt-5 inline-flex w-full justify-center rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              {post.toolCta}
            </Link>
            <div className="mt-6 space-y-2 text-sm">
              <Link href="/pdf-compress" className={toolLinkClass}>
                Compress PDF
              </Link>
              <br />
              <Link href="/image-compressor" className={toolLinkClass}>
                Image Compressor
              </Link>
              <br />
              <Link href="/jpg-to-png" className={toolLinkClass}>
                JPG to PNG
              </Link>
              <br />
              <Link href="/smallpdf-vs-thepdftools" className={toolLinkClass}>
                Smallpdf vs thepdftools
              </Link>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
}
