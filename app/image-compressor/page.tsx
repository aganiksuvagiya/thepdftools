import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageCompressorClient = dynamic(() => import("./ImageCompressorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Compressor Online — Reduce Image Size Without Quality Loss",
  description:
    "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality. No upload, no signup — runs in your browser.",
  keywords: [
    "image compressor",
    "compress image online",
    "compress image online free",
    "reduce image size",
    "jpg compressor",
    "png compressor",
    "compress jpg online free no upload",
    "compress png online free",
    "image size reducer online",
    "reduce jpg size online",
    "image compressor no signup",
    "free image compression",
    "compress jpeg online",
    "compress webp online",
    "reduce photo size",
    "compress images for website",
  ],
  openGraph: {
    title: "Free Image Compressor Online — Reduce Image Size Without Quality Loss",
    description:
      "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-compressor",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-compressor",
  },
};

export default function ImageCompressorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Image Compressor",
        url: "https://thepdftools.site/image-compressor",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to compress images here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your images never leave your browser. All compression is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can compress JPG, PNG, or WebP images online for free and download the optimized result instantly.",
            },
          },
          {
            "@type": "Question",
            name: "How much can I reduce file size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Up to 90% reduction depending on the original image and quality settings. You can adjust the quality slider to find the perfect balance between file size and visual quality.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens in your browser, so it depends on your device's memory. Most images up to 50MB work smoothly.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "Image Compressor", "item": "https://thepdftools.site/image-compressor" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                Fast Image Compression
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Compress images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  without the heavy file size
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload a JPG, PNG, or WebP file and compress it instantly in your browser.
                Use this free image size reducer with no signup, no server upload,
                and no extra steps.
              </p>
            </div>

            <div className="mt-8">
              <ImageCompressorClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for websites",
                  text: "Improve page speed and Core Web Vitals with smaller image files.",
                },
                {
                  title: "Best for uploads",
                  text: "Share faster to social media, email, portfolios, and stores.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing.",
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

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use `70%–85%` quality for most website images.</li>
              <li>Choose WebP when you want better compression than JPG.</li>
              <li>Compress JPG, PNG, and WebP images before uploading to blogs, stores, and landing pages.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Blog images", "Product photos", "Email attachments", "Portfolio uploads"].map((item) => (
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

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Compress Images Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image compressor supports JPG, PNG, and WebP formats.</li>
              <li>Adjust the quality slider to find the ideal balance between file size and visual clarity. Preview the compressed result in real time before downloading.</li>
              <li>Download your compressed image instantly. The optimized file is ready for use on websites, social media, or email attachments.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Image Compressor?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your images never leave your device. All compression happens locally in your browser using JavaScript, keeping your photos 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Supports All Major Formats</h3>
                <p className="mt-1 text-sm text-slate-500">Compress JPEG, PNG, and WebP images effortlessly. Our jpg compressor and png compressor handle every common image format used on the web today.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Up to 90% File Size Reduction</h3>
                <p className="mt-1 text-sm text-slate-500">Dramatically reduce image size without losing visible quality. Compress photos for faster page loads, smaller email attachments, and optimized storage.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Batch Compression Support</h3>
                <p className="mt-1 text-sm text-slate-500">Compress multiple images at once. Upload an entire batch and download all optimized files in seconds, saving you time on large projects.</p>
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
                  q: "Is it safe to compress images here?",
                  a: "Absolutely. Your images never leave your browser. All compression runs client-side using JavaScript, so no data is uploaded to any server. Your files remain completely private on your device.",
                },
                {
                  q: "What image formats does the compressor support?",
                  a: "Our image compressor fully supports JPG/JPEG, PNG, and WebP formats. Whether you need a jpg compressor for photographs or a png compressor for graphics with transparency, this tool handles it all.",
                },
                {
                  q: "How much can I reduce the file size?",
                  a: "You can reduce image size by up to 90% depending on the original file and your chosen quality settings. The quality slider lets you fine-tune the compression level so you can compress photos without losing quality that matters.",
                },
                {
                  q: "Is there a file size limit?",
                  a: "There is no hard file size limit. Since all processing happens in your browser, performance depends on your device memory. Most images up to 50MB compress smoothly on modern devices.",
                },
                {
                  q: "Will compressing my images cause quality loss?",
                  a: "Our compressor uses intelligent algorithms to reduce file size while preserving visual quality. At moderate compression levels, the difference is usually imperceptible. You can preview the result before downloading.",
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
              Image compression is essential for anyone working with digital media. Whether you need to compress images for your website to improve page load speed and Core Web Vitals scores, reduce image size for email attachments that exceed file limits, or optimize photos for social media platforms like Instagram, Facebook, and Twitter, our free online image compressor delivers professional results. Unlike other tools that require uploading your files to remote servers, this jpg compressor and png compressor processes everything locally in your browser, ensuring complete privacy. Web developers rely on image compression to reduce bandwidth costs and deliver faster user experiences. Bloggers and content creators use it to keep their media libraries lean without sacrificing the visual impact of their photography. E-commerce store owners compress product images to ensure quick page loads that drive conversions.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Image Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PNG to JPG</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
