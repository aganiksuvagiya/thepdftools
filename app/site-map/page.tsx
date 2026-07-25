import type { Metadata } from "next";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import { blogCategories, blogPostsSorted, getCategoryUrl } from "@/lib/blog";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const PAGE_URL = "https://thepdftools.site/site-map";

const pageGroups = [
  {
    title: "Core Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/pdf-tools", label: "PDF Tools" },
      { href: "/image-tools", label: "Image Tools" },
      { href: "/developer-tools", label: "Developer Tools" },
      { href: "/generators", label: "Generators" },
      { href: "/document-tools", label: "Document Tools" },
      { href: "/utility-tools", label: "Utility Tools" },
      { href: "/blog", label: "Blog" },
      { href: "/blog/category", label: "Blog Categories" },
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  {
    title: "PDF Tools",
    links: [
      { href: "/pdf-compress", label: "PDF Compress" },
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-split", label: "PDF Split" },
      { href: "/pdf-editor", label: "PDF Editor" },
      { href: "/pdf-sign", label: "PDF Sign" },
      { href: "/pdf-protect", label: "PDF Protect" },
      { href: "/pdf-unlock", label: "PDF Unlock" },
      { href: "/pdf-ocr", label: "PDF OCR" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/pdf-to-excel", label: "PDF to Excel" },
      { href: "/pdf-to-ppt", label: "PDF to PPT" },
      { href: "/pdf-to-jpg", label: "PDF to JPG" },
      { href: "/pdf-to-image", label: "PDF to Image" },
      { href: "/word-to-pdf", label: "Word to PDF" },
      { href: "/excel-to-pdf", label: "Excel to PDF" },
      { href: "/ppt-to-pdf", label: "PPT to PDF" },
      { href: "/image-to-pdf", label: "Image to PDF" },
      { href: "/jpg-to-pdf", label: "JPG to PDF" },
      { href: "/text-to-pdf", label: "Text to PDF" },
      { href: "/html-to-pdf", label: "HTML to PDF" },
      { href: "/markdown-to-pdf", label: "Markdown to PDF" },
      { href: "/png-to-pdf", label: "PNG to PDF" },
      { href: "/scan-to-pdf", label: "Scan to PDF" },
      { href: "/pdf-converter", label: "PDF Converter" },
      { href: "/pdf-organize-pages", label: "Organize PDF Pages" },
      { href: "/rearrange-pdf-pages", label: "Rearrange PDF Pages" },
      { href: "/delete-pdf-pages", label: "Delete PDF Pages" },
      { href: "/extract-pdf-pages", label: "Extract PDF Pages" },
      { href: "/repair-pdf", label: "Repair PDF" },
      { href: "/flatten-pdf", label: "Flatten PDF" },
      { href: "/pdf-metadata-editor", label: "PDF Metadata Editor" },
    ],
  },
  {
    title: "Image Tools",
    links: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/image-cropper", label: "Image Cropper" },
      { href: "/image-rotate", label: "Image Rotate" },
      { href: "/image-watermark", label: "Image Watermark" },
      { href: "/image-upscaler", label: "Image Upscaler" },
      { href: "/background-remover", label: "Background Remover" },
      { href: "/image-to-webp", label: "Image to WebP" },
      { href: "/jpg-to-png", label: "JPG to PNG" },
      { href: "/jpg-to-png-no-upload", label: "JPG to PNG No Upload" },
      { href: "/jpg-to-png-for-logos", label: "JPG to PNG for Logos" },
      { href: "/png-to-jpg", label: "PNG to JPG" },
      { href: "/png-to-jpg-for-photos", label: "PNG to JPG for Photos" },
      { href: "/png-to-jpg-white-background", label: "PNG to JPG White Background" },
      { href: "/heic-to-jpg", label: "HEIC to JPG" },
      { href: "/svg-to-png", label: "SVG to PNG" },
      { href: "/video-to-gif", label: "Video to GIF" },
    ],
  },
  {
    title: "Developer & Utility Tools",
    links: [
      { href: "/json-formatter", label: "JSON Formatter" },
      { href: "/csv-to-json", label: "CSV to JSON" },
      { href: "/base64", label: "Base64" },
      { href: "/url-encoder", label: "URL Encoder" },
      { href: "/regex-tester", label: "Regex Tester" },
      { href: "/timestamp-converter", label: "Timestamp Converter" },
      { href: "/tailwind-colors", label: "Tailwind Colors" },
      { href: "/color-picker", label: "Color Picker" },
      { href: "/color-gradient", label: "Color Gradient" },
      { href: "/word-counter", label: "Word Counter" },
      { href: "/text-case-converter", label: "Text Case Converter" },
      { href: "/lorem-ipsum", label: "Lorem Ipsum Generator" },
      { href: "/password-generator", label: "Password Generator" },
      { href: "/favicon-generator", label: "Favicon Generator" },
      { href: "/qr-generator", label: "QR Generator" },
      { href: "/barcode-generator", label: "Barcode Generator" },
      { href: "/invoice-generator", label: "Invoice Generator" },
      { href: "/resume-builder", label: "Resume Builder" },
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "HTML Sitemap",
  description: "Browse every important page on thepdftools from one crawlable HTML sitemap, including tool hubs, utility pages, categories, and blog posts.",
  url: PAGE_URL,
  keywords: ["HTML sitemap", "thepdftools sitemap", "tool directory", "blog archive", "crawlable sitemap"],
  imageAlt: "thepdftools HTML sitemap",
});

export default function SiteMapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "CollectionPage",
        name: "HTML Sitemap",
        url: PAGE_URL,
        description: "Crawlable directory of tool pages, blog archives, categories, and core resources on thepdftools.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "HTML Sitemap", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <Link href="/" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
            Back to homepage
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">HTML Sitemap</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            This page links the main tool clusters, current blog archives, category pages, and live articles so users and crawlers can reach every important destination directly.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {pageGroups.map((group) => (
            <section key={group.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{group.title}</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Blog Categories</h2>
              <p className="mt-1 text-sm text-slate-500">Every category archive links back to its full article cluster.</p>
            </div>
            <Link href="/blog/category" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              Browse categories
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryUrl(category.name)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">All Blog Posts</h2>
              <p className="mt-1 text-sm text-slate-500">Direct links to the current live article set.</p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              Open blog archive
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {blogPostsSorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{post.category}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <SeoReferences
            links={[
              { href: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview", label: "Google Search Central: Sitemap overview" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a", label: "MDN: Crawlable HTML linking basics" },
              { href: "https://schema.org/CollectionPage", label: "Schema.org: CollectionPage reference" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
