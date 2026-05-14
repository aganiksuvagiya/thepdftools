import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const SignatureClient = dynamic(() => import("./SignatureClient"), {
  loading: () => <div className="animate-pulse h-64 rounded-2xl bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Online Signature Generator — Draw or Type Your Signature",
  description: "Create a free digital signature online. Draw with mouse or touch, or type your name in beautiful fonts. Download as PNG or SVG. No signup required.",
  keywords: ["signature generator online free", "digital signature maker", "draw signature online", "electronic signature generator", "online signature creator", "handwritten signature generator"],
  openGraph: {
    title: "Free Online Signature Generator — Draw or Type Your Signature",
    description: "Create a digital signature online for free. Draw or type, customize color and style, download as PNG or SVG.",
    url: "https://thepdftools.site/signature-generator",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/signature-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", name: "Free Online Signature Generator", url: "https://thepdftools.site/signature-generator", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" }, { "@type": "ListItem", position: 2, name: "Signature Generator", item: "https://thepdftools.site/signature-generator" }] },
  ],
};

export default function SignaturePage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.06),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Signature Generator
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Create your digital
                <span className="block bg-gradient-to-r from-brand-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">signature online</span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">Draw with mouse or touch, or type your name in beautiful handwritten fonts. Download as transparent PNG or SVG — free, no signup.</p>
            </div>
            <div className="mt-8"><SignatureClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Draw mode", text: "Use your mouse, trackpad or finger to draw a natural handwritten signature." },
                { title: "Type mode", text: "Type your name and choose from elegant cursive and script font styles." },
                { title: "Transparent PNG", text: "Download with transparent background — ready to place on documents, PDFs, and emails." },
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
              <Link href="/pdf-sign" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Sign</Link>
              <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Editor</Link>
              <Link href="/image-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Watermark</Link>
              <Link href="/qr-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">QR Generator</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="signature-generator" />
        </div>
      </div>
    </div>
  );
}
