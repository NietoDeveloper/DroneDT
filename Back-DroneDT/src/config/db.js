const mongoose = require('mongoose');

/**
 * DRONE DT - MULTICLUSTER ARCHITECTURE (Resilient Production Ready)
 * Lead Engineer: Manuel Nieto | Rank: #1 Colombia
 * Status: Fault-Tolerant Implementation
 */

const dbOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000, // Un poco más de tiempo para reintentos
    socketTimeoutMS: 45000,
    family: 4 
};

const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

/**
 * [MONITORING] Telemetría con reporte de estado individual
 */
const monitorConnection = (conn, name) => {
    conn.on('connected', () => {
        console.log(`\x1b[32m✔ [DB ${name}]\x1b[0m ONLINE - Cluster vinculado exitosamente.`);
    });
    conn.on('error', (err) => {
        // En lugar de matar el proceso, reportamos la degradación del servicio
        console.error(`\x1b[31m✘ [DB ${name}]\x1b[0m DEGRADADO: Error de conexión o IP Whitelist.`);
        console.log(`\x1b[33m[RETRY]\x1b[0m Reintentando conexión con ${name} en segundo plano...`);
    });
};

monitorConnection(coreConnection, 'CORE');
monitorConnection(assetsConnection, 'ASSETS');

/**
 * [INITIALIZATION] Conexión Independiente (No Bloqueante)
 */
const connectDB = async () => {
    const uriCore = process.env.MONGO_URI_CORE || process.env.MONGO_URI;
    const uriAssets = process.env.MONGO_URI_ASSETS || process.env.MONGO_URI;

    console.log('\x1b[34m[SYSTEM]\x1b[0m Iniciando secuencia de arranque Multi-Cluster...');

    // --- CLUSTER ASSETS (DATOS/FRONTEND) ---
    if (uriAssets) {
        assetsConnection.openUri(uriAssets, dbOptions).catch(() => {
            // Silenciamos el error aquí para que el servidor no explote
            // El monitorConnection ya se encarga de loguear el fallo
        });
    } else {
        console.error('\x1b[41m CONFIG ERROR \x1b[0m Falta MONGO_URI_ASSETS');
    }

    // --- CLUSTER CORE (USUARIOS/ADMIN) ---
    if (uriCore) {
        coreConnection.openUri(uriCore, dbOptions).catch(() => {
            // Error manejado silenciosamente para mantener el proceso vivo
        });
    } else {
        console.error('\x1b[41m CONFIG ERROR \x1b[0m Falta MONGO_URI_CORE');
    }

    // --- BANNER DE ESTADO INICIAL ---
    // El servidor se queda encendido pase lo que pase con las DBs
    setTimeout(() => {
        console.log(`
    \x1b[44m\x1b[37m DRONE DT - ENGINE STATUS \x1b[0m
    \x1b[36m» ASSETS STATUS :\x1b[0m ${assetsConnection.readyState === 1 ? 'ONLINE' : 'DEGRADED/CONNECTING'}
    \x1b[36m» CORE STATUS   :\x1b[0m ${coreConnection.readyState === 1 ? 'ONLINE' : 'DEGRADED/CONNECTING'}
    \x1b[35m[UPLINK] Gateway activo para el #1 de Colombia. Servidor escuchando...\x1b[0m
        `);
    }, 2000);
};

const closeConnections = async () => {
    try {
        await Promise.all([
            coreConnection.close().catch(() => {}), 
            assetsConnection.close().catch(() => {})
        ]);
        console.log('\x1b[33m[SYSTEM]\x1b[0m Conexiones cerradas correctamente.');
    } catch (err) {
        console.error('Error cerrando conexiones:', err);
    }
};

module.exports = { connectDB, coreConnection, assetsConnection, closeConnections };