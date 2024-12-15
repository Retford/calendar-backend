const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor express

const app = express();

// Base de datos

dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del Body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO: auth // crear, login, renew
// TODO: CRUD: Eventos

// Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto', process.env.PORT);
});
