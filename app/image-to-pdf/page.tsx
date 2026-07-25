import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const ImageToPdfClient = dynamic(() => import("./ImageToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/image-to-pdf`;

const pageTitle = "Image to PDF Online Free — Convert JPG, PNG, or WebP to PDF";
const pageDescription =
  "Convert JPG, PNG, or WebP images into a single PDF in your browser. Choose page size, orientation, and margins, and reorder images before converting. No upload, no signup.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: PAGE_URL,
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "convert image to pdf online free",
    "combine images to pdf",
    "photo to pdf converter",
    "webp to pdf",
  ],
  imageAlt: "Image to PDF converter combining multiple photos into one document",
});

const howToSteps = [
  {
    name: "Add your images",
    text: "Open the converter above and drop in JPG, PNG, or WebP images, or click to browse. You can add multiple images at once.",
  },
  {
    name: "Reorder if needed",
    text: "Hover over an image and use the up/down arrow buttons to change its position in the final PDF.",
  },
  {
    name: "Choose layout options",
    text: "Pick a page size (A4, Letter, or Fit to Image), orientation, and margin.",
  },
  {
    name: "Convert",
    text: "Click Convert to PDF. Each image is placed on its own page, scaled and centered based on your settings.",
  },
  {
    name: "Save",
    text: "The finished PDF downloads automatically as images.pdf.",
  },
] as const;

