// Importar librerias a utilizar
const express = require('express');
const router = express.Router();
const registroController = require('../controller/registroController');

// Ruta para obtener todos los productos
router.get('/registros', registroController.consultarRegistros);   

module.exports = router;