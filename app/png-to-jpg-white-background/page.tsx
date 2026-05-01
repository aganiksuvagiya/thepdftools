import PngToJpgVariantPage, {
  buildPngToJpgVariantMetadata,
} from "@/components/PngToJpgVariantPage";
import { getPngToJpgVariant } from "@/lib/png-to-jpg-variants";

const variant = getPngToJpgVariant("png-to-jpg-white-background")!;

export const metadata = buildPngToJpgVariantMetadata(variant);

export default function PngToJpgWhiteBackgroundPage() {
  return <PngToJpgVariantPage variant={variant} />;
}
