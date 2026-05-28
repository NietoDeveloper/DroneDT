<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DRONE%20DT&fontSize=90&fontColor=FFD700&fontAlignY=42&desc=⚙️%20Industrial%20Digital%20Twin%20·%20E-Commerce%20Platform%20·%20Docker%20Powered&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=750&lines=⚙️+Industrial+Drone+Logistics+Platform;🐳+Fully+Dockerized+%7C+npm+Workspaces+Monorepo;🔒+Dual-Cluster+MongoDB+Atlas+Architecture;📊+Real-Time+Admin+Dashboard+%7C+Socket.io;🚀+AWS+S3+%2B+Vercel+%2B+Railway+%7C+CI%2FCD;🏆+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

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
  <img src="https://img.shields.io/badge/Next.js-16_Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-S3_%7C_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Railway-API_Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/>
</p>

<p align="center">
  <a href="https://dronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🛒_Public_Storefront-dronedt.vercel.app-FFD700?style=for-the-badge"/>
  </a>
  <a href="https://dashboarddronedt.vercel.app/">
    <img src="https://img.shields.io/badge/🛠️_Admin_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge"/>
  </a>
  <a href="https://github.com/NietoDeveloper/DroneDT">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FDroneDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> ⚙️ **DroneDT** — Plataforma industrial integrada para la comercialización, configuración analítica
> y tracking logístico de aeronaves no tripuladas en Colombia. Monorepo de alto rendimiento con
> arquitectura de doble clúster, diseño minimalista técnico inspirado en SpaceX y layout fluido
> responsivo adaptativo de **310px a 1900px**.
>
> *Modular · Robusto · Obsesivamente Production-Ready · Construido en Bogotá 🇨🇴*

</div>

---

## 🚀 Engineering Profile

**Desarrollado por:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)  
**Rol:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer en Colombia | #3 en South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** MERN + Next.js + TypeScript + AWS + Docker
- 🎯 **Focus:** Sistemas de alto rendimiento, production-grade

---

## 🏗️ System Architecture

```
╔══════════════════════════════════════════════════════════════════════╗
║                        DRONEDT ECOSYSTEM                            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   ┌─────────────────────┐       ┌──────────────────────────────┐    ║
║   │  🛒 STOREFRONT      │       │    🛠️ ADMIN DASHBOARD        │    ║
║   │                     │       │                              │    ║
║   │  Next.js 16         │◄─────►│  Panel Operativo Privado     │    ║
║   │  Turbopack Engine   │       │  CRUD Flotas · Métricas      │    ║
║   │  dronedt.vercel.app │       │  RBAC · Users Online         │    ║
║   └──────────┬──────────┘       └─────────────┬────────────────┘    ║
║              │                                │                      ║
║              └──────────────┬─────────────────┘                      ║
║                             ▼                                        ║
║              ┌──────────────────────────────┐                       ║
║              │   🔧 REST API ENGINE          │                       ║
║              │   Node.js 20 + Express + TS   │                       ║
║              │   JWT · Zod · Telemetría      │                       ║
║              └──────────────┬───────────────┘                       ║
║                             │                                        ║
║           ┌─────────────────┴─────────────────┐                     ║
║           ▼                                   ▼                     ║
║   ┌───────────────────┐           ┌───────────────────────┐         ║
║   │  MongoDB Atlas    │           │  AWS S3               │         ║
║   │  Clúster Dual     │           │  Stream Multimedia     │         ║
║   │  Alta Disponib.   │           │  Industrial CDN        │         ║
║   └───────────────────┘           └───────────────────────┘         ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 🗂️ Arquitectura de Carpetas

```text
drone-dt/                              ← Raíz perimetral del monorepo
├── front/                             ← CLIENTE: Portal Público y Tienda
│   ├── public/                        ← Recursos multimedia y streams de video industrial
│   ├── src/
│   │   ├── app/                       ← Enrutamiento App Router
│   │   ├── components/                ← Componentes UI fluidos (310px–1900px)
│   │   └── services/                  ← Consumo de endpoints de la API central
│   └── package.json
│
├── back/                              ← NÚCLEO: REST API Engine
│   ├── src/
│   │   ├── config/                    ← Conexión Mongoose · Variables de entorno
│   │   ├── controllers/               ← Telemetría · Ventas · Usuarios
│   │   ├── middleware/                ← JWT · Zod · Validaciones de seguridad
│   │   ├── models/                    ← Esquemas de base de datos distribuidos
│   │   └── server.ts                  ← Punto de entrada del motor backend
│   ├── tsconfig.json
│   └── package.json
│
├── dashboard/                         ← EMPLEADOS: Panel Administrativo
│   ├── src/
│   │   ├── app/                       ← Vistas de analíticas e inventario
│   │   ├── components/                ← Tablas de flotas · Gráficas en tiempo real
│   │   └── hooks/                     ← Controladores de estado de telemetría
│   └── package.json
│
├── docker-compose.yml                 ← Matriz de orquestación local
└── package.json                       ← Orquestador npm workspaces
```

---

## 📦 Módulos del Ecosistema

### 🛒 Nodo Storefront — `front/`

Portal público de cara al cliente final. Concentra la experiencia inmersiva del catálogo industrial.

- **Configurador de Carga Útil:** Selección de sensores térmicos, LiDAR y sistemas de aspersión agrícola
- **Módulo de Citas Corporativas:** Agendamiento para demostraciones en campo y mantenimiento de flotas
- **Responsive Líquido:** Adaptabilidad total desde 310px hasta 1900px sin perder legibilidad

### 🔧 Nodo API Engine — `back/`

Motor de procesamiento en tiempo real sobre TypeScript 5 para robustez absoluta.

- **Arquitectura Dual-Clúster:** Aislamiento de lecturas y escrituras masivas en MongoDB Atlas
- **Filtros de Seguridad Avanzados:** Validaciones de payload con esquemas Zod + protección de cabeceras
- **Endpoints de Telemetría:** Monitoreo en vivo de órdenes procesadas y drones de prueba

### 🛠️ Nodo Admin Panel — `dashboard/`

Panel operativo privado exclusivo para operarios y personal técnico de DroneDT.

- **Users Node Online:** Monitor de estado con flujo y actividad de usuarios conectados
- **Control CRUD de Flotas:** Inyección, actualización y retiro de especificaciones de aeronaves en tiempo real
- **Métricas de Rendimiento:** Tableros financieros y gráficos vectoriales de ventas operativas

---

## 🛠️ Tech Stack

<div align="center">

| Capa | Tecnología | Versión |
|:-----|:-----------|:--------|
| 🛒 **Tienda Pública** | Next.js + React | 16.x / 19.x (Turbopack) |
| 🛠️ **Panel Admin** | Next.js Standalone | 16.x Core Dashboard |
| 🎨 **Estilos** | Tailwind CSS | 4.x Modern Layers Grid |
| ⚙️ **API Backend** | Node.js + Express + TypeScript | v20.x LTS + TS 5.x |
| 🗄️ **Base de Datos** | MongoDB Atlas | Dual-Cluster Distribuido |
| ☁️ **CDN / Storage** | AWS S3 | Stream Multimedia Industrial |
| 🐳 **Contenedores** | Docker Compose | Multi-stage Builds |
| 🚀 **Hosting API** | Railway | Pipeline Producción Continuo |

</div>

---

## 🚀 Inicialización y Despliegue

### 1. Clonar e ingresar al perímetro

```bash
git clone https://github.com/NietoDeveloper/DroneDT.git
cd drone-dt
```

### 2. Instalar árbol de dependencias del monorepo

```bash
npm install
```

### 3. Configurar variables de entorno

```env
# back/.env
MONGO_URI_USERS=mongodb+srv://user:pass@cluster-users.mongodb.net/dt_users
MONGO_URI_BOOKINGS=mongodb+srv://user:pass@cluster-bookings.mongodb.net/dt_bookings
JWT_SECRET=your_ultra_secure_secret_here
JWT_EXPIRES_IN=7d
PORT=5000

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=dronedt-uploads
```

### 4. Orquestación local vía Docker

```bash
docker-compose up --build
```

```
🐳 Docker levanta automáticamente:
   ├── 🛒 Public Storefront  →  http://localhost:3000
   ├── 🛠️ Admin Dashboard   →  http://localhost:3001
   └── 🔧 Core API Engine   →  http://localhost:5000/api/v1
