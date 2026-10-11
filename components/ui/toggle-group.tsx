"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

// Attio Flow ToggleGroup: segmented control on a muted rail. The active segment
// is a white pill with a whisper drop shadow, sliding via a calm layout spring.

function ToggleGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "flex items-center gap-1 rounded-md border border-border bg-muted p-1",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  )
}
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "relative inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground",
        "data-[state=on]:text-foreground",
        "before:absolute before:inset-0 before:rounded-sm before:bg-background before:shadow-[0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.08)] before:opacity-0 before:transition-opacity before:duration-150 data-[state=on]:before:opacity-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
