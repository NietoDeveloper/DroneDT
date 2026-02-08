const mongoose = require('mongoose');
const db = require('../config/db'); // Importamos el objeto completo

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    stock: { type: Number, default: 0 }
}, { timestamps: true });

/**
 * DRONE DT - ASSETS CLUSTER MODEL
 * Usamos db.assetsConnection para asegurar que la referencia exista 
 * al momento de la compilación del modelo.
 */
const Product = db.assetsConnection.model('Product', productSchema, 'products');

module.exports = Product;