# Cudeca Eventos 🎗️

Plataforma web para la venta de entradas y gestión de eventos solidarios de la Fundación Cudeca.

## 🎯 Características

- ✅ Venta de entradas para eventos (cenas, conciertos, marchas, rifas)
- ✅ Sistema de "Fila Cero" (donación sin acceso)
- ✅ Donaciones adicionales opcionales
- ✅ Carrito de compras con Zustand
- ✅ Formularios accesibles con React Hook Form
- ✅ Diseño responsive con Tailwind CSS
- ✅ Animaciones suaves con Framer Motion
- ✅ Gráficos de progreso con Recharts
- ✅ Accesibilidad WCAG 2.1 AA

## 🛠️ Stack Tecnológico

- **React 18** + **Vite** - Framework y bundler
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Estilos
- **Zustand** - Estado global
- **React Hook Form** - Gestión de formularios
- **Lucide React** - Iconos
- **Recharts** - Visualización de datos
- **Framer Motion** - Animaciones

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx              # Cabecera con navegación
│   ├── EventCard.jsx           # Tarjeta de evento
│   ├── DonationForm.jsx        # Formulario de donaciones
│   ├── CheckoutForm.jsx        # Formulario de pago
│   ├── GoalProgress.jsx        # Gráfico de progreso
│   ├── VolunteerOptions.jsx    # Opciones de voluntariado
│   └── Footer.jsx              # Pie de página
├── pages/
│   ├── Home.jsx                # Página principal
│   ├── Events.jsx              # Lista de eventos
│   ├── EventDetail.jsx         # Detalle del evento
│   ├── Checkout.jsx            # Proceso de compra
│   └── ThankYou.jsx            # Confirmación
├── store/
│   └── useCartStore.js         # Estado global del carrito
├── App.jsx                     # Componente principal
├── main.jsx                    # Punto de entrada
└── index.css                   # Estilos globales
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/fundacion-cudeca/cudeca-eventos.git

# Instalar dependencias
cd cudeca-eventos
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El proyecto estará disponible en http://localhost:3000
```

### Build para Producción

```bash
# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

## 🎨 Paleta de Colores

- **Amarillo Cudeca**: `#FFD700`
- **Verde Claro**: `#86EFAC`
- **Verde Oscuro**: `#059669`
- **Blanco**: `#FFFFFF`
- **Gris**: Escala de grises de Tailwind

## ♿ Accesibilidad

La aplicación está diseñada siguiendo las pautas WCAG 2.1 AA:

- ✅ Navegación por teclado completa
- ✅ Roles ARIA apropiados
- ✅ Alto contraste de colores
- ✅ Botones y textos grandes
- ✅ Focus visible en todos los elementos interactivos
- ✅ Textos alternativos para imágenes
- ✅ Formularios con labels y validación accesible

## 🔌 Integración con Backend (TODO)

Los siguientes puntos están marcados con comentarios `// TODO:` en el código:

### API Endpoints Necesarios

```javascript
// TODO: GET /api/events - Obtener lista de eventos
// TODO: GET /api/events/:id - Obtener detalle de un evento
// TODO: POST /api/orders - Crear nueva orden de compra
// TODO: POST /api/payments - Procesar pago
// TODO: GET /api/events/:id/progress - Progreso de recaudación
```

### Estructura de Datos

**Evento:**
```json
{
  "id": 1,
  "title": "Cena Benéfica de Gala",
  "description": "...",
  "longDescription": "...",
  "type": "cena|concierto|marcha|rifa",
  "price": 75.00,
  "date": "15 de Diciembre, 2025",
  "location": "...",
  "image": "url",
  "availableTickets": 150,
  "schedule": "20:00h - 01:00h",
  "includes": ["..."]
}
```

**Orden de Compra:**
```json
{
  "customer": {
    "fullName": "...",
    "email": "...",
    "phone": "..."
  },
  "items": [...],
  "extraDonation": 0,
  "isFilaCero": false,
  "paymentMethod": "card|transfer",
  "total": 0
}
```

## 📝 Próximas Funcionalidades

- [ ] Integración con API backend
- [ ] Sistema de autenticación de usuarios
- [ ] Historial de compras
- [ ] Newsletter y notificaciones
- [ ] Pasarela de pago (Stripe/PayPal)
- [ ] Panel de administración
- [ ] Generación de tickets PDF/QR
- [ ] Sistema de descuentos y promociones
- [ ] Múltiples idiomas (i18n)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de la Fundación Cudeca.

## 👥 Equipo

Desarrollado con ❤️ para la Fundación Cudeca

## 📧 Contacto

- **Web**: https://www.cudeca.org
- **Email**: info@cudeca.org
- **Teléfono**: +34 952 56 47 35

---

**¡Gracias por apoyar a Cudeca!** 💛💚
