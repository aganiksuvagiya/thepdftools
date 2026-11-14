import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SLUG = "jpeg-xl-in-chrome-what-it-means-for-your-images";
const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata(SLUG);
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "JPEG XL Is Coming to Chrome 155: What It Means for Your Website Images",
      description:
        "Chrome says JPEG XL decoding ships starting with Chrome 155. Here is what changes for web images, what stays the same, and how to prepare without breaking anything.",
      url: POST_URL,
      datePublished: "2026-11-14T00:00:00Z",
      dateModified: "2026-11-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 1500,
      articleSection: "Image Tools",
      keywords: ["JPEG XL Chrome", "JPEG XL Chrome 155", "JPEG XL vs AVIF", "JPEG XL vs WebP", "next-gen image formats 2026"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "JPEG XL in Chrome: What It Means for Your Images", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When does JPEG XL arrive in Chrome?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Chrome's developer blog, published October 6, 2026, says Chrome is shipping JPEG XL decoding starting from Chrome 155. The post does not say whether it is on by default, so check the Chrome 155 release notes before you plan around it.",
          },
        },
        {
          "@type": "Question",
          name: "Is JPEG XL replacing WebP or AVIF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not on its own. Chrome's own guidance is to try both AVIF and JPEG XL and see which gives the better result for your images. WebP, AVIF and JPEG all keep working, and most sites will keep serving them as the baseline.",
          },
        },
        {
          "@type": "Question",
          name: "Will my existing images stop working?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. A browser adding a new decoder does not remove support for formats it already handles. Your JPEG, PNG and WebP files render exactly as before.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert images to JPEG XL on thepdftools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not today. Our image tools output JPEG, PNG and WebP. Resizing and compressing images before you encode them in any newer format is still the biggest win, and those steps work with our free browser-based tools.",
          },
        },
        {
          "@type": "Question",
          name: "How should I add JPEG XL to my site later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use a picture element with a JPEG XL source listed first, then AVIF or WebP, and a JPEG or PNG img tag as the fallback. Browsers pick the first format they support, so visitors on older browsers are unaffected.",
          },
        },
      ],
    },
  ],
};

const toolLink =
  "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

const timeline = [
  { when: "2021", what: "Chromium adds experimental JPEG XL support behind a flag." },
  { when: "2022", what: "Chrome engineers remove it, saying there is not enough interest across the ecosystem to keep experimenting." },
  { when: "November 2025", what: "Google signals on the Blink mailing list that it intends to bring back JPEG XL using a memory-safe decoder written in Rust (jxl-rs)." },
  { when: "January 2026", what: "The Register reports that the decoder has been integrated into Chromium." },
  { when: "February 2026", what: "Third-party coverage reports a JPEG XL decoder in Chrome 145, hidden behind a flag and off by default." },
  { when: "October 6, 2026", what: "Chrome's developer blog says Chrome is shipping JPEG XL decoding starting from Chrome 155, and encourages developers to try both AVIF and JPEG XL." },
];

const formatGuide = [
  {
    label: "Photographs & product shots",
    desc: "The best candidate for JPEG XL. Chrome's own post points to high-fidelity or lossless compression of photographic images. Test it against AVIF and WebP at the same visual quality before you commit.",
  },
  {
    label: "Logos, icons & flat graphics",
    desc: "Keep SVG or PNG where you can. Benchmarks vary, and one comparison cited by Core Web Vitals consultant Arjen Karel found AVIF smaller than JPEG XL for a small logo. Do not assume the newest format wins everywhere.",
  },
  {
    label: "Screenshots & UI captures",
    desc: "Lossless WebP or PNG is already a solid choice. There is no urgent reason to change a working pipeline.",
  },
  {
    label: "Your original photo archive",
    desc: "JPEG XL can recompress existing JPEG files losslessly, and the same article cites savings of roughly 20% for that case. Still, always keep your untouched originals.",
  },
  {
    label: "Images inside PDFs",
    desc: "The PDF Association reportedly added JPEG XL to its specification in November 2025. Viewer support will lag, so for PDFs you share widely, stay with JPEG or PNG for now.",
  },
  {
    label: "Animated graphics",
    desc: "Chrome's post encourages developers to use .jxl images and animations, but support details differ between browsers. Test on the browsers your visitors actually use.",
  },
];

const pictureSnippet = `<picture>
  <source srcset="photo.jxl" type="image/jxl">
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Describe the photo" width="1200" height="800">
</picture>`;

