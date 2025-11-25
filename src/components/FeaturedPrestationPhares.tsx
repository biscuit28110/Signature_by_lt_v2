"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  PLANITY_DEFAULT_CURRENCY,
  planityFallbackCategories,
  type PlanityPricingCategory,
} from "@/lib/planity";

const TOP_CATEGORY_KEYS = ["cheveux", "dreadlocks"];

type PlanityResponse = {
  categories: PlanityPricingCategory[];
  source?: "planity" | "fallback";
};

type SignatureVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
  category: "Coupe" | "Dreadlocks" | "Barbe";
};

const SIGNATURE_VIDEOS: SignatureVideo[] = [
  {
    id: "video-1",
    title: "RITUEL SIGNATURE",
    description: "Immersion instantanée dans l'univers Signature by LT, captée comme si vous étiez en cabine.",
    src: "/assets/realisations/video/video_1.mp4",
    category: "Coupe",
  },
  {
    id: "video-2",
    title: "TEXTURES & LUMIÈRE",
    description: "Jeu de textures, brillance et gestes précis qui révèlent la matière et la silhouette.",
    src: "/assets/realisations/video/video_2.mp4",
    category: "Dreadlocks",
  },
  {
    id: "video-3",
    title: "ATELIER PRIVÉ",
    description: "Une parenthèse boutique, intimiste et raffinée, où chaque détail est orchestré pour vous.",
    src: "/assets/realisations/video/video_3.mp4",
    category: "Barbe",
  },
  {
    id: "video-4",
    title: "GESTUELLE EXPERTE",
    description: "Un focus sur la précision du geste et la lumière qui met en valeur chaque matière.",
    src: "/assets/realisations/video/video_4.mp4",
    category: "Coupe",
  },
];

