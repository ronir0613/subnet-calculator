"use client";

import { useSyncExternalStore } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HalfMoonIcon, SunLightIcon } from "@/components/icons";

type Theme = "light" | "dark";
const storageKey = "subnet-calculator-theme";

const themeEvent = "subnet-calculator-theme-change";

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeEvent, onChange);
  return () => window.removeEventListener(themeEvent, onChange);
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeSelector() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  function chooseTheme(value: string) {
    if (value !== "light" && value !== "dark") return;
    applyTheme(value);
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // The selected theme still applies for the current page when storage is unavailable.
    }
  }

  return (
    <div className="flex shrink-0 items-center">
      <ToggleGroup
        aria-label="Color appearance"
        className="h-11"
        onValueChange={chooseTheme}
        size="sm"
        type="single"
        value={theme}
      >
        <ToggleGroupItem aria-label="Light appearance" className="min-h-11 gap-1.5 px-3 text-xs" value="light">
          <SunLightIcon aria-hidden="true" className="size-4" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Dark appearance" className="min-h-11 gap-1.5 px-3 text-xs" value="dark">
          <HalfMoonIcon aria-hidden="true" className="size-4" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
