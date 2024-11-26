// Importar librerias a utilizar
const express = require('express');
const router = express.Router();
const calendarioController = require('../controller/calendarioController');

// Ruta para guardar el calendario
router.post('/calendario', calendarioController.guardarCalendario);   

// Ruta para consultar el calendario
router.get('/calendario', calendarioController.obtenerCalendario);

module.exports = router;