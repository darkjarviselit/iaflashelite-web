$ErrorActionPreference = "Stop"

Write-Host "GestorIA - Instalador Programa Piloto Privado para Windows"
Write-Host ""

$BaseUrl = $env:GESTORIA_BASE_URL
if ([string]::IsNullOrWhiteSpace($BaseUrl)) {
    $BaseUrl = "https://iaflashelite-web.vercel.app/gestoria"
}
$BaseUrl = $BaseUrl.TrimEnd("/")

$PackageName = "gestorai-agent-0.8.0-rc9.tgz"
$ExpectedSha256 = "d1dabaa868ce19802afa7ef705f511084916a4d856634b402733c774fa5ef5c0"
$TempDir = Join-Path $env:TEMP "gestoria-install"
$TarballPath = Join-Path $TempDir $PackageName
$DownloadUrl = "$BaseUrl/$PackageName"

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
} catch {
    # PowerShell Core manages TLS without this setting.
}

try {
    $NodeVersion = (& node -v)
} catch {
    Write-Host "Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
    exit 1
}

$NodeMajorText = (& node -p "process.versions.node.split('.')[0]")
$NodeMajor = 0
if (-not [int]::TryParse($NodeMajorText, [ref]$NodeMajor)) {
    Write-Host "No he podido detectar la version de Node.js. Instala Node.js 20 o superior desde https://nodejs.org."
    exit 1
}

if ($NodeMajor -lt 20) {
    Write-Host "Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
    Write-Host "Version actual detectada: $NodeVersion"
    exit 1
}

if ($NodeMajor -ge 24) {
    Write-Host "Aviso: para Windows recomendamos Node.js LTS 20 o 22."
    Write-Host "Si la instalacion falla por SQLite, instala Node LTS y vuelve a ejecutar este instalador."
    Write-Host ""
}

try {
    $NpmVersion = (& npm -v)
} catch {
    Write-Host "npm no esta disponible. Instala Node.js 20 o superior desde https://nodejs.org y vuelve a ejecutar este instalador."
    exit 1
}

Write-Host "Node: $NodeVersion"
Write-Host "npm: $NpmVersion"
Write-Host ""

if (Test-Path $TempDir) {
    Remove-Item -Recurse -Force $TempDir
}
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

Write-Host "Descargando GestorIA desde:"
Write-Host $DownloadUrl
try {
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $TarballPath -UseBasicParsing
} catch {
    Write-Host "No se pudo descargar GestorIA."
    Write-Host $_.Exception.Message
    exit 1
}

$ActualSha256 = (Get-FileHash -Algorithm SHA256 $TarballPath).Hash.ToLowerInvariant()
if ($ActualSha256 -ne $ExpectedSha256) {
    if (Test-Path $TarballPath) {
        Remove-Item -Force $TarballPath
    }
    Write-Host "La verificacion SHA256 ha fallado."
    Write-Host "Esperado: $ExpectedSha256"
    Write-Host "Recibido: $ActualSha256"
    exit 1
}

Write-Host ""
Write-Host "Instalando GestorIA..."
& npm install -g "$TarballPath"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "npm no pudo instalar GestorIA globalmente."
    Write-Host "Cierra PowerShell y vuelve a abrirlo, o revisa permisos de npm global."
    Write-Host "Tambien puedes comprobar la ruta global con: npm config get prefix"
    exit 1
}

Write-Host ""
Write-Host "Verificando instalacion..."
try {
    & gestoria help
    if ($LASTEXITCODE -ne 0) {
        throw "gestoria help devolvio codigo $LASTEXITCODE"
    }
} catch {
    Write-Host "GestorIA se instalo, pero el comando gestoria no aparece en esta terminal."
    Write-Host "Cierra y abre una nueva Terminal PowerShell y ejecuta: gestoria help"
    exit 1
}

Write-Host ""
Write-Host "Ejecutando diagnostico inicial..."
try {
    & gestoria doctor
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Doctor devolvio avisos. Puedes continuar con la configuracion."
    }
} catch {
    Write-Host "Doctor devolvio avisos. Puedes continuar con la configuracion."
}

Write-Host ""
Write-Host "Instalacion completada."
Write-Host ""
Write-Host "Siguiente paso:"
Write-Host "gestoria setup"
Write-Host "gestoria config ai"
Write-Host "gestoria config telegram"
Write-Host "gestoria start"

