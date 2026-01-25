# 🛸 Drone DT — Frontend 
### World-Class Drone Digital Ecosystem  
**Built for Scalability, Performance, and Precision.**

Este es el repositorio del frontend de **Drone DT**, una plataforma de vanguardia inspirada en la estética y eficiencia de Tesla, diseñada para el control, visualización y comercio de tecnología de drones.

---

## 🛠️ Tech Stack Identity

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & React Compiler)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Pure CSS Modules for critical animations.
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Infrastructure:** AWS (S3 for assets), Dockerized for Railway/Vercel.
- **UI/UX:** Component-driven development with a "Tesla-minimalist" approach.

---

## 📐 Scalable Architecture (Feature-Based)

El proyecto utiliza una estructura **Feature-First**, permitiendo que cada módulo del negocio (Drones, Tienda, Telemetría) crezca de forma independiente sin generar deuda técnica.

```text
drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Ruteo y Server Components
│   │   ├── (shop)/             # Group: E-commerce (drones, tienda)
│   │   ├── (dashboard)/        # Group: Panel de control (mi-cuenta)
│   │   ├── api/                # Route Handlers (BFF - Backend for Frontend)
│   │   ├── layout.tsx          # Main Layout (Tesla-style Navigation)
│   │   └── page.tsx            # Hero Landing Page
│   ├── components/             # 🔵 Global Atomic Components
│   │   ├── ui/                 # Base elements (Buttons, Cards, Inputs)
│   │   └── layout/             # Global Navbars, Sidebars & Footers
│   ├── features/               # 🔴 CORE BUSINESS LOGIC (Domain-driven)
│   │   ├── drones/             # Models, 3D Views, Specs
│   │   ├── checkout/           # Cart & Payment systems
│   │   └── telemetry/          # Real-time drone flight data
│   ├── lib/                    # 🟡 Third-party configs (AWS, Utils)
│   ├── styles/                 # 🎨 Global styles & Pure CSS sections
│   ├── types/                  # 🔷 Global TS Definitions
│   └── store/                  # 🧠 Global State (Zustand)
├── public/                     # Static Assets (Optimized Images)
├── Dockerfile                  # Containerization config
└── tailwind.config.ts          # Custom Identity (Gainsboro & Gold)

# Mnauel Nieto