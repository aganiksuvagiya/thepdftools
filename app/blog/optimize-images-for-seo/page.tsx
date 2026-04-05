import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/optimize-images-for-seo`;

export const metadata: Metadata = {
  title: "Image Optimization for SEO — Complete Guide for 2026",
  description:
    "Boost your search rankings with properly optimized images. Learn about compression, alt text, lazy loading, next-gen formats like WebP, and how images affect Core Web Vitals.",
  keywords: [
    "image optimization for SEO",
    "image SEO guide 2026",
    "compress images for Google",
    "WebP format SEO",
    "Core Web Vitals images",
    "image alt text best practices",
    "lazy loading images",
    "LCP optimization",
    "image file size SEO",
    "next-gen image formats",
  ],
  openGraph: {
    title: "Image Optimization for SEO — Complete Guide for 2026",
    description:
      "Boost your search rankings with properly optimized images. Covers compression, alt text, lazy loading, WebP, and Core Web Vitals.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-03-18T00:00:00Z",
    authors: ["thepdftools"],
    images: [
      {
        url: `${SITE_URL}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "Image Optimization for SEO — Complete Guide for 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Optimization for SEO — Complete Guide for 2026",
    description:
      "A complete guide to optimizing images for search engines, page speed, and Core Web Vitals in 2026.",
  },
  alternates: {
    canonical: POST_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Image Optimization for SEO — Complete Guide for 2026",
  description:
    "Boost your search rankings with properly optimized images. Learn about compression, alt text, lazy loading, next-gen formats like WebP, and how images affect Core Web Vitals.",
  url: POST_URL,
  datePublished: "2026-03-18T00:00:00Z",
  dateModified: "2026-03-18T00:00:00Z",
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
  wordCount: 1200,
  articleSection: "SEO",
  keywords: [
    "image SEO",
    "image optimization",
    "Core Web Vitals",
    "WebP",
    "page speed",
    "LCP",
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function OptimizeImagesForSEO() {
  const tags = ["SEO", "Web Performance"];

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Image Optimization for SEO
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">Complete Guide for 2026</span>
              </h1>
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>March 18, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>8 min read</span>
              </div>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Images make up more than half the total weight of the average web page.
                When they are not optimized, they slow down load times, hurt search
                rankings, and frustrate visitors. This guide covers every aspect of image
                optimization for search&mdash;from file compression to alt text to
                next-generation formats&mdash;so you can rank higher, load faster, and
                deliver a better experience.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">

            {/* Why Image SEO Matters */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Image SEO Matters</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Google uses page speed as a direct ranking factor, and images are the
                  single biggest contributor to page weight. In 2026, Core Web Vitals
                  remain central to Google&rsquo;s ranking algorithm. Largest Contentful
                  Paint (LCP)&mdash;the metric that measures how quickly the largest
                  visible element renders&mdash;is almost always an image. A slow LCP
                  pushes your page down in search results.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Beyond rankings, optimized images improve user experience. Pages that
                  load in under two seconds have significantly lower bounce rates than
                  pages that take four or five seconds. Mobile users on cellular
                  connections are especially sensitive to bloated images. And from a
                  business perspective, faster pages convert better: studies consistently
                  show that each additional second of load time can reduce conversions by
                  7% or more.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Image SEO also opens up Google Image Search as a traffic channel.
                  Properly tagged and optimized images appear in image results, knowledge
                  panels, and featured snippets&mdash;all of which drive clicks to your
                  site.
                </p>
              </div>
            </section>

            {/* Compress Images */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Compress Images for Faster Loading</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  The single most effective step in image optimization is compression.
                  Reducing file size by 60&ndash;80% is routine for photographs, with no
                  perceptible loss in visual quality. Lossy compression (used by JPG and
                  lossy WebP) discards pixel data the human eye is unlikely to
                  notice&mdash;subtle color gradients, noise in shadows, and fine detail
                  in out-of-focus areas.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Our free{" "}
                  <Link href="/image-compressor" className={toolLink}>Image Compressor</Link>{" "}
                  makes this easy. Drop in a JPG, PNG, or WebP file, adjust the quality
                  slider, and download the optimized version instantly. Because the tool
                  runs entirely in your browser, your images stay private and the process
                  is nearly instant.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  For JPGs, a quality setting between 70&ndash;85% delivers excellent
                  results for most web use cases. For PNGs, lossless optimization can
                  strip unnecessary metadata and reduce file size by 20&ndash;40% without
                  changing a single pixel.
                </p>
              </div>
            </section>

            {/* Choose the Right Format */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Choose the Right Format</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Selecting the correct image format is fundamental to SEO. Each format
                  has strengths and trade-offs:
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">JPG</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Best for photographs and complex images with gradients. Small file sizes
                    at moderate quality. No transparency support. Use our{" "}
                    <Link href="/png-to-jpg" className={toolLink}>PNG to JPG converter</Link>{" "}
                    when you need to switch from PNG to reduce file size on photos.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">PNG</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Ideal for graphics, logos, screenshots, and anything requiring transparency.
                    Lossless compression preserves every pixel. Convert from JPG when you
                    need transparency with our{" "}
                    <Link href="/jpg-to-png" className={toolLink}>JPG to PNG converter</Link>.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 sm:col-span-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">WebP</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The best of both worlds. Supports lossy and lossless compression plus
                    transparency. Produces files 25&ndash;35% smaller than JPG at equivalent
                    quality. Every modern browser supports it. WebP should be your default
                    format for the web in 2026.
                  </p>
                </div>
              </div>
            </section>

            {/* Resize Images */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Resize Images to Correct Dimensions</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Serving a 4000&times;3000 image in a container that displays at
                  800&times;600 wastes enormous bandwidth. The browser downloads four
                  times more pixels than it needs, then throws most of them away during
                  rendering. Always resize images to match their display dimensions before
                  uploading.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Our{" "}
                  <Link href="/image-resizer" className={toolLink}>Image Resizer</Link>{" "}
                  lets you set exact width and height, maintain aspect ratio, and export
                  in the format of your choice. Resize first, then compress&mdash;this
                  order yields the smallest possible file. For responsive designs, create
                  multiple sizes (e.g., 400px, 800px, 1200px) and serve them with the{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">srcset</code>{" "}
                  attribute.
                </p>
              </div>
            </section>

            {/* File Names & Alt Text */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Use Descriptive File Names and Alt Text</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Search engines cannot &ldquo;see&rdquo; images the way humans do. They
                  rely on file names, alt attributes, and surrounding text to understand
                  what an image depicts. A file named{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">IMG_4582.jpg</code>{" "}
                  tells Google nothing. A file named{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">red-running-shoes-nike-pegasus.jpg</code>{" "}
                  tells Google exactly what the image contains.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Alt text serves two purposes: it describes the image for screen readers
                  (accessibility) and provides context for search engine crawlers. Write
                  alt text that is concise, descriptive, and naturally includes your target
                  keyword where relevant. Avoid keyword stuffing&mdash;Google penalizes it.
                  A good alt text reads like a short caption: &ldquo;Red Nike Pegasus
                  running shoes on a white background.&rdquo;
                </p>
              </div>
            </section>

            {/* Lazy Loading */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Implement Lazy Loading</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Lazy loading defers the loading of off-screen images until the user
                  scrolls near them. This reduces initial page weight, speeds up First
                  Contentful Paint, and saves bandwidth for users who never scroll to the
                  bottom of the page.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  In HTML, simply add{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">loading=&quot;lazy&quot;</code>{" "}
                  to your{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&lt;img&gt;</code>{" "}
                  tags. Every modern browser supports native lazy loading. For your hero
                  image or LCP element, do <em>not</em> lazy-load it&mdash;you want that
                  image to load as fast as possible. Only lazy-load images that appear
                  below the fold.
                </p>
              </div>
            </section>

            {/* Next-Gen Formats */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Use Next-Gen Formats</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Google&rsquo;s PageSpeed Insights and Lighthouse audits explicitly
                  recommend serving images in next-generation formats. WebP is the most
                  widely supported next-gen format and should be your first choice. It
                  delivers 25&ndash;35% smaller files than JPG and supports transparency,
                  making it a universal replacement for both JPG and PNG.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Converting your existing images to WebP is simple with our{" "}
                  <Link href="/image-to-webp" className={toolLink}>Image to WebP converter</Link>.
                  Drop in any JPG or PNG, and download the WebP version instantly. For
                  sites that need to support very old browsers, use the{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&lt;picture&gt;</code>{" "}
                  element with a JPG fallback.
                </p>
              </div>
            </section>

            {/* Core Web Vitals */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Core Web Vitals and LCP</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Largest Contentful Paint (LCP) measures the render time of the largest
                  image or text block visible in the viewport. Google considers an LCP
                  under 2.5 seconds &ldquo;good&rdquo; and anything over 4 seconds
                  &ldquo;poor.&rdquo; Since the LCP element is frequently an image,
                  image optimization directly determines your LCP score.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  To achieve a fast LCP, combine several techniques: compress the hero
                  image aggressively, serve it in WebP format, set explicit width and
                  height attributes to prevent layout shift, preload the LCP image with{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&lt;link rel=&quot;preload&quot;&gt;</code>,
                  and avoid lazy-loading it. These steps together can shave seconds off
                  your LCP.
                </p>
              </div>
            </section>

            {/* SEO Checklist */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Image SEO Checklist</h2>
              <ul className="mt-5 space-y-3">
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Compress all images before uploading&mdash;use our <Link href="/image-compressor" className={toolLink}>Image Compressor</Link></span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Resize images to match display dimensions with the <Link href="/image-resizer" className={toolLink}>Image Resizer</Link></span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Convert to WebP using the <Link href="/image-to-webp" className={toolLink}>Image to WebP converter</Link></span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Use descriptive, keyword-rich file names (hyphens, not underscores)</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Write meaningful alt text for every image</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Add <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">loading=&quot;lazy&quot;</code> to below-the-fold images</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Do <em>not</em> lazy-load the LCP / hero image</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Set explicit width and height to prevent Cumulative Layout Shift</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Preload the LCP image with <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&lt;link rel=&quot;preload&quot;&gt;</code></span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Use the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&lt;picture&gt;</code> element with WebP source and JPG fallback</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Strip EXIF metadata to save 50&ndash;100&nbsp;KB per image</span></li>
                <li className="flex gap-2"><span className="mt-1 text-brand-500">&#10003;</span><span className="text-[15px] leading-7 text-slate-600">Serve responsive images via srcset for different screen sizes</span></li>
              </ul>
            </section>

            {/* Conclusion + CTA */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Start Optimizing Today</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Image optimization is one of the highest-impact, lowest-effort SEO wins
                  available. By compressing files, choosing the right format, writing good
                  alt text, and respecting Core Web Vitals, you can measurably improve
                  both your search rankings and your user experience. Start with the free
                  tools above and work through the checklist&mdash;your Lighthouse score
                  will thank you.
                </p>
                <div className="mt-2">
                  <Link href="/image-compressor" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
                    Try Image Compressor Free
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </section>

          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/image-compressor" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  Image Compressor
                </Link>
                <Link href="/image-resizer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  Image Resizer
                </Link>
                <Link href="/image-to-webp" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Image to WebP
                </Link>
                <Link href="/jpg-to-png" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  JPG to PNG
                </Link>
                <Link href="/png-to-jpg" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  PNG to JPG
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                <p className="text-sm leading-6 text-slate-500">Why Image SEO Matters</p>
                <p className="text-sm leading-6 text-slate-500">Compress Images for Faster Loading</p>
                <p className="text-sm leading-6 text-slate-500">Choose the Right Format</p>
                <p className="text-sm leading-6 text-slate-500">Resize to Correct Dimensions</p>
                <p className="text-sm leading-6 text-slate-500">File Names and Alt Text</p>
                <p className="text-sm leading-6 text-slate-500">Implement Lazy Loading</p>
                <p className="text-sm leading-6 text-slate-500">Use Next-Gen Formats</p>
                <p className="text-sm leading-6 text-slate-500">Core Web Vitals and LCP</p>
                <p className="text-sm leading-6 text-slate-500">Image SEO Checklist</p>
              </nav>
            </div>
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/compress-images" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">How to Compress Images Without Losing Quality</Link>
                <Link href="/blog/jpg-vs-png" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">JPG vs PNG: Which Format Should You Use?</Link>
                <Link href="/blog/remove-background" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">How to Remove Image Backgrounds Instantly</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
