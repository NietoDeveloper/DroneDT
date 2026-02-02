const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importamos la infraestructura
// Nota: db.js DEBE exportar como module.exports = { connectDB };
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

/**
 * 1. CONEXIÓN A INFRAESTRUCTURA
 * Iniciamos la conexión al clúster de MongoDB Atlas antes de montar rutas
 */
connectDB();

/**
 * 2. MIDDLEWARES DE SEGURIDAD Y MONITOREO
 */
app.set('trust proxy', 1); // Necesario para Railway/Vercel/Render

// Seguridad de Headers HTTP
app.use(helmet()); 

// Configuración de CORS para el ecosistema Drone DT
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Rate Limiting para evitar ataques de fuerza bruta o spam al API
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por ventana
    message: {
        success: false,
        message: 'Demasiadas peticiones desde esta IP, por favor intenta después de 15 minutos.'
    }
});
app.use('/api/', limiter);

// Parsing de Body con límite de seguridad (evita ataques de saturación)
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logger de peticiones en consola
app.use(morgan('dev'));

/**
 * 3. --- RUTAS API v1 ---
 */

// Endpoint de Salud / Root - Metadata de la arquitectura
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Operational',
        project: 'Drone DT',
        author: 'Manuel Nieto (NietoDeveloper)',
        rank: 'Colombia #1 Committer',
        clusters: 'Active (Core & Assets)',
        timestamp: new Date().toISOString()
    });
});

// Montaje de rutas de Inventario y Productos
// El archivo productRoutes.js debe exportar un router de express
app.use('/api/v1/products', productRoutes);

/**
 * 4. MANEJO DE RUTAS NO ENCONTRADAS (404)
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `La ruta ${req.originalUrl} no existe en la arquitectura Drone DT`
    });
});

/**
 * 5. MIDDLEWARE DE ERRORES GLOBAL
 * Captura todos los errores de controladores y los procesa
 */
app.use(errorHandler);

/**
 * 6. LANZAMIENTO DEL SERVIDOR
 */
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
    =============================================
    🛸 DRONE DT SERVER OPERATIONAL
    🎯 PORT: ${PORT}
    🌐 NODE_ENV: ${process.env.NODE_ENV || 'development'}
    🏆 Colombia's #1 Committer Standard
    =============================================
    `);
});

/**
 * 7. GESTIÓN DE ERRORES CRÍTICOS Y CIERRE GRÁCIL
 */

// Captura promesas no manejadas (ej. caídas de DB)
process.on('unhandledRejection', (err) => {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Error Crítico (Unhandled Rejection): ${err.message}`);
    // En producción, cerramos el servidor para que Docker/PM2 lo reinicie
    server.close(() => process.exit(1));
});

// Captura de interrupción (Ctrl+C) para cierre limpio
process.on('SIGINT', () => {
    server.close(() => {
        console.log('\x1b[33m%s\x1b[0m', '🛑 Servidor Drone DT cerrado por interrupción del sistema.');
        process.exit(0);
    });
});

module.exports = app;