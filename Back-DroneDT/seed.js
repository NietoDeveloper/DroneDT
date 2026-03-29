const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configuración de variables de entorno
dotenv.config();

// Resolución de rutas para evitar errores de "Module not found"
const { connectDB } = require(path.resolve(__dirname, './src/config/db'));
const Product = require(path.resolve(__dirname, './src/models/Product'));
const User = require(path.resolve(__dirname, './src/models/User'));
const Category = require(path.resolve(__dirname, './src/models/Category'));

const drones = [
    {
        name: "DJI Agras T40 - Fumigación Pro",
        brand: "DJI Agriculture",
        description: "Dron de fumigación líder con capacidad de 40kg para agricultura de precisión.",
        price: 450000,
        specifications: { flightTime: 20, cameraResolution: "4K", maxRange: 2000, weight: 38000 },
        stock: 5,
        status: "disponible",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/6b3e8e1.jpg", public_id: "agras_1" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    },
    {
        name: "Mavic 3 Thermal - Inspección",
        brand: "DJI Enterprise",
        description: "Optimizado para misiones nocturnas con cámara térmica de alta resolución.",
        price: 250000,
        specifications: { flightTime: 45, cameraResolution: "640×512 Thermal", maxRange: 15000, weight: 920 },
        stock: 3,
        status: "disponible",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/thermal_1.jpg", public_id: "mavic_3t" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    },
    {
        name: "Matrice 350 RTK - Fotogrametría",
        brand: "DJI Enterprise",
        description: "Plataforma industrial insignia con precisión centimétrica.",
        price: 750000,
        specifications: { flightTime: 55, cameraResolution: "P1 Full Frame", maxRange: 20000, weight: 3770 },
        stock: 2,
        status: "disponible",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/m350_rtk.jpg", public_id: "m350_1" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    }
];

const importData = async () => {
    try {
        // Conexión a los servicios (Core y Assets)
        await connectDB();

        // 1. Limpieza de seguridad
        await Product.deleteMany();
        console.log('🗑️  Inventario antiguo limpiado del Cluster 2.');

        // 2. Garantizar Categoría "Drones Industriales"
        let category = await Category.findOne({ name: 'Drones Industriales' });
        if (!category) {
            category = await Category.create({ name: 'Drones Industriales' });
            console.log('📁 Categoría "Drones Industriales" creada.');
        }

        // 3. Garantizar Usuario Admin (Manuel Nieto)
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({ 
                name: 'Manuel Nieto', 
                email: 'admin@softwaredt.com', 
                password: 'password123', // Mongoose se encargará del hash si tienes el pre-save hook
                role: 'admin' 
            });
            console.log('👤 Perfil Admin NietoDeveloper vinculado.');
        }

        // 4. Preparación de documentos con referencias IDs
        const finalDrones = drones.map(drone => ({
            ...drone,
            category: category._id,
            user: admin._id
        }));

        // 5. Inserción masiva
        await Product.insertMany(finalDrones);
        
        console.log(`
        =============================================
        🚀 FLOTA DRONE DT CARGADA EXITOSAMENTE
        📦 PRODUCTOS: ${finalDrones.length}
        🎯 CLUSTER: Assets/Inventory Active
        🏆 STATUS: Ready for Production
        =============================================
        `);
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error crítico en Seeder Drone DT: ${error.message}`);
        process.exit(1);
    }
};

// Ejecutar el script
importData();