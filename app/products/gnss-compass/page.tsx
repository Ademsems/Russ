import type { Metadata } from "next";
import GnssCompassClient from "./GnssCompassClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";

export const metadata: Metadata = {
  title: "GNSS Compass — Precision Navigation System",
  description:
    "The GNSS Compass is an all-in-one GPS-aided inertial navigation system by Advanced Navigation with RTK positioning. Available from RKC Technology — authorised dealer for Central Europe.",
};

export default function GnssCompassPage() {
  const images = getProductImages("gnss-compass", "GNSS Compass");
  const heroImage = getHeroImage("gnss-compass");
  return <GnssCompassClient images={images} heroImage={heroImage} />;
}
