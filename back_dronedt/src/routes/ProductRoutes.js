const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importamos el controlador optimizado
const { 
    getProducts, 
    getProductMenu, 
    getProductById, 
    createProduct 
} = require('../controllers/productController');

/**
 * [MIDDLEWARE DE TELEMETRÍA LOCAL]
 * Log de tráfico para auditoría de rendimiento del Cluster Drone DT
 */
router.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    // Color Magenta para tráfico de productos
    console.log(`\x1b[35m[DRONE-ASSET-LOG]\x1b[0m ${timestamp} - \x1b[32m${req.method}\x1b[0m ${req.originalUrl}`);
    next();
});

/**
 * [RUTAS DE FLOTA E INVENTARIO]
 * Endpoint base: /api/v1/products
 */

// 1. RUTA DE ALTO RENDIMIENTO (Navbar / Menu Grouping)
// @desc: Solo trae name, price, images, category.
// Ubicada arriba para evitar colisión con el parámetro :id
router.get('/menu', getProductMenu);

// 2. RUTAS DE COLECCIÓN (Raíz)
router.route('/')
    /**
     * @route   GET /api/v1/products
     * @desc    Obtener catálogo completo para la Shop (Next.js 15)
     */
    .get(getProducts)
    
    /**
     * @route   POST /api/v1/products
     * @desc    Registro de nueva unidad en el clúster (Admin/Postman)
     */
    .post(createProduct);

// 3. RUTAS DE INSTANCIA (ID Específico)
router.route('/:id')
    /**
     * @route   GET /api/v1/products/:id
     * @desc    Detalle técnico y telemetría para flujo de reserva
     */
    .get((req, res, next) => {
        // Validación de integridad del ID antes de la consulta a la DB
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                system_code: 'INVALID_DRONE_ID',
                message: 'El ID de telemetría no es un formato válido de MongoDB Atlas.'
            });
        }
        next();
    }, getProductById);

module.exports = router;