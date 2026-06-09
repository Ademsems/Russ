import type { Metadata } from "next";
import GnssCompassClient from "./GnssCompassClient";

export const metadata: Metadata = {
  title: "GNSS Compass — Precision Navigation System",
  description:
    "The GNSS Compass is an all-in-one GPS-aided inertial navigation system with RTK positioning and precise heading. Available from Russ in Central Europe.",
};

export default function GnssCompassPage() {
  return <GnssCompassClient />;
}
