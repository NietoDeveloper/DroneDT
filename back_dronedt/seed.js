import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Ajuste de rutas para apuntar a la carpeta src desde la raíz
import connectDB from './src/config/db.js';
import Product from './src/models/Product.js';
import User from './src/models/User.js';
import Category from './src/models/Category.js';

dotenv.config();

const drones = [
    {
        name: "DJI Agras T40 - Fumigación Pro",
        brand: "DJI Agriculture",
        description: "Dron de fumigación líder con capacidad de 40kg para agricultura de precisión y atomización dual.",
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
        description: "Optimizado para misiones nocturnas e inspecciones industriales con cámara térmica de alta resolución.",
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
        description: "Plataforma industrial insignia. Protección IP55, precisión centimétrica y sistema O3 Enterprise.",
        price: 750000,
        specifications: { flightTime: 55, cameraResolution: "P1 Full Frame", maxRange: 20000, weight: 3770 },
        stock: 2,
        status: "disponible",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/m350_rtk.jpg", public_id: "m350_1" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    },
    {
        name: "Autel Evo II Pro V3",
        brand: "Autel Robotics",
        description: "Calidad de imagen superior en 6K y resistencia a interferencias mejorada para mapeo rápido.",
        price: 180000,
        specifications: { flightTime: 40, cameraResolution: "6K HDR", maxRange: 15000, weight: 1191 },
        stock: 5,
        status: "disponible",
        images: [{ url: "https://shop.autelrobotics.com/evo_ii.jpg", public_id: "autel_pro" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    },
    {
        name: "DJI Air 3 - Eventos",
        brand: "DJI Consumer",
        description: "Sistema de doble cámara principal para capturas cinematográficas verticales y horizontales de alta gama.",
        price: 150000,
        specifications: { flightTime: 46, cameraResolution: "4K/60fps HDR", maxRange: 20000, weight: 720 },
        stock: 10,
        status: "disponible",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/air3_1.jpg", public_id: "air3_event" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    },
    {
        name: "DJI Inspire 3 - Cine 8K",
        brand: "DJI Professional",
        description: "El estándar de la industria cinematográfica. Grabación interna en ProRes RAW y CinemaDNG con RTK.",
        price: 1200000,
        specifications: { flightTime: 28, cameraResolution: "8K Full Frame", maxRange: 12000, weight: 3995 },
        stock: 1,
        status: "en_vuelo",
        images: [{ url: "https://dji-official-fe.djicdn.com/cms/uploads/inspire3_1.jpg", public_id: "inspire_3" }],
        currentLocation: { type: "Point", coordinates: [-74.0721, 4.7110] }
    }
];

const importData = async () => {
    try {
        await connectDB();

        // Limpiar inventario previo para evitar duplicados
        await Product.deleteMany();
        console.log('🗑️ Productos antiguos eliminados de Atlas.');

        // Asegurar Categoría base
        let category = await Category.findOne({ name: 'Drones Industriales' });
        if (!category) {
            category = await Category.create({ name: 'Drones Industriales' });
            console.log('📁 Categoría "Drones Industriales" creada.');
        }

        // Asegurar Usuario Administrador (Tu perfil para Drone DT)
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({ 
                name: 'Manuel Nieto', 
                email: 'admin@softwaredt.com', 
                password: 'password123', 
                role: 'admin' 
            });
            console.log('👤 Usuario Admin creado.');
        }

        // Vincular cada drone con la categoría y el usuario creado
        const finalDrones = drones.map(drone => ({
            ...drone,
            category: category._id,
            user: admin._id
        }));

        await Product.insertMany(finalDrones);
        console.log('🚀 Flota de Drone DT cargada exitosamente en MongoDB Atlas.');
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error en el Seed Script: ${error.message}`);
        process.exit(1);
    }
};

importData();