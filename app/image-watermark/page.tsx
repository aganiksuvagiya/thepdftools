import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const ImageWatermarkClient = dynamic(() => import("./ImageWatermarkClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Image Watermark Online Free No Upload",
  description:
    "Use Image Watermark online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "add watermark to image online free",
    "convert jpg to watermark online",
    "image watermark tool free",
    "watermark jpg online",
    "watermark png online",
    "add text to image online",
    "photo watermark free",
    "watermark image no upload",
    "online watermark maker",
    "text watermark generator",
  ],
  openGraph: {
    title: "Image Watermark Online Free No Upload",
    description:
    "Use Image Watermark online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/image-watermark",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
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
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Image Watermark", "item": "https://thepdftools.site/image-watermark" },
      ],
    },
  ],
};

export default function ImageWatermarkPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.365.364.028.667.307.667.672v3.225l3.15-2.363a1.342 1.342 0 01.622-.26c1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3.176a48.394 48.394 0 00-5.293.337C5.123 3.746 4 5.14 4 6.741v6.009z" />
                </svg>
                Image Watermark
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Add Watermark to Image
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Free Online — JPG, PNG, WebP
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Add watermark to any image free online — no upload, no signup. Convert JPG to watermark, add text to PNG or WebP instantly. Control font size, opacity, color, position, and tiling — runs entirely in your browser.
              </p>
            </div>

            <div className="mt-8">
              <ImageWatermarkClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for protection", text: "Add visible watermarks to prevent unauthorized use of your photos." },
                { title: "Best for branding", text: "Overlay your logo or text on images for consistent brand identity." },
                { title: "Best for privacy", text: "All watermarking happens in your browser — images stay on your device." },
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
              <li>Use semi-transparent watermarks so they don&apos;t distract from the image.</li>
              <li>Position watermarks in corners or diagonally across for best protection.</li>
              <li>Add text or image watermarks depending on your branding needs.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Photography portfolios", "Stock photos", "Client proofs", "Social media posts"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Add a Watermark to Your Image</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging it into the drop zone or clicking to browse. JPG, PNG, and WebP formats are all supported.</li>
              <li>Enter your watermark text — this can be your name, brand, website URL, copyright notice, or any custom message.</li>
              <li>Customize the appearance by adjusting font size, color, opacity, and position. Enable tiling to repeat the watermark diagonally across the entire image.</li>
              <li>Preview the watermarked image in real time. Fine-tune the settings until the watermark is visible enough for protection but subtle enough to preserve the image&apos;s visual appeal.</li>
              <li>Click download to save the watermarked image. The text is permanently embedded into the image pixels.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Image Watermark Tool?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Text Watermarks</h3>
                <p className="mt-1 text-sm text-slate-500">Add any text you want as a watermark — your name, brand, copyright symbol, or website URL. Full control over the message ensures your watermark matches your branding and protection needs perfectly.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Adjustable Opacity</h3>
                <p className="mt-1 text-sm text-slate-500">Control how visible your watermark appears with the opacity slider. Set it low for a subtle brand presence on portfolio images, or increase it for stronger protection on preview images shared with clients.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Diagonal Tiling Option</h3>
                <p className="mt-1 text-sm text-slate-500">Enable tiling to repeat your watermark text diagonally across the entire image. This prevents anyone from cropping out the watermark and provides maximum copyright protection for your photographs and artwork.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Full Position Control</h3>
                <p className="mt-1 text-sm text-slate-500">Place your watermark exactly where you want it — center, corners, or any custom position. Combined with font size and color controls, you have complete creative freedom over how the watermark integrates with your image.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I add watermarks to multiple images at once?", a: "Currently the tool processes one image at a time. However, because everything runs locally in your browser with no server upload, each watermark takes just seconds to apply. You can quickly work through a batch of images by repeating the process, and your watermark settings are preserved between files." },
                { q: "What watermark styles and customization options are available?", a: "You can customize your watermark text, font size, color, opacity, and position on the image. You can also enable diagonal tiling to repeat the watermark across the entire image for maximum coverage. These options let you create anything from a subtle corner brand mark to a bold full-coverage protection overlay." },
                { q: "Does adding a watermark reduce image quality?", a: "No. The watermark text is composited onto your image at full resolution using the HTML Canvas API. The underlying image quality remains completely unchanged — only the watermark overlay is added on top. The output resolution matches the original image exactly." },
                { q: "Is the watermark permanent once applied?", a: "Yes. Once you download the watermarked image, the text is permanently embedded into the image pixels. It cannot be cleanly removed without visibly damaging the image, which is what makes watermarks an effective deterrent against unauthorized use of your photos and artwork. Always keep your original unwatermarked files as backups." },
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
            <p className="text-[15px] leading-8 text-slate-500">Our free online image watermark tool lets photographers, designers, and content creators protect their work with custom text watermarks in seconds. Whether you need to add a subtle copyright notice to portfolio images, stamp a bold brand name across client previews, or tile a repeating watermark over product photography, this tool gives you complete control over every aspect of the watermark appearance. The entire process runs locally in your web browser using the HTML Canvas API, meaning your images are never uploaded to any external server. This is especially important for photographers and businesses who handle sensitive or proprietary visual content — your files remain completely private on your device at all times. The tool supports JPG, PNG, and WebP input formats and outputs the watermarked image at full original resolution with no quality degradation. You can customize the watermark text to include your name, business name, website URL, copyright symbol, or any other message. The opacity slider lets you create barely-visible watermarks for portfolio display or high-opacity overlays for maximum theft protection. The diagonal tiling feature repeats the watermark across the entire image surface, making it impossible to crop out and providing the strongest possible deterrent against unauthorized copying. Position controls let you place a single watermark in any corner or centered over the image. For professional photographers sharing proofs with clients, wedding photographers delivering preview galleries, stock photographers protecting submissions, e-commerce businesses safeguarding product images, and artists sharing work-in-progress previews online, this watermark tool provides fast, free, and private protection. No software installation, no account signup, no daily limits — just upload, customize, and download your watermarked images instantly.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Image Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-rotate" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Rotate</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Background Remover</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="image-watermark" />
        </div>
      </div>
    </div>
  );
}
