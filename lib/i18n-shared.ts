export const localeOptions = [
  { code: "zh", tag: "zh-CN", name: "简体中文" },
  { code: "es", tag: "es", name: "Español" },
  { code: "ar", tag: "ar", name: "العربية" },
  { code: "id", tag: "id", name: "Bahasa Indonesia" },
  { code: "pt", tag: "pt", name: "Português" },
  { code: "fr", tag: "fr", name: "Français" },
] as const;

export type Locale = (typeof localeOptions)[number]["code"] | "en";

export const localizedSlugs = ["", "guide", "quiz", "vlsm", "subnet", "about", "contact", "privacy", "terms"] as const;

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? normalized : `/${locale}${normalized === "/" ? "" : normalized}`;
}
