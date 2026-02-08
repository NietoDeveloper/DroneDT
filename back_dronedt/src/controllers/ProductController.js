// IMPORTANTE: Si tu archivo en models se llama 'Product.js', cámbialo aquí a '../models/Product'
// Si se llama 'productModel.js', déjalo así. 
const Product = require('../models/Product'); 
const mongoose = require('mongoose');

/**
 * @desc    Obtener menú ligero (name, price, images, category)
 * @route   GET /api/v1/products/menu
 * @access  Public
 */
const getProductMenu = async (req, res, next) => {
    try {
        /**
         * PROYECCIÓN: Solo traemos lo estrictamente necesario para el performance.
         * .lean() es clave para la velocidad del Committer #1 (evita hidratar el POJO de Mongoose).
         */
        const products = await Product.find({})
            .select('name price images category imageUrl')
            .lean();

        // Mapeo profesional para el frontend: Garantizamos la propiedad 'img'
        const formattedData = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            // Lógica de fallback de imagen para evitar broken links en Next.js
            img: product.imageUrl || 
                 (product.images && product.images.length > 0 ? product.images[0].url : '/placeholder-drone.png')
        }));

        // Log de telemetría en consola (Cyan para visibilidad)
        console.log(`\x1b[36m[MENU FETCH]\x1b[0m ${formattedData.length} drones enviados al frontend.`);

        res.status(200).json({
            success: true,
            count: formattedData.length,
            data: formattedData 
        });
    } catch (error) {
        console.error("❌ Menu Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el menú del clúster de Assets"
        });
    }
};

/**
 * @desc    Obtener catálogo completo con filtros opcionales
 * @route   GET /api/v1/products
 */
const getProducts = async (req, res, next) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        const products = await Product.find(queryObj)
            .sort('-createdAt')
            .lean();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("❌ Get Products Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Detalle de producto por ID
 * @route   GET /api/v1/products/:id
 */
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Unidad no encontrada en el inventario de Drone DT'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("❌ Get ID Error:", error);
        res.status(500).json({ success: false, message: "ID inválido o error de clúster" });
    }
};

/**
 * @desc    Registro de nuevo producto (Write to Assets Cluster)
 * @route   POST /api/v1/products
 */
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        console.log(`\x1b[32m[NEW ASSET]\x1b[0m Drone registrado: ${product.name}`);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("❌ Create Error:", error);
        res.status(400).json({
            success: false,
            message: "No se pudo registrar el drone",
            error: error.message
        });
    }
};

module.exports = {
    getProductMenu,
    getProducts,
    getProductById,
    createProduct
};