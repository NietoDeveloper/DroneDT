DroneDT - Frontend
Welcome to the frontend of DroneDT, a high-performance, world-class web application built with Next.js 15. This project serves as the interface for both the customer-facing shop and the specialized administrative control panel.

🚀 Vision
DroneDT is built with a commitment to excellence, aiming for the highest standards of software engineering. Our goal is to maintain a relentless development pace (100 commits/day) to achieve the top spot in the Colombian developer rankings and provide a seamless, enterprise-grade experience.

🛠 Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS (Custom "Software DT" Theme)

Optimization: React Compiler (Enabled)

Components: Modular architecture with a focus on scannability and performance.

🎨 Identity & Design
The UI follows the strict Software DT branding guidelines:

Primary Colors: Gold (#FFD700), Yellow (#FEB60D)

Background: Gainsboro (#DCDCDC)

Typography: Heading & Text (#000000)

Import Alias: @/* points to the src/ directory.

📂 Project Structure
The frontend is logically separated to handle two distinct user flows:

Plaintext

src/
├── app/
│   ├── (shop)/         # Customer-facing storefront
│   └── (admin)/        # Admin & Employee control panel
├── components/         # Shared UI components
├── styles/             # Global CSS and Tailwind configuration
└── lib/                # Utilities and API services
⚙️ Setup & Installation
Clone the repository:

Bash

git clone https://github.com/NietoDevelooper/drone-dt-front.git
Install dependencies:

Bash

npm install
Environment Variables: Create a .env.local file and add your backend connection:

Fragmento de código

NEXT_PUBLIC_API_URL=http://localhost:your-port
Run Development Server:

Bash

npm run dev
🎯 Roadmap to MVP (January 20th)
To reach our production goal, the following modules are being prioritized:

[ ] Appointments: Create and view appointments in the panel.

[ ] Appointment Status: Real-time adjustment of completed appointments.

[ ] Messaging System: Integrated chat buttons and messaging history.

[ ] Admin Dashboard: Final optimization of the control panel cards.

📈 Performance & Commits
We are currently on a 150+ day streak. This repository is the engine behind our goal to lead the national rankings. Every commit is a step toward engineering excellence worthy of the highest global standards.

Developer: NietoDevelooper

Location: Bogotá, Colombia

Status: Active Development






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