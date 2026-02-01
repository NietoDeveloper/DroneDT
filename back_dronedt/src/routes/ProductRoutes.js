const express = require('express');
const { 
    getProducts, 
    getProductById, 
    createProduct 
} = require('../controllers/productController');

const router = express.Router();

/**
 * RUTAS PÚBLICAS - Clúster de Inventario/Assets
 * Estas alimentan el Shop y el catálogo de drones para Drone DT
 */
router.route('/')
    .get(getProducts)      // GET: Lista todos los drones (para el Shop)
    .post(createProduct);  // POST: Registro manual de drones

router.route('/:id')
    .get(getProductById);  // GET: Detalle específico (para Services.tsx y Booking)

/**
 * RUTAS DE ADMINISTRACIÓN - Panel de Control
 * TODO: Implementar middlewares de protección (auth, admin)
 * router.route('/:id')
 * .put(updateProduct)
 * .delete(deleteProduct);
 */

module.exports = router;