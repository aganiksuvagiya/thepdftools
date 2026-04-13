import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfEditorClient = dynamic(() => import("./PdfEditorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF Editor Online — Edit PDF Files Directly in Your Browser",
  description:
    "Edit PDF files for free online. Add text, images, shapes, highlights, and drawings to any PDF. Delete, reorder, and manage pages. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "pdf editor",
    "edit pdf online",
    "pdf editor free",
    "edit pdf online free",
    "modify pdf",
    "pdf text editor",
    "online pdf editor",
    "free pdf editor no signup",
    "pdf editor no watermark",
    "edit pdf in browser",
    "annotate pdf online",
    "add text to pdf",
  ],
  openGraph: {
    title: "Free PDF Editor Online — Edit PDF Files Directly in Your Browser",
    description:
      "Edit PDF files for free online. Add text, images, shapes, highlights, and drawings to any PDF. No upload, no signup — runs entirely in your browser.",
    url: "https://thepdftools.site/pdf-editor",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-editor",
  },
};

export default function PdfEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Online PDF Editor",
        url: "https://thepdftools.site/pdf-editor",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Edit PDF files for free online. Add text, images, shapes, highlights, and freehand drawings. Delete and reorder pages. No signup, no server upload — 100% browser-based.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this PDF editor completely free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% free with no hidden costs, no trial period, and no premium tier. Edit as many PDFs as you like without any restrictions or watermarks.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to edit my PDF here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All rendering, editing, and saving is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I edit the existing text in my PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can cover existing text with a white rectangle (whiteout tool) and type new text on top. Direct inline text editing of PDFs in a browser is technically impossible due to the PDF format's complexity, but the whiteout-and-retype approach produces the same visual result.",
            },
          },
          {
            "@type": "Question",
            name: "What editing tools are available?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The editor includes: text boxes, image placement, freehand drawing, highlighter, shapes (rectangle, circle, line, arrow), whiteout tool, eraser, undo/redo, page management (delete, reorder, add blank pages), and zoom controls.",
            },
          },
          {
            "@type": "Question",
            name: "Can I edit multi-page PDFs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The editor supports multi-page PDFs with a thumbnail sidebar for easy navigation. You can edit each page individually, reorder pages, delete pages, and add blank pages.",
            },
          },
          {
            "@type": "Question",
            name: "How do I save my edited PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Click the 'Save PDF' button in the toolbar. The editor combines your edits with the original pages and generates a new PDF file that downloads automatically to your device.",
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
            name: "PDF Editor",
            item: "https://thepdftools.site/pdf-editor",
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
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-8 sm:px-10 sm:py-10">
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                PDF Editor
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Edit any PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  directly in your browser
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Add text, images, shapes, and annotations to any PDF file.
                Rearrange pages, highlight content, draw freehand — all without
                leaving your browser. No signup, no watermarks, completely
                private.
              </p>
            </div>
          </div>
        </div>

        {/* EDITOR */}
        <div className="mt-6">
          <PdfEditorClient />
        </div>

        {/* Feature cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Full editing suite",
              text: "Text, images, shapes, freehand drawing, highlighting, and whiteout tools — everything you need to modify any PDF.",
            },
            {
              title: "Page management",
              text: "Delete, reorder, and add blank pages. Navigate with the thumbnail sidebar and edit each page individually.",
            },
            {
              title: "100% private",
              text: "Your PDF never leaves your device. All rendering and editing happens locally in your browser using JavaScript.",
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

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Tips
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>
                Use the <strong>White-out</strong> tool to cover existing text,
                then add a new text box on top.
              </li>
              <li>
                Press <strong>Delete</strong> or <strong>Backspace</strong> to
                remove a selected element.
              </li>
              <li>
                Use <strong>Ctrl+Z</strong> / <strong>Cmd+Z</strong> to undo and{" "}
                <strong>Ctrl+Shift+Z</strong> to redo changes.
              </li>
              <li>
                Click a page thumbnail in the sidebar to jump between pages
                quickly.
              </li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Form filling",
                "Adding signatures",
                "Annotating documents",
                "Correcting typos",
                "Adding watermarks",
                "Redacting content",
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
              How to Edit a PDF Online for Free
            </h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>
                Upload your PDF by dragging it into the editor or clicking the
                upload area.
              </li>
              <li>
                Select an editing tool from the toolbar: text, draw, shapes,
                images, highlight, or whiteout.
              </li>
              <li>
                Click on the page to place your edits. Use the select tool to
                move, resize, or modify elements.
              </li>
              <li>
                Use the page thumbnails to navigate, reorder, delete, or add
                pages.
              </li>
              <li>
                Click &ldquo;Save PDF&rdquo; to download your edited document as
                a new PDF file.
              </li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Why Use Our Free Online PDF Editor?
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  No Server Upload
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your PDF never leaves your device. All rendering and editing
                  happens locally in your browser, keeping sensitive documents
                  100% private and secure.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  Full-Featured Toolbar
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add text, images, shapes, arrows, freehand drawings, and
                  highlights. Use the whiteout tool to cover existing content and
                  retype over it.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  Page Management
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Reorder pages with drag controls, delete unwanted pages, and
                  add blank pages. The thumbnail sidebar gives you a bird&apos;s-eye
                  view of your entire document.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">
                  No Signup, No Watermark
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Start editing immediately without creating an account. Your
                  saved PDF has no watermarks, no branding, and no restrictions
                  on the number of edits.
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
                  q: "Is this PDF editor completely free?",
                  a: "Yes, 100% free with no hidden costs, no trial period, and no premium tier. Edit as many PDFs as you like without any restrictions or watermarks.",
                },
                {
                  q: "Is it safe to edit my PDF here?",
                  a: "Absolutely. Your PDF files never leave your browser. All rendering, editing, and saving is done client-side using JavaScript, so no data is uploaded to any server. Your documents remain completely private on your device.",
                },
                {
                  q: "Can I edit existing text in a PDF?",
                  a: "You can use the whiteout tool to cover existing text with a white rectangle, then place a new text box on top with your desired content. This is the standard approach used by most online PDF editors, as true inline PDF text editing in a browser is not technically feasible.",
                },
                {
                  q: "What editing tools are available?",
                  a: "The editor includes: text boxes with font size, bold, and italic options; image placement; freehand drawing with brush size control; highlighter; shapes (rectangle, circle, line, arrow); whiteout tool for covering content; eraser; undo/redo; and page management tools.",
                },
                {
                  q: "Can I edit large, multi-page PDFs?",
                  a: "Yes. The editor supports multi-page PDFs with a thumbnail sidebar for quick navigation. You can edit each page individually, reorder pages, delete pages, and add blank pages. Performance depends on your device since everything runs in the browser.",
                },
                {
                  q: "How do I save my edited PDF?",
                  a: "Click the 'Save PDF' button in the toolbar. The editor renders all your edits on top of the original pages and generates a new PDF file that downloads automatically to your device.",
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
              Edit PDF files online for free with our browser-based PDF editor.
              Add text, images, shapes, freehand drawings, and highlights to any
              PDF document. Use the whiteout tool to cover and replace existing
              text. Manage pages with reorder, delete, and blank page tools.
              This free online PDF editor requires no signup, adds no
              watermarks, and processes everything locally in your browser for
              complete privacy. Whether you need to fill out forms, annotate
              documents, add signatures, correct typos, or redact sensitive
              information, our PDF editor gives you the tools you need without
              expensive software subscriptions. Works with any PDF file on any
              device with a modern web browser.
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
                href="/pdf-to-word"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF to Word
              </Link>
              <Link
                href="/pdf-to-image"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF to Image
              </Link>
              <Link
                href="/pdf-unlock"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                PDF Unlock
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
