import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

import { assertAuthenticated } from "@/lib/adminAuth";

const VIDEO_DIR = path.join(process.cwd(), "public", "assets", "realisations", "video");
const MAX_SIZE_BYTES = 80 * 1024 * 1024; // 80 Mo
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/ogg"];

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

// Liste les vidéos disponibles
export async function GET(_request: NextRequest) {
  try {
    // FIX NEXT 15: assertAuthenticated est async → await
    await assertAuthenticated();
    const files = await fs.readdir(VIDEO_DIR);
    const videos = files
      .filter((file) => file.match(/\.(mp4|webm|ogg)$/i))
      .map((file) => ({
        name: file,
        src: `/assets/realisations/video/${file}`,
      }));
    return NextResponse.json({ videos });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de lister les vidéos" }, { status });
  }
}

// Upload d'une nouvelle vidéo
export async function POST(request: NextRequest) {
  try {
    // FIX NEXT 15: assertAuthenticated est async → await
    await assertAuthenticated();
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Format non supporté" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    // FIX NEXT 15: préférer Uint8Array à Buffer pour compat Node runtime
    const buffer = new Uint8Array(arrayBuffer);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const finalName = `${timestamp}_${safeName}`;
    const targetPath = path.join(VIDEO_DIR, finalName);

    await fs.writeFile(targetPath, buffer);

    return NextResponse.json({
      ok: true,
      name: finalName,
      src: `/assets/realisations/video/${finalName}`,
    });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible d'uploader la vidéo" }, { status });
  }
}
