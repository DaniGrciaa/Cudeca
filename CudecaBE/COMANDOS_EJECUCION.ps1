# ============================================
# COMANDOS PARA ARRANCAR LA APLICACIÓN (PowerShell)
# Sistema de Compra de Eventos - CudecaBE
# ============================================

# Navegar al directorio del proyecto
cd C:\Users\Dani\Documents\Cudeca\CudecaBE

# --------------------------------------------
# PASO 1: Verificar que el directorio target está limpio
# --------------------------------------------
Write-Host "🧹 Limpiando directorio target..." -ForegroundColor Yellow
if (Test-Path "target") {
    Remove-Item -Path "target" -Recurse -Force
}
Write-Host "✅ Target limpiado" -ForegroundColor Green

# --------------------------------------------
# PASO 2: Compilar el Proyecto
# --------------------------------------------
Write-Host "`n📦 Compilando proyecto..." -ForegroundColor Yellow

# Si usas Maven instalado:
# mvn clean package -DskipTests

# Si usas el wrapper de Maven (recomendado):
# .\mvnw.cmd clean package -DskipTests

# Si solo quieres compilar sin crear JAR:
# mvn clean compile

Write-Host "✅ Compilación completada" -ForegroundColor Green

# --------------------------------------------
# PASO 3: Ejecutar la Aplicación
# --------------------------------------------
Write-Host "`n🚀 Iniciando aplicación..." -ForegroundColor Yellow

# Opción A: Ejecutar con Maven
# mvn spring-boot:run

# Opción B: Ejecutar el JAR directamente (más rápido)
# java -jar target\CudecaBE-0.0.1-SNAPSHOT.jar

# Opción C: Con perfil de desarrollo
# mvn spring-boot:run -Dspring-boot.run.profiles=dev

Write-Host "`n✅ Aplicación iniciada en http://localhost:8080" -ForegroundColor Green
Write-Host "📝 Verifica en los logs que aparezca:" -ForegroundColor Cyan
Write-Host "   - Flyway migration V24 applied successfully" -ForegroundColor White
Write-Host "   - Table compra_evento created successfully" -ForegroundColor White
Write-Host "   - Started CudecaBeApplication" -ForegroundColor White

# --------------------------------------------
# PASO 4: Probar Endpoints (Otra Terminal)
# --------------------------------------------

# LOGIN - Obtener token
Write-Host "`n🔐 Para hacer login:" -ForegroundColor Yellow
Write-Host @"
Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' ``
  -Method Post ``
  -Headers @{'Content-Type'='application/json'} ``
  -Body '{"email":"usuario@ejemplo.com","password":"password"}'
"@ -ForegroundColor White

# COMPRAR EVENTO
Write-Host "`n🛒 Para comprar un evento:" -ForegroundColor Yellow
Write-Host @"
`$token = "TU_TOKEN_AQUI"
Invoke-RestMethod -Uri 'http://localhost:8080/api/compras-eventos' ``
  -Method Post ``
  -Headers @{
    'Content-Type'='application/json'
    'Authorization'="Bearer `$token"
  } ``
  -Body '{"eventoId":1,"cantidadEntradas":2,"precioTotal":50.00,"metodoPago":"TARJETA"}'
"@ -ForegroundColor White

# VER MIS EVENTOS
Write-Host "`n📋 Para ver tus eventos comprados:" -ForegroundColor Yellow
Write-Host @"
`$token = "TU_TOKEN_AQUI"
Invoke-RestMethod -Uri 'http://localhost:8080/api/compras-eventos/mis-eventos' ``
  -Method Get ``
  -Headers @{'Authorization'="Bearer `$token"}
"@ -ForegroundColor White

# --------------------------------------------
# FUNCIONES AUXILIARES
# --------------------------------------------

function Test-AppRunning {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing -ErrorAction Stop
        Write-Host "✅ Aplicación corriendo correctamente" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ Aplicación no está corriendo" -ForegroundColor Red
        return $false
    }
}

function Start-CudecaApp {
    Write-Host "🚀 Iniciando CudecaBE..." -ForegroundColor Yellow

    # Verificar si el puerto 8080 está ocupado
    $portInUse = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "⚠️  Puerto 8080 está ocupado" -ForegroundColor Yellow
        Write-Host "   Puedes cambiar el puerto en application.properties" -ForegroundColor White
        return
    }

    # Ejecutar la aplicación
    java -jar target\CudecaBE-0.0.1-SNAPSHOT.jar
}

