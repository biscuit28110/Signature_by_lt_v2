import { NextRequest, NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";
import { readAccessLogs } from "@/lib/adminLogs";

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Retourne les derniers logs d'accès admin
export async function GET(_request: NextRequest) {
  try {
    await assertAuthenticated();
    const logs = await readAccessLogs(50);
    return NextResponse.json({ logs });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de lire les logs" }, { status });
  }
}
