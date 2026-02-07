const mongoose = require('mongoose');
const slugify = require('slugify');
const { assetsConnection } = require('../config/db');

/**
 * Modelo de Producto/Drone para Drone DT
 * Vinculado al Cluster ASSETS para gestión de inventario y telemetría.
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
        // AJUSTE TÉCNICO: Enum estricto para evitar fallos de mapeo en el Front
        category: {
            type: String,
            required: [true, 'Debes asignar una categoría técnica'],
            enum: {
                values: ['drone', 'accessory', 'fleet', 'industrial'],
                message: '{VALUE} no es una categoría permitida (drone, accessory, fleet, industrial)'
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
            flightTime: { type: Number, default: 0 }, // en minutos
            cameraResolution: { type: String, default: '4K' }, 
            maxRange: { type: Number, default: 0 }, // en Km
            weight: { type: Number, default: 0 }, // en gramos
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
productSchema.index({ category: 1 }); // Mantenemos el índice para el filtrado rápido

// --- VIRTUALS ---
productSchema.virtual('isReadyForFlight').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

/**
 * EXPORTACIÓN SOBRE CONEXIÓN ESPECÍFICA (Cluster ASSETS)
 */
const Product = assetsConnection.models.Product || assetsConnection.model('Product', productSchema);

module.exports = Product;