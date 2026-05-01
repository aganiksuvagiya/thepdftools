import PngToJpgVariantPage, {
  buildPngToJpgVariantMetadata,
} from "@/components/PngToJpgVariantPage";
import { getPngToJpgVariant } from "@/lib/png-to-jpg-variants";

const variant = getPngToJpgVariant("png-to-jpg-for-photos")!;

export const metadata = buildPngToJpgVariantMetadata(variant);

export default function PngToJpgForPhotosPage() {
  return <PngToJpgVariantPage variant={variant} />;
}
