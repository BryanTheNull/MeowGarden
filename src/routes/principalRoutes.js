// Importar librerias a utilizar
const express = require('express');
const router = express.Router();
const path = require('path');

// Definir la ruta para '/'
router.get('/', (req, res) => {
    // Asegúrate de que la ruta del archivo HTML sea correcta
    res.sendFile(path.join(__dirname, '../../public/html/panel-principal.html'));
});

module.exports = router;