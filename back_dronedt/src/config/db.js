const { assetsConnection } = require('../config/db');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    stock: { type: Number, default: 0 }
}, { timestamps: true });

// 1. Usamos assetsConnection (Clúster 2)
// 2. Forzamos el nombre de la colección 'products' para evitar fallos de pluralización
module.exports = assetsConnection.model('Product', productSchema, 'products');