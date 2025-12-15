# Script de Prueba - Sistema Inteligente OAuth2 Profile Management
# ================================================================

Write-Host "🧪 PRUEBAS DEL SISTEMA INTELIGENTE DE PERFILES OAUTH2" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8080"

Write-Host "📋 ESCENARIO 1: Completar Perfil de Usuario OAuth2" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "Prerequisito: El usuario debe haberse autenticado con Google/Facebook" -ForegroundColor Gray
Write-Host "y tener un token JWT válido" -ForegroundColor Gray
Write-Host ""

# Ejemplo de token (el usuario debe obtener esto después del login OAuth2)
$token = Read-Host "Ingresa tu token JWT (o presiona Enter para ver el ejemplo)"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host ""
    Write-Host "📖 EJEMPLO DE USO:" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. El usuario hace login con Google desde el frontend" -ForegroundColor White
    Write-Host "2. El backend redirige a: http://localhost:3000/oauth2/redirect?token=XXX&profileCompleted=false" -ForegroundColor White
    Write-Host "3. El frontend detecta profileCompleted=false" -ForegroundColor White
    Write-Host "4. El frontend muestra el formulario de completar perfil" -ForegroundColor White
    Write-Host "5. El usuario completa teléfono y dirección" -ForegroundColor White
    Write-Host "6. El frontend envía este request:" -ForegroundColor White
    Write-Host ""

    $exampleRequest = @{
        telefono = "123456789"
        nombre = "Juan García Completo"
        direcciones = @(
            @{
                calle = "Calle Principal"
                numero = "123"
                piso = "2"
                puerta = "A"
                codigoPostal = "28001"
                ciudad = "Madrid"
                provincia = "Madrid"
                pais = "España"
            }
        )
    } | ConvertTo-Json -Depth 10

    Write-Host "POST $baseUrl/api/usuarios/complete-profile" -ForegroundColor Cyan
    Write-Host "Authorization: Bearer {TOKEN_JWT}" -ForegroundColor Cyan
    Write-Host "Content-Type: application/json" -ForegroundColor Cyan
    Write-Host ""
    Write-Host $exampleRequest -ForegroundColor Gray
    Write-Host ""

    Write-Host "7. El backend actualiza el usuario y marca profileCompleted = true" -ForegroundColor White
    Write-Host "8. El frontend redirige al dashboard" -ForegroundColor White
    Write-Host ""

} else {
    Write-Host ""
    Write-Host "✅ Token recibido, enviando request para completar perfil..." -ForegroundColor Green
    Write-Host ""

    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $body = @{
        telefono = "123456789"
        nombre = "Juan García Completo"
        direcciones = @(
            @{
                calle = "Calle Principal"
                numero = "123"
                piso = "2"
                puerta = "A"
                codigoPostal = "28001"
                ciudad = "Madrid"
                provincia = "Madrid"
                pais = "España"
            },
            @{
                calle = "Avenida Secundaria"
                numero = "456"
                codigoPostal = "28002"
                ciudad = "Barcelona"
                provincia = "Barcelona"
                pais = "España"
            }
        )
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/usuarios/complete-profile" `
                                      -Method Post `
                                      -Headers $headers `
                                      -Body $body `
                                      -ErrorAction Stop

        Write-Host "✅ PERFIL COMPLETADO EXITOSAMENTE" -ForegroundColor Green
        Write-Host ""
        Write-Host "Datos del usuario:" -ForegroundColor Cyan
        $response | ConvertTo-Json -Depth 10 | Write-Host -ForegroundColor Gray
        Write-Host ""
        Write-Host "Profile Completed: $($response.profileCompleted)" -ForegroundColor $(if ($response.profileCompleted) { "Green" } else { "Red" })

    } catch {
        Write-Host "❌ ERROR:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🔍 VERIFICAR ESTADO DEL USUARIO" -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Yellow
Write-Host ""

if (![string]::IsNullOrWhiteSpace($token)) {
    Write-Host "Consultando información del usuario autenticado..." -ForegroundColor Gray
    Write-Host ""

    $headers = @{
        "Authorization" = "Bearer $token"
    }

    try {
        $meResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" `
                                        -Method Get `
                                        -Headers $headers `
                                        -ErrorAction Stop

        Write-Host "👤 Usuario Autenticado:" -ForegroundColor Cyan
        Write-Host "  ├─ ID: $($meResponse.id)" -ForegroundColor White
        Write-Host "  ├─ Nombre: $($meResponse.nombre)" -ForegroundColor White
        Write-Host "  ├─ Email: $($meResponse.email)" -ForegroundColor White
        Write-Host "  ├─ Provider: $($meResponse.provider)" -ForegroundColor White
        Write-Host "  ├─ Teléfono: $($meResponse.telefono)" -ForegroundColor White
        Write-Host "  ├─ Profile Completed: $($meResponse.profileCompleted)" -ForegroundColor $(if ($meResponse.profileCompleted) { "Green" } else { "Red" })
        Write-Host "  └─ Direcciones: $($meResponse.direcciones.Count)" -ForegroundColor White

        if ($meResponse.direcciones -and $meResponse.direcciones.Count -gt 0) {
            Write-Host ""
            Write-Host "📍 Direcciones registradas:" -ForegroundColor Cyan
            $meResponse.direcciones | ForEach-Object {
                Write-Host "  • $($_.calle) $($_.numero), $($_.ciudad) ($($_.codigoPostal))" -ForegroundColor Gray
            }
        }

    } catch {
        Write-Host "⚠️ No se pudo obtener información del usuario" -ForegroundColor Yellow
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📚 FLUJOS DEL SISTEMA" -ForegroundColor Yellow
Write-Host "---------------------" -ForegroundColor Yellow
Write-Host ""

Write-Host "🆕 USUARIO NUEVO (Primera vez con Google):" -ForegroundColor Cyan
Write-Host "  1. Login con Google → Backend crea usuario con profileCompleted = false" -ForegroundColor White
Write-Host "  2. Redirección: /oauth2/redirect?profileCompleted=false&isNewUser=true" -ForegroundColor White
Write-Host "  3. Frontend muestra formulario de completar perfil" -ForegroundColor White
Write-Host "  4. POST /api/usuarios/complete-profile → profileCompleted = true" -ForegroundColor White
Write-Host "  5. Redirección al dashboard" -ForegroundColor White
Write-Host ""

Write-Host "✅ USUARIO VETERANO (Ya completó su perfil):" -ForegroundColor Cyan
Write-Host "  1. Login con Google → Backend encuentra usuario con profileCompleted = true" -ForegroundColor White
Write-Host "  2. Redirección: /oauth2/redirect?profileCompleted=true&isNewUser=false" -ForegroundColor White
Write-Host "  3. Frontend redirige directo al dashboard" -ForegroundColor White
Write-Host ""

Write-Host "⚠️ USUARIO QUE ABANDONÓ REGISTRO:" -ForegroundColor Cyan
Write-Host "  1. Login con Google → Backend encuentra usuario con profileCompleted = false" -ForegroundColor White
Write-Host "  2. Redirección: /oauth2/redirect?profileCompleted=false&isNewUser=false" -ForegroundColor White
Write-Host "  3. Frontend muestra formulario de completar perfil" -ForegroundColor White
Write-Host "  4. Usuario completa su perfil → profileCompleted = true" -ForegroundColor White
Write-Host ""

Write-Host "🔐 USUARIO REGISTRO LOCAL:" -ForegroundColor Cyan
Write-Host "  1. POST /api/auth/register → Backend crea usuario con profileCompleted = true" -ForegroundColor White
Write-Host "  2. Login exitoso con token" -ForegroundColor White
Write-Host "  3. Redirección directa al dashboard" -ForegroundColor White
Write-Host ""

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "✅ Documentación completa en:" -ForegroundColor Green
Write-Host "   OAUTH2_PROFILE_INTELLIGENCE_DOCUMENTATION.md" -ForegroundColor Gray
Write-Host "=====================================================" -ForegroundColor Cyan

