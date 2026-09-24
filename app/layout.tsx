import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "RKC Technology — Authorised Dealer for Advanced Navigation in Central Europe",
    template: "%s | RKC Technology",
  },
  description:
    "RKC Technology is the authorised dealer for Advanced Navigation products across Slovakia, Czech Republic, Austria, and Hungary. Hydrus AUV, Subsonus USBL, GNSS Compass and more. Based in Bratislava.",
  // No `alternates.canonical` here: it would be inherited by every page and point them all at "/".
  // Each page declares its own canonical path; metadataBase resolves it to the primary host.
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
