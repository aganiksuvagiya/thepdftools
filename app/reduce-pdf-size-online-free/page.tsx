import PdfCompressVariantPage, {
  buildPdfCompressVariantMetadata,
} from "@/components/PdfCompressVariantPage";
import { getPdfCompressVariant } from "@/lib/pdf-compress-variants";

const variant = getPdfCompressVariant("reduce-pdf-size-online-free")!;

export const metadata = buildPdfCompressVariantMetadata(variant);

export default function ReducePdfSizeOnlineFreePage() {
  return <PdfCompressVariantPage variant={variant} />;
}
