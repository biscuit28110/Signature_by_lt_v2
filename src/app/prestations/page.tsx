'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Maximize2, X } from "lucide-react";

type Category = "cheveux" | "barbe" | "dreadlocks";

interface CategoryDescriptor {
  id: Category;
  label: string;
}

interface Prestation {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  duration: string;
  price: string;
}

// Référentiel centralisé pour les catégories afin de garder les libellés cohérents.
const categories: CategoryDescriptor[] = [
  { id: "cheveux", label: "Cheveux" },
  { id: "barbe", label: "Barbe" },
  { id: "dreadlocks", label: "Dreadlocks" },
];

// Catalogue de prestations (images disponibles dans `public/assets/realisations`).
const prestations: Prestation[] = [
  {
    id: "coupe-classique",
    title: "Coupe Classique",
    description: "Élégance intemporelle pour sublimer chaque silhouette.",
    category: "cheveux",
    image: "/assets/realisations/realisation_2/realisation-2_1.jpeg",
    duration: "45 min",
    price: "45€",
  },
  {
    id: "degrade-moderne",
    title: "Dégradé Moderne",
    description: "Des lignes nettes et un fondu précis pour un look actuel.",
    category: "cheveux",
    image: "/assets/realisations/realisation_3/realisation_1_2.png",
    duration: "50 min",
    price: "55€",
  },
  {
    id: "coloration-signature",
    title: "Coloration Signature",
    description: "Nuances personnalisées et brillance sophistiquée.",
    category: "cheveux",
    image: "/assets/realisations/realisation_1/picture-2.jpeg",
    duration: "1h30",
    price: "120€",
  },
  {
    id: "taille-barbe",
    title: "Taillage Barbe Précis",
    description: "Contours impeccables et finitions rasoir pour un rendu net.",
    category: "barbe",
    image: "/assets/realisations/realisation_1/ezczklc.jpeg",
    duration: "30 min",
    price: "30€",
  },
  {
    id: "soin-barbe-deluxe",
    title: "Soin Barbe Deluxe",
    description: "Rituel chaud-froid, massage et hydratation profonde.",
    category: "barbe",
    image: "/assets/realisations/realisation_2/imgdc.jpeg",
    duration: "40 min",
    price: "45€",
  },
  {
    id: "twist-dreadlocks",
    title: "Twist & Maintenance",
    description: "Structure et définition des locks pour un rendu haute tenue.",
    category: "dreadlocks",
    image: "/assets/realisations/realisation_3/realisation_1.jpg",
    duration: "2h",
    price: "160€",
  },
  {
    id: "starter-dreadlocks",
    title: "Création de Dreadlocks",
    description: "Méthode soignée pour des locks régulières et durables.",
    category: "dreadlocks",
    image: "/assets/realisations/realisation_1/hjbnhuygvfd.jpeg",
    duration: "3h30",
    price: "280€",
  },
];

const PrestationsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("cheveux");
  const [selectedPrestation, setSelectedPrestation] = useState<Prestation | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Calcul mémoïsé des prestations filtrées pour limiter les rerenders inutiles.
  const filteredPrestations = useMemo(
    () =>
      prestations.filter(
        (prestation) => prestation.category === activeCategory,
      ),
    [activeCategory],
  );

  return (
    <main className="min-h-screen bg-[#f5f6f8] pb-24 pt-32 text-[#1E3A5F]">
      <section className="relative mx-auto flex max-w-7xl flex-col gap-14 px-6 mb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(232,233,239,0.9)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(212,175,55,0.08)_0%,_transparent_45%)] opacity-70" />
        </div>

        <header className="text-center text-[#1E3A5F]">
          <p className="mx-auto inline-block rounded-full border border-[#d9d9d9] bg-white px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#b29b52] shadow-sm">
            Prestations
          </p>
          <h1 className="mt-6 font-cinzel-deco text-4xl tracking-wide md:text-5xl text-[#1E3A5F]">
            Nos Prestations Signature
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#8c8c8c] md:text-base">
            Chaque rendez-vous est une expérience sur-mesure, pensée pour
            magnifier votre style dans un cadre élégant et feutré.
          </p>
        </header>

        <nav
          aria-label="Catégories de prestations"
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-6 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#d4af37] bg-[#1E3A5F] text-white shadow-[0_12px_20px_rgba(30,58,95,0.18)]"
                    : "border-[#d7d7d7] bg-white text-[#1E3A5F] shadow-sm hover:border-[#d4af37] hover:text-[#1E3A5F]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </nav>

          <div className="grid gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
          {filteredPrestations.map((prestation, index) => (
            <article
              key={prestation.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e3e6ee] bg-white shadow-[0_18px_45px_rgba(10,18,30,0.08)] transition-transform duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(10,18,30,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-3xl border border-[#d4af37]/30" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-transparent to-[#f7e8bd]/50" />
              </div>

              <div className="relative h-56 overflow-hidden">
                <Image
                  src={prestation.image}
                  alt={prestation.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>

              <div className="relative flex flex-1 flex-col gap-6 p-8">
                <header>
                  <h2 className="text-xl font-semibold text-[#1E3A5F] transition duration-300 group-hover:text-[#d4af37]">
                    {prestation.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#6f7a8c]">
                    {prestation.description}
                  </p>
                </header>

                <dl className="grid grid-cols-2 gap-4 text-sm text-[#1E3A5F]">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-[#a9b2c4]">
                      Durée
                    </dt>
                    <dd className="mt-1 font-semibold">{prestation.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-[#a9b2c4]">
                      Tarif
                    </dt>
                    <dd className="mt-1 font-semibold">{prestation.price}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex items-center justify-between">
                  <span className="rounded-full border border-[#d7dbe8] bg-[#f5f7fb] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#6f7a8c]">
                    {categories.find((cat) => cat.id === prestation.category)
                      ?.label || prestation.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrestation(prestation);
                        setIsZoomed(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e0e3eb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1E3A5F] shadow-inner shadow-[#d4af37]/10 transition hover:border-[#d4af37]/60 hover:text-[#1E3A5F]"
                    >
                      Voir la photo
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <Link
                      href="#reserver"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-4 py-2 text-sm font-semibold text-[#15233b] shadow-lg shadow-[#d9d9d9]/40 transition hover:scale-105 hover:shadow-[#d9d9d9]/60"
                    >
                      Réserver
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e0e4ec] bg-white/80 p-8 text-center text-sm text-[#6f7a8c] shadow-[0_16px_50px_rgba(10,18,30,0.08)] backdrop-blur">
          <h3 className="text-lg font-semibold text-[#1E3A5F]">
            Besoin d&apos;un conseil personnalisé&nbsp;?
          </h3>
          <p className="mt-3">
            Nos experts Signature by LT vous accompagnent pour dessiner la
            prestation idéale. Contactez-nous pour un diagnostic offert avant la
            prise de rendez-vous.
          </p>
          <Link
            href="tel:+33123456789"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 px-6 py-2 text-sm font-semibold text-[#1E3A5F] transition hover:bg-[#d4af37]/25"
          >
            +33 1 23 45 67 89
          </Link>
        </div>
      </section>

      {/* Modal de prévisualisation grand format (utile pour zoomer sur les réalisations). */}
      {selectedPrestation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="prestation-zoom-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
        >
          <div className="relative mx-4 w-full max-w-5xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#0b1628] to-[#091422] p-8 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setSelectedPrestation(null);
                setIsZoomed(false);
              }}
              aria-label="Fermer la prévisualisation"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#d4af37]/50 hover:bg-[#d4af37]/30"
            >
              <X className="h-5 w-5" />
            </button>

            <h3
              id="prestation-zoom-title"
              className="pr-14 text-xl font-semibold text-[#f5e6bd]"
            >
              {selectedPrestation.title}
            </h3>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/50">
              <div
                className="relative w-full"
                style={{ height: "min(70vh, 60vw)" }}
              >
                <Image
                  src={selectedPrestation.image}
                  alt={selectedPrestation.title}
                  fill
                  sizes="100vw"
                  className={`object-contain transition duration-500 ${
                    isZoomed ? "scale-125" : "scale-100"
                  }`}
                  priority
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-300">
              <p className="max-w-xl">{selectedPrestation.description}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsZoomed((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#f5e6bd]/50 bg-[#f5e6bd]/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5e6bd] transition hover:bg-[#f5e6bd]/25"
                >
                  {isZoomed ? "Ajuster" : "Zoomer"}
                  <Maximize2 className="h-4 w-4" />
                </button>
                <Link
                  href="#reserver"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-5 py-2 text-sm font-semibold text-[#15233b] shadow-lg shadow-[#d9d9d9]/40 transition hover:scale-105 hover:shadow-[#d9d9d9]/60"
                >
                  Réserver ce service
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default PrestationsPage;
