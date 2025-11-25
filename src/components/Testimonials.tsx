'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
  photo: string | null;
  source: string;
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Réponse invalide de /api/reviews");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des avis :", err);
        setError("Impossible de charger les avis pour le moment.");
        setReviews([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [reviews]);

  const getReviewByOffset = (offset: number) => {
    if (reviews.length === 0) return undefined;
    const normalizedIndex = (index + offset + reviews.length) % reviews.length;
    return reviews[normalizedIndex];
  };
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / reviews.length).toFixed(1)
      : "5.0";
  const stats = [
    { label: "Note moyenne", value: `${averageRating}/5` },
    { label: "Avis clients", value: reviews.length.toString() },
    { label: "Années d’expertise", value: "12+" },
  ];
  const cardVariants = {
    initial: (offset: number) => ({
      opacity: 0,
      x: offset * 220,
      scale: offset === 0 ? 0.85 : 0.75,
      rotateY: offset * -15,
    }),
    animate: (offset: number) => ({
      opacity: 1,
      x: offset === 0 ? 0 : offset * 120,
      scale: offset === 0 ? 1 : 0.92,
      rotateY: 0,
    }),
    exit: (offset: number) => ({
      opacity: 0,
      x: offset * -220,
      scale: 0.8,
      rotateY: offset * 15,
      transition: { duration: 0.35, ease: "easeInOut" },
    }),
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-gradient-to-b from-[#0b2c52] via-[#102c4a] to-[#f7f7f4] py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,#ffffff33,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.07]" />
      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center text-center text-white">
        <div className="mb-10 md:mb-12 flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm uppercase tracking-[0.2em]"
          >
            <span className="h-2 w-2 rounded-full bg-[#f5d07d]" />
            Avis clients
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif uppercase tracking-wider"
          >
            Découvrez l’expérience Signature by LT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed"
          >
            Un carrousel d’avis authentiques, un écrin lumineux et des détails dorés pour refléter notre univers haut de gamme.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#0b2c52]/30 border-t-[#0b2c52]" />
            <p className="mt-4 text-sm text-gray-500">Chargement des avis...</p>
          </div>
        ) : error ? (
          <p className="text-center text-gray-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-white/80">Aucun avis n&apos;est disponible pour le moment.</p>
        ) : (
          <>
            <div className="relative w-full max-w-5xl mx-auto">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-20">
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  className="h-12 w-12 rounded-full bg-white/20 backdrop-blur border border-white/40 text-white flex items-center justify-center hover:bg-white/40 transition"
                  aria-label="Avis précédent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                    <path fill="currentColor" d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev + 1) % reviews.length)}
                  className="h-12 w-12 rounded-full bg-white/20 backdrop-blur border border-white/40 text-white flex items-center justify-center hover:bg-white/40 transition"
                  aria-label="Avis suivant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                    <path fill="currentColor" d="m9 6 6 6-6 6-1.41-1.41L12.17 12 7.59 7.41z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <AnimatePresence initial={false}>
                  {[-1, 0, 1].map((offset) => {
                    const review = getReviewByOffset(offset);
                    if (!review) return null;
                    const isActive = offset === 0;
                    const normalizedIndex = (index + offset + reviews.length) % reviews.length;
                    return (
                      <motion.article
                        key={`testimonial-card-${normalizedIndex}-${offset}`}
                        variants={cardVariants}
                        custom={offset}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.7 }}
                        style={{ transformStyle: "preserve-3d" }}
                        className={`relative ${
                          isActive
                            ? "basis-1/2 max-w-md scale-105"
                            : "hidden md:block basis-1/4 max-w-sm scale-95 opacity-60 blur-[1px]"
                        }`}
                      >
                        <div
                          className={`relative rounded-[32px] px-6 py-8 ${
                            isActive
                              ? "bg-white/80 text-[#0b2c52] backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_rgba(9,32,65,0.25)]"
                              : "bg-white/40 text-[#0b2c52] backdrop-blur-md border border-white/30 shadow-[0_10px_30px_rgba(9,32,65,0.2)]"
                          } overflow-hidden`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-[#f5d07d]/40 text-[180px] font-serif pointer-events-none leading-none">
                            &ldquo;
                          </div>
                          <div className="relative flex flex-col items-center text-center gap-3">
                            {review.photo ? (
                              <img
                                src={review.photo}
                                alt={review.author}
                                className={`h-16 w-16 rounded-full object-cover border-2 ${
                                  isActive ? "border-[#0b2c52]/40" : "border-white/40"
                                }`}
                              />
                            ) : (
                              <div
                                className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-semibold ${
                                  isActive ? "bg-[#0b2c52] text-white" : "bg-[#10315c] text-white/70"
                                }`}
                              >
                                {(review.author?.charAt(0) ?? "?").toUpperCase()}
                              </div>
                            )}
                            <h4 className="font-semibold text-lg">{review.author}</h4>
                            <div className="flex justify-center gap-1">
                              {Array.from({ length: Math.max(0, Math.round(review.rating ?? 0)) }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#f5c56a"
                                  viewBox="0 0 24 24"
                                  className="w-4 h-4"
                                >
                                  <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847 1.417 8.262L12 18.896l-7.417 4.8L6 15.434 0 9.587l8.332-1.569z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm leading-relaxed text-[#0b2c52]/80 line-clamp-5">
                              “{review.text}”
                            </p>
                            <p className="text-xs text-[#0b2c52]/60">{review.date}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0b2c52]/50">
                              Avis vérifiés sur Google
                            </p>
                          </div>
                        </div>
                        <div className="absolute -top-5 -right-5 h-16 w-16 rounded-full bg-gradient-to-br from-white/60 to-transparent border border-white/70 shadow-lg pointer-events-none" />
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={`testimonial-dot-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-12 w-12 rounded-full border-2 transition-all duration-300 overflow-hidden ${
                    i === index ? "border-[#f5d07d] scale-110" : "border-white/30 opacity-70"
                  }`}
                  aria-label={`Afficher l'avis ${i + 1}`}
                >
                  {reviews[i]?.photo ? (
                    <img src={reviews[i]?.photo ?? ""} alt={reviews[i]?.author} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-semibold">
                      {(reviews[i]?.author?.charAt(0) ?? "?").toUpperCase()}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 grid w-full grid-cols-1 gap-4 text-[#0b2c52] md:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/50 bg-white/80 px-8 py-6 text-center shadow-[0_15px_35px_rgba(9,32,65,0.12)]"
                >
                  <p className="text-3xl font-semibold text-[#0b2c52]">{stat.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#0b2c52]/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              href="https://www.google.com/maps/place/?q=place_id:ChIJd9MLeRVx5kcRWoIpyQqp6oY"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0b2c52] text-white rounded-full px-8 py-3 hover:bg-[#092041] transition-all duration-300 block mx-auto text-center w-fit shadow-md hover:shadow-lg mt-12 md:mt-16"
            >
              Voir tous les avis sur Google
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              href="https://www.google.com/maps/place/?q=place_id:ChIJd9MLeRVx5kcRWoIpyQqp6oY"
              target="_blank"
              rel="noreferrer"
              className="text-[#0b2c52] bg-white/90 rounded-full px-8 py-3 hover:bg-white transition-all duration-300 block mx-auto text-center w-fit shadow-md hover:shadow-lg mt-6"
            >
              Laisser un avis
            </motion.a>
          </>
        )}
      </div>
    </motion.section>
  );
}
