import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del drone/servicio es obligatorio'],
            trim: true,
        },
        brand: {
            type: String,
            required: [true, 'La marca del equipo es obligatoria'],
            default: 'Software DT Tech',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        description: {
            type: String,
            required: [true, 'La descripción es necesaria para el cliente'],
        },
        price: {
            type: Number,
            required: [true, 'Define un precio base'],
            default: 0,
        },
        specifications: {
            flightTime: { type: Number }, // Minutos
            cameraResolution: { type: String }, // e.g., "4K", "6K"
            maxRange: { type: Number }, // Metros
            weight: { type: Number }, // Gramos
        },
        images: [
            {
                url: { type: String, required: true },
                public_id: { type: String }, // Para manejo en AWS S3 o Cloudinary
            },
        ],
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: ['disponible', 'mantenimiento', 'en_vuelo', 'fuera_servicio'],
            default: 'disponible',
        },
        // Útil para Drone DT: Ubicación actual del equipo
        currentLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [-74.0721, 4.7110], // Coordenadas Bogotá por defecto
            },
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Quién registró el equipo/servicio
        },
    },
    {
        timestamps: true, // Crea createdAt y updatedAt automáticamente
    }
);

// Índice para búsquedas rápidas por nombre y categoría
productSchema.index({ name: 'text', brand: 'text' });

// Índice geoespacial para rastreo de drones en tiempo real
productSchema.index({ currentLocation: '2dsphere' });

const Product = mongoose.model('Product', productSchema);

export default Product;