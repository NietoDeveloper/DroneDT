const mongoose = require('mongoose');
const slugify = require('slugify');
const { assetsConnection } = require('../config/db');

/**
 * DRONE DT - ASSETS CLUSTER MODEL
 * Developer: Manuel Nieto | Rank: #1 Colombia
 * Vinculado al Cluster 2 para inventario, telemetría y logística.
 */
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del drone/servicio es obligatorio'],
            unique: true,
            trim: true,
            maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
        },
        slug: String,
        brand: {
            type: String,
            required: [true, 'La marca del equipo es obligatoria'],
            default: 'Software DT Tech',
        },
        category: {
            type: String,
            required: [true, 'Debes asignar una categoría técnica'],
            enum: {
                values: ['drone', 'accessory', 'fleet', 'industrial'],
                message: '{VALUE} no es una categoría permitida'
            },
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            required: [true, 'La descripción es necesaria para el catálogo'],
        },
        price: {
            type: Number,
            required: [true, 'Define un precio base'],
            min: [0, 'El precio no puede ser negativo'],
            default: 0,
        },
        imageUrl: {
            type: String,
            description: 'URL de la imagen principal para renderizado rápido'
        },
        specifications: {
            flightTime: { type: Number, default: 0 },
            cameraResolution: { type: String, default: '4K' }, 
            maxRange: { type: Number, default: 0 },
            weight: { type: Number, default: 0 },
        },
        images: {
            type: [
                {
                    url: { type: String, required: true },
                    public_id: { type: String },
                }
            ],
            validate: [val => val.length > 0, 'Debe incluir al menos una imagen']
        },
        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio'],
            min: [0, 'El stock no puede ser menor a cero'],
            default: 1,
        },
        status: {
            type: String,
            enum: {
                values: ['disponible', 'mantenimiento', 'en_vuelo', 'fuera_servicio'],
                message: '{VALUE} no es un estado válido'
            },
            default: 'disponible',
        },
        currentLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [-74.0721, 4.7110], // Bogotá, Colombia
            },
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 5,
            min: [0, 'Rating mínimo 0'],
            max: [5, 'Rating máximo 5']
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Debe haber un administrador responsable (Audit Log)'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// --- MIDDLEWARES ---
productSchema.pre('save', function(next) {
    if (!this.isModified('name')) return next();
    this.slug = slugify(this.name, { lower: true, strict: true });
    
    if (!this.imageUrl && this.images && this.images.length > 0) {
        this.imageUrl = this.images[0].url;
    }
    next();
});

// --- ÍNDICES ---
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ currentLocation: '2dsphere' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

// --- VIRTUALS ---
productSchema.virtual('isReadyForFlight').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

/**
 * EXPORTACIÓN BLINDADA (PREVIENE EL TypeError: undefined)
 * 1. Intentamos recuperar el modelo si ya está compilado.
 * 2. Si no, lo compilamos usando assetsConnection.
 * 3. Forzamos la colección 'products'.
 */
const Product = assetsConnection.models.Product || assetsConnection.model('Product', productSchema, 'products');

module.exports = Product;