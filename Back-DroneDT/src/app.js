require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// --- INFRASTRUCTURE CORE ---
const { connectDB, closeConnections } = require('./config/db');
const productRoutes = require('./routes/ProductRoutes'); 
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

/**
 * [SECURITY LAYER]
 */
app.set('trust proxy', 1);

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
})); 

// --- DRONE DT - ECOSISTEMA EXCLUSIVO ---
const allowedOrigins = [
    'https://dronedt.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        // 🛰️ AJUSTE UPLINK: Permitimos peticiones sin origin (como el server-side de Next.js)
        // y normalizamos los dominios permitidos.
        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, "")) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            console.error(`🚨 ACCESO DENEGADO - ORIGEN NO AUTORIZADO: ${origin}`);
            callback(new Error('CORS Violation: Access Denied'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const neuralLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 500, 
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, engineer: "Manuel Nieto" }
});
app.use('/api/', neuralLimiter);

/**
 * [SYSTEM ROUTES]
 */
app.get('/', (req, res) => {
    res.status(200).json({
        engine: 'Drone DT Operational System',
        status: 'Online',
        lead_engineer: 'Manuel Nieto',
        rank: 'Colombia #1 Committer'
    });
});

// 🛸 EJE CENTRAL DE PRODUCTOS
// Si tu URL es /api/v1/products/menu, en ProductRoutes.js el path DEBE ser solo '/menu'
app.use('/api/v1/products', productRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `La coordenada ${req.originalUrl} no existe en Drone DT.`
    });
});

app.use(errorHandler);

/**
 * [ENGINE STARTUP]
 */
const startEngine = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 8080; 
        const server = app.listen(PORT, '0.0.0.0', () => {
            if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1Bc'); 
            console.log(`
    \x1b[33m╔══════════════════════════════════════════════════════╗
    \x1b[33m║\x1b[36m     🛸 DRONE DT ENGINE - CORE SYSTEM OPERATIONAL      \x1b[33m║
    \x1b[33m╠══════════════════════════════════════════════════════╣\x1b[0m
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  PORT        : \x1b[37m${PORT}\x1b[0m                        \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  DATABASE    : \x1b[32mMulti-Cluster Active\x1b[0m            \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  ENGINEER    : \x1b[37mManuel Nieto (Rank #1)\x1b[0m            \x1b[33m║
    \x1b[33m╚══════════════════════════════════════════════════════╝
            `);
        });

        process.on('unhandledRejection', async (err) => {
            console.error('CRITICAL FAILURE', err.message);
            await closeConnections();
            server.close(() => process.exit(1));
        });

        process.on('SIGTERM', async () => {
            await closeConnections();
            server.close(() => process.exit(0));
        });
    } catch (error) {
        console.error('ENGINE STARTUP FAILED', error.message);
        process.exit(1);
    }
};

if (require.main === module) {
    startEngine();
}

module.exports = app;