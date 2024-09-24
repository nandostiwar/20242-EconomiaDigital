// controllers/calculadoraControllers.js
const { add, subtract, multiply } = require('../operaciones/operaciones.js');
const { create, all } = require('mathjs');

const math = create(all); // Crear instancia de mathjs

function sumar(req, res) {
    const { numeros } = req.body;
    if (!Array.isArray(numeros) || !numeros.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: "Se requiere un arreglo de números." });
    }
    const result = numeros.reduce((acc, curr) => add(acc, curr), 0);
    console.log(`Números: ${numeros.join(', ')} y la suma: ${result}`);
    res.json({ resultado: result });
}

function restar(req, res) {
    const { numeros } = req.body;
    if (!Array.isArray(numeros) || !numeros.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: "Se requiere un arreglo de números." });
    }
    if (numeros.length < 2) {
        return res.status(400).json({ error: "Se requieren al menos dos números para restar." });
    }
    const result = numeros.reduce((acc, curr) => subtract(acc, curr));
    console.log(`Números: ${numeros.join(', ')} y la resta: ${result}`);
    res.json({ resultado: result });
}

function multiplicar(req, res) {
    const { numeros } = req.body;
    if (!Array.isArray(numeros) || !numeros.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: "Se requiere un arreglo de números." });
    }
    const result = numeros.reduce((acc, curr) => multiply(acc, curr), 1);
    console.log(`Números: ${numeros.join(', ')} y la multiplicación: ${result}`);
    res.json({ resultado: result });
}

function ordenarAscendente(req, res) {
    const { numeros } = req.body;
    if (!Array.isArray(numeros) || !numeros.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: "Se requiere un arreglo de números." });
    }
    const sorted = [...numeros].sort((a, b) => a - b);
    console.log(`Números: ${numeros.join(', ')} ordenados ascendentemente: ${sorted.join(', ')}`);
    res.json({ resultado: sorted });
}

function ordenarDescendente(req, res) {
    const { numeros } = req.body;
    if (!Array.isArray(numeros) || !numeros.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: "Se requiere un arreglo de números." });
    }
    const sorted = [...numeros].sort((a, b) => b - a);
    console.log(`Números: ${numeros.join(', ')} ordenados descendentemente: ${sorted.join(', ')}`);
    res.json({ resultado: sorted });
}

function evaluarEcuacion(req, res) {
    const { ecuacion } = req.body;
    if (typeof ecuacion !== 'number') {
        return res.status(400).json({ error: "Se requiere una ecuación en formato de cadena." });
    }

    console.log("Ecuación recibida: ", ecuacion); // Para verificar la entrada

    try {
        const resultado = math.evaluate(ecuacion);
        console.log(`Ecuación: ${ecuacion} y el resultado: ${resultado}`);
        res.json({ resultado: resultado });
    } catch (error) {
        console.error("Error al evaluar la ecuación: ", error);
        res.status(400).json({ error: "Ecuación no válida." });
    }
}


module.exports = {
    sumar,
    restar,
    multiplicar,
    ordenarAscendente,
    ordenarDescendente,
    evaluarEcuacion
};
