import type { Metadata } from "next";
import FeaturedPrestationDiscover from "@/components/FeaturedPrestationDiscover";
import FeaturedPrestationPhares from "@/components/FeaturedPrestationPhares";
import HeroBanner from "@/components/HeroBanner";
import TeamSection from "@/components/TeamSection";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Signature by LT",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroBanner />
      {/* ===== Section Prestations Découvrir ===== */}
      <FeaturedPrestationDiscover />
       {/* ===== Section Prestations Phares ===== */}
      <FeaturedPrestationPhares />
      {/* ===== Section Avis Clients ===== */}
      <Testimonials />
      {/* ===== Section Nos Coiffeurs & Barbiers ===== */}
      <TeamSection />
    </main>
  );
}
