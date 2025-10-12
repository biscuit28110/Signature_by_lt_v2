import React from "react";

export default function FeaturedPrestationDiscover() {
  return (
    <section className="py-20 bg-[#184370]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Texte à gauche */}
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4">Signature by LT</h2>
          <p className="italic text-lg mb-4">« Là où le Style Devient une Signature »</p>
          <div className="w-16 h-[2px] bg-gray-300 mb-6"></div>
          <p className="text-gray-200 mb-8">
            Un espace où <span className="font-semibold">excellence</span>,{" "}
            <span className="font-semibold">élégance</span> et{" "}
            <span className="font-semibold">raffinement</span> définissent chaque prestation.
          </p>
          <a
            href="#services"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6] rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            Découvrir nos prestations →
          </a>
        </div>

        {/* Vidéo à droite */}
        <div className="flex justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/banner/banner_salon.png"
            className="rounded-2xl shadow-lg object-cover w-[350px] h-[500px]"
          >
            <source src="/assets/media/salon.webm" type="video/webm" />
            <source src="/assets/media/salon.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      </div>
    </section>
  );
}
