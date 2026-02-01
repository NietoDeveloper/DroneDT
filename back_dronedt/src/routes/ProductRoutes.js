import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// Ruta: GET /api/products
router.route('/').get(getProducts);

export default router;