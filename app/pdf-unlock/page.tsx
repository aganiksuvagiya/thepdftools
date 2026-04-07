import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfUnlockClient = dynamic(() => import("./PdfUnlockClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Unlock Tool Online — Remove PDF Restrictions",
  description:
    "Remove restrictions from PDF files for free online. Unlock printing, copying, and editing restrictions instantly in your browser. No upload, no signup — 100% private and secure.",
  keywords: [
    "pdf unlock",
    "remove pdf password",
    "pdf password remover",
    "unlock pdf online free",
    "pdf unlocker",
    "remove pdf protection",
    "unlock pdf file",
    "pdf password removal",
    "decrypt pdf",
    "open locked pdf",
    "free pdf unlocker",
  ],
  openGraph: {
    title: "Free PDF Unlock Tool Online — Remove PDF Restrictions",
    description:
      "Remove restrictions from PDF files for free online. Unlock printing, copying, and editing restrictions instantly in your browser. No upload, no signup — 100% private and secure.",
    url: "https://thepdftools.site/pdf-unlock",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-unlock",
  },
};

export default function PdfUnlockPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF Unlock Tool",
        url: "https://thepdftools.site/pdf-unlock",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Remove restrictions from PDF files for free online. Unlock printing, copying, and editing restrictions instantly in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it legal to unlock a PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, it is completely legal to remove restrictions from a PDF that you own or have authorization to access. This tool is designed for removing restrictions from your own documents.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to unlock my PDF here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% safe. Your PDF never leaves your browser. All processing happens client-side using JavaScript, so no data is uploaded to any server. Your files remain completely private.",
            },
          },
          {
            "@type": "Question",
            name: "What types of PDF restrictions can be removed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool removes owner-password restrictions such as printing, copying text, editing, and form-filling restrictions. It works with PDFs that have permission-based restrictions set by the document owner.",
            },
          },
          {
            "@type": "Question",
            name: "Does this work on all protected PDFs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool removes owner-level restrictions (printing, copying, editing). PDFs encrypted with a user password that prevents opening the file entirely require decryption software.",
            },
          },
          {
            "@type": "Question",
            name: "Will unlocking change the PDF content?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Unlocking simply removes the restrictions. All pages, text, images, and formatting remain exactly the same in the unlocked PDF.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://thepdftools.site",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "PDF Unlock",
            item: "https://thepdftools.site/pdf-unlock",
          },
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
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                PDF Unlock
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Unlock your PDFs
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  and remove password protection
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload a restricted PDF and remove printing, copying, and
                editing restrictions instantly. Everything runs in your browser
                — your file is never uploaded to any server.
              </p>
            </div>

            <div className="mt-8">
              <PdfUnlockClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for access",
                  text: "Remove printing, copying, and editing restrictions so you can use your PDFs freely.",
                },
                {
                  title: "Best for sharing",
                  text: "Create an unrestricted copy to share with colleagues who need to print or copy text.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No server uploads.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Tips
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>
                Make sure you have the correct password before attempting to
                unlock.
              </li>
              <li>
                The unlocked PDF is a brand-new file — your original stays
                unchanged.
              </li>
              <li>
                This tool requires the user password. It does not crack or guess
                passwords.
              </li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Your own PDFs",
                "Team documents",
                "Archived files",
                "Shared reports",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              How to Unlock a PDF Online
            </h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>
                Upload your restricted PDF by dragging and dropping or clicking
                the upload area. The tool automatically detects if the file has
                restrictions.
              </li>
              <li>
                Click the Unlock button. The tool removes owner-level
                restrictions such as printing, copying, and editing — all
                processing happens in your browser.
              </li>
              <li>
                Download the unlocked PDF instantly. The new file has no
                restrictions and can be printed, copied, and edited freely.
              </li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Why Use Our Free PDF Unlock Tool?
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  100% Browser-Based
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your PDF and password never leave your device. All decryption
                  happens locally in your browser using JavaScript, keeping your
                  documents completely private and secure.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  No Signup Required
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  No account, no email, no registration. Just upload your
                  restricted PDF and download the unlocked file immediately.
                  It takes seconds.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  Preserves Original Quality
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  The unlocked PDF is an exact copy of the original with the
                  password removed. All pages, text, images, fonts, and
                  formatting are preserved perfectly.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  Works on Any Device
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Use this PDF unlocker on Windows, Mac, Linux, iPhone, or
                  Android. Any modern browser with JavaScript support works — no
                  software to install.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  q: "Is it legal to unlock a PDF?",
                  a: "Yes, it is completely legal to remove restrictions from a PDF that you own or have authorization to access. This tool is designed for unlocking your own documents. It is not intended for circumventing security on files you do not have permission to access.",
                },
                {
                  q: "Is it safe to unlock my PDF here?",
                  a: "Absolutely. Your PDF file never leaves your browser. All processing is performed client-side using JavaScript, so nothing is uploaded to any server. Your documents remain 100% private on your own device.",
                },
                {
                  q: "What restrictions can this tool remove?",
                  a: "This tool removes owner-level restrictions such as printing restrictions, copy-text restrictions, editing restrictions, and form-filling restrictions. These are permissions set by the PDF creator using an owner password.",
                },
                {
                  q: "Will unlocking change the content of my PDF?",
                  a: "No. Unlocking simply removes the restrictions. All pages, text, images, fonts, and formatting in the original PDF are preserved exactly as they are in the unlocked copy.",
                },
                {
                  q: "Does this work on all protected PDFs?",
                  a: "This tool works with PDFs that have owner-password restrictions (printing, copying, editing). PDFs that are encrypted with a user password preventing the file from being opened require the actual password and decryption software beyond what this tool provides.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Removing restrictions from a PDF is a common need for
              professionals, students, and anyone who works with protected
              documents. Whether you received a PDF that blocks printing,
              prevents copying text for research, or restricts editing and
              form-filling, our free online PDF unlock tool makes it simple to
              create a clean, unrestricted copy. Unlike other services that
              require you to upload sensitive files to a remote server, this PDF
              unlocker processes everything locally in your browser. Your file
              never leaves your device, making it the most private way to unlock
              PDF files online. The tool handles owner-password restrictions set
              by applications like Adobe Acrobat, Microsoft Word, Google Docs,
              and other popular PDF creators. Upload your restricted PDF, click
              Unlock, and download a brand-new file with all restrictions
              removed — ready to print, copy, edit, and share freely.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pdf-merge"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Merge
              </Link>
              <Link
                href="/pdf-split"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Split
              </Link>
              <Link
                href="/pdf-compress"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Compress
              </Link>
              <Link
                href="/pdf-to-image"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF to Image
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
