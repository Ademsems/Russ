import type { Metadata } from "next";
import SubsonusTagClient from "./SubsonusTagClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_SUBSONUS_TAG } from "@/lib/config";
import subsonusTagContent from "@/content/subsonus-tag.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Subsonus Tag — Subsea Transponder",
  description:
    "Subsonus Tag is an ultra-long-life underwater transponder by Advanced Navigation for reliable subsea tracking. Available from RKC Technology — authorised dealer for Central Europe.",
};

export default async function SubsonusTagPage() {
  const images = getProductImages("subsonus-tag", "Subsonus Tag");
  const heroImage = getHeroImage("subsonus-tag");
  const sheetContent = await fetchContent(SHEET_CSV_SUBSONUS_TAG);
  const content = getContent(sheetContent, toFallbackMap(subsonusTagContent));
  return <SubsonusTagClient images={images} heroImage={heroImage} content={content} />;
}
