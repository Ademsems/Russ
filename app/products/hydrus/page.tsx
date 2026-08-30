import type { Metadata } from "next";
import HydrusClient from "./HydrusClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHydrusVideos } from "@/lib/getHydrusVideos";
import { getHeroImage } from "@/lib/getHeroImage";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_HYDRUS } from "@/lib/config";
import hydrusContent from "@/content/hydrus.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hydrus — Autonomous Underwater Vehicle",
  description:
    "Hydrus is a micro hovering AUV by Advanced Navigation that makes subsea surveying easy and affordable. Available from RKC Technology — authorised dealer for Central Europe.",
};

export default async function HydrusPage() {
  const images = getProductImages("hydrus", "Hydrus AUV");
  const videos = getHydrusVideos();
  const heroImage = getHeroImage("hydrus");
  const sheetContent = await fetchContent(SHEET_CSV_HYDRUS);
  const content = getContent(sheetContent, toFallbackMap(hydrusContent));
  return <HydrusClient images={images} videos={videos} heroImage={heroImage} content={content} />;
}
