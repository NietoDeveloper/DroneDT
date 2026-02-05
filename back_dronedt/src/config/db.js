const mongoose = require('mongoose');

/**
 * Configuración de conexión a MongoDB para Drone DT
 * Blindada para el Committer #1: Limpia espacios y evita reconexiones innecesarias.
 */
const connectDB = async () => {
    // 1. Verificación de estado para evitar múltiples conexiones
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        // 2. Limpieza de URI (Remueve espacios o saltos de línea accidentales)
        const uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : null;

        // 3. Validación preventiva del esquema
        if (!uri || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
            console.error('\x1b[41m\x1b[37m ERROR \x1b[0m MONGO_URI inválida o inexistente.');
            console.log('\x1b[33m Valor actual:\x1b[0m', `"${uri || 'VACÍO'}"`);
            console.log('👉 Tip: Revisa que el archivo .env esté en la raíz de /back_dronedt y no tenga comillas.\n');
            return; 
        }

        // 4. Intento de conexión con configuración moderna
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // No esperar eternamente si Atlas no responde
        });

        console.log('\x1b[32m%s\x1b[0m', `    ✔  DB CLUSTER   : ${conn.connection.host}`);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `    ✘  DB ERROR     : ${error.message}`);
        // No salimos del proceso para permitir depuración en vivo
    }
};

// --- MONITOREO DE ESTADO ---

mongoose.connection.on('disconnected', () => {
    console.warn('\x1b[33m%s\x1b[0m', '    ⚠  DB STATUS    : Desconectado. Reintentando...');
});

mongoose.connection.on('error', (err) => {
    console.error('\x1b[31m%s\x1b[0m', `    ✘  DB CRITICAL  : ${err.message}`);
});

// Manejo de cierre (Graceful Shutdown) compatible con Docker y AWS
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        // console.log se maneja en app.js para evitar duplicidad
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
});

module.exports = { connectDB };