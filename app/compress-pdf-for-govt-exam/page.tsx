import PdfCompressVariantPage, {
  buildPdfCompressVariantMetadata,
} from "@/components/PdfCompressVariantPage";
import { getPdfCompressVariant } from "@/lib/pdf-compress-variants";

const variant = getPdfCompressVariant("compress-pdf-for-govt-exam")!;

export const metadata = buildPdfCompressVariantMetadata(variant);

export default function CompressPdfForGovtExamPage() {
  return <PdfCompressVariantPage variant={variant} />;
}
