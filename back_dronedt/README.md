# Drone DT Backend 🛰️

Este es el motor de Drone DT, una API RESTful de alto rendimiento diseñada para la gestión de servicios de drones, eCommerce y control de flota. Construida con un enfoque en escalabilidad horizontal, seguridad JWT y arquitectura limpia.

## 🚀 Tecnologías Core

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js con arquitectura de servicios.
- **Base de Datos**: MongoDB con Mongoose (Modelado y Agregaciones).
- **Caching**: Redis para optimización de consultas y sesiones.
- **Seguridad**: JWT, Bcrypt y Rate Limiting.
- **Cloud & DevOps**: Docker, AWS (SES/SNS) y CI/CD integrado.

## 📂 Estructura del Proyecto

La arquitectura sigue el patrón **Controller-Service-Repository** para asegurar que la lógica de negocio sea testeable y desacoplada.

```text
backend/
├── src/
│   ├── config/          # Conexiones (DB, Redis, Logger)
│   ├── controllers/     # Manejo de peticiones HTTP
│   ├── models/          # Schemas de Mongoose
│   ├── routes/          # Definición de Endpoints
│   ├── services/        # Lógica de negocio pura (Email, Pagos, Notificaciones)
│   ├── middlewares/     # Auth, Error Handler, Validaciones (Joi/Zod)
│   ├── utils/           # Helpers y constantes
│   └── app.js           # Punto de entrada y Express config
├── tests/               # Jest & Supertest (Unit e Integration)
├── Dockerfile           # Imagen optimizada (Node Alpine)
└── docker-compose.yml   # Orquestación Local (Mongo + Redis)

---

## 🚀 Desarrollado por Manuel Nieto para **DroneDT**

### 🏆 **Number 1 Top Committers GitHub Colombia** 🇨🇴

<p align="left">
  <a href="https://committers.top/colombia#NietoDeveloper">
    <img src="https://user-badge.committers.top/colombia/NietoDeveloper.svg" alt="Committers Top Colombia">
  </a>
  <a href="https://committers.top/colombia#NietoDeveloper">
    <img src="https://user-badge.committers.top/colombia_public/NietoDeveloper.svg" alt="Committers Top Public">
  </a>
  <a href="https://committers.top/colombia#NietoDeveloper">
    <img src="https://user-badge.committers.top/colombia_private/NietoDeveloper.svg" alt="Committers Top Private">
  </a>
</p>

---