import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { createSession, getAdminUsername, setSessionCookie, verifyPassword } from "@/lib/adminAuth";
import { canAttempt, recordAttempt } from "@/lib/rateLimiter";
import { appendAccessLog } from "@/lib/adminLogs";

// FIX NEXT 15: forcer le runtime Node.js pour Hostinger
export const runtime = "nodejs";

// Endpoint de connexion admin
export async function POST(request: NextRequest) {
  try {
    // FIX NEXT 15: headers() est async → utilisation avec await et réutilisation
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!canAttempt(ip)) {
      return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { username, password } = body as { username?: string; password?: string };

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      recordAttempt(ip, false);
      return NextResponse.json({ error: "Identifiants manquants." }, { status: 400 });
    }

    const adminUser = await getAdminUsername();

    // Vérifie le couple user/pass (mot de passe hashé côté serveur)
    const validPassword = await verifyPassword(password);
    if (username !== adminUser || !validPassword) {
      recordAttempt(ip, false);
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const token = await createSession(username);
    setSessionCookie(token);
    recordAttempt(ip, true);
    await appendAccessLog({
      at: Date.now(),
      ip,
      ua: h.get("user-agent") || "unknown",
      user: username,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur login admin", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
