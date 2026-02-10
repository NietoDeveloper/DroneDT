# 🛸 DroneDT - Admin Control Panel

Central management engine for **DroneDT**, a world-class platform for drone manufacturing, commercialization, and logistics in Colombia. Built with production-ready **Next.js 15** architecture, designed for high scalability and real-time operations.

---

## 🚀 Engineering Profile

**Developed by:** Manuel Nieto (NietoDeveloper)  
**Role:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer in Colombia | #4 in South & Central America ([committers.top](https://committers.top))
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

## 📂 Project Structure

```plaintext
dronedt-admin/
├── src/
│   ├── app/                # Next.js App Router (Auth & Dashboard route groups)
│   │   ├── (auth)/        # Authentication pages (login, reset-password)
│   │   ├── (dashboard)/   # Main dashboard and admin modules
│   │   └── api/           # API routes (NextAuth, uploads, webhooks)
│   ├── components/         # Atomic UI components, Layouts, and Charts
│   │   ├── ui/            # Base components (Button, Input, Modal, Table)
│   │   ├── layout/        # Sidebar, Header, PageHeader
│   │   ├── charts/        # Data visualization components
│   │   ├── dashboard/     # Dashboard-specific widgets
│   │   ├── orders/        # Order management components
│   │   └── products/      # Product management components
│   ├── lib/               # API clients, utilities, and shared constants
│   │   ├── api/           # Axios client and endpoint definitions
│   │   ├── auth/          # NextAuth configuration and RBAC
│   │   ├── utils/         # Helper functions and formatters
│   │   └── constants/     # App-wide constants and configurations
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication hook
│   │   ├── usePermissions.ts  # Role-based access control
│   │   └── useDebounce.ts # Performance optimization hooks
│   ├── store/             # Global state management (Redux/Zustand)
│   │   ├── slices/        # Feature-based state slices
│   │   └── index.ts       # Store configuration
│   ├── services/          # Business logic abstraction (API calls)
│   │   ├── authService.ts
│   │   ├── orderService.ts
│   │   ├── productService.ts
│   │   └── customerService.ts
│   ├── types/             # Strict TypeScript definitions
│   │   ├── order.types.ts
│   │   ├── product.types.ts
│   │   └── user.types.ts
│   └── config/            # Application configuration
│       ├── navigation.ts  # Sidebar navigation structure
│       └── permissions.ts # RBAC permission matrix
├── public/                # Static assets
│   ├── images/           # Images and logos
│   ├── icons/            # Icon assets
│   └── fonts/            # Custom fonts
├── tests/                # Testing suites
│   ├── unit/             # Unit tests
│   └── e2e/              # End-to-End tests (Playwright/Cypress)
├── .env.example          # Environment variables template
├── .env.local            # Local environment configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Docker containerization
├── docker-compose.yml    # Multi-container orchestration
└── README.md             # This file
```

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

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Dark Mode:** Eye-friendly theme for extended work sessions
- **Customizable Dashboard:** Drag-and-drop widget configuration
- **Multi-language Support:** Spanish and English interfaces

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18+ or 20+
- **Docker** (Optional for containerized development)
- **npm** or **pnpm** package manager
- **Git** for version control

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
