import PngToJpgVariantPage, {
  buildPngToJpgVariantMetadata,
} from "@/components/PngToJpgVariantPage";
import { getPngToJpgVariant } from "@/lib/png-to-jpg-variants";

const variant = getPngToJpgVariant("convert-png-to-jpg-online-free")!;

export const metadata = buildPngToJpgVariantMetadata(variant);

export default function ConvertPngToJpgOnlineFreePage() {
  return <PngToJpgVariantPage variant={variant} />;
}
