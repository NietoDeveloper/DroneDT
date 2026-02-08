require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// --- INFRASTRUCTURE CORE ---
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

/**
 * [SYSTEM INITIALIZATION]
 * Conexión a la red de clústeres de MongoDB Atlas (Core & Assets)
 */
connectDB();

/**
 * [SECURITY LAYER - HARDENED]
 */
app.set('trust proxy', 1); // Indispensable para Railway/Vercel

// 1. Helmet para Headers de Seguridad (Protección contra XSS, Clickjacking)
app.use(helmet()); 

// 2. CORS dinámico para producción y local
const allowedOrigins = [
    process.env.FRONTEND_URL, 
    'http://localhost:3000', 
    'https://softwaredt.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman) o si están en la lista blanca
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por Política de Seguridad Drone DT (CORS)'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// 3. Sanitización de Datos (Previene NoSQL Injection en el Clúster)
app.use(mongoSanitize());

// 4. Prevención de Polución de Parámetros (HPP)
app.use(hpp());

// 5. Neural Limiter: Protección de Ancho de Banda
const neuralLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutos
    max: 150, // Límite de peticiones por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        system_code: 'DRONE_LIMIT_EXCEEDED',
        message: 'Protocolo de seguridad: Demasiadas peticiones detectadas.',
        engineer: "Manuel Nieto"
    }
});
app.use('/api/', neuralLimiter);

/**
 * [DATA PARSING & LOGGING]
 */
app.use(express.json({ limit: '15kb' })); // Evita ataques DoS por payloads masivos
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/**
 * [SYSTEM ROUTES - API v1]
 */

// Drone DT Central Command - Health & Identity
app.get('/', (req, res) => {
    res.status(200).json({
        engine: 'Drone DT Operational System',
        version: '1.2.0-secure',
        status: 'Online',
        lead_engineer: 'Manuel Nieto',
        rank: 'Colombia #1 Committer',
        security: 'Hardened',
        uptime: `${Math.floor(process.uptime())}s`,
        timestamp: new Date().toISOString()
    });
});

// Operaciones de Flota e Inventario (Conexión al controlador optimizado)
app.use('/api/v1/products', productRoutes);

/**
 * [404 - SECTOR NOT FOUND]
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        system_code: 'SECTOR_NOT_FOUND',
        message: `La coordenada ${req.originalUrl} no existe en la red Drone DT`
    });
});

/**
 * [ERROR INTERCEPTION LAYER]
 */
app.use(errorHandler);

/**
 * [ENGINE STARTUP]
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    // Limpieza estética de consola al iniciar en desarrollo
    if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1Bc'); 
    
    console.log(`
    \x1b[33m╔══════════════════════════════════════════════════════╗
    \x1b[33m║\x1b[36m    🛸 DRONE DT ENGINE - CORE SYSTEM OPERATIONAL      \x1b[33m║
    \x1b[33m╠══════════════════════════════════════════════════════╣\x1b[0m
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  PORT        : \x1b[37m${PORT}\x1b[0m                      \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  SECURITY    : \x1b[37mHigh-End Hardening Active\x1b[0m       \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  ENGINEER    : \x1b[37mManuel Nieto (Rank #1)\x1b[0m          \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  ENVIRONMENT : \x1b[37m${(process.env.NODE_ENV || 'dev').toUpperCase()}\x1b[0m                 \x1b[33m║
    \x1b[33m╚══════════════════════════════════════════════════════╝
    \x1b[35m       [SYSTEM] Escuchando telemetría de drones... \x1b[0m
    `);
});

/**
 * [CRITICAL FAILURE MANAGEMENT]
 */
process.on('unhandledRejection', (err) => {
    console.error(`\x1b[41m\x1b[37m CRITICAL ERROR \x1b[0m ${err.name}: ${err.message}`);
    server.close(() => process.exit(1));
});

// Manejo de señales de terminación para CI/CD (Vercel/Railway)
process.on('SIGTERM', () => {
    console.log('\x1b[31m[SIGTERM]\x1b[0m Cerrando clúster de forma segura...');
    server.close(() => {
        console.log('\x1b[32m[DONE]\x1b[0m Procesos finalizados.');
    });
});

module.exports = app;