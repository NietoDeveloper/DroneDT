// --- INFRASTRUCTURE MODEL ---
const Product = require('../models/Product'); 
const mongoose = require('mongoose');

/**
 * @desc    Obtener menú ligero (Ajustado para el Uplink del Navbar)
 * @route   GET /api/v1/products/menu
 * @access  Public
 */
const getProductMenu = async (req, res, next) => {
    try {
        /**
         * PERFORMANCE TUNING:
         * .lean() para evitar la hidratación de documentos Mongoose.
         * .populate('category') solo si manejas referencias a otra colección.
         */
        const products = await Product.find({})
            .select('name price images category imageUrl description')
            .lean();

        // Formateo robusto para el mapeo del Frontend (categoryMap compatible)
        const formattedData = products.map(product => {
            // Aseguramos que category sea un string plano para el categoryMap del Front
            const categoryName = product.category?.name || product.category || 'drone';
            
            return {
                _id: product._id,
                name: product.name || "UNNAMED UNIT",
                price: product.price || 0,
                category: categoryName,
                description: product.description || "",
                // Prioridad: 1. imageUrl directo, 2. Array de imágenes, 3. Placeholder
                imageUrl: product.imageUrl || 
                         (product.images && product.images.length > 0 ? product.images[0].url : null)
            };
        });

        console.log(`\x1b[36m[ASSETS-CLUSTER]\x1b[0m Telemetría enviada: ${formattedData.length} unidades al Front.`);

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
        // Validar si el ID es un ObjectId válido para evitar crash del clúster
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "ID de unidad inválido" });
        }

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
        res.status(500).json({ success: false, message: "Error interno del clúster al buscar unidad" });
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