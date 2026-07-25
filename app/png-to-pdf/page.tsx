import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const ImageToPdfClient = dynamic(() => import("../image-to-pdf/ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/png-to-pdf`;

const pageTitle = "PNG to PDF Online Free — Convert PNG Images to PDF Instantly";
const pageDescription =
  "Convert PNG images to PDF in your browser. Combine multiple images, reorder them, choose page size and margins, and download. No signup, no upload to a server.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "png to pdf",
    "png to pdf online free",
    "convert png to pdf",
    "png to pdf no upload",
    "multiple png to pdf",
    "png images to pdf converter",
  ],
  imageAlt: "PNG to PDF converter combining images into one document",
});

const howToSteps = [
  {
    name: "Upload your PNG images",
    text: "Open the converter above and drop in one or more PNG files, or click to browse.",
  },
  {
    name: "Reorder if needed",
    text: "Hover over a thumbnail and use the up/down arrow buttons to change its position — there's no drag-and-drop reordering.",
  },
  {
    name: "Choose layout options",
    text: "Pick a page size (A4, Letter, or Fit to Image), orientation, and margin.",
  },
  {
    name: "Convert to PDF",
    text: "Click Convert to PDF. Each PNG becomes its own page, scaled and centered based on your settings.",
  },
  {
    name: "Download",
    text: "The finished PDF downloads automatically.",
  },
] as const;

const faqItems = [
  {
    q: "Can I convert multiple PNG images to one PDF?",
    a: "Yes. Upload several PNG images and the tool combines them into a single PDF, one image per page, in the order shown in the list.",
  },
  {
    q: "Does converting PNG to PDF keep transparency?",
    a: "No. Every image is embedded into the PDF as a JPEG, and JPEG has no alpha channel, so a transparent PNG's see-through areas will be flattened to a solid background instead of staying transparent. This mainly matters for logos or graphics with a transparent background — check the output before relying on it for anything design-sensitive.",
  },
  {
    q: "Can I reorder my PNGs before converting?",
    a: "Yes, but only through hover-revealed up/down arrow buttons on each thumbnail — there is no drag-and-drop reordering.",
  },
  {
    q: "Can I mix PNG and JPG images in the same PDF?",
    a: "Yes. This converter accepts JPG, PNG, and WebP, so you can combine formats in a single batch even on this PNG-focused page.",
  },
  {
    q: "Can I choose the PDF page size?",
    a: "Yes. Choose A4, Letter, or Fit to Image page size, plus portrait or landscape orientation for A4/Letter.",
  },
  {
    q: "What does \"Fit to Image\" do?",
    a: "It creates a PDF page sized to match each image's own pixel dimensions (assuming 96 DPI), instead of placing it onto a standard A4 or Letter page.",
  },
  {
    q: "Is the PNG to PDF conversion free?",
    a: "Yes. The tool is completely free with no signup, no watermarks, and no upload to any server.",
  },
  {
    q: "Does converting PNG to PDF reduce image quality?",
    a: "Every image is re-encoded as JPEG when it's embedded, which is a lossy format. For photos and screenshots this usually isn't visibly noticeable, but a PNG with sharp edges, transparency, or fine detail can show some change from the original.",
  },
  {
    q: "Does this tool upload my images to a server?",
    a: "No. Images are assembled into a PDF locally in your browser using jsPDF.",
  },
  {
    q: "Can I use this for screenshots saved as PNG?",
    a: "Yes. Combining several screenshots into one PDF is a common use case — add them in order, choose a page size, and convert.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: pageTitle,
      url: PAGE_URL,
      description: pageDescription,
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "PNG to PDF",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Convert one or more PNG images into a single PDF entirely in the browser",
        "Reorder images with up/down controls before converting",
        "Choose A4, Letter, or Fit to Image page size, orientation, and margins",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to convert PNG to PDF online",
      description: "A workflow for combining PNG images into a single PDF document.",
      step: howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${SITE_URL}/pdf-tools` },
        { "@type": "ListItem", position: 3, name: "PNG to PDF", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function PngToPdfPage() {
  const lastUpdated = getLastUpdated("app/png-to-pdf/page.tsx");

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
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload one or multiple PNG images and convert them to a PDF
                instantly. Reorder with the hover arrow controls, pick a page
                size, and download — no signup, no upload to any server.
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
            <h2 className="text-xl font-semibold text-slate-900">What This Tool Actually Does</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                This converter builds a PDF from your PNG images using jsPDF,
                entirely in your browser. Each image becomes one page.
                Reordering happens through hover-revealed up/down arrows on
                each thumbnail, not drag-and-drop.
              </p>
              <p>
                One detail worth knowing before you convert a PNG
                specifically: every image is embedded as a JPEG, and JPEG has
                no transparency channel. If your PNG has a transparent
                background — a logo, an icon, a graphic — that transparency
                will be flattened to a solid background in the PDF rather
                than staying see-through. For photos and screenshots without
                transparency, this has no effect at all.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert PNG to PDF</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              {howToSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Tool Limitations</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-7 text-slate-600">
              <li>Transparent PNG backgrounds are flattened — not preserved as transparent.</li>
              <li>Reordering is hover-and-click, not drag-and-drop.</li>
              <li>Images are re-encoded as JPEG during embedding, which can affect very fine detail.</li>
              <li>Fit to Image assumes 96 DPI when converting pixel dimensions to a physical page size.</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Related Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">JPG to PDF</Link>
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image to PDF</Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PNG to JPG</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://artskydj.github.io/jsPDF/docs/", label: "jsPDF: Client-side PDF creation" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: PNG image format overview" },
              { href: "https://web.dev/learn/images/", label: "web.dev: Image format and transparency tradeoffs" },
            ]}
          />
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
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
        </div>
      </div>
    </div>
  );
}
