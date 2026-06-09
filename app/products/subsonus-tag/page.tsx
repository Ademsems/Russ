import type { Metadata } from "next";
import SubsonusTagClient from "./SubsonusTagClient";

export const metadata: Metadata = {
  title: "Subsonus Tag — Subsea Transponder",
  description:
    "Subsonus Tag is an ultra-long-life underwater transponder for reliable subsea tracking of divers, ROVs, and assets. Available from Russ in Central Europe.",
};

export default function SubsonusTagPage() {
  return <SubsonusTagClient />;
}
