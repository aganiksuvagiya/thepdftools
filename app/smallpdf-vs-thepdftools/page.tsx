import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-growth";

const PAGE_URL = `${SITE_URL}/smallpdf-vs-thepdftools`;

export const metadata: Metadata = {
  title: "Smallpdf vs thepdftools - Free No-Signup Tools",
  description:
    "Compare Smallpdf vs thepdftools for free PDF compression, merge, split, and conversion workflows with no signup friction.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Smallpdf vs thepdftools - Free No-Signup Tools",
    description:
      "A practical comparison for people who want faster, lighter PDF and image tools.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smallpdf vs thepdftools",
    description: "Compare free browser-first PDF and image workflows.",
  },
};

export default function SmallpdfComparisonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Smallpdf vs thepdftools",
    description:
      "Compare Smallpdf vs thepdftools for free PDF and image workflows.",
    url: PAGE_URL,
    datePublished: "2026-04-14T00:00:00Z",
    author: { "@type": "Organization", name: "thepdftools" },
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Smallpdf Alternative - No Signup
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Smallpdf vs thepdftools
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            If you search for Smallpdf alternatives free, you probably need one
            quick action: compress a PDF, merge files, split pages, or convert a
            document. Thepdftools focuses on fast browser-first workflows with
            no signup gate for those everyday jobs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/pdf-compress" className="rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white">
              Try PDF Compressor
            </Link>
            <Link href="/pdf-merge" className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              Merge PDFs
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["No Upload Required", "Use browser-first processing where supported for private document workflows."],
            ["100% Privacy", "A lighter flow reduces unnecessary file exposure and account friction."],
            ["Instant Processing", "Open the exact task page, run the tool, and download the result."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Which one should you use?
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            Use a large suite when you need team accounts, cloud storage, and
            enterprise workflows. Use thepdftools when the job is specific and
            urgent: compress PDF without upload, merge PDF online free no
            upload, convert JPG to PNG online free fast, or resize image online
            no signup. This page is intentionally focused on those low-friction
            long-tail searches because they convert better than generic
            category traffic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["/pdf-compress", "PDF Compressor"],
              ["/pdf-merge", "PDF Merge"],
              ["/pdf-split", "PDF Split"],
              ["/pdf-to-word", "PDF to Word"],
              ["/image-compressor", "Image Compressor"],
              ["/jpg-to-png", "JPG to PNG"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
