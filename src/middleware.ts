import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

// Gate de /dashboard/*: comprobación optimista de la cookie de sesión (sin
// llamada a DB en el edge). La validación real de la sesión la hace el layout
// del dashboard con auth.api.getSession.
// Nota Next 16: `middleware` está deprecado a favor de `proxy` (sigue soportado);
// migración pendiente.
export function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
