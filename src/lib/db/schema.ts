import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";

// === Better Auth core (usePlural: true en el adaptador Drizzle) ===
// Las KEYS de cada columna deben coincidir con los nombres de campo de Better
// Auth (camelCase). Los nombres de tabla son plurales a propósito; ver
// src/lib/auth/index.ts (usePlural: true).

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("emailVerified", { mode: "boolean" })
		.notNull()
		.default(false),
	image: text("image"),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = sqliteTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
	refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
		mode: "timestamp",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verifications = sqliteTable("verifications", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
	createdAt: integer("createdAt", { mode: "timestamp" }),
	updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// === Multi-tenancy de Kenvo Cloud ===

export const workspaces = sqliteTable("workspaces", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	ownerId: text("ownerId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const workspaceMembers = sqliteTable(
	"workspace_members",
	{
		id: text("id").primaryKey(),
		workspaceId: text("workspaceId")
			.notNull()
			.references(() => workspaces.id, { onDelete: "cascade" }),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").notNull().default("member"),
		createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	},
	(t) => [
		uniqueIndex("workspace_members_workspace_user_uq").on(
			t.workspaceId,
			t.userId,
		),
	],
);

// === Licencias de productos Kenvo (futuro) ===

export const licenses = sqliteTable("licenses", {
	id: text("id").primaryKey(),
	workspaceId: text("workspaceId")
		.notNull()
		.references(() => workspaces.id, { onDelete: "cascade" }),
	productSlug: text("productSlug").notNull(),
	plan: text("plan").notNull(),
	status: text("status").notNull().default("active"),
	expiresAt: integer("expiresAt", { mode: "timestamp" }),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});
