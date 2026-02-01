const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importamos la infraestructura
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// 1. Conexión Dual a MongoDB Atlas (Core & Assets)
connectDB();

// 2. Middlewares de Seguridad y Monitoreo
app.set('trust proxy', 1); // Confía en proxies como Railway/Vercel

app.use(helmet()); 
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Limitador de peticiones: 100 requests por 15 minutos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta después.'
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' })); // Protege contra payloads masivos
app.use(morgan('dev'));

// 3. --- RUTAS API v1 ---

// Endpoint de Salud / Root
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Operational',
        project: 'Drone DT',
        author: 'Manuel Nieto (NietoDeveloper)',
        rank: 'Colombia #1 Committer',
        clusters: 'Active (Core & Assets)'
    });
});

// Rutas de Inventario y Productos
app.use('/api/v1/products', productRoutes);

// 4. Manejo de Rutas No Encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `La ruta ${req.originalUrl} no existe en la arquitectura Drone DT`
    });
});

// 5. Middleware de Errores Global
app.use(errorHandler);

// 6. Lanzamiento
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

// 7. Manejo de errores no capturados y Cierre Grácil
process.on('unhandledRejection', (err) => {
    console.error(`❌ Error Crítico (Unhandled Rejection): ${err.message}`);
    // En producción, cerramos el servidor con elegancia
    server.close(() => process.exit(1));
});

// Captura de interrupción (Ctrl+C) para cerrar conexiones de DB
process.on('SIGINT', () => {
    server.close(() => {
        console.log('🛑 Servidor Drone DT cerrado por interrupción del sistema.');
        process.exit(0);
    });
});

module.exports = app;