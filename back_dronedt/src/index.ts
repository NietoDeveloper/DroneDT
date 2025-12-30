import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

// Inicialización de la App
const app: Application = express();
const PORT = process.env.PORT || 3001;

/**
 * Middlewares Globales
 * Configurados para la seguridad de Software DT
 */
app.use(helmet()); // Protege headers HTTP (Nivel Tesla)
app.use(cors({
  origin: '*', // En producción lo limitaremos a tus dominios de Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Permite recibir JSON del configurador de drones

/**
 * Rutas Base
 */

// Health Check - Fundamental para el despliegue en Railway
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    project: "DroneDT",
    status: "Operational",
    engineer: "NietoDevelooper",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Manejo de Errores 404
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint no encontrado en DroneDT API" });
});

/**
 * Lanzamiento del Servidor
 */
app.listen(PORT, () => {
  console.log(`
  🚀  ========================================
  🚀  DroneDT Backend Is Running!
  🚀  Port: ${PORT}
  🚀  Status: Ready for Commit Streak
  🚀  ========================================
  `);
});