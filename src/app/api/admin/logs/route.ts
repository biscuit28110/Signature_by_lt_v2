import { NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";
import { readAccessLogs } from "@/lib/adminLogs";

// Retourne les derniers logs d'accès admin
export async function GET() {
  try {
    await assertAuthenticated();
    const logs = await readAccessLogs(50);
    return NextResponse.json({ logs });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de lire les logs" }, { status });
  }
}
