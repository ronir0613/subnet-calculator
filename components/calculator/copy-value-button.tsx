"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

export function CopyValueButton({ value, label, locale = "en" }: { value: string; label: string; locale?: Locale }) {
  const { copy } = useLocale();
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="min-h-11 px-2 text-xs"
      onClick={copyValue}
      aria-label={`${copy.copy} ${label}`}
    >
      {state === "copied" ? copy.copied : state === "failed" ? copy.selectValue : copy.copy}
    </Button>
  );
}
