'use client';

import Image from "next/image";
import { MapPin, Phone, Send, TrainFrontTunnel } from "lucide-react";
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/signature.by.lt",
    icon: FaInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@signature.by.lt",
    icon: FaTiktok,
  },
  {
    label: "Snapchat",
    href: "https://www.snapchat.com/add/signaturebylt",
    icon: FaSnapchatGhost,
  },
];

const openingHours = [
  { day: "Mardi – Vendredi", range: "10h30 – 19h30" },
  { day: "Samedi", range: "10h30 – 19h30" },
  { day: "Dimanche", range: "13h – 18h" },
];

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-[#f5f6f8] pt-28 text-[#1E3A5F]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(205,214,230,0.6)_0%,_transparent_60%)]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6">
          <header className="text-center pt-16">
            <p className="mx-auto inline-block rounded-full border border-[#d9d9d9] bg-white px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#b29b52] shadow-sm">
              Contact
            </p>
            <h1 className="mt-6 font-cinzel-deco text-4xl tracking-wide md:text-5xl">
              Parlons de votre prochaine Signature
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-[#7a8396] md:text-base">
              Une question, un projet capillaire ou simplement l’envie
              d’échanger ? Notre équipe est à votre écoute pour imaginer la
              suite avec élégance.
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold text-[#1E3A5F]">
                  Nos coordonnées
                </h2>
                <div className="mt-6 space-y-5 text-sm text-[#6f7a8c]">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-[#1E3A5F]" />
                    5 Rue Michel Peter, 75013 Paris
                  </p>
                  <p className="flex flex-wrap items-center gap-3">
                    <TrainFrontTunnel className="h-5 w-5 text-[#1E3A5F]" />
                    <span>
                      Métro{" "}
                      <strong className="font-semibold">Les Gobelins</strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <Image
                        src="/assets/icons/metro.svg"
                        alt="Logo du métro parisien"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                      <Image
                        src="/assets/icons/ligne_7.svg"
                        alt="Ligne 7"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#1E3A5F]" />
                    <a href="tel:+33764210316" className="underline-offset-4 hover:underline">
                      07 64 21 03 16
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1E3A5F]">
                  Suivez-nous
                </h3>
                <p className="mt-2 text-sm text-[#6f7a8c]">
                  Plongez dans l’univers Signature by LT au quotidien.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full border border-[#d7d7d7] bg-white px-5 py-2 text-sm font-semibold text-[#1E3A5F] shadow-sm transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
                    >
                      <social.icon className="h-5 w-5 transition group-hover:scale-125" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1E3A5F]">
                  Horaires
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#6f7a8c]">
                  {openingHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-center justify-between rounded-2xl border border-[#e3e6ee] bg-white/80 px-4 py-3 shadow-sm"
                    >
                      <span className="font-semibold text-[#1E3A5F]">
                        {item.day}
                      </span>
                      <span>{item.range}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e3e6ee] bg-white shadow-[0_20px_55px_rgba(10,18,30,0.1)]">
              <iframe
                title="Signature by LT - Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.752929812642!2d2.354768676528501!3d48.8322574713266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671cb4e6c5d21%3A0x38c7b8b3e7fa7d5a!2s5%20Rue%20Michel%20Peter%2C%2075013%20Paris!5e0!3m2!1sfr!2sfr!4v1696362194292!5m2!1sfr!2sfr"
                width="100%"
                height="460"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full rounded-3xl"
              />
            </div>
          </div>

          <section className="rounded-[40px] border border-[#e3e6ee] bg-white/90 p-10 mb-24 shadow-[0_22px_60px_rgba(10,18,30,0.1)]">
            <header className="text-center">
              <h2 className="text-3xl font-semibold text-[#1E3A5F]">
                Écrivez-nous
              </h2>
              <p className="mt-3 text-sm text-[#6f7a8c]">
                Nous répondons sous 24h ouvrées. Chaque demande reçoit un
                traitement personnalisé pour vous proposer la meilleure
                expérience.
              </p>
            </header>

            <form className="mt-10 space-y-6">
              {/* Formulaire destiné à la collecte de leads, l’intégration backend pourra suivre. */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#1E3A5F]">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Entrez votre nom"
                  className="w-full rounded-xl border border-[#d7dbe8] bg-white px-4 py-3 text-sm text-[#1E3A5F] shadow-inner transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/30"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#1E3A5F]">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Votre email professionnel"
                  className="w-full rounded-xl border border-[#d7dbe8] bg-white px-4 py-3 text-sm text-[#1E3A5F] shadow-inner transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/30"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#1E3A5F]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Parlez-nous de votre besoin…"
                  className="w-full rounded-xl border border-[#d7dbe8] bg-white px-4 py-3 text-sm text-[#1E3A5F] shadow-inner transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/30"
                />
              </div>

              <button
                type="submit"
                className="group mx-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f1e2b1] via-[#d4af37] to-[#b48a1e] px-8 py-3 text-sm font-semibold text-[#1E2A3F] shadow-lg shadow-[#d4af37]/40 transition hover:scale-105 hover:shadow-[#d4af37]/60"
              >
                Envoyer
                <Send className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
