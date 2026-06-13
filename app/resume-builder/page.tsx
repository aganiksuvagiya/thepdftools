import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";

const ResumeBuilderClient = dynamic(() => import("./ResumeBuilderClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Resume Builder Online Free No Upload",
  description:
    "Build a professional resume online for free — add your experience, education, and skills, then download as a clean PDF. No signup, no uploads, runs in your browser.",
  keywords: [
    "resume builder",
    "free resume builder",
    "online resume maker",
    "create resume online free",
    "cv builder online",
    "resume pdf generator",
    "professional resume template",
    "resume maker no signup",
    "build resume online",
    "free cv maker",
    "resume builder for students",
    "job application resume builder",
  ],
  openGraph: {
    title: "Resume Builder Online Free No Upload",
    description:
      "Build a professional resume online for free — add your experience, education, and skills, then download as a clean PDF. No signup, no uploads, runs in your browser.",
    url: "https://thepdftools.site/resume-builder",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/resume-builder",
  },
};

export default function ResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Resume Builder",
        url: "https://thepdftools.site/resume-builder",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Build a professional resume for free online. Add your contact details, summary, work experience, education, and skills, then download a clean PDF resume instantly.",
      },
      {
        "@type": "HowTo",
        name: "How to Create a Resume Online",
        step: [
          { "@type": "HowToStep", name: "Add personal details", text: "Enter your name, professional title, email, phone, location, and website or LinkedIn profile." },
          { "@type": "HowToStep", name: "Write a summary", text: "Add a short professional summary highlighting your experience and strengths." },
          { "@type": "HowToStep", name: "List your experience", text: "Add your work history with job titles, companies, dates, and bullet-point achievements." },
          { "@type": "HowToStep", name: "Add education and skills", text: "List your degrees, schools, and a comma-separated list of your key skills." },
          { "@type": "HowToStep", name: "Download your resume", text: "Click \"Generate Resume PDF\" to download a polished, ready-to-send resume." },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the resume builder completely free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% free with no limitations. There are no watermarks, no hidden fees, and no cap on how many resumes you can create or download.",
            },
          },
          {
            "@type": "Question",
            name: "Is my resume data safe and private?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. The entire resume is generated locally in your browser. None of your personal details, work history, or education information is sent to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Can I add multiple jobs and education entries?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can add as many work experience and education entries as you need using the \"Add Experience\" and \"Add Education\" buttons, and remove any you don't need.",
            },
          },
          {
            "@type": "Question",
            name: "What format is the resume downloaded in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your resume is downloaded as a clean, single or multi-page PDF file that's ready to attach to job applications or print.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to sign up or create an account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Just open the tool, fill in your details, and click generate. No account, email verification, or subscription is required.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thepdftools.site" },
          { "@type": "ListItem", position: 2, name: "Generators", item: "https://thepdftools.site/generators" },
          { "@type": "ListItem", position: 3, name: "Resume Builder", item: "https://thepdftools.site/resume-builder" },
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
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Generators", href: "/generators" },
          { label: "Resume Builder" },
        ]} />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l5 5v13H5V3h2zm1 8h8M8 15h8M8 19h5" />
                </svg>
                Resume Builder
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Build a professional resume
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  and download it as a PDF
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Add your experience, education, and skills, then download a clean,
                ready-to-send resume. No signup, no server uploads, completely free.
              </p>
            </div>

            <div className="mt-8">
              <ResumeBuilderClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for job seekers",
                  text: "Create a polished resume for job applications in minutes without expensive software.",
                },
                {
                  title: "Best for students & freshers",
                  text: "Build your first resume with a clean layout that highlights education and skills.",
                },
                {
                  title: "Best for privacy",
                  text: "Everything runs locally on your device. Your personal details never leave your browser.",
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

          <aside className="relative px-6 pb-10 sm:px-10 sm:pb-12">
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Job seekers", "Students & freshers", "Career changers", "Freelancers"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Build a Resume Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Enter your name, professional title, and contact details (email, phone, location, website or LinkedIn).</li>
              <li>Write a short professional summary, then add your work experience with job titles, companies, dates, and bullet-point achievements.</li>
              <li>Add your education history and a comma-separated list of skills, then click &quot;Generate Resume PDF&quot; to download instantly.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Free Resume Builder?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">100% Private &amp; Secure</h3>
                <p className="mt-1 text-sm text-slate-500">Your resume data never leaves your device. The entire PDF is generated locally in your browser, keeping your personal and career information completely confidential.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Clean, ATS-Friendly Layout</h3>
                <p className="mt-1 text-sm text-slate-500">A simple, well-structured single-column layout with clear section headings that's easy for applicant tracking systems and recruiters to read.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Unlimited Sections</h3>
                <p className="mt-1 text-sm text-slate-500">Add as many work experience entries and education entries as you need. The PDF automatically flows onto additional pages if your resume is long.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start building your resume immediately. No account registration, no email verification, no subscription. Just fill in the form and download your PDF for free.</p>
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
                  q: "Is the resume builder completely free?",
                  a: "Yes, 100% free with no limitations. There are no watermarks, no hidden fees, and no cap on how many resumes you can create or download.",
                },
                {
                  q: "Is my resume data safe and private?",
                  a: "Absolutely. The entire resume is generated locally in your browser. None of your personal details, work history, or education information is sent to any server.",
                },
                {
                  q: "Can I add multiple jobs and education entries?",
                  a: "Yes. You can add as many work experience and education entries as you need using the \"Add Experience\" and \"Add Education\" buttons, and remove any you don't need.",
                },
                {
                  q: "What format is the resume downloaded in?",
                  a: "Your resume is downloaded as a clean, single or multi-page PDF file that's ready to attach to job applications or print.",
                },
                {
                  q: "Do I need to sign up or create an account?",
                  a: "No. Just open the tool, fill in your details, and click generate. No account, email verification, or subscription is required.",
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
              A well-formatted resume is often the difference between landing an interview and getting overlooked. Whether you&apos;re a student applying for your first job, a professional switching careers, or a freelancer pitching for new contracts, our free online resume builder helps you put together a clean, professional PDF in minutes. Unlike many resume tools that require an account, charge for downloads, or add watermarks, this resume maker runs entirely in your browser at no cost. Add your contact details, a short professional summary, unlimited work experience entries with bullet-point achievements, education history, and a list of skills — then download a ready-to-send PDF instantly. Because everything happens locally on your device, your personal information, career history, and contact details are never uploaded or stored anywhere. From freshers building their very first CV to experienced professionals updating their resume for a new role, this free resume builder makes it fast and private to create a document that's ready for job applications.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Related Tools
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/invoice-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Invoice Generator</Link>
              <Link href="/signature-generator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Signature Generator</Link>
              <Link href="/text-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Text to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="resume-builder" />
        </div>
      </div>
    </div>
  );
}
