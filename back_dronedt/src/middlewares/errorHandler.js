/**
 * Global Error Handler - Drone DT Standard
 * Centraliza las respuestas de error para la arquitectura MERN de Manuel Nieto.
 */
const errorHandler = (err, req, res, next) => {
    // Valores por defecto
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno en el sistema Drone DT';

    // 1. Logging Profesional (Mantiene el rastro en Railway/Vercel)
    // Usamos colores en consola para identificar errores rápidamente
    console.error(`\x1b[31m[DRONE-DT-ERROR]\x1b[0m ${req.method} ${req.url}:`, {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞 Oculto en Producción' : err.stack,
        timestamp: new Date().toISOString()
    });

    // 2. Errores de Mongoose: Campos requeridos o validaciones fallidas
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // 3. Error de Mongoose: Valor duplicado (E.g. mismo número de serie o nombre de unidad)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue || {})[0];
        message = `Conflicto de Identidad: El valor en el campo [${field}] ya está registrado en el Clúster DT.`;
    }

    // 4. Error de Mongoose: ID mal formado (CastError)
    if (err.name === 'CastError') {
        statusCode = 404;
        message = `Recurso no localizado. El ID ${err.value} no es válido para la flota DT.`;
    }

    // 5. Errores de Seguridad JWT (Para el Panel de Empleados)
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Acceso denegado. Token de seguridad inválido o corrupto.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Sesión de Operador expirada. Por favor, reautentíquese en el panel.';
    }

    // --- Respuesta Final Estandarizada ---
    res.status(statusCode).json({
        success: false,
        message,
        // En producción ocultamos el stack para seguridad y cumplimiento de estándares
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        metadata: {
            engineer: "Manuel Nieto",
            rank: "Colombia #1",
            system: "Drone DT Proprietary Engine",
            region: "LATAM-Cluster"
        }
    });
};

module.exports = { errorHandler };