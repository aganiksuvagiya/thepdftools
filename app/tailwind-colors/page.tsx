import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const TailwindColorsClient = dynamic(() => import("./TailwindColorsClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Tailwind CSS Color Palette — Complete Reference with HEX Codes",
  description:
    "Browse all Tailwind CSS colors with HEX codes, copy classes instantly for web design. Complete color reference for developers and designers.",
  url: "https://thepdftools.site/tailwind-colors",
  keywords: [
    "tailwind color palette",
    "tailwind css colors",
    "tailwind color chart",
    "tailwind color reference",
    "tailwind color picker",
    "tailwind hex codes",
    "tailwind color classes",
  ],
  imageAlt: "Tailwind CSS color palette reference",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tailwind Colors Reference",
      url: "https://thepdftools.site/tailwind-colors",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Complete Tailwind CSS color palette reference with HEX codes and copy-to-clipboard classes for web development.",
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Developer Tools", "item": "https://thepdftools.site/developer-tools" },
        { "@type": "ListItem", "position": 3, "name": "Tailwind Colors", "item": "https://thepdftools.site/tailwind-colors" },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function TailwindColorsPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/developer-tools" },
          { label: "Tailwind Colors" },
        ]} />
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
                </svg>
                Tailwind Colors
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Complete Tailwind
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Color Palette
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Browse all Tailwind CSS colors with their exact HEX codes. Copy color classes
                instantly for your web projects — no signup required.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Perfect for developers building with Tailwind, designers creating consistent
                palettes, and anyone needing reliable color references.
              </p>
            </div>

            <div className="mt-8">
              <TailwindColorsClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for developers", text: "Copy Tailwind classes like bg-blue-500 directly to your code." },
                { title: "Best for designers", text: "Reference exact HEX values for design tools and brand guidelines." },
                { title: "Best for consistency", text: "Use standardized colors across your entire project." },
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
              <li>Click any color swatch to copy the Tailwind class to your clipboard.</li>
              <li>Use the color picker tool for custom colors and contrast checking.</li>
              <li>Combine with our image tools for complete design workflows.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Tailwind developers", "UI designers", "Web projects", "Color reference"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Use Tailwind Colors</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Browse the color families below and find the shade you need.</li>
              <li>Click any color swatch to copy the Tailwind class (e.g., bg-red-500).</li>
              <li>Paste the class into your HTML, JSX, or component styles.</li>
              <li>Use the color picker for custom colors or contrast analysis.</li>
              <li>Combine multiple colors for consistent design systems.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Tailwind Colors?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Standardized Palette</h3>
                <p className="mt-1 text-sm text-slate-500">Tailwind provides a carefully crafted color palette that's consistent across projects and teams.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">One-Click Copy</h3>
                <p className="mt-1 text-sm text-slate-500">Copy any Tailwind class with a single click, no need to remember or type class names.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">HEX Reference</h3>
                <p className="mt-1 text-sm text-slate-500">See the exact HEX code for each color, useful for design tools and brand guidelines.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Free & Fast</h3>
                <p className="mt-1 text-sm text-slate-500">No signup required, works instantly in your browser for quick color references.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Browse the complete Tailwind CSS color palette with all shades from 50 to 900. Copy Tailwind classes like bg-blue-500 or text-gray-700 directly to your clipboard. Perfect for developers using Tailwind CSS and designers needing consistent color references. No signup required — works instantly in your browser.</p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">References</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              <li><a href="https://tailwindcss.com/docs/customizing-colors" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">Tailwind CSS: Customizing colors</a></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">MDN: CSS color values</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Design Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/color-picker" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Color Picker</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">QR Code Generator</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="tailwind-colors" />
        </div>
      </div>
    </div>
  );
}
