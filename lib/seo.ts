import { localeOptions } from "@/lib/i18n-shared";

export function getPageLanguageAlternates(path: string): Record<string, string> {
  const normalizedPath = path || "/";
  return Object.fromEntries([
    ["en", normalizedPath],
    ["x-default", normalizedPath],
    ...localeOptions.map(({ code, tag }) => [tag, `/${code}${normalizedPath === "/" ? "" : normalizedPath}`]),
  ]);
}
