import type { Metadata } from "next";
import dynamic from "next/dynamic";

const JpgToPngClient = dynamic(() => import("./JpgToPngClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free JPG to PNG Converter Online — Convert JPEG to PNG Instantly",
  description:
    "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser using HTML Canvas. Download your PNG instantly.",
  keywords: [
    "jpg to png",
    "jpeg to png converter",
    "convert jpg to png online",
    "free image converter",
    "jpg png converter",
  ],
  openGraph: {
    title: "Free JPG to PNG Converter Online — Convert JPEG to PNG Instantly",
    description:
      "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser using HTML Canvas. Download your PNG instantly.",
    url: "https://thepdftools.site/jpg-to-png",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/jpg-to-png",
  },
};

export default function JpgToPngPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free JPG to PNG Converter",
        url: "https://thepdftools.site/jpg-to-png",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert JPG and JPEG images to PNG format free online. No upload required — conversion happens in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why convert JPG to PNG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PNG supports transparency (alpha channel), is lossless with no compression artifacts, and is better for screenshots, logos, and images with text. Converting from JPG to PNG preserves quality for further editing.",
            },
          },
          {
            "@type": "Question",
            name: "Does conversion lose quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The conversion from JPG to PNG is lossless — the PNG output preserves every pixel of the original JPG. PNG is a lossless format, so no additional quality is lost during conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can convert multiple JPG files to PNG one after another. Each conversion happens instantly in your browser with no waiting for server processing.",
            },
          },
          {
            "@type": "Question",
            name: "Is my data safe?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. Your images never leave your device. The conversion uses the HTML Canvas API directly in your browser — no files are uploaded to any server.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            JPG to PNG
          </div>
          <h1 className="tool-page-title">Free JPG to PNG Converter Online</h1>
          <p className="tool-page-description">
            Convert JPEG images to PNG format instantly in your browser. No
            server upload, no quality loss — download your PNG in seconds.
          </p>
        </div>

        <JpgToPngClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert JPG to PNG Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Click the upload area above or drag and drop your JPG or JPEG image into the converter.</li>
              <li>The tool instantly reads your file using the browser&apos;s built-in Canvas API — nothing is sent to a server.</li>
              <li>Preview the converted PNG image and verify the output looks exactly like the original.</li>
              <li>Click the download button to save the high-quality PNG file to your device.</li>
              <li>Repeat for additional images — there are no daily limits or file-count restrictions.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our JPG to PNG Converter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Transparency Support</h3>
                <p className="mt-1 text-sm text-gray-500">PNG supports an alpha channel for transparency, making it the go-to format for logos, icons, and overlay graphics. Converting your JPG to PNG unlocks this capability for any downstream editing workflow.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Lossless Format</h3>
                <p className="mt-1 text-sm text-gray-500">Unlike JPG, PNG uses lossless compression. Once converted, every pixel in your image is preserved exactly as-is, no matter how many times you open, edit, or re-save the file.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Quality Loss</h3>
                <p className="mt-1 text-sm text-gray-500">The conversion from JPG to PNG does not re-compress or alter your image data. The resulting PNG is a pixel-perfect representation of the source JPG, ensuring zero degradation during the process.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">100% Browser-Based</h3>
                <p className="mt-1 text-sm text-gray-500">Your images never leave your device. The entire JPG-to-PNG conversion runs locally using the HTML Canvas API, so there is no upload delay, no server queue, and no privacy risk whatsoever.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Why convert JPG to PNG?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">PNG is a lossless image format that supports transparency through an alpha channel. If you need to place a logo on a colored background, overlay text on a photograph, or preserve crisp edges around screenshots and graphics, PNG is the better choice. Converting JPG to PNG also stops further quality degradation when the file is re-saved, because PNG does not use lossy compression.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does converting JPG to PNG lose quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">No. The conversion is lossless — every pixel from the original JPG is preserved in the resulting PNG. Any compression artifacts that already exist in the JPG will still be visible, but no new quality loss is introduced by converting to PNG format.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert multiple JPG files at once?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Yes. You can convert as many JPG images to PNG as you need, one after another. Each conversion happens instantly inside your browser with no server round-trip, so batch workflows are fast and painless.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is my data safe when I convert images here?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Absolutely. Your images are processed entirely within your web browser using the native HTML Canvas API. No files are uploaded to any external server, no data is stored, and no third parties ever see your images. The tool works even when you are offline.</p>
              </details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online JPG to PNG converter is designed for anyone who needs to change image formats quickly and securely. Whether you are a graphic designer preparing assets with transparent backgrounds, a web developer optimizing icons for a website, or a casual user who simply wants to convert a JPEG photo to PNG for better compatibility, this tool handles it all in seconds. Because the conversion runs entirely inside your browser via the HTML Canvas API, your files never leave your computer, eliminating privacy concerns and eliminating the wait times associated with server-side processing. The resulting PNG file preserves every pixel of the original JPG image with lossless compression, meaning you can edit, crop, or resize the output without worrying about cumulative quality loss. PNG is widely supported across all operating systems, browsers, and image editors, making it one of the most versatile formats available today. This JPG to PNG converter works on Windows, macOS, Linux, Android, and iOS devices with any modern web browser. There are no file-size limits enforced by a server, no daily conversion caps, and no account registration required. Simply drop your image, preview the result, and download your PNG instantly. For photographers, the tool is ideal for archiving edited photos in a lossless format after final retouching. For developers, it provides a quick way to generate PNG sprites, favicons, or UI assets from JPG source files. For marketers, it ensures that brand logos and social media graphics retain their sharpness across every platform. Try our JPG to PNG converter today and experience the fastest, most private way to convert your images online.</p>
        </div>
      </div>
    </div>
  );
}
