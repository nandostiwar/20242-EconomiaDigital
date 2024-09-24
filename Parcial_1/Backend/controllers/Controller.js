const {Suma, Resta, multiplicacion, Division} = require('./operations.js');
const math = require('mathjs');

/**
 * @param {Array} numbers
 * @param {string} order - 'ASC' o 'DSC'
 * @returns {Array} 
 */
function OrderNums(numbers, order) {
    return order === 'ASC'
        ? numbers.sort((a, b) => a - b)
        : numbers.sort((a, b) => b - a);
}


/**
 * @param {Object} req
 * @param {Object} res
 */
function Ascendente(req, res) {
    const { numbers } = req.body;
    try {
        if (!Array.isArray(numbers) || numbers.some(isNaN)) {
            throw new Error('Entrada inválida. Debe ser un arreglo de números.');
        }
        const sortedNumbers = OrderNums(numbers, 'ASC');
        res.json({ sortedNumbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * @param {Object} req
 * @param {Object} res
 */
function Descendente(req, res) {
    const { numbers } = req.body;
    try {
        if (!Array.isArray(numbers) || numbers.some(isNaN)) {
            throw new Error('Entrada inválida. Debe ser un arreglo de números.');
        }
        const sortedNumbers = OrderNums(numbers, 'DSC');
        res.json({ sortedNumbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * @param {Object} req
 * @param {Object} res
 */
function Ecuacion(req, res) {
    const { equation, NUMS } = req.body;
    try {
        // Valido que los datos sean numericos
        for (const [key, value] of Object.entries(NUMS)) {
            if (isNaN(value)) {
                throw new Error(`El dato ${key} debe ser un número.`);
            }
        }

        let EvaluarEcuacion = equation;
        for (const [key, value] of Object.entries(NUMS)) {
            EvaluarEcuacion = EvaluarEcuacion.replace(new RegExp(key, 'g'), value);
        }

        // Evaluo la ecuación
        const resultado = math.evaluate(EvaluarEcuacion);
        res.json({ resultado });
    } catch (error) {
        console.error('Error evaluando la ecuación:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al evaluar la ecuación, por favor verifica la ecuación.' });
    }
}


module.exports = {
    Ascendente,
    Descendente,
    Ecuacion
}