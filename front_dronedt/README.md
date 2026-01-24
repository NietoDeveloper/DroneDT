drone-dt-frontend/
├── app/                  # Páginas y rutas de Next.js (App Router)
│   ├── api/              # Rutas API internas (si necesitas, ej. para proxies)
│   ├── drones/           # Páginas de modelos de drones (inspirado en Tesla Models)
│   │   ├── [model]/      # Ruta dinámica para drone específico (ej. /drones/pro-max)
│   │   └── page.tsx     # Lista de drones
│   ├── tienda/           # E-commerce section (shop)
│   │   ├── carrito/     # Carrito de compras
│   │   └── page.tsx     # Catálogo
│   ├── soporte/          # Support pages
│   ├── mi-cuenta/       # Panel cliente (integrado: órdenes, perfil)
│   ├── layout.tsx        # Layout global (nav, footer como Tesla)
│   ├── page.tsx          # Home (hero con drones destacados)
│   └── globals.css       # CSS puro para overrides (ej. animaciones)
├── components/           # Componentes reutilizables (React)
│   ├── ui/               # UI base (buttons, cards con Tailwind)
│   │   ├── Button.tsx
│   │   └── CardDrone.tsx # Card para drones
│   ├── layout/           # Header, Footer (minimal como Tesla)
│   ├── hero/             # Hero sections
│   └── modals/           # Modals para carrito/login
├── lib/                  # Utilidades
│   ├── api.ts            # Fetchers para backend API
│   └── utils.ts          # Helpers TS (ej. formatPrice)
├── public/               # Assets estáticos
│   ├── images/           # Imágenes de drones (optimizadas)
│   └── fonts/            # Fuentes custom
├── styles/               # Estilos
│   ├── tailwind/         # Configs Tailwind
│   └── custom/           # CSS puro para secciones específicas (ej. drone-animations.css)
├── types/                # Tipos TS (ej. DroneType.ts)
├── .env                  # Vars (ej. NEXT_PUBLIC_API_URL)
├── Dockerfile            # Para containerizar con Docker
├── next.config.js        # Config Next.js (ej. images from AWS S3)
├── package.json          # Dependencias: next, react, tailwindcss, typescript
├── tailwind.config.js    # Config Tailwind
├── tsconfig.json         # TS config
└── vercel.json           # Config despliegue Vercel