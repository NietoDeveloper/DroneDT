const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

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
 * Blindaje de arquitectura y protocolos de red
 */
app.set('trust proxy', 1); 

// Helmet para protección de cabeceras (Security Headers)
app.use(helmet()); 

// CORS Policy: Control de acceso al ecosistema Drone DT
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Anti-Spam & Neural Rate Limiting
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
 * Optimización de carga útil y buffers de seguridad
 */
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Telemetría de peticiones (Logging)
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
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    process.stdout.write('\x1Bc'); // Limpia la consola para un inicio futurista
    console.log(`
    \x1b[33m╔══════════════════════════════════════════════════════╗
    \x1b[33m║\x1b[36m   🛸 DRONE DT ENGINE - CORE SYSTEM OPERATIONAL    \x1b[33m║
    \x1b[33m╠══════════════════════════════════════════════════════╣\x1b[0m
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  PORT        : \x1b[37m${PORT}\x1b[0m                        \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  NODE_ENV    : \x1b[37m${process.env.NODE_ENV || 'development'}\x1b[0m                 \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  RANK        : \x1b[37mColombia's #1 Committer\x1b[0m       \x1b[33m║
    \x1b[33m║\x1b[0m  \x1b[32m✔\x1b[0m  CLUSTERS    : \x1b[37mMulti-Cluster Atlas Active\x1b[0m    \x1b[33m║
    \x1b[33m╚══════════════════════════════════════════════════════╝
    \x1b[35m    [SYSTEM] Esperando señales de telemetría... \x1b[0m
    `);
});

/**
 * [CRITICAL FAILURE MANAGEMENT]
 */

// Unhandled Promise Rejections (Ej. Falla en Auth de Atlas)
process.on('unhandledRejection', (err) => {
    console.error(`\x1b[41m\x1b[37m CRITICAL ERROR \x1b[0m ${err.message}`);
    // Cierre de seguridad para evitar corrupción de datos
    server.close(() => process.exit(1));
});

// Graceful Shutdown (SIGINT)
process.on('SIGINT', () => {
    console.log('\n\x1b[33m[SHUTDOWN]\x1b[0m Desactivando Drone DT Engine de forma segura...');
    server.close(() => {
        console.log('\x1b[32m[OFFLINE]\x1b[0m Todos los sistemas cerrados.\n');
        process.exit(0);
    });
});

module.exports = app;