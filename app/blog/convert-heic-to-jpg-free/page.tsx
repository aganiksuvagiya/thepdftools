import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/convert-heic-to-jpg-free`;

export const metadata: Metadata = {
  title: "How to Convert HEIC to JPG on Any Device — Free & No Upload",
  description:
    "Learn how to convert HEIC to JPG for free on iPhone, Mac, Windows, and Android. No file uploads needed — everything runs in your browser. Covers HEIC vs JPG differences, step-by-step instructions, and pro tips.",
  keywords: [
    "heic to jpg",
    "convert heic to jpg",
    "heic to jpeg converter",
    "iphone heic to jpg",
    "open heic files on windows",
    "heic format",
    "apple heic converter",
  ],
  openGraph: {
    title: "How to Convert HEIC to JPG on Any Device — Free & No Upload",
    description:
      "Convert HEIC to JPG for free on any device. No file uploads — runs entirely in your browser. Step-by-step guide with a free tool included.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "How to Convert HEIC to JPG on Any Device — Free & No Upload" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert HEIC to JPG on Any Device — Free & No Upload",
    description: "Convert HEIC to JPG for free on any device. No uploads needed — everything runs in your browser.",
  },
  alternates: { canonical: POST_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Convert HEIC to JPG on Any Device — Free & No Upload",
      description: "Learn how to convert HEIC to JPG for free on iPhone, Mac, Windows, and Android. No file uploads needed — everything runs in your browser. Covers HEIC vs JPG differences, step-by-step instructions, and pro tips.",
      url: POST_URL,
      datePublished: "2026-04-07T00:00:00Z",
      dateModified: "2026-04-07T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 1200,
      articleSection: "Image Conversion",
      keywords: ["heic to jpg", "convert heic to jpg", "heic format", "apple heic converter", "iphone heic to jpg"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Convert HEIC to JPG", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I convert HEIC to JPG without uploading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The HEIC to JPG converter runs in your browser, so your photos do not need to be uploaded to a server.",
          },
        },
        {
          "@type": "Question",
          name: "Does converting HEIC to JPG work on Windows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Browser-based HEIC to JPG conversion works on Windows, Mac, iPhone, Android, and Linux.",
          },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function ConvertHeicToJpgFree() {
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
                {["HEIC to JPG", "Image Conversion"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Convert HEIC to JPG
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Free &amp; No Upload Required
                </span>
              </h1>

              {/* Meta */}
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>April 7, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>6 min read</span>
              </div>

              {/* Intro */}
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                You took great photos on your iPhone, but when you try to open them on a Windows PC or share them over email, nothing works. The culprit? HEIC&mdash;Apple&rsquo;s default image format. This guide shows you how to convert HEIC to JPG on any device, for free, without uploading a single file to the cloud.
              </p>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Section 1 — What is HEIC Format? */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What Is HEIC Format?</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  HEIC stands for High Efficiency Image Container. It is based on the HEIF (High Efficiency Image File Format) standard and uses advanced compression derived from the H.265/HEVC video codec. Apple adopted HEIC as the default photo format starting with iOS&nbsp;11 in 2017.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  The main advantage of HEIC is file size. A HEIC photo is typically 40&ndash;50% smaller than a JPG at the same visual quality, which means your iPhone can store roughly twice as many photos in the same amount of storage. HEIC also supports 16-bit color depth, transparency, and the ability to store multiple images (like Live Photos) in a single file.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Despite these technical benefits, HEIC has one major drawback: compatibility. Windows, Android, many web browsers, and most social media platforms do not natively support HEIC files&mdash;which is why converting to JPG remains essential.
                </p>
              </div>
            </section>

            {/* Section 2 — Why Convert HEIC to JPG? */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Convert HEIC to JPG?</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Windows &amp; Android</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Windows 10/11 requires a paid codec extension to open HEIC files. Most Android devices cannot open them at all. Converting to JPG eliminates this friction instantly.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Email &amp; Social Media</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Gmail, Outlook, Facebook, and many other platforms either reject HEIC attachments or fail to display them. JPG is universally accepted everywhere.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Web &amp; CMS Uploads</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    WordPress, Shopify, Squarespace, and most website builders do not support HEIC. You need JPG, PNG, or WebP to upload images to your site.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Editing Software</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Many photo editors&mdash;especially older versions of Photoshop, GIMP, and Canva&mdash;do not support HEIC. JPG works with every image editor on every platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 — 3 Ways to Convert HEIC to JPG */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">3 Ways to Convert HEIC to JPG</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                There are several approaches depending on your device and workflow:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Browser-based tool (any device)", desc: "Use our free HEIC to JPG converter — it works on Windows, Mac, iPhone, Android, and Linux. Everything runs locally in your browser, so your photos never leave your device." },
                  { label: "Change iPhone camera settings", desc: "Go to Settings > Camera > Formats and select \"Most Compatible.\" This makes your iPhone shoot in JPG instead of HEIC going forward — but it won't convert existing photos." },
                  { label: "Mac Preview app", desc: "Open the HEIC file in Preview, then go to File > Export and choose JPEG from the format dropdown. Adjust the quality slider and click Save. Works well for a few files, but slow for batch conversion." },
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
                For the fastest, most private option, try our <Link href="/heic-to-jpg" className={toolLink}>HEIC to JPG converter</Link>&mdash;it handles batch conversion and runs entirely in your browser.
              </p>
            </section>

            {/* Section 4 — Step-by-Step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Convert with Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/heic-to-jpg" className={toolLink}>free HEIC to JPG converter</Link> runs entirely in your browser&mdash;no files are uploaded to any server, keeping your photos completely private.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the HEIC to JPG converter tool.",
                  "Drag and drop your HEIC files (or click to browse). You can select multiple files for batch conversion.",
                  "Adjust the quality slider if needed. 85% is a great default that balances quality and file size.",
                  "Click \"Convert\" and download your JPG files instantly — no waiting, no watermarks.",
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
                  href="/heic-to-jpg"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z" /></svg>
                  Convert HEIC to JPG Free
                </Link>
              </div>
            </section>

            {/* Section 5 — HEIC vs JPG: Key Differences */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">HEIC vs JPG: Key Differences</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "File Size", heic: "40-50% smaller than JPG at same quality", jpg: "Larger files, but universally supported" },
                  { label: "Compatibility", heic: "Apple devices only (iOS, macOS)", jpg: "Every device, browser, and platform" },
                  { label: "Color Depth", heic: "16-bit (wide color gamut)", jpg: "8-bit (standard color)" },
                  { label: "Transparency", heic: "Supported", jpg: "Not supported" },
                  { label: "Multiple Images", heic: "Can store bursts & Live Photos", jpg: "Single image per file" },
                  { label: "Editing Support", heic: "Limited editor support", jpg: "Universal editor support" },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <div className="mt-3 space-y-2">
                      <p className="text-sm leading-6 text-slate-600"><strong className="text-slate-800">HEIC:</strong> {row.heic}</p>
                      <p className="text-sm leading-6 text-slate-600"><strong className="text-slate-800">JPG:</strong> {row.jpg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Pro Tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for HEIC Conversion</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Use batch conversion.</strong> If you have dozens of HEIC files, our <Link href="/heic-to-jpg" className={toolLink}>HEIC to JPG tool</Link> lets you convert them all at once rather than one at a time.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Adjust quality settings.</strong> 85% quality is the sweet spot for most photos. Go higher (90&ndash;95%) for print-quality images, or lower (70&ndash;75%) when file size matters more than detail.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep your originals.</strong> Always keep the original HEIC files as backups. They contain more color data and can be re-converted at different quality levels later.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Consider WebP instead.</strong> If your images are for the web, <Link href="/image-to-webp" className={toolLink}>converting to WebP</Link> gives you even smaller files than JPG with better quality. Check our guide on <Link href="/blog/jpg-vs-png-vs-webp-which-format" className={toolLink}>JPG vs PNG vs WebP</Link> to decide.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Compress after converting.</strong> After converting HEIC to JPG, you can further reduce file size with our <Link href="/image-compressor" className={toolLink}>Image Compressor</Link>&mdash;especially useful for web uploads.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Change your iPhone settings.</strong> If you want to avoid HEIC entirely, go to Settings &gt; Camera &gt; Formats and choose &ldquo;Most Compatible&rdquo; to shoot in JPG by default.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                HEIC is a great format for saving storage on your iPhone, but its lack of universal compatibility makes conversion to JPG a necessity. Whether you need to share photos over email, upload them to a website, or simply open them on a Windows PC, our free <Link href="/heic-to-jpg" className={toolLink}>HEIC to JPG converter</Link> handles it in seconds&mdash;right in your browser, with zero uploads and zero cost.
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
                  { href: "/heic-to-jpg", label: "HEIC to JPG", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z" },
                  { href: "/image-compressor", label: "Image Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/jpg-to-png", label: "JPG to PNG", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                  { href: "/image-to-webp", label: "Image to WebP", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z" },
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
                  "What Is HEIC Format?",
                  "Why Convert HEIC to JPG?",
                  "3 Ways to Convert HEIC to JPG",
                  "Step-by-Step: Convert with Our Free Tool",
                  "HEIC vs JPG: Key Differences",
                  "Pro Tips for HEIC Conversion",
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
                <Link href="/blog/how-to-compress-images-for-web" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Compress Images for Web
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
