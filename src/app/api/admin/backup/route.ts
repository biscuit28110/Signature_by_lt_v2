import fs from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const CONTENT_PATH = path.join(process.cwd(), "data", "admin-content.json");

// Permet de télécharger le JSON de contenu comme sauvegarde
export async function GET(_request: NextRequest) {
  try {
    await assertAuthenticated();
    const data = await fs.readFile(CONTENT_PATH);
    const payload = new Uint8Array(data);
    return new NextResponse(new Blob([payload]), {
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
