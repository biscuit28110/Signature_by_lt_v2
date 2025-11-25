import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const CONTENT_PATH = path.join(process.cwd(), "data", "admin-content.json");

// Lit le JSON de contenu (public : lecture ouverte pour afficher le site)
export async function GET() {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: "Impossible de lire le contenu" }, { status: 500 });
  }
}

// Met à jour le JSON de contenu (titres/CTA)
export async function PUT(request: Request) {
  try {
    const user = assertAuthenticated();
    const body = await request.json().catch(() => ({}));
    const { heroTitle, heroSubtitle, ctaPrimary, ctaSecondary } = body as Record<string, unknown>;

    const isString = (value: unknown) => typeof value === "string" && value.trim().length > 0;
    if (
      (heroTitle && !isString(heroTitle)) ||
      (heroSubtitle && !isString(heroSubtitle)) ||
      (ctaPrimary && !isString(ctaPrimary)) ||
      (ctaSecondary && !isString(ctaSecondary))
    ) {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const current = JSON.parse(raw);

    const updated = {
      ...current,
      ...(heroTitle ? { heroTitle: (heroTitle as string).trim() } : {}),
      ...(heroSubtitle ? { heroSubtitle: (heroSubtitle as string).trim() } : {}),
      ...(ctaPrimary ? { ctaPrimary: (ctaPrimary as string).trim() } : {}),
      ...(ctaSecondary ? { ctaSecondary: (ctaSecondary as string).trim() } : {}),
      lastUpdatedBy: user,
      lastUpdatedAt: Date.now(),
    };

    await fs.writeFile(CONTENT_PATH, JSON.stringify(updated, null, 2), "utf8");
    return NextResponse.json(updated);
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de mettre à jour" }, { status });
  }
}
