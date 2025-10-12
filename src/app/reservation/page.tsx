'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Loader2, Shield, Sparkles, User } from "lucide-react";

const PLANITY_WIDGET_URL =
  process.env.NEXT_PUBLIC_PLANITY_WIDGET_URL ||
  "https://d2skjte8udjqxw.cloudfront.net/widget/production/2"
const PLANITY_API_KEY = process.env.NEXT_PUBLIC_PLANITY_API_KEY || "";

declare global {
  interface Window {
    planity?: {
      key: string;
      primaryColor?: string;
      container: HTMLElement | null;
    };
  }
}

const ReservationPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const scriptLoadCountRef = useRef(0);
  const [isLoadingWidget, setIsLoadingWidget] = useState(true);
  const [hasWidgetError, setHasWidgetError] = useState(false);

  useEffect(() => {
    // Si nous sommes déjà en erreur, on ne tente pas de recharger automatiquement.
    if (!containerRef.current || hasWidgetError) {
      return;
    }

    setIsLoadingWidget(true);
    scriptLoadCountRef.current = 0;
    observerRef.current?.disconnect();
    observerRef.current = null;

    // Configuration propre au widget Planity (documentée dans leur SDK).
    window.planity = {
      key: PLANITY_API_KEY,
      primaryColor: "#d4af37",
      container: containerRef.current,
    };

    const polyfillScript = document.createElement("script");
    polyfillScript.src = `${PLANITY_WIDGET_URL}/polyfills.latest.js`;

    const appScript = document.createElement("script");
    appScript.src = `${PLANITY_WIDGET_URL}/app.latest.js`;

    const finalizeIfReady = () => {
      if (containerRef.current && containerRef.current.childElementCount > 0) {
        setIsLoadingWidget(false);
        observerRef.current?.disconnect();
        observerRef.current = null;
      }
    };

    const handleReady = () => {
      scriptLoadCountRef.current += 1;

      if (scriptLoadCountRef.current >= 2) {
        finalizeIfReady();

        if (
          containerRef.current &&
          containerRef.current.childElementCount === 0 &&
          !observerRef.current
        ) {
          observerRef.current = new MutationObserver(() => {
            finalizeIfReady();
          });
          observerRef.current.observe(containerRef.current, {
            childList: true,
            subtree: true,
          });
        }
      }
    };

    const handleError = () => {
      setIsLoadingWidget(false);
      setHasWidgetError(true);
    };

    polyfillScript.addEventListener("load", handleReady);
    appScript.addEventListener("load", handleReady);
    polyfillScript.addEventListener("error", handleError);
    appScript.addEventListener("error", handleError);

    document.body.append(polyfillScript, appScript);

    return () => {
      polyfillScript.removeEventListener("load", handleReady);
      appScript.removeEventListener("load", handleReady);
      polyfillScript.removeEventListener("error", handleError);
      appScript.removeEventListener("error", handleError);
      observerRef.current?.disconnect();
      observerRef.current = null;
      polyfillScript.remove();
      appScript.remove();
    };
  }, [hasWidgetError]);

  return (
    <main className="min-h-screen bg-[#f5f6f8] pb-24 pt-28 text-[#1E3A5F]">
      <section className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(205,214,230,0.65)_0%,_transparent_55%)]" />
        </div>

        <header className="text-center">
          <p className="mx-auto inline-block rounded-full border border-[#d9d9d9] bg-white px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#b29b52] shadow-sm">
            Réservation
          </p>
          <h1 className="mt-6 font-cinzel-deco text-4xl tracking-wide md:text-5xl">
            Prenez Rendez-vous en Ligne
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#8c8c8c] md:text-base">
            Réservez votre moment Signature by LT en quelques clics grâce à notre
            module Planity intégré. Un parcours fluide, premium et sécurisé.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="rounded-3xl border border-[#e3e6ee] bg-white/90 p-6 text-sm text-[#6f7a8c] shadow-[0_18px_40px_rgba(10,18,30,0.08)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#1E3A5F]">
              Service sur-mesure
            </h2>
            <p className="mt-2">
              Choisissez la prestation qui reflète votre style. Nos experts prennent
              le relais pour sublimer chaque détail.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e3e6ee] bg-white/90 p-6 text-sm text-[#6f7a8c] shadow-[0_18px_40px_rgba(10,18,30,0.08)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#1E3A5F]">
              Paiement sécurisé
            </h2>
            <p className="mt-2">
              Planity garantit un tunnel de réservation fiable, avec confirmation
              instantanée et rappels automatiques.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e3e6ee] bg-white/90 p-6 text-sm text-[#6f7a8c] shadow-[0_18px_40px_rgba(10,18,30,0.08)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F]">
              <User className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#1E3A5F]">
              Espace personnel
            </h2>
            <p className="mt-2">
              Gérez vos réservations, retrouvez vos historiques et offrez une carte
              cadeau directement depuis votre compte.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[40px] border border-[#e3e6ee] bg-white/95 shadow-[0_20px_60px_rgba(10,18,30,0.1)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.1)_0%,_transparent_45%)]" />

          <div className="relative flex flex-col gap-8 p-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[#1E3A5F]">
                Module Planity Signature
              </h2>
              <p className="mt-2 text-sm text-[#6f7a8c]">
                Sélectionnez votre créneau, laissez-vous guider, et retrouvez-nous au
                salon pour une expérience haut de gamme.
              </p>
            </div>

            <div className="relative rounded-3xl border border-[#dfe3ee] bg-white p-4">
              <div
                ref={containerRef}
                className="min-h-[600px] w-full overflow-hidden rounded-2xl bg-white"
              />

              {isLoadingWidget && !hasWidgetError && (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-2xl bg-white/95 text-[#1E3A5F]">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40" />
                    <Loader2 className="absolute inset-0 h-full w-full animate-spin text-[#d4af37]" />
                    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_12px_30px_rgba(10,18,30,0.12)]">
                      <Image
                        src="/assets/icons/logo.ico"
                        alt="Signature by LT"
                        fill
                        sizes="80px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    Chargement du module Planity…
                  </p>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#6f7a8c]">
                    Merci de patienter
                  </span>
                </div>
              )}

              {hasWidgetError && (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center text-[#1E3A5F]">
                  <p className="text-sm font-semibold">
                    Impossible de charger le module Planity pour le moment.
                  </p>
                  <button
                    type="button"
                    onClick={() => setHasWidgetError(false)}
                    className="rounded-full border border-[#d4af37]/60 bg-[#d4af37]/15 px-6 py-2 text-sm font-semibold text-[#1E3A5F] transition hover:bg-[#d4af37]/25"
                  >
                    Réessayer
                  </button>
                  <p className="text-xs text-[#6f7a8c]">
                    Vous pouvez aussi réserver par téléphone au{" "}
                    <a
                      className="font-semibold text-[#1E3A5F] underline"
                      href="tel:+33123456789"
                    >
                      01 23 45 67 89
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e0e4ec] bg-white/80 p-8 text-center text-sm text-[#6f7a8c] shadow-[0_16px_50px_rgba(10,18,30,0.08)] backdrop-blur">
          <h3 className="text-lg font-semibold text-[#1E3A5F]">
            Besoin d&apos;un accompagnement personnalisé&nbsp;?
          </h3>
          <p className="mt-3">
            Notre équipe reste disponible pour toute question ou recommandation avant
            votre venue. Contactez-nous, nous serons ravis de vous guider.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <a
              href="tel:+33123456789"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 px-6 py-2 text-[#1E3A5F] transition hover:bg-[#d4af37]/25"
            >
              +33 1 23 45 67 89
            </a>
            <a
              href="mailto:contact@signaturebylt.fr"
              className="inline-flex items-center justify-center rounded-full border border-[#d7d7d7] bg-white px-6 py-2 text-[#1E3A5F] transition hover:border-[#d4af37]"
            >
              contact@signaturebylt.fr
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservationPage;
