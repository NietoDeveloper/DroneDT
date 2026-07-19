<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DRONE%20DT%20·%20BACKEND&fontSize=64&fontColor=FFD700&fontAlignY=42&desc=⚙️%20REST%20API%20Engine%20·%20Transactional%20Core%20·%20Docker%20Powered&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=750&lines=⚙️+Strangler+Fig+Migration+to+Strict+TypeScript;🔒+ACID+Transactions+%7C+mongoose.startSession();🐳+Fully+Dockerized+%7C+Dual-Cluster+Ready;📊+Atomic+Stock+Locking+%7C+Zero+Race+Conditions;🚀+Railway+%2B+AWS+%7C+CI%2FCD+Pipeline;🏆+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://committers.top/colombia">
    <img src="https://img.shields.io/badge/🥇_No._1_Committer-Colombia-FFD700?style=for-the-badge&logoColor=000000"/>
  </a>
  <a href="https://committers.top">
    <img src="https://img.shields.io/badge/🏆_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge&logoColor=000000"/>
  </a>
  <img src="https://img.shields.io/badge/Status-In_Migration-FEB60D?style=for-the-badge&logo=progress&logoColor=000000"/>
  <img src="https://img.shields.io/badge/Security-Level_S%2B-FF0000?style=for-the-badge&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_ORM-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-EC2_%7C_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Railway-API_Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/>
</p>

<p align="center">
  <a href="https://github.com/NietoDeveloper/DroneDT">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FDroneDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> ⚙️ **DroneDT Back-End** — Núcleo transaccional de la plataforma industrial de comercialización
> y tracking logístico de aeronaves no tripuladas. Motor REST construido bajo migración progresiva
> a **TypeScript estricto** mediante el patrón **Strangler Fig**, con blindaje atómico de inventario
> para eliminar por completo las condiciones de carrera (*Race Conditions*) en operaciones de compra.
>
> *Modular · Transaccional · Obsesivamente Production-Ready · Construido en Bogotá 🇨🇴*

</div>

---

## 🚀 Engineering Profile

**Desarrollado por:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)
**Rol:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer en Colombia | #3 en South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** Node.js + TypeScript + Express.js + MongoDB (Mongoose) + Docker + AWS
- 🎯 **Focus:** Consistencia transaccional, blindaje de inventario y arquitectura desacoplada por capas

---

## 🛰️ Resumen de Arquitectura

**Enfoque Principal:** Migración progresiva a TypeScript estricto bajo el **Strangler Fig Pattern**, integrando operaciones atómicas para evitar la duplicidad o pérdida de inventario (*Race Conditions*).

