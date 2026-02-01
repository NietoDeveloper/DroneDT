import mongoose from 'mongoose';

/**
 * Modelo de Producto/Drone para Software DT
 * Optimizado para geolocalización y flujo de servicios.
 */
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del drone/servicio es obligatorio'],
            trim: true,
            maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
        },
        brand: {
            type: String,
            required: [true, 'La marca del equipo es obligatoria'],
            default: 'Software DT Tech',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Debes asignar una categoría (e.g., Fumigación, Fotografía)'],
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
        images: [
            {
                url: { type: String, required: true },
                public_id: { type: String }, // Referencia para AWS S3 o Cloudinary
            },
        ],
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
        // GeoJSON para rastreo en tiempo real y disponibilidad por zona
        currentLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
                default: [-74.0721, 4.7110], // Bogotá, Colombia
            },
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Debe haber un administrador o empleado responsable'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// --- ÍNDICES ESTRATÉGICOS ---

// Búsqueda de texto para el buscador del Header
productSchema.index({ name: 'text', brand: 'text', description: 'text' });

// --- VIRTUALS ---

// Útil para el frontend: saber si el producto se puede agendar inmediatamente
productSchema.virtual('isBookable').get(function() {
    return this.status === 'disponible' && this.stock > 0;
});

const Product = mongoose.model('Product', productSchema);

export default Product;