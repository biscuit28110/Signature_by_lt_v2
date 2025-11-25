import fs from "fs/promises";
import path from "path";

// Journal d'accès simple (date/ip/ua/utilisateur)
const LOG_PATH = path.join(process.cwd(), "data", "admin-access.log");
const MAX_ENTRIES = 200;

export type AccessLogEntry = {
  at: number;
  ip: string;
  ua: string;
  user: string;
};

async function ensureLogFile() {
  try {
    await fs.access(LOG_PATH);
  } catch {
    await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
    await fs.writeFile(LOG_PATH, "[]", "utf8");
  }
}

export async function appendAccessLog(entry: AccessLogEntry) {
  await ensureLogFile();
  const raw = await fs.readFile(LOG_PATH, "utf8");
  const json = JSON.parse(raw) as AccessLogEntry[];
  json.push(entry);
  // On limite la taille pour éviter un fichier trop gros
  const sliced = json.slice(-MAX_ENTRIES);
  await fs.writeFile(LOG_PATH, JSON.stringify(sliced, null, 2), "utf8");
}

export async function readAccessLogs(limit = 50) {
  await ensureLogFile();
  const raw = await fs.readFile(LOG_PATH, "utf8");
  const json = JSON.parse(raw) as AccessLogEntry[];
  return json.slice(-limit).reverse();
}
