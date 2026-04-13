import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const BackgroundRemoverClient = dynamic(() => import("./BackgroundRemoverClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free AI Background Remover Online — Remove Image Background Instantly",
  description:
    "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
  keywords: [
    "background remover",
    "remove background online",
    "ai background removal",
    "transparent background",
    "remove image background free",
    "remove bg from photo",
    "transparent png maker",
    "photo background remover",
    "ai remove background",
  ],
  openGraph: {
    title: "Free AI Background Remover Online — Remove Image Background Instantly",
    description:
      "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
    url: "https://thepdftools.site/background-remover",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/background-remover",
  },
};

export default function BackgroundRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free AI Background Remover",
        url: "https://thepdftools.site/background-remover",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does AI background removal work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our tool uses a machine learning model that runs directly in your browser. It analyzes the image to detect the foreground subject and separates it from the background, producing a transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "What image quality can I expect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The AI produces clean, high-quality cutouts with smooth edges. Results are best with clear subjects and good contrast between foreground and background. The output is a full-resolution transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "Is it free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free with no watermarks, no signup required, and no usage limits. The AI model runs in your browser so there are no server costs.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work with complex backgrounds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the AI model handles complex and cluttered backgrounds well. It works best with photos of people, products, and animals, even against busy or multicolored backgrounds.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "Background Remover", "item": "https://thepdftools.site/background-remover" },
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                AI Background Remover
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Remove backgrounds
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  with AI precision
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Remove backgrounds from photos instantly using AI. Perfect for
                product images, profile pictures, and logos. Download as
                transparent PNG.
              </p>
            </div>

            <div className="mt-8">
              <BackgroundRemoverClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for products",
                  text: "Create clean product photos with transparent backgrounds for e-commerce listings.",
                },
                {
                  title: "Best for portraits",
                  text: "Remove distracting backgrounds from headshots and profile pictures instantly.",
                },
                {
                  title: "Best for privacy",
                  text: "AI runs locally in your browser — your photos never leave your device.",
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
              <li>Works best with clear contrast between subject and background.</li>
              <li>Use well-lit photos for the most accurate AI cutouts.</li>
              <li>Download as PNG to preserve the transparent background.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Product photos", "Profile pictures", "Logo design", "Social media"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Remove Background from Images Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your photo by dragging and dropping or clicking the upload area. Our AI background remover accepts JPG, PNG, and WebP images of any size.</li>
              <li>The AI model automatically detects the foreground subject and separates it from the background. Processing happens entirely in your browser with no server upload required.</li>
              <li>Download your image as a transparent PNG, ready to use in designs, product listings, presentations, or social media posts.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our AI Background Remover?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">AI-Powered Precision</h3>
                <p className="mt-1 text-sm text-slate-500">Our machine learning model delivers professional-grade cutouts with clean, smooth edges. The AI background removal technology handles hair, fur, and intricate details with remarkable accuracy.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Watermark, Completely Free</h3>
                <p className="mt-1 text-sm text-slate-500">Download your transparent background images without any watermarks, logos, or branding. Remove bg from photo free with no hidden costs, no signup, and no usage limits.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Transparent or Custom Backgrounds</h3>
                <p className="mt-1 text-sm text-slate-500">Get a transparent background maker result as a PNG, perfect for compositing over any color or scene. Use the output in Photoshop, Canva, or any design tool.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Works with Any Photo</h3>
                <p className="mt-1 text-sm text-slate-500">People, products, animals, logos, and objects. The AI handles complex and cluttered backgrounds, delivering clean results even with challenging compositions.</p>
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
                  q: "How does the AI background removal work?",
                  a: "Our tool uses a trained machine learning model that runs directly in your browser. It analyzes the pixels of your image to identify the foreground subject, then creates a precise mask to separate it from the background, producing a transparent PNG output.",
                },
                {
                  q: "What quality can I expect from the output?",
                  a: "The AI produces high-quality cutouts with smooth, natural edges. Results are best with clear subjects and decent contrast. The output retains full resolution of your original image as a transparent PNG file.",
                },
                {
                  q: "Is this background remover really free?",
                  a: "Yes, 100% free with no watermarks and no signup required. Since the AI model runs entirely in your browser, there are no server costs passed on to users. You can remove backgrounds from unlimited images at no charge.",
                },
                {
                  q: "Does it work with complex or busy backgrounds?",
                  a: "Yes. The AI model is trained on diverse datasets and handles complex, multicolored, and cluttered backgrounds effectively. It works especially well with photos of people, products, and animals against challenging scenes.",
                },
                {
                  q: "Can I process multiple images in batch?",
                  a: "You can process images one at a time for best results. Each image is handled individually by the AI model to ensure precise, high-quality background removal. Simply upload your next photo after downloading the previous result.",
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
              Removing backgrounds from images has become an essential task across industries. E-commerce sellers need clean product photos with transparent backgrounds to create professional listings on Amazon, Shopify, and eBay. Social media managers remove backgrounds to create eye-catching posts, stories, and ads for Instagram, TikTok, and Facebook. Graphic designers use transparent background makers to composite subjects into new scenes, build marketing collateral, and design brand assets. Our free AI background remover eliminates the need for expensive software like Photoshop or paid online services. The machine learning model powering this tool has been trained on millions of images, enabling it to accurately detect and separate foreground subjects from backgrounds across a wide range of scenarios. Whether you are removing the background from a headshot for your LinkedIn profile, isolating a product for your online store catalog, creating a transparent logo for your website, or preparing images for a presentation, this tool delivers clean, professional results in seconds. Portrait photographers use background removal to offer clients versatile images that can be placed on any backdrop. Real estate professionals remove distracting backgrounds from property feature photos. Content creators rely on AI background removal to produce polished visuals without the learning curve of manual editing tools. All processing happens directly in your browser, meaning your images are never uploaded to external servers, ensuring complete privacy and data security for sensitive personal or commercial photographs.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related AI and Image Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-upscaler" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">AI Image Upscaler</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Watermark</Link>
              <Link href="/jpg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">JPG to PNG</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
