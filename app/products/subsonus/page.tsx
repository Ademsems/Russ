import type { Metadata } from "next";
import SubsonusClient from "./SubsonusClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";

export const metadata: Metadata = {
  title: "Subsonus — Underwater Acoustic Positioning",
  description:
    "Subsonus is a compact USBL underwater acoustic positioning system by Advanced Navigation. Available from RKC Technology — authorised dealer for Slovakia, Czech Republic, Austria, and Hungary.",
};

export default function SubsonusPage() {
  const images = getProductImages("subsonus", "Subsonus USBL");
  const heroImage = getHeroImage("subsonus");
  return <SubsonusClient images={images} heroImage={heroImage} />;
}
