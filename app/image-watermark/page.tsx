import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageWatermarkClient = dynamic(() => import("./ImageWatermarkClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image Watermark Tool Online — Add Watermarks Instantly",
  description:
    "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "image watermark",
    "add watermark online",
    "watermark tool",
    "text watermark",
    "watermark image free",
    "photo watermark",
  ],
  openGraph: {
    title: "Free Image Watermark Tool Online — Add Watermarks Instantly",
    description:
      "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling. Runs entirely in your browser.",
    url: "https://thepdftools.site/image-watermark",
    images: [
      {
        url: "https://thepdftools.site/og-image-watermark.png",
        width: 1200,
        height: 630,
        alt: "Image Watermark Tool - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/image-watermark",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image Watermark Tool Online",
      "url": "https://thepdftools.site/image-watermark",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Add text watermarks to JPG, PNG, and WebP images for free online. Customize font size, opacity, color, position, and tiling.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I add watermarks in bulk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently the tool processes one image at a time. You can quickly watermark multiple images by repeating the process — each takes just seconds since everything runs locally in your browser.",
          },
        },
        {
          "@type": "Question",
          "name": "What watermark styles are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can customize the watermark text, font size, color, opacity, and position. You can also enable tiling to repeat the watermark diagonally across the entire image for maximum protection.",
          },
        },
        {
          "@type": "Question",
          "name": "Does watermarking reduce image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The watermark is composited onto the image using the Canvas API at full resolution. The underlying image quality remains unchanged — only the watermark overlay is added.",
          },
        },
        {
          "@type": "Question",
          "name": "Is the watermark permanent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Once you download the watermarked image, the text is permanently embedded into the image pixels. It cannot be removed without visibly damaging the image, which is what makes watermarks effective for copyright protection.",
          },
        },
      ],
    },
  ],
};

export default function ImageWatermarkPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.365.364.028.667.307.667.672v3.225l3.15-2.363a1.342 1.342 0 01.622-.26c1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3.176a48.394 48.394 0 00-5.293.337C5.123 3.746 4 5.14 4 6.741v6.009z" />
            </svg>
            Image Watermark
          </div>
          <h1 className="tool-page-title">Free Image Watermark Tool Online</h1>
          <p className="tool-page-description">
            Add custom text watermarks to your images instantly in your browser.
            Control font size, opacity, color, position, and tiling — no upload,
            no server, completely private.
          </p>
        </div>

        <ImageWatermarkClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Add a Watermark to Your Image</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging it into the drop zone or clicking to browse. JPG, PNG, and WebP formats are all supported.</li>
              <li>Enter your watermark text — this can be your name, brand, website URL, copyright notice, or any custom message.</li>
              <li>Customize the appearance by adjusting font size, color, opacity, and position. Enable tiling to repeat the watermark diagonally across the entire image.</li>
              <li>Preview the watermarked image in real time. Fine-tune the settings until the watermark is visible enough for protection but subtle enough to preserve the image&apos;s visual appeal.</li>
              <li>Click download to save the watermarked image. The text is permanently embedded into the image pixels.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Image Watermark Tool?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Custom Text Watermarks</h3>
                <p className="mt-1 text-sm text-gray-500">Add any text you want as a watermark — your name, brand, copyright symbol, or website URL. Full control over the message ensures your watermark matches your branding and protection needs perfectly.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Adjustable Opacity</h3>
                <p className="mt-1 text-sm text-gray-500">Control how visible your watermark appears with the opacity slider. Set it low for a subtle brand presence on portfolio images, or increase it for stronger protection on preview images shared with clients.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Diagonal Tiling Option</h3>
                <p className="mt-1 text-sm text-gray-500">Enable tiling to repeat your watermark text diagonally across the entire image. This prevents anyone from cropping out the watermark and provides maximum copyright protection for your photographs and artwork.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Full Position Control</h3>
                <p className="mt-1 text-sm text-gray-500">Place your watermark exactly where you want it — center, corners, or any custom position. Combined with font size and color controls, you have complete creative freedom over how the watermark integrates with your image.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I add watermarks to multiple images at once?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Currently the tool processes one image at a time. However, because everything runs locally in your browser with no server upload, each watermark takes just seconds to apply. You can quickly work through a batch of images by repeating the process, and your watermark settings are preserved between files.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What watermark styles and customization options are available?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">You can customize your watermark text, font size, color, opacity, and position on the image. You can also enable diagonal tiling to repeat the watermark across the entire image for maximum coverage. These options let you create anything from a subtle corner brand mark to a bold full-coverage protection overlay.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does adding a watermark reduce image quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">No. The watermark text is composited onto your image at full resolution using the HTML Canvas API. The underlying image quality remains completely unchanged — only the watermark overlay is added on top. The output resolution matches the original image exactly.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is the watermark permanent once applied?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Yes. Once you download the watermarked image, the text is permanently embedded into the image pixels. It cannot be cleanly removed without visibly damaging the image, which is what makes watermarks an effective deterrent against unauthorized use of your photos and artwork. Always keep your original unwatermarked files as backups.</p>
              </details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online image watermark tool lets photographers, designers, and content creators protect their work with custom text watermarks in seconds. Whether you need to add a subtle copyright notice to portfolio images, stamp a bold brand name across client previews, or tile a repeating watermark over product photography, this tool gives you complete control over every aspect of the watermark appearance. The entire process runs locally in your web browser using the HTML Canvas API, meaning your images are never uploaded to any external server. This is especially important for photographers and businesses who handle sensitive or proprietary visual content — your files remain completely private on your device at all times. The tool supports JPG, PNG, and WebP input formats and outputs the watermarked image at full original resolution with no quality degradation. You can customize the watermark text to include your name, business name, website URL, copyright symbol, or any other message. The opacity slider lets you create barely-visible watermarks for portfolio display or high-opacity overlays for maximum theft protection. The diagonal tiling feature repeats the watermark across the entire image surface, making it impossible to crop out and providing the strongest possible deterrent against unauthorized copying. Position controls let you place a single watermark in any corner or centered over the image. For professional photographers sharing proofs with clients, wedding photographers delivering preview galleries, stock photographers protecting submissions, e-commerce businesses safeguarding product images, and artists sharing work-in-progress previews online, this watermark tool provides fast, free, and private protection. No software installation, no account signup, no daily limits — just upload, customize, and download your watermarked images instantly.</p>
        </div>
      </div>
    </div>
  );
}
