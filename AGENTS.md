<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- better-design:start -->
Read DESIGN.md when present. Compose installed components/ui/* primitives: use Sidebar for the app shell, Table for records instead of repeated div rows, and the installed stepper for dependent flows. Never hand-roll a <button>/<input>/<dialog> or fake a ⌘K palette / menu / notification bell. Preserve the installed font loader and resolve every --font-* token. Use only app/globals.css design tokens. See .better-design/rules.md.
<!-- better-design:end -->
