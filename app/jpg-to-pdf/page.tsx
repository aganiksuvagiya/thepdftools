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
const PAGE_URL = `${SITE_URL}/jpg-to-pdf`;

const pageTitle = "JPG to PDF Online Free — Convert JPG Images to PDF Instantly";
const pageDescription =
  "Convert JPG images to PDF in your browser. Combine multiple photos, reorder them, choose page size and margins, and download. No signup, no upload to a server.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "jpg to pdf online free",
    "convert jpg to pdf",
    "jpeg to pdf converter online",
    "jpg to pdf no upload",
    "multiple jpg to pdf",
    "jpg images to pdf",
  ],
  imageAlt: "JPG to PDF converter combining photos into one document",
});

const howToSteps = [
  {
    name: "Upload your JPG images",
    text: "Open the converter above and drop in one or more JPG files, or click to browse.",
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
    text: "Click Convert to PDF. Each JPG becomes its own page, scaled and centered based on your settings.",
  },
  {
    name: "Download",
    text: "The finished PDF downloads automatically.",
  },
] as const;

const faqItems = [
  {
    q: "Can I convert multiple JPG images to one PDF?",
    a: "Yes. Upload several JPG images and the tool combines them into a single PDF, one image per page, in the order shown in the list.",
  },
  {
    q: "Can I reorder my JPGs before converting?",
    a: "Yes, but only through hover-revealed up/down arrow buttons on each thumbnail — there is no drag-and-drop reordering.",
  },
  {
    q: "Does converting JPG to PDF reduce image quality?",
    a: "Every image is re-encoded when it's embedded into the PDF, since the tool builds each page from a JPEG-format image regardless of source. For ordinary photos this isn't visibly noticeable, but it isn't a byte-for-byte lossless copy of your original file either.",
  },
  {
    q: "Can I mix JPG and PNG images in the same PDF?",
    a: "Yes. This converter accepts JPG, PNG, and WebP, so you can combine formats in a single batch even on this JPG-focused page.",
  },
  {
    q: "Can I choose the PDF page size?",
    a: "Yes. Choose A4, Letter, or Fit to Image, and set portrait or landscape orientation for A4/Letter.",
  },
  {
    q: "What does \"Fit to Image\" do?",
    a: "It creates a PDF page sized to match each image's own pixel dimensions (assuming 96 DPI), instead of placing the photo onto a standard A4 or Letter page.",
  },
  {
    q: "Is the JPG to PDF conversion free?",
    a: "Yes. The tool is free with no signup, no watermark, and no upload to any server.",
  },
  {
    q: "Does this tool upload my photos to a server?",
    a: "No. Images are assembled into a PDF locally in your browser using jsPDF.",
  },
  {
    q: "Is there a limit to how many JPGs I can combine?",
    a: "There's no fixed limit, but a very large batch of high-resolution photos depends on your device's available memory since everything runs in the browser.",
  },
  {
    q: "Can I use this for scanned documents saved as JPG?",
    a: "Yes. Photographed or scanned pages saved as JPG are a common use case — add them in order and convert to get one PDF instead of several separate image files.",
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
      name: "JPG to PDF",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Convert one or more JPG images into a single PDF entirely in the browser",
        "Reorder images with up/down controls before converting",
        "Choose A4, Letter, or Fit to Image page size, orientation, and margins",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to convert JPG to PDF online",
      description: "A workflow for combining JPG images into a single PDF document.",
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
        { "@type": "ListItem", position: 3, name: "JPG to PDF", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function JpgToPdfPage() {
  const lastUpdated = getLastUpdated("app/jpg-to-pdf/page.tsx");

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "JPG to PDF" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.07),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.06),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-1-1l1.5-1.5a2 2 0 012.8 0L20 15m-14 5h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                JPG to PDF
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Convert JPG to PDF
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
                Upload one or multiple JPG images and convert them to a PDF
                instantly. Reorder with the hover arrow controls, pick a page
                size, and download — no signup, no upload to any server.
              </p>
            </div>
            <div className="mt-8">
              <ImageToPdfClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Multiple images", text: "Upload several JPG or PNG files and combine them into one PDF in your chosen order." },
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
                This converter builds a PDF from your JPG images using jsPDF,
                entirely in your browser. Each image becomes one page.
                Reordering happens through hover-revealed up/down arrows on
                each thumbnail, not drag-and-drop. Every image is re-encoded
                when it's placed into the PDF — for ordinary photos this has
                no visible effect, but it isn't a byte-for-byte copy of the
                original file.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert JPG to PDF</h2>
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
              <li>Reordering is hover-and-click, not drag-and-drop.</li>
              <li>Images are re-encoded during embedding — not a byte-for-byte lossless copy.</li>
              <li>Fit to Image assumes 96 DPI when converting pixel dimensions to a physical page size.</li>
              <li>No fixed batch limit, but very large batches depend on your device's memory.</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Related Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-to-jpg" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF to JPG</Link>
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image to PDF</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">Image Compressor</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://artskydj.github.io/jsPDF/docs/", label: "jsPDF: Client-side PDF creation" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: JPG image format overview" },
              { href: "https://web.dev/learn/images/", label: "web.dev: Image compression tradeoffs" },
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
