const mongoose = require('mongoose');

/**
 * Drone DT - Enterprise Multi-Cluster Manager
 * Solución de alta disponibilidad optimizada para el Committer #1.
 * Inicialización inmediata para evitar errores de 'undefined' en los modelos.
 */

// Inicializamos las instancias de conexión de inmediato como objetos de Mongoose
const coreConnection = mongoose.createConnection();
const assetsConnection = mongoose.createConnection();


};