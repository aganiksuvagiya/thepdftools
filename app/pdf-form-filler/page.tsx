import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const PdfFormFillerClient = dynamic(() => import("./PdfFormFillerClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "PDF Form Filler Online Free — Fill PDF Forms Without Adobe",
  description:
    "Fill PDF forms online for free. Upload a PDF with form fields, type your answers, and download the filled PDF instantly. No Adobe, no signup, runs in your browser.",
  keywords: [
    "pdf form filler online free",
    "fill pdf form online",
    "fill pdf without adobe",
    "online pdf form filler",
    "fill pdf fields online",
    "free pdf form filler",
    "fill and download pdf",
    "pdf form fill online free no signup",
  ],
  openGraph: {
    title: "PDF Form Filler Online Free — Fill PDF Forms Without Adobe",
    description:
      "Fill PDF form fields online for free. No Adobe needed. Upload, fill, download — runs in your browser.",
    url: "https://thepdftools.site/pdf-form-filler",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: { canonical: "https://thepdftools.site/pdf-form-filler" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free PDF Form Filler",
      url: "https://thepdftools.site/pdf-form-filler",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Fill PDF form fields online for free — text fields, checkboxes, dropdowns, radio buttons. Download the filled PDF instantly.",
    },
    
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I fill any PDF form with this tool?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. The tool detects fillable form fields in your PDF and lets you type into them directly. It also supports flat PDFs where you can add text annotations." },
          },
          {
            "@type": "Question",
            name: "Can I save a partially filled form?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Download the PDF at any point — the filled form data is embedded in the file." },
          },
          {
            "@type": "Question",
            name: "Does filling a PDF form require a signup?",
            acceptedAnswer: { "@type": "Answer", text: "No. The form filler is completely free with no account required. Open your PDF and start filling immediately." },
          },
          {
            "@type": "Question",
            name: "Can I fill checkboxes and radio buttons?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Interactive PDF forms with checkboxes, radio buttons, dropdowns, and signature fields are all supported." },
          },
          {
            "@type": "Question",
            name: "Is my form data private?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. All form filling happens in your browser. Your form data and PDF content are never sent to any server." },
          }
        ],
      },
      {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://thepdftools.site/pdf-tools" },
        { "@type": "ListItem", position: 3, name: "PDF Form Filler", item: "https://thepdftools.site/pdf-form-filler" },
      ],
    },
  ],
};

export default function PdfFormFillerPage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.07),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                PDF Form Filler
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Fill PDF forms
                <span className="block bg-gradient-to-r from-emerald-500 via-brand-600 to-purple-500 bg-clip-text text-transparent">
                  without Adobe
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload any PDF with interactive form fields — text boxes, checkboxes, dropdowns, radio buttons.
                Fill them all in your browser and download the completed PDF instantly. No Adobe, no signup.
              </p>
            </div>
            <div className="mt-8">
              <PdfFormFillerClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "All field types", text: "Supports text fields, checkboxes, dropdowns, and radio buttons — all standard PDF form fields." },
                { title: "No Adobe needed", text: "Fill government forms, applications, contracts, and tax forms directly in your browser." },
                { title: "Private & secure", text: "Your PDF never leaves your device. All processing happens locally in your browser." },
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
              <Link href="/pdf-editor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Editor</Link>
              <Link href="/pdf-sign" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Sign</Link>
              <Link href="/pdf-protect" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Protect</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors">PDF Compress</Link>
            </div>
          </div>
          
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {[
                { q: "Can I fill any PDF form with this tool?", a: "Yes. The tool detects fillable form fields in your PDF and lets you type into them directly. It also supports flat PDFs where you can add text annotations." },
                { q: "Can I save a partially filled form?", a: "Yes. Download the PDF at any point — the filled form data is embedded in the file." },
                { q: "Does filling a PDF form require a signup?", a: "No. The form filler is completely free with no account required. Open your PDF and start filling immediately." },
                { q: "Can I fill checkboxes and radio buttons?", a: "Yes. Interactive PDF forms with checkboxes, radio buttons, dropdowns, and signature fields are all supported." },
                { q: "Is my form data private?", a: "Yes. All form filling happens in your browser. Your form data and PDF content are never sent to any server." }
              ].map((item) => (
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
          <ToolSeoGrowth slug="pdf-form-filler" />
        </div>
      </div>
    </div>
  );
}
