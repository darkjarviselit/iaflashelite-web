import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Config de drizzle-kit para Kenvo Cloud (Turso / libSQL).
// `generate` no necesita credenciales reales: el fallback file: permite generar
// las migrations en local sin tocar Turso. Para `push`/`migrate`, exporta
// TURSO_DATABASE_URL y TURSO_AUTH_TOKEN (las inyecta scripts/setup-turso.sh).
export default defineConfig({
	schema: "./src/lib/db/schema.ts",
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL ?? "file:./.drizzle/local.db",
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
});
