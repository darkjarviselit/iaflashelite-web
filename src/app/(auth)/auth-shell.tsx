import Link from "next/link";

// Shell visual compartido de las páginas de auth (signup/login/verify).
// Vive fuera de page.tsx porque Next App Router no permite exports extra (no
// reservados) en archivos de página.
export function AuthShell({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-onyx px-6 py-20 text-paper">
			<div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
			<div
				className="absolute inset-x-0 top-0 h-[480px] pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0) 74%)",
				}}
				aria-hidden
			/>
			<div className="relative w-full max-w-md">
				<Link
					href="/"
					className="mb-8 block text-center text-lg font-black tracking-tight text-flash"
				>
					Kenvo Cloud
				</Link>
				<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur">
					<h1 className="text-2xl font-bold tracking-tight text-paper">
						{title}
					</h1>
					<p className="mt-2 text-sm leading-6 text-text-secondary">
						{subtitle}
					</p>
					<div className="mt-6">{children}</div>
				</div>
			</div>
		</main>
	);
}
