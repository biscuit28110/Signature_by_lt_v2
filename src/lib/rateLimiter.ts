// Rate limiter ultra simple en mémoire pour le login
// Remarque : reset à chaque redémarrage, suffisant pour un prototype
type Attempt = { count: number; last: number };
const attempts = new Map<string, Attempt>();

const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_ATTEMPTS = 8;

export function canAttempt(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry) return true;
  // Si la fenêtre est expirée on repart de zéro
  if (now - entry.last > WINDOW_MS) {
    attempts.delete(key);
    return true;
  }
  return entry.count < MAX_ATTEMPTS;
}

export function recordAttempt(key: string, success: boolean) {
  const now = Date.now();
  const entry = attempts.get(key) || { count: 0, last: now };
  if (success) {
    attempts.delete(key);
    return;
  }
  const withinWindow = now - entry.last <= WINDOW_MS;
  attempts.set(key, {
    count: withinWindow ? entry.count + 1 : 1,
    last: now,
  });
}
