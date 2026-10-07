export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-background text-foreground " +
  "border border-input " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-150 ease-out " +
  "hover:border-ring/45 " +
  "focus-visible:outline-none focus-visible:border-ring " +
  "focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted";

/** Height + vertical padding for single-line form fields (h-9) */
export const formFieldSingleLine = "flex h-9 py-1.5";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y";
