import type { Metadata } from "next";
import HydrusClient from "./HydrusClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHydrusVideos } from "@/lib/getHydrusVideos";
import { getHeroImage } from "@/lib/getHeroImage";

export const metadata: Metadata = {
  title: "Hydrus — Autonomous Underwater Vehicle",
  description:
    "Hydrus is a micro hovering AUV by Advanced Navigation that makes subsea surveying easy and affordable. Available from RKC Technology — authorised dealer for Central Europe.",
};

export default function HydrusPage() {
  const images = getProductImages("hydrus", "Hydrus AUV");
  const videos = getHydrusVideos();
  const heroImage = getHeroImage("hydrus");
  return <HydrusClient images={images} videos={videos} heroImage={heroImage} />;
}
