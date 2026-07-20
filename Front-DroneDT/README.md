<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DRONE%20DT%20·%20FRONTEND&fontSize=62&fontColor=FFD700&fontAlignY=42&desc=🛸%20Next.js%20App%20Router%20·%20Industrial%20E-Commerce%20·%20Tesla-Minimalist%20UI&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=780&lines=🛸+Aerospace-Inspired+Dashboard+%26+Storefront;⚡+Framer+Motion+%7C+GPU-Accelerated+Transitions;📐+Fluid+Responsive+310px+%E2%86%92+1900px;🐳+Dockerized+%7C+Next.js+16+Turbopack;🏆+%231+GitHub+Committer+en+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://committers.top/colombia#NietoDeveloper">
    <img src="https://img.shields.io/badge/🥇_No._1_Committer-Colombia-FFD700?style=for-the-badge&logoColor=000000"/>
  </a>
  <a href="https://committers.top">
    <img src="https://img.shields.io/badge/🏆_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge&logoColor=000000"/>
  </a>
  <img src="https://img.shields.io/badge/Status-Development-F97316?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Security-Level_S%2B-FF0000?style=for-the-badge&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-GPU_Transitions-FF0088?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-State_Mgmt-000000?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-S3_CDN-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
</p>

<p align="center">
  <a href="https://dronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🛒_Public_Storefront-dronedt.vercel.app-FFD700?style=for-the-badge"/>
  </a>
  <a href="https://dashboarddronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🛠️_Admin_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge"/>
  </a>
  <a href="https://github.com/NietoDeveloper/DroneDT">
    <img src="https://img.shields.io/badge/📂_Monorepo-NietoDeveloper%2FDroneDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> 🛸 **Drone DT — Frontend** es el nodo cliente del ecosistema DroneDT: un dashboard y tienda
> industrial de alto rendimiento inspirado en los paradigmas de diseño aeroespacial (SpaceX
> layout principles). Construido para escalar con precisión visual en resoluciones desde
> **310px hasta 1900px**, con transiciones GPU-aceleradas y renderizado vectorial de precisión.
>
> *Modular · Fluido · Obsesivamente Production-Ready · Construido en Bogotá 🇨🇴*

</div>

---

## 🚀 Engineering Profile

**Desarrollado por:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)
**Rol:** Full-Stack Software Engineer · Frontend Architecture

- 🏆 **Rank:** #1 Committer en Colombia | Top 3 South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** Next.js · TypeScript · Tailwind CSS · Framer Motion · Zustand
- 🎯 **Focus:** HUD telemetry en tiempo real, Bento-Grid dashboards, e-commerce industrial de alta fidelidad visual

---

## 💻 Tech Stack & Performance Core

| Capa | Tecnología | Detalle |
|:-----|:-----------|:--------|
| ⚙️ **Framework** | Next.js | App Router Architecture · React Compiler |
| 🔷 **Lenguaje** | TypeScript | Strict Type Safety |
| 🎨 **Estilos** | Tailwind CSS + PostCSS | Utility-first, tokens de marca custom |
| 🎬 **Animación** | Framer Motion | Transiciones GPU-aceleradas (hardware-accelerated) |
| 🧠 **Estado Global** | Zustand | Store ligero para telemetría y carrito |
| 🖼️ **Render Engine** | `shapeRendering="geometricPrecision"` | Anti-aliasing directo, sin blur en vectores al escalar |
| ☁️ **Infra** | AWS S3 + Docker | Assets estáticos + contenedor listo para Railway/Vercel |

---

## 🏗️ System Architecture (Frontend Node)

