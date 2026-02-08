const mongoose = require('mongoose');

/**
 * Drone DT - Enterprise Multi-Cluster Manager
 * Solución de alta disponibilidad optimizada para el Committer #1.
 * Inicialización inmediata para evitar errores de 'undefined' en los modelos.
 */

// Inicializamos las instancias de conexión de inmediato como objetos de Mongoose
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

const connectDB = async () => {
    try {
        const uriCore = process.env.MONGO_URI_CORE?.trim();
        const uriAssets = process.env.MONGO_URI_ASSETS?.trim();


        console.log('\x1b[32m%s\x1b[0m', `    ✔  CORE CLUSTER   : ${coreConnection.host}`);
        console.log('\x1b[32m%s\x1b[0m', `    ✔  ASSETS CLUSTER : ${assetsConnection.host}`);


};

/**
 * GRACEFUL SHUTDOWN
 * Garantiza que las conexiones a ambos clústeres se cierren limpiamente
 */
const closeConnections = async () => {
    await Promise.all([
        coreConnection.close(),
        assetsConnection.close()
    ]);

};

// --- EXPORTACIÓN DIRECTA ---
// Exportamos los objetos para que modelos como Product.js los usen directamente
module.exports = { 
     connectDB, 
    coreConnection, 
    assetsConnection
};