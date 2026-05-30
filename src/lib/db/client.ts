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
