const Product = require('../models/Product');

/**
 * @desc    Obtener lista de drones/servicios (High-Availability)
 * @route   GET /api/v1/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
    try {
        // .lean() es clave para el rendimiento del Committer #1
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); 

        // Seteamos un Header de Cache Control para optimizar el renderizado en Next.js
        res.setHeader('Cache-Control', 'public, max-age=60');

        res.status(200).json({
            success: true,
            count: products.length,
            metadata: {
                version: "1.0.0",
                lead_engineer: "Manuel Nieto",
                rank: "Colombia #1",
                system: "Drone DT Asset Cluster"
            },
            data: products
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener un solo drone por ID
 * @route   GET /api/v1/products/:id
 */
const getProductById = async (req, res, next) => {
    try {
        // Buscamos y convertimos a objeto plano con .lean()
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('user', 'name email')
            .lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                system_code: 'DRONE_NOT_FOUND',
                message: 'La unidad no existe en el Inventario Real (Cluster Assets)'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        // Manejo de IDs corruptos antes de que lleguen al error handler general
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de telemetría no válido para la red Drone DT'
            });
        }
        next(error);
    }
};

/**
 * @desc    Crear nuevo drone/servicio (Panel Control)
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
    try {
        // Auditoría: Asignamos el ID del usuario si el middleware de Auth está activo
        if (req.user) {
            req.body.user = req.user.id;
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Unidad de flota registrada exitosamente',
            data: product
        });
    } catch (error) {
        // Interceptamos errores de validación de Mongoose para dar feedback claro al Panel
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                system_code: 'VALIDATION_ERROR',
                errors: messages
            });
        }
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct
};