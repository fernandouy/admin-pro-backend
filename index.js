require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Parser del body
app.use(express.json());

// Conexión a Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Montar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
