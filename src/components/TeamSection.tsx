'use client';

import Image from "next/image";
import { motion } from "framer-motion";

type Barber = {
  name: string;
  location: string;
  image: string;
};

const team: Barber[] = [
  {
    name: "DOMINIQUE",
    location: "Signature by LT",
    image: "/assets/realisations/realisation_1/ezczklc.jpeg",
  },
  {
    name: "BIENVENUE",
    location: "Signature by LT",
    image: "/assets/realisations/realisation_3/realisation_1.jpg",
  },
  {
    name: "DOGA",
    location: "Signature by LT",
    image: "/assets/realisations/realisation_2/realisation-2_1.jpeg",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 40, rotateX: -15, rotateY: -5, scale: 0.92 },
  animate: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
};

const TeamSection = () => {
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-white py-24 text-[#111111]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mx-auto mb-12 max-w-xl text-center">
          <h2
            id="team-heading"
            className="font-['Playfair_Display','Cormorant_Garamond',serif] text-3xl uppercase tracking-[0.2em] text-[#111111]"
          >
            Nos Coiffeurs & Barbiers
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-[#d5d5d5]" />
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group cursor-pointer text-center transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-[360px] overflow-hidden bg-[#f5f5f5]">
                <Image
                  src={member.image}
                  alt={`Portrait de ${member.name}, expert Signature by LT`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-['Playfair_Display','Cormorant_Garamond',serif] text-lg uppercase tracking-[0.08em] text-[#111111]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#15233b]">Expert Coiffeur et Barbier</p>
                <div className="mx-auto h-px w-12 bg-[#184370]" />
                <p className="font-['Inter','Helvetica',sans-serif] text-sm italic text-[#6f7684]">
                  {member.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
