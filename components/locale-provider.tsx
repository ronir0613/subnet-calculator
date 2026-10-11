"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/i18n";

const LocaleContext = createContext<{ locale: Locale; copy: Messages } | null>(null);

export function LocaleProvider({ locale, messages, children, setDocumentLocale = true }: { locale: Locale; messages: Messages; children: ReactNode; setDocumentLocale?: boolean }) {
  useEffect(() => {
    if (!setDocumentLocale) return;
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, setDocumentLocale]);

  return <LocaleContext.Provider value={{ locale, copy: messages }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
