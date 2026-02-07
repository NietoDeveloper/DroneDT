const Product = require('../models/Product');
const mongoose = require('mongoose');

/**
 * @desc    Obtener menú ligero (name, price, images, category)
 * @route   GET /api/v1/products/menu
 */
const getProductMenu = async (req, res, next) => {
    try {
        // PROYECCIÓN: Solo traemos lo estrictamente necesario para el performance
        // Usamos .lean() para obtener POJO (Plain Old JavaScript Objects) y ganar velocidad
        const products = await Product.find({})
            .select('name price images category imageUrl')
            .lean();

        // Mapeo para asegurar que cada item tenga una propiedad 'img' consistente
        const formattedData = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            // Prioridad: imageUrl > primera imagen del array > placeholder
            img: product.imageUrl || (product.images && product.images.length > 0 ? product.images[0].url : null)
        }));

        res.status(200).json({
            success: true,
            data: formattedData // Estructura solicitada: Array de objetos
        });
    } catch (error) {
        console.error("❌ Menu Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el menú del clúster"
        });
    }
};

/**
 * @desc    Obtener catálogo completo con filtros opcionales
 */
const getProducts = async (req, res, next) => {
    try {
        // Clonamos el query para filtrar
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
        next(error);
    }
};

/**
 * @desc    Detalle de producto por ID
 */
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Unidad no encontrada en Drone DT'
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
 * @desc    Registro de nuevo producto
 */
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductMenu,
    getProducts,
    getProductById,
    createProduct
};