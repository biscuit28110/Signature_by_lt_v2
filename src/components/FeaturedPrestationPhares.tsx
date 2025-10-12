import Image from "next/image";
import React from "react";

/**
 * Section : Nos Prestations Phares
 * ----------------------------------------------------
 * - Affiche 3 prestations principales
 * - Compatible responsive
 * - Animation hover subtile
 */

const services = [
  {
    title: "Coupe Homme",
    image: "/assets/realisations/realisation_1/ezczklc.jpeg",
  },
  {
    title: "Taille de Barbe",
    image: "/assets/realisations/realisation_1/picture-2.jpeg",
  },
  {
    title: "Lissage / Défrisage",
    image: "/assets/realisations/realisation_1/hjbnhuygvfd.jpeg",
  },
];
function FeaturedPrestationPhares() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titre de section */}
        <h3 className="text-center text-3xl md:text-4xl font-cinzel-deco font-semibold text-[#1E3A5F] mb-20 tracking-wide">
          Nos Prestations Phares
        </h3>

        {/* Grille de prestations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto justify-center px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl ring-1 ring-black/5 hover:ring-2 hover:ring-[#d4af37]/40 w-full max-w-xs sm:max-w-sm mx-auto"
            >
              {/* Image optimisée Next.js */}
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={500}
                className="w-full aspect-[3/4] object-cover rounded-3xl transform transition duration-700 group-hover:scale-105"
              />

              {/* Overlay texte */}
              <div className="absolute inset-0 rounded-3xl bg-black/50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-700 ease-out p-6">
                <span className="text-white text-2xl font-cinzel-deco tracking-wide drop-shadow-lg">
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPrestationPhares