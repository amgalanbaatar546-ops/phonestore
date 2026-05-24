# ГарУтас — 3D Гар Утасны Дэлгүүр

Монголын гар утас зардаг 3D вебсайт. Immersive 3D phone viewer, хар cyberpunk дизайн, бүтэн дэлгүүрийн функц.

## Run & Operate

- `pnpm --filter @workspace/phone-store run dev` — frontend (port auto)
- `pnpm --filter @workspace/api-server run dev` — API server (port auto)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4
- 3D: @react-three/fiber v9 + @react-three/drei v10 + Three.js v0.177
- Animations: Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle DB schema (categories.ts, phones.ts, cart.ts)
- `artifacts/api-server/src/routes/` — Express route handlers (phones, categories, cart)
- `artifacts/phone-store/src/pages/` — Home, Shop, PhoneDetail, Cart pages
- `artifacts/phone-store/src/components/` — Phone3DModel, ParticleBackground, PhoneCard, Navbar

## Architecture decisions

- WebGL availability is checked at module load time via `isWebGLAvailable()` — if WebGL isn't supported, the Canvas is skipped entirely and a product image fallback is shown
- 3D components wrapped in `WebGLErrorBoundary` as a React-level safety net in addition to the pre-check
- Cart uses server-side session (DB table) for simplicity — no auth needed
- `@react-three/fiber` v9+ required for React 19 compatibility (v8 uses removed internals)

## Product

- `/` — Hero landing with floating 3D phone model, particle background, featured products, store stats
- `/shop` — Full product catalog with category filters, search, 3D hover tilt on cards
- `/phone/:id` — Product detail with interactive 3D rotating phone + specs + add to cart
- `/cart` — Cart page with items, quantities, remove, and checkout summary

## User preferences

- App name: ГарУтас (Монгол)
- UI language: Mongolian
- Style: dark cyberpunk, electric cyan/purple accents

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change
- `@react-three/fiber` must stay at v9+ — v8 is incompatible with React 19
- WebGL is not available in headless/sandboxed screenshot environments — this is expected, real browsers work fine

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