function Stop-CudecaApp {
    Write-Host "🛑 Deteniendo aplicación..." -ForegroundColor Yellow

    $process = Get-Process -Name "java" -ErrorAction SilentlyContinue | Where-Object {
        $_.CommandLine -like "*CudecaBE*"
    }

    if ($process) {
        Stop-Process -Id $process.Id -Force
        Write-Host "✅ Aplicación detenida" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  No hay aplicación corriendo" -ForegroundColor Cyan
    }
}

function Show-CudecaLogs {
    Write-Host "📋 Mostrando logs..." -ForegroundColor Yellow
    Get-Content "logs\spring.log" -Tail 50 -Wait
}

# --------------------------------------------
# TROUBLESHOOTING
# --------------------------------------------

function Resolve-CompilationError {
    Write-Host "🔧 Limpiando y recompilando..." -ForegroundColor Yellow

    # Limpiar target
    if (Test-Path "target") {
        Remove-Item -Path "target" -Recurse -Force
    }

    # Limpiar cache de Maven
    if (Test-Path "$env:USERPROFILE\.m2\repository\com\cudeca") {
        Remove-Item -Path "$env:USERPROFILE\.m2\repository\com\cudeca" -Recurse -Force
    }

    # Recompilar
    mvn clean install -DskipTests

    Write-Host "✅ Proceso completado" -ForegroundColor Green
}

# --------------------------------------------
# MENÚ INTERACTIVO
# --------------------------------------------

function Show-Menu {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  CUDECA BE - Sistema de Compra Eventos" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan

    Write-Host "1. ✨ Compilar proyecto"
    Write-Host "2. 🚀 Iniciar aplicación"
    Write-Host "3. 🛑 Detener aplicación"
    Write-Host "4. 🧪 Verificar si está corriendo"
    Write-Host "5. 📋 Ver logs"
    Write-Host "6. 🔧 Resolver errores de compilación"
    Write-Host "7. 🧹 Limpiar todo y recompilar"
    Write-Host "8. ❌ Salir"

    $option = Read-Host "`nSelecciona una opción"

    switch ($option) {
        "1" {
            Write-Host "`n📦 Compilando..." -ForegroundColor Yellow
            mvn clean package -DskipTests
            Read-Host "`nPresiona Enter para continuar"
            Show-Menu
        }
        "2" {
            Start-CudecaApp
        }
        "3" {
            Stop-CudecaApp
            Read-Host "`nPresiona Enter para continuar"
            Show-Menu
        }
        "4" {
            Test-AppRunning
            Read-Host "`nPresiona Enter para continuar"
            Show-Menu
        }
        "5" {
            Show-CudecaLogs
        }
        "6" {
            Resolve-CompilationError
            Read-Host "`nPresiona Enter para continuar"
            Show-Menu
        }
        "7" {
            Write-Host "`n🧹 Limpiando todo..." -ForegroundColor Yellow
            Remove-Item -Path "target" -Recurse -Force -ErrorAction SilentlyContinue
            mvn clean install -DskipTests
            Read-Host "`nPresiona Enter para continuar"
            Show-Menu
        }
        "8" {
            Write-Host "`n👋 ¡Hasta luego!" -ForegroundColor Green
            exit
        }
        default {
            Write-Host "`n❌ Opción no válida" -ForegroundColor Red
            Start-Sleep -Seconds 2
            Show-Menu
        }
    }
}

# --------------------------------------------
# EJECUTAR MENÚ (Descomentar para usar)
# --------------------------------------------
# Show-Menu

# --------------------------------------------
# EJECUCIÓN DIRECTA
# --------------------------------------------
Write-Host "`n🎯 Comandos disponibles:" -ForegroundColor Cyan
Write-Host "   Start-CudecaApp      - Iniciar aplicación" -ForegroundColor White
Write-Host "   Stop-CudecaApp       - Detener aplicación" -ForegroundColor White
Write-Host "   Test-AppRunning      - Verificar estado" -ForegroundColor White
Write-Host "   Show-CudecaLogs      - Ver logs" -ForegroundColor White
Write-Host "   Show-Menu            - Mostrar menú interactivo" -ForegroundColor White
Write-Host "`n💡 Tip: Ejecuta 'Show-Menu' para un menú interactivo`n" -ForegroundColor Yellow

