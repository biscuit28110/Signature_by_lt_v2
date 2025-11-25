"use client";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

type AdminContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  lastUpdatedBy?: string;
  lastUpdatedAt?: number;
};

type AdminVideo = {
  name: string;
  src: string;
};

type Props = {
  initialContent: AdminContent;
  initialVideos: AdminVideo[];
  currentUser: string;
};

export default function AdminDashboard({ initialContent, initialVideos, currentUser }: Props) {
  // États locaux pour l'édition de contenu texte
  const [content, setContent] = useState<AdminContent>(initialContent);
  const [savingContent, setSavingContent] = useState(false);
  const [contentMessage, setContentMessage] = useState<string | null>(null);

  // États pour la gestion vidéo
  const [videos, setVideos] = useState<AdminVideo[]>(initialVideos);
  const [uploading, setUploading] = useState(false);
  const [videoMessage, setVideoMessage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [logs, setLogs] = useState<{ at: number; ip: string; ua: string; user: string }[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  // Sécurité : changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    // Chargement initial des logs d'accès
    fetchLogs();
  }, []);

  // Déconnexion rapide
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  // Sauvegarde des textes (appel API -> JSON)
  const handleSaveContent = async () => {
    setSavingContent(true);
    setContentMessage(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const json = await response.json();
      if (!response.ok) {
        setContentMessage(json?.error || "Erreur lors de l'enregistrement.");
        return;
      }
      setContent(json as AdminContent);
      setContentMessage("Contenu enregistré.");
    } catch {
      setContentMessage("Erreur réseau.");
    } finally {
      setSavingContent(false);
    }
  };

  // Mise à jour du mot de passe admin
  const handleChangePassword = async () => {
    setPasswordLoading(true);
    setPasswordMessage(null);
    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        setPasswordMessage(json?.error || "Changement impossible.");
        return;
      }
      setPasswordMessage("Mot de passe mis à jour.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordMessage("Erreur réseau.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Lecture des logs d'accès
  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const response = await fetch("/api/admin/logs");
      const json = await response.json();
      if (!response.ok) {
        setLogs([]);
        return;
      }
      setLogs(json.logs || []);
    } catch {
      setLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  // Téléchargement d'une sauvegarde JSON du contenu
  const handleBackup = async () => {
    setBackupMessage(null);
    try {
      const response = await fetch("/api/admin/backup");
      if (!response.ok) {
        setBackupMessage("Impossible de générer la sauvegarde.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "admin-content-backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setBackupMessage("Sauvegarde téléchargée.");
    } catch {
      setBackupMessage("Erreur lors du téléchargement.");
    }
  };

  // Upload d'une vidéo avec FormData
  const handleUpload = async () => {
    if (!fileToUpload) {
      setVideoMessage("Choisissez un fichier vidéo.");
      return;
    }
    setUploading(true);
    setVideoMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const response = await fetch("/api/admin/videos", { method: "POST", body: formData });
      const json = await response.json();
      if (!response.ok) {
        setVideoMessage(json?.error || "Upload impossible.");
        return;
      }
      setVideos((prev) => [...prev, { name: json.name, src: json.src }]);
      setVideoMessage("Vidéo ajoutée.");
      setFileToUpload(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setVideoMessage("Erreur réseau.");
    } finally {
      setUploading(false);
    }
  };

  // Suppression d'une vidéo
  const handleDeleteVideo = async (name: string) => {
    const confirmDelete = window.confirm("Supprimer cette vidéo ?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`/api/admin/videos/${encodeURIComponent(name)}`, { method: "DELETE" });
      if (!response.ok) {
        const json = await response.json();
        setVideoMessage(json?.error || "Suppression impossible.");
        return;
      }
      setVideos((prev) => prev.filter((video) => video.name !== name));
      setVideoMessage("Vidéo supprimée.");
    } catch {
      setVideoMessage("Erreur réseau.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b2c52]/70">Admin</p>
            <h1 className="text-xl font-semibold text-[#0b2c52]">Tableau de bord</h1>
            <p className="text-sm text-[#0b2c52]/70">Connecté en tant que {currentUser}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#0b2c52] transition hover:bg-[#0b2c52] hover:text-white"
          >
            Se déconnecter
          </button>
        </header>

        {/* Bloc Textes */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b2c52]/70">Textes</p>
              <h2 className="text-lg font-semibold text-[#0b2c52]">Édition des contenus</h2>
            </div>
            <button
              onClick={handleSaveContent}
              disabled={savingContent}
              className="rounded-full bg-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0d3665] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingContent ? "Sauvegarde..." : "Enregistrer"}
            </button>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              Titre héros
              <input
                value={content.heroTitle}
                onChange={(e) => setContent((prev) => ({ ...prev, heroTitle: e.target.value }))}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              Sous-titre héros
              <input
                value={content.heroSubtitle}
                onChange={(e) => setContent((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              CTA principal
              <input
                value={content.ctaPrimary}
                onChange={(e) => setContent((prev) => ({ ...prev, ctaPrimary: e.target.value }))}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              CTA secondaire
              <input
                value={content.ctaSecondary}
                onChange={(e) => setContent((prev) => ({ ...prev, ctaSecondary: e.target.value }))}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>
          </div>

          {contentMessage && <p className="mt-3 text-sm text-[#0b2c52]">{contentMessage}</p>}
          {content.lastUpdatedAt ? (
            <p className="mt-2 text-xs text-[#0b2c52]/70">
              Dernière mise à jour : {new Date(content.lastUpdatedAt).toLocaleString("fr-FR")} par{" "}
              {content.lastUpdatedBy || "N/A"}
            </p>
          ) : null}
        </section>

        {/* Bloc Sécurité */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b2c52]/70">Sécurité</p>
              <h2 className="text-lg font-semibold text-[#0b2c52]">Changement de mot de passe</h2>
              <p className="text-sm text-[#0b2c52]/70">Mot de passe actuel + nouveau mot de passe (8 caractères min).</p>
            </div>
            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="rounded-full bg-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0d3665] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordLoading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              Mot de passe actuel
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              Nouveau mot de passe
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[#0b2c52]">
              Confirmation
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-[#0b2c52]/20 px-3 py-2 text-sm text-[#0b2c52] focus:border-[#0b2c52] focus:outline-none"
              />
            </label>
          </div>
          {passwordMessage && <p className="mt-3 text-sm text-[#0b2c52]">{passwordMessage}</p>}
        </section>

        {/* Bloc Vidéos */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b2c52]/70">Vidéos</p>
              <h2 className="text-lg font-semibold text-[#0b2c52]">Gestion des vidéos</h2>
              <p className="text-sm text-[#0b2c52]/70">Upload rapide (mp4/webm/ogg), suppression sécurisée.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                id="video-file-input"
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                ref={fileInputRef}
                className="w-48 text-sm text-[#0b2c52]"
              />
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="rounded-full bg-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0d3665] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Upload..." : "Ajouter"}
              </button>
            </div>
          </header>

          {videoMessage && <p className="mb-3 text-sm text-[#0b2c52]">{videoMessage}</p>}

          <div className="grid gap-4 md:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.name}
                className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <div className="relative aspect-[9/16] bg-black/5">
                  <video src={video.src} muted preload="metadata" playsInline className="h-full w-full object-cover" />
                  <div className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                    Vidéo
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-xs text-[#0b2c52] truncate">{video.name}</p>
                  <button
                    onClick={() => handleDeleteVideo(video.name)}
                    className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            ))}
            {videos.length === 0 && (
              <p className="col-span-full text-sm text-[#0b2c52]">Aucune vidéo disponible pour le moment.</p>
            )}
          </div>
        </section>

        {/* Bloc Logs & Backup */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b2c52]/70">Journal</p>
              <h2 className="text-lg font-semibold text-[#0b2c52]">Logs d&apos;accès & Sauvegardes</h2>
              <p className="text-sm text-[#0b2c52]/70">
                Dates, IP et navigateurs des connexions. Téléchargez une sauvegarde JSON du contenu.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchLogs}
                disabled={loadingLogs}
                className="rounded-full border border-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#0b2c52] transition hover:bg-[#0b2c52] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingLogs ? "Chargement..." : "Rafraîchir logs"}
              </button>
              <button
                onClick={handleBackup}
                className="rounded-full bg-[#0b2c52] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0d3665]"
              >
                Télécharger backup
              </button>
            </div>
          </header>

          {backupMessage && <p className="mb-3 text-sm text-[#0b2c52]">{backupMessage}</p>}

          <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
            <div className="grid grid-cols-[140px_1fr] bg-[#f8fafc] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b2c52]">
              <span>Date</span>
              <span>Détail</span>
            </div>
            <div className="divide-y divide-[#e5e7eb]">
              {logs.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#0b2c52]">Aucun log disponible.</p>
              )}
              {logs.map((log, idx) => (
                <div key={`${log.at}-${idx}`} className="grid grid-cols-[140px_1fr] px-4 py-3 text-sm text-[#0b2c52]">
                  <span className="text-xs text-[#0b2c52]/80">
                    {new Date(log.at).toLocaleString("fr-FR")}
                  </span>
                  <span className="text-xs text-[#0b2c52]">
                    {log.user} — IP: {log.ip} — UA: {log.ua}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
