<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0a0a0a,1a1a1a&height=200&section=header&text=DroneDT%20Admin&fontSize=52&fontColor=FFD700&fontAlignY=38&desc=Industrial%20Drone%20Management%20Platform&descAlignY=58&descSize=18&descAlpha=80&animation=fadeIn" width="100%"/>

<br/>

[![Live Platform](https://img.shields.io/badge/🚀%20Live%20Platform-DroneDT-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://dronedt.vercel.app/)
[![Admin Dashboard](https://img.shields.io/badge/🛸%20Admin%20Dashboard-Control%20Panel-FEB60D?style=for-the-badge&labelColor=0a0a0a)](https://dashboarddronedt.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

</div>

---

## 🛸 DroneDT — Admin Control Panel

Central management engine for **DroneDT**, a world-class platform for drone manufacturing, commercialization, and logistics in Colombia. Built with production-ready **Next.js 15** architecture, designed for high scalability and real-time operations.

> **Live:** [dronedt.vercel.app](https://dronedt.vercel.app/) &nbsp;|&nbsp; **Dashboard:** [dashboarddronedt.vercel.app](https://dashboarddronedt.vercel.app/)

---

## 🚀 Engineering Profile

**Developed by:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)  
**Role:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer in Colombia | #3 in South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** MERN + Next.js + TypeScript + AWS + Docker
- 🎯 **Focus:** High-performance, production-grade systems

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5+ |
| **Styling** | Tailwind CSS (Custom DroneDT Theme) |
| **State Management** | Redux Toolkit / Zustand (Slices architecture) |
| **Authentication** | NextAuth.js |
| **Backend Integration** | RESTful API with dedicated Service Layer |
| **Database** | MongoDB Atlas (MERN Stack) |
| **Infrastructure** | Docker + AWS / Railway / Vercel |
| **Real-time** | Socket.io (WebSockets) |
| **Charts** | Recharts / Chart.js |

---

## 🔑 Key Features

### 📊 Intelligence & Analytics

- **Real-time Dashboard:** Advanced visualization of sales, production status, and drone telemetry
- **Financial Reports:** Integrated finance module for profit/loss tracking and revenue analysis
- **Customer Analytics:** Behavior patterns and segmentation insights

### 📦 Operational Management

- **Order Lifecycle:** Complete tracking from purchase to manufacturing and shipping
- **Inventory Control:** Real-time stock management of drone components and finished products
- **Manufacturing Module:** Monitor assembly line status, production schedules, and quality control
- **Logistics & Shipping:** Route optimization and delivery tracking

### 🤖 Automation & AI

- **AI-Bot Integration:** Management and monitoring of AI-driven customer service
- **Support Center:** Advanced ticketing system for technical drone assistance
- **Automated Workflows:** Smart notifications and process automation

### 🛡 Security & Access Control

- **RBAC (Role-Based Access Control):** Granular permissions for employees and administrators
- **Secure Authentication:** Enterprise-grade login/reset-password flows using NextAuth.js
- **Audit Logs:** Complete tracking of administrative actions
- **Two-Factor Authentication:** Optional 2FA for enhanced security

### 🎨 User Experience

- **Responsive Design:** Optimized for desktop, tablet, and mobile (310px – 1900px)
- **Dark Mode:** Eye-friendly theme for extended work sessions
- **Customizable Dashboard:** Drag-and-drop widget configuration
- **Multi-language Support:** Spanish and English interfaces

---

## 🗂 Project Structure

```
dronedt-admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root Layout — Strict Responsive (310px–1900px)
│   │   ├── page.tsx                    # Preloader Engine & Session Bypass Pipeline
│   │   ├── (auth)/                     # Authentication Zone
│   │   │   ├── login/page.tsx          # Auth Gateway — SpaceX Minimalist UI
│   │   │   └── layout.tsx              # Mesh Background & Panel Shell
│   │   └── (dashboard)/                # Operations Command Center
│   │       ├── layout.tsx              # Master UI Orchestrator & Navbar Pipeline
│   │       ├── page.tsx                # Bento Grid — Real-Time Analytics
│   │       ├── users/page.tsx          # RBAC Operator Management
│   │       ├── products/page.tsx       # Fleet Asset Matrix & Drone CRUD
│   │       ├── chat/page.tsx           # Real-Time Communication Terminal
│   │       └── cms-manager/page.tsx    # Localization & Dictionary Synchronizer
│   ├── components/
│   │   ├── ui/                         # Atomic Design System (SpaceX Aesthetic)
│   │   ├── layout/                     # Sidebar + Navbar Infrastructure
│   │   ├── charts/                     # Vectorial Analytics Layer
│   │   └── dashboard/                  # Telemetry Modules (Fault-Tolerant)
│   ├── store/                          # Global State — Zustand Distributed Store
│   ├── services/                       # Network Ingestion Layer
│   ├── lib/                            # Socket Client & Utilities
│   ├── types/                          # Strict TypeScript Schemas
│   └── config/                         # Navigation Tree & Permissions Matrix
├── tailwind.config.ts                  # Gold (#FFD700), Gainsboro (#DCDCDC) Design Vars
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18+ or 20+
- **Docker** (optional for containerized development)
- **npm** or **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NietoDeveloper/dronedt-admin.git
cd dronedt-admin

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Application
NEXT_PUBLIC_APP_NAME=DroneDT Admin
NEXT_PUBLIC_APP_URL=http://localhost:3001
NODE_ENV=development

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-key-change-this

# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/dronedt

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=dronedt-uploads

# Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

```bash
# 4. Run development server
npm run dev
# → http://localhost:3001
```

---

## 🐳 Docker Deployment

```bash
# Development
docker-compose up -d

# Production build
docker build -t dronedt-admin:latest .
docker run -p 3001:3001 --env-file .env.production dronedt-admin:latest

# Multi-stage production
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run format` | Format code with Prettier |

---

## 🎨 Design Identity

| Token | Value |
|-------|-------|
| **Primary Gold** | `#FFD700` |
| **Secondary Gold** | `#FEB60D` |
| **Background** | `#DCDCDC` (Gainsboro) |
| **Dark Base** | `#0a0a0a` |
| **Aesthetic** | Tesla-inspired minimalist |

---

## 📈 Performance & Quality

✅ React Compiler — optimized rendering  
✅ Code Splitting — automatic route-based  
✅ Image Optimization — Next.js lazy loading  
✅ Bundle Analysis — regular audits  
✅ CI/CD Pipeline — Vercel + AWS ready  
✅ TypeScript Strict — full enforcement  
✅ Security — regular dependency audits  
✅ Monitoring — error tracking ready  

---

## 🗺 Roadmap

- [x] Core admin dashboard
- [x] Order management system
- [x] Inventory control
- [x] Manufacturing module
- [ ] Advanced AI-bot analytics dashboard
- [ ] Mobile app integration
- [ ] Multi-warehouse support
- [ ] Advanced reporting engine
- [ ] Real-time drone telemetry visualization

---

## 📄 License

Proprietary software developed by **NietoDeveloper** for DroneDT.  
All rights reserved © 2026 Manuel Nieto

---

<div align="center">

## 📬 Contact

[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NietoDeveloper)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manuel%20Nieto-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/manuelnietodeveloper)
[![Portfolio](https://img.shields.io/badge/Portfolio-manuelnieto.netlify.app-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://manuelnieto.netlify.app/)
[![Email](https://img.shields.io/badge/Email-contact@nietodev.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@nietodev.com)

<br/>

[![Platform](https://img.shields.io/badge/🌐%20Live%20Platform-dronedt.vercel.app-FFD700?style=flat-square&labelColor=0a0a0a)](https://dronedt.vercel.app/)
&nbsp;
[![Dashboard](https://img.shields.io/badge/🛸%20Admin%20Dashboard-dashboarddronedt.vercel.app-FEB60D?style=flat-square&labelColor=0a0a0a)](https://dashboarddronedt.vercel.app/)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0a0a0a,1a1a1a&height=120&section=footer&text=Empowering%20Colombia%27s%20Drone%20Industry&fontSize=16&fontColor=FFD700&fontAlignY=65&animation=fadeIn" width="100%"/>

</div>
