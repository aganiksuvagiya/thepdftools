import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const FaviconClient = dynamic(() => import("./FaviconClient"), {
  loading: () => <div className="animate-pulse h-64 rounded-2xl bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Favicon Generator — Convert Image to Favicon ICO & PNG",
  description: "Generate favicons from any image online for free. Create 16x16, 32x32, 48x48, 64x64, 180x180 PNG favicon files. Download all sizes as ZIP. No signup required.",
  keywords: ["favicon generator online free", "favicon creator", "image to favicon", "favicon png generator", "apple touch icon generator", "website favicon maker", "favicon ico generator"],
  openGraph: {
    title: "Free Favicon Generator — Convert Image to Favicon ICO & PNG",
    description: "Create favicons from any image. All sizes (16–512px) with rounded corners. Download as ZIP. Free, no signup.",
    url: "https://thepdftools.site/favicon-generator",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/favicon-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", name: "Free Favicon Generator", url: "https://thepdftools.site/favicon-generator", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" }, { "@type": "ListItem", position: 2, name: "Favicon Generator", item: "https://thepdftools.site/favicon-generator" }] },
  ],
};

export default function FaviconPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.06),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Favicon Generator
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Generate favicons
                <span className="block bg-gradient-to-r from-amber-500 via-brand-600 to-purple-500 bg-clip-text text-transparent">from any image</span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">Upload your logo, set rounded corners and padding, and download all favicon sizes at once. Includes 16×16 to 512×512 and Apple Touch Icon — free, no signup.</p>
            </div>
            <div className="mt-8"><FaviconClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "All sizes in one go", text: "Generate 16×16 to 512×512 favicons and Apple Touch Icon (180×180) at once." },
                { title: "Rounded corners", text: "Add rounded corners or make a circle icon with the corner radius slider." },
                { title: "Download as ZIP", text: "Get all favicon sizes in one ZIP file with ready-to-use HTML code snippet." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Related Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Resizer</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Compressor</Link>
              <Link href="/svg-to-png" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">SVG to PNG</Link>
              <Link href="/background-remover" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Background Remover</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="favicon-generator" />
        </div>
      </div>
    </div>
  );
}
