import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Russ. We're based in Bratislava, Slovakia and ready to help with your navigation technology needs.",
};

export default function ContactPage() {
  return <ContactClient />;
}
