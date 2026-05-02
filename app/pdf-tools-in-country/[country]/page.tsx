import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countrySeoPages, getCountrySeoPage } from "@/lib/seo-countries";
import { getCitiesForCountry } from "@/lib/seo-cities";

const SITE_URL = "https://thepdftools.site";

type PageProps = {
  params: { country: string };
};

const featuredTools = [
  { href: "/pdf-compress", label: "PDF Compress" },
  { href: "/pdf-merge", label: "PDF Merge" },
  { href: "/pdf-editor", label: "PDF Editor" },
  { href: "/pdf-highlight", label: "PDF Highlight" },
  { href: "/pdf-redaction", label: "PDF Redaction" },
  { href: "/pdf-sign", label: "PDF Sign" },
  { href: "/image-compressor", label: "Image Compressor" },
  { href: "/image-to-pdf", label: "Image to PDF" },
];

export function generateStaticParams() {
  return countrySeoPages.map((item) => ({ country: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const countryPage = getCountrySeoPage(params.country);
  if (!countryPage) return {};

  const pageUrl = `${SITE_URL}/pdf-tools-in-country/${countryPage.slug}`;
  const title = `Free PDF & Image Tools in ${countryPage.country}`;
  const description = `Use free PDF and image tools in ${countryPage.country} to compress PDFs, merge files, highlight documents, sign forms, redact data, resize images, and more with no upload and no signup.`;

  return {
    title,
    description,
    keywords: [
      `pdf tools in ${countryPage.country.toLowerCase()}`,
      `image tools in ${countryPage.country.toLowerCase()}`,
      `compress pdf online ${countryPage.country.toLowerCase()}`,
      `merge pdf online ${countryPage.country.toLowerCase()}`,
      `pdf editor ${countryPage.country.toLowerCase()}`,
      `highlight pdf online ${countryPage.country.toLowerCase()}`,
      `free pdf tools ${countryPage.country.toLowerCase()}`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [{ url: `${SITE_URL}/opengraph-image` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default function CountryPdfToolsPage({ params }: PageProps) {
  const countryPage = getCountrySeoPage(params.country);
  if (!countryPage) notFound();

  const countryCities = getCitiesForCountry(countryPage.slug);
  const pageUrl = `${SITE_URL}/pdf-tools-in-country/${countryPage.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Free PDF & Image Tools in ${countryPage.country}`,
        url: pageUrl,
        description: `Free browser-based PDF and image tools for users in ${countryPage.country}.`,
        about: {
          "@type": "Place",
          name: countryPage.country,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `PDF Tools in ${countryPage.country}`, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
              PDF & Image Tools in {countryPage.country}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Free PDF & Image Tools in {countryPage.country}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              If you are in {countryPage.country}, you can use these browser-based tools to compress PDFs, merge reports,
              highlight contracts, sign forms, redact private data, and resize images without uploading files to a server.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Best for</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Students, freelancers, agencies, startups, recruiters, legal teams, and small businesses across {countryPage.country}.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Popular tasks</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Compressing PDFs for email, merging application documents, signing client forms, highlighting contracts, and preparing redacted PDFs.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Privacy first</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Everything is designed to run in your browser so document workflows stay fast, simple, and more private.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Popular tools for users in {countryPage.country}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Why this page helps SEO</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                People search for phrases like "PDF tools in {countryPage.country}", "compress PDF online {countryPage.country}", and "PDF editor {countryPage.country}".
                This page gives search engines a country-focused landing page while sending internal link signals to your core tools.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Typical use cases</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use these tools for client documents, invoices, scanned IDs, resumes, student applications, portfolio files, contract review, and image cleanup in {countryPage.country}.
              </p>
            </div>
          </div>

          {countryCities.length ? (
            <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">Top city pages in {countryPage.country}</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {countryCities.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/pdf-tools-in-country/${countryPage.slug}/${item.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.city}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Related country pages</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {countrySeoPages
                .filter((item) => item.slug !== countryPage.slug)
                .slice(0, 10)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/pdf-tools-in-country/${item.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.country}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
