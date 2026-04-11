#!/usr/bin/env bash

set -e

echo "📦 Construyendo el sitio..."
npm run build

echo "🚀 Desplegando a GitHub Pages..."
npx gh-pages -d dist

echo "✅ Deploy completado!"