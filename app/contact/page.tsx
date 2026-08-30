import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_CONTACT } from "@/lib/config";
import contactContent from "@/content/contact.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RKC Technology. We're based in Bratislava, Slovakia and ready to help with your Advanced Navigation technology needs.",
};

export default async function ContactPage() {
  const sheetContent = await fetchContent(SHEET_CSV_CONTACT);
  const content = getContent(sheetContent, toFallbackMap(contactContent));
  return <ContactClient content={content} />;
}
