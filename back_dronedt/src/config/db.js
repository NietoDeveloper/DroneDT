const mongoose = require('mongoose');

/**
 * Drone DT - Multi-Cluster Connection Manager
 * Gestiona conexiones simultáneas a Core (Usuarios/Citas) y Assets (Productos/Empleados).
 */

// Objetos para exportar las conexiones y ser usados en los modelos
let coreConnection;
let assetsConnection;

const connectDB = async () => {
    try {
        const uriCore = process.env.MONGO_URI_CORE ? process.env.MONGO_URI_CORE.trim() : null;
        const uriAssets = process.env.MONGO_URI_ASSETS ? process.env.MONGO_URI_ASSETS.trim() : null;

        // Validaciones preventivas
        if (!uriCore || !uriAssets) {
            console.error('\x1b[41m\x1b[37m ERROR \x1b[0m Faltan URIs de Multiclúster en .env');
            return;
        }

        // 1. Conexión al Cluster CORE (Usuarios, Bookings)
        coreConnection = await mongoose.createConnection(uriCore, {
            serverSelectionTimeoutMS: 5000,
        }).asPromise();

        // 2. Conexión al Cluster ASSETS (Productos, Empleados)
        assetsConnection = await mongoose.createConnection(uriAssets, {
            serverSelectionTimeoutMS: 5000,
        }).asPromise();

        console.log('\x1b[32m%s\x1b[0m', `    ✔  CORE CLUSTER   : ${coreConnection.host}`);
        console.log('\x1b[32m%s\x1b[0m', `    ✔  ASSETS CLUSTER : ${assetsConnection.host}`);

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `    ✘  DB MULTI-ERROR : ${error.message}`);
    }
};

// --- GETTERS DE CONEXIÓN ---
// Úsalos en tus modelos: const Product = getAssetsConnection().model('Product', schema);
const getCoreConnection = () => coreConnection;
const getAssetsConnection = () => assetsConnection;

// Manejo de cierre Graceful
process.on('SIGINT', async () => {
    if (coreConnection) await coreConnection.close();
    if (assetsConnection) await assetsConnection.close();
    process.exit(0);
});

module.exports = { 
    connectDB, 
    getCoreConnection, 
    getAssetsConnection 
};