/**
 * Global Error Handler para Software DT
 * Centraliza las respuestas de error y el logging profesional.
 */
const errorHandler = (err, req, res, next) => {
    // Valores por defecto
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno del servidor';

    // 1. Logging para monitoreo (escalable a Winston/Pino)
    console.error(`[ERROR] ${req.method} ${req.url}:`, {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });

    // 2. Errores de Mongoose: Campos requeridos o validaciones fallidas
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // 3. Error de Mongoose: Valor duplicado (e.g., email ya registrado)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue || {});
        message = `El campo ${field} ya está en uso.`;
    }

    // 4. Error de Mongoose: ID de MongoDB mal formado (CastError)
    if (err.name === 'CastError') {
        statusCode = 404;
        message = `Recurso no encontrado. ID inválido: ${err.value}`;
    }

    // 5. Errores de Autenticación JWT
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Token de autenticación inválido.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'El token ha expirado. Por favor, inicia sesión de nuevo.';
    }

    // Respuesta estandarizada para el Frontend (Software DT)
    res.status(statusCode).json({
        success: false,
        message,
        // Solo enviamos el stack si NO estamos en producción
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;