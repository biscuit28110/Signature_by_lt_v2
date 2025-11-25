import fs from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const VIDEO_DIR = path.join(process.cwd(), "public", "assets", "realisations", "video");

// Supprime une vidéo par nom de fichier
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  try {
    assertAuthenticated();
    const { filename } = await context.params;
    if (!filename) {
      return NextResponse.json({ error: "Nom de fichier manquant" }, { status: 400 });
    }

    // Empêche les traversals
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const targetPath = path.join(VIDEO_DIR, safeName);
    await fs.unlink(targetPath);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de supprimer la vidéo" }, { status });
  }
}
