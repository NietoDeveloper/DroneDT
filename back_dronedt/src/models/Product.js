const mongoose = require('mongoose');
const slugify = require('slugify');
const { assetsConnection } = require('../config/db'); // Importamos la conexión directamente, no el getter

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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Debes asignar una categoría técnica'],
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
                default: [-74.0721, 4.7110], // Bogotá
            },
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
    next();
});

// --- ÍNDICES ---
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ currentLocation: '2dsphere' });
productSchema.index({ slug: 1 });

// --- VIRTUALS ---
productSchema.virtual('isReadyForFlight').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

/**
 * IMPLEMENTACIÓN BLINDADA:
 * Usamos la instancia 'assetsConnection' exportada de db.js.
 * Al ser un objeto ya instanciado (aunque esté conectando), .model() no será undefined.
 */
const Product = assetsConnection.models.Product || assetsConnection.model('Product', productSchema);

module.exports = Product;