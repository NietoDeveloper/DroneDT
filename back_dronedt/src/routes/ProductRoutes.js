const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importamos el controlador con la nueva función getProductMenu
const { 
    getProducts, 
    getProductMenu, 
    getProductById, 
    createProduct 
} = require('../controllers/productController');

/**
 * [MIDDLEWARE DE TELEMETRÍA LOCAL]
 * Monitorea el tráfico específico de productos en la consola
 */
router.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`\x1b[35m[PRODUCT-TRAFFIC]\x1b[0m ${timestamp} - ${req.method} ${req.originalUrl}`);
    next();
});

/**
 * [RUTAS DE FLOTA E INVENTARIO]
 * Endpoint base: /api/v1/products
 */

// NUEVA RUTA: Específica para el Navbar de Drone DT
// Se coloca antes de /:id para evitar colisiones de rutas
router.get('/menu', getProductMenu);

router.route('/')
    /**
     * @route   GET /api/v1/products
     * @desc    Obtener catálogo completo para la Shop (Next.js)
     */
    .get(getProducts)
    
    /**
     * @route   POST /api/v1/products
     * @desc    Crear nuevo dron en el clúster (Admin/Postman)
     */
    .post(createProduct);

router.route('/:id')
    /**
     * @route   GET /api/v1/products/:id
     * @desc    Detalle técnico para el flujo de reserva y product page
     */
    .get((req, res, next) => {
        // Validación express del ID antes de pasar al controlador
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                system_code: 'INVALID_DRONE_ID',
                message: 'El ID de telemetría proporcionado no es un formato válido de MongoDB Atlas.'
            });
        }
        next();
    }, getProductById);

module.exports = router;