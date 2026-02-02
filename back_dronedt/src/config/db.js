const mongoose = require('mongoose');

/**
 * Configuración de conexión a MongoDB para Drone DT / Software DT
 * Optimizada para no crashear el proceso durante el desarrollo del Committer #1.
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        // Validación preventiva del esquema para evitar el error "Invalid scheme"
        if (!uri || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
            console.error('\x1b[31m%s\x1b[0m', `[ERROR] MONGO_URI inválida o inexistente.`);
            console.log('\x1b[33m%s\x1b[0m', `Valor actual: "${uri || 'VACÍO'}"`);
            console.log('👉 Asegúrate de que el .env no tenga espacios o comillas en la URI.\n');
            return; // Salimos sin ejecutar process.exit(1) para que el server siga vivo
        }

        const conn = await mongoose.connect(uri);

        console.log(`\x1b[36m%s\x1b[0m`, `✅ [DB] MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ [ERROR] Fallo en conexión a MongoDB: ${error.message}`);
        // Comentamos el exit para que nodemon no entre en un bucle de crash
        // process.exit(1); 
    }
};

// --- MONITOREO EN TIEMPO REAL ---

mongoose.connection.on('disconnected', () => {
    console.warn('\x1b[33m%s\x1b[0m', '[DB] Advertencia: MongoDB desconectado.');
});

mongoose.connection.on('error', (err) => {
    console.error(`\x1b[31m%s\x1b[0m`, `[DB] Error crítico de Mongoose: ${err}`);
});

// Manejo de cierre de conexión (Graceful Shutdown) - Vital para Docker y AWS
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('\n[DB] Conexión cerrada por terminación (SIGINT)');
    process.exit(0);
});

// Exportación compatible con const { connectDB }
module.exports = { connectDB };