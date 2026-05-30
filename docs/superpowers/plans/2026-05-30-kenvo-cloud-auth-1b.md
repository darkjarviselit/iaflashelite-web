# Kenvo Cloud Auth End-to-End (Fase 1B) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline). Pasos con checkbox.

**Goal:** Cablear Better Auth con magic link por email, callback, dashboard protegido y auto-creación de workspace, reutilizando el SMTP Gmail existente (sin tocar email.ts).

**Architecture:** Better Auth (magicLink plugin) genera y valida tokens; el envío usa un transporter nodemailer+Gmail propio en `auth/index.ts` (mismas env `GMAIL_*`, decisión de Oscar: duplicar transport, no tocar email.ts). `databaseHooks.user.create.after` crea workspace + member (owner). Catch-all `/api/auth/[...all]`. Cliente React con `magicLinkClient`. Dashboard server-side con `auth.api.getSession`; middleware con `getSessionCookie` (optimista). `nextCookies()` último para set-cookie en server actions.

**Tech Stack:** better-auth 1.6.12 · drizzle-orm · @libsql/client · nodemailer · Next 16 App Router.

**Sin tests automatizados:** repo sin test runner (añadirlo = dep nueva, prohibida). Verificación: tsc + biome + `next build` (con env placeholder) + instrucciones runtime para Oscar (no puedo deployar ni tengo secrets reales → la parte e2e será PARCIAL).

**Decisiones:**
- Transport: duplicar nodemailer+Gmail en `auth/index.ts` (aprobado por Oscar).
- Email template: HTML string (no React Email en el repo; añadirlo sería dep nueva). Archivo en `email-templates/kenvo-cloud-magic-link.tsx` según scope.
- `verify` y dashboard: ver tareas. Logout via server action + `nextCookies`.

---

## Task 1: auth/index.ts — magicLink + transport + hook
**Files:** Modify `src/lib/auth/index.ts`
- [ ] Transporter Gmail lazy (env `GMAIL_USER`/`GMAIL_APP_PASSWORD`), `sendMagicLinkEmail(to,url)` usando template.
- [ ] `plugins: [magicLink({ sendMagicLink: async ({email,url}) => sendMagicLinkEmail(email,url) }), nextCookies()]`.
- [ ] `databaseHooks.user.create.after(user)`: insert `workspaces` (name "Mi workspace", slug `ws-${user.id}`, ownerId) + `workspaceMembers` (role "owner"), `randomUUID()` ids, `new Date()`.
- [ ] Quitar `emailAndPassword` (magic link only).

## Task 2: email template
**Files:** Create `src/lib/email-templates/kenvo-cloud-magic-link.tsx`
- [ ] `getMagicLinkEmail({url}): {subject, html}` — HTML inline on-brand (header cyan #00E5FF, badge "Acceso fundador", CTA → url, fallback link, nota expiración). Sin deps.

## Task 3: catch-all handler
**Files:** Create `src/app/api/auth/[...all]/route.ts`
- [ ] `export const { GET, POST } = toNextJsHandler(auth)`.

## Task 4: auth client
**Files:** Create `src/lib/auth/client.ts`
- [ ] `createAuthClient({ plugins: [magicLinkClient()] })`; export `authClient`.

## Task 5: signup
**Files:** Modify `src/app/(auth)/signup/page.tsx`
- [ ] Client: valida email → `authClient.signIn.magicLink({email, callbackURL:"/dashboard"})` → `router.push("/verify?email=…")`. Mantener export `AuthShell`.

## Task 6: login
**Files:** Modify `src/app/(auth)/login/page.tsx`
- [ ] Igual que signup, copy de login, importa `AuthShell` de ../signup/page.

## Task 7: verify
**Files:** Modify `src/app/(auth)/verify/page.tsx`
- [ ] Client: lee `email` de `window.location.search` (evita Suspense de useSearchParams); muestra "te enviamos un enlace a {email}" + botón reenviar (`signIn.magicLink`).

## Task 8: dashboard layout (gate)
**Files:** Modify `src/app/(app)/dashboard/layout.tsx`
- [ ] Server, `force-dynamic`: `auth.api.getSession({headers: await headers()})`; si no, `redirect("/login")`. Mantener shell nav.

## Task 9: dashboard page
**Files:** Modify `src/app/(app)/dashboard/page.tsx`
- [ ] Server, `force-dynamic`: session + query workspace (join member→workspace por userId). Render email + workspace + logout (server action `auth.api.signOut` + redirect).

## Task 10: middleware
**Files:** Modify `src/middleware.ts`
- [ ] `getSessionCookie(request)`; si falta → redirect `/login`. matcher `["/dashboard/:path*"]`.

## Task 11: Validación
- [ ] `tsc --noEmit` PASS.
- [ ] `biome check` sobre archivos tocados PASS.
- [ ] `next build` con env placeholder PASS.
- [ ] `git diff --check`, grep secretos, Kenvo intacto, `email.ts` sin cambios.
- [ ] Runtime e2e → PARCIAL (no deploy/secrets): instrucciones para Oscar.
