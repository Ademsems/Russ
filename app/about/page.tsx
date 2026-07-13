import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RKC Technology is the authorised dealer for Advanced Navigation products in Slovakia, Czech Republic, Austria, and Hungary. Based in Bratislava.",
};

export default function AboutPage() {
  return <AboutClient />;
}
