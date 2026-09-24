import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_ABOUT } from "@/lib/config";
import aboutContent from "@/content/about.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RKC Technology is the authorised dealer for Advanced Navigation products in Slovakia, Czech Republic, Austria, and Hungary. Based in Bratislava.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const sheetContent = await fetchContent(SHEET_CSV_ABOUT);
  const content = getContent(sheetContent, toFallbackMap(aboutContent));
  return <AboutClient content={content} />;
}
