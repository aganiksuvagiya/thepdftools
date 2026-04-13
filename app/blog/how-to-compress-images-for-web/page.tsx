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
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "How to Compress Images for Web Without Losing Quality" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress Images for Web Without Losing Quality",
    description: "Learn how to compress images for the web without sacrificing visual quality. Free browser-based tool included.",
  },
  alternates: { canonical: POST_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Compress Images for Web Without Losing Quality",
  description: "Learn how to compress images for the web without sacrificing visual quality. Covers lossy vs lossless compression, ideal quality settings, WebP advantages, and a free browser-based tool.",
  url: POST_URL,
  datePublished: "2026-04-01T00:00:00Z",
  dateModified: "2026-04-01T00:00:00Z",
  author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  wordCount: 1050,
  articleSection: "Image Compression",
  keywords: ["image compression", "web performance", "lossy compression", "lossless compression", "WebP"],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function HowToCompressImagesForWeb() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              {/* Back link */}
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Image Compression", "Web Performance"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Compress Images for Web
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Without Losing Quality
                </span>
              </h1>

              {/* Meta */}
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>April 1, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>5 min read</span>
              </div>

              {/* Intro */}
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Images are the single heaviest asset on most websites. A handful of unoptimized photos can double your page weight, tank your Lighthouse score, and send visitors reaching for the back button. This guide walks you through everything you need to know.
              </p>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Image Compression Matters</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Google&rsquo;s Core Web Vitals now directly influence search rankings. Largest Contentful Paint (LCP)&mdash;the metric that measures how fast the biggest visible element loads&mdash;is almost always an image. If your hero image weighs 3&nbsp;MB instead of 300&nbsp;KB, LCP suffers, and so does your ranking.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Beyond SEO, performance affects user experience. Studies show that a one-second delay in load time can reduce conversions by up to 7%. Mobile users on slower connections are hit hardest.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Bandwidth costs money, too. If you serve millions of page views, shaving 500&nbsp;KB per page adds up to terabytes of saved transfer every month. Image compression is not just a nice-to-have&mdash;it is essential.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Types of Image Compression</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Lossy Compression</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Permanently removes some image data to achieve smaller files. The algorithm discards information the human eye is least likely to notice. JPG is the most common lossy format. At 70&ndash;85% quality, the visual difference is imperceptible, yet files can be 60&ndash;80% smaller.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Lossless Compression</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Reduces file size without discarding any data. PNG uses lossless compression by default. Ideal for graphics, logos, screenshots, and anything with sharp edges or text. Trade-off: lossless files are larger than lossy equivalents.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Best Settings for Web Images</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Finding the sweet spot between quality and file size depends on the format and content:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "JPG quality 70–85%", desc: "Excellent visual fidelity with major size savings. Go lower (60%) for thumbnails; stay at 80–85% for hero images." },
                  { label: "PNG optimization", desc: "Strip unnecessary metadata and optimize the DEFLATE stream. This alone can save 20–40%." },
                  { label: "WebP at 75–80%", desc: "WebP produces files 25–35% smaller than JPG at the same perceived quality. Every modern browser supports it." },
                  { label: "Resize first", desc: "A 4000×3000 photo displayed at 800×600 wastes bandwidth. Resize to match display dimensions, then compress." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Convert any image to WebP with our <Link href="/image-to-webp" className={toolLink}>Image to WebP converter</Link>, or resize first with our <Link href="/image-resizer" className={toolLink}>Image Resizer</Link>.
              </p>
            </section>

            {/* Section 4 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Compress with Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/image-compressor" className={toolLink}>free Image Compressor</Link> runs entirely in your browser&mdash;no files are uploaded to any server.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the Image Compressor tool.",
                  "Drag and drop your image (or click to browse). JPG, PNG, and WebP are all supported.",
                  "Adjust the quality slider. Start at 80% and compare the preview.",
                  "Click \"Compress\" and download your optimized image instantly.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-secondary-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <Link
                  href="/image-compressor"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                  Try Image Compressor Free
                </Link>
              </div>
            </section>

            {/* Section 5 - Pro Tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for Maximum Performance</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Compress before uploading to your CMS.</strong> WordPress, Shopify, and other platforms may apply their own compression, but starting with an already-optimized file ensures the best result.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Choose the right format.</strong> Use JPG for photographs, PNG for graphics with transparency, and WebP whenever possible. Not sure which? Check our guide on <Link href="/blog/jpg-vs-png-vs-webp-which-format" className={toolLink}>JPG vs PNG vs WebP</Link>.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Convert to WebP for the biggest savings.</strong> Our <Link href="/image-to-webp" className={toolLink}>Image to WebP tool</Link> makes this a one-click operation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Use responsive images.</strong> Serve different sizes for different screen widths using <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">srcset</code>. Combine with our <Link href="/image-resizer" className={toolLink}>Image Resizer</Link> to generate each size variant.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Strip metadata.</strong> EXIF data from cameras can add 50–100&nbsp;KB. Most compression tools remove it automatically.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Need to change formats?</strong> Use our <Link href="/jpg-to-png" className={toolLink}>JPG to PNG converter</Link> when you need transparency, or convert the other way to reduce size.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                Image compression is one of the easiest wins in web performance. A few minutes of optimization can cut page load time in half, improve your Core Web Vitals scores, and save real money on hosting bandwidth. Start with our free <Link href="/image-compressor" className={toolLink}>Image Compressor</Link> and see the difference for yourself.
              </p>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Try These Tools */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/image-compressor", label: "Image Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/image-to-webp", label: "Image to WebP", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z" },
                  { href: "/image-resizer", label: "Image Resizer", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" },
                  { href: "/jpg-to-png", label: "JPG to PNG", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} /></svg>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Image Compression Matters",
                  "Types of Image Compression",
                  "Best Settings for Web Images",
                  "Step-by-Step: Compress with Our Free Tool",
                  "Pro Tips for Maximum Performance",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            {/* Related Posts */}
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/jpg-vs-png-vs-webp-which-format" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  JPG vs PNG vs WebP — Which Format?
                </Link>
                <Link href="/blog/optimize-images-for-seo" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Image Optimization for SEO
                </Link>
                <Link href="/blog/remove-image-background-with-ai" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Remove Backgrounds with AI
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
