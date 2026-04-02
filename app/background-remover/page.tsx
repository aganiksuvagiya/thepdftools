import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BackgroundRemoverClient = dynamic(() => import("./BackgroundRemoverClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free AI Background Remover Online — Remove Image Background Instantly",
  description:
    "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
  keywords: [
    "background remover",
    "remove background online",
    "ai background removal",
    "transparent background",
    "remove image background free",
  ],
  openGraph: {
    title: "Free AI Background Remover Online — Remove Image Background Instantly",
    description:
      "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG. No signup, no watermark.",
    url: "https://thepdftools.site/background-remover",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/background-remover",
  },
};

export default function BackgroundRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free AI Background Remover",
        url: "https://thepdftools.site/background-remover",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Remove image backgrounds for free using AI. Upload your photo, click remove, and download the transparent PNG.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does AI background removal work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our tool uses a machine learning model that runs directly in your browser. It analyzes the image to detect the foreground subject and separates it from the background, producing a transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "What image quality can I expect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The AI produces clean, high-quality cutouts with smooth edges. Results are best with clear subjects and good contrast between foreground and background. The output is a full-resolution transparent PNG.",
            },
          },
          {
            "@type": "Question",
            name: "Is it free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free with no watermarks, no signup required, and no usage limits. The AI model runs in your browser so there are no server costs.",
            },
          },
          {
            "@type": "Question",
            name: "Does it work with complex backgrounds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the AI model handles complex and cluttered backgrounds well. It works best with photos of people, products, and animals, even against busy or multicolored backgrounds.",
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            AI Background Remover
          </div>
          <h1 className="tool-page-title">
            Free AI Background Remover Online
          </h1>
          <p className="tool-page-description">
            Remove backgrounds from photos instantly using AI. Perfect for
            product images, profile pictures, and logos. Download as
            transparent PNG.
          </p>
        </div>

        <BackgroundRemoverClient />

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">How to Remove Background from Images Online</h2>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Upload your photo by dragging and dropping or clicking the upload area. Our AI background remover accepts JPG, PNG, and WebP images of any size.</li>
              <li>The AI model automatically detects the foreground subject and separates it from the background. Processing happens entirely in your browser with no server upload required.</li>
              <li>Download your image as a transparent PNG, ready to use in designs, product listings, presentations, or social media posts.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Use Our AI Background Remover?</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">AI-Powered Precision</h3>
                <p className="mt-1 text-sm text-gray-500">Our machine learning model delivers professional-grade cutouts with clean, smooth edges. The AI background removal technology handles hair, fur, and intricate details with remarkable accuracy.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">No Watermark, Completely Free</h3>
                <p className="mt-1 text-sm text-gray-500">Download your transparent background images without any watermarks, logos, or branding. Remove bg from photo free with no hidden costs, no signup, and no usage limits.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Transparent or Custom Backgrounds</h3>
                <p className="mt-1 text-sm text-gray-500">Get a transparent background maker result as a PNG, perfect for compositing over any color or scene. Use the output in Photoshop, Canva, or any design tool.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Works with Any Photo</h3>
                <p className="mt-1 text-sm text-gray-500">People, products, animals, logos, and objects. The AI handles complex and cluttered backgrounds, delivering clean results even with challenging compositions.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  How does the AI background removal work?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Our tool uses a trained machine learning model that runs directly in your browser. It analyzes the pixels of your image to identify the foreground subject, then creates a precise mask to separate it from the background, producing a transparent PNG output.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  What quality can I expect from the output?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">The AI produces high-quality cutouts with smooth, natural edges. Results are best with clear subjects and decent contrast. The output retains full resolution of your original image as a transparent PNG file.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Is this background remover really free?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Yes, 100% free with no watermarks and no signup required. Since the AI model runs entirely in your browser, there are no server costs passed on to users. You can remove backgrounds from unlimited images at no charge.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Does it work with complex or busy backgrounds?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">Yes. The AI model is trained on diverse datasets and handles complex, multicolored, and cluttered backgrounds effectively. It works especially well with photos of people, products, and animals against challenging scenes.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden flex justify-between items-center">
                  Can I process multiple images in batch?
                  <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-sm text-gray-500">You can process images one at a time for best results. Each image is handled individually by the AI model to ensure precise, high-quality background removal. Simply upload your next photo after downloading the previous result.</p>
              </details>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Removing backgrounds from images has become an essential task across industries. E-commerce sellers need clean product photos with transparent backgrounds to create professional listings on Amazon, Shopify, and eBay. Social media managers remove backgrounds to create eye-catching posts, stories, and ads for Instagram, TikTok, and Facebook. Graphic designers use transparent background makers to composite subjects into new scenes, build marketing collateral, and design brand assets. Our free AI background remover eliminates the need for expensive software like Photoshop or paid online services. The machine learning model powering this tool has been trained on millions of images, enabling it to accurately detect and separate foreground subjects from backgrounds across a wide range of scenarios. Whether you are removing the background from a headshot for your LinkedIn profile, isolating a product for your online store catalog, creating a transparent logo for your website, or preparing images for a presentation, this tool delivers clean, professional results in seconds. Portrait photographers use background removal to offer clients versatile images that can be placed on any backdrop. Real estate professionals remove distracting backgrounds from property feature photos. Content creators rely on AI background removal to produce polished visuals without the learning curve of manual editing tools. All processing happens directly in your browser, meaning your images are never uploaded to external servers, ensuring complete privacy and data security for sensitive personal or commercial photographs.
          </p>
        </div>
      </div>
    </div>
  );
}
