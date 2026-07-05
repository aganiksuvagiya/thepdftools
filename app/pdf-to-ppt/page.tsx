import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

const PdfToPptClient = dynamic(() => import("./PdfToPptClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-to-ppt`;

export const metadata: Metadata = buildPageMetadata({
  title: "PDF to PowerPoint Online Free — Convert PDF to PPT, No Upload",
  description:
    "Convert PDF to PowerPoint online for free. Each PDF page becomes a PPT slide — no upload, no signup, runs entirely in your browser.",
  url: PAGE_URL,
  keywords: [
    "pdf to ppt online free",
    "convert pdf to powerpoint free",
    "pdf to powerpoint no upload",
    "pdf to pptx converter",
    "pdf to slides online free",
    "convert pdf to ppt no signup",
    "pdf to presentation free",
    "pdf to powerpoint browser",
  ],
});

export default function PdfToPptPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF to PowerPoint Converter",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Convert PDF files to PowerPoint PPTX online for free. Each PDF page becomes a slide. No upload required.",
      },
      
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Can I edit the slides after conversion?", acceptedAnswer: { "@type": "Answer", text: "Each slide contains the PDF page as an image. You can add text boxes and shapes on top in PowerPoint, but the original PDF content is not directly editable as text." } },
          { "@type": "Question", name: "What slide size is used?", acceptedAnswer: { "@type": "Answer", text: "Slides use widescreen 16:9 size, and each PDF page image is scaled to fit." } },
          { "@type": "Question", name: "Does it work with large PDFs?", acceptedAnswer: { "@type": "Answer", text: "Yes, though large PDFs can take longer because each page is rendered as a high-resolution image in your browser." } },
          { "@type": "Question", name: "Can I convert a password-protected PDF?", acceptedAnswer: { "@type": "Answer", text: "No. Remove the password first using the PDF Unlock tool, then convert it to PPT." } },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
          "@type": "ListItem",
          position: 2,
          name: "PDF Tools",
          item: "https://thepdftools.site/pdf-tools",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "PDF to PPT",
          item: PAGE_URL,
        },
        ],
      },
      buildOrganizationSchema(),
      buildWebsiteSchema(),
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "PDF to PowerPoint" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF to PPT
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert PDF to PowerPoint
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free &amp; no upload
                </span>
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime="2026-07-05">Updated July 5, 2026</time>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Turn any PDF into a PowerPoint presentation instantly. Each PDF page becomes a slide in your PPTX file — processed locally, no upload needed.
              </p>
            </div>
            <div className="mt-8"><PdfToPptClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "One page = one slide", text: "Every PDF page is rendered as a full-size slide in the resulting PowerPoint file." },
                { title: "High quality", text: "Pages are rendered at high resolution so your slides look sharp in any presentation." },
                { title: "No upload", text: "Conversion runs entirely in your browser using pdf.js and pptxgenjs. Your file stays private." },
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
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I edit the slides after conversion?", a: "Each slide contains the PDF page as an image. You can add text boxes, shapes, and other elements on top in PowerPoint, but the original PDF content is not directly editable as text." },
                { q: "What slide size is used?", a: "Slides are set to widescreen 16:9 (10 × 7.5 inches), the standard PowerPoint size. The PDF page image is scaled to fit." },
                { q: "Does it work with large PDFs?", a: "Yes, but large PDFs (50+ pages) may take a minute to process since each page is rendered as a high-res image in your browser." },
                { q: "Can I convert a password-protected PDF?", a: "No. Remove the password first using our PDF Unlock tool, then convert to PPT." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Use our free online PDF to PowerPoint converter to convert PDF files to PPTX presentations, turn PDF pages into slides, and create editable PowerPoint files from PDF documents. This browser-based PDF to PPT tool requires no file upload and no registration. Perfect for converting PDF reports, brochures, and documents into presentation format.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/ppt-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PPT to PDF</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
            </div>
          </div>

          <ToolSeoGrowth slug="pdf-to-ppt" />

          <SeoReferences
            links={[
              { href: "https://mozilla.github.io/pdf.js/", label: "PDF.js project documentation" },
              { href: "https://gitbrent.github.io/PptxGenJS/docs/introduction/", label: "PptxGenJS documentation" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: File API" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
