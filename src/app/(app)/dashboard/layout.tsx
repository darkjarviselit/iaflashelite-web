import { Brain, CreditCard, FileText, MessageSquare } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const NAV: ReadonlyArray<{
	label: string;
	icon: typeof Brain;
	soon?: boolean;
}> = [
	{ label: "Chat", icon: MessageSquare },
	{ label: "Documentos", icon: FileText, soon: true },
	{ label: "Facturación", icon: CreditCard, soon: true },
];

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/login");

	return (
		<div className="flex min-h-screen bg-onyx text-paper">
			<aside className="hidden w-60 shrink-0 flex-col border-r border-border-dark bg-white/[0.02] p-5 sm:flex">
				<div className="flex items-center gap-2 px-1">
					<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-flash/15 text-flash">
						<Brain className="h-4 w-4" />
					</span>
					<span className="text-sm font-black tracking-tight text-flash">
						Kenvo Cloud
					</span>
				</div>
				<nav className="mt-8 flex flex-col gap-1">
					{NAV.map(({ label, icon: Icon, soon }) => (
						<span
							key={label}
							className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
								soon ? "text-text-muted" : "bg-white/[0.05] text-paper"
							}`}
						>
							<Icon className="h-4 w-4" />
							{label}
							{soon && (
								<span className="ml-auto text-[10px] uppercase tracking-wide text-text-muted">
									pronto
								</span>
							)}
						</span>
					))}
				</nav>
			</aside>
			<div className="min-w-0 flex-1">{children}</div>
		</div>
	);
}
