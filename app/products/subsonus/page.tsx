import type { Metadata } from "next";
import SubsonusClient from "./SubsonusClient";

export const metadata: Metadata = {
  title: "Subsonus — Underwater Acoustic Positioning",
  description:
    "Subsonus is a compact USBL underwater acoustic positioning system for tracking ROVs, divers, and assets. Available from Russ in Central Europe.",
};

export default function SubsonusPage() {
  return <SubsonusClient />;
}
