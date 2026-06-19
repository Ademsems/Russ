import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Advanced Navigation — Slovakia, Czech Republic, Austria & Hungary",
    template: "%s | Advanced Navigation",
  },
  description:
    "Exclusive authorised distributor of Advanced Navigation navigation, positioning, and autonomy technology across Slovakia, Czech Republic, Austria, and Hungary. Based in Bratislava.",
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
      </body>
    </html>
  );
}
