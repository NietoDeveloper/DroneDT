const mongoose = require('mongoose');

/**
 * DRONE DT - MULTICLUSTER ARCHITECTURE (Hardened)
 * Lead Engineer: Manuel Nieto | Rank: #1 Colombia
 */

// Opciones de configuración para máxima estabilidad en producción
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Optimiza el flujo de peticiones simultáneas
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

// Creamos las instancias de conexión
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

/**
 * [MONITORING] Telemetría de la base de datos
 */
const monitorConnection = (conn, name) => {
    conn.on('connected', () => console.log(`\x1b[32m✔ [DB ${name}]\x1b[0m Conectado exitosamente.`));
    conn.on('error', (err) => console.error(`\x1b[31m✘ [DB ${name}]\x1b[0m Error crítico:`, err));
    conn.on('disconnected', () => console.log(`\x1b[33m! [DB ${name}]\x1b[0m Desconectado. Reintentando...`));
};

monitorConnection(coreConnection, 'CORE');
monitorConnection(assetsConnection, 'ASSETS');

/**
 * [INITIALIZATION] Sincronización de Clústeres
 */
const connectDB = async () => {
    try {
        const uriCore = process.env.MONGO_URI_CORE;
        const uriAssets = process.env.MONGO_URI_ASSETS;

        if (!uriCore || !uriAssets) {
            console.error('\x1b[41m\x1b[37m CONFIG ERROR \x1b[0m Faltan URIs en el archivo .env');
            process.exit(1);
        }

        // Conexión paralela ultra-rápida
        await Promise.all([
            coreConnection.openUri(uriCore, dbOptions),
            assetsConnection.openUri(uriAssets, dbOptions)
        ]);

        console.log(`
    \x1b[44m\x1b[37m DATABASE STATUS \x1b[0m
    \x1b[36m» CORE CLUSTER   :\x1b[0m Online
    \x1b[36m» ASSETS CLUSTER :\x1b[0m Online
    \x1b[35m[SYSTEM] Arquitectura Multi-Clúster Drone DT lista.\x1b[0m
        `);
    } catch (error) {
        console.error('\x1b[41m\x1b[37m FATAL DATABASE FAILURE \x1b[0m', error.message);
        process.exit(1);
    }
};

// Exportamos las conexiones para que los Modelos las usen específicamente
module.exports = { 
    connectDB, 
    coreConnection, 
    assetsConnection 
};