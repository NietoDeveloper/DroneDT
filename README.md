# DroneDT Project

## Overview
DroneDT is a comprehensive e-commerce platform for manufacturing and selling drones in Colombia, inspired by the sleek and user-centric design of Tesla's website (https://www.tesla.com). The application is divided into separate modules for scalability: a backend API server, a frontend shop for customers, and an admin panel for employees and administrators. It leverages modern technologies for a premium user experience, secure data handling, and efficient internal management.

Key inspirations from Tesla:
- Minimalist, high-performance UI with focus on product configurators, hero sections, and seamless navigation.
- Emphasis on SEO, fast loading, and immersive visuals (e.g., 4K drone videos).
- Future integrations for AI bot assistance, AWS services (e.g., S3 for images), and hybrid databases (MongoDB Atlas for flexible data + SQL for structured payments).

The project supports local development with Docker for orchestration, and deployment on platforms like Railway (backend), Vercel (frontend), with potential for additional cloud services.

## Features
- **E-commerce Shop**: Customer-facing site for browsing, configuring, and purchasing drones. Includes cart management, service selection, and appointment scheduling.
- **Admin/Employee Panel**: Internal dashboard for managing inventory, appointments, sales analytics, and messaging (with AI integration planned).
- **Backend API**: Handles user authentication, data storage (drones, users, payments), and integrations like AWS S3 for media and an AI bot for customer support.
- **Security & Scalability**: JWT authentication, input validation with Zod, and hybrid database approach (NoSQL for drones, SQL for transactions).
- **Docker Support**: Easy local setup with containerized services.
- **Future Enhancements**: AI bot integration, AWS for storage/compute, and additional SQL database for robust querying.

## Tech Stack
- **Backend**: Node.js, Express, TypeScript, MongoDB Atlas (NoSQL), SQL (for payments), AWS SDK, Zod for validation.
- **Frontend Shop**: Next.js 15 (App Router), React, Tailwind CSS, Zustand/Redux for state management.
- **Admin Panel**: React, Vite, Tailwind CSS, Axios for API calls.
- **Deployment**: Railway (backend), Vercel (frontend), Docker for local/dev environments.
- **Other Tools**: JWT for auth, Mongoose for MongoDB schemas, and planned integrations for AI bot and AWS.

## Project Structure
The root directory is organized as follows:

```
dronedt-project/
├── backend/              # Node.js + Express + TypeScript (Railway)
├── frontend-shop/        # Next.js 15 + Tailwind (Vercel)
├── admin-panel/          # React + Vite (Panel de Empleados/Admin)
└── docker-compose.yml    # Orquestación de contenedores
```

### 1. Backend (API Engine)
Oriented towards scalability and security with SQL and NoSQL.

```
backend/
├── src/
│   ├── config/           # Conexión a MongoDB Atlas y AWS SDK
│   ├── controllers/      # Lógica de Citas, Drones y Usuarios
│   ├── models/           # Schemas (Mongoose para Drones / SQL para Pagos)
│   ├── routes/           # Endpoints divididos por recursos
│   ├── middlewares/      # Auth JWT y Validación con Zod
│   ├── services/         # Integración de Bot IA y AWS S3 (imágenes)
│   └── index.ts          # Punto de entrada
├── Dockerfile            # Configuración para Railway
├── .env                  # Variables (MONGO_URI, AWS_KEY, PORT)
├── tsconfig.json
└── package.json
```

### 2. Frontend Shop (Tesla Style)
Focus on SEO and premium user experience.

```
frontend-shop/
├── public/               # Videos 4K de drones y assets
├── src/
│   ├── app/              # Next.js 15 App Router (Layouts y Pages)
│   ├── components/       # UI (Navbar Tesla-style, Hero, Configurator)
│   ├── hooks/            # Lógica de carrito y selección de servicios
│   ├── services/         # Llamados a la API del backend
│   ├── store/            # Estado global (Zustand/Redux) para el flujo de citas
│   └── styles/           # Tailwind Config con colores Software DT
├── next.config.js        # React Compiler activado
└── tailwind.config.js    # Definición de Gold, Gainsboro y YellowColor
```

