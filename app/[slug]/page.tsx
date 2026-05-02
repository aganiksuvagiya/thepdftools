import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { citySeoPages, getCitySeoPage } from "@/lib/seo-cities";
import { getLocalSeoPageParts, localSeoTools } from "@/lib/local-seo-tools";

const SITE_URL = "https://thepdftools.site";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return citySeoPages.flatMap((city) =>
    localSeoTools.map((tool) => ({
      slug: `${tool.slug}-in-${city.slug}`,
    })),
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const parts = getLocalSeoPageParts(params.slug);
  if (!parts) return {};

  const cityPage = getCitySeoPage(parts.citySlug);
  if (!cityPage) return {};

  const pageUrl = `${SITE_URL}/${params.slug}`;
  const title = `${parts.tool.label} Online in ${cityPage.city}, ${cityPage.country} Free`;
  const description = `${parts.tool.label} online in ${cityPage.city}, ${cityPage.country} for free. Use our browser-based tool for ${parts.tool.gerund} with no upload and no signup.`;

  return {
    title,
    description,
    keywords: [
      `${parts.tool.searchTerm} in ${cityPage.city.toLowerCase()}`,
      `${parts.tool.searchTerm} ${cityPage.city.toLowerCase()}`,
      `${parts.tool.searchTerm} online ${cityPage.city.toLowerCase()}`,
      `${parts.tool.label.toLowerCase()} ${cityPage.city.toLowerCase()}`,
      `${parts.tool.searchTerm} ${cityPage.city.toLowerCase()} ${cityPage.country.toLowerCase()}`,
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

export default function LocalSeoToolCityPage({ params }: PageProps) {
  const parts = getLocalSeoPageParts(params.slug);
  if (!parts) notFound();

  const cityPage = getCitySeoPage(parts.citySlug);
  if (!cityPage) notFound();

  const { tool } = parts;
  const pageUrl = `${SITE_URL}/${params.slug}`;
  const otherToolsInCity = localSeoTools.filter((item) => item.slug !== tool.slug);
  const otherCitiesForTool = citySeoPages.filter((item) => item.slug !== cityPage.slug).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${tool.label} in ${cityPage.city}, ${cityPage.country}`,
        url: pageUrl,
        description: `Free browser-based ${tool.label.toLowerCase()} page for users in ${cityPage.city}, ${cityPage.country}.`,
        about: {
          "@type": "Place",
          name: `${cityPage.city}, ${cityPage.state}, ${cityPage.country}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: tool.label, item: `${SITE_URL}${tool.route}` },
          { "@type": "ListItem", position: 3, name: `${tool.label} in ${cityPage.city}`, item: pageUrl },
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
              {tool.label} in {cityPage.city}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              {tool.label} online in {cityPage.city}, {cityPage.country}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Use our browser-based tool for {tool.gerund} in {cityPage.city}, {cityPage.country}. It works well for {tool.useCases}, with no upload and no signup required.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Exact local intent</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This page targets searches like "{tool.searchTerm} in {cityPage.city}" and "{tool.searchTerm} {cityPage.city}" with a dedicated city-level landing page.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Best for</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Students, local offices, agencies, freelancers, recruiters, and business teams in {cityPage.city}.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Privacy first</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The workflow stays fast and more private because your files are handled directly in the browser.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Open {tool.label}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              If you searched for a city-specific version of this tool, this page is the local shortcut. The actual tool is the same browser-based workflow used across the site.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={tool.route}
                className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                Use {tool.label}
              </Link>
              <Link
                href={`/pdf-tools-in/${cityPage.slug}`}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                View PDF Tools in {cityPage.city}
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Other popular searches in {cityPage.city}</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherToolsInCity.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}-in-${cityPage.slug}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.label} in {cityPage.city}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Same tool in other cities</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherCitiesForTool.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${tool.slug}-in-${item.slug}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    {tool.label} in {item.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
