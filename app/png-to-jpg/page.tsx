import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const PngToJpgClient = dynamic(() => import("./PngToJpgClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "PNG To JPG Online Free No Upload",
  description:
    "Use PNG To JPG online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "png to jpg",
    "png to jpeg converter",
    "convert png to jpg online",
    "free image converter",
    "png to jpg online free no upload",
    "png to jpeg no signup",
    "convert png to jpg white background",
    "png to jpg converter no watermark",
    "png jpg converter",
  ],
  openGraph: {
    title: "PNG To JPG Online Free No Upload",
    description:
    "Use PNG To JPG online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/png-to-jpg",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/png-to-jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free PNG to JPG Converter Online",
      "url": "https://thepdftools.site/png-to-jpg",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens to transparent areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JPG does not support transparency. Any transparent areas in your PNG will be filled with a white background during conversion.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I control JPG quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use the quality slider to choose a value between 0 and 1. Higher values produce better-looking images with larger file sizes, while lower values create smaller files with some quality loss.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my image uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The entire conversion happens locally in your browser using the HTML Canvas API. Your images never leave your device.",
          },
        },
        {
          "@type": "Question",
          "name": "What's the difference between PNG and JPG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PNG is a lossless format that supports transparency, making it ideal for graphics and logos. JPG uses lossy compression, producing much smaller files suited for photographs and web images where transparency is not needed.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "PNG to JPG", "item": "https://thepdftools.site/png-to-jpg" },
      ],
    },
  ],
};

export default function PngToJpgPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                PNG to JPG
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert PNG to JPG
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for smaller file sizes
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert PNG images to JPG format instantly in your browser. Adjust
                quality, handle transparency with a white background — download your
                JPG in seconds.
              </p>
            </div>

            <div className="mt-8">
              <PngToJpgClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for file size",
                  text: "JPG files are significantly smaller than PNG — perfect for sharing and storage.",
                },
                {
                  title: "Best for photos",
                  text: "JPG compression is optimized for photographs with smooth color gradients.",
                },
                {
                  title: "Best for privacy",
                  text: "All conversion happens in your browser — no files uploaded anywhere.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIPS + BEST FOR SIDEBAR */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use JPG for photographs and images without transparency.</li>
              <li>Higher quality settings produce larger files — find the right balance.</li>
              <li>JPG doesn&apos;t support transparency — white background will replace it.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Photo sharing", "Email attachments", "Blog images", "Social media uploads"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO CONTENT SECTIONS */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Popular PNG to JPG pages
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use these focused landing pages when you want a more specific PNG
              to JPG workflow for photos, general conversion intent, or
              transparency handling.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/convert-png-to-jpg-online-free" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                Convert PNG to JPG Online Free
              </Link>
              <Link href="/png-to-jpg-for-photos" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PNG to JPG for Photos
              </Link>
              <Link href="/png-to-jpg-white-background" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PNG to JPG White Background
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert PNG to JPG Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Drag and drop your PNG image into the upload area above, or click to browse and select a file from your device.</li>
              <li>Use the quality slider to set your preferred JPEG compression level — higher values mean better quality but larger files.</li>
              <li>Transparent areas in the PNG are automatically filled with a clean white background since JPG does not support transparency.</li>
              <li>Preview the converted JPG and compare the file size reduction against the original PNG.</li>
              <li>Click download to save the optimized JPG file to your device instantly.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PNG to JPG Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Smaller File Size</h3>
                <p className="mt-1 text-sm text-slate-500">JPG files are dramatically smaller than PNGs, often 60-80% lighter. Converting PNG to JPG is the fastest way to reduce image file size for email attachments, blog posts, and social media uploads.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Adjustable Quality</h3>
                <p className="mt-1 text-sm text-slate-500">Fine-tune the JPG compression level with our quality slider. Find the perfect balance between visual fidelity and file size — useful when you need to meet specific upload size limits.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">White Background for Transparency</h3>
                <p className="mt-1 text-sm text-slate-500">Since JPG does not support alpha channels, our converter automatically composites transparent PNG areas onto a white background, producing a clean and professional result every time.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Lightning-Fast Conversion</h3>
                <p className="mt-1 text-sm text-slate-500">The entire conversion happens locally in your browser using the HTML Canvas API. There is no upload queue, no waiting for server processing, and no file-size restriction imposed by a remote server.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "What happens to transparent areas in my PNG?",
                  a: "JPG does not support transparency. When you convert a PNG with transparent regions, our tool automatically fills those areas with a solid white background. This ensures the output looks clean and professional rather than displaying random noise or black fills that some other converters produce.",
                },
                {
                  q: "Can I control the output JPG quality?",
                  a: "Yes. Use the quality slider to choose a compression level between 0 and 1. A value of 0.92 is a good default that balances quality and size. Lower values create smaller files with visible compression artifacts, while higher values preserve more detail at the cost of larger file sizes.",
                },
                {
                  q: "Is my image uploaded to a server?",
                  a: "No. The entire PNG-to-JPG conversion happens locally in your web browser using the native HTML Canvas API. Your images never leave your device, making this tool completely safe for sensitive or personal photos. It even works offline once the page has loaded.",
                },
                {
                  q: "What is the difference between PNG and JPG?",
                  a: "PNG is a lossless format that preserves every pixel and supports transparency, making it ideal for graphics, logos, and screenshots. JPG uses lossy compression to produce much smaller files, which is better for photographs and web images where transparency is not needed. Converting PNG to JPG is the most effective way to reduce file size for photo-heavy content.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Our free online PNG to JPG converter helps you quickly reduce image file sizes without sacrificing visual quality. PNG files are excellent for graphics that require transparency and lossless editing, but they are often far too large for everyday use on websites, in emails, or on social media platforms. By converting PNG to JPG, you can shrink file sizes by 60 to 80 percent while maintaining a level of quality that is virtually indistinguishable to the human eye at higher compression settings. This converter is entirely browser-based, meaning your images are processed using the HTML Canvas API directly on your device. No files are uploaded to any server, no account is required, and there are no daily limits on how many images you can convert. The tool works seamlessly on Windows, macOS, Linux, iOS, and Android in any modern web browser. For web developers, converting large PNG screenshots and hero images to JPG can dramatically improve page load times and Core Web Vitals scores. For bloggers and content creators, smaller JPG files upload faster and consume less bandwidth. For photographers, the adjustable quality slider lets you find the exact balance between fidelity and file size for client deliverables, portfolio galleries, or print submissions. Transparent PNG regions are automatically composited onto a white background so the output always looks professional. Whether you need to convert a single PNG to JPEG for a quick email attachment or process dozens of images for a website migration, this tool delivers fast, private, and reliable results every time. Try our PNG to JPG converter now and see how much space you can save.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Conversion Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="png-to-jpg" />
        </div>
      </div>
    </div>
  );
}
