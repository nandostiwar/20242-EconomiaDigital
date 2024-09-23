const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    router.post('/ascendente', calculadoraControllers.ascendente)
    router.post('/descendente', calculadoraControllers.descendente)
    

module.exports = router;