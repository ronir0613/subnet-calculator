import type { MetadataRoute } from "next";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/vlsm", "/guide", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : ["/vlsm", "/guide"].includes(path) ? 0.8 : 0.5,
  }));
}
