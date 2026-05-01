import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfSignClient = dynamic(() => import("./PdfSignClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-sign`;

export const metadata: Metadata = {
  title: "Sign PDF Online Free - Add Signature No Upload",
  description:
    "Sign PDF online free by drawing or typing your signature. Add a signature to any PDF in your browser with no upload or signup.",
  keywords: [
    "sign pdf online free",
    "pdf signature online",
    "add signature to pdf",
    "esign pdf no upload",
    "draw signature on pdf",
    "digital signature pdf free",
    "pdf sign no signup",
    "electronic signature pdf",
  ],
  openGraph: {
    title: "Sign PDF Online Free - Add Signature No Upload",
    description: "Sign PDF online free by drawing or typing your signature. No upload, no signup.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfSignPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Sign Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Sign PDF files online for free. Draw or type your signature and embed it into any PDF without uploading the file.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this a legally binding signature?",
            acceptedAnswer: { "@type": "Answer", text: "This tool creates a visual signature image embedded into the PDF. For legally binding e-signatures, additional authentication may be required depending on your jurisdiction." },
          },
          {
            "@type": "Question",
            name: "Is my PDF uploaded anywhere?",
            acceptedAnswer: { "@type": "Answer", text: "No. Your PDF and signature never leave your browser. All processing runs locally using pdf-lib and the Canvas API." },
          },
          {
            "@type": "Question",
            name: "Can I choose where the signature appears?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. You can place the signature at the bottom-right, bottom-left, or bottom-center of the last page or all pages." },
          },
          {
            "@type": "Question",
            name: "Can I sign on mobile?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. The drawing canvas supports touch input, so you can draw your signature with your finger on a phone or tablet." },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Sign", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                PDF Sign
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Sign PDF online free
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  add signature with no upload
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Draw or type your signature and add it to any PDF document.
                Works on desktop and mobile, and your files never leave your
                browser.
              </p>
            </div>
            <div className="mt-8"><PdfSignClient /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Draw or type", text: "Draw with your mouse or finger, or type your name in a signature style." },
                { title: "Choose placement", text: "Place your signature at the bottom of the last page or all pages." },
                { title: "100% private", text: "Your PDF and signature stay on your device — nothing is uploaded." },
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
                { q: "Can I sign multiple pages?", a: "Yes. You can apply your signature to the last page only, or to all pages of your PDF." },
                { q: "Can I adjust the signature size?", a: "Yes. You can resize the signature before placing it in your PDF." },
                { q: "Does the signature look professional?", a: "Drawn signatures look natural and handwritten. Typed signatures use a cursive-style rendering for a professional appearance." },
                { q: "Can I sign password-protected PDFs?", a: "No. You will need to unlock the PDF first using our PDF Unlock tool, then sign it." },
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
              Use our free online PDF sign tool to add electronic signatures to PDF documents, sign contracts, sign agreements, and add digital signatures to any PDF file. Draw your signature with a mouse or finger, or type your name in signature style. This browser-based e-sign PDF tool requires no file upload and no registration.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-protect" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Password Protect</Link>
              <Link href="/pdf-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Watermark</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-unlock" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Unlock</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
