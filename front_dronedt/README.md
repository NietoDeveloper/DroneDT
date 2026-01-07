# DroneDT - Frontend

DroneDT is a high-performance web application built with Next.js 15. It features a dual-interface architecture designed to handle a customer-facing storefront and a robust administrative control panel for internal management.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Custom "Software DT" Theme)
- **Optimization**: React Compiler (Enabled)
- **Architecture**: Modular component-based design with strict separation of concerns.

## 🎨 Design System & Identity

The project implements a custom design language based on the Software DT identity, utilizing a high-contrast palette and Tesla-inspired UI elements.

### Color Palette

| Element     | Hex Code | Variable           |
|-------------|----------|--------------------|
| Primary     | #FFD700 | --color-gold       |
| Accent      | #FEB60D | --color-yellow-color |
| Background  | #DCDCDC | --color-gainsboro  |
| Typography  | #000000 | --color-text-color |
| Action Red  | #E81922 | --color-dt-red     |

### Key UI Features

- **Tesla-style Animations**: Custom fadeIn transitions with cubic-bezier easing.
- **Modular Layers**: Clean separation between base styles, components (buttons, containers), and utilities.
- **Responsive Design**: Optimized for seamless performance across all device types.

## 📂 Project Structure

```
src/
├── app/
│   ├── (shop)/         # Customer-facing storefront flow
│   └── (admin)/        # Admin & Employee control panel flow
├── components/         # Atomic and molecular UI components
├── lib/                # API services, hooks, and core logic
├── styles/             # Tailwind v4 configuration and global CSS
└── types/              # TypeScript definitions and interfaces
```

## ⚙️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NietoDevelooper/drone-dt-front.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment:
   Create a .env.local file in the root directory:

   ```bash
   NEXT_PUBLIC_API_URL=http://your-backend-api-url
   ```

4. Launch Development Server:

   ```bash
   npm run dev
   ```

## 🎯 MVP Development Roadmap

The current development phase focuses on the core functional modules required for production:

- **Appointment Engine**: End-to-end flow for creating and managing service appointments.
- **Status Management**: Real-time state updates for service fulfillment.
- **Messaging Hub**: Integration of messaging triggers and communication history.
- **Operational Dashboard**: Specialized data cards for the administrative control panel.

Project Status: Active Development  
Platform: [DroneDT Web](https://dronedt.vercel.app/)



## Manuel Nieto

## NietoDeveloper

### 2026 




drone-dt/  ← Raíz del monorepo
├── front/  ← Front-end principal (Next.js + React + Tailwind, e-commerce público estilo Tesla)

