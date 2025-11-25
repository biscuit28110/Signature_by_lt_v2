"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Page de connexion admin
export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json?.error || "Connexion échouée");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b2c52]/5 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <header className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b2c52]/70">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#0b2c52]">Connexion</h1>
          <p className="mt-1 text-sm text-[#0b2c52]/70">Accès réservé — nom d&apos;utilisateur et mot de passe requis.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-[#0b2c52]" htmlFor="username">
              Nom d&apos;utilisateur
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0b2c52]" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0d3665] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
