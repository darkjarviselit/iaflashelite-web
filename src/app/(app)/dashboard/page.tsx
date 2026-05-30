import { eq } from "drizzle-orm";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { workspaceMembers, workspaces } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/login");

	const rows = await db
		.select({ name: workspaces.name })
		.from(workspaceMembers)
		.innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
		.where(eq(workspaceMembers.userId, session.user.id))
		.limit(1);
	const workspaceName = rows[0]?.name ?? "Tu workspace";

	async function logout() {
		"use server";
		await auth.api.signOut({ headers: await headers() });
		redirect("/login");
	}

	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-paper">
						Bienvenido a Kenvo Cloud
					</h1>
					<p className="mt-1 text-sm text-text-secondary">
						{session.user.email}
					</p>
				</div>
				<form action={logout}>
					<Button type="submit" variant="secondary" size="sm">
						<LogOut className="h-4 w-4" />
						Salir
					</Button>
				</form>
			</div>

			<div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
				<p className="text-xs uppercase tracking-wide text-text-muted">
					Workspace
				</p>
				<p className="mt-1 text-lg font-semibold text-paper">{workspaceName}</p>
				<p className="mt-4 text-sm leading-7 text-text-secondary">
					Tu workspace está listo. El chat con IA, los documentos y la
					facturación llegan en las próximas fases. De momento, esto confirma
					que tu cuenta y tu workspace se han creado correctamente.
				</p>
			</div>
		</div>
	);
}
