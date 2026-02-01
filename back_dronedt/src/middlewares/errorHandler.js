/**
 * Global Error Handler - Drone DT Standard
 * Centraliza las respuestas de error para la arquitectura MERN de Manuel Nieto.
 */
const errorHandler = (err, req, res, next) => {
    // Valores por defecto
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno en el sistema Drone DT';

    // 1. Logging Profesional (Mantiene el rastro en Railway/Vercel)
    console.error(`[DRONE-DT-ERROR] ${req.method} ${req.url}:`, {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        timestamp: new Date().toISOString()
    });

    // 2. Errores de Mongoose: Campos requeridos o validaciones fallidas
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // 3. Error de Mongoose: Valor duplicado (E.g. mismo número de serie de drone)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue || {});
        message = `Error de duplicidad: El valor en el campo '${field}' ya existe en la base de datos.`;
    }

    // 4. Error de Mongoose: ID mal formado (CastError)
    // Muy común cuando se pasan IDs de drones inexistentes desde el Front
    if (err.name === 'CastError') {
        statusCode = 404;
        message = `Recurso no localizado. El ID especificado no es válido para la flota DT.`;
    }

    // 5. Errores de Seguridad JWT (Para el Panel de Empleados futuro)
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Acceso denegado. Token de seguridad inválido.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Sesión expirada. Por favor, reautentíquese en el panel de Drone DT.';
    }

    // --- Respuesta Final Estandarizada ---
    res.status(statusCode).json({
        success: false,
        message,
        // En producción ocultamos el stack para no exponer vulnerabilidades
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        developer: "NietoDeveloper",
        region: "Colombia-Cluster"
    });
};

// Exportación compatible con tu server.js actual
module.exports = { errorHandler };