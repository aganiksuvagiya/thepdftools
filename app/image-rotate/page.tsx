import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const ImageRotateClient = dynamic(() => import("./ImageRotateClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Image Rotate Online Free No Upload",
  description:
    "Use Image Rotate online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "image rotate",
    "rotate image online",
    "flip image",
    "mirror image",
    "rotate jpg",
    "rotate png",
    "free image rotate",
    "image flip tool",
  ],
  openGraph: {
    title: "Image Rotate Online Free No Upload",
    description:
    "Use Image Rotate online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/image-rotate",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Free Image Rotate & Flip Tool - thepdftools.site",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-rotate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free Image Rotate & Flip Tool",
      url: "https://thepdftools.site/image-rotate",
      description:
        "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically.",
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
      "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I rotate by a custom angle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! In addition to quick 90° and 180° presets, you can enter any custom angle from 0° to 360° using the angle slider or input field. The preview updates in real time so you can fine-tune the rotation.",
        },
      },
      {
        "@type": "Question",
        name: "Does rotating reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rotations at 90°, 180°, and 270° are lossless. Custom angle rotations use high-quality canvas rendering to preserve as much detail as possible. You can also choose your output format and quality level.",
        },
      },
      {
        "@type": "Question",
        name: "Can I flip and rotate at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. You can combine any rotation with a horizontal or vertical flip. All transformations are applied together and previewed in real time before you download.",
        },
      },
      {
        "@type": "Question",
        name: "What formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool supports JPG, PNG, and WebP images. You can rotate or flip any of these formats and download the result in the same format or convert to another supported format.",
        },
      },
    ],
  },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Image Rotate", "item": "https://thepdftools.site/image-rotate" },
      ],
    },
  ],
};

export default function ImageRotatePage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Image Rotate
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Rotate images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  to any angle
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Rotate JPG, PNG, and WebP images by any angle, flip horizontally or
                vertically — all instantly in your browser. No upload, no server,
                completely private.
              </p>
            </div>

            <div className="mt-8">
              <ImageRotateClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for orientation", text: "Fix sideways or upside-down photos with precise rotation controls." },
                { title: "Best for creativity", text: "Rotate images to any custom angle for unique compositions and layouts." },
                { title: "Best for privacy", text: "All rotation happens in your browser — images never leave your device." },
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
              <li>Use 90° rotations to fix portrait/landscape orientation.</li>
              <li>Fine-tune rotation angle for precise alignment.</li>
              <li>Preview the result before downloading.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Photo correction", "Social media content", "Document scanning", "Creative projects"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Rotate or Flip an Image Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging it into the drop zone or clicking to browse. JPG, PNG, and WebP formats are supported.</li>
              <li>Use the quick-rotate buttons to rotate your image 90 degrees clockwise or counter-clockwise, or enter any custom angle from 0 to 360 degrees.</li>
              <li>Flip the image horizontally to create a mirror image, or flip vertically to turn it upside down. Combine flips with rotation for any orientation.</li>
              <li>Preview the transformed image in real time — adjustments are applied instantly so you can fine-tune the angle before downloading.</li>
              <li>Click download to save the rotated or flipped image. Choose your preferred output format and quality level.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Image Rotate &amp; Flip Tool?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Any Angle Rotation</h3>
                <p className="mt-1 text-sm text-slate-500">Go beyond the standard 90-degree increments. Enter any custom angle from 0 to 360 degrees to straighten horizons, correct tilted scans, or create artistic compositions with pixel-level precision.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Flip Horizontal &amp; Vertical</h3>
                <p className="mt-1 text-sm text-slate-500">Mirror your image along the horizontal or vertical axis with a single click. Perfect for creating reflections, correcting selfie-mode flips, or preparing images for print transfers.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Real-Time Preview</h3>
                <p className="mt-1 text-sm text-slate-500">Every rotation and flip is rendered instantly in your browser so you can see the exact result before downloading. No guesswork, no waiting — adjust until the image looks perfect.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Quality Loss</h3>
                <p className="mt-1 text-sm text-slate-500">Rotations at 90, 180, and 270 degrees are lossless. Custom-angle rotations use high-quality canvas rendering to preserve maximum detail. You control the output format and compression level.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I rotate by a custom angle instead of just 90 degrees?", a: "Yes. In addition to the quick 90-degree and 180-degree preset buttons, you can enter any custom angle from 0 to 360 degrees using the angle slider or the numeric input field. The preview updates in real time so you can fine-tune the rotation until the horizon is perfectly level or the composition looks exactly right." },
                { q: "Does rotating an image reduce its quality?", a: "Rotations at exact 90-degree increments (90, 180, 270) are lossless because they simply rearrange pixels without any interpolation. Custom-angle rotations require sub-pixel rendering, but our tool uses high-quality bicubic-equivalent canvas rendering to preserve as much detail as possible. You can also choose your output format and compression level for full control." },
                { q: "Can I flip and rotate an image at the same time?", a: "Absolutely. You can combine any rotation angle with a horizontal flip, a vertical flip, or both. All transformations are composited together and previewed in real time before you download, so you always know exactly what the final image will look like." },
                { q: "What image formats are supported?", a: "The rotate and flip tool supports JPG, PNG, and WebP images. You can upload any of these formats and download the result in the same format or convert to a different supported format during the process. This flexibility makes it easy to rotate a photo and change its format in a single step." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free online image rotate and flip tool gives you complete control over image orientation without installing any software. Whether you need to rotate a photo 90 degrees to fix a sideways smartphone picture, straighten a slightly tilted scan by a few degrees, mirror a selfie that was taken in front-facing mode, or flip an image vertically for a creative project, this tool handles it all instantly inside your browser. The entire process runs locally using the HTML Canvas API, meaning your images never leave your device and are never uploaded to any external server. This makes the tool completely private and suitable for sensitive personal photos, confidential business documents, and professional photography work. The real-time preview lets you see every adjustment as you make it, eliminating guesswork and saving time. For photographers, the custom-angle rotation is invaluable for correcting horizon lines and composition tilt. For graphic designers, the flip function creates mirror images needed for print layouts, symmetrical designs, and reflection effects. For e-commerce sellers, rotating product photos to a consistent orientation improves the visual consistency of your listings. The tool supports JPG, PNG, and WebP formats with full control over output quality and format selection. There are no watermarks added to your images, no daily usage limits, and no account signup required. It works on every modern browser across Windows, macOS, Linux, iOS, and Android devices. Rotate images online, flip photos horizontally, mirror images vertically, and download the results in seconds — completely free.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Image Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/image-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Watermark</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="image-rotate" />
        </div>
      </div>
    </div>
  );
}
