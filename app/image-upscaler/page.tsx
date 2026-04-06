import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageUpscalerClient = dynamic(() => import("./ImageUpscalerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free AI Image Upscaler Online — Enhance Image Quality",
  description:
    "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation. No upload, no signup — runs in your browser.",
  keywords: [
    "image upscaler",
    "upscale image online",
    "enhance image quality",
    "increase image resolution",
    "ai image upscaler",
    "free image upscaler",
  ],
  openGraph: {
    title: "Free AI Image Upscaler Online — Enhance Image Quality",
    description:
      "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-upscaler",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-upscaler",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free AI Image Upscaler",
      url: "https://thepdftools.site/image-upscaler",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Upscale and enhance images for free online. Increase resolution by 2x, 3x, or 4x with smooth interpolation.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the image upscaler work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The upscaler uses high-quality canvas interpolation to increase image resolution by 2x, 3x, or 4x while maintaining smooth edges and details.",
          },
        },
        {
          "@type": "Question",
          name: "What image formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can upscale any of these formats and download the enhanced result instantly.",
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
        { "@type": "ListItem", "position": 2, "name": "Image Upscaler", "item": "https://thepdftools.site/image-upscaler" },
      ],
    },
  ],
};

export default function ImageUpscalerPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
                AI Image Upscaler
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Upscale images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  with AI enhancement
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upscale and enhance your images by 2x, 3x, or 4x instantly in your
                browser. High-quality interpolation for crisp, clear results — no
                upload, no server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <ImageUpscalerClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for enlarging", text: "Scale up small images while maintaining sharpness and detail." },
                { title: "Best for printing", text: "Increase resolution for print-quality results from low-res originals." },
                { title: "Best for privacy", text: "AI processing runs locally in your browser for complete privacy." },
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
              <li>2x upscaling gives the best quality-to-size ratio.</li>
              <li>Start with the highest quality source image available.</li>
              <li>Best results with photos rather than heavily compressed images.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Print preparation", "Social media", "Presentation graphics", "Photo restoration"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Upscale Images Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image upscaler accepts JPG, PNG, and WebP files of any size.</li>
              <li>Choose your desired scale factor: 2x, 3x, or 4x. The tool will increase image resolution while maintaining sharp details and smooth edges using high-quality interpolation.</li>
              <li>Download your enhanced, higher-resolution image instantly. The upscaled file is ready for print, large-format display, or any use requiring greater detail.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Image Upscaler?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Up to 4x Resolution Increase</h3>
                <p className="mt-1 text-sm text-slate-500">Upscale images by 2x, 3x, or 4x their original dimensions. Transform a 500x500 image into a crisp 2000x2000 output, perfect for print or large-format displays.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">High-Quality Interpolation</h3>
                <p className="mt-1 text-sm text-slate-500">Our AI image enhancer uses advanced canvas rendering with smooth interpolation algorithms to produce sharp, natural-looking results without the blocky pixelation of simple scaling.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Watermark, Completely Free</h3>
                <p className="mt-1 text-sm text-slate-500">Download your enhanced images without any watermarks, logos, or branding. No signup required, no hidden fees, and no usage limits on our free image upscaler.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Fast Browser-Based Processing</h3>
                <p className="mt-1 text-sm text-slate-500">All upscaling happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy while delivering results in seconds.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How does the image upscaler work?", a: "The upscaler uses high-quality canvas interpolation to increase image resolution. It analyzes existing pixels and intelligently generates new ones to fill the larger dimensions, producing smooth gradients and sharp edges rather than blocky, pixelated output." },
                { q: "Will upscaling actually improve image quality?", a: "Upscaling increases resolution and produces smoother results than simple nearest-neighbor scaling. While it cannot add detail that was never captured in the original photo, the advanced interpolation creates natural-looking enlargements that appear sharper and more polished at larger sizes." },
                { q: "What is the maximum resolution I can achieve?", a: "You can upscale images up to 4x their original dimensions. The maximum output size depends on your device memory since all processing happens in the browser. For example, a 1000x1000 image can be upscaled to 4000x4000 pixels." },
                { q: "What image formats are supported?", a: "JPG/JPEG, PNG, and WebP formats are fully supported. You can upscale any of these formats and download the enhanced result instantly. PNG transparency is preserved during the upscaling process." },
                { q: "Is my image uploaded to a server?", a: "No. All processing happens entirely in your browser using client-side JavaScript. Your images never leave your device, ensuring complete privacy and security. There are no server uploads, no data collection, and no third-party access." },
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
            <p className="text-[15px] leading-8 text-slate-500">
              Image upscaling has become an essential tool for photographers, designers, and content creators who need to increase image resolution for various purposes. Whether you want to upscale an image for large-format printing, enhance old family photos that were captured at low resolution, or prepare small web graphics for high-DPI retina displays, our free online image upscaler delivers smooth, professional results. Print professionals frequently need to increase image resolution to meet the 300 DPI requirements of commercial printing, turning web-sized images into print-ready files. Social media creators upscale images to meet the growing resolution demands of platforms like Instagram and Pinterest, where higher-quality visuals drive more engagement. Real estate photographers enhance property images for large-format banners and signage. Game developers and digital artists use upscaling to improve the resolution of textures, sprites, and pixel art for modern high-resolution displays. Our AI image enhancer uses advanced interpolation algorithms that go beyond simple pixel duplication, intelligently generating new pixel data that produces smooth gradients, clean edges, and natural-looking detail at larger sizes. The tool processes everything locally in your browser, meaning your images are never uploaded to external servers. This is particularly important for photographers working with client images, businesses handling proprietary product photos, and anyone concerned about digital privacy. Whether you are restoring cherished memories from old digital cameras, preparing artwork for gallery prints, scaling up logos for billboard advertising, or enhancing screenshots for professional documentation, this free image upscaler handles the job without watermarks, signups, or subscription fees. Simply upload, choose your scale factor, and download the enhanced result in seconds.
            </p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Image Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Background Remover</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
