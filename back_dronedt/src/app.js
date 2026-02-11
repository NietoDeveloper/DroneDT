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

const startEngine = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1Bc'); 
            
            console.log(`
    \x1b[33m╔══════════════════════════════════════════════════════╗
    \x1b[33m║\x1b[36m     🛸 DRONE DT ENGINE - CORE SYSTEM OPERATIONAL      \x1b[33m║
    \x1b[33m╠══════════════════════════════════════════════════════╣\x1b[0m
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  PORT        : \x1b[37m${PORT}\x1b[0m                      \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  DATABASE    : \x1b[32mActive & Synchronized\x1b[0m         \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  SECURITY    : \x1b[37mHardened (Helmet/Sanitize)\x1b[0m    \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  ENGINEER    : \x1b[37mManuel Nieto (Rank #1)\x1b[0m          \x1b[33m║
    \x1b[33m╚══════════════════════════════════════════════════════╝
    \x1b[35m       [SYSTEM] Escuchando telemetría de drones... \x1b[0m
            `);
        });

        process.on('unhandledRejection', (err) => {
            console.error(`\x1b[41m\x1b[37m CRITICAL FAILURE \x1b[0m ${err.message}`);
            server.close(() => process.exit(1));
        });

        process.on('SIGTERM', () => {
            console.log('\x1b[31m[SIGTERM]\x1b[0m Cerrando clúster de forma segura...');
            server.close(() => process.exit(0));
        });

    } catch (error) {
        console.error('\x1b[41m\x1b[37m ENGINE STARTUP FAILED \x1b[0m', error.message);
        process.exit(1);
    }
};

/**
 * [SECURITY LAYER - HARDENED]
 */
app.set('trust proxy', 1);

// Ajuste en Helmet para permitir carga de imágenes locales y de AWS en el front
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
})); 

// --- CONFIGURACIÓN DE CORS FLEXIBLE PARA DESARROLLO ---
const allowedOrigins = [
    process.env.FRONTEND_URL, 
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://softwaredt.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        // En desarrollo permitimos cualquier origen para evitar bloqueos por IP de red (192.168...)
        if (!origin || process.env.NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Violation: Access Denied for Drone DT Ecosystem'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(mongoSanitize());
app.use(hpp());

const neuralLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 500, // Aumentado temporalmente para tus tests masivos de desarrollo
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, system_code: 'LIMIT_EXCEEDED', engineer: "Manuel Nieto" }
});
app.use('/api/', neuralLimiter);

app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/**
 * [SYSTEM ROUTES]
 */
app.get('/', (req, res) => {
    res.status(200).json({
        engine: 'Drone DT Operational System',
        status: 'Online',
        lead_engineer: 'Manuel Nieto',
        rank: 'Colombia #1 Committer',
        uptime: `${Math.floor(process.uptime())}s`
    });
});

app.use('/api/v1/products', productRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        system_code: 'SECTOR_NOT_FOUND',
        message: `La coordenada ${req.originalUrl} no existe.`
    });
});

app.use(errorHandler);

startEngine();

module.exports = app;