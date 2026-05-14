import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCitySeoPageByCountry, getCitiesForCountry, citySeoPages } from "@/lib/seo-cities";
import { localSeoTools } from "@/lib/local-seo-tools";

const SITE_URL = "https://thepdftools.site";

type PageProps = {
  params: { country: string; city: string };
};

const featuredTools = [
  { href: "/pdf-compress", label: "PDF Compress" },
  { href: "/pdf-merge", label: "PDF Merge" },
  { href: "/pdf-editor", label: "PDF Editor" },
  { href: "/pdf-highlight", label: "PDF Highlight" },
  { href: "/pdf-redaction", label: "PDF Redaction" },
  { href: "/pdf-sign", label: "PDF Sign" },
];

export function generateStaticParams() {
  return citySeoPages.map((item) => ({ country: item.countrySlug, city: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cityPage = getCitySeoPageByCountry(params.country, params.city);
  if (!cityPage) return {};

  const pageUrl = `${SITE_URL}/pdf-tools-in-country/${cityPage.countrySlug}/${cityPage.slug}`;
  const title = `Free PDF & Image Tools in ${cityPage.city}, ${cityPage.country}`;
  const description = `Use free PDF and image tools in ${cityPage.city}, ${cityPage.country} to compress PDFs, merge files, highlight documents, sign forms, redact data, and resize images with no upload and no signup.`;

  return {
    title,
    description,
    keywords: [
      `pdf tools in ${cityPage.city.toLowerCase()}`,
      `pdf tools in ${cityPage.city.toLowerCase()} ${cityPage.country.toLowerCase()}`,
      `compress pdf online ${cityPage.city.toLowerCase()}`,
      `merge pdf online ${cityPage.city.toLowerCase()}`,
      `pdf editor ${cityPage.city.toLowerCase()}`,
      `highlight pdf online ${cityPage.city.toLowerCase()}`,
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
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function CountryCityPdfToolsPage({ params }: PageProps) {
  const cityPage = getCitySeoPageByCountry(params.country, params.city);
  if (!cityPage) notFound();

  const relatedCities = getCitiesForCountry(cityPage.countrySlug).filter((item) => item.slug !== cityPage.slug);
  const pageUrl = `${SITE_URL}/pdf-tools-in-country/${cityPage.countrySlug}/${cityPage.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Free PDF & Image Tools in ${cityPage.city}, ${cityPage.country}`,
        url: pageUrl,
        description: `Free browser-based PDF and image tools for users in ${cityPage.city}, ${cityPage.country}.`,
        about: {
          "@type": "Place",
          name: `${cityPage.city}, ${cityPage.state}, ${cityPage.country}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `PDF Tools in ${cityPage.country}`, item: `${SITE_URL}/pdf-tools-in-country/${cityPage.countrySlug}` },
          { "@type": "ListItem", position: 3, name: `PDF Tools in ${cityPage.city}`, item: pageUrl },
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
              PDF & Image Tools in {cityPage.city}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Free PDF & Image Tools in {cityPage.city}, {cityPage.country}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              If you are in {cityPage.city}, {cityPage.state}, {cityPage.country}, use these browser-based tools to compress PDFs, merge reports,
              highlight contracts, sign forms, redact private data, and resize images without uploading files to a server.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Best for</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Students, freelancers, agencies, recruiters, local offices, startups, and business teams in {cityPage.city}.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Popular tasks</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Compressing PDFs for email, signing forms, reviewing contracts, highlighting clauses, and preparing redacted files.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Privacy first</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Everything is designed to run in your browser so workflows stay fast and more private for users in {cityPage.city}.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
