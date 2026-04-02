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
      </div>
    </div>
  );
}
