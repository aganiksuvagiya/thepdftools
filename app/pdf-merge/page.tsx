import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PdfMergeClient = dynamic(() => import("./PdfMergeClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/pdf-merge`;

const pageTitle = "Merge PDF Files Online Free - Combine PDFs, Images & Certificates";
const pageDescription =
  "Merge PDF files and JPG, PNG, or WebP images into one document in your browser. Reorder pages before combining, then download — no signup, no upload, no watermark.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "pdf merge",
    "merge pdf online free",
    "combine pdf files",
    "merge pdf and images",
    "merge resume and certificates pdf",
    "merge pdf for job application",
    "merge scanned documents pdf",
    "join pdf files online free",
  ],
  imageAlt: "PDF merge tool combining multiple PDF and image files into one document",
});

const howToSteps = [
  {
    name: "Add your files",
    text: "Open the merge tool above and drop in the PDF and/or image files you want to combine. PDF, JPG, PNG, and WebP are all accepted in the same batch.",
  },
  {
    name: "Check the summary",
    text: "Review the file count, total pages, total size, and the PDF/image split shown above the file list.",
  },
  {
    name: "Reorder with the arrow buttons",
    text: "Use the up and down arrows on each file row to set the exact order your resume, certificates, or scanned pages should appear in.",
  },
  {
    name: "Merge",
    text: "Click Merge to combine everything into one PDF. Each image is placed on its own page, sized to fit an A4 page.",
  },
  {
    name: "Download",
    text: "Click Download merged.pdf to save the combined file to your device.",
  },
] as const;

