import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const HeicToJpgClient = dynamic(() => import("./HeicToJpgClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "HEIC To JPG Online Free No Upload",
  description:
    "Use HEIC To JPG online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "heic to jpg",
    "convert heic to jpg",
    "heic to jpeg",
    "heic converter",
    "iphone photo to jpg",
    "heic to jpg online free",
    "heic to jpg no upload",
    "convert heic to jpg on windows",
    "heic to jpg converter no signup",
    "batch heic to jpg converter",
    "apple heic converter",
    "heif to jpg",
    "heic to jpeg converter",
    "convert iphone photos",
    "heic file converter",
    "open heic on windows",
  ],
  openGraph: {
    title: "HEIC To JPG Online Free No Upload",
    description:
    "Use HEIC To JPG online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/heic-to-jpg",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
    type: "website",
    siteName: "ThePDFTools",
  },
  alternates: {
    canonical: "https://thepdftools.site/heic-to-jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Free HEIC to JPG Converter Online",
      "url": "https://thepdftools.site/heic-to-jpg",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description":
        "Convert HEIC and HEIF images to JPG format free online. Perfect for iPhone photos. Adjustable quality, batch conversion — runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a HEIC file?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HEIC (High Efficiency Image Container) is the default photo format used by Apple iPhones and iPads since iOS 11. It uses the HEIF standard to store images at half the file size of JPEG while maintaining the same visual quality.",
          },
        },
        {
          "@type": "Question",
          "name": "Why can't I open HEIC files on Windows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Windows does not natively support HEIC files without installing additional codecs. Converting HEIC to JPG makes your photos universally compatible with all devices, browsers, and applications.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my image uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The entire HEIC to JPG conversion happens locally in your web browser using JavaScript. Your photos never leave your device, making this tool completely safe for personal and sensitive images.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I convert multiple HEIC files at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our converter supports batch conversion. You can select multiple HEIC files at once and convert them all to JPG in a single operation.",
          },
        },
        {
          "@type": "Question",
          "name": "Will converting HEIC to JPG reduce quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At the default quality setting of 92%, the visual difference is imperceptible. You can adjust the quality slider to find the perfect balance between file size and image quality.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "HEIC to JPG", "item": "https://thepdftools.site/heic-to-jpg" },
      ],
    },
  ],
};

export default function HeicToJpgPage() {
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
                HEIC to JPG
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert HEIC to JPG
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  instantly in your browser
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Drop your iPhone HEIC photos and convert them to universally compatible
                JPG files. Adjustable quality, batch support — no signup, no upload.
              </p>
            </div>

            <div className="mt-8">
              <HeicToJpgClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for iPhone photos",
                  text: "Convert Apple HEIC files to JPG so you can share, edit, and view them anywhere.",
                },
                {
                  title: "Best for sharing",
                  text: "JPG is universally supported — upload to any platform, attach to any email.",
                },
                {
                  title: "Best for privacy",
                  text: "All conversion happens in your browser — no files uploaded to any server.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIPS + BEST FOR SIDEBAR */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>HEIC is the default photo format on iPhones since iOS 11.</li>
              <li>Use 90%+ quality for photos you plan to print or edit further.</li>
              <li>Batch convert by selecting multiple files at once to save time.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["iPhone photos", "Windows users", "Email attachments", "Social media"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO CONTENT SECTIONS */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert HEIC to JPG Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Drag and drop your HEIC or HEIF files into the upload area above, or click to browse and select files from your device.</li>
              <li>Use the quality slider to set your preferred JPG compression level. The default of 92% preserves excellent quality while reducing file size.</li>
              <li>Click the convert button to process your files. Batch conversion is supported — select multiple HEIC files at once.</li>
              <li>Preview each converted JPG image and compare the file sizes against the originals.</li>
              <li>Download individual files or use the download all button to save every converted image at once.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our HEIC to JPG Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Universal Compatibility</h3>
                <p className="mt-1 text-sm text-slate-500">HEIC files are not supported by many applications and platforms. Converting to JPG ensures your photos work everywhere — Windows, Android, web browsers, social media, email clients, and more.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Batch Conversion</h3>
                <p className="mt-1 text-sm text-slate-500">Select multiple HEIC files and convert them all to JPG in one go. Perfect for processing an entire photo library or a batch of iPhone photos you need to share quickly.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Adjustable Quality</h3>
                <p className="mt-1 text-sm text-slate-500">Fine-tune the output JPG quality from 50% to 100%. Higher settings preserve more detail for printing or editing, while lower settings produce smaller files ideal for web use.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Private &amp; Secure</h3>
                <p className="mt-1 text-sm text-slate-500">Your photos never leave your device. The entire conversion process runs locally in your browser using JavaScript. No server uploads, no accounts, no data collection.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "What is a HEIC file and why does my iPhone use it?",
                  a: "HEIC (High Efficiency Image Container) is a modern image format adopted by Apple starting with iOS 11. It uses the HEIF standard to compress photos to roughly half the size of equivalent JPEG files while preserving the same visual quality. This helps iPhones save storage space, but HEIC files are not universally supported by Windows, Android, and many web applications — which is why converting to JPG is often necessary.",
                },
                {
                  q: "Can I convert multiple HEIC files at once?",
                  a: "Yes. Our converter fully supports batch conversion. Simply select or drag multiple HEIC files into the upload area and they will all be converted to JPG in one operation. You can download them individually or use the download all button.",
                },
                {
                  q: "Is my photo uploaded to any server?",
                  a: "No. The entire HEIC to JPG conversion happens locally in your web browser using JavaScript. Your photos never leave your device, making this tool completely safe for personal, sensitive, or private images. It even works offline once the page has loaded.",
                },
                {
                  q: "Will converting HEIC to JPG reduce image quality?",
                  a: "At the default quality setting of 92%, the visual difference between the original HEIC and the output JPG is virtually imperceptible. You can use the quality slider to increase it to 100% for maximum fidelity, or lower it to reduce file size for web and email use.",
                },
                {
                  q: "Why can't I open HEIC files on my Windows PC?",
                  a: "Windows does not include native HEIC support without installing Microsoft's HEIF Image Extensions from the Microsoft Store, which may require a paid HEVC codec. Converting your HEIC files to JPG is the fastest and most reliable way to view and use your iPhone photos on any Windows computer without installing extra software.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              HEIC (High Efficiency Image Container) has become the default photo format on Apple iPhones and iPads since iOS 11. While HEIC offers impressive compression — storing images at roughly half the size of JPEG with equivalent quality — it remains poorly supported outside the Apple ecosystem. Windows PCs require additional codecs, Android devices may not open HEIC files natively, and many web platforms, email clients, and social media sites still expect JPEG uploads. Our free online HEIC to JPG converter solves this compatibility problem instantly. Simply drop your HEIC or HEIF files into the converter and download universally compatible JPG images in seconds. The entire process runs locally in your browser using JavaScript, meaning your photos are never uploaded to any server. There are no accounts to create, no daily conversion limits, and no watermarks added to your images. The adjustable quality slider lets you control the output — use 92% or higher for photos you plan to print or edit further, or lower the quality for smaller files suited to email attachments and social media posts. Batch conversion support means you can process dozens of iPhone photos at once instead of converting them one by one. Whether you are a photographer transferring images from an iPhone to a Windows editing workstation, a real estate agent sharing property photos with clients on different devices, or simply someone who wants to email vacation photos to family members without format compatibility headaches, this HEIC to JPG converter delivers fast, private, and reliable results every time.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Conversion Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PNG to JPG</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="heic-to-jpg" />
        </div>
      </div>
    </div>
  );
}
