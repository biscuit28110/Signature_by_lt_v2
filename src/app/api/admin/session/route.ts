import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/adminAuth";

// Permet de vérifier l'état de session côté client
export async function GET() {
  const user = getSessionUser();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}
