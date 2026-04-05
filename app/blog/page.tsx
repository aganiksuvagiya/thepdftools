import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & Tutorials for Image & PDF Tools",
  description:
    "Learn how to compress images, convert formats, merge PDFs, and more. Free tips, guides, and tutorials for everyday image and PDF tasks.",
  alternates: {
    canonical: "https://thepdftools.site/blog",
  },
  openGraph: {
    title: "Blog — Tips, Guides & Tutorials | thepdftools",
    description:
      "Learn how to compress images, convert formats, merge PDFs, and more. Free tips, guides, and tutorials.",
    url: "https://thepdftools.site/blog",
  },
};

const posts = [
  {
    slug: "how-to-compress-images-for-web",
    title: "How to Compress Images for Web Without Losing Quality",
    excerpt:
      "Learn the best practices for compressing JPG, PNG, and WebP images to improve page speed and Core Web Vitals scores without sacrificing visual quality.",
    date: "2026-04-01",
    readTime: "5 min read",
    tags: ["Image Compression", "Web Performance"],
  },
  {
    slug: "jpg-vs-png-vs-webp-which-format",
    title: "JPG vs PNG vs WebP — Which Image Format Should You Use?",
    excerpt:
      "A complete guide to choosing the right image format. Understand the differences between JPG, PNG, and WebP for photography, graphics, and web use.",
    date: "2026-03-28",
    readTime: "7 min read",
    tags: ["Image Formats", "Web Development"],
  },
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online for Free — Step by Step Guide",
    excerpt:
      "Combine multiple PDF documents into one file without installing software. Learn how to merge contracts, invoices, and reports securely in your browser.",
    date: "2026-03-25",
    readTime: "4 min read",
    tags: ["PDF Tools", "Productivity"],
  },
  {
    slug: "remove-image-background-with-ai",
    title: "How to Remove Image Backgrounds with AI — Free Online Tool",
    excerpt:
      "Remove backgrounds from product photos, headshots, and logos instantly using AI. No Photoshop needed — works directly in your browser for free.",
    date: "2026-03-22",
    readTime: "4 min read",
    tags: ["AI Tools", "Image Editing"],
  },
  {
    slug: "optimize-images-for-seo",
    title: "Image Optimization for SEO — Complete Guide for 2026",
    excerpt:
      "Boost your search rankings with properly optimized images. Learn about compression, alt text, lazy loading, next-gen formats, and Core Web Vitals.",
    date: "2026-03-18",
    readTime: "8 min read",
    tags: ["SEO", "Web Performance"],
  },
  {
    slug: "convert-word-to-pdf-free",
    title: "How to Convert Word Documents to PDF for Free Online",
    excerpt:
      "Convert DOC and DOCX files to PDF format without Microsoft Office. Keep formatting intact and share universally readable documents.",
    date: "2026-03-15",
    readTime: "3 min read",
    tags: ["PDF Tools", "Document Conversion"],
  },
];

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "thepdftools Blog",
    url: "https://thepdftools.site/blog",
    description:
      "Tips, guides, and tutorials for image compression, PDF editing, format conversion, and web optimization.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://thepdftools.site/blog/${post.slug}`,
      author: {
        "@type": "Organization",
        name: "thepdftools",
      },
    })),
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Tips, guides, and tutorials to help you get the most out of your
            images and PDFs.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-200"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