```
╔══════════════════════════════════════════════════════════════════════╗
║                     DRONEDT · CORE API ENGINE                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║        ┌────────────────────────┐      ┌───────────────────────┐    ║
║        │  🛒 STOREFRONT (front) │      │  🛠️ ADMIN (dashboard) │    ║
║        └────────────┬───────────┘      └───────────┬───────────┘    ║
║                     │                              │                ║
║                     └───────────────┬──────────────┘                ║
║                                     ▼                                ║
║                     ┌───────────────────────────────┐                ║
║                     │   🔧 EXPRESS + TYPESCRIPT      │                ║
║                     │   Capas: Route → Controller →  │                ║
║                     │   Service → Model              │                ║
║                     └───────────────┬────────────────┘                ║
║                                     │                                ║
║                    ┌────────────────┴─────────────────┐              ║
║                    ▼                                  ▼              ║
║         ┌────────────────────┐             ┌──────────────────────┐ ║
║         │  mongoose.Session  │             │   MongoDB Atlas /     │ ║
║         │  ACID Transactions │◄───────────►│   Cluster Corporativo │ ║
║         │  $inc + $gte Lock  │             │   Dual-Cluster Ready   │ ║
║         └────────────────────┘             └──────────────────────┘ ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 🗂️ Arquitectura de Carpetas

```text
back/                                  ← NÚCLEO: REST API Engine
├── src/
│   ├── config/
│   │   └── db.ts                      ← Conexión Mongoose · Pool optimizado (maxPoolSize: 10)
│   ├── controllers/                   ← Lógica transaccional · Ventas · Inventario · Usuarios
│   ├── middleware/                    ← JWT · Validaciones Zod · Manejo de errores centralizado
│   ├── models/
│   │   ├── Drone.ts                   ← Esquema + índices únicos + estado OUT_OF_STOCK
│   │   └── Sale.ts                    ← Esquema de transacciones y órdenes
│   ├── routes/                        ← Enrutamiento desacoplado por recurso
│   ├── services/                      ← Reglas de negocio aisladas del controlador
│   ├── types/                         ← Interfaces y contratos TypeScript estrictos
│   └── server.ts                      ← Punto de entrada · Middlewares de red (CORS, JSON)
├── tsconfig.json                      ← Configuración de compilación estricta
├── Dockerfile                         ← Imagen aislada del motor backend
└── package.json
```

---

## 🛡️ Core de Seguridad y Consistencia (Nivel S+)

### 🔐 Transacciones ACID
Implementación de `mongoose.startSession()` para asegurar que las operaciones críticas (compras y reducción de stock) se completen en su totalidad o hagan **rollback** inmediato ante cualquier fallo intermedio.

### ⚛️ Bloqueo Atómico de Inventario
Uso del operador `$inc` combinado con validaciones condicionales estrictas (`stock: { $gte: quantity }`) directamente en la base de datos, blindando el inventario contra compras simultáneas fraudulentas o concurrentes — sin necesidad de locks externos.

### 🔄 Mutaciones Automáticas de Estado
Monitoreo en tiempo real del estado de los drones; si el stock toca fondo (0 absoluto), el backend transmuta el estado a `OUT_OF_STOCK` de forma automatizada y lo propaga a los nodos consumidores (storefront y dashboard).

---

## 🛠️ Tech Stack

<div align="center">

| Capa | Tecnología | Detalle |
|:-----|:-----------|:--------|
| ⚙️ **Runtime** | Node.js | 20.x LTS + TypeScript nativo (`tsx` / `tsc`) |
| 🔧 **Framework** | Express.js | Arquitectura REST limpia, desacoplada por capas |
| 🗄️ **Base de Datos** | MongoDB + Mongoose | ORM corporativo con sesiones transaccionales |
| 🔒 **Autenticación** | JWT | Tokens firmados + expiración configurable |
| 🧬 **Validación** | Zod | Schemas estrictos de payload y headers |
| 🐳 **Contenedores** | Docker | Aislamiento de procesos por servicio |
| ☁️ **Cloud / Deploy** | Railway + AWS | Preparado para Doble Clúster distribuido |

</div>

---

## 📈 Progreso del Roadmap Back-End

- [x] **Fase 1 — Configuración de Conectores**
  `src/config/db.ts` creado con pools de conexión optimizados (`maxPoolSize: 10`) y manejo de excepciones críticas del clúster.

- [ ] **Fase 2 — Entrada del Servidor** ⏳
  Creación de `src/server.ts` para levantar middlewares de red (CORS, Express JSON) e inicializar el socket del servidor.

- [ ] **Fase 3 — Modelado de Datos** ⏳
  Estructurar las interfaces e índices únicos de MongoDB para `Drone.ts` y `Sale.ts`.

- [ ] **Fase 4 — Controladores Transaccionales** ⏳
  Inyección de la lógica transaccional y enrutamiento de la API.

---

## 🚀 Inicialización y Despliegue

### 1. Clonar e ingresar al directorio del backend

```bash
git clone https://github.com/NietoDeveloper/DroneDT.git
cd drone-dt/back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```env
# back/.env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dronedt
JWT_SECRET=your_ultra_secure_secret_here
JWT_EXPIRES_IN=7d
PORT=5000

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=dronedt-uploads
```

### 4. Levantar en modo desarrollo

```bash
npm run dev
```

### 5. Orquestación vía Docker

```bash
docker build -t dronedt-backend .
docker run -p 5000:5000 --env-file .env dronedt-backend
```

```
🐳 El contenedor expone:
   └── 🔧 Core API Engine  →  http://localhost:5000/api/v1
```

---

## 📊 Port Mapping

| Nodo | URL Local | Deploy |
|:-----|:----------|:-------|
| 🔧 **Core API Engine** | `http://localhost:5000/api/v1` | Railway |

---

## 📄 License

