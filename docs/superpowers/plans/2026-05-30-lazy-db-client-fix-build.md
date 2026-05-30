# Lazy DB Client + Limpieza Scripts Supabase — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Que `npm run build` pase en entorno limpio (sin `TURSO_DATABASE_URL`) difiriendo la inicialización del cliente Turso a runtime, y eliminar 2 scripts Supabase obsoletos.

**Architecture:** `src/lib/db/client.ts` exporta `db` como un `Proxy` que crea el cliente libSQL/Drizzle real en el **primer acceso a una propiedad** (no al cargar el módulo). El throw por env ausente pasa de load-time a runtime. Cero cambios en los 2 consumidores (`auth/index.ts`, `dashboard/page.tsx`) — la API `import { db }` es idéntica.

**Tech Stack:** TypeScript 5 strict, `@libsql/client`, `drizzle-orm/libsql`, Next.js 16.2.6 (webpack build).

---

### Task 1: Refactor `db` a Proxy lazy

**Files:**
- Modify: `src/lib/db/client.ts` (reescritura completa, mismo export `db`)

- [ ] **Step 1: Reescribir client.ts**

```typescript
import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Cliente de DB de Kenvo Cloud. SOLO servidor (Turso/libSQL + Drizzle).
// Credenciales inyectadas en Vercel con scripts/setup-turso.sh.
//
// Inicialización LAZY vía Proxy: el cliente real se crea en el PRIMER acceso a
// una propiedad de `db`, no al cargar el módulo. Así `next build` puede
// recolectar las rutas que importan `db` (p.ej. /api/auth/[...all]) sin
// TURSO_DATABASE_URL presente; el error por env ausente solo se lanza en
// runtime, al ejecutar la primera consulta.

type KenvoDatabase = LibSQLDatabase<typeof schema>;

let cached: KenvoDatabase | undefined;

function getDb(): KenvoDatabase {
	if (cached) {
		return cached;
	}
	const url = process.env.TURSO_DATABASE_URL;
	if (!url) {
		throw new Error(
			"Falta TURSO_DATABASE_URL. Configura la DB de Turso (ver scripts/setup-turso.sh).",
		);
	}
	const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
	cached = drizzle(client, { schema });
	return cached;
}

export const db = new Proxy({} as KenvoDatabase, {
	get(_target, prop) {
		const instance = getDb();
		const value = Reflect.get(instance, prop, instance);
		return typeof value === "function" ? value.bind(instance) : value;
	},
});
```

- [ ] **Step 2: typecheck** — `npx tsc --noEmit` → PASS
- [ ] **Step 3: biome** — `npx biome check src/lib/db/client.ts` → sin errores

### Task 2: Borrar scripts Supabase obsoletos

**Files:**
- Delete: `scripts/apply-supabase-migration.sh`
- Delete: `scripts/setup-supabase-env.sh`

- [ ] **Step 1:** `rm scripts/apply-supabase-migration.sh scripts/setup-supabase-env.sh` (ambos untracked)

### Task 3: Verificación build en entorno limpio (la prueba de oro)

- [ ] **Step 1:** Mover `.env.local` → `.env.local.bak` (temporal, NO leer contenido)
- [ ] **Step 2:** `npm run build` → debe PASAR (antes fallaba con "Falta TURSO_DATABASE_URL")
- [ ] **Step 3:** Restaurar `.env.local.bak` → `.env.local` (SIEMPRE, incluso si build falla)
- [ ] **Step 4:** Confirmar Fase 1A+1B y Kenvo Local intactos (`git status`, `git diff --check`, grep secretos)
