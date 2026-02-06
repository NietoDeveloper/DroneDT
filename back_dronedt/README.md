├── backend/                  # Carpeta principal del backend (Node.js con Express y MongoDB)
│   ├── src/                  # Código fuente principal
│   │   ├── config/           # Configuraciones globales
│   │   │   ├── db.js         # Configuración de conexión a MongoDB (usa Mongoose para ORM)
│   │   │   ├── env.js        # Carga de variables de entorno (usa dotenv)
│   │   │   ├── logger.js     # Configuración de logging (usa Winston o Pino para logs escalables)
│   │   │   └── redis.js      # Configuración de Redis para caching (para escalabilidad)
│   │   ├── controllers/      # Lógica de controladores (manejo de requests)
│   │   │   ├── authController.js     # Controladores para autenticación (JWT, OAuth)
│   │   │   ├── productController.js  # Gestión de productos (CRUD, búsquedas)
│   │   │   ├── orderController.js    # Gestión de órdenes (creación, tracking)
│   │   │   ├── userController.js     # Gestión de usuarios (perfiles, roles)
│   │   │   ├── cartController.js     # Carrito de compras
│   │   │   ├── paymentController.js  # Integración con pagos (Stripe o similar, via AWS Lambda si es necesario)
│   │   │   └── categoryController.js # Categorías de productos
│   │   ├── models/           # Modelos de datos (Mongoose schemas)
│   │   │   ├── User.js       # Esquema de usuario (con hashing de passwords via bcrypt)
│   │   │   ├── Product.js    # Esquema de producto (con índices para búsquedas rápidas)
│   │   │   ├── Order.js      # Esquema de orden (con referencias a usuarios y productos)
│   │   │   ├── Cart.js       # Esquema de carrito (sesiones o persistente)
│   │   │   └── Category.js   # Esquema de categorías
│   │   ├── routes/           # Definición de rutas (Express Router)
│   │   │   ├── index.js      # Ruta raíz que agrupa todas las rutas
│   │   │   ├── auth.js       # Rutas de auth (/api/auth/login, /register)
│   │   │   ├── products.js   # Rutas de productos (/api/products/)
│   │   │   ├── orders.js     # Rutas de órdenes (/api/orders/)
│   │   │   ├── users.js      # Rutas de usuarios (/api/users/)
│   │   │   ├── carts.js      # Rutas de carritos (/api/carts/)
│   │   │   └── payments.js   # Rutas de pagos (/api/payments/)
│   │   ├── services/         # Lógica de negocio reutilizable (separada de controllers para escalabilidad)
│   │   │   ├── emailService.js       # Envío de emails (usa Nodemailer o AWS SES)
│   │   │   ├── paymentService.js     # Integración con proveedores de pagos
│   │   │   ├── searchService.js      # Búsquedas avanzadas (usa MongoDB aggregation o ustez)
