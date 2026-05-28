<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d47a1,100:2196f3&height=200&section=header&text=DroneDT&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Industrial%20Drone%20E-Commerce%20Platform%20%7C%20Colombia&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16--Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

<br/>

[![Production Storefront](https://img.shields.io/badge/Live-Storefront-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dronedt.vercel.app/)
[![Production Dashboard](https://img.shields.io/badge/Live-Dashboard-0D47A1?style=for-the-badge&logo=vercel&logoColor=white)](https://dashboarddronedt.vercel.app/)
[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)
[![AWS Ready](https://img.shields.io/badge/AWS-S3%20%7C%20EC2%20Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

<br/>

> **A high-performance MERN stack e-commerce platform for industrial drone manufacturing in Colombia.**
> SpaceX & Tesla-inspired UI · Secure multi-panel architecture · Fully containerized · AWS-ready.

<br/>

[🚀 Quick Start](#-quick-start) · [🏗️ Architecture](#%EF%B8%8F-architecture) · [📦 Modules](#-modules) · [🛠️ Tech Stack](#%EF-stack) · [🐳 Docker](#-docker) · [☁️ Deploy](#%EF%B8%8F-deployment) · [🤝 Contributing](#-contributing)

</div>

---

<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=800&color=2196F3&center=true&vCenter=true&multiline=true&width=700&height=80&lines=MERN+Stack+%7C+Next.js+16+%7C+TypeScript;SpaceX+Aesthetics+%7C+Docker+%7C+AWS-Ready;Industrial+Drones+%7C+Colombia+%F0%9F%87%A8%F0%9F%87%B4" alt="Typing SVG"/>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Deployment Links](#-deployment-links)
- [Key Features](#-key-features)
- [Architecture](#%EF%B8%8F-architecture)
- [Modules](#-modules)
- [Tech Stack](#%EF-stack)
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

**DroneDT** is a full-stack monorepo e-commerce platform purpose-built for the industrial drone manufacturing market in Colombia. Inspired by SpaceX and Tesla design philosophies — immersive visuals, technical minimalism, and high-availability architecture — it combines a public storefront, a robust back-end, and an employee admin dashboard.

---

## 🔗 Deployment Links

La infraestructura se encuentra desplegada y operativa en los siguientes entornos de producción:

* **🛒 Public Storefront (Front-end):** [https://dronedt.vercel.app/](https://dronedt.vercel.app/)
* **🛠️ Admin Control Panel (Dashboard):** [https://dashboarddronedt.vercel.app/](https://dashboarddronedt.vercel.app/)
* **⚡ Core Engine (Back-end REST API):** Desplegado en clúster seguro en [Railway](https://railway.app/).

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛒 E-Commerce Shop
- Product configurator (drone specs, add-ons)
- Cart management & checkout flow
- 4K video hero sections
- SEO-optimized with Next.js 16 App Router (Turbopack)
- Responsive from 310px up to 1900px

</td>
<td width="50%">

### 🛠️ Admin Dashboard
- Real-time inventory management (CRUD)
- Sales analytics with high-performance charts
- User & role management (RBAC Matrix)
- Operator & client secure database node

</td>
</tr>
<tr>
<td width="50%">

### 🔒 Maximum Security Architecture
- JWT authentication with split secure payloads
- Input validation via Zod schemas
- Double cluster security topology for data isolation
- Isolated backend dashboard for complete perimeter lock

</td>
<td width="50%">

### 🐳 Industrial Engineering
- Native monorepo workspaces management
- Docker-first standalone orchestration
- TypeScript strict compiler ready for S+ Cycles
- AWS S3 assets optimization

</td>
</tr>
</table>

---

## 🏗️ Architecture

El proyecto se gestiona como un monorepo limpio dividido estratégicamente en tres ámbitos aislados de ejecución:
