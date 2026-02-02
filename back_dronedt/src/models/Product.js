const mongoose = require('mongoose');
const slugify = require('slugify');

/**
 * Modelo de Producto/Drone para Drone DT
 * Arquitectura de alto rendimiento con soporte GeoJSON y SEO Friendly.
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
        slug: String, // Para URLs amigables en Next.js
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
            required: [true, 'La descripción es necesaria para el cliente'],
        },
        price: {
            type: Number,
            required: [true, 'Define un precio base'],
            min: [0, 'El precio no puede ser negativo'],
            default: 0,
        },
        specifications: {
            flightTime: { type: Number, default: 0 }, // Minutos
            cameraResolution: { type: String, default: 'N/A' }, 
            maxRange: { type: Number, default: 0 }, // Metros
            weight: { type: Number, default: 0 }, // Gramos
        },
        images: {
            type: [
                {
                    url: { type: String, required: true },
                    public_id: { type: String }, // Referencia para AWS S3
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
        // Estructura GeoJSON estándar para MongoDB
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
        rating: {
            type: Number,
            default: 0,
            min: [0, 'El rating debe ser al menos 0'],
            max: [5, 'El rating no puede superar 5']
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Debe haber un administrador responsable'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// --- MIDDLEWARES ---

// Generar Slug antes de guardar (SEO)
productSchema.pre('save', function(next) {
    if (!this.isModified('name')) return next();
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

// --- ÍNDICES ---
// Optimizamos la búsqueda para que el buscador de la Shop sea instantáneo
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ currentLocation: '2dsphere' }); 
productSchema.index({ slug: 1 });

// --- VIRTUALS ---

// Determina si el servicio puede ser agendado en el flujo de Services.tsx
productSchema.virtual('isBookable').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

// Cambiamos 'export default' por 'module.exports'
const Product = mongoose.model('Product', productSchema);
module.exports = Product;