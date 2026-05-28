Aquí tienes el archivo completo con la sintaxis corregida, los bloques de código y las tablas perfectamente formateadas para que los saltos de línea e indentaciones no rompan el renderizado en GitHub.

Copia y pega este bloque de código Markdown tal cual en tu archivo **`README.md`**:

```markdown
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d47a1,100:2196f3&height=200&section=header&text=DroneDT&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Industrial%20Drone%20E-Commerce%20Platform%20%7C%20Colombia&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.x--Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

<br/>

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dashboard-drone-dt.vercel.app/)
[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)
[![AWS Ready](https://img.shields.io/badge/AWS-S3%20%7C%20EC2%20Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

<br/>

> **A high-performance MERN stack e-commerce platform for industrial drone manufacturing in Colombia.**
> Tesla & SpaceX-inspired UI · Secure multi-cluster architecture · Fully containerized · AWS-ready.

<br/>

### 🌐 PRODUCTION NODES ONLINE
**🛒 Public Storefront:** [dronedt.vercel.app](https://dronedt.vercel.app/)  
**🛠️ Employee Admin Dashboard:** [dashboard-drone-dt.vercel.app](https://dashboard-drone-dt.vercel.app/)

<br/>

[🚀 Quick Start](#-quick-start) · [🏗️ Architecture](#%EF%B8%8F-architecture) · [📦 Modules](#-modules) · [🛠️ Tech Stack](#%EF%B8%8F-tech-stack) · [🐳 Docker](#-docker) · [☁️ Deploy](#%EF%B8%8F-deployment) · [🤝 Contributing](#-contributing)

</div>

---

<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=800&color=2196F3&center=true&vCenter=true&multiline=true&width=700&height=80&lines=MERN+Stack+%7C+Next.js+16+%7C+TypeScript;SpaceX+Aesthetics+%7C+Docker+%7C+AWS-Ready;Industrial+Drones+%7C+Colombia+%F0%9F%87%A8%F0%9F%87%B4" alt="Typing SVG"/>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#%EF%B8%8F-architecture)
- [Modules](#-modules)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Quick Start](#-quick-start)
- [Docker Setup](#-docker)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Deployment](#%EF%B8%8F-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**DroneDT** is a full-stack monorepo e-commerce platform purpose-built for the industrial drone manufacturing market in Colombia. Inspired by [SpaceX's website](https://www.spacex.com) design philosophy — immersive visuals, technical minimalism, and zero-friction high-availability UX — it combines a public storefront, a customer portal, and a dedicated employee back-end administration panel into a single structured monorepo environment.


```

┌─────────────────────────────────────────────────────────┐
│                        DroneDT                          │
│                                                         │
│   🛒 Public Shop         👤 Client Panel     🛠️ Dashboard  │
│   (front/)               (panel-cliente/)   (dashboard/)│
│        ↕                        ↕                  ↕    │
│                 ⚡ Express REST API (back/)               │
│                          ↕                              │
│                 🍃 MongoDB Atlas Secure Cluster         │
│                          ↕                              │
│              ☁️ AWS S3 · EC2 · CloudFront               │
└─────────────────────────────────────────────────────────┘

```

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛒 E-Commerce Shop (`front/`)
- Product configurator (drone specs, industrial payloads)
- Cart management & real-time checkout flow
- Enterprise appointment & custom service scheduling
- High-fidelity video hero sections
- SEO-optimized with Next.js App Router

</td>
<td width="50%">

### 🛠️ Back-End Dashboard (`dashboard/`)
- Real-time inventory management (CRUD)
- Core node monitoring ("Users Node Online" telemetry)
- Operational sales analytics with interactive charts
- Granular employee module access
- Automated workflow logs

</td>
</tr>
<tr>
<td width="50%">

### 👤 Client Dashboard (`panel-cliente/`)
- Industrial order tracking & history logs
- Business profile management
- Support desk integration & technical FAQs
- Personalized asset recommendations

</td>
<td width="50%">

### 🔒 Security & Infrastructure
- NextAuth & JWT secure authentication
- Strict validation via [Zod](https://zod.dev/)
- Maximum security double-cluster deployment
- Role-Based Access Control (RBAC)
- Full multi-zone containerization

</td>
</tr>
</table>

---

## 🏗️ Architecture

The infrastructure runs on an optimized **npm workspaces** monorepo layout, isolating responsibilities while sharing type safety boundaries across nodes.


```

drone-dt/                         ← Monorepo root perimeters
├── front/                        ← Public Storefront (Next.js 16 + Turbopack)
├── back/                         ← REST API Core (Node.js + Express + TS)
├── dashboard/                    ← Employee Back-End Admin Panel (Next.js 16)
├── panel-cliente/                ← Client Fleet Management Panel (Next.js)
├── shared/                       ← Unified types & core utility schemas
├── docker-compose.yml            ← Full orchestration matrix
└── package.json                  ← Workspace cluster engine

