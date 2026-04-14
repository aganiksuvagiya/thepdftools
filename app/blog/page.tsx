import type { Metadata } from "next";
import Link from "next/link";
import { growthBlogPosts } from "@/lib/seo-growth";

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
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
};

const posts = [
  ...growthBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
  })),
  {
    slug: "add-watermark-to-image-online-free",
    title: "How to Add Watermark to Image Online Free - No Upload",
    excerpt:
      "Add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, and no extra watermark from us.",
    date: "2026-04-14",
    readTime: "5 min read",
    tags: ["Image Editing", "Watermark"],
  },
  {
    slug: "compress-pdf-for-email-online",
    title: "How to Compress PDF for Email Online Free",
    excerpt:
      "Reduce PDF file size for Gmail, Outlook, portals, and forms. Free PDF compression with no upload, no signup, and no watermark.",
    date: "2026-04-14",
    readTime: "5 min read",
    tags: ["PDF Tools", "Compression"],
  },
  {
    slug: "convert-ppt-to-pdf-online-free",
    title: "How to Convert PPT to PDF Online Free - No Signup",
    excerpt:
      "Convert PowerPoint PPTX presentations to PDF online for free. No upload, no signup, and no watermark.",
    date: "2026-04-14",
    readTime: "4 min read",
    tags: ["PDF Conversion", "PowerPoint"],
  },
  {
    slug: "convert-heic-to-jpg-free",
    title: "How to Convert HEIC to JPG on Any Device — Free & No Upload",
    excerpt:
      "Learn how to convert iPhone HEIC photos to JPG format for free. Works on Windows, Mac, and mobile — no file uploads, everything runs in your browser.",
    date: "2026-04-07",
    readTime: "6 min read",
    tags: ["Image Conversion", "HEIC to JPG"],
  },
  {
    slug: "convert-pdf-to-excel-free",
    title: "How to Convert PDF to Excel Online — Extract Tables from PDF",
    excerpt:
      "Extract tables and data from PDF files into Excel spreadsheets for free. No upload required — convert PDF to XLSX instantly in your browser.",
    date: "2026-04-07",
    readTime: "5 min read",
    tags: ["PDF Tools", "Data Extraction"],
  },
  {
    slug: "convert-video-to-gif-free",
    title: "How to Convert Video to GIF Online — Free MP4 to GIF Converter",
    excerpt:
      "Convert MP4, WebM, and MOV videos to animated GIFs for free. Customize FPS, size, and duration — no upload, runs in your browser.",
    date: "2026-04-07",
    readTime: "5 min read",
    tags: ["Video Tools", "GIF"],
  },
  {
    slug: "free-invoice-generator-freelancers",
    title: "Free Invoice Generator for Freelancers & Small Business",
    excerpt:
      "Create professional PDF invoices for free online. Add items, taxes, discounts, and download instantly — no signup, no watermarks.",
    date: "2026-04-07",
    readTime: "6 min read",
    tags: ["Business", "Invoicing"],
  },
  {
    slug: "compress-pdf-files-free",
    title: "How to Compress PDF Files Online — Reduce PDF Size for Free",
    excerpt:
      "Reduce PDF file size for free without losing quality. Compress PDFs for email, sharing, and storage — everything runs in your browser.",
    date: "2026-04-07",
    readTime: "5 min read",
    tags: ["PDF Tools", "Compression"],
  },
  {
    slug: "best-free-online-tools-for-students-2026",
    title: "15 Best Free Online Tools Every Student Needs in 2026",
    excerpt:
      "Discover the best free online tools for students worldwide — compress images, merge PDFs, convert files, generate QR codes, and more. No signup, works on any device.",
    date: "2026-04-07",
    readTime: "12 min read",
    tags: ["Productivity", "Students"],
  },
  {
    slug: "best-free-pdf-tools-india",
    title: "Best Free PDF Tools in India 2026 – No Signup Required",
    excerpt:
      "Free PDF and image tools for Indian students, businesses, and professionals. Works on Jio network, mobile friendly, no signup required.",
    date: "2026-04-05",
    readTime: "10 min read",
    tags: ["PDF Tools", "India"],
  },
  {
    slug: "free-image-tools-for-designers-uk",
    title: "10 Free Image Tools Every UK Designer Needs in 2026",
    excerpt:
      "The ultimate list of free online image tools for UK designers. Compress, crop, resize, remove backgrounds, and convert formats without Photoshop.",
    date: "2026-04-04",
    readTime: "9 min read",
    tags: ["Image Tools", "Design"],
  },
  {
    slug: "free-online-tools-small-business",
    title: "Free Online Tools for Small Businesses – Save Money in 2026",
    excerpt:
      "Stop paying for Adobe and Microsoft subscriptions. Free online tools for PDFs, images, QR codes, and more — built for small businesses.",
    date: "2026-04-03",
    readTime: "10 min read",
    tags: ["Business", "Productivity"],
  },
  {
    slug: "compress-images-for-website-speed",
    title: "How to Compress Images for Faster Website Speed – Complete Guide",
    excerpt:
      "The definitive guide to image compression for web performance. Covers formats, compression ratios, Core Web Vitals, lazy loading, and CDN optimization.",
    date: "2026-04-02",
    readTime: "12 min read",
    tags: ["Web Performance", "Image Compression"],
  },
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
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                Tips &amp; Tutorials
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Blog
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Guides &amp; Tutorials
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Learn how to compress images, convert formats, merge PDFs, and optimize for the web. Free tips and step-by-step guides.
              </p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
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
                    className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{post.readTime}</span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors group-hover:text-brand-700">
                Read more
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
