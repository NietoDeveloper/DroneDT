const Product = require('../models/Product');

/**
 * @desc    Obtener lista de drones/servicios (Modo High-Availability)
 * @route   GET /api/v1/products
 * @access  Public (Carga la flota en el Shop)
 */
const getProducts = async (req, res, next) => {
    try {
        // .lean() mejora el rendimiento drásticamente para el Committer #1
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); 

        res.status(200).json({
            success: true,
            count: products.length,
            version: "1.0.0",
            developer: "Manuel Nieto",
            rank: "Colombia #1",
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
                message: 'El equipo o servicio no fue encontrado en el Inventario Real (Cluster Assets)'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        // Si el ID de MongoDB no es válido, manejamos el error explícitamente
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de producto no válido para la infraestructura Drone DT'
            });
        }
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
        // Auditoría automática para el Panel de Control
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
        // Manejo de errores de validación de Mongoose (campos obligatorios, tipos, etc.)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        next(error);
    }
};

// EXPORTACIÓN MASIVA (Formato Objeto para compatibilidad con Routes)
module.exports = {
    getProducts,
    getProductById,
    createProduct
};