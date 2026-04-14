import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-growth";

const PAGE_URL = `${SITE_URL}/ilovepdf-alternative`;

export const metadata: Metadata = {
  title: "iLovePDF Alternative Free - No Signup PDF Tools",
  description:
    "Use a free iLovePDF alternative for PDF compression, merge, split, and conversion tasks with fast browser-first workflows.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "iLovePDF Alternative Free - No Signup PDF Tools",
    description:
      "Try free browser-first PDF tools for common document workflows.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iLovePDF Alternative Free",
    description: "Free PDF tools for no-signup browser workflows.",
  },
};

export default function IlovePdfAlternativePage() {
  const tools = [
    ["/pdf-compress", "Compress PDF", "Reduce file size for email and forms."],
    ["/pdf-merge", "Merge PDF", "Combine multiple documents into one PDF."],
    ["/pdf-split", "Split PDF", "Extract pages or split long documents."],
    ["/pdf-to-word", "PDF to Word", "Extract editable text from PDFs."],
    ["/image-to-pdf", "Image to PDF", "Build PDFs from JPG, PNG, or WebP files."],
    ["/pdf-to-image", "PDF to Image", "Export PDF pages as image files."],
  ];

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            iLovePDF Alternative Free
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free iLovePDF Alternative for Everyday PDF Work
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Thepdftools is a practical iLovePDF alternative when you want free
            PDF tools no signup: compress, merge, split, convert, and prepare
            documents from a focused browser-first interface.
          </p>
          <Link
            href="/pdf-compress"
            className="mt-7 inline-flex rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Try Tool Now
          </Link>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {tools.map(([href, title, text]) => (
            <Link
              key={href}
              href={href}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-200"
            >
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand-700">
                Open tool
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Why this page can win free alternative searches
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Alternative pages convert because the visitor already knows the
            category and is looking for a better fit. This page targets phrases
            like iLovePDF alternative free, free PDF tools no signup, compress
            PDF without upload, and merge PDF online free no upload. It gives
            search engines a clear comparison landing page and gives users a
            direct path into the exact tool they need.
          </p>
        </section>
      </main>
    </div>
  );
}
