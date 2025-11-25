"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/assets/realisations/realisation_1/ezczklc.jpeg",
    alt: "Fauteuils Signature by LT prêts à accueillir un client",
    basePosition: 40,
  },
  {
    src: "/assets/realisations/realisation_1/hjbnhuygvfd.jpeg",
    alt: "Plan rapproché sur les outils professionnels utilisés dans le salon",
    basePosition: 50,
  },
  {
    src: "/assets/realisations/realisation_1/picture-2.jpeg",
    alt: "Ambiance intérieure chaleureuse du salon Signature by LT",
    basePosition: 60,
  },
];

export default function FeaturedPrestationDiscover() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2c52] via-[#102c4a] to-[#0b2c52] py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,#ffffff33,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 text-white md:grid-cols-2">
        {/* Texte à gauche */}
        <motion.div
          className="text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Signature by LT</h2>
          <p className="mb-4 italic text-lg text-white/90">
            « Là où le Style Devient une Signature »
          </p>
          <div className="mb-6 h-[2px] w-16 bg-white/40" />
          <p className="mb-8 text-white/80">
            Un espace où <span className="font-semibold text-white">excellence</span>,{" "}
            <span className="font-semibold text-white">élégance</span> et{" "}
            <span className="font-semibold text-white">raffinement</span> définissent chaque
            prestation.
          </p>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-lg bg-gradient-to-r from-[#f5d07d] to-[#dca752] px-6 py-3 font-semibold text-[#0b2c52] shadow-lg shadow-black/20 transition"
          >
            Découvrir nos prestations →
          </motion.a>
        </motion.div>

        {/* Carrousel à droite */}
        <motion.div
          className="relative flex h-[520px] w-full max-w-[450px] items-center justify-center overflow-hidden border border-white/20 bg-[#10274a] md:justify-self-end"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-live="polite"
          aria-label="Galerie d'images Signature by LT"
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                style={{ objectPosition: `${slide.basePosition}% center` }}
                sizes="(max-width: 768px) 100vw, 450px"
                priority={index === 0}
              />
            </div>
          ))}

          <div className="absolute bottom-4 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={`slide-dot-${index}`}
                type="button"
                onClick={() => handleManualSelect(index)}
                aria-label={`Afficher l'image ${index + 1}`}
                className={`h-2.5 w-8 rounded-full transition ${
                  index === activeIndex ? "bg-white/90" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
