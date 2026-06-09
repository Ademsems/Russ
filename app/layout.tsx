import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Russ — Advanced Navigation Technology",
    template: "%s | Russ",
  },
  description:
    "Russ is an authorised distributor of Advanced Navigation products in Central Europe. Underwater, surface, and inertial navigation systems. Based in Bratislava, Slovakia.",
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
      </body>
    </html>
  );
}