Desarrollo de arquitectura de software protegido bajo **Licencia MIT**.
Todos los derechos reservados © 2026 Manuel Nieto

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manuel%20Nieto-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manuelfrancisconietoarias/)
[![Portfolio](https://img.shields.io/badge/Portfolio-manuelnieto.netlify.app-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://manuelnieto.netlify.app/)

<br/>

[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every transaction is atomic. Every rollback is silent.       ║
║    Production-ready by default."                                ║
║                                                                  ║
║                               — NietoDeveloper Standard         ║
╚══════════════════════════════════════════════════════════════════╝
```









<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DRONE%20DT%20·%20BACKEND&fontSize=64&fontColor=FFD700&fontAlignY=42&desc=⚙️%20REST%20API%20Engine%20·%20Transactional%20Core%20·%20Docker%20Powered&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=750&lines=⚙️+Strangler+Fig+Migration+to+Strict+TypeScript;🔒+ACID+Transactions+%7C+mongoose.startSession();🐳+Fully+Dockerized+%7C+Dual-Cluster+Ready;📊+Atomic+Stock+Locking+%7C+Zero+Race+Conditions;🚀+Railway+%2B+AWS+%7C+CI%2FCD+Pipeline;🏆+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://committers.top/colombia">
    <img src="https://img.shields.io/badge/🥇_No._1_Committer-Colombia-FFD700?style=for-the-badge&logoColor=000000"/>
  </a>
  <a href="https://committers.top">
    <img src="https://img.shields.io/badge/🏆_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge&logoColor=000000"/>
  </a>
  <img src="https://img.shields.io/badge/Status-In_Migration-FEB60D?style=for-the-badge&logo=progress&logoColor=000000"/>
  <img src="https://img.shields.io/badge/Security-Level_S%2B-FF0000?style=for-the-badge&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_ORM-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-EC2_%7C_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Railway-API_Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/>
</p>

<p align="center">
  <a href="https://github.com/NietoDeveloper/DroneDT">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FDroneDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> ⚙️ **DroneDT Back-End** — Núcleo transaccional de la plataforma industrial de comercialización
> y tracking logístico de aeronaves no tripuladas. Motor REST construido bajo migración progresiva
> a **TypeScript estricto** mediante el patrón **Strangler Fig**, con blindaje atómico de inventario
> para eliminar por completo las condiciones de carrera (*Race Conditions*) en operaciones de compra.
>
> *Modular · Transaccional · Obsesivamente Production-Ready · Construido en Bogotá 🇨🇴*

</div>

---

## 🚀 Engineering Profile

**Desarrollado por:** Manuel Nieto — [NietoDeveloper](https://github.com/NietoDeveloper)
**Rol:** Full-Stack Software Engineer

- 🏆 **Rank:** #1 Committer en Colombia | #3 en South & Central America — [committers.top](https://committers.top)
- 💻 **Stack:** Node.js + TypeScript + Express.js + MongoDB (Mongoose) + Docker + AWS
- 🎯 **Focus:** Consistencia transaccional, blindaje de inventario y arquitectura desacoplada por capas

---

## 🛰️ Resumen de Arquitectura

**Enfoque Principal:** Migración progresiva a TypeScript estricto bajo el **Strangler Fig Pattern**, integrando operaciones atómicas para evitar la duplicidad o pérdida de inventario (*Race Conditions*).

```
╔══════════════════════════════════════════════════════════════════════╗
║                     DRONEDT · CORE API ENGINE                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║        ┌────────────────────────┐      ┌───────────────────────┐    ║
║        │  🛒 STOREFRONT (front) │      │  🛠️ ADMIN (dashboard) │    ║
║        └────────────┬───────────┘      └───────────┬───────────┘    ║
║                     │                              │                ║
║                     └───────────────┬──────────────┘                ║
║                                     ▼                                ║
║                     ┌───────────────────────────────┐                ║
║                     │   🔧 EXPRESS + TYPESCRIPT      │                ║
║                     │   Capas: Route → Controller →  │                ║
║                     │   Service → Model              │                ║
║                     └───────────────┬────────────────┘                ║
║                                     │                                ║
║                    ┌────────────────┴─────────────────┐              ║
║                    ▼                                  ▼              ║
║         ┌────────────────────┐             ┌──────────────────────┐ ║
║         │  mongoose.Session  │             │   MongoDB Atlas /     │ ║
║         │  ACID Transactions │◄───────────►│   Cluster Corporativo │ ║
║         │  $inc + $gte Lock  │             │   Dual-Cluster Ready   │ ║
║         └────────────────────┘             └──────────────────────┘ ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 🗂️ Arquitectura de Carpetas

```text
back/                                  ← NÚCLEO: REST API Engine
├── src/
│   ├── config/
│   │   └── db.ts                      ← Conexión Mongoose · Pool optimizado (maxPoolSize: 10)
│   ├── controllers/                   ← Lógica transaccional · Ventas · Inventario · Usuarios
│   ├── middleware/                    ← JWT · Validaciones Zod · Manejo de errores centralizado
│   ├── models/
│   │   ├── Drone.ts                   ← Esquema + índices únicos + estado OUT_OF_STOCK
│   │   └── Sale.ts                    ← Esquema de transacciones y órdenes
│   ├── routes/                        ← Enrutamiento desacoplado por recurso
│   ├── services/                      ← Reglas de negocio aisladas del controlador
│   ├── types/                         ← Interfaces y contratos TypeScript estrictos
│   └── server.ts                      ← Punto de entrada · Middlewares de red (CORS, JSON)
├── tsconfig.json                      ← Configuración de compilación estricta
├── Dockerfile                         ← Imagen aislada del motor backend
└── package.json
```

---

## 🛡️ Core de Seguridad y Consistencia (Nivel S+)

### 🔐 Transacciones ACID
Implementación de `mongoose.startSession()` para asegurar que las operaciones críticas (compras y reducción de stock) se completen en su totalidad o hagan **rollback** inmediato ante cualquier fallo intermedio.

### ⚛️ Bloqueo Atómico de Inventario
Uso del operador `$inc` combinado con validaciones condicionales estrictas (`stock: { $gte: quantity }`) directamente en la base de datos, blindando el inventario contra compras simultáneas fraudulentas o concurrentes — sin necesidad de locks externos.

### 🔄 Mutaciones Automáticas de Estado
Monitoreo en tiempo real del estado de los drones; si el stock toca fondo (0 absoluto), el backend transmuta el estado a `OUT_OF_STOCK` de forma automatizada y lo propaga a los nodos consumidores (storefront y dashboard).

---

## 🛠️ Tech Stack

<div align="center">

| Capa | Tecnología | Detalle |
|:-----|:-----------|:--------|
| ⚙️ **Runtime** | Node.js | 20.x LTS + TypeScript nativo (`tsx` / `tsc`) |
| 🔧 **Framework** | Express.js | Arquitectura REST limpia, desacoplada por capas |
| 🗄️ **Base de Datos** | MongoDB + Mongoose | ORM corporativo con sesiones transaccionales |
| 🔒 **Autenticación** | JWT | Tokens firmados + expiración configurable |
| 🧬 **Validación** | Zod | Schemas estrictos de payload y headers |
| 🐳 **Contenedores** | Docker | Aislamiento de procesos por servicio |
| ☁️ **Cloud / Deploy** | Railway + AWS | Preparado para Doble Clúster distribuido |

</div>

---

## 📈 Progreso del Roadmap Back-End

- [x] **Fase 1 — Configuración de Conectores**
  `src/config/db.ts` creado con pools de conexión optimizados (`maxPoolSize: 10`) y manejo de excepciones críticas del clúster.

- [ ] **Fase 2 — Entrada del Servidor** ⏳
  Creación de `src/server.ts` para levantar middlewares de red (CORS, Express JSON) e inicializar el socket del servidor.

- [ ] **Fase 3 — Modelado de Datos** ⏳
  Estructurar las interfaces e índices únicos de MongoDB para `Drone.ts` y `Sale.ts`.

- [ ] **Fase 4 — Controladores Transaccionales** ⏳
  Inyección de la lógica transaccional y enrutamiento de la API.

---

## 🚀 Inicialización y Despliegue

### 1. Clonar e ingresar al directorio del backend

```bash
git clone https://github.com/NietoDeveloper/DroneDT.git
cd drone-dt/back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```env
# back/.env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dronedt
JWT_SECRET=your_ultra_secure_secret_here
JWT_EXPIRES_IN=7d
PORT=5000

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=dronedt-uploads
```

### 4. Levantar en modo desarrollo

```bash
npm run dev
```

### 5. Orquestación vía Docker

```bash
docker build -t dronedt-backend .
docker run -p 5000:5000 --env-file .env dronedt-backend
```

```
🐳 El contenedor expone:
   └── 🔧 Core API Engine  →  http://localhost:5000/api/v1
```

---

## 📊 Port Mapping

| Nodo | URL Local | Deploy |
|:-----|:----------|:-------|
| 🔧 **Core API Engine** | `http://localhost:5000/api/v1` | Railway |

---

## 📄 License

Desarrollo de arquitectura de software protegido bajo **Licencia MIT**.
Todos los derechos reservados © 2026 Manuel Nieto

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manuel%20Nieto-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manuelfrancisconietoarias/)
[![Portfolio](https://img.shields.io/badge/Portfolio-manuelnieto.netlify.app-FFD700?style=for-the-badge&labelColor=0a0a0a)](https://manuelnieto.netlify.app/)

<br/>

[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every transaction is atomic. Every rollback is silent.       ║
║    Production-ready by default."                                ║
║                                                                  ║
║                               — NietoDeveloper Standard         ║
╚══════════════════════════════════════════════════════════════════╝
```

*DroneDT Backend — Built by **NietoDeveloper · Manuel Nieto***

*Desarrollado con rigor técnico en* 📍 **Bogotá, Colombia** 🇨🇴

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
