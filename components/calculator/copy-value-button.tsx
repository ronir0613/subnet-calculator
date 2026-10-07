"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyValueButton({ value, label }: { value: string; label: string }) {
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
      aria-label={`Copy ${label}`}
    >
      {state === "copied" ? "Copied" : state === "failed" ? "Select value" : "Copy"}
    </Button>
  );
}
