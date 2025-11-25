export type PlanityServiceEntry = {
  id?: string;
  name: string;
  price: number | null;
  currency?: string;
};

export type PlanityPricingCategory = {
  id?: string;
  title: string;
  services: PlanityServiceEntry[];
};

export const PLANITY_DEFAULT_CURRENCY = "EUR";

export const planityFallbackCategories: PlanityPricingCategory[] = [
  {
    title: "Cheveux",
    services: [
      { name: "Coupe simple", price: 20 },
      { name: "Coupe simple au ciseaux", price: 25 },
      { name: "Coupe simple au ciseaux + barbe", price: 35 },
      { name: "Coupe court femme", price: 35 },
      { name: "Coupe enfant -16 ans", price: 15 },
      { name: "Supplément Coloration / Décoloration", price: null },
      { name: "Coupe + barbe", price: 30 },
      { name: "Dessin", price: 5 },
      { name: "TRANSFORMATION", price: 30 },
      { name: "TRANSFORMATION + BARBE", price: 40 },
    ],
  },
  {
    title: "Barbe",
    services: [
      { name: "Contours", price: 15 },
      { name: "Taillage", price: 20 },
    ],
  },
  {
    title: "Shampooing & soins",
    services: [
      { name: "Shampooing", price: 5 },
      { name: "Shampooing et soin cheveux longs", price: 10 },
      { name: "Soins barbe", price: 15 },
      { name: "Soins cheveux", price: 15 },
    ],
  },
  {
    title: "Colorations et defrisage",
    services: [
      { name: "Coloration noir (court, une dose)", price: 15 },
      { name: "Coloration (court, une dose)", price: 25 },
      { name: "Décoloration (court, une dose)", price: 20 },
      { name: "Défrisage", price: 15 },
    ],
  },
  {
    title: "DREADLOCKS",
    services: [
      { name: "DEPART LOCKS - TWIST", price: 70 },
      { name: "TWIST 1 (-100 LOCKS)", price: 60 },
      { name: "TWIST 1 & SHAMPOO", price: 95 },
      { name: "TWIST 2 (101 à 150 LOCKS)", price: 80 },
      { name: "TWIST 2 & SHAMPOO", price: 115 },
      { name: "DEPART LOCKS - CROCHET", price: 80 },
      { name: "CROCHET 1 (-80 LOCKS)", price: 70 },
      { name: "CROCHET 1 & SHAMPOO", price: 105 },
      { name: "CROCHET 2 (81 à 120 LOCKS)", price: 110 },
      { name: "CROCHET 2 & SHAMPOO", price: 145 },
    ],
  },
];
