import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";
import { solutions } from "@/lib/solutions";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaflashelite-web.vercel.app";

type ChangeFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

const STATIC_ROUTES: ReadonlyArray<{
	path: string;
	changeFrequency: ChangeFrequency;
	priority: number;
}> = [
	{ path: "/", changeFrequency: "weekly", priority: 1 },
	{ path: "/productos", changeFrequency: "weekly", priority: 0.9 },
	{ path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/servicios", changeFrequency: "weekly", priority: 0.9 },
	{ path: "/servicios-extra", changeFrequency: "monthly", priority: 0.6 },
	{ path: "/soluciones", changeFrequency: "weekly", priority: 0.9 },
	{ path: "/gestoria-local", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/seguridad", changeFrequency: "monthly", priority: 0.6 },
	{ path: "/casos", changeFrequency: "monthly", priority: 0.6 },
	{ path: "/academia", changeFrequency: "monthly", priority: 0.6 },
	{ path: "/academia/pack-arranque", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/academia/sistema-ia-pro", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/academia/primer-sistema-ia-vendible", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/sobre", changeFrequency: "yearly", priority: 0.5 },
	{ path: "/como-trabajamos", changeFrequency: "monthly", priority: 0.5 },
	{ path: "/como-verificar", changeFrequency: "monthly", priority: 0.5 },
	{ path: "/contacto", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/mundo-giruia", changeFrequency: "monthly", priority: 0.5 },
	{ path: "/legal/aviso-legal", changeFrequency: "yearly", priority: 0.3 },
	{ path: "/legal/privacidad", changeFrequency: "yearly", priority: 0.3 },
	{ path: "/legal/cookies", changeFrequency: "yearly", priority: 0.3 },
	{ path: "/legal/garantias", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
		url: `${SITE_URL}${route.path}`,
		lastModified,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));

	const productEntries: MetadataRoute.Sitemap = PRODUCTS.filter(
		(product) => product.status === "available",
	).map((product) => ({
		url: `${SITE_URL}/productos/${product.slug}`,
		lastModified,
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	const solutionEntries: MetadataRoute.Sitemap = solutions
		.filter((solution) => solution.slug !== "gestorias")
		.map((solution) => ({
			url: `${SITE_URL}/soluciones/${solution.slug}`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		}));

	return [...staticEntries, ...productEntries, ...solutionEntries];
}
