const Product = require('../models/Product');
const mongoose = require('mongoose');

/**
 * @desc    Obtener menú agrupado por categorías (High-Performance Aggregation)
 * @route   GET /api/v1/products/menu
 */
const getProductMenu = async (req, res, next) => {
    try {
        const groupedProducts = await Product.aggregate([
            {
                // Lookup con la colección de categorías
                $lookup: {
                    from: 'categories', 
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            { $unwind: { path: '$categoryData', preserveNullAndEmptyArrays: false } },
            {
                // Agrupamos por el nombre de la categoría
                $group: {
                    _id: '$categoryData.name',
                    items: {
                        $push: {
                            id: '$_id',
                            name: '$name',
                            desc: '$description',
                            // Lógica de imagen robusta: imageUrl > primera posición de images > placeholder
                            img: { 
                                $ifNull: [
                                    '$imageUrl', 
                                    { $arrayElemAt: ['$images.url', 0] }
                                ] 
                            },
                            price: '$price'
                        }
                    }
                }
            }
        ]);

        // Mapeo inteligente para el Navbar de Drone DT
        const categoryMapping = {
            'Drones': 'Modelos',
            'Accesorios': 'Accesorios',
            'Servicios': 'Flota',
            'Industrial': 'Flota'
        };

        const menuResponse = groupedProducts.reduce((acc, curr) => {
            const label = categoryMapping[curr._id] || curr._id;
            
            if (!acc[label]) acc[label] = [];
            // Evitamos duplicados y concatenamos
            acc[label] = [...acc[label], ...curr.items];
            
            return acc;
        }, { Modelos: [], Accesorios: [], Flota: [] });

        res.status(200).json({
            success: true,
            system: "Drone DT Nav Uplink",
            data: menuResponse
        });
    } catch (error) {
        console.error("❌ Uplink Error en Aggregation:", error);
        next(error);
    }
};

/**
 * @desc    Obtener lista completa con metadatos NietoDeveloper
 * @route   GET /api/v1/products
 */
const getProducts = async (req, res, next) => {
    try {
        // Usamos lean() para máxima velocidad de respuesta
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt')
            .lean(); 

        // Cache de 60 segundos para optimizar el Cluster
        res.setHeader('Cache-Control', 'public, max-age=60');

        res.status(200).json({
            success: true,
            count: products.length,
            metadata: {
                version: "1.1.0",
                lead_engineer: "Manuel Nieto",
                rank: "Colombia #1",
                engine: "Software DT Proprietary",
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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de telemetría no válido'
            });
        }

        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'La unidad no existe en el Inventario Real'
            });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Crear nuevo drone/servicio
 */
const createProduct = async (req, res, next) => {
    try {
        if (req.user) req.body.user = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Unidad registrada en el Cluster',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductMenu,
    getProductById,
    createProduct
};