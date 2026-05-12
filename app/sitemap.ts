import type { MetadataRoute } from "next";

const BASE_URL = "https://yurii-ai-demos.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE_URL, lastModified, priority: 1 },
    { url: `${BASE_URL}/restaurant`, lastModified, priority: 0.8 },
    { url: `${BASE_URL}/clinic`, lastModified, priority: 0.5 },
    { url: `${BASE_URL}/shop`, lastModified, priority: 0.5 },
  ];
}
