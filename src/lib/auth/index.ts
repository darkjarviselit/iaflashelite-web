import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import { sendEmail } from "@/lib/email";
import { getMagicLinkEmail } from "@/lib/email-templates/kenvo-cloud-magic-link";

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	secret: process.env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "sqlite",
		usePlural: true,
		schema,
	}),
	plugins: [
		magicLink({
			// Reusa el transport de src/lib/email.ts (sendEmail) — mismo SMTP Gmail
			// que el resto del proyecto. Si el envío falla, se lanza para que Better
			// Auth lo propague al cliente (signIn.magicLink devuelve error).
			sendMagicLink: async ({ email, url }) => {
				const { subject, html } = getMagicLinkEmail({ url });
				const sent = await sendEmail({ to: email, subject, html });
				if (!sent) {
					throw new Error("No se pudo enviar el email de acceso (magic link).");
				}
			},
		}),
		// nextCookies debe ir el ÚLTIMO: aplica los set-cookie de Better Auth en
		// server actions y route handlers de Next.
		nextCookies(),
	],
	databaseHooks: {
		user: {
			create: {
				// Al registrarse un usuario nuevo se crea su workspace por defecto y
				// se le asigna como owner. Base multi-tenant de Kenvo Cloud.
				after: async (user) => {
					const now = new Date();
					const workspaceId = randomUUID();
					await db.insert(schema.workspaces).values({
						id: workspaceId,
						name: "Mi workspace",
						slug: `ws-${user.id}`,
						ownerId: user.id,
						createdAt: now,
					});
					await db.insert(schema.workspaceMembers).values({
						id: randomUUID(),
						workspaceId,
						userId: user.id,
						role: "owner",
						createdAt: now,
					});
				},
			},
		},
	},
});
