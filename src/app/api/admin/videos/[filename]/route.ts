import fs from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const VIDEO_DIR = path.join(process.cwd(), "public", "assets", "realisations", "video");

type DeleteContext = { params: { filename: string } };

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

export async function DELETE(_request: NextRequest, { params }: DeleteContext) {
  try {
    // FIX NEXT 15: assertAuthenticated est async → await
    await assertAuthenticated();

    const { filename } = params;

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
