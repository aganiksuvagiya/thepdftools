import type { Metadata } from "next";
import { buildBlogMetadata } from "@/lib/blog-seo";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/create-resume-online-free`;

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogMetadata("create-resume-online-free");
}


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Create a Resume Online for Free (No Signup, No Watermark)",
      description:
        "Build a professional, ATS-friendly resume online for free and download it as a PDF. Step-by-step guide covering templates, formatting, ATS optimization, and section-by-section writing tips for 2026.",
      url: POST_URL,
      datePublished: "2026-06-14T00:00:00Z",
      dateModified: "2026-06-14T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      wordCount: 2400,
      articleSection: "Career & Productivity",
      keywords: ["create resume online free", "resume builder free", "ats friendly resume", "free cv maker", "resume templates"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "How to Create a Resume Online for Free", item: POST_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it really free to build a resume with this tool?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The resume builder is completely free, has no signup, no watermark, and no limit on downloads. Your resume is generated as a PDF directly in your browser." },
        },
        {
          "@type": "Question",
          name: "Will my resume be ATS-friendly?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, as long as you use standard section headings, avoid tables and graphics for key content, and stick to common fonts — all of which the templates in this builder are designed around." },
        },
        {
          "@type": "Question",
          name: "Can I use a different template after I start filling in my details?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. You can switch templates at any time and your information carries over automatically, so you can compare layouts before downloading." },
        },
        {
          "@type": "Question",
          name: "Does the tool store or upload my personal information?",
          acceptedAnswer: { "@type": "Answer", text: "No. Everything — including your photo, if you add one — is processed locally in your browser and used only to generate the PDF. Nothing is uploaded to a server." },
        },
      ],
    },
  ],
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

export default function CreateResumeOnlineFree() {
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
                {["Career", "Resume Builder"].map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{tag}</span>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                How to Create a Resume Online
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  for Free — No Signup, No Watermark
                </span>
              </h1>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>June 14, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>11 min read</span>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                A well-formatted resume is the single most important document in your job search — and you don&rsquo;t need expensive software or a designer to make one. This guide walks through everything you need to know to build a clean, ATS-friendly resume in minutes: choosing the right template, writing each section, avoiding common formatting mistakes, and downloading a polished PDF you can send anywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            {/* Section 1 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Why Your Resume Format Matters More Than Ever</h2>
              <div className="mt-4 space-y-4">
                <p className="text-[15px] leading-8 text-slate-600">
                  Recruiters spend an average of just six to eight seconds on an initial resume scan. In that tiny window, your resume has to communicate who you are, what you&rsquo;ve done, and why you&rsquo;re worth a second look. A cluttered layout, inconsistent fonts, or a wall of text without clear sections will get your resume passed over — regardless of how strong your actual experience is.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  But the bigger gatekeeper today isn&rsquo;t the recruiter at all — it&rsquo;s the software they use before a human ever sees your application. Most mid-size and large companies run incoming resumes through an Applicant Tracking System (ATS) that parses your document, extracts your work history, education, and skills, and scores how well they match the job description. If your resume format confuses that parser, a strong candidate can be filtered out before a recruiter even opens the file.
                </p>
                <p className="text-[15px] leading-8 text-slate-600">
                  That makes the choice between a fancy, designer-heavy resume and a clean, structured one less about taste and more about whether your application is even readable by the systems standing between you and an interview. The good news: a clean, professional resume that passes ATS checks can still look polished and modern — you just need the right structure.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What &ldquo;ATS-Friendly&rdquo; Actually Means</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                ATS software reads your resume as plain text, looking for recognizable section headings and consistent formatting patterns. A few rules keep your resume parseable:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Use Standard Section Headings</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    &ldquo;Work Experience,&rdquo; &ldquo;Education,&rdquo; and &ldquo;Skills&rdquo; are recognized instantly by parsers. Creative alternatives like &ldquo;My Journey&rdquo; or &ldquo;What I Bring&rdquo; can confuse the system and cause whole sections to be skipped.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Avoid Tables for Key Content</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Multi-column tables can scramble the reading order for some parsers, mixing up dates, job titles, and companies. A single-column flow with clear left-to-right reading order is safest.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Stick to Standard Fonts</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Helvetica, Arial, Calibri, and Times New Roman are universally supported. Decorative or script fonts may render as garbled characters when text is extracted.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Keep Contact Info as Text</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Putting your email or phone number inside an image, icon, or header/footer area can make it invisible to parsers — and to the recruiter copying your details into a CRM.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-8 text-slate-600">
                The templates in our <Link href="/resume-builder" className={toolLink}>free resume builder</Link> are built around these rules by default, so you can focus on the content rather than worrying about hidden formatting traps.
              </p>
            </section>

            {/* Section 3 — Step by step */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step: Build Your Resume in Our Free Tool</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Our <Link href="/resume-builder" className={toolLink}>resume builder</Link> runs entirely in your browser — nothing you type or upload is sent to a server. Here&rsquo;s the full workflow:
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Open the resume builder and pick a starting template. You can preview Modern, Classic, Minimal, Professional, and Creative layouts — each with different fonts, accent colors, and section header styles.",
                  "Fill in your personal details: full name, target job title, email, phone, location, and (optionally) a website or portfolio link. Add a profile photo if your target industry or country expects one.",
                  "Write a 2-3 sentence professional summary that highlights your years of experience, core strengths, and what you're looking for next.",
                  "Add your work experience — one entry per role, with position, company, location, start/end dates, and 1-3 bullet points describing your impact.",
                  "Add your education history, including degree, field of study, school name, and dates.",
                  "Add your skills one at a time — each becomes a removable tag, so you can quickly add, reorder, or remove individual skills.",
                  "Use the live preview panel to check how everything looks in your chosen template, then click \"Generate Resume PDF\" to download.",
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
                  href="/resume-builder"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" /></svg>
                  Build Your Resume Free
                </Link>
              </div>
            </section>

            {/* Section 4 — Choosing a template */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Choosing the Right Resume Template</h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                Different templates send different signals before a recruiter reads a single word. Here&rsquo;s how to match the layout to your situation:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Modern", desc: "Indigo accents with underlined section headers — a versatile, contemporary choice that works for tech, marketing, and most office roles." },
                  { label: "Classic", desc: "Centered header with a serif font and traditional layout — well suited for academic, legal, government, and finance applications." },
                  { label: "Minimal", desc: "Clean black & white with generous whitespace — ideal when the job description emphasizes 'attention to detail' or for design-adjacent roles where restraint reads as confidence." },
                  { label: "Professional", desc: "Navy section bars for a corporate look — strong for management, consulting, and client-facing positions." },
                  { label: "Creative", desc: "Centered header with teal accent markers — a good middle ground for marketing, media, or startup roles that want personality without going overboard." },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">{row.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{row.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-8 text-slate-600">
                Not sure which to pick? Start with Modern or Minimal — both are safe defaults that read well on screen and in print, and you can switch templates instantly without losing your entered information.
              </p>
            </section>

            {/* Section 5 — Writing each section */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">How to Write Each Resume Section</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Professional Summary</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    Two to three sentences that answer: who are you professionally, what have you done, and what do you want next? Lead with your title and years of experience, mention one or two standout achievements with numbers if possible, and end with what you&rsquo;re looking for. Avoid generic filler like &ldquo;hardworking team player seeking opportunities&rdquo; — be specific to the role you want.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Work Experience</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    List roles in reverse chronological order. For each one, write 2-4 bullet points that start with an action verb (Led, Built, Reduced, Launched, Managed) and, where possible, end with a measurable result (&ldquo;reduced onboarding time by 30%&rdquo; beats &ldquo;responsible for onboarding&rdquo;). Focus on outcomes and impact rather than a list of daily duties.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Education</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    Include your degree, field of study, institution, and graduation date. If you&rsquo;re early in your career, you can add relevant coursework, honors, or GPA (if strong). Experienced professionals can keep this section brief — degree, school, and year are usually enough.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Skills</h3>
                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    List skills that are specific and relevant to the target role — tools, technologies, languages, certifications, or methodologies. Avoid vague soft skills like &ldquo;communication&rdquo; unless the job description specifically calls for them; instead, demonstrate soft skills through your experience bullet points.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 — Mistakes to avoid */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Common Resume Mistakes to Avoid</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Going over two pages</strong> for early- to mid-career candidates. Recruiters rarely read past the first page on an initial scan — make every line earn its place.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Using the same resume for every application.</strong> Tailor your summary and skills section to match the language of each job posting.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Listing duties instead of achievements.</strong> &ldquo;Managed social media accounts&rdquo; says little; &ldquo;Grew Instagram following from 2k to 40k in 8 months&rdquo; says a lot.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Inconsistent formatting</strong> — mixed date formats, uneven spacing, or different bullet styles between sections signal carelessness.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Including a photo where it's not expected.</strong> In the US, UK, Canada, and Australia, resume photos are uncommon and can introduce bias concerns. They're more standard in parts of Europe and Asia — check local norms before adding one.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-red-500">&#10007;</span>
                  <span><strong>Typos and outdated contact info.</strong> Always proofread, and double-check the email and phone number are current — this is the most common reason a strong candidate never gets a callback.</span>
                </li>
              </ul>
            </section>

            {/* Section 7 — Pro tips */}
            <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Pro Tips for a Stronger Resume</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-8 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Mirror the job description's language.</strong> If the posting says &ldquo;project management,&rdquo; use that exact phrase rather than &ldquo;managing projects&rdquo; — ATS keyword matching is often literal.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Customize section labels when needed.</strong> Our builder lets you rename section headings (e.g. &ldquo;Professional Summary&rdquo; → &ldquo;Profile&rdquo;) while keeping the underlying structure ATS-friendly.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Save multiple versions.</strong> Generate a fresh PDF for each application with slightly different summary wording and skills order to match the role.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Export your cover letter too.</strong> Pair your resume with a matching document using our <Link href="/text-to-pdf" className={toolLink}>Text to PDF</Link> tool for a quick, clean cover letter PDF.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-brand-500">&#10003;</span>
                  <span><strong>Double-check the PDF before sending.</strong> Open the downloaded file and confirm fonts, spacing, and contact details render correctly on both desktop and mobile viewers.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[15px] leading-8 text-slate-600">
                A great resume doesn&rsquo;t need to be expensive or complicated — it needs to be clear, consistent, and tailored to the role you want. With our free <Link href="/resume-builder" className={toolLink}>resume builder</Link>, you can experiment with five different layouts, customize section labels and accent colors, and download a polished, ATS-friendly PDF in minutes — all without creating an account or sending your information anywhere.
              </p>
            </section>
          <BlogFooterLinks slug="create-resume-online-free" includeBreadcrumbSchema={false} includeFaqSchema={false} />
      </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Try These Tools</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/resume-builder", label: "Resume Builder", icon: "M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" },
                  { href: "/invoice-generator", label: "Invoice Generator", icon: "M9 12h6m-6 4h6m-9 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
                  { href: "/signature-generator", label: "Signature Generator", icon: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" },
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

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">In This Article</h3>
              <nav className="mt-4 space-y-2">
                {[
                  "Why Your Resume Format Matters",
                  "What ATS-Friendly Means",
                  "Step-by-Step: Build Your Resume",
                  "Choosing the Right Template",
                  "How to Write Each Section",
                  "Common Mistakes to Avoid",
                  "Pro Tips for a Stronger Resume",
                ].map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-500">{item}</p>
                ))}
              </nav>
            </div>

            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Related Posts</h3>
              <div className="mt-4 space-y-3">
                <Link href="/blog/free-invoice-generator-freelancers" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Free Invoice Generator for Freelancers
                </Link>
                <Link href="/blog/free-online-tools-small-business" className="block text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors">
                  Free Online Tools for Small Businesses
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
