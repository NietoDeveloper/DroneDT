# 🛸 Drone DT — Frontend

## Drone Digital Ecosystem

Built for Scalability, Performance, and Precision.

This is the frontend repository for Drone DT, a cutting-edge platform inspired by Tesla's aesthetic and efficiency, designed for drone technology control, visualization, and e-commerce.

## 🛠️ Tech Stack Identity

- **Framework**: Next.js 15+ (App Router & React Compiler)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Pure CSS Modules for critical animations.
- **State Management**: Zustand
- **Infrastructure**: AWS (S3 for assets), Dockerized for Railway/Vercel.
- **UI/UX**: Component-driven development with a "Tesla-minimalist" approach.

## 📐 Scalable Architecture (Feature-Based)

The project utilizes a Feature-First structure, allowing each business module (Drones, Shop, Telemetry) to grow independently without generating technical debt.

```
drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Routing & Server Components
│   │   ├── (shop)/             # Group: E-commerce (drones, shop)
│   │   ├── (dashboard)/        # Group: Control Panel (my-account)
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
```

## 🎨 Brand Identity (Software DT Styles)

| Element | Variable | Hex Code |
|---------|----------|----------|
| Primary Gold | gold | #FFD700 |
| Accent Yellow | yellowColor | #FEB60D |
| Main Background | gainsboro | #DCDCDC |
| Heading / Text | headingColor | #000000 |

## 🚀 Getting Started

### Clone & Install:

```bash
git clone https://github.com/NietoDeveloper/drone-dt-frontend.git
cd drone-dt-frontend
npm install
```

### Environment Setup:

Create a `.env.local` file with your AWS credentials and Backend URL:
```
NEXT_PUBLIC_API_URL=your_api_gateway
AWS_S3_BUCKET=your_bucket_name
```

### Development Mode:

```bash
npm run dev
```
The app will be running at http://localhost:3000

## 🏗️ Docker Production Build

```bash
docker build -t drone-dt-frontend .
docker run -p 3000:3000 drone-dt-frontend
```

🚀 Developed by Manuel Nieto for DroneDT  
🏆 Number 1 Top Committers GitHub Colombia 🇨🇴  

<p align="left">
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia/NietoDeveloper.svg" alt="Committers Top Colombia"></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_public/NietoDeveloper.svg" alt="Committers Top Public"></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_private/NietoDeveloper.svg" alt="Committers Top Private"></a>
</p>

### Bogotá - 2026
