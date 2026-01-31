const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Conectar a BD
connectDB();

// Middlewares Globales
app.use(helmet()); // Seguridad de headers
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs de peticiones

// Rutas Base
app.get('/', (req, res) => {
  res.send('Drone DT API is running... 🚀');
});

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));

module.exports = app;