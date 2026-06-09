import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export async function fetchWishes() {
  const { data } = await axios.get(`${API}/wishes`);
  return Array.isArray(data) ? data : [];
}

export async function createWish(payload) {
  const { data } = await axios.post(`${API}/wishes`, payload);
  return data;
}

export async function fetchStats() {
  const { data } = await axios.get(`${API}/wishes/stats`);
  return data;
}

// Format a UTC ISO date to a Turkish "ago" string + date/time labels
export function formatTimeAgo(isoDate) {
  if (!isoDate) return { date: "", time: "", ago: "" };
  const d = new Date(isoDate);
  const now = new Date();
  const diff = Math.max(0, Math.floor((now - d) / 1000)); // seconds

  let ago;
  if (diff < 60) ago = "şimdi";
  else if (diff < 3600) ago = `${Math.floor(diff / 60)} dakika önce`;
  else if (diff < 86400) ago = `${Math.floor(diff / 3600)} saat önce`;
  else if (diff < 86400 * 7) ago = `${Math.floor(diff / 86400)} gün önce`;
  else if (diff < 86400 * 30)
    ago = `${Math.floor(diff / (86400 * 7))} hafta önce`;
  else if (diff < 86400 * 365)
    ago = `${Math.floor(diff / (86400 * 30))} ay önce`;
  else ago = `${Math.floor(diff / (86400 * 365))} yıl önce`;

  const date = d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time, ago };
}
