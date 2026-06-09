import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Russ — the authorised Advanced Navigation distributor for Central Europe, based in Bratislava, Slovakia.",
};

export default function AboutPage() {
  return <AboutClient />;
}
