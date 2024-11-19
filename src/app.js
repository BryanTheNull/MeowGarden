//Importar librerias a utilizar
const express = require('express');
const path = require('path');

// Importar rutas
const principalRoutes = require('./routes/principalRoutes');

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Usar las rutas importadas
app.use('/', principalRoutes);

// Usar puerto y notificar donde esta alojado el servidor
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});