# ============================================
# COMANDOS PARA ARRANCAR LA APLICACIÓN
# Sistema de Compra de Eventos - CudecaBE
# ============================================

# --------------------------------------------
# PASO 1: Compilar el Proyecto
# --------------------------------------------

# Opción A: Con Maven instalado
mvn clean package -DskipTests

# Opción B: Con Maven wrapper (si existe)
./mvnw clean package -DskipTests

# Opción C: Solo compilar sin empaquetar
mvn clean compile

# --------------------------------------------
# PASO 2: Ejecutar la Aplicación
# --------------------------------------------

# Opción A: Ejecutar con Maven
mvn spring-boot:run

# Opción B: Ejecutar el JAR
java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar

# Opción C: Con perfil de desarrollo
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# --------------------------------------------
# PASO 3: Verificar que Todo Funciona
# --------------------------------------------

# Ver logs - deberías ver:
# ✅ Flyway migration V24 applied successfully
# ✅ Table compra_evento created successfully
# ✅ Started CudecaBeApplication in X seconds

# --------------------------------------------
# PASO 4: Probar Endpoints
# --------------------------------------------

# Hacer login (guarda el token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "tu_password"
  }'

# Comprar un evento (reemplaza {TOKEN})
curl -X POST http://localhost:8080/api/compras-eventos \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "eventoId": 1,
    "cantidadEntradas": 2,
    "precioTotal": 50.00,
    "metodoPago": "TARJETA",
    "codigoTransaccion": "TEST123"
  }'

# Ver mis eventos comprados
curl -X GET http://localhost:8080/api/compras-eventos/mis-eventos \
  -H "Authorization: Bearer {TOKEN}"

# Verificar si ya compré un evento
curl -X GET http://localhost:8080/api/compras-eventos/verificar/evento/1 \
  -H "Authorization: Bearer {TOKEN}"

# --------------------------------------------
# ALTERNATIVA: Usar Postman
# --------------------------------------------

# 1. Importa la colección:
#    - POST /api/auth/login
#    - POST /api/compras-eventos
#    - GET /api/compras-eventos/mis-eventos
#    - GET /api/compras-eventos/verificar/evento/{id}

# 2. Configura variables:
#    - base_url: http://localhost:8080
#    - token: {{login.response.token}}

# --------------------------------------------
# TROUBLESHOOTING
# --------------------------------------------

# Si falla por puerto ocupado (8080):
# Cambiar puerto en application.properties:
# server.port=8081

# Si falla Flyway:
# Verificar conexión a PostgreSQL
# Verificar que no haya migraciones duplicadas

# Limpiar y recompilar:
mvn clean
rm -rf target
mvn package -DskipTests

# Ver logs detallados:
mvn spring-boot:run -Dlogging.level.root=DEBUG

# --------------------------------------------
# PARA DESARROLLO
# --------------------------------------------

# Ejecutar en modo debug
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"

# Hot reload con spring-boot-devtools
# (ya incluido en el proyecto)

# --------------------------------------------
# PARA PRODUCCIÓN
# --------------------------------------------

# Compilar para producción
mvn clean package -DskipTests -Pprod

# Ejecutar con perfil de producción
java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# Con variables de entorno
export DATABASE_URL=jdbc:postgresql://localhost:5432/cudeca
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar

