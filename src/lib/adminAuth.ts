import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

// Nom du cookie de session admin
export const ADMIN_SESSION_COOKIE = "sb_lt_admin_session";

// Localisation du fichier d'auth persisté
const AUTH_PATH = path.join(process.cwd(), "data", "admin-auth.json");
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

type AdminAuthState = {
  username: string;
  passwordHash: string;
  salt: string;
  sessionSecret: string;
};

// Génère un hash scrypt pour un mot de passe donné
export function hashPasswordWithSalt(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

// Initialise le fichier d'auth s'il n'existe pas (fallback sur variables d'env)
async function ensureAuthFile() {
  try {
    await fs.access(AUTH_PATH);
  } catch {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "Luce-28110";
    const salt = process.env.ADMIN_PASSWORD_SALT || "signature-salt-2024";
    const passwordHash =
      process.env.ADMIN_PASSWORD_HASH || hashPasswordWithSalt(password, salt);
    const sessionSecret = process.env.ADMIN_SESSION_SECRET || "change-me-admin-session-secret";
    const defaults: AdminAuthState = { username, passwordHash, salt, sessionSecret };
    await fs.mkdir(path.dirname(AUTH_PATH), { recursive: true });
    await fs.writeFile(AUTH_PATH, JSON.stringify(defaults, null, 2), "utf8");
  }
}

// Lit le fichier d'auth
async function readAuthFile(): Promise<AdminAuthState> {
  await ensureAuthFile();
  const raw = await fs.readFile(AUTH_PATH, "utf8");
  return JSON.parse(raw) as AdminAuthState;
}

// Met à jour le mot de passe (hash + sel)
export async function updatePassword(newPassword: string) {
  const current = await readAuthFile();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPasswordWithSalt(newPassword, salt);
  const updated: AdminAuthState = { ...current, salt, passwordHash };
  await fs.writeFile(AUTH_PATH, JSON.stringify(updated, null, 2), "utf8");
}

// Vérifie le mot de passe admin (hash stocké côté serveur)
export async function verifyPassword(candidate: string) {
  const { passwordHash, salt } = await readAuthFile();
  const candidateHash = hashPasswordWithSalt(candidate, salt);
  return crypto.timingSafeEqual(Buffer.from(candidateHash), Buffer.from(passwordHash));
}

// Génère une session signée (payload base64 + signature HMAC)
export async function createSession(username: string) {
  const { sessionSecret } = await readAuthFile();
  const payload = {
    u: username,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", sessionSecret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}

// Vérifie et retourne l'utilisateur présent dans la session (ou null)
export async function parseSession(token?: string | null) {
  if (!token) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const { sessionSecret, username } = await readAuthFile();
  const expectedSig = crypto.createHmac("sha256", sessionSecret).update(payloadB64).digest("base64url");
  // Protection timing-safe
  const sigOk = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  if (!sigOk) return null;

  const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as { u: string; exp: number };
  if (!payload?.u || typeof payload.exp !== "number") return null;
  if (Date.now() > payload.exp) return null;
  if (payload.u !== username) return null;
  return payload.u;
}

// Place le cookie de session
export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

// Supprime le cookie de session
export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
}

// Récupère l'utilisateur courant via le cookie (server side)
export async function getSessionUser() {
  // cookies() est async en Next 15 → on récupère le jar avant de lire
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return parseSession(token);
}

// Vérifie que la requête est authentifiée (côté API)
export async function assertAuthenticated() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("unauthorized");
  }
  return user;
}

// Retourne le nom d'utilisateur courant (config)
export async function getAdminUsername() {
  const { username } = await readAuthFile();
  return username;
}
