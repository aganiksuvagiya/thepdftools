import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/convert-video-to-gif-free`;

export const metadata: Metadata = {
  title: "How to Convert Video to GIF Online — Free MP4 to GIF Converter",
  description:
    "Learn how to convert video to GIF online for free. Step-by-step guide covering MP4 to GIF conversion, best FPS and size settings, and tips for smaller, sharper GIFs.",
  keywords: [
    "video to gif",
    "mp4 to gif",
    "convert video to gif",
    "make gif from video",
    "gif maker online free",
    "video to gif converter",
    "free gif converter",
    "mp4 to gif online",
  ],
  openGraph: {
    title: "How to Convert Video to GIF Online — Free MP4 to GIF Converter",
    description:
      "Learn how to convert video to GIF online for free. Step-by-step guide with best settings for social media, presentations, and messaging.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "How to Convert Video to GIF Online — Free MP4 to GIF Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert Video to GIF Online — Free MP4 to GIF Converter",
    description: "Convert any video to GIF for free in your browser. No upload, no signup. Includes best settings for every use case.",
  },
  alternates: { canonical: POST_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Convert Video to GIF Online — Free MP4 to GIF Converter",
  description: "Learn how to convert video to GIF online for free. Step-by-step guide covering MP4 to GIF conversion, best FPS and size settings, and tips for smaller, sharper GIFs.",
  url: POST_URL,
  datePublished: "2026-04-07T00:00:00Z",
  dateModified: "2026-04-07T00:00:00Z",
  author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  wordCount: 1100,
  articleSection: "Video Conversion",
  keywords: ["video to gif", "mp4 to gif", "gif converter", "gif maker", "video conversion"],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function ConvertVideoToGifFree() {
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
                {["Video to GIF", "GIF Maker"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Convert Video to GIF Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Free MP4 to GIF Converter
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
                GIFs are everywhere&mdash;social media reactions, Slack messages, product demos, and quick tutorials. But making a good GIF from a video clip can feel tricky if you don&rsquo;t know the right settings. This guide covers everything from why GIFs still matter to the exact FPS and resolution you should use for every platform.
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
              <h2 className="text-2xl font-bold text-slate-900">Why GIFs Still Matter</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Despite the rise of short-form video on TikTok, Reels, and Shorts, GIFs remain the universal language of the internet. They autoplay silently, loop seamlessly, and work in places where video simply cannot&mdash;email signatures, GitHub READMEs, Slack threads, and Discord channels.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  On social media, GIFs grab attention in crowded feeds without requiring sound or a play button. In workplace tools like Slack and Microsoft Teams, a well-timed GIF reaction can communicate more than a paragraph of text. For tutorials and product demos, a short GIF showing a UI interaction is worth a thousand screenshots.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  And then there are memes. GIFs power the meme economy, and if you want to create your own from a video clip, you need a fast, reliable converter. That&rsquo;s exactly what our <Link href="/video-to-gif" className={toolLink}>Video to GIF tool</Link> provides&mdash;free, private, and right in your browser.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Video vs GIF: When to Use Each</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Use Video (MP4/WebM)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Best for longer content (over 10 seconds), when you need audio, or when file size matters most. MP4 with H.264 encoding is dramatically smaller than a GIF of the same clip&mdash;often 10&times; smaller. Use video on your website for hero backgrounds and long demos.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Use GIF</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Perfect for short loops under 5&ndash;10 seconds. GIFs autoplay everywhere&mdash;email clients, chat apps, forums, and social platforms. No play button required. They work in contexts where embedding video is impossible or inconvenient, like inline documentation and messaging.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Convert with Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/video-to-gif" className={toolLink}>free Video to GIF converter</Link> runs entirely in your browser&mdash;no files are uploaded to any server, and your video stays private.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the Video to GIF tool and drag-and-drop your MP4, WebM, or MOV file (or click to browse).",
                  "Trim the clip to the exact segment you want. Keep it under 5 seconds for the smallest file size.",
                  "Adjust FPS (frames per second) and output width. Start with 10 FPS and 480px for a balanced result.",
                  "Click \"Convert\" and download your GIF instantly. No watermark, no signup.",
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
                  href="/video-to-gif"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                  Try Video to GIF Free
                </Link>
              </div>
            </section>

            {/* Section 4 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Best Settings for Different Uses</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                There is no one-size-fits-all setting for GIFs. The right resolution and frame rate depend on where the GIF will be used:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Social media (Twitter/X, Reddit, Tumblr)", desc: "480px width, 10 FPS. Keeps file size under 5 MB for fast uploads and smooth playback in feeds." },
                  { label: "Presentations (Google Slides, PowerPoint)", desc: "640px width, 15 FPS. Higher fidelity for large-screen display. Embed directly into slides for auto-playing demos." },
                  { label: "Messaging (Slack, Discord, iMessage)", desc: "320px width, 8 FPS. Chat platforms compress GIFs further, so start small. Aim for under 2 MB for instant loading." },
                  { label: "Documentation and tutorials", desc: "600px width, 12 FPS. Balance clarity and file size. Crop to show only the relevant UI area to save space." },
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
                After converting, you can further optimize the result with our <Link href="/image-compressor" className={toolLink}>Image Compressor</Link> or resize it with the <Link href="/image-resizer" className={toolLink}>Image Resizer</Link>.
              </p>
            </section>

            {/* Section 5 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How to Make Smaller GIFs</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  GIF file sizes can balloon quickly. A 10-second clip at full resolution and 30&nbsp;FPS can easily hit 20&ndash;50&nbsp;MB&mdash;far too large for most platforms. Here are the most effective ways to shrink your GIFs:
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  <strong>Reduce the frame rate.</strong> Dropping from 30&nbsp;FPS to 10&nbsp;FPS cuts the number of frames by two-thirds. Most GIFs look perfectly smooth at 10&ndash;12&nbsp;FPS. Below 8&nbsp;FPS, motion starts to feel choppy.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  <strong>Lower the output width.</strong> A 1920px-wide GIF is overkill for almost every use case. Scale down to 480px or 320px. Since GIF file size grows roughly with the square of the dimensions, halving the width can reduce file size by 75%.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  <strong>Trim the duration.</strong> The single biggest factor in GIF file size is length. Keep GIFs under 5 seconds whenever possible. If you need to show a longer process, consider splitting it into multiple short GIFs.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  <strong>Reduce the color palette.</strong> GIFs support a maximum of 256 colors per frame. Many tools let you reduce this further to 128 or 64 colors, which can cut file size significantly with minimal visual impact on simple animations.
                </p>
              </div>
            </section>

            {/* Section 6 - Pro Tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for Perfect GIFs</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep GIFs under 5 seconds.</strong> Short loops are more engaging and far smaller in file size. If the action takes longer, speed it up or trim to the key moment.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Loop smoothly.</strong> Choose a start and end point where the action naturally resets. A jarring jump between the last and first frame breaks the illusion of a seamless loop.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Consider WebP as an alternative.</strong> If your platform supports it, animated WebP files are 30&ndash;50% smaller than GIFs at the same quality. Convert with our <Link href="/image-to-webp" className={toolLink}>Image to WebP tool</Link>.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Crop before converting.</strong> Remove black bars, unnecessary UI chrome, or dead space from the video before you make the GIF. Less area means fewer pixels and a smaller file.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Test on the target platform.</strong> Slack, Twitter, and Discord all handle GIFs differently. Upload a test GIF to check playback speed and quality before sharing widely.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Optimize images you extract from video.</strong> If you grab a still frame instead, compress it with our <Link href="/image-compressor" className={toolLink}>Image Compressor</Link> for the smallest possible file.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                Converting video to GIF does not have to be complicated. With the right settings&mdash;short duration, reasonable FPS, and a sensible output width&mdash;you can create sharp, lightweight GIFs that work everywhere. Try our free <Link href="/video-to-gif" className={toolLink}>Video to GIF converter</Link> and make your first GIF in seconds. No signup, no watermark, and everything stays in your browser.
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
                  { href: "/video-to-gif", label: "Video to GIF", icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 0A1.125 1.125 0 014.5 4.5h15a1.125 1.125 0 011.125 1.125m-17.25 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h15.75" },
                  { href: "/image-compressor", label: "Image Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/image-resizer", label: "Image Resizer", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" },
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
                  "Why GIFs Still Matter",
                  "Video vs GIF: When to Use Each",
                  "Step-by-Step: Convert with Our Free Tool",
                  "Best Settings for Different Uses",
                  "How to Make Smaller GIFs",
                  "Pro Tips for Perfect GIFs",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            {/* Related Posts */}
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/how-to-compress-images-for-web" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Compress Images for Web
                </Link>
                <Link href="/blog/jpg-vs-png-vs-webp-which-format" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  JPG vs PNG vs WebP — Which Format?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
