import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageCropperClient = dynamic(() => import("./ImageCropperClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Cropper Online — Crop Images Instantly",
  description:
    "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly. No upload, no signup — runs in your browser.",
  keywords: [
    "image cropper",
    "crop image online",
    "crop photo",
    "crop jpg",
    "crop png",
    "free image cropper",
    "aspect ratio crop",
  ],
  openGraph: {
    title: "Free Image Cropper Online — Crop Images Instantly",
    description:
      "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly. Runs entirely in your browser.",
    url: "https://thepdftools.site/image-cropper",
    images: [
      {
        url: "https://thepdftools.site/og-image-cropper.png",
        width: 1200,
        height: 630,
        alt: "Image Cropper - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/image-cropper",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image Cropper Online",
      "url": "https://thepdftools.site/image-cropper",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Crop JPG, PNG, and WebP images for free online. Select any region, choose preset aspect ratios, and download instantly.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What aspect ratios are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tool includes common presets such as 1:1 (square), 4:3, 16:9, 3:2, and free-form selection so you can crop to any custom region.",
          },
        },
        {
          "@type": "Question",
          "name": "Does cropping reduce image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Cropping simply removes the pixels outside the selected area. The remaining pixels retain their original quality with no recompression.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I crop transparent PNGs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The cropper preserves the alpha channel, so transparent areas in your PNG remain transparent after cropping.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a size limit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no fixed limit. Because the tool runs entirely in your browser, the maximum size depends on your device's available memory. Most images up to 50 MP work smoothly.",
          },
        },
      ],
    },
  ],
};

export default function ImageCropperPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Image Cropper
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Crop images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  to the perfect frame
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Crop JPG, PNG, and WebP images to any region instantly in your
                browser. Choose preset aspect ratios or free-form selection — no
                upload, no server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <ImageCropperClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for social media",
                  text: "Crop images to perfect aspect ratios for Instagram, Facebook, and Twitter posts.",
                },
                {
                  title: "Best for profiles",
                  text: "Create square or circular crops for profile pictures and avatars.",
                },
                {
                  title: "Best for privacy",
                  text: "All cropping runs locally in your browser — your images stay private.",
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
              <li>Use preset aspect ratios for standard social media sizes.</li>
              <li>Zoom in on the area of interest before cropping for best results.</li>
              <li>Crop before resizing to maintain the highest possible quality.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Profile pictures", "Social media posts", "Thumbnails", "Product images"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Crop Images Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image cropper supports JPG, PNG, and WebP formats of any size.</li>
              <li>Select the area you want to keep by dragging the crop handles. Choose a preset aspect ratio like 1:1, 16:9, or 4:3, or use free-form selection for custom dimensions.</li>
              <li>Click crop and download your perfectly framed image instantly. The cropped result preserves full original quality with no recompression artifacts.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Image Cropper?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Preset Aspect Ratios</h3>
                <p className="mt-1 text-sm text-slate-500">Crop to standard ratios including 1:1 for profile pictures, 16:9 for video thumbnails, 4:3 for presentations, and 3:2 for photography. One click sets the perfect proportion.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Free-Form Crop Selection</h3>
                <p className="mt-1 text-sm text-slate-500">Need a custom crop? Use free-form selection to drag any rectangular area on your image. Crop a picture to size with pixel-perfect precision for any use case.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Preserves Full Image Quality</h3>
                <p className="mt-1 text-sm text-slate-500">Cropping removes only the pixels outside your selection. The remaining image retains its original resolution and quality with zero recompression or degradation.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Social Media Ready Sizes</h3>
                <p className="mt-1 text-sm text-slate-500">Quickly crop photos for Instagram squares, Facebook posts, YouTube thumbnails, and Twitter headers. Get the exact dimensions each platform requires in seconds.</p>
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
                  q: "What aspect ratios are available?",
                  a: "The tool includes common presets such as 1:1 (square), 4:3 (standard), 16:9 (widescreen), 3:2 (photography), and free-form selection so you can crop to any custom region. These cover virtually every use case from social media to print.",
                },
                {
                  q: "Does cropping reduce image quality?",
                  a: "No. Cropping simply removes the pixels outside the selected area. The remaining pixels retain their original quality with no recompression. Your cropped image will be just as sharp and clear as the original within the selected region.",
                },
                {
                  q: "Can I crop transparent PNG images?",
                  a: "Yes. The cropper fully preserves the alpha channel, so transparent areas in your PNG remain transparent after cropping. This makes it ideal for cropping logos, icons, and graphics that require transparency.",
                },
                {
                  q: "Is there a maximum image size limit?",
                  a: "There is no fixed limit. Because the tool runs entirely in your browser, the maximum size depends on your device available memory. Most images up to 50 megapixels work smoothly on modern devices without any issues.",
                },
                {
                  q: "Is my image uploaded to a server?",
                  a: "No. All image cropping happens locally in your browser using JavaScript. Your files are never uploaded to any server, ensuring complete privacy and security for personal or sensitive images.",
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
              Image cropping is a fundamental editing task used across photography, design, social media, and web development. Whether you need to crop an image online for a profile picture, prepare a thumbnail for a blog post, or trim unnecessary borders from a screenshot, our free image cropper delivers precise results in seconds. Social media platforms each require specific dimensions: Instagram demands square 1:1 images for grid posts, YouTube needs 16:9 thumbnails, and Facebook cover photos use unique landscape proportions. Our aspect ratio crop presets eliminate the guesswork, letting you select the right ratio with a single click. Photographers use cropping to improve composition, remove distracting elements from the edges of a frame, and focus attention on the subject. Designers crop photos to fit specific layout dimensions in websites, brochures, and marketing materials. E-commerce professionals crop product images to create uniform, consistent galleries that look professional and build buyer trust. This free online image cropper preserves the full quality of your original image because cropping is a non-destructive operation that simply extracts the selected pixel region. Unlike tools that recompress your image after editing, our cropper outputs the exact pixels you selected without additional compression artifacts. The tool handles JPG, PNG with transparency, and WebP formats seamlessly. Whether you are preparing passport photos, creating social media content, building a website gallery, or trimming screenshots for documentation, this crop photo free tool runs entirely in your browser with no signup, no watermarks, and complete privacy. Professional results are just a few clicks away.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Image Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Background Remover</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
