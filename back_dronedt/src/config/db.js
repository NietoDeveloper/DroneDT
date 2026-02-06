const mongoose = require('mongoose');

/**
 * Drone DT - Enterprise Multi-Cluster Manager
 * Solución de alta disponibilidad: Inicialización inmediata para evitar errores de undefined.
 */

// Inicializamos las instancias de conexión de inmediato
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

const connectDB = async () => {
    try {
        const uriCore = process.env.MONGO_URI_CORE?.trim();
        const uriAssets = process.env.MONGO_URI_ASSETS?.trim();

        if (!uriCore || !uriAssets) {
            console.error('\x1b[41m\x1b[37m ERROR \x1b[0m Faltan URIs de Multiclúster en .env');
            return;
        }

        // Usamos openUri para conectar las instancias ya existentes
        const corePromise = coreConnection.openUri(uriCore, { serverSelectionTimeoutMS: 5000 });
        const assetsPromise = assetsConnection.openUri(uriAssets, { serverSelectionTimeoutMS: 5000 });

        await Promise.all([corePromise, assetsPromise]);

        console.log('\x1b[32m%s\x1b[0m', `    ✔  CORE CLUSTER   : ${coreConnection.host}`);
        console.log('\x1b[32m%s\x1b[0m', `    ✔  ASSETS CLUSTER : ${assetsConnection.host}`);

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `    ✘  DB MULTI-ERROR : ${error.message}`);
    }
};

// --- EXPORTACIÓN DIRECTA ---
// Exportamos los objetos de conexión, no funciones que los retornen, 
// para asegurar que el método .model() esté siempre disponible.
module.exports = { 
    connectDB, 
    coreConnection, 
    assetsConnection 
};