### 3. Admin & Employee Panel
High-efficiency dashboard for internal management.

```
admin-panel/
├── src/
│   ├── api/              # Instancia de Axios configurada
│   ├── components/       # Tablas de citas, gráficos de ventas
│   ├── pages/            
│   │   ├── Dashboard.tsx
│   │   ├── Appointments.tsx # Paso 1 & 2 del MVP
│   │   ├── Inventory.tsx    # Gestión de drones fabricados
│   │   └── Messaging.tsx    # Paso 3 del MVP: Historial e IA
│   └── context/          # Gestión de roles (Admin vs Empleado)
├── index.html
└── tailwind.config.js    # Mismo diseño que la Shop para consistencia
```

## Installation & Setup
1. **Clone the Repository**:
   ```
   git clone https://github.com/your-repo/dronedt-project.git
   cd dronedt-project
   ```

2. **Install Dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend Shop: `cd frontend-shop && npm install`
   - Admin Panel: `cd admin-panel && npm install`

3. **Environment Variables**:
   - Create `.env` files in each directory based on `.env.example` (if provided).
   - Key variables: `MONGO_URI`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `PORT`, `JWT_SECRET`.

4. **Database Setup**:
   - Set up MongoDB Atlas for NoSQL data.
   - Configure an SQL database (e.g., PostgreSQL) for payments and structured data.

## Running Locally
Use Docker for a seamless multi-service setup:

1. Ensure Docker and Docker Compose are installed.
2. Run:
   ```
   docker-compose up --build
   ```
   - Backend API: http://localhost:3000
   - Frontend Shop: http://localhost:3001
   - Admin Panel: http://localhost:3002

Alternatively, run each service manually:
- Backend: `cd backend && npm run dev`
- Frontend Shop: `cd frontend-shop && npm run dev`
- Admin Panel: `cd admin-panel && npm run dev`

