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
