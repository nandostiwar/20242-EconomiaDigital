const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    router.post('/ascendente', calculadoraControllers.fascendente)
    router.post('/descendente', calculadoraControllers.fdescendente)
    

module.exports = router;