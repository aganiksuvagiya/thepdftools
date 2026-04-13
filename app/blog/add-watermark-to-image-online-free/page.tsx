import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/add-watermark-to-image-online-free`;

export const metadata: Metadata = {
  title: "How to Add Watermark to Image Online Free - No Upload",
  description:
    "Learn how to add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, no watermark from us. Step-by-step guide included.",
  keywords: [
    "add watermark to image online free",
    "watermark image online",
    "add text watermark to photo",
    "watermark jpg online free",
    "watermark png online",
    "image watermark no upload",
    "photo watermark no signup",
  ],
  openGraph: {
    title: "How to Add Watermark to Image Online Free - No Upload",
    description:
      "Add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, no watermark from us.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-14T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Add watermark to image online free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add Watermark to Image Online Free - No Upload",
    description: "Add text watermarks to photos online for free. No upload, no signup.",
  },
  alternates: { canonical: POST_URL },
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Add Watermark to Image Online Free - No Upload",
      description:
        "Learn how to add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, no watermark from us.",
      url: POST_URL,
      datePublished: "2026-04-14T00:00:00Z",
      dateModified: "2026-04-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      articleSection: "Image Editing",
      keywords: ["add watermark to image online free", "watermark jpg online", "photo watermark no upload"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "Add Watermark to Image Online", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I add a watermark to an image online for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can add a text watermark to JPG, PNG, and WebP images for free with the Image Watermark tool.",
          },
        },
        {
          "@type": "Question",
          name: "Are my photos uploaded while adding a watermark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The watermark tool runs in your browser, so your image stays on your device.",
          },
        },
      ],
    },
  ],
};

export default function AddWatermarkToImageOnlineFree() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          &larr; Back to Blog
        </Link>

        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How to Add Watermark to Image Online Free
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
            <time dateTime="2026-04-14">April 14, 2026</time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>5 min read</span>
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-8 text-slate-600">
            <p>
              If you share photos online, a watermark helps protect your work and keep your brand visible. This guide shows you how to add a watermark to an image online for free using JPG, PNG, or WebP files.
            </p>
            <p>
              The fastest option is the <Link href="/image-watermark" className={toolLink}>free Image Watermark tool</Link>. It runs in your browser, so there is no upload, no signup, and no extra watermark from us.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">How to Add a Text Watermark</h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>Open the <Link href="/image-watermark" className={toolLink}>Image Watermark tool</Link>.</li>
              <li>Upload your JPG, PNG, or WebP image.</li>
              <li>Type your name, brand, website URL, or copyright text.</li>
              <li>Adjust font size, color, opacity, and position.</li>
              <li>Download the watermarked image to your device.</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900">Best Watermark Settings</h2>
            <p>
              For portfolio images, use low opacity so the watermark is visible but not distracting. For client proofs or stock previews, use a repeated tiled watermark because it is harder to crop out.
            </p>
            <p>
              If your image is very large, compress it after watermarking with the <Link href="/image-compressor" className={toolLink}>Image Compressor</Link>. For web uploads, you can also convert it to <Link href="/image-to-webp" className={toolLink}>WebP</Link> to reduce file size.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">When Should You Watermark Photos?</h2>
            <p>
              Watermarks are useful for photography portfolios, product previews, social media posts, real estate photos, client proofs, and digital artwork. They are especially helpful when you want to share a preview before sending the final unmarked image.
            </p>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Try it now</h2>
              <p className="mt-2">
                Add a watermark to your image with the <Link href="/image-watermark" className={toolLink}>free online Image Watermark tool</Link>. Your image stays in your browser.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
