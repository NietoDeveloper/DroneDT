<div align="center">

<!-- ANIMATED HEADER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d47a1,100:2196f3&height=200&section=header&text=DroneDT&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Industrial%20Drone%20E-Commerce%20Platform%20%7C%20Colombia&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<!-- BADGES -->
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
- [Roadmap](#%EF%B8%8F-infrastructure-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**DroneDT** is a full-stack monorepo e-commerce platform purpose-built for the industrial drone manufacturing market in Colombia. Inspired by [SpaceX's website](https://www.spacex.com) design philosophy — immersive visuals, technical minimalism, and zero-friction high-availability UX — it combines a public storefront, a customer portal, and a dedicated employee back-end administration panel into a single structured monorepo environment.

```text
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
✨ Key Features🛒 E-Commerce Shop (front/)Product configurator (drone specs, industrial payloads)Cart management & real-time checkout flowEnterprise appointment & custom service schedulingHigh-fidelity video hero sectionsSEO-optimized with Next.js App Router🛠️ Back-End Dashboard (dashboard/)Real-time inventory management (CRUD)Core node monitoring ("Users Node Online" telemetry)Operational sales analytics with interactive chartsGranular employee module accessAutomated workflow logs👤 Client Dashboard (panel-cliente/)Industrial order tracking & history logsBusiness profile managementSupport desk integration & technical FAQsPersonalized asset recommendations🔒 Security & InfrastructureNextAuth & JWT secure authenticationStrict validation via ZodMaximum security double-cluster deploymentRole-Based Access Control (RBAC)Full multi-zone containerization🏗️ ArchitectureThe infrastructure runs on an optimized npm workspaces monorepo layout, isolating responsibilities while sharing type safety boundaries across nodes.Plaintextdrone-dt/                         ← Monorepo root perimeters
├── front/                        ← Public Storefront (Next.js 16 + Turbopack)
├── back/                         ← REST API Core (Node.js + Express + TS)
├── dashboard/                    ← Employee Back-End Admin Panel (Next.js 16)
├── panel-cliente/                ← Client Fleet Management Panel (Next.js)
├── shared/                       ← Unified types & core utility schemas
├── docker-compose.yml            ← Full orchestration matrix
└── package.json                  ← Workspace cluster engine
Data Flow ExecutionPlaintextUser View (Client/Admin) → Next.js (SSR/Turbopack) → Express API Core (back/) → MongoDB Secure Cluster
                                                                   ↘ AWS S3 (Industrial Media Storage)
📦 Modules1. front/ — Public StorefrontSpaceX-inspired storefront — minimalist, dark theme, high-speed rendering.RouteDescription/Enterprise Landing: hero video, drone models, custom CTAs/shop/dronesConfigurable industrial aircraft catalog/shop/accesoriosPayloads, thermal sensors, and parts listing/shop/serviciosAgronomy, mapping, and monitoring packages2. back/ — REST API EngineScalable Node.js + Express API built with TypeScript and secure database clustering.MethodEndpointDescriptionAuth AccessPOST/api/v1/users/registerRegister enterprise userPublic ❌POST/api/v1/users/loginLogin node, grants secure JWTPublic ❌GET/api/v1/dronesList active fleet inventoryPublic ❌POST/api/v1/dronesInject new aircraft item🔒 Admin / EmployeeGET/api/v1/admin/statsHigh-level KPI operational readouts🔒 Admin Only3. dashboard/ — Employee Admin PanelOperations hub for telemetry control, logistics tracking, and inventory status.RouteDescription/Main Grid: Daily sales, active users tracking, stock thresholds/inventarioAdvanced interface forms for drone specifications control/usersNode status dashboard ("Users Node Online" live feed)🛠️ Tech StackLayerTechnologyStatus / VersionFrontend StoreNext.js + React16.x / 19.x (Turbopack)Admin PanelNext.js Dashboard16.x (Standalone Build)Styling EngineTailwind CSS4.x Modern LayeringBackend APINode.js + Expressv20.x + TypeScript 5.xDatabase CoreMongoDB AtlasSecure Double Cluster MongooseCloud StorageAWS S3Industrial Media CDNContainerizationDockerMulti-stage Docker ComposeAPI InfrastructureRailwayHigh-Availability PipelinesApp Edge HostVercel ProductionEdge Network Routing🚀 Quick Start1. Clone the RepositoryBashgit clone [https://github.com/NietoDeveloper/Dashboard-DroneDT.git](https://github.com/NietoDeveloper/Dashboard-DroneDT.git)
cd drone-dt
2. Install Workspace Cluster DependenciesBashnpm install
3. Run Development Servers via Docker OrchestrationBashdocker-compose up --build
📊 Local Node Engine MappingLocal NodeEndpoint Mapping🔧 Backend API Enginehttp://localhost:5000/api/v1🛒 Public Storefronthttp://localhost:3000🛠️ Employee Admin Panelhttp://localhost:3001🗺️ Infrastructure Roadmap[x] Monorepo structure with optimized npm workspaces[x] Backend REST API Core (Express + TypeScript 5)[x] MongoDB Atlas production cluster connection setup[x] Next.js 16 Custom Admin Dashboard node deployment[x] Vercel Cloud Pipeline configuration bypass (TypeScript compilation validation)[x] Responsive layout optimization (Fluid scaling: 310px to 1900px)[ ] AWS S3 live asset stream integration[ ] Automated CI/CD production release pipelines🤝 ContributingFork the repository.Create an optimized branch:Bash   git checkout -b feature/allocation-node
Commit changes following conventional guidelines:Bash   git commit -m 'feat: optimize tree-shaking metrics'
Push to origin and open a formal Pull Request.📄 LicenseThis software architecture is licensed under the MIT License — see the LICENSE file for complete asset terms.🌌 NIETO LABORATORYLead Enterprise Architect & Systems Engineer: Manuel NietoDeployment Cycle: Rank S+ Status Verification MatrixLast Infrastructure Update: May 2026 · Bogotá, Colombia🚀 Ad Astra per Aspera — Building Next-Gen Digital Twins.
