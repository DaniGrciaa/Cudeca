# 🌻 Proyecto Cudeca - Análisis y Diseño de Aplicaciones

> Aplicación web desarrollada como proyecto académico para la asignatura de **Análisis y Diseño de Aplicaciones**, aplicando la metodología **Scrum** para la gestión ágil del desarrollo.

## 📖 Descripción

Este proyecto consiste en el desarrollo de una solución software para **Cudeca** (Cuidados del Cáncer), una fundación sin ánimo de lucro. El objetivo principal de la aplicación es poder facilitar la donación a la causa a través de una página web diseñada para su fácil visualización con eventos y sistemas de donación sencillos de entender.

El sistema ha sido diseñado utilizando una arquitectura moderna separando el **Backend** y el **Frontend** para facilitar la escalabilidad y el mantenimiento.

## 🚀 Metodología de Trabajo: Scrum

Para el desarrollo de este proyecto, el equipo ha seguido estrictamente el marco de trabajo **Scrum**, permitiendo una entrega incremental de valor y una adaptación rápida a los requisitos.

### 🔄 Ciclo de Vida
* **Sprints:** El desarrollo se dividió en iteraciones temporales (Sprints) de 1-2 semanas.
* **Sprint Planning:** Al inicio de cada sprint, seleccionamos las historias de usuario del *Product Backlog* para moverlas al *Sprint Backlog*.
* **Daily Standups:** Reuniones breves de seguimiento para sincronizar el trabajo del equipo.
* **Sprint Review & Retrospective:** Al finalizar cada ciclo, revisamos los incrementos de software y analizamos mejoras en nuestro proceso de trabajo.

### 📂 Artefactos
* **Product Backlog:** Lista priorizada de requisitos y funcionalidades deseadas.
* **Sprint Backlog:** Tareas seleccionadas para ser completadas durante el sprint actual.

## 🛠️ Tecnologías Utilizadas

### Backend (`/CudecaBE`)
* **Lenguaje:** Java
* **Framework:** Spring Boot (Asumido por estructura estándar Java, confirmar si es otro)
* **Base de Datos:** [MySQL / H2 / PostgreSQL]
* **Herramientas:** Maven/Gradle

### Frontend (`/CudecaFE`)
* **Lenguaje:** JavaScript
* **Framework/Librería:** [React / Angular / Vue / HTML5 & CSS3 nativo]
* **Estilos:** [CSS / Bootstrap / Tailwind]

## 📂 Estructura del Proyecto

El repositorio está organizado en dos directorios principales:

```bash
Cudeca/
├── CudecaBE/        # Código fuente del Backend (API, Lógica de negocio)
├── CudecaFE/        # Código fuente del Frontend (Interfaz de usuario)
└── README.md        # Documentación del proyecto
