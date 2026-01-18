
```
drone-dt/  ← Raíz del monorepo
├── front/  ← Front-end principal (Next.js + React + Tailwind, e-commerce público estilo Tesla)
│   ├── app/
│   │   ├── layout.tsx  ← RootLayout que ya tienes (con Geist fonts, globals.css, metadata)
x     ← Dashboard home: Resumen órdenes recientes
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
