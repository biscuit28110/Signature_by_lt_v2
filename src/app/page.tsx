import type { Metadata } from "next";
import FeaturedPrestationDiscover from "@/components/FeaturedPrestationDiscover";
import FeaturedPrestationPhares from "@/components/FeaturedPrestationPhares";
import HeroBanner from "@/components/HeroBanner";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroBanner />
      {/* ===== Section Prestations Phares ===== */}
      <FeaturedPrestationPhares />
      <FeaturedPrestationDiscover />
      <Testimonials />
    </main>
  );
}
