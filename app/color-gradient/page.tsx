import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const ColorGradientClient = dynamic(() => import("./ColorGradientClient"), {
  loading: () => <div className="animate-pulse h-64 rounded-2xl bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free CSS Gradient Generator — Linear, Radial & Conic Gradients",
  description:
    "Generate beautiful CSS color gradients online for free. Create linear, radial, and conic gradients with custom color stops. Copy CSS code instantly — no signup required.",
  keywords: [
    "css gradient generator",
    "color gradient generator online free",
    "linear gradient css",
    "radial gradient generator",
    "gradient color picker",
    "background gradient generator",
    "css background gradient",
    "gradient maker online",
    "gradient code generator",
    "tailwind gradient",
  ],
  openGraph: {
    title: "Free CSS Gradient Generator — Linear, Radial & Conic Gradients",
    description:
      "Create beautiful CSS gradients with custom color stops. Linear, radial, and conic gradient builder with instant CSS code output.",
    url: "https://thepdftools.site/color-gradient",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/color-gradient",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free CSS Gradient Generator",
      url: "https://thepdftools.site/color-gradient",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Generate linear, radial, and conic CSS color gradients with custom color stops and copy the CSS code in one click.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "Color Gradient Generator", item: "https://thepdftools.site/color-gradient" },
      ],
    },
  ],
};

export default function ColorGradientPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
                </svg>
                Gradient Generator
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Create stunning
                <span className="block bg-gradient-to-r from-brand-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  CSS gradients
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Build beautiful linear, radial, and conic gradients with custom color stops.
                Preview your gradient live and copy the CSS code with one click — no signup, runs in your browser.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Perfect for web designers and developers who need gradient backgrounds for buttons, hero sections,
                cards, and UI components in CSS, Tailwind, or any design tool.
              </p>
            </div>

            <div className="mt-8">
              <ColorGradientClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Linear gradients", text: "Create smooth directional color transitions at any angle for headers, backgrounds, and UI elements." },
                { title: "Radial & conic", text: "Generate circular radial gradients and conic gradients for creative backgrounds and color wheels." },
                { title: "Ready-to-use CSS", text: "Copy CSS, inline styles, or CSS variables instantly for use in any project without extra tools." },
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
            <h2 className="text-lg font-semibold text-slate-900">How to Use</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600">
              <li>Choose a gradient type: Linear, Radial, or Conic.</li>
              <li>Adjust the angle for linear and conic gradients.</li>
              <li>Pick colors and drag the position sliders for each stop.</li>
              <li>Add more color stops for multi-color gradients.</li>
              <li>Copy the CSS code and paste it into your project.</li>
            </ol>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Web design", "UI backgrounds", "Buttons", "Hero sections", "CSS styling", "Tailwind"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Gradient Generator?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "3 Gradient Types", text: "Linear, radial, and conic gradients in one tool. Switch between types and keep your color stops." },
                { title: "Custom Color Stops", text: "Add as many color stops as you need and drag to position them precisely anywhere in the gradient." },
                { title: "Instant CSS Output", text: "Get the exact CSS background property, inline style, and CSS variable ready to paste into your code." },
                { title: "Beautiful Presets", text: "Start from curated presets like Sunset, Ocean, Aurora, and Fire to get inspired instantly." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Use this free online CSS gradient generator to create linear, radial, and conic gradients for your websites and apps.
              Pick multiple color stops, set their positions, and choose the angle to get the perfect gradient background.
              Copy the CSS code with one click and use it in any project — HTML, CSS, React, Tailwind, Vue, or any frontend stack.
              No signup required. Works entirely in your browser.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Design Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/color-picker" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Color Picker</Link>
              <Link href="/tailwind-colors" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Tailwind Colors</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Background Remover</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Generator</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="color-gradient" />
        </div>
      </div>
    </div>
  );
}
