import type { Metadata } from "next";
import GnssCompassClient from "./GnssCompassClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_GNSS_COMPASS } from "@/lib/config";
import gnssCompassContent from "@/content/gnss-compass.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GNSS Compass — Precision Navigation System",
  description:
    "The GNSS Compass is an all-in-one GPS-aided inertial navigation system by Advanced Navigation with RTK positioning. Available from RKC Technology — authorised dealer for Central Europe.",
  alternates: { canonical: "/products/gnss-compass" },
};

export default async function GnssCompassPage() {
  const images = getProductImages("gnss-compass", "GNSS Compass");
  const heroImage = getHeroImage("gnss-compass");
  const sheetContent = await fetchContent(SHEET_CSV_GNSS_COMPASS);
  const content = getContent(sheetContent, toFallbackMap(gnssCompassContent));
  return <GnssCompassClient images={images} heroImage={heroImage} content={content} />;
}
