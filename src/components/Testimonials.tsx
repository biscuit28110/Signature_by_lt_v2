'use client';

import { useEffect, useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

interface Testimonial {
  name: string;
  subtitle: string;
  message: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mélissa K.",
    subtitle: "Coloration Signature",
    message:
      "Chaque détail est orchestré avec soin. Je suis repartie rayonnante, avec la sensation d’un service sur-mesure.",
    rating: 5,
    initials: "MK",
  },
  {
    name: "Sofiane L.",
    subtitle: "Expérience Premium",
    message:
      "Accueil chaleureux, gestes précis et ambiance feutrée. Un vrai cocon luxueux où l’on s’abandonne en confiance.",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Clara D.",
    subtitle: "Brushing Haute Brillance",
    message:
      "Le résultat est impeccable et durable. On sent la maîtrise et la passion du métier à chaque minute.",
    rating: 5,
    initials: "CD",
  },
  {
    name: "Yassine R.",
    subtitle: "Coupe Tailor-Made",
    message:
      "Un accompagnement personnalisé du diagnostic jusqu’au coiffage. Je me sens valorisé à chaque visite.",
    rating: 5,
    initials: "YR",
  },
  {
    name: "Nadia S.",
    subtitle: "Soin Profond",
    message:
      "Une parenthèse de détente absolue. Mes cheveux n’ont jamais été aussi doux et lumineux.",
    rating: 5,
    initials: "NS",
  },
  {
    name: "Karim B.",
    subtitle: "Rasage Artisanal",
    message:
      "Alliance parfaite entre tradition et modernité. Le geste est précis, l’expérience, exceptionnelle.",
    rating: 5,
    initials: "KB",
  },
  {
    name: "Lina M.",
    subtitle: "Coiffure Événementielle",
    message:
      "Ils ont sublimé ma tenue de soirée. Le rendu est sophistiqué, sans aucun compromis sur la tenue.",
    rating: 5,
    initials: "LM",
  },
];

const GROUP_SIZE = 3;
const AUTO_ROTATE_DELAY = 8000;

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const totalGroups = Math.ceil(testimonials.length / GROUP_SIZE);
  const activeGroup = Math.floor(startIndex / GROUP_SIZE);

  const visibleTestimonials = useMemo(
    () =>
      Array.from(
        { length: Math.min(GROUP_SIZE, testimonials.length) },
        (_, itemIndex) =>
          testimonials[
            (startIndex + itemIndex) % testimonials.length
          ],
      ),
    [startIndex],
  );

  const goToGroup = (groupIndex: number) => {
    const normalizedGroup =
      ((groupIndex % totalGroups) + totalGroups) % totalGroups;
    setStartIndex(normalizedGroup * GROUP_SIZE);
  };

  const showPrevious = () => {
    goToGroup(activeGroup - 1);
  };

  const showNext = () => {
    goToGroup(activeGroup + 1);
  };

  useEffect(() => {
    if (typeof window === "undefined" || totalGroups <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setStartIndex((prevIndex) => {
        if (totalGroups <= 1) {
          return 0;
        }
        const nextGroup =
          (Math.floor(prevIndex / GROUP_SIZE) + 1) % totalGroups;
        return nextGroup * GROUP_SIZE;
      });
    }, AUTO_ROTATE_DELAY);

    return () => window.clearInterval(timer);
  }, [totalGroups]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#102544] via-[#0c1d35] to-[#091427] py-24 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f3f6d_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#0a1730_0%,transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="text-center">
          <p className="inline-block rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] uppercase text-[#f5e6bd]">
            Avis Signature
          </p>
          <h2 className="mt-6 text-3xl font-cinzel-deco tracking-wide md:text-4xl lg:text-5xl">
            Ils parlent de l&apos;Expérience
          </h2>
          <p className="mt-4 text-sm text-gray-300 md:text-base">
            Des témoignages authentiques qui illustrent l&apos;exigence et le raffinement de Signature by LT.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#d4af37]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <Quote className="mb-6 h-10 w-10 text-[#d4af37]/70" />

                <p className="text-sm text-gray-200 md:text-base">
                  {testimonial.message}
                </p>
              </div>

              <div className="relative mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/60 bg-gradient-to-br from-white/10 to-[#d4af37]/30 text-sm font-semibold text-white shadow-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f5e6bd]/80">
                    {testimonial.subtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[#f0d78c]">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalGroups > 1 && (
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Voir les avis précédents"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white/5 text-[#f5e6bd] transition hover:border-[#f5e6bd]/80 hover:bg-[#f5e6bd]/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Voir les avis suivants"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white/5 text-[#f5e6bd] transition hover:border-[#f5e6bd]/80 hover:bg-[#f5e6bd]/10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="flex gap-3">
              {Array.from({ length: totalGroups }).map((_, indicatorIndex) => (
                <button
                  key={indicatorIndex}
                  type="button"
                  onClick={() => goToGroup(indicatorIndex)}
                  aria-label={`Groupe d'avis ${indicatorIndex + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    indicatorIndex === activeGroup
                      ? "w-8 bg-[#f0d78c]"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
