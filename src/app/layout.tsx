import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Signature by LT",
    template: "%s | Signature by LT",
  },
  description:
    "Signature by LT, salon premium à Paris : barbers, coloristes et experts capillaires pour une expérience sur-mesure.",
  icons: {
    icon: "/assets/icons/logo.ico",
    shortcut: "/assets/icons/logo.ico",
    apple: "/assets/logo/logo-by-lt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body suppressHydrationWarning>
        <Script id="strip-extension-markers" strategy="beforeInteractive">
          {`
            // Certaines extensions de sécurité (ex: Bitdefender) injectent l'attribut "bis_skin_checked"
            // sur des éléments du DOM, ce qui déclenche des erreurs d'hydratation React.
            (function cleanBisSkinChecked() {
              try {
                const cleanNode = (node) => {
                  if (!(node instanceof Element)) return;
                  if (node.hasAttribute("bis_skin_checked")) {
                    node.removeAttribute("bis_skin_checked");
                  }
                  node.querySelectorAll?.("[bis_skin_checked]").forEach((el) => {
                    el.removeAttribute("bis_skin_checked");
                  });
                };

                cleanNode(document.documentElement);

                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === "attributes" && mutation.attributeName === "bis_skin_checked") {
                      mutation.target?.removeAttribute?.("bis_skin_checked");
                    }
                    mutation.addedNodes.forEach(cleanNode);
                  });
                });

                observer.observe(document.documentElement, {
                  subtree: true,
                  childList: true,
                  attributes: true,
                  attributeFilter: ["bis_skin_checked"],
                });

                window.addEventListener(
                  "DOMContentLoaded",
                  () => {
                    // On relâche l'observer une fois la page hydratée.
                    setTimeout(() => observer.disconnect(), 3000);
                  },
                  { once: true },
                );
              } catch {
                // Pas d'impact fonctionnel si le nettoyage échoue.
              }
            })();
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
