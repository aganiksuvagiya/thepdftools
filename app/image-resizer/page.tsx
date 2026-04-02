import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            Image Resizer
          </div>
          <h1 className="tool-page-title">Free Image Resizer Online</h1>
          <p className="tool-page-description">
            Resize JPG, PNG, and WebP images to any dimension instantly in your
            browser. Lock aspect ratio, batch resize, and download — no upload,
            no server, completely private.
          </p>
        </div>

        <ImageResizerClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Resize Images Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image resizer supports JPG, PNG, and WebP files of any dimension.</li>
              <li>Set your desired width and height in pixels, or choose from preset sizes for social media platforms. Lock the aspect ratio to prevent distortion when changing image dimensions.</li>
              <li>Click resize and download your image instantly. The resized file maintains optimal quality and is ready for use on websites, social media, or print.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Free Image Resizer?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Social Media Preset Sizes</h3>
                <p className="mt-1 text-sm text-gray-500">Quickly resize photos for Instagram posts, Facebook covers, Twitter headers, YouTube thumbnails, and LinkedIn banners with one-click preset dimensions.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Aspect Ratio Lock</h3>
                <p className="mt-1 text-sm text-gray-500">Maintain perfect proportions when resizing. Lock the aspect ratio so your image scales uniformly without stretching or squishing the subject.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Batch Resize Multiple Images</h3>
                <p className="mt-1 text-sm text-gray-500">Upload and resize multiple images at once to the same dimensions. Perfect for preparing product photos, portfolio images, or social media content in bulk.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Multiple Output Formats</h3>
                <p className="mt-1 text-sm text-gray-500">Resize and convert your images to JPG, PNG, or WebP in a single step. Choose the best format for your needs, whether it is web optimization, transparency, or compatibility.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Can I resize an image without losing quality?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">When downscaling images, quality is fully preserved. Enlarging beyond the original resolution may introduce slight softness, but our tool uses high-quality canvas interpolation with smooth rendering to deliver the best possible result at any size.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What social media sizes are available as presets?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Presets include Instagram post (1080x1080), Instagram story (1080x1920), Facebook cover (820x312), Twitter header (1500x500), YouTube thumbnail (1280x720), LinkedIn banner (1584x396), and more. You can also enter any custom pixel dimensions.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Can I resize multiple images at once?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Yes. You can upload multiple images at once and apply the same dimensions to all of them. Each resized image can be downloaded individually, making batch processing fast and efficient for bulk image resizer needs.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What is the maximum image size I can resize?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">There is no fixed limit. Since resizing happens entirely in your browser, the maximum depends on your device memory. Most images up to 50 megapixels work smoothly on modern devices. No files are uploaded to any server.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Can I change the output format while resizing?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Yes. You can resize your image and save it as JPG, PNG, or WebP regardless of the original format. This lets you resize and convert in a single step, perfect for optimizing images for web use or maintaining transparency with PNG.</p>
              </details>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Resizing images is one of the most common tasks in digital media workflows. Web developers resize images online to meet responsive design requirements and improve page load performance across desktop and mobile devices. Social media managers need to resize photos for social media platforms that each have unique dimension requirements, from square Instagram posts to wide-format Twitter headers and tall Pinterest pins. E-commerce professionals use a bulk image resizer to standardize product photos across their catalog, ensuring consistent presentation on marketplaces and storefronts. Photographers resize high-resolution images for client galleries, portfolio websites, and print fulfillment services. Our free image resizer tool runs entirely in your browser, ensuring that your original files never leave your device. You can change image dimensions to any custom width and height, use aspect ratio locking to maintain proportions, and select from popular social media presets that eliminate guesswork. The tool uses high-quality canvas rendering with bicubic interpolation to produce sharp, clean results whether you are scaling down a large camera RAW export or preparing images for a WordPress blog. Content creators, marketers, designers, and developers all benefit from having a fast, private, and reliable online image resizer that handles single files or batch processing without signups, watermarks, or file size restrictions. Whether you need to resize an image for a Google Ads campaign, an email newsletter header, a mobile app splash screen, or a print-ready flyer, this tool delivers pixel-perfect results every time.
          </p>
        </div>
      </div>
    </div>
  );
}
