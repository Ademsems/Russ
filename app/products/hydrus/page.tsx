import type { Metadata } from "next";
import HydrusClient from "./HydrusClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHydrusVideos } from "@/lib/getHydrusVideos";

export const metadata: Metadata = {
  title: "Hydrus — Autonomous Underwater Vehicle",
  description:
    "Hydrus is a micro hovering AUV that makes subsea surveying and inspection easy and affordable. Available from Russ in Central Europe.",
};

export default function HydrusPage() {
  const images = getProductImages("hydrus", "Hydrus AUV");
  const videos = getHydrusVideos();
  return <HydrusClient images={images} videos={videos} />;
}
