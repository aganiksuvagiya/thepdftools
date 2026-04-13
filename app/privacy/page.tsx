import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ThePDFTools",
  description:
    "ThePDFTools privacy policy. All file processing happens locally in your browser. No files are uploaded to our servers.",
  alternates: {
    canonical: "https://thepdftools.site/privacy",
  },
  openGraph: {
    title: "Privacy Policy — ThePDFTools",
    description:
      "ThePDFTools privacy policy. File processing happens locally in your browser with no server uploads.",
    url: "https://thepdftools.site/privacy",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: April 2026</p>

          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
            <div>
              <h2 className="text-base font-semibold text-slate-900">No File Uploads</h2>
              <p className="mt-2">
                All file processing on ThePDFTools happens entirely in your browser using client-side JavaScript. Your files — PDFs, images, and documents — are never uploaded to our servers or any third-party servers. They never leave your device.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Contact</h2>
              <p className="mt-2">
                If you have questions about this privacy policy, please reach out via the contact information on our site.
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-4 text-sm">
            <Link href="/" className="text-brand-600 hover:underline font-medium">← Back to Tools</Link>
            <Link href="/about" className="text-slate-500 hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
