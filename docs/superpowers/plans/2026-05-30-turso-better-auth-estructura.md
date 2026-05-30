# Turso + Better Auth (estructura) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline) — pasos con checkbox (`- [ ]`).

**Goal:** Reemplazar Supabase por Turso (libSQL) + Better Auth + Drizzle ORM como base de Kenvo Cloud. Solo estructura + script de setup. No se reescribe la UI ni se cablea Better Auth a las páginas (eso es Fase 1B).

**Architecture:** DB SQLite distribuida en Turso vía `@libsql/client`; ORM con `drizzle-orm` (esquema en código + migrations generadas con `drizzle-kit`); auth en código con `better-auth` usando el adaptador Drizzle. Sin servicio externo de auth, sin dashboards.

**Tech Stack:** Next.js 16.2.6 · Turso (libSQL) · Better Auth · Drizzle ORM · drizzle-kit · TypeScript strict · Biome.

**Decisión Oscar (este turno):** las 4 páginas que se mantienen importan la lib Supabase a borrar → se aprueba **neutralizar imports (mínimo)**: quitar import de Supabase + stub honesto, conservando el shell visual. No reescribir UI.

**Sin tests automatizados:** el repo no tiene infra de test (CLAUDE.md). La verificación es: `tsc --noEmit`, `biome check`, `drizzle-kit generate` con éxito, existencia de archivos, `git diff --check`, grep de secretos, y Kenvo Local intacto.

---

## Task 1: Dependencias

**Files:** `package.json`, `package-lock.json` (vía npm)

- [ ] Quitar Supabase: `npm uninstall @supabase/ssr @supabase/supabase-js`
- [ ] Añadir runtime: `npm install better-auth drizzle-orm @libsql/client`
- [ ] Añadir dev: `npm install -D drizzle-kit`
- [ ] Verificar: `node -p "Object.keys(require('./package.json').dependencies)"` no contiene `@supabase/*`; sí contiene `better-auth`, `drizzle-orm`, `@libsql/client`.

## Task 2: Borrar Supabase del repo

**Files (borrar):**
- `src/lib/supabase/` (client.ts, server.ts, middleware.ts)
- `supabase/` (migrations/0001_initial.sql)
- `src/app/(auth)/auth/callback/route.ts` (y carpeta `auth/` vacía resultante)

- [ ] `rm -rf src/lib/supabase`
- [ ] `rm -rf supabase`
- [ ] `rm -rf "src/app/(auth)/auth"`
- [ ] Verificar: `grep -rl "@supabase" src/` → vacío.

## Task 3: Capa DB (Drizzle + libSQL)

**Files:**
- Create: `src/lib/db/client.ts` — instancia libSQL + drizzle.
- Create: `src/lib/db/schema.ts` — tablas Better Auth (users, sessions, accounts, verifications) + workspaces, workspace_members, licenses.

- [ ] `client.ts`: `createClient` de `@libsql/client` leyendo `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN`, `drizzle(client, { schema })`.
- [ ] `schema.ts`: tablas SQLite. Better Auth core con columnas documentadas (id text pk, timestamps integer mode timestamp, booleans integer mode boolean). Custom:
  - `workspaces`: id, name, slug (unique), ownerId→users.id, createdAt.
  - `workspace_members`: id, workspaceId→workspaces.id, userId→users.id, role, createdAt (unique workspaceId+userId).
  - `licenses`: id, workspaceId→workspaces.id, productSlug, plan, status, expiresAt, createdAt.
- [ ] Verificar nombres plurales consistentes (Better Auth `usePlural: true`).

## Task 4: Better Auth

**Files:** Create `src/lib/auth/index.ts`

- [ ] `betterAuth({ database: drizzleAdapter(db, { provider: "sqlite", usePlural: true, schema }), secret: BETTER_AUTH_SECRET, baseURL: BETTER_AUTH_URL, emailAndPassword: { enabled: true } })`.
- [ ] Verificar import paths reales del paquete instalado antes de fijar (`better-auth`, `better-auth/adapters/drizzle`).

## Task 5: drizzle.config.ts + migrations

**Files:** Create `drizzle.config.ts`, dir `drizzle/`

- [ ] `defineConfig({ schema, out: "./drizzle", dialect: "turso", dbCredentials })` con dotenv y fallback que permita `generate` sin credenciales reales.
- [ ] `npx drizzle-kit generate` → debe crear SQL en `drizzle/`.
- [ ] Verificar: existe al menos un `.sql` en `drizzle/`.

## Task 6: Middleware mínimo

**Files:** Modify `src/middleware.ts`

- [ ] Quitar import/lógica Supabase. Dejar `matcher: ["/dashboard/:path*"]` + passthrough `NextResponse.next()`. Comentario: gating real con Better Auth en Fase 1B.

## Task 7: Neutralizar 4 páginas (mínimo)

**Files:** Modify `src/app/(auth)/signup/page.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/(app)/dashboard/page.tsx`, `src/app/(app)/dashboard/layout.tsx`

- [ ] signup/login: quitar `createClient` + `useRouter`; handler valida email y muestra mensaje honesto "acceso muy pronto"; conservar JSX y `AuthShell`.
- [ ] dashboard/page: quitar `createClient`; logout solo `router.push("/login")`; subtítulo honesto (no "Cargando" permanente).
- [ ] dashboard/layout: quitar `createClient` + `redirect` + check de sesión; render directo del shell. Comentario: gating en Fase 1B.
- [ ] verify/page: no toca Supabase (solo importa AuthShell) → sin cambios.

## Task 8: setup-turso.sh

**Files:** Create `scripts/setup-turso.sh`

- [ ] Validación estricta: `TURSO_DATABASE_URL` empieza por `libsql://`; `TURSO_AUTH_TOKEN` no vacío y >50 chars; `BETTER_AUTH_SECRET` autogenerado con `openssl rand -base64 32`; `BETTER_AUTH_URL` hardcoded `https://iaflashelite-web.vercel.app`.
- [ ] Si falla validación → abortar SIN tocar Vercel.
- [ ] Borrar de Vercel (prod+preview+dev): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Añadir las 4 nuevas a prod+preview+dev.
- [ ] Preguntar al final si lanzar redeploy.
- [ ] `chmod +x`.

## Task 9: .env.example

**Files:** Modify `.env.example`

- [ ] Añadir bloque Kenvo Cloud con `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. No tocar lo existente.

## Task 10: Verificación final

- [ ] `npx tsc --noEmit` → PASS.
- [ ] `npx biome check src/` → PASS (o solo warnings preexistentes).
- [ ] `git diff --check` → limpio.
- [ ] grep secretos en diff → nada real.
- [ ] `ls src/app/kenvo` → intacto.
- [ ] `git status --short`.
