import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PptToPdfClient = dynamic(() => import("./PptToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PowerPoint to PDF Converter Online — Convert PPTX to PDF",
  description:
    "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser. Extract slide content from PPTX and download as PDF instantly.",
  keywords: [
    "ppt to pdf",
    "powerpoint to pdf",
    "convert pptx to pdf online",
    "ppt to pdf converter free",
    "pptx to pdf",
    "presentation to pdf",
  ],
  openGraph: {
    title: "Free PowerPoint to PDF Converter Online — Convert PPTX to PDF",
    description:
      "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser. Download your PDF instantly.",
    url: "https://thepdftools.site/ppt-to-pdf",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/ppt-to-pdf",
  },
};

export default function PptToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PowerPoint to PDF Converter",
        url: "https://thepdftools.site/ppt-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert PowerPoint presentations to PDF format free online. No upload required — conversion happens in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does this converter preserve formatting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This lightweight browser-based converter extracts text content from your PowerPoint slides and creates a clean PDF. For full formatting, images, and layout preservation, use Microsoft Office or Google Slides to export as PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to convert my PowerPoint here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PowerPoint file never leaves your browser. All processing is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What file formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool supports .pptx (PowerPoint 2007+) and .ppt files. For best results, use .pptx format as it allows full text extraction from the XML-based file structure.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple presentations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can convert presentations one after another. Each conversion happens instantly in your browser with no waiting for server processing.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="tool-page-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
            PPT to PDF
          </div>
          <h1 className="tool-page-title">Free PowerPoint to PDF Converter Online</h1>
          <p className="tool-page-description">
            Convert your PowerPoint presentations to PDF format instantly in your
            browser. Extract slide text content and download a clean PDF — no
            server upload, no signup required.
          </p>
        </div>

        <PptToPdfClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert PowerPoint to PDF Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Click the upload area above or drag and drop your .pptx or .ppt file into the converter.</li>
              <li>The tool reads your PowerPoint file directly in your browser — nothing is sent to a server.</li>
              <li>Text content is extracted from each slide and organized into a PDF document.</li>
              <li>Review the slide count and file information displayed after processing.</li>
              <li>Click the download button to save the converted PDF file to your device.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Benefits of Converting PPT to PDF</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Universal Compatibility</h3>
                <p className="mt-1 text-sm text-gray-500">PDF files can be opened on any device without needing PowerPoint installed. Share your presentation content with anyone, regardless of their software or operating system.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">100% Browser-Based</h3>
                <p className="mt-1 text-sm text-gray-500">Your PowerPoint files never leave your device. The entire conversion runs locally using JavaScript, so there is no upload delay, no server queue, and no privacy risk.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Quick Text Extraction</h3>
                <p className="mt-1 text-sm text-gray-500">Extracts all text content from your slides and organizes it into a clean, readable PDF. Perfect for archiving presentation notes, sharing talking points, or creating text-based summaries.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-gray-500">Start converting immediately with no account registration, no email verification, and no daily limits. The tool is completely free and always available.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Does this converter preserve full formatting?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">This lightweight browser-based converter focuses on extracting text content from your PowerPoint slides and creating a clean PDF. It does not preserve complex layouts, animations, embedded images, or custom fonts. For full visual fidelity, export directly from Microsoft PowerPoint or Google Slides.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is it safe to convert my PowerPoint file here?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Absolutely. Your PowerPoint file is processed entirely within your web browser using JavaScript. No files are uploaded to any external server, no data is stored remotely, and no third parties ever see your content. The tool works with complete privacy.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">What file formats are supported?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">This tool supports .pptx (Office Open XML, PowerPoint 2007 and later) and .ppt (legacy PowerPoint format) files. For best results, use the modern .pptx format, as it uses an XML-based structure that allows complete text extraction. Legacy .ppt files have a binary format and may have limited text extraction.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert multiple presentations?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">Yes. You can convert as many PowerPoint files as you need, one after another. Each conversion happens instantly inside your browser with no server round-trip. There are no daily limits or file-count restrictions.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is there a file size limit?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <p className="mt-2 text-sm text-gray-500">There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device&apos;s available memory. Most presentations under 100 MB convert without any issues.</p>
              </details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Our free online PowerPoint to PDF converter is designed for anyone who needs to convert PPTX presentations to PDF format quickly and securely. Whether you are a student converting lecture slides for study notes, a professional sharing presentation content with colleagues who do not have PowerPoint, or a teacher creating printable handouts from your slides, this tool handles it efficiently. Because the conversion runs entirely inside your browser using JavaScript, your files never leave your computer, eliminating privacy concerns and the wait times associated with server-side processing. The tool extracts text content from each slide in your presentation and creates a clean, organized PDF document with one page per slide. This makes it ideal for archiving presentation text, creating searchable documents from slide content, and sharing talking points without requiring PowerPoint software. The converter supports both modern .pptx files and legacy .ppt format. It works on Windows, macOS, Linux, Android, and iOS devices with any modern web browser. There are no file-size limits, no daily conversion caps, and no account registration required. Simply drop your PowerPoint file, wait for processing, and download your PDF instantly.</p>
        </div>
      </div>
    </div>
  );
}