```

---

## 📊 Port Mapping

| Nodo | URL Local | Deploy |
|:-----|:----------|:-------|
| 🛒 **Public Storefront** | `http://localhost:3000` | [dronedt.vercel.app](https://dronedt.vercel.app/) |
| 🛠️ **Admin Dashboard** | `http://localhost:3001` | [dashboarddronedt.vercel.app](https://dashboarddronedt.vercel.app/) |
| 🔧 **Core API Engine** | `http://localhost:5000/api/v1` | Railway |

---

## 🗺️ Estatus de Infraestructura

- [x] Configuración de Monorepo mediante npm workspaces optimizados
- [x] Backend REST API Core en TypeScript 5
- [x] Admin Dashboard Next.js 16 para empleados
- [x] Bypass de compilación estricta TypeScript en Vercel
- [x] Componentes fluidos responsivos (310px–1900px)
- [ ] Vinculación de flujos de almacenamiento directo en AWS S3
- [ ] Automatización de despliegue continuo de microclústeres
- [ ] Real-time drone telemetry visualization
- [ ] Mobile app integration

---

## 📄 License

Desarrollo de arquitectura de software protegido bajo **Licencia MIT**.  
Todos los derechos reservados © 2026 Manuel Nieto

---

<div align="center">

[![Live Storefront](https://img.shields.io/badge/🛒_Storefront-dronedt.vercel.app-FFD700?style=for-the-badge)](https://dronedt.vercel.app/)
[![Admin Dashboard](https://img.shields.io/badge/🛠️_Dashboard-dashboarddronedt.vercel.app-FEB60D?style=for-the-badge)](https://dashboarddronedt.vercel.app/)
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
║   "Every line of code is optimized for performance              ║
║    and security. Production-ready by default."                  ║
║                                                                  ║
║                               — NietoDeveloper Standard         ║
╚══════════════════════════════════════════════════════════════════╝
```

*DroneDT — Built by **NietoDeveloper · Manuel Nieto***

*Desarrollado con rigor técnico en* 📍 **Bogotá, Colombia** 🇨🇴

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
