import type { Metadata } from "next";
import Link from "next/link";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — ThePDFTools",
  description:
    "ThePDFTools privacy policy. All file processing happens locally in your browser. No files are uploaded to our servers.",
  url: "https://thepdftools.site/privacy",
  keywords: [
    "thepdftools privacy policy",
    "browser-based file processing privacy",
    "no upload PDF tools privacy",
    "client-side document tools privacy",
  ],
});

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "WebPage",
        name: "Privacy Policy",
        url: "https://thepdftools.site/privacy",
        description: "Privacy policy for thepdftools, including local processing and limited analytics details.",
        author: { "@type": "Organization", name: "thepdftools Editorial Team" },
        dateModified: "2026-07-05",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://thepdftools.site/privacy" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Are my PDF and image files uploaded to a server?",
            acceptedAnswer: { "@type": "Answer", text: "No. File processing is designed to happen locally in your browser, so PDFs, images, and document contents stay on your device." },
          },
          {
            "@type": "Question",
            name: "Does the site use analytics or ads?",
            acceptedAnswer: { "@type": "Answer", text: "The site may load analytics and advertising scripts in production to measure usage and support the service, but those scripts do not change the core file-processing workflow staying in your browser." },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Privacy Policy</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime="2026-07-05">Updated July 5, 2026</time>
          </div>

          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
            <div>
              <h2 className="text-base font-semibold text-slate-900">No File Uploads</h2>
              <p className="mt-2">
                All file processing on ThePDFTools happens entirely in your browser using client-side JavaScript. Your files — PDFs, images, and documents — are never uploaded to our servers or any third-party servers. They never leave your device.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Analytics and Advertising</h2>
              <p className="mt-2">
                In production, the site may load analytics or advertising scripts to understand traffic and support the service. Those scripts operate separately from the document and image tools, which are designed to process files locally in the browser rather than uploading them for server-side handling.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Cookies and Basic Usage Signals</h2>
              <p className="mt-2">
                Third-party scripts may set cookies or similar identifiers for measurement, fraud prevention, or ad delivery. You can manage those settings through your browser controls and standard consent tools where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Contact</h2>
              <p className="mt-2">
                If you have questions about this privacy policy, please reach out via the contact information on our site.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">References</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                    Google Search Central guidance on people-first content
                  </a>
                </li>
                <li>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                    MDN reference for browser-based cryptographic APIs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex gap-4 text-sm">
            <Link href="/" className="text-brand-600 hover:underline font-medium">← Back to Tools</Link>
            <Link href="/about" className="text-slate-500 hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
