import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/how-to-compress-images-for-web`;

export const metadata: Metadata = {
  title: "How to Compress Images for Web Without Losing Quality",
  description:
    "Learn how to compress images for the web without sacrificing visual quality. Covers lossy vs lossless compression, ideal quality settings, WebP advantages, and a free browser-based tool.",
  keywords: [
    "compress images for web",
    "image compression without losing quality",
    "reduce image file size",
    "web performance optimization",
    "Core Web Vitals images",
    "lossy vs lossless compression",
    "WebP format",
    "free image compressor",
  ],
  openGraph: {
    title: "How to Compress Images for Web Without Losing Quality",
    description:
      "Learn how to compress images for the web without sacrificing visual quality. Covers lossy vs lossless, ideal settings, and a free browser-based tool.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-01T00:00:00Z",
    authors: ["thepdftools"],
    images: [
      {
        url: `${SITE_URL}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "How to Compress Images for Web Without Losing Quality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress Images for Web Without Losing Quality",
    description:
      "Learn how to compress images for the web without sacrificing visual quality. Free browser-based tool included.",
  },
  alternates: {
    canonical: POST_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Compress Images for Web Without Losing Quality",
  description:
    "Learn how to compress images for the web without sacrificing visual quality. Covers lossy vs lossless compression, ideal quality settings, WebP advantages, and a free browser-based tool.",
  url: POST_URL,
  datePublished: "2026-04-01T00:00:00Z",
  dateModified: "2026-04-01T00:00:00Z",
  author: {
    "@type": "Organization",
    name: "thepdftools",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "thepdftools",
    url: SITE_URL,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  wordCount: 1050,
  articleSection: "Image Compression",
  keywords: [
    "image compression",
    "web performance",
    "lossy compression",
    "lossless compression",
    "WebP",
  ],
};

export default function HowToCompressImagesForWeb() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Image Compression
          </span>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Web Performance
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          How to Compress Images for Web Without Losing Quality
        </h1>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
          <span>April 1, 2026</span>
          <span>&middot;</span>
          <span>5 min read</span>
        </div>

        {/* Content */}
        <article className="prose-custom mt-10 space-y-6">
          <p className="text-[15px] leading-8 text-slate-600">
            Images are the single heaviest asset on most websites. A handful of
            unoptimized photos can double your page weight, tank your Lighthouse
            score, and send visitors reaching for the back button. The good news?
            You can dramatically reduce file size while keeping images sharp enough
            that no one notices the difference. This guide walks you through
            everything you need to know about compressing images for the
            web&mdash;and introduces a free, browser-based tool that makes the
            process effortless.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-slate-900">
            Why Image Compression Matters
          </h2>
          <p className="text-[15px] leading-8 text-slate-600">
            Google&rsquo;s Core Web Vitals now directly influence search rankings.
            Largest Contentful Paint (LCP)&mdash;the metric that measures how fast
            the biggest visible element loads&mdash;is almost always an image. If
            your hero image weighs 3&nbsp;MB instead of 300&nbsp;KB, LCP suffers,
            and so does your ranking.
          </p>
          <p className="text-[15px] leading-8 text-slate-600">
            Beyond SEO, performance affects user experience. Studies show that a
            one-second delay in load time can reduce conversions by up to 7%.
            Mobile users on slower connections are hit hardest. Compressing images
            is one of the simplest, highest-impact optimizations you can make.
          </p>
          <p className="text-[15px] leading-8 text-slate-600">
            Bandwidth costs money, too. If you serve millions of page views,
            shaving 500&nbsp;KB per page adds up to terabytes of saved transfer
            every month. Image compression is not just a nice-to-have&mdash;it is
            essential for any site that cares about speed, cost, or SEO.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-slate-900">
            Types of Image Compression
          </h2>
          <h3 className="text-xl font-semibold text-slate-900">
            Lossy Compression
          </h3>
          <p className="text-[15px] leading-8 text-slate-600">
            Lossy compression permanently removes some image data to achieve
            smaller files. The algorithm discards information the human eye is
            least likely to notice&mdash;subtle color gradients, fine noise in
            shadows, and similar details. JPG is the most common lossy format. At
            moderate quality levels (70&ndash;85%), the visual difference is
            imperceptible for photographs, yet the file can be 60&ndash;80%
            smaller than the original.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Lossless Compression
          </h3>
          <p className="text-[15px] leading-8 text-slate-600">
            Lossless compression reduces file size without discarding any data.
            PNG uses lossless compression by default. It is ideal for graphics,
            logos, screenshots, and anything with sharp edges or text. The
            trade-off is that lossless files are larger than their lossy
            equivalents. For photographs, lossless formats are usually overkill.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-slate-900">
            Best Settings for Web Images
          </h2>
          <p className="text-[15px] leading-8 text-slate-600">
            Finding the sweet spot between quality and file size depends on the
            format and the content of the image. Here are the settings
            professionals rely on:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-[15px] leading-8 text-slate-600">
            <li>
              <strong>JPG quality 70&ndash;85%:</strong> This range delivers
              excellent visual fidelity with major size savings. Go lower (60%) for
              thumbnails; stay at 80&ndash;85% for hero images.
            </li>
            <li>
              <strong>PNG optimization:</strong> Run PNGs through a compression
              pass to strip unnecessary metadata and optimize the DEFLATE stream.
              This alone can save 20&ndash;40%.
            </li>
            <li>
              <strong>WebP at 75&ndash;80%:</strong> WebP produces files 25&ndash;35%
              smaller than JPG at the same perceived quality. It supports both
              lossy and lossless modes, plus transparency. Every modern browser
              supports it. If you have not switched to WebP yet, now is the time.
              You can convert any image with our{" "}
              <Link
                href="/image-to-webp"
                className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
              >
                Image to WebP converter
              </Link>
              .
            </li>
            <li>
              <strong>Resize before compressing:</strong> A 4000&times;3000 photo
              displayed at 800&times;600 wastes bandwidth. Use an{" "}
              <Link
                href="/image-resizer"
                className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
              >
                image resizer
              </Link>{" "}
              to match the display dimensions first, then compress.
            </li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-slate-900">
            Step-by-Step: Compress Images with Our Free Tool
          </h2>
          <p className="text-[15px] leading-8 text-slate-600">
            Our{" "}
            <Link
              href="/image-compressor"
              className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
            >
              free Image Compressor
            </Link>{" "}
            runs entirely in your browser&mdash;no files are uploaded to any
            server. Here is how to use it:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[15px] leading-8 text-slate-600">
            <li>
              Open the{" "}
              <Link
                href="/image-compressor"
                className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
              >
                Image Compressor
              </Link>{" "}
              tool.
            </li>
            <li>
              Drag and drop your image (or click to browse). JPG, PNG, and WebP
              are all supported.
            </li>
            <li>
              Adjust the quality slider. Start at 80% and compare the preview. If
              the result looks good, try 70% for even smaller files.
            </li>
            <li>
              Click &ldquo;Compress&rdquo; and download your optimized image
              instantly.
            </li>
          </ol>
          <p className="text-[15px] leading-8 text-slate-600">
            Because everything happens client-side, your images stay private and
            the process is nearly instant&mdash;even on large batches.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-slate-900">
            Pro Tips for Maximum Performance
          </h2>

          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
            <ul className="ml-6 list-disc space-y-2 text-[15px] leading-8 text-slate-600">
              <li>
                <strong>Compress before uploading to your CMS.</strong> WordPress,
                Shopify, and other platforms may apply their own compression, but
                starting with an already-optimized file ensures the best result.
              </li>
              <li>
                <strong>Choose the right format.</strong> Use JPG for photographs,
                PNG for graphics with transparency, and WebP whenever possible. Not
                sure which format to pick? Check our guide on{" "}
                <Link
                  href="/blog/jpg-vs-png-vs-webp-which-format"
                  className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
                >
                  JPG vs PNG vs WebP
                </Link>
                .
              </li>
              <li>
                <strong>Convert to WebP for the biggest savings.</strong> Our{" "}
                <Link
                  href="/image-to-webp"
                  className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
                >
                  Image to WebP tool
                </Link>{" "}
                makes this a one-click operation.
              </li>
              <li>
                <strong>Use responsive images.</strong> Serve different sizes for
                different screen widths using the{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">
                  srcset
                </code>{" "}
                attribute. Combine this with our{" "}
                <Link
                  href="/image-resizer"
                  className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
                >
                  Image Resizer
                </Link>{" "}
                to generate each size variant.
              </li>
              <li>
                <strong>Strip metadata.</strong> EXIF data from cameras can add
                50&ndash;100&nbsp;KB. Most compression tools remove it
                automatically.
              </li>
              <li>
                <strong>Need to change formats?</strong> Use our{" "}
                <Link
                  href="/jpg-to-png"
                  className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
                >
                  JPG to PNG converter
                </Link>{" "}
                when you need transparency, or convert the other way to reduce size.
              </li>
            </ul>
          </div>

          <p className="text-[15px] leading-8 text-slate-600">
            Image compression is one of the easiest wins in web performance. A few
            minutes of optimization can cut page load time in half, improve your
            Core Web Vitals scores, and save real money on hosting bandwidth.
            Start with our free{" "}
            <Link
              href="/image-compressor"
              className="font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400"
            >
              Image Compressor
            </Link>{" "}
            and see the difference for yourself.
          </p>
        </article>

        {/* Related tools CTA */}
        <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Try These Tools
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/image-compressor"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Image Compressor
            </Link>
            <Link
              href="/image-to-webp"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Image to WebP
            </Link>
            <Link
              href="/image-resizer"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Image Resizer
            </Link>
            <Link
              href="/jpg-to-png"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              JPG to PNG
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
