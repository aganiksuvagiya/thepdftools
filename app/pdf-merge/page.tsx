import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { citySeoPages } from "@/lib/seo-cities";

const PdfMergeClient = dynamic(() => import("./PdfMergeClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free - Combine PDFs, Images & Certificates",
  description:
    "Merge PDF files online free. Combine PDFs, images, certificates, marksheets, and screenshots into one clean PDF for job forms, admissions, and office work with no signup required.",
  keywords: [
    "pdf merge",
    "merge pdf online",
    "merge pdf files online free",
    "combine pdf files",
    "pdf combiner",
    "free pdf merger",
    "join pdf",
    "merge pdf free",
    "merge pdf online free no upload",
    "combine pdf files no signup",
    "merge pdf without watermark",
    "join pdf files online free",
    "combine pdf online",
    "pdf merger online",
    "merge multiple pdf files",
    "merge pdf and images",
    "merge images and pdf into one file",
    "merge pdf and jpg",
    "merge pdf and png",
    "merge pdf and photo",
    "merge pdf and image online",
    "combine pdf and images online",
    "merge image and pdf online free",
    "merge resume and certificates pdf",
    "merge certificates into one pdf",
    "merge documents into one pdf",
    "merge pdf for job application",
    "merge documents for job application",
    "merge marksheets and certificates pdf",
    "merge documents for college admission",
    "combine resume and certificates into one pdf",
    "merge scanned documents pdf",
    "merge screenshot to pdf",
    "merge screenshots into pdf",
    "merge pdf for college admission",
    "merge supporting documents into one pdf",
    "merge admit card and marksheet pdf",
    "merge id proof and certificate pdf",
    "merge multiple documents into one pdf",
    "combine certificates into one pdf online",
    "join scanned pages into one pdf",
    "merge pdf on mobile",
    "merge pdf online for free without watermark",
  ],
  openGraph: {
    title: "Merge PDF Files Online Free - Combine PDFs, Images & Certificates",
    description:
    "Merge PDF files online free. Combine PDFs, images, certificates, marksheets, and screenshots into one clean PDF for job forms, admissions, and office work.",
    url: "https://thepdftools.site/pdf-merge",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-merge",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free PDF Merge Tool",
      url: "https://thepdftools.site/pdf-merge",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Merge multiple PDF files into one document for free online. Perfect for resumes, certificates, forms, assignments, and office files.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it safe to merge PDFs here?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server.",
          },
        },
        {
          "@type": "Question",
          name: "How many PDFs can I merge?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device's memory. Most users can merge dozens of files without any issues.",
          },
        },
        {
          "@type": "Question",
          name: "Can I reorder pages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document follows the exact order you set.",
          },
        },
        {
          "@type": "Question",
          name: "Can I merge resume and certificates into one PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. This tool is useful for job applications, college admissions, and office submissions where you need one clean PDF with documents in the right order.",
          },
        },
        {
          "@type": "Question",
          name: "Can I merge PDF and image files together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can combine PDF files with JPG, PNG, and WebP images to create one final PDF document.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work offline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "PDF Merge", "item": "https://thepdftools.site/pdf-merge" },
      ],
    },
  ],
};

