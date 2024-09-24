const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

//entradas
function validarEntradas(req, res, next) {
    const { number1, number2 } = req.body;

    // Verificar si ambos parámetros están presentes
    if (number1 === undefined || number2 === undefined) {
        return res.status(400).json({ error: 'Se requieren los parámetros number1 y number2.' });
    }

    // Convertir a número
    req.body.number1 = Number(number1);
    req.body.number2 = Number(number2);

    if (isNaN(req.body.number1) || isNaN(req.body.number2)) {
        return res.status(400).json({ error: 'Ambos parámetros deben ser números.' });
    }

    next();
}
router
    .post('/sumar', validarEntradas, calculadoraControllers.sumar)
    .post('/restar', validarEntradas, calculadoraControllers.restar)
    .post('/multiplicar', validarEntradas, calculadoraControllers.multiplicar)
    .post('/dividir', validarEntradas, calculadoraControllers.dividir)
    .post('/ordenarAscendente', validarEntradas, calculadoraControllers.ordenarAscendente)
    .post('/ordenarDescendente', validarEntradas, calculadoraControllers.ordenarDescendente)
    .post('/ecuacion', calculadoraControllers.procesarEcuacion); 

module.exports = router;
