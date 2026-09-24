import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getHeroImage } from "@/lib/getHeroImage";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_HOME } from "@/lib/config";
import homeContent from "@/content/home.json";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SLUGS = [
  { slug: "hydrus", name: "Hydrus", href: "/products/hydrus", accent: "#00B89F" },
  { slug: "subsonus", name: "Subsonus", href: "/products/subsonus", accent: "#1E5FBF" },
  { slug: "subsonus-tag", name: "Subsonus Tag", href: "/products/subsonus-tag", accent: "#00B89F" },
  { slug: "gnss-compass", name: "GNSS Compass", href: "/products/gnss-compass", accent: "#1E5FBF" },
] as const;

export default async function HomePage() {
  const products = SLUGS.map((p) => ({ ...p, heroImage: getHeroImage(p.slug) }));
  const sheetContent = await fetchContent(SHEET_CSV_HOME);
  const content = getContent(sheetContent, toFallbackMap(homeContent));
  return <HomeClient products={products} content={content} />;
}
