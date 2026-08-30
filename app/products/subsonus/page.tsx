import type { Metadata } from "next";
import SubsonusClient from "./SubsonusClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_SUBSONUS } from "@/lib/config";
import subsonusContent from "@/content/subsonus.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Subsonus — Underwater Acoustic Positioning",
  description:
    "Subsonus is a compact USBL underwater acoustic positioning system by Advanced Navigation. Available from RKC Technology — authorised dealer for Slovakia, Czech Republic, Austria, and Hungary.",
};

export default async function SubsonusPage() {
  const images = getProductImages("subsonus", "Subsonus USBL");
  const heroImage = getHeroImage("subsonus");
  const sheetContent = await fetchContent(SHEET_CSV_SUBSONUS);
  const content = getContent(sheetContent, toFallbackMap(subsonusContent));
  return <SubsonusClient images={images} heroImage={heroImage} content={content} />;
}