## Deployment
- **Backend**: Deploy to Railway. Push the `backend` directory and configure environment variables.
- **Frontend Shop**: Deploy to Vercel. Connect the `frontend-shop` repo and enable React Compiler in `next.config.js`.
- **Admin Panel**: Host on Vercel or a similar platform for static/SPA deployment.
- Use Docker for production orchestration if needed.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/new-feature`.
3. Commit changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

For questions or issues, contact the development team at [your-email@example.com].


# Estructura del Monorepo DroneDT

```
drone-dt/  ← Raíz del monorepo
├── front/  ← Front-end principal (Next.js + React + Tailwind, e-commerce público estilo Tesla)
│   ├── app/
│   │   ├── layout.tsx  ← RootLayout que ya tienes (con Geist fonts, globals.css, metadata)
│   │   ├── page.tsx    ← Home: Hero con drones, secciones de modelos, shop, etc. (minimalista, responsive 310px-1900px)
│   │   ├── shop/
│   │   │   ├── drones/page.tsx  ← Lista de drones (cards interactivas como modelos Tesla)
│   │   │   ├── accesorios/page.tsx
│   │   │   └── servicios/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── legal/
│   │       ├── privacidad/page.tsx
│   │       ├── terminos/page.tsx
│   │       └── cookies/page.tsx
│   ├── components/
│   │   ├── ui/          ← Reusables: Button, Card, Input (Tailwind variants)
│   │   ├── layout/
│   │   │   ├── Header.tsx  ← Navbar fixed, logo DroneDT, menú responsive (hamburguesa mobile)
│   │   │   └── Footer.tsx  ← El que te di, con links a shop, soporte, etc.
│   │   └── sections/    ← Hero, FeaturesDrones, Testimonials (animaciones sutiles)
│   ├── lib/             ← Utils: API fetchers a /back/ (e.g., getDrones())
│   ├── styles/
│   │   └── globals.css  ← Tailwind base, bg-main, text-textColor, etc.
│   ├── public/          ← Assets: logos, imágenes drones (optimizadas)
│   ├── next.config.js   ← Config: images domains, etc.
│   ├── tsconfig.json    ← TypeScript config
│   └── package.json     ← Deps: next, react, tailwindcss, @types/react
├── back/  ← Backend (Express + Node.js, API REST para datos y lógica)
│   ├── src/
│   │   ├── index.ts     ← Server entry: app.listen(), rutas
│   │   ├── routes/
│   │   │   ├── drones.ts  ← Endpoints: /api/drones (CRUD, auth middleware)
│   │   │   ├── users.ts   ← /api/users (registro, login, JWT)
│   │   │   ├── orders.ts  ← /api/orders (e-commerce logic)
│   │   │   └── admin.ts   ← Endpoints exclusivos para empleados
│   │   ├── models/
│   │   │   ├── Drone.ts   ← Mongoose schemas (nombre, precio, specs)
│   │   │   ├── User.ts    ← Tipos: cliente/empleado
│   │   │   └── Order.ts
│   │   ├── controllers/   ← Lógica: createDrone, getOrders
│   │   ├── middleware/    ← Auth, error handling
│   │   └── config/
│   │       └── db.ts      ← Conexión MongoDB Atlas (process.env.MONGO_URI)
│   ├── .env.example     ← Vars: MONGO_URI, JWT_SECRET, PORT=4000
│   ├── tsconfig.json
│   ├── Dockerfile       ← Para containerizar: FROM node:20, COPY ., npm run build
│   └── package.json     ← Deps: express, mongoose, dotenv, cors, jsonwebtoken
├── panel-cliente/  ← Dashboard clientes (Next.js + React + Tailwind, auth required)
│   ├── app/
│   │   ├── layout.tsx   ← Layout con sidebar cliente (órdenes, perfil, tracking)
│   │   ├── page.tsx     ← Dashboard home: Resumen órdenes recientes
│   │   ├── ordenes/page.tsx  ← Lista órdenes (tabla responsive, filters)
│   │   ├── perfil/page.tsx   ← Editar datos, historial
│   │   └── soporte/page.tsx  ← Chat/FAQ personalizado
│   ├── components/      ← Compartidos con front si posible, o específicos (e.g., OrderCard)
│   ├── lib/             ← API fetchers a /back/ (con auth headers)
│   ├── styles/globals.css  ← Similar a front, pero con theme dashboard (e.g., bg-gray-900)
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json     ← Similar a front, + bibliotecas como react-hook-form para forms
├── panel-empleados/  ← Dashboard empleados (Next.js + React + Tailwind, auth admin)
│   ├── app/
│   │   ├── layout.tsx   ← Layout con sidebar admin (inventario, ventas, usuarios)
│   │   ├── page.tsx     ← Dashboard home: Metrics (ventas diarias, stock bajo)
│   │   ├── inventario/page.tsx  ← Gestión drones/accesorios (CRUD forms)
│   │   ├── ventas/page.tsx      ← Reportes, gráficos (usa Chart.js)
│   │   ├── usuarios/page.tsx    ← Manage clientes/empleados
│   │   └── configuracion/page.tsx  ← Settings app
│   ├── components/      ← Específicos: AdminTable, InventoryForm
│   ├── lib/             ← API fetchers a /back/ (con roles check)
│   ├── styles/globals.css  ← Dark mode por default, moderno y limpio
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json     ← + bibliotecas como recharts o tanstack-table para datos
├── shared/  ← Opcional: Paquetes compartidos (e.g., tipos TS, utils)
│   ├── types/           ← Interfaces: IDrone, IUser (usado en front/back/panels)
│   └── utils/           ← Funciones comunes: formatCurrency, validateEmail
├── docker-compose.yml   ← Para dev local: services para back (con Mongo), front, panels
├── .gitignore           ← Ignora node_modules, .env, builds
├── README.md            ← Instrucciones: npm install, dev en cada carpeta
└── package.json         ← Workspace config: "workspaces": ["front", "back", "panel-cliente", "panel-empleados"]
```