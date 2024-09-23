const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
  .post('/ascendente', calculadoraControllers.ascendente)
  .post('/descendente', calculadoraControllers.descendente);

module.exports = router;
