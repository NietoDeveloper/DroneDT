const mongoose = require('mongoose');
const { assetsConnection } = require('../config/db');

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
 * 1. Vincula el modelo al clúster de Assets (Clúster 2).
 * 2. Verifica si el modelo ya está compilado para evitar el crash de 'undefined'.
 * 3. Fuerza el nombre de la colección a 'products'.
 */
const Product = assetsConnection.models.Product || assetsConnection.model('Product', productSchema, 'products');

module.exports = Product;