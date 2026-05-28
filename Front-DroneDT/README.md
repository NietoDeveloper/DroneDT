<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DRONE%20DT%20Frontend&fontSize=75&fontColor=FFD700&fontAlignY=42&desc=⚡%20Industrial%20Drone%20E-Commerce%20·%20Next.js%2015%20·%20Tesla%20Minimalist%20UI&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=750&lines=🛸+Drone+Digital+Ecosystem+Frontend;⚡+Next.js+15+App+Router+%2B+React+Compiler;🎨+Tesla+Minimalist+UI+%7C+Feature-First+Architecture;🧠+Zustand+State+%7C+Zero+Re-renders;🚀+AWS+S3+%2B+Docker+%2B+Vercel+%7C+CI%2FCD;🏆+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://committers.top/colombia">
    <img src="https://img.shields.io/badge/🥇_No._1_Committer-Colombia-FFD700?style=for-the-badge&logoColor=000000"/>
  </a>
  <a href="https://committers.top">
    <img src="https://img.shields.io/badge/🏆_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge&logoColor=000000"/>
  </a>
  <img src="https://img.shields.io/badge/Status-Production_Ready-00D26A?style=for-the-badge&logo=checkmarx&logoColor=white"/>
  <img src="https://img.shields.io/badge/Security-Level_S%2B-FF0000?style=for-the-badge&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-Custom_Theme-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-State-FF6B35?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-S3_Assets-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

<p align="center">
  <a href="https://dronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Platform-dronedt.vercel.app-FFD700?style=for-the-badge"/>
  </a>
  <a href="https://dashboarddronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🛸_Admin_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge"/>
  </a>
  <a href="https://github.com/NietoDeveloper/DroneDT">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FDroneDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> 🛸 **DroneDT Frontend** — Plataforma de e-commerce industrial y control visual de aeronaves no tripuladas en Colombia.
> Construida con **Next.js 15** App Router, arquitectura Feature-First y estética Tesla-minimalist.
> Escalable, precisa y obsesivamente production-ready.
>
> *Modular · Preciso · Tesla-Minimalist · Construido en Bogotá 🇨🇴*

</div>

---

## 🚀 Engineering Profile

**Desarrollado por:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)  
**Rol:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer en Colombia | #3 en South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** MERN + Next.js + TypeScript + AWS + Docker
- 🎯 **Focus:** Sistemas de alto rendimiento, production-grade

<p align="left">
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia/NietoDeveloper.svg" alt="Committers Top Colombia"/></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_public/NietoDeveloper.svg" alt="Committers Top Public"/></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_private/NietoDeveloper.svg" alt="Committers Top Private"/></a>
</p>

---

## 🛠️ Tech Stack Identity

<div align="center">

| Capa | Tecnología | Enfoque |
|:-----|:-----------|:--------|
| **Framework** | Next.js 15+ (App Router + React Compiler) | Server Components · Turbopack |
| **Language** | TypeScript — Strict Mode | Tipado absoluto · Zero `any` |
| **Styling** | Tailwind CSS + Pure CSS Modules | Animaciones críticas · Tesla aesthetic |
| **State** | Zustand | Feature slices · Zero re-renders |
| **Infrastructure** | AWS S3 + Docker + Railway/Vercel | Assets CDN · CI/CD via Git |
| **UI/UX** | Component-driven · Tesla-minimalist | Fluido 310px–1900px |

</div>

---

## 📐 Arquitectura Feature-First

Cada módulo de negocio (Drones, Shop, Telemetría) crece de forma independiente sin generar deuda técnica.

```
drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Routing & Server Components
│   │   ├── (shop)/             # E-commerce — Drones, catálogo, tienda
│   │   ├── (dashboard)/        # Control Panel — Mi cuenta, pedidos
│   │   ├── api/                # Route Handlers (BFF — Backend for Frontend)
│   │   ├── layout.tsx          # Main Layout — Tesla-style Navigation
│   │   └── page.tsx            # Hero Landing Page
│   ├── components/             # 🔵 Componentes Atómicos Globales
│   │   ├── ui/                 # Base elements — Buttons, Cards, Inputs
│   │   └── layout/             # Navbars, Sidebars & Footers globales
│   ├── features/               # 🔴 CORE BUSINESS LOGIC (Domain-driven)
│   │   ├── drones/             # Modelos, vistas 3D, especificaciones
│   │   ├── checkout/           # Carrito y sistemas de pago
│   │   └── telemetry/          # Datos de vuelo en tiempo real
│   ├── lib/                    # 🟡 Configs de terceros — AWS, Utils
│   ├── styles/                 # 🎨 Estilos globales & Pure CSS sections
│   ├── types/                  # 🔷 Definiciones TypeScript globales
│   └── store/                  # 🧠 Estado global — Zustand slices
├── public/                     # Static Assets (Imágenes optimizadas)
├── Dockerfile                  # Configuración de contenedorización
└── tailwind.config.ts          # Custom Identity — Gainsboro & Gold
```

---

## 🎨 Brand Identity

```javascript
/** tailwind.config.ts — DroneDT Frontend Design Tokens */
export default {
  theme: {
    extend: {
      colors: {
        gold:         "#FFD700",   // 🟡 Primary brand accent
        yellowColor:  "#FEB60D",   // 🟠 Secondary accent
        gainsboro:    "#DCDCDC",   // 🩶 Main background
        headingColor: "#000000",   // ⚫ Headings & display text
        textColor:    "#000000",   // ⚫ Body text
      },
    },
  },
}
```

| Elemento | Variable | Hex |
|:---------|:---------|:----|
| Primary Gold | `gold` | `#FFD700` |
| Accent Yellow | `yellowColor` | `#FEB60D` |
| Main Background | `gainsboro` | `#DCDCDC` |
| Heading / Text | `headingColor` | `#000000` |

---

## ⚙️ Getting Started

### Clonar e instalar

```bash
git clone https://github.com/NietoDeveloper/DroneDT.git
cd drone-dt-frontend
npm install
```

### Variables de entorno

Crea un archivo `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_API_URL=your_api_gateway
AWS_S3_BUCKET=your_bucket_name
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### Modo desarrollo

```bash
npm run dev
# → http://localhost:3000
```

---

## 🐳 Docker Production Build

```bash
# Build
docker build -t drone-dt-frontend .

# Run
docker run -p 3000:3000 drone-dt-frontend
```

---

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en puerto 3000 |
| `npm run build` | Build de producción optimizado |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint — code quality |
| `npm run type-check` | TypeScript strict check |

---

## 📄 License

Desarrollo propietario por **NietoDeveloper** para DroneDT.  
Todos los derechos reservados © 2026 Manuel Nieto

---

<div align="center">

[![Live Platform](https://img.shields.io/badge/🌐_Live_Platform-dronedt.vercel.app-FFD700?style=for-the-badge)](https://dronedt.vercel.app/)
[![Admin Dashboard](https://img.shields.io/badge/🛸_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge)](https://dashboarddronedt.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manuel%20Nieto-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/manuelnietodeveloper)
[![Portfolio](https://img.shields.io/badge/Portfolio-manuelnieto.netlify.app-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://manuelnieto.netlify.app/)

<br/>

[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Built for Scalability, Performance, and Precision."          ║
║                                                                  ║
║                               — NietoDeveloper Standard         ║
╚══════════════════════════════════════════════════════════════════╝
```

*DroneDT Frontend — Built by **NietoDeveloper · Manuel Nieto***

*Desarrollado con rigor técnico en* 📍 **Bogotá, Colombia** 🇨🇴

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