const faqItems = [
  {
    q: "Can I reorder images before converting them to PDF?",
    a: "Yes. Hover over any image thumbnail and use the up/down arrow buttons to move it. There is no drag-and-drop reordering — the hover arrows are the way to change image order.",
  },
  {
    q: "What image formats can I convert to PDF?",
    a: "JPG, JPEG, PNG, and WebP are supported as inputs. You can mix formats in the same batch.",
  },
  {
    q: "Will a PNG's transparent background stay transparent in the PDF?",
    a: "No. Every image is embedded into the PDF as a JPEG, and JPEG has no transparency channel, so a PNG's transparent areas will be flattened to a solid background color rather than staying see-through. If you rely on transparency, check the output before using it for anything design-sensitive.",
  },
  {
    q: "What does \"Fit to Image\" page size do?",
    a: "It creates a PDF page sized to match the image's pixel dimensions (assuming a 96 DPI conversion), rather than fitting the image onto a standard A4 or Letter page. Use this when you want the page shape to match the photo exactly instead of adding letterboxing.",
  },
  {
    q: "Can I choose portrait or landscape orientation?",
    a: "Yes, for A4 and Letter page sizes. Orientation is not selectable in Fit to Image mode, since the page shape is derived directly from each image's own dimensions.",
  },
  {
    q: "Does this tool upload my photos to a server?",
    a: "No. Images are read and assembled into a PDF locally in your browser using jsPDF — files are not sent to a server to be converted.",
  },
  {
    q: "Is there a limit on how many images I can combine?",
    a: "There's no fixed limit set by the tool. Since everything runs in your browser, a very large batch of high-resolution images depends on your device's available memory rather than a server-side cap.",
  },
  {
    q: "Will each image be on its own page?",
    a: "Yes. Every image you add becomes exactly one page in the output PDF, in the order shown in the image list.",
  },
  {
    q: "What's the difference between margin settings?",
    a: "None uses the full page with no border. Small and Medium add increasing white space around each image, useful for a more document-like or print-ready look.",
  },
  {
    q: "Can I remove an image after adding it, before converting?",
    a: "Yes. Hover over the thumbnail and use the remove (X) button to drop it from the batch.",
  },
  {
    q: "Does converting reduce image quality?",
    a: "Every image is re-encoded as JPEG when it's placed into the PDF, which is a lossy format. For most photos this isn't visually noticeable, but a very high-quality PNG source will lose some fidelity in the process.",
  },
  {
    q: "Can I use this for scanned documents or receipts?",
    a: "Yes. This is one of the most common uses — photographing or scanning a document as an image, then combining several pages into one PDF for submission or archiving.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes, the interface is responsive, though converting many high-resolution photos may be slower on an older phone than on a desktop.",
  },
  {
    q: "Is my PDF saved anywhere after I close the tab?",
    a: "No. The PDF is generated and downloaded directly to your device; nothing is retained in a server-side account or database.",
  },
  {
    q: "What happens if an image fails to load?",
    a: "The tool shows an error and skips that file, letting you continue with the remaining images. Check that the file is a valid JPG, PNG, or WebP.",
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
      name: "Image to PDF",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Convert JPG, PNG, or WebP images into a single PDF entirely in the browser",
        "Combine multiple images with one image per page",
        "Reorder images with up/down controls before converting",
        "Choose A4, Letter, or Fit to Image page size, orientation, and margins",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to convert images to PDF online",
      description: "A workflow for combining JPG, PNG, or WebP images into a single PDF document.",
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
        { "@type": "ListItem", position: 3, name: "Image to PDF", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function ImageToPdfPage() {
  const lastUpdated = getLastUpdated("app/image-to-pdf/page.tsx");

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
          { label: "Image to PDF" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert images to
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  professional PDF files
                </span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Combine JPG, PNG, or WebP images into a single PDF instantly in
                your browser. Reorder them with the hover arrow controls, pick
                a page size and margin, and download — no signup, no upload
                to a server.
              </p>
            </div>

            <div className="mt-8">
              <ImageToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for documents",
                  text: "Turn scanned pages, receipts, and photos into organized PDF documents for easy sharing.",
                },
                {
                  title: "Best for sharing",
                  text: "Combine multiple images into one PDF file that anyone can open on any device.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device with browser-only processing. No files are uploaded.",
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
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use &ldquo;Fit to Image&rdquo; page size when you want to preserve each image&apos;s exact pixel dimensions instead of A4/Letter.</li>
              <li>Hover over a thumbnail to reveal the reorder and remove controls — there&apos;s no drag-and-drop.</li>
              <li>Choose &ldquo;None&rdquo; margin for full-bleed photo pages or &ldquo;Medium&rdquo; for document-style layouts.</li>
              <li>If a source image has transparency, check the output — transparent areas are flattened since the PDF embeds JPEGs.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Scanned documents", "Photo albums", "Receipts & invoices", "Presentations"].map((item) => (
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

        <div className="mt-14 space-y-8">
          {/* What this tool does */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">What This Tool Actually Does</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                This converter builds a PDF from your images using jsPDF,
                entirely in your browser. Each image becomes one page, scaled
                to fit your chosen page size and margin, or sized to match the
                image itself in Fit to Image mode. Reordering happens through
                hover-revealed up/down arrows on each thumbnail — not
                drag-and-drop.
              </p>
              <p>
                One detail worth knowing: every image is embedded as a JPEG
                regardless of its original format. That means a transparent
                PNG will lose its transparency in the output, flattened to a
                solid background instead. For ordinary photos, receipts, and
                scans this has no visible effect — it mainly matters for
                logos or graphics with a transparent background.
              </p>
            </div>
          </div>

          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Images to PDF Online</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Real-World Examples</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Expense Receipts</h3>
                <p className="mt-1 text-sm text-slate-500">Photograph each receipt, add them in order, and convert to one PDF for an expense report instead of attaching several separate photos.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Scanned Assignment Pages</h3>
                <p className="mt-1 text-sm text-slate-500">Combine photographed homework pages in the right order using the reorder arrows before submitting as one file.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Property Listing Photos</h3>
                <p className="mt-1 text-sm text-slate-500">Use Fit to Image so each photo's own aspect ratio is preserved rather than being letterboxed onto an A4 page.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">ID or Document Scans</h3>
                <p className="mt-1 text-sm text-slate-500">Combine the front and back of an ID card into a single two-page PDF for a form that only accepts one file.</p>
              </div>
            </div>
          </div>

          {/* Common mistakes / Best practices */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Common Mistakes</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Expecting drag-and-drop reordering — use the hover arrow buttons instead.</li>
                <li>Converting a transparent PNG logo and being surprised the transparency is gone.</li>
                <li>Using A4/Letter for a panoramic photo and getting a lot of empty margin space — try Fit to Image instead.</li>
                <li>Not checking image order before converting, then having to redo the PDF.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Best Practices &amp; Expert Tips</h2>
              <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
                <li>Use Fit to Image for photos and scans where preserving the original aspect ratio matters most.</li>
                <li>Use A4/Letter with Medium margins for a more document-style, print-ready look.</li>
                <li>Add all your images first, then reorder once, rather than reordering repeatedly mid-batch.</li>
                <li>Compress the final PDF afterward if it needs to fit a portal's size limit.</li>
              </ul>
            </div>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use This Image to PDF Converter</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Upload to Any Server</h3>
                <p className="mt-1 text-sm text-slate-500">Your images never leave your device. All conversion happens locally in your browser using jsPDF.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Combine Multiple Images</h3>
                <p className="mt-1 text-sm text-slate-500">Add as many images as you need and combine them into a single, organized PDF, one image per page.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Custom Page Layout</h3>
                <p className="mt-1 text-sm text-slate-500">Choose from A4, Letter, or Fit to Image page sizes, set portrait or landscape orientation, and adjust margins.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Reorder Before Converting</h3>
                <p className="mt-1 text-sm text-slate-500">Use the hover arrow controls to move images up or down, or remove one from the batch entirely.</p>
              </div>
            </div>
          </div>

          {/* Privacy, Limitations, Trust */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Privacy &amp; Security</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Images are assembled into a PDF locally in your browser using
                jsPDF — nothing is uploaded to a server to complete the
                conversion, which matters for personal photos, ID scans, and
                receipts.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Tool Limitations</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-7 text-slate-600">
                <li>Reordering is hover-and-click, not drag-and-drop.</li>
                <li>All images are re-encoded as JPEG — transparency and some fine detail can be lost.</li>
                <li>Accepts JPG, PNG, and WebP only.</li>
                <li>Fit to Image assumes 96 DPI when converting pixel dimensions to a physical page size.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">Why Trust This Page</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This page is written and maintained by the thepdftools editorial
              team and is checked directly against the live converter's
              behavior, including exactly how reordering and page sizing work.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqItems.map((item) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related PDF Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/html-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">HTML to PDF</Link>
            </div>
          </div>
          <SeoReferences
            links={[
              { href: "https://artskydj.github.io/jsPDF/docs/", label: "jsPDF: Client-side PDF creation" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: Common web image formats" },
              { href: "https://web.dev/learn/images/", label: "web.dev: Image quality and format tradeoffs" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
