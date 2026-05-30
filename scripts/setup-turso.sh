#!/usr/bin/env bash
#
# setup-turso.sh — Inyecta las env vars de Kenvo Cloud (Turso + Better Auth)
# en Vercel (production + preview + development) y limpia las viejas de Supabase.
#
# Reglas:
#   - Validación ESTRICTA antes de tocar Vercel. Si algo falla, aborta SIN tocar nada.
#   - No imprime el token ni el secret en pantalla.
#   - No escribe ningún .env local.
#   - Lo ejecuta Oscar manualmente: bash scripts/setup-turso.sh
#
set -euo pipefail

BETTER_AUTH_URL="https://iaflashelite-web.vercel.app"
ENVIRONMENTS=("production" "preview" "development")
OLD_SUPABASE_VARS=(
	"NEXT_PUBLIC_SUPABASE_URL"
	"NEXT_PUBLIC_SUPABASE_ANON_KEY"
	"SUPABASE_SERVICE_ROLE_KEY"
)

# --- prechecks ---
command -v vercel >/dev/null 2>&1 || {
	echo "❌ Falta la CLI de Vercel. Instálala con: npm i -g vercel"
	exit 1
}
command -v openssl >/dev/null 2>&1 || {
	echo "❌ Falta openssl (necesario para generar BETTER_AUTH_SECRET)."
	exit 1
}
if [[ ! -f ".vercel/project.json" ]]; then
	echo "❌ Proyecto no vinculado a Vercel. Ejecuta primero: vercel link"
	exit 1
fi

# --- inputs ---
echo "Pega los datos de la DB de Turso (no se mostrarán en claro los secretos)."
read -rp "TURSO_DATABASE_URL (libsql://...): " TURSO_DATABASE_URL
read -rsp "TURSO_AUTH_TOKEN: " TURSO_AUTH_TOKEN
echo

# --- validación estricta (sin tocar Vercel) ---
if [[ "${TURSO_DATABASE_URL}" != libsql://* ]]; then
	echo "❌ TURSO_DATABASE_URL debe empezar por 'libsql://'. Abortado SIN tocar Vercel."
	exit 1
fi
if [[ -z "${TURSO_AUTH_TOKEN}" ]]; then
	echo "❌ TURSO_AUTH_TOKEN vacío. Abortado SIN tocar Vercel."
	exit 1
fi
if [[ "${#TURSO_AUTH_TOKEN}" -lt 50 ]]; then
	echo "❌ TURSO_AUTH_TOKEN demasiado corto (<50 chars). ¿Seguro que es el token? Abortado SIN tocar Vercel."
	exit 1
fi

BETTER_AUTH_SECRET="$(openssl rand -base64 32)"
if [[ -z "${BETTER_AUTH_SECRET}" ]]; then
	echo "❌ No se pudo generar BETTER_AUTH_SECRET con openssl. Abortado SIN tocar Vercel."
	exit 1
fi

echo "✅ Validaciones OK. Aplicando a Vercel: ${ENVIRONMENTS[*]}"

# --- borrar las viejas de Supabase (idempotente: ignora si no existen) ---
echo "→ Eliminando variables Supabase obsoletas…"
for env in "${ENVIRONMENTS[@]}"; do
	for var in "${OLD_SUPABASE_VARS[@]}"; do
		vercel env rm "${var}" "${env}" -y >/dev/null 2>&1 || true
	done
done

# --- añadir las 4 nuevas ---
add_var() {
	local name="$1"
	local value="$2"
	for env in "${ENVIRONMENTS[@]}"; do
		# vercel env add lee el valor desde stdin (modo no interactivo).
		printf '%s' "${value}" | vercel env add "${name}" "${env}" >/dev/null
	done
	echo "  ✓ ${name} (production+preview+development)"
}

echo "→ Añadiendo variables de Kenvo Cloud…"
add_var "TURSO_DATABASE_URL" "${TURSO_DATABASE_URL}"
add_var "TURSO_AUTH_TOKEN" "${TURSO_AUTH_TOKEN}"
add_var "BETTER_AUTH_SECRET" "${BETTER_AUTH_SECRET}"
add_var "BETTER_AUTH_URL" "${BETTER_AUTH_URL}"

echo "✅ 4 variables añadidas. BETTER_AUTH_SECRET se generó y guardó solo en Vercel (no se ha impreso)."

# --- redeploy opcional ---
read -rp "¿Lanzar redeploy a producción ahora? (vercel --prod) [y/N]: " DO_DEPLOY
if [[ "${DO_DEPLOY}" == "y" || "${DO_DEPLOY}" == "Y" ]]; then
	vercel --prod
else
	echo "Redeploy NO lanzado. Cuando quieras: vercel --prod"
fi
