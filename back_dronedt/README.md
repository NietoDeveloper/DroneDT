# Drone DT Backend 🛰️

This is the core engine of **Drone DT**, a high-performance RESTful API designed for drone service management, eCommerce, and fleet control. Built with a focus on horizontal scalability, JWT-based security, and clean architecture.

## 🚀 Core Technologies

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js with a Service-Oriented Architecture.
- **Database**: MongoDB with Mongoose (Advanced modeling & Aggregations).
- **Caching**: Redis for query optimization and session management.
- **Security**: JWT, Bcrypt, and Rate Limiting.
- **Cloud & DevOps**: Docker, AWS (SES/SNS), and automated CI/CD.

## 📂 Project Structure

The architecture follows the **Controller-Service-Repository** pattern to ensure business logic is decoupled and fully testable.

```text
backend/
├── src/
│   ├── config/          # Configurations (DB, Redis, Logger, AWS)
│   ├── controllers/     # Request handling & HTTP Logic
│   ├── models/          # Mongoose Schemas & Data Models
│   ├── routes/          # Express Router Definitions
│   ├── services/        # Pure Business Logic (Email, Payments, Notifications)
│   ├── middlewares/     # Auth (JWT/Roles), Error Handler, Validation (Joi/Zod)
│   ├── utils/           # Global helpers and constants
│   └── app.js           # App entry point & Express configuration
├── tests/               # Robust Testing (Jest & Supertest)
├── Dockerfile           # Optimized Production Image (Node Alpine)
└── docker-compose.yml   # Local Orchestration (Mongo + Redis)
```

## 🛠️ Local Setup

1. Clone and enter the directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Variables:

   Create a `.env` file in the `backend/` root:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_secret_key
   AWS_REGION=us-east-1
   ```

4. Run with Docker (Recommended):

   ```bash
   docker-compose up -d
   ```

5. Development Mode:

   ```bash
   npm run dev
   ```

## 🔐 Security & Scalability

- **Rate Limiting**: Protected against brute-force attacks via express-rate-limit.
- **Structured Logging**: Implementation of Winston/Pino for production-grade error tracking.
- **Real-Time Notifications**: Integrated with AWS SNS for instant updates, similar to the "Tesla App" ecosystem.
- **Data Integrity**: Strict validation layers using Joi/Zod before database persistence.

## 🧪 Quality Assurance

We maintain world-class coding standards, consistent with our #1 Colombia Committer status.

- **Unit Tests**: `npm run test:unit`
- **Integration Tests**: `npm run test:integration`

## 📡 Main Endpoints

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| POST   | /api/auth/register  | User onboarding & registration       |
| GET    | /api/products       | Drone fleet and services catalog     |
| POST   | /api/orders         | Order creation (Auth Required)       |
| POST   | /api/payments       | Secure payment processing (Stripe/AWS) |

🚀 Developed by Manuel Nieto for DroneDT  
🏆 Number 1 Top Committers GitHub Colombia 🇨🇴  

<p align="left">
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia/NietoDeveloper.svg" alt="Committers Top Colombia"></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_public/NietoDeveloper.svg" alt="Committers Top Public"></a>
  <a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_private/NietoDeveloper.svg" alt="Committers Top Private"></a>
</p>

Bogotá - 2026