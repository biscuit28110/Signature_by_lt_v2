import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

import AdminDashboard from "@/components/admin/AdminDashboard";
import { getSessionUser } from "@/lib/adminAuth";

const CONTENT_PATH = path.join(process.cwd(), "data", "admin-content.json");
const VIDEO_DIR = path.join(process.cwd(), "public", "assets", "realisations", "video");

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Lecture serveur du contenu texte
  const rawContent = await fs.readFile(CONTENT_PATH, "utf8");
  const content = JSON.parse(rawContent);

  // Lecture serveur des vidéos disponibles
  const files = await fs.readdir(VIDEO_DIR);
  const videos = files
    .filter((file) => file.match(/\.(mp4|webm|ogg)$/i))
    .map((file) => ({
      name: file,
      src: `/assets/realisations/video/${file}`,
    }));

  return <AdminDashboard initialContent={content} initialVideos={videos} currentUser={user} />;
}
