'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Scissors, Sparkles } from "lucide-react";

type Slide =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      id: string;
      kind: "video";
      src: string;
      poster: string;
      alt: string;
    };

const slides: Slide[] = [
  {
    id: "salon-exterieur",
    kind: "image",
    src: "/assets/realisations/realisation_3/realisation_1.jpg",
    alt: "Vue extérieure du salon Signature by LT",
  },
  {
    id: "ambiance-interieure",
    kind: "image",
    src: "/assets/realisations/realisation_1/picture-2.jpeg",
    alt: "Ambiance intérieure et fauteuils du salon",
  },
  {
    id: "video-atmosphere",
    kind: "video",
    src: "/assets/media/salon.mp4",
    poster: "/assets/banner/banner_salon.png",
    alt: "Vidéo immersive de l'atmosphère du salon",
  },
];

const artisans = [
  {
    id: "bienvenu",
    name: "Bienvenu",
    role: "Directeur Artistique & Maître Barbier",
    image: "/assets/realisations/realisation_1/ezczklc.jpeg",
  },
  {
    id: "gildas",
    name: "Gildas",
    role: "Spécialiste Coloration & Dreadlocks",
    image: "/assets/realisations/realisation_3/realisation_1_2.png",
  },
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const totalSlides = slides.length;
  const indicatorItems = useMemo(
    () => Array.from({ length: totalSlides }),
    [totalSlides],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % totalSlides);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c1a2b] via-[#10243a] to-[#091422] pb-24 pt-28 text-[#e5eaf5]">
      <section className="relative overflow-hidden mb-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,58,95,0.45)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(241,226,177,0.18)_0%,_transparent_60%)]" />

        <div className="relative mx-auto flex max-w-5xl flex-col gap-16 px-6">
          <header className="text-center pt-16 text-white">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#f3dca0]">
              À propos
            </p>
            <h1 className="mt-6 font-cinzel-deco text-4xl tracking-wide md:text-5xl">
              Signature by LT
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/80 md:text-base">
              Une maison parisienne où l&apos;élégance s&apos;exprime dans chaque
              détail, du diagnostic morphologique à la touche finale qui signe
              votre style.
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch mb-12">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/15 bg-white/5 p-8 text-white shadow-[0_22px_70px_rgba(10,18,30,0.35)] backdrop-blur md:p-10 lg:min-h-[480px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14)_0%,_transparent_65%)]" />

              <div className="relative space-y-6">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f1e2b1]">
                  <Sparkles className="h-4 w-4" />
                  Notre histoire
                </span>
                <h2 className="text-3xl font-semibold">
                  Là où le style devient une signature
                </h2>
                <p className="italic text-[#f1e2b1]/90">
                  « Un geste sûr, une atmosphère feutrée, et l&apos;art de
                  révéler votre aura. »
                </p>
                <p className="text-sm leading-relaxed text-white/85">
                  Niché au cœur du 13e arrondissement, Signature by LT est né de
                  la vision de Bienvenu, maître barbier passionné. Après plus de
                  dix ans passés à perfectionner ses techniques de coupe,
                  coloration et soins, il imagine un écrin où chaque visiteur
                  reçoit une attention sur-mesure.
                </p>
                <p className="text-sm leading-relaxed text-white/85">
                  L&apos;expérience repose sur une méthodologie précise : analyse
                  de la structure, sélection des matières, gestuelles expertes,
                  et conseils personnalisés pour prolonger l&apos;éclat à la
                  maison. Chaque rendez-vous devient une parenthèse raffinée où
                  l&apos;on se sent accueilli, guidé et sublimé.
                </p>
                <p className="text-sm leading-relaxed text-white/85">
                  Signature by LT, c&apos;est le salon de confiance des
                  esthètes modernes qui souhaitent affirmer leur style avec
                  élégance, justesse et caractère.
                </p>
              </div>
            </article>

            <section className="flex h-full flex-col gap-6 lg:min-h-[480px]">
              <div className="relative flex-1 min-h-[320px] overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_22px_70px_rgba(10,18,30,0.25)] backdrop-blur md:min-h-[360px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)]" />

                {activeSlide.kind === "image" ? (
                  <Image
                    key={activeSlide.id}
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    className="object-cover transition duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority={activeSlide.id === slides[0].id}
                  />
                ) : (
                  <video
                    key={activeSlide.id}
                    src={activeSlide.src}
                    poster={activeSlide.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                {indicatorItems.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Afficher la diapositive ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-10 bg-[#f1e2b1]"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-2" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 text-white">
          <header className="text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#f1e2b1]">
              Notre équipe
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-white md:text-4xl">
              Les artisans de votre style
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#c5ccd9] md:text-base">
              Une équipe complémentaire unie par le souci du détail, la maîtrise
              des matières et un sens poussé du service.
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-2">
            {artisans.map((artisan) => (
              <article
                key={artisan.id}
                className="group relative overflow-hidden rounded-[30px] border border-white/15 bg-[#102f4f]/90 shadow-[0_24px_60px_rgba(8,14,24,0.35)] transition-transform duration-500 hover:-translate-y-3 hover:shadow-[0_28px_80px_rgba(8,14,24,0.45)]"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={artisan.id === artisans[0].id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/80 via-transparent to-transparent" />
                </div>

                <div className="relative px-8 pb-10 pt-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#f1e2b1]/40 bg-[#f1e2b1]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#f1e2b1]">
                    <Scissors className="h-4 w-4" />
                    Expertise
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {artisan.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#c5ccd9]">{artisan.role}</p>
                  <p className="mt-4 text-sm text-[#c5ccd9]">
                    Passionné par les textures et l&apos;élégance, {artisan.name}{" "}
                    imagine des transformations durables, adaptées à votre
                    morphologie et à votre rythme de vie.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,58,95,0.18)_0%,_transparent_70%)]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-[28px] border border-[#f1e2b1]/25 bg-[#0f2744]/85 px-6 py-12 text-center text-white shadow-[0_26px_70px_rgba(8,14,24,0.4)] sm:px-8 sm:py-14 sm:rounded-[32px] md:px-10 md:py-16 md:gap-8">
          <p className="text-base italic text-[#d7dfee] md:text-lg">
            Prêt à vivre l&apos;expérience Signature by LT ?
          </p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            Réservez votre moment privilégié avec nos experts
          </h2>
          <p className="max-w-2xl text-sm text-[#c5ccd9] sm:text-base">
            Un diagnostic personnalisé, des gestes maîtrisés et une attention
            portée à chaque détail. Cliquez ci-dessous pour sécuriser votre
            prochain rendez-vous.
          </p>
          <a
            href="/reservation"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-6 py-2.5 text-sm font-semibold text-[#15233b] shadow-lg shadow-[#d9d9d9]/40 transition hover:scale-105 hover:shadow-[#d9d9d9]/60 sm:px-8 sm:py-3"
          >
            Réserver maintenant
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
