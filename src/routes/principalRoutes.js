// Importar librerias a utilizar
const express = require('express');
const router = express.Router();
const principalController = require('../controller/principalController');

// Ruta para obtener todos los productos
router.get('/sensor', principalController.obtenerDatosSensor);   

module.exports = router;