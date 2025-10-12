import React from "react";
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";


/**
 * Footer Component - Signature by LT
 * -------------------------------------------------
 * Contient :
 * - Informations du salon
 * - Liens de navigation rapide
 * - Horaires d’ouverture
 * - Réseaux sociaux
 * - Mention légale en bas de page
 */

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#184370] text-white py-12">
      {/* Conteneur principal du footer */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* --- Infos Salon --- */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Signature by LT
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            5 Rue Michel Peter<br />
            75013 Paris
          </p>

          <p className="mt-2 text-sm text-gray-300 leading-relaxed flex items-center">
            Métro Les Gobelins – 
            {/* Logo Métro */}
            <img
              src="/assets/icons/metro.svg"
              alt="Logo Métro"
              className="w-7 h-7 mx-2 inline"
            />
            {/* Logo Ligne 7 */}
            <img
              src="/assets/icons/ligne_7.svg"
              alt="Ligne 7"
              className="w-7 h-7 inline"
            />
          </p>

          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            Tel :{" "}
            <a href="tel:+33764210316" className="hover:text-white transition">
              07 64 21 03 16
            </a>
          </p>
        </div>

        {/* --- Liens rapides --- */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>
              <a
                href="/prestation"
                className="hover:text-white transition"
              >
                Prestations
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-white transition"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* --- Horaires --- */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Horaires
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>Mardi - Vendredi : 10h30 - 19h30</li>
            <li>Samedi : 10h30 - 19h30</li>
            <li>Dimanche : 13h - 18h</li>
          </ul>
        </div>

        {/* --- Réseaux sociaux --- */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Suivez-nous
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#3B82F6] via-gray-400 to-gray-200 mb-4"></div>
          <div className="flex space-x-6 text-2xl">
            <a href="https://www.instagram.com/signature.by.lt" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:scale-150 transition">
                <FaInstagram />
            </a>
            <a href="https://www.snapchat.com/add/signaturebylt" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:scale-150 transition">
                <FaSnapchatGhost />
            </a>
            <a href="https://www.tiktok.com/@signature.by.lt" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:scale-150 transition">
                <FaTiktok />
            </a>
            </div>
        </div>
      </div>

      {/* --- Bas du footer --- */}
      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-xs text-gray-400">
        © 2025 Signature by LT | Tous droits réservés
      </div>
    </footer>
  );
}
