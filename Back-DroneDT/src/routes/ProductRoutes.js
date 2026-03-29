const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- IMPORTACIÓN CRÍTICA (PascalCase exacto para evitar MODULE_NOT_FOUND en Linux) ---
const { 
    getProducts, 
    getProductMenu, 
    getProductById, 
    createProduct 
} = require('../controllers/ProductController');

/**
 * [MIDDLEWARE DE TELEMETRÍA LOCAL]
 * Monitoreo de latencia para el Cluster de Assets de Drone DT
 */
router.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // Color Magenta (\x1b[35m) para identificar tráfico hacia el Cluster 2
    console.log(`\x1b[35m[DRONE-ASSET-LOG]\x1b[0m ${req.requestTime} - \x1b[32m${req.method}\x1b[0m ${req.originalUrl}`);
    next();
});

/**
 * [RUTAS DE FLOTA E INVENTARIO]
 * Endpoint base: /api/v1/products
 */

// 1. RUTA DE NAVEGACIÓN (Menu / Categorías)
router.get('/menu', getProductMenu);

// 2. RUTAS DE COLECCIÓN
router.route('/')
    .get(getProducts) // Catálogo para la Shop
    .post(createProduct); // Admin: Registro de nuevas unidades

// 3. RUTAS DE INSTANCIA (ID Validado)
router.route('/:id')
    .get((req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.error(`\x1b[31m[SECURITY]\x1b[0m ID inválido: ${req.params.id}`);
            return res.status(400).json({
                success: false,
                system_code: 'INVALID_DRONE_ID',
                message: 'El ID proporcionado no es un formato válido de MongoDB Atlas.'
            });
        }
        next();
    }, getProductById);

/**
 * [CATCH-ALL ERROR HANDLER] 
 * Garantiza que el frontend reciba una respuesta incluso en fallos críticos
 */
router.use((err, req, res, next) => {
    console.error(`\x1b[41m[PRODUCT-ROUTE-ERROR]\x1b[0m`, err.stack);
    res.status(500).json({
        success: false,
        system_code: 'INTERNAL_PRODUCT_ERROR',
        engineer: 'Manuel Nieto',
        rank: 'Colombia #1 | 3 Badges Distinción' // Actualizado según tu perfil 2026
    });
});

module.exports = router;