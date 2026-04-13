import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/free-invoice-generator-freelancers`;

export const metadata: Metadata = {
  title: "Free Invoice Generator for Freelancers & Small Business — Create PDF Invoices Online",
  description:
    "Create professional PDF invoices for free with our online invoice generator. Perfect for freelancers and small businesses — no signup required. Includes invoice templates, best practices, and tips for getting paid faster.",
  keywords: [
    "free invoice generator",
    "invoice generator online",
    "create invoice free",
    "invoice maker",
    "pdf invoice generator",
    "invoice template free",
    "freelance invoice",
  ],
  openGraph: {
    title: "Free Invoice Generator for Freelancers & Small Business — Create PDF Invoices Online",
    description:
      "Create professional PDF invoices for free with our online invoice generator. Perfect for freelancers and small businesses — no signup required.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Invoice Generator for Freelancers & Small Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator for Freelancers & Small Business — Create PDF Invoices Online",
    description: "Create professional PDF invoices for free with our online invoice generator. No signup required.",
  },
  alternates: { canonical: POST_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Free Invoice Generator for Freelancers & Small Business — Create PDF Invoices Online",
  description: "Create professional PDF invoices for free with our online invoice generator. Perfect for freelancers and small businesses — no signup required. Includes invoice templates, best practices, and tips for getting paid faster.",
  url: POST_URL,
  datePublished: "2026-04-07T00:00:00Z",
  dateModified: "2026-04-07T00:00:00Z",
  author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  wordCount: 1200,
  articleSection: "Invoicing",
  keywords: ["free invoice generator", "invoice generator online", "create invoice free", "invoice maker", "pdf invoice generator", "freelance invoice"],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function FreeInvoiceGeneratorFreelancers() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              {/* Back link */}
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Invoicing", "Freelancers", "Small Business"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Free Invoice Generator for Freelancers
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Create PDF Invoices Online
                </span>
              </h1>

              {/* Meta */}
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>April 7, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>6 min read</span>
              </div>

              {/* Intro */}
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Getting paid on time starts with sending a professional invoice. Whether you&rsquo;re a freelance designer, consultant, or running a small business, a clear and polished invoice builds trust and speeds up payment. This guide covers everything you need to create great invoices&mdash;plus a <Link href="/invoice-generator" className={toolLink}>free tool</Link> to generate them instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Freelancers Need a Professional Invoice</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  A handshake or a casual email might close the deal, but it won&rsquo;t get you paid reliably. Professional invoices set clear expectations about what is owed, when it is due, and how to pay. Studies show that freelancers who send formal invoices get paid up to 2&times; faster than those who rely on informal requests.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Beyond speed, invoices make you look professional. Clients are more likely to prioritize payments to vendors who present themselves seriously. A well-formatted PDF invoice with your logo, itemized services, and payment terms signals that you run a real business.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Finally, invoices are essential for tax records. Come tax season, you need a clear paper trail of all income. A numbered invoice system makes bookkeeping painless and keeps you audit-ready. Our <Link href="/invoice-generator" className={toolLink}>free invoice generator</Link> makes this effortless.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What to Include in an Invoice</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Header &amp; Identity</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Include a unique invoice number (e.g., INV-2026-001), the invoice date, and the due date. Add your business name, address, email, and optionally your logo. The &ldquo;Bill To&rdquo; section should list the client&rsquo;s name and address.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Line Items &amp; Totals</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Break down each service or product with a description, quantity, unit price, and line total. Add subtotal, any applicable taxes (VAT, GST, sales tax), discounts, and a clear grand total. Include payment terms such as &ldquo;Net 30&rdquo; or &ldquo;Due on receipt.&rdquo;
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Create an Invoice with Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/invoice-generator" className={toolLink}>free Invoice Generator</Link> runs entirely in your browser&mdash;no files are uploaded to any server and no account is required.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the Invoice Generator tool and fill in your business details (name, address, email).",
                  "Add your client\u2019s information in the \u201CBill To\u201D section.",
                  "Enter your line items \u2014 description, quantity, and rate for each service or product.",
                  "Set the invoice number, dates, tax rate, and payment terms.",
                  "Click \u201CGenerate PDF\u201D to download a polished, print-ready invoice instantly.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-secondary-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <Link
                  href="/invoice-generator"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  Create Free Invoice Now
                </Link>
              </div>
            </section>

            {/* Section 4 - Best Practices */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Invoice Best Practices</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Use a consistent numbering system.</strong> Sequential numbers like INV-001, INV-002 keep your records organized and make it easy to reference past invoices. Never reuse or skip numbers.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Set clear payment terms.</strong> &ldquo;Net 15&rdquo; or &ldquo;Net 30&rdquo; is standard. For new clients, consider &ldquo;Due on receipt&rdquo; or requiring a deposit upfront. Always state terms on the invoice itself.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Specify the currency.</strong> If you work with international clients, always include the currency code (USD, EUR, GBP) next to amounts to avoid confusion.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Send invoices promptly.</strong> Invoice as soon as the work is delivered. The longer you wait, the longer you wait to get paid. Set a reminder if needed.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Follow up politely.</strong> If payment is overdue, send a friendly reminder at the due date, then again at 7 and 14 days past due. Attach the original invoice PDF for convenience.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep PDF copies of every invoice.</strong> Store them in a dedicated folder organized by year and client. Use our <Link href="/invoice-generator" className={toolLink}>invoice generator</Link> to create PDF invoices you can archive easily.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Free vs Paid Invoice Tools</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Paid invoicing platforms like FreshBooks, QuickBooks, and Xero offer powerful features: recurring invoices, automated reminders, expense tracking, and accounting integrations. If you send dozens of invoices per month and need full bookkeeping, they are worth the $15&ndash;$30/month cost.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  However, most freelancers and small businesses don&rsquo;t need all that. If you send a handful of invoices each month and handle your own bookkeeping, a free browser-based <Link href="/invoice-generator" className={toolLink}>invoice generator</Link> is more than enough. No subscriptions, no account creation, no data stored on someone else&rsquo;s server.
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Privacy first", desc: "Our tool runs 100% in your browser. Your business data and client details never leave your device." },
                  { label: "No signup required", desc: "No email address, no password, no credit card. Just open the tool and start creating invoices immediately." },
                  { label: "Professional output", desc: "Generate clean, print-ready PDF invoices with proper formatting, itemized line items, and tax calculations." },
                  { label: "Completely free", desc: "No hidden limits, watermarks, or feature gates. Create as many invoices as you need, forever." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 6 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Related Tools for Your Business</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Running a business means juggling documents constantly. Here are more free tools that pair perfectly with our invoice generator:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { href: "/pdf-compress", label: "PDF Compressor", desc: "Reduce invoice and contract file sizes before emailing them to clients." },
                  { href: "/pdf-merge", label: "PDF Merger", desc: "Combine multiple invoices, receipts, or contracts into a single PDF for clean record-keeping." },
                  { href: "/text-to-pdf", label: "Text to PDF", desc: "Convert plain-text notes, proposals, or meeting minutes into professional PDF documents." },
                ].map((item) => (
                  <li key={item.href} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900"><Link href={item.href} className={toolLink}>{item.label}</Link></p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A professional invoice is one of the simplest things you can do to run a better freelance business. It takes minutes to create, builds client trust, and keeps your finances organized. Start with our free <Link href="/invoice-generator" className={toolLink}>Invoice Generator</Link> and send your first polished PDF invoice today.
              </p>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Try These Tools */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/invoice-generator", label: "Invoice Generator", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                  { href: "/pdf-compress", label: "PDF Compressor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                  { href: "/pdf-merge", label: "PDF Merger", icon: "M12 4.5v15m7.5-7.5h-15" },
                  { href: "/text-to-pdf", label: "Text to PDF", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} /></svg>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Freelancers Need a Professional Invoice",
                  "What to Include in an Invoice",
                  "Step-by-Step: Create an Invoice",
                  "Invoice Best Practices",
                  "Free vs Paid Invoice Tools",
                  "Related Tools for Your Business",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            {/* Related Posts */}
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/free-online-tools-small-business" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Free Online Tools for Small Business
                </Link>
                <Link href="/blog/convert-word-to-pdf-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Convert Word to PDF Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
