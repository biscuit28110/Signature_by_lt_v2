import { NextResponse } from "next/server";

import { assertAuthenticated, updatePassword, verifyPassword } from "@/lib/adminAuth";

// Changement de mot de passe admin
export async function PUT(request: Request) {
  try {
    const user = await assertAuthenticated();
    const body = await request.json().catch(() => ({}));
    const { currentPassword, newPassword, confirmPassword } = body as Record<string, unknown>;

    const isValidString = (value: unknown) => typeof value === "string" && value.trim().length >= 8;
    if (!isValidString(newPassword) || !isValidString(currentPassword) || !isValidString(confirmPassword)) {
      return NextResponse.json({ error: "Champs invalides (8 caractères minimum)." }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Les mots de passe ne correspondent pas." }, { status: 400 });
    }
    const currentOk = await verifyPassword(String(currentPassword));
    if (!currentOk) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 401 });
    }

    await updatePassword(String(newPassword));

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    const status = (error as Error)?.message === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: "Impossible de changer le mot de passe" }, { status });
  }
}
