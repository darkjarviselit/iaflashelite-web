# iaflashelite.com — Landing Page

Landing oficial de **IA Flash Elite**. Captación de leads + presentación del ecosistema GiruIA (Giris, Giru, Venom).

## Stack

Next.js 16 (App Router + Turbopack) · React 19 · TypeScript 5 · Tailwind v4 · shadcn (`base-nova`) · framer-motion · Biome

## Desarrollo

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

### Variables de entorno

- `GIRIS_AGENT_URL` — endpoint público de `giris-agent` (recibe leads vía `POST /leads`). Fallback en dev: `http://localhost:5318`.

Copia `.env.example` a `.env.local` y rellena.

## Estructura

```
src/
├── app/                   App Router pages + /api/contact endpoint + not-found
├── components/
│   ├── brand/             Logo + mascota Flash
│   ├── layout/            Header, Footer
│   ├── sections/          Secciones de la home (hero, services, faq, etc.)
│   └── ui/                Primitivos (button, badge, section-label)
└── lib/                   constants (SERVICES, FAQS, NAV…) + utils
```

## Endpoints

- `POST /api/contact` — recibe el formulario de `/contacto`. Aplica honeypot + rate-limit (5 req / 10 min / IP) y reenvía al backend Giris. Si Giris cae, el lead se pierde silenciosamente (mejora pendiente).

## Deploy

Vercel — push a `main` dispara deploy a producción automáticamente. Ver [`DEPLOY.md`](./DEPLOY.md) para configuración inicial, DNS y variables.

## Notas

- Next.js 16 introduce breaking changes; antes de tocar APIs ver `node_modules/next/dist/docs/` (ver `AGENTS.md`).
- Formato y lint con Biome: `npx biome check src/`.
