import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "PDF Converter Online Free — Convert PDF to Word, JPG, Excel & More",
  description:
    "Free online PDF converter — convert PDF to Word, Excel, PowerPoint, JPG, or convert Word, JPG, and images to PDF. No signup, no upload to server, all in your browser.",
  keywords: [
    "pdf converter",
    "convert pdf online",
    "pdf converter free",
    "online pdf converter",
    "convert pdf to word online",
    "free pdf conversion tool",
  ],
  openGraph: {
    title: "PDF Converter Online Free — Convert PDF to Word, JPG, Excel & More",
    description:
      "Free online PDF converter for every file format. No signup, no upload to server.",
    url: "https://thepdftools.site/pdf-converter",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/pdf-converter" },
};

const converters = [
  { href: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF to an editable Word document." },
  { href: "/word-to-pdf", label: "Word to PDF", desc: "Convert Word documents to PDF." },
  { href: "/pdf-to-excel", label: "PDF to Excel", desc: "Extract tables from PDF into Excel." },
  { href: "/excel-to-pdf", label: "Excel to PDF", desc: "Convert spreadsheets to PDF." },
  { href: "/pdf-to-ppt", label: "PDF to PowerPoint", desc: "Convert PDF pages to editable slides." },
  { href: "/ppt-to-pdf", label: "PowerPoint to PDF", desc: "Convert presentations to PDF." },
  { href: "/pdf-to-jpg", label: "PDF to JPG", desc: "Convert PDF pages to JPG images." },
  { href: "/jpg-to-pdf", label: "JPG to PDF", desc: "Convert JPG images to PDF." },
  { href: "/png-to-pdf", label: "PNG to PDF", desc: "Convert PNG images to PDF." },
  { href: "/pdf-to-image", label: "PDF to Image", desc: "Convert PDF pages to PNG or JPG images." },
  { href: "/image-to-pdf", label: "Image to PDF", desc: "Convert any image to a PDF document." },
  { href: "/html-to-pdf", label: "HTML to PDF", desc: "Convert web pages or HTML to PDF." },
  { href: "/text-to-pdf", label: "Text to PDF", desc: "Convert plain text files to PDF." },
  { href: "/markdown-to-pdf", label: "Markdown to PDF", desc: "Convert Markdown files to PDF." },
  { href: "/screenshot-to-pdf", label: "Screenshot to PDF", desc: "Convert screenshots to PDF." },
  { href: "/scan-to-pdf", label: "Scan to PDF", desc: "Turn phone photos of documents into PDF." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free PDF Converter",
      url: "https://thepdftools.site/pdf-converter",
      description:
        "A directory of free browser-based PDF conversion tools — PDF to Word, Excel, PowerPoint, JPG, and more.",
    },
    {
      "@type": "ItemList",
      itemListElement: converters.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://thepdftools.site${c.href}`,
        name: c.label,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "PDF Converter", item: "https://thepdftools.site/pdf-converter" },
      ],
    },
  ],
};

export default function PdfConverterPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Converter" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              PDF Converter
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Convert PDF online
              <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                free, no signup, no upload
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Pick a converter below. Every tool runs in your browser — your
              files are never uploaded to a server.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {converters.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-300"
            >
              <h2 className="text-base font-semibold text-slate-900">{c.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
          <p className="text-[15px] leading-8 text-slate-500">
            This free online PDF converter directory covers the most common
            file conversion needs: convert PDF to Word, Excel, PowerPoint, or
            JPG, and convert images, Word documents, or web pages into PDF.
            Every converter runs entirely client-side in your browser, so
            documents never leave your device — no signup, no watermark, no
            server upload.
          </p>
        </div>
      </div>
    </div>
  );
}
