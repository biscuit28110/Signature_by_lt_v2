import fs from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const CONTENT_PATH = path.join(process.cwd(), "data", "admin-content.json");

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Permet de télécharger le JSON de contenu comme sauvegarde
export async function GET(request: NextRequest) {
  try {
    await assertAuthenticated();
    const data = await fs.readFile(CONTENT_PATH);
    // FIX NEXT 15: réponse binaire via Uint8Array directement
    const payload = new Uint8Array(data);
    return new NextResponse(payload, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="admin-content-backup.json"`,
      },
    });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de générer la sauvegarde" }, { status });
  }
}
