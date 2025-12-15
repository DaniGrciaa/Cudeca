# Script para subir código a GitHub - Railway Deploy
# Ejecutar desde PowerShell en la carpeta del proyecto

Write-Host "🚀 HELPER: Subir código a GitHub para Railway" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si estamos en un repositorio Git
$isGitRepo = Test-Path ".git"

if (-not $isGitRepo) {
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositorio inicializado" -ForegroundColor Green
} else {
    Write-Host "✅ Ya es un repositorio Git" -ForegroundColor Green
}

Write-Host ""

# Ver estado actual
Write-Host "📋 Estado actual del repositorio:" -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "📝 PASOS A SEGUIR:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Añadir archivos al staging:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host ""
Write-Host "2. Crear commit:" -ForegroundColor White
Write-Host "   git commit -m 'Preparar proyecto para Railway'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Crear repositorio en GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Blue
Write-Host ""
Write-Host "4. Conectar con el repositorio remoto:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/TU-USUARIO/CudecaBE.git" -ForegroundColor Gray
Write-Host "   (Reemplaza TU-USUARIO con tu usuario de GitHub)" -ForegroundColor DarkGray
Write-Host ""
Write-Host "5. Subir código:" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚡ COMANDO RÁPIDO (ejecuta todo de una vez):" -ForegroundColor Yellow
Write-Host ""
Write-Host "git add . ; git commit -m 'Preparar para Railway' ; git branch -M main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Luego añade el remote y push:" -ForegroundColor DarkGray
Write-Host "git remote add origin https://github.com/TU-USUARIO/CudecaBE.git ; git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 TIPS:" -ForegroundColor Yellow
Write-Host "- Si te pide autenticación, usa un Personal Access Token de GitHub" -ForegroundColor White
Write-Host "- GitHub > Settings > Developer settings > Personal access tokens" -ForegroundColor White
Write-Host "- Marca 'repo' al crear el token" -ForegroundColor White
Write-Host ""
Write-Host "¿Listo? ¡Vamos a GitHub! 🚀" -ForegroundColor Green

