import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-teal-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Image Cropper
          </div>
          <h1 className="tool-page-title">Free Image Cropper Online</h1>
          <p className="tool-page-description">
            Crop JPG, PNG, and WebP images to any region instantly in your
            browser. Choose preset aspect ratios or free-form selection — no
            upload, no server, completely private.
          </p>
        </div>

        <ImageCropperClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Crop Images Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image cropper supports JPG, PNG, and WebP formats of any size.</li>
              <li>Select the area you want to keep by dragging the crop handles. Choose a preset aspect ratio like 1:1, 16:9, or 4:3, or use free-form selection for custom dimensions.</li>
              <li>Click crop and download your perfectly framed image instantly. The cropped result preserves full original quality with no recompression artifacts.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Free Image Cropper?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Preset Aspect Ratios</h3>
                <p className="mt-1 text-sm text-gray-500">Crop to standard ratios including 1:1 for profile pictures, 16:9 for video thumbnails, 4:3 for presentations, and 3:2 for photography. One click sets the perfect proportion.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Free-Form Crop Selection</h3>
                <p className="mt-1 text-sm text-gray-500">Need a custom crop? Use free-form selection to drag any rectangular area on your image. Crop a picture to size with pixel-perfect precision for any use case.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Preserves Full Image Quality</h3>
                <p className="mt-1 text-sm text-gray-500">Cropping removes only the pixels outside your selection. The remaining image retains its original resolution and quality with zero recompression or degradation.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Social Media Ready Sizes</h3>
                <p className="mt-1 text-sm text-gray-500">Quickly crop photos for Instagram squares, Facebook posts, YouTube thumbnails, and Twitter headers. Get the exact dimensions each platform requires in seconds.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What aspect ratios are available?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">The tool includes common presets such as 1:1 (square), 4:3 (standard), 16:9 (widescreen), 3:2 (photography), and free-form selection so you can crop to any custom region. These cover virtually every use case from social media to print.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Does cropping reduce image quality?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">No. Cropping simply removes the pixels outside the selected area. The remaining pixels retain their original quality with no recompression. Your cropped image will be just as sharp and clear as the original within the selected region.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Can I crop transparent PNG images?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Yes. The cropper fully preserves the alpha channel, so transparent areas in your PNG remain transparent after cropping. This makes it ideal for cropping logos, icons, and graphics that require transparency.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is there a maximum image size limit?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">There is no fixed limit. Because the tool runs entirely in your browser, the maximum size depends on your device available memory. Most images up to 50 megapixels work smoothly on modern devices without any issues.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is my image uploaded to a server?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">No. All image cropping happens locally in your browser using JavaScript. Your files are never uploaded to any server, ensuring complete privacy and security for personal or sensitive images.</p>
              </details>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Image cropping is a fundamental editing task used across photography, design, social media, and web development. Whether you need to crop an image online for a profile picture, prepare a thumbnail for a blog post, or trim unnecessary borders from a screenshot, our free image cropper delivers precise results in seconds. Social media platforms each require specific dimensions: Instagram demands square 1:1 images for grid posts, YouTube needs 16:9 thumbnails, and Facebook cover photos use unique landscape proportions. Our aspect ratio crop presets eliminate the guesswork, letting you select the right ratio with a single click. Photographers use cropping to improve composition, remove distracting elements from the edges of a frame, and focus attention on the subject. Designers crop photos to fit specific layout dimensions in websites, brochures, and marketing materials. E-commerce professionals crop product images to create uniform, consistent galleries that look professional and build buyer trust. This free online image cropper preserves the full quality of your original image because cropping is a non-destructive operation that simply extracts the selected pixel region. Unlike tools that recompress your image after editing, our cropper outputs the exact pixels you selected without additional compression artifacts. The tool handles JPG, PNG with transparency, and WebP formats seamlessly. Whether you are preparing passport photos, creating social media content, building a website gallery, or trimming screenshots for documentation, this crop photo free tool runs entirely in your browser with no signup, no watermarks, and complete privacy. Professional results are just a few clicks away.
          </p>
        </div>
      </div>
    </div>
  );
}
