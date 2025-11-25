import { NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/adminAuth";

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Permet de vérifier l'état de session côté client
export async function GET(_request: NextRequest) {
  // FIX NEXT 15: appels async (cookies) → await getSessionUser()
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}
