const express = require('express');
const router = express.Router();

// Importamos el controlador con desestructuración
// Importante: Si esto falla, verifica que el archivo físico NO tenga mayúsculas (productController.js)
const { 
    getProducts, 
    getProductById, 
    createProduct 
} = require('../controllers/productController');

/**
 * RUTAS PÚBLICAS - Arquitectura Drone DT
 * Enlazadas al Clúster de Inventario/Assets para Shop y Services
 */
router.route('/')
    .get(getProducts)       // Catálogo general para la Shop
    .post(createProduct);   // Registro inicial de drones (vía Postman/Admin)

router.route('/:id')
    .get(getProductById);   // Detalle específico para el flujo de Booking

module.exports = router;