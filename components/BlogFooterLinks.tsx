import Link from "next/link";
import {
  BLOG_PATH,
  type BlogPostEntry,
  blogCategories,
  getBlogPost,
  getCategoryUrl,
  getLatestPosts,
  getPopularPosts,
  getPreviousAndNextPosts,
  getRelatedPosts,
} from "@/lib/blog";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/blog-seo";

type BlogFooterLinksProps = {
  slug: string;
  includeBreadcrumbSchema?: boolean;
  includeFaqSchema?: boolean;
};

function PostChip({ post }: { post: BlogPostEntry }) {
  return (
    <Link
      href={`${BLOG_PATH}/${post.slug}`}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:border-brand-300 hover:bg-white"
    >
      <p className="text-sm font-semibold text-slate-900">{post.title}</p>
      <p className="mt-1 text-xs text-slate-500">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}{" "}
        · {post.readTime}
      </p>
    </Link>
  );
}

export default function BlogFooterLinks({
  slug,
  includeBreadcrumbSchema = true,
  includeFaqSchema = true,
}: BlogFooterLinksProps) {
  const post = getBlogPost(slug);

  if (!post) return null;

  const relatedPosts = getRelatedPosts(slug, 3);
  const latestPosts = getLatestPosts(4).filter((item) => item.slug !== slug).slice(0, 3);
  const popularPosts = getPopularPosts(4).filter((item) => item.slug !== slug).slice(0, 3);
  const { previous, next } = getPreviousAndNextPosts(slug);
  const graph: Array<Record<string, unknown>> = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ];

  if (includeBreadcrumbSchema) {
    graph.push(buildBreadcrumbSchema(post));
  }

  if (includeFaqSchema && post.faq.length > 0) {
    graph.push(buildFaqSchema(post.faq));
  }

  return (
    <div className="mt-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
      />

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">About This Article</h2>
            <p className="mt-1 text-sm text-slate-500">Author, dates, reading time, references, and related resources for stronger context and trust signals.</p>
          </div>
          <Link href="/" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
            Visit homepage
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">thepdftools Editorial Team</p>
            <dl className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-900">Published</dt>
                <dd>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Updated</dt>
                <dd>{new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Reading time</dt>
                <dd>{post.readTime}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Category</dt>
                <dd>
                  <Link href={getCategoryUrl(post.category)} className="text-brand-600 transition-colors hover:text-brand-700">
                    {post.category}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">References</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {post.references.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} className="transition-colors hover:text-brand-700 hover:underline" rel="noopener noreferrer" target="_blank">
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {post.faq.length > 0 ? (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-5 space-y-4">
            {post.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Related Posts</h2>
          <div className="mt-4 grid gap-3">
            {relatedPosts.map((item) => (
              <PostChip key={item.slug} post={item} />
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Tool Links</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {tool.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">Browse categories</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={getCategoryUrl(category.name)}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:text-brand-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Latest Posts</h2>
          <div className="mt-4 grid gap-3">
            {latestPosts.map((item) => (
              <PostChip key={item.slug} post={item} />
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Popular Posts</h2>
          <div className="mt-4 grid gap-3">
            {popularPosts.map((item) => (
              <PostChip key={item.slug} post={item} />
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">More Paths to This Content</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Category archive</p>
              <Link href={getCategoryUrl(post.category)} className="mt-2 inline-block text-brand-600 transition-colors hover:text-brand-700">
                {post.category} articles
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Blog archive</p>
              <Link href={BLOG_PATH} className="mt-2 inline-block text-brand-600 transition-colors hover:text-brand-700">
                All blog posts
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Previous / Next article</p>
              <div className="mt-2 flex flex-col gap-2">
                {previous ? (
                  <Link href={`${BLOG_PATH}/${previous.slug}`} className="text-brand-600 transition-colors hover:text-brand-700">
                    Previous: {previous.title}
                  </Link>
                ) : null}
                {next ? (
                  <Link href={`${BLOG_PATH}/${next.slug}`} className="text-brand-600 transition-colors hover:text-brand-700">
                    Next: {next.title}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
