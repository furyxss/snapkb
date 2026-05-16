import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://snapkb.vercel.app";

  return [
    "",
    "/compress-image-to-100kb",
    "/compress-image-to-50kb",
    "/png-to-jpg",
    "/docx-to-pdf",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
