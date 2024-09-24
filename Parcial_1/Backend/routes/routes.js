const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller.js');

function Datos(req, res, next) {
    const { number1, number2 } = req.body;

    req.body.number1 = Number(number1);
    req.body.number2 = Number(number2);
    next();
}

router
    .post('/Ascendente', Datos, Controller.Ascendente)
    .post('/Descendente', Datos, Controller.Descendente)
    .post('/Ecuacion', Controller.Ecuacion)

module.exports = router;