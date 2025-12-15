# 📦 Cudeca - Monorepo

Aplicación completa de Cudeca con Backend (Spring Boot) y Frontend (React).

## 🏗️ Estructura del Proyecto

```
Cudeca/
├── CudecaBE/          # Backend - Spring Boot + PostgreSQL
│   ├── src/
│   ├── pom.xml
│   └── ...
├── CudecaFE/          # Frontend - React + Vite
│   ├── src/
│   ├── package.json
│   └── ...
├── .vscode/           # Configuración VSCode
└── README.md          # Este archivo
```

## 🚀 Despliegue en Railway

Este proyecto está configurado para desplegarse en Railway como un monorepo.

### Configuración Railway

**Proyecto:** 1 proyecto con 3 servicios
- **PostgreSQL**: Base de datos compartida
- **Backend** (`cudeca-backend`):
  - Root Directory: `CudecaBE`
  - Port: 8080
  - Framework: Spring Boot + Maven
- **Frontend** (`cudeca-frontend`):
  - Root Directory: `CudecaFE`
  - Framework: React + Vite

### URLs de Producción

- **Backend API:** https://cudeca-backend-production.up.railway.app
- **Frontend App:** https://cudeca-frontend-production.up.railway.app

## 📚 Documentación

- **Backend:**
  - Ver `CudecaBE/README.md` para detalles del API
  - Documentación de endpoints y arquitectura

- **Frontend:**
  - Ver `CudecaFE/README.md` para detalles de la app
  - Componentes y configuración

- **Despliegue:**
  - `CudecaBE/COMANDOS_FINALES_TU_PROYECTO.md` - Guía de despliegue completa
  - `CudecaBE/CHECKLIST_FINAL.md` - Checklist de despliegue
  - `CudecaBE/DIAGRAMA_MONOREPO.md` - Arquitectura visual

## 🔧 Desarrollo Local

### Backend (CudecaBE)

```bash
cd CudecaBE
mvn spring-boot:run
```

Servidor: http://localhost:8080

### Frontend (CudecaFE)

```bash
cd CudecaFE
npm install
npm run dev
```

Aplicación: http://localhost:5173

### Base de datos local

PostgreSQL local en `localhost:5432/Cudeca`

## 🔐 Variables de Entorno

### Backend
- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL`

### Frontend
- `VITE_API_URL`

Ver `.env.example` en cada carpeta para más detalles.

## 🧪 Tests

```bash
# Backend
cd CudecaBE
mvn test

# Frontend
cd CudecaFE
npm run test
```

## 📦 Build para Producción

```bash
# Backend
cd CudecaBE
mvn clean package

# Frontend
cd CudecaFE
npm run build
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a Cudeca.

## 👥 Equipo

Desarrollado para Cudeca - Fundación Cudeca

---

**Última actualización:** Diciembre 2024

