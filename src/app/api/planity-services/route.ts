import { NextRequest, NextResponse } from "next/server";

import {
  PLANITY_DEFAULT_CURRENCY,
  planityFallbackCategories,
  type PlanityPricingCategory,
  type PlanityServiceEntry,
} from "@/lib/planity";

const PLANITY_SERVICES_ENDPOINT =
  process.env.PLANITY_SERVICES_ENDPOINT ?? process.env.NEXT_PUBLIC_PLANITY_SERVICES_ENDPOINT ?? "";

const PLANITY_API_KEY =
  process.env.PLANITY_PRIVATE_API_KEY ??
  process.env.PLANITY_API_KEY ??
  process.env.NEXT_PUBLIC_PLANITY_API_KEY ??
  "";

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

export const revalidate = 1800; // 30 minutes

type PlanityApiPayload = Record<string, unknown> | Record<string, unknown>[] | null | undefined;

const textOrNull = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }
  }
  return null;
};

const parsePrice = (value: unknown): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return value >= 1000 ? value / 100 : value;
  }

  if (typeof value === "string") {
    const sanitized = value.replace(/[^\d.,-]/g, "").replace(",", ".");
    if (!sanitized) return null;
    const parsed = Number.parseFloat(sanitized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return (
      parsePrice(record.amount) ??
      parsePrice(record.value) ??
      parsePrice(record.price) ??
      parsePrice(record.min) ??
      parsePrice(record.max)
    );
  }

  return null;
};

const toArray = (value: unknown): Record<string, unknown>[] => {
  if (Array.isArray(value)) {
    return value as Record<string, unknown>[];
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, Record<string, unknown>>);
  }
  return [];
};

const normalizeService = (raw: Record<string, unknown>): PlanityServiceEntry | null => {
  const name = textOrNull(raw.name, raw.label, raw.title);
  if (!name) return null;

  const price =
    parsePrice(raw.price) ??
    parsePrice(raw.priceMin) ??
    parsePrice(raw.price_min) ??
    parsePrice(raw.fromPrice) ??
    parsePrice(raw.from_price) ??
    parsePrice(raw.amount) ??
    parsePrice(raw.value);

  const rawCurrency =
    textOrNull(
      typeof raw.currency === "string" ? raw.currency : undefined,
      typeof raw.price === "object" ? (raw.price as Record<string, unknown>).currency : undefined,
      typeof raw.pricing === "object" ? (raw.pricing as Record<string, unknown>).currency : undefined,
    ) ?? PLANITY_DEFAULT_CURRENCY;

  return {
    id: raw.id ? String(raw.id) : undefined,
    name,
    price,
    currency: rawCurrency,
  };
};

const normalizeCategory = (raw: Record<string, unknown>): PlanityPricingCategory | null => {
  const title = textOrNull(raw.name, raw.label, raw.title);
  if (!title) return null;

  const servicesSource = toArray(raw.services ?? raw.items);
  const services = servicesSource
    .map((service) => normalizeService(service))
    .filter((service): service is PlanityServiceEntry => Boolean(service));

  if (services.length === 0) {
    return null;
  }

  return {
    id: raw.id ? String(raw.id) : undefined,
    title,
    services,
  };
};

const categoriesFromFlatServices = (value: unknown): PlanityPricingCategory[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const groups = new Map<string, PlanityServiceEntry[]>();

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const raw = entry as Record<string, unknown>;
    const normalized = normalizeService(raw);
    if (!normalized) return;

    const categoryName =
      textOrNull(
        raw.categoryName,
        raw.category_name,
        raw.category_label,
        (raw.category as Record<string, unknown>)?.name,
        (raw.category as Record<string, unknown>)?.label,
      ) ?? "Prestations";

    const group = groups.get(categoryName) ?? [];
    group.push(normalized);
    groups.set(categoryName, group);
  });

  return Array.from(groups.entries()).map(([title, services]) => ({
    title,
    services,
  }));
};

const normalizePlanityPayload = (payload: PlanityApiPayload): PlanityPricingCategory[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload
      .map((item) => (item && typeof item === "object" ? normalizeCategory(item as Record<string, unknown>) : null))
      .filter((category): category is PlanityPricingCategory => Boolean(category));
  }

  if (typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;

  const directSource = toArray(record.categories);
  if (directSource.length > 0) {
    const directCategories = directSource
      .map((item) => normalizeCategory(item))
      .filter((category): category is PlanityPricingCategory => Boolean(category));
    if (directCategories.length > 0) {
      return directCategories;
    }
  }

  const flatFromServices = categoriesFromFlatServices(record.services);
  if (flatFromServices.length > 0) {
    return flatFromServices;
  }

  if (record.data) {
    const nested = normalizePlanityPayload(record.data as PlanityApiPayload);
    if (nested.length > 0) {
      return nested;
    }
  }

  if (record.result) {
    const nested = normalizePlanityPayload(record.result as PlanityApiPayload);
    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
};

export async function GET(_request: NextRequest) {
  if (!PLANITY_SERVICES_ENDPOINT) {
    return NextResponse.json({ categories: planityFallbackCategories, source: "fallback" });
  }

  try {
    const headers: HeadersInit = { Accept: "application/json" };
    if (PLANITY_API_KEY) {
      headers.Authorization = `Bearer ${PLANITY_API_KEY}`;
    }

    const response = await fetch(PLANITY_SERVICES_ENDPOINT, {
      headers,
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Planity responded with ${response.status}`);
    }

    const payload = (await response.json()) as PlanityApiPayload;
    const categories = normalizePlanityPayload(payload);

    if (!categories.length) {
      throw new Error("Planity payload did not contain categories");
    }

    return NextResponse.json({ categories, source: "planity" });
  } catch (error) {
    console.error("[Planity] Unable to fetch services:", error);
    return NextResponse.json({ categories: planityFallbackCategories, source: "fallback" }, { status: 200 });
  }
}
