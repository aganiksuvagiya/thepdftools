import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-growth";
import {
  PDF_COMPRESS_VARIANTS,
  type PdfCompressVariant,
} from "@/lib/pdf-compress-variants";

const PdfCompressClient = dynamic(
  () => import("../app/pdf-compress/PdfCompressClient"),
  {
    loading: () => (
      <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
    ),
    ssr: false,
  }
);

export function buildPdfCompressVariantMetadata(
  variant: PdfCompressVariant
): Metadata {
  const url = `${SITE_URL}/${variant.slug}`;

  return {
    title: variant.title,
    description: variant.description,
    keywords: [
      variant.primaryKeyword,
      "compress pdf online free",
      "pdf compressor no upload",
      "reduce pdf file size online",
      "free pdf compressor",
      "browser based pdf tools",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: variant.title,
      description: variant.description,
      url,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: variant.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: variant.title,
      description: variant.description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default function PdfCompressVariantPage({
  variant,
}: {
  variant: PdfCompressVariant;
}) {
  const pageUrl = `${SITE_URL}/${variant.slug}`;
  const siblingVariants = PDF_COMPRESS_VARIANTS.filter(
    (item) => item.slug !== variant.slug
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: variant.title,
        url: pageUrl,
        description: variant.description,
        mainEntity: {
          "@id": `${pageUrl}#pdf-compressor-app`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#pdf-compressor-app`,
        name: "PDF Compressor",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        keywords: [variant.primaryKeyword, "compress pdf online free"],
        description: variant.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: variant.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "PDF Compress",
            item: `${SITE_URL}/pdf-compress`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: variant.shortTitle,
            item: pageUrl,
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

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                {variant.badge}
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                {variant.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {variant.hero}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pdf-compressor"
                  className="inline-flex justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
                >
                  Compress PDF Now
                </a>
                <Link
                  href="/pdf-compress"
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  Open Main PDF Compressor
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["No Upload Required", "Your PDF stays in the browser workflow."],
                ["Fast Compression", "Reduce file size in seconds for common documents."],
                ["Free to Use", "No signup, no watermark, no software install."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h2 className="text-sm font-bold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pdf-compressor" className="mt-8">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <PdfCompressClient />
          </div>
        </section>

        <article className="mt-8 space-y-8">
          {variant.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Related PDF workflows
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-700">
              After compression, you may also need to split a large document,
              merge multiple PDFs, unlock a protected file, or convert PDF pages
              into images for sharing and submission.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-compress" className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-800">
                PDF Compress
              </Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PDF Split
              </Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PDF Merge
              </Link>
              <Link href="/pdf-unlock" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PDF Unlock
              </Link>
            </div>
            <div className="mt-6 border-t border-brand-100 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                More compression search pages
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {siblingVariants.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Frequently asked questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {variant.faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-400 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
