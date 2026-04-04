import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageResizerClient = dynamic(() => import("./ImageResizerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Resizer Online — Resize Images to Any Size",
  description:
    "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly. No upload, no signup — runs in your browser.",
  keywords: [
    "image resizer",
    "resize image online",
    "image dimensions",
    "resize jpg",
    "resize png",
    "free image resizer",
    "resize photo online",
    "change image size",
    "bulk image resizer",
    "resize image in pixels",
  ],
  openGraph: {
    title: "Free Image Resizer Online — Resize Images to Any Size",
    description:
      "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-resizer",
    images: [
      {
        url: "https://thepdftools.site/og-image-resizer.png",
        width: 1200,
        height: 630,
        alt: "Free Image Resizer Tool - thepdftools.site",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-resizer",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Image Resizer Tool",
    url: "https://thepdftools.site/image-resizer",
    description:
      "Resize JPG, PNG, and WebP images for free online. Set custom width and height, lock aspect ratio, and download instantly.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I resize multiple images at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can drop or select multiple images at once and apply the same dimensions to all of them. Each resized image can be downloaded individually or as a batch.",
        },
      },
      {
        "@type": "Question",
        name: "Will resizing reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enlarging images beyond their original size may reduce sharpness, but downscaling preserves quality. The tool uses high-quality canvas rendering with smooth interpolation to give you the best possible result.",
        },
      },
      {
        "@type": "Question",
        name: "What preset sizes are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common presets include social media sizes (Instagram, Facebook, Twitter), standard web dimensions, and custom sizes. You can also enter any exact pixel width and height you need.",
        },
      },
      {
        "@type": "Question",
        name: "Can I change the output format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can resize your image and download it as JPG, PNG, or WebP regardless of the original format. This lets you resize and convert in a single step.",
        },
      },
    ],
  },
];

export default function ImageResizerPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                Image Resizer
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Resize images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  to any dimension
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Resize JPG, PNG, and WebP images to any dimension instantly in your
                browser. Lock aspect ratio, batch resize, and download — no upload,
                no server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <ImageResizerClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for websites",
                  text: "Resize images to exact pixel dimensions for faster page loads and better Core Web Vitals.",
                },
                {
                  title: "Best for social media",
                  text: "Quickly resize photos to fit Instagram, Facebook, Twitter, and LinkedIn requirements.",
                },
                {
                  title: "Best for privacy",
                  text: "All resizing happens locally in your browser with no server uploads.",
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
              <li>Lock aspect ratio to avoid stretching or distortion.</li>
              <li>Use exact pixel dimensions for web banners and social headers.</li>
              <li>Resize before uploading to reduce page load times.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Web banners", "Social media posts", "Email headers", "Profile pictures"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Resize Images Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image resizer supports JPG, PNG, and WebP files of any dimension.</li>
              <li>Set your desired width and height in pixels, or choose from preset sizes for social media platforms. Lock the aspect ratio to prevent distortion when changing image dimensions.</li>
              <li>Click resize and download your image instantly. The resized file maintains optimal quality and is ready for use on websites, social media, or print.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Image Resizer?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Social Media Preset Sizes</h3>
                <p className="mt-1 text-sm text-slate-500">Quickly resize photos for Instagram posts, Facebook covers, Twitter headers, YouTube thumbnails, and LinkedIn banners with one-click preset dimensions.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Aspect Ratio Lock</h3>
                <p className="mt-1 text-sm text-slate-500">Maintain perfect proportions when resizing. Lock the aspect ratio so your image scales uniformly without stretching or squishing the subject.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Batch Resize Multiple Images</h3>
                <p className="mt-1 text-sm text-slate-500">Upload and resize multiple images at once to the same dimensions. Perfect for preparing product photos, portfolio images, or social media content in bulk.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Output Formats</h3>
                <p className="mt-1 text-sm text-slate-500">Resize and convert your images to JPG, PNG, or WebP in a single step. Choose the best format for your needs, whether it is web optimization, transparency, or compatibility.</p>
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
                  q: "Can I resize an image without losing quality?",
                  a: "When downscaling images, quality is fully preserved. Enlarging beyond the original resolution may introduce slight softness, but our tool uses high-quality canvas interpolation with smooth rendering to deliver the best possible result at any size.",
                },
                {
                  q: "What social media sizes are available as presets?",
                  a: "Presets include Instagram post (1080x1080), Instagram story (1080x1920), Facebook cover (820x312), Twitter header (1500x500), YouTube thumbnail (1280x720), LinkedIn banner (1584x396), and more. You can also enter any custom pixel dimensions.",
                },
                {
                  q: "Can I resize multiple images at once?",
                  a: "Yes. You can upload multiple images at once and apply the same dimensions to all of them. Each resized image can be downloaded individually, making batch processing fast and efficient for bulk image resizer needs.",
                },
                {
                  q: "What is the maximum image size I can resize?",
                  a: "There is no fixed limit. Since resizing happens entirely in your browser, the maximum depends on your device memory. Most images up to 50 megapixels work smoothly on modern devices. No files are uploaded to any server.",
                },
                {
                  q: "Can I change the output format while resizing?",
                  a: "Yes. You can resize your image and save it as JPG, PNG, or WebP regardless of the original format. This lets you resize and convert in a single step, perfect for optimizing images for web use or maintaining transparency with PNG.",
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
              Resizing images is one of the most common tasks in digital media workflows. Web developers resize images online to meet responsive design requirements and improve page load performance across desktop and mobile devices. Social media managers need to resize photos for social media platforms that each have unique dimension requirements, from square Instagram posts to wide-format Twitter headers and tall Pinterest pins. E-commerce professionals use a bulk image resizer to standardize product photos across their catalog, ensuring consistent presentation on marketplaces and storefronts. Photographers resize high-resolution images for client galleries, portfolio websites, and print fulfillment services. Our free image resizer tool runs entirely in your browser, ensuring that your original files never leave your device. You can change image dimensions to any custom width and height, use aspect ratio locking to maintain proportions, and select from popular social media presets that eliminate guesswork. The tool uses high-quality canvas rendering with bicubic interpolation to produce sharp, clean results whether you are scaling down a large camera RAW export or preparing images for a WordPress blog. Content creators, marketers, designers, and developers all benefit from having a fast, private, and reliable online image resizer that handles single files or batch processing without signups, watermarks, or file size restrictions. Whether you need to resize an image for a Google Ads campaign, an email newsletter header, a mobile app splash screen, or a print-ready flyer, this tool delivers pixel-perfect results every time.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Image Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-cropper" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Cropper</Link>
              <Link href="/image-upscaler" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">AI Image Upscaler</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
