import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/adminAuth";

// Déconnexion admin
export async function POST() {
  clearSessionCookie();
  return NextResponse.json({ ok: true });
}
