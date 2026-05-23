#!/usr/bin/env bash
set -euo pipefail

echo "GestorIA — Instalador Programa Piloto Privado"
echo

PACKAGE_NAME="gestorai-agent-0.8.0-rc9.tgz"
EXPECTED_SHA256="d1dabaa868ce19802afa7ef705f511084916a4d856634b402733c774fa5ef5c0"
INSTALL_DIR="/tmp/gestoria-install"

# When installed with "curl .../gestoria/install.sh | bash", Bash cannot
# reliably know the script URL. Override this with GESTORIA_BASE_URL if the
# deployment host differs.
BASE_URL="${GESTORIA_BASE_URL:-https://iaflashelite.com/gestoria}"

if ! command -v node >/dev/null 2>&1; then
  echo "Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
  exit 1
fi

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
  echo "Version actual detectada: $(node -v)"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm no esta disponible. Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl no esta disponible en este Mac. No se puede descargar GestorIA."
  exit 1
fi

if ! command -v shasum >/dev/null 2>&1; then
  echo "shasum no esta disponible en este Mac. No se puede verificar la descarga."
  exit 1
fi

echo "Node: $(node -v)"
echo "npm: $(npm -v)"
echo

rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

TARBALL="$INSTALL_DIR/$PACKAGE_NAME"
DOWNLOAD_URL="$BASE_URL/$PACKAGE_NAME"

echo "Descargando GestorIA desde:"
echo "$DOWNLOAD_URL"
curl -fsSL "$DOWNLOAD_URL" -o "$TARBALL"

ACTUAL_SHA256="$(shasum -a 256 "$TARBALL" | awk '{print $1}')"
if [ "$ACTUAL_SHA256" != "$EXPECTED_SHA256" ]; then
  echo "La verificacion SHA256 ha fallado."
  echo "Esperado: $EXPECTED_SHA256"
  echo "Recibido: $ACTUAL_SHA256"
  exit 1
fi

echo
echo "Instalando GestorIA..."
npm install -g "$TARBALL"

echo
echo "Verificando instalacion..."
gestoria help

echo
echo "Ejecutando diagnostico inicial..."
gestoria doctor || true

echo
echo "Instalacion completada."
echo
echo "Siguiente paso:"
echo "gestoria setup"
echo "gestoria start"
