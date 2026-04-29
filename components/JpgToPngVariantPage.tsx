import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-growth";
import {
  JPG_TO_PNG_VARIANTS,
  type JpgToPngVariant,
} from "@/lib/jpg-to-png-variants";

const JpgToPngClient = dynamic(
  () => import("../app/jpg-to-png/JpgToPngClient"),
  {
    loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
    ssr: false,
  }
);

export function buildJpgToPngVariantMetadata(
  variant: JpgToPngVariant
): Metadata {
  const url = `${SITE_URL}/${variant.slug}`;

  return {
    title: variant.title,
    description: variant.description,
    keywords: [
      variant.primaryKeyword,
      "jpg to png",
      "jpeg to png converter",
      "convert jpg to png online",
      "jpg to png online free no upload",
      "free image converter",
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

export default function JpgToPngVariantPage({
  variant,
}: {
  variant: JpgToPngVariant;
}) {
  const pageUrl = `${SITE_URL}/${variant.slug}`;
  const siblingVariants = JPG_TO_PNG_VARIANTS.filter(
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
          "@id": `${pageUrl}#jpg-to-png-app`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#jpg-to-png-app`,
        name: "JPG to PNG Converter",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        keywords: [variant.primaryKeyword, "jpg to png online free no upload"],
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
            name: "JPG to PNG",
            item: `${SITE_URL}/jpg-to-png`,
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                {variant.badge}
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                {variant.title}
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {variant.hero}
              </p>
            </div>

            <div className="mt-8">
              <JpgToPngClient />
            </div>
          </div>
        </section>

        <div className="mt-14 space-y-8">
          {variant.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
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

          <section className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Related image workflows
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-700">
              After converting JPG to PNG, you may want to resize the output,
              compress it for a website, convert it to WebP, or switch it back
              to JPG when smaller file size matters more than lossless storage.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jpg-to-png" className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-800">
                Main JPG to PNG Tool
              </Link>
              <Link href="/png-to-jpg" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                PNG to JPG
              </Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                Image to WebP
              </Link>
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">
                Image Compressor
              </Link>
            </div>
            <div className="mt-6 border-t border-brand-100 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                More JPG to PNG search pages
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

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {variant.faq.map((item) => (
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
          </section>
        </div>
      </div>
    </div>
  );
}