export default function PdfMergePage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                PDF Merge
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Merge PDF files online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for forms, resumes, and office work
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Combine multiple PDF files into one clean document in seconds.
                Perfect for resumes, certificates, marksheets, assignments, and
                office submissions. Reorder files before merging and download
                one final PDF with no signup required.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {[
                  "Merge PDF",
                  "Merge Resume & Certificates",
                  "Merge for Job Form",
                  "Merge Assignment Pages",
                  "Mobile Friendly",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-brand-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <PdfMergeClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for job forms", text: "Combine resume, certificates, marksheets, and supporting files into one upload-ready PDF." },
                { title: "Best for students", text: "Merge assignment pages, screenshots, scanned notes, and study material in the right order." },
                { title: "Best for office work", text: "Build one clean PDF from reports, invoices, signed pages, and document bundles." },
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
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Keep your most important file first, like your resume or cover page.</li>
              <li>Arrange marksheets, certificates, or annexures in the exact upload order required.</li>
              <li>After merging, use Compress PDF if the final file is too large for a portal.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Resume + certificates", "College admissions", "Government forms", "Office document packs"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Merge PDF Files Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload the PDF files you want to combine.</li>
              <li>Add files in the order you want them to appear in the final document.</li>
              <li>Use the move buttons to place resume, certificates, forms, or report pages correctly.</li>
              <li>Click the merge button to create one final PDF.</li>
              <li>Download the merged file instantly with no email or signup required.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Merge PDFs for Real Tasks, Not Just Files</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Job Application Pack</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Put your resume first, then certificates, marksheets, ID proof, or supporting documents in one clean PDF for upload.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">College Admission Pack</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Combine admission form pages, transcripts, marksheets, and category documents into one file before submission.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Assignment Submission</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Merge notes, exported pages, scanned homework, and screenshots into one PDF that is easier to share and submit.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Office Document Bundle</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Build one final PDF from reports, invoices, signed pages, annexures, and support documents for clean handoff.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Popular Searches</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              People often use this tool to merge PDF files online free, combine resume and certificates into one PDF, merge marksheets for admission, and join screenshots or scanned pages into one clean document.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "merge pdf files online free",
                "merge resume and certificates pdf",
                "merge pdf for job application",
                "merge documents for college admission",
                "merge pdf and images",
                "combine certificates into one pdf online",
                "merge scanned documents pdf",
                "merge screenshots into pdf",
              ].map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PDF Merger?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Built for Upload Workflows</h3>
                <p className="mt-1 text-sm text-slate-500">Use it for resumes, form attachments, college admissions, and office submissions where document order matters.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Easy Reordering</h3>
                <p className="mt-1 text-sm text-slate-500">Rearrange your files before merging so the final PDF follows the exact sequence required by a portal or recipient.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Private Browser-Based Processing</h3>
                <p className="mt-1 text-sm text-slate-500">Everything runs in your browser using pdf-lib. Your files are not sent to a remote merge queue, which keeps the workflow private.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Watermark</h3>
                <p className="mt-1 text-sm text-slate-500">The final PDF stays clean and professional with no watermark, no forced account, and no branding added to your documents.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Best Next Step After Merging</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If your merged PDF becomes too large for email or portal upload, the next step is usually compression. Most users merge first, then reduce the final file size before uploading.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-compress" className="rounded-full border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700 shadow-sm transition-colors hover:border-brand-300 hover:bg-white">
                Compress Final PDF
              </Link>
              <Link href="/compress-pdf-to-100kb" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                Compress PDF to 100KB
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is it safe to merge PDFs here?", a: "Yes, completely safe. Your PDF files never leave your browser. All merging is done client-side using JavaScript (pdf-lib), so no data is uploaded to any server." },
                { q: "How many PDFs can I merge at once?", a: "There is no fixed limit on the number of PDFs you can merge. Processing happens in your browser, so performance depends on your device's memory. Most users can merge dozens of files without any issues." },
                { q: "Can I reorder the files before merging?", a: "Yes, you can reorder the PDF files before merging using the arrow buttons. The final merged document will follow the order you set." },
                { q: "Can I merge resume and certificates into one PDF?", a: "Yes. This tool is useful for job applications, college admissions, and office submissions where you need one final PDF with documents arranged in the right order." },
                { q: "Can I merge PDF and image files together?", a: "Yes. You can combine PDF files with JPG, PNG, and WebP images to create one final PDF document." },
                { q: "Does it work offline?", a: "Once the page is loaded, the merging functionality works entirely in your browser. However, you need an internet connection to initially load the tool." },
                { q: "Is there a file size limit?", a: "There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device's available memory. Files up to 100 MB typically work without issues." },
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

          {/* SEO paragraph */}
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Our free online PDF merge tool lets you combine PDF files and merge multiple PDFs into one clean document without signup. It is useful for resumes, certificates, marksheets, scanned documents, office files, reports, and assignment pages. Reorder files before merging, download instantly, and use the final PDF for portal uploads, email sharing, or document submission on any device.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Guides</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/blog/how-to-merge-pdf-files-online" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">How to Merge PDF Files Online</Link>
              <Link href="/blog/best-free-pdf-tools-india" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Best Free PDF Tools in India</Link>
              <Link href="/blog/compress-pdf-for-email-online" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF for Email</Link>
            </div>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF</Link>
              <Link href="/compress-pdf-to-100kb" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Compress PDF to 100KB</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/pdf-to-image" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Image</Link>
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/screenshot-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Screenshot to PDF</Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Merge PDF in top cities</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-500">
              City-focused landing pages help match location-based searches like "Ahmedabad PDF merge", "Mumbai PDF merger", and similar local queries while still sending users to the same browser-based tool.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {citySeoPages.slice(0, 8).map((city) => (
                <Link
                  key={city.slug}
                  href={`/merge-pdf-in-${city.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  Merge PDF in {city.city}
                </Link>
              ))}
            </div>
          </div>
          <ToolSeoGrowth slug="pdf-merge" />
        </div>
      </div>
    </div>
  );
}
