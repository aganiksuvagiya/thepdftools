import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const VideoToGifClient = dynamic(() => import("./VideoToGifClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Video to GIF Converter Online — Convert MP4 to GIF Instantly",
  description:
    "Convert MP4, WebM, MOV, and AVI videos to GIF format free online. Adjust FPS, width, quality, and trim duration. No upload required — conversion happens in your browser.",
  keywords: [
    "video to gif",
    "mp4 to gif",
    "convert video to gif",
    "video to gif converter",
    "mp4 to gif online free",
    "make gif from video",
    "video gif maker",
    "online gif converter",
    "webm to gif",
    "mov to gif",
  ],
  openGraph: {
    title: "Free Video to GIF Converter Online — Convert MP4 to GIF Instantly",
    description:
      "Convert MP4, WebM, MOV, and AVI videos to GIF format free online. Adjust FPS, width, quality, and trim duration. Runs entirely in your browser.",
    url: "https://thepdftools.site/video-to-gif",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Video to GIF Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/video-to-gif",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Video to GIF Converter Online",
      "url": "https://thepdftools.site/video-to-gif",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert MP4, WebM, MOV, and AVI videos to GIF format free online. Adjust FPS, width, quality, and trim duration. Runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I convert a video to GIF online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply drag and drop your video file into the converter, choose your desired settings like FPS, width, and quality, then click Convert to GIF. The conversion runs entirely in your browser with no server upload required.",
          },
        },
        {
          "@type": "Question",
          "name": "What video formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our converter supports all major video formats including MP4, WebM, MOV, and AVI. Any video format that your browser can play will work with the converter.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I trim the video before converting to GIF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can set a custom start time and duration to extract only the portion of the video you want to convert. This helps keep your GIF file size manageable.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the best FPS for a GIF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most use cases, 10 to 15 FPS provides a good balance between smooth animation and file size. Higher FPS like 20 produces smoother motion but significantly larger files. For simple animations, 5 FPS may be sufficient.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a file size limit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no hard file size limit since the conversion runs entirely in your browser. However, very large or long videos may take more time to process. We recommend keeping GIFs under 10 seconds for best results.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Video to GIF", "item": "https://thepdftools.site/video-to-gif" },
      ],
    },
  ],
};

export default function VideoToGifPage() {
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
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video to GIF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert Video to GIF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  in seconds, right in your browser
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Turn any MP4, WebM, or MOV video into an animated GIF instantly.
                Adjust frame rate, width, quality, and trim duration — no server
                upload required.
              </p>
            </div>

            <div className="mt-8">
              <VideoToGifClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for social media", text: "Create shareable GIFs from video clips for Twitter, Slack, Discord, and more." },
                { title: "Best for presentations", text: "Add animated GIFs to slides and documents to illustrate workflows and demos." },
                { title: "Best for privacy", text: "Conversion runs entirely in your browser — your video never leaves your device." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Keep GIFs under 10 seconds for smaller file sizes and faster loading.</li>
              <li>Lower FPS (5-10) works great for tutorials; higher FPS (15-20) for smooth motion.</li>
              <li>Use the start time and duration sliders to trim before converting.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Social media posts", "Chat reactions", "Tutorials", "Product demos"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Video to GIF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Drag and drop an MP4, WebM, MOV, or AVI video into the upload area, or click to browse your files.</li>
              <li>Preview your video and adjust settings: frame rate, output width, quality, start time, and duration.</li>
              <li>Click the Convert to GIF button. The converter processes your video frame-by-frame using the Canvas API in your browser.</li>
              <li>Preview the generated GIF and check the output file size.</li>
              <li>Click download to save the GIF to your device. Adjust settings and re-convert if needed.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Video to GIF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Browser-Based</h3>
                <p className="mt-1 text-sm text-slate-500">Your video is never uploaded to any server. All processing happens locally in your browser using the Canvas API and modern JavaScript, making it completely private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Full Control Over Output</h3>
                <p className="mt-1 text-sm text-slate-500">Choose your preferred frame rate, output width, quality level, and trim settings. Fine-tune every parameter to get the perfect balance between animation smoothness and file size.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Format Support</h3>
                <p className="mt-1 text-sm text-slate-500">Works with all major video formats including MP4, WebM, MOV, and AVI. Any video that your browser can play will convert seamlessly to GIF without any plugins or extensions.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Registration Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start converting videos to GIFs immediately with no account, no watermarks, no daily limits, and no hidden costs. The tool is completely free and always will be.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How do I convert a video to GIF online?", a: "Simply drag and drop your video file into the converter, choose your desired settings like frame rate, output width, and quality, optionally set a start time and duration to trim, then click Convert to GIF. The entire conversion runs in your browser with no upload needed." },
                { q: "What video formats are supported?", a: "Our converter supports all major video formats including MP4, WebM, MOV, and AVI. Essentially any video format that your browser can natively play will work seamlessly with the converter." },
                { q: "Can I trim the video before converting to GIF?", a: "Yes, you can set a custom start time and duration using the slider controls to extract only the exact portion of the video you want to turn into a GIF. This is especially useful for keeping file sizes manageable." },
                { q: "What FPS should I use for my GIF?", a: "For most use cases, 10 to 15 FPS provides a good balance between smooth animation and reasonable file size. Use 5 FPS for simple step-by-step tutorials, and 15 to 20 FPS when you need smoother motion like screen recordings or action clips." },
                { q: "Is there a file size or duration limit?", a: "There is no hard limit since everything runs in your browser. However, very long or high-resolution videos will take longer to process and produce larger GIF files. For best results, we recommend keeping GIFs under 10 seconds and using a width of 480 pixels or less." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* SEO paragraph */}
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Our free video to GIF converter is the easiest way to turn any video clip into an animated GIF directly in your browser. Whether you want to create a reaction GIF from a movie scene, build a quick tutorial animation, capture a product demo, or make a shareable meme, this tool handles it all without any software installation or server upload. The converter supports MP4, WebM, MOV, and AVI video formats and gives you complete control over the output with adjustable frame rate, width, quality, and trim settings. GIF remains one of the most universally supported image formats on the internet, working everywhere from email signatures and Slack messages to Twitter posts and GitHub README files. Unlike video embeds, GIFs autoplay silently and loop continuously, making them perfect for quick demonstrations and eye-catching social media content. Our converter extracts frames from your video using the HTML5 Canvas API and encodes them into a high-quality GIF using a modern color quantization algorithm, all running locally on your device. This means your videos stay completely private and the tool works offline once the page has loaded. There are no watermarks, no daily conversion limits, no file size restrictions, and no account registration required. The tool works on any device with a modern browser including Windows, macOS, Linux, iOS, and Android. For optimal results, keep your GIFs under 10 seconds, choose 10 FPS for a good size-to-smoothness ratio, and use 480 pixels width for social media sharing. Convert your first video to GIF today and see how simple it is.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/svg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">SVG to PNG</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
