<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- npm only (npm lockfile, no CI). `npm run dev`, `npm run build`, `npm run lint`.
- No typecheck or test script exists. Typecheck with `npx tsc --noEmit` (runs clean, uses `.next/types/**` generated types). No tests anywhere in the repo.
- `npm run lint` is bare `eslint` (flat config) — lints the whole repo, no file args.

## Stack quirks

- Next.js 16.4.3, App Router, `src/` directory layout. Route layouts use the typed `LayoutProps<"/">` pattern, not destructured `{ params }: { params: ... }`.
- `next.config.ts` sets `cacheComponents: true` — default caching/fetch semantics differ from pre-cacheComponents Next.js; reads of uncached-dynamic APIs in Server Components require the usual `use cache` / dynamic opt-in treatment. `partialPrefetching: true` is also on.
- Turbopack is the default bundler; Tailwind is wired through `@tailwindcss/turbopack` via a `turbopack.rules` entry in `next.config.ts` (no PostCSS config file exists).
- Tailwind v4, CSS-first: there is no `tailwind.config`. Design tokens, radii, dark-mode (`@custom-variant dark`), and `@theme inline` mappings all live in `src/app/globals.css`. Edit tokens there, not in a config file.

## shadcn/ui — Base UI, not Radix

- `components.json` uses style `"base-nova"`: generated components build on `@base-ui/react`, NOT `@radix-ui/*`. Don't add Radix imports or copy classic shadcn (Radix) component code.
- components live in `src/components/ui/` (only `button.tsx` exists); add more with `npx shadcn add <component>`.
- `cn` is the standalone `cn` npm package re-exported from `src/lib/utils.ts` — not clsx + tailwind-merge.

## Paths

- `@/*` maps to `src/*` (e.g. `@/components/ui/button`). Fonts/tokens: `--font-sans` is Google's `Josefin_Sans` (oddly bound to that variable in `src/app/layout.tsx`).
