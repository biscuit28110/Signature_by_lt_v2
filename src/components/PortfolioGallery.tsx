"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import type { Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type CategoryKey = "cheveux" | "barbe" | "dreadlocks";

type ImageDescriptor = {
  src: string;
  style: string;
  couleur: string;
  isVideo?: boolean;
  title?: string;
  poster?: string;
};

const allImages: Record<CategoryKey, ImageDescriptor[]> = {
  cheveux: [
    {
      src: "/assets/realisations/realisation_1/ezczklc.jpeg",
      style: "dégradé",
      couleur: "noir",
    },
    {
      src: "/assets/realisations/realisation_1/hjbnhuygvfd.jpeg",
      style: "classique",
      couleur: "châtain",
    },
    {
      src: "/assets/realisations/realisation_1/picture-2.jpeg",
      style: "moderne",
      couleur: "brun",
    },
    {
      src: "/assets/realisations/realisation_2/imgdc.jpeg",
      style: "dégradé",
      couleur: "noir",
    },
    {
      src: "/assets/realisations/video/video_1.mp4",
      style: "rituel",
      couleur: "noir",
      isVideo: true,
      title: "Rituel Signature",
    },
    {
      src: "/assets/realisations/video/video_2.mp4",
      style: "textures",
      couleur: "noir",
      isVideo: true,
      title: "Textures & Lumière",
    },
    {
      src: "/assets/realisations/video/video_3.mp4",
      style: "atelier",
      couleur: "noir",
      isVideo: true,
      title: "Atelier Privé",
    },
    {
      src: "/assets/realisations/video/video_4.mp4",
      style: "gestuelle",
      couleur: "noir",
      isVideo: true,
      title: "Gestuelle Experte",
    },
  ],
  barbe: [
    {
      src: "/assets/realisations/realisation_2/realisation-2_1.jpeg",
      style: "courte",
      couleur: "noir",
    },
    {
      src: "/assets/realisations/realisation_3/realisation_1.jpg",
      style: "longue",
      couleur: "noir",
    },
    {
      src: "/assets/realisations/realisation_3/realisation_1_2.png",
      style: "dégradé",
      couleur: "brun",
    },
  ],
  dreadlocks: [
    {
      src: "/assets/realisations/realisation_1/ezczklc.jpeg",
      style: "twist",
      couleur: "noir",
    },
    {
      src: "/assets/realisations/realisation_2/realisation-2_1.jpeg",
      style: "crochet",
      couleur: "brun",
    },
    {
      src: "/assets/realisations/realisation_3/realisation_1_2.png",
      style: "twist",
      couleur: "noir",
    },
  ],
};

const categoryTabs = ["toutes", "cheveux", "barbe", "dreadlocks"] as const;
type CategoryTab = (typeof categoryTabs)[number];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("toutes");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = useMemo(() => Object.values(allImages).flat(), []);

  const filteredImages = useMemo(
    () =>
      activeCategory === "toutes"
        ? allItems
        : allImages[activeCategory as CategoryKey] ?? [],
    [activeCategory, allItems],
  );

  const mediaSlides = useMemo(
    () =>
      filteredImages.map((item) => ({
        src: item.src,
        isVideo: !!item.isVideo,
        title: item.title,
      })),
    [filteredImages],
  );

  return (
    <section className="bg-[#f8f9fb] min-h-screen py-24 md:py-32 px-4">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#0b2c52]/70 mb-2">Portfolio</p>
        <h1 className="text-[#0b2c52] text-4xl md:text-5xl font-semibold mb-4 font-['Playfair_Display']">
          Nos Prestations en Images
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Explorez les réalisations emblématiques de Signature by LT — des coupes aux dreadlocks, chaque
          image capture notre exigence et notre regard artistique.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-12 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm p-6 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#0b2c52] text-white shadow-md"
                  : "text-[#0b2c52] hover:bg-[#0b2c52]/10 border border-[#0b2c52]/20"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-6xl mx-auto">
        {filteredImages.map((img, index) => {
          const handleClick = () => setLightboxIndex(index);

          return (
            <motion.button
              key={`${img.src}-${index}`}
              type="button"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-md cursor-zoom-in"
              onClick={handleClick}
            >
              {img.isVideo ? (
                <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden">
                  <video
                    src={img.src}
                    muted
                    preload="metadata"
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/75 px-3 py-1 text-[10px] font-semibold uppercase text-white tracking-wide">
                    Vidéo
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold text-[#0b2c52] shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 4l10 6-10 6V4z" />
                      </svg>
                      Lire
                    </div>
                  </div>
                </div>
              ) : (
                <motion.img
                  src={img.src}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </motion.button>
          );
        })}
        {filteredImages.length === 0 && (
          <p className="col-span-full text-center text-sm text-[#0b2c52]">
            Aucun visuel ne correspond à votre sélection pour le moment.
          </p>
        )}
      </div>

      {lightboxIndex !== null && mediaSlides.length > 0 && (
        <Lightbox
          open={lightboxIndex !== null}
          index={lightboxIndex ?? 0}
          close={() => setLightboxIndex(null)}
          slides={mediaSlides as unknown as Slide[]}
          render={{
            slide: ({ slide }) => {
              const media = slide as unknown as { src: string; isVideo?: boolean };
              if (!media.isVideo) return undefined;

              return (
                <div className="flex h-full w-full items-center justify-center bg-black">
                  <video
                    src={media.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[90vh] max-w-[90vw] object-contain"
                  />
                </div>
              );
            },
          }}
          plugins={[Zoom]}
        />
      )}
    </section>
  );
}
