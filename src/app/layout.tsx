import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Signature by LT",
    template: "%s | Signature by LT",
  },
  description:
    "Signature by LT, salon premium à Paris : barbers, coloristes et experts capillaires pour une expérience sur-mesure.",
  icons: {
    icon: "/assets/icons/logo.ico",
    shortcut: "/assets/icons/logo.ico",
    apple: "/assets/logo/logo-by-lt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
