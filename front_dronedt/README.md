src/
├── app/                  # Next.js App Router (Solo ruteo y Server Components)
│   ├── (auth)/           # Route Group: Login, Register
│   ├── (dashboard)/      # Route Group: Panel de control de drones
│   ├── api/              # Route Handlers (BFF - Backend For Frontend)
│   └── layout.tsx        # Root layout
├── components/           # Componentes Globales y Atómicos
│   ├── ui/               # Botones, Inputs (shadcn style / Tailwind puro)
│   ├── common/           # Navbar, Footer, Sidebar
│   └── icons/            # SVGs optimizados como componentes TSX
├── features/             # EL CORAZÓN DE LA APP (Arquitectura Modular)
│   ├── drone-control/    # Todo lo relacionado con el manejo del drone
│   │   ├── components/   # Componentes exclusivos de esta feature
│   │   ├── hooks/        # useDroneStatus, useFlightPath
│   │   ├── services/     # Llamadas a la API específicas
│   │   └── types/        # Interfaces TS de drones
│   └── telemetry/        # Gráficos, datos en tiempo real
├── hooks/                # Hooks globales (useLocalStorage, useAuth)
├── lib/                  # Configuraciones (axios, prisma, aws-sdk)
├── store/                # Estado global (Zustand es el estándar en 2026)
├── styles/               # CSS Puro para secciones críticas + Global CSS
└── utils/                # Funciones puras (formateo de fechas, coordenadas)