echo "🚀 Instalando dependencias del proyecto Campaign Manager..."
echo ""

# Root config
echo "📦 Instalando root-config..."
cd root-config && npm install
cd ..

# Home MFE
echo "📦 Instalando home-mfe..."
cd home-mfe && npm install
cd ..

# Campaigns MFE
echo "📦 Instalando campaigns-mfe..."
cd campaigns-mfe && npm install
cd ..

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "Para iniciar el proyecto ejecuta:"
echo "npm run start:all"