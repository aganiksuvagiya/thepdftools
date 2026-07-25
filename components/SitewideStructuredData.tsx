const SITE_URL = "https://thepdftools.site";

const navItems = [
  { name: "Home", url: SITE_URL },
  { name: "PDF Tools", url: `${SITE_URL}/pdf-tools` },
  { name: "Image Tools", url: `${SITE_URL}/image-tools` },
  { name: "Developer Tools", url: `${SITE_URL}/developer-tools` },
  { name: "Generators", url: `${SITE_URL}/generators` },
  { name: "Document Tools", url: `${SITE_URL}/document-tools` },
  { name: "Utility Tools", url: `${SITE_URL}/utility-tools` },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: "Site Map", url: `${SITE_URL}/site-map` },
];

const toolHighlights = [
  `${SITE_URL}/pdf-merge`,
  `${SITE_URL}/pdf-compress`,
  `${SITE_URL}/pdf-split`,
  `${SITE_URL}/pdf-to-word`,
  `${SITE_URL}/pdf-to-jpg`,
  `${SITE_URL}/jpg-to-pdf`,
  `${SITE_URL}/image-compressor`,
  `${SITE_URL}/jpg-to-png`,
  `${SITE_URL}/png-to-jpg`,
  `${SITE_URL}/background-remover`,
];

export default function SitewideStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: "thepdftools",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.svg`,
        },
        sameAs: ["https://www.instagram.com/thepdftools.site"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: "thepdftools",
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}#webapp`,
        name: "thepdftools",
        url: SITE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        browserRequirements: "Requires JavaScript. Works in modern browsers.",
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}#featured-tools`,
        name: "Featured tools",
        itemListElement: toolHighlights.map((url, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url,
        })),
      },
      ...navItems.map((item) => ({
        "@type": "SiteNavigationElement",
        name: item.name,
        url: item.url,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
