import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PdfToWordClient = dynamic(() => import("./PdfToWordClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF to Word Converter Online — Convert PDF to DOCX",
  description:
    "Convert PDF files to editable Word documents for free online. Extract text from PDFs and download as .doc files. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "pdf to word",
    "pdf to docx",
    "convert pdf to word online",
    "free pdf converter",
    "pdf to doc",
    "extract text from pdf",
  ],
  openGraph: {
    title: "Free PDF to Word Converter Online — Convert PDF to DOCX",
    description:
      "Convert PDF files to editable Word documents for free online. Extract text from PDFs and download as .doc files. No upload, no signup — runs entirely in your browser.",
    url: "https://thepdftools.site/pdf-to-word",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-to-word",
  },
};

export default function PdfToWordPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF to Word Converter",
        url: "https://thepdftools.site/pdf-to-word",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert PDF files to editable Word documents for free online. Extract text and download as .doc — runs entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert PDFs here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All text extraction and conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What kind of PDFs can I convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool works best with text-based PDFs. Scanned PDFs (images) will not produce extractable text. Encrypted or password-protected PDFs are also not supported.",
            },
          },
          {
            "@type": "Question",
            name: "Will the formatting be preserved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The tool extracts text content and preserves paragraph structure and page breaks. Complex formatting like tables, columns, and images may not be fully preserved.",
            },
          },
          {
            "@type": "Question",
            name: "What format is the output file?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The output is a .doc file that can be opened in Microsoft Word, Google Docs, LibreOffice, and other word processors.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            PDF to Word
          </div>
          <h1 className="tool-page-title">Free PDF to Word Converter Online</h1>
          <p className="tool-page-description">
            Convert PDF files to editable Word documents instantly in your
            browser. Extract text with page breaks preserved — no upload, no
            server, completely private.
          </p>
        </div>

        <PdfToWordClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Convert PDF to Word Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>The tool automatically extracts text content from your PDF document.</li>
              <li>Preview the extracted text to verify the conversion looks correct.</li>
              <li>Click the download button to save your editable Word (.doc) file.</li>
              <li>Open the file in Microsoft Word, Google Docs, or LibreOffice to edit.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our PDF to Word Converter?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Preserves Formatting</h3><p className="mt-1 text-sm text-gray-500">Text content and paragraph structure are preserved along with page breaks, giving you a well-organized editable document.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Editable Output</h3><p className="mt-1 text-sm text-gray-500">The output .doc file is fully editable in Microsoft Word, Google Docs, LibreOffice, and other popular word processors.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">No Signup Required</h3><p className="mt-1 text-sm text-gray-500">Start converting immediately without creating an account, providing an email address, or installing any software.</p></div>
              <div className="p-4 rounded-lg bg-gray-50"><h3 className="text-sm font-medium text-gray-900">Fast Conversion</h3><p className="mt-1 text-sm text-gray-500">Processing runs locally in your browser using JavaScript, delivering results in seconds without waiting for server-side processing.</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Will the formatting be preserved?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">The tool extracts text content and preserves paragraph structure and page breaks. Complex formatting like tables, columns, and images may not be fully preserved.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert scanned PDFs?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">This tool works best with text-based PDFs. Scanned PDFs that contain only images will not produce extractable text. You would need an OCR tool for scanned documents.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Is this tool completely free?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes, 100% free with no hidden costs, no trial period, and no premium tier. Convert as many PDFs as you like without any restrictions.</p></details>
              <details className="group"><summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">Can I convert large PDF files?<svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><p className="mt-2 text-sm text-gray-500">Yes. There is no server-imposed size limit. Since conversion runs in your browser, very large files may take longer depending on your device&apos;s processing power and available memory.</p></details>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Convert PDF to Word online for free with our browser-based PDF to DOCX converter. Extract text from PDF documents and download editable Word files instantly. This free PDF to Word converter is perfect for editing contracts, reports, academic papers, and business documents. No server upload, no signup, no watermark — your files stay private on your device.</p>
        </div>
      </div>
    </div>
  );
}
