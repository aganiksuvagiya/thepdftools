import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const PdfOrganizeClient = dynamic(() => import("./PdfOrganizeClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Organize PDF Pages Online Free — Reorder & Delete Pages",
  description:
    "Organize PDF pages online for free — reorder pages, remove unwanted pages, and export a clean PDF. No upload to server, no signup, works instantly in your browser.",
  url: "https://thepdftools.site/pdf-organize-pages",
  keywords: [
    "organize pdf pages",
    "organize pdf pages online free",
    "reorder pdf pages",
    "rearrange pdf pages online",
    "delete pdf pages online free",
    "pdf page organizer",
    "arrange pdf pages",
  ],
  imageAlt: "Organize reorder and delete PDF pages online",
});

export default function PdfOrganizePagesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Page Organizer",
        url: "https://thepdftools.site/pdf-organize-pages",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Organize PDF pages online for free — reorder and delete pages, then export a clean PDF. No upload, no signup, runs in your browser.",
      },
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "HowTo",
        name: "How to Organize PDF Pages Online",
        description: "Reorder and delete PDF pages for free in your browser.",
        step: [
          { "@type": "HowToStep", position: 1, name: "Upload your PDF", text: "Drag and drop or click to upload the PDF you want to organize." },
          { "@type": "HowToStep", position: 2, name: "Reorder pages", text: "Use the up and down arrows to move pages into the order you need." },
          { "@type": "HowToStep", position: 3, name: "Delete pages", text: "Click the X on any page card to remove pages you don't need." },
          { "@type": "HowToStep", position: 4, name: "Export", text: "Click Export PDF to build the reorganized document." },
          { "@type": "HowToStep", position: 5, name: "Download", text: "Download the organized PDF to your device." },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
          { "@type": "ListItem", position: 3, name: "Organize PDF Pages", item: "https://thepdftools.site/pdf-organize-pages" },
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
            { label: "Organize PDF Pages" },
          ]}
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                PDF Organize
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Organize PDF pages
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  reorder and delete instantly
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Reorder pages and remove the ones you don&apos;t need, then
                export a clean PDF — all in your browser. No upload, no
                server, completely private.
              </p>
            </div>
            <div className="mt-8">
              <PdfOrganizeClient />
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              How to Organize PDF Pages Online
            </h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your PDF file.</li>
              <li>Move pages up or down to set the order you need.</li>
              <li>Click the ✕ on any page to remove it.</li>
              <li>Click Export PDF, then download the result.</li>
            </ol>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I both reorder and delete pages in one pass?", a: "Yes. Move pages with the arrows and remove unwanted pages with the ✕ button, then export once you're happy with the layout." },
                { q: "Does reordering affect page quality?", a: "No. Pages are copied without re-encoding, so text, images, and formatting stay exactly as in the original." },
                { q: "Is there a page limit?", a: "No hard limit — performance depends on your device since everything runs locally in your browser." },
                { q: "Can I organize a password-protected PDF?", a: "Not directly. Remove the password first using the PDF Unlock tool, then organize the pages." },
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
              <Link href="/rearrange-pdf-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Rearrange PDF Pages</Link>
              <Link href="/delete-pdf-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Delete PDF Pages</Link>
              <Link href="/extract-pdf-pages" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Extract PDF Pages</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://pdf-lib.js.org/", label: "pdf-lib: PDF page manipulation in JavaScript" },
              { href: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/", label: "Adobe PDF standards overview" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", label: "MDN: Browser-based file workflows" },
            ]}
          />
          <ToolSeoGrowth slug="pdf-organize-pages" />
        </div>
      </div>
    </div>
  );
}
