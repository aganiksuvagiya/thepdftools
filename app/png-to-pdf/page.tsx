import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";

const ImageToPdfClient = dynamic(() => import("../image-to-pdf/ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "PNG to PDF Online Free — Convert PNG Images to PDF Instantly",
  description:
    "Convert PNG to PDF online for free. Upload multiple PNG images, arrange order, choose page size, and download a PDF instantly. No signup, no upload to server.",
  keywords: [
    "png to pdf",
    "png to pdf online free",
    "convert png to pdf",
    "png to pdf no upload",
    "multiple png to pdf",
    "png images to pdf converter",
  ],
  openGraph: {
    title: "PNG to PDF Online Free — Convert PNG Images to PDF Instantly",
    description:
      "Convert PNG images to PDF online free. Multiple images, custom page size, instant download. No signup required.",
    url: "https://thepdftools.site/png-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/png-to-pdf" },
};

const faqItems = [
  { q: "Can I convert multiple PNG images to one PDF?", a: "Yes. Upload multiple PNG images and the tool combines them into a single PDF document in the order you arrange them." },
  { q: "Does converting PNG to PDF keep transparency?", a: "Transparent areas are flattened onto a white background in the resulting PDF page, since PDF pages don't support alpha transparency the way PNG does." },
  { q: "Can I choose the PDF page size?", a: "Yes. Choose A4, Letter, or fit-to-image page size, plus portrait or landscape orientation." },
  { q: "Is the PNG to PDF conversion free?", a: "Yes. The tool is completely free with no signup, no watermarks, and no upload to any server." },
  { q: "Does converting PNG to PDF reduce image quality?", a: "No. The tool embeds images directly into the PDF at their original quality." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free PNG to PDF Converter",
      url: "https://thepdftools.site/png-to-pdf",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convert PNG images to PDF online for free. No upload required — runs entirely in your browser.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
        { "@type": "ListItem", position: 3, name: "PNG to PDF", item: "https://thepdftools.site/png-to-pdf" },
      ],
    },
  ],
};

export default function PngToPdfPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "PNG to PDF" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                PNG to PDF
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Convert PNG to PDF
                <span className="block bg-gradient-to-r from-red-500 via-brand-600 to-indigo-500 bg-clip-text text-transparent">
                  free online
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload one or multiple PNG images and convert them to a PDF instantly.
                Arrange order, pick page size, and download — no signup, no upload to any server.
              </p>
            </div>
            <div className="mt-8">
              <ImageToPdfClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Multiple images", text: "Upload several PNG files and combine them into one PDF in your chosen order." },
                { title: "Page size control", text: "Choose A4, Letter, or fit-to-image. Set portrait or landscape and adjust margins." },
                { title: "Browser-based", text: "Your images never leave your device. Everything runs locally — fast and private." },
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
              <Link href="/jpg-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">JPG to PDF</Link>
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image to PDF</Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PNG to JPG</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-slate-900 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          <ToolSeoGrowth slug="png-to-pdf" />
        </div>
      </div>
    </div>
  );
}
