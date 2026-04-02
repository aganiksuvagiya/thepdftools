import type { Metadata } from "next";
import dynamic from "next/dynamic";

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

export default function ImageUpscalerPage() {
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
    ],
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
            AI Upscaler
          </div>
          <h1 className="tool-page-title">Free AI Image Upscaler Online</h1>
          <p className="tool-page-description">
            Upscale and enhance your images by 2x, 3x, or 4x instantly in your
            browser. High-quality interpolation for crisp, clear results — no
            upload, no server, completely private.
          </p>
        </div>

        <ImageUpscalerClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Upscale Images Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image upscaler accepts JPG, PNG, and WebP files of any size.</li>
              <li>Choose your desired scale factor: 2x, 3x, or 4x. The tool will increase image resolution while maintaining sharp details and smooth edges using high-quality interpolation.</li>
              <li>Download your enhanced, higher-resolution image instantly. The upscaled file is ready for print, large-format display, or any use requiring greater detail.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Free Image Upscaler?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Up to 4x Resolution Increase</h3>
                <p className="mt-1 text-sm text-gray-500">Upscale images by 2x, 3x, or 4x their original dimensions. Transform a 500x500 image into a crisp 2000x2000 output, perfect for print or large-format displays.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">High-Quality Interpolation</h3>
                <p className="mt-1 text-sm text-gray-500">Our AI image enhancer uses advanced canvas rendering with smooth interpolation algorithms to produce sharp, natural-looking results without the blocky pixelation of simple scaling.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Watermark, Completely Free</h3>
                <p className="mt-1 text-sm text-gray-500">Download your enhanced images without any watermarks, logos, or branding. No signup required, no hidden fees, and no usage limits on our free image upscaler.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Fast Browser-Based Processing</h3>
                <p className="mt-1 text-sm text-gray-500">All upscaling happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy while delivering results in seconds.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  How does the image upscaler work?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">The upscaler uses high-quality canvas interpolation to increase image resolution. It analyzes existing pixels and intelligently generates new ones to fill the larger dimensions, producing smooth gradients and sharp edges rather than blocky, pixelated output.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Will upscaling actually improve image quality?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Upscaling increases resolution and produces smoother results than simple nearest-neighbor scaling. While it cannot add detail that was never captured in the original photo, the advanced interpolation creates natural-looking enlargements that appear sharper and more polished at larger sizes.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What is the maximum resolution I can achieve?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">You can upscale images up to 4x their original dimensions. The maximum output size depends on your device memory since all processing happens in the browser. For example, a 1000x1000 image can be upscaled to 4000x4000 pixels.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What image formats are supported?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">JPG/JPEG, PNG, and WebP formats are fully supported. You can upscale any of these formats and download the enhanced result instantly. PNG transparency is preserved during the upscaling process.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is my image uploaded to a server?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">No. All processing happens entirely in your browser using client-side JavaScript. Your images never leave your device, ensuring complete privacy and security. There are no server uploads, no data collection, and no third-party access.</p>
              </details>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Image upscaling has become an essential tool for photographers, designers, and content creators who need to increase image resolution for various purposes. Whether you want to upscale an image for large-format printing, enhance old family photos that were captured at low resolution, or prepare small web graphics for high-DPI retina displays, our free online image upscaler delivers smooth, professional results. Print professionals frequently need to increase image resolution to meet the 300 DPI requirements of commercial printing, turning web-sized images into print-ready files. Social media creators upscale images to meet the growing resolution demands of platforms like Instagram and Pinterest, where higher-quality visuals drive more engagement. Real estate photographers enhance property images for large-format banners and signage. Game developers and digital artists use upscaling to improve the resolution of textures, sprites, and pixel art for modern high-resolution displays. Our AI image enhancer uses advanced interpolation algorithms that go beyond simple pixel duplication, intelligently generating new pixel data that produces smooth gradients, clean edges, and natural-looking detail at larger sizes. The tool processes everything locally in your browser, meaning your images are never uploaded to external servers. This is particularly important for photographers working with client images, businesses handling proprietary product photos, and anyone concerned about digital privacy. Whether you are restoring cherished memories from old digital cameras, preparing artwork for gallery prints, scaling up logos for billboard advertising, or enhancing screenshots for professional documentation, this free image upscaler handles the job without watermarks, signups, or subscription fees. Simply upload, choose your scale factor, and download the enhanced result in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
