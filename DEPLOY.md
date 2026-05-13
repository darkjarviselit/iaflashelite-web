# Deploy — iaflashelite-web a Vercel

Guía de despliegue para Oscar. Pasos exactos, en orden.

## 0. Prerrequisitos

- Cuenta de Vercel (gratuita): https://vercel.com/signup
- giris-agent **accesible públicamente** desde Vercel. Decide antes:
  - **Cloudflare Tunnel** (recomendado, gratis, dominio estable): `cloudflared tunnel`
  - **ngrok** (rápido, URL cambia entre reinicios en plan free)
  - **VPS** (DigitalOcean / Hetzner / Railway) con dominio propio

Sin esto el formulario `/contacto` no podrá enviar leads a giris-agent.

## 1. Vincular el proyecto (una sola vez)

```bash
cd ~/Desktop/iaflashelite-web
npx vercel login
npx vercel link
```

Cuando pregunte:
- **Set up and deploy?** → No (todavía no — primero variables)
- O si dejas que cree el proyecto: continúa al paso 2 y vuelve aquí cuando termine

## 2. Configurar la variable de entorno

Cuando ya tengas la URL pública de giris-agent (ej. `https://giris.tu-tunnel.trycloudflare.com`):

```bash
# Producción
echo "https://giris.tu-tunnel.trycloudflare.com" | npx vercel env add GIRIS_AGENT_URL production

# Preview (deploys de PRs / ramas)
echo "https://giris.tu-tunnel.trycloudflare.com" | npx vercel env add GIRIS_AGENT_URL preview

# Development (si usas `vercel dev` local)
echo "http://localhost:5318" | npx vercel env add GIRIS_AGENT_URL development
```

Verificar:
```bash
npx vercel env ls
```

## 3. Primer deploy (preview)

```bash
npx vercel
```

Te dará una URL tipo `https://iaflashelite-web-xxx.vercel.app`. **Prueba el formulario** desde esa URL antes de ir a producción.

## 4. Deploy a producción

```bash
npx vercel --prod
```

Quedará en el dominio `*.vercel.app` que Vercel asigna por defecto.

## 5. Conectar el dominio iaflashelite.com

**Importante**: ahora mismo `iaflashelite.com` apunta a **Hostinger** y devuelve un 404 del website builder. Hay que mover los registros DNS a Vercel.

1. Dashboard Vercel → Project → Settings → **Domains**
2. Add domain: `iaflashelite.com` y `www.iaflashelite.com`
3. Vercel te dará dos opciones:
   - **A**: cambiar nameservers a los de Vercel (recomendado, gestiona todo)
   - **B**: añadir un registro `A` apuntando a `76.76.21.21` + `CNAME` para `www`
4. Aplica los cambios en el panel de Hostinger (DNS Zone Editor)
5. Espera propagación DNS (de minutos a 24h)
6. Vercel emite SSL automáticamente (resuelve el error TLS actual)

Verifica con:
```bash
dig iaflashelite.com +short
curl -I https://iaflashelite.com
```

## 6. Verificación final

Con el dominio ya apuntando a Vercel:

```bash
# 1. La home carga
curl -sI https://iaflashelite.com | head -5
# Esperado: HTTP/2 200, server algo de Vercel

# 2. El formulario envía leads end-to-end
curl -sX POST https://iaflashelite.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke","email":"smoke@test.com","message":"Test post-deploy"}'
# Esperado: {"ok":true}

# 3. Confirma que giris-agent lo recibió
sqlite3 ~/Desktop/giris-agent/.giris/memory.db \
  "SELECT id, name, email, created_at FROM leads ORDER BY created_at DESC LIMIT 1;"
```

Si el paso 2 devuelve `{"ok":true}` pero el paso 3 no muestra el lead → revisa `GIRIS_AGENT_URL` en Vercel y que el tunnel/VPS de giris-agent siga arriba.

## 7. Actualizaciones futuras

Cualquier push a `main` dispara deploy automático a producción. Push a otras ramas → preview deploy.

```bash
git push origin main  # deploy automático a iaflashelite.com
```

## Notas

- **No commitear `.env`** — está en `.gitignore`. Solo `.env.example` (vacío) entra al repo.
- **`vercel.json`** está fijado a region `cdg1` (París) por latencia óptima desde España.
- **`giris-agent` no se deploya con esto** — vive en tu máquina. Esta guía solo cubre la web pública.
