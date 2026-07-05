import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/how-to-sign-pdf-online-free`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata("how-to-sign-pdf-online-free");
}


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Sign a PDF Online for Free (eSignature Guide 2026)",
      description:
        "Add a legally usable electronic signature to any PDF for free — type, draw, or upload your signature, place it anywhere on the document, and download the signed file instantly.",
      url: POST_URL,
      datePublished: "2026-06-14T00:00:00Z",
      dateModified: "2026-06-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 2300,
      articleSection: "PDF Tools",
      keywords: ["sign pdf online free", "esignature free", "electronic signature pdf", "add signature to pdf", "sign document online"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Sign a PDF Online for Free", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is an electronic signature on a PDF legally valid?",
          acceptedAnswer: { "@type": "Answer", text: "In most countries, including the US (under the ESIGN Act and UETA) and the EU (under eIDAS for simple and advanced signatures), a typed, drawn, or image-based signature applied with clear intent to sign is legally enforceable for most everyday documents like contracts, agreements, and forms." },
        },
        {
          "@type": "Question",
          name: "Do I need to create an account to sign a PDF?",
          acceptedAnswer: { "@type": "Answer", text: "No. Our PDF signer works entirely in your browser — upload your file, add your signature, and download the signed PDF without registering or sharing your email." },
        },
        {
          "@type": "Question",
          name: "Can I sign a PDF on my phone?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The signing tool is fully responsive — you can draw your signature with your finger on a touchscreen, or type/upload a signature image, then place and resize it before downloading." },
        },
        {
          "@type": "Question",
          name: "Is my document uploaded to a server when I sign it?",
          acceptedAnswer: { "@type": "Answer", text: "No. The signing process happens locally in your browser using your device's processing power — your PDF is never uploaded or stored anywhere." },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function HowToSignPdfOnlineFree() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>

              <div className="mt-6 flex flex-wrap gap-2">
                {["PDF Tools", "eSignature"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Sign a PDF Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for Free — No Account Needed
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>June 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>10 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                From rental agreements to NDAs to school permission forms, almost every document today needs a signature — and printing, signing, scanning, and emailing back a PDF is a waste of time. This guide explains how electronic signatures work, when they&rsquo;re legally valid, and how to add your signature to any PDF in under a minute using a free, browser-based tool.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Print-Sign-Scan Is Obsolete</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  For decades, signing a document meant printing it, signing with a pen, scanning it back in, and emailing the scan — a process that could easily take 20 minutes and produce a crooked, low-quality scan that looked unprofessional. Today, electronic signatures let you complete the same task in under a minute, directly from your laptop or phone, with a result that looks cleaner than most scanned signatures ever did.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Electronic signatures aren&rsquo;t just convenient — they&rsquo;re widely recognized by law. In the United States, the ESIGN Act (2000) and the Uniform Electronic Transactions Act (UETA) give electronic signatures the same legal weight as handwritten ones for most contracts and business records. In the European Union, the eIDAS regulation recognizes simple and advanced electronic signatures for the vast majority of everyday agreements. Some document types — wills, certain real estate transfers, court filings — still require wet-ink or notarized signatures, so always check requirements for high-stakes legal documents.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  For everything else — freelance contracts, NDAs, lease agreements, consent forms, internal approvals, vendor agreements — a typed, drawn, or image-based signature applied with clear intent is enough.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Three Ways to Create Your Signature</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/pdf-sign" className={toolLink}>PDF signing tool</Link> supports three different ways to create a signature, so you can pick whichever feels most natural:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Draw It</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Use your mouse, trackpad, or — best of all — your finger or stylus on a touchscreen to draw your signature naturally. This gives the most authentic, handwritten look.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Type It</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Type your name and have it rendered in a cursive, signature-style font. Fast and consistent — useful when you need to sign many documents the same way.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Upload an Image</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    If you already have a photo or scan of your handwritten signature on a plain background, upload it directly. Our <Link href="/signature-generator" className={toolLink}>Signature Generator</Link> can also help you create a clean, transparent-background signature image to reuse.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Reuse Across Documents</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Once created, your signature can be resized and placed multiple times — useful for multi-page contracts that need initials on every page plus a full signature at the end.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 — Step by step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Sign Your PDF in Under a Minute</h2>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the PDF signing tool and upload the PDF you need to sign. The first page will display in the preview area.",
                  "Choose how to create your signature — draw it with your mouse or finger, type your name in a cursive font, or upload an image of your signature.",
                  "Drag your signature onto the document and position it exactly where it needs to go — over a signature line, in a designated box, or anywhere else.",
                  "Resize your signature using the corner handles so it fits naturally within the available space.",
                  "If the document needs initials on multiple pages, navigate to each page and repeat the placement — your created signature is saved for reuse during the session.",
                  "Add the date next to your signature if the document requires it, using the text tool.",
                  "Click \"Download Signed PDF\" to save the finished document to your device, ready to email or upload.",
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
                  href="/pdf-sign"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                  Sign Your PDF Free
                </Link>
              </div>
            </section>

            {/* Section 4 — When you need more */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Simple vs. Advanced vs. Qualified Electronic Signatures</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Not all electronic signatures carry the same legal weight. Understanding the tiers helps you pick the right tool for the right document:
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Simple Electronic Signature (SES)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    A typed name, scanned signature image, or drawn mark applied to a document with clear intent. This covers the vast majority of everyday agreements — quotes, NDAs, internal approvals, rental applications — and is what our free tool produces.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Advanced Electronic Signature (AES)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Uses cryptographic certificates to verify the signer&rsquo;s identity and detect any tampering after signing. Typically required for higher-value B2B contracts or by specific industry regulations.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Qualified Electronic Signature (QES)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The highest tier under eIDAS, requiring a qualified certificate issued by an accredited provider and often a hardware token. Reserved for specific legal and government use cases, equivalent to a notarized signature in many jurisdictions.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-8 text-slate-600">
                For day-to-day contracts and forms, a simple electronic signature is almost always sufficient — and that&rsquo;s exactly what our free tool is designed for.
              </p>
            </section>

            {/* Section 5 — Use cases */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Common Documents People Sign Online</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Freelance Contracts", desc: "Send and sign service agreements with clients without printing or courier delays." },
                  { label: "Rental & Lease Agreements", desc: "Tenants and landlords can sign lease documents remotely and exchange them by email same-day." },
                  { label: "NDAs & Confidentiality Agreements", desc: "Quickly sign non-disclosure agreements before sharing sensitive information with new partners." },
                  { label: "School & Permission Forms", desc: "Parents can sign permission slips, enrollment forms, and consent documents from a phone." },
                  { label: "Invoices & Quotes", desc: "Sign off on accepted quotes — pair with our Invoice Generator for a complete paper trail." },
                  { label: "Internal Approvals", desc: "HR and operations teams can route policy acknowledgments and approval forms without a paid eSignature subscription." },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Pro tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for Signing PDFs Online</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Create your signature once, reuse it everywhere.</strong> Save a transparent PNG of your signature using the <Link href="/signature-generator" className={toolLink}>Signature Generator</Link>, then upload it whenever you need to sign — consistent and fast.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Zoom in before placing your signature.</strong> Precise placement over small signature lines is much easier when you zoom in on that area of the page first.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep a copy of the signed PDF and the original.</strong> Some agreements benefit from having both versions on file for your records.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Compress before emailing.</strong> If the signed PDF is large (e.g. it contains scanned pages), run it through our <Link href="/pdf-compress" className={toolLink}>PDF Compressor</Link> before attaching it to an email.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Lock the final document if needed.</strong> Use our <Link href="/pdf-protect" className={toolLink}>Password Protect</Link> tool to add a password before sending a signed document containing sensitive information.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                Electronic signatures have made print-sign-scan workflows almost entirely unnecessary for everyday documents. With our free <Link href="/pdf-sign" className={toolLink}>PDF signing tool</Link>, you can draw, type, or upload your signature, place it precisely, and download a finished PDF — all in your browser, with nothing uploaded to a server and no account required.
              </p>
            </section>
          <BlogFooterLinks slug="how-to-sign-pdf-online-free" includeBreadcrumbSchema={false} includeFaqSchema={false} />
      </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/pdf-sign", label: "PDF Sign", icon: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" },
                  { href: "/signature-generator", label: "Signature Generator", icon: "M4 19h16M4 15c2-4 4-6 6-6s2 4 4 4 2-6 6-6" },
                  { href: "/pdf-protect", label: "Password Protect PDF", icon: "M12 11c0-1.105.672-2 1.5-2S15 9.895 15 11m-6 0c0-1.105-.672-2-1.5-2S6 9.895 6 11m0 0v2a3 3 0 003 3h6a3 3 0 003-3v-2M5 11h14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" },
                  { href: "/pdf-compress", label: "Compress PDF", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
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

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Print-Sign-Scan Is Obsolete",
                  "Three Ways to Create Your Signature",
                  "Step-by-Step: Sign Your PDF",
                  "Simple vs. Advanced vs. Qualified",
                  "Common Documents People Sign",
                  "Pro Tips for Signing PDFs Online",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/password-protect-and-unlock-pdf" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Password Protect &amp; Unlock a PDF
                </Link>
                <Link href="/blog/free-invoice-generator-freelancers" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Free Invoice Generator for Freelancers
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