export default function JpegXlInChromePost() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Image Tools", "Trending", "Web Performance"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                JPEG XL Is Coming to Chrome 155
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  What to Do With Your Images Now
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>November 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>8 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                On October 6, 2026, the Chrome team announced that Chrome is shipping support for JPEG XL, an image format it dropped four years ago. If you run a website, a blog or a store, the practical question is simple: do you need to change anything? Short answer: not today. This guide covers what happened, what it could mean for your images, and a safe way to prepare.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 — What happened */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What Actually Happened</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                JPEG XL has had an unusual few years in Chrome. It arrived behind a flag, was removed, and is now coming back with a new decoder. The timeline below is based on Chrome&apos;s own blog and press coverage.
              </p>
              <ol className="mt-5 space-y-4">
                {timeline.map((item) => (
                  <li key={item.when} className="flex gap-4">
                    <span className="mt-0.5 w-28 shrink-0 self-start rounded-full bg-brand-50 px-3 py-1 text-center text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                      {item.when}
                    </span>
                    <p className="text-[15px] leading-7 text-slate-600">{item.what}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[15px] leading-8 text-slate-600">
                One detail to keep in mind: the Chrome post we read does not say whether decoding will be switched on by default in Chrome 155, and the earlier Chrome 145 reports describe a flag only. Check Chrome&apos;s release notes before you plan around a specific date. Safari has supported JPEG XL since Safari 17, according to The Register, while other browsers are at different stages.
              </p>
            </section>

            {/* Section 2 — What is JPEG XL */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why People Care About JPEG XL</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Chrome&apos;s announcement describes JPEG XL as offering 30-50% better compression than JPEG, lossless compression, built-in HDR support and lossless JPEG transcoding. That last feature is the one that gets attention from anyone with a large library of existing JPEG photos, because it lets those files be recompressed without further quality loss.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  The same post recommends trying both AVIF and JPEG XL to get the best results, and says JPEG XL is most helpful for high-fidelity or lossless compression, especially of photographic images, or when progressive decoding is preferred. In other words, Google is not telling you to throw out WebP or AVIF. It is adding another option to test.
                </p>
              </div>
            </section>

            {/* Section 3 — Does anything change now */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Does Anything Change for You Today?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Your current images", desc: "JPEG, PNG, WebP and AVIF files keep working exactly as before. A new decoder does not remove an old one." },
                  { label: "Your visitors", desc: "Browser updates roll out gradually, and not every browser is at the same stage. Expect a long period where many visitors cannot load .jxl files." },
                  { label: "Your Core Web Vitals", desc: "Format affects speed through file size and decode time. Core Web Vitals consultant Arjen Karel notes that LCP is measured when the image is fully rendered, so progressive decoding does not directly improve the LCP number." },
                  { label: "Your workflow", desc: "Nothing breaks. The sensible move is to prepare, measure and test, not to convert your whole library this week." },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 — Safe adoption */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How to Adopt It Safely Later: Progressive Enhancement</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                When you are ready to test JPEG XL, do not replace your existing images. Add it as the first choice inside a <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">picture</code> element. The browser reads the sources from top to bottom and uses the first format it understands, so everyone else falls back to what you already serve.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-900 p-5 text-sm leading-7 text-slate-100">
                <code>{pictureSnippet}</code>
              </pre>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span>Keep <strong>width and height</strong> on the img tag so the page does not shift while images load.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span>Order matters: put the format you most want to serve first, and the most widely supported one last.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span>Compare real files, not marketing claims. Encode a handful of your own photos in each format at a similar visual quality and look at the sizes.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 — Which images benefit */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Which Images Could Benefit?</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Not every image gains from a new format. Here is a practical way to think about it, based on Chrome&apos;s guidance and the third-party benchmarks we could verify.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {formatGuide.map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Checklist */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">A Five-Step Checklist You Can Do This Week</h2>
              <ol className="mt-5 space-y-4">
                {[
                  <>Resize every image to the size it is actually displayed at. Oversized images waste bytes in any format. Our <Link href="/image-resizer" className={toolLink}>Image Resizer</Link> handles this in your browser.</>,
                  <>Compress at a sensible quality. The <Link href="/image-compressor" className={toolLink}>Image Compressor</Link> has a quality slider and a target-size mode, so you can aim for a specific file size.</>,
                  <>Serve WebP as your default. Use <Link href="/image-to-webp" className={toolLink}>Image to WebP</Link> to convert JPEG and PNG files, and read our <Link href="/blog/jpg-vs-png-vs-webp-which-format" className={toolLink}>JPG vs PNG vs WebP guide</Link> if you are unsure which format suits which image.</>,
                  <>Keep your originals. Whatever you encode today, store the untouched source files so you can re-encode in newer formats later.</>,
                  <>Wait for data before adding .jxl. Read the Chrome 155 release notes, check your analytics for the share of visitors on recent Chrome versions, then run a small test on a few pages.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-secondary-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[15px] leading-8 text-slate-600">
                A transparency note: our image tools currently output JPEG, PNG and WebP, so you cannot create .jxl files here yet. Steps one to four still apply, because resizing and compressing before you encode is the biggest saving in every format.
              </p>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">The Bottom Line</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                JPEG XL returning to Chrome is good news for image quality and file size, but it is a slow-moving change, not an emergency. Keep serving the formats that work, tidy up your image sizes now, and test JPEG XL as an optional first choice once the browser numbers justify it. This post reflects Chrome&apos;s October 6, 2026 announcement and press coverage available as of November 14, 2026, so check the sources below for updates.
              </p>
            </section>
            <BlogFooterLinks slug={SLUG} includeBreadcrumbSchema={false} includeFaqSchema={false} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/image-compressor", label: "Image Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/image-to-webp", label: "Image to WebP", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 3.75h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6a2.25 2.25 0 012.25-2.25z" },
                  { href: "/image-resizer", label: "Image Resizer", icon: "M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" },
                  { href: "/compress-image-to-100kb", label: "Compress Image to 100KB", icon: "M4 6h16M4 12h16M4 18h7" },
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

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "What Actually Happened",
                  "Why People Care About JPEG XL",
                  "Does Anything Change Today?",
                  "Adopting It Safely Later",
                  "Which Images Could Benefit?",
                  "A Five-Step Checklist",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/jpg-vs-png-vs-webp-which-format" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  JPG vs PNG vs WebP: Which Format?
                </Link>
                <Link href="/blog/compress-images-for-website-speed" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Compress Images for Faster Website Speed
                </Link>
                <Link href="/blog/optimize-images-for-seo" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Optimize Images for SEO
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
