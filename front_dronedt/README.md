# DroneDT - Frontend

DroneDT is a high-performance web application built with Next.js 15. It features a dual-interface architecture designed to handle a customer-facing storefront and a robust administrative control panel for internal management.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Custom "Software DT" Theme)
- **Optimization**: React Compiler (Enabled)
- 
### Color Palette

| Element     | Hex Code | Variable           |
|-------------|----------|--------------------|
| Primary     | #FFD700 | --color-gold       |
| Accent      | #FEB60D | --color-yellow-color |
| Background  | #DCDCDC | --color-gainsboro  |
| Typography  | #000000 | --color-text-color |
| Action Red  | #E81922 | --color-dt-red     |

### Key UI Features

- **Responsive Design**: Optimized for seamless performance across all device types.

## 📂 Project Structure

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

## ⚙️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NietoDevelooper/drone-dt-front.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment:
   Create a .env.local file in the root directory:

   ```bash
   NEXT_PUBLIC_API_URL=http://your-backend-api-url
   ```

4. Launch Development Server:

   ```bash
   npm run dev
   ```

## 🎯 MVP Development Roadmap

The current development phase focuses on the core functional modules required for production:

- **Appointment Engine**: End-to-end flow for creating and managing service appointments.
- **Status Management**: Real-time state updates for service fulfillment.
- **Messaging Hub**: Integration of messaging triggers and communication history.
- **Operational Dashboard**: Specialized data cards for the administrative control panel.

Project Status: Active Development  
Platform: [DroneDT Web](https://dronedt.vercel.app/)



## Manuel Nieto

## NietoDeveloper

### 2026 
