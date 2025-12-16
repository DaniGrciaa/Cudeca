# Configuración de Variables de Entorno

## Desarrollo Local

Para trabajar en local, ya se ha creado el archivo `.env` en la carpeta `CudecaFE`:

```env
VITE_API_URL=http://localhost:8080
```

Este archivo está protegido en `.gitignore` y **NO se subirá a Git ni a Railway**.

## Producción en Railway

### Configuración del Backend

1. Ve a tu proyecto **Backend** en Railway
2. Asegúrate de que esté corriendo correctamente
3. Copia la URL pública de tu backend (algo como `https://cudecabe-production.up.railway.app`)

### Configuración del Frontend

1. Ve a tu proyecto **Frontend** en Railway
2. Haz clic en **Settings** (o Variables)
3. Añade una nueva variable de entorno:
   - **Name:** `VITE_API_URL`
   - **Value:** La URL de tu backend (por ejemplo: `https://cudecabe-production.up.railway.app`)
4. Guarda y redespliega el frontend

### Captura de pantalla de ejemplo

```
Variables
┌─────────────────┬────────────────────────────────────────────────┐
│ Name            │ Value                                          │
├─────────────────┼────────────────────────────────────────────────┤
│ VITE_API_URL    │ https://cudecabe-production.up.railway.app    │
└─────────────────┴────────────────────────────────────────────────┘
```

## Pasos siguientes

1. **Inicia tu backend local:**
   ```bash
   cd CudecaBE
   ./mvnw spring-boot:run
   ```

2. **Inicia tu frontend local:**
   ```bash
   cd CudecaFE
   npm run dev
   ```

3. **Verifica la conexión:**
   - Abre http://localhost:3000
   - Ve a la página de Eventos
   - Deberías ver los eventos cargados desde tu backend local

## Resolución de problemas

- Si ves el error "<!doctype... is not valid JSON", significa que `VITE_API_URL` no está configurada
- Si ves errores de CORS, verifica la configuración del backend
- Reinicia Vite después de cambiar el archivo `.env` (Ctrl+C y `npm run dev`)
