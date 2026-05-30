import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Catch-all de Better Auth: maneja /api/auth/* (magic-link, sign-out, session…).
export const { GET, POST } = toNextJsHandler(auth);
