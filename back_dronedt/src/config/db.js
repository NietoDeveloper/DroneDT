import mongoose from 'mongoose';

/**
 * Configuración de conexión a MongoDB para Software DT
 * Soporta múltiples eventos para monitoreo de clústeres.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Mongoose 6+ ya usa estas opciones por defecto, 
            // pero las mantenemos para asegurar compatibilidad en entornos Docker/AWS
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`[DB] MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[ERROR] Fallo en conexión a MongoDB: ${error.message}`);
        // Salir del proceso con fallo si no hay base de datos
        process.exit(1);
    }
};

// Eventos de conexión para monitoreo en tiempo real
mongoose.connection.on('disconnected', () => {
    console.warn('[DB] Advertencia: MongoDB desconectado. Intentando reconectar...');
});

mongoose.connection.on('error', (err) => {
    console.error(`[DB] Error de Mongoose: ${err}`);
});

// Manejo de cierre de conexión (Graceful Shutdown)
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('[DB] Conexión a MongoDB cerrada por terminación de la app');
    process.exit(0);
});

export default connectDB;