const formatPrice = (price: number | null, currency = PLANITY_DEFAULT_CURRENCY) => {
  if (typeof price !== "number") {
    return "Sur devis";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
};

function SignatureVideoCard({ video, index, isActive }: { video: SignatureVideo; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { amount: 0.55, margin: "0px 0px -12% 0px" });
  const [playMode, setPlayMode] = useState<"auto" | "userPlay" | "userPause">("auto");
  const autoEligible = isActive;
  const shouldPlay = playMode === "userPlay" || (playMode === "auto" && autoEligible);

  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    if (shouldPlay && isInView) {
      const playPromise = player.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => undefined);
      }
    } else {
      player.pause();
    }
  }, [isInView, shouldPlay]);

  const togglePlay = () => {
    setPlayMode(() => {
      if (shouldPlay) return "userPause";
      return "userPlay";
    });
  };

  const isActuallyPlaying = shouldPlay && isInView;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex h-full flex-col gap-4"
    >
      <div className="relative aspect-[9/16] min-h-[520px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-lg shadow-black/5">
        <video
          ref={videoRef}
          src={video.src}
          preload="metadata"
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        <button
          type="button"
          onClick={togglePlay}
          aria-pressed={isActuallyPlaying}
          aria-label={isActuallyPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-[#0b2c52] shadow-md backdrop-blur transition hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dcb47d]"
        >
          {!isActuallyPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 4.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V4.75zM12.5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-center text-[#0c1f3b]">
        <h3 className="font-['Playfair_Display'] text-base font-semibold uppercase tracking-[0.18em] md:text-lg">
          {video.title}
        </h3>
        <div className="mt-2 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[#0b2c52]/20 bg-[#0b2c52]/5 px-3 py-1 text-xs font-medium text-[#0b2c52]">
            {video.category}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#11274a]/80 md:text-base">{video.description}</p>
      </div>
    </motion.article>
  );
}

function SignaturesMaisonSection() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, SIGNATURE_VIDEOS.length - slidesPerView);
  const translateX = (activeIndex * 100) / slidesPerView;

  useEffect(() => {
    const computeSlides = () => (window.innerWidth >= 1024 ? 3 : 1);
    const handleResize = () => setSlidesPerView(computeSlides());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goToPrevious = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goToNext = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section
      id="signatures-maison"
      className="relative isolate overflow-hidden bg-white py-20 text-[#0c1f3b] md:py-28"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#0b2c52]/70">Signatures Maison</p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 font-['Playfair_Display','Cormorant_Garamond',serif] text-3xl font-semibold uppercase tracking-[0.12em] md:text-4xl"
          >
            Expériences en mouvement
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-base leading-relaxed text-[#11274a]/80 md:text-lg"
          >
            Une série de vidéos maison : fond blanc, focus sur le geste, et une navigation fluide pour faire défiler
            nos réalisations avec les flèches.
          </motion.p>
        </div>

        <div className="relative mt-12 px-10 md:px-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${translateX}%)` }}
            >
              {SIGNATURE_VIDEOS.map((video, index) => {
                const isVisible = index >= activeIndex && index < activeIndex + slidesPerView;
                const width = 100 / slidesPerView;

                return (
                  <div
                    key={video.id}
                    style={{ minWidth: `${width}%`, maxWidth: `${width}%` }}
                    className="box-border px-5 md:px-6"
                  >
                    <SignatureVideoCard video={video} index={index} isActive={isVisible} />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Vidéo précédente"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-[#0b2c52]/25 bg-white p-3 text-[#0b2c52] shadow-lg shadow-black/10 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dcb47d] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 md:left-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            disabled={activeIndex === maxIndex}
            aria-label="Vidéo suivante"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[#0b2c52]/25 bg-white p-3 text-[#0b2c52] shadow-lg shadow-black/10 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dcb47d] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 md:right-0"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {SIGNATURE_VIDEOS.map((video, index) => {
            const isActive = index >= activeIndex && index < activeIndex + slidesPerView;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Aller à ${video.title}`}
                className={`h-2.5 rounded-full transition-all ${isActive ? "w-8 bg-[#0b2c52]" : "w-2.5 bg-[#0b2c52]/25 hover:bg-[#0b2c52]/50"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FeaturedPrestationPhares() {
  const [categories, setCategories] = useState<PlanityPricingCategory[]>(planityFallbackCategories);
  const [source, setSource] = useState<"planity" | "fallback">("fallback");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadPlanityServices = async () => {
      try {
        const response = await fetch("/api/planity-services", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Planity non disponible");
        }

        const data: PlanityResponse = await response.json();
        if (!isMounted) return;

        if (Array.isArray(data?.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }

        const dataSource = data?.source === "planity" ? "planity" : "fallback";
        setSource(dataSource);
        setErrorMessage(dataSource === "planity" ? null : "Affichage de notre catalogue de référence.");
      } catch {
        if (!controller.signal.aborted && isMounted) {
          setCategories(planityFallbackCategories);
          setSource("fallback");
          setErrorMessage(
            "Mise à jour en ligne momentanément indisponible. Les montants affichés sont indicatifs.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPlanityServices();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const totalServices = useMemo(
    () => categories.reduce((acc, category) => acc + category.services.length, 0),
    [categories],
  );

  const { topCategories, bottomCategories } = useMemo(() => {
    const normalize = (value: string) => value.trim().toLowerCase();

    const top = TOP_CATEGORY_KEYS
      .map((key) => categories.find((category) => normalize(category.title) === key))
      .filter(Boolean) as PlanityPricingCategory[];

    const bottom = categories.filter(
      (category) => !TOP_CATEGORY_KEYS.includes(normalize(category.title)),
    );

    return { topCategories: top, bottomCategories: bottom };
  }, [categories]);

  return (
    <>
      <SignaturesMaisonSection />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b2c52] via-[#0f2f54] to-[#0b2c52] py-24 md:py-32 font-['Inter',sans-serif] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25)_0%,_transparent_55%)] opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(10,22,40,0.8)_0%,_transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-['Playfair_Display','Cormorant_Garamond',serif] text-4xl md:text-5xl font-semibold uppercase tracking-[0.08em] mb-6"
          >
            Nos Tarifs &amp; Prestations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white/80 text-base md:text-xl leading-relaxed mb-8"
          >
            Découvrez nos prestations et nos tarifs actualisés, soigneusement regroupés par catégorie pour
            faciliter votre choix.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <div className="inline-flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${source === "planity" ? "bg-[#8ef4ff]" : "bg-[#ffd15c]"}`}
                aria-hidden="true"
              />
              {source === "planity" ? "Tarifs en ligne" : "Catalogue Signature by LT"}
            </div>
            <span aria-live="polite">{totalServices} prestations listées</span>
          </div>

          {errorMessage && (
            <p className="mt-4 text-xs uppercase tracking-widest text-white/70">{errorMessage}</p>
          )}
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 rounded-[32px] border border-white/15 bg-white/5 p-6 md:p-10 shadow-[0_30px_80px_rgba(2,9,22,0.6)] backdrop-blur-2xl"
        >
          {isLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-center text-sm text-white/80"
              aria-live="polite"
            >
              Synchronisation avec Planity en cours…
            </motion.p>
          )}

          {topCategories.length > 0 && (
            <div
              className="tarifs-grid grid grid-cols-1 gap-6 md:grid-cols-2"
              role="list"
              aria-label="Catégories prioritaires synchronisées depuis Planity"
            >
              {topCategories.map((category, index) => (
                <motion.article
                  key={category.title}
                  role="listitem"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/15 to-white/5 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Catégorie</p>
                    <h3 className="mt-2 text-center font-['Playfair_Display'] text-2xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <div className="mt-3 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#f5d07d] to-[#d6a954] mx-auto" />
                  </div>

                  <div className="space-y-3 overflow-hidden">
                    {category.services.map((service) => (
                      <div
                        key={`${category.title}-${service.name}`}
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm md:text-base transition focus-within:border-white/30 hover:border-white/30"
                      >
                        <span className="pr-3 text-white/85 group-hover:text-white">{service.name}</span>
                        <span className="font-semibold text-white">
                          {formatPrice(service.price, service.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {bottomCategories.length > 0 && (
            <div
              className="tarifs-grid mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label="Autres catégories synchronisées depuis Planity"
            >
              {bottomCategories.map((category, index) => (
                <motion.article
                  key={category.title}
                  role="listitem"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/15 to-white/5 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Catégorie</p>
                    <h3 className="mt-2 text-center font-['Playfair_Display'] text-2xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <div className="mt-3 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#f5d07d] to-[#d6a954] mx-auto" />
                  </div>

                  <div className="space-y-3 overflow-hidden">
                    {category.services.map((service) => (
                      <div
                        key={`${category.title}-${service.name}`}
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm md:text-base transition focus-within:border-white/30 hover:border-white/30"
                      >
                        <span className="pr-3 text-white/85 group-hover:text-white">{service.name}</span>
                        <span className="font-semibold text-white">
                          {formatPrice(service.price, service.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
}
