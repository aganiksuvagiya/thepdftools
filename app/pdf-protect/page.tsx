import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfProtectClient = dynamic(() => import("./PdfProtectClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-protect`;

export const metadata: Metadata = {
  title: "Password Protect PDF Online Free — No Upload",
  description:
    "Add a password to your PDF online for free. Lock and encrypt your PDF files instantly in your browser — no upload, no signup required.",
  keywords: [
    "password protect pdf online free",
    "lock pdf online",
    "encrypt pdf free",
    "pdf password protect no upload",
    "add password to pdf",
    "secure pdf online",
    "pdf encryption free",
    "protect pdf no signup",
  ],
  openGraph: {
    title: "Password Protect PDF Online Free — No Upload",
    description:
      "Add a password to your PDF online for free. Lock and encrypt your PDF files instantly in your browser — no upload, no signup.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image` }],
  },
  alternates: { canonical: PAGE_URL },
};

export default function PdfProtectPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Password Protect Tool",
        url: PAGE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Password protect PDF files online for free. Add encryption to your PDF documents instantly in your browser with no file upload.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to add a password here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Your PDF and password never leave your browser. All encryption is done client-side using pdf-lib — nothing is sent to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What type of encryption is used?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool uses PDF RC4 128-bit encryption which provides standard password protection compatible with Adobe Acrobat and most PDF readers.",
            },
          },
          {
            "@type": "Question",
            name: "Can I remove the password later?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Use our PDF Unlock tool to remove the password protection from a PDF file.",
            },
          },
          {
            "@type": "Question",
            name: "Will the password protect against printing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool adds a user password to open the PDF. You can choose to also restrict printing and copying via the owner password settings.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "PDF Protect", item: PAGE_URL },
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                PDF Password Protect
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Password protect your PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  free &amp; no upload
                </span>
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Add a password to your PDF files instantly in your browser. Keep sensitive documents secure — no file upload, no server, completely private.
              </p>
            </div>
            <div className="mt-8">
              <PdfProtectClient />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "100% private", text: "Your PDF and password never leave your device. Encryption runs entirely in your browser." },
                { title: "Instant encryption", text: "Password protection is applied immediately — no waiting for server processing." },
                { title: "Widely compatible", text: "Protected PDFs open in Adobe Acrobat, Preview, Chrome, and all major PDF readers." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">How to Password Protect a PDF</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600">
              <li>Upload your PDF by clicking the upload area or dragging it in.</li>
              <li>Enter a strong password in the password field.</li>
              <li>Confirm the password to avoid typos.</li>
              <li>Click &quot;Protect PDF&quot; and download the encrypted file.</li>
            </ol>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Contracts", "Financial reports", "Personal documents", "Confidential files"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is there a file size limit?", a: "No hard limit. Processing happens entirely in your browser, so performance depends on your device. Most PDFs of any typical size work fine." },
                { q: "Can I protect a PDF that already has a password?", a: "You'll need to unlock the PDF first using our PDF Unlock tool, then re-protect it with a new password." },
                { q: "What happens if I forget the password?", a: "We cannot recover your password — encryption is done locally and we have no access to your files or passwords. Always keep a note of your password." },
                { q: "Does this work on all PDF readers?", a: "Yes. The password-protected PDF is compatible with Adobe Acrobat Reader, macOS Preview, Google Chrome, and all major PDF viewers." },
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
              Use our free online PDF password protect tool to lock PDF files, encrypt PDFs, and secure sensitive documents. This browser-based PDF encryption tool lets you add password protection to any PDF without uploading your file to a server. Ideal for securing contracts, financial reports, personal documents, and confidential files before sharing via email or cloud storage.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-unlock" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Unlock</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
