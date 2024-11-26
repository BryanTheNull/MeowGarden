//Importar librerias a utilizar
const express = require('express');
const path = require('path');

// Importar rutas
const inicioRoutes = require('./routes/inicioRoutes');
const principalRoutes = require('./routes/principalRoutes');
const calendarioRoutes = require('./routes/calendarioRoutes');
const registroRoutes = require('./routes/registroRoutes');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

// Usar las rutas importadas
app.use('/', inicioRoutes);
app.use('/', principalRoutes);
app.use('/', calendarioRoutes);
app.use('/', registroRoutes);


// Usuar puerto y notificar donde esta alojado el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});