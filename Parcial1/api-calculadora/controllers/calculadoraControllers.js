const { add, subtract, multiply } = require('../operaciones/operaciones.js');
const math = require('mathjs'); // Si decides usar mathjs para evaluar expresiones

/**
 * Sumar dos números
 * @param {Object} req
 * @param {Object} res
 */
function sumar(req, res) {
    const { number1, number2 } = req.body;
    try {
        const result = add(number1, number2);
        console.log(`num1: ${number1}, num2: ${number2}, suma: ${result}`);
        res.json({ resultado: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Restar dos números
 * @param {Object} req
 * @param {Object} res
 */
function restar(req, res) {
    const { number1, number2 } = req.body;
    try {
        const result = subtract(number1, number2);
        res.json({ resultado: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Multiplicar dos números
 * @param {Object} req
 * @param {Object} res
 */
function multiplicar(req, res) {
    const { number1, number2 } = req.body;
    try {
        const result = multiply(number1, number2);
        res.json({ resultado: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
/**
 * Dividir dos números
 * @param {Object} req
 * @param {Object} res
 */
function dividir(req, res) {
    const { number1, number2 } = req.body;
    try {
        if (number2 === 0) {
            throw new Error('No se puede dividir entre 0');
        }
        const result = number1 / number2;
        res.json({ resultado: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * Función genérica para ordenar números
 * @param {Array} numbers
 * @param {string} orden - 'asc' o 'desc'
 * @returns {Array} números ordenados
 */
function ordenarNumeros(numbers, orden) {
    return orden === 'asc'
        ? numbers.sort((a, b) => a - b)
        : numbers.sort((a, b) => b - a);
}

/**
 * Ordenar números en orden ascendente
 * @param {Object} req
 * @param {Object} res
 */
function ordenarAscendente(req, res) {
    const { numbers } = req.body;
    try {
        if (!Array.isArray(numbers) || numbers.some(isNaN)) {
            throw new Error('Entrada inválida. Debe ser un arreglo de números.');
        }
        const sortedNumbers = ordenarNumeros(numbers, 'asc');
        res.json({ sortedNumbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Ordenar números en orden descendente
 * @param {Object} req
 * @param {Object} res
 */
function ordenarDescendente(req, res) {
    const { numbers } = req.body;
    try {
        if (!Array.isArray(numbers) || numbers.some(isNaN)) {
            throw new Error('Entrada inválida. Debe ser un arreglo de números.');
        }
        const sortedNumbers = ordenarNumeros(numbers, 'desc');
        res.json({ sortedNumbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Procesar y evaluar una ecuación
 * @param {Object} req
 * @param {Object} res
 */
function procesarEcuacion(req, res) {
    const { equation, variables } = req.body;
    try {
        // Validar que las variables sean números
        for (const [key, value] of Object.entries(variables)) {
            if (isNaN(value)) {
                throw new Error(`La variable ${key} debe ser un número.`);
            }
        }

        // Reemplazar variables en la ecuación
        let evaluada = equation;
        for (const [key, value] of Object.entries(variables)) {
            evaluada = evaluada.replace(new RegExp(key, 'g'), value);
        }

        // Evaluar la ecuación de forma segura usando mathjs
        const resultado = math.evaluate(evaluada);
        res.json({ resultado });
    } catch (error) {
        console.error('Error al procesar la ecuación:', error);
        res.status(500).json({ error: 'Error al procesar la ecuación' });
    }
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir,
    ordenarAscendente,
    ordenarDescendente,
    procesarEcuacion
};
