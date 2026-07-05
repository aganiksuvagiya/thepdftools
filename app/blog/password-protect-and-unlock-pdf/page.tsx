import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/password-protect-and-unlock-pdf`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata("password-protect-and-unlock-pdf");
}


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Password Protect & Unlock a PDF Online for Free",
      description:
        "Learn how to add a password to a PDF to keep it private, and how to remove a password from a PDF you own. Covers PDF encryption basics, owner vs. user passwords, and step-by-step instructions using a free browser-based tool.",
      url: POST_URL,
      datePublished: "2026-06-14T00:00:00Z",
      dateModified: "2026-06-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 2200,
      articleSection: "PDF Tools",
      keywords: ["password protect pdf", "unlock pdf online free", "remove pdf password", "encrypt pdf free", "add password to pdf"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Password Protect & Unlock a PDF", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What's the difference between an owner password and a user password?",
          acceptedAnswer: { "@type": "Answer", text: "A user password (open password) is required to open and view the PDF at all. An owner password (permissions password) controls what someone can do with the file once it's open — like printing, editing, or copying text — even if no password is needed to view it." },
        },
        {
          "@type": "Question",
          name: "Can I remove a password from any PDF?",
          acceptedAnswer: { "@type": "Answer", text: "You can remove a password from a PDF if you know the current password — this is meant for unlocking files you own or have permission to access, such as your own old documents or files a colleague sent you with the password." },
        },
        {
          "@type": "Question",
          name: "Is browser-based PDF encryption secure?",
          acceptedAnswer: { "@type": "Answer", text: "Yes — when the encryption happens locally in your browser, your file and password never leave your device, which is more private than uploading a sensitive document to a server for processing." },
        },
        {
          "@type": "Question",
          name: "What should I use as a PDF password?",
          acceptedAnswer: { "@type": "Answer", text: "Use a unique password with at least 12 characters, mixing letters, numbers, and symbols — avoid reusing passwords from other accounts, since a PDF password is often shared via less secure channels like email." },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function PasswordProtectAndUnlockPdf() {
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
                {["PDF Tools", "Security"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Password Protect & Unlock a PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Online — Free & Private
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>June 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>10 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                PDFs often carry sensitive information — financial statements, contracts, ID documents, medical records — and a password is one of the simplest ways to keep that information private in transit. This guide explains how PDF passwords actually work, the difference between locking a file and restricting what can be done with it, and how to add or remove a password from a PDF for free.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How PDF Passwords Actually Work</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  The PDF format has built-in support for encryption, defined as part of the file format standard itself. When you add a password to a PDF, the content of the file is encrypted using that password as (part of) the key — meaning the protection travels with the file itself, regardless of where it's stored or how it's shared.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  PDF encryption supports two distinct passwords, which is a source of confusion for many people. A <strong>user password</strong> (sometimes called an "open password") is required just to open and view the document — without it, the PDF appears as encrypted gibberish to any viewer. An <strong>owner password</strong> (sometimes called a "permissions password") controls what a viewer can do once the document is open — whether they can print, copy text, edit, or add annotations — even if no password was needed to open it.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  Most everyday use cases only need a user password: you want to make sure only the intended recipient can open the file at all. Owner-password restrictions (like "disable printing") are weaker in practice, since many PDF viewers and tools can bypass them — they're best thought of as a deterrent, not a security guarantee.
                </p>
              </div>
            </section>

            {/* Section 2 — Step by step: protect */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Add a Password to a PDF</h2>
              <ol className="mt-5 space-y-4">
                {[
                  "Open our PDF Password Protect tool and upload the PDF you want to secure.",
                  "Enter the password you want to require to open the file. Choose something strong and unique — at least 12 characters with a mix of letters, numbers, and symbols.",
                  "Optionally, set additional restrictions such as disabling printing or copying, if your use case calls for it.",
                  "Click \"Protect PDF\" — the encryption happens locally in your browser, so your password and document are never sent anywhere.",
                  "Download the encrypted PDF and share it through your normal channel. Send the password separately — for example, by text message rather than the same email as the file.",
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
                  href="/pdf-protect"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105.672-2 1.5-2S15 9.895 15 11m-6 0c0-1.105-.672-2-1.5-2S6 9.895 6 11m0 0v2a3 3 0 003 3h6a3 3 0 003-3v-2M5 11h14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" /></svg>
                  Add Password to PDF Free
                </Link>
              </div>
            </section>

            {/* Section 3 — Step by step: unlock */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Remove a Password from a PDF</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                If you have a PDF that's password-protected and you know the password — for example, an old bank statement, or a document a colleague sent you — you can remove the password so the file opens normally going forward:
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open our PDF Unlock tool and upload the password-protected PDF.",
                  "Enter the current password when prompted — this is required to decrypt the file.",
                  "The tool decrypts the document locally in your browser, removing the password requirement.",
                  "Download the unlocked PDF. It will now open without a password on any device or viewer.",
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
                  href="/pdf-unlock"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4m-9 0h10a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1z" /></svg>
                  Unlock Your PDF Free
                </Link>
              </div>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                This tool requires the existing password — it's designed to help you regain access to your own files, not to bypass protection on documents you don't have permission to open.
              </p>
            </section>

            {/* Section 4 — When to protect */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">When You Should Password-Protect a PDF</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Financial Documents", desc: "Bank statements, tax returns, and pay stubs often contain account numbers and SSNs — password protection adds a layer of defense if a file is sent to the wrong address." },
                  { label: "Legal Contracts", desc: "Draft contracts and signed agreements sometimes need to stay confidential until finalized or shared only with specific parties." },
                  { label: "HR & Personal Records", desc: "Offer letters, performance reviews, and ID scans should be protected when emailed internally." },
                  { label: "Client Deliverables", desc: "Freelancers sharing drafts, reports, or invoices with sensitive pricing can protect files before sending to clients." },
                  { label: "Medical Records", desc: "Lab results and medical reports shared by email benefit from an extra password layer for HIPAA-style privacy considerations." },
                  { label: "Shared Drives & Cloud Storage", desc: "If a file sits in a shared folder with broader access than intended, a password limits who can actually open it." },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 — Sharing passwords safely */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How to Share a Password-Protected PDF Safely</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Never Send the Password in the Same Email</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    If someone intercepts or gains access to the email containing the PDF, sending the password in the same message defeats the purpose. Use a different channel — a text message, a phone call, or a separate messaging app.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Use a Memorable but Strong Password</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    For documents shared with non-technical recipients, a passphrase like three random words plus a number ("Coral7TableLamp") is both strong and easy to communicate verbally.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Combine with Other PDF Tools</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    If you're redacting sensitive details before sharing, use our <Link href="/pdf-redaction" className={toolLink}>PDF Redaction</Link> tool first, then add a password as a second layer of protection on the redacted file.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 — Pro tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for PDF Security</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Process sensitive files locally.</strong> Our protect and unlock tools run entirely in your browser — your password and document content are never uploaded to a server.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep an unprotected master copy.</strong> Store your original, unencrypted file securely on your own device so you don't lose access if a shared password gets misplaced.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Sign before you encrypt.</strong> If a document needs both a signature and a password, sign it first with our <Link href="/pdf-sign" className={toolLink}>PDF Sign</Link> tool, then protect the signed version.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Don't rely on password protection alone for highly sensitive data.</strong> For extremely sensitive documents, also consider redacting specific fields with our <Link href="/pdf-redaction" className={toolLink}>PDF Redaction</Link> tool.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Re-protect after editing.</strong> If you unlock a PDF to make edits, remember to re-apply password protection before sharing the updated version again.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A password is a simple, effective way to keep a PDF private as it travels by email, cloud storage, or messaging apps. With our free <Link href="/pdf-protect" className={toolLink}>Password Protect</Link> and <Link href="/pdf-unlock" className={toolLink}>Unlock PDF</Link> tools, you can lock or unlock any document directly in your browser — no uploads, no accounts, and no limits.
              </p>
            </section>
          <BlogFooterLinks slug="password-protect-and-unlock-pdf" includeBreadcrumbSchema={false} includeFaqSchema={false} />
      </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/pdf-protect", label: "Password Protect PDF", icon: "M12 11c0-1.105.672-2 1.5-2S15 9.895 15 11m-6 0c0-1.105-.672-2-1.5-2S6 9.895 6 11m0 0v2a3 3 0 003 3h6a3 3 0 003-3v-2M5 11h14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" },
                  { href: "/pdf-unlock", label: "Unlock PDF", icon: "M8 11V7a4 4 0 118 0v4m-9 0h10a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1z" },
                  { href: "/pdf-redaction", label: "PDF Redaction", icon: "M4 6h16M4 12h16M4 18h7" },
                  { href: "/pdf-sign", label: "PDF Sign", icon: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" },
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
                  "How PDF Passwords Work",
                  "Add a Password to a PDF",
                  "Remove a Password from a PDF",
                  "When to Password-Protect",
                  "Sharing Passwords Safely",
                  "Pro Tips for PDF Security",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/how-to-sign-pdf-online-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  How to Sign a PDF Online Free
                </Link>
                <Link href="/blog/compress-pdf-files-free" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Compress PDF Files Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
