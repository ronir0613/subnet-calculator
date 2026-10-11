import type { MetadataRoute } from "next";
import { localeOptions, localizedSlugs } from "@/lib/i18n";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.subnetio.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalSlugs = localizedSlugs.filter((slug) => slug !== "subnet");

  return canonicalSlugs.flatMap((slug) => {
    const englishPath = slug ? `/${slug}` : "/";
    const languages = Object.fromEntries([
      ["en", `${baseUrl}${englishPath}`],
      ["x-default", `${baseUrl}${englishPath}`],
      ...localeOptions.map(({ code, tag }) => [tag, `${baseUrl}/${code}${slug ? `/${slug}` : ""}`]),
    ]);

    return [englishPath, ...localeOptions.map(({ code }) => `/${code}${slug ? `/${slug}` : ""}`)].map((path) => ({
      url: `${baseUrl}${path}`,
      alternates: { languages },
    }));
  });
}
