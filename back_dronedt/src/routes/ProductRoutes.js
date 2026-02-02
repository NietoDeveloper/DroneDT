const express = require('express');
const router = express.Router();

// Importamos el controlador
// NOTA: Asegúrate de que el archivo se llame exactamente 'productController.js' en src/controllers/
const { 
    getProducts, 
    getProductById, 
    createProduct 
} = require('../controllers/productController');

/**
 * RUTAS PÚBLICAS - Arquitectura Drone DT
 * Enlazadas al Clúster de Inventario/Assets
 */
router.route('/')
    .get(getProducts)       // GET: /api/v1/products -> Catálogo Shop
    .post(createProduct);   // POST: /api/v1/products -> Registro Manual

router.route('/:id')
    .get(getProductById);   // GET: /api/v1/products/:id -> Detalle para Services/Booking

/**
 * @TODO: Integrar Middlewares de Auth para el Panel de Control
 * Próxima fase: router.use(protect).use(restrictTo('admin'))
 */

module.exports = router;