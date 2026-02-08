const mongoose = require('mongoose');

// Creamos las instancias de conexión
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();

const connectDB = async () => {
    try {
        await Promise.all([
            coreConnection.openUri(process.env.MONGO_URI_CORE),
            assetsConnection.openUri(process.env.MONGO_URI_ASSETS)
        ]);
        console.log('✅ Clústeres CORE y ASSETS sincronizados.');
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        process.exit(1);
    }
};

// Exportamos las conexiones para que los modelos las usen
module.exports = { connectDB, coreConnection, assetsConnection };