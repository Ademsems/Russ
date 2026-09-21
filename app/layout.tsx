import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "RKC Technology — Authorised Dealer for Advanced Navigation in Central Europe",
    template: "%s | RKC Technology",
  },
  description:
    "RKC Technology is the authorised dealer for Advanced Navigation products across Slovakia, Czech Republic, Austria, and Hungary. Hydrus AUV, Subsonus USBL, GNSS Compass and more. Based in Bratislava.",
  metadataBase: new URL("https://advancednavigation.sk"),
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
