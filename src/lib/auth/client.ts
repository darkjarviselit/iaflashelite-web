import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Cliente de Better Auth para componentes React. La baseURL se infiere del
// origin actual (/api/auth) en el navegador, no necesita env pública.
export const authClient = createAuthClient({
	plugins: [magicLinkClient()],
});
