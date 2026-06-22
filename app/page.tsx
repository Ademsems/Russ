import HomeClient from "./HomeClient";
import { getHeroImage } from "@/lib/getHeroImage";

const SLUGS = [
  { slug: "hydrus", name: "Hydrus", href: "/products/hydrus", accent: "#00B89F" },
  { slug: "subsonus", name: "Subsonus", href: "/products/subsonus", accent: "#1E5FBF" },
  { slug: "subsonus-tag", name: "Subsonus Tag", href: "/products/subsonus-tag", accent: "#00B89F" },
  { slug: "gnss-compass", name: "GNSS Compass", href: "/products/gnss-compass", accent: "#1E5FBF" },
] as const;

export default function HomePage() {
  const products = SLUGS.map((p) => ({ ...p, heroImage: getHeroImage(p.slug) }));
  return <HomeClient products={products} />;
}
