const Product = require('../models/Product');

/**
 * @desc    Obtener lista de drones/servicios (Modo High-Availability)
 * @route   GET /api/v1/products
 * @access  Public (Carga la flota en el Shop)
 */
const getProducts = async (req, res, next) => {
    try {
        // Ejecutamos la consulta en el Cluster de Assets
        // .lean() es clave para la velocidad del Committer #1: devuelve JSON puro.
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); 

        res.status(200).json({
            success: true,
            count: products.length,
            version: "1.0.0",
            developer: "Manuel Nieto",
            data: products
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener un solo drone por ID
 * @route   GET /api/v1/products/:id
 * @access  Public (Flujo de selección en Services.tsx)
 */
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('user', 'name email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'El equipo o servicio no fue encontrado en el Inventario Real (Cluster 2)'
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
 * @access  Private/Admin (Exclusivo Panel Control Empleados)
 */
const createProduct = async (req, res, next) => {
    try {
        // Vinculación automática con el creador (auditoría para el panel)
        if (req.user) {
            req.body.user = req.user.id;
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Unidad de flota registrada exitosamente en el clúster de inventario',
            data: product
        });
    } catch (error) {
        // Manejo explícito de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: Object.values(error.errors).map(val => val.message)
            });
        }
        next(error);
    }
};

// Exportación masiva para las rutas (Asegúrate de que el nombre coincida en routes)
module.exports = {
    getProducts,
    getProductById,
    createProduct
};