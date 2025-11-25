import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/adminAuth";

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Déconnexion admin
export async function POST(_request: NextRequest) {
  clearSessionCookie();
  return NextResponse.json({ ok: true });
}
