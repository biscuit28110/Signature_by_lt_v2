'use client';

import Image from "next/image";

const HeroBanner = () => {
  return (
    <section
      aria-label="Présentation du salon Signature by LT"
      className="relative flex h-[85vh] items-center justify-center overflow-hidden md:h-screen"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/banner/banner_salon.png"
          alt="Vue intérieure du salon Signature by LT"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-3xl px-4 text-center text-white md:px-8">
        <h1 className="mb-3 text-3xl font-cinzel-deco drop-shadow-lg animate-fadeIn md:text-6xl">
          Là où le Style
        </h1>
        <h1 className="mb-6 text-3xl font-cinzel-deco drop-shadow-lg animate-fadeIn md:text-6xl">
          Devient une Signature
        </h1>
        <p className="mb-8 text-base leading-relaxed text-gray-100 md:text-lg">
          Vivez l’expérience premium d’un salon parisien où chaque geste est pensé pour sublimer votre personnalité.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#reserver"
            className="inline-block rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-8 py-3 font-semibold text-[#15233b] shadow-lg shadow-[#d9d9d9]/40 transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-[#d9d9d9]/60"
          >
            Réserver maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
