// Importar librerias a utilizar
const express = require('express');
const router = express.Router();
const path = require('path');

// Ruta para cargar 'panel-inicio.html' 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/panel-principal.html'));
});

module.exports = router;