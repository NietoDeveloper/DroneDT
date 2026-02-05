require('dotenv').config(); // LÍNEA 1: Vital para que connectDB() lea la URI
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// --- INFRASTRUCTURE CORE ---
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

/**
 * [SYSTEM INITIALIZATION]
 * Conexión a la red de clústeres de MongoDB Atlas
 */
connectDB();

/**
 * [SECURITY LAYER]
 */
app.set('trust proxy', 1); 

app.use(helmet()); 

app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const neuralLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: {
        success: false,
        system_code: 'DRONE_LIMIT_EXCEEDED',
        message: 'Protocolo de seguridad: Demasiadas peticiones. Reintento disponible en 15 min.'
    }
});
app.use('/api/', neuralLimiter);

/**
 * [DATA PARSING]
 */
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));

/**
 * [SYSTEM ROUTES - API v1]
 */

// Drone DT Central Command - Health & Metadata
app.get('/', (req, res) => {
    res.status(200).json({
        engine: 'Drone DT Operational System',
        version: '1.0.0-alpha',
        status: 'Online',
        lead_engineer: 'Manuel Nieto',
        rank: 'Colombia #1 Committer',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Operaciones de Flota e Inventario
// IMPORTANTE: Tu frontend busca /api/v1/products según la ruta abajo
app.use('/api/v1/products', productRoutes);

/**
 * [404 - SECTOR NOT FOUND]
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        system_code: 'SECTOR_NOT_FOUND',
        message: `La coordenada de datos ${req.originalUrl} no existe en la red Drone DT`
    });
});

/**
 * [ERROR INTERCEPTION LAYER]
 */
app.use(errorHandler);

/**
 * [ENGINE STARTUP]
 */
// Si el puerto 5000 sigue ocupado por el sistema, cambia 5000 por 5005 en tu .env
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    process.stdout.write('\x1Bc'); 
    console.log(`
    \x1b[33m╔══════════════════════════════════════════════════════╗
    \x1b[33m║\x1b[36m    🛸 DRONE DT ENGINE - CORE SYSTEM OPERATIONAL      \x1b[33m║
    \x1b[33m╠══════════════════════════════════════════════════════╣\x1b[0m
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  PORT        : \x1b[37m${PORT}\x1b[0m                        \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  NODE_ENV    : \x1b[37m${process.env.NODE_ENV || 'development'}\x1b[0m                 \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  RANK        : \x1b[37mColombia's #1 Committer\x1b[0m       \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  CLUSTERS    : \x1b[37mMulti-Cluster Atlas Active\x1b[0m    \x1b[33m║
    \x1b[33m╚══════════════════════════════════════════════════════╝
    \x1b[35m       [SYSTEM] Esperando señales de telemetría... \x1b[0m
    `);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\x1b[41m ERROR \x1b[0m El puerto ${PORT} está ocupado. Intenta cerrarlo o usa otro en el .env`);
        process.exit(1);
    }
});

/**
 * [CRITICAL FAILURE MANAGEMENT]
 */
process.on('unhandledRejection', (err) => {
    console.error(`\x1b[41m\x1b[37m CRITICAL ERROR \x1b[0m ${err.message}`);
    server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
    console.log('\n\x1b[33m[SHUTDOWN]\x1b[0m Desactivando Drone DT Engine...');
    server.close(() => {
        console.log('\x1b[32m[OFFLINE]\x1b[0m Todos los sistemas cerrados.\n');
        process.exit(0);
    });
});

module.exports = app;