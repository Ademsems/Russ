import type { Metadata } from "next";
import SubsonusTagClient from "./SubsonusTagClient";
import { getProductImages } from "@/lib/getProductImages";
import { getHeroImage } from "@/lib/getHeroImage";

export const metadata: Metadata = {
  title: "Subsonus Tag — Subsea Transponder",
  description:
    "Subsonus Tag is an ultra-long-life underwater transponder by Advanced Navigation for reliable subsea tracking. Available from RKC Technology — authorised dealer for Central Europe.",
};

export default function SubsonusTagPage() {
  const images = getProductImages("subsonus-tag", "Subsonus Tag");
  const heroImage = getHeroImage("subsonus-tag");
  return <SubsonusTagClient images={images} heroImage={heroImage} />;
}
