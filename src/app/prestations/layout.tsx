import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prestations",
};

export default function PrestationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
