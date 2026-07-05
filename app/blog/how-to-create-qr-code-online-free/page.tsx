import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/how-to-create-qr-code-online-free`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata("how-to-create-qr-code-online-free");
}


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Create a QR Code Online for Free (Full Guide 2026)",
      description:
        "Generate a free, high-resolution QR code for a URL, Wi-Fi network, contact card, or text in seconds. Learn how QR codes work, how to customize colors and logos, and how to make sure yours always scans correctly.",
      url: POST_URL,
      datePublished: "2026-06-14T00:00:00Z",
      dateModified: "2026-06-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 2200,
      articleSection: "Generators",
      keywords: ["create qr code online free", "qr code generator free", "free qr code maker", "custom qr code generator", "wifi qr code generator"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Create a QR Code Online for Free", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do QR codes expire?",
          acceptedAnswer: { "@type": "Answer", text: "A static QR code generated for free never expires — it's a fixed pattern that always encodes the same data. It will keep working as long as the underlying content (like a website URL) stays valid." },
        },
        {
          "@type": "Question",
          name: "Can I add my logo to a QR code?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. QR codes have built-in error correction, which allows you to overlay a small logo in the center without breaking scannability — as long as the logo doesn't cover too much of the code and you use a high error-correction level." },
        },
        {
          "@type": "Question",
          name: "What's the best size for a printed QR code?",
          acceptedAnswer: { "@type": "Answer", text: "A common rule of thumb is at least 1 inch (2.5cm) square for close-range scanning, and roughly 1 inch of size for every 10 feet of expected scanning distance for posters or signage." },
        },
        {
          "@type": "Question",
          name: "Is it safe to scan QR codes from unknown sources?",
          acceptedAnswer: { "@type": "Answer", text: "Be cautious with QR codes from unfamiliar flyers or stickers, as they can link to phishing sites. Always check the URL preview your phone shows before tapping through, especially for codes encoding payment or login links." },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function HowToCreateQrCodeOnlineFree() {
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
                {["Generators", "QR Codes"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Create a QR Code Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for Free — Full 2026 Guide
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>June 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>10 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                QR codes are everywhere — on menus, business cards, posters, packaging, and Wi-Fi routers — because they turn a long link or block of information into something a phone camera can read instantly. This guide covers how QR codes actually work, the different types of data you can encode, how to design one that matches your brand, and the simple mistakes that make QR codes fail to scan.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What Is a QR Code, Really?</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  A QR (Quick Response) code is a two-dimensional barcode that stores data in a grid of black and white squares. Unlike a traditional barcode, which can only hold a short string of numbers read in one direction, a QR code can store URLs, text, contact details, Wi-Fi credentials, and more — and can be read in any orientation.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  When your phone camera detects a QR code, it locates the three corner squares to determine orientation, reads the grid of black and white modules, and decodes the binary data inside — almost instantly, even from an angle or at a distance, thanks to built-in error correction.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  That error correction is the key feature that makes QR codes so practical: even if part of the code is damaged, dirty, or covered by a logo, the data can usually still be recovered — which is also why you can safely add a logo to the center of most QR codes.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What Can You Encode in a QR Code?</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/qr-generator" className={toolLink}>QR Code Generator</Link> supports several data types, each suited to different use cases:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Website URL</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The most common use — point people directly to a website, landing page, menu, or portfolio. Great for posters, packaging, and business cards.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Plain Text</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Encode a message, instructions, or a serial number directly — no website required. Useful for asset tags or instructions that need to work offline.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Wi-Fi Network</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Encode your network name and password so guests can join your Wi-Fi by scanning — no typing long passwords. Great for cafes, offices, and Airbnbs.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Contact Card (vCard)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Encode your name, phone, email, and company so scanning the code adds you directly to someone's contacts — ideal for business cards and email signatures.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Email</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Pre-fill a "compose email" action with a recipient address, subject, and body — useful for feedback forms or support requests.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Phone Number</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Encode a phone number so scanning the code prompts the user's phone to dial it directly — handy for support or booking lines on flyers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 — Step by step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Create Your QR Code</h2>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the QR Code Generator and choose the type of content you want to encode — URL, text, Wi-Fi, contact card, email, or phone number.",
                  "Enter the details for your chosen type. For a URL, paste the full link including https://. For Wi-Fi, enter the network name (SSID), password, and encryption type.",
                  "Customize the appearance — choose foreground and background colors that match your branding, and adjust the error correction level if you plan to add a logo.",
                  "Optionally upload a logo or icon to display in the center of the QR code. Keep it small relative to the code so the surrounding pattern stays scannable.",
                  "Preview the QR code and do a test scan with your phone's camera to confirm it opens the correct link or shows the correct information.",
                  "Download the QR code as a high-resolution PNG or SVG — use SVG for print materials where you need to scale the code to a large size without losing quality.",
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
                  href="/qr-generator"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v4.5h-4.5v-4.5zm0 10.5h4.5v4.5h-4.5v-4.5zm10.5-10.5h4.5v4.5h-4.5v-4.5zM15 15h1.5v1.5H15V15zm3 0h1.5v1.5H18V15zm-3 3h1.5v1.5H15V18zm3 0h1.5v1.5H18V18z" /></svg>
                  Create Your QR Code Free
                </Link>
              </div>
            </section>

            {/* Section 4 — Customizing */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Designing a QR Code That Matches Your Brand</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Color Contrast Is Critical</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    QR scanners rely on contrast between the foreground and background to detect the pattern. Dark-on-light combinations (like navy on white) scan reliably; low-contrast pairs (like light gray on white, or yellow on white) often fail. If you want a branded color, keep the background light and the foreground a dark version of your brand color.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Error Correction and Logos</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    QR codes support four error correction levels (L, M, Q, H), each able to recover a larger percentage of damaged or obscured data. If you plan to add a logo, choose a higher error correction level (Q or H) so the code remains scannable even with the center covered.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Leave a Quiet Zone</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    QR codes need a small margin of plain background around them (the "quiet zone") to scan reliably. Avoid placing text or graphics directly touching the edges of the code.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Export as SVG for Print</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    PNG files can look blurry or pixelated when printed large. SVG is a vector format that scales to any size — billboard or business card — without losing sharpness.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 — Use cases */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Popular Ways People Use QR Codes</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Restaurant Menus", desc: "Replace printed menus with a QR code linking to an always-up-to-date digital menu page." },
                  { label: "Business Cards", desc: "Add a contact card QR so people can save your details with one scan — pairs well with our PDF business card layouts." },
                  { label: "Event Check-In", desc: "Encode a registration link or ticket ID for fast, contactless event entry." },
                  { label: "Product Packaging", desc: "Link to instructions, warranty registration, or product videos directly from the box." },
                  { label: "Wi-Fi Access", desc: "Stick a Wi-Fi QR code near your router so guests connect instantly without typing a password." },
                  { label: "Marketing Campaigns", desc: "Drive traffic from print ads, flyers, and posters directly to a landing page with built-in tracking parameters." },
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
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips to Avoid QR Code Mistakes</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Always test before printing.</strong> Scan your QR code with two or three different phones and apps before sending it to print — a small contrast or sizing issue can make a code unscannable at print scale.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Use the full URL, including https://.</strong> Some scanners fail to recognize URLs that are missing the protocol prefix.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Keep dynamic content on a stable URL.</strong> Since a static QR code can't be edited after printing, point it to a URL you control (like a landing page) rather than encoding details that might change.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Add it to printed materials with our PDF tools.</strong> Download your QR code as PNG, then place it on flyers or menus using our <Link href="/pdf-editor" className={toolLink}>PDF Editor</Link> or <Link href="/image-to-pdf" className={toolLink}>Image to PDF</Link> tool.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Size it for the scanning distance.</strong> Business cards can use small codes (under 1 inch); posters viewed from several feet away need codes several inches across.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A well-designed QR code is a tiny but powerful bridge between print and digital. With our free <Link href="/qr-generator" className={toolLink}>QR Code Generator</Link>, you can create a custom, branded, high-resolution code for any URL, Wi-Fi network, or contact card in seconds — no account, no expiration, and no limits on downloads.
              </p>
            </section>
          <BlogFooterLinks slug="how-to-create-qr-code-online-free" includeBreadcrumbSchema={false} includeFaqSchema={false} />
      </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/qr-generator", label: "QR Code Generator", icon: "M3.75 4.5h4.5v4.5h-4.5v-4.5zm0 10.5h4.5v4.5h-4.5v-4.5zm10.5-10.5h4.5v4.5h-4.5v-4.5zM15 15h1.5v1.5H15V15zm3 0h1.5v1.5H18V15zm-3 3h1.5v1.5H15V18zm3 0h1.5v1.5H18V18z" },
                  { href: "/barcode-generator", label: "Barcode Generator", icon: "M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14" },
                  { href: "/favicon-generator", label: "Favicon Generator", icon: "M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2z" },
                  { href: "/image-to-pdf", label: "Image to PDF", icon: "M9 9h6m-6 4h6m-9 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
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
                  "What Is a QR Code, Really?",
                  "What Can You Encode?",
                  "Step-by-Step: Create Your QR Code",
                  "Designing for Your Brand",
                  "Popular Ways to Use QR Codes",
                  "Pro Tips to Avoid Mistakes",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/free-online-tools-small-business" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Free Online Tools for Small Businesses
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
