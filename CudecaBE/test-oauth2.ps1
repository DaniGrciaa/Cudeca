# Script de prueba para OAuth2
# Este script verifica que OAuth2 con Google esté configurado correctamente

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  PRUEBA DE OAUTH2 CON GOOGLE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar que el backend esté corriendo
Write-Host "1. Verificando que el backend esté activo..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/test/oauth2-status" -Method Get -TimeoutSec 5
    Write-Host "   ✓ Backend está activo" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "   ✗ Error: El backend no está activo en http://localhost:8080" -ForegroundColor Red
    Write-Host "   Por favor, inicia el backend con: .\mvnw.cmd spring-boot:run" -ForegroundColor Yellow
    exit 1
}

# 2. Mostrar información de OAuth2
Write-Host "2. Información de OAuth2:" -ForegroundColor Yellow
Write-Host "   OAuth2 habilitado: $($response.oauth2Enabled)" -ForegroundColor Green
Write-Host "   Mensaje: $($response.message)" -ForegroundColor Green
Write-Host ""

# 3. Instrucciones para probar
Write-Host "3. URL para iniciar el login con Google:" -ForegroundColor Yellow
Write-Host "   $($response.googleLoginUrl)" -ForegroundColor Cyan
Write-Host ""

Write-Host "4. Pasos para probar manualmente:" -ForegroundColor Yellow
Write-Host "   a) Abre tu navegador" -ForegroundColor White
Write-Host "   b) Ve a: http://localhost:8080/oauth2/authorization/google" -ForegroundColor White
Write-Host "   c) Autoriza la aplicación con tu cuenta de Google" -ForegroundColor White
Write-Host "   d) Observa la redirección con los tokens en la URL" -ForegroundColor White
Write-Host ""

Write-Host "5. Instrucciones completas:" -ForegroundColor Yellow
foreach ($key in $response.instructions.PSObject.Properties.Name) {
    Write-Host "   $key`: $($response.instructions.$key)" -ForegroundColor White
}
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "¿Deseas abrir el navegador para probar ahora? (S/N)" -ForegroundColor Yellow
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s" -or $respuesta -eq "Y" -or $respuesta -eq "y") {
    Write-Host "Abriendo navegador..." -ForegroundColor Green
    Start-Process "http://localhost:8080/oauth2/authorization/google"
    Write-Host ""
    Write-Host "✓ Navegador abierto. Sigue las instrucciones en la pantalla." -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "Puedes probar manualmente copiando esta URL en tu navegador:" -ForegroundColor Yellow
    Write-Host "http://localhost:8080/oauth2/authorization/google" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

