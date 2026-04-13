import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageToWebpClient = dynamic(() => import("./ImageToWebpClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Image to WebP Converter Online — Convert JPG/PNG to WebP",
  description:
    "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. No upload required — conversion happens in your browser.",
  keywords: [
    "image to webp",
    "jpg to webp",
    "png to webp converter",
    "convert image to webp online",
    "free webp converter",
    "webp converter",
  ],
  openGraph: {
    title: "Free Image to WebP Converter Online — Convert JPG/PNG to WebP",
    description:
      "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. Runs entirely in your browser.",
    url: "https://thepdftools.site/image-to-webp",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image to WebP Converter - ThePDFTools",
      },
    ],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/image-to-webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free Image to WebP Converter Online",
      "url": "https://thepdftools.site/image-to-webp",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert JPG, PNG, and BMP images to WebP format free online. Smaller file sizes with adjustable quality. Runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is WebP format?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP is a modern image format developed by Google that provides superior lossy and lossless compression for images on the web. It supports transparency and animation while producing significantly smaller files than PNG or JPEG.",
          },
        },
        {
          "@type": "Question",
          "name": "Which browsers support WebP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP is supported by all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, Safari (14.1+), and Opera. It covers over 97% of global browser usage.",
          },
        },
        {
          "@type": "Question",
          "name": "How much smaller are WebP files?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WebP images are typically 25-35% smaller than JPEG files and up to 26% smaller than PNG files at equivalent visual quality, making them ideal for faster web page loading.",
          },
        },
        {
          "@type": "Question",
          "name": "Will I lose quality converting to WebP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With lossy compression there is a small quality reduction, but it is usually imperceptible at the default quality setting. You can adjust the quality slider to find the perfect balance between file size and visual fidelity.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Image to WebP", "item": "https://thepdftools.site/image-to-webp" },
      ],
    },
  ],
};

export default function ImageToWebpPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Image to WebP
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert to WebP
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for faster web performance
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Convert JPG, PNG, and other images to WebP format instantly in your
                browser. Adjust quality for the perfect balance between size and
                clarity — no server upload required.
              </p>
            </div>

            <div className="mt-8">
              <ImageToWebpClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for websites", text: "WebP files are up to 30% smaller than JPG with the same visual quality." },
                { title: "Best for performance", text: "Improve Core Web Vitals and page speed scores with optimized images." },
                { title: "Best for privacy", text: "Conversion runs entirely in your browser using Canvas API." },
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
              <li>WebP offers both lossy and lossless compression.</li>
              <li>Most modern browsers support WebP natively.</li>
              <li>Use WebP for web images to reduce bandwidth costs.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Website images", "Blog posts", "E-commerce stores", "Landing pages"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Images to WebP Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Drag and drop a JPG, PNG, or BMP image into the upload area, or click to browse your files.</li>
              <li>Adjust the quality slider to control the compression level — lower values produce smaller files, higher values preserve more detail.</li>
              <li>The converter processes your image instantly using the browser&apos;s native Canvas API with no server upload.</li>
              <li>Preview the WebP result and compare the file size savings against your original image.</li>
              <li>Click download to save the optimized WebP file to your device. Repeat for as many images as you need.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Image to WebP Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">25-35% Smaller Files</h3>
                <p className="mt-1 text-sm text-slate-500">WebP images are typically 25 to 35 percent smaller than equivalent JPEGs and up to 26 percent smaller than PNGs at the same visual quality, dramatically improving page load speed and bandwidth usage.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Universal Browser Support</h3>
                <p className="mt-1 text-sm text-slate-500">WebP is supported by all major browsers including Chrome, Firefox, Edge, Safari 14.1+, and Opera, covering over 97 percent of global browser usage. Your WebP images will display correctly for virtually every visitor.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Transparency Support</h3>
                <p className="mt-1 text-sm text-slate-500">Unlike JPG, WebP supports alpha-channel transparency just like PNG — but at a fraction of the file size. Convert PNG to WebP to keep transparent backgrounds while cutting file weight significantly.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Adjustable Quality Control</h3>
                <p className="mt-1 text-sm text-slate-500">Fine-tune the compression level with our quality slider to find the perfect trade-off between visual fidelity and file size. See the results in real time before downloading your WebP image.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "What is WebP format and why should I use it?", a: "WebP is a modern image format developed by Google that provides both lossy and lossless compression. It supports transparency and animation while producing significantly smaller files than PNG or JPEG. Using WebP on your website improves page load times, reduces bandwidth costs, and can positively impact your search engine rankings through better Core Web Vitals scores." },
                { q: "Which browsers support WebP images?", a: "WebP enjoys near-universal browser support in 2025 and beyond. Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari (version 14.1 and later), and Opera all render WebP natively. This covers over 97 percent of global browser usage, making WebP a safe default format for web images." },
                { q: "How much smaller are WebP files compared to JPG and PNG?", a: "On average, lossy WebP images are 25 to 35 percent smaller than comparable JPEG files and lossless WebP images are up to 26 percent smaller than PNGs. The exact savings depend on the image content and chosen quality level, but most users see meaningful reductions that translate directly into faster page loads." },
                { q: "Will I lose image quality when converting to WebP?", a: "With lossy compression there is a small reduction in quality, but at the default quality setting the difference is virtually imperceptible to the human eye. You can use the quality slider to increase fidelity if needed, or lower it further for maximum file size savings. The preview updates in real time so you can judge the result before downloading." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free image to WebP converter is the fastest way to optimize your images for the modern web. WebP is a next-generation image format created by Google that delivers superior compression for both lossy and lossless images. By converting your JPG, PNG, or BMP files to WebP, you can reduce image payloads by 25 to 35 percent without any perceptible loss in visual quality. This translates directly into faster page load times, lower bandwidth costs, and improved Core Web Vitals scores — all of which contribute to better search engine rankings and a smoother user experience. The converter runs entirely inside your web browser using the native HTML Canvas API, so your images are never uploaded to a remote server. This makes the tool completely private, fast, and reliable regardless of your internet connection speed. There are no file-size limits, no daily conversion caps, and no account registration required. WebP supports both transparency and animation, making it a versatile replacement for both PNG and GIF files. Whether you are a web developer building a performance-optimized website, a blogger looking to speed up article pages, an e-commerce manager compressing product photos, or a designer preparing assets for a progressive web app, converting to WebP is one of the highest-impact optimizations you can make. The tool works on any device with a modern browser — Windows, macOS, Linux, ChromeOS, iOS, and Android are all fully supported. Use our JPG to WebP converter or PNG to WebP converter today and see the file size difference for yourself.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Image Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
              <Link href="/image-rotate" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Rotate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
