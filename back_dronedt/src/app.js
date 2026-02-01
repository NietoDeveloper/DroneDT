const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importamos la infraestructura
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// 1. Conexión Dual a MongoDB Atlas (Core & Assets)
connectDB();

// 2. Middlewares de Seguridad y Monitoreo
app.use(helmet()); 
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // En prod, usa tu URL de Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev')); // Log de peticiones en consola

// 3. --- RUTAS API v1 ---

// Endpoint de Salud / Root
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Operational',
        project: 'Drone DT',
        author: 'NietoDeveloper',
        clusters: 'Active (1 & 2)'
    });
});

// Rutas de Inventario y Productos
app.use('/api/v1/products', productRoutes);

// 4. Manejo de Rutas No Encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `La ruta ${req.originalUrl} no existe en la arquitectura Drone DT`
    });
});

// 5. Middleware de Errores Global (Captura fallos de DB o Controladores)
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

// Manejo de errores no capturados (Uncaught Rejections)
process.on('unhandledRejection', (err) => {
    console.log(`❌ Error Crítico: ${err.message}`);
    // Cerrar servidor y salir del proceso
    // server.close(() => process.exit(1));
});

module.exports = app;