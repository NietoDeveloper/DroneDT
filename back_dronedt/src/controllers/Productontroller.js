import Product from '../models/Product.js';

/**
 * @desc    Obtener lista de drones/servicios (Modo High-Availability)
 * @route   GET /api/v1/products
 * @access  Public (Carga la flota en el Shop)
 */
export const getProducts = async (req, res, next) => {
    try {
        // Ejecutamos la consulta en el Cluster de Assets
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); // .lean() mejora el rendimiento al devolver objetos JSON puros

        res.status(200).json({
            success: true,
            count: products.length,
            version: "1.0.0", // Para control de API en producción
            data: products
        });
    } catch (error) {
        // Este next(error) dispara tu middleware de errorHandler.js
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
                message: 'El equipo o servicio no fue encontrado en el Inventario Real (Cluster 2)'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        // Manejo automático de errores de ID mal formado (CastError)
        next(error);
    }
};

/**
 * @desc    Crear nuevo drone/servicio
 * @route   POST /api/v1/products
 * @access  Private/Admin (Exclusivo Panel Control Empleados)
 */
export const createProduct = async (req, res, next) => {
    try {
        // En producción, vinculamos el ID del empleado que crea el producto
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
        next(error);
    }
};