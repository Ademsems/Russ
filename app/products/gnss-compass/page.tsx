import type { Metadata } from "next";
import GnssCompassClient from "./GnssCompassClient";
import { getProductImages } from "@/lib/getProductImages";

export const metadata: Metadata = {
  title: "GNSS Compass — Precision Navigation System",
  description:
    "The GNSS Compass is an all-in-one GPS-aided inertial navigation system with RTK positioning and precise heading. Available from Russ in Central Europe.",
};

export default function GnssCompassPage() {
  const images = getProductImages("gnss-compass", "GNSS Compass");
  return <GnssCompassClient images={images} />;
}
