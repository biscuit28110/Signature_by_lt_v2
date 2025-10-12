import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Réservation",
};

export default function ReservationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
