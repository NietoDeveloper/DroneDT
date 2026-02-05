const Product = require('../models/Product');

/**
 * @desc    Obtener menú agrupado por categorías para el Navbar (High-Performance)
 * @route   GET /api/v1/products/menu
 * @access  Public
 */
const getProductMenu = async (req, res, next) => {
    try {
        // Pipeline de agregación para que la DB haga el trabajo pesado de agrupar
        const groupedProducts = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories', // Nombre de la colección de categorías en tu DB
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            { $unwind: '$categoryData' },
            {
                $group: {
                    _id: '$categoryData.name',
                    items: {
                        $push: {
                            id: '$_id',
                            name: '$name',
                            desc: '$description',
                            img: '$imageUrl', // Asegúrate que tu modelo use imageUrl
                            price: '$price'
                        }
                    }
                }
            }
        ]);

        // Convertimos el array de agregación en el objeto Record<string, MenuItem[]> que espera el Navbar
        const menuResponse = groupedProducts.reduce((acc, curr) => {
            acc[curr._id] = curr.items;
            return acc;
        }, { Modelos: [], Accesorios: [], Flota: [] });

        res.status(200).json(menuResponse);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener lista completa de drones/servicios
 * @route   GET /api/v1/products
 */
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); 

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
 * @desc    Crear nuevo drone/servicio
 * @route   POST /api/v1/products
 */
const createProduct = async (req, res, next) => {
    try {
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
    getProductMenu, // Nueva función exportada
    getProductById,
    createProduct
};