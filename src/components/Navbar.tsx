"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import LogoNavbar from "./Images";

const navigationLinks = [
  { href: "/", label: "ACCUEIL" },
  { href: "/about", label: "À PROPOS" },
  { href: "/prestations", label: "PRESTATIONS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Ajoute un fond au défilement pour garder la navigation lisible.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloque le scroll de la page quand la sidebar est ouverte.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navbarBackground =
    isMenuOpen || !isHome || scrolled ? "bg-[#184370]/90 backdrop-blur-md" : "bg-transparent";

  return (
    <Fragment>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-colors duration-500 ${navbarBackground}`}
      >
        <div className="relative mx-auto flex h-20 w-full max-w-6xl items-center px-4 md:h-24 md:px-8">
          {/* Menu burger en façade */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-0 md:top-[60%]">
            <button
              type="button"
              aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Menu className="h-7 w-7" />
              <span>Menu</span>
            </button>
          </div>

          {/* Logo centré */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 md:top-[58%]">
            <Link href="/" aria-label="Retour à l'accueil" className="inline-flex items-center">
              <LogoNavbar />
            </Link>
          </div>

          {/* Bouton Réserver */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-0 md:top-[60%]">
            <Link
              href="/reservation"
              className="rounded-full border border-white px-7 py-2.5 text-sm md:text-base font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Réserver
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar latérale */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
          role="presentation"
        />
        <aside
          className={`relative flex h-full w-[82%] max-w-xs flex-col bg-white px-6 py-8 text-[#15233b] shadow-xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.35em] text-gray-500">MENU</span>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-2 text-[#15233b] transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233b]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-12 flex flex-col space-y-6 text-base font-semibold uppercase tracking-wide">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="transition hover:text-[#0f1d33] hover:opacity-80"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir Instagram Signature by LT"
              className="text-[#15233b] transition hover:opacity-70"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir Snapchat Signature by LT"
              className="text-[#15233b] transition hover:opacity-70"
            >
              <FaSnapchatGhost className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir TikTok Signature by LT"
              className="text-[#15233b] transition hover:opacity-70"
            >
              <FaTiktok className="h-6 w-6" />
            </a>
          </div>
        </aside>
      </div>
    </Fragment>
  );
}
