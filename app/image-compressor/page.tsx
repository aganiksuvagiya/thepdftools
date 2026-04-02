import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    "reduce image size",
    "jpg compressor",
    "png compressor",
    "free image compression",
  ],
  openGraph: {
    title: "Free Image Compressor Online — Reduce Image Size Without Quality Loss",
    description:
      "Compress JPG, PNG, and WebP images for free online. Reduce file size by up to 90% without losing visible quality. No upload, no signup — runs in your browser.",
    url: "https://thepdftools.site/image-compressor",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
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
              text: "JPG/JPEG, PNG, and WebP formats are fully supported. You can compress any of these formats and download the optimized result instantly.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            Image Compressor
          </div>
          <h1 className="tool-page-title">Free Image Compressor Online</h1>
          <p className="tool-page-description">
            Compress JPEG, PNG, and WebP images instantly in your browser.
            Reduce file size by up to 90% — no upload, no server, completely
            private.
          </p>
        </div>

        <ImageCompressorClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Compress Images Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your image by dragging and dropping or clicking the upload area. Our image compressor supports JPG, PNG, and WebP formats.</li>
              <li>Adjust the quality slider to find the ideal balance between file size and visual clarity. Preview the compressed result in real time before downloading.</li>
              <li>Download your compressed image instantly. The optimized file is ready for use on websites, social media, or email attachments.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our Free Image Compressor?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-gray-500">Your images never leave your device. All compression happens locally in your browser using JavaScript, keeping your photos 100% private and secure.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Supports All Major Formats</h3>
                <p className="mt-1 text-sm text-gray-500">Compress JPEG, PNG, and WebP images effortlessly. Our jpg compressor and png compressor handle every common image format used on the web today.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Up to 90% File Size Reduction</h3>
                <p className="mt-1 text-sm text-gray-500">Dramatically reduce image size without losing visible quality. Compress photos for faster page loads, smaller email attachments, and optimized storage.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Batch Compression Support</h3>
                <p className="mt-1 text-sm text-gray-500">Compress multiple images at once. Upload an entire batch and download all optimized files in seconds, saving you time on large projects.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is it safe to compress images here?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Absolutely. Your images never leave your browser. All compression runs client-side using JavaScript, so no data is uploaded to any server. Your files remain completely private on your device.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What image formats does the compressor support?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Our image compressor fully supports JPG/JPEG, PNG, and WebP formats. Whether you need a jpg compressor for photographs or a png compressor for graphics with transparency, this tool handles it all.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  How much can I reduce the file size?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">You can reduce image size by up to 90% depending on the original file and your chosen quality settings. The quality slider lets you fine-tune the compression level so you can compress photos without losing quality that matters.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is there a file size limit?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">There is no hard file size limit. Since all processing happens in your browser, performance depends on your device memory. Most images up to 50MB compress smoothly on modern devices.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Will compressing my images cause quality loss?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Our compressor uses intelligent algorithms to reduce file size while preserving visual quality. At moderate compression levels, the difference is imperceptible to the human eye. You can preview the result before downloading to ensure it meets your standards.</p>
              </details>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Image compression is essential for anyone working with digital media. Whether you need to compress images for your website to improve page load speed and Core Web Vitals scores, reduce image size for email attachments that exceed file limits, or optimize photos for social media platforms like Instagram, Facebook, and Twitter, our free online image compressor delivers professional results. Unlike other tools that require uploading your files to remote servers, this jpg compressor and png compressor processes everything locally in your browser, ensuring complete privacy. Web developers rely on image compression to reduce bandwidth costs and deliver faster user experiences. Bloggers and content creators use it to keep their media libraries lean without sacrificing the visual impact of their photography. E-commerce store owners compress product images to ensure quick page loads that drive conversions. Our tool supports batch processing, allowing you to compress multiple images simultaneously for efficient workflow. The adjustable quality slider gives you full control over the compression ratio, letting you find the sweet spot between file size reduction and image clarity. Whether you are optimizing a single hero image or processing hundreds of product photos, this free image compressor online tool handles the job without watermarks, signups, or hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
