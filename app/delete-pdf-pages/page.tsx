import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";

const PdfOrganizeClient = dynamic(
  () => import("../pdf-organize-pages/PdfOrganizeClient"),
  {
    loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Delete PDF Pages Online Free — Remove Unwanted Pages",
  description:
    "Delete PDF pages online for free — remove unwanted or blank pages and export a clean PDF. No upload to server, no signup, works instantly in your browser.",
  keywords: [
    "delete pdf pages",
    "delete pdf pages online free",
    "remove pages from pdf",
    "delete page from pdf online",
    "remove blank pdf pages",
  ],
  openGraph: {
    title: "Delete PDF Pages Online Free — Remove Unwanted Pages",
    description:
      "Remove unwanted pages from a PDF and export instantly. No upload to server, no signup.",
    url: "https://thepdftools.site/delete-pdf-pages",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/delete-pdf-pages",
  },
};

export default function DeletePdfPagesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Page Deleter",
        url: "https://thepdftools.site/delete-pdf-pages",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Delete unwanted pages from a PDF online for free and export a clean document. No upload, no signup.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
          { "@type": "ListItem", position: 3, name: "Delete PDF Pages", item: "https://thepdftools.site/delete-pdf-pages" },
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
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "PDF Tools", href: "/pdf-tools" },
            { label: "Delete PDF Pages" },
          ]}
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                PDF Delete Pages
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Delete PDF pages
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  remove what you don&apos;t need
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Click the ✕ on any page to remove it, then export a clean PDF
                — all locally in your browser, no upload required.
              </p>
            </div>
            <div className="mt-8">
              <PdfOrganizeClient />
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "How do I delete a page from a PDF?", a: "Upload your PDF, click the ✕ on the page card you want to remove, then click Export PDF." },
                { q: "Can I delete multiple pages at once?", a: "Yes, click ✕ on as many page cards as you need before exporting." },
                { q: "Does deleting a page affect the rest of the document?", a: "No. Remaining pages keep their original content and quality — only the deleted pages are removed." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-organize-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Organize PDF Pages</Link>
              <Link href="/extract-pdf-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Extract PDF Pages</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="delete-pdf-pages" />
        </div>
      </div>
    </div>
  );
}
