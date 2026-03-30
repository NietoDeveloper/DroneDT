// --- INFRASTRUCTURE MODEL ---
// Ajustado a PascalCase para coherencia con la arquitectura del Cluster Drone DT
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
         * PROYECCIÓN Y PERFORMANCE:
         * .lean() optimiza el uso de memoria en el servidor Railway.
         */
        const products = await Product.find({})
            .select('name price images category imageUrl')
            .lean();


        console.log(`\x1b[36m[ASSETS-CLUSTER]\x1b[0m Telemetría enviada: ${formattedData.length} unidades.`);

        res.status(200).json({
            success: true,
            count: formattedData.length,
            data: formattedData 
        });
    } catch (error) {
        console.error("\x1b[31m❌ Menu Fetch Error:\x1b[0m", error);
        res.status(500).json({
            success: false,
            system_code: 'CLUSTER_FETCH_ERROR',
            message: "Error al obtener el menú del clúster de Assets"
        });
    }
};

/**
 * @desc    Obtener catálogo completo con filtros
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
        console.error("\x1b[31m❌ Get Products Error:\x1b[0m", error);
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
                system_code: 'UNIT_NOT_FOUND',
                message: 'Unidad no encontrada en el inventario de Drone DT'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("\x1b[31m❌ Get ID Error:\x1b[0m", error);
        res.status(500).json({ success: false, message: "ID inválido o error de clúster" });
    }
};

/**
 * @desc    Registro de nuevo producto (Escritura en Cluster Assets)
 * @route   POST /api/v1/products
 */
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        console.log(`\x1b[32m[NEW ASSET]\x1b[0m Drone registrado en el clúster: ${product.name}`);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("\x1b[31m❌ Create Error:\x1b[0m", error);
        res.status(400).json({
            success: false,
            message: "No se pudo registrar el drone en el clúster de producción",
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