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

s), Error Handler, Validation (Joi/Zod)
│   ├── utils/           # Global helpers and constants
│   └── app.js           # App entry point & Express configuration
├── tests/               # Robust Testing (Jest & Supertest)
├── Dockerfile           # Optimized Production Image (Node Alpine)
└── docker-compose.yml   # Local Orchestration (Mongo + Redis)
🛠️ Local SetupClone and enter the directory:Bashcd backend
Install dependencies:Bashnpm install
Environment Variables:Create a .env file in the backend/ root:Fragmento de códigoPORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
AWS_REGION=us-east-itIntegration Tests: npm run test:integration📡 Main EndpointsMethodEndpointDescriptionPOST/api/auth/registerUser onboarding & registrationGET/api/productsDrone fleet and services catalogPOST/api/ordersOrder creation (Auth Required)POST/api/paymentsSecure payment processing (Stripe/AWS)🚀 Developed by Manuel Nieto for DroneDT🏆 Number 1 Top Committers GitHub Colombia 🇨🇴<p align="left"><a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia/NietoDeveloper.svg" alt="Committers Top Colombia"></a><a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_public/NietoDeveloper.svg" alt="Committers Top Public"></a><a href="https://committers.top/colombia#NietoDeveloper"><img src="https://user-badge.committers.top/colombia_private/NietoDeveloper.svg" alt="Committers Top Private"></a></p>Bogotá - 2026