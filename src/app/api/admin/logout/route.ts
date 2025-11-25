import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/adminAuth";

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Déconnexion admin
export async function POST(_request: NextRequest) {
  // Suppression du cookie de session (async avec Next 15)
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
