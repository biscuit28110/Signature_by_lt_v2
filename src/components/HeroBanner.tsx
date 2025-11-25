"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Affiche le hero avec contenu administrable (fallback en dur si l'API est indisponible)
const HeroBanner = () => {
  const [heroTitle, setHeroTitle] = useState("SIGNATURE BY LT");
  const [heroSubtitle, setHeroSubtitle] = useState("-Là où le Style Devient une Signature-");

  useEffect(() => {
    // Récupère le contenu depuis l'API admin (lecture seule côté public)
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/admin/content", { method: "GET" });
        if (!response.ok) return;
        const data = await response.json();
        if (data?.heroTitle) setHeroTitle(data.heroTitle);
        if (data?.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
      } catch {
        // en cas d'erreur on garde les valeurs par défaut
      }
    };
    fetchContent();
  }, []);

  return (
    <section
      aria-label="Présentation du salon Signature by LT"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/assets/media/salon.webm" type="video/webm" />
          <source src="/assets/media/salon.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo.
        </video>
      </div>

      {/* Voile pour lisibilité du contenu au-dessus de la vidéo */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/40" />

      {/* Texte central animé pour la signature de marque */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl uppercase tracking-wide text-white md:text-7xl"
        >
          {heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="mt-4 italic text-lg text-white/90 md:text-2xl"
        >
          {heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroBanner;
