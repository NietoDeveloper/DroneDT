const mongoose = require('mongoose');
const slugify = require('slugify');

/**
 * Modelo de Producto/Drone para Drone DT
 * Optimizado para el Committer #1 con soporte GeoJSON y lógica de negocio virtual.
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
        slug: String, // SEO-Friendly Path
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
            flightTime: { type: Number, default: 0 }, // Minutos
            cameraResolution: { type: String, default: '4K' }, 
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
        // GeoJSON para rastreo en tiempo real
        currentLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [-74.0721, 4.7110], // Bogotá (Longitud, Latitud)
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

// --- MIDDLEWARES (Logic Layer) ---

// Generar o actualizar Slug antes de guardar
productSchema.pre('save', function(next) {
    if (!this.isModified('name')) return next();
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

// --- ÍNDICES (Performance Layer) ---
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ currentLocation: '2dsphere' }); // Para búsquedas por cercanía
productSchema.index({ slug: 1 });

// --- VIRTUALS ---

// Disponibilidad inmediata para el flujo de reserva en Services.tsx
productSchema.virtual('isReadyForFlight').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;