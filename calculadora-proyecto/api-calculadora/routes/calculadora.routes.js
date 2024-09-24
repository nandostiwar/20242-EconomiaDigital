const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');



router
router.post('/ordenar', calculadoraControllers.fascendente); // Nueva ruta para ordenar
router.post('/ordenar1', calculadoraControllers.fdescendente); // Nueva ruta para ordenar
router.post('/resolver', calculadoraControllers.evaluarEcuacion); // Nueva ruta para ordenar




module.exports = router;
