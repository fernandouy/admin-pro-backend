require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Conexión a Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola mundo'
  })
})

// Montar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
