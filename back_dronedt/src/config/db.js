const mongoose = require('mongoose');

/**
 * Configuración de conexión a MongoDB para Drone DT / Software DT
 * Soporta múltiples eventos para monitoreo de clústeres en producción.
 */
const connectDB = async () => {
    try {
        // MONGO_URI debe estar en tu .env (Cluster 1 o 2 según corresponda)
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`\x1b[36m%s\x1b[0m`, `[DB] MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `[ERROR] Fallo en conexión a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Eventos de conexión para monitoreo en tiempo real
mongoose.connection.on('disconnected', () => {
    console.warn('\x1b[33m%s\x1b[0m', '[DB] Advertencia: MongoDB desconectado. Intentando reconectar...');
});

mongoose.connection.on('error', (err) => {
    console.error(`[DB] Error de Mongoose: ${err}`);
});

// Manejo de cierre de conexión (Graceful Shutdown) - Vital para Docker/AWS
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('[DB] Conexión a MongoDB cerrada por terminación de la app');
    process.exit(0);
});

// LA CLAVE: Exportar como objeto para que coincida con const { connectDB } en app.js
module.exports = { connectDB };