const faqItems = [
  {
    q: "Can I merge PDF files without uploading them to a server?",
    a: "Yes. Merging runs in your browser using the pdf-lib library — files are read and combined locally, and are not sent to a remote server to be merged.",
  },
  {
    q: "Can I combine PDFs and images in the same merge?",
    a: "Yes. You can mix PDF files with JPG, PNG, and WebP images in one merge. Each image becomes its own page in the final PDF.",
  },
  {
    q: "What happens to an image's shape when it's added to the PDF?",
    a: "Each image is placed on its own A4-sized page and scaled to fit within the page margins while keeping its original aspect ratio — it isn't stretched, but it also isn't kept at its native page size.",
  },
  {
    q: "How do I control the order of the merged pages?",
    a: "Use the up and down arrow buttons on each file in the list before merging. There is no drag-and-drop reordering — the arrows are the only way to move a file's position.",
  },
  {
    q: "How many files can I merge at once?",
    a: "There's no fixed file-count limit set by the tool. Since everything runs in your browser, the practical ceiling depends on your device's available memory rather than a server-side cap.",
  },
  {
    q: "Is there a file size limit?",
    a: "No server-side limit is enforced. Very large combined files (hundreds of megabytes across all files) may slow down or fail depending on your device's memory, since merging happens entirely client-side.",
  },
  {
    q: "Can I merge a password-protected PDF?",
    a: "No. The tool needs to open each PDF's contents to copy its pages, so encrypted or password-protected PDFs will fail to merge until you remove the password first.",
  },
  {
    q: "Does merging add a watermark?",
    a: "No. The output is a clean PDF with no watermark and no branding added to your document.",
  },
  {
    q: "Can I remove a file after adding it, before merging?",
    a: "Yes. Each file row has a remove button so you can drop a file from the batch without starting over.",
  },
  {
    q: "What image formats can I include in a merge?",
    a: "JPG, JPEG, PNG, and WebP. Other formats like GIF, BMP, TIFF, or HEIC are not accepted directly — convert them to one of the supported formats first.",
  },
  {
    q: "Does the tool work offline once it's loaded?",
    a: "The merge itself runs client-side after the page has loaded, but you need an internet connection to load the tool the first time.",
  },
  {
    q: "Can I merge scanned pages that are individual image files?",
    a: "Yes. Scanned pages saved as JPG or PNG images can be added alongside PDF files and will each become one page of the final document.",
  },
  {
    q: "Will merging change the page size or orientation of my original PDFs?",
    a: "No. PDF pages are copied as-is, keeping their original size and orientation. Only image files are placed onto new, uniformly sized A4 pages.",
  },
  {
    q: "Why did my merge fail with an error?",
    a: "The most common causes are a password-protected PDF, a corrupted file, or an image that failed to load. Remove the problematic file and try merging the rest, then investigate that file separately.",
  },
  {
    q: "Can I use this to combine a resume with certificates for a job application?",
    a: "Yes. Add your resume PDF first, then certificates, marksheets, or ID documents (as PDF or image files), reorder them with the arrows, and merge into one submission-ready PDF.",
  },
  {
    q: "Can I use this for college admission document packs?",
    a: "Yes. It's commonly used to combine an admission form, transcripts, marksheets, and category or ID documents into a single PDF before uploading to a portal.",
  },
  {
    q: "What should I do if the merged PDF is too large for a portal?",
    a: "Merge first, then run the result through a compressor. Use PDF Compress for general size reduction, or Compress PDF to 100KB if the portal enforces that specific limit.",
  },
  {
    q: "Can I merge PDFs on mobile?",
    a: "Yes, the tool works in modern mobile browsers, though very large batches of files may be slower to process on a phone than on a desktop.",
  },
  {
    q: "Does the tool preserve PDF bookmarks or form fields?",
    a: "Page content is copied, but interactive elements like bookmarks, form fields, or embedded annotations from the source PDFs are not guaranteed to carry over into the merged file.",
  },
  {
    q: "Is my merged file saved anywhere after I close the tab?",
    a: "No. The merged file exists only in your browser's memory for that session. Closing or refreshing the tab clears it — download it first if you want to keep it.",
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
      name: "PDF Merge",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Merge multiple PDF files into one document entirely in the browser",
        "Combine PDF files with JPG, PNG, and WebP images in the same merge",
        "Reorder files with up/down controls before merging",
        "View file count, total pages, and total size before merging",
        "Download the combined PDF with no signup and no watermark",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to merge PDF files online",
      description: "A workflow for combining multiple PDF files, and optionally images, into one PDF document.",
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
        { "@type": "ListItem", position: 3, name: "PDF Merge", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function PdfMergePage() {
  const lastUpdated = getLastUpdated("app/pdf-merge/page.tsx");

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
          { label: "PDF Merge" },
        ]} />
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

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Combine PDF files, plus JPG, PNG, or WebP images, into one clean
                document. Reorder files with the arrow buttons before merging,
                then download — everything runs in your browser, with nothing
                uploaded to a server.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {[
                  "Merge PDF",
                  "Merge Resume & Certificates",
                  "Merge for Job Form",
                  "Merge Scanned Pages",
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
              <li>Remove the password from any locked PDF before adding it — encrypted PDFs will fail to merge.</li>
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
          {/* What is this tool */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">What This Tool Actually Does</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                This merger combines PDF files and image files (JPG, PNG, WebP)
                into a single PDF using pdf-lib, running entirely in your
                browser. Existing PDF pages are copied over at their original
                size and orientation. Each image you add becomes its own new
                page, scaled to fit an A4-sized sheet with a small margin —
                that's a deliberate tradeoff so mixed batches of scans and
                documents come out looking consistent, not a limitation you
                need to work around manually.
              </p>
              <p>
                Ordering is controlled with up/down arrow buttons on each file
                row rather than drag-and-drop, and the tool shows a live
                summary (file count, total pages, total size, PDF vs. image
                split) before you commit to merging.
              </p>
            </div>
          </div>

          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Merge PDF Files Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              {howToSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
          </div>

          {/* Real-life examples */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Merge PDFs for Real Tasks, Not Just Files</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Job Application Pack</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Resume PDF first, then certificates and marksheets (PDF or scanned images), then ID proof — reorder with the arrows so the recipient sees them in the sequence the form asks for.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">College Admission Pack</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Combine the admission form pages, transcripts, marksheets, and category documents into one file before submission.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Assignment Submission</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Merge exported notes with photographed homework pages saved as JPGs — each photo becomes its own page automatically.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Office Document Bundle</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Build one final PDF from reports, invoices, and signed pages for a clean handoff, then compress it if the recipient's inbox has a size limit.
                </p>
              </div>
            </div>
          </div>

          {/* Common mistakes / Best practices / Expert tips */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Common Mistakes</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Adding a password-protected PDF and expecting it to merge — it will fail until the password is removed.</li>
                <li>Not checking the file order before merging, then having to redo it after download.</li>
                <li>Assuming images keep their original page size — they're placed on new A4-sized pages instead.</li>
                <li>Merging dozens of very large scans on a low-memory phone and expecting desktop-level speed.</li>
                <li>Forgetting that bookmarks and form fields in source PDFs aren't guaranteed to carry over.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Best Practices &amp; Expert Tips</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Unlock any encrypted PDF before adding it to the batch.</li>
                <li>Set the order once, review the summary bar, then merge — avoid re-merging repeatedly on a large batch.</li>
                <li>Convert HEIC or GIF images to JPG or PNG first, since those formats aren't accepted directly.</li>
                <li>Compress the merged PDF afterward if a portal enforces a size limit like 100KB.</li>
                <li>Download the result immediately — closing the tab clears the merged file from memory.</li>
              </ul>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Troubleshooting</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                <strong>Merge fails with an error:</strong> check for a
                password-protected or corrupted PDF in the batch — remove it,
                merge the rest, then handle that file separately.
              </p>
              <p>
                <strong>An image didn't get added to the list:</strong> the
                tool only accepts JPG, PNG, and WebP images directly — convert
                other formats first.
              </p>
              <p>
                <strong>The merge is slow or the tab is unresponsive:</strong>{" "}
                large batches of high-resolution scans can strain a
                lower-memory device, since merging happens on your device, not
                a server. Try merging in smaller batches.
              </p>
              <p>
                <strong>An image page looks smaller than expected:</strong>{" "}
                images are fit inside an A4 page with margins, so a very
                wide or very tall image will be scaled down to fit rather than
                filling the entire page edge-to-edge.
              </p>
            </div>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use This PDF Merger</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Mixes PDFs and images natively</h3>
                <p className="mt-1 text-sm text-slate-500">No need to convert photos to PDF separately first — add them straight into the same merge.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Order control before you commit</h3>
                <p className="mt-1 text-sm text-slate-500">Rearrange files with the arrow buttons and review the summary bar before creating the final PDF.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Private, browser-based processing</h3>
                <p className="mt-1 text-sm text-slate-500">Merging runs in your browser using pdf-lib — your files are not sent to a remote merge queue.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No watermark, no signup</h3>
                <p className="mt-1 text-sm text-slate-500">The final PDF stays clean with no branding added and no account required.</p>
              </div>
            </div>
          </div>

          {/* Privacy, Security, Limitations, Trust */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Privacy &amp; Security</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your PDF and image files are merged locally in your browser
                using pdf-lib — nothing is uploaded to a server to complete
                the merge. This keeps resumes, certificates, admission forms,
                and government documents private while still producing one
                final PDF instantly.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Tool Limitations</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-7 text-slate-600">
                <li>Password-protected PDFs must be unlocked before merging.</li>
                <li>Accepts JPG, PNG, and WebP images only — not GIF, BMP, TIFF, or HEIC.</li>
                <li>Images are placed on new A4-sized pages, not their original page dimensions.</li>
                <li>Bookmarks, form fields, and annotations from source PDFs may not carry over.</li>
                <li>Reordering is manual (up/down arrows), not drag-and-drop.</li>
                <li>No fixed file-count limit, but very large batches depend on your device's memory.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">Why Trust This Page</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This page is written and maintained by the thepdftools editorial
              team and is checked directly against the live merge tool's
              behavior — the feature list and limitations above match what the
              tool actually does, including how it handles encrypted PDFs and
              mixed image formats.
            </p>
          </div>

          {/* Best Next Step */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Best Next Step After Merging</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If your merged PDF becomes too large for email or portal upload,
              the next step is usually compression. Most users merge first,
              then reduce the final file size before uploading.
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
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
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
              <Link href="/image-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to PDF</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://pdf-lib.js.org/", label: "pdf-lib: PDF merging in JavaScript" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: Supported web image formats" },
              { href: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/", label: "Adobe PDF standards overview" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
