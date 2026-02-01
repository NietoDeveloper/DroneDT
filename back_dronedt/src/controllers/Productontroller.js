import Product from '../models/Product.js';

/**
 * @desc    Obtener lista de drones/servicios
 * @route   GET /api/v1/products
 * @access  Public (Carga los drones en la tienda/shop)
 */
export const getProducts = async (req, res, next) => {
    try {
        // Buscamos los productos y traemos el nombre de la categoría
        // Ordenamos por los más recientes para que las novedades aparezcan primero
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        // Este next(error) activa el errorHandler.js que configuramos antes
        next(error);
    }
};

/**
 * @desc    Obtener un solo drone por ID
 * @route   GET /api/v1/products/:id
 * @access  Public (Flujo de selección en Services.tsx)
 */
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('user', 'name email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'El equipo o servicio no fue encontrado en la base de datos'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Crear nuevo drone/servicio
 * @route   POST /api/v1/products
 * @access  Private/Admin (Para el panel de control de empleados)
 */
export const createProduct = async (req, res, next) => {
    try {
        // En una fase posterior, req.user vendrá del middleware de Auth
        // Por ahora, el body debe incluir el ID del usuario/admin
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Drone registrado exitosamente',
            data: product
        });
    } catch (error) {
        next(error);
    }
};