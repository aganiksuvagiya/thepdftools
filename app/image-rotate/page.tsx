import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageRotateClient = dynamic(() => import("./ImageRotateClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Rotate & Flip Tool Online — Rotate Images Instantly",
  description:
    "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically. No upload, no signup — runs in your browser.",
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
    title: "Free Image Rotate & Flip Tool Online — Rotate Images Instantly",
    description:
      "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-rotate",
    images: [
      {
        url: "https://thepdftools.site/og-image-rotate.png",
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

const jsonLd = [
  {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
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
];

export default function ImageRotatePage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Image Rotate &amp; Flip
          </div>
          <h1 className="tool-page-title">Free Image Rotate &amp; Flip Online</h1>
          <p className="tool-page-description">
            Rotate JPG, PNG, and WebP images by any angle, flip horizontally or
            vertically — all instantly in your browser. No upload, no server,
            completely private.
          </p>
        </div>

        <ImageRotateClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Rotate or Flip an Image Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging it into the drop zone or clicking to browse. JPG, PNG, and WebP formats are supported.</li>
              <li>Use the quick-rotate buttons to rotate your image 90 degrees clockwise or counter-clockwise, or enter any custom angle from 0 to 360 degrees.</li>
              <li>Flip the image horizontally to create a mirror image, or flip vertically to turn it upside down. Combine flips with rotation for any orientation.</li>
              <li>Preview the transformed image in real time — adjustments are applied instantly so you can fine-tune the angle before downloading.</li>
              <li>Click download to save the rotated or flipped image. Choose your preferred output format and quality level.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Image Rotate &amp; Flip Tool?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Any Angle Rotation</h3>
                <p className="mt-1 text-sm text-gray-500">Go beyond the standard 90-degree increments. Enter any custom angle from 0 to 360 degrees to straighten horizons, correct tilted scans, or create artistic compositions with pixel-level precision.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Flip Horizontal &amp; Vertical</h3>
                <p className="mt-1 text-sm text-gray-500">Mirror your image along the horizontal or vertical axis with a single click. Perfect for creating reflections, correcting selfie-mode flips, or preparing images for print transfers.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Real-Time Preview</h3>
                <p className="mt-1 text-sm text-gray-500">Every rotation and flip is rendered instantly in your browser so you can see the exact result before downloading. No guesswork, no waiting — adjust until the image looks perfect.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Quality Loss</h3>
                <p className="mt-1 text-sm text-gray-500">Rotations at 90, 180, and 270 degrees are lossless. Custom-angle rotations use high-quality canvas rendering to preserve maximum detail. You control the output format and compression level.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I rotate by a custom angle instead of just 90 degrees?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Yes. In addition to the quick 90-degree and 180-degree preset buttons, you can enter any custom angle from 0 to 360 degrees using the angle slider or the numeric input field. The preview updates in real time so you can fine-tune the rotation until the horizon is perfectly level or the composition looks exactly right.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does rotating an image reduce its quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Rotations at exact 90-degree increments (90, 180, 270) are lossless because they simply rearrange pixels without any interpolation. Custom-angle rotations require sub-pixel rendering, but our tool uses high-quality bicubic-equivalent canvas rendering to preserve as much detail as possible. You can also choose your output format and compression level for full control.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I flip and rotate an image at the same time?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Absolutely. You can combine any rotation angle with a horizontal flip, a vertical flip, or both. All transformations are composited together and previewed in real time before you download, so you always know exactly what the final image will look like.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What image formats are supported?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">The rotate and flip tool supports JPG, PNG, and WebP images. You can upload any of these formats and download the result in the same format or convert to a different supported format during the process. This flexibility makes it easy to rotate a photo and change its format in a single step.</p>
              </details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online image rotate and flip tool gives you complete control over image orientation without installing any software. Whether you need to rotate a photo 90 degrees to fix a sideways smartphone picture, straighten a slightly tilted scan by a few degrees, mirror a selfie that was taken in front-facing mode, or flip an image vertically for a creative project, this tool handles it all instantly inside your browser. The entire process runs locally using the HTML Canvas API, meaning your images never leave your device and are never uploaded to any external server. This makes the tool completely private and suitable for sensitive personal photos, confidential business documents, and professional photography work. The real-time preview lets you see every adjustment as you make it, eliminating guesswork and saving time. For photographers, the custom-angle rotation is invaluable for correcting horizon lines and composition tilt. For graphic designers, the flip function creates mirror images needed for print layouts, symmetrical designs, and reflection effects. For e-commerce sellers, rotating product photos to a consistent orientation improves the visual consistency of your listings. The tool supports JPG, PNG, and WebP formats with full control over output quality and format selection. There are no watermarks added to your images, no daily usage limits, and no account signup required. It works on every modern browser across Windows, macOS, Linux, iOS, and Android devices. Rotate images online, flip photos horizontally, mirror images vertically, and download the results in seconds — completely free.</p>
        </div>
      </div>
    </div>
  );
}
