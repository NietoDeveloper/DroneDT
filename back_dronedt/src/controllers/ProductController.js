const Product = require('../models/Product');

/**
 * @desc    Obtener menú agrupado por categorías para el Navbar (High-Performance Aggregation)
 * @route   GET /api/v1/products/menu
 * @access  Public
 */
const getProductMenu = async (req, res, next) => {
    try {
        const groupedProducts = await Product.aggregate([
            {
                // Unimos con la colección de categorías
                $lookup: {
                    from: 'categories', 
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            { $unwind: '$categoryData' },
            {
                // Agrupamos por el nombre de la categoría
                $group: {
                    _id: '$categoryData.name',
                    items: {
                        $push: {
                            id: '$_id',
                            name: '$name',
                            desc: '$description',
                            // Priorizamos imageUrl, fallback a la primera imagen del array si existe
                            img: { $ifNull: ['$imageUrl', { $arrayElemAt: ['$images', 0] }] },
                            price: '$price'
                        }
                    }
                }
            },
            {
                // Limpiamos el resultado: solo categorías con items
                $match: { "items.0": { $exists: true } }
            }
        ]);

        // Mapeo inteligente para asegurar que coincida con las pestañas del Navbar
        // Esto normaliza nombres como "Drones" -> "Modelos" si es necesario
        const categoryMapping = {
            'Drones': 'Modelos',
            'Accesorios': 'Accesorios',
            'Servicios': 'Flota',
            'Industrial': 'Flota'
        };

        const menuResponse = groupedProducts.reduce((acc, curr) => {
            const label = categoryMapping[curr._id] || curr._id;
            
            if (!acc[label]) acc[label] = [];
            acc[label] = [...acc[label], ...curr.items];
            
            return acc;
        }, { Modelos: [], Accesorios: [], Flota: [] });

        res.status(200).json(menuResponse);
    } catch (error) {
        console.error("❌ Uplink Error en Aggregation:", error);
        next(error);
    }
};

/**
 * @desc    Obtener lista completa con metadatos de alto nivel
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
                system: "Drone DT Asset Cluster",
                status: "Operational"
            },
            data: products
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener un solo drone por ID con validación de telemetría
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
 * @desc    Crear nuevo drone/servicio (Registrar en Flota)
 */
const createProduct = async (req, res, next) => {
    try {
        // Asignar el committer/operador actual
        if (req.user) {
            req.body.user = req.user.id;
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Unidad de flota registrada exitosamente en el Cluster',
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
    getProductMenu,
    getProductById,
    createProduct
};