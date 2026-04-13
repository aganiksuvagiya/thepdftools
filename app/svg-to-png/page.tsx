import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const SvgToPngClient = dynamic(() => import("./SvgToPngClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free SVG to PNG Converter Online — Convert SVG to PNG Instantly",
  description:
    "Convert SVG to PNG for free online. Choose scale (1x–4x), transparent or white background. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "svg to png",
    "convert svg to png",
    "svg to png converter",
    "svg to png online free",
    "svg converter",
    "vector to raster",
    "svg to png high quality",
    "svg to png transparent",
    "svg to png 2x",
    "svg to png 4x",
    "free svg converter",
  ],
  openGraph: {
    title: "Free SVG to PNG Converter Online — Convert SVG to PNG Instantly",
    description:
      "Convert SVG to PNG for free online. Choose scale (1x–4x), transparent or white background. No upload, no signup — runs entirely in your browser.",
    url: "https://thepdftools.site/svg-to-png",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/svg-to-png",
  },
};

export default function SvgToPngPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free SVG to PNG Converter",
        url: "https://thepdftools.site/svg-to-png",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert SVG to PNG for free online. Choose scale (1x–4x), transparent or white background. Runs entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert SVG files here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your SVG files never leave your browser. All conversion is done client-side using JavaScript and the Canvas API, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What scale should I choose?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use 1x for web-sized images, 2x for retina displays and most use cases, 3x for high-resolution prints, and 4x for maximum quality. Higher scales produce larger PNG files.",
            },
          },
          {
            "@type": "Question",
            name: "Can I keep the transparent background?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Select the 'Transparent' background option to preserve the original SVG transparency in the output PNG file. Choose 'White' if you need an opaque background.",
            },
          },
          {
            "@type": "Question",
            name: "Why convert SVG to PNG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PNG is a raster format supported everywhere — social media, email clients, presentation software, and older browsers. Converting SVG to PNG ensures universal compatibility while preserving image quality at the chosen resolution.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No hard limit. Processing happens entirely in your browser, so performance depends on your device. Most SVG files convert smoothly regardless of complexity.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "SVG to PNG", "item": "https://thepdftools.site/svg-to-png" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                SVG to PNG
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert SVG to PNG
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  at any resolution
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload an SVG file and export it as a high-quality PNG at 1x, 2x, 3x, or 4x scale.
                Choose transparent or white background. No signup, no server upload.
              </p>
            </div>

            <div className="mt-8">
              <SvgToPngClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Scalable output",
                  text: "Export at 1x to 4x resolution for crisp results on any screen, from web thumbnails to retina displays.",
                },
                {
                  title: "Transparent or white",
                  text: "Keep the original transparent background or add a solid white backdrop — your choice.",
                },
                {
                  title: "100% private",
                  text: "Everything runs locally on your device. Your SVG files never leave the browser.",
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

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use 2x scale for most web and UI assets — it looks sharp on retina screens.</li>
              <li>Choose transparent background when placing the PNG on coloured surfaces.</li>
              <li>For print, use 3x or 4x to ensure high DPI output.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["App icons", "Social media", "Presentations", "Email signatures", "Web assets"].map((item) => (
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

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert SVG to PNG Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your SVG file by dragging and dropping or clicking the upload area. Our SVG to PNG converter accepts any valid SVG file.</li>
              <li>Choose your desired scale (1x, 2x, 3x, or 4x) and background type (transparent or white). Higher scales produce larger, crisper PNG images.</li>
              <li>Click &quot;Convert to PNG&quot; and download your high-quality PNG file instantly. The converted image is ready for use anywhere.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free SVG to PNG Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your SVG files never leave your device. All conversion happens locally in your browser using the Canvas API, keeping your designs 100% private and secure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Scale Options</h3>
                <p className="mt-1 text-sm text-slate-500">Export at 1x for standard screens, 2x for retina displays, or up to 4x for maximum resolution. Perfect for creating crisp app icons, social media graphics, and print-ready assets.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Transparent Background Support</h3>
                <p className="mt-1 text-sm text-slate-500">Preserve the original SVG transparency in your PNG output, or add a solid white background. Ideal for logos, icons, and overlay graphics that need to sit on various backgrounds.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Universal Compatibility</h3>
                <p className="mt-1 text-sm text-slate-500">PNG is supported everywhere — email clients, social media platforms, presentation software, and all browsers. Convert your SVG vectors into raster images that work anywhere.</p>
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
                  q: "Is it safe to convert SVG files here?",
                  a: "Absolutely. Your SVG files never leave your browser. All conversion runs client-side using JavaScript and the Canvas API, so no data is uploaded to any server. Your files remain completely private on your device.",
                },
                {
                  q: "What scale should I choose for my PNG?",
                  a: "Use 1x for standard web images, 2x for retina and high-DPI displays (the most popular choice), 3x for large print assets, and 4x for maximum resolution. Higher scales produce proportionally larger PNG files.",
                },
                {
                  q: "Can I keep the transparent background in the PNG?",
                  a: "Yes. Select the 'Transparent' background option to preserve the original SVG transparency. Choose 'White' if you need an opaque background for email clients or platforms that don't support transparency.",
                },
                {
                  q: "Why would I convert SVG to PNG?",
                  a: "SVG is a vector format that not all platforms support — for example, most email clients, social media image uploads, and older software require raster formats like PNG. Converting SVG to PNG gives you universal compatibility while preserving quality at your chosen resolution.",
                },
                {
                  q: "Is there a file size or complexity limit?",
                  a: "There is no hard limit. Since processing happens in your browser, performance depends on your device. Most SVG files, even complex ones with many paths, convert smoothly on modern devices.",
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
              Converting SVG to PNG is a common need for designers, developers, and content creators. SVG (Scalable Vector Graphics) is perfect for logos, icons, and illustrations because it scales infinitely without quality loss. However, many platforms — including email clients like Outlook and Gmail, social media sites, presentation tools, and older web applications — require raster image formats like PNG. Our free SVG to PNG converter bridges this gap by letting you export your vector graphics at any resolution. Choose 1x for standard web use, 2x for sharp retina display rendering, or up to 4x for print-quality output. The transparent background option is ideal for logos and icons that need to overlay different surfaces, while the white background option ensures compatibility with platforms that don&apos;t support PNG transparency. Unlike server-based converters, this tool processes everything locally in your browser, so your design files remain private and the conversion is instant.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Image Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PNG to JPG</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
