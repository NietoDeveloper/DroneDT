# 🛸 DroneDT - Admin Control Panel

Central management engine for **DroneDT**, a world-class platform for drone manufacturing, commercialization, and logistics in Colombia. Built with production-ready **Next.js 15** architecture, designed for high scalability and real-time operations.

---

## 🚀 Engineering Profile

**Developed by:** Manuel Nieto (NietoDeveloper)  
**Role:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer in Colombia | #3 in South & Central America ([committers.top](https://committers.top))
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
dronedt-admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root Layout: Unified Viewport Configurator (Strict Responsive Constraints: 310px - 1900px)
│   │   ├── page.tsx                    # System Bootstrapper: Preloader Engine with Direct Access Gateway & Session Bypass Pipeline
│   │   ├── (auth)/                     # CRYPTOGRAPHIC ACCESS FLUX ZONE
│   │   │   ├── login/page.tsx          # Authentication Gateway UI: SpaceX Minimalist Aesthetic featuring Gold (#FFD700) Action Nodes
│   │   │   └── layout.tsx              # Reactive Mesh Matrix Background & Structural Panel Centering Shell
│   │   └── (dashboard)/                # MISSION-CRITICAL L5 OPERATIONS COMMAND CENTER
│   │       ├── layout.tsx              # Master UI Orchestrator: Dynamic Sidebar Injection & Core Navbar Pipeline
│   │       ├── page.tsx                # Operations Matrix: High-Density Bento Grid containing Real-Time Analytical Engines
│   │       ├── users/page.tsx          # Operator Management Core: RBAC Authorization Matrix & Lifecycle Provisioning
│   │       ├── products/page.tsx       # Fleet Asset Matrix: Digital Twin (DT) Indirection Layer & Industrial Drone CRUD
│   │       ├── chat/page.tsx           # Encrypted Node-to-Node Real-Time Communication Terminal
│   │       └── cms-manager/page.tsx    # Localization Core: Public Frontend String Injection & Dictionary Synchronizer
│   ├── components/
│   │   ├── ui/                         # ATOMIC HIGH-FIDELITY DESIGN SYSTEM (SpaceX Aesthetic Standard)
│   │   │   ├── button.tsx              # Aerospace-Grade Interactive Primitives (Gold & Gainsboro Color Spectrum Protocols)
│   │   │   ├── input.tsx               # Low-Luminance Fields with Reactive Hover Overlays & Neon Focus Matrix
│   │   │   └── dialog.tsx              # Floating HUD Modals with Backdrop-Blur Isolation Barriers
│   │   ├── layout/                     # NAVIGATION INFRASTRUCTURE WRAPPERS
│   │   │   ├── Sidebar.tsx             # Collapsible Control Rail Optimized for Ultra-High-Density Pixels on 4K Monitors
│   │   │   └── Navbar.tsx              # Master HUD Status Rail: Heartbeat Telemetries, Critical Alerts & Operator Signatures
│   │   ├── charts/                     # VECTORIAL ANALYTICS RECONSTRUCTION LAYER
│   │   │   └── SalesCharts.tsx         # Historical & Projected Commercial Performance Data-Streams (Diurnal/Mensual/Annual)
│   │   └── dashboard/                  # SYSTEM CORE TELEMETRY MODULES (Fault-Tolerant)
│   │       ├── SalesCentralizer.tsx    # Uninterrupted Streaming Engine for Financial Events (Live Data Core Module)
│   │       ├── InventoryCard.tsx       # Asset Node Encapsulation: Strict L5 Null-Shield Guard with Autonomous Mock Injection
│   │       ├── InventoryGrid.tsx       # Balanced Bento-Grid Matrix with Dynamic Aspect-Ratio Self-Adaptation
│   │       ├── LiveVideoPlayer.tsx     # Low-Latency HUD Feed Streamer for UAV Real-Time Telemetry Feeds
│   │       └── ErrorShield.tsx         # Perimetric Isolation Barrier catching Runtime Exceptions before Main Thread Failures
│   ├── store/                          # GLOBAL STATE CENTRALIZATION LAYER (Zustand Distributed Store)
│   │   ├── slices/                     # Atomic Data Decoupling & Independent State Slices
│   │   │   ├── useSalesStore.ts        # Real-Time Financial Influx & Volume Analytics Aggregator
│   │   │   ├── useInventoryStore.ts    # Industrial UAV Stock Indexing & Telemetric Inventory Control Rail
│   │   │   ├── useChatStore.ts         # Full-Duplex Network Buffering & Persistent WebSocket Logging Slices
│   │   │   └── useUserAdminStore.ts    # Security Context Management: Operator Roles & Access Permissions (RBAC)
│   │   └── index.ts                    # Single Point of Unification & Clean Structural Interface Export
│   ├── services/                       # NETWORK INGESTION LAYER (Client Monolithic Bridge to Express.js Backend)
│   │   ├── userService.ts              # Authorization Token Exchange & Cryptographic Credential Passing Handlers
│   │   ├── productService.ts           # Hardware Asset Dispatcher managing Remote State Mutations & CRUD Execution
│   │   └── cmsService.ts               # Public Manifest Synchronization & Client-Side Dictionary Mutation Hook
│   ├── lib/
│   │   ├── api/socket-client.ts        # Isolated WebSocket Manager handling Duplex Streams with Automated Backoff Retries
│   │   └── utils/formatters.ts         # High-Precision Mathematical Parsers for ISO Date Formats & Financial Valuations
│   ├── types/                          # STRATIFIED DATA SCHEMAS (Strict TypeScript Typings Layer)
│   │   ├── user.types.ts               # Structural Typing definitions for Operator Contexts & Security Privileges
│   │   ├── sales.types.ts              # Financial Stream Models & Analytical Event Payloads
│   │   └── product.types.ts            # UAV Specifications Schemas: Core Load Capacity, Firmware Matrix & Stock Structs
│   └── config/
│   │   ├── navigation.ts               # Static Navigation Tree Matrix & Icon Vector Mapping for Sidebar Rails
│   │   └── permissions.ts              # Access Control Matrix defining Strict Access Rules across System Nodes
├── tailwind.config.ts                  # Industrial Design Variable Matrix: Gold (#FFD700), Gainsboro (#DCDCDC) & Muted Zinc
└── README.md                           # Core Technical Manifesto — Nieto Laboratory Elite Operations Guide
---