```

### Data Flow Execution


```

User View (Client/Admin) → Next.js (SSR/Turbopack) → Express API Core (back/) → MongoDB Secure Cluster
↘ AWS S3 (Industrial Media Storage)

```

---

## 📦 Modules

### 1. `front/` — Public Storefront
> SpaceX-inspired storefront — minimalist, dark theme, high-speed rendering.

| Route | Description |
|---|---|
| `/` | Enterprise Landing: hero video, drone models, custom CTAs |
| `/shop/drones` | Configurable industrial aircraft catalog |
| `/shop/accesorios` | Payloads, thermal sensors, and parts listing |
| `/shop/servicios` | Agronomy, mapping, and monitoring packages |

---

### 2. `back/` — REST API Engine
> Scalable Node.js + Express API built with TypeScript and secure database clustering.

| Method | Endpoint | Description | Auth Access |
|---|---|---|---|
| `POST` | `/api/v1/users/register` | Register enterprise user | Public ❌ |
| `POST` | `/api/v1/users/login` | Login node, grants secure JWT | Public ❌ |
| `GET` | `/api/v1/drones` | List active fleet inventory | Public ❌ |
| `POST` | `/api/v1/drones` | Inject new aircraft item | 🔒 Admin / Employee |
| `GET` | `/api/v1/admin/stats` | High-level KPI operational readouts | 🔒 Admin Only |

---

### 3. `dashboard/` — Employee Admin Panel
> Operations hub for telemetry control, logistics tracking, and inventory status.

| Route | Description |
|---|---|
| `/` | Main Grid: Daily sales, active users tracking, stock thresholds |
| `/inventario` | Advanced interface forms for drone specifications control |
| `/users` | Node status dashboard ("Users Node Online" live feed) |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Status / Version |
|---|---|---|
| **Frontend Store** | [Next.js](https://nextjs.org/) + [React](https://react.dev/) | 16.x / 19.x (Turbopack) |
| **Admin Panel** | [Next.js Dashboard](https://nextjs.org/) | 16.x (Standalone Build) |
| **Styling Engine** | [Tailwind CSS](https://tailwindcss.com/) | 4.x Modern Layering |
| **Backend API** | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | v20.x + TypeScript 5.x |
| **Database Core** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Secure Double Cluster Mongoose |
| **Cloud Storage** | [AWS S3](https://aws.amazon.com/s3/) | Industrial Media CDN |
| **Containerization**| [Docker](https://www.docker.com/) | Multi-stage Docker Compose |
| **API Infrastructure**| [Railway](https://railway.app/) | High-Availability Pipelines |
| **App Edge Host** | [Vercel Production](https://vercel.com/) | Edge Network Routing |

</div>

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone [https://github.com/NietoDeveloper/Dashboard-DroneDT.git](https://github.com/NietoDeveloper/Dashboard-DroneDT.git)
cd drone-dt

```

### 2. Install Workspace Cluster Dependencies

```bash
npm install

```

### 3. Run Development Servers via Docker Orchestration

```bash
docker-compose up --build

```

### Local Node Engine Mapping

| Local Node | Endpoint Mapping |
| --- | --- |
| 🔧 **Backend API Engine** | `http://localhost:5000/api/v1` |
| 🛒 **Public Storefront** | `http://localhost:3000` |
| 🛠️ **Employee Admin Panel** | `http://localhost:3001` |

---

## 🗺️ Infrastructure Roadmap

* [x] Monorepo structure with optimized npm workspaces
* [x] Backend REST API Core (Express + TypeScript 5)
* [x] MongoDB Atlas production cluster connection setup
* [x] Next.js 16 Custom Admin Dashboard node deployment
* [x] Vercel Cloud Pipeline configuration bypass (TypeScript compilation validation)
* [x] Responsive layout optimization (Fluid scaling: 310px to 1900px)
* [ ] AWS S3 live asset stream integration
* [ ] Automated CI/CD production release pipelines

---

## 🤝 Contributing

1. **Fork** the repository.
2. **Create** an optimized branch: `git checkout -b feature/allocation-node`.
3. **Commit** changes following conventional guidelines: `git commit -m 'feat: optimize tree-shaking metrics'`.
4. **Push** to origin and open a formal Pull Request.

---

## 📄 License

This software architecture is licensed under the **MIT License** — see the `LICENSE` file for complete asset terms.

---

### 🌌 NIETO LABORATORY

**Lead Enterprise Architect & Systems Engineer:** [Manuel Nieto](https://www.google.com/search?q=https://github.com/NietoDeveloper)

**Deployment Cycle:** Rank S+ Status Verification Matrix

**Last Infrastructure Update:** May 2026 · Bogotá, Colombia

🚀 *Ad Astra per Aspera — Building Next-Gen Digital Twins.*
