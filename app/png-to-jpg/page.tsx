import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PngToJpgClient = dynamic(() => import("./PngToJpgClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PNG to JPG Converter Online — Convert PNG to JPEG Instantly",
  description:
    "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser using HTML Canvas.",
  keywords: [
    "png to jpg",
    "png to jpeg converter",
    "convert png to jpg online",
    "free image converter",
    "png jpg converter",
  ],
  openGraph: {
    title: "Free PNG to JPG Converter Online — Convert PNG to JPEG Instantly",
    description:
      "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser.",
    url: "https://thepdftools.site/png-to-jpg",
    images: [
      {
        url: "https://thepdftools.site/og-png-to-jpg.png",
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/png-to-jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free PNG to JPG Converter Online",
      "url": "https://thepdftools.site/png-to-jpg",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert PNG images to JPG format free online. Adjustable quality, white background for transparency. No upload required — conversion happens in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens to transparent areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JPG does not support transparency. Any transparent areas in your PNG will be filled with a white background during conversion.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I control JPG quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use the quality slider to choose a value between 0 and 1. Higher values produce better-looking images with larger file sizes, while lower values create smaller files with some quality loss.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my image uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The entire conversion happens locally in your browser using the HTML Canvas API. Your images never leave your device.",
          },
        },
        {
          "@type": "Question",
          "name": "What's the difference between PNG and JPG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PNG is a lossless format that supports transparency, making it ideal for graphics and logos. JPG uses lossy compression, producing much smaller files suited for photographs and web images where transparency is not needed.",
          },
        },
      ],
    },
  ],
};

export default function PngToJpgPage() {
  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            PNG to JPG
          </div>
          <h1 className="tool-page-title">Free PNG to JPG Converter Online</h1>
          <p className="tool-page-description">
            Convert PNG images to JPG format instantly in your browser. Adjust
            quality, handle transparency with a white background — download your
            JPG in seconds.
          </p>
        </div>

        <PngToJpgClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert PNG to JPG Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Drag and drop your PNG image into the upload area above, or click to browse and select a file from your device.</li>
              <li>Use the quality slider to set your preferred JPEG compression level — higher values mean better quality but larger files.</li>
              <li>Transparent areas in the PNG are automatically filled with a clean white background since JPG does not support transparency.</li>
              <li>Preview the converted JPG and compare the file size reduction against the original PNG.</li>
              <li>Click download to save the optimized JPG file to your device instantly.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our PNG to JPG Converter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Smaller File Size</h3>
                <p className="mt-1 text-sm text-gray-500">JPG files are dramatically smaller than PNGs, often 60-80% lighter. Converting PNG to JPG is the fastest way to reduce image file size for email attachments, blog posts, and social media uploads.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Adjustable Quality</h3>
                <p className="mt-1 text-sm text-gray-500">Fine-tune the JPG compression level with our quality slider. Find the perfect balance between visual fidelity and file size — useful when you need to meet specific upload size limits.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">White Background for Transparency</h3>
                <p className="mt-1 text-sm text-gray-500">Since JPG does not support alpha channels, our converter automatically composites transparent PNG areas onto a white background, producing a clean and professional result every time.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Lightning-Fast Conversion</h3>
                <p className="mt-1 text-sm text-gray-500">The entire conversion happens locally in your browser using the HTML Canvas API. There is no upload queue, no waiting for server processing, and no file-size restriction imposed by a remote server.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What happens to transparent areas in my PNG?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">JPG does not support transparency. When you convert a PNG with transparent regions, our tool automatically fills those areas with a solid white background. This ensures the output looks clean and professional rather than displaying random noise or black fills that some other converters produce.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I control the output JPG quality?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Yes. Use the quality slider to choose a compression level between 0 and 1. A value of 0.92 is a good default that balances quality and size. Lower values create smaller files with visible compression artifacts, while higher values preserve more detail at the cost of larger file sizes.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is my image uploaded to a server?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">No. The entire PNG-to-JPG conversion happens locally in your web browser using the native HTML Canvas API. Your images never leave your device, making this tool completely safe for sensitive or personal photos. It even works offline once the page has loaded.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What is the difference between PNG and JPG?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">PNG is a lossless format that preserves every pixel and supports transparency, making it ideal for graphics, logos, and screenshots. JPG uses lossy compression to produce much smaller files, which is better for photographs and web images where transparency is not needed. Converting PNG to JPG is the most effective way to reduce file size for photo-heavy content.</p>
              </details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online PNG to JPG converter helps you quickly reduce image file sizes without sacrificing visual quality. PNG files are excellent for graphics that require transparency and lossless editing, but they are often far too large for everyday use on websites, in emails, or on social media platforms. By converting PNG to JPG, you can shrink file sizes by 60 to 80 percent while maintaining a level of quality that is virtually indistinguishable to the human eye at higher compression settings. This converter is entirely browser-based, meaning your images are processed using the HTML Canvas API directly on your device. No files are uploaded to any server, no account is required, and there are no daily limits on how many images you can convert. The tool works seamlessly on Windows, macOS, Linux, iOS, and Android in any modern web browser. For web developers, converting large PNG screenshots and hero images to JPG can dramatically improve page load times and Core Web Vitals scores. For bloggers and content creators, smaller JPG files upload faster and consume less bandwidth. For photographers, the adjustable quality slider lets you find the exact balance between fidelity and file size for client deliverables, portfolio galleries, or print submissions. Transparent PNG regions are automatically composited onto a white background so the output always looks professional. Whether you need to convert a single PNG to JPEG for a quick email attachment or process dozens of images for a website migration, this tool delivers fast, private, and reliable results every time. Try our PNG to JPG converter now and see how much space you can save.</p>
        </div>
      </div>
    </div>
  );
}