## 🔑 Key Features

### 📊 Intelligence & Analytics

- **Real-time Dashboard:** Advanced visualization of sales, production status, and drone telemetry
- **Financial Reports:** Integrated finance module for profit/loss tracking and revenue analysis
- **Customer Analytics:** Behavior patterns and segmentation insights

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/NietoDeveloper/dronedt-admin.git
cd dronedt-admin
```

1. **Install dependencies:**

```bash
npm install
# or
pnpm install
```

1. **Setup environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

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

# Payment Gateway (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

1. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🐳 Docker Deployment

### Development Environment

```bash
docker-compose up -d
```

### Production Build

```bash
# Build the image
docker build -t dronedt-admin:latest .

# Run the container
docker run -p 3001:3001 \
  --env-file .env.production \
  dronedt-admin:latest
```

### Multi-stage Production Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run format` | Format code with Prettier |

---

## 🎨 Design Identity

The UI follows the **Software DT** design language:

- **Primary Colors:**
  - Gold: `#FFD700`
  - Yellow: `#FEB60D`
- **Background:** Gainsboro `#DCDCDC`
- **Typography:** Clean, high-readability fonts optimized for data-heavy environments
- **Components:** Tesla-inspired minimalist design with focus on functionality

---

## 📈 Performance & Quality Standards

✅ **React Compiler:** Activated for optimized rendering and performance  
✅ **Code Splitting:** Automatic route-based code splitting  
✅ **Image Optimization:** Next.js Image component with lazy loading  
✅ **Bundle Analysis:** Regular performance audits  
✅ **CI/CD Pipeline:** Optimized for Vercel/AWS deployment  
✅ **Code Quality:** Strict TypeScript enforcement and ESLint configurations  
✅ **Security:** Regular dependency audits and security patches  
✅ **Monitoring:** Error tracking and performance monitoring ready  

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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software developed by **NietoDeveloper** for DroneDT.  
All rights reserved © 2025 Manuel Nieto

---

## 📧 Contact

**Manuel Nieto** - Full-Stack Software Engineer  

- GitHub: [@NietoDeveloper](https://github.com/NietoDeveloper)
- LinkedIn: [Manuel Nieto](https://linkedin.com/in/manuelnietodeveloper)
- Email: <contact@nietodev.com>

---

**Built with precision and passion by NietoDeveloper** 🚀

## *Empowering Colombia's drone industry through world-class software engineering*

### 2026
