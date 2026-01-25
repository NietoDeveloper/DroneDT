drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Ruteo y Server Components
│   │   ├── (shop)/             # Route Group: Para la tienda (sin afectar URL)
│   │   │   ├── drones/
│   │   │   └── tienda/
│   │   ├── (dashboard)/        # Route Group: Para el panel de control
│   │   │   └── mi-cuenta/
│   │   ├── api/                # Route Handlers (BFF)
│   │   ├── layout.tsx          # Layout con Navbar tipo Tesla
│   │   └── page.tsx            # Hero Landing
│   ├── components/             # 🔵 Componentes Atómicos (Globales)
│   │   ├── ui/                 # Elementos puros (Boton, Input, Badge)
│   │   └── layout/             # Header, Footer, Sidebar
│   ├── features/               # 🔴 EL NÚCLEO (Lógica por dominio)
│   │   ├── drones/             # Todo sobre drones: visualización, tipos
│   │   │   ├── components/     # CardDrone, DroneModelView
│   │   │   ├── hooks/          # useDroneData
│   │   │   └── services/       # fetchDrones
│   │   ├── checkout/           # Todo sobre el carrito y pagos
│   │   └── telemetry/          # Control en vivo del Drone
│   ├── lib/                    # 🟡 Configuraciones de terceros
│   │   ├── aws-s3.ts           # Config de AWS
│   │   └── utils.ts            # clsx y tailwind-merge
│   ├── styles/                 # 🎨 Estilos Globales y Especiales
│   │   ├── globals.css         # Tailwind base
│   │   └── sections/           # CSS Puro (ej. animationscss)
│   ├── types/                  # 🔷 Definiciones TS Globales
│ ext
└── tailwind.config.ts          # Config con tus colores Software DT