```
╔══════════════════════════════════════════════════════════════════════╗
║                     DRONE DT — FRONTEND NODE                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   ┌──────────────────────────┐        ┌──────────────────────────┐   ║
║   │  🛒 (shop) Route Group    │        │  🛠️ (dashboard) Group     │║
║   │  Catálogo · Checkout      │        │  Bento-Grid · HUD         │ ║
║   │  Config. Carga Útil       │        │  Telemetry en vivo        │ ║
║   └────────────┬─────────────┘        └────────────┬──────────────┘  ║
║                │                                    │                ║
║                └─────────────────┬──────────────────┘                ║
║                                  ▼                                   ║
║                  ┌──────────────────────────────┐                    ║
║                  │   🔌 api/ Route Handlers    │                    ║
║                  │   BFF — Backend for Frontend │                    ║
║                  └──────────────┬───────────────┘                    ║
║                                 ▼                                    ║
║                  ┌──────────────────────────────┐                    ║
║                  │   🔧 Core API Engine (back/)  │                  ║
║                  │   Node.js · Express · TS      │                   ║
║                  └───────────────────────────────┘                   ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 🗂️ Directory & Module Structure

Estructura **Feature-First**: cada módulo de negocio (Drones, Shop, Telemetry) crece de forma
independiente sin generar deuda técnica.

```text
drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Routing & Server Components
│   │   ├── (shop)/             # Grupo: E-commerce (drones, shop)
│   │   ├── (dashboard)/        # Grupo: Panel de control (my-account)
│   │   ├── api/                # Route Handlers (BFF)
│   │   ├── layout.tsx          # Layout raíz — viewports globales y wrappers HTML
│   │   └── page.tsx            # Hero Landing / Bento-Grid Dashboard
│   ├── components/             # 🔵 Componentes Atómicos Globales
│   │   ├── ui/                 # Botones, Cards, Inputs, Logo.tsx, Preloader.tsx
│   │   └── layout/              # Navbars, Sidebars, Footers globales
│   ├── features/               # 🔴 LÓGICA DE NEGOCIO CORE (Domain-driven)
│   │   ├── drones/              # Modelos, vistas 3D, especificaciones técnicas
│   │   ├── checkout/            # Carrito y sistema de pagos
│   │   └── telemetry/           # Datos de vuelo en tiempo real
│   ├── lib/                     # 🟡 Configuración de terceros (AWS, utils)
│   ├── styles/                  # 🎨 Estilos globales & secciones Pure CSS
│   ├── types/                   # 🔷 Definiciones TS globales
│   └── store/                   # 🧠 Estado global (Zustand)
├── public/                      # Assets estáticos optimizados
├── Dockerfile                   # Configuración de contenedor
└── tailwind.config.ts           # Identidad visual custom (Gainsboro & Gold)
```

**Componentes UI clave:**

| Componente | Descripción |
|:-----------|:------------|
| `Logo.tsx` | Vector de marca aeroespacial con micro-rotación y glow |
| `Preloader.tsx` | Motor de telemetría L5 — simulación de encendido de dron |

---

## 🎨 Brand Identity (Software DT Styles)

<div align="center">

| Elemento | Variable | Hex |
|:---------|:---------|:----|
| 🟡 Gold Primario | `gold` | `#FFD700` |
| 🟠 Amarillo Acento | `yellowColor` | `#FEB60D` |
| ⚪ Fondo Principal | `gainsboro` | `#DCDCDC` |
| ⚫ Texto / Headings | `headingColor` | `#000000` |

</div>

---

## 🚀 Getting Started

### 1. Clonar e instalar

```bash
git clone https://github.com/NietoDeveloper/drone-dt-frontend.git
cd drone-dt-frontend
npm install
```

### 2. Configurar entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_gateway
AWS_S3_BUCKET=your_bucket_name
```

### 3. Modo desarrollo

```bash
npm run dev
```

App disponible en → `http://localhost:3000`

### 4. Build de producción con Docker

```bash
docker build -t drone-dt-frontend .
docker run -p 3000:3000 drone-dt-frontend
```

---

## 📊 Deploy & Port Mapping

| Nodo | URL Local | Deploy |
|:-----|:----------|:-------|
| 🛒 **Public Storefront** | `http://localhost:3000` | [dronedt.vercel.app](https://dronedt.vercel.app/) |
| 🛠️ **Admin Dashboard** | `http://localhost:3001` | [dashboarddronedt.vercel.app](https://dashboarddronedt.vercel.app/) |

---

## 🗺️ Roadmap

- [x] Bento-Grid Dashboard con HUD telemetry interactivo
- [x] Preloader L5 con simulación de encendido de dron
- [x] Layout fluido responsivo 310px → 1900px
- [x] Integración Framer Motion GPU-aceleradas
- [ ] Vistas 3D de especificaciones de drones (`features/drones`)
- [ ] Telemetría en tiempo real vía WebSockets/Socket.io
- [ ] Modo offline / PWA para operarios de campo

---

## 📄 License

Desarrollo de arquitectura de software protegido bajo **Licencia MIT**.
Todos los derechos reservados © 2026 Manuel Nieto

---

<div align="center">

[![Live Storefront](https://img.shields.io/badge/🛒_Storefront-dronedt.vercel.app-FFD700?style=for-the-badge)](https://dronedt.vercel.app/)
[![Admin Dashboard](https://img.shields.io/badge/🛠️_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge)](https://dashboarddronedt.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![Portfolio](https://img.shields.io/badge/Portfolio-manuelnieto.netlify.app-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://manuelnieto.netlify.app/)

<br/>

[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every line of code is optimized for performance               ║
║    and security. Production-ready by default."                   ║
║                                                                  ║
║                               — NietoDeveloper                   ║
╚══════════════════════════════════════════════════════════════════╝
```

*Drone DT Frontend — Built by **NietoDeveloper · Manuel Nieto***

*Desarrollado con rigor técnico en* 📍 **Bogotá, Colombia** 🇨🇴

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
