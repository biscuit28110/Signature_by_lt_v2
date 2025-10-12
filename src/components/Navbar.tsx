"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoNavbar from "./Images";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Détection du scroll pour ajouter un léger voile.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-[#184370]/80 backdrop-blur-sm shadow-md" : "bg-[#184370]"
      }`}
    >
      <div className="mx-auto flex h-24 w-full max-w-6xl items-center px-6 md:h-28 md:px-8 lg:px-12">
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="inline-flex items-center"
          >
            <LogoNavbar />
          </Link>
        </div>

        {/* Navigation principale (affichée à partir du desktop) */}
        <div className="hidden flex-1 justify-center lg:flex">
          <nav className="flex items-center gap-12 text-sm font-semibold text-white xl:gap-16 xl:text-base">
            <Link
              href="/"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#d9d9d9] after:transition-all after:duration-300 hover:after:w-full"
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="relative whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#d9d9d9] after:transition-all after:duration-300 hover:after:w-full"
            >
              À propos
            </Link>
            <Link
              href="/prestations"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#d9d9d9] after:transition-all after:duration-300 hover:after:w-full"
            >
              Prestations
            </Link>
            <Link
              href="/contact"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#d9d9d9] after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bouton Réserver */}
        <div className="hidden flex-1 justify-end lg:flex">
          <Link
            href="/reservation"
            className="rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-6 py-2.5 text-sm font-semibold text-[#15233b] shadow-md shadow-[#d9d9d9]/40 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[#d9d9d9]/60 lg:px-8 lg:py-3 lg:text-base"
          >
            Réserver
          </Link>
        </div>

        {/* Bouton burger (mobile) */}
        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden animate-fadeIn space-y-6 bg-[#184370]/95 py-8 text-center text-white backdrop-blur-sm"
        >
          <Link
            href="/#accueil"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium transition hover:text-gray-300"
          >
            Accueil
          </Link>
          <hr className="mx-auto w-2/3 border-t border-gray-300/40" />
          <Link
            href="/prestations"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium transition hover:text-gray-300"
          >
            Prestations
          </Link>
          <hr className="mx-auto w-2/3 border-t border-gray-300/40" />
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium transition hover:text-gray-300"
          >
            À propos
          </Link>
          <hr className="mx-auto w-2/3 border-t border-gray-300/40" />
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium transition hover:text-gray-300"
          >
            Contact
          </Link>
          <hr className="mx-auto w-2/3 border-t border-gray-300/40" />
          <Link
            href="/reservation"
            onClick={() => setMenuOpen(false)}
            className="mx-auto block w-fit rounded-full bg-gradient-to-r from-[#f7f7f7] via-[#d9d9d9] to-[#b5b5b5] px-8 py-3 text-sm font-semibold text-[#15233b] shadow-md shadow-[#d9d9d9]/40 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[#d9d9d9]/60"
          >
            Réserver
          </Link>
        </div>
      )}
    </nav>
  );
}
