import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct 
} from '../controllers/productController.js';

const router = express.Router();

/**
 * RUTAS PÚBLICAS - Clúster de Inventario/Assets
 * Estas alimentan el Shop y el ProductShow del Frontend
 */
router.route('/')
    .get(getProducts) // Carga masiva de drones (Shop)
    .post(createProduct); // Para tus pruebas iniciales de inventario

router.route('/:id')
    .get(getProductById); // Detalle para el flujo de Services.tsx

/**
 * RUTAS DE ADMINISTRACIÓN - Panel de Control Empleados
 * (Aquí podrías agregar un middleware de Auth en el futuro)
 */
// router.route('/:id').put(updateProduct).delete(deleteProduct);

export default router;