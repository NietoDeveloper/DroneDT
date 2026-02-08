const mongoose = require('mongoose');

/**
 * DRONE DT - MULTICLUSTER ARCHITECTURE
 * Developer: Manuel Nieto | Rank: #1 Colombia
 * * Creamos las instancias de conexión de inmediato para que estén 
 * disponibles como objetos al ser importadas.
 */
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

const connectDB = async () => {
    try {
        const uriCore = process.env.MONGO_URI_CORE;
        const uriAssets = process.env.MONGO_URI_ASSETS;

        if (!uriCore || !uriAssets) {
            throw new Error("Faltan las URIs de MongoDB en el archivo .env");
        }

        // Conexión simultánea a ambos clústeres
        await Promise.all([
            coreConnection.openUri(uriCore),
            assetsConnection.openUri(uriAssets)
        ]);

        console.log('✅ [DATABASE] Clústeres CORE y ASSETS sincronizados con Atlas.');
    } catch (error) {
        console.error('❌ [DATABASE] Error de conexión:', error.message);
        process.exit(1);
    }
};

// Exportamos los objetos para que modelos/controllers los usen
module.exports = { 
    connectDB, 
    coreConnection, 
    assetsConnection 
};