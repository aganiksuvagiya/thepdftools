import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const InvoiceGeneratorClient = dynamic(() => import("./InvoiceGeneratorClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free Invoice Generator Online — Create Professional PDF Invoices",
  description:
    "Create professional PDF invoices for free online. Add line items, tax, discounts, and download instantly. No signup, no upload — runs entirely in your browser.",
  keywords: [
    "invoice generator",
    "free invoice generator",
    "invoice maker",
    "create invoice online",
    "pdf invoice generator",
    "invoice template free",
    "make invoice online",
    "online invoice creator",
    "free invoice maker",
    "invoice pdf download",
    "freelance invoice generator",
    "small business invoice",
  ],
  openGraph: {
    title: "Free Invoice Generator Online — Create Professional PDF Invoices",
    description:
      "Create professional PDF invoices for free online. Add line items, tax, discounts, and download instantly. No signup, no upload — runs entirely in your browser.",
    url: "https://thepdftools.site/invoice-generator",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/invoice-generator",
  },
};

export default function InvoiceGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Invoice Generator",
        url: "https://thepdftools.site/invoice-generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Create professional PDF invoices for free online. Add line items, tax, discounts, and download instantly.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the invoice generator completely free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% free. There are no hidden fees, no watermarks, and no limits on the number of invoices you can create. You can generate as many professional PDF invoices as you need.",
            },
          },
          {
            "@type": "Question",
            name: "Is my invoice data safe?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. All invoice generation happens locally in your browser. No data is uploaded to any server, and your business information stays completely private on your device.",
            },
          },
          {
            "@type": "Question",
            name: "Can I add tax and discounts to my invoice?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can add a tax percentage and a flat discount amount. The tool automatically calculates subtotal, tax, discount, and the final total for you.",
            },
          },
          {
            "@type": "Question",
            name: "What currencies are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The invoice generator supports USD ($), EUR (€), GBP (£), and INR (₹). Select your preferred currency before generating the invoice.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use this for my freelance business?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. This tool is perfect for freelancers, contractors, and small business owners who need to send professional invoices to clients without paying for expensive invoicing software.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Invoice Generator", item: "https://thepdftools.site/invoice-generator" },
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
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Invoice Generator
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Create professional invoices
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  in seconds, not hours
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Fill in your details, add line items, and download a polished PDF invoice instantly.
                No signup, no server uploads, and completely free.
              </p>
            </div>

            <div className="mt-8">
              <InvoiceGeneratorClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for freelancers",
                  text: "Create and send professional invoices to clients without paying for expensive software.",
                },
                {
                  title: "Best for small business",
                  text: "Generate invoices with tax, discounts, and multiple currency support for any client.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device. No data leaves your browser.",
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
              <li>Include a clear due date to encourage on-time payment.</li>
              <li>Add detailed item descriptions so clients know what they are paying for.</li>
              <li>Use the Notes field for payment terms or bank details.</li>
            </ul>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Freelancers", "Consultants", "Small businesses", "Contractors"].map((item) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How to Create an Invoice Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Enter your company or personal details in the &quot;From&quot; section, and your client&apos;s details in the &quot;Bill To&quot; section.</li>
              <li>Add line items with descriptions, quantities, and rates. The tool automatically calculates each line amount and the overall total.</li>
              <li>Optionally set tax percentage and discount, add notes, then click &quot;Generate Invoice&quot; to download your professional PDF invoice instantly.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Invoice Generator?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Private &amp; Secure</h3>
                <p className="mt-1 text-sm text-slate-500">Your invoice data never leaves your device. All PDF generation happens locally in your browser using JavaScript, keeping your business information completely confidential.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Professional PDF Output</h3>
                <p className="mt-1 text-sm text-slate-500">Generate clean, professional invoices with your company details, itemized billing, tax calculations, and payment terms. Perfect for sending to clients and keeping records.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multi-Currency Support</h3>
                <p className="mt-1 text-sm text-slate-500">Work with international clients? Choose from USD, EUR, GBP, or INR currencies. The correct symbol appears on your invoice automatically.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start creating invoices immediately. No account registration, no email verification, no subscription. Just open the tool and generate your invoice for free.</p>
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
                  q: "Is the invoice generator completely free?",
                  a: "Yes, 100% free with no limitations. There are no watermarks on your invoices, no hidden fees, and no cap on how many invoices you can create. Generate unlimited professional PDF invoices at no cost.",
                },
                {
                  q: "Is my invoice data safe and private?",
                  a: "Absolutely. All invoice generation happens locally in your browser. No data is sent to any server, no information is stored, and your business details remain completely private on your device.",
                },
                {
                  q: "Can I add tax and discounts to my invoice?",
                  a: "Yes. You can specify a tax percentage and a flat discount amount. The tool automatically calculates the subtotal, tax amount, discount, and final total so your invoice is accurate every time.",
                },
                {
                  q: "What currencies does the invoice generator support?",
                  a: "The tool supports four major currencies: USD ($), EUR (\u20AC), GBP (\u00A3), and INR (\u20B9). Simply select your preferred currency from the dropdown before generating your invoice.",
                },
                {
                  q: "Can freelancers and small businesses use this tool?",
                  a: "Absolutely. This invoice generator is designed specifically for freelancers, contractors, consultants, and small business owners who need a fast, free way to create professional invoices without expensive accounting software.",
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

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Creating professional invoices is a critical part of running any freelance or small business operation. Whether you need to bill clients for consulting services, design projects, development work, or any other professional service, our free online invoice generator makes it simple. Unlike traditional invoicing software that charges monthly subscriptions, this invoice maker runs entirely in your browser with zero cost. Freelancers love it because they can create polished PDF invoices in seconds without signing up for yet another SaaS tool. Small business owners appreciate the privacy-first approach where no financial data ever leaves their device. The built-in tax and discount calculations ensure accuracy, while multi-currency support makes it ideal for international clients. From contractors sending their first invoice to established businesses streamlining their billing workflow, this free invoice generator delivers professional results every time.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/text-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Text to PDF</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-compress" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Compress</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
