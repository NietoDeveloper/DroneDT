<div align="center">

Platform%20%7C%20Colombia&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<!-- BADGES -->
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)
[![AWS Ready](https://img.shields.io/badge/AWS-S3%20%7C%20EC2%20Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

<br/>

> **A high-performance MERN stack e-commerce platform for industrial drone manufacturing in Colombia.**
> Tesla-inspired UI · Secure multi-panel architecture · Fully containerized · AWS-ready.

<br/>

<!-- QUICK NAVIGATION -->
[🚀 Quick Start](#-quick-start) · [🏗️ Architecture](#%EF%B8%8F-architecture) · [📦 Modules](#-modules) · [🛠️ Tech Stack](#%EF%B8%8F-tech-stack) · [🐳 Docker](#-docker) · [☁️ Deploy](#%EF%B8%8F-deployment) · [🤝 Contributing](#-contributing)

</div>

---

<!-- ANIMATED DEMO GIF PLACEHOLDER -->
<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=800&color=2196F3&center=true&vCenter=true&multiline=true&width=700&height=80&lines=MERN+Stack+%7C+Next.js+15+%7C+TypeScript;Tesla-Inspired+UI+%7C+Docker+%7C+AWS-Ready;Industrial+Drones+%7C+Colombia+%F0%9F%87%A8%F0%9F%87%B4" alt="Typing SVG"/>
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

**DroneDT** is a full-stack monorepo e-commerce platform purpose-built for the industrial drone manufacturing market in Colombia. Inspired by [Tesla's website](https://www.tesla.com) design philosophy — immersive visuals, product configurators, and zero-friction UX — it combines a public storefront, a customer dashboard, and an employee admin panel into one cohesive system.

```
┌─────────────────────────────────────────────────────────┐
│                        DroneDT                          │
│                                                         │
│  🛒 Public Shop   👤 Client Panel   🛠️ Employee Panel   │
│        ↕                 ↕                  ↕           │
│              ⚡ Express REST API (back/)                 │
│                          ↕                              │
│        🍃 MongoDB Atlas    +    🗄️ PostgreSQL (SQL)      │
│                          ↕                              │
│              ☁️ AWS S3 · EC2 · CloudFront                │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛒 E-Commerce Shop
- Product configurator (drone specs, add-ons)
- Cart management & checkout flow
- Appointment & service scheduling
- 4K video hero sections
- SEO-optimized with Next.js 15 App Router

</td>
<td width="50%">

### 🛠️ Admin / Employee Panel
- Real-time inventory management (CRUD)
- Sales analytics with charts
- User & role management
- Appointment tracking
- AI bot integration *(planned)*

</td>
</tr>
<tr>
<td width="50%">

### 👤 Client Dashboard
- Order tracking & history
- Profile management
- Support chat / FAQ
- Personalized recommendations

</td>
<td width="50%">

### 🔒 Security & Scalability
- JWT authentication with refresh tokens
- Input validation via [Zod](https://zod.dev/)
- Hybrid DB: MongoDB Atlas + PostgreSQL
- Role-based access control (RBAC)
- Docker-first local development

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
drone-dt/                         ← Monorepo root
├── front/                        ← Public Shop  (Next.js 15 + Tailwind)
├── back/                         ← REST API     (Express + TypeScript)
├── panel-cliente/                ← Client Panel (Next.js + Auth)
├── panel-empleados/              ← Admin Panel  (Next.js + RBAC)
├── shared/                       ← Shared types & utils (TypeScript)
├── docker-compose.yml            ← Full local orchestration
└── package.json                  ← Workspace config
```

### Data Flow

```
Browser → Next.js (SSR/SSG) → Express API → MongoDB Atlas / PostgreSQL
                                         ↘ AWS S3 (media storage)
                                         ↘ AI Bot API (planned)
```

---

## 📦 Modules

### 1. `front/` — Public E-Commerce Shop

> Tesla-inspired storefront — minimalist, fast, immersive.

| Route | Description |
|---|---|
| `/` | Home: hero, drone models, CTAs |
| `/shop/drones` | Interactive drone catalog |
| `/shop/accesorios` | Accessories listing |
| `/shop/servicios` | Service packages |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/legal/privacidad` | Privacy policy |
| `/legal/terminos` | Terms of service |

**Key components:**
- `Header.tsx` — Fixed navbar, responsive hamburger menu
- `Footer.tsx` — Links to shop, support, legal
- `sections/Hero.tsx` — Full-screen 4K drone video
- `sections/FeaturesDrones.tsx` — Animated product cards

---

### 2. `back/` — REST API Engine

> Scalable Node.js + Express API with dual-database architecture.

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/users/register` | Register new user | ❌ |
| `POST` | `/api/users/login` | Login, returns JWT | ❌ |
| `GET` | `/api/drones` | List all drones | ❌ |
| `GET` | `/api/drones/:id` | Drone detail | ❌ |
| `POST` | `/api/drones` | Create drone | 🔒 Admin |
| `PUT` | `/api/drones/:id` | Update drone | 🔒 Admin |
| `DELETE`| `/api/drones/:id` | Delete drone | 🔒 Admin |
| `GET` | `/api/orders` | User orders | 🔒 User |
| `POST` | `/api/orders` | Place order | 🔒 User |
| `GET` | `/api/admin/stats` | Dashboard metrics | 🔒 Admin |

---

### 3. `panel-cliente/` — Customer Dashboard

> Self-service portal for customers post-purchase.

| Route | Description |
|---|---|
| `/` | Summary: recent orders, quick actions |
| `/ordenes` | Full order history with filters |
| `/perfil` | Edit profile, preferences |
| `/soporte` | Support chat & FAQ |

---

### 4. `panel-empleados/` — Employee Admin Panel

> Internal tool for operations, inventory, and analytics.

| Route | Description |
|---|---|
| `/` | KPI Dashboard: daily sales, low stock alerts |
| `/inventario` | Drone & accessory CRUD forms |
| `/ventas` | Sales reports, Chart.js graphs |
| `/usuarios` | Manage customers & employees |
| `/configuracion` | App settings, integrations |

---

### 5. `shared/` — Shared Packages

```typescript
// shared/types/index.ts
export interface IDrone {
  _id: string;
  name: string;
  price: number;
  specs: DroneSpecs;
  stock: number;
  imageUrl: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: 'client' | 'employee' | 'admin';
  createdAt: Date;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Version |
|---|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) + [React](https://react.dev/) | 15 / 19 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| **State** | [Zustand](https://zustand-demo.pmnd.rs/) / [Redux Toolkit](https://redux-toolkit.js.org/) | latest |
| **Backend** | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | 20 / 5 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.x |
| **NoSQL DB** | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com/) | 8.x |
| **SQL DB** | [PostgreSQL](https://www.postgresql.org/) | 16 |
| **Auth** | [JWT](https://jwt.io/) + [bcrypt](https://www.npmjs.com/package/bcrypt) | — |
| **Validation** | [Zod](https://zod.dev/) | 3.x |
| **Media** | [AWS S3](https://aws.amazon.com/s3/) | — |
| **Containerization** | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) | latest |
| **Deploy (API)** | [Railway](https://railway.app/) | — |
| **Deploy (Front)** | [Vercel](https://vercel.com/) | — |

</div>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm 10+](https://img.shields.io/badge/npm-10%2B-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Docker](https://img.shields.io/badge/Docker-latest-2496ED?logo=docker&logoColor=white)](https://www.docker.com/get-started)
[![Git](https://img.shields.io/badge/Git-latest-F05032?logo=git&logoColor=white)](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dronedt-project.git
cd dronedt-project
```

### 2. Install all dependencies (workspace)

```bash
npm install
```

Or install individually:

```bash
# Backend
cd back && npm install

# Public shop
cd ../front && npm install

# Client panel
cd ../panel-cliente && npm install

# Employee panel
cd ../panel-empleados && npm install
```

### 3. Set up environment variables

Copy and fill in each `.env.example`:

```bash
cp back/.env.example back/.env
cp front/.env.example front/.env.local
cp panel-cliente/.env.example panel-cliente/.env.local
cp panel-empleados/.env.example panel-empleados/.env.local
```

### 4. Run with Docker (recommended)

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| 🔧 Backend API | http://localhost:4000 |
| 🛒 Public Shop | http://localhost:3001 |
| 👤 Client Panel | http://localhost:3002 |
| 🛠️ Employee Panel | http://localhost:3003 |

### 5. Run manually (alternative)

```bash
# Terminal 1 — Backend
cd back && npm run dev

# Terminal 2 — Public Shop
cd front && npm run dev

# Terminal 3 — Client Panel
cd panel-cliente && npm run dev

# Terminal 4 — Employee Panel
cd panel-empleados && npm run dev
```

---

## 🐳 Docker

The project is fully containerized. The `docker-compose.yml` orchestrates all services:

```yaml
# docker-compose.yml (simplified)
services:
  back:
    build: ./back
    ports: ["4000:4000"]
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on: [mongo]

  front:
    build: ./front
    ports: ["3001:3000"]

  panel-cliente:
    build: ./panel-cliente
    ports: ["3002:3000"]

  panel-empleados:
    build: ./panel-empleados
    ports: ["3003:3000"]

  mongo:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo_data:/data/db]
```

### Useful Docker commands

```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f back

# Rebuild a single service
docker-compose up --build back

# Remove volumes (reset DB)
docker-compose down -v
```

---

## 🔑 Environment Variables

### `back/.env`

```env
# Server
PORT=4000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dronedt

# PostgreSQL (payments)
DATABASE_URL=postgresql://user:password@localhost:5432/dronedt_payments

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# AWS S3 (media storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=dronedt-media

# CORS
FRONTEND_URL=http://localhost:3001
```

### `front/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

---

## 📁 Project Structure

```
drone-dt/
├── front/                         ← 🛒 Public E-Commerce Shop
│   ├── app/
│   │   ├── layout.tsx             ← Root layout (Geist fonts, metadata)
│   │   ├── page.tsx               ← Home: hero, models, shop
│   │   ├── shop/
│   │   │   ├── drones/page.tsx    ← Drone catalog
│   │   │   ├── accesorios/page.tsx
│   │   │   └── servicios/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── legal/
│   │       ├── privacidad/page.tsx
│   │       ├── terminos/page.tsx
│   │       └── cookies/page.tsx
│   ├── components/
│   │   ├── ui/                    ← Button, Card, Input (Tailwind)
│   │   ├── layout/
│   │   │   ├── Header.tsx         ← Fixed navbar, responsive
│   │   │   └── Footer.tsx
│   │   └── sections/              ← Hero, FeaturesDrones, Testimonials
│   ├── lib/                       ← API fetchers → /back/
│   ├── styles/globals.css
│   └── package.json
│
├── back/                          ← ⚡ REST API
│   ├── src/
│   │   ├── index.ts               ← Entry: app.listen()
│   │   ├── routes/
│   │   │   ├── drones.ts          ← /api/drones (CRUD)
│   │   │   ├── users.ts           ← /api/users (auth)
│   │   │   ├── orders.ts          ← /api/orders
│   │   │   └── admin.ts           ← Admin-only endpoints
│   │   ├── models/
│   │   │   ├── Drone.ts           ← Mongoose schema
│   │   │   ├── User.ts
│   │   │   └── Order.ts
│   │   ├── controllers/
│   │   ├── middleware/            ← Auth, error handling
│   │   └── config/db.ts          ← MongoDB connection
│   ├── Dockerfile
│   └── package.json
│
├── panel-cliente/                 ← 👤 Client Dashboard
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← Order summary
│   │   ├── ordenes/page.tsx
│   │   ├── perfil/page.tsx
│   │   └── soporte/page.tsx
│   └── package.json
│
├── panel-empleados/               ← 🛠️ Employee Admin Panel
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← KPIs dashboard
│   │   ├── inventario/page.tsx
│   │   ├── ventas/page.tsx
│   │   ├── usuarios/page.tsx
│   │   └── configuracion/page.tsx
│   └── package.json
│
├── shared/                        ← 🔗 Shared types & utils
│   ├── types/                     ← IDrone, IUser, IOrder
│   └── utils/                     ← formatCurrency, validateEmail
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── package.json                   ← Workspaces config
```

---

## ☁️ Deployment

### Backend → Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Push `back/` to your repository.
2. Connect the repo on [Railway](https://railway.app/).
3. Set environment variables in the Railway dashboard.
4. Railway auto-detects the `Dockerfile` and deploys.

```bash
# railway.toml (optional)
[build]
  builder = "DOCKERFILE"
  dockerfilePath = "back/Dockerfile"

[deploy]
  startCommand = "npm start"
  restartPolicyType = "ON_FAILURE"
```

---

### Frontend & Panels → Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Connect your monorepo on [Vercel](https://vercel.com/).
2. Set **Root Directory** to `front/`, `panel-cliente/`, or `panel-empleados/` for each project.
3. Add environment variables in Vercel's project settings.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy public shop
cd front && vercel --prod

# Deploy client panel
cd ../panel-cliente && vercel --prod

# Deploy employee panel
cd ../panel-empleados && vercel --prod
```

---

### AWS Integration *(planned)*

| Service | Use |
|---|---|
| [S3](https://aws.amazon.com/s3/) | Drone images & 4K video storage |
| [EC2](https://aws.amazon.com/ec2/) | Backend production server |
| [CloudFront](https://aws.amazon.com/cloudfront/) | CDN for media assets |
| [RDS](https://aws.amazon.com/rds/) | Managed PostgreSQL for payments |

---

## 🗺️ Roadmap

- [x] Monorepo setup with npm workspaces
- [x] Backend REST API (Express + TypeScript)
- [x] MongoDB Atlas integration (Mongoose)
- [x] JWT authentication & RBAC
- [x] Public shop (Next.js 15 + Tailwind)
- [x] Client dashboard
- [x] Employee admin panel
- [x] Docker Compose full orchestration
- [ ] PostgreSQL integration for payments
- [ ] AWS S3 media uploads
- [ ] AI bot for customer support
- [ ] Stripe / PayU payment gateway
- [ ] Real-time notifications (WebSockets)
- [ ] PWA support
- [ ] End-to-end tests (Playwright)
- [ ] CI/CD pipeline (GitHub Actions)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'feat: add your feature description'
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style (no logic change) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Build process or tooling |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

For questions, support, or business inquiries:

[![Email](https://img.shields.io/badge/Email-contact@dronedt.co-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@dronedt.co)
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username/dronedt-project/issues)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2196f3,100:0d47a1&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
