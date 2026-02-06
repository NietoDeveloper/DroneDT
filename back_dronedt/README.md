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

La arquitectura sigue el patrón Controller-Service-Repository para asegurar que la lógica de negocio sea testeable y desacoplada.

```
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
```

## 🛠️ Configuración Local

1. Clonar y entrar al directorio:

   ```bash
   cd backend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Variables de Entorno:

   Crea un archivo `.env` basado en `.env.example`:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_secret_key
   AWS_REGION=us-east-1
   ```

4. Levantar con Docker (Recomendado):

   ```bash
   docker-compose up -d
   ```

5. Modo Desarrollo:

   ```bash
   npm run dev
   ```

## 🔐 Seguridad y Escalabilidad

- **Rate Limiting**: Protegido contra ataques de fuerza bruta mediante express-rate-limit.
- **Logging**: Implementación de Winston/Pino para trazabilidad de errores en producción.
- **Notificaciones**: Integración con AWS SNS para actualizaciones en tiempo real tipo "Tesla App".
- **Validación**: Middlewares de validación estricta para asegurar la integridad de los datos antes de llegar a la DB.

## 🧪 Testing

Mantenemos un alto estándar de calidad siguiendo la meta de commits en committers.top.

- **Unit Tests**: `npm run test:unit`
- **Integration Tests**: `npm run test:integration`

## 📡 Endpoints Principales (Resumen)

| Método | Endpoint          | Descripción                          |
|--------|-------------------|--------------------------------------|
| POST   | /api/auth/register | Registro de nuevos usuarios         |
| GET    | /api/products     | Listado de drones y servicios       |
| POST   | /api/orders       | Creación de órdenes (Requiere Auth) |
| POST   | /api/payments     | Procesamiento de pagos (Stripe/AWS) |

Desarrollado por Manuel Nieto  
#1 Committer Colombia 🇨🇴