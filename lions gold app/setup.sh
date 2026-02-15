#!/bin/bash

echo "🦁 Iniciando instalación de LA TABERNA LIONS-GOLD..."

# 1. Crear estructura de carpetas
echo "📁 Creando estructura de directorios..."
mkdir -p src/app/market src/app/register src/app/dashboard src/app/blacklist src/app/terminos
mkdir -p src/lib src/components prisma

# 2. Verificar que Docker esté instalado
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Error: Docker no está instalado. Por favor, instálalo primero." >&2
  exit 1
fi

# 3. Crear archivo de variables de entorno si no existe
if [ ! -f .env ]; then
  echo "📄 Creando archivo .env..."
  echo "DATABASE_URL=\"postgresql://admin:lions_gold_2026@db:5432/taberna_db\"" > .env
  echo "DISCORD_WEBHOOK_URL=\"TU_LINK_AQUI\"" >> .env
  echo "✅ Archivo .env creado. ¡Recuerda poner tu link de Discord después!"
fi

# 4. Construir y levantar los contenedores
echo "🐳 Encendiendo motores (Docker)..."
docker compose up -d

echo "-------------------------------------------------------"
echo "✅ ¡INSTALACIÓN COMPLETADA EXITOSAMENTE!"
echo "🌐 La Taberna está en línea en: http://localhost:3000"
echo "📦 Tu Git Privado (Forgejo) está en: http://localhost:8080"
echo "-------------------------------------------------------"
echo "Nota: El cobro automático del 0.06% está activo en el motor."
